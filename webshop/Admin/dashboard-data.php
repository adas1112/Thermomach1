<?php
session_start();
include('include/config.php');
if(strlen($_SESSION['alogin'])==0)
	{	
header('location:index.php');
}
else{

    // $sql ="SELECT SUM(`quantity`) as 'QTY' FROM `orders` GROUP BY `productId`";
     $sql ="SELECT *,SUM(quantity) as 'qty' FROM category c, `products` p, `orders` o WHERE c.id=p.category AND p.`id`=o.`productId` GROUP BY p.category";
     $result = mysqli_query($conn,$sql);
     $chart_data="";
     while ($row = mysqli_fetch_array($result)) { 
 
        $point = array("label" => $row['categoryName'] , "y" => $row['qty']);
        
        array_push($data_points, $point);        
    }
    
    echo json_encode($data_points, JSON_NUMERIC_CHECK);
?>