# Metodología de análisis de apuestas — reglas del proyecto

Reglas fijadas por el usuario. Aplican a TODO análisis o recomendación de
apuesta que se haga en este proyecto:

1. **Ninguna recomendación sin estadística específica detrás.** No usar
   promedios genéricos ("un favorito típico tira 4-5 al arco") cuando el
   dato real del equipo existe. Buscar el dato del torneo actual; si no se
   consigue, decirlo explícitamente y dar un rango de incertidumbre, nunca
   un número que suene más seguro de lo que es.

2. **Siempre mirar los datos de AMBOS equipos.** Todo dato ofensivo se
   cruza contra el defensivo del rival antes de opinar (ej.: los 6.3 tiros
   al arco por partido de Colombia valían poco contra una Ghana que solo
   concedió 3-4 a Inglaterra y Croacia). Ataque de A × defensa de B, en
   los dos sentidos.

3. **Ponderar por similitud de guion, no solo frecuencia.** "Se cumplió en
   5 de 6 partidos" engaña si el único fallo es el partido más parecido al
   que se apuesta (Inglaterra-Ghana y sus 11 córners como gemelo táctico
   de Colombia-Ghana).

4. **Separar variables correlacionadas pero distintas**: goles ≠ tiros ≠
   tiros al arco ≠ córners. Un 0-0 puede tener 6 tiros al arco y 11
   córners. Medir la variable exacta del mercado apostado.

5. **Toda cuota se evalúa por valor esperado** (probabilidad real × cuota
   − 1), no por probabilidad de acertar. Mostrar siempre: probabilidad
   estimada, cuota justa, lo que implica la casa y el EV con su rango.

6. **Los Elo estimados se marcan con ≈** y se declara qué está confirmado
   y qué no.

## Estructura del proyecto

- `index.html` + `css/` + `js/` — dashboard estático (abrir con doble clic)
- `js/data.js` — datos de partidos/cuotas del día (editar para actualizar)
- `js/model.js` — modelo: cuotas→probabilidades sin margen, Elo/Poisson,
  consenso, EV, marcadores probables, pickBet
- `test/model.test.mjs` — correr con `node --test test/model.test.mjs`
