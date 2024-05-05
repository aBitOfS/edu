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
        this.ZmianaZestawu();
    }
    Index.prototype.ZmianaZestawu = function () {
        localStorage.setItem("zestaw", this.wyborZestawu.value);
        if (this.wyborZestawu.value === "niem")
            this.zestaw = new NiemieckiUbrania();
        else if (this.wyborZestawu.value === "geo")
            this.zestaw = new ParkiNarodowe();
        localStorage.setItem(this.wyborZestawu.value, JSON.stringify(this.zestaw));
        this.listaPojec.innerHTML = "";
        var s = this.zestaw.Sortuj(this.wyborSortowania.value);
        for (var _i = 0, s_1 = s; _i < s_1.length; _i++) {
            var el = s_1[_i];
            if (el.kat)
                this.listaPojec.innerHTML += "<div><span class=\"kat".concat(el.kat, "\">").concat(el.kat, "</span> ").concat(el.war1.slice(4), " - ").concat(el.war2, "</div>");
            else
                this.listaPojec.innerHTML += "<div>".concat(el.war1, " - ").concat(el.war2, "</div>");
        }
    };
    return Index;
}());
var Zestaw = /** @class */ (function () {
    function Zestaw() {
    }
    Zestaw.prototype.Sortuj = function (typ) {
        var sP = this.pojecia.slice();
        if (typ === "alf") {
            sP.sort(function (a, b) {
                var an = a.war1, bn = b.war1;
                if (a.kat) // && a.kat in ["der","die","das"]
                    an = a.war1.slice(4);
                if (b.kat) // && b.kat in ["der","die","das"]
                    bn = b.war1.slice(4);
                if (an > bn)
                    return 1;
                else if (bn > an)
                    return -1;
                else
                    return 0;
            });
        }
        else if (typ === "rodz") {
            sP.sort(function (a, b) {
                if (a.kat && (!b.kat || a.kat > b.kat))
                    return 1;
                else if (b.kat && (!a.kat || b.kat > a.kat))
                    return -1;
                else if (a.war1 > b.war1)
                    return 1;
                else if (b.war1 > a.war1)
                    return -1;
                else
                    return 0;
            });
        }
        else if (typ === "time") {
            var repetitionLimit_1 = Date.now();
            sP.sort(function (a, b) {
                var _a, _b;
                var at = (_a = a.time) !== null && _a !== void 0 ? _a : repetitionLimit_1;
                var bt = (_b = b.time) !== null && _b !== void 0 ? _b : repetitionLimit_1;
                if (at > bt)
                    return 1;
                else if (bt > at)
                    return -1;
                else
                    return 0;
            });
        }
        return sP;
    };
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
        _this.pojecia = [new Slow("der Anzug", "garnitur"), new Slow("das Armband", "branzoletka"), new Slow("die Armbanduhr", "zegarek"), new Slow("die Bluse", "bluzka"),
            new Slow("das Deodorant", "dezodorant"), new Slow("der/das Puder", "puder"), new Slow("der/das Sakko", "marynarka"), new Slow("der Gürtel", "pasek"),
            new Slow("die Gürteltasche", 'Torba "nerka"'), new Slow("die Haarbürste", "szczotka do włosów"), new Slow("die Halskette", "łańcuszek"), new Slow("das Halstuch", "apaszka"),
            new Slow("die Handcreme", "krem do rąk"), new Slow("die Handyhülle", "osłona na telefon"), new Slow("das Hemd", "koszula"), new Slow("die Hose", "spodnie"),
            new Slow("der Hut", "kapelusz"), new Slow("die Jacke", "kurtka"), new Slow("das Kleid", "sukienka"), new Slow("die Kleidung", "ubranie"),
            new Slow("der Kniestrumpf", "podkolanówka"), new Slow("der Kopfhörer", "słuchawka"), new Slow("die Kopfhörer", "słuchawki"), new Slow("die Kosmetika", "kosmetyki"),
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
