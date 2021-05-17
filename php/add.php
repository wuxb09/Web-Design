<?php
require_once "pdo.php";
session_start();

if ( ! isset($_SESSION["account"])  ) {
    die('ACCESS DENIED');
}

// If the user requested cancel, go back to view.php
if ( isset($_POST['cancel']) ) {
    header('Location: view.php');
    return;
}

if ( isset($_POST['make']) && isset($_POST['model']) && isset($_POST['year']) 
     && isset($_POST['mileage'])) {
    if( strlen($_POST['make']) < 1 || strlen($_POST['model']) < 1 || strlen($_POST['year']) < 1 || strlen($_POST['mileage']) < 1) {
        $_SESSION['error'] = "All fields are required";
    } else if(!is_numeric($_POST['year']) || !is_numeric($_POST['mileage'])) {
        if(!is_numeric($_POST['year'])) {
            $_SESSION['error'] = "Year must be an integer";
        } else if (!is_numeric($_POST['mileage'])) {
            $_SESSION['error'] = "Mileage must be an integer";
        } 
    } else {
        $sql = "INSERT INTO autos (make, model, year, mileage) 
              VALUES (:make, :model, :year, :mileage)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array(
            ':make' => $_POST['make'],
            ':model' => $_POST['model'],
            ':year' => $_POST['year'],
            ':mileage' => $_POST['mileage']));
        $_SESSION['success'] = "Record added";        
        header("Location: index.php");
        return;
    }

    if(isset($_SESSION['error'])) {
        header("Location: add.php");
        return;
    }
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Xiaoban Wu's Automobile Tracker</title>
<?php require_once "bootstrap.php"; ?>
</head>
<body>
<div class="container">
<?php
echo "<h1>Tracking Autos for ";
echo htmlentities($_SESSION["account"]);
echo "</h1>\n";
if(isset($_SESSION['error'])) {
    echo '<p style="color: red;">'.$_SESSION['error']."</p>\n";
    unset($_SESSION['error']);
}
?>
<form method="post">
<p>Make:
<input type="text" name="make" size="40"></p>
<p>Model:
<input type="text" name="model" size="40"></p>
<p>Year:
<input type="text" name="year"></p>
<p>Mileage:
<input type="text" name="mileage"></p>
<input type="submit" name = "add" value="Add">
<input type="submit" name="cancel" value="Cancel">
</form>

</div>
</body>
</html>
