class Index {
	zestaw;
	zestawy;
	wyborZestawu;
	listaPojec;
	wyborSortowania;
	constructor() {
		this.wyborZestawu = document.getElementById("wyborZestawu") ?? document.createElement("select");
		this.listaPojec = document.getElementById("listaPojec") ?? document.createElement("div");
		this.wyborSortowania = document.getElementById("wyborSortowania") ?? document.createElement("select");
	}
	wczytajZestawy(zestawy) {
		// Wczytywanie listy wszystkich zestawów
		this.zestawy = zestawy;
			// Zapisane tylko lokalnie
		let zestawyStr = localStorage.getItem("zestawy");
		if (zestawyStr && zestawyStr != "undefined")
			this.zestawy.push(...JSON.parse(zestawyStr));
		// Odświerzenie strony
		$("#wyborZestawu").empty()
		for (let el of zestawy)
			$("#wyborZestawu").append(`<option value="${el.id}">${el.nazwa}</option>`)
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

				// Rodzaje sortowania
				let wS = $("#wyborSortowania").empty()/*.append(`<option value="id">Oryginalna
					kolejność</option>`)*/.append('<option value="umiej time">Według umiejętności</option>')
				if (this.zestaw.sort) {
					for (let el of this.zestaw.sort)
						wS.append(`<option value="${el[0]}">${el[1]}</option>`);
				}
				
				// Lista pojęć
				sortuj(this.zestaw.pojecia,...$("#wyborSortowania").val().split(" "));
				let lP = $("#listaPojec").empty(), str;
				if (!this.zestaw.list) {
					lP.append("<h2>Podgląd niedostępny</h2>")
					return;
				}
				else if (this.zestaw["list^"]) {
					str = "<tr>";
					for (let el of this.zestaw["list^"])
						str += `<th>${el}</th>`;
					lP.append(str+"</tr>");
				}
				for (let el of this.zestaw.pojecia) {
					str = "<tr>"
					for (let ell of aplikujSzablon(this.zestaw.list, el))
						str += `<td>${ell}</td>`;
					lP.append(str+"</tr>")
				}
				return;
			}
		alert("Brak wybranego zestawu");
	}
	zerujPostep() {
		if (confirm("Czy na pewno chcesz wyzerować postęp?")) {
			localStorage.removeItem(this.zestaw.id);
			this.wczytajZestawy(this.zestawy);
		}
	}
}

function darkMode() {
	$("body").toggleClass("dark")
	localStorage.setItem("darkMode",$("body").hasClass("dark"))
}

function openDictionary() {
	
}
function closeDictionary() {
	$('#dictionary_container').addClass('hidden')
}

function czasNaTekst(czas) {
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

function aplikujSzablon(szablon, wartosci) {
	let wyn = [], frag, czy, str;
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

function sortuj(pojecia, ...poCzym) {
	let repetitionLimit = Date.now();
	pojecia.sort(function(a, b) {
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

function dalej(zestaw, szablon, poprzednie, ileMinut) {
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
	let pojecie = zestaw.pojecia.shift() ?? {};
	
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