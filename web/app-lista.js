$(document).ready(function(){
    usuario.eventos.init();
})

var usuario={};

usuario.eventos={
    init: () =>{
        console.log("aa");
        usuario.metodos.carrega();
    }
}

usuario.metodos = {
 
    carrega:async () => {
        console.log("Aqui");
        await new Promise((resolve, reject)=>{
            $.ajax({
                type: "GET",
                url: "http://192.12.115.39:4403/torneio/consulta/abate",
                //contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: (response) => {
                    var lista = response;
                    console.log(lista);

                    $('#containerTabela').html();
                    $('#containerTabela').append(usuario.templates.tabela);

                    $("#tbllista").DataTable({
                        destroy: true,
                        aaSorting: [[0, "asc"]],
                        dom: 'Bfrtip',
                        lengthMenu: [ [10, 25, 50, -1], ['10 linhas', '25 linhas', '50 linhas', 'Todas'], ],
                        columnDefs: [ { targets: [3], className: 'text-center' } ],
                        buttons: [ 'pageLength' ],
                        "data": lista,
                        "columns": [
                            { data: "number" },
                            { data: "nick" },
                            { data: "nometime" },
                            { data: "abate" }                
                        ],
                        "language": {
                            "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json"
                            , buttons: {
                                pageLength: {
                                    _: "Mostrar %d linhas",
                                    '-1': "Mostrar Todos"
                                }
                            }
                        }
                        
                    });
                    setTimeout(()=>{
                        $("div.dataTables_wrapper div.dataTables_filter input").attr('placeholder', 'Pesquise os usuários aqui...');
                    }, 150)

                    usuario.metodos.carrega2();
                },
                error: (xhr, ajaxOptions, error) => {
                    console.log('xhr', xhr);
                    console.log('ajaxOptions', ajaxOptions);
                    console.log('error', error);
                    alert("Por favor entrar em contato com a equipe do site para solucionar problema.");
                    return error;
                    reject();
                }
            });
        })
    },

    carrega2:async () => {
        console.log("Aqui");
        await new Promise((resolve, reject)=>{
            $.ajax({
                type: "GET",
                url: "http://192.12.115.39:4403/torneio/consulta/assist",
                //contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: (response) => {
                    var lista = response;
                    console.log(lista);

                    $('#containerTabela2').html();
                    $('#containerTabela2').append(usuario.templates.tabela2);

                    $("#tbllista2").DataTable({
                        destroy: true,
                        aaSorting: [[0, "asc"]],
                        dom: 'Bfrtip',
                        lengthMenu: [ [10, 25, 50, -1], ['10 linhas', '25 linhas', '50 linhas', 'Todas'], ],
                        columnDefs: [ { targets: [3], className: 'text-center' } ],
                        buttons: [ 'pageLength' ],
                        "data": lista,
                        "columns": [
                            { data: "number" },
                            { data: "nick" },
                            { data: "nometime" },
                            { data: "asist" }                
                        ]
                        ,
                        "language": {
                            "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json"
                            , buttons: {
                                pageLength: {
                                    _: "Mostrar %d linhas",
                                    '-1': "Mostrar Todos"
                                }
                            }
                        }
                    });
                    setTimeout(()=>{
                        $("div.dataTables_wrapper div.dataTables_filter input").attr('placeholder', 'Pesquise os usuários aqui...');
                    }, 150)
                },
                error: (xhr, ajaxOptions, error) => {
                    console.log('xhr', xhr);
                    console.log('ajaxOptions', ajaxOptions);
                    console.log('error', error);
                    alert("Por favor entrar em contato com a equipe do site para solucionar problema.");
                    return error;
                    reject();
                }
            });
        })
    }
}

usuario.templates = {
    tabela:`<table id="tbllista" class="table table-hover table-dark col-md-12" style="width: 800px;">
                <thead>
                    <tr>
                        <th scope="col">Posição</th>
                        <th scope="col">Nick</th>
                        <th scope="col">Time</th>
                        <th scope="col">Abates</th>
                    </tr>
                </thead>
            </table>`,

    tabela2:`<table id="tbllista2" class="table table-hover table-dark col-md-12" style="width: 800px;">
            <thead>
                <tr>
                    <th scope="col">Posição</th>
                    <th scope="col">Nick</th>
                    <th scope="col">Time</th>
                    <th scope="col">Assistencia</th>
                </tr>
            </thead>
        </table>`
}