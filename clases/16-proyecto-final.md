# Clase 16 — Proyecto final integrador

**Duración:** 3 h de ejecución y defensa (+ trabajo previo por grupo)
**Prerrequisitos:** clases 01-15

## Objetivo

Ejecutar de punta a punta, en grupos de 3-4 personas, un enlace completo
entre dos "edificios": diseñarlo, calcularlo, instalarlo, certificarlo,
configurarlo, entregarlo documentado y defenderlo. Todo lo del curso se
usa una vez.

## El caso

> Una empresa tiene su sede administrativa (**Edificio A**) y su bodega
> (**Edificio B**) a **1,4 km** de distancia, con canalización
> subterránea disponible. Hoy se comunican por un enlace inalámbrico que
> falla con la lluvia.
>
> Necesitan:
> - Un enlace de **10 Gbps** entre los switches de core de ambos
>   edificios, con capacidad de crecer a 40 Gbps sin volver a tender.
> - En el edificio B: **12 cámaras IP PoE**, **4 puntos de acceso Wi-Fi**
>   y **20 puestos de trabajo**.
> - Separación de tráfico: datos, voz, cámaras, invitados y gestión.
> - Redundancia entre los dos switches de B (o justificación escrita de
>   por qué no se incluye).
> - Documentación completa y certificación de la obra.

## Entregables

### 1. Diseño (documento)

- Elección de fibra (tipo, cantidad de hilos, construcción de cable) con
  **justificación numérica**, no por costumbre.
- Elección de transceptores con hoja de datos.
- **Presupuesto óptico** completo con la tabla de la clase 8: pérdida
  desglosada, presupuesto, margen, y verificación de saturación.
- Cableado de cobre del edificio B: categoría, cantidad de puntos, ruta,
  distancias, tipo de chaqueta.
- **Presupuesto PoE**: consumo real por dispositivo, total, margen y
  modelo de switch elegido.
- Plan de VLANs con direccionamiento.
- Topología lógica con STP (quién es la raíz y por qué) y agregación si
  aplica.
- Lista de materiales (BoM) con cantidades.

### 2. Ejecución (en la maqueta del laboratorio)

- Tendido del tramo de fibra de práctica respetando tensión y radio.
- Al menos **2 empalmes por fusión** con su pérdida registrada.
- Terminación en ODF con pigtails, gestión de fibra y **etiquetado
  TIA-606**.
- Al menos **2 enlaces de cobre** ponchados y probados.
- Configuración de los switches: VLANs, trunk, gestión, PoE, STP con raíz
  fijada, protecciones de borde.

### 3. Certificación

- **Tier 1** en ambas longitudes de onda y en ambos sentidos, con el
  método de referencia declarado.
- **Tier 2**: traza OTDR con tabla de eventos, `.sor` incluido.
- Certificación de los enlaces de cobre (o al menos wire map + longitud
  si no hay certificador).
- Lectura de **DOM** de los transceptores instalados y registro de la
  **línea base de Rx**.
- Comparación medido vs calculado, con explicación de la diferencia.

### 4. Documentación de entrega

- Planos as-built y esquema unifilar de la fibra.
- Mapa de fibras (color → destino → uso).
- Tabla de puertos y VLANs.
- Respaldo de configuración de los equipos.
- Fotos de inspección de conectores y de los puntos de empalme.
- Manual de operación de una página: cómo verificar el estado del enlace,
  qué alarmas mirar, qué repuestos hay y a quién llamar.

### 5. Defensa (15 minutos por grupo)

Cada grupo presenta el diseño y responde preguntas. Preguntas garantizadas
del jurado:

1. ¿Por qué esa fibra y no la otra? Dar los números.
2. ¿Cuál es el margen del enlace y qué pasa si mañana hay que reparar un
   corte con dos empalmes más?
3. ¿Qué pasa si se agregan 6 cámaras más al switch de B?
4. ¿Qué falla primero en este diseño y cómo se enterarían?
5. Muestren la certificación de la fibra 3. ¿Por qué esa pérdida?

## Criterio de evaluación

La rúbrica completa está en el
[anexo A5](anexos/A5-evaluacion.md#rúbrica-del-proyecto-final).
Resumen de la ponderación:

| Componente | Peso |
|---|---|
| Diseño y cálculos (presupuesto óptico y PoE correctos) | 30 % |
| Ejecución física (empalmes, terminación, radios, etiquetado, orden) | 25 % |
| Certificación y mediciones (método correcto, informe completo) | 20 % |
| Configuración de red (VLAN, trunk, STP, seguridad de borde) | 15 % |
| Documentación y defensa | 10 % |

**Criterios que reprueban por sí solos**, sin importar el resto:

- Presupuesto óptico ausente o con error de signo/unidad (dBm vs dB).
- Un empalme entregado por encima de 0,3 dB sin rehacerlo.
- Conectores sin inspeccionar o sin tapar.
- Restos de fibra fuera del contenedor de descartes.
- Mirar el extremo de una fibra o de un puerto óptico.
- Entregar sin etiquetado.

Estos seis puntos no son formalidades: los tres primeros son la
diferencia entre una obra que dura 15 años y una que falla en 2, y los
tres últimos son seguridad y trazabilidad.

## Cronograma sugerido

| Momento | Actividad |
|---|---|
| Después de la clase 8 | Se entrega el caso; los grupos empiezan el diseño |
| Después de la clase 10 | Entrega del diseño para revisión del instructor |
| Después de la clase 12 | Devolución con correcciones; se congela el diseño |
| Clases 13-15 | Ejecución física y configuración en horas de laboratorio |
| Clase 16 | Certificación final, documentación y defensa |

## Variantes del caso

Si el centro de formación tiene otro perfil, el caso se sustituye
manteniendo los mismos entregables:

- **Perfil operador / FTTH**: diseñar una PON para 240 viviendas con nodo
  a 10 km, decidir división y ubicación de splitters, y certificar una
  rama completa (usa la clase 12 como eje).
- **Perfil centro de datos**: interconectar dos filas de racks con
  troncales MPO OM4, resolver polaridad, presupuesto de 40/100 G y
  agregación entre switches.
- **Perfil industrial**: enlace en planta con interferencia
  electromagnética alta, fibra en bandeja junto a variadores de
  frecuencia, anillo redundante y switches gestionados con QoS para
  tráfico de control.
