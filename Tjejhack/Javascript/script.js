//Här kan man lätt ändra datum och tid för när nästa tjejhack är.
var countDownDate = new Date("May 29, 2019 12:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);


//Frågorna för Quizen | q= fråga | o= alternativ | a= svar | Enkelt att lägga till fler frågor
var questions = [
  {
    q : "Programspråket Python har fått sitt namn från...",
    o : [
      "Ormen",
      "Monty Python",
      "Lukten"     
    ],
    a : 1
  },
  {
    q : "Vilket bibliotek använder man när man ritar med Python?",
    o : [
      "Turtle",
      "Paint",
      "Draw"     
    ],
    a : 0
  },
  {
    q : "Vilken typ av programmering gör man med Python?",
    o : [
      "Blockprogrammering",
      "Textprogrammering",
      "Analog programmering",
    ],
    a : 1
  }
];


//Quiz-funktionen

var quiz = {
  draw : function () {
  // quiz.draw() : draw the quiz

    // Fetch the HTML quiz wrapper
    var wrapper = document.getElementById("quiz-wrap");

    // Loop through all the questions
    // Create all the necessary HTML elements
    for (var index in questions) {
      var number = parseInt(index) + 1; // The current question number
      var qwrap = document.createElement("div"); // A div wrapper to hold this question and options
      qwrap.classList.add("question"); // CSS class, for cosmetics

      // The question - <h1> header
      var question = document.createElement("p");
      question.innerHTML = number + ") " + questions[index]['q'];
      qwrap.appendChild(question);

      // The options - <input> radio buttons and <label>
      for (var oindex in questions[index]['o']) {
        // The <label> tag
        var label = document.createElement("label");
        qwrap.appendChild(label);

        // The <option> tag
        var option = document.createElement("input");
        option.type = "radio";
        option.value = oindex;
        option.required = true;
        option.classList.add("oquiz"); // Will explain this later in function submit below

        // Remember that a radio button group must share the same name
        option.name = "quiz-" + number;
        label.appendChild(option);

        // Add the option text
        var otext = document.createTextNode(questions[index]['o'][oindex]);
        label.appendChild(otext);
      }

      // Finally, add this question to the main HTML quiz wrapper
      wrapper.appendChild(qwrap);
    }

    // Attach submit button + event handler to the quiz wrapper
    var submitbutton = document.createElement("input");
    submitbutton.type = "submit";
    wrapper.appendChild(submitbutton);
    wrapper.addEventListener("submit", quiz.submit);
  },

  submit : function (evt) {
  // quiz.submit() : Handle the calculations when the user submits to quiz

    // Stop the form from submitting
    evt.preventDefault();
    evt.stopPropagation();

    // Remember that we added an "oquiz" class to all the options?
    // We can easily get all the selected options this way
    var selected = document.querySelectorAll(".oquiz:checked");

    // Get the score
    var score = 0;
    for (var index in questions) {
      if (selected[index].value == questions[index]['a']) {
        score++;
      }
    }

    // We can calculate the score now
    var total = selected.length;
    var percent = score / total ;

    // Update and show the score
    // Instead of creating elements, we can also directly alter the inner HTML
    var html = "<h1>";
    if (percent>=0.7) {
      html += "Bra jobbat!";
    } else if (percent>=0.4) {
      html += "Inte illa!";
    } else {
      html += "Försök igen";
    }
    html += "</h1>";
    html += "<div>Du fick " + score + " utav " + total + " rätt" + ".</div>";
    html += "<div>Vill du lära dig mer om programmering kan du besöka Frippes youtubekanal <i> Fredrik Johansson</i> eller besöka <i>Codecademy.com</i> " + "</div>";
    document.getElementById("quiz-wrap").innerHTML = html;
  }
};

/* [INIT] */
window.addEventListener("load", quiz.draw);