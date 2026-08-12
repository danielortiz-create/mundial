# Clase 03 — Cableado estructurado en cobre

**Duración:** 3 h (1 h teoría / 2 h laboratorio)
**Prerrequisitos:** clases 01-02

## Objetivos

- Elegir la categoría de cable correcta para una velocidad y distancia
  dadas, con el número de la norma detrás.
- Ponchar un jack y armar un patch cord T568B correctos y probarlos.
- Explicar qué mide un certificador (NEXT, return loss, delay skew) y por
  qué un simple probador de continuidad no certifica nada.
- Aplicar los límites de 90 m + 10 m del modelo de enlace de TIA-568.

## Por qué importa

La fibra llega al edificio, pero el último tramo hasta el escritorio, la
cámara o el punto de acceso sigue siendo cobre en la enorme mayoría de
las instalaciones. Un cableado de cobre mal ejecutado produce fallas
intermitentes que se le achacan durante meses a "la red", "el proveedor"
o "el servidor".

## 1. El sistema de cableado estructurado

Norma base: **ANSI/TIA-568** (EE. UU.) e **ISO/IEC 11801** (internacional).
Subsistemas:

| Subsistema | Qué es |
|---|---|
| Área de trabajo | Toma en la pared + patch cord al equipo |
| Cableado horizontal | De la toma al cuarto de telecomunicaciones (máx. 90 m) |
| Cuarto de telecomunicaciones (TR) | Patch panels, switches del piso |
| Backbone / vertical | Entre pisos y edificios (aquí suele entrar la fibra) |
| Sala de equipos (ER) | Núcleo, servidores |
| Acometida (EF) | Entrada del proveedor al edificio |

Normas hermanas: **TIA-569** (canalizaciones y espacios), **TIA-606**
(administración y etiquetado), **TIA-607** (puesta a tierra).

### El modelo de 100 metros

```
[Equipo]--3 m--[Toma]========== 90 m enlace permanente ==========[Patch panel]--7 m--[Switch]
             \___________________ canal: 100 m máximo ___________________/
```

- **Enlace permanente**: el cable fijo dentro de la pared, máx. **90 m**.
- **Canal**: enlace permanente + patch cords, máx. **100 m**.
- Los 10 m de patch cords son un presupuesto total, no 10 m por lado.
- Cable de patch cord (flexible, hilos multifilares) atenúa ~20-50 % más
  que el rígido; por eso "gastan" más metros de los que miden.

## 2. Categorías

| Categoría | Ancho de banda | Aplicación máxima | Nota |
|---|---|---|---|
| Cat5e | 100 MHz | 1 Gbps a 100 m; 2,5 Gbps a 100 m (802.3bz) | El parque instalado más grande |
| Cat6 | 250 MHz | 1 Gbps a 100 m; **10 Gbps solo hasta 55 m** (y 37 m con alien crosstalk alto) | 5 Gbps a 100 m |
| Cat6A | 500 MHz | **10 Gbps a 100 m** | El estándar razonable en obra nueva |
| Cat7 / 7A | 600 / 1000 MHz | 10 Gbps | S/FTP, conectores GG45/TERA; **no reconocida por TIA**, sí por ISO |
| Cat8 | 2000 MHz | 25 / 40 Gbps hasta **30 m** | Solo centros de datos, top-of-rack |

Regla de decisión práctica:
- Puestos de trabajo y AP Wi-Fi nuevos → **Cat6A**.
- Reutilizar Cat5e existente → sirve para 1 Gbps y, si certifica, para
  2,5 Gbps (útil para Wi-Fi 6).
- Enlaces > 100 m o entre edificios → **fibra**, sin discusión (clase 6).

## 3. Blindajes

Nomenclatura ISO/IEC 11801: `XX/YZZ` donde XX = blindaje general, Y =
blindaje por par, ZZ = tipo de par.

| Código | Nombre común | Blindaje general | Por par |
|---|---|---|---|
| U/UTP | UTP | No | No |
| F/UTP | FTP | Lámina | No |
| U/FTP | — | No | Lámina por par |
| S/FTP | STP | Malla | Lámina por par |

Cuándo blindar: entornos industriales, junto a cables de energía,
motores, balastros, o cuando hay muchos Cat6A en el mismo mazo (*alien
crosstalk*). **Un blindaje mal aterrizado es peor que ningún blindaje**:
si se aterriza en los dos extremos con potenciales distintos, circula
corriente por la pantalla y se convierte en antena. Regla habitual:
aterrizar en el lado del rack, siguiendo TIA-607.

## 4. Por qué se trenzan los pares

Dos conductores trenzados con paso distinto por par cancelan el campo
magnético que generan y rechazan el ruido común. De ahí salen las dos
reglas de oro del ponchado:

- **Destrenzar como máximo 13 mm (½")** en Cat5e/Cat6 — y menos en Cat6A.
- **Respetar el par**: los colores no son decorativos, un par es una
  unidad eléctrica. Cambiar un hilo de par ("par dividido"/*split pair*)
  da continuidad correcta en un probador barato y **NEXT desastroso** en
  un certificador.

## 5. Códigos T568A y T568B

| Pin | T568A | T568B | Par |
|---|---|---|---|
| 1 | Blanco/Verde | Blanco/Naranja | 2 / 3 |
| 2 | Verde | Naranja | 2 / 3 |
| 3 | Blanco/Naranja | Blanco/Verde | 3 / 2 |
| 4 | Azul | Azul | 1 |
| 5 | Blanco/Azul | Blanco/Azul | 1 |
| 6 | Naranja | Verde | 3 / 2 |
| 7 | Blanco/Marrón | Blanco/Marrón | 4 |
| 8 | Marrón | Marrón | 4 |

- Ambos funcionan igual; **lo prohibido es mezclarlos** en el mismo
  enlace (queda un cable cruzado accidental).
- T568B es el más usado en instalaciones comerciales de América Latina y
  EE. UU.; T568A es el requerido en obra pública en algunos países.
- Definir uno para todo el proyecto y anotarlo en la documentación.

## 6. Qué mide un certificador (y por qué importa)

Un probador de continuidad ("tester de lucecitas") solo verifica que cada
pin llegue al otro extremo. **No certifica.** Un certificador de campo
(Fluke DSX, Softing, etc.) mide en frecuencia:

| Parámetro | Qué es | Qué lo arruina |
|---|---|---|
| **Wire map** | Continuidad y correspondencia pin a pin | Ponchado mal, par dividido |
| **Insertion loss** (atenuación) | Cuánta señal se pierde | Cable largo, calor, cable CCA (aluminio recubierto de cobre) |
| **NEXT** | Diafonía en el extremo cercano | Destrenzado excesivo, conector barato |
| **PS-NEXT** | Suma de la diafonía de todos los pares | Igual |
| **ACR-F / ELFEXT** | Diafonía en el extremo lejano relativa | Igual |
| **Return loss** | Señal reflejada por desadaptación de impedancia | Curvas cerradas, cable aplastado, mezcla de impedancias |
| **Delay skew** | Diferencia de tiempo de llegada entre pares | Pares con materiales distintos; crítico en 1000BASE-T que usa los 4 pares |
| **Alien crosstalk** | Interferencia entre cables vecinos | Mazos apretados de Cat6A |

Un resultado **PASS\*** (con asterisco) significa "pasa dentro de la
incertidumbre del instrumento": en una obra que se va a entregar formalmente
se trata como falla y se rehace.

## 7. Buenas prácticas de instalación

- Radio de curvatura mínimo: **4× el diámetro** en cable UTP horizontal
  (8× en cable de backbone multipar). Una curva cerrada arruina el
  return loss.
- Tensión de tiro máxima: **110 N (25 lbf)** para cable UTP de 4 pares.
  Más tensión estira el trenzado.
- No usar amarres plásticos apretados: deforman el cable. Velcro, sin
  estrangular.
- Separación de cables de energía: seguir el código eléctrico local;
  como referencia habitual, **≥ 50 mm** de circuitos de baja tensión sin
  blindaje y más si son bandejas paralelas largas.
- Nunca cable **CCA** (aluminio recubierto de cobre): no cumple
  atenuación, se rompe al ponchar y es peligroso con PoE por
  calentamiento.
- Etiquetar en ambos extremos antes de tirar, según TIA-606.
- Temperatura: la atenuación del cobre sube con la temperatura
  (~0,4 %/°C en Cat6A). Un tendido en un entretecho a 50 °C se acerca a
  los límites que en laboratorio pasaban holgados.

## Laboratorio 3 — Armado y prueba

**Materiales:** cable Cat6 en caja, jacks y patch panel, ponchadora de
impacto, conectores RJ45 y crimpadora, pelacables, probador de wire map,
certificador si el centro dispone de uno.

1. Armar un patch cord T568B de 2 m en ambos extremos. Verificar con el
   probador.
2. Armar **a propósito** un patch cord con par dividido (pines 1-2 y 3-6
   intercambiando un hilo). Comprobar que el probador de continuidad
   **lo da por bueno**. Discutir por qué.
3. Ponchar un jack en un faceplate y su contraparte en el patch panel;
   medir el destrenzado con regla: debe quedar ≤ 13 mm.
4. Certificar (o al menos medir longitud y wire map) el enlace
   permanente. Registrar el resultado.
5. Repetir la certificación aplastando el cable con una prensa suave o
   haciendo una curva de radio muy cerrado; observar el cambio en return
   loss / NEXT.

**Entregable:** informe de una página con los dos resultados de
certificación (bueno y degradado) y la explicación de la diferencia.

## Errores comunes

1. Destrenzar 5 cm "para que entre cómodo" → NEXT fuera de norma.
2. Mezclar T568A en un extremo y T568B en el otro.
3. Usar cable CCA por precio.
4. Superar los 90 m del enlace permanente "por poquito" y confiar en que
   funcione: funciona a 100 Mbps y falla al pasar a 1 o 10 Gbps.
5. Aterrizar el blindaje en ambos extremos sin equipotencialidad.
6. Entregar la obra sin certificación ni etiquetas: la falla de mañana no
   se va a poder ubicar.

## Preguntas de repaso

1. ¿Cuál es la distancia máxima de 10GBASE-T sobre Cat6? ¿Y sobre Cat6A?
2. Un enlace mide 96 m de cable fijo. ¿Certifica? ¿Qué se hace?
3. ¿Qué parámetro se degrada al aplastar el cable con un amarre y por qué
   no lo detecta un probador de continuidad?
4. ¿Por qué el delay skew importa en 1000BASE-T y no importaba en
   100BASE-TX?
