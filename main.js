async function buscaEndereco(cep) {
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultCEPJson = await consultaCEP.json();
        
        if (consultCEPJson.erro) {
            throw new Error('CEP não encontrado');
        }

        var cidade = document.getElementById('cidade');
        var logradouro = document.getElementById('endereco');
        var estado = document.getElementById('estado');

        cidade.value = consultCEPJson.localidade;
        logradouro.value = consultCEPJson.logradouro;
        estado.value = consultCEPJson.uf;

        return consultCEPJson;
    } catch (error) {
        console.log(error);
    }
};

var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));
