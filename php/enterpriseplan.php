<?php 
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $country = $_POST['country'];
    $mailFrom = $_POST['email'];
    $size = $_POST['companysize'];
    $companysize = "0 - 9";

    if ($size == 2) {
        $companysize = "10 - 29";
    }
    else
    {
        if ($size == 3) {
            $companysize = "30 - 49";
        }
        else
        {
            if ($size == 4) {
                $companysize = "50 - 99";
            }
            else
            {
                if ($size == 5) {
                    $companysize = "100+";
                }
            }
        }
    }

    $mailTo = "support@bartium.io";
    $subject = "Bartium: ".$firstName." ".$lastName;
    $headers = "From: ".$mailFrom;
    $txt = "Enterprise plan:\n".$firstName." ".$lastName.", ".$mailFrom.", ".$country."\n"."Company size: ".$companysize;

    mail($mailTo, $subject, $txt, $headers);
    header("Location: https://bartium.io/submitted")
?>