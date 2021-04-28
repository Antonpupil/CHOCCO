const sections = $('section');
const display = $('.maincontent');
let inScroll = false;
const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

sections.first().addClass('active');

const performTransition = sectionEq => {
    if (inScroll == false) {
        inScroll = true;
        const position = sectionEq * -100;

        const currentSection = sections.eq(sectionEq);
        const menyTheme = currentSection.attr('data-swither-theme');
        const sideMenu = $('.fixed-menu');

        if (menyTheme == 'black') {
            sideMenu.addClass('fixed-menu_shadowed');
        } else {
            sideMenu.removeClass('fixed-menu_shadowed');
        }

        display.css({
            transform: `translateY(${position}%)`
        });

        sections.eq(sectionEq).addClass('active').siblings().removeClass('active');


        setTimeout(() => {
            inScroll = false;
            sideMenu
                .find('.fixed-menu__item')
                .eq(sectionEq)
                .addClass('fixed-menu__item_active')
                .siblings()
                .removeClass('fixed-menu__item_active');
        }, 1);
    }
};

const scrollViewport = direction => {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();


    if (direction == "next" && nextSection.length) {
        performTransition(nextSection.index());
    }
    if (direction == "prev" && prevSection.length) {
        performTransition(prevSection.index());
    }

};

$(window).on('wheel', e => {
    /* console.log(e); */

    const deltaY = e.originalEvent.deltaY;

    console.log('wheeeel!');

    if (deltaY > 0) {
        /* performTransition(2); */
        scrollViewport('next');
    };
    if (deltaY < 0) {
        scrollViewport('prev');
    };

    console.log(deltaY);
});

$(window).on('keydown', e => {
    /* console.log(e.keyCode); */

    const tagName = e.target.tagName.toLowerCase();

    if (tagName != 'input' && tagName != 'textarea') {
        switch (e.leyCode) {
            case 38:
                scrollViewport('prev');
                break;
            case 40:
                scrollViewport('next');
                break;
        }
    }
});

$('wrapper').on('touchmove', e => e.preventDefault());

$('[data-scroll-to]').click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-scroll-to');
    const reqSection = $(`[data-section-id=${target}]`);

    console.log(reqSection.index());
});

if (isMobile) {
    $("body").swipe({
        swipe: function (event, direction) {
            const scroller = viewportScroller();
            let scrollDirection = '';

            if (direction == 'up') scrollDirection = 'next';
            if (direction == 'down') scrollDirection = 'prev';

            scroller[scrollDirection]();
            /* alert(direction); */
        },
    });
}

