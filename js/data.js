/*
 * Datos de los partidos del día — editar este archivo para actualizar
 * el dashboard (agregar partidos de otros días, refrescar cuotas, etc.).
 *
 * Cuotas en formato americano (3-way, 90 minutos), recopiladas el
 * 2 de julio de 2026 (FanDuel / bet365 vía búsqueda web).
 * Elo: España confirmado (eloratings.net #1 = 2171); el resto son
 * estimaciones a partir de los ratings pre-torneo ajustados por los
 * resultados de la fase de grupos.
 */
const DATA = {
  fecha: 'Jueves 2 de julio de 2026',
  ronda: 'Dieciseisavos de final (Ronda de 32)',
  actualizado: '2 jul 2026, cuotas de la mañana (ET)',
  partidos: [
    {
      id: 'esp-aut',
      horaET: '3:00 p.m. ET',
      sede: 'SoFi Stadium, Inglewood (Los Ángeles)',
      casa: 'FanDuel',
      equipoA: {
        nombre: 'España', bandera: '🇪🇸', elo: 2171, eloEstimado: false, fifa: 1,
        grupo: 'H', posicion: '1º', puntos: 7, ve_d: '2V 1E 0D', gf: 5, gc: 0,
        resultados: ['0-0 Cabo Verde', '4-0 Arabia Saudita', '1-0 Uruguay'],
        nota: 'Portería imbatida en toda la fase de grupos; Opta le da 70.6% de victoria.',
      },
      equipoB: {
        nombre: 'Austria', bandera: '🇦🇹', elo: 1852, eloEstimado: true, fifa: 23,
        grupo: 'J', posicion: '2º', puntos: 4, ve_d: '1V 1E 1D', gf: 6, gc: 6,
        resultados: ['3-1 Jordania', '0-2 Argentina', '3-3 Argelia'],
        nota: 'Mucho gol pero frágil atrás: 6 goles recibidos, incluido un 3-3 salvaje ante Argelia.',
      },
      cuotas: { a: -320, x: +420, b: +950 },
      contexto: 'España llega como nº1 del mundo y sin recibir gol; Austria depende de su pegada a balón parado.',
    },
    {
      id: 'por-cro',
      horaET: '7:00 p.m. ET',
      sede: 'BMO Field, Toronto',
      casa: 'bet365',
      equipoA: {
        nombre: 'Portugal', bandera: '🇵🇹', elo: 1996, eloEstimado: true, fifa: 6,
        grupo: 'K', posicion: '2º', puntos: 5, ve_d: '1V 2E 0D', gf: 6, gc: 1,
        resultados: ['1-1 RD Congo', '5-0 Uzbekistán', '0-0 Colombia'],
        nota: 'Invicto pero irregular: dos empates y una goleada. El factor Ronaldo sigue pesando.',
      },
      equipoB: {
        nombre: 'Croacia', bandera: '🇭🇷', elo: 1937, eloEstimado: true, fifa: 10,
        grupo: 'L', posicion: '2º', puntos: 6, ve_d: '2V 0E 1D', gf: 5, gc: 5,
        resultados: ['2-4 Inglaterra', '1-0 Panamá', '2-1 Ghana'],
        nota: 'La más en forma de las dos en las últimas jornadas; venció sus dos últimos partidos.',
      },
      cuotas: { a: -125, x: +240, b: +400 },
      contexto: 'Calor extremo en Toronto (sensación de ~35°C) y riesgo de tormenta al descanso; el mercado lo lee como eliminatoria de Portugal, pero Croacia llega mejor.',
    },
    {
      id: 'sui-alg',
      horaET: '11:00 p.m. ET',
      sede: 'BC Place, Vancouver',
      casa: 'FanDuel',
      equipoA: {
        nombre: 'Suiza', bandera: '🇨🇭', elo: 1942, eloEstimado: true, fifa: 17,
        grupo: 'B', posicion: '1º', puntos: 7, ve_d: '2V 1E 0D', gf: 8, gc: 3,
        resultados: ['1-1 Catar', '4-1 Bosnia', '3-1 Canadá'],
        nota: 'Líder de grupo con 8 goles; invicta en sus últimos 5 partidos y con octavos en los últimos 3 mundiales.',
      },
      equipoB: {
        nombre: 'Argelia', bandera: '🇩🇿', elo: 1717, eloEstimado: true, fifa: 36,
        grupo: 'J', posicion: '3º (mejor tercero)', puntos: 4, ve_d: '1V 1E 1D', gf: 5, gc: 7,
        resultados: ['0-3 Argentina', '2-1 Jordania', '3-3 Austria'],
        nota: 'Clasificó como mejor tercero con un épico 3-3 ante Austria en el descuento.',
      },
      cuotas: { a: +102, x: +210, b: +294 },
      contexto: 'El 72% de las apuestas respaldan a Suiza, pero el mercado ve el partido mucho más parejo que el Elo: cuota de valor si confías en la solidez suiza.',
    },
  ],
};

if (typeof module !== 'undefined' && module.exports) module.exports = DATA;
