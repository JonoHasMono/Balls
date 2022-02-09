const version = "0.0.1"

const bodyvar = document.createElement('div');
document.body.appendChild(bodyvar)

let yourMomVal = false;
let yourMom = document.createElement('div');
yourMom.classList.add('yourMom');
yourMom.innerHTML = 'Your Mom'

let startButton = document.createElement('div');
startButton.innerHTML = 'START';
startButton.setAttribute('class', 'start');
startButton.addEventListener('click', startGame);
bodyvar.appendChild(startButton);
let startButtonClicked = false;

let background = document.createElement('div');
background.setAttribute('class', 'background');

let enemy = document.createElement('div');

let playerCube = document.createElement('div');
playerCube.classList.add('player');

let clickArea = document.createElement('div');
clickArea.classList.add('clickArea');

let blankCost = ''
let upgradeCostVis = document.createElement('div');
upgradeCostVis.classList.add('upgradeCost');
let upgradeDescVis = document.createElement('div');
upgradeDescVis.classList.add('upgradeDesc');
bodyvar.appendChild(upgradeCostVis);
bodyvar.appendChild(upgradeDescVis);

let upgradeColor = '';
let upgradeLetter = '';
let desc1 = '';

let upRedValue = 0;
let upRedCost = 50;
let upRedDesc = 'Unlock an upgrade for your weapon';
let upgradeRed = document.createElement('div');
upgradeRed.classList.add('upRed')
let upRed1 = "Quickfire"
let upRed1Desc = "Every shot has a chance to quickly fire off multiple shots"

let upgradeBG = document.createElement('div');
upgradeBG.classList.add('upBG');
upgradeBG.addEventListener('mouseover', function() {
    upgradeCostVis.innerHTML = 'Choose your upgrade';
    upgradeDescVis.innerHTML = '';
})


let bulletType = 'Basic'
let bulletVal = 1;
let money = 0;
let moneyVis = document.createElement('div');

function startGame() {
    if(startButtonClicked == false) {
        startButtonClicked = true;
        console.log(startButtonClicked);
        console.log('Start Button clicked');
        startButton.style.animation = 'disappear 0.1s ease 1';
        startButton.style.animationFillMode = 'forwards';
    
        setTimeout(() => {
            bodyvar.removeChild(startButton);
            moneyVis.classList.add('moneyAppear');
            setTimeout(() => {
                moneyVis.classList.remove('moneyAppear');
                moneyVis.classList.add('money');
                bodyvar.appendChild(clickArea);
                clickArea.addEventListener('click', chooseBullet);
            }, 1000);
            moneyVis.innerHTML = "$" + money
            bodyvar.appendChild(moneyVis)
        }, 200);

        setTimeout(() => {
            bodyvar.appendChild(enemy);
            enemy.classList.add('enemyAppear');
            setTimeout(() => {
                enemy.classList.remove('enemyAppear');
                enemy.classList.add('enemy')
            }, 1000);
        }, 200);

        bodyvar.appendChild(playerCube);
        playerCube.classList.add('playerAppear');
        setTimeout(() => {
            playerCube.classList.remove('playerAppear');
        }, 1000);

        function updateMoney() {
            moneyVis.innerHTML = "$" + (money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

            moneyVis.classList.add('moneyEarned');
            setTimeout(() => {
                moneyVis.classList.remove('moneyEarned');
            }, 250);
        }

        bodyvar.appendChild(upgradeRed);

        upgradeRed.addEventListener('mouseover', function() {
            showCost(upRedCost, upRedDesc);
        })
        upgradeRed.addEventListener ('mouseout', function() {
            showCost(blankCost, blankCost);
        })
        upgradeRed.addEventListener('click', function() {
            buyUpgrade(upgradeRed, upRedCost);
        })
        function showCost(x, y) {
            if(typeof x === "number") {
                upgradeCostVis.innerHTML = "$" + (x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                upgradeDescVis.innerHTML = y;
            } else {
                upgradeCostVis.innerHTML = ""
                upgradeDescVis.innerHTML = "";
            }
        }

        function buyUpgrade(x,y) {
            if(x == upgradeRed) {
                if(money >= y) {
                    money -= y;
                    updateMoney();
                    x.classList.add('upPurchase');
                    upRedValue++
                    setTimeout(() => {
                        x.classList.remove('upPurchase');
                    }, 1000);
                    chooseYourUpgrade(upgradeRed);
                }
            }
        }

        function chooseYourUpgrade(x) {
            bodyvar.appendChild(upgradeBG);
            if(x == upgradeRed) {
                upgradeColor = 'Red';
                upgradeLetter = "A";
                desc1 = upRed1Desc;
                }
                let upButton1 = document.createElement('div');
                upButton1.classList.add('upRedIcon');
                upButton1.style.left = '25%'
                upButton1.addEventListener('click',confirmUpgrade);
                upButton1.addEventListener('mouseover', function() {
                    upgradeDescVis.innerHTML = desc1;
                })
                bodyvar.appendChild(upButton1);
                let upButton1Img = document.createElement('img');
                upButton1Img.classList.add('upimg')
                upButton1Img.setAttribute('src','images/Upgrade ' + upgradeLetter + '1.png')
                upButton1.appendChild(upButton1Img);
    
                function confirmUpgrade() {

                }
            }
        


        document.addEventListener('keyup', logKey);

        function logKey(e) {
            let key = ` ${e.code}`
            key = key.toString();
            if (key == ' KeyF') {
                chooseBullet();
               } else if (key == ' KeyA') {
                updateMoney();
               } else if (key == ' KeyP') {
                   makeyourMom();
               } else if (key == ' KeyL') {
                   money = 1000000
               }
        }

        function makeyourMom() {
            if(yourMomVal == false) {
                yourMomVal = true;
                bodyvar.appendChild(yourMom);
            } else {
                yourMomVal = false;
                bodyvar.removeChild(yourMom);
            }
        }

        function chooseBullet() {
            if(bulletType == 'Basic') {
                fireWeapon1('basic')
            }
        }

        function fireWeapon1(x) {
            playerCube.classList.remove('playerFire');
            setTimeout(() => {
                playerCube.classList.add('playerFire');
            }, 1);
            setTimeout(() => {
                let bullet = document.createElement('div');
                bullet.classList.add(x);
                bullet.style.top = ((Math.random() * 3) + 48.5) + "%";
                bullet.style.left = 20 + "%"
                bodyvar.appendChild(bullet);
                let posX = 20;
                let bulletSpeed = 0;
                moveBullet()

                function moveBullet() {
                    if(posX <= 75) {
                        bulletSpeed += 0.02;
                        posX += bulletSpeed;
                        bullet.style.left = posX + "%";
                         setTimeout(() => {
                            moveBullet();
                         }, 5);
                    } else {
                        bodyvar.removeChild(bullet);
                        enemyHit();
                  }
                }
            }, 50);
        }
    }

    function enemyHit() {
        money += bulletVal;
        updateMoney();
        generateOof();
        makeHitParticles();
        enemy.classList.remove('enemy');
        enemy.classList.add('enemyHit');
        setTimeout(() => {
            enemy.classList.add('enemy');
            enemy.classList.remove('enemyHit');  
        }, 150);
    }

    function generateOof() {
        let oofText = document.createElement('div');
        oofText.classList.add('oofText');
        let randomX = (Math.random() * 10) + 7.5;
        let randomY = (Math.random() * 10) + 45;
        let randomSize = (Math.random() * 1) + 2;
        let rtNum = Math.ceil(Math.random() * 5)
        oofText.style.right = randomX + "%";
        oofText.style.top = randomY + "%";
        oofText.style.fontSize = randomSize + 'vw';
        if(rtNum == 1) {
            oofText.innerHTML = "Oof";
        } else if(rtNum == 2) {
            oofText.innerHTML = "Bro why";
        } else if(rtNum == 3) {
            oofText.innerHTML = "Ow";
        } else if(rtNum == 4) {
            oofText.innerHTML = "Dude stop";
        } else if(rtNum == 5) {
            oofText.innerHTML = "Ouch";
        } else {
            oofText.innerHTML = "Not cool";
        }
        bodyvar.appendChild(oofText);
        setTimeout(() => {
            bodyvar.removeChild(oofText);
        }, 1000);
    }

    function makeHitParticles() {
        let randomNum1 = (Math.floor(Math.random() * 3)) + 1
        for(i = 0; i < randomNum1; i++) {
            createParticle();
        }
        function createParticle() {
            let hitParticle = document.createElement('div');
            hitParticle.classList.add('hitParticle');
            let posX = 17.5;
            let posY = 50;
            let randomSpeedX = ((Math.random() * 2.5) - 1.25) * 0.9;
            if(randomSpeedX > 0) {
                randomSpeedX += 0.3;
            } else {
                randomSpeedX -= 0.3;
            }
            let randomSpeedY = ((Math.random() * 2.5) - 1.25) * 1.6;
            if(randomSpeedY > 0) {
                randomSpeedY += 0.5;
            } else {
                randomSpeedY -= 0.5;
            }
            let randomSize = (Math.random()) + 0.5;
            let randomRotation = Math.floor(Math.random());
            let rotationSpeed = 0;
            if(randomRotation > 0) {
                rotationSpeed = Math.random() * 40;
            } else {
                rotationSpeed = Math.random() * -40;
            }
            hitParticle.style.transform = 'translate(-50%,-50%) rotate(' + rotationSpeed + 'deg)';
            hitParticle.style.right = posX + '%';
            hitParticle.style.top = posY + '%';
            hitParticle.style.padding = randomSize + 'vw';
            bodyvar.appendChild(hitParticle);
            moveParticle();
            setTimeout(() => {
                bodyvar.removeChild(hitParticle);
            }, 1000);
            function moveParticle() {
                posX += randomSpeedX;
                posY += randomSpeedY;
                randomSpeedX *= 0.9;
                randomSpeedY *= 0.9;
                hitParticle.style.right = posX + '%';
                hitParticle.style.top = posY + '%';
                setTimeout(() => {
                    moveParticle();
                }, 5);
            }
        }
    }
}