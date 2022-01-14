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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

const navBar= document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
var sectIsActive = false;
var inClick = false;
var activeSect = " ";


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Set sections as active

function makeActive(el) {

    el.classList.add('section-active');

    let activeLink = document.getElementsByClassName(activeSect) [0]; 
    activeLink.classList.add('active');

    sectIsActive = true;

 }

function removeActive() {

    let activeLink = document.getElementsByClassName(activeSect) [0]; 
    activeLink.classList.remove('active');       

    const activeEl = document.getElementById(activeSect);
    activeEl.classList.remove('section-active');

 }

function respondToClick(event) {

    inClick = true;

    event.preventDefault();

    let el = document.getElementById(event.target.classList [0]);

    if (sectIsActive) {
        removeActive();
    }

    activeSect = event.target.classList [0];

    makeActive(el);

    el.scrollIntoView({behavior: "smooth"});

    inClick = false;

 }

//https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433

function isElementInViewport (section) {

    var rect = section.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function respondToScroll(event) {

    if (inClick) {
        return;
    }

    // https://knowledge.udacity.com/questions/85408

    for (let section of sections) {

        if (isElementInViewport(section)) {
            if (section.id !== activeSect) {
                if (sectIsActive) {
                    removeActive();
                }
                activeSect = section.id;
                makeActive(section);
            }
        }
    }

 }

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildNavBar() {

    //https://knowledge.udacity.com/questions/457900

    // loop over all of your sections
    for (let section of sections) {
        // create the <li> element
        let navItem = document.createElement('li');
        // create the <a> element
        let navItemLink = document.createElement('a');
        navItemLink.className = section.id + ' menu__link';
        // use the section data-nav to set the navItem title
        navItemLink.textContent = section.dataset.nav;
        // append the link to the navItem
        navItem.appendChild(navItemLink);
        // append the link to the navbar
        navBar.appendChild(navItem);
    }
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu

buildNavBar();

// Scroll to section on link click

navBar.addEventListener('click', respondToClick);

window.addEventListener('scroll', respondToScroll);


