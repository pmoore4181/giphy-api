
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

      // The animal from the textbox is then added to our array
      animals.push(newAnimal);

      if (newAnimal == "") {
        alert("Type in an animal, please");
      }

      // Calling renderButtons which handles the processing of our animals array
      renderButtons();
    });

    renderButtons();

    // Retrieve the JSON data for each button and put it on page
    function retrieveGifInfo() {

      var animalButton = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q=" + animalButton  + "&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        $("#animalGifs").empty();
        console.log(response);
        for (var i = 0; i<=9; i++){
            var stillGif = response.data[i].images.original_still.url;
            var movingGif = response.data[i].images.original.url;
            var gifRating = response.data[i].rating;
            $("#animalGifs")
                .append("<div class='gifRating'>Rating: " + gifRating + "</div>")
                .append("<img class='gif' data-state='still' src='" + stillGif + "' data-still='" + stillGif + "' data-animate='" + movingGif + "'>");
        }

        $(".gif").on("click", function() {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });

      });

    }
    



//  ===================  Use this to make it work! ====================================



    













    $(document).on("click", ".animal", retrieveGifInfo);


