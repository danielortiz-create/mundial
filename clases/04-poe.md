# Clase 04 — PoE: alimentación por Ethernet

**Duración:** 3 h (1,5 h teoría / 1,5 h laboratorio)
**Prerrequisitos:** clase 03

## Objetivos

- Distinguir 802.3af, at y bt con sus potencias exactas en PSE y en PD.
- Calcular el presupuesto de potencia de un switch y decidir cuántos
  dispositivos soporta.
- Explicar la negociación (detección, clasificación, alimentación) y por
  qué un PD no arranca.
- Dimensionar el cable y la disipación térmica para PoE de alta potencia.

## Por qué importa

Cámaras IP, teléfonos, puntos de acceso Wi-Fi, controles de acceso y hasta
iluminación LED se alimentan hoy por el mismo cable de datos. Un
presupuesto de PoE mal calculado deja la mitad de las cámaras apagadas al
mes siguiente, cuando alguien agrega dos equipos más al switch.

## 1. Roles y estándares

- **PSE** (*Power Sourcing Equipment*): quien entrega la potencia — un
  switch PoE (*endspan*) o un inyector intermedio (*midspan*).
- **PD** (*Powered Device*): quien la consume — cámara, AP, teléfono.

| Estándar | Nombre | Tipo | Pares usados | Potencia en PSE | Potencia garantizada en PD |
|---|---|---|---|---|---|
| 802.3af (2003) | PoE | Type 1 | 2 | 15,4 W | **12,95 W** |
| 802.3at (2009) | PoE+ | Type 2 | 2 | 30 W | **25,5 W** |
| 802.3bt (2018) | PoE++ / 4PPoE | Type 3 | 4 | 60 W | **51 W** |
| 802.3bt (2018) | PoE++ / HDBaseT | Type 4 | 4 | 90 W | **71,3 W** |

**La diferencia entre las dos columnas de potencia es la pérdida en los
100 m de cable.** Se dimensiona siempre por la columna del PD: un switch
"30 W por puerto" alimenta un PD de 25,5 W, no de 30 W.

Datos eléctricos: tensión de 44 a 57 V DC (nominal 48 V/54 V), corriente
máxima 600 mA por par en Type 3/4. Clases de potencia 0-8.

### Modos A y B

- **Modo A**: potencia sobre los pares de datos 1-2 y 3-6.
- **Modo B**: potencia sobre los pares 4-5 y 7-8 (libres en 10/100).
- **4 pares (802.3bt)**: los cuatro pares llevan potencia.

Un PD conforme acepta ambos modos. La transmisión de datos no se ve
afectada porque la corriente va en **modo común** sobre el par, y el
transformador del puerto solo ve la diferencia.

## 2. Cómo arranca un PD (la secuencia)

1. **Detección**: el PSE aplica 2,8-10 V y busca la firma de
   **25 kΩ** del PD. Sin esa resistencia, no entrega potencia (por eso
   PoE no quema un PC conectado por error).
2. **Clasificación**: mide la corriente que consume el PD para saber su
   clase (0-8) y reservar el presupuesto correspondiente. En 802.3bt la
   clasificación es por pulsos y permite renegociar.
3. **Arranque**: sube a 48-54 V. El PD tiene un tiempo máximo para
   estabilizarse.
4. **Operación y monitoreo**: si el PD desaparece (*Maintain Power
   Signature*), el PSE corta en menos de 400 ms.

Si un equipo no enciende, la pregunta correcta es **en qué paso se
detiene**: `show power inline` en el switch dice si detectó, clasificó y
está entregando, y cuánto.

### LLDP-MED

Además de la clasificación por hardware, PSE y PD pueden negociar
potencia por software con LLDP-MED, con granularidad de 0,1 W. Un AP
puede así pedir 22,4 W exactos en vez de reservar los 30 W de su clase.
Si LLDP está deshabilitado en el switch, algunos AP arrancan en modo
degradado (apagan una radio o el puerto USB) — falla frecuente y difícil
de ver.

## 3. Presupuesto de potencia del switch

Un switch de 48 puertos "PoE+" rara vez entrega 48 × 30 W = 1440 W. Trae
una fuente de, por ejemplo, **740 W de presupuesto PoE**.

Ejemplo de cálculo:

| Equipo | Cantidad | Potencia real del PD | Total |
|---|---|---|---|
| Cámara fija clase 3 | 20 | 8 W | 160 W |
| Cámara PTZ con calefactor clase 4 | 6 | 25,5 W | 153 W |
| AP Wi-Fi 6 clase 4 | 10 | 22 W | 220 W |
| Teléfono IP clase 2 | 12 | 6,5 W | 78 W |
| **Total demandado** | | | **611 W** |

Contra un presupuesto de 740 W queda **129 W de margen (17 %)**. Criterios:

- Trabajar como máximo al **80 %** del presupuesto en operación normal.
- Sumar por la potencia **real del PD** (hoja de datos), no por la clase,
  cuando el equipo negocia por LLDP.
- Si hay fuente redundante, verificar si el presupuesto PoE **se
  mantiene** al perder una fuente: en muchos modelos cae a la mitad.
- Prever crecimiento: 20-30 % de puertos libres alimentables.

## 4. Cable, calor y distancia

- **Distancia**: los 100 m de Ethernet siguen aplicando. La caída de
  tensión ya está contemplada en la diferencia PSE↔PD de la tabla.
- **Calibre**: 23 AWG disipa mejor que 24 AWG. Para Type 3/4 se
  recomienda Cat6A de 23 AWG.
- **Calentamiento en mazos**: la corriente calienta el mazo entero. Con
  Type 4 y 48 cables juntos la temperatura puede subir **más de 10 °C**
  en el centro del mazo, y la atenuación del cobre sube con la
  temperatura, reduciendo la distancia útil. Mitigación: mazos de máximo
  24 cables, cable de 23 AWG, bandeja ventilada.
- **CCA está descartado**: mayor resistencia → más caída, más calor,
  riesgo real de incendio.
- **Desconexión bajo carga**: desconectar un patch cord con 71 W activos
  genera un arco que pica los contactos del jack. Existen conectores
  clasificados para ello; en la práctica, deshabilitar el puerto antes de
  desconectar equipos Type 4.

## 5. Lo que no es PoE estándar

- **PoE pasivo** (24 V en muchos equipos de exteriores): inyecta tensión
  sin detección ni negociación. Si se conecta a un equipo que no lo
  espera, **lo quema**. Nunca mezclar en un patch panel sin etiquetar.
- **Inyectores propietarios** anteriores a 802.3af.
- **PoE reverso** y alimentación por el uplink: casos de nicho.

Regla: etiquetar en color todo puerto con PoE pasivo y documentarlo.

## Laboratorio 4 — Medir y presupuestar

**Materiales:** switch PoE administrable, una cámara IP y un AP PoE,
inyector PoE+, multímetro, probador PoE (opcional), cable de 90 m.

1. Conectar el AP y ejecutar en el switch `show power inline` (o
   equivalente): anotar clase detectada, potencia asignada y potencia
   consumida real. Comparar con la hoja de datos.
2. Deshabilitar LLDP en el puerto y repetir. ¿Cambió la potencia
   asignada? ¿Cambió el comportamiento del AP?
3. Medir la tensión en el extremo del PD con un cable corto y con el de
   90 m. Calcular la caída.
4. Con la hoja de datos del switch, armar la tabla de presupuesto para un
   proyecto de 20 cámaras + 8 AP y determinar si un solo switch alcanza.
5. Provocar la sobresuscripción: conectar PDs hasta pasar el presupuesto
   y observar qué política aplica el switch (denegar el último puerto o
   apagar por prioridad).

**Entregable:** tabla de presupuesto del punto 4 y captura de `show power
inline` antes/después del punto 5.

## Errores comunes

1. Presupuestar por la potencia del PSE (30 W) en vez de la del PD
   (25,5 W).
2. Sumar por clase y no por consumo real, o al revés: sumar consumo real
   cuando el switch reserva por clase.
3. Ignorar que el presupuesto PoE cae al perder una fuente redundante.
4. Mazos gigantes de Cat6A con Type 3/4 y sin ventilación.
5. Conectar un equipo estándar a un inyector pasivo de 24 V.
6. Culpar al Wi-Fi cuando el AP está en modo degradado por falta de
   potencia negociada.

## Preguntas de repaso

1. Un PD requiere 28 W. ¿Qué tipo de PoE hace falta como mínimo?
2. ¿Por qué PoE no daña un PC sin soporte PoE conectado al mismo puerto?
3. Un switch de 24 puertos tiene 370 W de presupuesto. ¿Cuántas cámaras
   de 12 W reales admite dejando 20 % de margen?
4. ¿Qué evidencia distingue "el PD no fue detectado" de "el PD fue
   detectado pero no hay presupuesto"?
