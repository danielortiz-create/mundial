# Clase 09 — Medición y certificación (Tier 1 y Tier 2)

**Duración:** 3 h (1 h teoría / 2 h laboratorio)
**Prerrequisitos:** clases 05-08

## Objetivos

- Ejecutar una certificación **Tier 1** con fuente y medidor, con la
  referencia correcta, y saber por qué el método de referencia cambia el
  resultado.
- Configurar un **OTDR** (longitud de onda, ancho de pulso, rango,
  promediado, IOR) e interpretar su traza.
- Distinguir en una traza: conector, empalme, curvatura, fibra rota,
  evento fantasma y ganancia aparente.
- Emitir el informe de certificación que se entrega al cliente.

## Por qué importa

Un enlace sin certificar es un enlace sin garantía. Y una certificación
mal hecha —referencia tomada con el latiguillo equivocado, OTDR con
pulso de 10 µs en un enlace de 200 m— produce números que parecen
válidos y no lo son.

## 1. Los dos niveles de certificación

| | **Tier 1** (básica) | **Tier 2** (extendida) |
|---|---|---|
| Equipo | OLTS: fuente + medidor de potencia | OTDR |
| Qué da | **Pérdida total** del enlace, longitud, polaridad | **Traza**: pérdida y ubicación de **cada evento** |
| Analogía | La báscula: el peso total | La radiografía: qué hay dentro |
| Obligatoriedad | Requerida para garantía de fabricante | Recomendada; obligatoria en planta externa y en contratos serios |
| Norma | TIA-526-14 (MMF), TIA-526-7 (SMF) | TIA-568 / IEC 61280-4-1 y -4-2 |

Regla profesional: **Tier 1 dice si el enlace pasa; Tier 2 dice por qué
no pasa.** Se hacen las dos.

## 2. Tier 1 — Fuente y medidor de potencia

Es la **medición de verdad** de la pérdida de inserción: mide lo que
realmente llega de extremo a extremo, incluidos los conectores de los
extremos.

### El procedimiento y la trampa de la referencia

1. Encender fuente y medidor **20 minutos antes** (estabilización
   térmica del láser).
2. Seleccionar la longitud de onda correcta: **850 y 1300 nm** en
   multimodo, **1310 y 1550 nm** en monomodo. Se certifica en **ambas**
   longitudes de onda: una curvatura pierde mucho más en 1550 que en
   1310, y esa diferencia es el indicio.
3. Inspeccionar y limpiar todos los ferrules.
4. **Tomar la referencia** con latiguillos de referencia (de calidad
   conocida, guardados aparte, con su propio estuche).
5. Poner el medidor en modo dB y verificar que marca ~0,00 dB.
6. **Sin desconectar la fuente del latiguillo de referencia**, insertar
   el enlace bajo prueba y leer la pérdida.
7. Repetir en el otro sentido (bidireccional) y en ambas longitudes de
   onda.

**Métodos de referencia (TIA-526-14):**

| Método | Latiguillos en la referencia | Qué incluye la medida |
|---|---|---|
| **1 latiguillo** (recomendado) | 1 | Los dos conectores extremos del enlace |
| 2 latiguillos | 2 | Solo un conector extremo |
| 3 latiguillos | 3 | Ninguno de los conectores extremos |

Con el mismo enlace, el método de 1 latiguillo da un valor **mayor** —y
es el correcto para certificar un enlace que se va a conectar a equipos.
Por eso **el informe debe declarar el método usado**: sin eso, el número
no es comparable.

**Otra sutileza (solo multimodo):** las condiciones de lanzamiento
importan. Un LED que llena todos los modos mide más pérdida que una
fuente restringida. Las normas actuales exigen fuentes con **flujo
circular controlado (*encircled flux*, IEC 61280-4-1)** para que dos
técnicos con equipos distintos obtengan el mismo número.

### Criterio de aceptación

Pérdida medida ≤ pérdida máxima calculada en el presupuesto (clase 8),
usando los máximos de norma. Los certificadores modernos aceptan cargar
el "límite de norma" y devuelven PASS/FAIL con el margen.

## 3. Tier 2 — OTDR

### Cómo funciona

El OTDR envía un pulso de luz y mide lo que **vuelve** por dos
mecanismos:

- **Retrodispersión de Rayleigh**: una fracción minúscula de la luz se
  dispersa hacia atrás continuamente a lo largo de la fibra. Da la
  **pendiente** de la traza (la atenuación por km).
- **Reflexión de Fresnel**: en cada discontinuidad de índice (conector,
  extremo de fibra, rotura) vuelve un pico. Da los **picos**.

Como todo se mide desde un solo extremo, el OTDR también calcula
distancias a partir del tiempo de vuelo. **Es una estimación
sofisticada, no la medición directa de pérdida**: por eso no reemplaza al
Tier 1.

### Parámetros de configuración

| Parámetro | Efecto | Cómo elegirlo |
|---|---|---|
| **Longitud de onda** | 1310 detecta mejor eventos; 1550 detecta mejor curvaturas | Medir en ambas y comparar |
| **Ancho de pulso** | Pulso corto = mejor resolución, menos alcance. Pulso largo = más alcance, zonas muertas más grandes | Corto (5-30 ns) en enlaces de campus; largo (1-20 µs) en decenas de km |
| **Rango de distancia** | Ventana de medición | ~1,5-2× la longitud esperada |
| **Tiempo de promediado** | Más tiempo = menos ruido | 30 s para revisar, 1-3 min para certificar |
| **IOR** (índice de refracción) | **Convierte tiempo en distancia** | El del fabricante de la fibra (≈1,4675 en SMF @1310). Un IOR mal puesto desplaza todas las distancias |
| **Coef. de retrodispersión** | Afecta el cálculo de reflectancia | El de la fibra |

### Zonas muertas

Tras un evento reflectivo el detector queda saturado un instante:

- **Zona muerta de evento** (~0,5-2 m): distancia mínima para
  **distinguir** dos eventos.
- **Zona muerta de atenuación** (~3-10 m): distancia mínima para **medir
  la pérdida** de un evento.

Por eso **el conector del extremo cercano cae dentro de la zona muerta y
no se puede medir**. Solución obligatoria:

- **Fibra de lanzamiento** (*launch cord*, 150 m-1 km): desplaza el
  primer conector fuera de la zona muerta → el conector del extremo A
  queda medible.
- **Fibra de recepción** (*receive/tail cord*): hace lo mismo con el
  conector del extremo B.

Certificar sin fibra de lanzamiento deja los dos conectores más
importantes del enlace sin medir.

### Leer la traza

```
dB
 │╲ ┌── pico: conector (reflectivo, con pérdida)
 │ ╲│╲
 │   ╲ ╲___ caída sin pico: empalme por fusión o curvatura
 │       ╲╲
 │         ╲╲___ pendiente = atenuación de la fibra (dB/km)
 │             ╲│
 │              │╲___ pico final + caída al ruido: fin de fibra
 └──────────────────────────────────── distancia
```

| Lo que se ve | Qué es |
|---|---|
| Pico + escalón de pérdida | **Conector** o empalme mecánico |
| Escalón de pérdida **sin** pico | **Empalme por fusión** o **macrocurvatura** |
| Escalón que empeora mucho en 1550 vs 1310 | **Curvatura** (casi seguro) |
| Pendiente constante | Atenuación normal de la fibra |
| Pico grande y caída al ruido | **Fin de fibra o rotura** |
| Pico repetido a distancia múltiplo | **Evento fantasma** (eco de un reflejo fuerte) |
| Escalón "hacia arriba" (ganancia) | **Ganancia aparente**: dos fibras con distinto coeficiente de retrodispersión |

**Ganancia aparente:** un empalme no puede amplificar. Si aparece
ganancia, la pérdida real se obtiene **midiendo en los dos sentidos y
promediando**:

```
Pérdida real = (pérdida A→B + pérdida B→A) / 2
```

La medición bidireccional no es un lujo: es el único modo de tener el
valor correcto de cada empalme entre fibras distintas.

**Eventos fantasma:** aparecen a distancias que son múltiplos exactos de
un evento reflectivo fuerte, y **no muestran pérdida** asociada. Suelen
desaparecer bajando el ancho de pulso o mejorando el conector culpable.

## 4. Otras herramientas

| Herramienta | Uso | Límite |
|---|---|---|
| **VFL** (láser rojo 650 nm) | Continuidad, ubicar rotura en los primeros ~5 km, verificar polaridad, ver una fibra mal empalmada en la bandeja | Solo alcance corto; no mide nada |
| **Identificador de fibra** | Detectar tráfico y sentido sin desconectar, doblando la fibra | Introduce algo de pérdida |
| **Medidor de potencia en servicio** | Ver la potencia real de un enlace activo (o leer el DDM del SFP, clase 11) | — |
| **Microscopio de inspección** | Ver el ferrule (clase 7) | — |
| **Localizador de fallas por curvatura** | Ubicar macrocurvaturas | — |

## 5. El informe de certificación

Debe contener, por fibra:

1. Identificación de la fibra (cable, tubo, color, extremos, ID TIA-606).
2. Fecha, técnico, modelo y **número de serie** de los instrumentos, y
   fecha de su última calibración.
3. Método de referencia usado (1, 2 o 3 latiguillos).
4. Longitudes de onda medidas y pérdida en cada una, **en ambos sentidos**.
5. Longitud medida.
6. Límite aplicado y resultado PASS/FAIL con margen.
7. Traza OTDR y tabla de eventos (Tier 2), en formato nativo `.sor`
   además del PDF: el `.sor` permite reanalizar en el futuro.
8. Fotos de inspección de los conectores extremos (cada vez más exigido).

Se entrega en digital, con un archivo por fibra y un resumen ejecutivo
con la lista de enlaces y su resultado.

## Laboratorio 9 — Certificar de verdad

**Materiales:** OLTS (fuente + medidor), OTDR con fibra de lanzamiento y
de recepción, enlace de prácticas de al menos 2 km con 2 empalmes y 2
paneles, latiguillos de referencia, atenuador variable o mandril.

**Parte A — Tier 1**
1. Tomar referencia por el método de 1 latiguillo. Medir el enlace en
   1310 y 1550 nm, en los dos sentidos. Anotar los 4 valores.
2. Volver a referenciar por el método de 3 latiguillos y repetir.
   Comparar y explicar la diferencia en dB.
3. Comparar el resultado contra el presupuesto calculado en la clase 8.

**Parte B — Tier 2**
1. Medir **sin** fibra de lanzamiento. Observar que el primer conector no
   es medible.
2. Repetir **con** fibra de lanzamiento y de recepción. Comparar tablas
   de eventos.
3. Variar el ancho de pulso (mínimo, medio, máximo) sobre el mismo
   enlace y comparar: cuántos eventos se distinguen y qué tan grandes son
   las zonas muertas.
4. Medir en los dos sentidos y promediar la pérdida de cada empalme.

**Parte C — Sembrar defectos**
1. Enrollar la fibra en un mandril de radio pequeño (5-10 vueltas).
   Medir en 1310 y 1550: la curvatura debe verse claramente peor en
   1550.
2. Ensuciar deliberadamente un conector (con material de descarte) y
   volver a certificar. Limpiar y repetir.
3. Insertar un atenuador de 5 dB y verificar que aparece como evento no
   reflectivo con la pérdida esperada.

**Entregable:** informe de certificación completo de una fibra, con los
puntos 1-8 de la sección 5, incluyendo las trazas antes y después de los
defectos sembrados.

## Errores comunes

1. Certificar solo en una longitud de onda: se pierden las curvaturas.
2. Tomar la referencia y luego desconectar el latiguillo del lado de la
   fuente: la referencia queda inválida y hay que repetirla.
3. Usar latiguillos de referencia dañados. Se inspeccionan y se cambian
   periódicamente; son consumibles.
4. OTDR sin fibra de lanzamiento.
5. IOR por defecto en vez del de la fibra: los eventos aparecen
   desplazados decenas de metros y el técnico busca donde no es.
6. Aceptar una "ganancia" en un empalme sin medir bidireccional.
7. Entregar solo el PDF sin los archivos `.sor`.
8. Reportar la estimación de la fusionadora como si fuera certificación.

## Preguntas de repaso

1. ¿Por qué el método de 1 latiguillo da más pérdida que el de 3, y cuál
   se usa para certificar un enlace de usuario?
2. Se ve un escalón de 0,4 dB en 1310 nm y de 1,9 dB en 1550 nm en el
   mismo punto. ¿Qué es y cómo se corrige?
3. ¿Para qué sirve la fibra de lanzamiento y qué pasa si no se usa?
4. En la traza aparece un pico a 4 km y otro idéntico a 8 km, pero el
   enlace mide 5 km. ¿Qué es el segundo?
