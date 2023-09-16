var currentPage = 1;  // Página atual
var itemsPerPage = 9;  // Número de itens por página

let tableConstructor = 
`<tr>
    <th>id</th>
    <th>nome</th>
    <th>cpf</th>
    <th>email</th>
    <th>data de nascimento</th>
    <th>endereco</th>
    <th>profissão</th>
    <th>telefone</th>
</tr>`

var tableBody = '';  // Corpo da tabela

const clientConsult = async() => {
   const data = await fetch ('http://192.168.40.10:3000/clientes');

   const clients = await data.json()

    // const quantieClients = clients.length //quantidade de clientes total
    // let allPages = quantieClients / limitPerPage //quantidade de paginas total
    // let currentPage = 1
    // const allLinesReceive = []
    console.log (clients)

    clients.forEach ((el) => {
        tableBody += `
    <tr>
        <td>${el.id}</td> 
        <td>${el.nome}</td> 
        <td>${el.cpf}</td> 
        <td>${el.email}</td> 
        <td>${el.data_nasc}</td> 
        <td>${el.endereco.bairro},${el.endereco.cidade},${el.endereco.cep},${el.endereco.logradouro},${el.endereco.numero},${el.endereco.uf}</td> 
        <td>${el.profissao}</td> 
        <td>${el.telefone}</td> 
    </tr>`     
    })

    document.getElementById ('main-table').innerHTML = tableConstructor + tableBody;
    updateTable()
}

clientConsult ()

function voltar(){
    window.location.assign("../index.html")
}
function ir(){
    window.location.assign("leituraXML.html")
}


function updateTable(){
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    var tableRows = tableBody.split('</tr>');
    
    var tableHTML = tableConstructor + tableRows.slice(startIndex, endIndex).join('</tr>');
    
    document.getElementById('main-table').innerHTML = tableHTML;

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

document.getElementById('prevPage').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        updateTable();
    }
});