$(document).ready(function () {


    $("#jstree").jstree({
        "core": {
            "animation": 400,
            'strings': {
                'Loading ...': 'Espere ...'
            },
            "themes": {
                "icons": false,
                "expand_selected_onload": true,
                "responsive": true
            },
            "data":
                {"url": "./static/regulamentos.json",},

        },
        "plugins": ["checkbox", "search", "wholerow"],
        "checkbox": {
            "keep_selected_style": false
        },
        "search": {
            "case_sensitive": false,
            "show_only_matches": false
        }
    })

    // sempre que mudar a tree
    $('#jstree').on("changed.jstree", function (e, data) {
            $('#regs').empty();
            let selecionado = data.selected;
            console.log(selecionado);
            let is_selected = function (id) {
                return selecionado.map(x => x.includes(id)).includes(true)
            };

            $.getJSON('./static/regulamentos.json', function (regs) {
                $.map(regs, function (reg) {
                        if (is_selected(reg.id)) {

                            $('div#regs').append('<div id=' + reg.id + '></div>');
                            $('div#' + reg.id).append("<h4>" + reg.name + "</h4>").addClass("accordion");


                            if (reg.children) {
                                $.map(reg.children, function (level1) {
                                    if (is_selected(level1.id)) {
                                        $('div#' + reg.id).append('<div id= ' + level1.id + '></div>');
                                        $('div#' + level1.id).append(content_type(level1)[0]).addClass(content_type(level1)[1]);
                                        if (level1.children) {
                                            $.map(level1.children, function (level2) {
                                                if (is_selected(level2.id)) {
                                                    $('div#' + level1.id).append('<div id= ' + level2.id + '></div>');
                                                    $('div#' + level2.id).append(content_type(level2)[0]);
                                                    if (level2.children) {
                                                        $.map(level2.children, function (level3) {
                                                            if (is_selected(level3.id)) {
                                                                $('div#' + level2.id).append('<div id= ' + level3.id + '></div>');
                                                                $('div#' + level3.id).append(content_type(level3)[0]);
                                                                if (level3.children) {
                                                                    $.map(level3.children, function (level4) {
                                                                        if (is_selected(level4.id)) {
                                                                            $('div#' + level3.id).append('<div id= ' + level4.id + '></div>');
                                                                            $('div#' + level4.id).append(content_type(level4)[0]);
                                                                            if (level4.children) {
                                                                                $.map(level4.children, function (level5) {
                                                                                    if (is_selected(level5.id)) {

                                                                                        $('div#' + level4.id).append('<div id= ' + level5.id + '></div>');
                                                                                        $('div#' + level5.id).append(content_type(level5)[0]);
                                                                                        if (level5.children) {
                                                                                            $.map(level5.children, function (level6) {
                                                                                                if (is_selected(level6.id)) {
                                                                                                    $('div#' + level5.id).append('<div id= ' + level6.id + '></div>');
                                                                                                    $('div#' + level6.id).append(content_type(level6)[0]);
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    }
                );

            });


        }
    )


    // hover
    $('#jstree').bind("hover_node.jstree", function (e, data) {
        $("#jstree").attr('title', data.node.original.title);
    });


    // search in tree
    $(".search-input").keyup(function () {
        var searchString = $(this).val();
        $('#jstree').jstree('search', searchString);
    });


    let content_type = function (level) {

        let classe = "";
        let content = "";

        if (level.name.slice(0, 3) === 'Cap' || level.name.slice(0, 5) === 'Anexo') {
            classe = "accordion";
            content = '<h4>' + level.name + '</h4>' + '<h4>' + level.title + '</h4>';
            return [content, classe];
        } else if (level.name.slice(0, 3) === 'Sec') {
            content = '<h5>' + level.name + '</h5>' + '<h5>' + level.title + '</h5>';
            return [content, "Sec"];
        } else if (level.name.slice(0, 3) === 'Sub') {
            content = '<h6>' + level.name + '</h6>' + '<h6>' + level.title + '</h6>'
            return [content, "Sub"];
        } else if (level.name.slice(0, 3) === 'Art') {
            content =
                '<dt>' + level.name + '</dt>' + '<dt>' + level.title + '</dt>';
            if (level.content) {
                return [content + '<dd>' + level.content + '</dd>', "Art"];
            } else {
                return [content, "Art"];
            }
        } else if (level.name.slice(0, 5) === 'ponto') {
            content = '<dd>' + level.text + ' — ' + level.content + '</dd>';
            return [content, "ponto"];
        } else if (level.name.slice(0, 6) === 'alínea') {
            content = '<dd>' + level.text + ') ' + level.content + '</dd>';
            return [content, "alínea"];

        } else {
            return '???';
        }
    }


})