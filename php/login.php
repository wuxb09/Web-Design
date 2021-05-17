<?php
session_start();

$salt = 'XyZzy12*_';
$stored_hash = '1a52e17fa899cf40fb04cfc42e6352f1';  // Pw is php123

// Check to see if we have some POST data, if we do process it
if ( isset($_POST['email']) && isset($_POST['pass']) ) {
    unset($_SESSION["account"]);  // Logout current user
    unset($_SESSION["error"]);

    if ( strlen($_POST['email']) < 1 || strlen($_POST['pass']) < 1 ) {
        $_SESSION["error"] = "User name and password are required";
    } else if (strpos($_POST['email'], '@') === false) {
        $_SESSION["error"] = "Email must have an at-sign (@)";
    } else {
        $check = hash('md5', $salt.$_POST['pass']);
        if ( $check == $stored_hash ) {
            error_log("Login success ".$_POST['email']."\n", 3, "login.log");
            $_SESSION["account"] = $_POST["email"];
            // Redirect the browser to view.php
            header("Location: index.php");
            return;
        } else {
            error_log("Login fail ".$_POST['email']." $check\n", 3, "login.log");
            $_SESSION["error"] = "Incorrect password";
            header("Location: login.php");
        }
    }

    if ( isset($_SESSION["error"]) ) {
        header("Location: login.php");
        return;
    }
}
?>



<!DOCTYPE html>
<html>
<head>
<?php require_once "bootstrap.php"; ?>
<title>Xiaoban Wu's Login Page</title>
</head>
<body>
<div class="container">
<h1>Please Log In</h1>
<?php
    if ( isset($_SESSION["error"]) ) {
        echo('<p style="color:red">'.$_SESSION["error"]."</p>\n");
        unset($_SESSION["error"]);
    }
?>


<form method="POST">
<label for="nam">User Name</label>
<input type="text" name="email" id="nam"><br/>
<label for="id_1723">Password</label>
<input type="text" name="pass" id="id_1723"><br/>
<input type="submit" value="Log In">
<a href="index.php">Cancel</a>
</form>

<p>
For a password hint, view source and find a password hint
in the HTML comments.
</p>
</div>
</body>
