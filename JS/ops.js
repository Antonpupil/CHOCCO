const sections = $('section');
const display = $('.maincontent');

let inScroll = false;
const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();
const sideMenu = $('.fixed-menu');
const menuItem = sideMenu.find('.fixed-menu__item');

sections.first().addClass('active');

const countsectionPosition = sectionEq => {
    const position = sectionEq * -100;

    if (isNaN(position)) {
        console.error('передано не верное значение в countsectionPosition')
        return 0;
    };

    return position;
}

const changeMenuThemeForSection = sectionEq => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr('data-sidemenu-theme');
    const activeClass = 'fixed-menu_shadowed';

    if (menuTheme === 'black') {
        sideMenu.addClass(activeClass);
    } else {
        sideMenu.removeClass(activeClass);
    }
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = sectionEq => {
    if (inScroll) return;

    const transitionOver = 1000;
    const mouseTransitionOver = 300;

    inScroll = true;
    const position = countsectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
        transform: `translateY(${position}%)`
    });

    resetActiveClassForItem(sections, sectionEq, 'active');


    setTimeout(() => {
        inScroll = false;
        resetActiveClassForItem(menuItem, sectionEq, 'fixed-menu__item_active');
    }, transitionOver + mouseTransitionOver);
};

const viewportScroller = () => {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                performTransition(nextSection.index());
            }
        },
        prev() {
            if (prevSection.length) {
                performTransition(prevSection.index());
            }
        }
    }
};

$(window).on('wheel', e => {

    const deltaY = e.originalEvent.deltaY;

    const scroller = viewportScroller();

    console.log('wheeeel!');

    if (deltaY > 0) {
        scroller.next();
    };
    if (deltaY < 0) {
        scroller.prev();
    };

    console.log(deltaY);
});

$(window).on('keydown', e => {

    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInput = tagName == 'input' || tagName == 'textarea';
    const scroller = viewportScroller();

    if (userTypingInInput) return;

    switch (e.leyCode) {
        case 38:
            scroller.prev();
            break;
        case 40:
            scroller.next();
            break;
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
        },
    });
}
 