let url = "../dados/estoque.xml";
var currentPage = 1;  // Página atual
var itemsPerPage = 10;  // Número de itens por página
var tableHeader = `<tr>
<th>id</th>
<th>nome</th>
<th>marca</th>
<th>cnpj</th>
<th>preço custo</th>
<th>preço venda</th>
<th>quantidade atual</th>
<th>Estoque minimo</th>
</tr>`;
var tableBody = '';  // Corpo da tabela

$.ajax(url)
    .done(function (xml) {
        $(xml).find('produto').each(function () {
            tableBody +=
                `<tr>
            <td>${$(this).find('id').text()}</td>
            <td>${$(this).find('nome').text()}</td>
            <td>${$(this).find('marca').text()}</td>
            <td>${$(this).find('cnpj_fornecedor').text()}</td>
            <td>${$(this).find('preco_custo').text()}</td>
            <td>${$(this).find('preco_venda').text()}</td>
            <td>${$(this).find('qtd_atual').text()}</td>
            <td>${$(this).find('estoque_min').text()}</td>
            </tr>`;
        });
        // Defina a tabela completa, incluindo cabeçalho e corpo
        document.getElementById('tabela').innerHTML = tableHeader + tableBody;
        updateTable();
    })
    .fail(function () {
        alert("Ocorreu um erro na leitura do arquivo XML");
    });

document.getElementById('prevPage').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
});

function updateTable() {
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    // Extrair apenas as linhas da tabela (ignorando o cabeçalho)
    var tableRows = tableBody.split('</tr>');
    
    // Construir a tabela atualizada com base nas linhas e incluir o cabeçalho
    var tableHTML = tableHeader + tableRows.slice(startIndex, endIndex).join('</tr>');

    document.getElementById('tabela').innerHTML = tableHTML;

    // Atualizar a mensagem "Página X de Y" com o número correto de páginas
    var totalItems = tableRows.length - 1; // Descontar o último elemento vazio
    var totalPages = Math.ceil(totalItems / itemsPerPage);
    document.getElementById('pageInfo').innerText = `Página ${currentPage} de ${totalPages}`;
}

document.getElementById('nextPage').addEventListener('click', function () {
    var totalItems = tableBody.split('</tr>').length - 1;
    var totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        updateTable();
    }
});
