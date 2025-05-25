function adicionarAtividade() {
    const input = document.getElementById('novaAtividade');
    const lista = document.getElementById('listaAtividades');
    const item = document.createElement('li');
    item.textContent = input.value;
    item.onclick = () => item.style.textDecoration = 'line-through';
    lista.appendChild(item);
    input.value = '';
}

function salvarAnotacoes() {
    const texto = document.getElementById('campoAnotacoes').value;
    localStorage.setItem('anotacoes', texto);
    alert('Anotações salvas localmente!');
}

function exportarPDF() {
    const texto = document.getElementById('campoAnotacoes').value;
    const docDefinition = {
        content: [{ text: texto, fontSize: 12 }]
    };
    pdfMake.createPdf(docDefinition).download("anotacoes.pdf");
}

function calcularFaltas() {
    const total = parseInt(document.getElementById('totalAulas').value);
    const faltas = parseInt(document.getElementById('aulasFaltadas').value);
    const nome = document.getElementById('materiaNome').value;
    const maxFaltas = Math.floor(total * 0.25);
    const restante = maxFaltas - faltas;
    const resultado = restante >= 0 
        ? `Você ainda pode faltar ${restante} aulas em ${nome}.`
        : `Você ultrapassou o limite de faltas em ${nome}!`;
    document.getElementById('resultadoFaltas').innerText = resultado;
}

function logout() {
    localStorage.clear();
    window.location.href = "/";
}
