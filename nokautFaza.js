function simulirajNokautUtakmicu(tim1, tim2) {
  const verovatnoćaTim1 = tim1.FIBARanking / (tim1.FIBARanking + tim2.FIBARanking);
  const rezultatTim1 = Math.floor(70 + Math.random() * 30);
  const rezultatTim2 = Math.floor(70 + Math.random() * 30);
  return {
      tim1: rezultatTim1,
      tim2: rezultatTim2,
      pobednik: rezultatTim1 > rezultatTim2 ? tim1 : tim2,
  };
}

function simulirajNokautFazu(parovi) {
  let pobednici = [];
  parovi.forEach(par => {
      const rezultat = simulirajNokautUtakmicu(par[0], par[1]);
      console.log(`${par[0].Team} - ${par[1].Team} (${rezultat.tim1}:${rezultat.tim2})`);
      pobednici.push(rezultat.pobednik);
  });
  return pobednici;
}

module.exports = {
  simulirajNokautFazu,
};
