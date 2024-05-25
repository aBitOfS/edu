declare function doZapisz(zestawy: Zestaw[]): void;
declare function doZmiana(zestaw: Zestaw): void;
declare function wczytajJSON(): Zestaw[];
declare function wyswietlZestaw(zestaw : Zestaw);

class Index {
	zestaw: Zestaw;
	zestawy: Zestaw[];
	wyborZestawu: HTMLSelectElement;
	listaPojec: HTMLElement;
	wyborSortowania: HTMLSelectElement;
	constructor() {
		this.wyborZestawu = document.getElementById("wyborZestawu") as HTMLSelectElement ?? document.createElement("select");
		this.listaPojec = document.getElementById("listaPojec") ?? document.createElement("div");
		this.wyborSortowania = document.getElementById("wyborSortowania") as HTMLSelectElement ?? document.createElement("select");
		this.wczytajZestawy();
	}
	wczytajZestawy() {
		// Wczytywanie listy wszystkich zestawów
		this.zestawy = wczytajJSON();
			// Zapisane tylko lokalnie
		let zestawyStr = localStorage.getItem("zestawy");
		if (zestawyStr && zestawyStr != "undefined")
			this.zestawy.push(...JSON.parse(zestawyStr));
		// Odświerzenie strony
		doZapisz(this.zestawy);
		// Wybrany zestaw
		let nazwaZestawu = localStorage.getItem("zestaw");
		if (nazwaZestawu && nazwaZestawu != "undefined")
			this.wyborZestawu.value = nazwaZestawu;
		this.zmianaZestawu();
	}
	zmianaZestawu() {
		for (let el of this.zestawy)
			if (el.id == this.wyborZestawu.value) {
				// Wczytywanie postępu
				let mem = localStorage.getItem(el.id);
				if (mem && mem != "undefined")
					this.zestaw = JSON.parse(mem);
				else {
					// Bez postępu
					this.zestaw = el;
					localStorage.setItem(this.wyborZestawu.value,JSON.stringify(this.zestaw));
				}
				localStorage.setItem("zestaw",this.wyborZestawu.value);
				//this.zestaw.pojecia = sortuj(this.zestaw.pojecia,this.wyborSortowania.value)
				doZmiana(this.zestaw);
				return;
			}
		alert("Brak wybranego zestawu");
	}
	zerujPostep() {
		if (confirm("Czy na pewno chcesz wyzerować postęp?")) {
			localStorage.removeItem(this.zestaw.id);
			this.wczytajZestawy();
		}
	}
}

interface Pytanie {
	kat?: string;
	time?: number; // Czas następnego powtórzenia
	umiej?: number; // Stopień umiejętności
}

class Zestaw {
	id: string;
	nazwa: string;
	opis?: string;
	pojecia: Pytanie[];
	slownik?: URL;
	//type?: "niemiecki" | "mapa";
	rodzajniki?: [number, string][]; // 0 - der, 1 - die, 2 - das, 3 - l.mn.
}
function sortujPojecia(pojecia: Pytanie[], typ: string) {
	console.log("OLD sortujPojecia");
	let sP = pojecia.slice();
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
function czasNaTekst(czas: number): string {
	czas = Math.floor(czas/60000); // minuty
	if (czas == 1)
		return "minutę";
	if (czas < 60)
		return `${czas} ${czas < 5 ? "minuty" : "minut"}`;
	else if (czas < 120)
		return "godzinę";
	else if (czas < 60*24) {
		czas = Math.floor(czas/6)/10;
		return `${czas} ${czas < 5 ? "godziny" : "godzin"}`;
	}
	else {
		czas = Math.floor(czas/60/24);
		return `${czas} ${czas == 1 ? "dzień" : "dni"}`;
	}
}

function aplikujSzablon(szablon: string[], wartosci: Pytanie) {
	let wyn: string[] = [], frag: string[], czy: boolean, str: string;
	for (let el of szablon) {
		czy = el.indexOf("?") == 0;
		if (czy)
			frag = el.slice(1).split("^");
		else
			frag = el.split("^");
		str = frag[0];
		for (let i = 1; i < frag.length; i+=2) {
			// if (frag[i].startsWith("?"))
			str += wartosci[frag[i]] + frag[i+1];
		}
		if (str.indexOf("undefined") == -1) // !czy || 
			wyn.push(str);
	}
	return wyn;
}

function sortuj(pojecia: Pytanie[], ...poCzym: string[]) {
	let repetitionLimit = Date.now();
	pojecia.sort(function(a: Pytanie, b: Pytanie) {
		let ae, be, odw = false;
		for (let el of poCzym) {
			// Gdy losowe
			if (el == "rand") return Math.random() < 0.5 ? -1 : 1;
			else if (el == "time") {
				let at = a.time ?? repetitionLimit;
				let bt = b.time ?? repetitionLimit;
				if (at > bt) return 1;
				else if (bt > at) return -1;
			}
			// Odwrócenie
			odw = el.indexOf("^") == 0;
			if (odw)
				el = el.slice(1);
			ae = a[el];
			be = b[el];
			// Niewrażliwe na wielkość liter
			if (typeof ae == "string" && typeof be == "string") {
				ae = ae.toLowerCase()
				be = be.toLowerCase()
			}
			if (ae && (!be || (!odw && ae < be) || (odw && ae > be))) return -1;
			else if (be && (!ae || (!odw && ae > be) || (odw && ae < be))) return 1;
		}
		return 0;
	})
	return pojecia;
}

function dalej(zestaw: Zestaw, szablon: string[], poprzednie?: Pytanie, ileMinut?: number) {
	if (poprzednie) {
		if (ileMinut) {
			// Odkładanie
			poprzednie.time = (Date.now() + 60000 * ileMinut);
			console.log(`powtórzę za ${czasNaTekst(60000 * ileMinut)}`);
		}
		zestaw.pojecia.push(poprzednie);
		sortuj(zestaw.pojecia,"time","rand"); // Można zastąpić czymś efektywniejszym (nie trzeba sortować całości)
		// Zapisywanie
		localStorage.setItem(zestaw.id,JSON.stringify(zestaw));
	}
	else
		sortuj(zestaw.pojecia,"time","rand");
	
	if (zestaw.pojecia.length == 0) {
		alert("Wybrany zestaw nie posiada fiszek");
		window.history.back();
		return;
	}
	let pojecie: Pytanie = zestaw.pojecia.shift() ?? {};
	
	if (pojecie.time && pojecie.time > Date.now()+60000) {
		alert("Dobra robota! Ukończyłeś na teraz wróć za "+czasNaTekst(pojecie.time-Date.now()));
		window.history.back();
		return;
	}

	let element = aplikujSzablon(szablon,pojecie);
	console.log(element[0]);

	return [pojecie, element];
}

// localStorage.setItem("zestawy",JSON.stringify(zestawy));