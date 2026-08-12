# Clase 07 — Conectores, empalmes y componentes pasivos

**Duración:** 3 h (1 h teoría / 2 h laboratorio)
**Prerrequisitos:** clases 05-06

## Objetivos

- Identificar conectores SC, LC, FC, ST y MPO, y sus pulidos PC, UPC y APC.
- Explicar pérdida de inserción y pérdida de retorno, y por qué APC es
  obligatorio en redes con video RF.
- Ejecutar un empalme por fusión con pérdida ≤ 0,1 dB y justificar cuándo
  usar fusión, mecánico o conector de campo.
- Inspeccionar y limpiar un ferrule según IEC 61300-3-35.

## Por qué importa

**La mayoría de las fallas ópticas de campo no son de la fibra: son de la
interfaz.** Un ferrule sucio, un APC conectado contra un UPC o un empalme
apurado explican más cortes de servicio que cualquier otra causa.

## 1. Conectores

| Conector | Ferrule | Acople | Dónde se ve |
|---|---|---|---|
| **LC** | 1,25 mm | Push-pull con clip | El estándar actual: SFP, SFP+, QSFP breakout. Duplex compacto |
| **SC** | 2,5 mm | Push-pull cuadrado | ODF, GPON, equipos de operador. Muy robusto |
| **FC** | 2,5 mm | Rosca | Instrumentación, OTDR, entornos con vibración |
| **ST** | 2,5 mm | Bayoneta | Instalaciones antiguas multimodo |
| **MPO/MTP** | Rectangular, 12/24/16 fibras | Push-pull con llave | Troncales de centro de datos, 40/100/400G |
| **E2000** | 1,25 mm | Con obturador automático | Operadores en Europa |

Los conectores **de campo** (mecánicos, tipo *fast connector*) se montan
sin fusionadora: prácticos para FTTH y emergencias, pero con más pérdida
(0,3-0,5 dB típico) y menos estabilidad en el tiempo que un pigtail
fusionado. Criterio profesional: **pigtail fusionado siempre que se
pueda**; conector de campo solo para acometidas de abonado o reparación
urgente.

## 2. Pulidos: PC, UPC y APC

| Pulido | Geometría | Return loss típico | Color |
|---|---|---|---|
| PC | Curvo | 35-40 dB | Negro/beige |
| **UPC** | Curvo, ultra pulido | **≥ 50 dB** | **Azul** |
| **APC** | Curvo, en ángulo de **8°** | **≥ 60 dB** | **Verde** |

El ángulo de 8° del APC hace que la luz reflejada salga del núcleo hacia
el cladding en vez de volver al transmisor. Se usa obligatoriamente
cuando hay **video RF sobre 1550 nm** (una reflexión alta degrada la
imagen) y es el estándar de la mayoría de las redes FTTH/GPON.

**Regla absoluta: APC solo con APC.** Conectar un APC contra un UPC
deja un hueco de aire por el ángulo: pérdida de inserción enorme
(> 1 dB), reflexión pésima y, si se aprieta, **daño físico permanente en
los dos ferrules**. Por eso el verde es un código de color que se
respeta sin excepción.

## 3. Pérdida de inserción y pérdida de retorno

- **Pérdida de inserción (IL)**: cuánta luz se pierde al atravesar el
  componente. Se mide en dB, positiva.
- **Pérdida de retorno (RL / ORL)**: cuánta luz vuelve reflejada.
  **Cuanto más alto el número en dB, mejor** (menos reflexión). Un
  −55 dB de reflectancia = 55 dB de return loss.

Valores de referencia:

| Elemento | Máximo de norma (TIA-568) | Típico en obra bien hecha |
|---|---|---|
| Conector (par acoplado) | **0,75 dB** | 0,15-0,35 dB |
| Conector de fábrica (pigtail) | — | 0,10-0,20 dB |
| **Empalme por fusión** | **0,3 dB** | **0,02-0,05 dB** |
| Empalme mecánico | 0,3 dB | 0,10-0,30 dB |
| Conector de campo | 0,75 dB | 0,30-0,50 dB |

Causas de pérdida en la unión de dos fibras:

1. **Desalineación lateral** — la más crítica: 1 µm de desplazamiento en
   monomodo ya cuesta ~0,2 dB.
2. **Separación axial** (hueco de aire) — añade reflexión de Fresnel.
3. **Desalineación angular**.
4. **Diferencia de diámetro de campo modal** entre las dos fibras.
5. **Suciedad** — la causa número uno en la práctica.

## 4. Empalme por fusión

Proceso:

1. **Pelar**: retirar el recubrimiento de 250 µm (o el buffer de 900 µm)
   con la peladora, dejando unos 3-4 cm de fibra desnuda.
2. **Limpiar**: alcohol isopropílico ≥ 99 % y paño sin pelusa, un solo
   pase por dirección. **Nunca tocar la fibra desnuda con los dedos.**
3. **Cortar**: cortadora de precisión (*cleaver*). El corte debe quedar a
   90° ± 0,5°. Un mal corte es la causa más frecuente de un empalme malo.
   Guardar los restos en el contenedor de descartes: son astillas de
   vidrio invisibles y peligrosas.
4. **Colocar el protector** (manguito termocontraíble) **antes** de
   fusionar — olvidarlo obliga a rehacer el empalme.
5. **Fusionar**: la máquina alinea (por núcleo en las buenas, por
   revestimiento en las básicas), y funde con arco eléctrico. Muestra una
   **pérdida estimada**: es una estimación por análisis de imagen, no una
   medición. La medición real la da el OTDR o el juego fuente-medidor.
6. **Prueba de tracción** automática de la fusionadora.
7. **Termocontraer** el protector y colocarlo en la bandeja respetando el
   radio de curvatura.

Criterios de aceptación en obra: **≤ 0,10 dB por empalme** (muchos
contratos exigen ≤ 0,05 dB de promedio). Si la fusionadora estima más de
eso, se corta y se rehace.

Mantenimiento de la fusionadora: limpieza de los electrodos y de las
ranuras en V con alcohol, calibración de arco al cambiar de altitud o
ambiente (la densidad del aire cambia el arco), y reemplazo de electrodos
cada ~2000-3000 arcos según el fabricante.

## 5. Limpieza e inspección (IEC 61300-3-35)

**El protocolo es: inspeccionar → limpiar → volver a inspeccionar →
conectar.** Nunca limpiar a ciegas ni conectar sin inspeccionar.

- **Microscopio de inspección** con aumento ≥ 200×, idealmente sonda
  digital con análisis automático PASS/FAIL según IEC 61300-3-35, que
  clasifica defectos por zona (núcleo, cladding, epoxi, contacto) y por
  tipo (rayas vs partículas).
- La zona crítica es el **núcleo**: en monomodo **no se admite ningún
  defecto ≥ 3 µm** en la zona del núcleo.
- Limpieza en seco: casete de cinta o *click-cleaner* tipo bolígrafo.
- Limpieza húmeda: alcohol isopropílico ≥ 99 % + paño, y secar. El
  alcohol que queda evaporándose atrapa polvo.
- **Limpiar los dos lados**: el ferrule del latiguillo **y** el adaptador
  o el puerto del transceptor.
- No soplar con aire comprimido de lata: puede depositar propelente.
- Tapar todo puerto y todo conector desconectado, siempre.

Dato para convencer al escéptico: una partícula de 9 µm sobre un núcleo
monomodo de 9 µm lo tapa por completo. Y al conectar, esa partícula se
incrusta en **los dos** ferrules.

## 6. Componentes pasivos

| Componente | Función | Pérdida típica |
|---|---|---|
| **Adaptador / acoplador** | Une dos conectores | Contabilizada en el par de conectores |
| **ODF / distribuidor** | Panel de terminación en rack, con bandejas de empalme | 1 par de conectores |
| **Pigtail** | Fibra con conector de fábrica en un extremo, para fusionar en el otro | Conector 0,1-0,2 dB + empalme |
| **Latiguillo (patch cord)** | Conectores en ambos extremos | 2 conectores |
| **Splitter PON** | Divide la señal a N salidas | 1:8 ≈ 10,5 dB; 1:32 ≈ 17,0 dB (clase 12) |
| **Atenuador** | Reduce potencia a propósito (5, 10, 15 dB) | Su valor nominal |
| **WDM / multiplexor** | Combina longitudes de onda | 0,5-1,5 dB por canal (clase 11) |
| **Caja de empalme (mufa)** | Protege los empalmes en planta externa | — |

**El atenuador no es opcional en enlaces cortos con óptica de larga
distancia**: un SFP ER de 40 km conectado a 2 km satura el receptor
(*overload*) y el enlace no levanta o da errores. Se calcula en la
clase 8.

## 7. MPO y polaridad

Un MPO agrupa 12 (o 24, o 16) fibras en un solo conector. Detalles que
importan:

- Tiene **llave (key)** arriba o abajo y **pines guía**: un extremo
  macho (con pines) contra uno hembra (sin pines). **Nunca dos machos**.
- Existen en UPC y APC.
- La **polaridad** (que Tx de un lado llegue a Rx del otro) se resuelve
  con tres métodos definidos en TIA-568: **A** (troncal directo con
  latiguillos A-B), **B** (troncal cruzado, latiguillos rectos) y **C**
  (troncal con pares cruzados). Hay que elegir un método y aplicarlo a
  todo el sistema; mezclarlos deja enlaces muertos difíciles de rastrear.
- Se limpia con herramienta específica de MPO — un click-cleaner de LC no
  sirve.

## Laboratorio 7 — Fusión, inspección y medición

**Materiales:** fusionadora, cortadora, peladora, alcohol isopropílico
99 %, paños, protectores de empalme, pigtails SC/UPC, microscopio de
inspección, fuente y medidor de potencia, bandeja de empalme.

**Parte A — Inspección**
1. Inspeccionar un latiguillo nuevo recién destapado: fotografiar.
2. Tocar el ferrule con el dedo a propósito e inspeccionar de nuevo.
3. Limpiar en seco, inspeccionar. Si no pasa, limpieza húmeda e
   inspeccionar. Documentar los 4 estados.

**Parte B — Empalme**
1. Cada alumno realiza 3 empalmes por fusión. Registrar la pérdida
   estimada de cada uno.
2. Repetir uno **sin limpiar** la fibra y otro con **corte deliberadamente
   malo** (ángulo). Comparar la estimación y las imágenes de la
   fusionadora.
3. Medir la pérdida real del empalme con fuente y medidor (método de
   sustitución) y comparar con la estimación de la máquina.

**Parte C — Pérdida de conectores**
1. Medir la referencia con un latiguillo (método de 1 latiguillo).
2. Insertar un adaptador y un segundo latiguillo: la diferencia es la
   pérdida del par conectado. Repetirla 5 veces desconectando y volviendo
   a conectar: anotar la dispersión de resultados (enseña por qué se
   mide varias veces).
3. Con supervisión y material de descarte, intentar acoplar un APC contra
   un UPC en un adaptador híbrido y medir la pérdida. Discutir el daño.

**Entregable:** planilla con las pérdidas de los 3 empalmes, las 5
mediciones repetidas del conector y las 4 fotos de inspección.

## Errores comunes

1. Conectar sin inspeccionar. Es *el* error.
2. Olvidar el manguito protector antes de fusionar.
3. Usar alcohol al 70 % (tiene 30 % de agua: deja residuo).
4. Reutilizar el paño de limpieza.
5. Tomar la pérdida estimada de la fusionadora como medición certificada.
6. Mezclar APC y UPC.
7. Dejar el sobrante de fibra enrollado por debajo del radio mínimo en la
   bandeja.
8. No tapar los puertos: el polvo del rack termina dentro del SFP.

## Preguntas de repaso

1. ¿Por qué APC tiene mejor return loss que UPC y dónde es obligatorio?
2. Un empalme por fusión da 0,4 dB estimados. ¿Se acepta? ¿Qué se
   revisa primero?
3. ¿Cuántos pares de conectores hay en un enlace: PC → ODF-A → ODF-B →
   switch, con latiguillo en cada extremo?
4. ¿Qué pasa si se conectan dos MPO macho?
