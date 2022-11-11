$(function () {

    $("#jstree")
        .jstree({
            "core": {
                "animation":600,
                'strings': {
                    'Loading ...': 'Espere ...'
                },
                "themes": {
                    "icons": false,
                    "expand_selected_onload": true,
                    "responsive": true
                },
                "data":
                    {"url": "./static/regulamentos_tree.json",},

            },
            "plugins": ["checkbox", "search", "wholerow"],
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


// hover
    $('#jstree').bind("hover_node.jstree", function (e, data) {
        $("#jstree").attr('title', data.node.original.title);
    });


});



$(document).ready(function () {
    $(".search-input").keyup(function () {
        var searchString = $(this).val();
        $('#jstree').jstree('search', searchString);
    });
});