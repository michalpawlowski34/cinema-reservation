<?php
$conn=new mysqli('localhost','root','','projektkino');
$resultBatman=mysqli_query($conn,"SELECT * FROM batman");
$resultSpiderman=mysqli_query($conn,"SELECT * FROM spiderman");
$resultSuperman=mysqli_query($conn,"SELECT * FROM superman");

$dataBatman=array();
$dataSpiderman=array();
$dataSuperman=array();
while($row=mysqli_fetch_object($resultBatman)){
    array_push($dataBatman,$row);
}
while($row=mysqli_fetch_object($resultSpiderman)){
    array_push($dataSpiderman,$row);
}
while($row=mysqli_fetch_object($resultSuperman)){
    array_push($dataSuperman,$row);
}
$fullData=new stdClass();
$fullData->batman=$dataBatman;
$fullData->spiderman=$dataSpiderman;
$fullData->superman=$dataSuperman;
echo json_encode($fullData);
exit();
$conn->close();
?>