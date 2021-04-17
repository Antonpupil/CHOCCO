const validateFields = (form, fieldsArray) => {
    fieldsArray.forEach(field => {
        field.removeClass('form__input_error');
        if (field.val().trim() === "") {
            field.addClass("form__input_error");
        }
    });

    const errorFields = form.find('.form__input_error');

    return errorFields.length === 0;
}

$("#order-form").submit(e => {
    e.preventDefault();
    const form = $(e.currentTarget);
    const name = form.find("[name='name'");
    const phone = form.find("[name='phone'");
    const comment = form.find("[name='comment'");
    const to = form.find("[name='to'");

    const modal = $("#modal");
    const content = modal.find(".modal__content");

    modal.removeClass("error-modal");


    const isValid = validateFields(form, [name, phone, comment, to]);

    /* [name, phone, comment, to].forEach(field => {
        field.removeClass('form__input_error');
        if (field.val().trim() === "") {
            field.addClass("form__input_error");
        }
    }); */

    /* const errorFields = form.find('.form__input_error'); */

    if (/* errorFields.length === 0 */ isValid) {
        const request = $.ajax({
            URL: "https://webdev-api.loftschool.com/sendmail",
            method: "POST",
            data: {
                comment: comment.val(),
                name: name.val(),
                phone: phone.val(),
                to: to.val()
            },
            /* success: data => {
                console.log(data);
                content.text(data.message);
                $.fancybox.open({
                    src: "#modal",
                    type: "inline"
                })
            }, */
            /* error: data =>{
                const message = data.responseJSON.message;
                content.text(message);
                console.log(data);
                modal.addClass("error-modal");
                $.fancybox.open({
                    src: "#modal",
                    type: "inline"
                })
            } */
        });

        request.done((data) =>{
            content.text(data.message);
        });

        request.fail((data) =>{
            const message = data.responseJSON.message;
            content.text(message);
            console.log(data);
            modal.addClass("error-modal");
        });

        request.always((data) =>{
            $.fancybox.open({
                src: "#modal",
                type: "inline"
            });
        });
    }
});

$('.app-submit-btn').click(e => {
    e.preventDefault();

    $.fancybox.close();
});