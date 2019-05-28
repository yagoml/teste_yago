function obterCategorias() {
    var request = new XMLHttpRequest()
    var params = 'classe=categorias&metodo=buscar'

    request.open('POST', serverUrl + 'request_handler.php', true)
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    request.send(params)

    return request
}

function carregarCategorias() {
    var request = new XMLHttpRequest()
    var params = 'classe=categorias&metodo=buscar'
    var listaCategorias = document.getElementById("listaCategorias")
    var linkCategorias = document.getElementById("linkCategorias")

    linkCategorias.className = 'disabled'
    listaCategorias.className = 'text-center'
    listaCategorias.innerHTML = '<td colspan="3"><img src="images/load.gif" class="loader"></td>'

    request.open('POST', serverUrl + 'request_handler.php', true)
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    request.onreadystatechange = function() {
        linkCategorias.className = ''
        listaCategorias.className = ''
        listaCategorias.innerHTML = ''

        if (request.readyState === 4) {
            if (request.status === 200) {
                var categorias = JSON.parse(request.response)
                listarCategorias(categorias)
            } else {
                listaCategorias.innerHTML = 'Erro ao tentar carregar categorias.'
            }
        }
    }

    request.send(params)
}

function obterCategoria(id) {
    var request = new XMLHttpRequest()
    var params = 'classe=categorias&metodo=obterCategoria&id=' + id

    request.open('POST', serverUrl + 'request_handler.php', true)

    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    request.send(params)

    return request
}

function addLinhaCategoria(categoria) {
    var tr = document.createElement('tr');

    tr.setAttribute('data-id', categoria.id);

    tr.innerHTML =
        '<td>' + categoria.nome + '</td> \
        <td><a href="javascript:" onclick="paginaEditarCategoria(' + categoria.id + ')">Editar</a> | \
        <a href="javascript:" onclick="excluirCategoria(' + categoria.id + ', false)">Excluir</a></td>';

    document.getElementById('listaCategorias').appendChild(tr);
}

function addLinhaSelectCategoria(categoria) {
    var option = document.createElement('option');

    option.setAttribute('value', categoria.id);

    option.innerHTML = categoria.nome

    var select = document.getElementById('categoriaProduto')

    select.appendChild(option);
}

function salvarCategoria(id) {
    var descricao = document.getElementById('descricaoCategoria').value

    var validacao = validarCategoria(descricao)

    if (validacao.length) {
        alert(validacao)
        return
    }

    var request = new XMLHttpRequest()
    var params = 'classe=categorias&metodo=salvar'

    if (id) {
        params += '&id=' + id + '&descricao=' + descricao
    } else {
        params += '&descricao=' + descricao
    }

    request.open('POST', serverUrl + 'request_handler.php', true)

    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                paginaCategorias()
            } else {
                alert('Erro ao tentar salvar categoria.')
            }
        }
    }

    request.send(params)
}

function validarCategoria(descricao) {
    msg = '';

    if (!descricao.length) {
        msg += 'Descrição inválida.'
    }

    return msg
}

function excluirCategoria(id, redirecionar) {
    var request = new XMLHttpRequest()
    var params = 'classe=categorias&metodo=excluir&id=' + id

    request.open('POST', serverUrl + 'request_handler.php', true)

    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    request.onreadystatechange = function() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                if (redirecionar) {
                    paginaCategorias()
                } else {
                    var linha = document.querySelector('tr[data-id="' + id + '"]')
                    linha.remove()
                }
            } else {
                alert('Erro ao tentar excluir categoria.')
            }
        }
    }

    request.send(params)
}

function procurarCategoria() {
    var request = new XMLHttpRequest()
    var chave = document.getElementById('searchCategoria').value

    if (chave.length <= 0) {
        return
    }

    var params = 'classe=categorias&metodo=procurar&chave=' + chave

    var listaCategorias = document.getElementById("listaCategorias")
    listaCategorias.className = 'text-center'
    listaCategorias.innerHTML = '<td colspan="3"><img src="images/load.gif" class="loader"></td>'

    request.open('POST', serverUrl + 'request_handler.php', true)
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    request.onreadystatechange = function() {
        listaCategorias.className = ''
        listaCategorias.innerHTML = ''

        if (request.readyState === 4) {
            if (request.status === 200) {
                document.getElementById('listaCategorias').innerHTML = ''
                listarCategorias(JSON.parse(request.response))
            } else {
                alert('Erro ao tentar buscar categoria.')
            }
        }
    }

    request.send(params)
}

function listarCategorias(categorias) {
    categorias.forEach(categoria => {
        addLinhaCategoria(categoria)
    });
}