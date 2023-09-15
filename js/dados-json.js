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

const clientConsult = async(table,limitPerPage) => {
   const data = await fetch ('http://192.168.40.3:3000/clientes');

   const clients = await data.json()

    // const quantieClients = clients.length //quantidade de clientes total
    // let allPages = quantieClients / limitPerPage //quantidade de paginas total
    // let currentPage = 1
    // const allLinesReceive = []
    console.log (clients)

    clients.forEach ((el) => {
        tableConstructor += `
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

    document.getElementById ('main-table').innerHTML = tableConstructor
}

clientConsult ()

