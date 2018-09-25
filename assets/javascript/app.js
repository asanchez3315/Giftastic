var topic = ["Michael Jordan", "Hakeem Olujawon", "Magic Johnson", "Larry Bird", "Clyde Drexler", "Charles Barkley", "Kobe Bryant",
"wilt Chamberlin", "Bill Russel", "Russel Westbrook" ,"Kawhi Leonard", "Stephen Curry", "Allen Iverson", "Tracy Mgrady",
"Kevin Durant", "Patrick Ewing",  "Scottie Pippen", "Pete Maravich ",  ];

// displayGif function re-renders the HTML to display the appropriate content
function displayGif() {
  var Player = $(this).attr("data-name");
  // var Team = $(this).attr("data-name");
      // Constructing a queryURL using the Sports team name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      Player + "&api_key=tBjewixRIhL5xt8YQmSMF4Ef28noiBTJ&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function (response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var playerDiv = $("<div>");



          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var playerImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          // animalImage.attr("src", results[i].images.fixed_height.url);
          playerImage.attr("src", results[i].images.original_still.url)
          playerImage.addClass('gif-animate');
          playerImage.attr("data-still", results[i].images.original_still.url)
          playerImage.attr("data-animate", results[i].images.original.url)
          playerImage.attr("data-state", "still")

          // Appending the paragraph and image tag to the playerDiv
        playerDiv.append(p);
          playerDiv.append(playerImage);

          // Prependng the playerDiv to the HTML page in the "#gif-view" div
          $("#gif-view").prepend(playerDiv);
        }
      });
}
// Function for displaying player data
function renderButtons() {

  // Deleting the player prior to adding new players
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < topic.length; i++) {

    // Then dynamicaly generating buttons for each player in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var button = $("<button>");
    // Adding a class of movie-btn to our button
    button.addClass("gif-btn");
    // Adding a data-attribute
    button.attr("data-name", topic[i]);
    // Providing the initial button text
    button.text(topic[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(button);
  }
}

// This function handles events where a player button is clicked
$("#add-gif").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var player = $("#gif-input").val().trim();

  // Adding movie from the textbox to our array
  topic.push(player);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "gif-btn"
$(document).on("click", ".gif-btn", displayGif);
$(document).on("click", ".gif-animate", playPauseGif);

function playPauseGif() {

  var state = $(this).attr("data-state");
  var animateImage = $(this).attr("data-animate");
  var stillImage = $(this).attr("data-still");

  if (state == "still") {
    $(this).attr("src", animateImage);
    $(this).attr("data-state", "animate");
  }

  else if (state == "animate") {
    $(this).attr("src", stillImage);
    $(this).attr("data-state", "still");
  }
}

// Calling the renderButtons function to display the intial buttons
renderButtons();