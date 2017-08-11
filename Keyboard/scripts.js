var sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
var sentIndex = -1;
var charIndex = 0;

var startTime;
var mistakes = 0;

$(document).ready(function () {
    $("#keyboard-upper-container").hide();
    displayNextSentence();
    startTime = new Date();
});

$(document).keydown(function (e) {
    if (e.which == 16) {
        $("#keyboard-upper-container").show();
        $("#keyboard-lower-container").hide();
    }
});

$(document).keyup(function (e) {
    if (e.which == 16) {
        $("#keyboard-upper-container").hide();
        $("#keyboard-lower-container").show();
    }
});

$(document).keypress(function (e) {
    $("#" + e.which).css('backgroundColor', 'yellow');

    if (sentences[sentIndex].charAt(charIndex) == String.fromCharCode(e.keyCode)) {
        $("#feedback").append($("<span class='glyphicon glyphicon-ok' aria-hidden='true'></span>"));
    } else {
        mistakes++;
        $("#feedback").append($("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>"));
    }
    moveCarat();
    var which = e.which;
    $(document).keyup(function (e) {
        $("#" + which).css('backgroundColor', "#F5F5F5");
    })
});

function moveCarat() {
    charIndex++;
    if (charIndex >= sentences[sentIndex].length) {
        displayNextSentence();
    } else {
        $("#yellow-block").css("left", "+=20.5px");
        $("#target-letter").text(sentences[sentIndex].charAt(charIndex));
    }
}

function displayNextSentence() {
    sentIndex++;
    if (sentIndex >= sentences.length) {
        endGame();
    } else {
        $("#sentence").text(sentences[sentIndex]);
        charIndex = 0;
        $("#yellow-block").css("left", "17.5px");
        $("#target-letter").text(sentences[sentIndex].charAt(charIndex));
        $("#feedback").empty();
    }
}

function endGame() {
    var endTime = new Date();
    var wpm = 54 / (endTime.getMinutes() - startTime.getMinutes()) - 2 * mistakes;
    if(confirm("Congratulations, you won! WPM: " + wpm)) {
        location.reload();
    } else {
        location.href = "Http://google.com";
    }
}