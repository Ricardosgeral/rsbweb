$(document).ready(function () {


        $.getJSON('./static/regulamentos.json', function (regulamentos) {

                //criar a árvore
                $("#jstree").jstree({
                    "core": {
                        "expand_selected_onload": false, // importante para manter os nós fechado após seleção
                        "animation": 400,
                        'strings': {
                            'Loading ...': 'Espere ...'
                        },
                        "themes": {
                            "icons": false,
                            "expand_selected_onload": true,
                            "responsive": true
                        },
                        "data": regulamentos.children,
                        // {"url": "./static/regulamentos.json",},

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

                // search json and filter it
                function searchItens(searchText, regulamentos, rd_search_and) {

                    let matches = []
                    let filtered_results = []

                    searchText = searchText.split(",") // transformar num array
                    searchText = searchText.map(x => x.trim()) // tirar espaços no início e fim dos strings

                    let results = iterate_json_search(regulamentos, searchText, rd_search_and, matches)
                    filtered_results = reduceArray(results)

                    return filtered_results
                }

                function iterate_json_search(obj, searchText, rd_search_and, matches) {
                    obj.children.forEach(item => {
                        if (item.children && item.children !== []) {
                            if (rd_search_and) { // pesquisar com "e" ou seja com o "every"
                                // procurar no content
                                if (item.content) {
                                    var isFound = searchText.every(function (word) {
                                        return item.content.toLowerCase().indexOf(word.toLowerCase()) !== -1; // toLowercase transforma em case-insensitive
                                    });
                                    if (isFound) {
                                        matches.push(item.id)
                                    }
                                }
                                //procurar no title
                                if (item.title) {
                                    var isFound = searchText.every(function (word) {
                                        return item.title.toLowerCase().indexOf(word.toLowerCase()) !== -1;  // toLowercase transforma em case-insensitive
                                    });
                                    if (isFound) {
                                        matches.push(item.id)
                                    }
                                }
                                iterate_json_search(item, searchText, rd_search_and, matches);
                            } else { //pesquisa com "ou" ou seja com "some"
                                // procurar no content
                                if (item.content) {
                                    var isFound = searchText.some(function (word) {
                                        return item.content.toLowerCase().indexOf(word.toLowerCase()) !== -1;// toLowercase transforma em case-insensitive
                                    });
                                    if (isFound) {
                                        matches.push(item.id)
                                    }
                                }
                                //procurar no title
                                if (item.title) {
                                    var isFound = searchText.some(function (word) {
                                        return item.title.toLowerCase().indexOf(word.toLowerCase()) !== -1;// toLowercase transforma em case-insensitive
                                    });
                                    if (isFound) {
                                        matches.push(item.id)
                                    }
                                }
                                iterate_json_search(item, searchText, rd_search_and, matches);
                            }
                        }

                    })
                    return matches
                }

                // função para filtrar os elementos a mais (repetidos)
                function reduceArray(array) {
                    let toRemove = []
                    let res_array = []
                    for (let i = 0; i < array.length; i++) {
                        let element0 = array[i];
                        for (let j = 0; j < array.length; j++) {
                            let element1 = array[j]
                            if (element0 !== element1 && !toRemove.includes(element1)) {
                                if (element0.includes(element1 + "-")) {
                                    toRemove.push(element1)
                                }
                            }
                        }
                    }
                    res_array = array.filter(function (el) {
                        return !toRemove.includes(el)
                    })
                    return res_array
                }

                // sempre que mudar a tree
                $('#jstree').on("changed.jstree", function (e, data) {
                    $('#root').empty();
                    iterate_json(regulamentos, data.selected)
                });

                $('#selectAll').click(function () {
                    if ($("#selectAll").text() == "Selecionar tudo") {
                        $('#jstree').jstree("check_all").bind();
                        $("#alert_search").hide()

                        $("#selectAll").text("Desselecionar tudo")
                    } else {
                        $('#jstree').jstree("uncheck_all").bind();
                        $("#alert_search").hide()
                        $("#selectAll").text("Selecionar tudo")
                    }
                })

                $('#colapseAll').click(function () {
                    if ($("#colapseAll").text() == "Colapsar tudo") {
                        $('#jstree').jstree("close_all").bind();
                        $("#colapseAll").text("Expandir tudo")
                    } else {
                        $('#jstree').jstree("open_all").bind();
                        $("#colapseAll").text("Colapsar tudo")
                    }
                })

                // função de pesquisa
                $("#search_btn").click(function () {

                    let pesquisar = $("#search").val()
                    let rd_search_and = $("#rd_search_and").is(':checked');

                    let valoresfinais = searchItens(pesquisar, regulamentos, rd_search_and)

                    let searchArray = []
                    searchArray.push(pesquisar.split(",").length) // numero de palavras pesquisadas
                    searchArray.push(pesquisar) // palavras pesquisadas
                    searchArray.push(valoresfinais) // valores resultantes da pesquisa
                    sessionStorage.clear();
                    sessionStorage.setItem('searchArray', searchArray);  //definir variável global
                    window.location = "search?" + rd_search_and + JSON.stringify(pesquisar);
                })

                // hover
                $('#jstree').bind("hover_node.jstree", function (e, data) {
                    $("#jstree").attr('title', data.node.original.title);
                });

                // selecionar nós por defeito
                $('#jstree').on('loaded.jstree', function () {
                    if (document.title == "Barragens - Regulamentos") {
                        $('#jstree').jstree("check_all").bind();
                    } else if (document.title == "Barragens - RSB") {
                        $('#jstree').jstree('select_node', 'rsb');
                    } else if (document.title == "Barragens - RPB") {
                        $('#jstree').jstree('select_node', 'rpb');
                    } else if (document.title == "Barragens - DTA(PI)") {
                        $('#jstree').jstree('select_node', 'dta1');
                    } else if (document.title == "Barragens - DTA(PII)") {
                        $('#jstree').jstree('select_node', 'dta2');
                    } else if (document.title == "Barragens - DTA(PIII)") {
                        $('#jstree').jstree('select_node', 'dta3');
                    } else if (document.title == "Barragens - DTA(PIV)") {
                        $('#jstree').jstree('select_node', 'dta4');
                    } else if (document.title == "Barragens - Pesquisa") {

                        var searchArray = sessionStorage.getItem('searchArray'); //obter variavel global que foi criada noutra pagina
                        searchArray = searchArray.split(",");

                        numberWordsSearch = searchArray.shift();  // search fica o 1ºelemento do array e searchArray fica sem esse elemento
                        wordsSearch = searchArray.splice(0, numberWordsSearch)

                        $("#search").val(wordsSearch)

                        if (search.length < 3) {
                            $("#alert_search").prepend("Atenção!<br> Não são aceites pesquisas com menos de 3 caracteres.")
                        } else {
                            if (searchArray.length == 1)
                                $("#alert_search").prepend('Atenção!<br> Não foram encontradas correspondências para: <strong> ' + wordsSearch.join() + '<\strong>.')
                            else if (searchArray.length > 100 && searchArray.length < 250) {
                                $("#alert_search").prepend("Atenção!<br>A sua pesquisa retornou muitas correspondências (" + searchArray.length + ").<br>Recomenda-se que refine a sua procura!")
                                searchArray_rsb_rpb = searchArray.filter((el) => {
                                    if (el.split("-")[0] == "rsb" || el.split("-")[0] == "rpb") {
                                        return true
                                    }
                                })
                                searchArray_dtas = searchArray.filter((el) => {
                                    if (el.split("-")[0].includes("dta1", "dta2", "dta3", "dta4")) {
                                        return true
                                    }
                                })
                                //tentativa para ser mais rápido (ou pelo menos não encravar a página
                                $('#jstree').jstree('select_node', searchArray_rsb_rpb);
                                $('#jstree').jstree('select_node', searchArray_dtas);
                            } else if (searchArray.length > 250) {
                                $("#alert_search").prepend("Atenção!<br> A sua pesquisa retornou demasiadas correspondências para ser útil (" + searchArray.length + ").<br>É recomendado que refina a sua procura!")
                            } else { //entre 1 e 100
                                $('#jstree').jstree('select_node', searchArray);
                                $("#alert_search").prepend('Foram encontradas ' + searchArray.length + ' correspondências para: <strong> ' + wordsSearch.join() + '<\strong>.')
                            }
                        }
                    }
                });

                // search in tree (left side search)
                $(".search-input").keyup(function () {
                    var searchString = $(this).val();
                    $('#jstree').jstree('search', searchString);
                });

                // função recursiva
                // iterar o json e chama a função content_type()
                function iterate_json(obj, data) {
                    obj.children.forEach((item, index) => {
                        {
                            if (item.children && item.children != []) {
                                content_type(item, index, data);
                                iterate_json(item, data);
                            } else {
                                return
                            }
                            ;
                        }
                    });
                }

                // // fechar os nós após selecionar
                // $("#jstree").bind("open_node.jstree", function (event, data) {
                //     var obj = data.instance.get_node(data.node, true);
                //     if (obj) {
                //         obj.siblings('.jstree-open').map(function () {
                //             data.instance.close_node(this, 1);
                //         });
                //     }
                // });

                // função para ver se um dado obj foi selecionado na tree
                let is_selected = function (id, data) {
                    return data.map(x => x.includes(id)).includes(true)
                };

                // descobrir de que tipo é o objeto e cria o html com as respetivas funções
                let content_type = function (obj, index, dataSelected) {
                    if (is_selected(obj.id, dataSelected)) {
                        if (["rsb", "rpb", "dta1", "dta2", "dta3", "dta4"].includes(obj.id)) {
                            const cor_tab = "#0d6efd";
                            return accordion_type(obj, cor_tab)
                        } else if (obj.name.slice(0, 3) === 'Cap' || obj.name.slice(0, 5) === 'Anexo') {
                            const cor_tab = "#00a5e0";
                            return accordion_type(obj, cor_tab);
                        } else if (obj.text.slice(0, 3) === 'Sec') {
                            const cor_tab = "#7f99ef";
                            return accordion_type(obj, cor_tab);
                        } else if (obj.text.slice(0, 3) == 'Sub') {
                            const cor_tab = "#ef9cda";
                            return accordion_type(obj, cor_tab);
                        } else if (obj.name.slice(0, 3) === 'Art') {
                            return artGroup_type(obj, index);
                        } else if (obj.name.slice(0, 5) === 'ponto') {
                            return ponto_type(obj);
                        } else if (obj.name.slice(0, 6) === 'alínea') {
                            return aln_type(obj);
                        } else {
                            return 'Verificar o  json no ramo com id:' + obj.id;
                        }
                    }
                }
                // cria o html (accordion) para um dado obj (Regulamento, Capítulo, Anexo, Seção ou subseção)
                // recebe um objeto (1 children pex 1 regulamento) do Json e cria o html
                let accordion_type = function (obj, color) {
                    let id_parent = "";
                    if (obj.id.lastIndexOf("-") == -1) { // se não houver "-" então estamos na root da árvore
                        id_parent = "root"// no html tem de estar um div com este id
                    } else {
                        //descobrir o id do parent (retira do id o que está à frente do último "-")
                        id_parent = obj.id.substring(0, obj.id.lastIndexOf("-"))
                    }
                    $('div#' + id_parent).append('<div id=acc-item_' + obj.id + '></div>').addClass("accordion");
                    $('div#acc-item_' + obj.id).addClass("accordion-item py-0");
                    $("<h2></h2>").addClass("accordion-header py-0 my-0").attr('id', 'acc-header_' + obj.id).appendTo($('div#acc-item_' + obj.id))
                    let add_title = ""
                    if (obj.title != "") {
                        add_title = " — " + obj.title
                    }
                    let text_prop = color + '; color:white; font-weight: bold'
                    if (obj.text.slice(0, 3) == 'Sub') {
                        text_prop = color + '; color:black'
                    }
                    $("<button></button>").addClass("accordion-button").attr({
                        'type': 'button',
                        'style': 'background-color:' + text_prop,
                        'data-bs-toggle': 'collapse',
                        'data-bs-target': '#acc-collapse_' + obj.id

                    }).appendTo($('h2#acc-header_' + obj.id)).text(obj.name + add_title)
                    //
                    $('<div></div>').addClass("accordion-collapse collapse show").attr('id', 'acc-collapse_' + obj.id).appendTo($('div#acc-item_' + obj.id))
                    $('<div></div>').addClass("accordion-body pe-0 border-left").attr('id', 'acc-body_' + obj.id).appendTo($('div#acc-collapse_' + obj.id))
                    $('<div></div>').attr('id', obj.id).appendTo($('div#acc-body_' + obj.id)) // cria um div no fim para receber os children
                }
                // cria o html (list-group) para um dado obj (Artigo)
                // recebe um objeto (1 children ou seja 1 artigo) do Json e cria o html
                let artGroup_type = function (obj, index) {
                    //descobrir o id do parent (retira do id o que está à frente do último "-")
                    let id_parent = obj.id.substring(0, obj.id.lastIndexOf("-"));
                    let content = "";

                    if (index != 0) {  //se for o primeiro child (não coloca o divisor horizontal)
                        $('div#' + id_parent).append('<hr>');
                    }
                    $('div#' + id_parent).addClass("list-group").append('<a id=lstgr-item_' + obj.id + '></a>');
                    $('a#lstgr-item_' + obj.id).addClass("list-group-item list-group-item-action border-0 my-0 py-0");

                    $('<div></div>').attr('id', 'lstgr-flex_' + obj.id).appendTo($('a#lstgr-item_' + obj.id))
                    $('div#lstgr-flex_' + obj.id).addClass("ld-flex justify-content-between py-0 my-0");

                    $("<h6></h6>").attr('id', 'lstgr-header_' + obj.id).appendTo($('div#lstgr-flex_' + obj.id))
                    $('h6#lstgr-header_' + obj.id).text(obj.name + " " + obj.title)
                    if (obj.content != "") {
                        $("<p></p>").attr('id', 'p_' + obj.id).appendTo($('a#lstgr-item_' + obj.id))
                        $('#p_' + obj.id).text(obj.content)
                    }
                    $('<div></div>').attr('id', obj.id).appendTo($('a#lstgr-item_' + obj.id)) // cria um div no fim para receber os children
                    //formatação
                    // document.getElementById('lstgr-item_' + obj.id).style.borderLeft = "0.15rem solid #FF5733";
                    // document.getElementById('lstgr-item_' + obj.id).style.borderRight = "0rem";
                    // document.getElementById('lstgr-item_' + obj.id).style.borderTop = "0rem";
                    // document.getElementById('lstgr-item_' + obj.id).style.borderbottom = "0rem";
                }
                // cria o html (list-group) para um dado obj (ponto)
                // recebe um objeto (1 children ou seja 1 ponto) do Json e cria o html
                let ponto_type = function (obj) {
                    //descobrir o id do parent (retira do id o que está à frente do último "-")
                    let id_parent = obj.id.substring(0, obj.id.lastIndexOf("-"));

                    $('div#' + id_parent).addClass("list-group").append('<div id=div-item_' + obj.id + '></div>');
                    $('#div-item_' + obj.id).addClass("py-0");

                    $('#div-item_' + obj.id).append('<a id=lstgr-item_' + obj.id + '></a>');
                    $('a#lstgr-item_' + obj.id).addClass("list-group-item list-group-item-action border-0");

                    $("a#lstgr-item_" + obj.id).text(obj.text + " — " + obj.content)
                    $('<div></div>').attr('id', obj.id).appendTo($('a#lstgr-item_' + obj.id)) // cria um div no fim para receber os children
                    //formatação
                    document.getElementById('div-item_' + obj.id).style.borderLeft = "0.15rem solid #FF5733";
                    document.getElementById('div-item_' + obj.id).style.borderRight = "0rem";
                    document.getElementById('div-item_' + obj.id).style.borderTop = "0rem";
                    document.getElementById('div-item_' + obj.id).style.borderbottom = "0rem";
                }
                // cria o html (list-group) para um dado obj (alinea)
                // recebe um objeto (1 children ou seja 1 alinea) do Json e cria o html
                let aln_type = function (obj) {
                    //descobrir o id do parent (retira do id o que está à frente do último "-")
                    let id_parent = obj.id.substring(0, obj.id.lastIndexOf("-"));
                    $('div#' + id_parent).addClass("list-group").append('<a id=lstgr-item_' + obj.id + '></a>');
                    $('a#lstgr-item_' + obj.id).addClass("list-group-item list-group-item-action border-0 py-1");
                    $("a#lstgr-item_" + obj.id).text(obj.text + ") " + obj.content)
                    $('<div></div>').attr('id', obj.id).appendTo($('a#lstgr-item_' + obj.id)) // cria um div no fim para receber os children
                    //formatação
                    // document.getElementById('lstgr-item_' + obj.id).style.borderLeft = "0.08rem solid #A8FF33";
                    // document.getElementById('lstgr-item_' + obj.id).style.borderRight = "0rem";
                    // document.getElementById('lstgr-item_' + obj.id).style.borderTop = "0rem";
                    // document.getElementById('lstgr-item_' + obj.id).style.borderbottom = "0rem";
                }
            }
        )
    }
)

