# Curso: Fibra óptica y redes Ethernet — fundamentos y práctica

Programa completo de formación para técnicos e ingenieros que instalan,
certifican y operan infraestructura de red: cableado de cobre, fibra óptica
y conmutación Ethernet.

## A quién va dirigido

Técnicos de telecomunicaciones, instaladores de redes, personal de soporte
de TI y estudiantes de electrónica/telecomunicaciones. **No se requieren
conocimientos previos de redes**: las clases 1 y 2 construyen la base. Sí
conviene manejo básico de herramientas manuales y nociones de electricidad
(voltaje, corriente, potencia) para el bloque de PoE.

## Qué se logra al terminar

Al completar el curso el participante es capaz de:

1. Explicar cómo viaja un bit desde una NIC hasta la del otro extremo,
   pasando por cobre, fibra y switches.
2. Elegir el medio correcto (Cat6A, OM4, OS2) para un requisito de
   distancia, velocidad y presupuesto, justificándolo con números.
3. Calcular un presupuesto óptico (*link budget*) y decidir si un enlace
   va a funcionar **antes** de instalarlo.
4. Preparar, empalmar y conectorizar fibra, y limpiar/inspeccionar
   ferrules según IEC 61300-3-35.
5. Certificar un enlace Tier 1 (fuente + medidor) y Tier 2 (OTDR), e
   interpretar la traza para ubicar un evento.
6. Configurar un switch: VLAN, trunk, agregación, PoE, y diagnosticar
   errores de capa 1 y 2 leyendo contadores.
7. Documentar la instalación con etiquetado y planos según TIA-606.

## Estructura

16 sesiones de 3 horas (48 h): ~40 % teoría, ~60 % laboratorio.
Se puede dictar en 8 semanas (2 sesiones/semana) o en 16 sesiones sueltas.

| # | Clase | Bloque | Práctica principal |
|---|---|---|---|
| 01 | [Fundamentos de redes y modelo por capas](01-fundamentos-de-redes.md) | Base | Trazar un paquete capa por capa |
| 02 | [Ethernet: la trama, el MAC y el dominio](02-ethernet-fundamentos.md) | Base | Captura y disección de tramas |
| 03 | [Cableado estructurado en cobre](03-cableado-cobre.md) | Cobre | Ponchado T568B y prueba de continuidad |
| 04 | [PoE — alimentación por Ethernet](04-poe.md) | Cobre | Medición de consumo y presupuesto PoE |
| 05 | [Física de la luz en fibra óptica](05-fisica-de-la-fibra.md) | Fibra | Cálculo de NA, dB y dBm |
| 06 | [Tipos de fibra y construcción del cable](06-tipos-de-fibra-y-cables.md) | Fibra | Identificación de fibras y códigos de color |
| 07 | [Conectores, empalmes y pasivos](07-conectores-y-empalmes.md) | Fibra | Empalme por fusión y medición de la pérdida |
| 08 | [Presupuesto óptico y diseño del enlace](08-presupuesto-optico.md) | Fibra | Cálculo de budget de 3 enlaces reales |
| 09 | [Medición y certificación (Tier 1 y Tier 2)](09-medicion-y-certificacion.md) | Fibra | Medidor de potencia y OTDR |
| 10 | [Instalación en obra: tendido y seguridad](10-instalacion-y-obra.md) | Fibra | Tendido, radio de curvatura, cierre de empalme |
| 11 | [Transceptores y óptica de sistema](11-transceptores-y-wdm.md) | Transporte | Lectura de DDM/DOM de un SFP |
| 12 | [FTTH y redes PON](12-ftth-y-pon.md) | Transporte | Presupuesto de una red GPON 1:32 |
| 13 | [Switching: VLAN, trunk y agregación](13-switching-vlan.md) | Ethernet | Configurar VLAN + trunk entre dos switches |
| 14 | [Redundancia y rendimiento: STP, LACP, QoS](14-stp-lacp-qos.md) | Ethernet | Provocar y resolver un bucle |
| 15 | [Diagnóstico y operación de la red](15-diagnostico-y-operacion.md) | Ethernet | Fallas sembradas: hallar y documentar |
| 16 | [Proyecto final integrador](16-proyecto-final.md) | Integración | Diseñar, montar y certificar un enlace |

## Anexos

- [A1 — Herramientas, equipos e insumos](anexos/A1-herramientas-y-equipos.md):
  qué hace falta comprar para dictar el curso y para montar una cuadrilla.
- [A2 — Normativa de referencia](anexos/A2-normativa.md): TIA, ISO/IEC,
  IEEE, ITU-T e IEC, qué cubre cada una.
- [A3 — Fórmulas y tablas de bolsillo](anexos/A3-formulas-y-tablas.md):
  la hoja que el técnico se lleva a campo.
- [A4 — Glosario](anexos/A4-glosario.md).
- [A5 — Evaluación: banco de preguntas y rúbricas](anexos/A5-evaluacion.md).

## Cómo está escrita cada clase

Todas siguen el mismo formato:

1. **Objetivos** — qué sabe hacer el alumno al salir.
2. **Por qué importa** — el problema real que resuelve.
3. **Teoría** — con los números concretos, no aproximaciones vagas.
4. **Laboratorio** — la práctica, con materiales y pasos.
5. **Errores comunes** — lo que sale mal en campo y por qué.
6. **Preguntas de repaso** — con respuestas al final del anexo A5.

## Nota sobre los valores numéricos

Se distinguen tres tipos de número:

- **Valor de norma** — está escrito en el estándar (ej.: el máximo de
  0,75 dB por conector de TIA-568). Se cita la norma.
- **Valor típico** — lo que se mide en la práctica con equipo en buen
  estado (ej.: 0,02–0,05 dB en un empalme por fusión). Se marca "típico".
- **Valor del fabricante** — depende del modelo y **siempre** se consulta
  en la hoja de datos (tensión de tiro, potencia de un SFP, sensibilidad).

Para cualquier cálculo de aceptación de una obra se usan los dos primeros;
para el diseño se usa la hoja de datos real del equipo que se va a instalar.
