let countryboxes = document.getElementsByName("country");
    for (let i = 0; i < countryboxes.length; i++) {
      autocomplete(countryboxes[i], countries);
      
    }

    // autocomplete(document.getElementById("country"), countries);
