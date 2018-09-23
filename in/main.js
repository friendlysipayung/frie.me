var endpoint = "https://www.jsonstore.io/7cfceed0821a48435866425e59fa3b4ef5ce35283f852e665ff86854ba2a7991";

function refresh() {

    setTimeout(function () {
        window.location.reload()
    }, 100);
}

function validate(url) {
    var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (pattern.test(url)) {
        return true;
    } 
    alert("Url is not valid!");
    return false;
 }

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    var url_ok = validate(url);
    if(!protocol_ok && url_ok){
        newurl = "http://"+url;
        return newurl;
    }else if (url_ok == true){
        return url;
    }else if (url_ok == false){
        document.getElementById("uri").innerHTML = "Use only http:// or https:// or ftp://";
        refresh();
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
    return false;
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
    if (h != false){
        send_request(longurl);
        document.getElementById("uri").innerHTML = "Short Link : http://frie.me/in/#"+h;
    }
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
