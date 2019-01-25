(function(global) {

    var ajaxUtils = {}; 

    var GetHttpRequest = function() {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest)
        } else {
            console.log("Oops! Ajax is not supported");
            return null;
        }
    }

    ajaxUtils.sendHttpRequest = function(hostUrl, responseHandler, isJason) {
        var request = GetHttpRequest();
        request.onreadystatechange = function() {
            handleRequest(request, responseHandler, isJason);
        }
        request.open('GET', hostUrl, 'true');
        request.send(null);
    };

    function handleRequest(request, responseHandler, isJason) {
        if ((request.readyState == 4) && (request.status == 200)) {
            if (isJason == 'undefined') {
                isJason = true;
            }

            if (isJason == true) {
                responseHandler(JSON.parse((request.responseText)));
            }
            else {
                responseHandler(request.responseText);
            }
        }
    }

    global.$ajaxUtils = ajaxUtils;

})(window);