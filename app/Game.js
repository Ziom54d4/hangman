class Game {
    haslaIKategorie = [
        {
            haslo: "Jebać PIS",
            kategoria: "Polityka",
        },
        {
            haslo: "Programista HTML",
            kategoria: "Informatyka",
        },
        {
            haslo: "Skoki na chuju",
            kategoria: "Sport",
        },
    ];

    maleOpacity = "0.3";
    duzeOpacity = "1";

    constructor({elementBuzki, elementHaslo, elementKategoria, elementLitery, elementRezultat, elementOdswiezenie}) {
        this.elementBuzki = elementBuzki;
        this.elementHaslo = elementHaslo;
        this.elementKategoria = elementKategoria;
        this.elementLitery = elementLitery;
        this.elementRezultat = elementRezultat;
        this.elementOdswiezenie = elementOdswiezenie;

        const iloscBuziek = this.elementBuzki.children.length;

        for(let i=1; i<iloscBuziek; i++) {
            this.elementBuzki.children[i].style.opacity = this.maleOpacity;
        }
        this.elementBuzki.children[0].style.opacity = this.duzeOpacity;
    }

    wygranaCzyPrzegrana() {
        let flaga = 0;
        const iloscBuziek = this.elementBuzki.children.length;
        
        const losowanieHaslaIKategorii = Math.floor(Math.random()*this.haslaIKategorie.length);

        const wylosowaneHaslo = this.haslaIKategorie[losowanieHaslaIKategorii].haslo.toLowerCase();
        const wylosowanaKategoria = this.haslaIKategorie[losowanieHaslaIKategorii].kategoria;

        let wylosowaneHasloJakoTablica = wylosowaneHaslo.split('');
        let wylosowaneHasloJakoTablica2 = wylosowaneHaslo.split('');

        for(let i=0; i<wylosowaneHaslo.length; i++) {
            if(wylosowaneHasloJakoTablica2[i] == " ") {
                wylosowaneHasloJakoTablica2[i] = " ";
            } else {
                wylosowaneHasloJakoTablica2[i] = "_";
            }
        }

        for(let i=0; i<wylosowaneHaslo.length; i++) {
            wylosowaneHasloJakoTablica2 = wylosowaneHasloJakoTablica2.toString().replace(',','');
        }

        this.elementHaslo.textContent = wylosowaneHasloJakoTablica2;
        this.elementKategoria.textContent = wylosowanaKategoria;

        for(let i=0; i<wylosowaneHasloJakoTablica.length; i++) {
            for(let j=0; j<this.elementLitery.length; j++) {
                this.elementLitery[j].addEventListener('click', (e) => {
                    if(e.target.textContent == wylosowaneHasloJakoTablica[i]) {
                        wylosowaneHasloJakoTablica2 = wylosowaneHasloJakoTablica2.split('');
                        wylosowaneHasloJakoTablica2[i] = wylosowaneHasloJakoTablica[i];
                        for(let l=0; l<wylosowaneHaslo.length; l++) {
                            wylosowaneHasloJakoTablica2 = wylosowaneHasloJakoTablica2.toString().replace(',','');
                        }
                        this.elementHaslo.textContent = wylosowaneHasloJakoTablica2;
                        for(let k=0; k<wylosowaneHaslo.length; k++) {
                            wylosowaneHasloJakoTablica = wylosowaneHasloJakoTablica.toString().replace(',','');
                        }
                        if(this.elementHaslo.textContent == wylosowaneHasloJakoTablica) {
                            this.koniecGry("wygrana");
                        }
                    }
                })
            }
        }

        for(let j=0; j<this.elementLitery.length; j++) {
            this.elementLitery[j].addEventListener("click", (e) => {
                if(wylosowaneHasloJakoTablica.indexOf(e.target.textContent) == -1) {
                    if(flaga <= iloscBuziek-2) {
                        this.elementBuzki.children[flaga+1].style.opacity = this.duzeOpacity;
                        this.elementBuzki.children[flaga].style.opacity = this.maleOpacity;
                        flaga++;
                        if(this.elementBuzki.lastElementChild.style.opacity == this.duzeOpacity) {
                            this.koniecGry("przegrana");
                        }
                    }
                }
            })
        }
    }

    koniecGry(rezultat) {
        if(rezultat == "wygrana") {
            this.elementRezultat.textContent = "Udało Ci się rozwiązać hasło - WYGRANA!";
            this.elementRezultat.style.color = "green";
        } else if(rezultat == "przegrana") {
            this.elementRezultat.textContent = "Niestety nie udało się - PRZEGRANA!";
            this.elementRezultat.style.color = "red";
        }
        for(let j=0; j<this.elementLitery.length; j++) {
            this.elementLitery[j].disabled = true;
        }
        this.elementOdswiezenie.appendChild(document.createElement('button'));
        const przyciskOdswiezania = document.querySelector("#odswiezenie button");
        przyciskOdswiezania.textContent = "Jeszcze raz?";
        przyciskOdswiezania.addEventListener('click', () => {
            location.reload();
        })
    }
}

const game = new Game({
    elementBuzki: document.getElementById("buzki"),
    elementHaslo: document.getElementById("haslo"),
    elementKategoria: document.getElementById("kategoria"),
    elementLitery: document.querySelectorAll("#litery button"),
    elementRezultat: document.getElementById("rezultat"),
    elementOdswiezenie: document.querySelector("#odswiezenie"),
});
game.wygranaCzyPrzegrana();