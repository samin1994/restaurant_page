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