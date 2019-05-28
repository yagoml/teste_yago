var serverUrl = 'http://' + document.location.host + '/teste_yago/'
    // let serverUrl = 'https://' + document.location.host + '/'

function paginaProdutos() {
    let main = document.getElementById("main")

    fetch(serverUrl + 'produtos/produtos.html' /*, options */ )
        .then((response) => response.text())
        .then((html) => {
            document.title = 'Produtos'
            main.innerHTML = html
            carregarProdutos()
        })
        .catch((error) => {
            console.warn(error)
        })
}

function paginaCategorias() {
    fetch(serverUrl + 'categorias/categorias.html' /*, options */ )
        .then((response) => response.text())
        .then((html) => {
            document.title = 'Categorias'
            main.innerHTML = html
            carregarCategorias()
        })
        .catch((error) => {
            console.warn(error)
        })
}

function paginaAddCategoria() {
    fetch(serverUrl + 'categorias/add-categoria.html' /*, options */ )
        .then((response) => response.text())
        .then((html) => {
            document.title = 'Nova Categoria'
            main.innerHTML = html
        })
        .catch((error) => {
            console.warn(error)
        })
}

function paginaEditarCategoria(id) {
    fetch(serverUrl + 'categorias/editar-categoria.html' /*, options */ )
        .then((response) => response.text())
        .then((html) => {
            document.title = 'Editar Categoria'
            main.innerHTML = html

            let requestCategoria = obterCategoria(id)

            requestCategoria.onreadystatechange = () => {
                if (requestCategoria.readyState === 4) {
                    if (requestCategoria.status === 200) {
                        categoria = JSON.parse(requestCategoria.response)[0]
                        document.getElementById("descricaoCategoria").value = categoria.nome
                        document.getElementById("salvarCategoria").setAttribute('onclick', 'salvarCategoria(' + id + ')')
                        document.getElementById("excluirCategoria").setAttribute('onclick', 'excluirCategoria(' + id + ', true)')
                    }
                }
            }
        })
        .catch((error) => {
            console.warn(error)
        })
}

function paginaEditarProduto(id) {
    fetch(serverUrl + 'produtos/editar-produto.html' /*, options */ )
        .then((response) => response.text())
        .then((html) => {
            document.title = 'Editar Produto'
            main.innerHTML = html

            let requestProduto = obterProduto(id)

            requestProduto.onreadystatechange = () => {
                if (requestProduto.readyState === 4) {
                    if (requestProduto.status === 200) {
                        produto = JSON.parse(requestProduto.response)[0]
                        document.getElementById("descricaoProduto").value = produto.nome
                        document.getElementById("salvarProduto").setAttribute('onclick', 'salvarProduto(' + id + ')')
                        document.getElementById("excluirProduto").setAttribute('onclick', 'excluirProduto(' + id + ', true)')

                        categoriasRequest = obterCategorias()

                        categoriasRequest.onreadystatechange = () => {
                            if (categoriasRequest.readyState === 4) {
                                if (categoriasRequest.status === 200) {
                                    let categorias = JSON.parse(categoriasRequest.response)

                                    categorias.forEach(categoria => {
                                        addLinhaSelectCategoria(categoria)
                                    })

                                    document.getElementById("categoriaProduto").value = produto.categoria_id
                                }
                            }
                        }
                    }
                }
            }
        })
        .catch((error) => {
            console.warn(error)
        })
}

function paginaAddProduto() {
    fetch(serverUrl + 'produtos/add-produto.html' /*, options */ )
        .then((response) => response.text())
        .then((html) => {
            document.title = 'Novo Produto'
            main.innerHTML = html
            categoriasRequest = obterCategorias()

            categoriasRequest.onreadystatechange = () => {
                if (categoriasRequest.readyState === 4) {
                    if (categoriasRequest.status === 200) {
                        let categorias = JSON.parse(categoriasRequest.response)

                        categorias.forEach(categoria => {
                            addLinhaSelectCategoria(categoria)
                        })
                    }
                }
            }
        })
        .catch((error) => {
            console.warn(error)
        })
}