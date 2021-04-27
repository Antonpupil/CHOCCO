const sections = $('section');
const display = $('.maincontent');
let inScroll = false;

sections.first().addClass('active');

const performTransition = sectionEq => {
    if (inScroll == false) {
        inScroll = true;
        const position = sectionEq * -100;

        display.css({
            transform: `translateY(${position}%)`
        });

        sections.eq(seectionEq).addClass('active').siblings().removeClass('active');

        setTimeout(() => {
            inScroll = false;
        }, 1300);
    }
};

const scrollViewport = direction => {
    const activeSection = sections.filter('active');
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

$(window).on('keydown', e =>{
    /* console.log(e.keyCode); */

    const tagName = e.target.tagName.toLowerCase();

    if(tagName != 'input' && tagName != 'textarea'){
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