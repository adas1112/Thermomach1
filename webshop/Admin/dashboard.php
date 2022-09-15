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
 
        // $point = array("label" => $row['categoryName'] , "y" => $row['qty']);
        
        // array_push($data_points, $point);     
        $productname[]  = $row['categoryName']  ;
        $orders[] = $row['qty'];

       $dataPoints[] =  array("label"=>  $row['categoryName'], "y"=>  $row['qty']);
               
    }
    
    // echo json_encode($data_points, JSON_NUMERIC_CHECK);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin | Dashboard</title>
        <link type="text/css" href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link type="text/css" href="bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
        <link type="text/css" href="css/theme.css" rel="stylesheet">
        <link type="text/css" href="images/icons/css/font-awesome.css" rel="stylesheet">
        <link type="text/css" href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600'
            rel='stylesheet'>
        <link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css">
    </head>
    <body>
        <?php include('include/header.php');?>
        <div class="wrapper">
            <div class="container">
                <div class="row">
                <?php include('include/sidebar.php');?>		
                    
                    <div class="span9">
                        <div class="content">
                            <div class="btn-controls">
                             
                                <div class="btn-box-row row-fluid">

                                <h2 class="page-header" >Analytics </h2> 
                              <!--   <canvas id="chartjs_pie"></canvas> -->
                                <div id="chartContainer"  ></div>
                           
                        </div>
                        <!--/.content-->
                    </div>
                    <!--/.span9-->
                </div>
            </div>
            <!--/.container-->
        </div>
        <!--/.wrapper-->
<?php include('include/footer.php');?>

  <script src="scripts/jquery-1.9.1.min.js" type="text/javascript"></script>
    <script src="scripts/jquery-ui-1.10.1.custom.min.js" type="text/javascript"></script>
    <script src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="scripts/flot/jquery.flot.js" type="text/javascript"></script>
    <script src="scripts/datatables/jquery.dataTables.js"></script> 
    <script src="assets/vendor/charts/charts-bundle/Chart.bundle.js"></script>  
    <script src="assets/vendor/charts/charts-bundle/chart.js"></script> 
    <script src="canvasjs-2.2/jquery.canvasjs.min.js"></script> 
    <script type="text/javascript">
      var ctx = document.getElementById("chartjs_pie").getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels:<?php echo json_encode($productname); ?>,
                        datasets: [{
                            backgroundColor: [
                               "#5969ff",
                                "#ff407b",
                                "#25d5f2",
                                "#ffc750",
                                "#2ec551",
                                "#7040fa",
                                "#ff004e"
                            ],
                            data:<?php echo json_encode($orders); ?>,
                        }]
                    },
                    options: {
                           legend: {
                        display: true,
                        position: 'bottom',

                        labels: {
                            fontColor: '#71748d',
                            fontFamily: 'Circular Std Book',
                            fontSize: 14,
                        }
                    },

                    
                }
                });
    </script> 
<script>
window.onload = function () {
 
var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    exportEnabled: true,
    title:{
        text: "Average of Category that has been sold"
    },
    subtitles: [{
        text: "Category"
    }],
    data: [{
        type: "pie",
        indexLabel: "{y}",
        // yValueFormatString: "#,##0.00\"%\"",
        indexLabelPlacement: "inside",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "#percent%",
        // yValueFormatString: "฿#,##0",
        dataPoints: <?php echo json_encode($dataPoints, JSON_NUMERIC_CHECK); ?>
    }]
});
chart.render();
 
}
</script>
    </body>
    <?php } ?>
