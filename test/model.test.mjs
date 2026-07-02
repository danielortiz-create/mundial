import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const M = require('../js/model.js');
const DATA = require('../js/data.js');

const close = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) < tol, `${a} ≉ ${b}`);

test('americanToDecimal convierte cuotas conocidas', () => {
  close(M.americanToDecimal(-320), 1.3125);
  close(M.americanToDecimal(+420), 5.2);
  close(M.americanToDecimal(+100), 2.0);
  close(M.americanToDecimal(-100), 2.0);
  assert.throws(() => M.americanToDecimal(0));
});

test('impliedProbs quita el margen y suma 1', () => {
  const dec = [-320, 420, 950].map(M.americanToDecimal);
  const p = M.impliedProbs(dec);
  close(p.reduce((a, b) => a + b, 0), 1, 1e-12);
  // España debe rondar 72-73% sin margen
  assert.ok(p[0] > 0.71 && p[0] < 0.74, `España ${p[0]}`);
  const margin = M.bookmakerMargin(dec);
  assert.ok(margin > 0.03 && margin < 0.07, `margen ${margin}`);
});

test('eloExpectation: Elo igual => 0.5, mayor Elo => mayor expectativa', () => {
  close(M.eloExpectation(1900, 1900), 0.5);
  assert.ok(M.eloExpectation(2171, 1852) > 0.85);
});

test('eloModel cumple la restricción Elo y suma 1', () => {
  for (const [a, b] of [[2171, 1852], [1996, 1937], [1942, 1717], [1800, 1800]]) {
    const r = M.eloModel(a, b);
    close(r.win + r.draw + r.loss, 1, 1e-9);
    close(r.win + 0.5 * r.draw, r.we, 1e-3);
    assert.ok(r.over25 > 0 && r.over25 < 1);
    assert.ok(r.btts > 0 && r.btts < 1);
  }
  const iguales = M.eloModel(1800, 1800);
  close(iguales.win, iguales.loss, 1e-6);
});

test('expectedTotalGoals encoge hacia la base y respeta los límites', () => {
  close(M.expectedTotalGoals(2.6, 2.6), 2.6, 1e-9);
  assert.ok(M.expectedTotalGoals(4, 4) > M.expectedTotalGoals(1.5, 1.5));
  assert.ok(M.expectedTotalGoals(9, 9) <= 3.4);
  assert.ok(M.expectedTotalGoals(0, 0) >= 2.1);
});

test('consensus promedia y normaliza', () => {
  const c = M.consensus([0.7, 0.2, 0.1], [0.5, 0.3, 0.2]);
  close(c.reduce((a, b) => a + b, 0), 1, 1e-12);
  close(c[0], 0.6, 1e-9);
});

test('los datos de partidos son coherentes', () => {
  assert.equal(DATA.partidos.length, 3);
  for (const p of DATA.partidos) {
    assert.ok(p.cuotas.a !== 0 && p.cuotas.x !== 0 && p.cuotas.b !== 0);
    assert.ok(p.equipoA.elo > 1000 && p.equipoB.elo > 1000);
    // los puntos deben cuadrar con V-E-D
    for (const eq of [p.equipoA, p.equipoB]) {
      const [v, e] = eq.ve_d.match(/\d+/g).map(Number);
      assert.equal(eq.puntos, v * 3 + e, eq.nombre);
      assert.equal(eq.resultados.length, 3, eq.nombre);
    }
  }
});
