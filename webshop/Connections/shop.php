<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_shop = "localhost";
$database_shop = "db_shopping";
$username_shop = "root";
$password_shop = "";
$conn = mysqli_connect($hostname_shop, $username_shop, $password_shop) or die("Error: Cannot Connect to the databse"); 
?>