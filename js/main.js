var VIEWPORTWIDTH = 0;
$(document).ready(function() {
    $('.slider-bra').each(function() {
        slider_bra(this);
    });
    $('.dce-slider-icons').each(function() {
        slider_icons(this);
    });
    // $('.back-to-top').on('click', function() {
    //     $('html, body').animate({
    //         scrollTop: 0
    //     }, 1000);
    // });
    $('.sticky-seite .icon').click(function() {
        $(this).parent().toggleClass('open');
    });
    $(document).click(function(e) {
        var target = $(e.target);
        if ($(target).closest('.sticky-phone').length === 0) {
            $('.sticky-phone').removeClass('open');
        }
    });
    $('#main-header nav ul.level1 > li').each(function() {
        var level2 = $(this).find('ul.level2');
        if ($(level2).length > 0) {
            $(this).find('.no_text a').on('click', function(e) {
                e.preventDefault();
            });
            var dorpdown = $(('<div class="dropdown clearfix"></div>'));
            var menu_points_el = $('<div class="menu-points"><ul></ul></div>');
            $(level2).find('li').each(function(index, value) {
                $(menu_points_el).find('ul').append($(this).clone());
            });
            $(dorpdown).append(menu_points_el);
            var image = ($(this).find('.no_pic img').length > 0) ? '<div class="submenu-img"><img src="' + $(this).find('.no_pic img').attr('src') + '"></div>' : '';
            $(dorpdown).append(image);
            $(this).append(dorpdown);
            $(this).find('.no_text').append('<div class="arrow-down"></div>');
        }
    });
    $("#main-header nav ul.level1 > li").hover(function() {
        if (VIEWPORTWIDTH > 1000) {
            $(this).addClass('active');
        }
    }, function() {
        if (VIEWPORTWIDTH > 1000) {
            $(this).removeClass('active');
        }
    });
    $("#main-header nav ul.level1 > li").on('click', function() {
        if (VIEWPORTWIDTH <= 1000) {
            $(this).toggleClass('active');
            $(this).find('.level2').slideToggle();
        }
    });
    $('#open-menu-mobile').on('click', function() {
        $('nav.main-nav').slideToggle();
        $(this).toggleClass('close');
    });
    $(window).resize(function() {
        resizing();
    });
    $(window).resize();

    initBrowserSwitch();
    initLanguageDropDown();
    mainNavHandler();
    initMainNavigationHandler();
    // initMediaElementSwiper();
    initSliderWithTextPerSlide();
    initSliderWithTextblock();
    initNewsSlider();
    initImageSlider();
    initGallerySlider();
    initFancyLabels();
    initAnimateFormSelectArrow();
    initJumpLinks();
    initHeaderScrollHelper();
    initLocalTimeConversion();
    initWebinarHelper();
    initCustomParsleyValidators();
    initWeChatQRCodeHandler();
    initImageJumpLinks();
});
$(window).on('load', function() {});
var t = null;


function initWeChatQRCodeHandler() {
    $('.wechatQrCodeToggle').click(function(e) {
        e.preventDefault();
        
        if ($('#wechatQrCode').hasClass('active')) {
            $('#wechatQrCode').removeClass('active');
        } else {
            $('#wechatQrCode').addClass('active');

            $(window).one('scroll', function() {
                $('#wechatQrCode').removeClass('active');
            });
        }
    });
}

function resizing() {
    if (t != null) clearTimeout(t);
    t = setTimeout(function() {
        if ($(window).width() != VIEWPORTWIDTH) {
            VIEWPORTWIDTH = $(window).width();
            $('.main-nav .level1 li').removeClass('active');
            $('.main-nav .level1 li .level2').attr('style', '');
            $('nav.main-nav').attr('style', '');
            $('#open-menu-mobile').removeClass('close');
            var std_box_h = $('.dce-box.box-1-1').first().height();
            $('.dce-box').each(function() {
                if ($(this).hasClass('box-2-1')) {
                    $(this).find('.prop').css('padding-top', std_box_h + 'px');
                }
                if ($(this).hasClass('box-1-2')) {
                    var h = (std_box_h * 2) + 14;
                    $(this).find('.prop').css('padding-top', h + 'px');
                }
            });
        }
    }, 200);
}

function initBrowserSwitch() {
    var $html = $('html'),
        ieVersion = getInternetExplorerVersion(),
        gcVersion = getGoogleChromeVersion();

    if (ieVersion != -1)        $html.addClass('ie ie' + ieVersion);
    if (isEdge())               $html.addClass('edge');
    if (gcVersion != -1)        $html.addClass('gc gc' + gcVersion);
    if (Utils.isMobileDevice)   $html.addClass('mobile');
    if (Utils.isiOS)            $html.addClass('ios');
    if (Utils.isDesktopSafari)  $html.addClass('safari');
    if (Utils.isMobileSafari)   $html.addClass('mobileSafari');
}

function slider_bra(element) {
    var object = {
        element: element,
        total_slides: $(element).find('.slide').length,
        startX: 0,
        startY: 0,
        animating: false,
        current_slider_pos: 100,
        current_touch_diff: 0,
        current_new_pos: 0,
        current_slide_index: 1,
        swipe_container: $(element).find('.swipe-container'),
        brosch_pro_slide: 0,
        slider_init_content: $(element).find('.swipe-container').clone(),
        touchstarted: 0,
        slider_interval: false,
        move_to_pos: function(pos) {
            $(object.element).find(".navigation-points .point[data-pos='" + pos + "']").trigger('click');
        }
    };
    init();

    function init() {
        if (object.total_slides <= 1) {
            $(object.element).find('.slide:first').addClass('active');
            $(object.element).find('.prev').hide();
            $(object.element).find('.next').hide();
            $(object.element).find('.nav-numb').hide();
            return false;
        }
        $(object.element).find('.prev').show();
        $(object.element).find('.next').show();
        if ($(object.element).attr('data-show-navigation') == 1) {
            var points_el = $('<div class="navigation-points"></div>');
            for (j = 0; j < object.total_slides; j++) {
                var first = j == 0 ? 'active' : '';
                var nav_point = $('<div class="point ' + first + '" data-pos="' + j + '"><div class="ball"></div></div>');
                $(points_el).append(nav_point);
            }
            $(object.element).append(points_el);
        }
        if ($(object.element).attr('data-show-navigation-numbers') == 1) {
            $(object.element).find('.nav-numb').show();
            $(object.element).find('.nav-numb .num-text').html('1/' + object.total_slides);
            $(object.element).find('.nav-numb').on('click', function(e) {
                e.stopPropagation();
            });
        }
        if ($(object.element).attr('data-autostart') == '1') {
            var time_interval = parseInt($(object.element).attr('data-speed'));
            time_interval = isNaN(time_interval) ? 7000 : $(object.element).attr('data-speed');
            time_interval = parseInt(time_interval) + 1000;
            var delay = parseInt($(object.element).attr('data-delay'));
            delay = isNaN(delay) ? 0 : $(object.element).attr('data-delay');
            delay = parseInt(delay) + 1000;
            setTimeout(function() {
                intervalchange(true);
                object.slider_interval = setInterval(function() {
                    intervalchange(false);
                }, time_interval);
            }, delay);
        }
        $(object.element).find('.slide:first').addClass('active');
        var count = 0;
        $(object.element).find('.slide').each(function() {
            $(this).attr('data-init-pos', count);
            $(this).attr('data-pos', count);
            count++;
        });
        if ($(object.element).hasClass('swipe-effect')) {
            init_as_swipe();
        } else {
            init_as_fadein();
        }
    }

    function intervalchange(isFirstCall) {
        if ($(object.element).hasClass('swipe-effect')) {
            if (object.animating) {
                return;
            }
            if (!isFirstCall) {
                object.current_slide_index = parseInt($(object.element).find('.slide.active').attr('data-pos'));
                moveToPos(object.current_slide_index + 1);
            }
        } else {
            var active_slide = $(object.element).find('.slide.active');
            $(object.element).find('.slide').removeClass('active');
            if ($(active_slide).next().length === 0) {
                var next_slide = $(object.element).find('.slide:first');
            } else {
                var next_slide = $(active_slide).next();
            }
            $(next_slide).addClass('active');
            update_points($(next_slide).attr('data-init-pos'));
        }
    }

    function stop_autochange_slide() {
        if (object.slider_interval !== false) {
            clearInterval(object.slider_interval);
            object.slider_interval = false;
        }
    }

    function init_as_fadein() {
        $(object.element).find('.slide:first').addClass('active');
        $(object.element).find('.prev').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var active_slide = $(object.element).find('.slide.active');
            $(object.element).find('.slide').removeClass('active');
            if ($(active_slide).prev().length === 0) {
                var next_slide = $(object.element).find('.slide:last');
            } else {
                var next_slide = $(active_slide).prev();
            }
            $(next_slide).addClass('active');
            update_points($(next_slide).attr('data-init-pos'));
            stop_autochange_slide();
        });
        $(object.element).find('.next').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var active_slide = $(object.element).find('.slide.active');
            $(object.element).find('.slide').removeClass('active');
            if ($(active_slide).next().length === 0) {
                var next_slide = $(object.element).find('.slide:first');
            } else {
                var next_slide = $(active_slide).next();
            }
            $(next_slide).addClass('active');
            update_points($(next_slide).attr('data-init-pos'));
            stop_autochange_slide();
        });
        $(object.element).find('.navigation-points .point').on('click', function() {
            var pos = $(this).attr('data-pos');
            $(object.element).find('.slide').removeClass('active');
            $(object.element).find('.slide[data-init-pos="' + pos + '"]').addClass('active');
            update_points(pos);
        });
    }

    function init_as_swipe() {
        arrange_carrousel_slides();
        $(object.element).find('.prev').on('click', function() {
            if (object.animating) {
                return;
            }
            object.current_slide_index = parseInt($(object.element).find('.slide.active').attr('data-pos'));
            moveToPos(object.current_slide_index - 1);
            stop_autochange_slide();
        });
        $(object.element).find('.next').on('click', function() {
            if (object.animating) {
                return;
            }
            object.current_slide_index = parseInt($(object.element).find('.slide.active').attr('data-pos'));
            moveToPos(object.current_slide_index + 1);
            stop_autochange_slide();
        });
        $(object.element).find('.slide').on('touchstart', function(e) {
            if (object.animating) {
                return;
            }
            object.touchstarted = 1;
            $(object.swipe_container).addClass('no-transition');
            object.current_slide_index = parseInt($(this).attr('data-pos'));
            object.startX = e.originalEvent.clientX ? e.originalEvent.clientX : e.originalEvent.touches[0].clientX;
            object.startY = e.originalEvent.clientY ? e.originalEvent.clientY : e.originalEvent.touches[0].clientY;
            stop_autochange_slide();
        });
        $(object.element).find('.slide').on('touchmove', function(e) {
            if (object.animating || object.touchstarted != 1) {
                return;
            }
            var newX = e.originalEvent.clientX ? e.originalEvent.clientX : e.originalEvent.touches[0].clientX;
            var newY = e.originalEvent.clientY ? e.originalEvent.clientY : e.originalEvent.touches[0].clientY;
            var diffX = newX - object.startX;
            var diffXPos = diffX;
            var diffY = newY - object.startY;
            if (diffX < 0) {
                diffXPos *= -1;
            }
            if (diffY < 0) {
                diffY *= -1;
            }
            if (diffXPos > 5 && diffXPos > diffY) {
                e.preventDefault();
                e.stopPropagation();
                var newPos = (diffX / $(this).width()) * 100;
                object.current_touch_diff = newPos;
                $(object.swipe_container).css('transform', 'translate3d(' + (object.current_slider_pos + newPos) + '%, 0, 0)');
            }
        });
        $(object.element).find('.slide').on('touchend', function(e) {
            if (object.animating) {
                return;
            }
            object.touchstarted = 0;
            var threshold = 10;
            if (object.current_touch_diff > 0) {
                if (object.current_touch_diff > threshold) {
                    moveToPos(object.current_slide_index - 1);
                } else {
                    moveToPos(object.current_slide_index);
                }
            } else if (object.current_touch_diff < 0) {
                if (object.current_touch_diff < -threshold) {
                    moveToPos(object.current_slide_index + 1);
                } else {
                    moveToPos(object.current_slide_index);
                }
            }
            object.current_touch_diff = 0;
        });
        $(object.element).find('.navigation-points .point').on('click', function(e) {
            if (object.animating) {
                return;
            }
            var pos = $(this).attr('data-pos');
            var next_slide = $(object.element).find('.slide[data-init-pos="' + pos + '"]').first();
            moveToPos(parseInt($(next_slide).attr('data-pos')));
        });
    }

    function update_points(active_pos) {
        active_pos = active_pos > (object.total_slides - 1) ? 0 : active_pos;
        var nav_el = $(object.element).find('.navigation-points');
        $(nav_el).find('.point').removeClass('active');
        $(nav_el).find('.point[data-pos="' + active_pos + '"]').addClass('active');
        if ($(object.element).find('.nav-numb').length > 0) {
            var numb = parseInt(active_pos) + 1;
            $(object.element).find('.nav-numb .num-text').html(numb + '/' + object.total_slides);
        }
    }

    function moveToPos(next_slide) {
        object.animating = true;
        $(object.swipe_container).removeClass('no-transition');
        object.current_slider_pos = next_slide * (-100);
        $(object.swipe_container).css('transform', 'translate3d(' + object.current_slider_pos + '%, 0, 0)');
        object.current_slide_index = next_slide;
        $(object.element).find('.slide').removeClass('active');
        var next_slide_el = $(object.element).find('.slide[data-pos="' + object.current_slide_index + '"]');
        $(next_slide_el).addClass('active');
        update_points(parseInt($(next_slide_el).attr('data-init-pos')));
        setTimeout(function() {
            arrange_carrousel_slides();
        }, 1050);
    }

    function arrange_carrousel_slides() {
        $(object.swipe_container).addClass('no-transition');
        var active_slide = $(object.element).find('.slide[data-pos="' + object.current_slide_index + '"]');
        if (object.total_slides == 2) {
            if ($(active_slide).next().length === 0) {
                $(object.element).find('.slide:first').remove();
                $(active_slide).after($(object.element).find('.slide:first').clone(true));
                object.current_slider_pos = object.current_slider_pos + 100;
                $(object.swipe_container).css('transform', 'translate3d(' + object.current_slider_pos + '%, 0, 0)');
            } else if ($(active_slide).prev().length === 0) {
                if ($(element).find('.slide').length >= 3) {
                    $(object.element).find('.slide:last').remove();
                    $(active_slide).before($(object.element).find('.slide:last').clone(true));
                    object.current_slider_pos = object.current_slider_pos - 100;
                    $(object.swipe_container).css('transform', 'translate3d(' + object.current_slider_pos + '%, 0, 0)');
                } else {
                    var slide = $(object.element).find('.slide:last');
                    $(active_slide).before($(slide).clone(true));
                    object.current_slider_pos = object.current_slider_pos - 100;
                    $(object.swipe_container).css('transform', 'translate3d(' + object.current_slider_pos + '%, 0, 0)');
                }
            }
        } else {
            if ($(active_slide).next().length === 0) {
                $(active_slide).after($(object.element).find('.slide:first'));
                object.current_slider_pos = object.current_slider_pos + 100;
                $(object.swipe_container).css('transform', 'translate3d(' + object.current_slider_pos + '%, 0, 0)');
            } else if ($(active_slide).prev().length === 0) {
                $(active_slide).before($(object.element).find('.slide:last'));
                object.current_slider_pos = object.current_slider_pos - 100;
                $(object.swipe_container).css('transform', 'translate3d(' + object.current_slider_pos + '%, 0, 0)');
            }
        }
        update_current_slide_index();
        object.animating = false;
    }

    function update_current_slide_index() {
        var count = 0;
        $(object.element).find('.slide').each(function() {
            $(this).attr('data-pos', count);
            count++;
        });
    }
    if ($(object.element).hasClass('boxes-container-grid-3')) {
        $(window).resize(function() {
            var new_brosch_pro_slide = 0;
            new_brosch_pro_slide = 5;
            if (object.brosch_pro_slide !== new_brosch_pro_slide) {
                object.brosch_pro_slide = new_brosch_pro_slide;
                var slides = $('<div></div>');
                var slide = $('<div class="slide"></div>');
                var total_broschures = $(object.slider_init_content).find('.dce-box').length;
                var brosch_width = Math.floor(((100 - ((new_brosch_pro_slide - 1) * 3)) / new_brosch_pro_slide) * 100) / 100;
                $(object.slider_init_content).find('.dce-box').each(function(index, value) {
                    $(slide).append($(this).clone());
                    if (((index + 1) % new_brosch_pro_slide === 0 && (index != 0 || new_brosch_pro_slide == 1)) || (index + 1) == total_broschures) {
                        $(slides).append($(slide).clone());
                        slide = $('<div class="slide"></div>');
                    }
                });
                $(object.swipe_container).attr('style', '');
                object.current_slider_pos = 0;
                object.current_slide_index = 0;
                object.total_slides = $(slides).find('.slide').length;
                $(object.element).find('.prev').off();
                $(object.element).find('.next').off();
                $(object.element).find('.navigation-points').remove();
                stop_autochange_slide();
                $(object.swipe_container).html($(slides).html());
                init();
            }
        });
    }
    return object;
}

function initLanguageDropDown() {
    var $dropdownToggle = $(".dropdown.languageNav .dropdown-toggle");
    var $body = $("body");

    if ($dropdownToggle.length > 0) {
        $dropdownToggle.on("click", function(e) {
            e.stopPropagation();
            e.preventDefault();
            if (!$dropdownToggle.parent().hasClass("open")) {
                $dropdownToggle.parent().addClass("open");
            }
            else {
                $dropdownToggle.parent().removeClass("open");
            }
        });
    }

    $body.on("click", function() {
        $dropdownToggle.parent().removeClass("open");
    });
}

function slider_icons(element) {
    var object = {
        element: element,
        total_icons: $(element).find('.icon-container').length,
        icon_width: 0,
        swipe_container: $(element).find('.swipe-container'),
        animating: false,
        touchstarted: 0,
        startX: 0,
        startY: 0,
        current_touch_diff: 0,
        slider_init_content: $(element).find('.swipe-container').clone(),
        icons_pro_slide: 0,
        slider_interval: false
    };
    init();

    function init() {
        object.icons_pro_slide = icons_pro_slide();
        object.icon_width = 100 / object.icons_pro_slide;
        $(object.element).find('.icon-container').css('width', object.icon_width + '%');
        if (object.icons_pro_slide >= object.total_icons) {
            $(object.element).find('.prev, .next').hide();
        } else {
            $(object.element).find('.prev, .next').show();
            arrange_icons('first');
            $(object.element).find('.prev').on('click', function() {
                prev();
                stop_autochange();
            });
            $(object.element).find('.next').on('click', function() {
                next();
                stop_autochange();
            });
            init_touch_events();
            var time_interval = $(object.element).attr('data-autostart');
            if (!isNaN(time_interval) && time_interval !== '0' && time_interval !== '') {
                object.slider_interval = setInterval(function() {
                    next();
                }, time_interval);
            }
            $(object.swipe_container).on('mouseenter', function() {
                stop_autochange();
            });
        }
    }

    function icons_pro_slide() {
        var width = 0;
        var view_widt = VIEWPORTWIDTH == 0 ? $(window).width() : VIEWPORTWIDTH;
        if (view_widt > 1200) {
            width = 5;
        } else if (view_widt > 1024) {
            width = 4;
        } else if (view_widt > 768) {
            width = 3;
        } else if (view_widt > 480) {
            width = 2;
        } else if (view_widt <= 480) {
            width = 1;
        }
        return width;
    }

    function prev() {
        if (object.animating) {
            return;
        }
        object.animating = true;
        $(object.swipe_container).removeClass('no-transition');
        $(object.swipe_container).css('transform', 'translate3d(0, 0, 0)');
        setTimeout(function() {
            arrange_icons('prev');
        }, 400);
    }

    function next() {
        if (object.animating) {
            return;
        }
        object.animating = true;
        $(object.swipe_container).removeClass('no-transition');
        var pos = object.icon_width * (-2);
        $(object.swipe_container).css('transform', 'translate3d(' + pos + '%, 0, 0)');
        setTimeout(function() {
            arrange_icons('next');
        }, 400);
    }

    function stop_autochange() {
        if (object.slider_interval !== false) {
            clearInterval(object.slider_interval);
        }
    }

    function dont_move() {
        if (object.animating) {
            return;
        }
        object.animating = true;
        $(object.swipe_container).removeClass('no-transition');
        $(object.swipe_container).css('transform', 'translate3d(-' + object.icon_width + '%, 0, 0)')
        setTimeout(function() {
            $(object.swipe_container).addClass('no-transition');
            object.animating = false;
        }, 400);
    }

    function arrange_icons(arr) {
        $(object.swipe_container).addClass('no-transition');
        if (arr == 'first') {
            var last_el = $(object.swipe_container).find('.icon-container:last').clone();
            $(object.swipe_container).prepend(last_el);
            $(object.swipe_container).css('transform', 'translate3d(-' + object.icon_width + '%, 0, 0)');
        } else if (arr == 'prev') {
            $(object.element).find('.icon-container:last').remove();
            $(object.swipe_container).prepend($(object.element).find('.icon-container:last').clone());
            $(object.swipe_container).css('transform', 'translate3d(-' + object.icon_width + '%, 0, 0)');
        } else {
            $(object.element).find('.icon-container:first').remove();
            $(object.swipe_container).append($(object.element).find('.icon-container:first').clone());
            $(object.swipe_container).css('transform', 'translate3d(-' + object.icon_width + '%, 0, 0)');
        }
        object.animating = false;
    }

    function init_touch_events() {
        $(object.element).find('.center-div').on('touchstart', function(e) {
            if (object.animating) {
                return;
            }
            object.touchstarted = 1;
            $(object.swipe_container).addClass('no-transition');
            object.startX = e.originalEvent.clientX ? e.originalEvent.clientX : e.originalEvent.touches[0].clientX;
            object.startY = e.originalEvent.clientY ? e.originalEvent.clientY : e.originalEvent.touches[0].clientY;
        });
        $(object.element).find('.center-div').on('touchmove', function(e) {
            if (object.animating || object.touchstarted != 1) {
                return;
            }
            var newX = e.originalEvent.clientX ? e.originalEvent.clientX : e.originalEvent.touches[0].clientX;
            var newY = e.originalEvent.clientY ? e.originalEvent.clientY : e.originalEvent.touches[0].clientY;
            var diffX = newX - object.startX;
            var diffXPos = diffX;
            var diffY = newY - object.startY;
            if (diffX < 0) {
                diffXPos *= -1;
            }
            if (diffY < 0) {
                diffY *= -1;
            }
            if (diffXPos > 5 && diffXPos > diffY) {
                e.preventDefault();
                e.stopPropagation();
                stop_autochange();
                var newPos = (diffX / $(this).width()) * 100;
                object.current_touch_diff = newPos;
                $(object.swipe_container).css('transform', 'translate3d(' + (-object.icon_width + newPos) + '%, 0, 0)');
            }
        });
        $(object.element).find('.center-div').on('touchend', function(e) {
            if (object.animating) {
                return;
            }
            object.touchstarted = 0;
            var threshold = 10;
            if (object.current_touch_diff > 0) {
                if (object.current_touch_diff > threshold) {
                    prev();
                } else {
                    dont_move();
                }
            } else if (object.current_touch_diff < 0) {
                if (object.current_touch_diff < -threshold) {
                    next();
                } else {
                    dont_move();
                }
            }
            object.current_touch_diff = 0;
        });
    }
    $(window).resize(function() {
        if (icons_pro_slide() !== object.icons_pro_slide) {
            $(object.element).find('.prev').off();
            $(object.element).find('.next').off();
            $(object.swipe_container).remove();
            $(object.element).find('.center-div').append(object.slider_init_content.clone());
            object.swipe_container = $(object.element).find('.swipe-container');
            stop_autochange();
            init();
        }
    });
}
var styles = [{
    "featureType": "water",
    "stylers": [{
        "weight": 0.1
    }, {
        "hue": "#1900ff"
    }]
}, {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{
        "saturation": 1
    }, {
        "lightness": 1
    }, {
        "gamma": 1
    }]
}];

function mainNavHandler() {
    var openMenuTimeout;
    var closeMenuTimeout;
    var delay = 250;
    var $toOpenMenu;
    var $toCloseMenu;

    $('ul.menu > li').on('mouseenter', function() {
        $toOpenMenu = $(this).find('.submenu');
        clearTimeout(openMenuTimeout);
        clearTimeout(closeMenuTimeout);
        openMenuTimeout = setTimeout(function() {
            $('ul.menu > li .submenu').hide();
            $toOpenMenu.show();
        }, delay);
    });

    $('ul.menu > li').on('mouseleave', function() {
        $toCloseMenu = $(this).find('.submenu');
        closeMenuTimeout = setTimeout(function() {
            $toCloseMenu.hide();
        }, delay);
    });
}

// var swiperDefaultConfig = {
//     watchOverflow: true,
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
//     autoplay: {
//         delay: 5000,
//     },
// };
//
// function swiperConfig(customConfig) {
//     return $.extend(true, {}, swiperDefaultConfig, customConfig);
// }

function initSliderWithTextblock() {
    $('.sliderWithTextblock').each(function() {
        var $this = $(this);
        var $imageSwiperContainer = $this.find('.swiper-container.images');
        var $imageTextPerSlideSwiperContainer = $this.find('.swiper-container.imagesTextPerSlide');

        var $thumbnailNavigation = $this.find('.thumbnailNavigation');
        var thumbnailSlider = null;

        var $bigThumbnails = $this.find('.bigThumbnailsContainer .bigThumbnail .textpicContainer > a');

        if ($thumbnailNavigation.length) {
            thumbnailSlider = new Swiper($thumbnailNavigation[0], {
                spaceBetween: 10,
                slidesPerView: 5,
                freeMode: true,
                // loop: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
            });
        }

        var imageSwiper = new Swiper($imageSwiperContainer[0], {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // loop: true,
            thumbs: {
              swiper: thumbnailSlider
            },
            autoplay: {
                delay: 5000,
            },
        });

        var imageTextPerSlideSwiper = new Swiper($imageTextPerSlideSwiperContainer[0], {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // loop: true,
            thumbs: {
              swiper: thumbnailSlider
            },
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            autoHeight: true,
            // autoplay: {
            //     delay: 5000,
            // },
        });

        $bigThumbnails.click(function(e) {
            e.preventDefault();

            imageTextPerSlideSwiper.slideTo($(this).parents('.bigThumbnailContainer').index());

            $('html, body').animate({ scrollTop: $this.offset().top - 150 }, 450);
        });

        // $imageSwiperContainer
        //     .on('mouseenter', function() {
        //         imageSwiper.autoplay.stop();
        //     })
        //     .on('mouseleave', function() {
        //         imageSwiper.autoplay.start();
        //     })
        // ;
    });
}

function initSliderWithTextPerSlide() {
    $('.sliderWithTextPerSlide').each(function() {
        var $this = $(this);
        var $imageSwiperContainer = $this.find('.swiper-container.images');

        var $thumbnailNavigation = $this.find('.thumbnailNavigation');
        var thumbnailSlider = new Swiper($thumbnailNavigation[0], {
            spaceBetween: 10,
            slidesPerView: 5,
            breakpoints: {
                950: {
                    slidesPerView: 4,
                },
                880: {
                    slidesPerView: 0,
                },
            },
            freeMode: true,
            // loop: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });

        var imageSwiper = new Swiper($imageSwiperContainer[0], {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            // loop: true,
            thumbs: {
              swiper: thumbnailSlider
            },
            autoplay: {
                delay: 5000,
            },
        });

        $imageSwiperContainer
            .on('mouseenter', function() {
                imageSwiper.autoplay.stop();
            })
            .on('mouseleave', function() {
                imageSwiper.autoplay.start();
            })
        ;
    });
}

function initNewsSlider() {
    $('.newsSlider').each(function() {
        var $this = $(this);
        var $imageSwiperContainer = $this.find('.swiper-container.images');

        var $thumbnailNavigation = $this.find('.thumbnailNavigation');
        var thumbnailSlider = new Swiper($thumbnailNavigation[0], {
            spaceBetween: 10,
            slidesPerView: 4,
            breakpoints: {
                677: {
                    slidesPerView: 3,
                },
                404: {
                    slidesPerView: 2,
                },
            },
            freeMode: true,
            // loop: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });

        var imageSwiper = new Swiper($imageSwiperContainer[0], {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // loop: true,
            thumbs: {
              swiper: thumbnailSlider
            },
            watchOverflow: true,
            autoplay: {
                delay: 5000,
            },
        });

        $imageSwiperContainer
            .on('mouseenter', function() {
                imageSwiper.autoplay.stop();
            })
            .on('mouseleave', function() {
                imageSwiper.autoplay.start();
            })
        ;
    });
}

function initImageSlider() {
    $('.imageSlider').each(function() {
        var $this = $(this);
        var $imageSwiperContainer = $this.find('.swiper-container.images');

        var $thumbnailNavigation = $this.find('.thumbnailNavigation');
        var thumbnailSlider = new Swiper($thumbnailNavigation[0], {
            spaceBetween: 10,
            slidesPerView: 5,
            breakpoints: {
                950: {
                    slidesPerView: 4,
                },
                767: {
                    slidesPerView: 3,
                },
                400: {
                    slidesPerView: 2,
                },
            },
            freeMode: true,
            // loop: true,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
        });

        var imageSwiper = new Swiper($imageSwiperContainer[0], {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            // loop: true,
            thumbs: {
              swiper: thumbnailSlider
            },
            autoplay: {
                delay: 5000,
            },
        });

        $imageSwiperContainer
            .on('mouseenter', function() {
                imageSwiper.autoplay.stop();
            })
            .on('mouseleave', function() {
                imageSwiper.autoplay.start();
            })
        ;
    });
}

function initGallerySlider() {
    var $gallerySliderContainer = $('.gallerySliderContainer');

    if (!$gallerySliderContainer.length) {
        return;
    }

    $gallerySliderContainer.each(function() {
        var $this = $(this);
        var $gallerySwiperContainer = $this.find('.swiper-container.imageGalleryContainer');

        var gallerySwiper = new Swiper($gallerySwiperContainer[0], {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            slidesPerView: 3,
            spaceBetween: 20,
            breakpoints: {
                576: {
                    slidesPerView: 2,
                },
                400: {
                    slidesPerView: 1,
                },
            },
            // autoplay: {
            //     delay: 5000,
            // },
        });
    });
}

function initFancyLabels() {
    var $container = $('.fancyLabelContainer');
    var $input = $('input, textarea', $container);

    if ($container.length > 0) {
        $input.each(function() {
            if ($(this).val()) {
                $(this).parents('.fancyLabelContainer').addClass('focused');
            }
        });

        $('body').on('click', '.fancyLabelContainer label', function() {
            $(this).parents('.fancyLabelContainer').find('input, textarea, select').focus();
        });

        $('body').on('focusin focus', '.fancyLabelContainer input, .fancyLabelContainer textarea, .fancyLabelContainer:not(.selectBoxWithBox) select', function() {
            $(this).parents('.fancyLabelContainer').addClass('focused changeBorder');
        });

        $('body').on('focusout blur', '.fancyLabelContainer input, .fancyLabelContainer textarea, .fancyLabelContainer:not(.selectBoxWithBox) select', function() {
            if(!$(this).val()) {
                $(this).parents('.fancyLabelContainer').removeClass('focused changeBorder');
            }
            else {
                $(this).parents('.fancyLabelContainer').removeClass('changeBorder');
            }
        });

        $('body').on('change', '.fancyLabelContainer input, .fancyLabelContainer textarea, .fancyLabelContainer:not(.selectBoxWithBox) select', function() {
            if ($(this).val() && !$(this).parents('.fancyLabelContainer').hasClass('focused')) {
                $(this).parents('.fancyLabelContainer').addClass('focused changeBorder');
            }
        });
    }
}

function initAnimateFormSelectArrow() {
    var $selectFields = $(".tx-powermail select");

    if ($selectFields.length > 0) {
        $selectFields.each(function() {
            $(this).on({
                "click": function() {
                    if (!$(this).parent().hasClass("active")) {
                        $(this).parent().addClass("active")
                    }
                    else {
                        $(this).parent().removeClass("active")
                    }
                },
                "blur": function() {
                    $(this).parent().removeClass("active")
                }
            })
        });
    }
}

function initJumpLinks() {
    $(document.body).on('click', 'a[href*="#"]:not(a[href*="#!"])', function(e) {

        // Only handle this jump link, if the target element is on this page.
        // if (
        //     typeof this.href.replace == 'function'
        //  && this.href.replace(this.hash, '') != window.location
        // ) {
        //     return;
        // }

        e.preventDefault();

        var $target = $(this.hash);
        if ($target.length == 0) return;

        scrollToElement($target, this.hash);
    });

    function scrollToElement($el, hash) {
        var offsetTop = $el.offset().top;
        var $headerContainer = $('#header1Container');

        offsetTop -= 15;

        if ($headerContainer.length > 0) {
            offsetTop -= $headerContainer.height()
        }
        $('html, body').animate({ scrollTop: offsetTop }, 450);
    }
}

function initMainNavigationHandler() {
    // if (document.body.classList.contains('dev')) {
        var $mainNavi = $('#mainNavigation');
        if ($mainNavi.length == 0) return;

        $mainNavi.on('show.bs.collapse', function(e) {
            var $collapse = $(e.target);

            $collapse.parents('li').first().addClass('open');

            $collapse
                .parents('ul')
                .first()
                .find('.collapse')
                .not($collapse)
                .collapse('hide');
        });

        $mainNavi.on('hidden.bs.collapse', function(e) {
            var $collapse = $(e.target);

            $collapse.parents('li').first().removeClass('open');

            $collapse
                .find('.collapse')
                .collapse('hide');
        });

    // } else {
    //     var nav = $('#mainNavigation');
    //     var navContainer = $('#mainNavigationContainer');
    //     var levels = 4;
    //     var targetLevel;
    //     var activeLevel;
    //     var activeMenu;
    //     var currentLevel;

    //     if (nav.length <= 0) return;

    //     // set initial menu state
    //     mobileNavigationSetInitState();

    //     // set events for changing between levels
    //     for (var i = 2; i <= levels; i++) {
    //         // open ith level
    //         $('#mainNavigationContainer .level'+(i-1)+' > li.hasSub:not(.backLinkContainer) > .nextLevel').click(mobilenavigationOpenLevelHandler(i));

    //         // close ith level
    //         $('#mainNavigationContainer .level'+i+' > li.backLinkContainer > .prevLevel').click(mobilenavigationCloseLevelHandler(i));
    //     }

    //     // handle classes and height after transition
    //     nav.on('transitionend', function() {
    //         for (var i = 2; i <= levels; i++) {
    //             if(navContainer.hasClass('openingLevel'+i)) {
    //                 navContainer.removeClass('openingLevel'+i).addClass('openLevel'+i);
    //             }

    //             if(navContainer.hasClass('changingLevel'+i)) {
    //                 $('#mainNavigationContainer .level'+(i-1)+' > li.open').removeClass('open');
    //                 $('#mainNavigationContainer .level'+(i-1)+' > li.openAfterChange').addClass('open').removeClass('openAfterChange');
    //                 navContainer.removeClass('changingLevel'+i);
    //             }

    //             if(!navContainer.hasClass('openLevel'+i)) {
    //                 $('#mainNavigationContainer .level'+(i-1)+' > li.open').removeClass('open');
    //             }

    //             // setMenuHeight();
    //         }
    //     });

    //     // $navOverlayContainer.on('shown.bs.collapse', function() {
    //     //     setMenuHeight();
    //     // });


    //     // reset on menu closed
    //     $('.headerMainContainer, #mobileNavigationOverlay').click(function() {
    //         if($('#pageContainer').hasClass('active')) {
    //             for(var i = 2; i <= levels; i++) {
    //                 navContainer.removeClass('openLevel'+i);
    //                 $('#mainNavigationContainer .level'+(i-1)+' > li.open').removeClass('open');
    //             }

    //             // reset back to initial state
    //             mobileNavigationSetInitState();
    //         }
    //     });

    //     // function setMenuHeight() {
    //     //     var $currentLevel = $('li.open', nav).last().children('ul');
    //     //     var currentLevelHeight = $currentLevel.height();
    //     //
    //     //     if ($currentLevel.length == 0) {
    //     //         navContainer.css('min-height', '');
    //     //     } else {
    //     //         navContainer.css('min-height', currentLevelHeight);
    //     //     }
    //     // }

    //     function mobilenavigationOpenLevelHandler(level) {
    //         return function(event) {
    //             event.preventDefault();
    //             event.stopPropagation();
    //             mobileNavigationOpenLevel(level, $(this));
    //         };
    //     }

    //     function mobilenavigationCloseLevelHandler(level) {
    //         return function(event) {
    //             event.preventDefault();
    //             event.stopPropagation();
    //             mobileNavigationCloseLevel(level, $(this));
    //         };
    //     }

    //     // open given level
    //     function mobileNavigationOpenLevel(level, self) {
    //         currentLevel = $('li.open', nav).length + 1;
    //         if (level <= currentLevel) {
    //             for (var i = currentLevel; i > level; i--) {
    //                 mobileNavigationCloseLevel(i, $(this));
    //             }
    //             if (!self.parent().hasClass('open')) {
    //                 navContainer.addClass('changingLevel' + level);
    //                 self.parent().addClass('openAfterChange');
    //             }
    //         } else {
    //             navContainer.addClass('openingLevel' + level);
    //             self.parent().addClass('open');
    //         }
    //     }

    //     // close given level
    //     function mobileNavigationCloseLevel(level, self) {
    //         navContainer.removeClass('openLevel' + level);
    //     }

    //     // set init state of menu
    //     function mobileNavigationSetInitState() {
    //         activeMenu = $('li.active', nav).last().parent('ul');
    //         activeLevel = $('li.active', nav).length;
    //         $activeMenuPoint = $('li.active', nav).last();

    //         $('li.active', nav).each(function(i) {
    //             if ($activeMenuPoint.hasClass('hasSub')) {
    //                 if(i < activeLevel) {
    //                     $(this).addClass('open');
    //                 }
    //             } else {
    //                 if(i < activeLevel - 1) {
    //                     $(this).addClass('open');
    //                 }
    //             }
    //         });

    //         if(activeLevel) {
    //             if ($activeMenuPoint.hasClass('hasSub')) {
    //                 for (var j = 2; j <= activeLevel + 1; j++) {
    //                     navContainer.addClass('openLevel' + j);
    //                 }
    //             } else {
    //                 for (var j = 2; j <= activeLevel; j++) {
    //                     navContainer.addClass('openLevel' + j);
    //                 }
    //             }
    //         }
    //     }

    //     function mobileNavHeight() {
    //         activeMenu = $('li.open', nav).last().children('> .');
    //     }

    //     function closeMenuOnOverlay() {
    //         var $pageContainer = $('#pageContainer');
    //         var $backdrop = $('.backdrop');

    //         $backdrop.on('click', function() {
    //             if ($pageContainer.hasClass('active')) {
    //                 $pageContainer.toggleClass('active');
    //             }
    //         });
    //     }

    //     closeMenuOnOverlay();
    // }
}

function initHeaderScrollHelper() {
    var $pageContainer = $('#pageContainer');
    var $window = $(window);

    scrollHandler = function() {
        if ($window.scrollTop() > 0) {
            if (!$pageContainer.hasClass('scroll')) {
                $pageContainer.addClass('scroll');
            }
        } else {
            if ($pageContainer.hasClass('scroll')) {
                $pageContainer.removeClass('scroll');
            }
        }
    }

    $window.on('scroll resize', function() {
        scrollHandler();
    });

    scrollHandler();
}

function initBackgroundSrcsetHandler() {
    $('.backgroundSrcsetImage').on('load', function() {
        var $this = $(this);

        var currentSrc = this.src;
        if (this.currentSrc !== undefined) {
            currentSrc = this.currentSrc;
        }

        $this.parent().css('background-image', 'url(' + currentSrc + ')');
        $this.addClass('loaded');
    });

    $(window).on('load', function() {
        var $images = $('.backgroundSrcsetImage:not(.loaded)');
        if ($images.length) {
            $images.each(function() {
                var $this = $(this);

                var currentSrc = this.src;
                if (this.currentSrc !== undefined) {
                    currentSrc = this.currentSrc;
                }

                $this.parent().css('background-image', 'url(' + currentSrc + ')');
                $this.addClass('loaded');
            });
        }
    });
}

initBackgroundSrcsetHandler();

function initLocalTimeConversion() {
    var $dateSpans = $("[data-date]");

    if ($dateSpans.length > 0) {
        $dateSpans.each(function() {
            var $this = $(this);
            var dataTime = $this.attr("data-date");
            // var offsetHours = getTimeZone();
            // var offset = new Date().getTimezoneOffset();
            // offset = offset*(-1)*60;
            // dataTime = (dataTime + offset);

            // var time = dataTime.concat(offsetHours);
            var options = { hour: 'numeric', minute: 'numeric', };
            // var options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', };
            var language = $('html').attr('lang');
            // var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


            var timeZone = (Intl.DateTimeFormat().resolvedOptions().timeZone);

            // if (timeZone != "Europe/Berlin") {
            //     dataTime = dataTime.concat('Z');
            // }

            // function getTimeZone() {
            //     var offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
            //     return (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
            // }

            var date = new Date(dataTime).toUTCString();
            var dateNew = new Date(date);

            switch (language) {
                // theres no language en-DE, so with this, we can display the time as am/pm. For en-GB is doesn't seem to work, so that's why it's here too...
                // case 'en-DE':
                // case 'en-GB':
                //     $this.html(date.toLocaleString('en-US', options))
                //     break;

                case 'pt':
                    $this.html(dateNew.toLocaleString('en-US', options, { timeZone: timeZone }))
                    break;

                default:
                    // $this.html(date.toLocaleTimeString(language, options))
                    $this.html(dateNew.toLocaleString(language, options))
                    break;
            }
        });
    }
}

function initWebinarHelper() {
    var $webinarModalToggler = $('.webinarModalToggler');
    var $webinarModal = $('#webinarModal');

    if ($webinarModalToggler.length > 0) {
        $webinarModalToggler.each(function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                $webinarModal.modal("toggle");
            });
        });
    }
}

function initCustomParsleyValidators() {
    if (!window.Parsley) {
        return;
    }

    // @see https://github.com/guillaumepotier/Parsley.js/blob/896bd6e778a49a44af5fb41c4ad546103009e527/dist/parsley.js#L548
    var testMailAddressValidRegExp = /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))$/;

    // @see https://gist.github.com/tbrianjones/5992856/
    // Following entries added by WES:
    // mail.de, mail.com, t-online.de, me.com, mac.com
    var freeMailProviderList = [
        '1033edge.com','11mail.com','123.com','123box.net','123india.com','123mail.cl','123qwe.co.uk','126.com','150ml.com','15meg4free.com','163.com','1coolplace.com','1freeemail.com','1funplace.com','1internetdrive.com','1mail.net','1me.net','1mum.com','1musicrow.com','1netdrive.com','1nsyncfan.com','1under.com','1webave.com','1webhighway.com','212.com','24horas.com','2911.net','2bmail.co.uk','2d2i.com','2die4.com','3000.it','321media.com','37.com','3ammagazine.com','3dmail.com','3email.com','3xl.net','444.net','4email.com','4email.net','4mg.com','4newyork.com','4x4man.com','5iron.com','5star.com','88.am','8848.net','888.nu','97rock.com','aaamail.zzn.com','aamail.net','aaronkwok.net','abbeyroadlondon.co.uk','abcflash.net','abdulnour.com','aberystwyth.com','abolition-now.com','about.com','academycougars.com','acceso.or.cr','access4less.net','accessgcc.com','ace-of-base.com','acmecity.com','acmemail.net','acninc.net','adelphia.net','adexec.com','adfarrow.com','adios.net','ados.fr','advalvas.be','aeiou.pt','aemail4u.com','aeneasmail.com','afreeinternet.com','africamail.com','agoodmail.com','ahaa.dk','aichi.com','aim.com','airforce.net','airforceemail.com','airmail.net','airpost.net','ajacied.com','ak47.hu','aknet.kg','albawaba.com','alex4all.com','alexandria.cc','algeria.com','alhilal.net','alibaba.com','alice.it','aliceadsl.fr','alive.cz','aliyun.com','allmail.net','alloymail.com','allracing.com','allsaintsfan.com','alltel.net','alskens.dk','altavista.com','altavista.net','altavista.se','alternativagratis.com','alumnidirector.com','alvilag.hu','amele.com','america.hm','ameritech.net','amnetsal.com','amrer.net','amuro.net','amuromail.com','ananzi.co.za','ancestry.com','andylau.net','anfmail.com','angelfan.com','angelfire.com','animal.net','animalhouse.com','animalwoman.net','anjungcafe.com','anote.com','another.com','anotherwin95.com','anti-social.com','antisocial.com','antongijsen.com','antwerpen.com','anymoment.com','anytimenow.com','aol.com','aol.it','apexmail.com','apmail.com','apollo.lv','approvers.net','arabia.com','arabtop.net','arcademaster.com','archaeologist.com','arcor.de','arcotronics.bg','argentina.com','aristotle.org','army.net','arnet.com.ar','artlover.com','artlover.com.au','as-if.com','asean-mail.com','asheville.com','asia-links.com','asia.com','asiafind.com','asianavenue.com','asiancityweb.com','asiansonly.net','asianwired.net','asiapoint.net','assala.com','assamesemail.com','astroboymail.com','astrolover.com','astrosfan.com','astrosfan.net','asurfer.com','athenachu.net','atina.cl','atl.lv','atlanticbb.net ','atlaswebmail.com','atlink.com','ato.check.com','atozasia.com','att.net','att.net','attbi.com','attglobal.net','attglobal.net','attymail.com','au.ru','ausi.com','austin.rr.com','australia.edu','australiamail.com','austrosearch.net','autoescuelanerja.com','automotiveauthority.com','avh.hu','awsom.net','axoskate.com','ayna.com','azimiweb.com','bachelorboy.com','bachelorgal.com','backpackers.com','backstreet-boys.com','backstreetboysclub.com','bagherpour.com','bangkok.com','bangkok2000.com','bannertown.net','baptistmail.com','baptized.com','barcelona.com','baseballmail.com','basketballmail.com','batuta.net','baudoinconsulting.com','bboy.zzn.com','bcpl.net','bcvibes.com','beeebank.com','beenhad.com','beep.ru','beer.com','beethoven.com','belice.com','belizehome.com','bellatlantic.net','bellnet.ca','bellsouth.net','bellsouth.net','berkscounty.com','berlin.com','berlin.de','berlinexpo.de','bestmail.us','bestweb.net','bettergolf.net','bev.net','bharatmail.com','bigassweb.com','bigblue.net.au','bigboab.com','bigfoot.com','bigfoot.de','bigger.com','bigmailbox.com','bigpond.com','bigpond.com.au','bigpond.net.au','bigramp.com','bikemechanics.com','bikeracer.com','bikeracers.net','bikerider.com','billsfan.com','billsfan.net','bimamail.com','bimla.net','birdowner.net','bisons.com','bitmail.com','bitpage.net','bizhosting.com','bla-bla.com','blackburnmail.com','blackplanet.com','blacksburg.net','blazemail.com','blazenet.net','bluehyppo.com','bluemail.ch','bluemail.dk','bluesfan.com','bluewin.ch','blueyonder.co.uk','blushmail.com','bmlsports.net','boardermail.com','boatracers.com','bol.com.br','bolando.com','bollywoodz.com','bolt.com','boltonfans.com','bombdiggity.com','bonbon.net','boom.com','bootmail.com','bornnaked.com','bossofthemoss.com','bostonoffice.com','bounce.net','box.az','boxbg.com','boxemail.com','boxfrog.com','boyzoneclub.com','bradfordfans.com','brasilia.net','brazilmail.com.br','breathe.com','bresnan.net','brfree.com.br','bright.net','britneyclub.com','brittonsign.com','broadcast.net','bt.com','btinternet.com','btopenworld.co.uk','buffymail.com','bullsfan.com','bullsgame.com','bumerang.ro','bunko.com','buryfans.com','business-man.com','businessman.net','businessweekmail.com','busta-rhymes.com','busymail.com','buyersusa.com','bvimailbox.com','byteme.com','c2i.net','c3.hu','c4.com','cabacabana.com','cableone.net','caere.it','cairomail.com','cais.net','callnetuk.com','callsign.net','caltanet.it','camidge.com','canada-11.com','canada.com','canadianmail.com','canoemail.com','canwetalk.com','capu.net','caramail.com','care2.com','careerbuildermail.com','carioca.net','cartestraina.ro','casablancaresort.com','casino.com','catcha.com','catholic.org','catlover.com','catsrule.garfield.com','ccnmail.com','cd2.com','celineclub.com','celtic.com','centoper.it','centralpets.com','centrum.cz','centrum.sk','centurytel.net','cfl.rr.com','cgac.es','chaiyomail.com','chance2mail.com','chandrasekar.net','charm.net','charmedmail.com','charter.net','chat.ru','chattown.com','chauhanweb.com','check.com','check1check.com','cheerful.com','chek.com','chello.nl','chemist.com','chequemail.com','cheyenneweb.com','chez.com','chickmail.com','china.net.vg','chinalook.com','chirk.com','chocaholic.com.au','christianmail.net','churchusa.com','cia-agent.com','cia.hu','ciaoweb.it','cicciociccio.com','cincinow.net','citeweb.net','citlink.net','city-of-bath.org','city-of-birmingham.com','city-of-brighton.org','city-of-cambridge.com','city-of-coventry.com','city-of-edinburgh.com','city-of-lichfield.com','city-of-lincoln.com','city-of-liverpool.com','city-of-manchester.com','city-of-nottingham.com','city-of-oxford.com','city-of-swansea.com','city-of-westminster.com','city-of-westminster.net','city-of-york.net','city2city.com','cityofcardiff.net','cityoflondon.org','claramail.com','classicalfan.com','classicmail.co.za','clerk.com','cliffhanger.com','close2you.net','club-internet.fr','club4x4.net','clubalfa.com','clubbers.net','clubducati.com','clubhonda.net','clubvdo.net','cluemail.com','cmpmail.com','cnnsimail.com','codec.ro','coder.hu','coid.biz','coldmail.com','collectiblesuperstore.com','collegebeat.com','collegeclub.com','collegemail.com','colleges.com','columbus.rr.com','columbusrr.com','columnist.com','comcast.net','comic.com','communityconnect.com','comprendemail.com','compuserve.com','computer-freak.com','computermail.net','concentric.net','conexcol.com','conk.com','connect4free.net','connectbox.com','conok.com','consultant.com','cookiemonster.com','cool.br','coolgoose.ca','coolgoose.com','coolkiwi.com','coollist.com','coolmail.com','coolmail.net','coolsend.com','cooooool.com','cooperation.net','cooperationtogo.net','copacabana.com','cornells.com','cornerpub.com','corporatedirtbag.com','correo.terra.com.gt','cortinet.com','cotas.net','counsellor.com','countrylover.com','covad.net','cox.net','coxinet.net','coxmail.com','cpaonline.net','cracker.hu','crazedanddazed.com','crazysexycool.com','cristianemail.com','critterpost.com','croeso.com','crosshairs.com','crosslink.net','crosswinds.net','crwmail.com','cry4helponline.com','cs.com','csi.com','csinibaba.hu','cuemail.com','curio-city.com','cute-girl.com','cuteandcuddly.com','cutey.com','cww.de','cyber-africa.net','cyber4all.com','cyberbabies.com','cybercafemaui.com','cyberdude.com','cyberforeplay.net','cybergal.com','cybergrrl.com','cyberinbox.com','cyberleports.com','cybermail.net','cybernet.it','cyberspace-asia.com','cybertrains.org','cyclefanz.com','cynetcity.com','dabsol.net','dadacasa.com','daha.com','dailypioneer.com','dallas.theboys.com','dangerous-minds.com','dansegulvet.com','data54.com','daum.net','davegracey.com','dawnsonmail.com','dawsonmail.com','dazedandconfused.com','dbzmail.com','dca.net','dcemail.com','deadlymob.org','deal-maker.com','dearriba.com','death-star.com','dejanews.com','deliveryman.com','deltanet.com','deneg.net','depechemode.com','deseretmail.com','desertmail.com','desilota.com','deskmail.com','deskpilot.com','destin.com','detik.com','deutschland-net.com','devotedcouples.com','dfwatson.com','di-ve.com','digibel.be','diplomats.com','direcway.com','dirtracer.com','discofan.com','discovery.com','discoverymail.com','disinfo.net','dmailman.com','dmv.com','dnsmadeeasy.com','doctor.com','dog.com','doglover.com','dogmail.co.uk','dogsnob.net','doityourself.com','doneasy.com','donjuan.com','dontgotmail.com','dontmesswithtexas.com','doramail.com','dostmail.com','dotcom.fr','dott.it','dplanet.ch','dr.com','dragoncon.net','dragracer.com','dropzone.com','drotposta.hu','dslextreme.com','dubaimail.com','dublin.com','dublin.ie','dunlopdriver.com','dunloprider.com','duno.com','dwp.net','dygo.com','dynamitemail.com','e-apollo.lv','e-mail.dk','e-mail.ru','e-mailanywhere.com','e-mails.ru','e-tapaal.com','earthalliance.com','earthcam.net','earthdome.com','earthling.net','earthlink.net','earthonline.net','eastcoast.co.za','eastmail.com','easy.to','easypost.com','eatmydirt.com','ecardmail.com','ecbsolutions.net','echina.com','ecompare.com','edge.net','edmail.com','ednatx.com','edtnmail.com','educacao.te.pt','educastmail.com','ehmail.com','eircom.net','elsitio.com','elvis.com','email-london.co.uk','email.com','email.cz','email.ee','email.it','email.nu','email.ro','email.ru','email.si','email.women.com','email2me.net','emailacc.com','emailaccount.com','emailchoice.com','emailcorner.net','emailem.com','emailengine.net','emailforyou.net','emailgroups.net','emailpinoy.com','emailplanet.com','emails.ru','emailuser.net','emailx.net','ematic.com','embarqmail.com','emumail.com','end-war.com','enel.net','engineer.com','england.com','england.edu','enter.net','epatra.com','epix.net','epost.de','eposta.hu','eqqu.com','eramail.co.za','eresmas.com','eriga.lv','erols.com','estranet.it','ethos.st','etoast.com','etrademail.com','eudoramail.com','europe.com','euroseek.com','every1.net','everyday.com.kh','everyone.net','examnotes.net','excite.co.jp','excite.com','excite.it','execs.com','expressasia.com','extenda.net','extended.com','eyou.com','ezcybersearch.com','ezmail.egine.com','ezmail.ru','ezrs.com','ezy.net','f1fans.net','facebook.com','fan.com','fan.theboys.com','fansonlymail.com','fantasticmail.com','farang.net','faroweb.com','fastem.com','fastemail.us','fastemailer.com','fastermail.com','fastimap.com','fastmail.fm','fastmailbox.net','fastmessaging.com','fatcock.net','fathersrightsne.org','fbi-agent.com','fbi.hu','fcc.net','federalcontractors.com','felicity.com','felicitymail.com','femenino.com','fetchmail.co.uk','fetchmail.com','feyenoorder.com','ffanet.com','fiberia.com','fibertel.com.ar','filipinolinks.com','financemail.net','financier.com','findmail.com','finebody.com','finfin.com','fire-brigade.com','fishburne.org','flashcom.net','flashemail.com','flashmail.com','flashmail.net','flipcode.com','fmail.co.uk','fmailbox.com','fmgirl.com','fmguy.com','fnbmail.co.za','fnmail.com','folkfan.com','foodmail.com','football.theboys.com','footballmail.com','for-president.com','forfree.at','forpresident.com','forthnet.gr','fortuncity.com','fortunecity.com','forum.dk','foxmail.com','free-org.com','free.com.pe','free.fr','freeaccess.nl','freeaccount.com','freeandsingle.com','freedom.usa.com','freedomlover.com','freegates.be','freeghana.com','freeler.nl','freemail.c3.hu','freemail.com.au','freemail.com.pk','freemail.de','freemail.et','freemail.gr','freemail.hu','freemail.it','freemail.lt','freemail.nl','freemail.org.mk','freenet.de','freenet.kg','freeola.com','freeola.net','freeserve.co.uk','freestamp.com','freestart.hu','freesurf.fr','freesurf.nl','freeuk.com','freeuk.net','freeukisp.co.uk','freeweb.org','freewebemail.com','freeyellow.com','freezone.co.uk','fresnomail.com','friends-cafe.com','friendsfan.com','from-africa.com','from-america.com','from-argentina.com','from-asia.com','from-australia.com','from-belgium.com','from-brazil.com','from-canada.com','from-china.net','from-england.com','from-europe.com','from-france.net','from-germany.net','from-holland.com','from-israel.com','from-italy.net','from-japan.net','from-korea.com','from-mexico.com','from-outerspace.com','from-russia.com','from-spain.net','fromalabama.com','fromalaska.com','fromarizona.com','fromarkansas.com','fromcalifornia.com','fromcolorado.com','fromconnecticut.com','fromdelaware.com','fromflorida.net','fromgeorgia.com','fromhawaii.net','fromidaho.com','fromillinois.com','fromindiana.com','fromiowa.com','fromjupiter.com','fromkansas.com','fromkentucky.com','fromlouisiana.com','frommaine.net','frommaryland.com','frommassachusetts.com','frommiami.com','frommichigan.com','fromminnesota.com','frommississippi.com','frommissouri.com','frommontana.com','fromnebraska.com','fromnevada.com','fromnewhampshire.com','fromnewjersey.com','fromnewmexico.com','fromnewyork.net','fromnorthcarolina.com','fromnorthdakota.com','fromohio.com','fromoklahoma.com','fromoregon.net','frompennsylvania.com','fromrhodeisland.com','fromru.com','fromsouthcarolina.com','fromsouthdakota.com','fromtennessee.com','fromtexas.com','fromthestates.com','fromutah.com','fromvermont.com','fromvirginia.com','fromwashington.com','fromwashingtondc.com','fromwestvirginia.com','fromwisconsin.com','fromwyoming.com','front.ru','frontier.com','frontiernet.net','frostbyte.uk.net','fsmail.net','ftml.net','fullchannel.net','fullmail.com','funkfan.com','fuorissimo.com','furnitureprovider.com','fuse.net','fut.es','fwnb.com','fxsmails.com','galamb.net','galaxy5.com','gamebox.net','gamegeek.com','games.com','gamespotmail.com','garbage.com','gardener.com','gateway.net','gawab.com','gaybrighton.co.uk','gaza.net','gazeta.pl','gazibooks.com','gci.net','gee-wiz.com','geecities.com','geek.com','geek.hu','geeklife.com','general-hospital.com','geocities.com','geologist.com','geopia.com','gh2000.com','ghanamail.com','ghostmail.com','giantsfan.com','giga4u.de','gigileung.org','givepeaceachance.com','glay.org','glendale.net','globalfree.it','globalpagan.com','globalsite.com.br','globo.com','globomail.com','gmail.com','gmx.at','gmx.com','gmx.de','gmx.fr','gmx.li','gmx.net','gnwmail.com','go.com','go.ro','go.ru','go2.com.py','go2net.com','gocollege.com','gocubs.com','gofree.co.uk','goldenmail.ru','goldmail.ru','golfemail.com','golfmail.be','gonavy.net','goodstick.com','google.com','googlemail.com','goplay.com','gorontalo.net','gospelfan.com','gothere.uk.com','gotmail.com','gotomy.com','govolsfan.com','gportal.hu','grabmail.com','graffiti.net','gramszu.net','grapplers.com','gratisweb.com','grungecafe.com','gtemail.net','gti.net','gtmc.net','gua.net','guessmail.com','guju.net','gurlmail.com','guy.com','guy2.com','guyanafriends.com','gyorsposta.com','gyorsposta.hu','hackermail.net','hailmail.net','hairdresser.net','hamptonroads.com','handbag.com','handleit.com','hang-ten.com','hanmail.net','happemail.com','happycounsel.com','happypuppy.com','hardcorefreak.com','hawaii.rr.com','hawaiiantel.net','headbone.com','heartthrob.com','heerschap.com','heesun.net','hehe.com','hello.hu','hello.net.au','hello.to','helter-skelter.com','hempseed.com','herediano.com','heremail.com','herono1.com','hetnet.nl','hey.to','hhdevel.com','highmilton.com','highquality.com','highveldmail.co.za','hiphopfan.com','hispavista.com','hitthe.net','hkg.net','hkstarphoto.com','hockeymail.com','hollywoodkids.com','home-email.com','home.nl','home.no.net','home.ro','home.se','homeart.com','homelocator.com','homemail.com','homestead.com','homeworkcentral.com','hongkong.com','hookup.net','hoopsmail.com','horrormail.com','host-it.com.sg','hot-shot.com','hot.ee','hotbot.com','hotbrev.com','hotepmail.com','hotfire.net','hotletter.com','hotmail.be','hotmail.co.il','hotmail.co.uk','hotmail.com','hotmail.com.ar','hotmail.com.br','hotmail.com.mx','hotmail.de','hotmail.es','hotmail.fr','hotmail.it','hotmail.kg','hotmail.kz','hotmail.ru','hotpop.com','hotpop3.com','hotvoice.com','housefancom','housemail.com','hsuchi.net','html.tou.com','hughes.net','hunsa.com','hush.com','hushmail.com','hypernautica.com','i-connect.com','i-france.com','i-mail.com.au','i-p.com','i-plus.net','i.am','i12.com','iamawoman.com','iamwaiting.com','iamwasted.com','iamyours.com','ibm.net','icestorm.com','icloud.com','icmsconsultants.com','icq.com','icqmail.com','icrazy.com','id-base.com','ididitmyway.com','idirect.com','iespana.es','ifoward.com','ig.com.br','ignazio.it','ignmail.com','ihateclowns.com','ihwy.com','iinet.net.au','ijustdontcare.com','ilovechocolate.com','ilovejesus.com','ilovethemovies.com','ilovetocollect.net','ilse.nl','imaginemail.com','imail.org','imail.ru','imailbox.com','imel.org','imneverwrong.com','imposter.co.uk','imstressed.com','imtoosexy.com','in-box.net','iname.com','inbox.com','inbox.net','inbox.ru','incamail.com','incredimail.com','indexa.fr','india.com','indiatimes.com','indo-mail.com','indocities.com','indomail.com','indyracers.com','info-media.de','info66.com','infohq.com','infomail.es','infomart.or.jp','infospacemail.com','infovia.com.ar','inicia.es','inmail.sk','innocent.com','inorbit.com','insidebaltimore.net','insight.rr.com','insurer.com','integra.net','interaccess.com','interburp.com','interfree.it','interia.pl','interlap.com.ar','intermail.co.il','internet-club.com','internet-police.com','internetbiz.com','internetdrive.com','internetegypt.com','internetemails.net','internetmailing.net','internetmci.com','investormail.com','inwind.it','iobox.com','iobox.fi','iol.it','ionet.net','iowaemail.com','ip3.com','iprimus.com.au','iqemail.com','irangate.net','iraqmail.com','ireland.com','irj.hu','isellcars.com','islamonline.net','isleuthmail.com','ismart.net','isonfire.com','isp9.net','itelefonica.com.br','itloox.com','itmom.com','itol.com','ivebeenframed.com','ivillage.com','iwan-fals.com','iwmail.com','iwon.com','izadpanah.com','jahoopa.com','jakuza.hu','japan.com','jaydemail.com','jazzandjava.com','jazzfan.com','jazzgame.com','jerusalemmail.com','jetemail.net','jewishmail.com','jippii.fi','jmail.co.za','joinme.com','jokes.com','jordanmail.com','journalist.com','jovem.te.pt','joymail.com','jpopmail.com','jubiimail.dk','jump.com','jumpy.it','juniormail.com','juno.com','justemail.net','justicemail.com','kaazoo.com','kaixo.com','kalpoint.com','kansascity.com','kapoorweb.com','karachian.com','karachioye.com','karbasi.com','katamail.com','kayafmmail.co.za','kbjrmail.com','kcks.com','keg-party.com','keko.com.ar','kellychen.com','keromail.com','keyemail.com','kgb.hu','khosropour.com','kickassmail.com','killermail.com','kimo.com','kinki-kids.com','kittymail.com','kitznet.at','kiwibox.com','kiwitown.com','kmail.com.au','konx.com','korea.com','kozmail.com','krongthip.com','krunis.com','ksanmail.com','ksee24mail.com','kube93mail.com','kukamail.com','kumarweb.com','kuwait-mail.com','la.com','ladymail.cz','lagerlouts.com','lahoreoye.com','lakmail.com','lamer.hu','land.ru','lankamail.com','laposte.net','latemodels.com','latinmail.com','latino.com','lavabit.com','law.com','lawyer.com','leehom.net','legalactions.com','legislator.com','leonlai.net','letsgomets.net','letterbox.com','levele.com','levele.hu','lex.bg','lexis-nexis-mail.com','libero.it','liberomail.com','lick101.com','linkmaster.com','linktrader.com','linuxfreemail.com','linuxmail.org','lionsfan.com.au','liontrucks.com','liquidinformation.net','list.ru','littleblueroom.com','live.be','live.ca','live.co.uk','live.com','live.com.ar','live.com.au','live.com.mx','live.de','live.fr','live.it','live.nl','liverpoolfans.com','llandudno.com','llangollen.com','lmxmail.sk','lobbyist.com','localbar.com','london.com','loobie.com','looksmart.co.uk','looksmart.com','looksmart.com.au','lopezclub.com','louiskoo.com','love.com','love.cz','loveable.com','lovelygirl.net','lovemail.com','lover-boy.com','lovergirl.com','lovingjesus.com','lowandslow.com','luso.pt','luukku.com','lycos.co.uk','lycos.com','lycos.es','lycos.it','lycos.ne.jp','lycosemail.com','lycosmail.com','m-a-i-l.com','m-hmail.com','m4.org','mac.com','macbox.com','macfreak.com','machinecandy.com','macmail.com','madcreations.com','madrid.com','maffia.hu','magicmail.co.za','mahmoodweb.com','mail-awu.de','mail-box.cz','mail-center.com','mail-central.com','mail-page.com','mail.austria.com','mail.az','mail.be','mail.bulgaria.com','mail.byte.it','mail.co.za','mail.com','mail.ee','mail.entrepeneurmag.com','mail.freetown.com','mail.gr','mail.hitthebeach.com','mail.kmsp.com','mail.md','mail.nu','mail.org.uk','mail.pf','mail.pharmacy.com','mail.pt','mail.r-o-o-t.com','mail.ru','mail.salu.net','mail.sisna.com','mail.spaceports.com','mail.theboys.com','mail.usa.com','mail.vasarhely.hu','mail15.com','mail1st.com','mail2007.com','mail2aaron.com','mail2abby.com','mail2abc.com','mail2actor.com','mail2admiral.com','mail2adorable.com','mail2adoration.com','mail2adore.com','mail2adventure.com','mail2aeolus.com','mail2aether.com','mail2affection.com','mail2afghanistan.com','mail2africa.com','mail2agent.com','mail2aha.com','mail2ahoy.com','mail2aim.com','mail2air.com','mail2airbag.com','mail2airforce.com','mail2airport.com','mail2alabama.com','mail2alan.com','mail2alaska.com','mail2albania.com','mail2alcoholic.com','mail2alec.com','mail2alexa.com','mail2algeria.com','mail2alicia.com','mail2alien.com','mail2allan.com','mail2allen.com','mail2allison.com','mail2alpha.com','mail2alyssa.com','mail2amanda.com','mail2amazing.com','mail2amber.com','mail2america.com','mail2american.com','mail2andorra.com','mail2andrea.com','mail2andy.com','mail2anesthesiologist.com','mail2angela.com','mail2angola.com','mail2ann.com','mail2anna.com','mail2anne.com','mail2anthony.com','mail2anything.com','mail2aphrodite.com','mail2apollo.com','mail2april.com','mail2aquarius.com','mail2arabia.com','mail2arabic.com','mail2architect.com','mail2ares.com','mail2argentina.com','mail2aries.com','mail2arizona.com','mail2arkansas.com','mail2armenia.com','mail2army.com','mail2arnold.com','mail2art.com','mail2artemus.com','mail2arthur.com','mail2artist.com','mail2ashley.com','mail2ask.com','mail2astronomer.com','mail2athena.com','mail2athlete.com','mail2atlas.com','mail2atom.com','mail2attitude.com','mail2auction.com','mail2aunt.com','mail2australia.com','mail2austria.com','mail2azerbaijan.com','mail2baby.com','mail2bahamas.com','mail2bahrain.com','mail2ballerina.com','mail2ballplayer.com','mail2band.com','mail2bangladesh.com','mail2bank.com','mail2banker.com','mail2bankrupt.com','mail2baptist.com','mail2bar.com','mail2barbados.com','mail2barbara.com','mail2barter.com','mail2basketball.com','mail2batter.com','mail2beach.com','mail2beast.com','mail2beatles.com','mail2beauty.com','mail2becky.com','mail2beijing.com','mail2belgium.com','mail2belize.com','mail2ben.com','mail2bernard.com','mail2beth.com','mail2betty.com','mail2beverly.com','mail2beyond.com','mail2biker.com','mail2bill.com','mail2billionaire.com','mail2billy.com','mail2bio.com','mail2biologist.com','mail2black.com','mail2blackbelt.com','mail2blake.com','mail2blind.com','mail2blonde.com','mail2blues.com','mail2bob.com','mail2bobby.com','mail2bolivia.com','mail2bombay.com','mail2bonn.com','mail2bookmark.com','mail2boreas.com','mail2bosnia.com','mail2boston.com','mail2botswana.com','mail2bradley.com','mail2brazil.com','mail2breakfast.com','mail2brian.com','mail2bride.com','mail2brittany.com','mail2broker.com','mail2brook.com','mail2bruce.com','mail2brunei.com','mail2brunette.com','mail2brussels.com','mail2bryan.com','mail2bug.com','mail2bulgaria.com','mail2business.com','mail2buy.com','mail2ca.com','mail2california.com','mail2calvin.com','mail2cambodia.com','mail2cameroon.com','mail2canada.com','mail2cancer.com','mail2capeverde.com','mail2capricorn.com','mail2cardinal.com','mail2cardiologist.com','mail2care.com','mail2caroline.com','mail2carolyn.com','mail2casey.com','mail2cat.com','mail2caterer.com','mail2cathy.com','mail2catlover.com','mail2catwalk.com','mail2cell.com','mail2chad.com','mail2champaign.com','mail2charles.com','mail2chef.com','mail2chemist.com','mail2cherry.com','mail2chicago.com','mail2chile.com','mail2china.com','mail2chinese.com','mail2chocolate.com','mail2christian.com','mail2christie.com','mail2christmas.com','mail2christy.com','mail2chuck.com','mail2cindy.com','mail2clark.com','mail2classifieds.com','mail2claude.com','mail2cliff.com','mail2clinic.com','mail2clint.com','mail2close.com','mail2club.com','mail2coach.com','mail2coastguard.com','mail2colin.com','mail2college.com','mail2colombia.com','mail2color.com','mail2colorado.com','mail2columbia.com','mail2comedian.com','mail2composer.com','mail2computer.com','mail2computers.com','mail2concert.com','mail2congo.com','mail2connect.com','mail2connecticut.com','mail2consultant.com','mail2convict.com','mail2cook.com','mail2cool.com','mail2cory.com','mail2costarica.com','mail2country.com','mail2courtney.com','mail2cowboy.com','mail2cowgirl.com','mail2craig.com','mail2crave.com','mail2crazy.com','mail2create.com','mail2croatia.com','mail2cry.com','mail2crystal.com','mail2cuba.com','mail2culture.com','mail2curt.com','mail2customs.com','mail2cute.com','mail2cutey.com','mail2cynthia.com','mail2cyprus.com','mail2czechrepublic.com','mail2dad.com','mail2dale.com','mail2dallas.com','mail2dan.com','mail2dana.com','mail2dance.com','mail2dancer.com','mail2danielle.com','mail2danny.com','mail2darlene.com','mail2darling.com','mail2darren.com','mail2daughter.com','mail2dave.com','mail2dawn.com','mail2dc.com','mail2dealer.com','mail2deanna.com','mail2dearest.com','mail2debbie.com','mail2debby.com','mail2deer.com','mail2delaware.com','mail2delicious.com','mail2demeter.com','mail2democrat.com','mail2denise.com','mail2denmark.com','mail2dennis.com','mail2dentist.com','mail2derek.com','mail2desert.com','mail2devoted.com','mail2devotion.com','mail2diamond.com','mail2diana.com','mail2diane.com','mail2diehard.com','mail2dilemma.com','mail2dillon.com','mail2dinner.com','mail2dinosaur.com','mail2dionysos.com','mail2diplomat.com','mail2director.com','mail2dirk.com','mail2disco.com','mail2dive.com','mail2diver.com','mail2divorced.com','mail2djibouti.com','mail2doctor.com','mail2doglover.com','mail2dominic.com','mail2dominica.com','mail2dominicanrepublic.com','mail2don.com','mail2donald.com','mail2donna.com','mail2doris.com','mail2dorothy.com','mail2doug.com','mail2dough.com','mail2douglas.com','mail2dow.com','mail2downtown.com','mail2dream.com','mail2dreamer.com','mail2dude.com','mail2dustin.com','mail2dyke.com','mail2dylan.com','mail2earl.com','mail2earth.com','mail2eastend.com','mail2eat.com','mail2economist.com','mail2ecuador.com','mail2eddie.com','mail2edgar.com','mail2edwin.com','mail2egypt.com','mail2electron.com','mail2eli.com','mail2elizabeth.com','mail2ellen.com','mail2elliot.com','mail2elsalvador.com','mail2elvis.com','mail2emergency.com','mail2emily.com','mail2engineer.com','mail2english.com','mail2environmentalist.com','mail2eos.com','mail2eric.com','mail2erica.com','mail2erin.com','mail2erinyes.com','mail2eris.com','mail2eritrea.com','mail2ernie.com','mail2eros.com','mail2estonia.com','mail2ethan.com','mail2ethiopia.com','mail2eu.com','mail2europe.com','mail2eurus.com','mail2eva.com','mail2evan.com','mail2evelyn.com','mail2everything.com','mail2exciting.com','mail2expert.com','mail2fairy.com','mail2faith.com','mail2fanatic.com','mail2fancy.com','mail2fantasy.com','mail2farm.com','mail2farmer.com','mail2fashion.com','mail2fat.com','mail2feeling.com','mail2female.com','mail2fever.com','mail2fighter.com','mail2fiji.com','mail2filmfestival.com','mail2films.com','mail2finance.com','mail2finland.com','mail2fireman.com','mail2firm.com','mail2fisherman.com','mail2flexible.com','mail2florence.com','mail2florida.com','mail2floyd.com','mail2fly.com','mail2fond.com','mail2fondness.com','mail2football.com','mail2footballfan.com','mail2found.com','mail2france.com','mail2frank.com','mail2frankfurt.com','mail2franklin.com','mail2fred.com','mail2freddie.com','mail2free.com','mail2freedom.com','mail2french.com','mail2freudian.com','mail2friendship.com','mail2from.com','mail2fun.com','mail2gabon.com','mail2gabriel.com','mail2gail.com','mail2galaxy.com','mail2gambia.com','mail2games.com','mail2gary.com','mail2gavin.com','mail2gemini.com','mail2gene.com','mail2genes.com','mail2geneva.com','mail2george.com','mail2georgia.com','mail2gerald.com','mail2german.com','mail2germany.com','mail2ghana.com','mail2gilbert.com','mail2gina.com','mail2girl.com','mail2glen.com','mail2gloria.com','mail2goddess.com','mail2gold.com','mail2golfclub.com','mail2golfer.com','mail2gordon.com','mail2government.com','mail2grab.com','mail2grace.com','mail2graham.com','mail2grandma.com','mail2grandpa.com','mail2grant.com','mail2greece.com','mail2green.com','mail2greg.com','mail2grenada.com','mail2gsm.com','mail2guard.com','mail2guatemala.com','mail2guy.com','mail2hades.com','mail2haiti.com','mail2hal.com','mail2handhelds.com','mail2hank.com','mail2hannah.com','mail2harold.com','mail2harry.com','mail2hawaii.com','mail2headhunter.com','mail2heal.com','mail2heather.com','mail2heaven.com','mail2hebe.com','mail2hecate.com','mail2heidi.com','mail2helen.com','mail2hell.com','mail2help.com','mail2helpdesk.com','mail2henry.com','mail2hephaestus.com','mail2hera.com','mail2hercules.com','mail2herman.com','mail2hermes.com','mail2hespera.com','mail2hestia.com','mail2highschool.com','mail2hindu.com','mail2hip.com','mail2hiphop.com','mail2holland.com','mail2holly.com','mail2hollywood.com','mail2homer.com','mail2honduras.com','mail2honey.com','mail2hongkong.com','mail2hope.com','mail2horse.com','mail2hot.com','mail2hotel.com','mail2houston.com','mail2howard.com','mail2hugh.com','mail2human.com','mail2hungary.com','mail2hungry.com','mail2hygeia.com','mail2hyperspace.com','mail2hypnos.com','mail2ian.com','mail2ice-cream.com','mail2iceland.com','mail2idaho.com','mail2idontknow.com','mail2illinois.com','mail2imam.com','mail2in.com','mail2india.com','mail2indian.com','mail2indiana.com','mail2indonesia.com','mail2infinity.com','mail2intense.com','mail2iowa.com','mail2iran.com','mail2iraq.com','mail2ireland.com','mail2irene.com','mail2iris.com','mail2irresistible.com','mail2irving.com','mail2irwin.com','mail2isaac.com','mail2israel.com','mail2italian.com','mail2italy.com','mail2jackie.com','mail2jacob.com','mail2jail.com','mail2jaime.com','mail2jake.com','mail2jamaica.com','mail2james.com','mail2jamie.com','mail2jan.com','mail2jane.com','mail2janet.com','mail2janice.com','mail2japan.com','mail2japanese.com','mail2jasmine.com','mail2jason.com','mail2java.com','mail2jay.com','mail2jazz.com','mail2jed.com','mail2jeffrey.com','mail2jennifer.com','mail2jenny.com','mail2jeremy.com','mail2jerry.com','mail2jessica.com','mail2jessie.com','mail2jesus.com','mail2jew.com','mail2jeweler.com','mail2jim.com','mail2jimmy.com','mail2joan.com','mail2joann.com','mail2joanna.com','mail2jody.com','mail2joe.com','mail2joel.com','mail2joey.com','mail2john.com','mail2join.com','mail2jon.com','mail2jonathan.com','mail2jones.com','mail2jordan.com','mail2joseph.com','mail2josh.com','mail2joy.com','mail2juan.com','mail2judge.com','mail2judy.com','mail2juggler.com','mail2julian.com','mail2julie.com','mail2jumbo.com','mail2junk.com','mail2justin.com','mail2justme.com','mail2kansas.com','mail2karate.com','mail2karen.com','mail2karl.com','mail2karma.com','mail2kathleen.com','mail2kathy.com','mail2katie.com','mail2kay.com','mail2kazakhstan.com','mail2keen.com','mail2keith.com','mail2kelly.com','mail2kelsey.com','mail2ken.com','mail2kendall.com','mail2kennedy.com','mail2kenneth.com','mail2kenny.com','mail2kentucky.com','mail2kenya.com','mail2kerry.com','mail2kevin.com','mail2kim.com','mail2kimberly.com','mail2king.com','mail2kirk.com','mail2kiss.com','mail2kosher.com','mail2kristin.com','mail2kurt.com','mail2kuwait.com','mail2kyle.com','mail2kyrgyzstan.com','mail2la.com','mail2lacrosse.com','mail2lance.com','mail2lao.com','mail2larry.com','mail2latvia.com','mail2laugh.com','mail2laura.com','mail2lauren.com','mail2laurie.com','mail2lawrence.com','mail2lawyer.com','mail2lebanon.com','mail2lee.com','mail2leo.com','mail2leon.com','mail2leonard.com','mail2leone.com','mail2leslie.com','mail2letter.com','mail2liberia.com','mail2libertarian.com','mail2libra.com','mail2libya.com','mail2liechtenstein.com','mail2life.com','mail2linda.com','mail2linux.com','mail2lionel.com','mail2lipstick.com','mail2liquid.com','mail2lisa.com','mail2lithuania.com','mail2litigator.com','mail2liz.com','mail2lloyd.com','mail2lois.com','mail2lola.com','mail2london.com','mail2looking.com','mail2lori.com','mail2lost.com','mail2lou.com','mail2louis.com','mail2louisiana.com','mail2lovable.com','mail2love.com','mail2lucky.com','mail2lucy.com','mail2lunch.com','mail2lust.com','mail2luxembourg.com','mail2luxury.com','mail2lyle.com','mail2lynn.com','mail2madagascar.com','mail2madison.com','mail2madrid.com','mail2maggie.com','mail2mail4.com','mail2maine.com','mail2malawi.com','mail2malaysia.com','mail2maldives.com','mail2mali.com','mail2malta.com','mail2mambo.com','mail2man.com','mail2mandy.com','mail2manhunter.com','mail2mankind.com','mail2many.com','mail2marc.com','mail2marcia.com','mail2margaret.com','mail2margie.com','mail2marhaba.com','mail2maria.com','mail2marilyn.com','mail2marines.com','mail2mark.com','mail2marriage.com','mail2married.com','mail2marries.com','mail2mars.com','mail2marsha.com','mail2marshallislands.com','mail2martha.com','mail2martin.com','mail2marty.com','mail2marvin.com','mail2mary.com','mail2maryland.com','mail2mason.com','mail2massachusetts.com','mail2matt.com','mail2matthew.com','mail2maurice.com','mail2mauritania.com','mail2mauritius.com','mail2max.com','mail2maxwell.com','mail2maybe.com','mail2mba.com','mail2me4u.com','mail2mechanic.com','mail2medieval.com','mail2megan.com','mail2mel.com','mail2melanie.com','mail2melissa.com','mail2melody.com','mail2member.com','mail2memphis.com','mail2methodist.com','mail2mexican.com','mail2mexico.com','mail2mgz.com','mail2miami.com','mail2michael.com','mail2michelle.com','mail2michigan.com','mail2mike.com','mail2milan.com','mail2milano.com','mail2mildred.com','mail2milkyway.com','mail2millennium.com','mail2millionaire.com','mail2milton.com','mail2mime.com','mail2mindreader.com','mail2mini.com','mail2minister.com','mail2minneapolis.com','mail2minnesota.com','mail2miracle.com','mail2missionary.com','mail2mississippi.com','mail2missouri.com','mail2mitch.com','mail2model.com','mail2moldova.commail2molly.com','mail2mom.com','mail2monaco.com','mail2money.com','mail2mongolia.com','mail2monica.com','mail2montana.com','mail2monty.com','mail2moon.com','mail2morocco.com','mail2morpheus.com','mail2mors.com','mail2moscow.com','mail2moslem.com','mail2mouseketeer.com','mail2movies.com','mail2mozambique.com','mail2mp3.com','mail2mrright.com','mail2msright.com','mail2museum.com','mail2music.com','mail2musician.com','mail2muslim.com','mail2my.com','mail2myboat.com','mail2mycar.com','mail2mycell.com','mail2mygsm.com','mail2mylaptop.com','mail2mymac.com','mail2mypager.com','mail2mypalm.com','mail2mypc.com','mail2myphone.com','mail2myplane.com','mail2namibia.com','mail2nancy.com','mail2nasdaq.com','mail2nathan.com','mail2nauru.com','mail2navy.com','mail2neal.com','mail2nebraska.com','mail2ned.com','mail2neil.com','mail2nelson.com','mail2nemesis.com','mail2nepal.com','mail2netherlands.com','mail2network.com','mail2nevada.com','mail2newhampshire.com','mail2newjersey.com','mail2newmexico.com','mail2newyork.com','mail2newzealand.com','mail2nicaragua.com','mail2nick.com','mail2nicole.com','mail2niger.com','mail2nigeria.com','mail2nike.com','mail2no.com','mail2noah.com','mail2noel.com','mail2noelle.com','mail2normal.com','mail2norman.com','mail2northamerica.com','mail2northcarolina.com','mail2northdakota.com','mail2northpole.com','mail2norway.com','mail2notus.com','mail2noway.com','mail2nowhere.com','mail2nuclear.com','mail2nun.com','mail2ny.com','mail2oasis.com','mail2oceanographer.com','mail2ohio.com','mail2ok.com','mail2oklahoma.com','mail2oliver.com','mail2oman.com','mail2one.com','mail2onfire.com','mail2online.com','mail2oops.com','mail2open.com','mail2ophthalmologist.com','mail2optometrist.com','mail2oregon.com','mail2oscars.com','mail2oslo.com','mail2painter.com','mail2pakistan.com','mail2palau.com','mail2pan.com','mail2panama.com','mail2paraguay.com','mail2paralegal.com','mail2paris.com','mail2park.com','mail2parker.com','mail2party.com','mail2passion.com','mail2pat.com','mail2patricia.com','mail2patrick.com','mail2patty.com','mail2paul.com','mail2paula.com','mail2pay.com','mail2peace.com','mail2pediatrician.com','mail2peggy.com','mail2pennsylvania.com','mail2perry.com','mail2persephone.com','mail2persian.com','mail2peru.com','mail2pete.com','mail2peter.com','mail2pharmacist.com','mail2phil.com','mail2philippines.com','mail2phoenix.com','mail2phonecall.com','mail2phyllis.com','mail2pickup.com','mail2pilot.com','mail2pisces.com','mail2planet.com','mail2platinum.com','mail2plato.com','mail2pluto.com','mail2pm.com','mail2podiatrist.com','mail2poet.com','mail2poland.com','mail2policeman.com','mail2policewoman.com','mail2politician.com','mail2pop.com','mail2pope.com','mail2popular.com','mail2portugal.com','mail2poseidon.com','mail2potatohead.com','mail2power.com','mail2presbyterian.com','mail2president.com','mail2priest.com','mail2prince.com','mail2princess.com','mail2producer.com','mail2professor.com','mail2protect.com','mail2psychiatrist.com','mail2psycho.com','mail2psychologist.com','mail2qatar.com','mail2queen.com','mail2rabbi.com','mail2race.com','mail2racer.com','mail2rachel.com','mail2rage.com','mail2rainmaker.com','mail2ralph.com','mail2randy.com','mail2rap.com','mail2rare.com','mail2rave.com','mail2ray.com','mail2raymond.com','mail2realtor.com','mail2rebecca.com','mail2recruiter.com','mail2recycle.com','mail2redhead.com','mail2reed.com','mail2reggie.com','mail2register.com','mail2rent.com','mail2republican.com','mail2resort.com','mail2rex.com','mail2rhodeisland.com','mail2rich.com','mail2richard.com','mail2ricky.com','mail2ride.com','mail2riley.com','mail2rita.com','mail2rob.com','mail2robert.com','mail2roberta.com','mail2robin.com','mail2rock.com','mail2rocker.com','mail2rod.com','mail2rodney.com','mail2romania.com','mail2rome.com','mail2ron.com','mail2ronald.com','mail2ronnie.com','mail2rose.com','mail2rosie.com','mail2roy.com','mail2rudy.com','mail2rugby.com','mail2runner.com','mail2russell.com','mail2russia.com','mail2russian.com','mail2rusty.com','mail2ruth.com','mail2rwanda.com','mail2ryan.com','mail2sa.com','mail2sabrina.com','mail2safe.com','mail2sagittarius.com','mail2sail.com','mail2sailor.com','mail2sal.com','mail2salaam.com','mail2sam.com','mail2samantha.com','mail2samoa.com','mail2samurai.com','mail2sandra.com','mail2sandy.com','mail2sanfrancisco.com','mail2sanmarino.com','mail2santa.com','mail2sara.com','mail2sarah.com','mail2sat.com','mail2saturn.com','mail2saudi.com','mail2saudiarabia.com','mail2save.com','mail2savings.com','mail2school.com','mail2scientist.com','mail2scorpio.com','mail2scott.com','mail2sean.com','mail2search.com','mail2seattle.com','mail2secretagent.com','mail2senate.com','mail2senegal.com','mail2sensual.com','mail2seth.com','mail2sevenseas.com','mail2sexy.com','mail2seychelles.com','mail2shane.com','mail2sharon.com','mail2shawn.com','mail2ship.com','mail2shirley.com','mail2shoot.com','mail2shuttle.com','mail2sierraleone.com','mail2simon.com','mail2singapore.com','mail2single.com','mail2site.com','mail2skater.com','mail2skier.com','mail2sky.com','mail2sleek.com','mail2slim.com','mail2slovakia.com','mail2slovenia.com','mail2smile.com','mail2smith.com','mail2smooth.com','mail2soccer.com','mail2soccerfan.com','mail2socialist.com','mail2soldier.com','mail2somalia.com','mail2son.com','mail2song.com','mail2sos.com','mail2sound.com','mail2southafrica.com','mail2southamerica.com','mail2southcarolina.com','mail2southdakota.com','mail2southkorea.com','mail2southpole.com','mail2spain.com','mail2spanish.com','mail2spare.com','mail2spectrum.com','mail2splash.com','mail2sponsor.com','mail2sports.com','mail2srilanka.com','mail2stacy.com','mail2stan.com','mail2stanley.com','mail2star.com','mail2state.com','mail2stephanie.com','mail2steve.com','mail2steven.com','mail2stewart.com','mail2stlouis.com','mail2stock.com','mail2stockholm.com','mail2stockmarket.com','mail2storage.com','mail2store.com','mail2strong.com','mail2student.com','mail2studio.com','mail2studio54.com','mail2stuntman.com','mail2subscribe.com','mail2sudan.com','mail2superstar.com','mail2surfer.com','mail2suriname.com','mail2susan.com','mail2suzie.com','mail2swaziland.com','mail2sweden.com','mail2sweetheart.com','mail2swim.com','mail2swimmer.com','mail2swiss.com','mail2switzerland.com','mail2sydney.com','mail2sylvia.com','mail2syria.com','mail2taboo.com','mail2taiwan.com','mail2tajikistan.com','mail2tammy.com','mail2tango.com','mail2tanya.com','mail2tanzania.com','mail2tara.com','mail2taurus.com','mail2taxi.com','mail2taxidermist.com','mail2taylor.com','mail2taz.com','mail2teacher.com','mail2technician.com','mail2ted.com','mail2telephone.com','mail2teletubbie.com','mail2tenderness.com','mail2tennessee.com','mail2tennis.com','mail2tennisfan.com','mail2terri.com','mail2terry.com','mail2test.com','mail2texas.com','mail2thailand.com','mail2therapy.com','mail2think.com','mail2tickets.com','mail2tiffany.com','mail2tim.com','mail2time.com','mail2timothy.com','mail2tina.com','mail2titanic.com','mail2toby.com','mail2todd.com','mail2togo.com','mail2tom.com','mail2tommy.com','mail2tonga.com','mail2tony.com','mail2touch.com','mail2tourist.com','mail2tracey.com','mail2tracy.com','mail2tramp.com','mail2travel.com','mail2traveler.com','mail2travis.com','mail2trekkie.com','mail2trex.com','mail2triallawyer.com','mail2trick.com','mail2trillionaire.com','mail2troy.com','mail2truck.com','mail2trump.com','mail2try.com','mail2tunisia.com','mail2turbo.com','mail2turkey.com','mail2turkmenistan.com','mail2tv.com','mail2tycoon.com','mail2tyler.com','mail2u4me.com','mail2uae.com','mail2uganda.com','mail2uk.com','mail2ukraine.com','mail2uncle.com','mail2unsubscribe.com','mail2uptown.com','mail2uruguay.com','mail2usa.com','mail2utah.com','mail2uzbekistan.com','mail2v.com','mail2vacation.com','mail2valentines.com','mail2valerie.com','mail2valley.com','mail2vamoose.com','mail2vanessa.com','mail2vanuatu.com','mail2venezuela.com','mail2venous.com','mail2venus.com','mail2vermont.com','mail2vickie.com','mail2victor.com','mail2victoria.com','mail2vienna.com','mail2vietnam.com','mail2vince.com','mail2virginia.com','mail2virgo.com','mail2visionary.com','mail2vodka.com','mail2volleyball.com','mail2waiter.com','mail2wallstreet.com','mail2wally.com','mail2walter.com','mail2warren.com','mail2washington.com','mail2wave.com','mail2way.com','mail2waycool.com','mail2wayne.com','mail2webmaster.com','mail2webtop.com','mail2webtv.com','mail2weird.com','mail2wendell.com','mail2wendy.com','mail2westend.com','mail2westvirginia.com','mail2whether.com','mail2whip.com','mail2white.com','mail2whitehouse.com','mail2whitney.com','mail2why.com','mail2wilbur.com','mail2wild.com','mail2willard.com','mail2willie.com','mail2wine.com','mail2winner.com','mail2wired.com','mail2wisconsin.com','mail2woman.com','mail2wonder.com','mail2world.com','mail2worship.com','mail2wow.com','mail2www.com','mail2wyoming.com','mail2xfiles.com','mail2xox.com','mail2yachtclub.com','mail2yahalla.com','mail2yemen.com','mail2yes.com','mail2yugoslavia.com','mail2zack.com','mail2zambia.com','mail2zenith.com','mail2zephir.com','mail2zeus.com','mail2zipper.com','mail2zoo.com','mail2zoologist.com','mail2zurich.com','mail3000.com','mail333.com','mailandftp.com','mailandnews.com','mailas.com','mailasia.com','mailbolt.com','mailbomb.net','mailboom.com','mailbox.as','mailbox.co.za','mailbox.gr','mailbox.hu','mailbr.com.br','mailc.net','mailcan.com','mailcc.com','mailchoose.co','mailcity.com','mailclub.fr','mailclub.net','mailexcite.com','mailforce.net','mailftp.com','mailgate.gr','mailgenie.net','mailhaven.com','mailhood.com','mailingweb.com','mailisent.com','mailite.com','mailme.dk','mailmight.com','mailmij.nl','mailnew.com','mailops.com','mailoye.com','mailpanda.com','mailpost.zzn.com','mailpride.com','mailpuppy.com','mailroom.com','mailru.com','mailsent.net','mailshuttle.com','mailstart.com','mailstartplus.com','mailsurf.com','mailtag.com','mailto.de','mailup.net','mailwire.com','maktoob.com','malayalamtelevision.net','manager.de','mantrafreenet.com','mantramail.com','mantraonline.com','marchmail.com','mariah-carey.ml.org','mariahc.com','marijuana.nl','marketing.lu','married-not.com','marsattack.com','martindalemail.com','masrawy.com','matmail.com','mauimail.com','mauritius.com','maxleft.com','maxmail.co.uk','mbox.com.au','mchsi.com','mciworldcom.net','me-mail.hu','me.com','medical.net.au','medione.net','medmail.com','medscape.com','meetingmall.com','megago.com','megamail.pt','megapathdsl.net','megapoint.com','mehrani.com','mehtaweb.com','mekhong.com','melodymail.com','meloo.com','members.student.com','message.hu','messages.to','metacrawler.com','metalfan.com','metta.lk','miatadriver.com','miesto.sk','mighty.co.za','miho-nakayama.com','mikrotamanet.com','millionaireintraining.com','milmail.com','mindless.com','mindspring.com','mini-mail.com','misery.net','mittalweb.com','mixmail.com','mjfrogmail.com','ml1.net','mobilbatam.com','mochamail.com','mohammed.com','moldova.cc','moldova.com','moldovacc.com','money.net','montevideo.com.uy','moonman.com','moose-mail.com','mortaza.com','mosaicfx.com','most-wanted.com','mostlysunny.com','motormania.com','movemail.com','movieluver.com','mp4.it','mr-potatohead.com','mrpost.com','mscold.com','msgbox.com','msn.com','mttestdriver.com','mundomail.net','munich.com','music.com','musician.org','musicscene.org','mybox.it','mycabin.com','mycampus.com','mycity.com','mycool.com','mydomain.com','mydotcomaddress.com','myfamily.com','mygo.com','myiris.com','mynamedot.com','mynetaddress.com','myownemail.com','myownfriends.com','mypad.com','mypersonalemail.com','myplace.com','myrealbox.com','myremarq.com','myself.com','mystupidjob.com','mythirdage.com','myway.com','myworldmail.com','n2.com','n2business.com','n2mail.com','n2software.com','nabc.biz','nafe.com','nagpal.net','nakedgreens.com','name.com','nameplanet.com','nandomail.com','naplesnews.net','naseej.com','nate.com','nativestar.net','nativeweb.net','naui.net','nauticom.net','naver.com','navigator.lv','navy.org','naz.com','nchoicemail.com','neeva.net','nemra1.com','nenter.com','neo.rr.com','nervhq.org','net-pager.net','net4b.pt','net4you.at','netbounce.com','netbroadcaster.com','netby.dk','netcenter-vn.net','netcom.ca','netcom.com','netcourrier.com','netexecutive.com','netexpressway.com','netgenie.com','netian.com','netizen.com.ar','netlane.com','netlimit.com','netmanor.com','netmongol.com','netnet.com.sg','netpiper.com','netposta.net','netradiomail.com','netralink.com','netscape.com','netscape.net','netscapeonline.co.uk','netsero.net','netspeedway.com','netsquare.com','netster.com','nettaxi.com','netzero.com','netzero.net','neuf.fr','newmail.com','newmail.net','newmail.ru','newyork.com','nexxmail.com','nfmail.com','nhmail.com','nicebush.com','nicegal.com','nicholastse.net','nicolastse.com','nightmail.com','nikopage.com','nimail.com','nirvanafan.com','noavar.com','norika-fujiwara.com','norikomail.com','northgates.net','nospammail.net','ntlworld.com','ntscan.com','ny.com','nyc.com','nycmail.com','nzoomail.com','o-tay.com','o2.co.uk','oaklandas-fan.com','oceanfree.net','oddpost.com','odmail.com','office-email.com','officedomain.com','offroadwarrior.com','oi.com.br','oicexchange.com','okbank.com','okhuman.com','okmad.com','okmagic.com','okname.net','okuk.com','oldies1041.com','oldies104mail.com','ole.com','olemail.com','olg.com','olympist.net','omaninfo.com','onebox.com','onenet.com.ar','onet.pl','oninet.pt','online.de','online.ie','onlinewiz.com','onmilwaukee.com','onobox.com','onvillage.com','operafan.com','operamail.com','optician.com','optonline.net','optusnet.com.au','orange.fr','orange.net','orbitel.bg','orgmail.net','osite.com.br','oso.com','otakumail.com','our-computer.com','our-office.com','our.st','ourbrisbane.com','ournet.md','outel.com','outgun.com','outlook.com','outlook.com.br','over-the-rainbow.com','ownmail.net','ozbytes.net.au','ozemail.com.au','pacbell.net','pacific-re.com','packersfan.com','pagina.de','pagons.org','pakistanoye.com','palestinemail.com','parkjiyoon.com','parrot.com','parsmail.com','partlycloudy.com','partynight.at','parvazi.com','passwordmail.com','pathfindermail.com','patmedia.net','pconnections.net','pcpostal.com','pcsrock.com','peachworld.com','pediatrician.com','pemail.net','penpen.com','peoplepc.com','peopleweb.com','perfectmail.com','personal.ro','personales.com','petml.com','pettypool.com','pezeshkpour.com','phayze.com','phreaker.net','pickupman.com','picusnet.com','pigpig.net','pinoymail.com','pipeline.com','piracha.net','pisem.net','planet-mail.com','planet.nl','planetaccess.com','planetall.com','planetarymotion.net','planetdirect.com','planetearthinter.net','planetout.com','plasa.com','playersodds.com','playful.com','plusmail.com.br','pmail.net','pobox.com','pobox.hu','pobox.sk','pochta.ru','poczta.fm','poetic.com','polbox.com','policeoffice.com','pool-sharks.com','poond.com','popaccount.com','popmail.com','popsmail.com','popstar.com','populus.net','portableoffice.com','portugalmail.com','portugalmail.pt','portugalnet.com','positive-thinking.com','post.com','post.cz','post.sk','posta.net','posta.ro','postaccesslite.com','postafree.com','postaweb.com','poste.it','postinbox.com','postino.ch','postmark.net','postmaster.co.uk','postpro.net','pousa.com','powerfan.com','praize.com','premiumservice.com','presidency.com','press.co.jp','priest.com','primposta.com','primposta.hu','pro.hu','probemail.com','prodigy.net','prodigy.net.mx','progetplus.it','programmer.net','programozo.hu','proinbox.com','project2k.com','prolaunch.com','promessage.com','prontomail.com','protonmail.com','psi.net','psv-supporter.com','ptd.net','public.usa.com','publicist.com','pulp-fiction.com','punkass.com','qatarmail.com','qis.net','qprfans.com','qq.com','qrio.com','quackquack.com','quakemail.com','qudsmail.com','quepasa.com','quickwebmail.com','quiklinks.com','quikmail.com','qwest.net','qwestoffice.net','r-o-o-t.com','r7.com','raakim.com','racedriver.com','racefanz.com','racingfan.com.au','racingmail.com','radicalz.com','ragingbull.com','rambler.ru','ranmamail.com','rastogi.net','ratt-n-roll.com','rattle-snake.com','ravearena.com','ravemail.com','razormail.com','rccgmail.org','rcn.com','realemail.net','reallyfast.biz','realradiomail.com','recycler.com','rediffmail.com','rediffmailpro.com','rednecks.com','redseven.de','redsfans.com','reggafan.com','registerednurses.com','repairman.com','reply.hu','representative.com','rescueteam.com','resumemail.com','rezai.com','richmondhill.com','rickymail.com','rin.ru','riopreto.com.br','rn.com','roadrunner.com','roanokemail.com','rock.com','rocketmail.com','rockfan.com','rodrun.com','rome.com','roosh.com','rotfl.com','roughnet.com','rr.com','rrohio.com','rsub.com','rubyridge.com','runbox.com','rushpost.com','ruttolibero.com','rvshop.com','s-mail.com','sabreshockey.com','sacbeemail.com','safarimail.com','safe-mail.net','sagra.lu','sailormoon.com','saintly.com','saintmail.net','sale-sale-sale.com','salehi.net','samerica.com','samilan.net','sammimail.com','sanfranmail.com','sanook.com','sapo.pt','sativa.ro.org','saudia.com','sayhi.net','sbcglobal.net','scandalmail.com','schizo.com','schoolemail.com','schoolmail.com','schoolsucks.com','schweiz.org','sci.fi','science.com.au','scientist.com','scifianime.com','scottishmail.co.uk','scubadiving.com','seanet.com','searchwales.com','sebil.com','secret-police.com','secretservices.net','seductive.com','seekstoyboy.com','seguros.com.br','send.hu','sendme.cz','sent.com','sentrismail.com','serga.com.ar','servemymail.com','sesmail.com','sexmagnet.com','seznam.cz','sfr.fr','shahweb.net','shaniastuff.com','sharewaredevelopers.com','sharmaweb.com','shaw.ca','she.com','shootmail.com','shotgun.hu','shuf.com','sialkotcity.com','sialkotian.com','sialkotoye.com','sify.com','silkroad.net','sina.cn','sina.com','sinamail.com','singapore.com','singmail.com','singnet.com.sg','singpost.com','skafan.com','skim.com','skizo.hu','sky.com','skynet.be','slamdunkfan.com','slingshot.com','slo.net','slotter.com','smapxsmap.net','smileyface.comsmithemail.net','smoothmail.com','snail-mail.net','snail-mail.ney','snakemail.com','sndt.net','sneakemail.com','snet.net','snip.net','sniper.hu','snoopymail.com','snowboarding.com','snowdonia.net','socamail.com','socceramerica.net','soccermail.com','soccermomz.com','sociologist.com','softhome.net','sol.dk','soldier.hu','soon.com','soulfoodcookbook.com','sp.nl','space-bank.com','space-man.com','space-ship.com','space-travel.com','space.com','spaceart.com','spacebank.com','spacemart.com','spacetowns.com','spacewar.com','spamex.com','spartapiet.com','spazmail.com','speedemail.net','speedpost.net','speedrules.com','speedrulz.com','speedy.com.ar','spils.com','spinfinder.com','sportemail.com','sportsmail.com','sporttruckdriver.com','spray.no','spray.se','sprintmail.com','sprynet.com','spymac.com','srilankan.net','st-davids.net','stade.fr','stalag13.com','stargateradio.com','starmail.com','starmail.org','starmedia.com','starplace.com','starpower.net','starspath.com','start.com.au','starting-point.com','startrekmail.com','stealthmail.com','stockracer.com','stones.com','stopdropandroll.com','storksite.com','stribmail.com','strompost.com','strongguy.com','studentcenter.org','subnetwork.com','subram.com','sudanmail.net','suhabi.com','suisse.org','sukhumvit.net','sunpoint.net','sunrise-sunset.com','sunsgame.com','sunumail.sn','superdada.com','supereva.it','supermail.ru','surat.com','surf3.net','surfree.com','surfy.net','surimail.com','survivormail.com','swbell.net','sweb.cz','swiftdesk.com','swingeasyhithard.com','swingfan.com','swipermail.zzn.com','swirve.com','swissinfo.org','swissmail.net','switchboardmail.com','switzerland.org','swva.net','sx172.com','sympatico.ca','syom.com','syriamail.com','t-online.de','t2mail.com','takuyakimura.com','talk21.com','talkcity.com','talktalk.co.uk','tamil.com','tampabay.rr.com','tatanova.com','tbwt.com','tds.net','teamdiscovery.com','teamtulsa.net','tech4peace.org','techemail.com','techie.com','technisamail.co.za','technologist.com','techpointer.com','techscout.com','techseek.com','techspot.com','teenagedirtbag.com','telebot.com','telebot.net','teleline.es','telenet.be','telerymd.com','teleserve.dynip.com','teletu.it','telinco.net','telkom.net','telpage.net','telus.net','temtulsa.net','tenchiclub.com','tenderkiss.com','tennismail.com','terra.cl','terra.com','terra.com.ar','terra.com.br','terra.es','tfanus.com.er','tfz.net','thai.com','thaimail.com','thaimail.net','the-african.com','the-airforce.com','the-aliens.com','the-american.com','the-animal.com','the-army.com','the-astronaut.com','the-beauty.com','the-big-apple.com','the-biker.com','the-boss.com','the-brazilian.com','the-canadian.com','the-canuck.com','the-captain.com','the-chinese.com','the-country.com','the-cowboy.com','the-davis-home.com','the-dutchman.com','the-eagles.com','the-englishman.com','the-fastest.net','the-fool.com','the-frenchman.com','the-galaxy.net','the-genius.com','the-gentleman.com','the-german.com','the-gremlin.com','the-hooligan.com','the-italian.com','the-japanese.com','the-lair.com','the-madman.com','the-mailinglist.com','the-marine.com','the-master.com','the-mexican.com','the-ministry.com','the-monkey.com','the-newsletter.net','the-pentagon.com','the-police.com','the-prayer.com','the-professional.com','the-quickest.com','the-russian.com','the-snake.com','the-spaceman.com','the-stock-market.com','the-student.net','the-whitehouse.net','the-wild-west.com','the18th.com','thecoolguy.com','thecriminals.com','thedoghousemail.com','thedorm.com','theend.hu','theglobe.com','thegolfcourse.com','thegooner.com','theheadoffice.com','thelanddownunder.com','themillionare.net','theoffice.net','thepokerface.com','thepostmaster.net','theraces.com','theracetrack.com','thestreetfighter.com','theteebox.com','thewatercooler.com','thewebpros.co.uk','thewizzard.com','thewizzkid.com','thezhangs.net','thirdage.com','thisgirl.com','thoic.com','thundermail.com','tidni.com','timein.net','tin.it','tiscali.at','tiscali.be','tiscali.co.uk','tiscali.it','tiscali.lu','tiscali.se','tkcity.com','toolsource.com','topchat.com','topgamers.co.uk','topletter.com','topmail.com.ar','topsurf.com','topteam.bg','torchmail.com','tot.net','totalmusic.net','toughguy.net','tpg.com.au','travel.li','trialbytrivia.com','tritium.net','trmailbox.com','tropicalstorm.com','truckers.com','truckerz.com','truckracer.com','trust-me.com','tsamail.co.za','ttml.co.in','tunisiamail.com','turkey.com','tvcablenet.be','twinstarsmail.com','tycoonmail.com','typemail.com','u2club.com','uae.ac','uaemail.com','ubbi.com','ubbi.com.br','uboot.com','uk2k.com','uk2net.com','uk7.net','uk8.net','ukbuilder.com','ukcool.com','ukdreamcast.com','ukmail.org','ukmax.com','ukr.net','uku.co.uk','ultapulta.com','ultrapostman.com','ummah.org','umpire.com','unbounded.com','unforgettable.com','uni.de','unican.es','unihome.com','universal.pt','uno.ee','uno.it','unofree.it','unomail.com','uol.com.ar','uol.com.br','uol.com.co','uol.com.mx','uol.com.ve','uole.com','uole.com.ve','uolmail.com','uomail.com','upf.org','ureach.com','urgentmail.biz','usa.com','usa.net','usaaccess.net','usanetmail.com','usermail.com','usit.net','usma.net','usmc.net','uswestmail.net','uu.net','uymail.com','uyuyuy.com','v-sexi.com','vahoo.com','varbizmail.com','vcmail.com','velnet.co.uk','velocall.com','verizon.net','verizonmail.com','veryfast.biz','veryspeedy.net','videotron.ca','violinmakers.co.uk','vip.gr','vipmail.ru','virgilio.it','virgin.net','virginmedia.com','virtualactive.com','virtualmail.com','visitmail.com','visitweb.com','visto.com','visualcities.com','vivavelocity.com','vivianhsu.net','vjmail.com','vjtimail.com','vlmail.com','vnn.vn','voila.fr','volcanomail.com','voo.be','vote-democrats.com','vote-hillary.com','vote-republicans.com','vote4gop.org','votenet.com','vr9.com','w3.to','wahoye.com','wales2000.net','wam.co.za','wanadoo.co.uk','wanadoo.es','wanadoo.fr','warmmail.com','warpmail.net','warrior.hu','waumail.com','wbdet.com','wearab.net','web-mail.com.ar','web-police.com','web.de','webave.com','webcammail.com','webcity.ca','webdream.com','webinbox.com','webindia123.com','webjump.com','webmail.bellsouth.net','webmail.co.yu','webmail.co.za','webmail.hu','webmails.com','webprogramming.com','webstable.net','webstation.com','websurfer.co.za','webtopmail.com','weedmail.com','weekmail.com','weekonline.com','wehshee.com','welsh-lady.com','whale-mail.com','whartontx.com','wheelweb.com','whipmail.com','whoever.com','whoopymail.com','wickedmail.com','wideopenwest.com','wildmail.com','windrivers.net','windstream.net','wingnutz.com','winmail.com.au','winning.com','witty.com','wiz.cc','wkbwmail.com','woh.rr.com','wolf-web.com','wombles.com','wonder-net.com','wongfaye.com','wooow.it','workmail.com','worldemail.com','worldmailer.com','worldnet.att.net','wosaddict.com','wouldilie.com','wow.com','wowgirl.com','wowmail.com','wowway.com','wp.pl','wptamail.com','wrestlingpages.com','wrexham.net','writeme.com','writemeback.com','wrongmail.com','wtvhmail.com','wwdg.com','www.com','www2000.net','wx88.net','wxs.net','wyrm.supernews.com','x-mail.net','x-networks.net','x5g.com','xmastime.com','xmsg.com','xoom.com','xoommail.com','xpressmail.zzn.com','xsmail.com','xuno.com','xzapmail.com','ya.ru','yada-yada.com','yaho.com','yahoo.ca','yahoo.co.id','yahoo.co.in','yahoo.co.jp','yahoo.co.kr','yahoo.co.nz','yahoo.co.uk','yahoo.com','yahoo.com.ar','mail.de','mail.com','t-online.de','me.com','mac.com'
    ];

    window.Parsley.addValidator('custom100', {
        requirementType: 'string',
        validateString: function (value, requirement) {
            if (!testMailAddressValidRegExp.test(value)) {
                return false;
            }

            var matchedDomains = freeMailProviderList.filter(function(domain) {
                var regExp = new RegExp(domain.replace('.', '\.') + '$', 'i');
                return regExp.test(value);
            });

            return matchedDomains.length == 0;
        }
    });
}

// Swiper api: https://github.com/nolimits4web/Swiper/blob/Swiper4/API.md
function initImageJumpLinks() {
    var $imageJumplinksContainerWrap = $('.imageJumplinksContainerWrap');
    if ($imageJumplinksContainerWrap.length == 0) return;

    var $imageJumplinksSwiper = $imageJumplinksContainerWrap.find('.swiper-container');

    var swiperConfig = {
        pagination: {
            el: $imageJumplinksContainerWrap.find('.swiper-pagination')[0],
            clickable: true,
        },
        spaceBetween: 25,
        slidesPerView: 5,
        watchOverflow: true,
        breakpoints: {
            1464: {
                slidesPerView: 4,
            },
            1170: {
                slidesPerView: 3,
            },
            876: {
                slidesPerView: 2,
            },
            582: {
                slidesPerView: 1,
            },
        },
    };

    var $imageJumplinksContainer = $imageJumplinksContainerWrap.find('.imageJumplinksContainer');
    var slidesCount = $imageJumplinksContainer.find('.swiper-slide').length;
    if (slidesCount == 4) {
        swiperConfig.slidesPerView = 4;
        delete swiperConfig.breakpoints['1464'];
        $imageJumplinksContainer.css('max-width', '1151px');

    } else if (slidesCount == 3) {
        swiperConfig.slidesPerView = 3;
        delete swiperConfig.breakpoints['1464'];
        delete swiperConfig.breakpoints['1170'];
        $imageJumplinksContainer.css('max-width', '858px');
    }

    var _ = new Swiper($imageJumplinksSwiper[0], swiperConfig);



    var $stickyImageJumplinksContainerWrap = $('.stickyImageJumplinksContainerWrap');
    if ($stickyImageJumplinksContainerWrap.length == 0) return;

    var $swiper = $stickyImageJumplinksContainerWrap.find('.swiper-container');

    var _ = new Swiper($swiper[0], {
        navigation: {
            nextEl: $stickyImageJumplinksContainerWrap.find('.swiper-button-next')[0],
            prevEl: $stickyImageJumplinksContainerWrap.find('.swiper-button-prev')[0],
        },
        slidesPerView: 'auto',
        freeMode: true,
        watchOverflow: true,
    });

    var $headerContainer = $('#header1Container');
    function handleScroll() {
        var offsetTop    = $imageJumplinksSwiper.offset().top;
        var height       = $imageJumplinksSwiper.height();
        var scrollY      = window.scrollY;
        var headerHeight = $headerContainer.height();

        if (scrollY + headerHeight >= offsetTop + height) {
            $stickyImageJumplinksContainerWrap.addClass('show');
        } else {
            $stickyImageJumplinksContainerWrap.removeClass('show');
        }
    }

    window.addEventListener('scroll', handleScroll, {passive: true});
    handleScroll();
}