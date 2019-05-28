<?php
include_once 'db.php';

Class Categorias {
    public function obterCategoria($id) {
        $con = new Conexao();
        $stmt = $con->con()->prepare("SELECT * FROM categorias WHERE id = ". $id ."");
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
        $stmt = $con->con()->prepare("SELECT * FROM categorias");
        $stmt->execute();
        $con->close();

        $result = [];
        while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
            $result[] = $row;
        }

        return $result;
    }

    public function salvar($id, $descricao) {
        $con = new Conexao();

        if(isset($id)) {
            $stmt = $con->con()->prepare("UPDATE `categorias` SET `nome`= '". $descricao ."' WHERE id = ". $id);
        } else {
            $stmt = $con->con()->prepare("INSERT INTO `categorias`(`nome`) VALUES ('". $descricao ."')");
        }

        $stmt->execute();
        $con->close();
    }

    public function excluir($id) {
        $con = new Conexao();
        $stmt = $con->con()->prepare("DELETE FROM `categorias` WHERE id = ". $id ."");
        $stmt->execute();
        $con->close();
    }
    
    public function procurar($chave) {
        $con = new Conexao();
        $stmt = $con->con()->prepare("SELECT * FROM categorias WHERE lower(nome) LIKE '%". strtolower($chave) ."%'");
        $stmt->execute();
        $con->close();

        $result = [];
        while ($row = $stmt->fetch(PDO::FETCH_OBJ)) {
            $result[] = $row;
        }

        return $result;
    }
}