window.onload = function() {
    setMain();

    var onoff = false;
    var papers = Array.from(document.querySelectorAll(".paper"));
    var navs = Array.from(document.querySelectorAll(".nav li"));
    var myaudio = document.getElementById("myaudio");
    var playBtn = document.querySelector(".music");
    var as = Array.from(document.getElementsByTagName("a"));
    as.forEach(e => {
        e.onclick = function(ev) {
            ev.stopPropagation ? ev.stopPropagation() : ev.cancelable = true;
        }
    })
    setTimeout(function() {
        myaudio.play();
    }, 1000)
    myaudio.volume = 0.1;
    playBtn.onclick = function() {
        myaudio.paused ? myaudio.play() : myaudio.pause();
        myaudio.paused ? playBtn.classList.remove("play") : playBtn.classList.add("play");
    }

    papers.forEach((e, i) => {
        e.style.zIndex = papers.length - 1 - i;
        e.onclick = function() {
            turnPage(e, i);
        }
    });

    function turnPage(e, i) {
        var timer = null;
        var timer2 = null;
        if (!onoff) {
            onoff = true;
            if (!e.dataset.click || e.dataset.click == "no") {
                var numY = 0;
                var numZ = 0;
                papers.forEach(e => e.style.left = "50%");
                if (i == papers.length - 1) papers.forEach(e => e.style.left = "66%");
                e.dataset.click = "yes";
                timer = setInterval(function() {
                    numY++;
                    numZ = parseFloat(numZ.toFixed(2)) + 0.1;
                    if (numY > 90) { clearInterval(timer) };
                    e.style.transform = "rotateY(" + (-numY) + "deg) skewY(" + (-numZ) + "deg)";
                }, 10);
                setTimeout(function() {
                    numZ = parseFloat(numZ.toFixed(2)) - 0.1;
                    timer2 = setInterval(function() {
                        numZ = parseFloat(numZ.toFixed(2)) - 0.1;
                        e.style.transform = "rotateY(" + (-numY) + "deg) skewY(" + (-numZ) + "deg)";
                        numY++;
                        if (numY > 180) { clearInterval(timer2) };
                    }, 10);
                    setTimeout(function() {
                        getComputedStyle(e).zIndex == i ? e.style.zIndex = papers.length - 1 - i : e.style.zIndex = i;
                        e.querySelector(".leftPage").classList.toggle("act");
                    }, 10);
                    setTimeout(function() {
                        onoff = false;
                    }, 500);
                }, 1000)
            } else {
                var numY = 180;
                var numZ = 0;
                e.dataset.click = "no";
                papers.forEach(e => e.style.left = "50%");
                if (i == 0) papers.forEach(e => e.style.left = "33%");
                timer = setInterval(function() {
                    numY--;
                    numZ = parseFloat(numZ.toFixed(2)) + 0.1;
                    if (numY < 90) { clearInterval(timer) };
                    e.style.transform = "rotateY(" + (-numY) + "deg) skewY(" + (-numZ) + "deg)";
                }, 10);
                setTimeout(function() {
                    numZ = parseFloat(numZ.toFixed(2)) - 0.1;
                    timer2 = setInterval(function() {
                        numZ = parseFloat(numZ.toFixed(2)) - 0.1;
                        e.style.transform = "rotateY(" + (-numY) + "deg) skewY(" + (-numZ) + "deg)";
                        numY--;
                        if (numY < 0) { clearInterval(timer2) };
                    }, 10);
                    setTimeout(function() {
                        getComputedStyle(e).zIndex == i ? e.style.zIndex = papers.length - i : e.style.zIndex = i;
                        e.querySelector(".leftPage").classList.toggle("act");
                    }, 10);
                    setTimeout(function() {
                        onoff = false;
                    }, 500);
                }, 1000)
            }
        }
    }






}