 addEventListener("load", function() {
     setTimeout(hideURLbar, 0);
 }, false);

 function hideURLbar() {
     window.scrollTo(0, 1);
 }
 document.addEventListener('DOMContentLoaded', function(event) {
     // array with texts to type in typewriter
     var dataText = ["Nitrogen Compresore",
         "Oxygen Compresore",
         "Medical gas Piping System"
     ];

     // type one text in the typwriter
     // keeps calling itself until the text is finished
     function typeWriter(text, i, fnCallback) {
         // chekc if text isn't finished yet
         if (i < (text.length)) {
             // add next character to h1
             document.querySelector(".animation_text").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

             // wait for a while and call this function again for next character
             setTimeout(function() {
                 typeWriter(text, i + 1, fnCallback)
             }, 70);
         }
         // text finished, call callback if there is a callback function
         else if (typeof fnCallback == 'function') {
             // call callback after timeout
             setTimeout(fnCallback, 700);
         }
     }
     // start a typewriter animation for a text in the dataText array
     function StartTextAnimation(i) {
         if (typeof dataText[i] == 'undefined') {
             setTimeout(function() {
                 StartTextAnimation(0);
             }, 2000);
         }
         // check if dataText[i] exists
         if (i < dataText[i].length) {
             // text exists! start typewriter animation
             typeWriter(dataText[i], 0, function() {
                 // after callback (and whole text has been animated), start next text
                 StartTextAnimation(i + 1);
             });
         }
     }
     // start the text animation
     StartTextAnimation(0);
 });




 $(document).on('ready', function() {
     $(".center").slick({
         dots: true,
         infinite: true,
         centerMode: true,
         slidesToShow: 2,
         slidesToScroll: 2,
         responsive: [{
             breakpoint: 800,
             settings: {
                 arrows: true,
                 centerMode: false,
                 slidesToShow: 1
             }
         }, {
             breakpoint: 480,
             settings: {
                 arrows: true,
                 centerMode: false,
                 centerPadding: '40px',
                 slidesToShow: 1
             }
         }]
     });
 });
 // <!-- //carousal -->
 //<!-- //js -->
 $(function() {

     // parameters
     // image height
     var images_height = '650px';
     // array of images
     var images_url = [
         'images/banner1.jpg',
         'images/banner2.jpg',
         'images/banner3.jpg'
     ];
     var images_count = images_url.length;

     // create nodes
     for (var j = 0; j < images_count + 1; j++) {
         $('.banner ul').append('<li></li>')
     }

     // pagination
     for (var j = 0; j < images_count; j++) {
         if (j == 0) {
             $('.banner ol').append('<li class="current"></li>')
         } else {
             $('.banner ol').append('<li></li>')
         }
     }

     // convert images into backgrounds
     $('.banner ul li').css('background-image', 'url(' + images_url[0] + ')');

     $.each(images_url, function(key, value) {
         $('.banner ul li').eq(key).css('background-image', 'url(' + value + ')');
     });

     $('.banner').css('height', images_height);

     $('.banner ul').css('width', (images_count + 1) * 100 + '%');

     $('.banner ol').css('width', images_count * 20 + 'px');
     $('.banner ol').css('margin-left', -images_count * 20 * 0.5 - 10 + 'px');

     var num = 0;

     var window_width = $(window).width();

     $(window).resize(function() {
         window_width = $(window).width();
         $('.banner ul li').css({
             width: window_width
         });
         clearInterval(timer);
         nextPlay();
         timer = setInterval(nextPlay, 2000);
     });

     $('.banner ul li').width(window_width);

     // pagination dots
     $('.banner ol li').mouseover(function() {
         $(this).addClass('current').siblings().removeClass('current');
         var i = $(this).index();
         //console.log(i);
         $('.banner ul').stop().animate({
             left: -i * window_width
         }, 500);
         num = i;
     });

     // autoplay
     var timer = null;

     function prevPlay() {
         num--;
         if (num < 0) {
             $('.banner ul').css({
                 left: -window_width * images_count
             }).stop().animate({
                 left: -window_width * (images_count - 1)
             }, 500);
             num = images_count - 1;
         } else {
             $('.banner ul').stop().animate({
                 left: -num * window_width
             }, 500);
         }
         if (num == images_count - 1) {
             $('.banner ol li').eq(images_count - 1).addClass('current').siblings().removeClass('current');
         } else {
             $('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');

         }
     }

     function nextPlay() {
         num++;
         if (num > images_count) {
             $('.banner ul').css({
                 left: 0
             }).stop().animate({
                 left: -window_width
             }, 500);
             num = 1;
         } else {
             $('.banner ul').stop().animate({
                 left: -num * window_width
             }, 500);
         }
         if (num == images_count) {
             $('.banner ol li').eq(0).addClass('current').siblings().removeClass('current');
         } else {
             $('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');

         }
     }

     timer = setInterval(nextPlay, 2000);

     // auto pause on mouse enter
     $('.banner').mouseenter(function() {
         clearInterval(timer);
         $('.banner i').fadeIn();
     }).mouseleave(function() {
         timer = setInterval(nextPlay, 2000);
         $('.banner i').fadeOut();
     });

     // goto next
     $('.banner .right').click(function() {
         nextPlay();
     });

     // back to previous
     $('.banner .left').click(function() {
         prevPlay();
     });

 });


 //<!-- flexisel -->
 //<script type="text/javascript">
 $(window).load(function() {
     $("#flexiselDemo1").flexisel({
         visibleItems: 4,
         animationSpeed: 1000,
         autoPlay: true,
         autoPlaySpeed: 3000,
         pauseOnHover: true,
         enableResponsiveBreakpoints: true,
         responsiveBreakpoints: {
             portrait: {
                 changePoint: 480,
                 visibleItems: 1
             },
             landscape: {
                 changePoint: 640,
                 visibleItems: 2
             },
             tablet: {
                 changePoint: 768,
                 visibleItems: 2
             }
         }
     });

 });

 //<!-- //flexisel -->
 //<!-- odometer-script -->


 window.odometerOptions = {
     format: '(,ddd).dd'
 };
 setTimeout(function() {
     jQuery('#w3l_stats1').html(125);
 }, 6000);
 window.odometerOptions = {
     format: '(,ddd).dd'
 };
 setTimeout(function() {
     jQuery('#w3l_stats2').html(330);
 }, 4000);
 window.odometerOptions = {
     format: '(,ddd).dd'
 };
 setTimeout(function() {
     jQuery('#w3l_stats3').html(22496);
 }, 4000);
 window.odometerOptions = {
     format: '(,ddd).dd'
 };
 setTimeout(function() {
     jQuery('#w3l_stats4').html(620);
 }, 1000);
 // <!-- //odometer-script -->
 //<!-- start-smoth-scrolling -->

 jQuery(document).ready(function($) {
     $(".scroll").click(function(event) {
         event.preventDefault();
         $('html,body').animate({
             scrollTop: $(this.hash).offset().top
         }, 1000);
     });
 });

 //<!-- start-smoth-scrolling -->


 //<!-- here stars scrolling icon -->

 $(document).ready(function() {
     /*
         var defaults = {
         containerID: 'toTop', // fading element id
         containerHoverID: 'toTopHover', // fading element hover id
         scrollSpeed: 1200,
         easingType: 'linear' 
         };
     */

     $().UItoTop({
         easingType: 'easeOutQuart'
     });

 });
 //<!-- //here ends scrolling icon -->
 //<!-- for bootstrap working -->

 //<!-- //for bootstrap working -->

 AOS.init();

 //<!-- Scroll number animation -->

 function inVisible(element) {
     //Checking if the element is
     //visible in the viewport
     var WindowTop = $(window).scrollTop();
     var WindowBottom = WindowTop + $(window).height();
     var ElementTop = element.offset().top;
     var ElementBottom = ElementTop + element.height();
     //animating the element if it is
     //visible in the viewport
     if ((ElementBottom <= WindowBottom) && ElementTop >= WindowTop)
         animate(element);
 }

 function animate(element) {
     //Animating the element if not animated before
     if (!element.hasClass('ms-animated')) {
         var maxval = element.data('max');
         var html = element.html();
         element.addClass("ms-animated");
         $({
             countNum: element.html()
         }).animate({
             countNum: maxval
         }, {
             //duration 5 seconds
             duration: 5000,
             easing: 'linear',
             step: function() {
                 element.html(Math.floor(this.countNum) + html);
             },
             complete: function() {
                 element.html(this.countNum + html);
             }
         });
     }

 }


 //When the document is ready
 $(function() {
     //This is triggered when the
     //user scrolls the page
     $(window).scroll(function() {
         //Checking if each items to animate are 
         //visible in the viewport
         $("h2[data-max]").each(function() {
             inVisible($(this));
         });
     })
 });