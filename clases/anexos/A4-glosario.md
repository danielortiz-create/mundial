# Anexo A4 — Glosario

**ADSS** — *All-Dielectric Self-Supporting*. Cable de fibra sin partes
metálicas que soporta su propio peso en vano aéreo.

**AOC** — *Active Optical Cable*. Fibra con transceptores integrados y no
desmontables.

**APC** — *Angled Physical Contact*. Pulido de ferrule con 8° de ángulo;
return loss ≥ 60 dB. Conector verde. Solo se acopla con APC.

**Apertura numérica (NA)** — Medida del cono de luz que la fibra acepta.
`NA = √(n₁²−n₂²)`.

**ARP** — Protocolo que traduce una IP conocida a la MAC correspondiente.

**Atenuación** — Pérdida de potencia, en dB o dB/km.

**Backbone** — Cableado vertical o entre edificios.

**BiDi** — Transceptor que usa dos longitudes de onda opuestas sobre una
sola fibra.

**BPDU** — Trama de control de spanning tree. *BPDU guard* apaga el
puerto de acceso que recibe una.

**Canal** — Enlace completo incluyendo latiguillos: máximo 100 m en cobre.

**CCA** — *Copper Clad Aluminum*. Cable con conductor de aluminio
recubierto de cobre. No cumple norma; prohibido en obra seria.

**Cleaver** — Cortadora de precisión de fibra. Su estado define la
calidad del empalme.

**CoS / PCP** — 3 bits de prioridad dentro de la etiqueta 802.1Q.

**CRC / FCS** — Verificación de errores de la trama Ethernet. Contador
de CRC en aumento = problema de capa 1.

**CSMA/CD** — Método de acceso del Ethernet compartido. Obsoleto con
switches full-duplex.

**CWDM** — Multiplexación por longitud de onda con separación de 20 nm,
hasta 18 canales.

**DAC** — *Direct Attach Copper*. Cable de cobre con transceptores
integrados, hasta ~7 m pasivo.

**dB** — Relación entre dos potencias. 3 dB = mitad o doble.

**dBm** — Potencia absoluta referida a 1 mW. 0 dBm = 1 mW.

**DDM / DOM** — Telemetría del transceptor: Tx, Rx, temperatura, tensión
y corriente de polarización.

**Dispersión cromática** — Ensanchamiento del pulso porque cada longitud
de onda viaja a distinta velocidad.

**Dispersión modal** — Ensanchamiento del pulso en multimodo porque los
modos recorren caminos de distinta longitud.

**Dominio de colisión** — Conjunto de puertos donde dos transmisiones se
pisan. Un switch crea uno por puerto.

**Dominio de difusión** — Alcance de un broadcast. Una VLAN = uno.

**Drop** — Acometida de fibra desde la red hasta el domicilio.

**DSCP** — 6 bits de prioridad en la cabecera IP; sobrevive al
enrutamiento.

**Duplex mismatch** — Un extremo en full y el otro en half. Síntoma:
enlace lento con *late collisions*.

**EDFA** — Amplificador óptico de fibra dopada con erbio; opera en banda
C (1550 nm).

**EMB** — *Effective Modal Bandwidth*, en MHz·km. Métrica de calidad del
multimodo.

**Encircled flux** — Condición de lanzamiento normalizada para medir
multimodo de forma reproducible.

**Enlace permanente** — El cable fijo instalado, sin latiguillos: máximo
90 m.

**Feeder** — Tramo de fibra entre el OLT y el primer punto de división.

**Ferrule** — Casquillo cerámico que sujeta y alinea la fibra en el
conector (1,25 o 2,5 mm).

**Fresnel (reflexión de)** — Luz reflejada en un cambio de índice; genera
los picos de la traza OTDR.

**FTTH** — *Fiber To The Home*.

**Fusión (empalme por)** — Unión permanente de dos fibras por arco
eléctrico. Pérdida típica 0,02-0,05 dB.

**G.652.D** — Fibra monomodo estándar *low water peak*: la de uso
general.

**G.657** — Fibra monomodo insensible a la curvatura.

**Ganancia aparente** — Escalón "hacia arriba" en la traza OTDR por
distinto coeficiente de retrodispersión; se resuelve midiendo
bidireccional.

**GPON** — PON de 2,488/1,244 Gbps (ITU-T G.984).

**IFG** — *Inter-Frame Gap*: 96 tiempos de bit de silencio entre tramas.

**IL** — *Insertion Loss*, pérdida de inserción.

**IOR** — Índice de refracción configurado en el OTDR para convertir
tiempo en distancia.

**Jumbo frame** — Trama de más de 1500 bytes de MTU (hasta ~9000). No es
estándar; debe habilitarse en todo el camino.

**LACP** — Protocolo de agregación de enlaces (802.1AX). El tráfico se
reparte por flujo, no por paquete.

**Latiguillo / patch cord** — Cable con conectores en ambos extremos.

**LLDP-MED** — Extensión de LLDP que negocia potencia PoE con
granularidad de 0,1 W.

**Loose tube** — Construcción de cable con fibras sueltas en tubos con
gel; uso exterior.

**LSZH** — Chaqueta libre de halógenos y de baja emisión de humo.

**MAC** — Dirección física de 48 bits de una interfaz.

**Macrocurvatura** — Pérdida por doblar el cable por debajo de su radio
mínimo. Se ve mucho peor en 1550 nm.

**Microcurvatura** — Pérdida por presión puntual (amarre apretado, cable
aplastado).

**MPO / MTP** — Conector multifibra de 12, 16 o 24 fibras.

**MTU** — Tamaño máximo de datos de la trama; 1500 B en Ethernet.

**Mufa** — Caja de empalme de planta externa.

**NAP** — Caja terminal donde se conectan las acometidas de abonado.

**NEXT** — Diafonía en el extremo cercano; el parámetro que arruina el
destrenzado excesivo.

**ODF** — Distribuidor de fibra en rack.

**ODN** — Toda la planta pasiva de una red PON.

**OLT** — Equipo del operador que alimenta los puertos PON.

**OLTS** — *Optical Loss Test Set*: fuente + medidor, para certificación
Tier 1.

**OM1-OM5 / OS1-OS2** — Grados de fibra multimodo y monomodo (ISO/IEC
11801).

**ONT / ONU** — Equipo terminal óptico en el domicilio.

**ORL / Return loss** — Luz reflejada, en dB. Cuanto más alto, mejor.

**OTDR** — Reflectómetro óptico: mide por retrodispersión y ubica cada
evento del enlace (Tier 2).

**PD / PSE** — Dispositivo alimentado / equipo que alimenta, en PoE.

**Pigtail** — Fibra con conector de fábrica en un extremo, para fusionar
en el otro.

**PoE** — Alimentación por el cable Ethernet (802.3af/at/bt).

**PON** — Red óptica pasiva: sin electrónica entre el OLT y el abonado.

**PortFast / edge port** — Puerto que pasa a reenviar sin esperar a STP.
Solo en puertos de acceso.

**PMD** — *Polarization Mode Dispersion*.

**Rayleigh (dispersión de)** — Dispersión intrínseca del vidrio; genera
la retrodispersión que el OTDR mide y explica por qué 1550 atenúa menos.

**RSTP** — Spanning tree rápido (802.1w), convergencia de 1-3 s.

**Runt / Giant** — Trama menor a 64 B / mayor a la MTU permitida.

**SFP / SFP+ / QSFP** — Formatos de transceptor: 1 G / 10 G / 40-100 G.

**Splitter** — Divisor óptico pasivo 1:N de una red PON.

**STP** — Spanning Tree Protocol: evita bucles bloqueando puertos.

**SVI** — Interfaz virtual de VLAN con IP en un switch de capa 3.

**T568A / T568B** — Los dos códigos de colores de RJ45. No se mezclan.

**Tier 1 / Tier 2** — Certificación con OLTS (pérdida total) / con OTDR
(evento por evento).

**Tight buffer** — Construcción con buffer de 900 µm sobre cada fibra;
uso interior.

**Trunk** — Puerto que transporta varias VLANs etiquetadas.

**UDLD** — Detecta enlaces de fibra unidireccionales (una fibra rota).
Evita bucles.

**UPC** — *Ultra Physical Contact*: return loss ≥ 50 dB. Conector azul.

**VFL** — Localizador visual de fallas: láser rojo de 650 nm.

**VLAN** — Dominio de difusión lógico; etiqueta de 12 bits (1-4094).

**VLAN nativa** — La VLAN que viaja sin etiqueta por un trunk. Debe
coincidir en ambos extremos.

**WDM** — Multiplexación por longitud de onda (CWDM/DWDM).

**Wire map** — Verificación pin a pin de un cable de cobre.

**XGS-PON** — PON de 10 Gbps simétricos; coexiste con GPON en la misma
fibra.

**Zona muerta** — Tramo tras un evento reflectivo donde el OTDR no puede
distinguir (de evento) o medir (de atenuación). Se resuelve con fibra de
lanzamiento.
