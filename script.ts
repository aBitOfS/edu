class Index {
	zestaw: Zestaw;
	wyborZestawu: HTMLSelectElement;
	listaPojec: HTMLElement;
	wyborSortowania: HTMLSelectElement;
	constructor() {
		this.wyborZestawu = document.getElementById("wyborZestawu") as HTMLSelectElement ?? document.createElement("select");
		this.listaPojec = document.getElementById("listaPojec") ?? document.createElement("div");
		this.wyborSortowania = document.getElementById("wyborSortowania") as HTMLSelectElement ?? document.createElement("select");
		this.ZmianaZestawu();
	}
	ZmianaZestawu() {
		localStorage.setItem("zestaw",this.wyborZestawu.value);
		if (this.wyborZestawu.value === "niem")
			this.zestaw = new NiemieckiUbrania();
		else if (this.wyborZestawu.value === "geo")
			this.zestaw = new ParkiNarodowe();
		localStorage.setItem(this.wyborZestawu.value,JSON.stringify(this.zestaw));
		this.listaPojec.innerHTML = "";
		let s = this.zestaw.Sortuj(this.wyborSortowania.value);
		for (let el of s) {
			if (el.kat)
				this.listaPojec.innerHTML += `<div><span class="kat${el.kat}">${el.kat}</span> ${el.war1.slice(4)} - ${el.war2}</div>`;
			else
				this.listaPojec.innerHTML += `<div>${el.war1} - ${el.war2}</div>`;
		}
	}
	/*wczytajZestawy() {
		let zestawyStr = localStorage.getItem("zestawy");
		if (zestawyStr && zestawyStr != "undefined") { // Zapisane zestawy
			let zestawy = JSON.parse(zestawyStr);
			this.zapiszZestawy(zestawy);
		}
		else {
			$.getJSON("zestawy.json",(zestawy) => {
				this.zapiszZestawy(zestawy);
			})
		}
	}
	zapiszZestawy(zestawy) {
		localStorage.setItem("zestawy",JSON.stringify(zestawy));
		// Ustawienie przedmiotów i zestawów
	}*/
}

interface Pytanie {
	war1: string | string[];
	war2: string | string[];
	kat?: string;
	time?: Date; // Czas następnego powtórzenia
}

class Zestaw {
	nazwa: string;
	opis?: string;
	pojecia: Pytanie[];
	slownik?: URL;
	//type?: "niemiecki" | "mapa";
	rodzajniki?: [number, string][]; // 0 - der, 1 - die, 2 - das, 3 - l.mn.
	Sortuj(typ: string) { // "alf" | "rodz" | "org" | "time"
		let sP = this.pojecia.slice();
		if (typ === "alf") {
			sP.sort((a:Pytanie,b:Pytanie) => {
				let an = a.war1, bn = b.war1;
				if (a.kat) // && a.kat in ["der","die","das"]
					an = a.war1.slice(4);
				if (b.kat) // && b.kat in ["der","die","das"]
					bn = b.war1.slice(4);
				if (an > bn) return 1;
				else if (bn > an) return -1;
				else return 0;
			})
		}
		else if (typ === "rodz") {
			sP.sort((a:Pytanie,b:Pytanie) => {
				if (a.kat && (!b.kat || a.kat > b.kat)) return 1;
				else if (b.kat && (!a.kat || b.kat > a.kat)) return -1;
				else if (a.war1 > b.war1) return 1;
				else if (b.war1 > a.war1) return -1;
				else return 0;
			})
		}
		else if (typ === "time") {
			let repetitionLimit = Date.now();
			sP.sort((a:Pytanie,b:Pytanie) => {
				let at = a.time ?? repetitionLimit;
				let bt = b.time ?? repetitionLimit;
				if (at > bt) return 1;
				else if (bt > at) return -1;
				else return 0;
			})
		}
		return sP;
	}
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
	pojecia = [new Slow("der Anzug","garnitur"), new Slow("das Armband","branzoletka"),new Slow("die Armbanduhr", "zegarek"),new Slow("die Bluse","bluzka"),
		new Slow("das Deodorant","dezodorant"), new Slow("der/das Puder","puder"),new Slow("der/das Sakko", "marynarka"),new Slow("der Gürtel","pasek"),
		new Slow("die Gürteltasche",'Torba "nerka"'), new Slow("die Haarbürste","szczotka do włosów"),new Slow("die Halskette", "łańcuszek"),new Slow("das Halstuch","apaszka"),
		new Slow("die Handcreme","krem do rąk"), new Slow("die Handyhülle","osłona na telefon"),new Slow("das Hemd", "koszula"),new Slow("die Hose","spodnie"),
		new Slow("der Hut","kapelusz"), new Slow("die Jacke","kurtka"),new Slow("das Kleid", "sukienka"),new Slow("die Kleidung","ubranie"),
		new Slow("der Kniestrumpf","podkolanówka"), new Slow("der Kopfhörer","słuchawka"),new Slow("die Kopfhörer", "słuchawki"),new Slow("die Kosmetika","kosmetyki"),
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
	nazwa = "Parki Narodowe";
	pojecia = [new Slow("Słowiński PN","Pomorskie")];
}

var index;
function startIndex() {
	index = new Index();
}