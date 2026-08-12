# Clase 13 — Switching: tabla MAC, VLAN, trunk y enrutamiento

**Duración:** 3 h (1 h teoría / 2 h laboratorio)
**Prerrequisitos:** clases 01-02

## Objetivos

- Explicar cómo aprende y usa un switch su tabla MAC, y qué hace ante un
  destino desconocido.
- Configurar VLANs, puertos de acceso y enlaces trunk 802.1Q entre dos
  switches.
- Diagnosticar los tres errores clásicos de VLAN: VLAN faltante en el
  trunk, native VLAN distinta, puerto en la VLAN equivocada.
- Habilitar comunicación entre VLANs con un switch de capa 3 o
  router-on-a-stick.

## Por qué importa

El cableado y la fibra llevan bits; la VLAN decide **quién habla con
quién**. La mayoría de los tickets de "no tengo red" en una empresa con
infraestructura sana son de configuración de capa 2.

## 1. Cómo conmuta un switch

Tres operaciones, y nada más:

1. **Aprender**: al recibir una trama, asocia la **MAC origen** al puerto
   por el que llegó y arranca un temporizador (por defecto 300 s).
2. **Reenviar**: busca la **MAC destino** en la tabla. Si está, envía
   solo por ese puerto.
3. **Inundar** (*flooding*): si la MAC destino **no** está en la tabla, o
   es broadcast/multicast desconocido, la envía por **todos** los puertos
   de la VLAN menos el de entrada.

Consecuencias que se ven en campo:

- El primer paquete a un destino nuevo siempre se inunda. Es normal.
- **Inundación permanente** de tráfico unicast = tráfico asimétrico o
  tabla MAC vaciándose (topología inestable, ver clase 14).
- Una MAC que **salta entre puertos** (*MAC flapping*) en el log es la
  firma de un **bucle** de capa 2.
- La tabla MAC es finita (miles a decenas de miles de entradas); llenarla
  a propósito es un ataque conocido (*MAC flooding*), que se contiene con
  *port security*.

Comandos: `show mac address-table`, `show interface status`.

## 2. VLAN: segmentar sin cambiar el cableado

Una **VLAN** es un dominio de difusión lógico. Dos puertos en VLANs
distintas del mismo switch **no se ven**, aunque estén a 3 cm.

Para qué se usan:

| Uso | Ejemplo |
|---|---|
| Separar tráfico por función | Datos, voz, cámaras, gestión, invitados |
| Contener broadcast | Cada VLAN es su propio dominio |
| Aplicar seguridad | El firewall filtra **entre** VLANs |
| Aislar dispositivos poco confiables | Cámaras e IoT nunca en la VLAN de usuarios |

Diseño típico de una empresa mediana:

| VLAN | Uso | Red |
|---|---|---|
| 10 | Datos usuarios | 10.10.10.0/24 |
| 20 | Voz IP | 10.10.20.0/24 |
| 30 | Cámaras / CCTV | 10.10.30.0/24 |
| 40 | Wi-Fi invitados | 10.10.40.0/24 |
| 99 | **Gestión** de switches y AP | 10.10.99.0/24 |

Reglas de higiene: **no usar la VLAN 1 para nada productivo**, tener una
VLAN de gestión separada y una VLAN "hoyo negro" para puertos sin uso.

## 3. Puertos de acceso y trunk (802.1Q)

- **Puerto de acceso**: pertenece a **una** VLAN. La trama sale sin
  etiqueta. Ahí se conecta el PC, la cámara, la impresora.
- **Puerto trunk**: transporta **varias** VLANs por el mismo cable,
  etiquetando cada trama. Ahí se conecta otro switch, un AP o un
  hipervisor.

### La etiqueta 802.1Q

Se insertan 4 bytes entre la MAC origen y el EtherType:

```
| MAC dst | MAC src | 0x8100 | PCP(3) DEI(1) VID(12) | EtherType | Datos | FCS |
                     \____________ etiqueta 802.1Q ____________/
```

- **TPID** `0x8100` — marca "esto lleva etiqueta".
- **PCP** (3 bits) — prioridad 0-7 (CoS, se usa en QoS, clase 14).
- **VID** (12 bits) — **VLAN 1 a 4094** (0 y 4095 reservadas).
- Por eso la trama etiquetada llega a **1522 bytes**.

### VLAN nativa

Es la VLAN cuyo tráfico viaja **sin etiqueta** por el trunk (por defecto,
la VLAN 1). Si los dos extremos no coinciden en cuál es, el tráfico sin
etiquetar **cae en la VLAN equivocada** — con conectividad "rara" que
funciona para unos y no para otros. Por seguridad, se fija una VLAN
nativa dedicada y sin uso.

### Configuración (sintaxis tipo Cisco IOS)

```
! Crear VLANs
vlan 10
 name DATOS
vlan 20
 name VOZ
vlan 99
 name GESTION

! Puerto de acceso para un PC con teléfono IP
interface GigabitEthernet0/5
 switchport mode access
 switchport access vlan 10
 switchport voice vlan 20
 spanning-tree portfast

! Enlace trunk hacia el otro switch (uplink de fibra)
interface TenGigabitEthernet1/0/1
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,99
 switchport trunk native vlan 999

! Dirección de gestión del switch
interface vlan 99
 ip address 10.10.99.11 255.255.255.0
```

Equivalencias en otras plataformas: en muchos switches (HP/Aruba,
MikroTik, Linux) se habla de puerto **untagged** (= acceso) y **tagged**
(= trunk); el concepto es idéntico.

## 4. Comunicación entre VLANs

Como cada VLAN es una red distinta, hace falta **capa 3**:

| Método | Cómo | Cuándo |
|---|---|---|
| **Switch de capa 3 (SVI)** | Una interfaz virtual con IP por VLAN dentro del switch | La opción normal en cualquier red de campus |
| **Router-on-a-stick** | Un trunk al router con subinterfaces `.10`, `.20`… | Redes chicas, o cuando el router es el firewall |
| **Firewall entre VLANs** | El firewall es el gateway de cada VLAN | Cuando se quiere inspeccionar todo el tráfico entre segmentos |

```
! Switch de capa 3
ip routing
interface vlan 10
 ip address 10.10.10.1 255.255.255.0
interface vlan 20
 ip address 10.10.20.1 255.255.255.0
```

Advertencia de diseño: enrutar entre VLANs en el switch es rápido, pero
**se salta el firewall**. Si las cámaras deben estar aisladas de los
usuarios, o se filtra con listas de control de acceso en el switch, o el
gateway se pone en el firewall.

## 5. Los tres errores clásicos

| Síntoma | Causa | Verificación |
|---|---|---|
| Un PC ve a los de su switch pero no a los del otro | **La VLAN no está permitida en el trunk** | `show interfaces trunk` en ambos extremos |
| Conectividad intermitente o "unos sí y otros no" | **VLAN nativa distinta** en cada extremo | El log lo suele reportar; comparar configuración |
| Un puerto no obtiene IP por DHCP | **Puerto en la VLAN equivocada** o VLAN sin *relay* de DHCP | `show interface status` (columna VLAN) |
| El puerto está "up" pero nada funciona | Puerto en VLAN inexistente en la base de datos | `show vlan brief` |

Método: **primero se mira el puerto de acceso, después el trunk, después
la capa 3.** Y en cada paso, la pregunta es la misma: ¿en qué VLAN está
esta trama en este punto?

## 6. Funciones de seguridad de puerto

| Función | Qué hace | Dónde aplicarla |
|---|---|---|
| **Port security** | Limita cuántas MAC (y cuáles) por puerto | Puertos de acceso de usuarios |
| **DHCP snooping** | Bloquea servidores DHCP no autorizados | Todos los puertos de acceso |
| **Dynamic ARP Inspection** | Impide suplantación ARP | Con DHCP snooping |
| **BPDU guard** | Apaga el puerto si recibe BPDU (alguien conectó un switch) | Puertos de acceso (clase 14) |
| **Storm control** | Limita broadcast/multicast por puerto | Acceso y borde |
| **802.1X** | Autenticación del dispositivo antes de dar acceso | Redes corporativas |

Configuración mínima recomendable de un puerto de usuario:

```
interface range GigabitEthernet0/1-24
 switchport mode access
 switchport access vlan 10
 spanning-tree portfast
 spanning-tree bpduguard enable
 switchport port-security
 switchport port-security maximum 3
 switchport port-security violation restrict
 storm-control broadcast level 1.00
```

## Laboratorio 13 — VLANs entre dos switches

**Materiales:** 2 switches administrables, 4 PCs (o 2 PCs y 2 máquinas
virtuales), uplink de fibra o cobre, consola.

1. Crear VLANs 10, 20 y 99 en ambos switches con los mismos nombres.
2. Asignar PC1 y PC3 a VLAN 10, PC2 y PC4 a VLAN 20, uno en cada switch.
   Direccionamiento estático por ahora.
3. Configurar el uplink como trunk permitiendo 10, 20 y 99.
4. Probar: PC1↔PC3 debe funcionar; PC1↔PC2 no.
5. **Sembrar fallas** (un compañero las introduce, otro las diagnostica y
   cronometra):
   - Quitar la VLAN 20 de la lista permitida del trunk.
   - Cambiar la VLAN nativa en un solo extremo.
   - Mover un PC a la VLAN 30 (inexistente).
   Documentar síntoma → comando de verificación → causa → solución.
6. Dar IP de gestión en VLAN 99 a los dos switches y verificar acceso
   SSH desde un PC de esa VLAN.
7. Habilitar enrutamiento entre VLAN 10 y 20 con SVI. Verificar con
   `traceroute` que el gateway es el switch.
8. Aplicar `port-security maximum 1` en el puerto de PC1 y conectar un
   segundo equipo con un mini-switch: observar la violación.

**Entregable:** tabla de las 3 fallas sembradas con síntoma, comando que
la reveló y solución, más las configuraciones finales de ambos switches.

## Errores comunes

1. Crear la VLAN en un switch y no en el otro.
2. Olvidar agregar la VLAN nueva a la lista permitida del trunk (la
   falla más frecuente de todas).
3. Dejar la gestión en VLAN 1.
4. Poner `portfast` en un puerto que va a otro switch.
5. Permitir "todas las VLANs" en todos los trunks: propaga broadcast
   innecesario por toda la red.
6. Dar a las cámaras la misma VLAN que a los usuarios.

## Preguntas de repaso

1. ¿Qué hace un switch con una trama cuya MAC destino no está en su
   tabla?
2. ¿Cuántas VLANs permite 802.1Q y por qué ese número?
3. Un PC en VLAN 10 no obtiene IP; el puerto está *up* y el DHCP está en
   VLAN 10 del otro switch. ¿Qué se revisa, en qué orden?
4. ¿Qué diferencia hay entre puerto *untagged* y VLAN nativa?
