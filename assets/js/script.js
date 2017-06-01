
var APIkey = "dc6zaTOxFJmzC";
var animals = ["doggo", "cat", "squirrel", "seal"];

    // Function for displaying animal data
    function renderButtons() {

      // Deleting the animal buttons prior to adding new animal buttons
      // (this is necessary otherwise we will have repeat buttons)
      $("#buttonSection").empty();

      // Looping through the array of animals
      for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("animal");
        // Adding a data-attribute with a value of the animal at index i
        a.attr("data-name", animals[i]);
        // Providing the button's text with a value of the animal at index i
        a.text(animals[i]);
        // Adding the button to the HTML
        $("#buttonSection").append(a);
      }
    };

    // This function handles events where one button is clicked
    $("#add-animal").on("click", function(event) {
      event.preventDefault();

      // This line grabs the input from the textbox
      var newAnimal = $("#animal-input").val().trim();

      // The movie from the textbox is then added to our array
      animals.push(newAnimal);

      // Calling renderButtons which handles the processing of our movie array
      renderButtons();
    });

    renderButtons();