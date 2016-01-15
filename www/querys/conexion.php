<?php
 


// datos para la coneccion a mysql
define('DB_SERVER','localhost');

define('DB_NAME','tmtecnom_undasbd');

define('DB_USER','root');

define('DB_PASS',''); 
 
// define('DB_SERVER','186.64.119.70');
// define('DB_NAME','tmtecnom_undasbd');
// define('DB_USER','tmtecnom_undas');
// define('DB_PASS','undas.321');

    $con = mysql_connect(DB_SERVER,DB_USER,DB_PASS);
    mysql_select_db(DB_NAME,$con);
 mysql_query("SET NAMES 'utf8'");
?>