# Clase 05 — Física de la luz en fibra óptica

**Duración:** 3 h (2 h teoría / 1 h laboratorio)
**Prerrequisitos:** clases 01-02. Matemática básica (logaritmos).

## Objetivos

- Explicar la reflexión total interna y calcular el ángulo crítico y la
  apertura numérica de una fibra.
- Manejar con soltura dB, dBm y mW, y sumar/restar pérdidas sin
  calculadora en los casos redondos.
- Justificar por qué se usan 850, 1310 y 1550 nm y no otras longitudes de
  onda.
- Enumerar las causas de atenuación y de dispersión, y decir cuál limita
  cada tipo de enlace.

## Por qué importa

Todo lo que viene después —presupuesto óptico, elección de fibra,
interpretación de una traza OTDR— es aritmética sobre esta física. El
técnico que entiende por qué una curva cerrada pierde luz no necesita
memorizar la regla del radio de curvatura: la deduce.

## 1. La fibra como guía de luz

Una fibra óptica es un cilindro de vidrio de sílice (SiO₂) con dos zonas:

```
        ┌────────────────────────────┐
        │  Recubrimiento 250 µm      │  ← protección mecánica (acrilato)
        │  ┌──────────────────────┐  │
        │  │ Revestimiento 125 µm │  │  ← cladding, n₂ menor
        │  │   ┌──────────────┐   │  │
        │  │   │ Núcleo 9 µm  │   │  │  ← core, n₁ mayor
        │  │   └──────────────┘   │  │
        │  └──────────────────────┘  │
        └────────────────────────────┘
```

- **Núcleo (core)**: por donde viaja la luz. 8-9 µm en monomodo,
  50 o 62,5 µm en multimodo.
- **Revestimiento (cladding)**: **125 µm en prácticamente todas las
  fibras de telecomunicaciones**, monomodo y multimodo. Por eso los
  conectores y las fusionadoras son compatibles mecánicamente.
- **Recubrimiento (coating)**: 250 µm; se retira para empalmar. En cables
  interiores se agrega un *tight buffer* de 900 µm.

Escala mental: 9 µm es la décima parte del grosor de un cabello. De ahí
que una partícula de polvo de 5 µm sobre un ferrule monomodo tape media
señal.

## 2. Reflexión total interna

**Índice de refracción** `n = c / v`: cuántas veces más lento viaja la luz
en el material que en el vacío. Vidrio de fibra: n ≈ 1,46-1,48. Aire: 1.

**Ley de Snell:** `n₁ · sen θ₁ = n₂ · sen θ₂`

Cuando la luz pasa de un medio más denso a uno menos denso (n₁ > n₂) y el
ángulo supera el **ángulo crítico**, no se refracta: se refleja
completamente. Eso es la **reflexión total interna** y es lo que mantiene
la luz dentro del núcleo, rebotando miles de veces por metro.

```
θc = arcsen (n₂ / n₁)
```

Ejemplo: n₁ = 1,4712, n₂ = 1,4659 → θc = arcsen(0,99640) = **85,15°**
(medido desde la normal). Es decir, la luz debe incidir muy rasante:
apenas 4,85° de desviación respecto del eje de la fibra.

**Consecuencia directa:** si se dobla la fibra, algunos rayos dejan de
cumplir la condición y se escapan al cladding. Eso es la **macrocurvatura**
y por eso existe el radio mínimo de curvatura.

## 3. Apertura numérica y cono de aceptación

```
NA = √(n₁² − n₂²)          θmax = arcsen(NA)     (en aire)
```

Con los valores de arriba: NA = √(1,4712² − 1,4659²) = √(0,01557) =
**0,1248** → θmax ≈ **7,2°**. La luz que entra fuera de ese cono no se
propaga.

Valores típicos: monomodo NA ≈ 0,12-0,14; multimodo 50 µm NA ≈ 0,20;
multimodo 62,5 µm NA ≈ 0,275.

**Consecuencia práctica:** unir una fibra de NA/núcleo grande a una de
NA/núcleo chico pierde mucha luz (62,5 → 50 µm cuesta del orden de
2-3 dB), mientras que en el sentido inverso la pérdida es baja. **Nunca
mezclar tipos de fibra en un enlace.**

## 4. Modos

Un "modo" es un camino permitido de propagación.

- **Multimodo**: núcleo grande, muchos caminos posibles. Los rayos que
  rebotan más recorren más distancia y llegan después → el pulso se
  ensancha (**dispersión modal**), que es el límite de distancia del
  multimodo.
- **Monomodo**: núcleo tan chico que solo un modo se propaga a la
  longitud de onda de trabajo. Sin dispersión modal → distancias mucho
  mayores.

La frontera la marca la **longitud de onda de corte** (~1260 nm en
G.652): por debajo de ella, una fibra monomodo se comporta como multimodo.
Por eso no se usa 850 nm en fibra monomodo.

En multimodo, el perfil **de índice gradual** (*graded index*) hace que
los rayos externos viajen por vidrio de índice menor —más rápido— y
compensen su camino más largo. Es lo que permitió pasar de decenas de
metros a cientos.

## 5. Atenuación: por qué se pierde luz

| Causa | Naturaleza | Cómo se controla |
|---|---|---|
| **Dispersión de Rayleigh** | Fluctuaciones microscópicas de densidad del vidrio; ∝ 1/λ⁴ | Intrínseca. Explica por qué 1550 nm atenúa menos que 1310 |
| **Absorción por impurezas** | Iones OH⁻ (agua) → pico en 1383 nm | Fibras *low water peak* (G.652.D) |
| **Absorción infrarroja** | Del propio SiO₂, crece sobre 1600 nm | Intrínseca |
| **Macrocurvatura** | Radio de curvatura pequeño | Respetar radio mínimo (clase 10) |
| **Microcurvatura** | Presión puntual: amarre apretado, cable aplastado | Instalación cuidadosa |
| **Empalmes y conectores** | Desalineación, suciedad, aire | Fusión bien hecha, limpieza |

### Curva de atenuación y ventanas

| Ventana | λ | Atenuación típica | Uso |
|---|---|---|---|
| 1ª | 850 nm | 3,0 dB/km (MMF) | Multimodo, corto alcance, VCSEL barato |
| 2ª | 1300-1310 nm | 0,33-0,35 dB/km (SMF), 1,0-1,5 (MMF) | Monomodo estándar, LAN |
| 3ª | 1550 nm | **0,19-0,22 dB/km (SMF)** | Largas distancias, DWDM, amplificable con EDFA |

Valores de referencia para cálculos de aula (máximos de norma habituales
en fibra nueva instalada):

- **SMF: 0,35 dB/km @1310 nm, 0,25 dB/km @1550 nm** (TIA-568 admite hasta
  0,5/0,5 en planta interior).
- **MMF: 3,5 dB/km @850 nm, 1,5 dB/km @1300 nm**.

## 6. dB, dBm y aritmética de campo

**Decibelio (dB) — relación entre dos potencias:**

```
dB = 10 · log₁₀ (P_salida / P_entrada)
```

**dBm — potencia absoluta referida a 1 mW:**

```
dBm = 10 · log₁₀ (P / 1 mW)
```

Tabla que hay que saber de memoria:

| dB | Factor de potencia | | dBm | Potencia |
|---|---|---|---|---|
| 0 dB | ×1 (100 %) | | +10 dBm | 10 mW |
| **3 dB** | ×2 / ÷2 (50 %) | | **0 dBm** | **1 mW** |
| 6 dB | ×4 (25 %) | | −3 dBm | 0,5 mW |
| **10 dB** | ×10 (10 %) | | −10 dBm | 100 µW |
| 20 dB | ×100 (1 %) | | −20 dBm | 10 µW |
| 30 dB | ×1000 (0,1 %) | | −30 dBm | 1 µW |

Reglas de trabajo:

- **Los dB se suman; los mW se multiplican.** Un enlace con 2 conectores
  de 0,3 dB, un empalme de 0,05 y 4 km a 0,35 dB/km pierde
  0,6 + 0,05 + 1,4 = **2,05 dB**.
- **dBm − dBm = dB** (potencia menos potencia = pérdida).
- **dBm − dB = dBm** (potencia menos pérdida = potencia).
- **dBm + dBm no significa nada.** Error clásico en exámenes.

Ejemplo completo: un transmisor de **−3 dBm**, un enlace que pierde
**2,05 dB** → llega **−5,05 dBm**. Si el receptor tiene sensibilidad
**−20 dBm**, sobran **14,95 dB de margen**.

## 7. Dispersión: el otro límite

La atenuación limita *cuánta* luz llega; la dispersión limita *cuán
rápido* se puede modular.

| Tipo | Dónde | Efecto | Mitigación |
|---|---|---|---|
| **Modal** | Solo multimodo | Ensancha el pulso; define el ancho de banda modal (EMB) | Índice gradual, OM3/OM4/OM5, distancias cortas |
| **Cromática** | Sobre todo monomodo a alta velocidad | Cada λ viaja a distinta velocidad; el pulso se ensancha | Láser de línea angosta (DFB), fibra NZ-DSF, compensadores |
| **PMD** | Monomodo a ≥10 Gbps y larga distancia | Asimetría del núcleo separa las polarizaciones | Fibra moderna de baja PMD, DSP en el transceptor |

En una LAN de campus (≤ 2 km) la dispersión no es el límite: manda la
atenuación. En un enlace de 80 km a 10 Gbps sí hay que mirarla.

## Laboratorio 5 — Aritmética óptica y demostración visual

**Materiales:** fuente láser/LED calibrada, medidor de potencia óptica,
carrete de fibra de al menos 1 km, VFL (láser rojo visible), calculadora.

**Parte A — Ver la reflexión total interna**
1. Con el VFL conectado a un latiguillo, observar (sin mirar de frente)
   cómo la luz sale solo por el extremo, no por los lados.
2. Enrollar el latiguillo en un lápiz (radio ≈ 4 mm) y observar el
   resplandor rojo en la curva: es luz que abandonó el núcleo.
3. Comparar con un enrollado de radio 15 cm.

**Parte B — Medir en dB**
1. Medir la potencia de la fuente con un latiguillo de referencia:
   anotar `P_ref` en dBm.
2. Insertar el carrete de 1 km y medir de nuevo: `P_medida`.
3. Calcular la pérdida = `P_ref − P_medida` en dB y dividir por la
   longitud → dB/km. Comparar con el valor esperado para la ventana
   usada.
4. Repetir en 1310 y 1550 nm. Explicar por qué 1550 pierde menos.

**Parte C — Ejercicios de papel**
1. Un transmisor de 1 mW (0 dBm), enlace de 12 dB de pérdida: ¿qué
   potencia llega en dBm y en µW?
2. Calcular NA y θmax para n₁ = 1,48 y n₂ = 1,46.
3. ¿Cuántos km de fibra a 0,22 dB/km equivalen a la pérdida de un
   splitter 1:8 (≈10,5 dB)?

## Errores comunes

1. Sumar dBm entre sí.
2. Usar la atenuación de 1550 nm para calcular un enlace que opera en
   1310 nm.
3. Suponer que la fibra "no pierde nada" porque es vidrio: 20 km a
   0,22 dB/km son 4,4 dB, más de la mitad de la potencia por dos veces.
4. Enrollar fibra sobrante en radios pequeños dentro de una bandeja.
5. Mezclar 62,5 µm y 50 µm en el mismo enlace.

## Preguntas de repaso

1. Si la potencia recibida cae a la mitad, ¿cuántos dB se perdieron?
2. ¿Por qué el pico de agua en 1383 nm importaba antes y ya casi no?
3. ¿Cuál es el límite dominante de un enlace multimodo de 300 m a
   10 Gbps: atenuación o dispersión?
4. Una fibra tiene NA = 0,20. ¿Cuál es el semiángulo de su cono de
   aceptación?
