var playing = false;
var score;
var trialsleft;
var step;
var action;
var fruits = [
  "apple",
  "banana",
  "cherries",
  "grapes",
  "mango",
  "orange",
  "peach",
  "pear",
  "watermelon"
];
$(function() {
  $("#startreset").click(function() {
    if (playing) {
      location.reload();
    } else {
      playing = true;
      score = 0;
      $("#scorevalue").html(score);
      $("#trialsleft").show();
      trialsleft = 3;
      addHearts();
      $("#gameover").hide();
      $("#startreset").html("Reset Game");
      startAction();
    }
  });
  $("#fruit1").mouseover(function() {
    score++;
    $("#scorevalue").html(score);
    // document.getElementById("slicesound").play();
    $("#slicesound")[0].play();
    clearInterval(action);
    $("#fruit1").hide("explode", 500);
    // startAction();
    setTimeout(startAction, 800);
  });
  $("#fruit1").on('touchstart',function() {
    score++;
    $("#scorevalue").html(score);
    // document.getElementById("slicesound").play();
    $("#slicesound")[0].play();
    clearInterval(action);
    $("#fruit1").hide("explode", 500);
    // startAction();
    setTimeout(startAction, 800);
  });
  function addHearts() {
    $("#trialsleft").empty();
    for (i = 0; i < trialsleft; i++) {
      $("#trialsleft").append(' <img src =images/heart.png class = "life"> ');
    }
  }
  function startAction() {
    $("#fruit1").show();
    chooseFruit();
    $("#fruit1").css({
      'left': Math.round(Math.random() * 550),
      'top': -50
    });
    step = 1 + Math.round(Math.random() * 5);
    action = setInterval(function() {
      $("#fruit1").css("top", $("#fruit1").position().top + step);
      if ($("#fruit1").position().top > $("#fruitcontainer").height()) {
        if (trialsleft > 1) {
          $("#fruit1").show();
          chooseFruit();
          $("#fruit1").css({
            'left': Math.round(Math.random() * 550),
            'top': -50
          });
          step = 1 + Math.round(Math.random() * 5);
          trialsleft--;
          addHearts();
        } else {
          playing = false;
          $("#startreset").html("Start Game");
          $("#gameover").show();
          $("#gameover").html(
            "<p style='padding-top: 50px'>Game Over</p><p>Your score is " + score + "</p>"
          );
          $("#trialsleft").hide();

          stopAction();
        }
      }
    }, 10);
  }
  function chooseFruit() {
    $("#fruit1").attr(
      "src",
      "images/" + fruits[Math.round(Math.random() * 8)] + ".png"
    );
  }
  function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
  }
});
