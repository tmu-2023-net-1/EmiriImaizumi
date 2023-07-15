$.scrollify({
section : ".box",//1ページスクロールさせたいエリアクラス名
scrollbars:"false",//スクロールバー表示・非表示設定
interstitialSection : "#header,#footer",//ヘッダーフッターを認識し、1ページスクロールさせず表示されるように設定
easing: "swing", // 他にもlinearやeaseOutExpoといったjQueryのeasing指定可能
scrollSpeed: 800, // スクロール時の速度

//以下、ページネーション設定
before:function(i,panels) {
var ref = panels[i].attr("data-section-name");
$(".pagination .active").removeClass("active");
$(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
},
afterRender:function() {
var pagination = "<ul class=\"pagination\">";
var activeClass = "";
$(".box").each(function(i) {//1ページスクロールさせたいエリアクラス名を指定
activeClass = "";
if(i===$.scrollify.currentIndex()) {
activeClass = "active";
}
pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
});
pagination += "</ul>";

$("#box1").append(pagination);//はじめのエリアにページネーションを表示
$(".pagination a").on("click",$.scrollify.move);
}

});
var lastScrollTop = 0;
$(function(){
    $('.scene-background-wrap').scroll(function() {
    box_offset = $('.scene-background-wrap').offset().top;
    item_offset = $('.box:last-child').offset().top;
    if ( box_offset == item_offset ) {
    $('.box').append($('.box:first-child'));
     }
    });
});

$(window).scroll(function () {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
        fadeAnimeDown();
    } else {
        fadeAnimeUp();
    }
    lastScrollTop = st;
});


function fadeAnimeDown() {
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    $('.blurTrigger').each(function () {
        var elemPos = $(this).offset().top - 50;
        if (scroll >= elemPos - windowHeight && scroll <= elemPos + windowHeight) {
            $(this).addClass('blur1');
            $(this).addClass('blur2');
            $(this).removeClass('blurTrigger2');
        } else {
            $(this).removeClass('blur1 blur2'); // 要素を非表示にするため、クラスをすべて削除
            $(this).addClass('blurTrigger2');
        }
    });
}

function fadeAnimeUp() {
    var scroll = $(window).scrollTop() + $(window).height();
    var windowHeight = $(window).height();

    $('.blurTrigger').each(function () {
        var elemPos = $(this).offset().top - 50;
        if (scroll >= elemPos && scroll <= elemPos + windowHeight) {
            $(this).addClass('blur1');
            $(this).addClass('blur2');
            $(this).removeClass('blurTrigger2');
        } else {
            $(this).removeClass('blur1 blur2'); // 要素を非表示にするため、クラスをすべて削除
            $(this).addClass('blurTrigger2');
        }
    });
}
