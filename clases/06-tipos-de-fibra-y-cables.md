# Clase 06 — Tipos de fibra y construcción del cable

**Duración:** 3 h (1,5 h teoría / 1,5 h laboratorio)
**Prerrequisitos:** clase 05

## Objetivos

- Elegir entre monomodo y multimodo con un criterio de distancia,
  velocidad y costo total, no por costumbre.
- Identificar OM1-OM5 y OS1/OS2 por su designación, color y desempeño.
- Reconocer los tipos constructivos de cable (tight buffer, loose tube,
  ADSS, figura 8, drop, armado) y decir dónde va cada uno.
- Leer el código de colores TIA-598 y la nomenclatura de la chaqueta.

## Por qué importa

Elegir mal la fibra es un error que no se corrige con configuración: si
se tendieron 400 m de OM3 y el proyecto necesitaba 40 Gbps a 300 m, hay
que volver a tender. Y elegir monomodo "por si acaso" en un enlace de
80 m dentro de un edificio encarece la óptica sin ningún beneficio.

## 1. Monomodo vs multimodo

| | Multimodo (MMF) | Monomodo (SMF) |
|---|---|---|
| Núcleo | 50 µm (o 62,5 µm heredado) | 8-9 µm |
| Fuente | VCSEL 850 nm (barato) | Láser DFB/FP 1310/1550 nm |
| Costo de la fibra | Ligeramente mayor | Menor |
| **Costo del transceptor** | **Menor** | **Mayor** (2-4× en 10G) |
| Distancia | Decenas a cientos de metros | 10-80 km y más |
| Límite dominante | Dispersión modal (ancho de banda) | Atenuación / dispersión cromática |
| Facilidad de empalme y conectorización | Mayor tolerancia | Exige mucha precisión y limpieza |
| Uso típico | Dentro del edificio, centro de datos | Entre edificios, planta externa, FTTH |

Criterio de decisión:

- **≤ 100-150 m dentro de un edificio o rack** → multimodo OM4: la óptica
  SR es barata y el enlace es trivial.
- **Entre edificios, campus, calle, cualquier cosa que salga a la
  intemperie o supere ~300-400 m** → monomodo OS2, siempre. La diferencia
  de costo de la fibra es mínima y el enlace queda listo para 10, 40 y
  100 Gbps sin volver a tender.
- **Duda** → monomodo. Reponer fibra cuesta mucho más que un transceptor.

## 2. Designaciones de fibra multimodo

| Tipo | Núcleo | EMB @850 nm | 1 Gbps | 10 Gbps | 40/100 Gbps (SR4) | Color de chaqueta |
|---|---|---|---|---|---|---|
| OM1 | 62,5 µm | 200 MHz·km | 275 m | 33 m | — | Naranja |
| OM2 | 50 µm | 500 MHz·km | 550 m | 82 m | — | Naranja |
| OM3 | 50 µm | 2000 MHz·km | 1000 m | **300 m** | 100 m | Aguamarina |
| OM4 | 50 µm | 4700 MHz·km | 1100 m | **400 m** | 150 m | Aguamarina (o violeta) |
| OM5 | 50 µm | 4700 MHz·km + banda ancha 850-953 nm | 1100 m | 400 m | 150 m | Verde lima |

- **EMB** (*Effective Modal Bandwidth*, MHz·km) es la métrica que manda
  en multimodo: es un producto ancho de banda × distancia. 2000 MHz·km
  significa 2000 MHz a 1 km o 4000 MHz a 500 m.
- **OM1 está obsoleta**: no sirve para 10 Gbps en distancias útiles. Si
  se encuentra 62,5 µm instalado, se documenta y se planifica su
  reemplazo; jamás se empalma con 50 µm.
- **OM5** solo aporta frente a OM4 si se usan transceptores SWDM (varias
  longitudes de onda sobre una fibra multimodo). En la mayoría de los
  proyectos, OM4 es la elección sensata.

## 3. Designaciones de fibra monomodo

| Designación | Norma | Característica | Uso |
|---|---|---|---|
| OS1 | ISO/IEC 11801 | ≤ 1,0 dB/km, planta interior (tight buffer) | Interior de edificio |
| OS2 | ISO/IEC 11801 | ≤ 0,4 dB/km, loose tube | Planta externa, FTTH, campus |
| **G.652.D** | ITU-T | Estándar, *low water peak* (usable en 1383 nm) | La fibra por defecto hoy |
| G.657.A1/A2 | ITU-T | **Insensible a la curvatura**: radio de 10 mm (A1) o 7,5 mm (A2) | Interior de edificios, FTTH, patch cords |
| G.657.B3 | ITU-T | Radio de hasta 5 mm | Instalación muy ajustada en cajas |
| G.655 (NZ-DSF) | ITU-T | Dispersión cromática controlada | DWDM de larga distancia |

Para un proyecto normal: **G.652.D** en planta externa y **G.657.A2**
para el tramo interior y los latiguillos. G.657 es compatible y
empalmable con G.652 (mismo diámetro de campo modal nominal).

## 4. Construcción del cable

| Tipo | Descripción | Dónde se usa |
|---|---|---|
| **Tight buffer** | Cada fibra con buffer de 900 µm, directo sobre la fibra | Interior, latiguillos, riser/plenum. Fácil de conectorizar |
| **Loose tube** | Fibras sueltas de 250 µm dentro de tubos con gel | Planta externa. Protege de tracción y humedad |
| **Breakout** | Cada fibra es un subcable completo con su propia chaqueta | Terminación directa sin bandeja, más grueso |
| **ADSS** | *All-Dielectric Self-Supporting*: sin metal, resiste su propio vano | Tendido aéreo junto a líneas eléctricas |
| **Figura 8** | Lleva un mensajero de acero integrado | Tendido aéreo entre postes |
| **Armado (armored)** | Coraza de acero corrugado | Enterrado directo, protección contra roedores |
| **Drop / acometida** | 1-2 fibras G.657, mensajero o plano | Del poste a la casa (FTTH) |
| **Microducto / blown** | Muy delgado, se sopla con aire | Ductos existentes, densidad alta |
| **Ribbon (cinta)** | 12 fibras pegadas en cinta, se empalman todas a la vez | Troncales de altísima densidad |

Elementos comunes: **elemento de tracción central** (varilla dieléctrica
o acero), **hilos de aramida (Kevlar)** para la fuerza de tiro, **gel o
cinta bloqueante de agua**, **hilo de rasgado** (*ripcord*) y chaqueta de
PE (exterior) o LSZH/PVC (interior).

### Chaquetas y código de incendio

- **PVC / CM**: uso general interior.
- **CMR (riser)**: para tramos verticales entre pisos.
- **CMP (plenum)**: para espacios de retorno de aire; baja emisión de humo.
- **LSZH**: libre de halógenos, poco humo tóxico — exigido en espacios
  cerrados y transporte público en gran parte de Europa y creciente en
  LatAm.
- **PE negro**: exterior, resistencia UV.

**Un cable de exterior no puede entrar más de una distancia limitada
dentro del edificio** (típicamente 15 m según el código local) sin
transicionar a un cable con clasificación de fuego: el gel es
inflamable. Se resuelve con una caja de transición.

## 5. Códigos de color

**Colores de fibra y de tubo (TIA-598-D), en orden:**

| 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|
| Azul | Naranja | Verde | Marrón | Gris | Blanco |

| 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|
| Rojo | Negro | Amarillo | Violeta | Rosa | Aguamarina |

La secuencia se repite: en un cable de 24 fibras, el tubo azul lleva las
fibras 1-12 y el tubo naranja las 13-24. Regla mnemotécnica en español:
**"Azul Naranja Verde Marrón Gris Blanco, Rojo Negro Amarillo Violeta
Rosa Aguamarina"** — hay que sabérsela de memoria para trabajar en una
caja de empalme.

**Colores de chaqueta (referencia habitual):**

| Color | Significado |
|---|---|
| Amarillo | Monomodo (OS1/OS2) |
| Naranja | Multimodo OM1/OM2 |
| Aguamarina | Multimodo OM3/OM4 |
| Verde lima | Multimodo OM5 |
| Verde (conector/cuerpo) | Conector APC |
| Azul (conector) | Conector UPC monomodo |
| Beige (conector) | Conector PC multimodo |

## 6. Cómo leer la designación de un cable

Ejemplo real: `24F SM G.652.D LOOSE TUBE ADSS 100 m SPAN`

- 24 fibras, monomodo G.652.D
- Construcción loose tube
- Autosoportado dieléctrico
- Diseñado para vanos de hasta 100 m

Otro: `12F OM4 TIGHT BUFFER LSZH RISER`
- 12 fibras multimodo OM4, buffer ajustado, chaqueta LSZH, apto vertical.

En la hoja de datos hay que buscar **siempre** cuatro números antes de
comprar: **atenuación máxima por km**, **tensión de tiro máxima**,
**radio de curvatura mínimo (instalación y reposo)** y **rango de
temperatura**.

## Laboratorio 6 — Identificación y apertura de cable

**Materiales:** muestras de al menos 4 tipos de cable (interior tight
buffer, loose tube exterior, drop FTTH, armado), latiguillos SM y MM,
navaja de cable, tijeras de aramida, cinta métrica.

1. **Identificación a ciegas**: colocar 6 muestras numeradas. Cada grupo
   debe determinar tipo de fibra, cantidad, construcción y aplicación,
   justificando por color, marcado impreso y estructura.
2. **Apertura de un loose tube**: retirar 1,5 m de chaqueta con el
   ripcord, identificar elemento central, aramida, tubos y su orden de
   colores. Extraer un tubo y contar las 12 fibras verificando la
   secuencia TIA-598.
3. Medir con calibrador el diámetro exterior de cada cable y calcular su
   radio mínimo de curvatura (10× en reposo, 20× durante el tendido, o
   el valor del fabricante si está impreso).
4. Comparar visualmente el extremo de una fibra de 62,5 µm y una de
   50 µm con el microscopio de inspección.
5. Redactar la especificación de compra para dos escenarios:
   - 300 m entre dos edificios, aéreo, 12 fibras, futuro 10 Gbps.
   - Backbone vertical de 6 pisos, 24 fibras, 40 Gbps a futuro.

**Entregable:** ficha de identificación de las 6 muestras + las dos
especificaciones de compra.

## Errores comunes

1. Empalmar 62,5 µm con 50 µm "porque entra igual": pérdida de 2-3 dB en
   un sentido y desbalance imposible de diagnosticar después.
2. Comprar OM3 en obra nueva para ahorrar y bloquear el crecimiento a
   40/100 Gbps.
3. Meter cable de exterior con gel al interior del edificio sin
   transición ni caja: incumple el código de incendio.
4. Instalar cable no armado enterrado directo.
5. No exigir la hoja de datos: sin tensión de tiro y radio mínimo no se
   puede planificar el tendido.
6. Suponer que "amarillo = monomodo" es una norma obligatoria: es
   convención muy extendida, pero **siempre** se verifica con el marcado
   impreso del cable.

## Preguntas de repaso

1. ¿Qué fibra elige para 250 m entre dos racks con 40 Gbps a futuro? ¿Y
   para 1,2 km entre dos edificios?
2. ¿Qué significa "EMB de 4700 MHz·km" en términos de distancia a
   10 Gbps?
3. ¿Cuál es la fibra 15 de un cable de 24 fibras en 2 tubos? Dar tubo y
   color.
4. ¿Por qué G.657 es la elección para el cableado dentro de un edificio
   de apartamentos?
