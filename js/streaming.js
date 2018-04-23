var checkTime;
var focused;
var bigTweetOn = false;
var bigApuestaOn = false 
var dates; 
var numTweets = 1; 
var numApuesta = 1;
var timeTweets = [];
var idPrices = 1;

//Initialize function
var init = function () {
	
    focused = 1; 
    //searchTwitter("https://api.twitter.com/oauth/authenticate?oauth_token=1143181927-uYkuYyzF4YlNZrqLy3yyq6O0y3k5QJbAJI8N7yg");
    dataLoad();
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });
 
    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	switch(e.keyCode){
    	case 37: //LEFT arrow
    		if (!bigApuestaOn){
    			if (!bigTweetOn){
    				focusApuestas();
    				focused = 1; 
    			}
    		}else{
    			if(idPrices > 0){
    				idPrices--;
    			}
    			
    			focusPrices(idPrices);
    		}
    		break;
    	case 38: //UP arrow
    		if (!bigTweetOn){
    			if (focused == 1){
    				moveApuestas(1);
    			}else{
    				moveTwitter(1);
    			}
    		}
    		break;
    	case 39: //RIGHT arrow
    		if (!bigApuestaOn){
    			if (!bigTweetOn){
    				focusTwitter();
    				focused = 2; 
    			}
    		}else{
    			if(idPrices < 4){
    				idPrices++;
    			}
    			
    			focusPrices(idPrices);
    			
    		}
    		break;
    	case 40: //DOWN arrow
			if (!bigTweetOn){
				if (focused == 1){
					moveApuestas(2);
				}else{
					moveTwitter(2);
				}
			}
    		break;
    	case 13: //OK button
			if (focused == 1){
				if (parseInt(document.getElementById('apuesta-'+parseInt(document.getElementById('apuestasStreaming').getAttribute("focused"))).getAttribute("bought")) == 0){
					idPrices = 1;
					focusPrices(idPrices);
					chargeApuestaBig(bigApuestaOn);
					if (!bigApuestaOn){
						doPurchase();
					}
				}
			}else{
				chargeTweetBig(bigTweetOn);
			}
 
    		break;
    	case 10009: //RETURN button
    		if (focused == 1){
    			if (bigApuestaOn){
    				chargeApuestaBig(bigApuestaOn);
    			}
    			else{
    				var url = "index.html"; 
    	  			$(location).attr('href',url);
    			}
    		}else{
    			if (bigTweetOn){
    				chargeTweetBig(bigTweetOn);
    			}
    			else{
    				var url = "index.html"; 
    	  			$(location).attr('href',url);
    			}
    		}
    	
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
    
    var a;
    var time = 0;
    var b = 0;
    for (a = 0; a<dates.partido.tweets.length; a++){ 
    	var thisTime =Math.floor((Math.random() * 3) + 1) * 1000;
    	time += thisTime;
    	setTimeout(function(){  //Beginning of code that should run AFTER the timeout
    		chargeTweet(dates.partido.tweets[parseInt(b)]);
    		numTweets = parseInt(parseInt(numTweets) + 1); 
    		b++;
    	}, time);  // put the timeout here
    }
    
    for (a = 0; a<dates.partido.apuestas.length; a++){
    	chargeApuesta(dates.partido.apuestas[parseInt(a)]);
    	numApuesta++;
    }
    focusApuestas();
};
// window.onload can work without <body onload="">
window.onload = init;

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

function focusPrices(id){
	switch (id){
		case 1:
			document.getElementById("apuesta-1euro").style.backgroundColor = "grey";
			document.getElementById("apuesta-5euro").style.backgroundColor = "white";
			document.getElementById("apuesta-10euro").style.backgroundColor = "white";
			document.getElementById("apuesta-20euro").style.backgroundColor = "white";
			break;
		case 2:
			document.getElementById("apuesta-1euro").style.backgroundColor = "white";
			document.getElementById("apuesta-5euro").style.backgroundColor = "grey";
			document.getElementById("apuesta-10euro").style.backgroundColor = "white";
			document.getElementById("apuesta-20euro").style.backgroundColor = "white";
			break;
		case 3:
			document.getElementById("apuesta-1euro").style.backgroundColor = "white";
			document.getElementById("apuesta-5euro").style.backgroundColor = "white";
			document.getElementById("apuesta-10euro").style.backgroundColor = "grey";
			document.getElementById("apuesta-20euro").style.backgroundColor = "white";
			break;
		case 4:
			document.getElementById("apuesta-1euro").style.backgroundColor = "white";
			document.getElementById("apuesta-5euro").style.backgroundColor = "white";
			document.getElementById("apuesta-10euro").style.backgroundColor = "white";
			document.getElementById("apuesta-20euro").style.backgroundColor = "grey";
			break;
	}
}

function focusApuestas(){
	
	var idFocused = document.getElementById('apuestasStreaming').getAttribute("focused");
	if (idFocused != 0){
		if(document.getElementById("apuesta-"+idFocused) != "undefined"){
			document.getElementById("apuesta-"+idFocused).style.cssText = "border: 3px solid blue !important";
		}
	}
	
	idFocused = document.getElementById('tweetsStreaming').getAttribute("focused");
	if (idFocused != 0){
		if(document.getElementById("apuesta-"+idFocused) != "undefined"){
		 document.getElementById("tweet-"+idFocused).style.cssText = "border:";
		}
	}
}

function focusTwitter(){
	var idFocused = document.getElementById('apuestasStreaming').getAttribute("focused");
	document.getElementById("apuesta-"+idFocused).style.cssText = "border: 3px solid white !important";
	
	idFocused = document.getElementById('tweetsStreaming').getAttribute("focused");
	document.getElementById("tweet-"+idFocused).style.cssText = "border: 3px solid blue !important";
}

function moveApuestas(direcction){
	var idFocused = document.getElementById('apuestasStreaming').getAttribute("focused");
	if (direcction == 1){
		if (parseInt(idFocused) != 1){
			document.getElementById('apuestasStreaming').setAttribute("focused", parseInt(idFocused)-1);
			document.getElementById("apuesta-"+parseInt(idFocused)).style.cssText = "border: 3px solid white !important";
			document.getElementById("apuesta-"+(parseInt(idFocused)-1)).style.cssText = "border: 3px solid blue !important";
		}
	}
	else{
		
		if(parseInt(idFocused) != 1){
			document.getElementById("apuesta-"+(parseInt(idFocused)-1)).style.cssText = "display:none;";
			if ((parseInt(idFocused)+2) <= parseInt(fmax)){
				document.getElementById("apuesta-"+(parseInt(idFocused)+2)).style.cssText = "display:block;";
			}
		}
		
		var fmax = document.getElementById('apuestasStreaming').getAttribute("focused-max");
		if (parseInt(idFocused) != parseInt(fmax)){
			document.getElementById('apuestasStreaming').setAttribute("focused", (parseInt(idFocused)+1));
			document.getElementById("apuesta-"+parseInt(idFocused)).style.cssText = "border: 3px solid white !important";
			document.getElementById("apuesta-"+(parseInt(idFocused)+1)).style.cssText = "border: 3px solid blue !important";
		}
	}
}

function doPurchase(){
	var idFocused = document.getElementById('apuestasStreaming').getAttribute("focused");
	document.getElementById("apuesta-"+idFocused).setAttribute("bought", 1);
	
	var p = document.getElementById('apuesta-'+parseInt(idFocused));
    p.removeChild(p.childNodes[0]);
    p.removeChild(p.childNodes[0]);
    
    var b = document.createElement('b');
    b.className = "apostado";
    b.innerHTML = "APOSTADO";
    document.getElementById('apuesta-'+parseInt(idFocused)).appendChild(b);
}

function moveTwitter(direcction){
	var idFocused = document.getElementById('tweetsStreaming').getAttribute("focused");
	if (direcction == 1){
		if (parseInt(idFocused) != 1){
			document.getElementById('tweetsStreaming').setAttribute("focused", parseInt(idFocused)-1);
			document.getElementById("tweet-"+parseInt(idFocused)).style.cssText = "border: 3px solid white !important";
			document.getElementById("tweet-"+(parseInt(idFocused)-1)).style.cssText = "border: 3px solid blue !important";
		}
	}
	else{
		/*
		if(parseInt(idFocused) != 1){
			document.getElementById("tweet-"+(parseInt(idFocused)-1)).style.cssText = "display:none;";
			if ((parseInt(idFocused)+2) <= parseInt(fmax)){
				document.getElementById("tweet-"+(parseInt(idFocused)+2)).style.cssText = "display:block;";
			}
		}
		*/
		var fmax = document.getElementById('tweetsStreaming').getAttribute("focused-max");
		if (parseInt(idFocused) != parseInt(fmax)){
			document.getElementById('tweetsStreaming').setAttribute("focused", (parseInt(idFocused)+1));
			document.getElementById("tweet-"+parseInt(idFocused)).style.cssText = "border: 3px solid white !important";
			document.getElementById("tweet-"+(parseInt(idFocused)+1)).style.cssText = "border: 3px solid blue !important";
		}
	}
}

function chargeTweetBig(isCharge){
	if(isCharge){
		document.getElementById('big-tweet').style.display = "none";
		bigTweetOn = false;
	}else{
		var idFocused = document.getElementById('tweetsStreaming').getAttribute("focused");
		document.getElementById('fullname-big').innerHTML = dates.partido.tweets[parseInt(idFocused)-1].name;
		document.getElementById('UserName-twitter-big').innerHTML= dates.partido.tweets[parseInt(idFocused)-1].tagName;
		document.getElementById('time-big').innerHTML= timeTweets[parseInt(idFocused)-1];
		
		var content = dates.partido.tweets[parseInt(idFocused)-1].content;
		var i;
		var text = ""; 
		for (i=0; i<content.length; i++){
			if (content[i].text[0].localeCompare("#") == 0){
				if (i>0){
					text = text + "<font color='blue'>"+" "+content[i].text+"</font>"
				}
				else{
					text = text + "<font color='blue'>"+content[i].text+"</font>"
				}
				
			}else{
				if (i>0){
					text = text +" "+ content[i].text;
				}
				else{
					text = text + content[i].text;
				}
			}
		}
		
		document.getElementById('tweet-content-big').innerHTML= text;
		var tweet = document.getElementById("tweet-"+parseInt(idFocused));
		//document.getElementById('fullname-big').innerHTML = 
		document.getElementById('big-tweet').style.display = "block";
		bigTweetOn = true; 
	}
}

function chargeApuestaBig(isCharge){
	if(isCharge){
		document.getElementById('big-Apuesta').style.display = "none";
		bigApuestaOn = false;
	}else{
		var idFocused = document.getElementById('apuestasStreaming').getAttribute("focused");
		document.getElementById('apuesta-ratio-text').innerHTML = dates.partido.apuestas[parseInt(idFocused)-1].ratio;
		if(parseInt(dates.partido.apuestas[parseInt(idFocused)-1].tipo) == 1){
			document.getElementById('apuesta-concept-text').innerHTML= dates.partido.apuestas[parseInt(idFocused)-1].equipo1 +"  " 
						+ dates.partido.apuestas[parseInt(idFocused)-1].marcador  +"  " + dates.partido.apuestas[parseInt(idFocused)-1].equipo2;
		}else{
			document.getElementById('apuesta-concept-text').innerHTML= dates.partido.apuestas[parseInt(idFocused)-1].concepto + " - " + dates.partido.apuestas[parseInt(idFocused)-1].requisito;
		}

		document.getElementById('big-Apuesta').style.display = "block";
		bigApuestaOn = true; 
	}
}

function dataLoad(){
	var url = localStorage.getItem("url");
	loadAllJSON (url);
}

function loadAllJSON(url)
{
  var xmlhttp = new XMLHttpRequest();
  var respose = null; 
  
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    	didResponse(xmlhttp.responseText);
    }
  };

  xmlhttp.overrideMimeType("application/json");
  xmlhttp.open("GET", url, false);

  xmlhttp.send(null);

}

function didResponse(response){
  var jsonArray = JSON.parse(response);
  
  document.getElementById('hashtag').innerHTML = jsonArray.partido.hastag;
  document.getElementById('nameStreaming').innerHTML = jsonArray.partido.nombrePartido;
  document.getElementById('videoSource').src = jsonArray.partido.url;
  document.getElementById('videoPartido').load();
  document.getElementById('videoPartido').play();
  dates = jsonArray;
}


function chargeApuesta(apuestaObj){
	var apuesta = createContainer('div', "apuestaContainer container-fluid");
	apuesta.id ="apuesta-"+numApuesta;
	
	var bigDiv = createContainer('div', "row");
	var div1 = createContainer('div', "col-9 row");
	var div11 = createContainer('div', "row");
	var img = createContainer('img', "apuestasWeb");
	img.src = apuestaObj.img;
	div11.appendChild(img);
	
	var div2 = createContainer('div', "col-3 row");
	var div21 = createContainer('div', "col centerTextApuesta");
	img = createContainer('img', "apostarImg");
	img.src = apuestaObj.img;
	div21.appendChild(img);
	
	div1.appendChild(div11);
	div2.appendChild(div21);
	
	bigDiv.appendChild(div1);
	bigDiv.appendChild(div2);
	
	apuesta.appendChild(bigDiv);
	
	
	bigDiv = createContainer('div', "row");
	div1 = createContainer('div', "col-4 row");
	div11 = createContainer('div', "apuesta-ratio col-4");
	var p = createContainer('p', "apuestas-text");
	p.innerHTML = apuestaObj.ratio;
	
	div11.appendChild(p);
	div1.appendChild(div11);
	bigDiv.appendChild(div1);
	
	
	if(parseInt(apuestaObj.tipo) == 1){
		div2 = createContainer('div', "col row");
		div21 = createContainer('div', "col-3");
		p = createContainer('p', "apuestas-text");
		p.innerHTML = apuestaObj.equipo1;
		div21.appendChild(p);
		
		var div22 = createContainer('div', "col-2");
		p = createContainer('p', "apuestas-text");
		p.innerHTML = apuestaObj.marcador;
		div22.appendChild(p);
		
		var div23 = createContainer('div', "col-3");
		p = createContainer('p', "apuestas-text");
		p.innerHTML = apuestaObj.equipo2;
		div23.appendChild(p);
		
		div2.appendChild(div21);
		div2.appendChild(div22);
		div2.appendChild(div23);
		
	}else{
		div2 = createContainer('div', "col row");
		div21 = createContainer('div', "col-3");
		p = createContainer('p', "apuestas-text");
		p.innerHTML = apuestaObj.concepto;
		div21.appendChild(p);
		
		var div22 = createContainer('div', "col-9");
		p = createContainer('p', "apuestas-text");
		p.innerHTML = apuestaObj.requisito;
		div22.appendChild(p);
		
		div2.appendChild(div21);
		div2.appendChild(div22);
	}
	
	bigDiv.appendChild(div2);
	apuesta.appendChild(bigDiv);
	
	var container = document.getElementById('apuestasStreaming');
	document.getElementById('apuestasStreaming').setAttribute("focused", 1);
	document.getElementById('apuestasStreaming').setAttribute("focused-max", parseInt(document.getElementById('apuestasStreaming').getAttribute("focused-max"))+1);
	container.appendChild(apuesta);
	document.getElementById("apuesta-"+numApuesta).setAttribute("bought", 0);
}

function chargeTweet(tweetObj){
	var tweet = createContainer('div', "content row tweet");
	tweet.id = "tweet-"+numTweets;
	var a = createContainer('a', "col-md-9 row User-header");
	
	var span1 = createContainer('span', "col-md-6 fullName-twitter s-font");
	var strong = createContainer('strong', "fullname")
	strong.innerHTML = tweetObj.name;
	
	span1.appendChild(strong);
	
	var span2 = createContainer('span', "col-md-4 UserName-twitter s-font");
	span2.innerHTML = '@';
	var b = document.createElement('b');
	b.innerHTML = tweetObj.tagName;
	
	span2.appendChild(b);
	
	var small = createContainer('small', "time col-md-2");
	var span = createContainer('span', "relative-time s-font");
	var date = new Date();
	var minutes = date.getMinutes();
	if(parseInt(minutes)<10){
		minutes = "0"+minutes;
	}
	span.innerHTML = date.getHours()+':'+minutes;
	timeTweets.push (date.getHours()+':'+minutes);
	
	small.appendChild(span);
	
	var span3 = createContainer('span', "tweet-content col-md-12");
	var b = document.createElement('b');
	var content = tweetObj.content;
	var i;
	var text = ""; 
	for (i=0; i<content.length; i++){
		if (content[i].text[0].localeCompare("#") == 0){
			if (i>0){
				text = text + "<font color='blue'>"+" "+content[i].text+"</font>"
			}
			else{
				text = text + "<font color='blue'>"+content[i].text+"</font>"
			}
			
		}else{
			if (i>0){
				text = text +" "+ content[i].text;
			}
			else{
				text = text + content[i].text;
			}
		}
	}
	b.innerHTML = text;
	
	span3.appendChild(b);
	
	a.appendChild(span1);
	a.appendChild(span2);
	a.appendChild(small);
	a.appendChild(span3);
	tweet.appendChild(a)
	
	var container = document.getElementById('tweetsStreaming');
	container.appendChild(tweet);
	
	var max = document.getElementById('tweetsStreaming').getAttribute("focused-max");
	var min = document.getElementById('tweetsStreaming').getAttribute("focused-min");
	
	
	var idFocused = document.getElementById('tweetsStreaming').getAttribute("focused");
	if ((parseInt(max) - parseInt(min)) >= 8){
		if(parseInt(idFocused) == parseInt(min)){
			document.getElementById('tweetsStreaming').setAttribute("focused", parseInt(min)+1);
		}
		
		var node = document.getElementById("tweet-"+parseInt(min)); 
		node.parentNode.removeChild(node)
		document.getElementById('tweetsStreaming').setAttribute("focused-min", parseInt(min)+1);
		
	}
	
	document.getElementById('tweetsStreaming').setAttribute("focused-max", parseInt(max)+1);
	
	if (parseInt(idFocused) == 0){
		document.getElementById('tweetsStreaming').setAttribute("focused", 1);
		document.getElementById('tweetsStreaming').setAttribute("focused-min", 1);
	}
	
}

function createContainer(type, classContainer){
	var container = document.createElement(type);
	container.className = classContainer;
	return container;
}

