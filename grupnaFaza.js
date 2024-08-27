const fs = require('fs');

const PODACI_GRUPA_STRING = fs.readFileSync('groups.json', 'utf-8');
const PODACI_GRUPA = JSON.parse(PODACI_GRUPA_STRING);

function simulirajUtakmicu(ekipa1, ekipa2) {
    const verovatnoćaEkipa1 = ekipa1.FIBARanking / (ekipa1.FIBARanking + ekipa2.FIBARanking);
    const rezultatEkipa1 = Math.floor(70 + Math.random() * 30);
    const rezultatEkipa2 = Math.floor(70 + Math.random() * 30);
    return {
        ekipa1: rezultatEkipa1,
        ekipa2: rezultatEkipa2,
        pobednik: rezultatEkipa1 > rezultatEkipa2 ? ekipa1 : ekipa2,
        gubitnik: rezultatEkipa1 <= rezultatEkipa2 ? ekipa1 : ekipa2,
        pobedničkiRezultat: rezultatEkipa1 > rezultatEkipa2 ? rezultatEkipa1 : rezultatEkipa2,
        gubitničkiRezultat: rezultatEkipa1 <= rezultatEkipa2 ? rezultatEkipa2 : rezultatEkipa1
    };
}

function rangirajEkipe(ekipe) {
    return ekipe.sort((a, b) => b.bodovi - a.bodovi || b.kosRazlika - a.kosRazlika || b.postignutiPoeni - a.postignutiPoeni);
}

function simulirajGrupu(grupa) {
    grupa.forEach(ekipa => {
        ekipa.bodovi = 0;
        ekipa.postignutiPoeni = 0;
        ekipa.primljeniPoeni = 0;
    });

    for (let i = 0; i < grupa.length; i++) {
        for (let j = i + 1; j < grupa.length; j++) {
            const rezultat = simulirajUtakmicu(grupa[i], grupa[j]);
            console.log(`${grupa[i].Team} - ${grupa[j].Team} (${rezultat.ekipa1}:${rezultat.ekipa2})`);

            if (rezultat.ekipa1 > rezultat.ekipa2) {
                grupa[i].bodovi += 2;
            } else if (rezultat.ekipa1 < rezultat.ekipa2) {
                grupa[j].bodovi += 2;
            } else {
                grupa[i].bodovi += 1;
                grupa[j].bodovi += 1;
            }

            grupa[i].postignutiPoeni += rezultat.ekipa1;
            grupa[i].primljeniPoeni += rezultat.ekipa2;
            grupa[j].postignutiPoeni += rezultat.ekipa2;
            grupa[j].primljeniPoeni += rezultat.ekipa1;

            grupa[i].kosRazlika = grupa[i].postignutiPoeni - grupa[i].primljeniPoeni;
            grupa[j].kosRazlika = grupa[j].postignutiPoeni - grupa[j].primljeniPoeni;
        }
    }
    
    return rangirajEkipe(grupa);
}

function prikaziRezultateGrupneFaze() {
    const rangiraneEkipe = [];
    for (const grupa in PODACI_GRUPA) {
        console.log(`Rezultati za grupu ${grupa}:`);
        const rangirane = simulirajGrupu(PODACI_GRUPA[grupa]);
        rangiraneEkipe.push(rangirane);
        rangirane.forEach((ekipa, indeks) => {
            console.log(`${indeks + 1}. ${ekipa.Team} - ${ekipa.bodovi} bodova`);
        });
    }
    return rangiraneEkipe;
}

module.exports = {
    prikaziRezultateGrupneFaze,
};
