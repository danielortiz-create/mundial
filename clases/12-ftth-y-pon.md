# Clase 12 — FTTH y redes ópticas pasivas (PON)

**Duración:** 3 h (1,5 h teoría / 1,5 h taller)
**Prerrequisitos:** clases 06-09, 11

## Objetivos

- Describir la arquitectura de una red FTTH: OLT, ODN, splitters, ONT.
- Calcular el presupuesto de una red GPON con relación de división 1:32
  y decidir dónde ubicar los splitters.
- Diferenciar GPON, XGS-PON y Ethernet punto a punto, con criterios de
  cuándo usar cada una.
- Medir y diagnosticar una red PON sin interrumpir el servicio.

## Por qué importa

FTTH es hoy el mayor consumidor de fibra del mundo y donde trabaja la
mayoría de las cuadrillas. Su diseño invierte la lógica del enlace punto
a punto: el presupuesto óptico ya no lo domina la distancia, sino **el
splitter**.

## 1. Arquitectura

```
        ┌──────┐   Feeder      ┌─────────┐  Distribución   ┌─────┐  Drop   ┌─────┐
        │ OLT  │══════════════▶│ Splitter│═══════════════▶ │ NAP │═══════▶│ ONT │
        │(nodo)│   1 fibra     │  1:32   │   32 fibras     │caja │        │casa │
        └──────┘               └─────────┘                 └─────┘        └─────┘
                          ← Red óptica pasiva (ODN): sin electrónica ni energía →
```

| Elemento | Función |
|---|---|
| **OLT** (*Optical Line Terminal*) | Equipo del operador en el nodo. Un puerto PON alimenta 32-128 abonados |
| **ODN** (*Optical Distribution Network*) | Toda la planta pasiva: fibra, splitters, cajas, conectores |
| **Feeder** | Del OLT al primer punto de división |
| **Splitter** | Divisor óptico pasivo 1:N |
| **NAP / caja terminal** | Punto de acceso a la red donde se conectan las acometidas |
| **Drop** | Acometida hasta la vivienda (cable G.657, 1-2 fibras) |
| **ONT / ONU** | Equipo en casa del abonado |

**"Pasiva" significa sin alimentación eléctrica entre el OLT y el
abonado.** Ese es todo el modelo de negocio: nada que alimentar, nada
que fallar, nada que mantener en la calle. El precio que se paga es el
presupuesto óptico consumido por el splitter.

## 2. Tecnologías PON

| | **GPON** (ITU-T G.984) | **XGS-PON** (G.9807.1) | **NG-PON2** (G.989) |
|---|---|---|---|
| Bajada | 2,488 Gbps | 9,953 Gbps | 4×10 Gbps (TWDM) |
| Subida | 1,244 Gbps | 9,953 Gbps | 4×10 Gbps |
| λ bajada | **1490 nm** | 1577 nm | Banda sintonizable |
| λ subida | **1310 nm** | 1270 nm | Banda sintonizable |
| Video RF (opcional) | 1550 nm | 1550 nm | 1550 nm |
| Convivencia | — | **Coexiste con GPON en la misma ODN** (λ distintas) | Coexiste |

Que XGS-PON use longitudes de onda distintas es la clave operativa: un
operador con GPON instalado **migra abonados a 10 G sin tocar la planta**,
agregando un multiplexor de coexistencia en el nodo.

El ancho de banda es **compartido**: 2,488 Gbps de bajada entre 32
abonados. El OLT reparte con DBA (asignación dinámica) en bajada por
difusión y en subida por **TDMA** (a cada ONT se le asigna una ventana de
tiempo). Por eso el operador vende 300 o 500 Mbps sobre GPON: la
sobresuscripción es el modelo, y el diseño consiste en elegir la relación
de división correcta para el perfil de tráfico.

En bajada, **todas las ONT reciben todas las tramas** — la privacidad se
consigue cifrando con AES la información de cada ONT.

## 3. El splitter y su costo en dB

| División | Pérdida típica de inserción |
|---|---|
| 1:2 | 3,6 dB |
| 1:4 | 7,3 dB |
| 1:8 | 10,5 dB |
| 1:16 | 13,7 dB |
| **1:32** | **17,0 dB** |
| 1:64 | 20,5 dB |

Regla mental: **cada duplicación cuesta ~3,5 dB** (3 dB por física, el
resto por pérdidas del componente).

### Clases de presupuesto (GPON, G.984.2)

| Clase | Presupuesto |
|---|---|
| B+ | **28 dB** |
| C+ | **32 dB** |
| C++ | 35 dB |

XGS-PON define N1 (29 dB), N2 (31 dB) y E1 (33 dB).

**Con clase B+ y 1:32, quedan 11 dB para todo lo demás.** Ese es el
número que gobierna el diseño de una FTTH.

## 4. Ejemplo de presupuesto FTTH

**Escenario:** GPON clase B+ (28 dB), división centralizada 1:32,
15 km de feeder + 0,8 km de distribución + 60 m de drop.

Se calcula en la **peor longitud de onda**, que es 1310 nm (subida):
0,35 dB/km.

| Elemento | Cantidad | dB c/u | Total |
|---|---|---|---|
| Fibra feeder | 15 km | 0,35 | 5,25 |
| Fibra distribución | 0,8 km | 0,35 | 0,28 |
| Fibra drop | 0,06 km | 0,35 | 0,02 |
| **Splitter 1:32** | 1 | 17,0 | **17,00** |
| Pares de conectores (ODF, splitter ×2, NAP, ONT) | 5 | 0,30 | 1,50 |
| Empalmes por fusión | 6 | 0,10 | 0,60 |
| **Pérdida total** | | | **24,65 dB** |

**Margen = 28 − 24,65 = 3,35 dB.** Aceptable (≥ 3 dB), pero sin espacio
para agregar un splitter en cascada ni alargar el feeder. Alternativas si
el margen no alcanza:

1. Pasar a **clase C+ (32 dB)**: +4 dB, es la solución más común hoy.
2. Reducir la división a 1:16 (ahorra 3,3 dB) y duplicar puertos PON.
3. Acortar el feeder acercando el OLT (nodo distribuido).
4. Reducir conectores y empalmes: cada par de conectores son 0,3 dB.

### División centralizada vs en cascada

| | Centralizada (un 1:32 en el nodo) | En cascada (1:4 y luego 1:8) |
|---|---|---|
| Pérdida total | Menor (17,0 dB) | Mayor (7,3 + 10,5 = 17,8 dB, más conectores) |
| Fibra de distribución | Mucha | Poca |
| Flexibilidad para densificar | Baja | **Alta**: se llenan zonas a medida que crecen |
| Diagnóstico | Más simple | Más complejo |
| Costo de obra | Más fibra | Menos fibra |

En zonas urbanas densas suele ganar la cascada (menos fibra tendida); en
zonas dispersas o con muchos abonados por punto, la centralizada.

## 5. Medir y diagnosticar una red PON

La PON tiene tres particularidades que rompen los métodos de la clase 9:

1. **El splitter no es bidireccional simétrico**: un OTDR desde el lado
   del OLT ve el splitter como un evento enorme y **todas las ramas
   superpuestas**. No sirve para diagnosticar una rama.
2. **Hay tráfico en varias longitudes de onda simultáneamente.**
3. **La red está en servicio**: no se puede apagar para medir.

Herramientas correctas:

| Herramienta | Uso |
|---|---|
| **Medidor de potencia PON (pass-through)** | Se intercala entre ONT y red y mide **por separado** 1310 (subida), 1490 (bajada) y 1550 (video), con el servicio activo. Es *la* herramienta de la cuadrilla FTTH |
| **OTDR desde el lado del abonado** | Mide la rama concreta pasando el splitter hacia el OLT. El sentido correcto para buscar la falla de un cliente |
| **OTDR en 1625/1650 nm + filtro** | Longitud de onda **fuera de banda**: permite medir con el servicio activo sin interferir. Requiere filtro WDM en el OLT |
| **Estado del ONT / OLT** | El OLT reporta la potencia recibida de cada ONT: es telemetría gratis y continua |
| **VFL** | Solo para el tramo drop; se pierde en el splitter |

### Valores de referencia en la ONT

| Rx en la ONT | Estado |
|---|---|
| −8 a −22 dBm | Normal (rango típico de operación) |
| −23 a −27 dBm | Marginal, investigar |
| < −28 dBm | Fuera de presupuesto: fibra dañada, conector sucio o splitter equivocado |
| > −8 dBm | Demasiado cerca del OLT: posible saturación |

Estos rangos dependen de la clase del equipo; se toma el de la hoja de
datos del ONT. La causa número uno de "Rx bajo" en FTTH sigue siendo
**el conector sucio o mal insertado en el domicilio del abonado**.

## 6. PON vs Ethernet punto a punto

| | PON | Ethernet activo P2P |
|---|---|---|
| Fibra por abonado | Compartida | **Dedicada** |
| Ancho de banda | Compartido | Dedicado y simétrico |
| Equipos en la calle | Ninguno | Switch (necesita energía) |
| Costo por abonado | Menor | Mayor |
| Uso típico | Residencial masivo | Empresa, backhaul móvil, servicios con SLA |

Un cliente corporativo con SLA de ancho de banda garantizado no va sobre
GPON compartido: va sobre fibra dedicada o sobre una λ propia.

## Laboratorio 12 — Diseñar y medir una PON

**Materiales:** maqueta con OLT (o simulador), splitters 1:8 y 1:4,
carretes de fibra, ONT, medidor PON pass-through, medidor de potencia.

1. **Medir el splitter**: con fuente y medidor, medir la pérdida real de
   cada salida de un 1:8. Comparar con los 10,5 dB de tabla y observar el
   desbalance entre puertos.
2. **Armar la ODN** de la maqueta: feeder → splitter 1:4 → splitter 1:8
   (cascada) → ONT. Calcular el presupuesto antes de medir, medir
   después y comparar.
3. **Medir con el medidor PON** en el domicilio simulado: registrar
   1490 nm (bajada) y 1310 nm (subida) con el servicio activo.
4. **Sembrar una falla**: conector sucio en el drop. Ver la caída en el
   Rx del ONT y en la telemetría del OLT. Limpiar y verificar
   recuperación.
5. **Taller de diseño**: dado un barrio de 480 viviendas y un nodo a
   12 km, decidir clase de presupuesto, relación de división, ubicación
   de splitters y cantidad de puertos PON. Entregar el presupuesto
   óptico del abonado más lejano y del más cercano.

**Entregable:** el diseño del punto 5 con sus dos presupuestos ópticos y
la planilla de mediciones de los puntos 1-4.

## Errores comunes

1. Diseñar con 1:64 y clase B+: no cierra el presupuesto salvo en
   distancias muy cortas.
2. Olvidar que el cálculo se hace en **1310 nm** (subida), que atenúa
   más.
3. Usar un OTDR desde el OLT para diagnosticar la queja de un abonado.
4. Medir con un OTDR de 1550 nm en una red en servicio sin filtro:
   interfiere con el video RF.
5. Mezclar UPC y APC en la ODN: en FTTH casi todo es **APC**.
6. No documentar qué puerto del splitter corresponde a qué abonado.
7. Suponer que el problema es la red cuando la potencia en la ONT es
   normal: si Rx está en rango, la falla es del ONT, del router o del
   servicio.

## Preguntas de repaso

1. ¿Cuántos dB cuesta un 1:32 y cuánto queda de un presupuesto B+?
2. ¿Por qué XGS-PON puede convivir con GPON en la misma fibra?
3. Un abonado reporta lentitud; su ONT marca Rx = −25 dBm. ¿Por dónde se
   empieza?
4. ¿En qué dirección se debe medir con OTDR para diagnosticar una rama y
   por qué?
