var endpoint = "https://www.jsonstore.io/7cfceed0821a48435866425e59fa3b4ef5ce35283f852e665ff86854ba2a7991";

function refresh(){
    setTimeout(function () {
        window.location.reload()
    }, 4000);
}

function showDiv(a){
    var b = "#"+a;
    $(b).fadeIn(1000); 
    $('#none').fadeOut(1000); 
}

function showMsq(id,msg){
    document.getElementById(id).innerHTML = msg;
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
        showDiv("alert");
        showMsq("alert","Use only http:// or https:// or ftp://");
        refresh();
        return false;
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
        //window.location.hash = rndm;
        return rndm;
    }
    return false;
}

function send_request(url,hashed) {
    $.ajax({
        'url': endpoint + "/" + hashed,
        'type': 'POST',
        'data': JSON.stringify(url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    var longurl = geturl();
    if (longurl != false){
        var h = genhash();
        if (h != false){
            send_request(longurl,h);
            showDiv("uri");
            var t = "Short Link : http://frie.me/in/#"+h
            showMsq("uri",t);
            //document.getElementById("uri").innerHTML = "Short Link : http://frie.me/in/#"+h;
        }
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
