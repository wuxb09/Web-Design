<?php
    require_once "pdo.php";
    session_start();
    
    function print_autos() {
    	global $pdo;
    	$stmt = $pdo->query("SELECT autos_id, make, model, year, mileage FROM autos");
    	$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    	if(count($rows) == 0) {
    		echo "<p>No rows found</p>";
    	} else {
    		echo('<table border="1">'."\n");
			echo "<tr> <th>Make</th> <th>Model</th> <th>Year</th> <th>Mileage</th> <th>Action</th> </tr>";
			foreach ( $rows as $row ) {
			    echo "<tr><td>";
			    echo(htmlentities($row['make']));
			    echo("</td><td>");
			    echo(htmlentities($row['model']));
			    echo("</td><td>");
			    echo(htmlentities($row['year']));
			    echo("</td><td>");
			    echo(htmlentities($row['mileage']));
			    echo("</td><td>");
			    echo('<a href="edit.php?autos_id='.$row['autos_id'].'">Edit</a> / ');
			    echo('<a href="delete.php?autos_id='.$row['autos_id'].'">Delete</a>');
			    echo("</td></tr>\n");
			}
		    echo('</table>'. "\n");
    	}
	}
?>

<!DOCTYPE html>
<html>
<head>
<title>Xiaoban Wu Autos Database</title>
<?php require_once "bootstrap.php"; ?>
</head>
<body>

<div class="container">
<h1>Welcome to the Automobiles Database</h1>

<?php
if(!isset($_SESSION["account"]) ) {
	echo '<p> <a href="login.php">Please log in</a> </p>';
	echo '<p> Attempt to <a href="add.php">add data</a> without logging in - it should fail with an error message. </p>';
} else {
	if(isset($_SESSION['success'])) {
		echo '<p style="color: green;">'.$_SESSION['success']."</p>\n";
        unset($_SESSION['success']);
	}

	if(isset($_SESSION['error'])) {
		echo '<p style="color: red;">'.$_SESSION['error']."</p>\n";
        unset($_SESSION['error']);
	}

    print_autos();
	echo '<p> <a href="add.php">Add New Entry</a> </p>';
	echo '<p> <a href="logout.php">Logout</a> </p>';
}
?>

</div>
</body>

