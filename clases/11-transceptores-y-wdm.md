# Clase 11 — Transceptores ópticos y multiplexación por longitud de onda

**Duración:** 3 h (1,5 h teoría / 1,5 h laboratorio)
**Prerrequisitos:** clases 05-09

## Objetivos

- Identificar los formatos SFP, SFP+, SFP28, QSFP+ y QSFP28 y qué
  velocidad admite cada uno.
- Leer el **DDM/DOM** de un transceptor y diagnosticar un enlace con esos
  números.
- Elegir entre transceptor óptico, DAC y AOC según distancia y costo.
- Explicar CWDM y DWDM y calcular cuántos servicios caben en un par de
  fibras.

## Por qué importa

El transceptor es la frontera entre el mundo eléctrico y el óptico y es
donde el switch **mide** lo que llega. Saber leer su telemetría convierte
un diagnóstico de dos horas con OTDR en una consulta de treinta segundos
por consola.

## 1. Formatos

| Formato | Velocidad | Conector típico | Uso |
|---|---|---|---|
| SFP | 100 M - 1 G | LC dúplex | Acceso, uplinks 1G |
| **SFP+** | **10 G** | LC dúplex | El caballo de batalla actual |
| SFP28 | 25 G | LC dúplex | Acceso de centro de datos |
| QSFP+ | 40 G (4×10 G) | MPO-12 o LC | Agregación |
| QSFP28 | 100 G (4×25 G) | MPO-12 o LC | Núcleo, centro de datos |
| QSFP-DD / OSFP | 400 G+ | MPO-16 / LC | Núcleo moderno |
| XFP, GBIC | 10 G / 1 G | LC / SC | Heredados |

Los QSFP suelen admitir **breakout**: un QSFP+ de 40 G se abre en 4
enlaces de 10 G con un cable MPO→4×LC, si el switch lo soporta.

## 2. Alcances y sufijos

| Sufijo | Ventana | Alcance nominal | Fibra |
|---|---|---|---|
| SR / SX | 850 nm | 300-400 m (10G), 550 m (1G) | Multimodo |
| LR / LX | 1310 nm | 10 km | Monomodo |
| ER | 1550 nm | 40 km | Monomodo |
| ZR | 1550 nm | 80 km | Monomodo |
| BiDi / BX | 1310/1490 o 1490/1550 | 10-40 km | **Una sola fibra** |
| LRM | 1300 nm | 220 m | Multimodo heredado (FDDI/OM1) |

**BiDi:** dos longitudes de onda en direcciones opuestas sobre **una
fibra**. Se instalan de a pares complementarios (uno "U" que transmite en
1310 y recibe en 1490, y otro "D" al revés). Duplica la capacidad de una
planta de fibra escasa, a costa de módulos más caros y de un inventario
que hay que gestionar con cuidado: dos módulos iguales enfrentados no
enlazan nunca.

## 3. DDM / DOM: la telemetría del módulo

**Digital Diagnostics Monitoring** (SFF-8472) expone cinco valores en
tiempo real:

| Valor | Qué dice | Umbral típico de alarma |
|---|---|---|
| **Potencia Tx (dBm)** | Salud del láser propio | Fuera del rango de la hoja de datos → módulo degradado |
| **Potencia Rx (dBm)** | **Lo que realmente llega** | Cerca de la sensibilidad → planta degradada |
| Temperatura (°C) | Del módulo | > 70 °C → ventilación o módulo defectuoso |
| Tensión (V) | Alimentación 3,3 V | Fuera de ±5 % → problema del switch |
| Corriente de polarización (mA) | Corriente del láser | Sube con el envejecimiento |

Comando típico: `show interface transceiver detail` (Cisco),
`show interfaces diagnostics optics` (Juniper), `ethtool -m eth0` (Linux).

### Diagnóstico con DOM en 3 preguntas

1. **¿El Tx local está en rango?** Si no, es el módulo local.
2. **¿El Rx local está en rango?** Compararlo con el presupuesto de la
   clase 8:
   - Rx **cerca de la sensibilidad** → planta sucia, curvada o dañada.
   - Rx **por encima de la saturación** → enlace demasiado corto para esa
     óptica: falta un atenuador.
   - Rx en **−40 dBm o "low"** → no hay luz: fibra cortada, puerto
     apagado del otro lado, o fibras invertidas.
3. **¿Cómo cambió respecto de la puesta en servicio?** Por eso se
   **registra el valor Rx del día 1** en la documentación. Una caída de
   3 dB en un año es una planta degradándose, aunque el enlace todavía
   funcione.

Este último punto es la razón práctica de documentar: sin la línea base,
"−12,4 dBm" no significa nada.

## 4. DAC y AOC

| Tipo | Qué es | Alcance | Cuándo usarlo |
|---|---|---|---|
| **DAC** (Direct Attach Copper) | Cable de cobre con dos conectores tipo SFP soldados | 1-7 m (pasivo), hasta 15 m (activo) | Dentro del rack: switch↔servidor, apilamiento. Barato y sin óptica |
| **AOC** (Active Optical Cable) | Fibra con transceptores integrados, no desmontables | 1-100 m | Entre racks, cuando no hace falta parchear |
| Transceptores + fibra | Modular | Todo | Cuando el enlace pasa por paneles o cambia con el tiempo |

Los DAC son la opción correcta dentro del rack y una fuente frecuente de
error fuera de él: no existen DAC de 30 m que funcionen bien.

## 5. Compatibilidad y codificación

Los transceptores llevan una EEPROM con fabricante y modelo. Muchos
switches **rechazan módulos de terceros** salvo que estén codificados
para esa marca. Realidades del campo:

- Los módulos de tercero codificados funcionan bien y cuestan una
  fracción; hay que pedirlos **codificados para la marca y modelo exacto**
  del switch.
- Algunos fabricantes exigen un comando explícito para permitir módulos
  no originales, y pueden condicionar el soporte.
- **Siempre** verificar que la óptica del módulo coincide con la fibra:
  un módulo SR en fibra monomodo enlaza a veces con mucha pérdida y falla
  de forma intermitente — error clásico y difícil de ver.

## 6. WDM: varios servicios en un par de fibras

Cuando la fibra es escasa (planta externa arrendada, tendido caro), en
vez de tender más se multiplexan longitudes de onda.

| | **CWDM** | **DWDM** |
|---|---|---|
| Separación entre canales | 20 nm | 0,8 nm (100 GHz) o 0,4 nm (50 GHz) |
| Canales | 18 (1271-1611 nm) | 40, 80, 96 en banda C |
| Láser | Sin control de temperatura, barato | Estabilizado en temperatura, caro |
| Amplificable con EDFA | No (solo los canales de banda C) | **Sí** |
| Alcance típico | Hasta ~80 km | Cientos a miles de km con amplificación |
| Costo | Bajo | Alto |
| Uso | Empresa, metro, campus | Operador, larga distancia, DCI |

**Componentes:** multiplexor/demultiplexor (pasivo, 1,5-3 dB por
canal — que hay que meter en el presupuesto óptico), OADM (extrae un
canal en un nodo intermedio), amplificadores EDFA para DWDM, y en redes
grandes ROADM (conmutación de longitudes de onda por software).

Cuenta útil: con CWDM de 8 canales, **un solo par de fibras** transporta
8 enlaces de 10 Gbps independientes. Si tender un par de fibras a 20 km
cuesta lo que cuesta, el CWDM se paga solo.

## 7. Ethernet sobre fibra en la práctica

Puntos que se olvidan al conectar el primer enlace de fibra:

- **Tx de un lado va a Rx del otro**: el latiguillo dúplex ya lo hace por
  su construcción A/B, pero al parchear en ODF hay que verificar la
  polaridad. El síntoma de fibras invertidas es "Rx sin luz en ambos
  extremos".
- El puerto de fibra **no autonegocia como el cobre**: en 1000BASE-X
  existe la autonegociación de 802.3 cláusula 37, pero muchos equipos la
  traen deshabilitada. Si un extremo la usa y el otro no, el enlace no
  levanta.
- Un enlace de fibra no da "media velocidad": o enlaza a la velocidad del
  módulo o no enlaza. Los problemas de planta se manifiestan como CRC y
  errores, no como velocidad reducida.

## Laboratorio 11 — Telemetría óptica

**Materiales:** 2 switches con SFP+, módulos SR y LR, latiguillos MM y
SM, atenuadores fijos (5, 10, 15 dB), medidor de potencia, DAC.

1. Levantar un enlace 10G SR entre los dos switches. Leer el DOM en
   ambos extremos y anotar Tx, Rx, temperatura y corriente.
2. Medir con el medidor de potencia la salida del mismo módulo y
   comparar con lo que reporta el DOM. Discutir la exactitud (el DOM
   tiene una tolerancia típica de ±2-3 dB; **no reemplaza al medidor
   calibrado para certificar**, pero sirve para monitorear tendencias).
3. Insertar atenuadores crecientes (5, 10, 15 dB) y registrar Rx y los
   contadores de error hasta que el enlace caiga. Dibujar la curva
   "Rx vs errores" y ubicar la sensibilidad real.
4. Reemplazar por módulos LR con un latiguillo corto y observar la
   saturación: registrar Rx y errores. Corregir con atenuador.
5. Conectar un módulo SR a fibra monomodo y documentar el
   comportamiento.
6. Sustituir el enlace por un DAC y comparar latencia y consumo, si el
   equipo lo reporta.

**Entregable:** tabla con los valores de DOM de cada escenario y la
curva de atenuación vs errores.

## Errores comunes

1. No registrar la potencia Rx del día 1: se pierde la línea base.
2. Confundir la lectura del DOM con una medición certificada.
3. Módulo SR en fibra monomodo (o LR en multimodo sin acondicionador).
4. Dos BiDi del mismo tipo enfrentados.
5. Olvidar la pérdida del mux CWDM en el presupuesto óptico.
6. DAC de más de 7 m pasivo.
7. Autonegociación de fibra activada en un extremo y no en el otro.

## Preguntas de repaso

1. Un SFP+ LR reporta Rx = **+1 dBm** con saturación de −1 dBm y el
   puerto acumula CRC. ¿Qué pasa y cómo se corrige?
2. ¿Qué distingue un AOC de un par de transceptores con su latiguillo?
3. ¿Cuántos enlaces de 10 G caben en un par de fibras con CWDM de 8
   canales, y qué se agrega al presupuesto óptico?
4. Rx = −40 dBm o "LOW" en los dos extremos: ¿qué se sospecha primero?
