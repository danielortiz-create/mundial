# Clase 10 — Instalación en obra: tendido, cierre y seguridad

**Duración:** 3 h (1 h teoría / 2 h práctica)
**Prerrequisitos:** clases 06-09

## Objetivos

- Planificar un tendido respetando tensión de tiro y radio de curvatura.
- Ejecutar los tres tipos de tendido (canalizado, aéreo, enterrado) con
  sus accesorios correctos.
- Armar una caja de empalme y una bandeja con gestión de fibra correcta.
- Aplicar el protocolo de seguridad láser y manejo de residuos de fibra.
- Etiquetar y documentar según TIA-606.

## Por qué importa

La fibra no se rompe sola: se rompe al instalarla. Un tirón excesivo, una
curva cerrada o una grapa mal puesta producen microfracturas que no dan
la cara el día de la puesta en servicio, sino meses después, como una
degradación lenta que nadie relaciona con la instalación.

## 1. Antes de tirar el cable: el replanteo

Checklist previo:

1. **Ruta física medida**, no estimada: metros reales + 10-15 % de
   reserva por curvas, subidas y bucles.
2. **Reservas de cable**: 10-20 m en cada extremo y en cada punto de
   empalme, enrolladas en radio amplio. Es lo que permite reparar sin
   volver a tender.
3. **Puntos de tiro intermedios** cada 100-150 m o donde se acumulen
   curvas: se tira por tramos y se figura-8 el sobrante en el suelo
   (nunca enrollado en círculo: se tuerce el cable).
4. **Hoja de datos del cable a mano**: tensión de tiro máxima, radio
   mínimo, rango de temperatura de instalación.
5. **Permisos** y coordinación con el propietario de postes/ductos.
6. Verificar que el cable **no se instale por debajo de su temperatura
   mínima de instalación** (muchos exteriores: −10 °C; la chaqueta se
   agrieta).

## 2. Los dos números que no se negocian

### Radio de curvatura

Regla general si el fabricante no especifica:

- **Durante el tendido (bajo tensión): 20 × el diámetro exterior.**
- **En reposo (instalado): 10 × el diámetro exterior.**

Ejemplo: cable de 12 mm → 240 mm tirando, 120 mm instalado.

En interiores con fibra **G.657.A2** el radio puede bajar a 7,5-15 mm
para la fibra desnuda o latiguillo, pero **el cable multifibra sigue su
propia regla**.

### Tensión de tiro

Es el valor de la hoja de datos. Órdenes de magnitud habituales:

| Cable | Tensión máxima típica |
|---|---|
| Interior 4-12 F tight buffer | 200-600 N |
| Exterior loose tube 12-48 F | 1300-2700 N |
| ADSS según vano | 2700 N y más |

Cómo respetarla:

- Tirar **de los elementos de tracción** (aramida y elemento central) con
  malla de tiro y **eslabón giratorio (swivel)** — nunca de la chaqueta
  sola, nunca de las fibras.
- Usar **dinamómetro** o un cabrestante con limitador. Si se tira a mano,
  el criterio es "una persona, sin apoyar el pie en la pared".
- **Lubricante** compatible con la chaqueta en ductos largos.
- Nunca superar la tensión ni siquiera un instante: el daño es
  acumulativo e invisible.

## 3. Tipos de tendido

### Canalizado (ductos y bandejas)

- Ductos: verificar libre con mandril antes; usar guía de fibra de vidrio
  o soplado (*blowing*) para microductos.
- No mezclar fibra con cables de energía en el mismo ducto salvo que el
  código lo permita y esté separado físicamente.
- Bandejas: fibra arriba, energía abajo; separación según código.
- Ocupación de ducto recomendada: ≤ 40 % con más de un cable.

### Aéreo

- **Figura 8** (mensajero integrado) o **ADSS** (autosoportado).
- Tensado con dinamómetro según la tabla de flecha (*sag*) del
  fabricante: depende del vano y la temperatura. Demasiado tenso, el
  cable falla con el frío; demasiado flojo, roza.
- Herrajes de retención en postes de ángulo y de paso en los rectos.
- **Distancia de seguridad a conductores de energía**: la que fije la
  normativa eléctrica local y el propietario del poste. No se improvisa.
- Reservas en poste: bucle de 10-20 m en un carretel de reserva cada
  cierto número de postes, para futuras reparaciones.

### Enterrado

- **Directo**: solo con cable armado, a la profundidad que fije la norma
  local (frecuentemente 0,6-1,0 m según la vía), con cama de arena,
  cinta de advertencia sobre el cable y, si se puede, hilo trazador
  metálico para localización posterior.
- **En ducto**: preferible. Permite reponer sin excavar de nuevo.
- Georreferenciar la ruta: sin planos, la próxima retroexcavadora la
  corta.

## 4. Cierre de empalme y bandejas

Reglas de gestión de fibra en cualquier caja, mufa u ODF:

1. **Reserva de fibra desnuda**: 1-1,5 m por lado dentro de la bandeja.
2. Enrollado siempre por encima del radio mínimo (bandejas diseñadas para
   eso; no improvisar bucles pequeños).
3. Fijar los tubos con abrazaderas en la entrada, y el elemento de
   tracción al chasis: **la tracción nunca debe llegar al empalme**.
4. Cada empalme en su ranura del organizador, con su protector.
5. Sellado: en planta externa, la caja se cierra con su empaque y suele
   probarse con **presurización de aire** para verificar estanqueidad.
   Una mufa mal sellada se llena de agua y en invierno el hielo rompe las
   fibras.
6. Etiquetar la bandeja con el mapa de fibras (qué color va a qué
   destino).

En el ODF de rack: latiguillos con guías, longitud correcta (ni tensos ni
con 3 m de sobrante colgando), y **tapas en todos los puertos libres**.

## 5. Seguridad

### Seguridad láser (IEC 60825)

- **Nunca mirar el extremo de una fibra** ni el puerto de un
  transceptor, ni siquiera "de reojo". La luz de 1310/1550 nm es
  **invisible** y el ojo no tiene reflejo de parpadeo para protegerse.
- Verificar siempre con **medidor de potencia**, no con la vista, si hay
  luz.
- Trabajar con el equipo apagado o con el puerto deshabilitado.
- Cuidado especial con sistemas amplificados (EDFA) y DWDM: potencias muy
  superiores.
- Tapar conectores y puertos.

### Residuos de fibra

Los restos de corte son **astillas de vidrio de 125 µm**: invisibles, se
clavan en la piel y no salen. Protocolo:

- Contenedor rígido y cerrado exclusivo para descartes, siempre a mano.
- **Nunca** comer, beber ni fumar en la zona de trabajo.
- Trabajar sobre superficie oscura y limpia; nunca sobre la ropa o la
  pierna.
- Gafas de seguridad al cortar y fusionar.
- Limpiar la mesa con cinta adhesiva al terminar.
- Alcohol isopropílico: inflamable y volátil, lejos del arco de la
  fusionadora en el momento de fusionar.

### Seguridad general de obra

Trabajo en altura (arnés, escalera certificada), espacios confinados
(cámaras subterráneas: medir gases antes de entrar), tránsito
(señalización), y la regla obvia y más violada: **la fusionadora no se
opera en la lluvia ni sobre una superficie inestable**.

## 6. Etiquetado y documentación (TIA-606)

Se etiqueta **todo**: cables (en ambos extremos y cada cierta
distancia), paneles, puertos, racks, bandejas, cámaras y mufas.

Un identificador típico de un puerto de fibra:

```
ED1-TR3-ODF2-P07      Edificio 1, cuarto de telecom 3, ODF 2, puerto 7
```

y un enlace se documenta como par origen-destino con su tipo de fibra:

```
ED1-TR3-ODF2-P07  ↔  ED2-ER1-ODF1-P07   |  OS2 G.652.D  |  842 m  |  0,62 dB @1310
```

El paquete de documentación de entrega incluye:

1. Planos "as built" con rutas reales, no las diseñadas.
2. Esquema unifilar de la planta de fibra: cables, cantidad de fibras,
   empalmes y su ubicación georreferenciada.
3. Mapa de fibras por cable (color → destino → uso).
4. Certificaciones Tier 1 y Tier 2 (clase 9).
5. Inventario de equipos y transceptores instalados.
6. Fotos de cada punto de empalme cerrado y abierto.

Sin esto, la red es de quien la instaló, no de quien la pagó.

## Laboratorio 10 — Tendido y cierre

**Materiales:** tramo de ducto con curvas, cable exterior de 12 F, malla
de tiro y swivel, dinamómetro, mufa de empalme, bandejas, fusionadora,
etiquetadora, arnés (si hay estructura de práctica).

1. **Planificar**: medir la ruta, calcular metros con reserva, verificar
   tensión y radio del cable de práctica. Escribirlo antes de tocar nada.
2. **Tirar** el cable por el ducto con malla y swivel, midiendo la
   tensión con el dinamómetro. Registrar el pico. Discutir qué habría
   pasado con una curva de radio 5×D.
3. **Comprobar el daño invisible**: medir con OTDR antes y después del
   tendido y comparar la traza (la pérdida no debe cambiar).
4. **Armar la mufa**: pelar, fijar tracción, organizar tubos, fusionar 4
   fibras, colocar protectores en bandeja, cerrar y sellar.
5. **Etiquetar** los dos extremos y llenar la ficha de documentación con
   el formato TIA-606 del punto 6.
6. **Auditoría cruzada**: cada grupo revisa el trabajo de otro con una
   lista de verificación (radios, etiquetas, tapas, reservas, residuos) y
   entrega hallazgos.

**Entregable:** ficha de tendido (metros, tensión pico, radios), mapa de
la mufa y lista de hallazgos de la auditoría cruzada.

## Errores comunes

1. Tirar de la chaqueta o directamente del cable sin swivel: el cable se
   retuerce y las fibras del interior se tensionan.
2. Amarres plásticos apretados sobre fibra: microcurvaturas permanentes.
3. Enrollar el sobrante en círculos apretados dentro de una caja.
4. No dejar reservas: la primera reparación obliga a tender de nuevo.
5. Cerrar la mufa sin verificar sellado.
6. Etiquetar "después" (nunca ocurre).
7. Mirar el extremo de una fibra para ver "si tiene luz".
8. Restos de fibra en el suelo del cuarto de equipos.

## Preguntas de repaso

1. Cable de 14 mm de diámetro: ¿radio mínimo tirando y en reposo?
2. ¿Por qué el figura-8 en el suelo y no un rollo circular al tirar por
   tramos?
3. ¿Cuál es la única forma correcta de saber si una fibra tiene luz?
4. ¿Qué se sujeta al chasis de la mufa y por qué?
