let speed = 1000;
let size = 50;
function relentizar() {
    speed = speed + 500;
}
function acelerar() {
    speed = speed - 500;
}

function createcircle(stage) {
    let circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(20, 20, size);
    circle.x = 100;
    circle.y = 300;
    stage.addChild(circle);
    stage.update();
    return circle;
}

function moveright(tween, object) {
    tween.to({ x: object.x + 100 }, speed, createjs.Ease.getPowInOut(4));
    object.x = object.x + 100;
}

function moveup(tween, object) {
    tween.to({ y: object.y - 100 }, speed, createjs.Ease.getPowInOut(2));
    object.y = object.y - 100;
}

function movedown(tween, object) {
    tween.to({ y: object.y + 100 }, speed, createjs.Ease.getPowInOut(2));
    object.y = object.y + 100;
}
function moveleft(tween, object) {
    tween.to({ x: object.x - 100 }, speed, createjs.Ease.getPowInOut(4));
    object.x = object.x - 100;
}
function shrink(object,stage) {
    size = size - 25;
    object.graphics.beginFill("DeepSkyBlue").drawCircle(20, 20, 25);
    stage.addChild(object);
    stage.update();
}
function enlarge(object, stage) {
    size = size + 25;
    object.graphics.beginFill("DeepSkyBlue").drawCircle(20, 20, 75);
    stage.addChild(object);
    stage.update();
}

function jump(tween,object) {
    tween.to({ y: object.y - 30 }, speed, createjs.Ease.getPowInOut(2));
    tween.to({ y: object.y + 30 }, speed, createjs.Ease.getPowInOut(2));
}