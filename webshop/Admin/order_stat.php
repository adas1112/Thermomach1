<?php
session_start();
include('../include/config.php');

$year1=date("Y");
	$query = mysqli_query($conn,$bd,"select COUNT(*) as count,DATE_FORMAT(orderDate,'%b') as month from orders where YEAR(orderDate)='$year1' and orderStatus='in Process' or orderStatus='Delivered' group by MONTH(orderDate)") or die(mysqli_error($bd));

	$category = array();
	//$category['name'];

	$series1 = array();
	$series1['name'] = 'in Process and Delivered';

	while($r = mysqli_fetch_array($query)) {
		
	    //$count=$r['total'];
	    $category['name'][] =$r['month'];
	    $category['data'][] =$r['month'];
	    $series1['data'][] = $r['count'];

}

$result = array();
array_push($result,$category);
array_push($result,$series1);
//array_push($result,$series2);

print json_encode($result, JSON_NUMERIC_CHECK);
mysqli_close($bd);
?> 
