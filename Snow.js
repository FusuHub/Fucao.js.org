window.onload = function () {
    var Sonw = document.getElementById("Sonw");//��ȡ��������
    var SonwT = Sonw.getContext("2d");//��ȡ������������
    var w = window.innerWidth;//��ȡ�������Ļ�Ŀ��
    var h = window.innerHeight;//��ȡ�������Ļ�ĸ߶�
    Sonw.width = w;//����canvas�Ŀ��
    Sonw.height = h;//����canvas�ĸ߶�

    //��β���ѩ��,һ��Բ ,arc(x,y,r,start,end)
    var num = 50;//��ʼ��ѩ������
    var snows = [];//ѩ������
    for (var i = 0; i < num; i++) {
        //x,yԲ�ĵ�������λ�ã�r����Բ�İ뾶��dÿ��Բ��ÿ��Բ֮��ļ�࣬c�������ɫ
        var r = randColor();
        snows.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 3,
            d: Math.random() * num
        });
    };
    //�滭�ĺ���
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
        drop();//����
    };
    var angle = 0;
    function drop() {
        angle += 0.01;
        for (var i = 0; i < num; i++) {
            var p = snows[i];
            //��ס������ʽ��Math.sin(����)������һ��0 1 -1 ������
            //math.cos(1 0 -1 ) �����壬
            p.y += Math.cos(angle + p.d) + 1 + p.r * 0.625;
            p.x += Math.sin(angle) * 1;
            //���ѩ�����˱߽磬���б߽紦��
            if (p.x > w + 5 || p.x < -5 || p.y > h) {
                if (i % 4 > 0) {
                    snows[i] = { x: Math.random() * w, y: -10, r: p.r, d: p.d };
                } else {
                    //���Ʒ���
                    if (Math.sin(angle) > 0) {
                        snows[i] = { x: -5, y: Math.random() * h, r: p.r, d: p.d };
                    } else {
                        snows[i] = { x: w + 5, y: Math.random() * h, r: p.r, d: p.d };
                    }
                }
            }
        }
    };
    draw();//ִ�к͵��ú���
    setInterval(draw, 10);
    function randColor() {//�����ɫ
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    };
};