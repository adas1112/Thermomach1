let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let closeOpenBtn = document.querySelector(".nav-links .bx-x");
let navLinks = document.querySelector(".nav-links");

menuOpenBtn.addEventListener("click",()=>{

    navLinks.style.left="0";
});

closeOpenBtn.addEventListener("click",()=>{

    navLinks.style.left="-100%";
});



//sidebarsub menu

let htmlcssArrow =document.querySelector(".htmlcss-arrow");
htmlcssArrow.addEventListener("click",()=>{

    navLinks.classList.toggle("show1");
});


let jsArrow =document.querySelector(".js-arrow");
jsArrow.addEventListener("click",()=>{

    navLinks.classList.toggle("show2");
});