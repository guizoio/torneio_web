var form = {};


form.metodos = {  
    
    funcao:async () => {
        if ($('#customSwitch1').is(':checked')){
            var top     = $('#top').val();
            var jg      = $('#jg').val();
            var mid     = $('#mid').val();
            var adc     = $('#carry').val();
            var sup     = $('#sup').val();
            var time    = $('#time').val();
            var numero  = $('#numero').val();
    
            if(!top.trim())
                alert("informe o top lane.");
            else if(!jg.trim())
                alert("informe o jungle.");
            else if(!mid.trim())
                alert("informe o mid lane.");
            else if(!adc.trim())
                alert("informe o carry bot lane.");
            else if(!sup.trim())
                alert("informe o suporte bot lane.");
            else if(!time.trim())
                alert("informe o nome do time.");
            else if(!numero.trim())
                alert("informe o numero para contato.");
            else{
                console.log("cadastrar");
                var dados = {}
                var novo_numero = '('+numero+')'; 
                dados = {
                    top: top,
                    jg: jg,
                    mid: mid,
                    adc: adc,
                    sup: sup,
                    time: time,
                    numero: novo_numero
                }
    
                console.log(dados);
    
                var url = "http://192.12.115.39:4403/torneio/cadastrar";
                var retorno = form.metodos.cadastro(dados,url);
                console.log("DEPOIS QUE CHAMA FUNCAO: ", retorno);      
            }
        }else{
            alert("Por favor você não está ciente do valor");
        }
    },


    cadastro:async (data, url) => {
        await new Promise((resolve, reject)=>{
            $.ajax({
                type: "POST",
                url: url,
                //contentType: 'application/json; charset=utf-8',
                data: data,
                dataType: 'json',
                success: (response) => {
                    console.log("dentro da request: ", response);
                    
                    var resul = JSON.parse(response[0].retorno);
                    console.log("resul: ", resul);
                    console.log(resul.resultado);
                    if(resul.resultado=="sucesso"){
                        alert("Time cadastrado - Boa sorte. Entraremos em contato.");
                        $('#top').val("");
                        $('#jg').val("");
                        $('#mid').val("");
                        $('#carry').val("");
                        $('#sup').val("");
                        $('#time').val("");
                        $('#numero').val("");
                    }
                    return response;
                    resolve();
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





