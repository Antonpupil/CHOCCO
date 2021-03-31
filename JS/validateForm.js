(function () {
    const form = document.querySelector("#order-form");
    const send = document.querySelector(".form__submit");

    send.addEventListener("click", (e)=>{
        e.preventDefault();

    });

    function validateForm(form){
        let valid = true;

        if (!validate(form.elements.name)){
            valid = false;
        }
        return valid;
    }

function validate(element){
    if (!element.checkValidity()) {
        element.nextElementSibling.textContent = element.validationMessage;
        element.style.border = "1px solid red";
        return false;
    } else {
        element.nextElementSibling.textContent = "";
        element.style.border = "none";
        return true;
    }
}

}); 