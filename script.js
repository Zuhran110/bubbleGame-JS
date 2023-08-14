var timer = 6;
var score = 0;
var hitrn=0;

function increaseScore() {
    score += 10;
    document.querySelector("#scoreVal").textContent = score;
}

function bubble() {
    let clutter = "";

    for (var i = 0; i <= 149; i++) {
        let line = Math.floor(Math.random() * 10);
        clutter += `<div class="bubble">${line}</div>`;
    }

    document.querySelector("#bbtm").innerHTML = clutter;
}

function runTimer() {
    var timerInt = setInterval(function () {
        if (timer > 0) {
            timer--;
            document.querySelector("#timerVal").textContent = timer;
        } else {
            clearInterval(timerInt);
            document.querySelector("#bbtm").innerHTML = `<h1>Game Over<h1>`;
        }
    }, 1000);
}

function hitVal() {
    hitrn = Math.floor(Math.random() * 10);
    document.querySelector("#hitVal").textContent = hitrn;
}

document.querySelector("#bbtm").
    addEventListener("click", function(dets) {
        var clickNum=(Number(dets.target.textContent));
        if(clickNum===hitrn){
            increaseScore();
            bubble();
            hitVal();
        }
    });

bubble();
runTimer();
hitVal();
