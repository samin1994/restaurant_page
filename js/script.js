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
        target.innerHTML = html;
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
        , false);

    });

    var replaceProp = function(string, propName, propValue) {
        var replacedString = "{{" + propName + "}}" ;
        string = string
.replace(new RegExp(replacedString, "g"), propValue);
        return string;
    }

    var categoriesJsonUrl = "https://davids-restaurant.herokuapp.com/categories.json";
    var categoryTitleHtml = "https://samin1994.github.io/restaurant_page/snippets/categories-title-snippet.html";
    var allCategoriesHtml = "https://samin1994.github.io/restaurant_page/snippets/categories-snippet.html";

    dc.loadMenuCategories = function() {
        showLoad("#main-content");
        $ajaxUtils.sendHttpRequest(categoriesJsonUrl, loadCategories, true);

    };

    var loadCategories = function(categories) {
        $ajaxUtils.sendHttpRequest(categoryTitleHtml, 
        function(categoryTitle) {
            $ajaxUtils.sendHttpRequest(allCategoriesHtml, 
            function(allCategories) {
                var categoriesHtml = buildCategoriesView(categories, categoryTitle, allCategories);
                setHtml("#main-content", categoriesHtml);
            }, false);

        }
        , false);
    }

    var buildCategoriesView = function(categories, categoryTitle, allCategories) {

        var finalHtml = categoryTitle;
        finalHtml += '<div class="row" id="menu-categories">';

        for (var i = 0; i < categories.length ; i++) {
            var html = allCategories;
            var name = categories[i].name;
            var short_name = categories[i].short_name;
            
            html = replaceProp(html, "short_name", short_name);
            html = replaceProp(html, "name", name);
            finalHtml += html;
        }

        finalHtml += '</div>';

        return finalHtml;
    }

    global.$dc = dc;

})(window);