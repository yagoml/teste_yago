function carregarProdutos() {
    var request = new XMLHttpRequest()
    var params = 'classe=produtos&metodo=buscar'
    var listaProdutos = document.getElementById("listaProdutos")
    var linkProdutos = document.getElementById("linkProdutos")

    linkProdutos.className = 'disabled'
    listaProdutos.className = 'text-center'
    listaProdutos.innerHTML = '<td colspan="3"><img src="images/load.gif" class="loader"></td>'

    request.open('POST', serverUrl + 'request_handler.php', true)
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    request.onreadystatechange = function() {
        linkProdutos.className = ''
        listaProdutos.className = ''
        listaProdutos.innerHTML = ''

        if (request.readyState === 4) {
            if (request.status === 200) {
                var produtos = JSON.parse(request.response)
                listarProdutos(produtos)
            } else {
                listaProdutos.innerHTML = 'Erro ao tentar carregar produtos.'
            }
        }
    }

    request.send(params)
}

function addLinhaProduto(produto) {
    var tr = document.createElement('tr');
    tr.setAttribute('data-id', produto.id);

    tr.innerHTML =
        '<td>' + produto.nome + '</td> \
		<td>' + produto.categoria_nome + '</td> \
        <td><a href="javascript:" onclick="paginaEditarProduto(' + produto.id + ')">Editar</a> | \
        <a href="javascript:" onclick="excluirProduto(' + produto.id + ', false)">Excluir</a></td>';


    document.getElementById('listaProdutos').appendChild(tr);
}

function salvarProduto(id) {
    var descricao = document.getElementById('descricaoProduto').value
    var categoria = document.getElementById('categoriaProduto').value

    var validacao = validarProduto(descricao, categoria)

    if (validacao.length) {
        alert(validacao)
        return
    }

    var request = new XMLHttpRequest()
    var params = 'classe=produtos&metodo=salvar'

    if (id) {
        params += '&id=' + id + '&descricao=' + descricao + '&categoria_id=' + categoria
    } else {
        params += '&descricao=' + descricao + '&categoria_id=' + categoria
    }

    request.open('POST', serverUrl + 'request_handler.php', true)
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                paginaProdutos()
            } else {
                alert('Erro ao tentar salvar produto.')
            }
        }
    }

    request.send(params)
}

function validarProduto(descricao, categoria) {
    msg = '';

    if (!descricao.length) {
        msg += 'Descrição inválida.'
    }

    if (!parseInt(categoria) >= 1) {
        msg += '\r\nCategoria inválida.'
    }

    return msg
}

function obterProduto(id) {
    var request = new XMLHttpRequest()
    var params = 'classe=produtos&metodo=obterProduto&id=' + id

    request.open('POST', serverUrl + 'request_handler.php', true)
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.send(params)

    return request
}

function excluirProduto(id, redirecionar) {
    var request = new XMLHttpRequest()
    var params = 'classe=produtos&metodo=excluir&id=' + id

    request.open('POST', serverUrl + 'request_handler.php', true)
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                if (redirecionar) {
                    paginaProdutos()
                } else {
                    var linha = document.querySelector('tr[data-id="' + id + '"]')
                    linha.remove()
                }
            } else {
                alert('Erro ao tentar excluir produto.')
            }
        }
    }

    request.send(params)
}

function procurarProduto() {
    var request = new XMLHttpRequest()
    var chave = document.getElementById('searchProduto').value;

    if (chave.length <= 0) {
        return
    }

    var listaProdutos = document.getElementById("listaProdutos")
    listaProdutos.className = 'text-center'
    listaProdutos.innerHTML = '<td colspan="3"><img src="images/load.gif" class="loader"></td>'

    var params = 'classe=produtos&metodo=procurar&chave=' + chave
    request.open('POST', serverUrl + 'request_handler.php', true)
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    request.onreadystatechange = function() {
        listaProdutos.className = ''
        listaProdutos.innerHTML = ''

        if (request.readyState === 4) {
            if (request.status === 200) {
                document.getElementById('listaProdutos').innerHTML = ''
                listarProdutos(JSON.parse(request.response))
            } else {
                alert('Erro ao tentar buscar produto.')
            }
        }
    }

    request.send(params)
}

function listarProdutos(produtos) {
    produtos.forEach(produto => {
        addLinhaProduto(produto)
    })
}