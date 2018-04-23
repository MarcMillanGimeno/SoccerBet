var checkTime;

window.onload = function () {
	
    // add eventListener for tizenhwkey
    document.addEventListener('keydown', function(e) {
    	
    	switch(e.keyCode){
    	case 37: //LEFT
    		
    		//If de focus is in the "carusel" these will move (left)
    		if (document.getElementById("carruselPartidos")) {
		  		if (document.getElementById("carruselPartidos").className == "focused"){
		  			$('.slick-slider').slick('slickPrev');
		  		}
    		}
    		
    		break;
    	case 38: //UP
    		
    		break;
    		
    	case 39: //RIGHT
    		//If de focus is in the "carusel" these will move (right)
    		if (document.getElementById("carruselPartidos")) {
	    		if (document.getElementById("carruselPartidos").className == "focused"){
			  		$('.slick-slider').slick('slickNext');
			  	}
    		}
    		break;
    		
    	case 40: //DOWN
    		
    		break;
    		
    	case 13: //OK
    		break;
    		
    	case 10009: //RETURN
    		tizen.application.getCurrentApplication().exit();
    		break;
    		
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    		
    	}
    });

}

$(document).ready(function() {
	this.current
	
	//It's important refresh the controller for the new created items
	refreshController();
	
	//Standard function from Tizen..
	function startTime() {
	    var today = new Date();
	    var h = today.getHours();
	    var m = today.getMinutes();
	    var s = today.getSeconds();
	    m = checkTime(m);
	    s = checkTime(s);
	    document.getElementById('divbutton1').innerHTML='Current time: ' + h + ':' + m + ':' + s;
	    setTimeout(startTime, 10);
	}
	function checkTime(i) {
	    if (i < 10) {
	        i='0' + i;
	    }
	    return i;
	}
});

//Important function that controls all the user movments
function refreshController(){
	
	//Caph let us focus some specific items
	$.caph.focus.activate(function(nearestFocusableFinderProvider, controllerProvider) {
  		
		//Predeterminated controller, that change css if the items are focused
		controllerProvider.onFocused(function(event, originalEvent) {
  			$(event.currentTarget).css({
  				borderBottom: '4px solid white'

  			});
  		});
		
		//Remove de css if the item isn't longer focused
  		controllerProvider.onBlurred(function(event, originalEvent) {
  			$(event.currentTarget).css({
  				border: 'none',
  				backgroundColor: 'none'
  			});
  		});
  	
  		//MAIN SECTION !!
  		//Controller for the "logoInicio" item is focused
		$('#logoInicio').on('focused', function(){
	  		$(event.currentTarget).css({
	  			//borderBottom: '40px solid white'
	  			
	  		});
	  	
	  	//And actions that the controller do if the item focused is selected
	  	}).on('selected', function(){
	  		
	  		//If exist the classificatory table, remove it
	  		if(document.getElementById('tableLeague')){
  				$( "#tableLeague" ).remove();
  				$( "#titleLeague" ).remove();
  			}

	  		//If exist the "choose league" section, remove it
	  		if(document.getElementById('titleChooseLeague')){
	  			removeChooseLeague();
  			}
	  		
	  		//If doesn't exist initial section, create it
	  		if(!document.getElementById('fotosInfo')){

	  			var body = document.getElementsByTagName('body')[0];
	  			
	  			//Append in the body item is for recuparete all the before initial section, previously saved.
	  			dvjQuery.appendTo( "body" );
	  			//Change the background section.
	  			color = "rgb(27, 36, 56)";
	  			body.style.background = color;
	  			
	  		}
	  		
	  	});
		
		//CHOOSE LEAGUES SECTION !!
		$('#irLigas').on('focused', function(){
			$(event.currentTarget).css({
	  		
	  		});
	  	}).on('selected', function(){
	  		
	  		//If exist the initial section, remove it, but save it
	  		if(document.getElementById('fotosInfo')){
		  		dvjQuery = $("#generalSection").detach();
	  		}
	  		//If exist the "choose league" section, remove it
	  		if(document.getElementById('titleChooseLeague')){
	  			removeChooseLeague();
	  		}
	  		//If exist the "table league" section, remove it
	  		if(document.getElementById('tableLeague')){
	  			$( "#tableLeague" ).remove();
  				$( "#titleLeague" ).remove();
	  		}
	  		//Create choose league section
	  		createChooseLeague();

	  	});
		
		////VIEW TOP BETS SECTION !!
		$('#verTop').on('focused', function(){
			$(event.currentTarget).css({
	  			borderBottom: '4px solid white'
	  		});
	  	}).on('selected', function(){

	  	});
		
		//If one of the diferents main icons of leagues are selected
		$('#idlaliga').on('focused', function(){
			$(event.currentTarget).css({

		  		backgroundColor: 'cyan'
	  		});

	  	}).on('selected', function(){
	  		var idS = 1;
	  		//Create classificatory section
	  		createTableLeague(idS);
	  	});
		$('#idligue1').on('focused', function(){

	  	}).on('selected', function(){
	  		var idS = 2;
	  		//Create classificatory section
	  		createTableLeague(idS);
	  	});
		$('#idEredivisie').on('focused', function(){

	  	}).on('selected', function(){
	  		var idS = 3;
	  		//Create classificatory section
	  		createTableLeague(idS);
	  	});
		$('#idpremiere').on('focused', function(){

	  	}).on('selected', function(){
	  		var idS = 4;
	  		//Create classificatory section
	  		createTableLeague(idS);
	  	});
		$('#idserieA').on('focused', function(){

	  	}).on('selected', function(){
	  		var idS = 5;
	  		//Create classificatory section
	  		createTableLeague(idS);
	  	});
		$('#idbundesliga').on('focused', function(){

	  	}).on('selected', function(){
	  		var idS = 6;
	  		//Create classificatory section
	  		createTableLeague(idS);
	  	});
		
		
		//TO REPRODUCE CARRUSEL MATCHES
		$('#carruselPartidos').on('focused', function(){
	  		$(event.currentTarget).css({
	  			
	  		});
	  		
	  	}).on('selected', function(){
	  		var selected = $('.slick-center').attr('id');
	  		if((selected.localeCompare("slick-slide01") == 0) || selected.localeCompare("slick-slide04") == 0){
	  			var url = "streaming.html"; 
	  			localStorage.setItem("url", "https://redbutton-app.000webhostapp.com/SoccerBet/Partido1");
	  			$(location).attr('href',url);
	  			
	  		}
	  		if((selected.localeCompare("slick-slide00") == 0) || selected.localeCompare("slick-slide03") == 0){
	  			var url = "streaming.html"; 
	  			localStorage.setItem("url", "https://redbutton-app.000webhostapp.com/SoccerBet/Partido2");
	  			$(location).attr('href',url);
	  		}
	  		
	  		if(selected === undefined){
	  			var url = "streaming.html"; 
	  			localStorage.setItem("url", "https://redbutton-app.000webhostapp.com/SoccerBet/Partido3");
	  			$(location).attr('href',url);
	  		}else{
	  			if(selected.localeCompare("slick-slide02") == 0){
	  				var url = "streaming.html"; 
		  			localStorage.setItem("url", "https://redbutton-app.000webhostapp.com/SoccerBet/Partido3");
		  			$(location).attr('href',url);
	  			}
	  		}
	  	});

  	});
}
//To show when is the focus
function getCurrentFocusItem() {
	console.log($.caph.focus.controllerProvider.getInstance().getCurrentFocusItem());
 	return $.caph.focus.controllerProvider.getInstance().getCurrentFocusItem();
 }

//Function that creates the choose league section
function createChooseLeague(){
	var body = document.getElementsByTagName('body')[0];

	$(document).ready(function() {
        $('body').css('background-image', 'url(images/fondoTablasLigas.jpg)');
    });

	//Change the title
	var h1 = document.createElement('h1');
	h1.id = "titleChooseLeague";
    var text = document.createTextNode("Selecciona la liga");
    h1.appendChild(text);
    document.body.appendChild(h1);
    
    var h2 = document.createElement('h2');
	h2.id = "subtitleChooseLeague";
    var text1 = document.createTextNode("Enterate de las clasificaciones de las mejores ligas del mundo");
    h2.appendChild(text1);
    document.body.appendChild(h2);

    var divRow1 = document.createElement('div');
    divRow1.id = "divRow1";

	$(document.body).append($.caph.focus.$$toAvailable($('<div id="idlaliga" class="divIconsLeagues col-md-4" focusable data-focusable-next-focus-left="null" ><img class="imageLeague" id="IconsLaLeague" src="images/imageLeagues/laliga.png"/></div>')));
	$(document.body).append($.caph.focus.$$toAvailable($('<div id="idligue1" class="divIconsLeagues col-md-4" focusable><img class="imageLeague" src="images/imageLeagues/FrancesaLigue.png"/></div>')));
	$(document.body).append($.caph.focus.$$toAvailable($('<div id="idEredivisie" class="divIconsLeagues col-md-4" focusable><img class="imageLeague" id="IconsEredivisie" src="images/imageLeagues/Eredivisie_Logo.png"/></div>')));
	$(document.body).append($.caph.focus.$$toAvailable($('<div id="idpremiere" class="divIconsLeagues col-md-4" focusable data-focusable-next-focus-left="null" ><img class="imageLeague" id="IconsLaLeague" src="images/imageLeagues/premiereLeague.png"/></div>')));
	$(document.body).append($.caph.focus.$$toAvailable($('<div id="idserieA" class="divIconsLeagues col-md-4" focusable><img class="imageLeague" id="IconsSA" src="images/imageLeagues/SerieA.png"/></div>')));
	$(document.body).append($.caph.focus.$$toAvailable($('<div id="idbundesliga" class="divIconsLeagues col-md-4" focusable><img class="imageLeague" id="IconsBundesliga" src="images/imageLeagues/Bundesliga.png"/></div>')));
	
	refreshController();
	
}

//Function that creates the table league section
function createTableLeague(idSelected){
	
	var urlAjax = "";
	switch(idSelected){
		case 1:
			
			//Primera Division : 436
			urlAjax = 'http://api.football-data.org/v1/competitions/436/leagueTable';
		break;
		case 2:
			//Francesa Ligue 1 : 434
			urlAjax = 'http://api.football-data.org/v1/competitions/434/leagueTable';
		break;
		case 3:
			//La Eredivisie, también conocida como División de Honor de los Países Bajos : 433
			urlAjax = 'http://api.football-data.org/v1/competitions/433/leagueTable';
		break;
		case 4:
			//PremierLeage : 426
			urlAjax = 'http://api.football-data.org/v1/competitions/426/leagueTable';
			
		break;
		case 5:
			//Serie A : 438
			urlAjax = 'http://api.football-data.org/v1/competitions/438/leagueTable';
		break;
		case 6:
			//Bundesliga : 430
			urlAjax = 'http://api.football-data.org/v1/competitions/430/leagueTable';
		break;	
	}

	if(!document.getElementById('tableLeague')){
  		$.ajax({
  			url: urlAjax,
  			headers: { 'X-Auth-Token': '5e265dc4803d403b9e9b79d08ef62bab' },
	  		//Bundesliga 2 : 431
	  		//Liga Adelante : 437
	  		dataType: 'json',
	  		type: 'GET',
	  	}).done(function(response) {
	  		
	  		//If there are response, create the classification table
	  		if(response.leagueCaption){
	  			
	  			removeChooseLeague();
	  							
				var nameLeague = response.leagueCaption;
				var body = document.getElementsByTagName('body')[0];
				
				//Change the title
				var h1 = document.createElement('h1');
				h1.id = "titleLeague";
			    var t = document.createTextNode(response['leagueCaption']);
			    h1.appendChild(t);
			    document.body.appendChild(h1);
				
				var tbl = document.createElement('table');
				//Add clases to good bootstrap work
				tbl.className = "table table-striped table-bordered";
				tbl.id = "tableLeague";
				tbl.style.width = '80%';
				tbl.setAttribute('border', '1');
				
				var thead = document.createElement('thead');
				var tr = document.createElement('tr');
				
				var th1 = document.createElement('th');
				th1.innerHTML = "Position";
				
				tr.appendChild(th1);
				var th2 = document.createElement('th');
				th2.innerHTML = "Team";
				th2.id = "cellTeam";
				tr.appendChild(th2);
				var th3 = document.createElement('th');
				th3.innerHTML = "PJ";
				tr.appendChild(th3);
				var th4 = document.createElement('th');
				th4.innerHTML = "V";
				tr.appendChild(th4);
				var th5 = document.createElement('th');
				th5.innerHTML = "E";
				tr.appendChild(th5);
				var th6 = document.createElement('th');
				th6.innerHTML = "D";
				tr.appendChild(th6);
				var th7 = document.createElement('th');
				th7.innerHTML = "GF";
				tr.appendChild(th7);
				var th8 = document.createElement('th');
				th8.innerHTML = "GC";
				tr.appendChild(th8);
				var th9 = document.createElement('th');
				th9.innerHTML = "Pts";
				tr.appendChild(th9);
				thead.appendChild(tr);
				tbl.appendChild(thead);
				var tbdy = document.createElement('tbody');    
				
				for (var i in response['standing']) {
				
					var tr = document.createElement('tr');
						
					var td2 = document.createElement('td');
					var position = response['standing'][i]['position'];
					td2.appendChild(document.createTextNode(position));
				    tr.appendChild(td2);
				    
				    var td3 = document.createElement('td');
				    var nameTeam = response['standing'][i]['teamName'];
				    var img = document.createElement('img');
					urlImage = response['standing'][i]['crestURI'];
				    img.src = urlImage;
				    td3.appendChild(img);
				    td3.appendChild(document.createTextNode(nameTeam));
				    tr.appendChild(td3);
				    
				    var td4 = document.createElement('td');
				    var cellPJ = response['standing'][i]['playedGames'];
				    td4.appendChild(document.createTextNode(cellPJ));
				    tr.appendChild(td4);
				    
				    var td5 = document.createElement('td');
				    var cellwins = response['standing'][i]['wins'];
				    td5.appendChild(document.createTextNode(cellwins));
				    tr.appendChild(td5);
				    
				    var td6 = document.createElement('td');
				    var cellE = response['standing'][i]['draw'];
				    td6.appendChild(document.createTextNode(cellwins));
				    tr.appendChild(td6);
				    
				    var td7 = document.createElement('td');
				    var cellLoses = response['standing'][i]['losses'];
				    td7.appendChild(document.createTextNode(cellLoses));
				    tr.appendChild(td7);
				    
				    var td8 = document.createElement('td');
				    var cellGoals = response['standing'][i]['goals'];
				    td8.appendChild(document.createTextNode(cellGoals));
				    tr.appendChild(td8);
				    
				    var td9 = document.createElement('td');
				    var cellGoalsAgainst = response['standing'][i]['goalsAgainst'];
				    td9.appendChild(document.createTextNode(cellGoalsAgainst));
				    tr.appendChild(td9);
				    
				    var td10 = document.createElement('td');
				    var cellPoints = response['standing'][i]['points'];
				    td10.appendChild(document.createTextNode(cellPoints));
				    tr.appendChild(td10);
				    
				    tbdy.appendChild(tr);
				}
				tbl.appendChild(tbdy);
				body.appendChild(tbl);
	  		}
        });
	}
}
function removeChooseLeague(){
	document.getElementById("titleChooseLeague").remove();
	document.getElementById("subtitleChooseLeague").remove();
	document.getElementById("idlaliga").remove();
	document.getElementById("idligue1").remove();
	document.getElementById("idEredivisie").remove();
	document.getElementById("idpremiere").remove();
	document.getElementById("idserieA").remove();
	document.getElementById("idbundesliga").remove();
}