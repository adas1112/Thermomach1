<?php
$mysqli_hostname = "localhost";
$mysqli_user = "root";
$mysqli_password = "";
$mysqli_database = "db_shopping";
$conn = mysqli_connect($mysqli_hostname, $mysqli_user, $mysqli_password) or die("Could not connect database");
mysqli_select_db($conn, $mysqli_database) or die("Could not select database");

?>