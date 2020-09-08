$(document).ready(function(){
    usuario.eventos.init();
})

var usuario={};

usuario.eventos={
    init: () =>{
        usuario.metodos.carrega();
    }
}




usuario.metodos = {
 
    carrega:async () => {
        console.log("Aqui");
        await new Promise((resolve, reject)=>{
            $.ajax({
                type: "GET",
                url: "http://192.12.115.39:4403/torneio/consulta",
                //contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: (response) => {
                    var lista = response;
                    console.log(lista.length);



                    $.each(lista, (i, elem) => {
                        console.log(i);
                        console.log(elem['nomeTime']);

                        let novaLinha = usuario.templates.card
                            .replace(/\$\{nomeTime\}/g, elem['nomeTime'])
                            .replace(/\$\{top\}/g, elem['toplane'])
                            .replace(/\$\{jg\}/g, elem['jungle'])
                            .replace(/\$\{mid\}/g, elem['midlane'])
                            .replace(/\$\{adc\}/g, elem['carry'])
                            .replace(/\$\{sup\}/g, elem['suporte']);

                        $('#listaCard').html();
                        $('#listaCard').append(novaLinha);

                    

                        // elem.Acoes = `<div class="dropdown">
                        //                 <a href="#" class="dropdown-ellipses dropdown-toggle" data-toggle="dropdown">
                        //                     <i class="fe fe-elipsis-v"></i>
                        //                 </a>
                        //                 <div class="dropdown-menu dropdown-menu-right">
                        //                     <a href="#!" class="dropdown-item" onclick="form.metodos.carregarEdicao('` + elem.OBS + `')">
                        //                         <i class="fe fe-edit"></i>&nbsp; Visualizar
                        //                     </a>
                        //                     <a href="#!" class="dropdown-item" onclick="usuario.metodos.abrirModalExcluir(` + elem['OBS'] + `)">
                        //                         <i class="fe fe-trash"></i>&nbsp; Remover
                        //                     </a>
                        //                 </div>
                        //             </div>`;
    
                        // elem.Barra = `  <div class="progress">
                        //                     <div class="progress-bar bg-success" role="progressbar" style="width: `+elem['PORCENTO']+`%" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                        //                     `+elem['PORCENTO']+`%
                        //                     </div>
                        //                 </div>`;
                    });











                    // $('#containerTabela').html();
                    // $('#containerTabela').append(usuario.templates.tabela);

                    // $("#tbllista").DataTable({
                    //     destroy: true,
                    //     aaSorting: [[0, "asc"]],
                    //     dom: 'Bfrtip',
                    //     lengthMenu: [ [10, 25, 50, -1], ['10 linhas', '25 linhas', '50 linhas', 'Todas'], ],
                    //     columnDefs: [ { targets: [3], className: 'text-center' } ],
                    //     buttons: [ 'pageLength' ],
                    //     "data": lista,
                    //     "columns": [
                    //         { data: "number" },
                    //         { data: "nick" },
                    //         { data: "nometime" },
                    //         { data: "abate" }                
                    //     ],
                    //     "language": {
                    //         "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese-Brasil.json"
                    //         , buttons: {
                    //             pageLength: {
                    //                 _: "Mostrar %d linhas",
                    //                 '-1': "Mostrar Todos"
                    //             }
                    //         }
                    //     }
                        
                    // });
                    // setTimeout(()=>{
                    //     $("div.dataTables_wrapper div.dataTables_filter input").attr('placeholder', 'Pesquise os usuários aqui...');
                    // }, 150)

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


    card:`
    <div class="col-md-12" style="opacity: 0.7;">
        <div class="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div class="col p-4 d-flex flex-column position-static">
                <strong class="d-inline-block mb-2 text-primary">\${nomeTime}</strong>         
                <p class="card-text mb-auto">TopLane: \${top}</p>
                <p class="card-text mb-auto">Jungle: \${jg}</p>
                <p class="card-text mb-auto">MidLane: \${mid}</p>
                <p class="card-text mb-auto">AdC: \${adc}</p>
                <p class="card-text mb-auto">Suporte: \${sup}</p>
                <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#staticBackdrop" disabled>
                    visualisar
                </button>        
            </div>
            <div class="col-auto d-none d-lg-block">
                <img class="bd-placeholder-img" width="250" height="200" src="../img/1515_LoL.png" style="margin: 20px;"/>
            </div>
        </div>
    </div>`
}