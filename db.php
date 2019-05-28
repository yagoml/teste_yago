<?php

Class Conexao {
    private $dbName;
    private $user;
    private $pass;
    private $con;

    public function Conexao() {
        $this->dbName = 'teste_sergio';
        $this->user = 'root';
        $this->pass = '';
        // $this->dbName = 'id9742451_teste_yago';
        // $this->user = 'id9742451_yago';
        // $this->pass = 'yago99';
    }

    function con() {
        $this->con = new PDO('mysql:host=localhost;dbname='.$this->dbName, $this->user, $this->pass);
        $this->con->exec('set names utf8');
        return $this->con;
    }

    function close() {
        $this->con = null;
    }
}