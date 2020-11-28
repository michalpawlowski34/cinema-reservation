<?php
$conn=new mysqli('localhost','root','','projektkino');
if(is_string($conn)){
    echo "błąd połączenia z bazą danych";
}
else{
    $fname=$_POST['fname'];
    $phone=$_POST['phone'];
    $filmName=$_POST['inputNazwa'];
    $seatsChosen=json_decode($_POST['seatsChosen']);
    for($i=0;$i<count($seatsChosen);$i++){
        $insertReservation="INSERT INTO $filmName(nr_miejsca,imie,telefon) VALUES($seatsChosen[$i],'$fname',$phone)";
        $conn->query($insertReservation);
    }
    echo '<script type="text/javascript">
    alert("Zarezerwowano!")
    window.location = "http://localhost/projektkino/index.html"
    </script>';
}
$conn->close();
?>