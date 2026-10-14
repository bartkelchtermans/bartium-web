<?php 
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $country = $_POST['country'];
    $mailFrom = $_POST['email'];
    $plan = $_POST['plan'];
    $message = $_POST['message'];
    $planname = "Basic";

    if ($plan == 2) {
        $planname = "Enterprise";
    }

    $mailTo = "support@bartium.io";
    $subject = "Bartium: ".$firstName." ".$lastName;
    $headers = "From: ".$mailFrom;
    $txt = "Feature request:\n".$firstName." ".$lastName.", ".$mailFrom.", ".$country."\n"."Plan: ".$planname."\n\n".$message;

    mail($mailTo, $subject, $txt, $headers);
    header("Location: https://bartium.io/submitted")
?>