const teendokLista = [];
class Teendo {
    constructor(nev, leiras, datum) {
        this.nev = nev;
        this.leiras = leiras;
        this.datum = this.getValidDate(datum);
    }

    getValidDate(datum) {
        while (true) {      //"Küldő segítséggel" lett megcsinálva, mert beleőrültem
            datum = datum.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"); // Ha egyben van, alakítsa át
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (datePattern.test(datum) && !isNaN(new Date(datum).getTime())) {
                return new Date(datum);
            }
            alert("Hibás formátum! Helyes formátum: ÉÉÉÉ-HH-NN vagy ÉÉÉÉHHNN");
            datum = prompt("Esemény dátuma (ÉÉÉÉ-HH-NN vagy ÉÉÉÉHHNN):");
        }
    }

    addHMTLresz() {
        //Összes create
        const eventWrap = document.createElement("div");
        const esemenyDiv = document.createElement("div");
        const checkboxWrapper = document.createElement("h6");   //Meg merem kockáztatni, hogy bármilyen hx lehetne
        const checkbox = document.createElement("input");   //+ ha clicked      AKA function
        const title = document.createElement("h4");
        const leiras = document.createElement("div");
        const leirasKep = document.createElement("img");
        const lenyitoGomb = document.createElement("div");
        const lenyitoImg = document.createElement("img");
        const teendoAdatok = document.createElement("div");
        const leirasElem = document.createElement("div");
        const datumElem = document.createElement("div");

        //.setAttribute
        eventWrap.setAttribute("class", "teendo");
        esemenyDiv.setAttribute("class", "teendo_nev");
        checkbox.setAttribute("type", "checkbox");
        leiras.setAttribute("class", "edit_mode");        //Lefele mutató bizbasz
        leirasKep.setAttribute("src", "images/pencil.png");
        leirasKep.setAttribute("alt", "");
        lenyitoGomb.setAttribute("class", "lenyito_gomb");
        lenyitoImg.setAttribute("src", "images/right-arrow.png");
        lenyitoImg.setAttribute("alt", "");
        teendoAdatok.setAttribute("class", "teendo_adatok");
        leirasElem.setAttribute("class", "teendo_leiras");
        datumElem.setAttribute("class", "teendo_");
        
        //Style
        teendoAdatok.style.display = "none";
        
        //Szöveg
        title.textContent = this.nev;
        leirasElem.textContent = this.leiras;
        datumElem.textContent = `Dátum: ${this.datum.toLocaleDateString()}`;            //Nem, nem jó a sima .toString(), mert akkor hozzáír olyan baromságot is, mint UTC
        
        //Funcion(ök)
        lenyitoGomb.addEventListener("click", () => {
            teendoAdatok.style.display = teendoAdatok.style.display === "none" ? "block" : "none";
        });
        leirasKep.addEventListener("click", () => {
            this.nev = prompt("Új név:", this.nev) || this.nev;     //) || this.nev;    =   Ha "Cancel", akkor marad az eredeti
            this.leiras = prompt("Új leírás:", this.leiras) || this.leiras;
            let ujDatum = prompt("Új dátum (ÉÉÉÉ-HH-NN vagy ÉÉÉÉHHNN):", this.datum.toISOString().split('T')[0]);
            this.datum = this.getValidDate(ujDatum);
            
            title.textContent = this.nev;
            leirasElem.textContent = this.leiras;
            datumElem.textContent = `Dátum: ${this.datum.toLocaleDateString()}`;
        });
        
        //Append
        checkboxWrapper.appendChild(checkbox);
        leiras.appendChild(leirasKep);

        if (this.leiras.trim() !== "") {
            lenyitoGomb.appendChild(lenyitoImg);
            esemenyDiv.append(checkboxWrapper, title, leiras, lenyitoGomb);   // Csak akkor adjuk hozzá a leírást, ha van
        } else {
            esemenyDiv.append(checkboxWrapper, title, leiras);
        }
        
        teendoAdatok.append(leirasElem, datumElem);
        eventWrap.append(esemenyDiv, teendoAdatok);

        return eventWrap;
    }
}

function teendokFrissit() {
    const container = document.querySelector(".teendok");
    container.innerHTML = ""; //Clear
    if(teendokLista.length === 0)       //Debug szinten jó, hogy nem jelenik meg minden egyes alkalommal, máskülönben nem jó, mert nem működik
    {
        alert("Nincsen egyetlen egy teendő sem");
    }
    else{
        teendokLista.forEach(teendo => {
            container.appendChild(teendo.addHMTLresz());
        });
    }
}

document.querySelector("#addEvent").addEventListener("click", () => {
    const nev = prompt("Teendő neve:");
    const leiras = prompt("Teendő leírása:");
    let datum = prompt("Esemény dátuma (ÉÉÉÉ-HH-NN vagy ÉÉÉÉHHNN):");        
    if (nev) {
        const teendo = new Teendo(nev, leiras || "", datum);    //Igen, kell a || "" rész mert a JS különbséget tesz a string.Empty és null közt (senki sem kérte)
        teendokLista.push(teendo);
        //document.querySelector(".teendok").appendChild(teendo.addHMTLresz());
        teendokFrissit();
    }
});