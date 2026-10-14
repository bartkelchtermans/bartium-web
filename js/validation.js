document.getElementById ("drop_reach_out").addEventListener ("click", ShowReachOut, false);
document.getElementById ("drop_bug_report").addEventListener ("click", ShowBugReport, false);
document.getElementById ("drop_enterprise").addEventListener ("click", ShowEnterprisePlan, false);
document.getElementById ("drop_custom").addEventListener ("click", ShowCustomPlan, false);
document.getElementById ("drop_feature_request").addEventListener ("click", ShowFeatureRequest, false);

function HideForms() 
{
    document.getElementById("reach_out").setAttribute('style', 'display:none');
    document.getElementById("bug_report").setAttribute('style', 'display:none');
    document.getElementById("enterprise_plan").setAttribute('style', 'display:none');
    document.getElementById("custom_plan").setAttribute('style', 'display:none');
    document.getElementById("feature_request").setAttribute('style', 'display:none');
}

function SetAllInactive()
{
    let children = document.getElementById("drop_reach_out").parentElement.childNodes;

    for (let i = 0; i < children.length; i++) {
        if (children[i].tagName != "SPAN") continue;
        children[i].setAttribute('class', 'dropdown-item');
    }
}

function ShowReachOut (){

    // Form
    HideForms();
    document.getElementById("reach_out").setAttribute('style', 'display:block');
    
    // Dropdown
    document.getElementById("dropdownMenuButton").innerHTML = "Reach out";

    // Body content
    document.getElementById("contact_body").innerHTML = "We love to hear what our users are thinking!";

    // Change active element
    SetAllInactive();
    document.getElementById('drop_reach_out').setAttribute('class', 'dropdown-item active');

    // Change width
    document.getElementById("dropdownMenuButton").parentElement.setAttribute('style', 'width: 28%; margin-left: 36%; margin-bottom: 15px;');
}

function ShowBugReport (){

    // Form
    HideForms();
    document.getElementById("bug_report").setAttribute('style', 'display:block');
    
    // Dropdown
    document.getElementById("dropdownMenuButton").innerHTML = "Bug report";

    // Body content
    document.getElementById("contact_body").innerHTML = "Sorry to hear you've experienced some unwanted behavior, let's fix this!";

    // Change active 
    SetAllInactive();
    document.getElementById('drop_bug_report').setAttribute('class', 'dropdown-item active');

    // Change width
    document.getElementById("dropdownMenuButton").parentElement.setAttribute('style', 'width:30%; margin-left: 35%; margin-bottom: 15px;');
}

function ShowEnterprisePlan (){

    // Form
    HideForms();
    document.getElementById("enterprise_plan").setAttribute('style', 'display:block');
    
    // Dropdown
    document.getElementById("dropdownMenuButton").innerHTML = "Request an Enterprise plan";

    // Body content
    document.getElementById("contact_body").innerHTML = "Let's improve the workflow of your company!";

    // Change active element
    SetAllInactive();
    document.getElementById('drop_enterprise').setAttribute('class', 'dropdown-item active');

    // Change width
    document.getElementById("dropdownMenuButton").parentElement.setAttribute('style', 'width: 63%; margin-left: 20%; margin-bottom: 15px;');
}

function ShowCustomPlan (){

    // Form
    HideForms();
    document.getElementById("custom_plan").setAttribute('style', 'display:block');
    
    // Dropdown
    document.getElementById("dropdownMenuButton").innerHTML = "Request a custom plan";

    // Body content
    document.getElementById("contact_body").innerHTML = "Tell us what you had in mind!";

    // Change active element
    SetAllInactive();
    document.getElementById('drop_custom').setAttribute('class', 'dropdown-item active');

    // Change width
    document.getElementById("dropdownMenuButton").parentElement.setAttribute('style', 'width: 54%; margin-left: 23%; margin-bottom: 15px;');    // Change active element

    // Change width
}

function ShowFeatureRequest (){

    // Form
    HideForms();
    document.getElementById("feature_request").setAttribute('style', 'display:block');
    
    // Dropdown
    document.getElementById("dropdownMenuButton").innerHTML = "Feature request";

    // Body content
    document.getElementById("contact_body").innerHTML = "Have a really cool idea or would you like to see a specific feature implemented? Let us know!";

    // Change active element
    SetAllInactive();
    document.getElementById('drop_feature_request').setAttribute('class', 'dropdown-item active');

    // Change width
    document.getElementById("dropdownMenuButton").parentElement.setAttribute('style', 'width: 41%; margin-left: 29%; margin-bottom: 15px;');
}