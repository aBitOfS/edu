var Index = /** @class */ (function () {
    function Index() {
        var _a, _b;
        this.wyborZestawu = (_a = document.getElementById("wyborZestawu")) !== null && _a !== void 0 ? _a : document.createElement("input");
        this.listaPojec = (_b = document.getElementById("listaPojec")) !== null && _b !== void 0 ? _b : document.createElement("div");
        this.ZmianaZestawu();
    }
    Index.prototype.ZmianaZestawu = function () {
        if (this.wyborZestawu.checked)
            this.zestaw = new NiemieckiUbrania();
        else
            this.zestaw = new ParkiNarodowe();
        this.listaPojec.innerHTML = "";
        if (this.zestaw.rodzajniki)
            for (var _i = 0, _a = this.zestaw.rodzajniki; _i < _a.length; _i++) {
                var el = _a[_i];
                var rodz = void 0;
                switch (el[0]) {
                    case 0:
                        rodz = "der";
                        break;
                    case 2:
                        rodz = "das";
                        break;
                    case 4:
                        rodz = "der/das";
                        break;
                    default:
                        rodz = "die";
                        break;
                }
                this.listaPojec.innerHTML += "<span class=\"rodz".concat(el[0], "\">").concat(rodz, "</span> ").concat(el[1], "<br/>");
            }
        else
            for (var _b = 0, _c = this.zestaw.pojecia; _b < _c.length; _b++) {
                var el = _c[_b];
                this.listaPojec.innerHTML += "".concat(el.war1, " - ").concat(el.war2, "<br/>");
            }
    };
    return Index;
}());
var Slow = /** @class */ (function () {
    function Slow(definicja, odpowiedz) {
        this.war1 = odpowiedz;
        this.war2 = definicja;
    }
    return Slow;
}());
var NiemieckiUbrania = /** @class */ (function () {
    function NiemieckiUbrania() {
        this.nazwa = "Niemiecki Ubrania";
        this.pojecia = [new Slow("spodnie", "die Hose")];
        this.slownik = new URL("https://www.diki.pl/slownik-niemieckiego");
        this.rodzajniki = [[0, "Anzug - garnitur"], [1, "Armbanduhr - zegarek"], [1, "Bluse - bluzka"],
            [1, "Gürtel - pasek"], [1, "Haarbürste - szczotka do włosów"], [1, "Halskette - łańcuszek"], [1, "Handcreme - krem do rąk"],
            [1, "Handyhülle - osłona na telefon"], [2, "Armband - branzoletka"], [2, "Deodorant - dezodorant"],
            [2, 'Gürteltasche - Torba "nerka"'], [2, "Halstuch - apaszka"], [2, "Hemd - koszula"], [4, "Sakko - marynarka"]];
    }
    return NiemieckiUbrania;
}());
var MapP = /** @class */ (function () {
    function MapP() {
    }
    return MapP;
}());
var ParkiNarodowe = /** @class */ (function () {
    function ParkiNarodowe() {
        this.nazwa = "Parki Narodowe";
        this.pojecia = [new Slow("Słowiński PN", "Pomorskie")];
    }
    return ParkiNarodowe;
}());
var index;
function startIndex() {
    index = new Index();
}
