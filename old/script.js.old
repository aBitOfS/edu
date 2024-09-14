var Index = /** @class */ (function () {
    function Index() {
        var _a, _b, _c;
        this.wyborZestawu = (_a = document.getElementById("wyborZestawu")) !== null && _a !== void 0 ? _a : document.createElement("select");
        this.listaPojec = (_b = document.getElementById("listaPojec")) !== null && _b !== void 0 ? _b : document.createElement("div");
        this.wyborSortowania = (_c = document.getElementById("wyborSortowania")) !== null && _c !== void 0 ? _c : document.createElement("select");
        wczytajJSON();
    }
    Index.prototype.wczytajZestawy = function (zestawy) {
        var _a;
        // Wczytywanie listy wszystkich zestawów
        this.zestawy = zestawy;
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
                //this.zestaw.pojecia = sortuj(this.zestaw.pojecia,this.wyborSortowania.value)
                doZmiana(this.zestaw);
                return;
            }
        }
        alert("Brak wybranego zestawu");
    };
    Index.prototype.zerujPostep = function () {
        if (confirm("Czy na pewno chcesz wyzerować postęp?")) {
            localStorage.removeItem(this.zestaw.id);
            this.wczytajZestawy(this.zestawy);
        }
    };
    return Index;
}());
var Zestaw = /** @class */ (function () {
    function Zestaw() {
    }
    return Zestaw;
}());
function sortujPojecia(pojecia, typ) {
    console.log("OLD sortujPojecia");
    var sP = pojecia.slice();
    return sP;
    /*let repetitionLimit = Date.now();

    function rand() {
        return Math.random() < 0.5 ? -1 : 1
    }
    function alf(a:Pytanie,b:Pytanie) {{
        let an = a.war1, bn = b.war1;
        if (a.kat) // && a.kat in ["der","die","das"]
            an = a.war1.slice(4);
        if (b.kat) // && b.kat in ["der","die","das"]
            bn = b.war1.slice(4);
        if (an.toLowerCase() > bn.toLowerCase()) return 1;
        else if (bn.toLowerCase() > an.toLowerCase()) return -1;
        else return 0;
    }
    }
    function rodz(a:Pytanie,b:Pytanie) {
        if (a.kat && (!b.kat || a.kat > b.kat)) return 1;
        else if (b.kat && (!a.kat || b.kat > a.kat)) return -1;
        else return alf(a,b);
    }
    function time(a:Pytanie,b:Pytanie) {
        let at = a.time ?? repetitionLimit;
        let bt = b.time ?? repetitionLimit;
        if (at > bt) return 1;
        else if (bt > at) return -1;
        else return rand();
    }
    function umiej(a:Pytanie,b:Pytanie) {
        let at = a.time ?? repetitionLimit;
        let bt = b.time ?? repetitionLimit;
        if (at > bt) return 1;
        else if (bt > at) return -1;
        else return alf(a,b);
    }
    if (typ === "alf") sP.sort(alf);
    else if (typ === "rodz") sP.sort(rodz);
    else if (typ === "time") sP.sort(time);
    else if (typ === "umiej") sP.sort(umiej);
    return sP;*/
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
function aplikujSzablon(szablon, wartosci) {
    var wyn = [], frag, czy, str;
    for (var _i = 0, szablon_1 = szablon; _i < szablon_1.length; _i++) {
        var el = szablon_1[_i];
        czy = el.indexOf("?") == 0;
        if (czy)
            frag = el.slice(1).split("^");
        else
            frag = el.split("^");
        str = frag[0];
        for (var i = 1; i < frag.length; i += 2) {
            // if (frag[i].startsWith("?"))
            str += wartosci[frag[i]] + frag[i + 1];
        }
        if (str.indexOf("undefined") == -1) // !czy || 
            wyn.push(str);
    }
    return wyn;
}
function sortuj(pojecia) {
    var poCzym = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        poCzym[_i - 1] = arguments[_i];
    }
    var repetitionLimit = Date.now();
    pojecia.sort(function (a, b) {
        var _a, _b;
        var ae, be, odw = false;
        for (var _i = 0, poCzym_1 = poCzym; _i < poCzym_1.length; _i++) {
            var el = poCzym_1[_i];
            // Gdy losowe
            if (el == "rand")
                return Math.random() < 0.5 ? -1 : 1;
            else if (el == "time") {
                var at = (_a = a.time) !== null && _a !== void 0 ? _a : repetitionLimit;
                var bt = (_b = b.time) !== null && _b !== void 0 ? _b : repetitionLimit;
                if (at > bt)
                    return 1;
                else if (bt > at)
                    return -1;
            }
            // Odwrócenie
            odw = el.indexOf("^") == 0;
            if (odw)
                el = el.slice(1);
            ae = a[el];
            be = b[el];
            // Niewrażliwe na wielkość liter
            if (typeof ae == "string" && typeof be == "string") {
                ae = ae.toLowerCase();
                be = be.toLowerCase();
            }
            if (ae && (!be || (!odw && ae < be) || (odw && ae > be)))
                return -1;
            else if (be && (!ae || (!odw && ae > be) || (odw && ae < be)))
                return 1;
        }
        return 0;
    });
    return pojecia;
}
function dalej(zestaw, szablon, poprzednie, ileMinut) {
    var _a;
    if (poprzednie) {
        if (ileMinut) {
            // Odkładanie
            poprzednie.time = (Date.now() + 60000 * ileMinut);
            console.log("powt\u00F3rz\u0119 za ".concat(czasNaTekst(60000 * ileMinut)));
        }
        zestaw.pojecia.push(poprzednie);
        sortuj(zestaw.pojecia, "time", "rand"); // Można zastąpić czymś efektywniejszym (nie trzeba sortować całości)
        // Zapisywanie
        localStorage.setItem(zestaw.id, JSON.stringify(zestaw));
    }
    else
        sortuj(zestaw.pojecia, "time", "rand");
    if (zestaw.pojecia.length == 0) {
        alert("Wybrany zestaw nie posiada fiszek");
        window.history.back();
        return;
    }
    var pojecie = (_a = zestaw.pojecia.shift()) !== null && _a !== void 0 ? _a : {};
    if (pojecie.time && pojecie.time > Date.now() + 60000) {
        alert("Dobra robota! Ukończyłeś na teraz wróć za " + czasNaTekst(pojecie.time - Date.now()));
        window.history.back();
        return;
    }
    var element = aplikujSzablon(szablon, pojecie);
    console.log(element[0]);
    return [pojecie, element];
}
// localStorage.setItem("zestawy",JSON.stringify(zestawy));
