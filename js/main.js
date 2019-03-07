var y = {};
//var timer = null;//留言的timer
var onOff = true;//文章btn的onOff
//配置初始化执行函数
y.init = function(){
    //设置第一屏的高度，以及后面块的margin-top
    y.resize();
    y.events();
    //留言板
    //y.liuyan();
    //动态
    y.dongtai();
    //s5
    y.s5();
    //s6
    y.s6();
    //wow
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        new WOW().init();
    };
}
$(document).ready( y.init );//当页面加载完调用初始方法
//配置事件
y.events = function(){
    //浏览器窗口发生改变
    $(window).resize( y.resize );

    //浏览器会记录滚动条，这里让滚动条每次都是 0 的位置
    $(window).bind("scroll",scrollFn);
    function scrollFn(){
        $(window).scrollTop(0);
    }

    //干掉浏览器默认的滚动行为
    $("#main").bind("mousewheel",function(ev){
        ev.preventDefault();
    });
    $("#main").one("mousewheel",mousewheelFn);//one绑定保证只有一个事件处理函数
    var timer = null;//避免多次开定时器，所以先清除
    function mousewheelFn(ev,direction){
        var range = ($(window).height()-80);
        //$(window).scrollTop(475)
        $(window).unbind("scroll",scrollFn);//滚动的时候解绑这个事件，不然每次都要归为 0
        if(direction<1){//向下滚动
            $("html,body").animate({"scrollTop":$(window).scrollTop()+range},1000);
            y.headColor1();
        }else{//向上滚动
            $("html,body").animate({"scrollTop":$(window).scrollTop()-range},1000);
            y.headColor2();
        }
        clearTimeout(timer);
        timer = setTimeout(function(){
            $("#main").one("mousewheel",mousewheelFn);//每隔1200毫秒才能滚动一次
        },1400)
    }
}
y.headColor1 = function(){
    switch ($(window).scrollTop()){
        case 0:
            $(".header").css({
                "transition":"1200ms",
                "background":"#ccccff"
            }).animateCss("fadeInDown");
            $(".header > .main *").css({
                "border-color":"#000",
                "color":"#000"
            })
            break;
        case ($(window).height()-80)*1:
            $(".header").css({
                "transition":"1200ms",
                "background":"#fff"
            }).animateCss("bounce");
            $(".header > .main *").css({
                "border-color":"#000",
                "color":"#000"
            })
            break;
        case ($(window).height()-80)*2:
            $(".header").css({
                "transition":"1200ms",
                "background":"#66cccc"
            }).animateCss("fadeInDown");
            $(".header > .main *").css({
                "border-color":"#fff",
                "color":"#fff"
            })
            break;
        case ($(window).height()-80)*3:
            $(".header").css({
                "transition":"1200ms",
                "background":"#c0e1e7"
            }).animateCss("fadeInDown");
            $(".header > .main *").css({
                "border-color":"#fff",
                "color":"#fff"
            })
            break;
    }
}
y.headColor2 = function(){
    switch ($(window).scrollTop()){
        case ($(window).height()-80)*1:
            $(".header").css({
                "transition":"1200ms",
                "background":"#fff"
            }).animateCss("fadeInDown");
            $(".header > .main *").css({
                "border-color":"#000",
                "color":"#000"
            })
            break;
        case ($(window).height()-80)*2:
            $(".header").css({
                "transition":"1200ms",
                "background":"#ccccff"
            }).animateCss("fadeInUp");
            $(".header > .main *").css({
                "border-color":"#000",
                "color":"#000"
            })
            break;
        case ($(window).height()-80)*3:
            $(".header").css({
                "transition":"1200ms",
                "background":"#fff"
            }).animateCss("bounce");
            $(".header > .main *").css({
                "border-color":"#000",
                "color":"#000"
            })
            break;
        case ($(window).height()-80)*4:
            $(".header").css({
                "transition":"1200ms",
                "background":"#66cccc"
            }).animateCss("fadeInUp");
            $(".header > .main *").css({
                "border-color":"#fff",
                "color":"#fff"
            })
            break;
    }
}
//浏览器发生改变
y.resize = function(){
    var h = $(window).height() - 80;
    $("section[class^=s]").height(h);//可视区减去head
    // if(document.documentElement.clientHeight<580){ 
    //     alert('禁止缩放');
    // } 
    //$("section[class^=s]:not(':first')").css("top",$(window).height());//设置除了第一屏其他的TOP值
    //恢复默认
    $(".header").css({
        "transition":"1200ms",
        "background":"#fff"
    }).animateCss("bounce");
    $(window).scrollTop(0);
    $("section[class^=s]").slice(1).each(function(){//清除原有在新设置
        $(this).css("top",0)
    })
    //设置每一屏的top值
    $("section[class^=s]").slice(1).each(function(){
        $(this).css("top","+="+h*$(this).index()+"");
    })
}

y.dongtai = function(){
    var onOff = false;//解决无法移动
    var timer = null;
    var iSpeed = 0;
    //动态
    $(".s4>.left li").each(function(){
        $(this).addClass("wow flipInX");
        $(this).attr("data-wow-delay",$(this).index()/5+'s')
    });
    // if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
    //     new WOW().init();
    // };
    //点击动态 li 时
    var aLi = $(".s4>.left li");
    //存分组
    console.log(aLi);
    $(".s4>.left li").on("click",function(){
        var lH = $(".s4>.left li").eq(0).outerHeight();
        aLi.splice($(this).index(),1);
        console.log(aLi);
        aLi.each(function(){
            $(this).attr("ok",true).animate({"left":-800},200*($(this).index()+1));
        })
        setTimeout(function(){
            $(".s4>.left li:not([ok='true'])").animate({
                "top":-$(".s4>.left li:not([ok='true'])").position().top+18 //ul 的 padding 值是 18
            },function(){
                //分组
                $(".s4>.left li:not([ok='true'])").prevAll().css("top","+="+lH+"");
                aLi.each(function(){
                    $(this).attr("ok",true).animate({"left":0},300*($(this).index()+1));
                    $(".s4>.left li").unbind("click");
                })
            });
        },1200);
    });
    //拖拽
    $(".s4 > .right > .main").eq(0).mousedown(function(ev){
        $(".s4 > .right > .btn").fadeOut();//隐藏btn
        var $this = $(this);
        //通过borderBox来获取需要的left值
        var left = $(".s4 > .right > .borderBox").position().left-9.5;//19/2是手动计算
        $(window).resize(function(){//浏览器发生改变重新获取值
            var left = $(".s4 > .right > .borderBox").position().left-9.5;//19/2是手动计算
            $this.css("top",0).css("left",left);
        });
        var T = ev.clientY - $this.position().top;
        var L = ev.clientX - $this.position().left;
        $(document).mousemove(function(ev){
            clearInterval(timer);
            var T2 = ev.clientY - T;
            var L2 = ev.clientX - L;
            var r1 = $this.position().top + $this.outerHeight()/2;
            var r2 = $this.position().left + $this.outerWidth()/2;
            //存目标圆心 目标圆心 假设他是一个大框
            //borderBox 的宽度是 260 高度 也是 但是我们只要最中间那一块 所以 想模拟九宫格的话 左边42.5 中间60 右边42.5
            //上是固定的所以只用判断下面的值
            var iT2 = $(".s4 > .right > .borderBox").position().top+145;
            var iL1 = $(".s4 > .right > .borderBox").position().left+85;
            var iL2 = $(".s4 > .right > .borderBox").position().left+145;
            //console.log(iL1+"<->"+r2+"<-->"+iL2)
            //判断让后让其固定
            //开始移动时这里肯定是true，是无法移动，欲用 onOff 来解决
            if(onOff){
                if(r2>iL1 && r2<iL2 && r1<iT2){
                    $this.css("top",0).css("left",left);
                    $(".s4 > .right > .btn").fadeIn();
                    $(".s4 > .right > .btn").animateCss("bounce");
                    $(document).unbind('mousemove');
                    $(document).unbind('mouseup');
                    onOff = false;
                    return;
                }
            }
            if(T2<0){
                T2 = 0;
            }else if(T2>$(".s4 > .right").outerHeight()-$this.outerHeight()){
                T2 = $(".s4 > .right").outerHeight()-$this.outerHeight();
            }
            if(L2<0){
                L2 = 0;
            }else if(L2>$(".s4 > .right").outerWidth()-$this.outerWidth()){
                L2 = $(".s4 > .right").outerWidth()-$this.outerWidth();
            }
            $this.css("top",T2);
            $this.css("left",L2);
        })
        $(document).mouseup(function(){
            onOff = true;//解决无法移动
            //console.log(1);
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            //BUG猜想是因为注册 mouseup 的时候执行了动画
            //解决思路是move时清除定时器
            clearInterval(timer);
            timer = setInterval(function(){
                iSpeed += 3;
                var T = $this.position().top + iSpeed;
                if(T>$(".s4 > .right").outerHeight()-$this.outerHeight()){
                    T = $(".s4 > .right").outerHeight()-$this.outerHeight();
                    iSpeed *= -1;
                    iSpeed *= 0.75;
                }
                $this.css("top",T);
            },20)
        })
    })
    //点击
    
}
y.s5 = function(){
    //btn 
    $(".s5 > .right > button").on("click",function(){
        if(onOff){
            $(".s5 > .left").animate({
                "width":0,
                "height":0
            });
            $(".s5 > .right").animate({
                "width":$(document).width()
            });
            $(".s5 > .right .wenzhang span").html(`公园里鲜花盛开，主要有玫瑰花，但四周还有五彩斑斓、争相斗艳的牡丹花和金盏草。
            在公园那端的一角，有一块网球场，有时那儿进行的比赛确实精彩，不时也有几场板球赛，虽然球艺够不上正式决赛的水平，但有得看总比没有强。
            那边还有一块用于玩滚木球的草坪。
            描述仍在继续：一个孩童怎样差一点跌入湖中，身着夏装的姑娘是多么美丽动人。
            接着又是一场扣人心弦的网球赛。
            他听着这栩栩如生的描述，仿佛亲眼看到了窗外所发生的一切。
            一天下午，当他听到靠窗的病人说到一名板球队员正慢悠悠地把球击得四处皆是时，不靠窗的病人突然产生了一个想法：
            为什么偏偏是挨着窗户的那个人，能有幸观赏到窗外的一切？
            为什么自己不应得到这种机会？
            他为自己有这种想法而感到惭愧，竭力不再这么想。可是，他愈加克制，这种想法却愈加强烈。
            他白昼无时不为这一想法困扰，晚上，又彻夜难眠。结果，病情一天天加重了，医生们却对加重的原因不得而知。
            公园的尽头是一排商店，在这些商店的后边闹市区隐约可见。
            躺着的病人津津有味地听这一切。这个时刻的每一分钟对他来说都是一种享受。
            一天晚上，他照例睁着双眼盯着天花板。
            这时，靠窗的同伴突然醒来，开始大声咳嗽，呼吸急促，时断时续，液体已经充塞了他的肺腔，他两手摸索着，在找电铃的按钮，只要电铃一响，值班的护士就立即赶来。
            但是，不靠窗的病人却纹丝不动地看着。
            心想：他凭什么要占据窗口那张床位呢？
            痛苦的咳嗽声一声又一声……卡住了……停止了……直至最后呼吸声也停止了。
            不靠窗的病人仍然盯着天花板。
            第二天早晨，医护人员发现靠窗那个病人已咽气了，他们静悄悄地将尸体抬了出去。
            稍过几天，似乎这时开口已经正当得体，剩下的这位病人立刻提出，是否能让他挪到窗口的那张床上去。
            医护人员把他抬了过去，将他舒舒服服地安顿在那张病床上。
            接着他们离开了病房，剩下他一个人静静地躺在那儿。
            医生刚一离开，这位病人就十分痛苦地挣扎着，用一只胳膊支起了身子，口中气喘吁吁。
            他探头朝窗口望去：
            他看到的只是光秃秃的一堵墙。`);
            $(".s5 > .right button").removeClass("zk").addClass('ss');
        }else{
            $(".s5 > .left").animate({
                "width":"100%",
                "height":"100%"
            });
            $(".s5 > .right").animate({
                "width":$(window).width()
            });
            $(".s5 > .right .wenzhang span").html("......");
            $(".s5 > .right button").removeClass("ss").addClass('zk');
        }
        onOff = !onOff;
    })
}
y.s6 = function(){
    var animateName = ['snow','snow1','snow2','snow3'];//雪花
    var num = 0;
    var feiji = 90;
    $(".s6 > .main > div").hover(function(){
        $(".s6 > .xuehua").css("animation-duration","1.5s")
    },function(){
        $(".s6 > .xuehua").css("animation-duration","6s")
    });
    $(".s6 > .main > div").on("click",function(){
        //雪花方向
        //因为默认方向是snow所以在此设置一下
        $(".s6 > .xuehua").css("animation-name",animateName[num]);
        num++;
        num %= animateName.length;
        $(this).css({
            "transform":"rotate("+feiji+"deg)"
        });
        feiji += 90;
    });
}
$.fn.extend({ //扩展animate.css方法
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';//webkit moz 
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

