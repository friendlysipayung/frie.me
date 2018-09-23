var endpoint = "https://www.jsonstore.io/7cfceed0821a48435866425e59fa3b4ef5ce35283f852e665ff86854ba2a7991";

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    $.getJSON(endpoint + "/" + text, function (data) {
        data = data["result"];
            
        if (data != null) {
            text = getrandom()
        }

    });
    return text;
    
}

function genhash(){
    if (window.location.hash == ""){
        var rndm = getrandom();
        window.location.hash = rndm;
        return rndm;
    }
}

function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    var longurl = geturl();
    var h = genhash();
    send_request(longurl);
    document.getElementById("uri").innerHTML = "Short Link : http://frie.me/in/"+h;
}

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }

    });
}
