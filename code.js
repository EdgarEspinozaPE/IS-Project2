function code(stage) {
    let circle = createcircle(stage);
    let tween = createjs.Tween.get(circle, { override: true })
    acelerar();
    enlarge(circle, stage);
    moveright(tween,circle)
    moveup(tween,circle)
    jump(tween, circle);
    jump(tween, circle);
    jump(tween, circle);
    jump(tween, circle);
    moveleft(tween, circle);
    movedown(tween, circle);
    jump(tween, circle);
    moveleft(tween, circle);
    tween.to({ alpha: 0 })
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}