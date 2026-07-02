/*
 * Modelo de probabilidades — Mundial 2026
 *
 * Tres fuentes de probabilidad 1X2 por partido:
 *  1. Mercado: cuotas de casas de apuestas convertidas a probabilidades
 *     implícitas y normalizadas para quitar el margen del bookmaker.
 *  2. Modelo: ratings Elo -> expectativa de victoria -> goles esperados
 *     por equipo -> matriz de Poisson -> P(1), P(X), P(2).
 *  3. Consenso: promedio simple de mercado y modelo, renormalizado.
 *
 * Script clásico (sin módulos ES) para funcionar con file:// en el
 * navegador; también exporta por CommonJS para los tests de Node.
 */
(function (root) {
  'use strict';

  /** Cuota americana -> cuota decimal. Ej: -320 -> 1.3125, +420 -> 5.20 */
  function americanToDecimal(odd) {
    if (odd === 0 || !isFinite(odd)) throw new Error('cuota americana inválida: ' + odd);
    return odd > 0 ? 1 + odd / 100 : 1 + 100 / -odd;
  }

  /**
   * Probabilidades implícitas sin margen a partir de cuotas decimales.
   * p_i = (1/d_i) / sum_j (1/d_j). Devuelve array que suma 1.
   */
  function impliedProbs(decimalOdds) {
    const raw = decimalOdds.map((d) => {
      if (!(d > 1)) throw new Error('cuota decimal inválida: ' + d);
      return 1 / d;
    });
    const overround = raw.reduce((a, b) => a + b, 0);
    return raw.map((p) => p / overround);
  }

  /** Margen del bookmaker (overround - 1). Ej: 0.049 => 4.9% */
  function bookmakerMargin(decimalOdds) {
    return decimalOdds.reduce((a, d) => a + 1 / d, 0) - 1;
  }

  /** Expectativa Elo clásica: P(A) contando empate como medio punto. */
  function eloExpectation(eloA, eloB) {
    return 1 / (1 + Math.pow(10, -(eloA - eloB) / 400));
  }

  function poissonPmf(lambda, k) {
    let p = Math.exp(-lambda);
    for (let i = 1; i <= k; i++) p *= lambda / i;
    return p;
  }

  /**
   * Reparte `totalGoals` entre ambos equipos y calcula la matriz de
   * marcadores 0..maxGoals con Poisson independiente.
   */
  function scoreMatrix(lambdaA, lambdaB, maxGoals) {
    const M = maxGoals || 10;
    let win = 0, draw = 0, loss = 0, over25 = 0, btts = 0;
    for (let a = 0; a <= M; a++) {
      const pa = poissonPmf(lambdaA, a);
      for (let b = 0; b <= M; b++) {
        const p = pa * poissonPmf(lambdaB, b);
        if (a > b) win += p; else if (a === b) draw += p; else loss += p;
        if (a + b > 2.5) over25 += p;
        if (a > 0 && b > 0) btts += p;
      }
    }
    const total = win + draw + loss;
    return { win: win / total, draw: draw / total, loss: loss / total, over25, btts };
  }

  /**
   * Modelo Elo/Poisson. Sin ventaja de local (sedes neutrales).
   * Busca el reparto de goles esperados (lambdaA + lambdaB = totalGoals)
   * cuyo resultado Poisson cumple la restricción Elo:
   *   P(victoria) + 0.5 * P(empate) = We
   * Devuelve { win, draw, loss, over25, btts, lambdaA, lambdaB, we }.
   */
  function eloModel(eloA, eloB, totalGoals) {
    const T = totalGoals || 2.6; // promedio típico de eliminatorias mundialistas
    const we = eloExpectation(eloA, eloB);
    let lo = 0.02, hi = T - 0.02;
    for (let i = 0; i < 60; i++) {
      const mid = (lo + hi) / 2;
      const r = scoreMatrix(mid, T - mid);
      if (r.win + 0.5 * r.draw < we) lo = mid; else hi = mid;
    }
    const lambdaA = (lo + hi) / 2;
    const r = scoreMatrix(lambdaA, T - lambdaA);
    return { win: r.win, draw: r.draw, loss: r.loss, over25: r.over25, btts: r.btts, lambdaA, lambdaB: T - lambdaA, we };
  }

  /**
   * Goles totales esperados del partido: base de eliminatoria (2.6)
   * encogida hacia el promedio de goles por partido en que participó
   * cada equipo (gf+gc por juego). Acotado a [2.1, 3.4].
   */
  function expectedTotalGoals(avgGoalsA, avgGoalsB) {
    const t = 0.55 * 2.6 + 0.45 * ((avgGoalsA + avgGoalsB) / 2);
    return Math.min(3.4, Math.max(2.1, t));
  }

  /** Promedio de dos ternas [p1, pX, p2], renormalizado a 1. */
  function consensus(market, model) {
    const avg = market.map((p, i) => (p + model[i]) / 2);
    const s = avg.reduce((a, b) => a + b, 0);
    return avg.map((p) => p / s);
  }

  /**
   * Valor esperado por unidad apostada: prob * (cuota - 1) - (1 - prob).
   * Positivo => la cuota paga más de lo que la probabilidad justifica.
   */
  function expectedValue(prob, decimalOdd) {
    return prob * (decimalOdd - 1) - (1 - prob);
  }

  /** Los n marcadores más probables según la matriz de Poisson. */
  function topScorelines(lambdaA, lambdaB, n, maxGoals) {
    const M = maxGoals || 6;
    const out = [];
    for (let a = 0; a <= M; a++) {
      for (let b = 0; b <= M; b++) {
        out.push({ marcador: a + '-' + b, p: poissonPmf(lambdaA, a) * poissonPmf(lambdaB, b) });
      }
    }
    out.sort((x, y) => y.p - x.p);
    return out.slice(0, n || 3);
  }

  /**
   * Recomendación de apuesta según valor esperado (probs = consenso,
   * decimalOdds = cuotas de la casa). Recomienda el resultado con mayor
   * EV solo si supera el umbral (default 5%); si ninguno lo supera, no
   * hay apuesta de valor y se devuelve el favorito como referencia.
   */
  function pickBet(probs, decimalOdds, threshold) {
    const th = threshold === undefined ? 0.05 : threshold;
    const evs = probs.map((p, i) => expectedValue(p, decimalOdds[i]));
    let best = 0;
    for (let i = 1; i < evs.length; i++) if (evs[i] > evs[best]) best = i;
    const favorito = probs.indexOf(Math.max.apply(null, probs));
    return { evs, index: best, ev: evs[best], hayValor: evs[best] >= th, favorito };
  }

  const MundialModel = {
    americanToDecimal,
    impliedProbs,
    bookmakerMargin,
    eloExpectation,
    poissonPmf,
    scoreMatrix,
    eloModel,
    expectedTotalGoals,
    consensus,
    expectedValue,
    topScorelines,
    pickBet,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = MundialModel;
  root.MundialModel = MundialModel;
})(typeof globalThis !== 'undefined' ? globalThis : this);
