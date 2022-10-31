

$( document ).ready(function() {
    var url = window.location.href;

    if (url.IndexOf('rsb') > -1) {
    $(".list-group:first-child").addClass("active");
    }

    if (url.IndexOf('rpb') > -1) {
    $(".list-group:first-child").addClass("active");
    }

    if (url.IndexOf('dtaI') > -1) {
    $(".list-group:first-child").addClass("active");
    }

    if (url.IndexOf('dtaII') > -1) {
    $(".list-group:first-child").addClass("active");
    }

        if (url.IndexOf('dtaIII') > -1) {
    $(".list-group:first-child").addClass("active");
    }

        if (url.IndexOf('dtaIV') > -1) {
    $(".list-group:first-child").addClass("active");
    }

});