# Anexo A3 — Fórmulas y tablas de bolsillo

Hoja de referencia para imprimir y llevar a campo. Los valores marcados
como *típicos* se usan para diseñar; los *máximos de norma*, para
aceptar una obra.

## 1. Fórmulas

```
dB           = 10 · log₁₀ (P_sal / P_ent)
dBm          = 10 · log₁₀ (P / 1 mW)
Pérdida      = P_entrada(dBm) − P_salida(dBm)

Presupuesto  = P_Tx_mínima(dBm) − Sensibilidad_Rx(dBm)
Pérdida enlace = (km × dB/km) + (nº conectores × dB) + (nº empalmes × dB) + pasivos
Margen       = Presupuesto − Pérdida        → objetivo ≥ 3 dB exterior, ≥ 2 dB interior
Saturación   : P_Tx_máxima − Pérdida  <  Overload_Rx

θc  = arcsen(n₂/n₁)              NA = √(n₁² − n₂²)         θmax = arcsen(NA)
n   = c / v                      IOR SMF ≈ 1,4675 @1310 nm

t(s) = tamaño(bits) / velocidad(bit/s)
Disponibilidad = MTBF / (MTBF + MTTR)
Pérdida real de empalme = (medición A→B + medición B→A) / 2
```

**Reglas de dB:** dBm − dBm = dB · dBm − dB = dBm · **dBm + dBm = nada**.

## 2. Conversión rápida de dB

| dB | Potencia que queda | | dBm | mW |
|---|---|---|---|---|
| 0 | 100 % | | +10 | 10 |
| 1 | 79 % | | +3 | 2 |
| **3** | **50 %** | | **0** | **1** |
| 6 | 25 % | | −3 | 0,5 |
| **10** | **10 %** | | −10 | 0,1 |
| 13 | 5 % | | −20 | 0,01 |
| 20 | 1 % | | −30 | 0,001 |
| 30 | 0,1 % | | −40 | 0,0001 |

## 3. Atenuación de la fibra

| Fibra | λ | Máx. de norma | Típico real |
|---|---|---|---|
| SMF | 1310 nm | 0,35 dB/km | 0,32-0,35 |
| SMF | 1550 nm | 0,25 dB/km | 0,19-0,22 |
| MMF | 850 nm | 3,5 dB/km | 2,3-3,0 |
| MMF | 1300 nm | 1,5 dB/km | 0,6-1,0 |

## 4. Pérdida de componentes

| Elemento | Máx. norma | Diseño |
|---|---|---|
| Par de conectores | 0,75 dB | 0,30 dB |
| Conector de fábrica (pigtail) | — | 0,10-0,20 dB |
| Empalme por fusión | 0,30 dB | 0,10 dB (real 0,02-0,05) |
| Empalme mecánico | 0,30 dB | 0,20 dB |
| Conector de campo | 0,75 dB | 0,40 dB |
| Mux CWDM (por canal) | — | 1,5-3,0 dB |

**Splitters PON:** 1:2 = 3,6 · 1:4 = 7,3 · 1:8 = 10,5 · 1:16 = 13,7 ·
1:32 = **17,0** · 1:64 = 20,5 dB

**Presupuestos PON:** GPON B+ = 28 dB · C+ = 32 dB · C++ = 35 dB ·
XGS-PON N1 = 29 dB · N2 = 31 dB

## 5. Fibra: distancias por aplicación

| Aplicación | OM3 | OM4 | OS2 |
|---|---|---|---|
| 1000BASE-SX / LX | 1000 m | 1100 m | 10 km (LX) |
| 10GBASE-SR / LR | 300 m | 400 m | 10 km (LR) |
| 10GBASE-ER / ZR | — | — | 40 / 80 km |
| 40GBASE-SR4 | 100 m | 150 m | — |
| 100GBASE-SR4 / LR4 | 70 m | 100 m | 10 km (LR4) |

Pérdida de canal máxima 10GBASE-SR: **2,6 dB (OM3) / 2,9 dB (OM4)**.
Presupuesto 10GBASE-LR: **6,2 dB**.

## 6. Cobre

| Categoría | MHz | 1 G | 10 G | 25/40 G |
|---|---|---|---|---|
| Cat5e | 100 | 100 m | — | — |
| Cat6 | 250 | 100 m | 55 m | — |
| **Cat6A** | 500 | 100 m | **100 m** | — |
| Cat8 | 2000 | — | 100 m | 30 m |

**Modelo de enlace:** 90 m permanente + 10 m de latiguillos = **100 m de
canal**. Destrenzado máximo **13 mm**. Radio de curvatura UTP: **4× el
diámetro**. Tensión de tiro UTP: **110 N (25 lbf)**.

**T568B:** BlNa · Na · BlVe · Az · BlAz · Ve · BlMa · Ma
**T568A:** BlVe · Ve · BlNa · Az · BlAz · Na · BlMa · Ma

## 7. PoE

| Estándar | Tipo | PSE | **PD** |
|---|---|---|---|
| 802.3af | 1 | 15,4 W | **12,95 W** |
| 802.3at | 2 | 30 W | **25,5 W** |
| 802.3bt | 3 | 60 W | **51 W** |
| 802.3bt | 4 | 90 W | **71,3 W** |

Firma de detección: **25 kΩ**. Tensión: 44-57 V DC. Dimensionar al
**80 %** del presupuesto del switch, sumando por la potencia del **PD**.

## 8. Ethernet

- Trama: **64 B mínimo**, **1518 B máximo** (1522 con etiqueta 802.1Q).
  MTU de datos 1500. IFG = 96 tiempos de bit.
- A 1 Gbps con tramas mínimas: **1 488 095 tramas/s** (64 + 8 + 12 = 84 B
  por trama en el cable).
- Etiqueta 802.1Q: 4 B — TPID 0x8100, PCP 3 bits, DEI 1 bit,
  **VID 12 bits → VLAN 1-4094**.
- EtherType: 0x0800 IPv4 · 0x0806 ARP · 0x86DD IPv6 · 0x8100 VLAN.
- Costos STP: 10 M = 2 000 000 · 100 M = 200 000 · 1 G = 20 000 ·
  10 G = 2 000 · 100 G = 200.

## 9. Radio de curvatura y tiro de fibra

| Situación | Radio mínimo |
|---|---|
| Cable durante el tendido (bajo tensión) | **20 × diámetro** |
| Cable instalado (en reposo) | **10 × diámetro** |
| Latiguillo G.657.A2 | 7,5-15 mm |
| Fibra en bandeja de empalme | El de la bandeja; nunca improvisar |

Siempre prevalece el valor de la hoja de datos del cable.

## 10. Radiografía de una traza OTDR

| Lo que se ve | Qué es |
|---|---|
| Pico + escalón | Conector / empalme mecánico |
| Escalón sin pico | Empalme por fusión o curvatura |
| Escalón mucho peor en 1550 que en 1310 | **Curvatura** |
| Pendiente | Atenuación de la fibra (dB/km) |
| Pico y caída al ruido | Fin de fibra o rotura |
| Pico repetido a distancia múltiplo, sin pérdida | Fantasma |
| Escalón "hacia arriba" | Ganancia aparente → medir bidireccional |

## 11. Colores

**Fibras y tubos (TIA-598-D):** Azul · Naranja · Verde · Marrón · Gris ·
Blanco · Rojo · Negro · Amarillo · Violeta · Rosa · Aguamarina

**Chaquetas:** Amarillo = monomodo · Naranja = OM1/OM2 · Aguamarina =
OM3/OM4 · Verde lima = OM5
**Conectores:** Verde = **APC** · Azul = UPC monomodo · Beige = MM

## 12. Disponibilidad

| SLA | Caída/año | Caída/mes |
|---|---|---|
| 99 % | 3,65 días | 7,2 h |
| 99,9 % | 8,76 h | 43,8 min |
| 99,99 % | 52,6 min | 4,4 min |
| 99,999 % | 5,26 min | 26 s |

## 13. Comandos de diagnóstico

```bash
ethtool eth0 ; ethtool -S eth0 ; ethtool -m eth0
ip -s link show eth0
ping -M do -s 1472 <ip>          # prueba de MTU 1500
iperf3 -c <ip> -t 30             # ancho de banda TCP
iperf3 -c <ip> -u -b 100M        # pérdida y jitter UDP
tcpdump -i eth0 -n host <ip>
```

```
show interface status | show interface <id>
show mac address-table
show vlan brief | show interfaces trunk
show spanning-tree
show power inline
show interface transceiver detail
```

## 14. Los cinco números que hay que saber sin mirar

1. **3 dB = la mitad de la potencia.**
2. **0,35 dB/km** en monomodo a 1310 nm.
3. **17 dB** cuesta un splitter 1:32.
4. **100 m** es el canal de cobre (90 + 10).
5. **25,5 W** es lo que entrega PoE+ al dispositivo.
