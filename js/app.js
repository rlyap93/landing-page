/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/



/**
 * Define Global Variables
 * 
*/

const navMainList = document.getElementById("navbar__list");
const pageSections = document.getElementsByTagName("section");
const navList = document.querySelectorAll('h2');
let prevScrollpos = window.pageYOffset;

/**
 * End Global Variables
 * Start Functions
 * 
*/

// Check if an area in is viewport
function isInViewport(area){
    const rect = area.getBoundingClientRect();
    if (rect.top>= 0 && rect.top <= 200) {
        return true;
    }
    else{
        return false;
    }
    
}

// Function to return which section is in active viewport
function sectionInViewport(pageSections){
    let result = null;
    for(let section of pageSections){
        if(isInViewport(section)){
            result = section;
        }
    }
    return result;
}

// Function that hides navbar when scrolling down
function hideNavBar(){
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        showHeader();
    } else {
        collapseHeader();
    }
    prevScrollpos = currentScrollPos;
}

// Function to highlight current active section and its corresponding nav item
function setActiveClass(section){
    // Section will be highlighted
    const currentActiveSection = document.querySelector('.your-active-class');
    currentActiveSection.classList.remove("your-active-class");
    section.classList.add("your-active-class");

    // Navigation bar will be hightlighted   
    removeActiveNav();
    document.querySelector(`#${section.querySelector("h2").innerText.replace(' ', '').toLowerCase()}Nav`).classList.add("active__nav");
}

function showHeader(){
    document.getElementsByTagName("header")[0].setAttribute('style', 'top: 0');
}

function collapseHeader(){
    document.getElementsByTagName("header")[0].setAttribute('style', 'top: -65px;');
}

function removeActiveNav(){
    let activeNav = document.querySelector(".active__nav");
    if (activeNav != null){
        activeNav.classList.remove("active__nav");
    }
}


/**
 * Functions
 * Begin Events
 * 
*/

// build the nav
for(let i of navList){
    let navListItem = document.createElement('li');
    navListItem.textContent = i.innerText;
    navListItem.classList.add("menu__link");
    navListItem.id = `${navListItem.innerText.replace(' ', '').toLowerCase()}Nav`;
    navMainList.appendChild(navListItem);
};

// Scroll to section on link click
document.addEventListener('click', function(event){
    if (event.target.tagName.toLowerCase() == 'li'){
        document.getElementById(event.target.innerText.replace(' ', '').toLowerCase()).scrollIntoView({behavior: 'smooth'});
    }
});


// Set sections as active
window.addEventListener('scroll', function(event){
    // Highlight active section and navbar
    if(isInViewport(document.querySelector("h1"))){
        removeActiveNav();
    }
    let currentSection = sectionInViewport(pageSections);
    if(currentSection != null){
        setActiveClass(currentSection);
    };

    // Hide nav bar while scrolling down
    hideNavBar();
});

// To show header when mouse is at the top of the screen
window.addEventListener('mousemove', function(event){
    if (event.clientY < 10){
        showHeader();
    }
});
