<?php
include_once 'db.php';

Class Produtos {
    public function obterProduto($id) {
        $con = new Conexao();
        $stmt = $con->con()->prepare("SELECT * FROM produtos WHERE id = ". $id ."");
        $stmt->execute();
        $con->close();

        $result = [];
        while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
            $result[] = $row;
        }

        return $result;
    }

    public function buscar() {
        $con = new Conexao();
        $stmt = $con->con()->prepare("
            SELECT p.id, p.nome, c.id AS 'categoria_id', c.nome AS 'categoria_nome' FROM produtos p
            INNER JOIN categorias c ON c.id = p.categoria_id
        ");
        $stmt->execute();

        $result = [];
        while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
            $result[] = $row;
        }

        $con->close();

        return $result;
    }

    public function salvar($id, $descricao, $categoria_id) {
        $con = new Conexao();

        if(isset($id)) {
            $stmt = $con->con()->prepare("UPDATE `produtos` SET `nome`= '". $descricao ."', `categoria_id` = ". $categoria_id ." WHERE id = ". $id);
        } else {
            $stmt = $con->con()->prepare("INSERT INTO `produtos`(`nome`, `categoria_id`) VALUES ('". $descricao ."', '". $categoria_id ."')");
        }

        $stmt->execute();
        $con->close();
    }

    public function excluir($id) {
        $con = new Conexao();
        $stmt = $con->con()->prepare("DELETE FROM `produtos` WHERE id = ". $id ."");
        $stmt->execute();
        $con->close();
    }

    public function procurar($chave) {
        $con = new Conexao();
        $stmt = $con->con()->prepare("SELECT p.id, p.nome, c.id AS 'categoria_id', c.nome AS 'categoria_nome' FROM `produtos` p INNER JOIN categorias c ON c.id = p.categoria_id WHERE lower(p.nome) LIKE '%". $chave ."%'
        ");
        $stmt->execute();
        $con->close();

        $result = [];
        while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
            $result[] = $row;
        }

        return $result;
    }
}