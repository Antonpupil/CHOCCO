(function () {
    const orderForm = document.querySelector("#order-form");
    const send = document.querySelector(".form__submit");
    const phone = document.querySelector("#phone-number");
    console.log(orderForm);
    console.log(send);

    phone.addEventListener("keydown", (e) => {
        try {
            console.log(e.key);
            let isDidgit = false;
            let isPlus = false;
            let isDash = false;
            let isAction = false;

            if (e.key >= 0 || e.key <= 9) {
                isDidgit = true;
            };
            if (e.key == "+") {
                isPlus = true;
            };
            if (e.key == "-") {
                isDash = true;
            };
            if (e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "Backspace") {
                isAction = true;
            };

            if (!isDidgit && !isPlus && !isAction && !isDash) {
                e.preventDefault();
                throw new Error("Вводить можно только числа, +, -")
            }
            e.target.nextElementSibling.textContent = "";
        } catch (error) {
            e.target.nextElementSibling.textContent = error.message;
            e.preventDefault();
        };

    });

    send.addEventListener("click", (e) => {
        e.preventDefault();
        let isValid = validateForm(orderForm);
        if(!isValid){
            return;
        }
    });

    function validateForm(orderForm) {
        console.log(orderForm);
        let valid = true;

        if (!validate(orderForm.elements.name)) {
            valid = false;
        }
        if (!validate(orderForm.elements.phone)) {
            valid = false;
        }
        if (!validate(orderForm.elements.comment)) {
            valid = false;
        }
        return valid;
    };

    function validate(element) {
        let validationMessage = "Введите значение";
        if (!element.value.length) {
            element.nextElementSibling.textContent = validationMessage;
            element.style.border = "1px solid red";
            return false;
        } else {
            element.nextElementSibling.textContent = "";
            element.style.border = "none";
            return true;
        }
    };
})();