async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = '';
    
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultCEPJson = await consultaCEP.json();
        
        if (consultCEPJson.erro) {
            throw new Error('CEP não encontrado');
        }

        configurarCampo('cidade', consultCEPJson.localidade);
        configurarCampo('endereco', consultCEPJson.logradouro);
        configurarCampo('estado', consultCEPJson.uf);
        configurarCampo('bairro', consultCEPJson.bairro);
        configurarCampo('complemento', consultCEPJson.complemento);

        return consultCEPJson;
    } catch (error) {
        mensagemErro.innerHTML = '<p>CEP inválido. Tente novamente</p>';
    }
};

function configurarCampo(elem, valor) {
    var campo = document.getElementById(elem);
    campo.value = valor;
}

var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));
