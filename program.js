//import * as actions from './functions.js';

let stagemundo;
let canvas;
let stage;
let grid;
let loader;
let stagetrabajo;
let cursortext = 30;
let cursorblockx = 200;
let cursorblocky = 100;
let stagecomportamiento;
let stagebucle;
let stagemenuotros;

let flag = 0;
let contadorclick = 0;
let contadorflag = 0;
//VARIABLES
//Drag Object Size
dragRadius = 40;
//Destination Size
destHeight = 100;
destWidth = 80;

function init() {

    var c = document.getElementById("Codigo");
    var ctx = c.getContext("2d");
    ctx.font = "18px Arial";
    for (var i = 0; i < 20; i++) {
        ctx.fillText(i, 10, 30*i);
    }
    ctx.fillText("Inicio {", 40, 30);
    ctx.fillText("}", 40, 450);
    stage = new createjs.Stage("Ejecucion");
    stagemundo = new createjs.Stage("MenuMundo");
    stagetrabajo = new createjs.Stage("Espaciotrabajo");
    stagecomportamiento = new createjs.Stage("MenuComportamiento");
    stagebucle = new createjs.Stage("MenuBucles");
    stagemenuotros = new createjs.Stage("MenuOtros");

    let manifest = [
        { "src": "grid.png", "id": "grid" },
        { "src": "blockcirclecortado.png", "id": "blockcirclecortado" }
    ];
    loader = new createjs.LoadQueue(true);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "./stylesheets/blockmedia/");

    /*
    let blockcircle = new createjs.Bitmap(loader.getResult("blockcirclecortado"));
    blockcircle.x = 0;
    blockcircle.y = 0;
    //stagemundo.addChild(blockcircle);
    //stagemundo.update();
    var labelcircle = new createjs.Text("CIRCLE", "14px Lato", "#red");
    labelcircle.textAlign = "center";
    labelcircle.y = 33;
    labelcircle.x = 50;
    */
    //antiguo boton funcional
    let blockcircle = new createjs.Shape();
    var labelcircle = new createjs.Text("CIRCULO", "14px Lato", "#red");
    labelcircle.textAlign = "center";
    labelcircle.y = 33;
    labelcircle.x = 50;
    blockcircle.graphics.beginFill("Yellow").drawRect(0, 0, 100, 80);

    let blockmoveright = new createjs.Shape();
    var lablemoveright = new createjs.Text("MOVER DER", "14px Lato", "#white");
    lablemoveright.textAlign = "center";
    lablemoveright.y = 33;
    lablemoveright.x = 50;
    blockmoveright.graphics.beginFill("Blue").drawRect(0, 0, 100, 80);

    let blockmoveup = new createjs.Shape();
    var labelmoveup = new createjs.Text("MOVER ARRIBA", "14px Lato", "#red");
    labelmoveup.textAlign = "center";
    labelmoveup.y = 33;
    labelmoveup.x = 50;
    blockmoveup.graphics.beginFill("Blue").drawRect(0, 0, 100, 80);

    let blockmovedown = new createjs.Shape();
    var labelblockdown = new createjs.Text("MOVER ABAJO", "14px Lato", "#red");
    labelblockdown.textAlign = "center";
    labelblockdown.y = 33;
    labelblockdown.x = 50;
    blockmovedown.graphics.beginFill("Blue").drawRect(0, 0, 100, 80);

    let blockmoveleft = new createjs.Shape();
    var labelmoveleft = new createjs.Text("MOVER IZQ", "14px Lato", "#red");
    labelmoveleft.textAlign = "center";
    labelmoveleft.y = 33;
    labelmoveleft.x = 50;
    blockmoveleft.graphics.beginFill("Blue").drawRect(0, 0, 100, 80);

    let blockjump = new createjs.Shape();
    var labeljump = new createjs.Text("SALTAR", "14px Lato", "#red");
    labeljump.textAlign = "center";
    labeljump.y = 33;
    labeljump.x = 50;
    blockjump.graphics.beginFill("Blue").drawRect(0, 0, 100, 80);

    let blockfor = new createjs.Shape();
    var labelfor = new createjs.Text("REPETIR (4)", "14px Lato", "#red");
    labelfor.textAlign = "center";
    labelfor.y = 33;
    labelfor.x = 50;
    blockfor.graphics.beginFill("Orange").drawRect(0, 0, 100, 80);

    let blockenlarge = new createjs.Shape();
    var labelenlarge = new createjs.Text("AGRANDAR", "14px Lato", "#red");
    labelenlarge.textAlign = "center";
    labelenlarge.y = 33;
    labelenlarge.x = 50;
    blockenlarge.graphics.beginFill("Red").drawRect(0, 0, 100, 80);

    let blockshrink = new createjs.Shape();
    var labelshrink = new createjs.Text("ENCOJER", "14px Lato", "#red");
    labelshrink.textAlign = "center";
    labelshrink.y = 33;
    labelshrink.x = 50;
    blockshrink.graphics.beginFill("Red").drawRect(0, 0, 100, 80);

    let blockacelerar = new createjs.Shape();
    var labelacelerar = new createjs.Text("ACELERAR", "14px Lato", "#red");
    labelacelerar.textAlign = "center";
    labelacelerar.y = 33;
    labelacelerar.x = 50;
    blockacelerar.graphics.beginFill("Red").drawRect(0, 0, 100, 80);

    let blockrelentizar = new createjs.Shape();
    var labelrelentizar = new createjs.Text("RELENTIZAR", "14px Lato", "#red");
    labelrelentizar.textAlign = "center";
    labelrelentizar.y = 33;
    labelrelentizar.x = 50;
    blockrelentizar.graphics.beginFill("Red").drawRect(0, 0, 100, 80);

    stagemundo.addChild(blockcircle);
    stagecomportamiento.addChild(blockmoveright, blockmoveup, blockjump, blockmovedown, blockmoveleft);
    stagebucle.addChild(blockfor);
    stagemenuotros.addChild(blockenlarge, blockshrink, blockacelerar, blockrelentizar);

    

    /* CIRCULO MOVIENDOSE
    let circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(20, 20, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();
    stagemundo.update();  
    //circulo de ejecucion
    createjs.Tween.get(circle, { loop: true })
        .to({ x: 300 }, 1000, createjs.Ease.getPowInOut(4))
        .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
        .to({ alpha: 0, y: 225 }, 100)
        .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
        .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
    */

    var draggercircle = new createjs.Container();
    draggercircle.x = draggercircle.y = 100;
    draggercircle.addChild(blockcircle, labelcircle);
    draggercircle.setBounds(100, 100, dragRadius * 2, dragRadius * 2);

    var draggermoveright = new createjs.Container();
    draggermoveright.x = 100;
    draggermoveright.y = 100;
    draggermoveright.addChild(blockmoveright, lablemoveright);
    draggermoveright.setBounds(100, 100, dragRadius * 2, dragRadius * 2);

    var draggermoveup = new createjs.Container();
    draggermoveup.x = 100;
    draggermoveup.y = 200;
    draggermoveup.addChild(blockmoveup, labelmoveup);
    draggermoveup.setBounds(100, 100, dragRadius * 2, dragRadius * 2);

    let draggermovedown = new createjs.Container();
    draggermovedown.x = 100;
    draggermovedown.y = 300;
    draggermovedown.addChild(blockmovedown, labelblockdown);
    draggermovedown.setBounds(100, 100, dragRadius * 2, dragRadius * 2);

    let draggermoveleft = new createjs.Container();
    draggermoveleft.x = 100;
    draggermoveleft.y = 400;
    draggermoveleft.addChild(blockmoveleft, labelmoveleft);
    draggermoveleft.setBounds(100, 100, dragRadius * 2, dragRadius * 2);

    let draggerjump = new createjs.Container();
    draggerjump.x = 100;
    draggerjump.y = 500;
    draggerjump.addChild(blockjump, labeljump);
    draggerjump.setBounds(100, 100, dragRadius * 2, dragRadius * 2);

    let draggerfor = new createjs.Container();
    draggerfor.x = 100;
    draggerfor.y = 100;
    draggerfor.addChild(blockfor, labelfor);
    draggerfor.setBounds(100, 100, dragRadius * 2, dragRadius * 2);

    let draggerenlarge = new createjs.Container();
    draggerenlarge.x = 100;
    draggerenlarge.y = 100;
    draggerenlarge.addChild(blockenlarge, labelenlarge);
    draggerenlarge.setBounds(100, 100, dragRadius * 2, dragRadius * 2);

    let draggershrink = new createjs.Container();
    draggershrink.x = 100;
    draggershrink.y = 200;
    draggershrink.addChild(blockshrink, labelshrink);
    draggershrink.setBounds(100, 100, dragRadius * 2, dragRadius * 2);

    let draggeracelerar = new createjs.Container();
    draggeracelerar.x = 100;
    draggeracelerar.y = 300;
    draggeracelerar.addChild(blockacelerar, labelacelerar);
    draggeracelerar.setBounds(100, 100, dragRadius * 2, dragRadius * 2);

    let draggerrelentizar = new createjs.Container();
    draggerrelentizar.x = 100;
    draggerrelentizar.y = 400;
    draggerrelentizar.addChild(blockrelentizar, labelrelentizar);
    draggerrelentizar.setBounds(100, 100, dragRadius * 2, dragRadius * 2);

    //DragRadius * 2 because 2*r = width of the bounding box
    var label2 = new createjs.Text("HERE", "bold 14px Lato", "#000");
    label2.textAlign = "center";
    label2.x += 20;
    label2.y += 0;

    /*
    var box = new createjs.Shape();
    box.graphics.setStrokeStyle(2).beginStroke("black").rect(0, 0, destHeight, destWidth);
    var destination = new createjs.Container();
    destination.x = 200;
    destination.y = 400;
    destination.setBounds(200, 1500, destHeight, destWidth);

    destination.addChild(label2, box);

    //DRAG FUNCTIONALITY =====================
    draggercircle.on("pressmove", function (evt) {
        evt.currentTarget.x = evt.stageX - 50;
        evt.currentTarget.y = evt.stageY -40 ;
        stagemundo.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
        if (intersect(evt.currentTarget, destination)) {
            evt.currentTarget.alpha = 0.2;
            box.graphics.clear();
            box.graphics.setStrokeStyle(3)
                .beginStroke("#0066A4")
                .rect(0, 0, destHeight, destWidth);

        } else {
            evt.currentTarget.alpha = 1;
            box.graphics.clear(); box.graphics.setStrokeStyle(2).beginStroke("black").rect(0, 0, destHeight, destWidth);
        }

    });
    
    //Mouse UP and SNAP====================
    draggercircle.on("pressup", function (evt) {
        if (intersect(evt.currentTarget, destination)) {
            draggercircle.x = destination.x + destWidth / 2;
            draggercircle.y = destination.y + destHeight / 2;
            draggercircle.alpha = 1;
            box.graphics.clear();
            box.graphics.setStrokeStyle(2).beginStroke("black").rect(0, 0, destHeight, destWidth);
            stagemundo.update(evt);
        }
    });
//Tests if two objects are intersecting
//Sees if obj1 passes through the first and last line of its
//bounding box in the x and y sectors
//Utilizes globalToLocal to get the x and y of obj1 in relation
//to obj2
//PRE: Must have bounds set for each object
//Post: Returns true or false

    //Adds the object into stage
    */
    stagemundo.addChild(draggercircle);
    stagecomportamiento.addChild(draggermoveright, draggermoveup, draggerjump, draggermoveleft, draggermovedown);
    stagebucle.addChild(draggerfor);
    stagemenuotros.addChild(draggerenlarge, draggershrink, draggeracelerar, draggerrelentizar);

    stagemundo.update();
    stagecomportamiento.update();
    stagebucle.update();
    stagemenuotros.update();
    //CREAR BLOQUE CIRCLE
    draggercircle.on("click", function (evt) {

        cursortext = cursortext + 30;

        var c = document.getElementById("Codigo");
        var ctx = c.getContext("2d");
        ctx.font = "18px Arial";
        ctx.fillText("sprite Circle;", 40, cursortext);
        
        
        let block = new createjs.Shape();
        let label = new createjs.Text("CIRCULO", "14px Lato", "#red");
        label.textAlign = "center";
        label.y = 33;
        label.x = 50;
        block.graphics.beginFill("Yellow").drawRect(0, 0, 100, 80);
        stagetrabajo.addChild(block);
        stagetrabajo.update();

        let boxtest = new createjs.Shape();
        boxtest.graphics.rect(0, 0, destHeight, destWidth);
        let destination = new createjs.Container();
        destination.x = 200;
        destination.y = 100;
        destination.setBounds(200, 100, destHeight, destWidth);
        destination.addChild(boxtest);

        let draggerblock = new createjs.Container();
        draggerblock.x = draggerblock.y = 0;
        draggerblock.addChild(block, label);
        draggerblock.setBounds(100, 100, dragRadius * 2, dragRadius * 2);
        draggerblock.on("pressmove",function (evt){
            evt.currentTarget.x = evt.stageX - 50;
            evt.currentTarget.y = evt.stageY - 40;
            //destination.x = evt.stageX - 50;
            //destination.y = evt.stageY + 40;
            //destination.setBounds(destination.x, destination.y, destHeight, destWidth);
            stagetrabajo.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
            if (intersect(evt.currentTarget, destination)) {
                evt.currentTarget.alpha = 0.2;
                boxtest.graphics.clear();
                boxtest.graphics
                    .rect(0, 0, destHeight, destWidth);

            } else {
                evt.currentTarget.alpha = 1;
                boxtest.graphics.clear(); boxtest.graphics.rect(0, 0, destHeight, destWidth);
            }
            
        });
        draggerblock.on("pressup", function (evt) {
            if (intersect(evt.currentTarget, destination)) {
                draggerblock.x = destination.x;
                draggerblock.y = destination.y;
                draggerblock.alpha = 1;
                boxtest.graphics.clear();
                boxtest.graphics.rect(0, 0, destHeight, destWidth);
                stagetrabajo.update(evt);
            }
        });
        stagetrabajo.addChild(destination, draggerblock);
        stagetrabajo.mouseMoveOutside = true;
        stagetrabajo.update();
    });
    //CREAR BLOQUE MOVERIGHT
    draggermoveright.on("click", function (evt) {
        if (contadorclick >= 2)
            flag = 5;
        else {
            flag = 1;
        }

        cursortext = cursortext + 30;

        var c = document.getElementById("Codigo");
        var ctx = c.getContext("2d");
        ctx.font = "18px Arial";
        if (contadorflag == 1) {
            ctx.fillText("          mover derecha;", 40, cursortext);
        }
        else {
            ctx.fillText("mover derecha;", 40, cursortext);
        }

        let block = new createjs.Shape();
        let label = new createjs.Text("MOVER DER", "14px Lato", "#red");
        label.textAlign = "center";
        label.y = 33;
        label.x = 50;
        block.graphics.beginFill("Blue").drawRect(0, 0, 100, 80);
        stagetrabajo.addChild(block);
        stagetrabajo.update();

        cursorblocky = cursorblocky + 80;

        let boxtest = new createjs.Shape();
        boxtest.graphics.rect(0, 0, destHeight, destWidth);
        let destination = new createjs.Container();
        destination.x = cursorblockx;
        destination.y = cursorblocky;
        destination.setBounds(cursorblockx, cursorblocky, destHeight, destWidth);
        destination.addChild(boxtest);

        if (contadorflag == 1) {
            cursorblockx = cursorblockx - 100;
            contadorflag = 0;
        }

        let draggerblock = new createjs.Container();
        draggerblock.x = draggerblock.y = 0;
        draggerblock.addChild(block, label);
        draggerblock.setBounds(100, 100, dragRadius * 2, dragRadius * 2);
        draggerblock.on("pressmove", function (evt) {
            evt.currentTarget.x = evt.stageX - 50;
            evt.currentTarget.y = evt.stageY - 40;
            //destination.x = evt.stageX - 50;
            //destination.y = evt.stageY + 40;
            //destination.setBounds(destination.x, destination.y, destHeight, destWidth);
            stagetrabajo.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
            if (intersect(evt.currentTarget, destination)) {
                evt.currentTarget.alpha = 0.2;
                boxtest.graphics.clear();
                boxtest.graphics.setStrokeStyle(3)
                    .beginStroke("#0066A4")
                    .rect(0, 0, destHeight, destWidth);

            } else {
                evt.currentTarget.alpha = 1;
                boxtest.graphics.clear(); boxtest.graphics.rect(0, 0, destHeight, destWidth);
            }

        });
        draggerblock.on("pressup", function (evt) {
            if (intersect(evt.currentTarget, destination)) {
                draggerblock.x = destination.x;
                draggerblock.y = destination.y;
                draggerblock.alpha = 1;
                boxtest.graphics.clear();
                boxtest.graphics.rect(0, 0, destHeight, destWidth);
                stagetrabajo.update(evt);
            }
        });
        stagetrabajo.addChild(destination, draggerblock);
        stagetrabajo.mouseMoveOutside = true;
        stagetrabajo.update();
    });
    //CREAR BLOQUE MOVE UP
    draggermoveup.on("click", function (evt) {
        flag = 2;

        cursortext = cursortext + 30;

        var c = document.getElementById("Codigo");
        var ctx = c.getContext("2d");
        ctx.font = "18px Arial";
        if (contadorflag == 1) {
            ctx.fillText("      mover arriba;", 40, cursortext);
        }
        else {
            ctx.fillText("mover arriba;", 40, cursortext);
        }

        let block = new createjs.Shape();
        let label = new createjs.Text("MOVER ARRIBA", "14px Lato", "#red");
        label.textAlign = "center";
        label.y = 33;
        label.x = 50;
        block.graphics.beginFill("Blue").drawRect(0, 0, 100, 80);
        stagetrabajo.addChild(block);
        stagetrabajo.update();

        cursorblocky = cursorblocky + 80;

        let boxtest = new createjs.Shape();
        boxtest.graphics.rect(0, 0, destHeight, destWidth);
        let destination = new createjs.Container();
        destination.x = cursorblockx;
        destination.y = cursorblocky;
        destination.setBounds(cursorblockx, cursorblocky, destHeight, destWidth);
        destination.addChild(boxtest);

        if (contadorflag == 1) {
            cursorblockx = cursorblockx - 100;
            contadorflag = 0;
        }

        let draggerblock = new createjs.Container();
        draggerblock.x = draggerblock.y = 0;
        draggerblock.addChild(block, label);
        draggerblock.setBounds(100, 100, dragRadius * 2, dragRadius * 2);
        draggerblock.on("pressmove", function (evt) {
            evt.currentTarget.x = evt.stageX - 50;
            evt.currentTarget.y = evt.stageY - 40;
            //destination.x = evt.stageX - 50;
            //destination.y = evt.stageY + 40;
            //destination.setBounds(destination.x, destination.y, destHeight, destWidth);
            stagetrabajo.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
            if (intersect(evt.currentTarget, destination)) {
                evt.currentTarget.alpha = 0.2;
                boxtest.graphics.clear();
                boxtest.graphics.setStrokeStyle(3)
                    .beginStroke("#0066A4")
                    .rect(0, 0, destHeight, destWidth);

            } else {
                evt.currentTarget.alpha = 1;
                boxtest.graphics.clear(); boxtest.graphics.rect(0, 0, destHeight, destWidth);
            }

        });
        draggerblock.on("pressup", function (evt) {
            if (intersect(evt.currentTarget, destination)) {
                draggerblock.x = destination.x;
                draggerblock.y = destination.y;
                draggerblock.alpha = 1;
                boxtest.graphics.clear();
                boxtest.graphics.rect(0, 0, destHeight, destWidth);
                stagetrabajo.update(evt);
            }
        });
        stagetrabajo.addChild(destination, draggerblock);
        stagetrabajo.mouseMoveOutside = true;
        stagetrabajo.update();
    });

    //CREAR BLOQUE JUMP
    draggerjump.on("click", function (evt) {
        contadorclick = contadorclick + 1;
        if (contadorflag == 0) {
            flag = 3;
        }

        cursortext = cursortext + 30;

        var c = document.getElementById("Codigo");
        var ctx = c.getContext("2d");
        ctx.font = "18px Arial";
        if (contadorflag == 1) {
            ctx.fillText("      saltar;", 40, cursortext);
        }
        else {
            ctx.fillText("saltar;", 40, cursortext);
        }
        let block = new createjs.Shape();
        let label = new createjs.Text("SALTAR", "14px Lato", "#red");
        label.textAlign = "center";
        label.y = 33;
        label.x = 50;
        block.graphics.beginFill("Blue").drawRect(0, 0, 100, 80);
        stagetrabajo.addChild(block);
        stagetrabajo.update();

        cursorblocky = cursorblocky + 80;

        let boxtest = new createjs.Shape();
        boxtest.graphics.rect(0, 0, destHeight, destWidth);
        let destination = new createjs.Container();
        destination.x = cursorblockx;
        destination.y = cursorblocky;
        destination.setBounds(cursorblockx, cursorblocky, destHeight, destWidth);
        destination.addChild(boxtest);

        if (contadorflag == 1) {
            cursorblockx = cursorblockx - 100;
            contadorflag = 0;
        }

        let draggerblock = new createjs.Container();
        draggerblock.x = draggerblock.y = 0;
        draggerblock.addChild(block, label);
        draggerblock.setBounds(100, 100, dragRadius * 2, dragRadius * 2);
        draggerblock.on("pressmove", function (evt) {
            evt.currentTarget.x = evt.stageX - 50;
            evt.currentTarget.y = evt.stageY - 40;
            //destination.x = evt.stageX - 50;
            //destination.y = evt.stageY + 40;
            //destination.setBounds(destination.x, destination.y, destHeight, destWidth);
            stagetrabajo.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
            if (intersect(evt.currentTarget, destination)) {
                evt.currentTarget.alpha = 0.2;
                boxtest.graphics.clear();
                boxtest.graphics.setStrokeStyle(3)
                    .beginStroke("#0066A4")
                    .rect(0, 0, destHeight, destWidth);

            } else {
                evt.currentTarget.alpha = 1;
                boxtest.graphics.clear(); boxtest.graphics.rect(0, 0, destHeight, destWidth);
            }

        });
        draggerblock.on("pressup", function (evt) {
            if (intersect(evt.currentTarget, destination)) {
                draggerblock.x = destination.x;
                draggerblock.y = destination.y;
                draggerblock.alpha = 1;
                boxtest.graphics.clear();
                boxtest.graphics.rect(0, 0, destHeight, destWidth);
                stagetrabajo.update(evt);
            }
        });
        stagetrabajo.addChild(destination, draggerblock);
        stagetrabajo.mouseMoveOutside = true;
        stagetrabajo.update();
    });

    //CREAR BLOQUE FOR
    draggerfor.on("click", function (evt) {
        flag = 4;
        contadorflag = 1;
        contadorclick = contadorclick + 1;
        cursortext = cursortext + 30;

        var c = document.getElementById("Codigo");
        var ctx = c.getContext("2d");
        ctx.font = "18px Arial";
        ctx.fillText("Repetir (4):", 40, cursortext);

        let block = new createjs.Shape();
        let label = new createjs.Text("REPETIR (4)", "14px Lato", "#red");
        label.textAlign = "center";
        label.y = 33;
        label.x = 50;
        block.graphics.beginFill("Orange").drawRect(0, 0, 100, 80);
        stagetrabajo.addChild(block);
        stagetrabajo.update();
        cursorblocky = cursorblocky + 80;
        

        let boxtest = new createjs.Shape();
        boxtest.graphics.rect(0, 0, destHeight, destWidth);
        let destination = new createjs.Container();
        destination.x = cursorblockx;
        destination.y = cursorblocky;
        destination.setBounds(cursorblockx, cursorblocky, destHeight, destWidth);
        destination.addChild(boxtest);

        let draggerblock = new createjs.Container();
        draggerblock.x = draggerblock.y = 0;
        draggerblock.addChild(block, label);
        draggerblock.setBounds(100, 100, dragRadius * 2, dragRadius * 2);

        cursorblockx = cursorblockx + 100;
        cursorblocky = cursorblocky - 80;
        draggerblock.on("pressmove", function (evt) {
            evt.currentTarget.x = evt.stageX - 50;
            evt.currentTarget.y = evt.stageY - 40;
            //destination.x = evt.stageX - 50;
            //destination.y = evt.stageY + 40;
            //destination.setBounds(destination.x, destination.y, destHeight, destWidth);
            stagetrabajo.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
            if (intersect(evt.currentTarget, destination)) {
                evt.currentTarget.alpha = 0.2;
                boxtest.graphics.clear();
                boxtest.graphics.setStrokeStyle(3)
                    .beginStroke("#0066A4")
                    .rect(0, 0, destHeight, destWidth);

            } else {
                evt.currentTarget.alpha = 1;
                boxtest.graphics.clear(); boxtest.graphics.rect(0, 0, destHeight, destWidth);
            }
            
        });
        draggerblock.on("pressup", function (evt) {
            if (intersect(evt.currentTarget, destination)) {
                draggerblock.x = destination.x;
                draggerblock.y = destination.y;
                draggerblock.alpha = 1;
                boxtest.graphics.clear();
                boxtest.graphics.rect(0, 0, destHeight, destWidth);
                stagetrabajo.update(evt);
            }
        });
        stagetrabajo.addChild(destination, draggerblock);
        stagetrabajo.mouseMoveOutside = true;
        stagetrabajo.update();
    });

    //CREAR BLOQUE MOVEDOWN
    draggermovedown.on("click", function (evt) {

        cursortext = cursortext + 30;

        var c = document.getElementById("Codigo");
        var ctx = c.getContext("2d");
        ctx.font = "18px Arial";
        if (contadorflag == 1) {
            ctx.fillText("      mover abajo;", 40, cursortext);
        }
        else {
            ctx.fillText("mover abajo;", 40, cursortext);
        }


        let block = new createjs.Shape();
        let label = new createjs.Text("MOVER ABAJO", "14px Lato", "#red");
        label.textAlign = "center";
        label.y = 33;
        label.x = 50;
        block.graphics.beginFill("Blue").drawRect(0, 0, 100, 80);
        stagetrabajo.addChild(block);
        stagetrabajo.update();

        cursorblocky = cursorblocky + 80;

        let boxtest = new createjs.Shape();
        boxtest.graphics.rect(0, 0, destHeight, destWidth);
        let destination = new createjs.Container();
        destination.x = cursorblockx;
        destination.y = cursorblocky;
        destination.setBounds(cursorblockx, cursorblocky, destHeight, destWidth);
        destination.addChild(boxtest);

        if (contadorflag == 1) {
            cursorblockx = cursorblockx - 100;
            contadorflag = 0;
        }

        let draggerblock = new createjs.Container();
        draggerblock.x = draggerblock.y = 0;
        draggerblock.addChild(block, label);
        draggerblock.setBounds(100, 100, dragRadius * 2, dragRadius * 2);
        draggerblock.on("pressmove", function (evt) {
            evt.currentTarget.x = evt.stageX - 50;
            evt.currentTarget.y = evt.stageY - 40;
            //destination.x = evt.stageX - 50;
            //destination.y = evt.stageY + 40;
            //destination.setBounds(destination.x, destination.y, destHeight, destWidth);
            stagetrabajo.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
            if (intersect(evt.currentTarget, destination)) {
                evt.currentTarget.alpha = 0.2;
                boxtest.graphics.clear();
                boxtest.graphics.setStrokeStyle(3)
                    .beginStroke("#0066A4")
                    .rect(0, 0, destHeight, destWidth);

            } else {
                evt.currentTarget.alpha = 1;
                boxtest.graphics.clear(); boxtest.graphics.rect(0, 0, destHeight, destWidth);
            }

        });
        draggerblock.on("pressup", function (evt) {
            if (intersect(evt.currentTarget, destination)) {
                draggerblock.x = destination.x;
                draggerblock.y = destination.y;
                draggerblock.alpha = 1;
                boxtest.graphics.clear();
                boxtest.graphics.rect(0, 0, destHeight, destWidth);
                stagetrabajo.update(evt);
            }
        });
        stagetrabajo.addChild(destination, draggerblock);
        stagetrabajo.mouseMoveOutside = true;
        stagetrabajo.update();
    });

    //CREAR BLOQUE MOVELEFT
    draggermoveleft.on("click", function (evt) {
        flag = 100;
        cursortext = cursortext + 30;

        var c = document.getElementById("Codigo");
        var ctx = c.getContext("2d");
        ctx.font = "18px Arial";
        if (contadorflag == 1) {
            ctx.fillText("      mover izquierda;", 40, cursortext);
        }
        else {
            ctx.fillText("mover izquierda;", 40, cursortext);
        }


        let block = new createjs.Shape();
        let label = new createjs.Text("MOVER IZQ", "14px Lato", "#red");
        label.textAlign = "center";
        label.y = 33;
        label.x = 50;
        block.graphics.beginFill("Blue").drawRect(0, 0, 100, 80);
        stagetrabajo.addChild(block);
        stagetrabajo.update();

        cursorblocky = cursorblocky + 80;

        let boxtest = new createjs.Shape();
        boxtest.graphics.rect(0, 0, destHeight, destWidth);
        let destination = new createjs.Container();
        destination.x = cursorblockx;
        destination.y = cursorblocky;
        destination.setBounds(cursorblockx, cursorblocky, destHeight, destWidth);
        destination.addChild(boxtest);

        if (contadorflag == 1) {
            cursorblockx = cursorblockx - 100;
            contadorflag = 0;
        }

        let draggerblock = new createjs.Container();
        draggerblock.x = draggerblock.y = 0;
        draggerblock.addChild(block, label);
        draggerblock.setBounds(100, 100, dragRadius * 2, dragRadius * 2);
        draggerblock.on("pressmove", function (evt) {
            evt.currentTarget.x = evt.stageX - 50;
            evt.currentTarget.y = evt.stageY - 40;
            //destination.x = evt.stageX - 50;
            //destination.y = evt.stageY + 40;
            //destination.setBounds(destination.x, destination.y, destHeight, destWidth);
            stagetrabajo.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
            if (intersect(evt.currentTarget, destination)) {
                evt.currentTarget.alpha = 0.2;
                boxtest.graphics.clear();
                boxtest.graphics.setStrokeStyle(3)
                    .beginStroke("#0066A4")
                    .rect(0, 0, destHeight, destWidth);

            } else {
                evt.currentTarget.alpha = 1;
                boxtest.graphics.clear(); boxtest.graphics.rect(0, 0, destHeight, destWidth);
            }

        });
        draggerblock.on("pressup", function (evt) {
            if (intersect(evt.currentTarget, destination)) {
                draggerblock.x = destination.x;
                draggerblock.y = destination.y;
                draggerblock.alpha = 1;
                boxtest.graphics.clear();
                boxtest.graphics.rect(0, 0, destHeight, destWidth);
                stagetrabajo.update(evt);
            }
        });
        stagetrabajo.addChild(destination, draggerblock);
        stagetrabajo.mouseMoveOutside = true;
        stagetrabajo.update();
    });

    //CREAR BLOCKENLARGE
    draggerenlarge.on("click", function (evt) {

        cursortext = cursortext + 30;

        var c = document.getElementById("Codigo");
        var ctx = c.getContext("2d");
        ctx.font = "18px Arial";
        if (contadorflag == 1) {
            ctx.fillText("      agrandar;", 40, cursortext);
        }
        else {
            ctx.fillText("agrandar;", 40, cursortext);
        }


        let block = new createjs.Shape();
        let label = new createjs.Text("AGRANDAR", "14px Lato", "#red");
        label.textAlign = "center";
        label.y = 33;
        label.x = 50;
        block.graphics.beginFill("Red").drawRect(0, 0, 100, 80);
        stagetrabajo.addChild(block);
        stagetrabajo.update();

        cursorblocky = cursorblocky + 80;

        let boxtest = new createjs.Shape();
        boxtest.graphics.rect(0, 0, destHeight, destWidth);
        let destination = new createjs.Container();
        destination.x = cursorblockx;
        destination.y = cursorblocky;
        destination.setBounds(cursorblockx, cursorblocky, destHeight, destWidth);
        destination.addChild(boxtest);

        if (contadorflag == 1) {
            cursorblockx = cursorblockx - 100;
            contadorflag = 0;
        }

        let draggerblock = new createjs.Container();
        draggerblock.x = draggerblock.y = 0;
        draggerblock.addChild(block, label);
        draggerblock.setBounds(100, 100, dragRadius * 2, dragRadius * 2);
        draggerblock.on("pressmove", function (evt) {
            evt.currentTarget.x = evt.stageX - 50;
            evt.currentTarget.y = evt.stageY - 40;
            //destination.x = evt.stageX - 50;
            //destination.y = evt.stageY + 40;
            //destination.setBounds(destination.x, destination.y, destHeight, destWidth);
            stagetrabajo.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
            if (intersect(evt.currentTarget, destination)) {
                evt.currentTarget.alpha = 0.2;
                boxtest.graphics.clear();
                boxtest.graphics.setStrokeStyle(3)
                    .beginStroke("#0066A4")
                    .rect(0, 0, destHeight, destWidth);

            } else {
                evt.currentTarget.alpha = 1;
                boxtest.graphics.clear(); boxtest.graphics.rect(0, 0, destHeight, destWidth);
            }

        });
        draggerblock.on("pressup", function (evt) {
            if (intersect(evt.currentTarget, destination)) {
                draggerblock.x = destination.x;
                draggerblock.y = destination.y;
                draggerblock.alpha = 1;
                boxtest.graphics.clear();
                boxtest.graphics.rect(0, 0, destHeight, destWidth);
                stagetrabajo.update(evt);
            }
        });
        stagetrabajo.addChild(destination, draggerblock);
        stagetrabajo.mouseMoveOutside = true;
        stagetrabajo.update();
    });

    //CREAR blockshrink
    draggershrink.on("click", function (evt) {

        cursortext = cursortext + 30;

        var c = document.getElementById("Codigo");
        var ctx = c.getContext("2d");
        ctx.font = "18px Arial";
        if (contadorflag == 1) {
            ctx.fillText("      encojer;", 40, cursortext);
        }
        else {
            ctx.fillText("encojer;", 40, cursortext);
        }


        let block = new createjs.Shape();
        let label = new createjs.Text("ENCOJER", "14px Lato", "#red");
        label.textAlign = "center";
        label.y = 33;
        label.x = 50;
        block.graphics.beginFill("Red").drawRect(0, 0, 100, 80);
        stagetrabajo.addChild(block);
        stagetrabajo.update();

        cursorblocky = cursorblocky + 80;

        let boxtest = new createjs.Shape();
        boxtest.graphics.rect(0, 0, destHeight, destWidth);
        let destination = new createjs.Container();
        destination.x = cursorblockx;
        destination.y = cursorblocky;
        destination.setBounds(cursorblockx, cursorblocky, destHeight, destWidth);
        destination.addChild(boxtest);

        if (contadorflag == 1) {
            cursorblockx = cursorblockx - 100;
            contadorflag = 0;
        }

        let draggerblock = new createjs.Container();
        draggerblock.x = draggerblock.y = 0;
        draggerblock.addChild(block, label);
        draggerblock.setBounds(100, 100, dragRadius * 2, dragRadius * 2);
        draggerblock.on("pressmove", function (evt) {
            evt.currentTarget.x = evt.stageX - 50;
            evt.currentTarget.y = evt.stageY - 40;
            //destination.x = evt.stageX - 50;
            //destination.y = evt.stageY + 40;
            //destination.setBounds(destination.x, destination.y, destHeight, destWidth);
            stagetrabajo.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
            if (intersect(evt.currentTarget, destination)) {
                evt.currentTarget.alpha = 0.2;
                boxtest.graphics.clear();
                boxtest.graphics.setStrokeStyle(3)
                    .beginStroke("#0066A4")
                    .rect(0, 0, destHeight, destWidth);

            } else {
                evt.currentTarget.alpha = 1;
                boxtest.graphics.clear(); boxtest.graphics.rect(0, 0, destHeight, destWidth);
            }

        });
        draggerblock.on("pressup", function (evt) {
            if (intersect(evt.currentTarget, destination)) {
                draggerblock.x = destination.x;
                draggerblock.y = destination.y;
                draggerblock.alpha = 1;
                boxtest.graphics.clear();
                boxtest.graphics.rect(0, 0, destHeight, destWidth);
                stagetrabajo.update(evt);
            }
        });
        stagetrabajo.addChild(destination, draggerblock);
        stagetrabajo.mouseMoveOutside = true;
        stagetrabajo.update();
    });

    //CREAR BLOCKACELERAR
    draggeracelerar.on("click", function (evt) {

        cursortext = cursortext + 30;

        var c = document.getElementById("Codigo");
        var ctx = c.getContext("2d");
        ctx.font = "18px Arial";
        if (contadorflag == 1) {
            ctx.fillText("      acelerar;", 40, cursortext);
        }
        else {
            ctx.fillText("acelerar;", 40, cursortext);
        }


        let block = new createjs.Shape();
        let label = new createjs.Text("ACELERAR", "14px Lato", "#red");
        label.textAlign = "center";
        label.y = 33;
        label.x = 50;
        block.graphics.beginFill("Red").drawRect(0, 0, 100, 80);
        stagetrabajo.addChild(block);
        stagetrabajo.update();

        cursorblocky = cursorblocky + 80;

        let boxtest = new createjs.Shape();
        boxtest.graphics.rect(0, 0, destHeight, destWidth);
        let destination = new createjs.Container();
        destination.x = cursorblockx;
        destination.y = cursorblocky;
        destination.setBounds(cursorblockx, cursorblocky, destHeight, destWidth);
        destination.addChild(boxtest);

        if (contadorflag == 1) {
            cursorblockx = cursorblockx - 100;
            contadorflag = 0;
        }

        let draggerblock = new createjs.Container();
        draggerblock.x = draggerblock.y = 0;
        draggerblock.addChild(block, label);
        draggerblock.setBounds(100, 100, dragRadius * 2, dragRadius * 2);
        draggerblock.on("pressmove", function (evt) {
            evt.currentTarget.x = evt.stageX - 50;
            evt.currentTarget.y = evt.stageY - 40;
            //destination.x = evt.stageX - 50;
            //destination.y = evt.stageY + 40;
            //destination.setBounds(destination.x, destination.y, destHeight, destWidth);
            stagetrabajo.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
            if (intersect(evt.currentTarget, destination)) {
                evt.currentTarget.alpha = 0.2;
                boxtest.graphics.clear();
                boxtest.graphics.setStrokeStyle(3)
                    .beginStroke("#0066A4")
                    .rect(0, 0, destHeight, destWidth);

            } else {
                evt.currentTarget.alpha = 1;
                boxtest.graphics.clear(); boxtest.graphics.rect(0, 0, destHeight, destWidth);
            }

        });
        draggerblock.on("pressup", function (evt) {
            if (intersect(evt.currentTarget, destination)) {
                draggerblock.x = destination.x;
                draggerblock.y = destination.y;
                draggerblock.alpha = 1;
                boxtest.graphics.clear();
                boxtest.graphics.rect(0, 0, destHeight, destWidth);
                stagetrabajo.update(evt);
            }
        });
        stagetrabajo.addChild(destination, draggerblock);
        stagetrabajo.mouseMoveOutside = true;
        stagetrabajo.update();
    });

    //CREAR BLOCKDESACELERAR
    draggerrelentizar.on("click", function (evt) {

        cursortext = cursortext + 30;

        var c = document.getElementById("Codigo");
        var ctx = c.getContext("2d");
        ctx.font = "18px Arial";
        if (contadorflag == 1) {
            ctx.fillText("      relentizar;", 40, cursortext);
        }
        else {
            ctx.fillText("relentizar;", 40, cursortext);
        }


        let block = new createjs.Shape();
        let label = new createjs.Text("RELENTIZAR", "14px Lato", "#red");
        label.textAlign = "center";
        label.y = 33;
        label.x = 50;
        block.graphics.beginFill("Red").drawRect(0, 0, 100, 80);
        stagetrabajo.addChild(block);
        stagetrabajo.update();

        cursorblocky = cursorblocky + 80;

        let boxtest = new createjs.Shape();
        boxtest.graphics.rect(0, 0, destHeight, destWidth);
        let destination = new createjs.Container();
        destination.x = cursorblockx;
        destination.y = cursorblocky;
        destination.setBounds(cursorblockx, cursorblocky, destHeight, destWidth);
        destination.addChild(boxtest);

        if (contadorflag == 1) {
            cursorblockx = cursorblockx - 100;
            contadorflag = 0;
        }

        let draggerblock = new createjs.Container();
        draggerblock.x = draggerblock.y = 0;
        draggerblock.addChild(block, label);
        draggerblock.setBounds(100, 100, dragRadius * 2, dragRadius * 2);
        draggerblock.on("pressmove", function (evt) {
            evt.currentTarget.x = evt.stageX - 50;
            evt.currentTarget.y = evt.stageY - 40;
            //destination.x = evt.stageX - 50;
            //destination.y = evt.stageY + 40;
            //destination.setBounds(destination.x, destination.y, destHeight, destWidth);
            stagetrabajo.update(); //much smoother because it refreshes the screen every pixel movement instead of the FPS set on the Ticker
            if (intersect(evt.currentTarget, destination)) {
                evt.currentTarget.alpha = 0.2;
                boxtest.graphics.clear();
                boxtest.graphics.setStrokeStyle(3)
                    .beginStroke("#0066A4")
                    .rect(0, 0, destHeight, destWidth);

            } else {
                evt.currentTarget.alpha = 1;
                boxtest.graphics.clear(); boxtest.graphics.rect(0, 0, destHeight, destWidth);
            }

        });
        draggerblock.on("pressup", function (evt) {
            if (intersect(evt.currentTarget, destination)) {
                draggerblock.x = destination.x;
                draggerblock.y = destination.y;
                draggerblock.alpha = 1;
                boxtest.graphics.clear();
                boxtest.graphics.rect(0, 0, destHeight, destWidth);
                stagetrabajo.update(evt);
            }
        });
        stagetrabajo.addChild(destination, draggerblock);
        stagetrabajo.mouseMoveOutside = true;
        stagetrabajo.update();
    });

}


function intersect(obj1, obj2) {
    var objBounds1 = obj1.getBounds().clone();
    var objBounds2 = obj2.getBounds().clone();

    var pt = obj1.globalToLocal(objBounds2.x, objBounds2.y);

    var h1 = -(objBounds1.height / 2 + objBounds2.height);
    var h2 = objBounds2.width / 2;
    var w1 = -(objBounds1.width / 2 + objBounds2.width);
    var w2 = objBounds2.width / 2;


    if (pt.x > w2 || pt.x < w1) return false;
    if (pt.y > h2 || pt.y < h1) return false;

    return true;
}

function handleComplete() {
    creategrid();
}

function creategrid() {
    grid = new createjs.Bitmap(loader.getResult("grid"));
    grid.x = 0;
    grid.y = 0;
    stage.addChild(grid);
    stage.update();
}

function pruebaboton() {
    
    let circle = createcircle(stage);
    let tween = createjs.Tween.get(circle, { override: false })
    if (flag == 1) {
        moveright(tween, circle);
        tween.to({ alpha: 0 });
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
    }
    if (flag == 2) {
        moveright(tween,circle)
        moveup(tween, circle)
            tween.to({ alpha: 0 })
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);    
    }
    if (flag == 3) {

        moveright(tween, circle);
        moveup(tween, circle);
        jump(tween, circle);
        tween.to({ alpha: 0 })
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
    }
    if (flag == 4) {

        jump(tween, circle);
        jump(tween, circle);
        jump(tween, circle);
        jump(tween, circle);
        tween.to({ alpha: 0 })
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
    }
    if (flag == 5) {

        jump(tween, circle);
        jump(tween, circle);
        jump(tween, circle);
        jump(tween, circle);
        moveright(tween, circle);
        tween.to({ alpha: 0 })
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", stage);
    }
    if (flag == 100) {
        circle.x = -100;
        circle.y = -100;
        code(stage);
    }
    
    
    
}

function createblockcircle(){
    blockcircle = new createjs.Bitmap(loader.getResult("blockcirclecortado"));
    blockcircle.x = 0;
    blockcircle.y = 50;
    stagemundo.addChild(blockcircle);
    stagemundo.update();
    var draggercircle = new createjs.Container();
    draggercircle.x = draggercircle.y = 100;
    draggercircle.addChild(blockcircle, labelcircle);
    draggercircle.setBounds(0, 50, dragRadius * 2, dragRadius * 2);
}
/*
function WriteToFile(passForm) {

    set fso = CreateObject("Scripting.FileSystemObject");
    set s = fso.CreateTextFile("<your Path>/filename.txt", True);

    var firstName = document.getElementById('FirstName');
    var lastName = document.getElementById('lastName');

    s.writeline("First Name :" + FirstName);
    s.writeline("Last Name :" + lastName);

    s.writeline("-----------------------------");
    s.Close();
}*/