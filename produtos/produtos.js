function carregarProdutos() {
    let params = 'classe=produtos&metodo=buscar'
    let listaProdutos = document.getElementById("listaProdutos")
    let linkProdutos = document.getElementById("linkProdutos")

    linkProdutos.className = 'disabled'
    listaProdutos.className = 'text-center'
    listaProdutos.innerHTML = '<td colspan="3"><img src="images/load.gif" class="loader"></td>'

    request = httpRequest(params)
    request.onreadystatechange = () => {
        linkProdutos.className = ''
        listaProdutos.className = ''
        listaProdutos.innerHTML = ''

        if (request.readyState === 4) {
            if (request.status === 200) {
                let produtos = JSON.parse(request.response)
                listarProdutos(produtos)
            } else {
                listaProdutos.innerHTML = 'Erro ao tentar carregar produtos.'
            }
        }
    }
}

function addLinhaProduto(produto) {
    let tr = document.createElement('tr')
    tr.setAttribute('data-id', produto.id)

    tr.innerHTML =
        '<td>' + produto.nome + '</td> \
		<td>' + produto.categoria_nome + '</td> \
        <td><a href="javascript:" onclick="paginaEditarProduto(' + produto.id + ')">Editar</a> | \
        <a href="javascript:" onclick="excluirProduto(' + produto.id + ', false)">Excluir</a></td>'


    document.getElementById('listaProdutos').appendChild(tr)
}

function salvarProduto(id) {
    let descricao = document.getElementById('descricaoProduto').value
    let categoria = document.getElementById('categoriaProduto').value
    let validacao = validarProduto(descricao, categoria)

    if (validacao.length) {
        alert(validacao)
        return
    }

    let params = 'classe=produtos&metodo=salvar'

    if (id) {
        params += '&id=' + id + '&descricao=' + descricao + '&categoria_id=' + categoria
    } else {
        params += '&descricao=' + descricao + '&categoria_id=' + categoria
    }

    request = httpRequest(params)
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                paginaProdutos()
            } else {
                alert('Erro ao tentar salvar produto.')
            }
        }
    }
}

function validarProduto(descricao, categoria) {
    msg = ''

    if (!descricao.length) {
        msg += 'Descrição inválida.'
    }

    if (!parseInt(categoria) >= 1) {
        msg += '\r\nCategoria inválida.'
    }

    return msg
}

function obterProduto(id) {
    let params = 'classe=produtos&metodo=obterProduto&id=' + id
    request = httpRequest(params)
    return request
}

function excluirProduto(id, redirecionar) {
    let linha = document.querySelector('tr[data-id="' + id + '"]')
    let nome = linha.children[0].textContent

    if (confirm("Excluir Produto '" + nome + "' #" + id + " ? ")) {
        let params = 'classe=produtos&metodo=excluir&id=' + id

        request = httpRequest(params)
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    if (redirecionar) {
                        paginaProdutos()
                    } else {
                        linha.remove()
                    }
                } else {
                    alert('Erro ao tentar excluir produto.')
                }
            }
        }
    }
}

function procurarProduto() {
    let chave = document.getElementById('searchProduto').value

    if (chave.length <= 0) {
        return
    }

    let listaProdutos = document.getElementById("listaProdutos")
    let params = 'classe=produtos&metodo=procurar&chave=' + chave

    listaProdutos.className = 'text-center'
    listaProdutos.innerHTML = '<td colspan="3"><img src="images/load.gif" class="loader"></td>'


    request = httpRequest(params)
    request.onreadystatechange = () => {
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
}

function listarProdutos(produtos) {
    if (produtos.length) {
        produtos.forEach(categoria => {
            addLinhaProduto(categoria)
        })
    } else {
        document.getElementById('listaProdutos').innerHTML = '<tr class="text-center"><td colspan="3" style="padding: 10px">Nenhuma Produto encontrado.</td></tr>'
    }
}