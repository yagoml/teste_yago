<?php
require_once 'categorias/categorias.php';
require_once 'produtos/produtos.php';

if(isset($_POST['classe']) && isset($_POST['metodo'])) {
    $classe = $_POST['classe'];
    $metodo = $_POST['metodo'];

    if($classe == 'produtos') {
        $produtos = new Produtos();

        if($metodo == 'buscar') {
            $result = $produtos->buscar();
            echo json_encode($result);
        }

        if($metodo == 'salvar') {
            $id = $_POST['id'];
            $descricao = $_POST['descricao'];
            $categoria_id = $_POST['categoria_id'];

            if(strlen($descricao) > 0) {
                if(isset($id)) {
                    $produtos->salvar($id, $descricao, $categoria_id);
                } else {
                    $produtos->salvar(null, $descricao, $categoria_id);
                }
            }
        }

        if($metodo == 'excluir') {
            $id = $_POST['id'];

            if($id) {
                $produtos->excluir($id);
            }
        }

        if($metodo == 'obterProduto') {
            $id = $_POST['id'];

            if($id) {
               $result = $produtos->obterProduto($id);
               echo json_encode($result);
            }
        }

        if($metodo == 'editar') {
            $id = $_POST['id'];

            if($id) {
                $produtos->editar($id);
            }
        }

        if($metodo == 'procurar') {
            $chave = $_POST['chave'];

            if($chave && (strlen($chave) > 0)) {
                echo json_encode($produtos->procurar($chave));
            }
        }
    }

    if($classe == 'categorias') {
        $categorias = new Categorias();

        if($metodo == 'buscar') {
            $result = $categorias->buscar();
            echo json_encode($result);
        }

        if($metodo == 'salvar') {
            $id = $_POST['id'];
            $descricao = $_POST['descricao'];

            if(strlen($descricao) > 0) {
                if(isset($id)) {
                    $categorias->salvar($id, $descricao);
                } else {
                    $categorias->salvar(null, $descricao);
                }
            }
        }

        if($metodo == 'excluir') {
            $id = $_POST['id'];

            if($id) {
                $categorias->excluir($id);
            }
        }

        if($metodo == 'obterCategoria') {
            $id = $_POST['id'];

            if($id) {
               $result = $categorias->obterCategoria($id);
               echo json_encode($result);
            }
        }

        if($metodo == 'editar') {
            $id = $_POST['id'];

            if($id) {
                $categorias->editar($id);
            }
        }

        if($metodo == 'procurar') {
            $chave = $_POST['chave'];

            if($chave && (strlen($chave) > 0)) {
                echo json_encode($categorias->procurar($chave));
            }
        }
    }
}