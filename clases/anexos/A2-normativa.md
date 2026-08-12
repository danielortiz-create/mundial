# Anexo A2 — Normativa de referencia

Qué organismo publica qué, y cuál se cita en un pliego, en un informe de
certificación o en una discusión con el cliente.

> Las normas se **compran** a los organismos; aquí se listan por número y
> alcance, no se reproduce su contenido. Antes de citar una en un
> contrato, verificar la **edición vigente**: las revisiones cambian
> límites y nomenclatura (por ejemplo, TIA-568 va por su revisión D y
> reorganizó la numeración respecto de la C).

## IEEE — Ethernet y capa 1/2

| Norma | Alcance |
|---|---|
| **IEEE 802.3** | Ethernet: la trama, la subcapa MAC y todas las capas físicas (BASE-T, SR, LR, ER…) |
| 802.3af / at / bt | PoE Type 1 / Type 2 / Type 3 y 4 |
| 802.3ad → **802.1AX** | Agregación de enlaces (LACP) |
| 802.3bz | 2.5GBASE-T y 5GBASE-T sobre Cat5e/Cat6 |
| **802.1Q** | VLAN, etiquetado, prioridad PCP |
| 802.1D / **802.1w** / 802.1s | STP / RSTP / MSTP |
| 802.1X | Control de acceso a la red por puerto |
| 802.1AB | LLDP (descubrimiento; base de LLDP-MED para PoE) |

## TIA — cableado estructurado (norteamericano, muy usado en LatAm)

| Norma | Alcance |
|---|---|
| **ANSI/TIA-568** (serie) | Cableado de telecomunicaciones en edificios comerciales: categorías de cobre, tipos de fibra, límites de pérdida, modelos de canal y enlace permanente |
| TIA-569 | Canalizaciones y espacios (rutas, bandejas, cuartos) |
| **TIA-606** | Administración: identificadores, etiquetado y documentación |
| TIA-607 | Puesta a tierra y unión equipotencial |
| TIA-758 | Cableado de planta externa |
| TIA-942 | Infraestructura de centros de datos (incluye los niveles de disponibilidad) |
| **TIA-526-7 / -14** | Métodos de medición de pérdida óptica: monomodo (-7) y multimodo (-14) |
| TIA-598 | Código de colores de fibras y cables |

## ISO/IEC — equivalente internacional

| Norma | Alcance |
|---|---|
| **ISO/IEC 11801** | Cableado genérico de instalaciones: define las clases (Clase D, E, EA, F, I/II) y los grados de fibra **OM1-OM5 / OS1-OS2** |
| ISO/IEC 14763-3 | Pruebas de cableado de fibra óptica |
| ISO/IEC 30129 | Puesta a tierra |

Correspondencia útil: la **categoría** (Cat6A) describe el **componente**;
la **clase** (Clase EA) describe el **enlace instalado**.

## IEC — componentes ópticos y seguridad

| Norma | Alcance |
|---|---|
| **IEC 61300-3-35** | **Inspección de ferrules**: zonas, tipos y tamaños de defecto admisibles. La referencia para el PASS/FAIL de limpieza |
| IEC 61280-4-1 / -4-2 | Medición de atenuación en planta instalada: multimodo (incluye *encircled flux*) y monomodo |
| IEC 61753 | Requisitos de desempeño de componentes pasivos |
| **IEC 60825** | **Seguridad de productos láser**: clasificación y requisitos |
| IEC 60332 / 60754 / 61034 | Comportamiento al fuego, gases halógenos y densidad de humo (base de "LSZH") |

## ITU-T — fibra y redes de operador

| Norma | Alcance |
|---|---|
| **G.652** | Fibra monomodo estándar. **G.652.D** = *low water peak*, la de uso general |
| **G.657** | Fibra monomodo **insensible a la curvatura** (A1, A2, B3) |
| G.651.1 | Fibra multimodo 50/125 |
| G.655 / G.654 | NZ-DSF y fibra de área efectiva grande (larga distancia) |
| **G.984** | **GPON** |
| **G.9807.1** | **XGS-PON** (10 G simétrico) |
| G.989 | NG-PON2 |
| G.694.1 / G.694.2 | Planes de longitudes de onda **DWDM** y **CWDM** |
| G.114 | Latencia extremo a extremo admisible para voz |
| G.826 / G.827 | Objetivos de desempeño de error |

## Normativa local (la que manda de verdad)

Por encima de todo lo anterior, en obra aplican:

- **Código eléctrico nacional** — separación de cables de energía,
  clasificación de chaquetas al fuego, canalizaciones.
- **Reglamento de telecomunicaciones** del país — uso de infraestructura,
  postes, derechos de vía.
- **Normativa de seguridad y salud en el trabajo** — trabajo en altura,
  espacios confinados, vía pública.
- **Especificaciones del propietario de la infraestructura** (empresa
  eléctrica, municipio, operador) — distancias mínimas a conductores,
  herrajes admitidos, permisos.

Regla para pliegos: se cita la norma **internacional** para el desempeño
técnico (TIA/ISO/IEC/ITU-T) y la **local** para seguridad, instalación y
permisos. Cuando entran en conflicto, gana la local.

## Cómo citar en un informe

Ejemplo correcto en un informe de certificación:

> Enlaces certificados según **ANSI/TIA-568.3-D**, medidos con el método
> de **un latiguillo** de **TIA-526-14** en 850 y 1300 nm, en ambos
> sentidos. Inspección de conectores conforme a **IEC 61300-3-35**.
> Instrumento: [modelo], S/N [xxx], calibrado el [fecha].

Sin esos cuatro datos —norma, método, longitudes de onda e instrumento
con calibración vigente— el informe no es defendible ante una reclamación.
