

window.onload = function() {

        canvas = document.getElementById("jardin");
        if (!canvas) {
            alert("Unable to retrieve canvas");
            return;
        }
        contexte = canvas.getContext("2d");
        if (!contexte) {
            alert("Unable to retrieve canvas context");
            return;
        }
        document.addEventListener("keydown", keySprint);
        //speed
        denov = 5;
        vitesse = 1000 / denov;
        intervalID = setInterval(main, vitesse);

    }
   
snakeheadx = 25;
snakeheady = 25;
fruitx = 250;
fruity = 250;
largeur = hauteur = 25;
deplacex = 0;
deplacey = 0;

//head of snake
serpent = new Image();
serpent.src = "assets/images/snake/headd.png";
corps = new Image();
corps.src = "assets/images/serpent/body.png";
back = new Image();
back.src = "assets/images/interface/back.png";

//fruits
f1 = new Image();
f1.src = "assets/images/fruits/bananes.png";
f2 = new Image();
f2.src = "assets/images/fruits/orange.png";
f3 = new Image();
f3.src = "assets/images/fruits/lemon.png";
f4 = new Image();
f4.src = "assets/images/fruits/avoca.png";
f5 = new Image();
f5.src = "assets/images/fruits/mango.png";

//A Now, for the sake of logic, let's not let the snake do a half-turn on itself the variable turn
tour = 0;

depalcei = 500;

gamepause = false;

trace = [];
tailleTrace = 3;
fruits = [f1, f2, f3, f4, f5];
fruitsuivant = 3;

score = 0;
banane = 0;
bmaj = document.getElementById("bananescounter");
orange = 0;
omaj = document.getElementById("orangecounter");
lemon = 0;
lmaj = document.getElementById("lemoncounter");
avoca = 0;
amaj = document.getElementById("avocacounter");
mango = 0;
mmaj = document.getElementById("mangocounter");
scoremaj = document.getElementById("valeurscore");

collisionbody = false;
attenterand = 0;

centi = 0;
mili = 0;
sec = 0;
sec_ = 0;
m = 0;
n = 3;
startingMinutes = 3;
go = startingMinutes * 60;
afficher = n + ":" + m + "0";
energie = 0;
flou = 0;
posx = 200;
posy = 518;


// main function
function main() {



    //Le snake se deplace 
    snakeheadx += deplacex * largeur;
    snakeheady += deplacey * hauteur;

    // Game Over
    gameover();
    contexte.clearRect(0, 0, canvas.width, canvas.height); 
    contexte.fillStyle = "#DEB887";
    contexte.fillRect(0, 0, canvas.width, canvas.height);

    contexte.strokeStyle = 'red';
    contexte.strokeRect(0, 0, canvas.width, canvas.height)
    contexte.drawImage(back, 0, 0);


    for (var i = 0; i < trace.length; i++) {
       
        contexte.drawImage(corps, trace[i].snakeheadx, trace[i].snakeheady);
       
    }
    contexte.drawImage(serpent, snakeheadx, snakeheady);
    trace.push({ snakeheadx: snakeheadx, snakeheady: snakeheady });

    while (trace.length > tailleTrace) {
       
        trace.shift();

    }

    if (trace.length > 3) {
        for (var jo = 0; jo < trace.length - 1; jo++) {
            if ((trace[jo].snakeheadx == trace[trace.length - 1].snakeheadx) && (trace[jo].snakeheady == trace[trace.length - 1].snakeheady)) {
                collisionbody = true;
                gameover();
                break;
            }
        }
    }

    if (fruitx == snakeheadx && fruity == snakeheady) {
        document.getElementById('colis').play();
        energie++;
        if (fruitsuivant == 0) {
            banane++;
            bmaj.innerHTML = banane;
        }
        if (fruitsuivant == 1) {
            orange++;
            omaj.innerHTML = orange;
        }
        if (fruitsuivant == 2) {
            lemon++;
            lmaj.innerHTML = lemon;
        }
        if (fruitsuivant == 4) {
            mango++;
            mmaj.innerHTML = mango;
        }
        if (fruitsuivant == 3) {
            avoca++;
            amaj.innerHTML = avoca;
        }

        fruitsuivant = Math.trunc(Math.random() * 5); 

        flou = 1 + 60 - m;
        score += flou;
        majScore(score);
        m = 0;
        n = 3;
        go = startingMinutes * 60;
        tailleTrace++;

        fruitx = Math.round(Math.random() * (canvas.width - largeur) / largeur) * largeur;
        fruity = Math.round(Math.random() * (canvas.height - hauteur) / hauteur) * hauteur;
        for (var i = 0; i < trace.length; i++) {
            if (trace[i].snakeheadx == fruitx && trace[i].snakeheady == fruity) {
                fruitx = Math.round(Math.random() * (canvas.width - largeur) / largeur) * largeur;
                fruity = Math.round(Math.random() * (canvas.height - hauteur) / hauteur) * hauteur;
            }
        }

    }

    else {
        attenterand = attenterand + 2;
        if (attenterand > 100) {
            attenterand = 0;
            fruitx = Math.round(Math.random() * (canvas.width - largeur) / largeur) * largeur;
            fruity = Math.round(Math.random() * (canvas.height - hauteur) / hauteur) * hauteur;
            for (var i = 0; i < trace.length; i++) {
                if (trace[i].snakeheadx == fruitx && trace[i].snakeheady == fruity) {
                    fruitx = Math.round(Math.random() * (canvas.width - largeur) / largeur) * largeur;
                    fruity = Math.round(Math.random() * (canvas.height - hauteur) / hauteur) * hauteur;
                }
            }
            fruitsuivant = Math.trunc(Math.random() * 5); 
        }

    }

    if (fruitx > 500) {
        fruitx = 250;
    }
    if (fruitx < 5) {
        fruitx = 250;
    }
    if (fruity > 500) {
        fruity = 250;
    }
    if (fruity < 5) {
        fruity = 250;
    }
    contexte.drawImage(fruits[fruitsuivant], fruitx, fruity);

    //Le Chono;
    contexte.fillStyle = '#2c3e50';
    contexte.fillRect(0, 500, 525, 25);
    contexte.font = 'bold 20px sans-serif';
    contexte.strokeStyle = '#2c3e50';
    contexte.fillStyle = 'white';
    contexte.textBaseline = 'middle';

    contexte.strokeText('TIME: ' + n + ':' + m, posx, posy);
    contexte.fillText('TIME: ' + n + ':' + m, posx, posy);


    if (energie > 3) {
        energie = 0;

        clearInterval(intervalID);
        denov = denov + 1;
        vitesse = 1000 / denov;
        intervalID = setInterval(main, vitesse);
    }

}

//time function
function sablier() {
    if (go == 0) {
        go = startingMinutes * 60;
    }
    n = Math.floor(go / 60);
    m = go % 60;
    m = m < 10 ? '0' + m : m;
    go--;
    afficher = n + ":" + m;
}

function time() {
    mili++;

    if (mili < 10) {
        m = "0" + mili;
    } else {
        m = mili;
    }

    if (mili == 60) {
        sec++;
        if (sec < 10) {
            sec_ = "0" + sec;
        } else {
            sec_ = sec;
        }

        afficher = sec_ + ":" + m;
        n = sec_;
        mili = 0;
    } else { afficher = n + ":" + m; }
    
}


function gameover() {
    if (snakeheadx < -1 || snakeheadx > depalcei + 1 || snakeheady < -1 || snakeheady > depalcei - 1 || collisionbody == true) {

        contexte.font = 'bold 50px sans-serif';
        contexte.strokeStyle = '#2c3e50';
        contexte.fillStyle = 'white';
        contexte.textBaseline = 'middle';
        contexte.textAlign = 'center';
        contexte.strokeText('Game Over', canvas.width / 2, canvas.height / 2);
        contexte.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        contexte.fillStyle = 'white';
        contexte.strokeStyle = '#2c3e50';
        contexte.font = 'bold 20px sans-serif';
        contexte.strokeText('R pour rejouer !', canvas.width / 2 + 40, canvas.height / 2 + 40);
        contexte.fillText('R pour rejouer !', canvas.width / 2 + 40, canvas.height / 2 + 40);


        clearTime(intervalID);
        //window.location.reload();

    }
}


function majScore(s) {
    scoremaj.innerHTML = s;
}

function randfruits() {
    if (fruitsuivant == 0) {
        f1.src = "assets/images/snake/headd.png";

        fruitsuivant++;
    }
    if (fruitsuivant == 1) {
        f1.src = "assets/images/snake/headb.png";

        fruitsuivant++;
    }
    if (fruitsuivant == 2) {
        f1.src = "assets/images/snake/headh.png";

        fruitsuivant++;
    }
    if (fruitsuivant == 3) {
        f1.src = "assets/images/snake/headg.png";

        fruitsuivant++;
    } else {
        fruitsuivant = 0;
        f1.src = "assets/images/snake/headd.png";


    }

}

function pause() {


    if (!gamepause) {
        intervalID = clearInterval(intervalID);

        gamepause = true;
        contexte.font = 'bold 50px sans-serif';
        contexte.strokeStyle = 'red';
        contexte.fillStyle = 'white';
        contexte.textBaseline = 'middle';
        contexte.textAlign = 'center';
        contexte.strokeText('PAUSE', canvas.width / 2, canvas.height / 2);
        contexte.fillText('PAUSE', canvas.width / 2, canvas.height / 2);

    } else if (gamepause) {
        intervalID = setInterval(main, vitesse);

        gamepause = false;
    }
}


function keySprint(evenement) {
    sableintervalID = setInterval(sablier, 1000 / 2);
 
    switch (evenement.keyCode) {
        case 37: 
            deplacex = -1;
            deplacey = 0;
            serpent.src = "assets/images/snake/headg.png";
            tour = evenement.keyCode;
            break;

        case 38: 
            if (tour == 40) { break; }
            deplacex = 0;
            deplacey = -1;
            serpent.src = "assets/images/snake/headh.png";
            tour = evenement.keyCode;
            break;

        case 39: 
            deplacex = 1;
            deplacey = 0;
            serpent.src = "assets/images/snake/headd.png";
            tour = evenement.keyCode;
            break;

        case 40: 
            if (tour == 38) { break; }
            deplacex = 0;
            deplacey = 1;
            serpent.src = "assets/images/snake/headb.png";
            tour = evenement.keyCode;
            break;

        case 82: 
            denov = 5;
            vitesse = 1000 / denov;
       
            snakeheadx = 25;
            snakeheady = 25;
            fruitx = 250;
            fruity = 250;
            largeur = hauteur = 25;
            deplacex = 0;
            deplacey = 0;
        
            serpent = new Image();
            serpent.src = "assets/images/snake/headd.png";
            corps = new Image();
            corps.src = "assets/images/snake/body.png";
            back = new Image();
            back.src = "assets/images/interface/back.png";

            //les fruits
            f1 = new Image();
            f1.src = "assets/images/fruits/bananes.png";
            f2 = new Image();
            f2.src = "assets/images/fruits/orange.png";
            f3 = new Image();
            f3.src = "assets/images/fruits/lemon.png";
            f4 = new Image();
            f4.src = "assets/images/fruits/avoca.png";
            f5 = new Image();
            f5.src = "assets/images/iruits/mango.png";

            tour = 0;
            depalcei = 500;
            gamepause = false;
            trace = [];
            tailleTrace = 3;
            fruits = [f1, f2, f3, f4, f5];
            fruitsuivant = 3;
            score = 0;
            majScore(score);
            banane = 0;
            bmaj.innerHTML = banane;
            bmaj = document.getElementById("bananescounter");
            orange = 0;
            omaj.innerHTML = banane;
            omaj = document.getElementById("orangecounter");
            lemon = 0;
            lmaj.innerHTML = banane;
            lmaj = document.getElementById("lemoncounter");
            avoca = 0;
            amaj.innerHTML = banane;
            amaj = document.getElementById("avocacounter");
            mango = 0;
            mmaj.innerHTML = banane;
            mmaj = document.getElementById("mangocounter");
            scoremaj = document.getElementById("valeurscore");

            collisionbody = false;
            attenterand = 0;
            centi = 0;
            mili = 0;
            sec = 0;
            sec_ = 0;
            m = 0;
            n = 3;
            startingMinutes = 3;
            go = startingMinutes * 60;
            afficher = n + ":" + m + "0";
            energie = 0;
            flou = 0;
            posx = 200;
            posy = 518;

            break;
        case 80: 

            pause();
            break;

    }

}
