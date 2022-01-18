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

// Set sections as active.  Highlights both the selected navagation link 
// and the selected section in the body.

function makeActive(el) {

    el.classList.add('section-active');

    let activeLink = document.getElementsByClassName(activeSect) [0]; 
    activeLink.classList.add('active');

    sectIsActive = true;

 }

 // Remove active classes from the previously selected navaigation link
 // and also from the previously selection in the body.

function removeActive() {

    let activeLink = document.getElementsByClassName(activeSect) [0]; 
    activeLink.classList.remove('active');       

    const activeEl = document.getElementById(activeSect);
    activeEl.classList.remove('section-active');

 }

 // Scroll to anchor ID using scrollIntoView event.  Also, call functions to add active classes to the navigation link
 // and the selected sections in the body. 

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

//https://knowledge.udacity.com/questions/85408

function isElementInViewport(section) {

    var rect = section.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.top <= 150 &&
        rect.bottom >= 150
    );
}

// When the selected section is in the viewport, add active classes to both the 
// selected navigation link and selected section in the body.

function respondToScroll(event) {

// Bypass if triggered by the respondToClick scrollIntoView method    

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

// Dynamically create the navigation elements

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
        navItemLink.innerHTML = section.dataset.nav;
        // append the link to the navItem
        navItem.append(navItemLink);
        // append the link to the navbar
        navBar.appendChild(navItem);
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu

buildNavBar();

// Scroll to section on link click

navBar.addEventListener('click', respondToClick);

// Respond to Scroll Events

window.addEventListener('scroll', respondToScroll);

window.addEventListener('touchmove', respondToScroll);

