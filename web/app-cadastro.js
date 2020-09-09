var form = {};


form.metodos = {  
           
    funcao:async () => {

        //https://codare.aurelio.net/2009/04/03/javascript-obter-e-mostrar-data-e-hora/#:~:text=Para%20obter%20a%20data%20(e,uma%20vari%C3%A1vel%20var%20dia%20%3D%20data.

        var data = new Date();
        console.log(data);
        var dia     = data.getDate();           // 1-31
        var mes     = data.getMonth();          // 0-11 (zero=janeiro)
        var ano4    = data.getFullYear();       // 4 dígitos       
        var str_data = dia + '/' + (mes+1) + '/' + ano4;
        console.log(str_data);//8/9/2020
        
        if(dia>9 && (mes+1)>=9 && ano4>=2020){
            
            var top     = $('#top').val();
            var jg      = $('#jg').val();
            var mid     = $('#mid').val();
            var adc     = $('#carry').val();
            var sup     = $('#sup').val();
            var time    = $('#time').val();
            var numero  = $('#numero').val();
            var senha   = $('#senha').val();
    
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
                alert("informe o whatsapp para contato.");
            else if(!senha.trim())
                alert("informe a senha.");
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
                    numero: novo_numero,
                    senha: senha
                }
    
                console.log(dados);
    
                var url = "http://192.12.115.39:4403/torneio/cadastrar";
                var retorno = form.metodos.cadastro(dados,url);
                console.log("DEPOIS QUE CHAMA FUNCAO: ", retorno);
            }
        }else{
            alert("Fora do périodo para realizar o cadastro de equipes! Incrições serão apartir do dia 10/09/2020.");
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
                        alert("Time cadastrado - Boa sorte.\nAgora a sua equipe pode logar no sistema usando o nome da equipe e senha cadastrada.");
                        $('#top').val("");
                        $('#jg').val("");
                        $('#mid').val("");
                        $('#carry').val("");
                        $('#sup').val("");
                        $('#time').val("");
                        $('#numero').val("");
                        $('#senha').val("");
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





