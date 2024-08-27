const { prikaziRezultateGrupneFaze } = require('./grupnaFaza');
const { pripremiZreb } = require('./zreb');
const { simulirajNokautFazu } = require('./nokautFaza');

function pokreniTurnir() {
    console.log('Početak grupne faze:');
    const rangiraneEkipe = prikaziRezultateGrupneFaze();

    console.log('\nŽreb za nokaut fazu:');
    const paroviZaNokaut = pripremiZreb(rangiraneEkipe);

    console.log('\nNokaut faza:');
    let pobednici = simulirajNokautFazu(paroviZaNokaut);

    while (pobednici.length > 1) {
        console.log('\nSledeća runda nokaut faze:');
        // Ako broj pobednika nije paran, dodaj na slučajan način još jedan tim za popunjavanje parova
        if (pobednici.length % 2 !== 0) {
            pobednici.push(pobednici[Math.floor(Math.random() * pobednici.length)]);
        }

        const noviParovi = [];
        for (let i = 0; i < pobednici.length; i += 2) {
            noviParovi.push([pobednici[i], pobednici[i + 1]]);
        }

        pobednici = simulirajNokautFazu(noviParovi);
    }

    if (pobednici.length === 1) {
        console.log(`\nPobednik turnira je: ${pobednici[0].Team}!`);
    } else {
        console.log('Nema pobednika, nađi grešku!');
    }
}

pokreniTurnir();
