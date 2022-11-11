$(function () {

    $("#jstree")
        .jstree({
            "core": {
                "data":
                    {"url": "./static/regulamentos_tree.json",}
            },
            "plugins": ["checkbox", "search"],
            "checkbox": {
                "keep_selected_style": false
            },
            "search": {
                "case_sensitive": false,
                "show_only_matches": true
            }
        })

    $('#jstree').on("changed.jstree", function (e, data) {
        console.log(data.selected);
    });


});


$(document).ready(function () {
    $(".search-input").keyup(function () {
        var searchString = $(this).val();
        $('#jstree').jstree('search', searchString);
    });
});