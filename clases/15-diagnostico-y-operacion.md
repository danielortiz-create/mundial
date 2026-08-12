# Clase 15 — Diagnóstico y operación de la red

**Duración:** 3 h (1 h teoría / 2 h laboratorio de fallas)
**Prerrequisitos:** todas las anteriores

## Objetivos

- Aplicar un método de diagnóstico repetible en vez de probar al azar.
- Traducir un síntoma en una hipótesis y en **una prueba que la
  descarte**.
- Leer los contadores del switch y la telemetría óptica como evidencia.
- Calcular disponibilidad, dimensionar repuestos y armar un plan de
  monitoreo básico.

## Por qué importa

La diferencia entre un técnico de 2 años y uno de 10 no es que el segundo
sepa más comandos: es que **descarta la mitad del problema en cada
prueba** en vez de probar cosas hasta que algo funciona.

## 1. Método

**Divide y descarta.** Cada prueba debe partir el espacio del problema.

1. **Definir el síntoma con precisión.** "No hay internet" no sirve.
   ¿Quién? ¿Desde cuándo? ¿Todos o uno? ¿Todo el tráfico o un servicio?
   ¿Cambió algo (esta pregunta resuelve el 40 % de los casos)?
2. **Delimitar el alcance**: un puerto, un switch, una VLAN, un edificio.
   El alcance apunta directo a la capa.
3. **Formular una hipótesis** y elegir la prueba que la **descarte** más
   rápido.
4. **Probar un cambio a la vez** y anotar el resultado.
5. **Confirmar la causa raíz** — que el síntoma desaparezca no prueba la
   causa (reiniciar arregla muchas cosas y no explica ninguna).
6. **Documentar** en el ticket: síntoma, causa, solución, prevención.

### De abajo hacia arriba

En redes físicas conviene empezar por capa 1, porque es lo más rápido de
descartar y lo más frecuente:

| Capa | Pregunta | Herramienta |
|---|---|---|
| 1 | ¿Hay enlace? ¿Hay luz? ¿Hay errores? | LEDs, `show interface`, DOM, medidor, certificador |
| 2 | ¿Está en la VLAN correcta? ¿Aprende la MAC? | `show mac address-table`, `show interfaces trunk` |
| 3 | ¿Tiene IP, máscara y gateway? ¿Enruta? | `ping`, `traceroute`, tabla de rutas |
| 4-7 | ¿El puerto/servicio responde? ¿DNS resuelve? | `telnet host puerto`, `nslookup`, logs del servidor |

Atajo válido: si **un solo** equipo falla y el resto de su VLAN anda, el
problema está en ese equipo o su cable. Si falla **toda** una VLAN,
mirar el trunk y la capa 3. Si falla **todo el edificio**, mirar el
uplink y la alimentación.

## 2. Catálogo de síntomas

| Síntoma | Causas probables | Prueba que discrimina |
|---|---|---|
| Puerto **down** en ambos extremos | Cable cortado, SFP muerto, puerto apagado | Probar el mismo cable en otro puerto; leer DOM |
| **Up/down intermitente** (*flapping*) | Conector flojo, cable dañado, SFP degradado, autonegociación | DOM histórico, contadores, cambiar latiguillo |
| Enlace up pero **sin tráfico** | VLAN equivocada, fibras invertidas, ACL | `show mac address-table` del puerto |
| **CRC/FCS en aumento** | Capa 1: cable, conector sucio, EMI, fibra curvada | Certificar; limpiar e inspeccionar; medir Rx |
| **Late collisions** | Duplex mismatch, segmento demasiado largo | `show interface` en ambos extremos |
| Lento solo en **transferencias grandes** | Duplex mismatch, MTU/jumbo, pérdida y retransmisión TCP | `iperf3` + contadores; capturar y contar retransmisiones |
| Lento **a ciertas horas** | Congestión real | Gráfica de utilización del uplink |
| **Toda la red cae** | Bucle de capa 2, tormenta de broadcast | CPU del switch, *MAC flapping* en el log |
| Un servicio **puntual** falla | DNS, firewall, aplicación | `telnet host puerto` — separa red de aplicación |
| **Rx óptico bajo** | Conector sucio, curvatura, empalme dañado, fibra estirada | Limpiar; medir con OTDR desde el extremo |
| Rx óptico **demasiado alto** | Óptica de largo alcance en enlace corto | Comparar con la saturación; poner atenuador |
| PoE no enciende el equipo | Presupuesto agotado, PD no detectado, LLDP | `show power inline` |
| Wi-Fi "malo" en un AP | AP en modo degradado por PoE insuficiente | Potencia negociada vs requerida |

**Contadores que importan y qué significan (en el switch):**

- `input errors` / `CRC` — capa 1. Casi siempre cable, conector o fibra.
- `output drops` — congestión de salida: el enlace no da abasto.
- `input drops` — el equipo no procesa: CPU o buffers.
- `runts` / `giants` — colisiones, hardware, o MTU mal configurada.
- `interface resets` / `flaps` — problema físico intermitente.

Regla: **los contadores se miran como tasa, no como total.** Un switch
con 3 años de servicio y 40 000 CRC puede estar sano; 40 000 CRC en la
última hora, no. Se limpian (`clear counters`) y se mira el crecimiento.

## 3. Herramientas de línea de comandos

```bash
ping -c 100 10.10.10.1          # pérdida y latencia
ping -M do -s 1472 10.10.10.1   # prueba de MTU (1472+28 = 1500)
traceroute 8.8.8.8              # dónde se corta o se dispara la latencia
ip -s link show eth0            # contadores de la NIC
ethtool eth0                    # velocidad, duplex, autonegociación
ethtool -S eth0                 # contadores de error detallados
ethtool -m eth0                 # DOM del SFP (potencia óptica)
iperf3 -c 10.10.10.5 -t 30      # ancho de banda real
iperf3 -c 10.10.10.5 -u -b 100M # prueba UDP: pérdida y jitter
tcpdump -i eth0 -n host 10.10.10.5   # ver el tráfico real
```

La prueba de MTU con `ping -M do` es especialmente útil: si pasa con
1472 bytes de datos y falla con 1473, la MTU del camino es 1500. Si
falla mucho antes, hay un túnel o un equipo con MTU reducida — la causa
típica de "la web carga pero la aplicación no".

## 4. Operación: lo que evita el problema

### Monitoreo

| Qué | Con qué | Para qué |
|---|---|---|
| Disponibilidad de equipos | ICMP / SNMP (Zabbix, LibreNMS, PRTG…) | Enterarse antes que el usuario |
| Utilización de enlaces | SNMP + gráficas | Detectar congestión y planificar capacidad |
| **Contadores de error** | SNMP con umbral de tasa | Ver la fibra degradándose antes del corte |
| **Potencia óptica (DOM)** | SNMP / API | La tendencia detecta la planta degradándose |
| Eventos | Syslog centralizado | Reconstruir qué pasó y en qué orden |
| Configuración | Respaldo automático + control de versiones | Saber qué cambió (`diff` de ayer contra hoy) |

Las dos alarmas que más problemas evitan en una red con fibra: **tasa de
CRC** y **caída de potencia Rx respecto de la línea base**.

### Disponibilidad

| SLA | Indisponibilidad al año | Al mes |
|---|---|---|
| 99 % | 3,65 días | 7,2 h |
| 99,9 % | 8,76 h | 43,8 min |
| 99,99 % | 52,6 min | 4,4 min |
| 99,999 % | 5,26 min | 26 s |

`Disponibilidad = MTBF / (MTBF + MTTR)`. Consecuencia práctica: **bajar
el MTTR suele ser más barato que subir el MTBF.** Un repuesto en el
estante y documentación al día mejoran más el SLA que duplicar el
equipamiento.

### Repuestos mínimos de una planta con fibra

- Transceptores de cada tipo en uso (al menos 2 de cada uno).
- Latiguillos de fibra SM y MM, de varias longitudes, y latiguillos de
  cobre.
- Kit de limpieza e inspección **en cada camioneta**.
- Empalmes/pigtails y una fusionadora operativa con electrodos de
  repuesto.
- Fuente de poder o switch de repuesto de los modelos críticos.
- El respaldo de configuración de **todos** los equipos, accesible sin
  la red.

### Gestión del cambio

- Ventana de mantenimiento y aviso previo.
- **Plan de reversión escrito antes** de tocar nada.
- Un cambio a la vez, con verificación entre pasos.
- Acceso alternativo (consola, red de gestión fuera de banda) antes de
  cambiar algo que puede dejarte fuera. Regla de oro: **nunca modifiques
  la red por la que estás conectado sin una segunda vía de acceso.**

## Laboratorio 15 — Fallas sembradas

**Materiales:** la maqueta completa del curso (2-3 switches, enlace de
fibra, PCs, cámara PoE), cronómetro.

Los instructores siembran **6 fallas** antes de la clase. Los grupos
rotan y deben, para cada una: describir el síntoma, registrar las pruebas
en orden, identificar la causa, corregir y documentar. Se cronometra.

Banco de fallas sugerido:

1. Latiguillo de fibra con conector sucio (Rx bajo, CRC en aumento).
2. VLAN quitada de la lista permitida del trunk.
3. Duplex fijo en un solo extremo de un enlace de cobre.
4. Cámara PoE conectada a un switch con el presupuesto agotado.
5. Fibra Tx/Rx invertida en el parcheo del ODF.
6. MTU jumbo habilitada en el servidor pero no en el switch.

**Reglas del ejercicio:**
- Prohibido reiniciar equipos como primera medida.
- Cada prueba se anota **antes** de ejecutarla, con la hipótesis que
  busca descartar.
- Al final, cada grupo presenta una falla en 3 minutos.

**Entregable:** una ficha por falla con síntoma, hipótesis, pruebas,
causa raíz, solución y **medida preventiva**.

## Errores comunes

1. Cambiar varias cosas a la vez: si se arregla, no se sabe por qué.
2. Reiniciar antes de recoger evidencia (los contadores se pierden).
3. Confiar en el reporte del usuario sin verificar el alcance.
4. Ignorar "el cambio del viernes".
5. Mirar totales de contadores en vez de tasas.
6. Cerrar el ticket sin documentar causa raíz: la misma falla vuelve.
7. Trabajar sin línea base: sin el Rx del día 1 y la certificación
   original, la degradación es invisible.

## Preguntas de repaso

1. Un usuario reporta lentitud. ¿Cuáles son las primeras tres preguntas?
2. ¿Cómo se distingue congestión de un problema de capa 1 con los
   contadores?
3. Un SLA del 99,9 % ¿cuánto tiempo de caída al mes permite?
4. ¿Por qué `telnet host 443` es una prueba útil aunque no se use telnet?
