/*function searchTwitter(query) {
    $.ajax({
        url: 'http://search.twitter.com/search.json?' + jQuery.param(query),
        dataType: 'jsonp',
        success: function(data) {
            var tweets = $('#tweets');
            tweets.html('');
            for (res in data['results']) {
               console.log(res);
        }
        }
    });
}

$(document).ready(function() {
	  var params = {
	       q: "blue angels",
	       rpp: 5
	  };
    searchTwitter(params);
});
*/

var AJAX = {
	request: function request(url){
		var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send();
   
        return xhr.responseText;
	}
}

function searchTwitter(query) {
	AJAX.request(query);
}