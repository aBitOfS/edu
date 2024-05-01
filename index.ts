class Index {
	zestaw: Zestaw;
	wyborZestawu: HTMLInputElement; // 
	listaPojec: HTMLElement;
	constructor() {
		this.wyborZestawu = document.getElementById("wyborZestawu") as HTMLInputElement ?? document.createElement("input");
		this.listaPojec = document.getElementById("listaPojec") ?? document.createElement("div");
		this.ZmianaZestawu();
	}
	ZmianaZestawu() {
		if (this.wyborZestawu.checked)
			this.zestaw = new NiemieckiUbrania();
		else
			this.zestaw = new ParkiNarodowe();
		this.listaPojec.innerHTML = "";
		if(this.zestaw.rodzajniki)
			for(let el of this.zestaw.rodzajniki) {
				let rodz;
				switch (el[0]) {
					case 0 :
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
				this.listaPojec.innerHTML += `<span class="rodz${el[0]}">${rodz}</span> ${el[1]}<br/>`;
			}
		else
			for (let el of this.zestaw.pojecia)
				this.listaPojec.innerHTML += `${el.war1} - ${el.war2}<br/>`;
	}
}

interface Pytanie {
	war1: string | string[];
	war2: string | string[];
}

interface Zestaw {
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
	constructor(definicja: string, odpowiedz: string) {
		this.war1 = odpowiedz;
		this.war2 = definicja;
	}
}

class NiemieckiUbrania implements Zestaw {
	nazwa = "Niemiecki Ubrania";
	pojecia = [new Slow("spodnie","die Hose")];
	slownik = new URL("https://www.diki.pl/slownik-niemieckiego");
	rodzajniki: [number, string][] = [[0,"Anzug - garnitur"],[1,"Armbanduhr - zegarek"],[1,"Bluse - bluzka"],
		[1,"Gürtel - pasek"],[1,"Haarbürste - szczotka do włosów"],[1,"Halskette - łańcuszek"], [1,"Handcreme - krem do rąk"],
		[1,"Handyhülle - osłona na telefon"],[2,"Armband - branzoletka"],[2,"Deodorant - dezodorant"],
		[2,'Gürteltasche - Torba "nerka"'],[2,"Halstuch - apaszka"],[2,"Hemd - koszula"],[4,"Sakko - marynarka"]]
}

class MapP implements Pytanie {
	war1: string; // Nazwa
	war2: string | string[]; // Wojewódźtwo
	polozenieNaMapie: [number,number];
	charakterystycznyElement?: string;
}

class ParkiNarodowe implements Zestaw {
	nazwa = "Parki Narodowe";
	pojecia = [new Slow("Słowiński PN","Pomorskie")];
}

var index;
function startIndex() {
	index = new Index();
}