$(document).ready(function () {
    login.eventos.init();
})

var login = {};

login.eventos = {

    init: () => {

        // cria o link dos eventos da página
        $("#btnLogin").on('click', () => {
            login.metodos.logar();
        });

    },

}

login.metodos = {

    teste: () => {
        console.log('bom sinal.');
    },

    logar: () => {

        // valida os campos
        var usuario = $("#txtUsuario").val().trim();
        var senha = $("#txtSenha").val().trim();

        if (usuario == '' || usuario == undefined) {
            app.metodos.mensagem("Informe o usuário, por favor.")
            $("#txtUsuario").focus();
            return;
        }

        if (senha == '' || senha == undefined) {
            app.metodos.mensagem("Informe a senha, por favor.");
            $("#txtSenha").focus();
            return;
        }

        var dados = {
            usuario: usuario,
            senha: senha
        }
        console.log(dados);

        // chama o método de login
        app.metodos.post('/login', JSON.stringify(dados),
            (response) => {

                if (response && !response.Status) {
                    app.metodos.mensagem(response.Mensagem);
                    return;
                }

                app.metodos.gravarValorSessao(response.TokenAcesso, 'token');
                app.metodos.gravarValorSessao(response.NomeCompleto, 'nomeUsuario');
                app.metodos.gravarValorSessao(response.UsuarioAcesso, 'loginUsuario');
                //app.metodos.obterValorSessao('loginUsuario')
                window.location.href = '/views/menu/PAGINA_INICIAL.html';
                
            },
            (xhr, ajaxOptions, error) => {

                console.log('xhr', xhr);
                console.log('ajaxOptions', ajaxOptions);
                console.log('error', error);

                app.metodos.mensagem("Falha ao realizar operação. Tente novamente.");
                return;
            }, 
            true
        );

    }

}