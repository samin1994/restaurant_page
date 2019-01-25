$(function() {
    $("#navbarToggle").blur(function(event) {
        screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            $("#collapsable-nav").collapse('hide');
        }

    });

    $("#navbarToggle").click(function(event) {
        $(event.target).focus();
    });

});

(function(global) {
    var homehtml = "https://samin1994.github.io/restaurant_page/snippets/home-snippet.html";
    var dc = {};

    var setHtml = function(selector, html) {
        var target = document.querySelector(selector);
        target.innerHtml(html);
    }

    var showLoad = function(selector) {
        html = '<div class="text-center">';
        html += '<img src="../images/specials-tile.jpg"></div>';
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        showLoad("#main-content");
        $ajaxUtils.sendHttpRequest(homehtml, function(responseText) {
            document.querySelector("#main-content").innerHTML = responseText;
        }
        );

    });

    global.dc = dc;

})(window);