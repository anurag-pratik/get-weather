var aud = new Audio("/beep.mp3");

$(".btn").on("click", function(){
    aud.play();
});