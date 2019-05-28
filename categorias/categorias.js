function obterCategorias() {
    let params = 'classe=categorias&metodo=buscar'
    request = httpRequest(params)
    return request
}

function carregarCategorias() {
    let params = 'classe=categorias&metodo=buscar'
    let listaCategorias = document.getElementById("listaCategorias")
    let linkCategorias = document.getElementById("linkCategorias")

    linkCategorias.className = 'disabled'
    listaCategorias.className = 'text-center'
    listaCategorias.innerHTML = '<td colspan="2"><img src="images/load.gif" class="loader"></td>'

    request = httpRequest(params)
    request.onreadystatechange = () => {
        linkCategorias.className = ''
        listaCategorias.className = ''
        listaCategorias.innerHTML = ''

        if (request.readyState === 4) {
            if (request.status === 200) {
                let categorias = JSON.parse(request.response)
                listarCategorias(categorias)
            } else {
                listaCategorias.innerHTML = 'Erro ao tentar carregar categorias.'
            }
        }
    }
}

function obterCategoria(id) {
    let params = 'classe=categorias&metodo=obterCategoria&id=' + id
    request = httpRequest(params)
    return request
}

function addLinhaCategoria(categoria) {
    let tr = document.createElement('tr')
    tr.setAttribute('data-id', categoria.id)
    tr.innerHTML =
        '<td>' + categoria.nome + '</td> \
        <td><a href="javascript:" onclick="paginaEditarCategoria(' + categoria.id + ')">Editar</a> | \
        <a href="javascript:" onclick="excluirCategoria(' + categoria.id + ', false)">Excluir</a></td>'

    document.getElementById('listaCategorias').appendChild(tr)
}

function addLinhaSelectCategoria(categoria) {
    let option = document.createElement('option')
    let select = document.getElementById('categoriaProduto')

    option.setAttribute('value', categoria.id)
    option.innerHTML = categoria.nome
    select.appendChild(option)
}

function salvarCategoria(id) {
    let descricao = document.getElementById('descricaoCategoria').value
    let validacao = validarCategoria(descricao)

    if (validacao.length) {
        alert(validacao)
        return
    }

    let params = 'classe=categorias&metodo=salvar'

    if (id) {
        params += '&id=' + id + '&descricao=' + descricao
    } else {
        params += '&descricao=' + descricao
    }

    request = httpRequest(params)
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 200) {
                paginaCategorias()
            } else {
                alert('Erro ao tentar sallet categoria.')
            }
        }
    }
}

function validarCategoria(descricao) {
    msg = ''
    if (!descricao.length) {
        msg += 'Descrição inválida.'
    }
    return msg
}

function excluirCategoria(id, redirecionar) {
    let linha = document.querySelector('tr[data-id="' + id + '"]')
    let nome = linha.children[0].textContent

    if (confirm("Excluir Categoria '" + nome + "' #" + id + " ? ")) {
        let params = 'classe=categorias&metodo=excluir&id=' + id

        request = httpRequest(params)
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    if (redirecionar) {
                        paginaCategorias()
                    } else {
                        linha.remove()
                    }
                } else {
                    alert('Erro ao tentar excluir categoria.')
                }
            }
        }
    }
}

function procurarCategoria() {
    let chave = document.getElementById('searchCategoria').value

    if (chave.length <= 0) {
        return
    }

    let params = 'classe=categorias&metodo=procurar&chave=' + chave
    let listaCategorias = document.getElementById("listaCategorias")

    listaCategorias.className = 'text-center'
    listaCategorias.innerHTML = '<td colspan="3"><img src="images/load.gif" class="loader"></td>'

    request = httpRequest(params)
    request.onreadystatechange = () => {
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
}

function listarCategorias(categorias) {
    if (categorias.length) {
        categorias.forEach(categoria => {
            addLinhaCategoria(categoria)
        })
    } else {
        document.getElementById('listaCategorias').innerHTML = '<tr class="text-center"><td colspan="2" style="padding: 10px">Nenhuma Categoria encontrada.</td></tr>'
    }
}