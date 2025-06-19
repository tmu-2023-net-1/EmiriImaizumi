$(window).on('load',function(){
  $("#splash").delay(2000).fadeOut('slow');
  
});

$(function() {
    var sceneWrap = $('.scene-background-wrap');
    var boxes = sceneWrap.find('.box');
    var lastBoxIndex = boxes.length - 1;
    var isScrolled = false;
  
    $(window).scroll(function() {
      var windowHeight = $(window).height();
      var scrollPos = $(this).scrollTop();
      var lastBoxOffset = boxes.eq(lastBoxIndex).offset().top + windowHeight;
  
      if (!isScrolled && scrollPos + windowHeight >= lastBoxOffset) {
        setTimeout(function() {
          $('html, body').animate({ scrollTop: sceneWrap.offset().top }, 800);
          isScrolled = true;
          resetURLAndScrollToBox2();
        }, 200);
      } else if (isScrolled && scrollPos === sceneWrap.offset().top) {
        setTimeout(function() {
          $('html, body').animate({ scrollTop: boxes.eq(0).offset().top }, 800, function() {
            isScrolled = false;
          });
        }, 200);
      }
  
      boxes.each(function(index) {
        var boxOffset = $(this).offset().top;
        if (scrollPos >= boxOffset && scrollPos < boxOffset + windowHeight) {
          $('.pagination .active').removeClass('active');
          $('.pagination').find('a[href="#' + $(this).attr('data-section-name') + '"]').addClass('active');
        }
      });
  
      var st = $(this).scrollTop();
      if (st > lastScrollTop) {
        fadeAnimeDown();
      } else {
        fadeAnimeUp();
      }
      lastScrollTop = st;
    });
  
    $.scrollify({
      section: ".box",
      scrollbars: false,
      interstitialSection: "#header",
      easing: "swing",
      scrollSpeed: 1500,
      before: function(i, panels) {
        var ref = panels[i].attr("data-section-name");
        $(".pagination .active").removeClass("active");
        $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
      },
      afterRender: function() {
        var pagination = "<ul class=\"pagination\">";
        var activeClass = "";
        $(".box").each(function(i) {
          activeClass = "";
          if (i === $.scrollify.currentIndex()) {
            activeClass = "active";
          }
          pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
        });
        pagination += "</ul>";
  
        $("#box2").append(pagination);
        $(".pagination a").on("click", $.scrollify.move);
      }
    });
  
    var lastScrollTop = 0;
  
    //下向きスクロール文字
    function fadeAnimeDown() {
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
  
      $('.blurTrigger').each(function() {
        var elemPos = $(this).offset().top - 50;
        if (scroll >= elemPos - windowHeight && scroll <= elemPos + windowHeight) {
          $(this).addClass('blur1');
          $(this).addClass('blur2');
          $(this).removeClass('blurTrigger2');
        } else {
          $(this).removeClass('blur1 blur2');
          $(this).addClass('blurTrigger2');
        }
      });
    }
  //上向きスクロール文字表示
    function fadeAnimeUp() {
      var scroll = $(window).scrollTop() + $(window).height();
      var windowHeight = $(window).height();
  
      $('.blurTrigger').each(function() {
        var elemPos = $(this).offset().top - 50;
        if (scroll >= elemPos && scroll <= elemPos + windowHeight) {
          $(this).addClass('blur1');
          $(this).addClass('blur2');
          $(this).removeClass('blurTrigger2');
        } else {
          $(this).removeClass('blur1 blur2');
          $(this).addClass('blurTrigger2');
        }
      });
    }
  
    function resetURLAndScrollToBox2() {
      history.replaceState({}, document.title, window.location.href.split('#')[0] + '#box2');
      $.scrollify.move('#黎明');
    }
  });
  