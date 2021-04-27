const Btn = document.querySelector('.burger');
const popup = document.querySelector('.fullscreen-menu');
const body = document.querySelector('body');
const closeBtn = document.querySelector('.fullscreen-menu__close');

Btn.addEventListener('click', e=>{
    e.preventDefault();
    popup.classList.add('fullscreen-menu_active');
});

popup.addEventListener('click', (e) =>{
    const target = e.target;
    const dataValue = target.dataset.scrollTo;
    console.log(dataValue);
    if(target.classList.contains('fullscreen-menu__close')){
        popup.classList.remove('fullscreen-menu_active');
    } else if (target.classList.contains('menu__link')){
        scrollToSection(dataValue);
        popup.classList.remove('fullscreen-menu_active');
        }
});

const scrollToSection = (attr)=>{
    const elem = document.querySelector(`[data-section-id=${attr}]`);
    window.scroll({
        left:0,
        top:elem.offsetTop,
        behavior: 'smooth'
    })
}

/* не рабочий вариант
const toggleMenu = () =>{
    popup.classList.toggle('fullscreen-menu_active');
}

Btn.addEventListener('click', toggleMenu);

popup.addEventListener('click', (e) =>{
    const target = e.target;
    if(target.classList.contains('fullscreen-menu__close')){
        toggleMenu();
    }
}); */