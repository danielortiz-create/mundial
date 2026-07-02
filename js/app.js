/* Renderizado del dashboard. Requiere js/data.js (DATA) y js/model.js
   (MundialModel) cargados antes como scripts clásicos. */
(function () {
  'use strict';
  const M = window.MundialModel;

  const pct = (p) => Math.round(p * 100) + '%';
  const pct1 = (p) => (p * 100).toFixed(1) + '%';
  const dec = (odd) => M.americanToDecimal(odd).toFixed(2);
  const usa = (odd) => (odd > 0 ? '+' + odd : String(odd));

  function calcular(partido) {
    const cuotasDec = [partido.cuotas.a, partido.cuotas.x, partido.cuotas.b].map(M.americanToDecimal);
    const mercado = M.impliedProbs(cuotasDec);
    const golesPorPartido = (eq) => (eq.gf + eq.gc) / eq.resultados.length;
    const totalGoles = M.expectedTotalGoals(golesPorPartido(partido.equipoA), golesPorPartido(partido.equipoB));
    const modelo = M.eloModel(partido.equipoA.elo, partido.equipoB.elo, totalGoles);
    const modeloArr = [modelo.win, modelo.draw, modelo.loss];
    return {
      mercado,
      modelo,
      modeloArr,
      consenso: M.consensus(mercado, modeloArr),
      margen: M.bookmakerMargin(cuotasDec),
    };
  }

  /* ---- tooltip compartido ---- */
  const tooltip = document.getElementById('tooltip');
  function mostrarTooltip(ev, titulo, detalle) {
    tooltip.innerHTML = '';
    const t = document.createElement('div');
    t.className = 't-titulo';
    t.textContent = titulo;
    const d = document.createElement('div');
    d.className = 't-detalle';
    d.textContent = detalle;
    tooltip.append(t, d);
    tooltip.style.display = 'block';
    moverTooltip(ev);
  }
  function moverTooltip(ev) {
    const margen = 12;
    let x = ev.clientX + margen, y = ev.clientY + margen;
    const r = tooltip.getBoundingClientRect();
    if (x + r.width > window.innerWidth - 8) x = ev.clientX - r.width - margen;
    if (y + r.height > window.innerHeight - 8) y = ev.clientY - r.height - margen;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  }
  function ocultarTooltip() { tooltip.style.display = 'none'; }

  function el(tag, className, text) {
    const n = document.createElement(tag);
    if (className) n.className = className;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function filaBarra(nombre, detalle, probs, partido, fuenteDetalle, esConsenso) {
    const fila = el('div', 'prob-fila' + (esConsenso ? ' prob-fila--consenso' : ''));
    const etiqueta = el('div', 'prob-fila__nombre', nombre);
    if (detalle) etiqueta.append(el('span', 'detalle', detalle));
    const barra = el('div', 'barra');
    barra.setAttribute('role', 'img');

    const partes = [
      { clase: 'segmento--a', nombre: partido.equipoA.nombre, p: probs[0] },
      { clase: 'segmento--x', nombre: 'Empate', p: probs[1] },
      { clase: 'segmento--b', nombre: partido.equipoB.nombre, p: probs[2] },
    ];
    barra.setAttribute('aria-label',
      nombre + ': ' + partes.map((s) => s.nombre + ' ' + pct1(s.p)).join(', '));

    for (const s of partes) {
      const seg = el('div', 'segmento ' + s.clase);
      seg.style.flexGrow = String(s.p);
      seg.style.flexBasis = '0';
      const label = el('span', null, pct(s.p));
      seg.append(label);
      seg.addEventListener('mouseenter', (ev) =>
        mostrarTooltip(ev, s.nombre + ' — ' + pct1(s.p), fuenteDetalle(s)));
      seg.addEventListener('mousemove', moverTooltip);
      seg.addEventListener('mouseleave', ocultarTooltip);
      barra.append(seg);
    }
    fila.append(etiqueta, barra);
    return fila;
  }

  function filaStats(nombre, va, vb, esNum) {
    const tr = el('tr');
    tr.append(el('td', null, nombre));
    for (const v of [va, vb]) {
      const td = el('td', esNum ? 'num' : null);
      if (Array.isArray(v)) {
        // cada resultado en un span sin salto interno ("2-1 Ghana" nunca se parte)
        v.forEach((item, i) => {
          if (i > 0) td.append(document.createTextNode(' · '));
          td.append(el('span', 'nb', item));
        });
      } else {
        td.textContent = String(v);
      }
      tr.append(td);
    }
    return tr;
  }

  function tarjetaPartido(partido) {
    const r = calcular(partido);
    const A = partido.equipoA, B = partido.equipoB;
    const card = el('article', 'tarjeta');

    const cab = el('div', 'tarjeta__cabecera');
    cab.append(
      el('h2', 'tarjeta__titulo', `${A.bandera} ${A.nombre} vs ${B.nombre} ${B.bandera}`),
      el('span', 'tarjeta__meta', `${partido.horaET} · ${partido.sede}`)
    );
    card.append(cab, el('p', 'tarjeta__contexto', partido.contexto));

    /* tabla comparativa (vista de tabla de la visualización) */
    const tabla = el('table', 'stats');
    const thead = el('thead');
    const trh = el('tr');
    trh.append(el('td'));
    for (const eq of [A, B]) {
      const th = el('th');
      const sw = el('span', 'swatch');
      sw.style.background = eq === A ? 'var(--team-a)' : 'var(--team-b)';
      th.append(sw, document.createTextNode(eq.nombre));
      trh.append(th);
    }
    thead.append(trh);
    const tbody = el('tbody');
    tbody.append(
      filaStats('Grupo y posición', `${A.grupo} · ${A.posicion}`, `${B.grupo} · ${B.posicion}`),
      filaStats('Puntos (V-E-D)', `${A.puntos} (${A.ve_d})`, `${B.puntos} (${B.ve_d})`, true),
      filaStats('Goles a favor / en contra', `${A.gf} / ${A.gc}`, `${B.gf} / ${B.gc}`, true),
      filaStats('Resultados de grupo', A.resultados, B.resultados),
      filaStats('Elo' + (A.eloEstimado || B.eloEstimado ? ' (≈ estimado)' : ''),
        A.elo + (A.eloEstimado ? '≈' : ''), B.elo + (B.eloEstimado ? '≈' : ''), true),
      filaStats('Ranking FIFA (aprox.)', '#' + A.fifa, '#' + B.fifa, true)
    );
    tabla.append(thead, tbody);
    card.append(tabla);

    /* barras de probabilidad */
    const bloque = el('div', 'prob-bloque');
    bloque.append(el('h3', 'prob-titulo', 'Probabilidad 1X2 (90 minutos)'));

    const leyenda = el('div', 'leyenda');
    for (const [nombre, varCss] of [[A.nombre, '--team-a'], ['Empate', '--draw'], [B.nombre, '--team-b']]) {
      const item = el('span');
      const sw = el('span', 'swatch');
      sw.style.background = `var(${varCss})`;
      item.append(sw, document.createTextNode(nombre));
      leyenda.append(item);
    }
    bloque.append(leyenda);

    const cuotasTxt = { [A.nombre]: partido.cuotas.a, Empate: partido.cuotas.x, [B.nombre]: partido.cuotas.b };
    bloque.append(
      filaBarra('Mercado', 'cuotas sin margen', r.mercado, partido,
        (s) => `Cuota ${partido.casa}: ${usa(cuotasTxt[s.nombre])} (decimal ${dec(cuotasTxt[s.nombre])}), margen de la casa ya descontado.`),
      filaBarra('Modelo Elo', 'Poisson, sede neutral', r.modeloArr, partido,
        (s) => `Modelo propio: Elo ${A.elo}≈ vs ${B.elo}≈ → ${r.modelo.lambdaA.toFixed(2)} - ${r.modelo.lambdaB.toFixed(2)} goles esperados.`),
      filaBarra('Consenso', 'la más real', r.consenso, partido,
        (s) => 'Promedio del mercado y el modelo Elo/Poisson: nuestra mejor estimación.', true)
    );
    card.append(bloque);

    /* chips extra */
    const chips = el('div', 'chips');
    const chip = (html) => { const c = el('span', 'chip'); c.innerHTML = html; return c; };
    chips.append(
      chip(`Cuotas ${partido.casa}: <b>${usa(partido.cuotas.a)}</b> / <b>${usa(partido.cuotas.x)}</b> / <b>${usa(partido.cuotas.b)}</b>`),
      chip(`Margen de la casa: <b>${(r.margen * 100).toFixed(1)}%</b>`),
      chip(`Más de 2.5 goles (modelo): <b>${pct1(r.modelo.over25)}</b>`),
      chip(`Ambos anotan (modelo): <b>${pct1(r.modelo.btts)}</b>`)
    );
    card.append(chips);
    return card;
  }

  /* Un label dentro de un segmento solo si cabe con holgura; si no, lo
     llevan la leyenda y el tooltip (nunca texto recortado). */
  function podarLabels() {
    for (const seg of document.querySelectorAll('.segmento')) {
      const label = seg.firstChild;
      if (label && label.offsetWidth + 10 > seg.clientWidth) label.style.visibility = 'hidden';
    }
  }

  function render() {
    document.getElementById('fecha').textContent = DATA.fecha + ' · ' + DATA.ronda;
    document.getElementById('actualizado').textContent = 'Cuotas: ' + DATA.actualizado;
    const cont = document.getElementById('partidos');
    for (const partido of DATA.partidos) cont.append(tarjetaPartido(partido));
    podarLabels();
    window.addEventListener('resize', podarLabels);
  }

  document.addEventListener('DOMContentLoaded', render);
})();
