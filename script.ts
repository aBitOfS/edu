declare function doZapisz(zestawy: Zestaw[]): void;
declare function doZmiana(wyswietl: Pytanie[]): void;
declare function wczytajJSON(): Zestaw[];

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
				doZmiana(sortujPojecia(this.zestaw.pojecia,this.wyborSortowania.value));
				return;
			}
		alert("Brak wybranego zestawu");
	}
	zerujPostep() {
		if (confirm("Czy na pewno chcesz wyzerować postęp?")) {
			localStorage.removeItem(this.zestaw.id);
			localStorage.removeItem("zestawy");
			this.wczytajZestawy();
		}
	}
}

interface Pytanie {
	war1: string; // | string[]
	war2: string | string[];
	kat?: string;
	time?: Date; // Czas następnego powtórzenia
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

class Slow implements Pytanie {
	war1: string;
	war2: string;
	kat?: "der" | "die" | "das" | "l.mn.";
	constructor(odpowiedz: string, definicja: string) {
		this.war1 = odpowiedz;
		this.war2 = definicja;
		if (this.war1.slice(0,4) === "der ") this.kat = "der";
		if (this.war1.slice(0,4) === "die ") this.kat = "die";
		if (this.war1.slice(0,4) === "das ") this.kat = "das";
	}
}

class NiemieckiUbrania extends Zestaw {
	nazwa = "Niemiecki Ubrania";
	id = "niemUbr"
	pojecia = [new Slow("der Anzug","garnitur"), new Slow("das Armband","branzoletka"),new Slow("die Armbanduhr", "zegarek"),new Slow("die Bluse","bluzka"),
		new Slow("das Deodorant","dezodorant"), new Slow("der/das Puder","puder"),new Slow("der/das Sakko", "marynarka"),new Slow("der Gürtel","pasek"),
		new Slow("die Gürteltasche",'Torba "nerka"'), new Slow("die Haarbürste","szczotka do włosów"),new Slow("die Halskette", "łańcuszek"),new Slow("das Halstuch","apaszka"),
		new Slow("die Handcreme","krem do rąk"), new Slow("die Handyhülle","osłona na telefon"),new Slow("das Hemd", "koszula"),new Slow("die Hose","spodnie"),
		new Slow("der Hut","kapelusz"), new Slow("die Jacke","kurtka"),new Slow("das Kleid", "sukienka"),new Slow("die Kleidung","ubranie"),
		new Slow("die Kniestrümpfe","podkolanówki"), new Slow("der Kopfhörer","słuchawka"),new Slow("die Kopfhörer", "słuchawki"),new Slow("die Kosmetika","kosmetyki"),
		new Slow("die Krawatte","krawat"), new Slow("die Lederjacke","kurtka skórzana"),new Slow("der Lippenbalsam", "balsam do ust"),new Slow("der Lippenstift","pomadka do ust"),
		new Slow("die Lunchbox","pudełko na drugie śniadanie"), new Slow("der Mantel","płaszcz"),new Slow("die Mütze", "czapka"),new Slow("der Notizblock","Blok do notatek"),
		new Slow("die Ohrringe","kolczyki"), new Slow("das Parfüm","perfumy"),new Slow("der Pullover", "sweter"),new Slow("der Ring","pierścionek"),
		new Slow("der Rock","spódnica"), new Slow("der Rucksack","plecak"),new Slow("der Schmuck", "biżuteria"),new Slow("die Schuhe","buty"),
		new Slow("der Schülerkalender","kalendarz szkolny"), new Slow("der Schulrucksack","plecak szkolny"),new Slow("die Schultasche", "torba do szkoły"),new Slow("die Sneakers","trampki"),
		new Slow("die Socken","skarpetki"), new Slow("die Strumpfhose","rajstopy"),new Slow("das Sweatshirt", "bluza"),new Slow("die Trinkflasche","bidon"),
		new Slow("der Turnbeutel","worek na strój gimnastyczny"), new Slow("der USB-Stick","pendrive"),new Slow("die Weste", "kamizelka")/*,
		new Slow("",""), new Slow("",""),new Slow("", ""),new Slow("","")*/];
	slownik = new URL("https://www.diki.pl/slownik-niemieckiego");
}

class MapP implements Pytanie {
	war1: string; // Nazwa
	war2: string | string[]; // Wojewódźtwo
	polozenieNaMapie: [number,number];
	charakterystycznyElement?: string;
}

class ParkiNarodowe extends Zestaw {
	id = "parkNar"
	nazwa = "Parki Narodowe";
	pojecia = [new Slow("Słowiński PN","Pomorskie")];
}

var index;
function startIndex() {
	index = new Index();
}
function sortujPojecia(pojecia: Pytanie[], typ: string) {
	let sP = pojecia.slice();
	let repetitionLimit = Date.now();

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