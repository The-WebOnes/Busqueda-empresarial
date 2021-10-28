<?php 
require_once("../dataBase/DBConnection.php");


$DOCUMENTS_PATH = "../documents/";

$STORE_DOCUMENTS_SQL_STATEMENT = "INSERT INTO documents (titulo, snipped, content) VALUES (?,?,?)";
//$STORE_INDEX_INVERTED_SQL_STATEMENT = "INSERT INTO invertedindex (term, documentname, frequency) VALUES (?,?,?)";

$arraySize = count($_FILES["files"]["name"]);

$ObjectConnection = new DBConnection();
$connection = $ObjectConnection->get_connection();

for ($i = 0; $i < $arraySize; $i++) 
{
    $Temporaylocaltion = $_FILES["files"]["tmp_name"][$i];
    $fileName = $_FILES["files"]["name"][$i];
   
    move_uploaded_file($Temporaylocaltion,$DOCUMENTS_PATH."".$fileName);

    $content = file_get_contents($DOCUMENTS_PATH."".$fileName);
    $sniped = substr($content,0,51);

    $statement = $connection->prepare($STORE_DOCUMENTS_SQL_STATEMENT);
    $statement -> execute([$fileName,$sniped,$content]);

}



?>