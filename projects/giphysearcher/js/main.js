/* 1. Grab the input value */

var input;
var container = document.querySelector(".js-container");

function clearcontent() {
    document.getElementById("containerForImages").innerHTML = "";
}

function getInputValue(){
    clearcontent()
    var input = document.getElementById("gifSearchInput").value;
    var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=oBjNJhaqRzrcG3oJHmtrN2tt9emR3Fy5&q="+input+"&limit=25&offset=0&rating=g&lang=en"
    var GiphyXMLCall = new XMLHttpRequest();
    GiphyXMLCall.open("GET", giphyURL);
    GiphyXMLCall.send();

    GiphyXMLCall.addEventListener("load", function (e){
        var data = e.target.response;
        pushToDOM(data);
    });
}

document.querySelector(".js-userinput").addEventListener("keyup",function (e){
    clearcontent()
    var input = document.getElementById("gifSearchInput").value;

    /*e is out invisible function that contains the key data.
    * we check for this and see if the key is === to enter, only then do we push to DOM*/
    if (e.which === 13){
        var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=oBjNJhaqRzrcG3oJHmtrN2tt9emR3Fy5&q="+input+"&limit=25&offset=0&rating=g&lang=en"
        var GiphyXMLCall = new XMLHttpRequest();
        GiphyXMLCall.open("GET", giphyURL);
        GiphyXMLCall.send();

        GiphyXMLCall.addEventListener("load", function (e){
            var data = e.target.response;
            pushToDOM(data);
        });
    }


});

/* 2. Show the GIFs */
function pushToDOM(input){
    var response = JSON.parse(input);
    var imageURLs = response.data;

    imageURLs.forEach(function (image){
        var src = image.images.fixed_height.url;
        container.innerHTML = container.innerHTML+ "<img src=\"" + src + "\">";
    });



}

