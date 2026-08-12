# Mundial 2026 — Estadísticas y probabilidades de apuesta

Dashboard estático con las estadísticas de los partidos del día de la Copa del
Mundo 2026 y la probabilidad 1X2 "más real" de cada uno, calculada desde tres
ángulos:

| Fila | Qué es |
|---|---|
| **Mercado** | Cuotas reales de casas de apuestas (FanDuel / bet365) convertidas a probabilidades implícitas, **quitando el margen del bookmaker** |
| **Modelo Elo** | Modelo propio: expectativa Elo → goles esperados → matriz de Poisson (sedes neutrales, sin ventaja de local) |
| **Consenso** | Promedio de mercado y modelo — la estimación más realista del panel |

Incluye por partido: resultados y tabla de la fase de grupos, goles a
favor/en contra, Elo y ranking FIFA, cuotas en formato americano y decimal,
margen de la casa, y probabilidades de *más de 2.5 goles* y *ambos anotan*
según el modelo.

Cada tarjeta cierra con un bloque de **análisis y apuesta**: los marcadores
más probables según la matriz de Poisson, el valor esperado por unidad
apostada de cada resultado (usando el consenso como probabilidad real contra
la cuota ofrecida) y una recomendación: 💡 la apuesta con mayor valor
esperado si supera el +5%, o ⚖️ "sin apuesta de valor" cuando las cuotas ya
reflejan las probabilidades.

## Cómo verlo

Abre `index.html` en el navegador (doble clic — funciona offline, sin build
ni servidor). Tiene modo claro y oscuro automático.

## Cómo actualizarlo para otro día

Edita solo `js/data.js`:

1. Cambia `fecha`, `ronda` y `actualizado`.
2. Reemplaza los objetos de `partidos` (equipos, estadísticas, cuotas 3-way
   en formato americano y Elo). Todo lo demás se recalcula solo.

## Tests

```bash
node --test test/model.test.mjs
```

Verifican la conversión de cuotas, la eliminación del margen, la restricción
Elo del modelo de Poisson y la coherencia de los datos.

## Datos (2 de julio de 2026)

- **España vs Austria** — 3 p.m. ET, SoFi Stadium (cuotas FanDuel −320 / +420 / +950)
- **Portugal vs Croacia** — 7 p.m. ET, BMO Field, Toronto (bet365 −125 / +240 / +400)
- **Suiza vs Argelia** — 11 p.m. ET, BC Place, Vancouver (FanDuel +102 / +210 / +294)

El Elo de España (2171, nº 1) está confirmado por eloratings.net; los demás
ratings están marcados con `≈` porque son estimaciones (los sitios de Elo no
eran accesibles al construir el panel) basadas en los ratings pre-torneo
ajustados por los resultados de la fase de grupos.

## Otros contenidos del repositorio

- [`clases/`](clases/README.md) — curso de **fibra óptica y redes
  Ethernet**: 16 clases con teoría, laboratorios y evaluación, más
  anexos de herramientas, normativa, fórmulas y glosario.

## Aviso

Panel informativo y educativo — **no es consejo de apuestas**. Las cuotas
cambian constantemente y las probabilidades son estimaciones. Juega
responsablemente.
