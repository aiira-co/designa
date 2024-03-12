$(document).ready(function () {
    var wrapper = $('body');

    // Designa - Menu

    // Button to hide and show the sideMenu
    $('#adx-menu-toggle').click(function () {
        $('adx-left').toggleClass('adx-hide');
    });

    //Header Fixed
    $(window).scroll(function () {
        var header = $('.scrollFixed'),
            scroll = $(window).scrollTop();

        if (scroll >= 58) {
            header.addClass('adx-fixed');
            $('.logo1').css('display', 'none');
            $('.logo2').css('display', 'block');
        } else {
            header.removeClass('adx-fixed');
            $('.logo1').css('display', 'block');
            $('.logo2').css('display', 'none');
        }
    });

    // Nav

    function checkNav() {
        if ($('.adx-nav #menuTrigger').length != 0) {
            // console.log('nav found menuTrigger found');
            var adLogo = $('.adx-nav .adx-logo').html();
            var adMenu = $('.adx-nav .adx-menu').html();
            wrapper.prepend(
                '<div class="menuTriggered"><div class="adx-logo">' +
                adLogo +
                '</div>' +
                adMenu +
                '</div>'
            );
        }
    }

    checkNav();

    $('#menuTrigger').click(function () {
        $('.menuTriggered').toggleClass('adx-show');
    });

    // smoothScrolling

    $('a[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, '') ==
            this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

            if (target.length) {
                $('html,body').animate({
                        scrollTop: target.offset().top
                    },
                    1000
                );
                return false;
            }
        }
    });


    // Designa - Interactive

    function ScanDOM4Constructive() {
        // tab

        if (
            wrapper.find('.adx-tab-group, adx-tab-group').not('[_adconstructed]')
            .length !== 0
        ) {
            constructTab();
        }
    }

    // ScanDOM4Constructive
    ScanDOM4Constructive();
    setInterval(function () {
        ScanDOM4Constructive();
    }, 3000);



    //adx-modal popUp

    $('.adx-modal-trigger[adx-modal]').click(function (e) {
        var $this = $(this);
        //    $('.adx-modal#'+$this.attr('adx-modal')).css({'left': e.pageX},{'top': e.pageX});
        var $modal = $('.adx-modal#' + $this.attr('adx-modal'));

        var triggerPosition = {
            top: e.pageY - window.pageYOffset + 'px',
            left: e.pageX + 'px'
        };

        $modal.css('left', triggerPosition.left);
        $modal.css('top', triggerPosition.top);

        $modal.hasClass('adx-blur') ?
            $('.wrapper, .wrapper-fluid').css('filter', 'blur(0.3rem)') :
            '';

        $modal.addClass('adx-show');

        $modal.removeAttr('style');

        //  $modal.animate({'top':window.innerHeight * .3} ,6000);
        //  $modal.animate({'left':window.innerWidth * .5 } ,6000);
        // //  $modal.css('top','20%');
        // console.log('e.pageX value is: '+ e.pageX + ' e.pageX value is: '+ e.pageY);

        // console.log(triggerPosition.top);
    });

    wrapper.on('click', '.adx-close-modal', function () {
        // console.log('clicked');
        var $modal = $('.adx-modal, adx-modal');
        $modal.removeClass('adx-show');
        $modal.removeAttr('style');
        $modal.hasClass('adx-blur') ?
            $('.wrapper, .wrapper-fluid').css('filter', 'blur(0)') :
            '';
    });

    //adx-accordian

    wrapper.on('click', '.adx-accordian .adx-head', function () {
        var $this = $(this);
        $this.toggleClass('adx-show');
    });


    // adx-tab-group

    // Scan DOM for adx-tab-group and construct the adx-head
    function constructTab() {
        $('.adx-tab-group')
            .not('[ad_constructed]')
            .each(function () {
                // Check is the .adx-head is not already generated
                if ($(this).find('.adx-head').length == 0) {
                    let adTab = $(this).find('.adx-tab[label], adx-tab[label]');
                    var adTabSize = adTab.length;
                    let list = '';
                    adTab.each(function (e) {
                        // $(this).attr('tabIndex', e);
                        if ($(this).hasClass('adx-show')) {
                            list +=
                                '<li class="active" tabIndex="' +
                                e +
                                '">' +
                                $(this).attr('label') +
                                '</li>';
                        } else {
                            list +=
                                '<li tabIndex="' + e + '">' + $(this).attr('label') + '</li>';
                        }
                    });
                    // console.log('size of tabl is:', adTabSize);
                    // construct the head
                    let head =
                        '<div class="adx-head"><ul style="width:' +
                        100 * adTabSize +
                        '%">' +
                        list +
                        '</ul></div>';
                    $(this).prepend(head);

                    // Set width for default line
                    // $(this)
                    //     .find('.adx-head span.tab-line')
                    //     .css(
                    //         'width',
                    //         $(this)
                    //         .find('.adx-head li.active')
                    //         .width() +
                    //         32 +
                    //         'px'
                    //     );

                }
                // wrapp all .adx-tab with a content div to make it flex
                let tabContainer = $(
                    '<div class="adx-body" style="width:' +
                    100 * adTabSize +
                    '%"></div>'
                );
                $('.adx-tab[label]').wrapAll(tabContainer);

                // Mark as Constructed
                $(this).attr('tabs', adTabSize);
                $(this).attr('_adconstructed', true);
            });
    }

    wrapper.on(
        'click',
        '.adx-tab-group > .adx-head li',
        function () {
            // console.log('tab clicked', $(this).width());
            slideTab(
                $(this).parents('.adx-tab-group'),
                $(this).attr('tabIndex'),
                1
            );
            // $this.parents('.adx-tab-group, adx-tab-group').find('.adx-head li').removeClass('active');
            // $this.addClass('active');
            // $this.parents('.adx-tab-group, adx-tab-group').find('.adx-tab.adx-show, adx-tab.adx-show').removeClass('adx-show');

            // // check Matching adx-tab label

            $(this)
                .siblings()
                .removeClass('active');
            $(this).addClass('active');
            // $(this)
            //     .parent()
            //     .siblings('span.tab-line')
            //     .css({
            //         width: $(this).width() + 32 + 'px',
            //         'margin-left': $(this).attr('tabIndex') * ($(this).width() + 32) + 'px'
            //     });
        }
    );

    function slideTab(tab, index, direction) {
        // console.log('slide function activated', (-100 * parseInt(index)));
        tab.find('.adx-body').css('margin-left', -100 * parseInt(index) + '%');
    }

    //adx-cardView Toggle

    wrapper.on('click', '.adx-cardView .adx-data', function (e) {
        $(this)
            .find('.adx-front')
            .toggleClass('adx-slideUp');
    });

    //Dropdown
    wrapper.on(
        'click',
        '.adx-dropdown .adx-trigger',
        function (e) {
            e.stopPropagation();
            $('.adx-dropdown .adx-content').removeClass(
                'adx-show'
            );
            $(this)
                .parent('.adx-dropdown, adx-dropdown')
                .find('.adx-content, adx-content')
                .addClass('adx-show');
        }
    );

    wrapper.on(
        'click',
        '.adx-dropdown .adx-content',
        function (e) {
            e.stopPropagation();
        }
    );

    // disable dropdown at body's click
    wrapper.click(function () {
        $('.adx-dropdown .adx-content').removeClass(
            'adx-show'
        );
    });
});