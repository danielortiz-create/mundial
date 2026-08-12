# Clase 14 — Redundancia y rendimiento: STP, LACP y QoS

**Duración:** 3 h (1,5 h teoría / 1,5 h laboratorio)
**Prerrequisitos:** clase 13

## Objetivos

- Explicar por qué un bucle de capa 2 tumba una red entera y cómo lo
  evita STP/RSTP.
- Elegir y fijar el switch raíz, y proteger el borde con PortFast, BPDU
  guard y root guard.
- Agregar varios enlaces con LACP y entender cómo se reparte el tráfico.
- Aplicar una política de QoS mínima para voz y video.

## Por qué importa

Un bucle de capa 2 no degrada la red: **la detiene por completo en
segundos**, incluyendo el acceso de gestión para arreglarla. Y un enlace
agregado mal configurado puede crear justamente ese bucle. Son las dos
configuraciones que hay que hacer bien la primera vez.

## 1. La tormenta de broadcast

En capa 2 **no hay TTL**. Una trama de broadcast que entra en un bucle
circula para siempre y se multiplica en cada switch. En menos de un
minuto:

- CPU de los switches al 100 %.
- Tabla MAC inestable (la misma MAC aparece por puertos distintos:
  *MAC flapping*).
- Todos los enlaces saturados; ni siquiera se puede entrar por SSH.

Causas habituales: alguien conecta los dos extremos de un patch cord al
mismo switch, un usuario enchufa un mini-switch en dos rosetas, o se
configura una agregación de enlaces en un solo lado.

## 2. Spanning Tree

**STP (802.1D)** construye un árbol sin bucles bloqueando puertos
redundantes; si el camino activo cae, desbloquea el alternativo.

Proceso:

1. Se elige un **switch raíz** (*root bridge*): el de menor **Bridge ID**
   = prioridad (por defecto 32768) + MAC. Con todo por defecto, gana **el
   switch más viejo** (MAC más baja), que suele ser el peor ubicado.
2. Cada switch elige su **root port**: el de menor costo hacia la raíz.
3. Cada segmento elige un **designated port**.
4. El resto quedan **bloqueados**.

Costos por velocidad (802.1D-2004 / RSTP):

| Velocidad | Costo |
|---|---|
| 10 Mbps | 2 000 000 |
| 100 Mbps | 200 000 |
| 1 Gbps | 20 000 |
| 10 Gbps | 2 000 |
| 100 Gbps | 200 |

### Variantes

| Protocolo | Convergencia | Nota |
|---|---|---|
| STP (802.1D) | 30-50 s | Obsoleto |
| **RSTP (802.1w)** | **1-3 s** | El mínimo aceptable hoy |
| MSTP (802.1s) | Como RSTP | Un árbol por **grupo** de VLANs; escala bien |
| PVST+ / Rapid-PVST+ | Como RSTP | Un árbol **por VLAN** (Cisco); permite balancear |

### Configuración correcta

```
! Elegir la raíz a propósito: el switch de core
spanning-tree mode rapid-pvst
spanning-tree vlan 1-100 root primary      ! en el core
spanning-tree vlan 1-100 root secondary    ! en el core de respaldo

! Borde: puertos de usuario
interface range GigabitEthernet0/1-24
 spanning-tree portfast
 spanning-tree bpduguard enable
```

| Protección | Qué hace | Dónde |
|---|---|---|
| **PortFast / edge** | El puerto pasa a *forwarding* sin esperar | Puertos de acceso **solamente** |
| **BPDU guard** | Si llega una BPDU a un puerto de borde, lo apaga | Con PortFast, siempre |
| **Root guard** | Impide que un switch ajeno se vuelva raíz | Puertos hacia switches de acceso |
| **Loop guard** | Protege ante BPDUs que dejan de llegar por fallas unidireccionales | Enlaces punto a punto |
| **UDLD** | Detecta enlaces de fibra unidireccionales (una fibra rota) | **Uplinks de fibra** |

**UDLD merece atención especial en un curso de fibra**: si se rompe una
sola de las dos fibras, el enlace queda *up* en un extremo y ciego en el
otro. STP puede desbloquear un puerto que no debería, y aparece un
bucle. UDLD detecta esa asimetría y apaga el puerto.

## 3. Agregación de enlaces (LACP, 802.3ad / 802.1AX)

Varios enlaces físicos actúan como **uno lógico**: más ancho de banda y
redundancia sin que STP bloquee nada.

```
interface range TenGigabitEthernet1/0/1-2
 channel-group 1 mode active        ! LACP
interface Port-channel1
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,99
```

Reglas que hay que cumplir en **todos** los miembros del grupo:

- Misma velocidad y duplex, mismo modo (acceso o trunk) y las mismas
  VLANs permitidas.
- LACP (`mode active`) en ambos extremos; el modo estático `on` no
  negocia y **crea bucles** si el otro lado no está configurado.
- El grupo se configura **en los dos switches al mismo tiempo**; mientras
  tanto, conviene tener uno de los enlaces desconectado.

**Cómo se reparte el tráfico:** no se divide paquete a paquete, sino por
**flujo**, mediante un hash de campos (MAC origen/destino, IP, puertos).
Consecuencia crítica que sorprende a todo el mundo:

> Un único flujo (una sola transferencia entre dos equipos) **nunca**
> supera la velocidad de **un** enlace miembro. Un LACP de 2×10 G no da
> 20 Gbps a un backup entre dos servidores: da 10.

La agregación aumenta la capacidad **agregada** y la disponibilidad, no
la velocidad de una sesión.

## 4. QoS

Cuando el enlace se congestiona hay que decidir qué se descarta. Sin QoS,
se descarta lo que toque — y lo que más sufre es lo que menos tolera la
demora: la voz.

**Requisitos por servicio (referencia ITU-T G.114 y práctica de la
industria):**

| Servicio | Latencia | Jitter | Pérdida |
|---|---|---|---|
| **Voz IP** | < 150 ms extremo a extremo | < 30 ms | < 1 % |
| Videoconferencia | < 200 ms | < 30 ms | < 1 % |
| Datos interactivos | < 400 ms | — | Tolerante (TCP retransmite) |
| Copias de respaldo | Indiferente | — | Tolerante |

**Marcado:**

- **CoS** (capa 2): 3 bits **PCP** de la etiqueta 802.1Q, valores 0-7.
  Solo existe en tramas etiquetadas.
- **DSCP** (capa 3): 6 bits del campo ToS de IP. Sobrevive al
  enrutamiento. Valores usados: **EF (46)** para voz, **AF41 (34)** para
  video, **CS6 (48)** para protocolos de red, **0** para el resto.

**Política mínima realista:**

1. **Marcar en el borde, confiar en el núcleo.** El teléfono IP marca
   EF; el switch de acceso *confía* en él (`mss trust dscp` / equivalente)
   y **no confía** en el PC del usuario (que podría marcarse EF a sí
   mismo).
2. Encolar: cola de prioridad estricta para EF, con un límite (p. ej.
   30 % del enlace) para que la voz no ahogue todo lo demás.
3. Aplicar la política donde hay congestión: el uplink WAN y los enlaces
   de acceso a distribución.

QoS **no crea ancho de banda**. Si el enlace está permanentemente al
100 %, la solución es más capacidad; QoS solo decide quién sufre.

## 5. Otras piezas de disponibilidad

| Tecnología | Qué resuelve |
|---|---|
| **FHRP** (HSRP/VRRP) | Gateway redundante: dos switches de capa 3 comparten una IP virtual |
| **Stacking / MLAG / VSS** | Dos switches físicos se comportan como uno: permite LACP repartido entre chasis y elimina puertos bloqueados por STP |
| **Fuentes redundantes** | Continuidad ante falla de alimentación (ojo con el presupuesto PoE, clase 4) |
| **Rutas diversas de fibra** | La redundancia de capa 2/3 no sirve si las dos fibras van por la misma zanja |

Este último punto es el que más veces se pasa por alto: la retroexcavadora
corta la zanja, no el protocolo.

## Laboratorio 14 — Bucle, agregación y prioridad

**Materiales:** 3 switches administrables, PCs, generador de tráfico
(iperf3), teléfono IP o generador de tráfico marcado, consola.

**Parte A — El bucle (en red aislada del laboratorio)**
1. Con STP **deshabilitado** en un switch, conectar dos puertos de acceso
   entre sí. Observar CPU, luces y contadores. Reconectar por consola.
   Duración máxima del experimento: lo que tarde en verse el efecto.
2. Habilitar RSTP y repetir: observar cómo un puerto queda bloqueado.
3. Identificar la raíz con `show spanning-tree`. Verificar que es el
   switch "equivocado" (por MAC) y fijar la raíz en el core con
   `root primary`. Comparar la topología antes y después.
4. Activar PortFast + BPDU guard en los puertos de acceso y volver a
   conectar el patch cord entre dos de ellos: el puerto debe apagarse
   (*err-disable*).

**Parte B — LACP**
1. Configurar un Port-channel de 2 enlaces entre dos switches, con LACP
   activo en ambos.
2. Medir con iperf3 desde **un** PC a otro: comprobar que no supera la
   velocidad de un enlace.
3. Repetir con **cuatro** flujos simultáneos entre pares distintos y
   observar el reparto entre miembros (`show etherchannel load-balance`,
   contadores por interfaz).
4. Desconectar un miembro durante una transferencia y medir el corte.

**Parte C — QoS**
1. Saturar el uplink con iperf3 y medir la latencia con `ping` mientras
   tanto: anotar el aumento.
2. Marcar el tráfico de prueba como EF y aplicar cola de prioridad.
3. Repetir la medición y comparar latencia y jitter.

**Entregable:** los tres pares de mediciones (antes/después) y la
topología STP dibujada con la raíz correcta y los puertos bloqueados.

## Errores comunes

1. Dejar que STP elija la raíz por defecto.
2. `mode on` (estático) en un extremo de la agregación → bucle.
3. PortFast en un puerto de switch a switch → bucle transitorio en cada
   reinicio.
4. Esperar 20 Gbps de un LACP 2×10 G en un solo flujo.
5. Confiar en el marcado QoS del PC de un usuario.
6. Duplicar todo el equipamiento y llevar las dos fibras por la misma
   canalización.
7. No habilitar UDLD en los enlaces de fibra.

## Preguntas de repaso

1. ¿Por qué un bucle de capa 2 es catastrófico y en capa 3 no?
2. ¿Cuál es el costo STP de un enlace de 10 Gbps y qué significa que sea
   menor?
3. Un backup entre dos servidores por un LACP de 4×1 G va a 1 Gbps. ¿Está
   roto?
4. ¿Qué diferencia hay entre marcar con CoS y con DSCP, y cuál sobrevive
   a un router?
