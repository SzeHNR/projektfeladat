//A regiszrálásnál a jelszó megadós field "jelszo_regisztracio" lett    NEM tartalmazza a sima "jelszo" ID-t
//Átmenetileg kikommentezve: 118. sor és új funcion-ök


/*      itt lesznek a "feladatok"
    (noveremet megkertem a novenyek megrajzolasara ugyhogy a jatekka is elkezdhetunk majd elobb utobb ADDIG VISZONT)
        1 - lokalisan probald elmenteni a felhasznalo altal irt valtoztatasokat
        2 - ha van otleted hogy egy kis naptart hogyan lehetne letrehozni akkor a naptar helyere nyugodtan tesztelgethetsz akar frontendet is  

*/



var teendokLista = [];      //lehet, hogy simán lehet, hogy maradhatna const, de inkább átrakom var-ra (hisz változik az értéke)
var regiszraltFiokok = [];
var selectedFiok;

//Van jótár átmeneti in- és output megoldás (lényegében az összes alert/prompt), majd kérnék hozzá frontend-en helyet, mert nem akarok "rossz" helyre írni

class fiok{
    constructor(uName, email, pWord){
        this.uName = uName;
        this.email = email; 
        this.pWord = pWord;
    }
}
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

function regisztracio(mitCsinaljon)
{
    if(mitCsinaljon === "keep")
    {
        const wrap = document.querySelector(".regisztracio");
        if(wrap){
            console.log(":(");
        }
        else{
            console.log("Létezik VÉGRE!");
        }
        const inUName = wrap.querySelector(".felhasznalonev_regisztracio").value;
        const inEmail = wrap.querySelector(".email").value;
        const inPWord = wrap.querySelector(".jelszo").value;
        if(inUName && inEmail && inPWord){
            if(!regiszraltFiokok.find(acc => acc.email === inEmail) && !regiszraltFiokok.find(acc => acc.uName === inUName)){
                regiszraltFiokok.push(new fiok(inUName, inEmail, inPWord));
                alert("Regisztáció sikeres");
            }
            else if(regiszraltFiokok.find(acc => acc.email === inEmail)){
                alert("A megadott email címmel már regisztráltak");
            }
            else{
                alert("Az adott névvel már regisztráltak")
            }
        }
    }
    else{
        console.log("Show:\tregisztracio");
        document.querySelector(".bejelentkezes_regisztracio").classList.add("fordul_egesz");
        document.querySelector(".bejelentkezes_registracio_inner").classList.add("fordul_inner");
        //alert("Hiányzó adat");
    }
}

function bejelentkezes(mitCsinaljon)
{
    if(mitCsinaljon === "keep")
    {
        const wrap = document.querySelector(".bejelentkezes");
        if(wrap){
            console.log(":( ");
        }
        else{
            console.log("Létezik VÉGRE!");
        }
        const inUName = wrap.querySelector(".felhasznalonev").value;
        const inPWord = wrap.querySelector(".jelszo").value;
        if(inUName && inPWord){
            const talaltUname = regiszraltFiokok.find(acc => acc.uName === inUName);
            const talaltPWord = regiszraltFiokok.find(acc => acc.pWord === inPWord);
            if(talaltPWord && talaltUname){
                if(talaltPWord.uName === talaltUname.uName){
                    selectedFiok = talaltUname;
                    alert("Sikeres belépés");
                    document.querySelector(".bejelentkezes_regisztracio").style.display="none";
                }
                else if(talaltUname !== null && talaltPWord){
                    alert(`Helytelen jelszó a(z) ${talaltUname.uName} fiókhoz`);    //nagy eséllyel ki lesz véve ez az else if, vagy "progressive" lesz a log-in, de azt meg kell csinálni a regisztárlásnál is (max akkor áljunk neki, ha túlságosan ráérünk)
                }
                else{
                    alert("Helytelen felhasználónév vagy jelszó")
                }
            }
            else{
                alert("Nem található az adott fiók");
            }
        }
    }
    else{
        console.log("Show:\tbejelentkezes");
        document.querySelector(".bejelentkezes_regisztracio").classList.remove("fordul_egesz");
        document.querySelector(".bejelentkezes_registracio_inner").classList.remove("fordul_inner");
        //alert("Hiányzó adat");
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


//ez a hamburgermenu 
function burgermenu() {
    var element = document.querySelector(".oldalsav");
    element.style.display = element.style.display === "block" ? "none" : "block";
}

//ez a rutintablazat 
var table = document.querySelector(".habitus_table");
function habitus_add() {
    var row = table.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();
    var cell6 = row.insertCell();
    var cell7 = row.insertCell();
    var cell8 = row.insertCell();

    var minusButton = document.createElement("div");
    cell1.className = "eltavolit_megjelenit"
    minusButton.className = "eltavolit_habitus";
    minusButton.innerHTML = "<img src='images/plus.png' alt=''>";
    minusButton.addEventListener("click", function () {
        habitus_minus(this);
    });
    var inputField = document.createElement("input");
    inputField.className = "tablazat_rutin";

    cell1.appendChild(minusButton);
    cell1.appendChild(inputField);
    cell2.innerHTML = "";
    cell3.innerHTML = "";
    cell4.innerHTML = "";
    cell5.innerHTML = "";
    cell6.innerHTML = "";
    cell7.innerHTML = "";
    cell8.innerHTML = "";
}
function habitus_minus(element) {
    var row = element.parentNode.parentNode;
    table.deleteRow(row.rowIndex);
}