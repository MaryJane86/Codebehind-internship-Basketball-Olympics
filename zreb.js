function izmesajTimove(timovi) {
  for (let i = timovi.length - 1; i > 0; i--) {
      const randomIndeks = Math.floor(Math.random() * (i + 1));
      [timovi[i], timovi[randomIndeks]] = [timovi[randomIndeks], timovi[i]];
  }
  return timovi;
}

function pripremiZreb(rangiraneEkipe) {
  const sveEkipe = rangiraneEkipe.reduce((sve, grupa) => sve.concat(grupa), []);
  const izmesaniTimovi = izmesajTimove(sveEkipe);
  const parovi = [];
  for (let i = 0; i < izmesaniTimovi.length; i += 2) {
      parovi.push([izmesaniTimovi[i], izmesaniTimovi[i + 1]]);
  }
  return parovi;
}

module.exports = {
  pripremiZreb,
};
