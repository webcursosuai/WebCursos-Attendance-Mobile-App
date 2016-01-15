<?php
    include_once dirname(__FILE__) . "/conexion.php";
    include_once dirname(__FILE__) . "/getTM.php";
    $user = $_REQUEST['user'];
    $password = $_REQUEST['password'];
    $array = array ();

    $rec = mysql_query("SELECT idTM FROM tm WHERE Rut = '$user' AND Password = '". md5($password) ."'") or die(mysql_error());
   // var_dump($rec);
    header('Content-Type: application/javascript');
    header('Cache-Control: no-cache');
    header('Pragma: no-cache');
    $callback = $_REQUEST['jsoncallback'];
    
    if (mysql_affected_rows() == 1) {
    	
        $resultado = getTM($user);
       //var_dump($resultado);
       
       $array['nombre'] = $resultado[0]['Nombre'];
       $array['apellido'] = $resultado[0]['Apellido'];
     //  var_dump ($array);
   
        
        echo $callback.'('.json_encode($array).');';
        
    }
 else {

 	$array['nombre'] = "Usuario";
 	$array['apellido'] = "invalido";
 	echo $callback.'('.json_encode($array).');';
}
?>