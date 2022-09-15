
<div id="right-col">
    

    <div class="scroll">
       <ul class="side">
           <?php
// Establish Connection with Database
$con = mysqli_connect("localhost","root");
// Select Database
mysqli_select_db("shopping", $con);
// Specify the query to execute
$sql = "select * from Category_Master";
// Execute query
$result = mysqli_query($conn,$sql,$con);
// Loop through each records 
while($row = mysqli_fetch_array($result))
{
$Id=$row['CategoryId'];
$CategoryName=$row['CategoryName'];


?>
     <li><a href="Products.php?CategoryId=<?php echo $Id;?>"><?php echo $CategoryName;?></a></li>
    
    <?php
	}
// Close the connection
mysqli_close($con);
?>
    </ul>
    
  </div>
   
    <ul class="side">
    
    </ul>
   
</div>
 