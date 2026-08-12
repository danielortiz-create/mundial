# Clase 08 — Presupuesto óptico y diseño del enlace

**Duración:** 3 h (1,5 h teoría / 1,5 h taller de cálculo)
**Prerrequisitos:** clases 05-07

## Objetivos

- Calcular el presupuesto de potencia disponible y la pérdida esperada de
  un enlace, y decidir **antes de instalar** si va a funcionar.
- Aplicar los márgenes correctos (envejecimiento, reparaciones,
  temperatura) sin inventarlos.
- Detectar el caso contrario: enlace corto con óptica de larga distancia
  que **satura** el receptor.
- Elaborar la tabla de presupuesto que se entrega en un proyecto.

## Por qué importa

El presupuesto óptico es el único cálculo que separa "creemos que va a
funcionar" de "sabemos que funciona con 4,3 dB de margen". Es también el
documento que salva al instalador cuando el enlace falla a los dos años:
si el margen calculado y el certificado están firmados, la degradación
posterior es evidencia de un cambio en la planta, no de un mal diseño.

## 1. Los dos números que se comparan

```
Presupuesto de potencia (dB)  =  P_transmisor_mín (dBm) − Sensibilidad_receptor (dBm)

Pérdida del enlace (dB)       =  fibra + conectores + empalmes + pasivos

Margen (dB)                   =  Presupuesto − Pérdida        ← debe ser positivo y suficiente
```

Detalles que se equivocan siempre:

- Se usa la **potencia mínima** del transmisor de la hoja de datos (no la
  típica ni la máxima): el peor caso es el que hay que soportar.
- Se usa la **sensibilidad** del receptor, que es un número negativo; la
  resta de dos negativos da el presupuesto en dB positivos.
- Se verifica **también el máximo**: `P_transmisor_máx − Pérdida` no debe
  superar el **nivel de saturación (overload)** del receptor.

## 2. Coeficientes de pérdida para el cálculo

| Elemento | Valor de diseño | Fuente |
|---|---|---|
| SMF @1310 nm | **0,35 dB/km** | Máximo TIA-568 planta externa |
| SMF @1550 nm | **0,25 dB/km** | Máximo TIA-568 planta externa |
| MMF @850 nm | **3,5 dB/km** | Máximo TIA-568 |
| MMF @1300 nm | **1,5 dB/km** | Máximo TIA-568 |
| Par de conectores | **0,75 dB** máximo de norma; **0,3 dB** típico de diseño | TIA-568 / práctica |
| Empalme por fusión | **0,3 dB** máximo; **0,1 dB** de diseño | TIA-568 / práctica |
| Empalme mecánico | 0,3 dB | TIA-568 |
| Splitter 1:8 / 1:16 / 1:32 | 10,5 / 13,5 / 17,0 dB | Típico comercial (clase 12) |
| Mux CWDM (por canal, ida y vuelta) | 1,5-3,0 dB | Hoja de datos |

Criterio: para **diseñar** se usan los valores típicos de diseño; para
**aceptar** una obra se usan los máximos de norma. Si el enlace solo
funciona con valores típicos y no con los máximos, el diseño es frágil.

## 3. Márgenes: cuánto sobra tiene que sobrar

| Margen | Valor habitual | Motivo |
|---|---|---|
| **Envejecimiento del láser** | 1-2 dB | El transmisor pierde potencia con los años |
| **Reparaciones futuras** | 0,5-1,5 dB | Cada corte de fibra reparado agrega 2 empalmes |
| **Temperatura y variación** | 0,5-1 dB | La atenuación varía con el ambiente |
| **Margen total recomendado** | **≥ 3 dB** en planta externa; **≥ 2 dB** en planta interior | Práctica de la industria |

Un enlace que "pasa" con 0,5 dB de margen funciona el día de la entrega y
falla el primer verano o la primera reparación.

## 4. Ejemplo 1 — Campus, 8 km, 10 Gbps monomodo

**Óptica:** SFP+ 10GBASE-LR. Hoja de datos: Tx −8,2 a +0,5 dBm,
sensibilidad −14,4 dBm, saturación −1,0 dBm.

**Presupuesto:** −8,2 − (−14,4) = **6,2 dB**

**Ruta:** switch → latiguillo → ODF-A → 8 km de cable → ODF-B →
latiguillo → switch. El cable viene en carretes de 4 km, así que hay un
empalme intermedio; cada ODF suma 1 empalme (pigtail) y 1 par de
conectores acoplados; cada latiguillo agrega su par de conectores en el
equipo.

| Elemento | Cantidad | dB c/u | Total |
|---|---|---|---|
| Fibra SMF @1310 | 8 km | 0,35 | 2,80 |
| Pares de conectores | 4 | 0,30 | 1,20 |
| Empalmes por fusión (2 ODF + 1 intermedio) | 3 | 0,10 | 0,30 |
| **Pérdida total** | | | **4,30 dB** |

**Margen = 6,2 − 4,3 = 1,9 dB.** Está por debajo de los 3 dB
recomendados en planta externa. Decisiones posibles:

1. Pasar a **1550 nm** (SFP+ ER o LR de 1550): 8 km × 0,25 = 2,0 dB, la
   pérdida baja a 3,5 dB **y** el presupuesto sube mucho → margen amplio.
2. Reducir conectores: eliminar un ODF intermedio si el diseño lo
   permite.
3. Aceptarlo documentando el riesgo y prohibiendo empalmes adicionales
   sin recálculo.

Este es exactamente el tipo de conclusión que el presupuesto está para
producir: **antes de comprar, no después**.

## 5. Ejemplo 2 — Centro de datos, 300 m, 10 Gbps multimodo

**Óptica:** SFP+ 10GBASE-SR sobre OM4. El estándar 802.3 define el canal
por **pérdida máxima permitida**: 2,6 dB en OM3 (300 m) y **2,9 dB en OM4
(400 m)**.

**Ruta:** switch → latiguillo → panel MPO A → troncal 300 m → panel MPO B
→ latiguillo → servidor.

| Elemento | Cantidad | dB c/u | Total |
|---|---|---|---|
| Fibra OM4 @850 | 0,3 km | 3,5 | 1,05 |
| Pares de conectores | 4 | 0,30 | 1,20 |
| **Pérdida total** | | | **2,25 dB** |

**Margen = 2,9 − 2,25 = 0,65 dB.** Ajustado. Lección central del
multimodo: **la fibra casi no pierde, los conectores sí.** Agregar un
solo par de conectores más (por ejemplo, un panel de parcheo extra)
tumba el enlace. En centros de datos con MPO se usan por eso conectores
de bajo IL (0,15-0,20 dB) y se limita el número de puntos de parcheo.

## 6. Ejemplo 3 — El enlace demasiado corto

**Óptica:** SFP+ 10GBASE-ER (40 km): Tx **0 a +4 dBm**, sensibilidad
−15,8 dBm, **saturación −1,0 dBm**.

**Enlace real:** 2 km, pérdida total 1,4 dB.

Potencia en el receptor con el transmisor al máximo:
`+4 − 1,4 = +2,6 dBm`. La saturación es −1,0 dBm → **el receptor recibe
3,6 dB de más**. Resultado: errores masivos, CRC en el switch, o el
enlace no levanta pese a que "hay mucha luz".

**Solución:** atenuador fijo de 5 dB en el receptor (queda −2,4 dBm,
dentro del rango) o, mejor, usar la óptica correcta (LR) para la
distancia.

Este caso confunde a mucha gente porque el síntoma —enlace inestable— es
idéntico al de falta de potencia, y la reacción instintiva es limpiar y
medir buscando pérdida. **Siempre se mide la potencia recibida y se
compara con el rango completo del receptor, no solo con su límite
inferior.**

## 7. La tabla que se entrega

Un presupuesto óptico de proyecto incluye, por enlace:

1. Identificación del enlace (extremo A, extremo B, ruta, fibras
   asignadas).
2. Tipo de fibra, longitud medida u OTDR, longitud de onda de trabajo.
3. Modelo de transceptor con Tx mín/máx, sensibilidad y saturación.
4. Desglose de pérdidas por elemento (la tabla de arriba).
5. Presupuesto, pérdida, **margen** y comparación con la pérdida máxima
   admisible.
6. Valor medido en la certificación (clase 9) y desviación respecto al
   calculado.

Si el medido difiere del calculado en más de ~1 dB, hay que investigar
antes de entregar: normalmente hay un conector sucio o un empalme malo.

## Laboratorio 8 — Taller de cálculo

**Materiales:** hojas de datos reales de 3 transceptores (SR, LR, ER),
planos de un campus ficticio, planilla de cálculo.

Resolver y documentar los siguientes casos:

1. **Enlace A** — 1,8 km, SMF, 1 Gbps, SFP 1000BASE-LX (Tx −9,5 dBm mín,
   sens. −20 dBm), 4 pares de conectores, 2 empalmes. Calcular margen.
2. **Enlace B** — 150 m, OM3, 10 Gbps, 6 pares de conectores (hay dos
   paneles de parcheo intermedios). ¿Pasa el límite de 2,6 dB?
3. **Enlace C** — 25 km, SMF, 10 Gbps. Elegir el transceptor adecuado
   entre LR (6,2 dB de presupuesto) y ER, calcular a 1310 y 1550 nm y
   justificar la elección.
4. **Enlace D** — el mismo transceptor ER del caso C, pero el enlace
   real resultó de 3 km. Determinar si hace falta atenuador y de cuántos
   dB.
5. Para el enlace A, recalcular usando los **máximos de norma**
   (0,75 dB/conector, 0,3 dB/empalme) y decir si sigue pasando.

**Entregable:** planilla con los 5 casos, cada uno con presupuesto,
pérdida desglosada, margen y decisión.

## Errores comunes

1. Usar la potencia **típica** del transmisor en vez de la mínima.
2. Olvidar los pares de conectores de los latiguillos de equipo.
3. Calcular a 1550 nm un enlace que opera en 1310 nm (o al revés).
4. No dejar margen de reparación: al primer corte de la fibra, el enlace
   queda fuera de presupuesto.
5. Ignorar la saturación en enlaces cortos con óptica de largo alcance.
6. Contar el splitter PON como "un componente más" sin buscar su valor
   real (17 dB en 1:32 se comen casi todo el presupuesto — clase 12).

## Preguntas de repaso

1. Un SFP tiene Tx mín −5 dBm y sensibilidad −22 dBm. ¿Cuál es el
   presupuesto?
2. En un enlace multimodo corto, ¿qué pesa más: la fibra o los
   conectores? Dar el número del ejemplo 2.
3. Un enlace pasa el cálculo con 1,0 dB de margen. ¿Se entrega? ¿Qué se
   propone?
4. El medidor indica −2 dBm en un receptor cuya saturación es −3 dBm.
   ¿Qué está pasando y cómo se corrige?
