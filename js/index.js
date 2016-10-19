$(document).ready(function(){
  
  // establish vars
  
  var sessionLength = 25;
  var breakLength = 5;
  var clockStatus = "off";
  var sessionTimeLeft = 0;
  var breakTimeLeft = 0;
  var displayTime = 0;
  var stage = "session";
  
  // update vars and display via sliders
  
  $("#sessionlen").on('input',function(){
    if (clockStatus !== "on") {
      sessionLength = $("#sessionlen").val();
      $("#sessionvaldisplay").html(sessionLength + " min");
      $("#timedisplay").html(sessionLength + ":00");
    }
  });
  
  $("#breaklen").on('input',function(){
    if (clockStatus !== "on") {
      breakLength = $("#breaklen").val();
      $("#breakvaldisplay").html(breakLength + " min");
    }
  });
  
  // calculate and display remaining time
  
  function displayRemainingTime(seconds){
    displayTime = Math.floor(seconds / 60) + ":" + Math.floor(seconds % 60);
    $("#timedisplay").html(displayTime);
    
    // progress bar
    
    if (sessionTimeLeft > 0){
      $("#startbutton").html("Work!");
      var progressAmount = (100 - (sessionTimeLeft/(sessionLength*60)*100)) + "%";
      $(".workprogress").css("width",progressAmount);
      $("#progressbar").addClass("workprogress");
    }
    else {
      $("#startbutton").html("Break!");
      var progressAmount = (breakTimeLeft/(breakLength*60)*100) + "%";
      $(".workprogress").css("width","100%");
      $("#progressbar").removeClass("workprogress");
      $(".breakprogress").css("width",progressAmount);
      $("#progressbar").addClass("breakprogress");
    }
  }
  
  var timeVar;
  function Countdown(){
    timeVar = setInterval(UpdateTimeDisplay,1000);
  }
  
  function UpdateTimeDisplay(){
    if (sessionTimeLeft == 0) {
     // $("#timedisplay").addClass("lowtime");
      displayRemainingTime(sessionTimeLeft);
      
      if (breakTimeLeft == 0){
        $("#timedisplay").addClass("donetime");
        displayRemainingTime(breakTimeLeft);
        clearInterval(timeVar);
        $("#startbutton").html("Back to work?");
        }
      else if (breakTimeLeft < 6 && breakTimeLeft > 0){
       // $("#timedisplay").toggleClass("donetime");
        breakTimeLeft--;
        displayRemainingTime(breakTimeLeft);
        }
      else {
        breakTimeLeft--;
        displayRemainingTime(breakTimeLeft);
        }
      }
    
    else if (sessionTimeLeft < 6 && sessionTimeLeft > 0) {
    //  $("#timedisplay").toggleClass("lowtime");
      sessionTimeLeft--;
      displayRemainingTime(sessionTimeLeft);
    }
    else {
      sessionTimeLeft--;
      displayRemainingTime(sessionTimeLeft);
    }
  }
  
  // start/reset button function
  
  $("#startbutton").click(function(){
    if (clockStatus === "off"){
        clockStatus = "on";
        }
    $(".start").addClass("startactive");
    $("#timedisplay").removeClass("lowtime");
    $("#timedisplay").removeClass("donetime");
    $("#progressbar").removeClass("workprogress");
    $("#progressbar").removeClass("breakprogress");
    sessionTimeLeft = sessionLength * 60;
    breakTimeLeft = breakLength * 60;
    Countdown();
  });
  
  
  
  $("#resetbutton").click(function(){
    clockStatus = "off";
    clearInterval(timeVar);
    sessionLength = $("#sessionlen").val();
    breakLength = $("#breaklen").val();
    $(".start").removeClass("startactive");
    $("#timedisplay").removeClass("lowtime");
    $("#timedisplay").removeClass("donetime");
    $("#sessionvaldisplay").html(sessionLength + " min");
    $("#timedisplay").html(sessionLength + ":00");
    $("#breakvaldisplay").html(breakLength + " min");
    $("#startbutton").html("Start");
    $(".workprogress").css("width","0%");
    $(".breakprogress").css("width","0%");
    $(".progress").css("width","0%");
    $("#progressbar").removeClass("workprogress");
    $("#progressbar").removeClass("breakprogress");
  });
  
  
  
  
});