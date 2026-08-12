# Clase 02 — Ethernet: la trama, el MAC y el dominio

**Duración:** 3 h (1,5 h teoría / 1,5 h laboratorio)
**Prerrequisitos:** clase 01

## Objetivos

- Describir campo por campo una trama Ethernet y sus tamaños límite.
- Explicar por qué existe el tamaño mínimo de 64 bytes y qué era CSMA/CD.
- Interpretar el resultado de la autonegociación y detectar un *duplex
  mismatch* por sus contadores.
- Ubicar cada estándar 802.3 (velocidad, medio, distancia) en la tabla
  correcta.

## Por qué importa

Ethernet es el único protocolo de capa 2 que va a ver el alumno en el
99 % de las instalaciones: en cobre, en fibra, en el enlace de 100 Gbps
de un centro de datos y en el puerto del switch de un colegio. Sus reglas
—tamaño mínimo, FCS, autonegociación— explican los síntomas que después
aparecen en los contadores del switch.

## 1. Qué es Ethernet

Familia de estándares **IEEE 802.3** (1983 en adelante) que define capa 1
(señalización y medio) y la subcapa MAC de capa 2. Todo lo que hay que
retener:

- Es **no orientado a conexión y sin acuse**: la trama sale y nadie
  confirma. La retransmisión, si hace falta, la hace TCP en capa 4.
- **Detecta errores pero no los corrige**: el FCS descarta la trama
  corrupta en silencio. Por eso los contadores de CRC del switch son la
  primera evidencia de un problema de capa 1.
- **Mejor esfuerzo**: sin priorización nativa (se agrega con QoS, clase 14).

## 2. La trama Ethernet, campo por campo

```
+--------+-----+----+----+-----------+--------------+-----+
|Preámbulo|SFD |DA  |SA  |Tipo/Long. |    Datos     | FCS |
|  7 B   |1 B |6 B |6 B |    2 B    |  46 - 1500 B |4 B  |
+--------+-----+----+----+-----------+--------------+-----+
          \______________ trama (64 - 1518 B) ____________/
```

| Campo | Tamaño | Función |
|---|---|---|
| Preámbulo | 7 B | `10101010` × 7, sincroniza el reloj del receptor |
| SFD | 1 B | `10101011`, marca dónde empieza la trama |
| DA (destino) | 6 B | MAC destino, unicast / multicast / broadcast |
| SA (origen) | 6 B | MAC origen, siempre unicast |
| Tipo/Longitud | 2 B | ≥ 0x0600 → tipo (0x0800 IPv4, 0x0806 ARP, 0x86DD IPv6, 0x8100 VLAN); < 0x0600 → longitud (802.3 clásico) |
| Datos | 46-1500 B | Payload; si es menor a 46 se rellena (*padding*) |
| FCS | 4 B | CRC-32 de todo lo anterior salvo preámbulo/SFD |

Números que hay que saber de memoria:

- **Trama mínima: 64 bytes.** Menor → *runt*, se descarta.
- **Trama máxima estándar: 1518 bytes** (MTU de datos 1500).
- **Con etiqueta 802.1Q: 1522 bytes** (la etiqueta añade 4 B).
- **IFG (Inter-Frame Gap): 96 tiempos de bit** — 9,6 µs a 10 Mbps,
  0,96 µs a 100 Mbps, 96 ns a 1 Gbps.
- **Jumbo frames: hasta ~9000 bytes de MTU.** No es estándar 802.3; hay
  que habilitarlo *en todos* los equipos del camino o se fragmenta o se
  descarta.

### Por qué 64 bytes

En el Ethernet de medio compartido, el emisor debía seguir transmitiendo
el tiempo suficiente para enterarse de una colisión en el extremo más
lejano del segmento: ida + vuelta = **512 tiempos de bit** (= 64 bytes).
De ahí salieron simultáneamente el tamaño mínimo de trama y el límite de
longitud del segmento. En Gigabit sobre medio compartido hubo que
extender ese tiempo a 512 bytes (*carrier extension*), pero como hoy todo
es full-duplex conmutado, el número sobrevive solo como el mínimo de 64 B.

## 3. CSMA/CD: historia con consecuencias

**Carrier Sense Multiple Access with Collision Detection**: escuchar
antes de transmitir; si dos transmiten a la vez, detectar la colisión,
enviar una señal de atasco y reintentar tras un tiempo aleatorio
(*backoff* exponencial binario, hasta 16 intentos).

Hoy está **obsoleto en la práctica**: con switches y full-duplex no hay
colisiones. Pero sus rastros siguen en los contadores:

| Contador | Qué significa hoy |
|---|---|
| Collisions | Normal solo en half-duplex; si aparece en full-duplex, hay *duplex mismatch* |
| **Late collisions** | Colisión después de los 64 primeros bytes → segmento demasiado largo o duplex mismatch. **Siempre es falla** |
| Runts | Tramas < 64 B: colisión o hardware defectuoso |
| Giants | Tramas > 1518 B sin jumbo habilitado |
| **CRC / FCS errors** | Trama llegó corrupta: cable, conector, EMI, fibra sucia. **Es el contador rey de capa 1** |
| Input errors | Suma de lo anterior |

## 4. Full-duplex, half-duplex y autonegociación

- **Half-duplex**: transmite o recibe, no ambos. Solo con hubs (museo).
- **Full-duplex**: transmite y recibe simultáneamente. Estándar actual.
- **Autonegociación** (802.3 cláusula 28): los dos extremos intercambian
  pulsos FLP anunciando sus capacidades y eligen la mejor común. Es
  **obligatoria** en 1000BASE-T y superiores.

### Duplex mismatch — la falla clásica

Si un lado está fijo en 100/full y el otro en autonegociación, el que
negocia no recibe anuncios, cae a half-duplex por defecto y queda:
**100/full contra 100/half**. Síntoma: el enlace "funciona" pero la
velocidad real se desploma (a veces a menos de 1 Mbps con transferencias
grandes) y aparecen *late collisions* y CRC en el lado half.

Regla: **o autonegociación en los dos extremos, o fijo en los dos
extremos.** Nunca mezclar.

## 5. MDI/MDI-X y el cable cruzado

Históricamente el PC transmitía en los pines 1-2 y el switch recibía ahí,
por lo que unir dos equipos iguales exigía un cable cruzado. Desde
**Auto-MDI/MDI-X** (obligatorio en 1000BASE-T) el puerto detecta y
conmuta solo: el cable cruzado ya no hace falta salvo en equipos viejos.

## 6. El mapa de estándares 802.3

| Estándar | Velocidad | Medio | Distancia |
|---|---|---|---|
| 10BASE-T | 10 Mbps | 2 pares Cat3+ | 100 m |
| 100BASE-TX | 100 Mbps | 2 pares Cat5+ | 100 m |
| 1000BASE-T | 1 Gbps | 4 pares Cat5e+ | 100 m |
| 2.5G/5GBASE-T | 2,5 / 5 Gbps | Cat5e / Cat6 | 100 m |
| 10GBASE-T | 10 Gbps | Cat6A (Cat6 hasta 55 m) | 100 m |
| 1000BASE-SX | 1 Gbps | MMF 850 nm | 550 m (OM2) |
| 1000BASE-LX | 1 Gbps | SMF 1310 nm | 10 km |
| 10GBASE-SR | 10 Gbps | MMF 850 nm | 300 m OM3 / 400 m OM4 |
| 10GBASE-LR | 10 Gbps | SMF 1310 nm | 10 km |
| 10GBASE-ER | 10 Gbps | SMF 1550 nm | 40 km |
| 40GBASE-SR4 | 40 Gbps | MMF ×8 fibras (MPO) | 100 m OM3 / 150 m OM4 |
| 100GBASE-LR4 | 100 Gbps | SMF, 4 λ WDM | 10 km |
| 400GBASE-DR4 | 400 Gbps | SMF ×8 fibras | 500 m |

Patrón útil para leer nombres: `velocidad` + `BASE` (banda base) +
sufijo de medio (**T** cobre par trenzado, **S** *short* = multimodo
850 nm, **L** *long* = monomodo 1310 nm, **E** *extended* = 1550 nm,
**Z** ~80 km) + número de carriles (`R4` = 4 fibras o 4 longitudes de
onda).

## Laboratorio 2 — Disección de tramas y duplex

**Materiales:** 2 PCs, switch administrable, Wireshark, cables.

**Parte A — La trama por dentro**
1. Capturar tráfico y localizar: una trama ARP (broadcast), una unicast
   TCP y, si hay, una multicast.
2. Anotar para cada una: MAC origen, MAC destino, EtherType, longitud
   total.
3. Buscar la trama más pequeña de la captura. ¿Llega a 64 B? Identificar
   el relleno.
4. Cambiar la MTU del PC a 1400 y observar el efecto en el tamaño de las
   tramas de una descarga.

**Parte B — Provocar un duplex mismatch (con permiso, en laboratorio)**
1. Fijar el puerto del switch en `speed 100 / duplex full`.
2. Dejar la NIC del PC en autonegociación.
3. Verificar en el switch: el enlace levanta. Ver el duplex negociado en
   el PC (queda en half).
4. Transferir un archivo de 100 MB y medir el tiempo. Mirar los
   contadores: `show interface` → late collisions y CRC.
5. Corregir (auto en ambos), repetir la transferencia y comparar.

**Entregable:** los dos tiempos de transferencia y la captura de
contadores antes/después.

## Errores comunes

1. Fijar velocidad/duplex "para asegurar" en un solo extremo. Es la causa
   número uno de enlaces lentos e intermitentes.
2. Habilitar jumbo frames solo en el servidor y no en el switch: se
   descartan las tramas grandes y aparecen fallas raras solo con
   transferencias pesadas.
3. Culpar al ancho de banda cuando los CRC suben: los CRC son capa 1
   (cable, conector, fibra sucia), no congestión.
4. Suponer que hace falta cable cruzado entre dos switches modernos.

## Preguntas de repaso

1. ¿Cuánto ocupa en el cable una trama de 64 B contando preámbulo, SFD e
   IFG? ¿Cuántas tramas mínimas caben por segundo en 1 Gbps?
2. ¿Qué contador distingue un duplex mismatch de un cable dañado?
3. Un puerto muestra 0 colisiones y 15 000 CRC en 24 h. ¿Por dónde
   empieza el diagnóstico?
4. ¿Por qué una trama con etiqueta VLAN puede llegar a 1522 bytes?
