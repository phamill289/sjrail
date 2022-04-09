<?php
$servername = "localhost";
$username = "sjrail";
//$password = "password";
$dbname = "sjrail_db";

$search = $_POST["search"];



// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

$sql = 
"Select *
From image
Where img_name LIKE '%$search%'
";


$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();
mysqli_close($conn);

/*
if (mysqli_query($conn, $sql)) {
  echo "query success.";
} else {
  echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
*/
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//echo $result->fetch_row()[1];

$img = "resources/assets/sjrail_logo.png";

function fetchImg($res, &$img)
{

//$res->fetch_row()[0];
$linkr = $res->fetch_row()[0];
if(is_null($linkr)){
return FALSE;
}
//echo "1 ".$linkr;
//$img = "images/d/dd/Copper_Tower_A.jpg";

$path = md5($linkr);
$pathone = substr($path,0,1);
$pathtwo = substr($path,0,2);
//echo " path: ".$path;
//echo " pathone ".$pathone;
//echo " pathtwo ".$pathtwo;
$img = "images/$pathone/$pathtwo/".$linkr;


//echo $img;
echoImg($img);
return TRUE;
}

//fetchImg($result,$img);

//echo "http://localhost/mediawiki-1.37.1/index.php/File:Copper_Tower_A.jpg";
echo "<html> 
<head> <style>
* {
  box-sizing: border-box;
}

.column {
  float: left;
  width: 33.33%;
  padding: 5px;
}

/* Clearfix (clear floats) */
.row::after {
  content: \"\";
  clear: both;
  display: table;
}

/* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
@media screen and (max-width: 500px) {
  .column {
    width: 100%;
  }
}
</style>

<head>
<body> 

<form action=\"imagedisplay.php\" method=\"post\">
Search: <input type=\"text\" name=\"search\"><br>
<input type=\"submit\">
</form>

<div class=\"row\">";



//echoImg($img);

while(fetchImg($result,$img)){}

function echoImg($var){
echo 
"<div class=\"column\">
<a href=$var>
<img src=$var style=\"width:100%\" decoding=\"async\" width=\"684\" height=\"599\">
</div>";
}

echo 
"</div>
</body>
</html>";
?>
