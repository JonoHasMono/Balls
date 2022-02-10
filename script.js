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

let ammoCount = document.createElement('div');
ammoCount.classList.add('ammoCount');

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
let desc2 = '';
let desc3 = '';
let upName1 = '';
let upName2 = '';
let upName3 = '';
let upgrade1Value = '';
let upgrade2Value = '';
let upgrade3Value = '';

let upRed1Active = false;
let upRed2Active = false;
let upRed3Active = false;

let laserCharge = 0;
let drillCharged = true;

let upRedValue = 0;
let upRedCost = 50;
let upRedDesc = 'Unlock an upgrade for your weapon';
let upgradeRed = document.createElement('div');
upgradeRed.classList.add('upRed')

let upRed1 = "Quickfire"
let upRed1Desc = "Every shot has a chance to quickly fire off multiple shots"
let upRed2 = "Laser Beam"
let upRed2Desc = "Every 10th shot fires a powerful laser beam"
let upRed3 = "Twin Drills"
let upRed3Desc = "Every shot has a chance to fire twin drills"

let upgradeBG = document.createElement('div');
upgradeBG.classList.add('upBG');
upgradeBG.addEventListener('mouseover', function() {
    upgradeCostVis.innerHTML = 'Choose your upgrade';
    upgradeDescVis.innerHTML = '';
})

let reloading = false;
let playerAmmo = 10;
let playerMaxAmmo = playerAmmo;
let reloadSpeed = 2000;
let bulletType = 'Basic'
let globalDmgVal = 1;
let bulletBasicVal = globalDmgVal;
let laserBeamVal = globalDmgVal * 5;
let dmissileVal = globalDmgVal * 3;
let money = 0;
let moneyVis = document.createElement('div');

function startGame() {
    if(startButtonClicked == false) {
        startButtonClicked = true;
        console.log(startButtonClicked);
        console.log('Start Button clicked');
        startButton.style.animation = 'disappear 0.1s ease 1';
        startButton.style.animationFillMode = 'forwards';
        updateAmmo();
    
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
        bodyvar.appendChild(ammoCount);
        ammoCount.classList.add('ammoCountAppear');
        setTimeout(() => {
            playerCube.classList.remove('playerAppear');
            ammoCount.classList.remove('ammoCountAppear');
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
                upgradeCostVis.innerHTML = "";
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
                upgradeValue = 'r';
                desc1 = upRed1Desc;
                upName1 = upRed1;
                desc2 = upRed2Desc;
                upName2 = upRed2;
                desc3 = upRed3Desc;
                upName3 = upRed3;
                }
                let upButton1 = document.createElement('div');
                upButton1.classList.add('up' + upgradeColor + 'Icon');
                upButton1.style.left = '25%'
                upButton1.addEventListener('click', function() {
                    upgrade1Value = upgradeValue + 1;
                })
                upButton1.addEventListener('click',confirmUpgrade);
                upButton1.addEventListener('mouseover', function() {
                    upgradeDescVis.innerHTML = desc1;
                    upgradeCostVis.innerHTML = upName1;
                })
                bodyvar.appendChild(upButton1);
                let upButton1Img = document.createElement('img');
                upButton1Img.classList.add('upimg')
                upButton1Img.setAttribute('src','images/Upgrade ' + upgradeLetter + '1.png')
                upButton1.appendChild(upButton1Img);
                
                
                let upButton2 = document.createElement('div');
                upButton2.classList.add('up' + upgradeColor + 'Icon');
                upButton2.style.left = '50%'
                upButton2.addEventListener('click', function() {
                    upgrade2Value = upgradeValue + 2;
                })
                upButton2.addEventListener('click',confirmUpgrade);
                upButton2.addEventListener('mouseover', function() {
                    upgradeDescVis.innerHTML = desc2;
                    upgradeCostVis.innerHTML = upName2;
                })
                bodyvar.appendChild(upButton2);
                let upButton2Img = document.createElement('img');
                upButton2Img.classList.add('upimg')
                upButton2Img.setAttribute('src','images/Upgrade ' + upgradeLetter + '2.png')
                upButton2.appendChild(upButton2Img);


                let upButton3 = document.createElement('div');
                upButton3.classList.add('up' + upgradeColor + 'Icon');
                upButton3.style.left = '75%'
                upButton3.addEventListener('click', function() {
                    upgrade3Value = upgradeValue + 3;
                })
                upButton3.addEventListener('click',confirmUpgrade);
                upButton3.addEventListener('mouseover', function() {
                    upgradeDescVis.innerHTML = desc3;
                    upgradeCostVis.innerHTML = upName3;
                })
                bodyvar.appendChild(upButton3);
                let upButton3Img = document.createElement('img');
                upButton3Img.classList.add('upimg')
                upButton3Img.setAttribute('src','images/Upgrade ' + upgradeLetter + '3.png')
                upButton3.appendChild(upButton3Img);
    
                function confirmUpgrade() {
                    bodyvar.removeChild(upgradeBG);
                    bodyvar.removeChild(upButton1);
                    upButton1.removeChild(upButton1Img);
                    bodyvar.removeChild(upButton2);
                    upButton2.removeChild(upButton2Img);
                    bodyvar.removeChild(upButton3);
                    upButton3.removeChild(upButton3Img);
                    upgradeCostVis.innerHTML = "";
                    upgradeDescVis.innerHTML = "";
                      if(upgrade1Value == 'r1') {
                        upRed1Active = true;
                    } if(upgrade2Value == 'r2') {
                        upRed2Active = true;
                    } if(upgrade3Value == 'r3') {
                        upRed3Active = true;
                    }
                    
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
            playerAmmo--
            if(playerAmmo < 10) {
                if(reloading == false) {
                    reloading = true;
                    setTimeout(() => {
                        playerAmmo = playerMaxAmmo;
                        reloading = false;
                        updateAmmo();
                    }, reloadSpeed);
                }
            } if(playerAmmo >= 0) {
                if(bulletType == 'Basic') {
                    fireWeapon1('basic')
                }
            }
            updateAmmo();
        }

        function updateAmmo() {
            let mainAmmoColor = 'white';
            if(mainAmmoColor == 'white') {
                ammoCount.style.backgroundColor = 'rgb(255,255,255'
                setTimeout(() => {
                    mainAmmoColor = 'normal';
                    ammoCount.style.backgroundColor = 'rgb(0,255,50'
                }, 100);
            }
            let ammoVis = (playerAmmo / playerMaxAmmo) * 100
            ammoCount.style.paddingTop = (ammoVis / 8)+ '%';
            ammoCount.style.paddingBottom = (ammoVis / 8)+ '%';
        }

        function fireWeapon1(x) {
            //! Quickfire
            if(upRed1Active == true) {
                let quickfireChance = Math.random();
                if(quickfireChance <= 0.05) {
                    setTimeout(() => {
                        fireBullet();
                    }, 50);
                    setTimeout(() => {
                        fireBullet();
                    }, 100);
                }
            }

            playerCube.classList.remove('playerFire');
            setTimeout(() => {
                playerCube.classList.add('playerFire');
            }, 50);
            fireBullet();
            function fireBullet() {
                //! Laser Beam
                if(upRed2Active == true) {
                    laserCharge++
                    if(laserCharge >= 10) {
                        laserCharge = 0;
                        let laser = document.createElement('div')
                        laser.classList.add('laser');
                        bodyvar.appendChild(laser);
                        enemyHit(laserBeamVal);
                        setTimeout(() => {
                            bodyvar.removeChild(laser);
                        }, 250);
                    }
                }
                
                //! Twin Drills
                if(upRed3Active == true) {
                    if(drillCharged == true) {
                        drillCharged = false;
                        setTimeout(() => {
                            drillCharged = true;
                        }, 5000);
                        let drillMissile1 = document.createElement('img');
                        drillMissile1.classList.add('dmissile1');
                        drillMissile1.setAttribute('src', 'images/Drill Missile.png');
                        let drillMissile2 = document.createElement('img');
                        drillMissile2.classList.add('dmissile2');
                        drillMissile2.setAttribute('src', 'images/Drill Missile.png');
                        bodyvar.appendChild(drillMissile1);
                        bodyvar.appendChild(drillMissile2);
                        let drillMissile1s = document.createElement('img');
                        drillMissile1s.classList.add('dmissile1');
                        drillMissile1s.setAttribute('src', 'images/Drill Missile.png');
                        let drillMissile2s = document.createElement('img');
                        drillMissile2s.classList.add('dmissile2');
                        drillMissile2s.setAttribute('src', 'images/Drill Missile.png');
                        drillMissile1s.style.opacity = '0.5'
                        drillMissile2s.style.opacity = '0.5'
                        drillMissile1s.style.zIndex = 4
                        drillMissile2s.style.zIndex = 4
                        setTimeout(() => {
                            bodyvar.appendChild(drillMissile1s);
                            bodyvar.appendChild(drillMissile2s);
                        }, 25);
                        let drillMissile1ss = document.createElement('img');
                        drillMissile1ss.classList.add('dmissile1');
                        drillMissile1ss.setAttribute('src', 'images/Drill Missile.png');
                        let drillMissile2ss = document.createElement('img');
                        drillMissile2ss.classList.add('dmissile2');
                        drillMissile2ss.setAttribute('src', 'images/Drill Missile.png');
                        drillMissile1ss.style.opacity = '0.25'
                        drillMissile2ss.style.opacity = '0.25'
                        drillMissile1ss.style.zIndex = 3
                        drillMissile2ss.style.zIndex = 3
                        setTimeout(() => {
                            bodyvar.appendChild(drillMissile1ss);
                            bodyvar.appendChild(drillMissile2ss);
                        }, 35);
                        setTimeout(() => {
                            bodyvar.removeChild(drillMissile1);
                            enemyHit(dmissileVal);
                            bodyvar.removeChild(drillMissile2);
                            enemyHit(dmissileVal);
                            setTimeout(() => {
                                bodyvar.removeChild(drillMissile1s);
                                bodyvar.removeChild(drillMissile2s);
                            }, 25);
                            setTimeout(() => {
                                bodyvar.removeChild(drillMissile1ss);
                                bodyvar.removeChild(drillMissile2ss);
                            }, 35);
                        }, 790);
                        //moveMissile(1);

                        function moveMissile(x) {
                            if(x == 1) {
                                 if(posX1 <= 35) {
                                    posX1 += (0.5 / posXSpeed)
                                    posY1 -= (5 / (posXSpeed * 8))
                                    posXSpeed += 0.1 * 1.05
                                    drillMissile1.style.left = posX1 + '%';
                                    drillMissile1.style.top = posY1 + '%';
                                } else if(posX1 <= 75) {
                                    if(arcPeak == false) {
                                        arcPeak = true;
                                        posXSpeed = 0;
                                    }
                                    posY1 += (posXSpeed / 15);
                                    posXSpeed += 0.01 * 1.05;
                                    posX1 += posXSpeed;
                                    drillMissile1.style.left = posX1 + '%';
                                    drillMissile1.style.top = posY1 + '%';
                                }
                            }
                            setTimeout(() => {
                                moveMissile(x)
                            }, 5);
                        }
                    }
                }

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
                        bulletSpeed += 0.1;
                        posX += bulletSpeed;
                        bullet.style.left = posX + "%";
                         setTimeout(() => {
                            moveBullet();
                         }, 10);
                    } else {
                        bodyvar.removeChild(bullet);
                        enemyHit(bulletBasicVal);
                  }
                }
            }, 50);
        }
        }
    }

    function enemyHit(x) {
        money += x;
        let hitMoney = x
        updateMoney();
        //generateOof();
        //moneyEarnedText(hitMoney);
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

    function moneyEarnedText(x) {
        let moneyEarnedVis = document.createElement('div');
        moneyEarnedVis.classList.add('moneyEarnedVis');
        let randomX = (Math.random() * 10) + 15;
        let randomY = (Math.random() * 10) + 45;
        let randomSize = (Math.random() * 2) + 3;
        let moneyOpacity = 1;
        moneyEarnedVis.style.right = randomX + "%";
        moneyEarnedVis.style.top = randomY + "%";
        moneyEarnedVis.style.fontSize = randomSize + 'vw';
        moneyEarnedVis.innerHTML = x;
        bodyvar.appendChild(moneyEarnedVis);
        moveMoneyText();
        setTimeout(() => {
            disappearMoneyText();
        }, 250);
        function moveMoneyText() {
            randomY -= 0.1;
            moneyEarnedVis.style.top = randomY + "%";
            setTimeout(() => {
                moveMoneyText();
            }, 5);
        }
        function disappearMoneyText() {
            moneyOpacity -= 0.01;
            moneyEarnedVis.style.opacity = moneyOpacity;
            setTimeout(() => {
                disappearMoneyText();
            }, 5);
        }
        setTimeout(() => {
            bodyvar.removeChild(moneyEarnedVis);
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
            }, 350);
            function moveParticle() {
                posX += randomSpeedX;
                posY += randomSpeedY;
                randomSpeedX *= 0.9;
                randomSpeedY *= 0.9;
                hitParticle.style.right = posX + '%';
                hitParticle.style.top = posY + '%';
                setTimeout(() => {
                    moveParticle();
                }, 10);
            }
        }
    }
}