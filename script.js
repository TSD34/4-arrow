let key = ["↑", "←", "↓", "→"];
let keycode = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];
let keynumber = 0;
let deta = {};
deta.total = 0
deta.hit = 0
deta.miss = 0
deta.time = 0
function start() {
    let step = 0;
    let x = -208;
    let mx = 0;
    function move() {
        if (step < 24) {
            mx ++
            x = x + mx
            document.getElementById("startimg").style.top = x + "px";
            step ++
            setTimeout(move, 20);
        } else if (step < 48) {
            if (step == 24) {
                mx = -12
            }
            mx ++
            x = x + mx
            document.getElementById("startimg").style.top = x + "px";
            step ++
            setTimeout(move, 20);
        } else if (step == 48) {
            setTimeout(move, 750);
            step ++
        } else if (step == 49) {
            document.getElementById("startbutton").style.display = "block"
        }
    }
    move();
}
function game() {
    document.getElementById("start").style.display = "none"
    document.getElementById("game").style.display = "block"
    document.getElementById("countdown").style.opacity = 1;
    let step = 1;
    let img = 3;
    first();
    function first() {
        if (step === 80) {
            document.getElementById("first").style.display = "none"
            second();
        } else {
            if (step % 20 === 0) {
                img -= 1
                document.getElementById("countdown").src = "img/" + img + ".png"
                document.getElementById("countdown").style.opacity = 1;
                if (img === 0) {
                    document.getElementById("countdown").style.width = "257px"
                }
            } else {
                document.getElementById("countdown").style.opacity -= 0.05;
            }
            step ++
            setTimeout(first, 50);
        }
    }
    function second() {
        document.getElementById("second").style.display = "block";
        const startTime = Date.now();
        function a(t) {
            if (deta.hit === 40) {
                const endTime = Date.now();
                deta.time = endTime - startTime
                document.getElementById("second").style.display = "none"
                document.removeEventListener("keydown", a)
                third();
            } else {
                document.getElementById("number").innerText = ( deta.hit + 1 ) + "/40"
                if (t.code === keycode [keynumber]) {
                    keynumber ++
                    keynumber = keynumber % 4
                    deta.hit ++
                    deta.total ++
                    document.getElementById("key").innerText = key [keynumber]
                } else  if (keycode.find(element => element = t.code) !== undefined) {
                    deta.miss ++
                    deta.total ++
                }
            }
        }
        document.addEventListener("keydown", a)
    }
    function third() {
        document.getElementById("third").style.display = "block"
        document.getElementById("score").innerText = "Score:" + Math.round(( 1000 / deta.time ) ** 2 * 10000)
        document.getElementById("time").innerText = "時間:" + Math.round(deta.time / 10) / 100 + "s"
        document.getElementById("speed").innerText = "KPM:" + Math.round(240000 / deta.time * 10) / 10
        document.getElementById("accuracy").innerText = "正確率:" + Math.round(deta.hit / deta.total * 1000) / 10 + "%"
        let t = 0;
        let u = 1;
        process();
        function process() {
            switch (t) {
                case 0:
                    document.getElementById("time").style.opacity = u / 10
                    if (u === 1) {
                        document.getElementById("time").style.display = "block"
                    }
                    if (u === 10) {
                        t = 1
                        u = 1
                    } else {
                        u ++
                    }
                    setTimeout(process, 50);
                    break;
                case 1:
                    document.getElementById("speed").style.opacity = u / 10
                    if (u === 1) {
                        document.getElementById("speed").style.display = "block"
                    }
                    if (u === 10) {
                        t = 2
                        u = 1
                    } else {
                        u ++
                    }
                    setTimeout(process, 50);
                    break;
                case 2:
                    document.getElementById("accuracy").style.opacity = u / 10
                    if (u === 1) {
                        document.getElementById("accuracy").style.display = "block"
                    }
                    if (u === 10) {
                        t = 3
                        u = 1
                    } else {
                        u ++
                    }
                    setTimeout(process, 50);
                    break;
                case 3:
                    document.getElementById("score").style.opacity = u / 10
                    if (u === 1) {
                        document.getElementById("score").style.visibility = "visible"
                    }
                    if (u !== 10) {
                        u ++
                        setTimeout(process, 50);
                    }
                    break;
            }
        }
    }
}