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
        html += '<img src="../images/ajax-loader.gif"></div>';
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        showLoad("#main-content");
        $ajaxUtils.sendHttpRequest(homehtml, function(responseText) {
            document.querySelector("#main-content").innerHTML = responseText;
        }
        , false);

    });

    var replaceProp = function(string, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        string = string
          .replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    var categoriesJsonUrl = "https://davids-restaurant.herokuapp.com/categories.json";
    var categoryTitleHtml = "https://samin1994.github.io/restaurant_page/snippets/categories-title-snippet.html";
    var allCategoriesHtml = "https://samin1994.github.io/restaurant_page/snippets/categories-snippet.html";

    var menuItemsJsonUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
    var menuItemsTitle = "https://samin1994.github.io/restaurant_page/snippets/menu-items-title-snippet.html";
    var menuItems = "https://samin1994.github.io/restaurant_page/snippets/menu-items-snippet.html";

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

    //loading menu items page 
    dc.loadMenuItems = function(menuName) {
        showLoad("#main-content");
        $ajaxUtils.sendHttpRequest(
            (menuItemsJsonUrl + menuName),
                MakeMenuItemsView, true);
    };

    var MakeMenuItemsView = function(menuItemsJson) {
        $ajaxUtils.sendHttpRequest(menuItemsTitle,
        function(menuItemsTitleHtml) {
            $ajaxUtils.sendHttpRequest(menuItems, function(menuItemsHtml) {
                var menuItemsView = MakeMenuItemsHtml(menuItemsJson, menuItemsTitleHtml, menuItemsHtml);
                setHtml("#main-content", menuItemsView);
            }, false)
        }, false)
    }

    var MakeMenuItemsHtml = function(menuItemsJson, menuItemsTitleHtml, menuItemsHtml) {
        
        console.log(menuItemsJson);
        menuItemsTitleHtml = replaceProp(menuItemsTitleHtml, "name", menuItemsJson.category.name);
        menuItemsTitleHtml = replaceProp(menuItemsTitleHtml, "menu-instructions", menuItemsJson.category.special_instructions);

        var finalMenuHtml = menuItemsTitleHtml;
        finalMenuHtml += '<section class="row">';

        var items = menuItemsJson.menu_items;
        var cat_short_name = menuItemsJson.category.short_name;

        for (var i = 0; i < items.length ; i++) {
            html = menuItemsHtml;
            html = replaceProp(html, "short_name", items[i].short_name);
            html = replaceProp(html, "cat_short_name", cat_short_name);
            html = insertPriceProp(html,
                      "price_small",
                      items[i].price_small);
            html = insertPortionProp(html,
                            "small_portion_name",
                            items[i].small_portion_name);
            html = insertPriceProp(html, "price_large", items[i].price_large);
            html = insertPortionProp(html,
                            "large_portion_name",
                            items[i].large_portion_name);
            html = replaceProp(html, "name", items[i].name);
            html = replaceProp(html, "description", items[i].description);

            if ((i%2) != 0) {
                html += '<div class="clearfix visible-lg visible-md"></div>';
            }

            finalMenuHtml += html;
        }
        
        finalMenuHtml += "</section>";
        return finalMenuHtml;
        
    }

    var insertPriceProp = function(html, priceName, priceValue) {
        if (!priceValue) {
            return replaceProp(html, priceName, "");
        }
        priceValue = "$" + priceValue.toFixed(2);
        html = replaceProp(html, priceName, priceValue);
        return html;
    }

    var insertPortionProp = function(html, portionName, portionValue) {
        if (!portionValue) {
            return replaceProp(html, portionName, "");
        }
    
        portionValue = " (" + portionValue + ") ";
        html = replaceProp(html, portionName, portionValue); 
        return html;
    }

    

    global.$dc = dc;

})(window);