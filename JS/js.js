
var encrypter;
var debug = false;

function enterPassword(recherche){
	GetDecode(recherche.substring(1));
	predClue();
	startGame() ;
	setCookie(GetCode());
	document.getElementById("textB").value = "";
}

var recherchesEffectuees = [];
function requete(){
	var recherche = document.getElementById("textB").value;

	if (recherche.substring(0,1) === "!"){
		enterPassword(recherche);
		return;
	}
	if (recherche === "DOTEST") {
		doTest();
		return;
	}
	if (recherche === "NEWGAME") {
		found = [];
		startGame();
		shortcut(0);
    	document.getElementById("Bnumero").value="?";
		document.getElementById("textB").value = "";
		return;
	}
	recherchesEffectuees.push(recherche);

	var values = getFileNameFromText(recherche);
	//console.info(">>> " + recherche);
	if (values[0] === "") {
    	/*var text = getFileNameFromText(clearTextFromShorts(getSelectedText()));
    	if (text[0] !== "" || text[1] !== "") {
    		includeScript(text);
    		document.getElementById("textB").value = "";
    		return;
    	}*/
		if (!gameStarted) {
			startGame();
			shortcut(0);
	    	document.getElementById("Bnumero").value="?";
			document.getElementById("textB").value = "";
		}
		return;
	}
	
	//console.info(doEncCheat(recherche));
	if (values[0] === doDecCheat("U2FsdGVkX19wKQnGwvRJYeY712DsrV8p767JWJsqe2MvNe56f/9UBoVAcBm/WdjT")) 
	{ window.location = doDecCheat("U2FsdGVkX1/NlOv0aJbNsHJFUTPCEtHhkZWl9ewxHnpMh3FXsB0Gw5SLJJzBaDCv"); }
	else if (values[0] === doDecCheat("")) 
	{ window.location = doDecCheat("U2FsdGVkX19wH480savj7PZWBnPfJvj58B0e3l9+G6c="); }
	else {
		//console.log(values);
		if (gameStarted)
			includeScript(values);
	}
	document.getElementById("textB").value = "";
}

function getSelectedText() {
    var selection = null;

    if (window.getSelection) {
        selection = window.getSelection();
    } else if (typeof document.selection != "undefined") {
        selection = document.selection;
    }

    //var selectedRange = selection.getRangeAt(0);

    //console.log(selection.toString());
    return selection.toString();
}

function doEncCheat(item) {
	var encrypted = CryptoJS.AES.encrypt(item, 'dontcheatplease!');
	return encrypted.toString();
}
function doDecCheat(item) {
	var decrypted = CryptoJS.AES.decrypt(item, 'dontcheatplease!');
	return decrypted.toString(CryptoJS.enc.Utf8);
}

function setAccents(text) {
	return text.replaceAll('é', '&eacute;').replaceAll('è', '&egrave;').replaceAll('ç', '&ccedil;')
		.replaceAll('à', '&agrave;').replaceAll('î', '&icirc;').replaceAll('ê', '&ecirc;').replaceAll('ù', '&ugrave;');
}

function normalize(text) {
	return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\W/g, '')/*.replaceAll("[^A-Za-z0-9]", "")*/;//.replace(/\s+/g, '')
}

function getMediaById(mediumId) {
	for(var j=0; j<listMedias.length; j++) {
		if ("" + listMedias[j].id === "" + mediumId) {
			return listMedias[j];
		}
	}
	return listMedias[0];
}

function getFileNameFromText(text){
	var values = [];
	var mediumId = document.getElementById("medias").value.substring(1);

	var split = text.trim().split(" ");
	for(var i = 0; i < split.length; i++) {
		split[i] = normalize(split[i]);
	}
	split.sort();
	values[1] = split.join('');
	if (mediumId !== "") {
		var medium = getMediaById(mediumId);
		if (medium.code !== "")
			split.push(medium.code);
	}
	split.sort();
	values[0] = split.join('');
	return values;
}

var gameStarted = false;
function startGame() {
	document.getElementById("Bnext").style.display="inline-block";
    document.getElementById("Bpred").style.display="inline-block";
    document.getElementById("Bnumero").style.display="inline-block";
    document.getElementById("Bretour").style.display="inline-block";
    gameStarted = true;
}
function clearTextFromShorts(sel){
	sel = sel.trim();
	sel = sel.replace("'", " ");
	var split = sel.split(" ");
	var tot = "";
	for(var i =0; i < split.length; i++) {
		if (split[i].length > 2)
			tot += split[i] + " ";
	}
	return tot.trim();
}
function addSelected() {
	var sel = getSelectedText();
	if (sel === null || sel === "") return;
	var tot = clearTextFromShorts(sel);

   	if (document.getElementById("textB").value == "")
   		document.getElementById("textB").value = tot;
   	else 
   		document.getElementById("textB").value += " " + tot;
}

var lastscript = null;

function includeScript(pathArray){
	document.getElementById("divB").style.backgroundImage = ""
	var script = document.createElement('script');
	script.src = '../JS/INCLUDES/' + pathArray[0] + '.js';

	// Écouter l'événement 'error'
	script.onerror = function() {
	    var scr = document.createElement('script');
		scr.src = '../JS/INCLUDES/' + pathArray[1] + '.js';
		//console.info("ALT");
		lastscript = scr;
		document.body.appendChild(scr);
		scr.onload = function() {
			//remettre à zéro que si on est pas dedans
    		//document.getElementById('medias').value = 0;
    		//document.getElementById('categories').value = 0;
		};
	};


	if (lastscript !== null) document.body.removeChild(lastscript);
	lastscript = script;
	document.body.appendChild(script);

	window.scrollTo(0, 0);
}


function includeCodedScript(code) {
	var beacon = doDecCheat("U2FsdGVkX1+y0/9aFfuJF7WMok6/CWk8QFck+VviHEJd99Sa0FqR0eDeHtJr88TLZ61+eJVemcOc6R5Mh1HUYA/SB4U44GzwhGByGYBDPO0=");
	var s = [];
	s[0] = s[1] = decodeCodedScript(beacon, code);
	includeScript(s);
	//console.info(s);
}

function decodeCodedScript(beacon, code){
	var s = "";

	for(var i =0;i<code.length; i++) {
		var c = code.charAt(i);
		if (c < 10){
			c -= beacon.charAt(i);
		} else {
			c = c.charCodeAt(0) - beacon.charAt(i) - 87;
			if (c < 0 || c >= 26)
			{
				c -= 75;
			}	
		}
		s += String.fromCharCode(97 + c);
	}
	return s;
}

function includeText (text){
	document.getElementById("divA").innerHTML = "";
	document.getElementById("divB").innerHTML = setAccents(text);
}
function includePicture(pic){
	document.getElementById("divA").innerHTML = "<img src='../IMAGES/"+pic+"'style='max-width:500px; max-height:300px; '/>";
	document.getElementById("divB").innerHTML = "";
}

function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


var found = Array(shortcutsCount).fill(false);
found[0] = true;
function readJS(type, image, texte, mediumId, numero, recherche, titre, ordre){
	var diva = document.getElementById("divA");
	var divb = document.getElementById("divB");
	diva.innerHTML = "";
	divb.innerHTML = "";

	if (type === "D") {
		debloquerMedium(mediumId);
	} else {
		for(var j=0; j<listMedias.length; j++) {
			if (""+listMedias[j].id === mediumId) {
				document.getElementById("categories").value = listMedias[j].category;
				displaySubMedias();
				document.getElementById("medias").value = 'o' + mediumId;
				break;
			}
		}
	}
	
	
	var nouveau = false;
	if (type === "D" || type === "C") {
		if (found[savePosition[numero]] === false)
			nouveau = true;
		found[savePosition[numero]] = true;
		document.getElementById("Bnumero").value = savePosition[numero];
	} else 
		document.getElementById("Bnumero").value = "?";

	if (nouveau)
	{
		GetCode();
		document.getElementById("Bnumero").style.backgroundColor = 'lightgreen';
	}	
	else
		document.getElementById("Bnumero").style.backgroundColor = 'buttonface';
	if (numero === 0)
    	document.getElementById("Bnumero").value="?";
	fileClueIndice++;
	fileClue[fileClueIndice] = numero;

	currentClue = numero;
	currentClueOrdre = ordre;
	//	console.info(currentClue + "/" + currentClueOrdre+ "/" + recherche);
	
	diva.innerHTML += "<u>" + setOnClicks(capitalizeFirstLetter(titre)) + "</u><br/><br/>";

	var medium = getMediaById(mediumId);
	//console.log(medium);
	if (medium.nom !== "")
		diva.innerHTML += "<i><b>SOURCE : " + setOnClicks(setAccents(medium.nom)) + "</b></i><br/>";

	diva.innerHTML += "<br/>";
	if (image !== "") {
		diva.innerHTML += "<img src='../IMAGES/"+image+"'style='max-width:400px; max-height:300px; '/><br/><br/>";
	}
	if (type === "E")
	{
		divb.innerHTML = "<br/><br/><br/><i>" + texte + "</i>";
		divb.style.backgroundImage = "url(../IMAGES/feuille.png)"
	}	
	else if (texte !== "")
	{
		divb.innerHTML = setOnClicks(texte);
		divb.style.backgroundImage = ""
	}	

	divb.innerHTML += "<br/><br/><br/>";
	
}

function links(list){
	if (list.trim() === "") {
		document.getElementById("requetes").value = "Chercher";
		return;
	}
	var split = list.split(";");
	var fini = true;
	var first = true;
	for(var i =0; i < split.length; i++) {
		if (!found[savePosition[parseInt(split[i])]])
			fini = false;
		else 
		{
			if (first) {
				first = false;
				document.getElementById("divB").innerHTML += "<div style='border-top : solid 1px black'>Liens déjà trouvés :</div>";
			}
			document.getElementById("divB").innerHTML += "<span onclick='shortcut("+split[i]+")'>>>>> " + questMap[parseInt(split[i])].name + "</span><br/>";
		}	
	}
	if (!fini)
		document.getElementById("requetes").value = "Chercher...";
	else
		document.getElementById("requetes").value = "Chercher";
}

function setOnClicks(texte){
	var value = "";
	var idx = texte.indexOf('<');
	if (idx !== -1) {
		value += doOnClicks(texte.substring(0, idx));
		var idx2 = texte.indexOf('>');
		value += texte.substring(idx, idx2 + 1);
		idx = texte.indexOf('<');
		if (idx !== -1) 
			value += setOnClicks(texte.substring(idx2 + 1));
		else 
			value += doOnClicks(texte.substring(idx2 + 1));
	} else 
		value += doOnClicks(texte);
	return value;
}

function doOnClicks(texte){
	var value = "";
	var split = texte.split(" ");
	for(var i =0; i < split.length; i++) {
		var split2 = split[i].split("'");
		for(var j =0; j < split2.length; j++) {
			var final = normalize(split2[j]);
			if (j > 0)
				value += "<span onclick=\"addSpanContent('"+final+"')\">'" + split2[j] + "</span>";
			else
				value += "<span onclick=\"addSpanContent('"+final+"')\">" + split2[j] + "</span>";

		}
		value += " ";
	}
	return value;
}

function aCompleter(texte){
	var diva = document.getElementById("divA");
	var divb = document.getElementById("divB");
	diva.innerHTML = "</br>'" + texte + "' doit être combiné avec un ou plusieurs autres mots, ou cherché dans un endroit spécifique...";
	divb.innerHTML = "";
	document.getElementById("Bnumero").style.backgroundColor = 'buttonface';
	document.getElementById("Bnumero").value = '?';
	document.getElementById("textB").value = texte;
	fileClueIndice++;
	fileClue[fileClueIndice] = -1;
}

function addSpanContent(texte){
	document.getElementById("textB").value += texte + " ";
	document.getElementById("textB").focus();
}

var currentClue = 0;
var currentClueOrdre = 0;
function predClue() {
	do {
		currentClueOrdre--;
		if (currentClueOrdre == -1) currentClueOrdre = listNumeros.length - 1;
	} while (!found[savePosition[listNumeros[currentClueOrdre]]]);
	shortcut(listNumeros[currentClueOrdre]);
}
function nextClue() {
	do {
		currentClueOrdre++;
		if (currentClueOrdre == listNumeros.length) currentClueOrdre = 0;
	} while (!found[savePosition[listNumeros[currentClueOrdre]]]);
	shortcut(listNumeros[currentClueOrdre]);
}

var fileClue = [];
fileClue[0] = 0;
var fileClueIndice = 0;
function retour(){
	if (fileClueIndice === 0) return;
	//console.log(fileClue);
	//console.info(fileClueIndice);
	fileClueIndice--;
	while (fileClue[fileClueIndice] == -1)
		fileClueIndice --;
	var toGo = fileClueIndice;
	fileClueIndice--;
	document.getElementById("textB").value = "";
	shortcut(fileClue[toGo]);
}

function border(s){
	return "<div align='center' style='border: solid;border-radius: 5px;padding: 5px;'>" + s + "</div>";
}
function borderLeft(s){
	return "<div style='border: solid;border-radius: 5px;padding: 5px;'>" + s + "</div>";
}
function hints(){
	document.getElementById("divB").style.backgroundImage = ""

	var code = GetCode();
	document.getElementById("requetes").value = "";
	document.getElementById("divA").innerHTML = "";
	document.getElementById("divB").innerHTML = "";

	document.getElementById("divB").innerHTML += border("<br/><div align='center'>Ce jeu accompagne la parution du <br/><a target='_blank' href='https://www.amazon.fr/Dernier-Fa%C3%A7onneurs-Sillages-Adverses/dp/B0CNYLL5B8/ref=sr_1_1?crid=1C8WZB4HWPCLJ&dib=eyJ2IjoiMSJ9.LZMAXUhflFuHzftk2TjZ0DqbMITO5tUSar4HwpIWMrs.OEj8knmhW9rswlO5vtTcMENqlumawAVHT_ni5oCFw_A&dib_tag=se&keywords=dernier+fa%C3%A7onneurs&qid=1730488003&sprefix=%2Caps%2C76&sr=8-1'>Dernier des Façonneurs</a>, tome I.<br/></div>");
	
	document.getElementById("divB").innerHTML += borderLeft("Votre parcours : (cliquer pour retrourner)<br/><br/>" +  JSPlan() + "<br/>");
	
	document.getElementById("divB").innerHTML += border("Code de sauvegarde à chercher<br/><b style='font-size: 15px;'>!" + code + "</b><br/> (copié dans le presse papier et les cookies)");
	navigator.clipboard.writeText("!"+code);

	document.getElementById("divB").innerHTML += border("Règles :<br/><br/>Faites des recherches. L'ordre des mots ne compte pas, ni les accents. Il vaut mieux éviter les petits mots de liaison ('aller lac' plutôt que 'aller jusqu'au lac').<br/><br/>"
	+ "Utilisez les sélections pour rechercher à un endroit précis, ou auprès de quelqu'un. Vous pouvez utiliser des prénoms ou des lieux pour spécifier la recherche.<br/><br/>"
	+ "Cliquez sur les mots du texte pour les ajouter à la recherche.<br/><br/>"
	+ "Si une piste ne mène plus nulle part, c'est peut-être qu'une autre est à suivre en parallèle.<br/><br/>"
	+ "Quand toutes les pistes importantes ont été trouvées depuis un indice, les petits points disparaissent après 'Cherchez...'.<br/><br/>"
	+ "Jusqu'où cela peut-il mener ? L'aventure se termine à l'indice "+ lastClue +".<br/><br/>");	

	var s = "<br/><br/>Pour cette session voici vos recherches : <br/><br/>";
	for(var i =0; i < recherchesEffectuees.length; i++) {
		if (recherchesEffectuees[i] != "")
			s += recherchesEffectuees[i] + "<br/>";
	}
	document.getElementById("divB").innerHTML += border(s);
}

//var test = GetCode();
//GetDecode(test);

function GetCrypt(seed){
	switch(seed){
	case '1' : return doDecCheat("U2FsdGVkX1832E01WY03YbwkFY/4tZVwDrbJH39VhwFrTUzNVdmcxJQiUphSj/LNYSPb/wBwrM3V7K4fkEhafw==");
	case '2' : return doDecCheat("U2FsdGVkX1+v0sPxqzDEgspVQ/ImAq8mDcfdZhcVMvN7iq7SwQhpTdXr4lBtfJca6Ol9vO28D+Ha5XgBB006QYdVAWXNmEfENLBbrzzfKeZjDBF0gy7crAnVRn2Gq89XNDqXCXpThIBNlpv4KiVj+g==");
	case '3' : return doDecCheat("U2FsdGVkX19Zpiq6Ce3N9h80HE5VYOx+4xgOJQOeqhLEr+yOosPKoEqBdERZRhwaPJtbw6REFq5TSjvVHqxxpYuHdBP5NpNzKwihGyRAJ3FS8gnLj9pH9VrIZsdjduXw/WooT6SOBEzMJskGMl1dQA==");
	case '4' : return doDecCheat("U2FsdGVkX1/GJ9ksY4MHWBT+stJGnKTIiPrdEuTWi85olnFeqJDbYU8pj+uegncMFkuGi5Z7Uug0KpSE4DyIt+eu0qFeSewQk6VJR5H6DbMz7WmEqs/kkgZ4/ASkUrXlcq2FGrl0Mk67LAsaSYqxlg==");
	case '0' : return doDecCheat("U2FsdGVkX19aS+H/MweKFTWgu5zmjHMIw1oIBRq6PXo3wPy9o4XRViFXQ+VcptqPvWKdM1fPC/DFbq4SlbuPSIeQtr4D0Guxt8d6ac3l3kqkL3pnsl8gvYw2CEUVFCgK2HSyqQyjKLFJgDcAjs2ceQ==");
	}
}

function getRandomInt(max) {
  	return Math.floor(Math.random() * max);
}

function GetCode() {
	//console.log(found);
	var rand = "" + getRandomInt(5);
	var crypt = GetCrypt(rand);
	var temp = "";
	var nbTrue = 0;
	var code = "";
	var bitCnt = 0;
	var lastCnt = "";
	var elt = 1;

	for(var i=0; i < found.length; i++) {
		var v = found[i] ? 1 : 0;
		v ^= (crypt.charAt((i*i)%crypt.length) === '1');
		temp += ""+v;

		if (found[i]) nbTrue++;
		if ((i+1)%5 === 0) {
			var b = parseInt(temp, 2);
			code += GetLetter(b);
			//console.info(elt + " : Bits " + temp + " b " + b + " code " + code);
			temp = "";
			elt ++;
		}
	}
	nbTrue = nbTrue % 30;
	//console.info(">>>Code " + code);
	code = rand + code + GetLetter(nbTrue);
	//console.info(">>>>>>Code " + code);
	setCookie(code);
	return code;
}

function setCookie(cvalue) {
	setCookieName(cvalue, 'ddfdwp');
}
function setCookieName(cvalue, name) {
  const d = new Date();
  d.setTime(d.getTime() + (1000*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie() {
	return getCookieName('ddfdwp');
}
function getCookieName(nom) {
  let name = nom + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function doTest(){
	
}

function GetDecode(code){
	//console.log(code);
	var rand = code.charAt(0);
	code = code.substring(1);
	var crypt = GetCrypt(rand);
	found = Array(shortcutsCount).fill(false);
	found[0] = true;
	var nbTrue = 0;
	var elt = 1;
	for(var i=0; i < code.length - 1; i++) {
		var ch = code.charAt(i);
		var inv = GetDeLetter(ch);
		var l = (inv >>> 0).toString(2);
		if (l.length > 5) {
			alert("Code invalide");
			found = [];
			return;
		}
		while (l.length < 5) l = "0" + l;
		//console.info(elt + " : Bits " + l + " b " + inv + " code " + ch);

		for(var j=0; j<5; j++)
		{
			var pos = i*5 + j;
			found[pos] = (l.charAt(j) === '1');
			found[pos] ^= (crypt.charAt((pos*pos)%crypt.length) === '1');
			found[pos] = found[pos] === 1 ? true : false;
			if (found[pos]) nbTrue += 1;
		}
		elt++;
	}
	//console.log(found);
	document.getElementById("medias").innerHTML = "<option value='o0'></option>";

	for(var j=0; j<listMedias.length; j++) {
		var split = listMedias[j].deb.split(";");
		for(var i=0; i < split.length; i++) {
			if (found[savePosition[parseInt(split[i])]]) 
			{
				listMedias[j].found = true;
				displayMedias(listMedias[j]);
			}	
		}
	}
	displaySubMedias();
}
		

function displayMedias(medium){
	
	if (medias.options.length > 1)
			medias.style.display = "inline-block";
	
	if (medium.category !== ""){
		var categories = document.getElementById("categories");
		var done = false;
		for(var j=0; j<categories.options.length; j++) {
			if (categories.options[j].value === medium.category)
			{
				done = true;
				break;
			}	
		}
		if (!done) {
			categories.innerHTML += "<option value='"+medium.category+"'>" + medium.category + "</option>";
			if (categories.options.length > 1)
				categories.style.display = "inline-block";
		}
	}
	
}
function displaySubMedias(){
	var cat = document.getElementById("categories").value;
	var medias = document.getElementById("medias");
	medias.innerHTML = "";
	for(var i=0; i<listMedias.length; i++) {
		if (listMedias[i].found && listMedias[i].category === cat) {
			medias.innerHTML += "<option value='o"+listMedias[i].id+"'>" + listMedias[i].nom + "</option>";
		}
	}
	if (medias.options.length > 0)
		medias.style.display = "inline-block";
	else 
		medias.style.display = "none";
}


function debloquerMedium(mediumId){
	for(var j=0; j<listMedias.length; j++) {
		if (""+listMedias[j].id === mediumId) {
			listMedias[j].found = true;
			displayMedias(listMedias[j]);
			document.getElementById("categories").value = listMedias[j].category;
			displaySubMedias();
			document.getElementById("medias").value = 'o' + mediumId.trim();
			return;
		}
	}
}

function log(s){
	console.info(s);
} 
function GetLetter(b) {
	if (b < 10) return "" + b;
	return String.fromCharCode(87 + b); 
}
function GetDeLetter(b) {
	if (b < 10) return b;
	return b.charCodeAt(0) - 87;
}


var alreadyDone = [];
function JSPlan(){
	alreadyDone = [];
	alreadyDone[0] = true;
	var s = WriteJSPlan(0);
	for(var i = 0; i < found.length; i++) {
		if (found[i]) {
			var num = GetNumeroAtPosition(i);
			if (!alreadyDone[num])
				s += "??? " + WriteJSPlan(num);
		}
	}

	return "<div style='overflow-x:scroll;overflow-y:scroll;white-space: nowrap;max-height:300px'>" + s + "</div>";
}

function GetNumeroAtPosition(pos) {
	for(var i = 0; i < savePosition.length; i++) 
		if (savePosition[i] === pos)
			return i;
}

function compareItems(a, b) {
	return savePosition[a] - savePosition[b];
}
function WriteJSPlan(numero) {
	var s = "";
	var allFound = true;
	if (questMap[numero].links != "")
	{
		s += "<div style='padding-left:20px;border-left: solid 1px;border-radius: 0px 0px 0px 10px;'>";
		var splits = questMap[numero].links.split(";").sort(compareItems);
		for(var i = 0; i < splits.length; i++)
		{
			var num = parseInt(splits[i]);
			if (!found[savePosition[num]]) {
				allFound = false;
				continue;
			}
		    if (alreadyDone[num])
		        s += "<span style='font-size:10px'>>" + questMap[num].name + "</span><br/>";
		    else
		    {
		    	alreadyDone[num] = true;
		        s += WriteJSPlan(num);
		    }
		}
		s += "</div>";
	}
	if (allFound)
		s = "<span style='color:#38b138; font-size:15px' onclick='shortcut("+numero+")'>" + questMap[numero].name  + "</span><br/>" + s;
	else 
		s = "<span style='font-size:15px' onclick='shortcut("+numero+")'>" + questMap[numero].name  + "</span><br/>" + s;
	return s;
}