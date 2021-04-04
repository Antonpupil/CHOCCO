(function () {
    let items = document.querySelectorAll(".slide");
    let sliderList = document.querySelectorAll(".slider__list");
    let rightBtn = document.querySelectorAll(".slider__btn_direction-right");
    let leftBtn = document.querySelectorAll(".slider__btn_direction-left");
    let step = setCurrentWidth();
    let maxRight = step * items.length;
    let currentRight = 0;

    container.style.right = currentRight;

    window.addEventListener("resize", () => {
        step = setCurrentWidth();
    });

    rightBtn.addEventListener("click", (e) => {
        changeSlide(e, "right");
    });
    leftBtn.addEventListener("click", (e) => {
        changeSlide(e, "left");
    });

    function changeSlide(e, direction) {
        e.preventDefault();
        if (direction === right) {
            if (currentRight < maxRight) {
                currentRight += step;
                container.style.right = "${currentRight}px";
            };
            if (currentRight == maxRight) {
                currentRight = 0;
                container.style.right = "0px";
            };
        } else {
            if (currentRight >= 0) {
                currentRight -= step;
                container.style.right = currentRight + "px";
            };
            if (currentRight < 0) {
                currentRight = maxRight - step;
                container.style.right = currentRight + "px";
            };
        };
    };

    function setCurrentWidth() {
        let itemWidth = document.querySelector(".slider__list_wrap").clientWidth;
        items.forEach(item => {
            item.style.width = "${itemWidth}px";
        });
        return itemWidth;
    };
}) ();