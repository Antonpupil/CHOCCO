const findDlockByAlias = (alias) =>{
    return $('.review__item').filter((ndx, item) =>{
        return $(item).attr("data-linkedWith") === alias;
    });
};

$(".interactive-avatar__link").click(e =>{
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findDlockByAlias(target);
    const curItem = $this.closest('.interactive-avatar');

    itemToShow.addClass('review__item_active').siblings().removeClass('review__item_active');
    curItem.addClass('interactive-avatar__active').siblings().removeClass('interactive-avatar__active');
});