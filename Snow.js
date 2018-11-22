window.onload = function () {
    var Sonw = document.getElementById("Sonw");//获取画布对象
    var SonwT = Sonw.getContext("2d");//获取画布的上下文
    var w = window.innerWidth;//获取浏览器屏幕的宽度
    var h = window.innerHeight;//获取浏览器屏幕的高度
    Sonw.width = w;//设置canvas的宽度
    Sonw.height = h;//设置canvas的高度

    //如何产生雪花,一个圆 ,arc(x,y,r,start,end)
    var num = 50;//初始化雪花数量
    var snows = [];//雪花数组
    for (var i = 0; i < num; i++) {
        //x,y圆心掉的坐标位置，r代表圆的半径，d每个圆的每个圆之间的间距，c代表的颜色
        var r = randColor();
        snows.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 3,
            d: Math.random() * num
        });
    };
    //绘画的函数
    function draw() {
        SonwT.clearRect(0, 0, w, h);
        SonwT.beginPath();
        for (var i = 0; i < num; i++) {
            var snow = snows[i];
            //SonwT.fillStyle = randColor();
            SonwT.fillStyle = "rgba(0,0,0,0.6)";
            SonwT.moveTo(snow.x, snow.y);
            SonwT.arc(snow.x, snow.y, snow.r, 0, Math.PI * 2);
        }
        SonwT.fill();
        drop();//掉落
    };
    var angle = 0;
    function drop() {
        angle += 0.01;
        for (var i = 0; i < num; i++) {
            var p = snows[i];
            //记住两个公式：Math.sin(弧度)返回是一个0 1 -1 的数字
            //math.cos(1 0 -1 ) 自由体，
            p.y += Math.cos(angle + p.d) + 1 + p.r * 0.625;
            p.x += Math.sin(angle) * 1;
            //如果雪花到了边界，进行边界处理
            if (p.x > w + 5 || p.x < -5 || p.y > h) {
                if (i % 4 > 0) {
                    snows[i] = { x: Math.random() * w, y: -10, r: p.r, d: p.d };
                } else {
                    //控制方向
                    if (Math.sin(angle) > 0) {
                        snows[i] = { x: -5, y: Math.random() * h, r: p.r, d: p.d };
                    } else {
                        snows[i] = { x: w + 5, y: Math.random() * h, r: p.r, d: p.d };
                    }
                }
            }
        }
    };
    draw();//执行和调用函数
    setInterval(draw, 10);
    function randColor() {//随机颜色
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    };
};