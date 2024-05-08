var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Index = /** @class */ (function () {
    function Index() {
        var _a, _b, _c;
        this.wyborZestawu = (_a = document.getElementById("wyborZestawu")) !== null && _a !== void 0 ? _a : document.createElement("select");
        this.listaPojec = (_b = document.getElementById("listaPojec")) !== null && _b !== void 0 ? _b : document.createElement("div");
        this.wyborSortowania = (_c = document.getElementById("wyborSortowania")) !== null && _c !== void 0 ? _c : document.createElement("select");
        this.wczytajZestawy();
    }
    Index.prototype.wczytajZestawy = function () {
        var _a;
        // Wczytywanie listy wszystkich zestawów
        this.zestawy = wczytajJSON();
        // Zapisane tylko lokalnie
        var zestawyStr = localStorage.getItem("zestawy");
        if (zestawyStr && zestawyStr != "undefined")
            (_a = this.zestawy).push.apply(_a, JSON.parse(zestawyStr));
        // Odświerzenie strony
        doZapisz(this.zestawy);
        // Wybrany zestaw
        var nazwaZestawu = localStorage.getItem("zestaw");
        if (nazwaZestawu && nazwaZestawu != "undefined")
            this.wyborZestawu.value = nazwaZestawu;
        this.zmianaZestawu();
    };
    Index.prototype.zmianaZestawu = function () {
        for (var _i = 0, _a = this.zestawy; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.id == this.wyborZestawu.value) {
                // Wczytywanie postępu
                var mem = localStorage.getItem(el.id);
                if (mem && mem != "undefined")
                    this.zestaw = JSON.parse(mem);
                else {
                    // Bez postępu
                    this.zestaw = el;
                    localStorage.setItem(this.wyborZestawu.value, JSON.stringify(this.zestaw));
                }
                localStorage.setItem("zestaw", this.wyborZestawu.value);
                doZmiana(sortujPojecia(this.zestaw.pojecia, this.wyborSortowania.value));
                return;
            }
        }
        alert("Brak wybranego zestawu");
    };
    Index.prototype.zerujPostep = function () {
        if (confirm("Czy na pewno chcesz wyzerować postęp?")) {
            localStorage.removeItem(this.zestaw.id);
            localStorage.removeItem("zestawy");
            this.wczytajZestawy();
        }
    };
    return Index;
}());
var Zestaw = /** @class */ (function () {
    function Zestaw() {
    }
    return Zestaw;
}());
var Slow = /** @class */ (function () {
    function Slow(odpowiedz, definicja) {
        this.war1 = odpowiedz;
        this.war2 = definicja;
        if (this.war1.slice(0, 4) === "der ")
            this.kat = "der";
        if (this.war1.slice(0, 4) === "die ")
            this.kat = "die";
        if (this.war1.slice(0, 4) === "das ")
            this.kat = "das";
    }
    return Slow;
}());
var NiemieckiUbrania = /** @class */ (function (_super) {
    __extends(NiemieckiUbrania, _super);
    function NiemieckiUbrania() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nazwa = "Niemiecki Ubrania";
        _this.id = "niemUbr";
        _this.pojecia = [new Slow("der Anzug", "garnitur"), new Slow("das Armband", "branzoletka"), new Slow("die Armbanduhr", "zegarek"), new Slow("die Bluse", "bluzka"),
            new Slow("das Deodorant", "dezodorant"), new Slow("der/das Puder", "puder"), new Slow("der/das Sakko", "marynarka"), new Slow("der Gürtel", "pasek"),
            new Slow("die Gürteltasche", 'Torba "nerka"'), new Slow("die Haarbürste", "szczotka do włosów"), new Slow("die Halskette", "łańcuszek"), new Slow("das Halstuch", "apaszka"),
            new Slow("die Handcreme", "krem do rąk"), new Slow("die Handyhülle", "osłona na telefon"), new Slow("das Hemd", "koszula"), new Slow("die Hose", "spodnie"),
            new Slow("der Hut", "kapelusz"), new Slow("die Jacke", "kurtka"), new Slow("das Kleid", "sukienka"), new Slow("die Kleidung", "ubranie"),
            new Slow("die Kniestrümpfe", "podkolanówki"), new Slow("der Kopfhörer", "słuchawka"), new Slow("die Kopfhörer", "słuchawki"), new Slow("die Kosmetika", "kosmetyki"),
            new Slow("die Krawatte", "krawat"), new Slow("die Lederjacke", "kurtka skórzana"), new Slow("der Lippenbalsam", "balsam do ust"), new Slow("der Lippenstift", "pomadka do ust"),
            new Slow("die Lunchbox", "pudełko na drugie śniadanie"), new Slow("der Mantel", "płaszcz"), new Slow("die Mütze", "czapka"), new Slow("der Notizblock", "Blok do notatek"),
            new Slow("die Ohrringe", "kolczyki"), new Slow("das Parfüm", "perfumy"), new Slow("der Pullover", "sweter"), new Slow("der Ring", "pierścionek"),
            new Slow("der Rock", "spódnica"), new Slow("der Rucksack", "plecak"), new Slow("der Schmuck", "biżuteria"), new Slow("die Schuhe", "buty"),
            new Slow("der Schülerkalender", "kalendarz szkolny"), new Slow("der Schulrucksack", "plecak szkolny"), new Slow("die Schultasche", "torba do szkoły"), new Slow("die Sneakers", "trampki"),
            new Slow("die Socken", "skarpetki"), new Slow("die Strumpfhose", "rajstopy"), new Slow("das Sweatshirt", "bluza"), new Slow("die Trinkflasche", "bidon"),
            new Slow("der Turnbeutel", "worek na strój gimnastyczny"), new Slow("der USB-Stick", "pendrive"), new Slow("die Weste", "kamizelka") /*,
            new Slow("",""), new Slow("",""),new Slow("", ""),new Slow("","")*/
        ];
        _this.slownik = new URL("https://www.diki.pl/slownik-niemieckiego");
        return _this;
    }
    return NiemieckiUbrania;
}(Zestaw));
var MapP = /** @class */ (function () {
    function MapP() {
    }
    return MapP;
}());
var ParkiNarodowe = /** @class */ (function (_super) {
    __extends(ParkiNarodowe, _super);
    function ParkiNarodowe() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = "parkNar";
        _this.nazwa = "Parki Narodowe";
        _this.pojecia = [new Slow("Słowiński PN", "Pomorskie")];
        return _this;
    }
    return ParkiNarodowe;
}(Zestaw));
var index;
function startIndex() {
    index = new Index();
}
function sortujPojecia(pojecia, typ) {
    var sP = pojecia.slice();
    var repetitionLimit = Date.now();
    function rand() {
        return Math.random() < 0.5 ? -1 : 1;
    }
    function alf(a, b) {
        {
            var an = a.war1, bn = b.war1;
            if (a.kat) // && a.kat in ["der","die","das"]
                an = a.war1.slice(4);
            if (b.kat) // && b.kat in ["der","die","das"]
                bn = b.war1.slice(4);
            if (an.toLowerCase() > bn.toLowerCase())
                return 1;
            else if (bn.toLowerCase() > an.toLowerCase())
                return -1;
            else
                return 0;
        }
    }
    function rodz(a, b) {
        if (a.kat && (!b.kat || a.kat > b.kat))
            return 1;
        else if (b.kat && (!a.kat || b.kat > a.kat))
            return -1;
        else
            return alf(a, b);
    }
    function time(a, b) {
        var _a, _b;
        var at = (_a = a.time) !== null && _a !== void 0 ? _a : repetitionLimit;
        var bt = (_b = b.time) !== null && _b !== void 0 ? _b : repetitionLimit;
        if (at > bt)
            return 1;
        else if (bt > at)
            return -1;
        else
            return rand();
    }
    function umiej(a, b) {
        var _a, _b;
        var at = (_a = a.time) !== null && _a !== void 0 ? _a : repetitionLimit;
        var bt = (_b = b.time) !== null && _b !== void 0 ? _b : repetitionLimit;
        if (at > bt)
            return 1;
        else if (bt > at)
            return -1;
        else
            return alf(a, b);
    }
    if (typ === "alf")
        sP.sort(alf);
    else if (typ === "rodz")
        sP.sort(rodz);
    else if (typ === "time")
        sP.sort(time);
    else if (typ === "umiej")
        sP.sort(umiej);
    return sP;
    /*if (typ === "alf") {
        sP.sort((a:Pytanie,b:Pytanie) => {
            let an = a.war1, bn = b.war1;
            if (a.kat) // && a.kat in ["der","die","das"]
                an = a.war1.slice(4);
            if (b.kat) // && b.kat in ["der","die","das"]
                bn = b.war1.slice(4);
            if (an.toLowerCase() > bn.toLowerCase()) return 1;
            else if (bn.toLowerCase() > an.toLowerCase()) return -1;
            else return 0;
        })
    }*/
}
function czasNaTekst(czas) {
    czas = Math.floor(czas / 60000); // minuty
    if (czas == 1)
        return "minutę";
    if (czas < 60)
        return "".concat(czas, " ").concat(czas < 5 ? "minuty" : "minut");
    else if (czas < 120)
        return "godzinę";
    else if (czas < 60 * 24) {
        czas = Math.floor(czas / 6) / 10;
        return "".concat(czas, " ").concat(czas < 5 ? "godziny" : "godzin");
    }
    else {
        czas = Math.floor(czas / 60 / 24);
        return "".concat(czas, " ").concat(czas == 1 ? "dzień" : "dni");
    }
}
