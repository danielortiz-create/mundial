# Anexo A5 — Evaluación: respuestas, banco de preguntas y rúbricas

## Parte 1 — Respuestas a las preguntas de repaso

### Clase 01

1. Porque la MAC es direccionamiento **local del enlace**: solo tiene
   sentido dentro de un dominio de difusión. En cada salto, el router
   reescribe origen y destino MAC para el siguiente tramo, mientras la IP
   destino identifica al receptor final de extremo a extremo.
2. Hub de 8: **1** dominio de colisión y **1** de difusión. Switch de 8
   con 2 VLANs: **8** dominios de colisión (uno por puerto) y **2** de
   difusión.
3. Está bien. 300 Mbps ÷ 8 = 37,5 MB/s teóricos; 35 MB/s es ~93 % del
   máximo, normal descontando la sobrecarga de protocolo.
4. Patch panel: **capa 1**. Firewall que bloquea el puerto 443: **capa 4**
   (aunque un firewall moderno inspeccione también capa 7).

### Clase 02

1. 64 B de trama + 8 B (preámbulo + SFD) + 12 B de IFG = **84 B = 672
   bits**. A 1 Gbps: 10⁹ / 672 = **1 488 095 tramas/s**.
2. Las **late collisions** (colisiones después del byte 64) en un puerto
   configurado full-duplex. Un cable dañado da CRC y runts, pero no late
   collisions.
3. Por **capa 1**: inspeccionar y limpiar conectores, revisar el cable o
   la fibra, verificar Rx óptico, y comparar los contadores de los dos
   extremos. El CRC no es congestión.
4. Porque la etiqueta 802.1Q agrega 4 bytes a los 1518 del máximo
   estándar.

### Clase 03

1. Cat6: **55 m** (menos si hay alien crosstalk alto). Cat6A: **100 m**.
2. **No certifica**: el enlace permanente admite 90 m. Se reubica el
   recorrido, se acerca el cuarto de telecomunicaciones o se agrega un
   punto de consolidación; instalar fibra si la ruta no puede acortarse.
3. **Return loss** (y NEXT). El probador de continuidad solo verifica el
   camino de cada hilo, no el comportamiento en frecuencia.
4. Porque 1000BASE-T transmite **en paralelo por los 4 pares** y los
   recombina en el receptor: si llegan desfasados, la recuperación falla.
   100BASE-TX usaba un par por sentido, sin necesidad de sincronía entre
   pares.

### Clase 04

1. **802.3bt Type 3** (51 W en el PD). PoE+ solo garantiza 25,5 W.
2. Porque el PSE aplica primero un voltaje bajo de detección y solo
   entrega potencia si encuentra la firma de **25 kΩ**.
3. 370 W × 0,8 = 296 W útiles ÷ 12 W = **24 cámaras** — es decir, el
   switch queda al límite de sus 24 puertos: no hay margen de
   crecimiento y conviene un modelo mayor.
4. `show power inline`: si el estado es "no detectado / off" el PD no
   presentó firma (cable, PD o modo incompatible); si dice "power denied"
   o "insufficient power", detectó pero no hay presupuesto.

### Clase 05

1. **3 dB**.
2. El pico de absorción por iones OH⁻ en 1383 nm inutilizaba esa región.
   Las fibras *low water peak* (G.652.D) lo eliminan y liberan toda la
   banda de 1260 a 1625 nm, que es lo que hace posible CWDM completo.
3. **La dispersión modal** (ancho de banda modal, EMB). La atenuación de
   300 m de fibra multimodo es de ~1 dB: no es el límite.
4. arcsen(0,20) = **11,5°**.

### Clase 06

1. 250 m con 40 G a futuro: **monomodo OS2** — 40GBASE-SR4 solo llega a
   150 m en OM4. 1,2 km entre edificios: **monomodo OS2 G.652.D**, cable
   exterior.
2. 4700 MHz·km significa que a **400 m** el ancho de banda modal es de
   ~11,75 GHz, suficiente para 10 Gbps con margen.
3. Fibra 15 de 24 en 2 tubos de 12: **tubo naranja (el 2º), fibra 3 =
   verde**.
4. Porque tolera radios de curvatura muy pequeños (7,5-10 mm), que es
   exactamente lo que ocurre en cajas de piso, canaletas y acometidas de
   apartamento.

### Clase 07

1. El ángulo de 8° hace que la luz reflejada salga del núcleo hacia el
   cladding en vez de regresar al transmisor. Obligatorio donde hay
   **video RF sobre 1550 nm** y estándar en redes **FTTH/GPON**.
2. **No se acepta**: la norma admite 0,3 dB y la práctica exige ≤ 0,1 dB.
   Se revisa primero el **corte** (estado del cleaver) y la **limpieza**;
   después electrodos y programa de fusión.
3. **4 pares de conectores**: uno en el transceptor de cada extremo y uno
   en cada ODF.
4. Los pines guía chocan: no acoplan correctamente y se **dañan
   físicamente los dos ferrules**.

### Clase 08

1. −5 − (−22) = **17 dB**.
2. Los **conectores**: 1,20 dB frente a 1,05 dB de fibra en el ejemplo de
   300 m sobre OM4.
3. No se entrega sin más: se propone reducir puntos de conexión, cambiar
   a 1550 nm o a una óptica con más presupuesto, o acortar la ruta. Si el
   cliente acepta el riesgo, se documenta y se prohíbe agregar empalmes
   sin recálculo.
4. El receptor está **saturado** (recibe más potencia que su límite de
   overload): se instala un atenuador fijo o se usa la óptica correcta
   para la distancia.

### Clase 09

1. Porque el método de **1 latiguillo** incluye en la medición los dos
   conectores extremos del enlace; el de 3 los excluye. Para certificar
   un enlace que se conectará a equipos se usa el de **1 latiguillo**.
2. Una **macrocurvatura**: la pérdida por curvatura crece mucho con la
   longitud de onda. Se corrige localizando el punto con el OTDR y
   liberando la curva.
3. Para sacar el primer conector de la **zona muerta**. Sin ella, el
   conector del extremo A no se puede medir y el informe queda incompleto.
4. Un **evento fantasma**: eco de la reflexión de 4 km. No tiene pérdida
   asociada y desaparece al reducir el ancho de pulso.

### Clase 10

1. 14 mm × 20 = **280 mm** durante el tendido; 14 mm × 10 = **140 mm**
   instalado.
2. Porque el rollo circular acumula una torsión por vuelta y el cable se
   retuerce al volver a tirarlo; el figura-8 la compensa.
3. Con un **medidor de potencia óptica**. Nunca mirando el extremo.
4. El **elemento de tracción** (central y aramida) y los tubos, al chasis
   de la caja: así ninguna tensión llega a los empalmes ni a las fibras.

### Clase 11

1. El receptor está **saturado**: llegan +1 dBm cuando su límite de
   overload es −1 dBm, es decir 2 dB de más. Se instala un atenuador
   fijo (5 dB deja el Rx en −4 dBm) o se cambia a una óptica acorde a la
   distancia real del enlace.
2. El AOC trae los transceptores **integrados y no desmontables**, sin
   conectores ópticos accesibles: no se parchea, no se limpia y no se
   reutiliza por partes.
3. **8 enlaces de 10 G** sobre un par de fibras. Al presupuesto hay que
   sumarle la pérdida del multiplexor **en los dos extremos** (1,5-3 dB
   cada uno).
4. **Fibras invertidas o cortadas**: primero se verifica la polaridad del
   parcheo y la continuidad con VFL, y que el puerto remoto esté activo.

### Clase 12

1. **17 dB**. De los 28 dB de clase B+ quedan **11 dB** para fibra,
   conectores, empalmes y margen.
2. Porque usa **longitudes de onda distintas** (1577/1270 nm frente a
   1490/1310 nm de GPON): con un multiplexor de coexistencia ambas
   conviven en la misma ODN.
3. −25 dBm es **marginal**: se compara con la línea base del alta, se
   inspecciona y limpia el conector del domicilio y del NAP, se revisa el
   drop por curvaturas y, si persiste, se mide con OTDR **desde el
   abonado**.
4. **Desde el abonado hacia el OLT**: medido desde el OLT, el splitter
   superpone todas las ramas y la traza es inservible para una rama
   concreta.

### Clase 13

1. La **inunda** por todos los puertos de esa VLAN excepto el de entrada.
2. **4094**, porque el campo VID es de 12 bits (4096 valores) y 0 y 4095
   están reservados.
3. En orden: (a) VLAN asignada al puerto — `show interface status`;
   (b) que la VLAN exista en la base de datos — `show vlan brief`;
   (c) que esté permitida en el trunk en **ambos** extremos —
   `show interfaces trunk`; (d) DHCP relay o alcance del servidor.
4. *Untagged* describe un **puerto de acceso** (todo su tráfico sale sin
   etiqueta). La **VLAN nativa** es la única VLAN que viaja sin etiqueta
   **dentro de un trunk** que sí etiqueta las demás.

### Clase 14

1. Porque en capa 2 **no existe TTL**: la trama circula indefinidamente y
   se multiplica en cada switch. En capa 3, el TTL del paquete IP lo
   descarta tras 255 saltos como máximo.
2. **2000**. Un costo menor significa un camino preferido hacia la raíz:
   STP elige el de menor costo acumulado.
3. **No está roto**: LACP reparte por flujo mediante hash, y un único
   flujo siempre viaja por un solo miembro. Para superar 1 Gbps hacen
   falta varios flujos simultáneos.
4. **CoS** son 3 bits de la etiqueta 802.1Q: existe solo en tramas
   etiquetadas y desaparece al quitar la etiqueta. **DSCP** vive en la
   cabecera IP y sobrevive al enrutamiento de extremo a extremo.

### Clase 15

1. ¿A quién afecta (uno, un grupo, todos)? ¿Desde cuándo y es constante o
   intermitente? ¿Qué cambió en la red o en el equipo?
2. **Congestión**: utilización alta del enlace y `output drops`, sin CRC.
   **Capa 1**: CRC e input errors creciendo, con utilización normal.
3. **43,8 minutos** al mes.
4. Porque comprueba si se establece la **conexión TCP** al puerto real
   del servicio: si abre, la red y el firewall están bien y el problema
   es de la aplicación; si no abre, el problema es de red o de filtrado.

## Parte 2 — Banco de preguntas de examen

### Examen parcial 1 (tras la clase 8) — 40 puntos

**Sección A — Respuesta breve (2 pts c/u)**

1. Nombrar la capa OSI de: patch panel, switch, router, firewall L4.
2. ¿Cuál es el tamaño mínimo y máximo de una trama Ethernet y por qué
   existe el mínimo?
3. Explicar el modelo 90 + 10 del cableado de cobre.
4. ¿Qué diferencia hay entre PSE y PD? Dar la potencia de PoE+ en ambos.
5. Convertir: 0 dBm a mW; −13 dBm a mW; una pérdida del 50 % a dB.
6. ¿Por qué 1550 nm atenúa menos que 1310 nm?
7. ¿Qué es la apertura numérica y qué implica al unir dos fibras
   distintas?
8. Diferencia entre OM3 y OM4 en distancia a 10 Gbps.
9. ¿Por qué APC no se acopla con UPC?
10. ¿Qué es el margen de un presupuesto óptico y cuánto se recomienda?

**Sección B — Cálculo (10 pts)**

Un enlace monomodo de 6,5 km a 1310 nm tiene 4 pares de conectores y 3
empalmes por fusión. El transceptor tiene Tx mín −8,0 dBm, sensibilidad
−18,0 dBm y saturación −2,0 dBm.

a) Pérdida total con valores de diseño.
b) Presupuesto y margen. ¿Es aceptable?
c) Recalcular con los máximos de norma. ¿Sigue pasando?
d) Si el enlace real fuera de 300 m en vez de 6,5 km y el Tx máximo
   fuera −1,0 dBm, ¿habría problema? ¿Cuál y cómo se corrige?

**Sección C — Caso (10 pts)**

Un cliente pide conectar dos edificios a 700 m con 10 Gbps y "lo más
barato posible". Argumentar por escrito la elección de medio, fibra,
cantidad de hilos y transceptores, con los números que la sustentan, e
indicar qué pasaría si se eligiera Cat6A o multimodo OM3.

### Examen parcial 2 (tras la clase 15) — 40 puntos

**Sección A — Respuesta breve (2 pts c/u)**

1. ¿Para qué sirve la fibra de lanzamiento en un OTDR?
2. Interpretar: escalón de 0,3 dB sin pico. ¿Dos causas posibles y cómo
   se distinguen?
3. ¿Qué es una ganancia aparente y cómo se resuelve?
4. Radio mínimo de curvatura de un cable de 10 mm tirando y en reposo.
5. Tres valores del DOM y qué diagnostica cada uno.
6. ¿Cuánto cuesta en dB un splitter 1:16 y uno 1:32?
7. ¿Por qué XGS-PON convive con GPON?
8. ¿Qué hace BPDU guard y dónde se aplica?
9. ¿Por qué un LACP de 4×1 G no da 4 Gbps a una sola transferencia?
10. Diferencia entre CoS y DSCP.

**Sección B — Diagnóstico (10 pts)**

Para cada síntoma, escribir la hipótesis más probable, **la prueba que la
confirma o descarta** y la solución:

a) Puerto de fibra up, sin tráfico, DOM Rx = −40 dBm en ambos extremos.
b) Enlace de cobre a 100 Mbps que debería ir a 1 G, con late collisions.
c) Cámara PoE que reinicia cada pocos minutos.
d) Toda la red cae; los switches al 100 % de CPU; MAC flapping en el log.
e) Un enlace de fibra funciona pero acumula CRC desde hace un mes; el Rx
   bajó de −6 a −11 dBm respecto del alta.

**Sección C — Configuración (10 pts)**

Escribir la configuración de dos switches para: VLAN 10 (datos), 20
(voz), 99 (gestión); puertos 1-20 de acceso con voz, uplink trunk de
fibra con VLAN nativa 999, raíz de spanning tree en el switch A,
protecciones de borde y una IP de gestión por switch.

### Preguntas de defensa oral (proyecto final)

Ver la lista de la [clase 16](../16-proyecto-final.md#5-defensa-15-minutos-por-grupo).

## Parte 3 — Rúbricas

### Rúbrica de laboratorio (cada práctica, 10 pts)

| Criterio | 0-4 | 5-7 | 8-10 |
|---|---|---|---|
| **Seguridad y orden** | Residuos de fibra sueltos, sin gafas, mirar puertos ópticos | Cumple pero con recordatorios | Impecable sin supervisión |
| **Método** | Prueba al azar | Sigue el procedimiento con ayuda | Procedimiento propio, ordenado y justificado |
| **Resultado técnico** | Fuera de especificación | Dentro de norma | Dentro de valores típicos de obra buena |
| **Registro** | Sin datos | Datos incompletos | Planilla completa y trazable |

### Rúbrica del proyecto final

**Diseño y cálculos — 30 %**

| Nivel | Descriptor |
|---|---|
| Insuficiente | Falta el presupuesto óptico o hay errores de unidad (dB/dBm) |
| Suficiente | Presupuesto correcto pero sin verificar saturación ni márgenes |
| Bueno | Presupuesto completo, con márgenes y verificación de saturación |
| Excelente | Además compara alternativas (ventana, óptica, división) con números y justifica la elegida |

**Ejecución física — 25 %**

| Nivel | Descriptor |
|---|---|
| Insuficiente | Empalmes > 0,3 dB, radios violados, sin etiquetas |
| Suficiente | Empalmes dentro de norma, terminación aceptable |
| Bueno | Empalmes ≤ 0,1 dB, gestión de fibra correcta, etiquetado TIA-606 completo |
| Excelente | Trabajo que se podría entregar a un cliente sin retoques; reservas, tapas y documentación de bandeja incluidas |

**Certificación y mediciones — 20 %**

| Nivel | Descriptor |
|---|---|
| Insuficiente | Sin certificar, o método de referencia incorrecto |
| Suficiente | Tier 1 en una longitud de onda y un sentido |
| Bueno | Tier 1 bidireccional en dos longitudes de onda + Tier 2 con fibra de lanzamiento |
| Excelente | Además compara medido vs calculado y explica cada diferencia > 0,5 dB |

**Configuración de red — 15 %**

| Nivel | Descriptor |
|---|---|
| Insuficiente | No hay conectividad, o VLAN 1 usada para todo |
| Suficiente | VLANs y trunk funcionando |
| Bueno | Además STP con raíz fijada, protecciones de borde y gestión separada |
| Excelente | Diseño defendible: seguridad de puerto, QoS de voz, redundancia y plan de crecimiento |

**Documentación y defensa — 10 %**

| Nivel | Descriptor |
|---|---|
| Insuficiente | Sin planos ni respaldos |
| Suficiente | Documentación básica |
| Bueno | Paquete completo de entrega (clase 10, sección 6) |
| Excelente | Documentación que permite a un tercero operar la red sin preguntar nada |

### Criterios de reprobación automática

Independientemente del puntaje:

1. Mirar el extremo de una fibra o el puerto de un transceptor.
2. Restos de fibra fuera del contenedor de descartes.
3. Entregar un empalme fuera de norma sin rehacerlo.
4. Ausencia de presupuesto óptico en el diseño.
5. Conectores sin inspeccionar ni tapar.
6. Falsear una medición.
