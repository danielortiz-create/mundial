# Anexo A1 — Herramientas, equipos e insumos

Qué hace falta para **dictar el curso** y qué hace falta para **montar una
cuadrilla** que trabaje. Los precios cambian; las categorías no.

## 1. Kit básico de cobre (por puesto de laboratorio)

| Ítem | Nota |
|---|---|
| Ponchadora de impacto con hoja 110 | Para jacks y patch panels |
| Crimpadora RJ45 | Con matriz para conectores de paso si se usan |
| Pelacables de UTP | El de cuchilla ajustable |
| Tijeras de electricista | |
| Probador de wire map | El mínimo indispensable |
| Generador de tonos y sonda | Para rastrear cables sin etiqueta |
| Cable Cat6/6A en caja, jacks, faceplates, patch panel | Consumible |
| Conectores RJ45 (Cat6) | Consumible |
| Velcro, etiquetadora | |

## 2. Kit de fibra (compartido, 1 cada 3-4 alumnos)

**Preparación y empalme:**

| Ítem | Nota |
|---|---|
| **Fusionadora** con alineación por núcleo | La inversión mayor. Para enseñar sirve una de alineación por revestimiento, pero la de núcleo es la que se usa en monomodo profesional |
| **Cortadora de precisión (cleaver)** | Su estado define la calidad del empalme. Consumible: la cuchilla rota y se reemplaza |
| Peladora de 250 µm y de 900 µm | |
| Peladora de chaqueta / navaja de cable | Para loose tube |
| Tijeras de aramida (Kevlar) | Las normales no cortan |
| Protectores de empalme (manguitos) | Consumible |
| Contenedor rígido de descartes | **Obligatorio** |

**Limpieza e inspección:**

| Ítem | Nota |
|---|---|
| **Microscopio de inspección** ≥ 200×, idealmente sonda digital con IEC 61300-3-35 | Con puntas para LC, SC y MPO |
| Casete de limpieza en seco | |
| Click-cleaner de 1,25 mm (LC) y 2,5 mm (SC/FC) | |
| Alcohol isopropílico ≥ 99 % + paños sin pelusa | **Nunca al 70 %** |
| Herramienta de limpieza de MPO | La de LC no sirve |
| Tapas para conectores y adaptadores | Consumible que siempre falta |

**Medición:**

| Ítem | Nota |
|---|---|
| **Fuente de luz + medidor de potencia (OLTS)** | 850/1300 para MM, 1310/1550 para SM. Fuente con *encircled flux* si se certifica MM |
| **OTDR** | Con fibra de lanzamiento y de recepción (150 m-1 km). Es la segunda inversión mayor |
| **VFL** (localizador visual, láser rojo) | Barato e imprescindible |
| Latiguillos de referencia (juego dedicado) | Consumible; se inspeccionan y se reemplazan |
| Atenuadores fijos 5/10/15 dB | Para las prácticas de saturación |
| **Medidor de potencia PON** pass-through | Si se dicta el módulo FTTH |
| Identificador de fibra | Útil en operación |

**Terminación:**

| Ítem | Nota |
|---|---|
| Pigtails SC/UPC, SC/APC y LC/UPC | Consumible |
| Latiguillos SM y MM de varias longitudes | |
| ODF de rack con bandejas | |
| Caja de empalme (mufa) de práctica | Reutilizable |
| Adaptadores SC, LC (y alguno híbrido para la demostración APC/UPC) | |
| Carretes de fibra: 1 km, 2 km y uno corto | Para OTDR y atenuación |
| Muestras de cable: tight buffer, loose tube, drop, armado, ADSS | Para la clase 6 |
| Splitters 1:4 y 1:8 | Para la clase 12 |

## 3. Equipos de red

| Ítem | Cantidad sugerida | Nota |
|---|---|---|
| Switch administrable con puertos SFP+ | 3 | Debe soportar VLAN, trunk, RSTP, LACP, PoE y DOM |
| Switch PoE+ (802.3at como mínimo, bt si se puede) | 1 | Para la clase 4 |
| Transceptores SFP+ SR y LR | 2 pares de cada | |
| DAC | 1 | Comparación de la clase 11 |
| Cámara IP PoE, AP PoE, teléfono IP | 1 de cada | PDs reales para medir |
| Router / firewall | 1 | Salida a internet y enrutamiento entre VLANs |
| PCs o portátiles | 4-6 | Con Wireshark, iperf3, cliente SSH |
| Cables de consola | 2-3 | Recuperar un switch tras un bucle |
| Multímetro | 1 | PoE |

**Software (todo libre):** Wireshark, iperf3, `ethtool`, `tcpdump`,
PuTTY/`ssh`, un visor de trazas `.sor`, y un simulador de red (GNS3,
Packet Tracer o Containerlab) para practicar configuración sin hardware.

## 4. Seguridad — no opcional

| Ítem | Para qué |
|---|---|
| Gafas de seguridad | Cortar y fusionar fibra |
| Contenedor de descartes de fibra | Astillas de vidrio |
| Cinta adhesiva | Levantar restos de fibra de la mesa |
| Superficie de trabajo oscura y lisa | Ver los restos |
| Botiquín | |
| Arnés, casco, guantes, señalización | Si hay práctica de altura o vía pública |
| Detector de gases | Si hay práctica en cámara subterránea |
| Cartel de "láser — no mirar al haz" | Y la costumbre de respetarlo |

## 5. Consumibles a reponer cada cohorte

Fibra de práctica, protectores de empalme, alcohol isopropílico, paños,
casetes de limpieza, cable UTP, jacks y conectores RJ45, latiguillos de
referencia (se dañan), cuchillas de cortadora, electrodos de fusionadora
y etiquetas.

## 6. Presupuesto por niveles

Si no se puede comprar todo, este es el orden de prioridad:

**Nivel 1 — mínimo para enseñar con sentido:** kit de cobre completo,
VFL, OLTS (fuente + medidor), microscopio de inspección, limpieza,
latiguillos y adaptadores, 2 switches administrables con SFP+ y sus
transceptores, muestras de cable. Con esto se cubren las clases 1-8, 11,
13-15.

**Nivel 2 — para formar instaladores de fibra:** fusionadora, cortadora,
peladoras, pigtails, ODF, mufa, carretes. Habilita las clases 7, 9 y 10
completas.

**Nivel 3 — para certificar y para FTTH:** OTDR con fibras de
lanzamiento/recepción, certificador de cobre, medidor PON, splitters.
Habilita la certificación real y la clase 12.

**Alternativa cuando falta equipo:** alquilar OTDR y certificador para
las semanas de las clases 9 y 16, o coordinar una visita a una obra o al
laboratorio de un operador. Lo que **no** se debe hacer es enseñar
certificación solo en teoría: el error de método (referencia mal tomada,
pulso mal elegido) solo se aprende midiendo.
