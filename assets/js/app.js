

/**** TypeWriter Animation  ***/


class TypeWriter{

    constructor(txtElement, words, wait = 3000){

        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.IsDeleting = false;

    }

    type(){
                // Current Index of word
        const current = this.wordIndex % this.words.length;

        // Get Full text of current word
        const fulltxt = this.words[current];

        // Check if deleting
        if(this.isDeleting){
            // Remove char
            this.txt = fulltxt.substring(0, this.txt.length - 1);
        }else{
            // Add char
            this.txt = fulltxt.substring(0, this.txt.length + 1);
        }
        
        //Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // initial Type Speed   
        let typeSpeed = 200;

        if(this.IsDeleting){

            typeSpeed /= 2;
        }

        // if word is complete

        if(!this.isDeleting && this.txt === fulltxt){
            //Make pause at end
            typeSpeed = this.wait;

            // Set delete  to true
            this.isDeleting = true;

        }else if (this.isDeleting && this.txt === ''){
            
            this.isDeleting = false;

            // move to next word
            this.wordIndex++;

            //pause before start typing
            typeSpeed = 200;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}


// Inicia con dom load

document.addEventListener('DOMContentLoaded', init);

function init(){

    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait);
}

//Scroll animation 

function smoothScroll(targett, duration){

    let target = document.querySelector(targett);
    let targetPosition = target.getBoundingClientRect().top + window.scrollY;
    let startPosition = window.pageYOffset;
    let distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime){
        if(startTime === null) startTime = currentTime;

        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);

        if(timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d){
        t /= d / 2;
        if ( t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    

    requestAnimationFrame(animation);
}


// LLamada animation scroll 

let links_a = document.querySelectorAll('.navbar-item');
let links = Array.from(links_a);

let arrow = document.getElementById('arrow');

arrow.addEventListener('click', scrollAnimation);

links.forEach( item => {
    item.addEventListener('click', scrollAnimation);
})

function scrollAnimation(e){
    e.preventDefault();    

    links.forEach(items => {

        items.classList.remove('is-active');
    })

    this.classList.add('is-active');
    let nameSec = this.getAttribute('data-name');
    nameSec = `.${nameSec}`;

    smoothScroll(nameSec, 1400);
}


/********************************* */
//  Scroll nav active animation 
//
//****************************** */

const sections = document.querySelectorAll('section');
const nav_a = document.querySelectorAll('.navbar-end a');

window.addEventListener('scroll', () => {

    let current = '';

    sections.forEach( section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if(pageYOffset >= (sectionTop - sectionHeight / 3)){

            current = section.getAttribute('id');
        }
        
    })


    nav_a.forEach( a => {
        a.classList.remove('is-active');
        let sec = a.getAttribute('data-sec');

        if( sec == current){
            a.classList.add('is-active');
        }

    })
})




//Modal

let classModal = document.getElementsByClassName('btnModal');
let btnModals = Array.from(classModal);
let cerrar = document.getElementsByClassName('cerrar');
let close = Array.from(cerrar);
let modal = document.getElementsByClassName('modal')[0];
let modalTitle = document.getElementById('modalTitle');

//Eventos para cerrar el modal
window.onclick = function(e){

    if(e.target.className === 'modal-background'){
        cerrarModal();
    }
}

//botones de cerrar

close.forEach( item => {
    item.addEventListener('click', cerrarModal);
});

//Array de botones

btnModals.forEach( item => {
    item.addEventListener('click', abrirModal);
});

function abrirModal(e){
    e.preventDefault();

    let textImagen = this.parentNode.childNodes[1].innerText;
    modalTitle.innerHTML = textImagen;
    let dataId = this.getAttribute('data-id');

    if(dataId == 1){
        let p = document.getElementById('p1');
        p.classList.remove('proyectoHide');
    }
    else if(dataId == 2){
        let p = document.getElementById('p2');
        p.classList.remove('proyectoHide');
    }
    else if (dataId == 3){
        let p = document.getElementById('p3');
        p.classList.remove('proyectoHide');
    }
    else if (dataId == 4){
        let p = document.getElementById('p4');
        p.classList.remove('proyectoHide');
    }
    
    modal.classList.toggle('is-active');
}

function cerrarModal(){

    let p = document.getElementsByClassName('proyecto');
    let proyects = Array.from(p);

    proyects.forEach( item => {
        item.classList.add('proyectoHide');
    });

    modal.classList.toggle('is-active');
}


// MENUUUUUUUU RESPONSIVE

let burguer = document.getElementById('burguerNav');
let menu = document.getElementById('navbarMenuHeroB');

burguer.addEventListener('click', () => {

    menu.classList.toggle('is-active');
})