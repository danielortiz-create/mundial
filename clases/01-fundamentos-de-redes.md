# Clase 01 — Fundamentos de redes y modelo por capas

**Duración:** 3 h (1,5 h teoría / 1,5 h laboratorio)
**Prerrequisitos:** ninguno

## Objetivos

Al terminar la clase el alumno puede:

- Nombrar las 7 capas del modelo OSI y decir qué hace cada una con un
  ejemplo de equipo o protocolo real.
- Explicar la diferencia entre dirección MAC e IP y por qué hacen falta
  las dos.
- Calcular tiempos de transmisión y convertir entre bits, bytes y sus
  múltiplos sin equivocarse por un factor de 8.
- Distinguir dominio de colisión de dominio de difusión (*broadcast*).

## Por qué importa

El 80 % de los diagnósticos de red se resuelven preguntando "¿en qué capa
está el problema?". Un técnico que no separa capas prueba cosas al azar:
cambia el cable cuando el problema es una VLAN, o reconfigura VLANs cuando
el problema es un conector sucio. El modelo por capas no es teoría de
examen: es el orden en el que se busca la falla.

## 1. Qué es una red y qué problema resuelve

Una red conecta dos o más dispositivos para que intercambien datos. Los
problemas que hay que resolver para lograrlo son siempre los mismos:

| Problema | Quién lo resuelve |
|---|---|
| Convertir bits en señal física (luz, voltaje) | Capa 1 — medio y transceptor |
| Saber a qué equipo del mismo enlace va la trama | Capa 2 — dirección MAC |
| Llegar a un equipo que está en otra red | Capa 3 — dirección IP |
| Saber a qué programa del equipo destino entregarlo | Capa 4 — puerto TCP/UDP |
| Que los datos signifiquen algo | Capas 5-7 — la aplicación |

## 2. Modelo OSI y modelo TCP/IP

| OSI | Nombre | Unidad de datos | Ejemplos | Equipo típico |
|---|---|---|---|---|
| 7 | Aplicación | Datos | HTTP, DNS, SNMP | Servidor |
| 6 | Presentación | Datos | TLS, JPEG, ASCII | — |
| 5 | Sesión | Datos | RPC, NetBIOS | — |
| 4 | Transporte | Segmento | TCP, UDP | Firewall L4 |
| 3 | Red | Paquete | IP, ICMP, OSPF | Router, switch L3 |
| 2 | Enlace | **Trama** | Ethernet, 802.1Q, PPP | Switch, bridge |
| 1 | Física | **Bit** | 1000BASE-T, 10GBASE-SR | Cable, SFP, patch panel |

El modelo TCP/IP real usa 4 capas: Acceso a red (OSI 1-2), Internet
(OSI 3), Transporte (OSI 4) y Aplicación (OSI 5-7). OSI se sigue usando
porque su numeración es el lenguaje de campo: "problema de capa 1" quiere
decir cable, conector o transceptor.

### Encapsulamiento

Cada capa envuelve a la de arriba. Un `GET /` de 20 bytes viaja así:

```
[ Cabecera Ethernet 14 B ][ Cabecera IP 20 B ][ Cabecera TCP 20 B ][ datos 20 B ][ FCS 4 B ]
 \_____ capa 2 _____/       \__ capa 3 __/      \__ capa 4 __/
```

Consecuencia práctica: **la eficiencia baja con paquetes pequeños**. Los
54 bytes de cabecera pesan poco frente a 1460 bytes de datos (3,6 %), pero
mucho frente a 20 bytes (73 %). Por eso una red saturada de paquetes
chicos (VoIP, telemetría) rinde menos "megas útiles" que una de
transferencia de archivos a la misma velocidad de línea.

## 3. Direcciones: MAC vs IP

| | MAC | IP |
|---|---|---|
| Capa | 2 | 3 |
| Tamaño | 48 bits (6 bytes), ej. `00:1B:44:11:3A:B7` | 32 bits (IPv4) o 128 (IPv6) |
| Asignación | De fábrica; los 3 primeros bytes son el OUI del fabricante | Por configuración o DHCP |
| Alcance | Solo dentro del mismo dominio de difusión | Global / enrutable |
| Cambia al pasar por un router | **Sí**, en cada salto | No (salvo NAT) |

Analogía útil en clase: la IP es la dirección postal final; la MAC es "a
qué puerta de este edificio se lo entrego ahora". ARP es el protocolo que
traduce "sé la IP, necesito la MAC".

Direcciones MAC especiales:
- `FF:FF:FF:FF:FF:FF` — difusión (broadcast): la escuchan todos.
- Bit menos significativo del primer byte en 1 → multicast.
- Segundo bit menos significativo del primer byte en 1 → administrada
  localmente (MAC virtual, no de fábrica).

## 4. Bits, bytes y velocidades

Fuente permanente de errores en campo:

- **b** = bit, **B** = byte = 8 bits. `100 Mbps ≠ 100 MB/s`.
- Las velocidades de red se miden en múltiplos de 1000 (1 Gbps =
  1 000 000 000 bit/s); los tamaños de archivo suelen usar 1024.
- Una descarga de 1 GB (8 000 Mb) sobre un enlace de 100 Mbps toma
  **80 s como mínimo teórico**, sin contar sobrecarga de protocolo
  (~5 %) ni latencia.

Fórmula de tiempo de transmisión:

```
t (s) = tamaño (bits) / velocidad (bit/s)
```

Ejercicio mental: un archivo de 4,7 GB por un enlace de 1 Gbps ≈ 38 s
teóricos; en la práctica 45-55 s. Si el usuario reporta 20 minutos, el
problema no es el ancho de banda nominal — es capa 1, duplex o disco.

## 5. Dominio de colisión y dominio de difusión

- **Dominio de colisión**: conjunto de puertos donde dos transmisiones
  simultáneas se pisan. Un hub tiene **uno solo** para todos sus puertos;
  un switch crea **uno por puerto**. En full-duplex el concepto
  desaparece: hay un par (o fibra) para cada sentido.
- **Dominio de difusión**: hasta dónde llega un broadcast. Un switch lo
  propaga por todos los puertos de la misma VLAN; un router **no** lo
  propaga. Una VLAN = un dominio de difusión.

Regla operativa: si un dominio de difusión tiene demasiados equipos
(cientos), el tráfico de ARP y descubrimiento empieza a consumir CPU de
todos. Se segmenta con VLANs (clase 13).

## 6. Topologías y medios

| Topología | Dónde se usa hoy | Riesgo |
|---|---|---|
| Estrella | Todo el cableado de edificio (LAN) | Falla el switch central |
| Anillo | Redes de transporte metro, industriales | Necesita protocolo de protección |
| Árbol / jerárquica | Campus: core-distribución-acceso | Complejidad |
| Punto a punto | Enlaces de fibra entre sitios | — |
| Punto a multipunto | FTTH con splitters (PON, clase 12) | Comparte el ancho de banda |

Medios y su límite práctico (se detallan en las clases 3, 6 y 11):

| Medio | Distancia típica | Inmunidad a interferencia |
|---|---|---|
| Par trenzado Cat6A | 100 m | Media (mejora con blindaje) |
| Fibra multimodo OM4 | 400 m a 10 Gbps | Total |
| Fibra monomodo OS2 | 10-80 km según óptica | Total |
| Inalámbrico | Decenas de m | Baja |

## Laboratorio 1 — El viaje de un paquete

**Materiales:** un PC con Wireshark, un switch, un router con salida a
internet, cable de red.

1. `ipconfig` / `ip a` — anotar IP, máscara, gateway y MAC.
2. `arp -a` — ver la tabla de traducción IP→MAC. Vaciarla
   (`arp -d *` / `ip neigh flush all`) y volver a mirarla tras un ping.
3. Capturar en Wireshark un `ping 8.8.8.8` y responder por escrito:
   - ¿Qué MAC destino lleva la trama? ¿Es la de 8.8.8.8? ¿Por qué no?
   - ¿Qué IP destino lleva el paquete?
   - ¿Cuántos bytes ocupa la trama completa?
4. Repetir con `ping` a un equipo del mismo segmento y comparar la MAC
   destino. Explicar la diferencia.
5. `tracert` / `traceroute` a un sitio externo: contar saltos y anotar
   dónde salta la latencia.

**Entregable:** una tabla de 5 filas con capa, dato observado y quién lo
puso ahí.

## Errores comunes

1. **Confundir Mbps con MB/s** al dimensionar un enlace: se pide 8 veces
   menos capacidad de la necesaria.
2. Creer que el switch "ve" direcciones IP. Un switch de capa 2 conmuta
   por MAC; la IP le es indiferente.
3. Pensar que un broadcast atraviesa el router.
4. Diagnosticar de arriba hacia abajo. Se empieza por capa 1: enlace,
   luz, contadores de error. Es lo más rápido de descartar.

## Preguntas de repaso

1. ¿Por qué la trama cambia de dirección MAC en cada salto pero el
   paquete conserva la IP destino?
2. Un hub de 8 puertos, ¿cuántos dominios de colisión y de difusión
   crea? ¿Y un switch de 8 puertos con 2 VLANs?
3. Un usuario dice que su enlace de "300 megas" descarga a 35 MB/s.
   ¿Está bien o está mal el enlace?
4. ¿En qué capa trabaja un patch panel? ¿Y un firewall que bloquea el
   puerto 443?
