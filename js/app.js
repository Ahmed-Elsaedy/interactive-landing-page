/**** GLOBAL VARIABLES ****/
let sections = document.querySelectorAll("section");
let navbarList = document.getElementById("navbar__list");
let activeSection = document.querySelector("section.your-active-class");
let activeLink = null;


/**** HELPER FUNCTION ****/

/* Function that gets how much an element is offset from window top edge */
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
    };
}

/* Function that uses the id to scroll to the specified element smoothly */
function scrollToSection(id) {
    const section = document.getElementById(id);
    window.scrollTo({
        top: getOffset(section).top,
        behavior: "smooth",
    });
}


/**** MAIN FUNCTINOS ****/

/* BUILD NAVIGATION MENU BY QUERING THE SECTION ELEMENTS ON THE PAGE */
function buildNavigation() {
    let navDocumentFragment = document.createDocumentFragment();
    for (const section of sections) {
        const name = section.getAttribute("data-nav");
        const navLink = document.createElement("li");
        navLink.classList.add("menu__link");
        navLink.setAttribute("data-section-id", section.id);
        navLink.textContent = name;
        navDocumentFragment.appendChild(navLink);
    }
    navbarList.appendChild(navDocumentFragment);
}

function setActiveSection(section) {
    if (activeSection != null && section.id === activeSection.id) return;

    if (activeSection != null) {
        activeSection.classList.remove("your-active-class");
    }

    if (activeLink != null) {
        activeLink.classList.remove("active");
    }

    activeSection = section;
    section.classList.add("your-active-class");

    activeLink = navbarList.querySelector(`li[data-section-id="${section.id}"]`);
    activeLink.classList.add("active");
}



/**** HANDLING EVENTS ****/

/* HANDLE DOM CONTENT LOADED EVENT */
document.addEventListener("DOMContentLoaded", function() {
    buildNavigation();
    scrollToSection(activeSection.id);
});

/* HANDLE CLICK EVENT OF THE NAV LINK TO SCROLL THE SECTION */
navbarList.addEventListener("click", function(e) {
    if (isLiItem = e.target.nodeName === "LI") {
        var sectionId = e.target.getAttribute("data-section-id");
        scrollToSection(sectionId);
    }
});

/* HANDLE SCROLL EVENT TO UPDATE THE ACTIVATED SECTION */
document.addEventListener("scroll", function() {
    for (const section of sections) {
        var offset = getOffset(section);
        if (
            window.scrollY > offset.top - 200 &&
            window.scrollY < offset.top + 200
        ) {
            setActiveSection(section);
            return;
        }
    }

    /* IF THERE IS NO ACTIVE SECTION (TOP OF PAGE OR IN BETWEEN TWO SECTIONS)  */
    if (activeSection != null) {
        activeSection.classList.remove("your-active-class");
        activeSection = null;
    }

    if (activeLink != null) {
        activeLink.classList.remove("active");
        activeLink = null;
    }

});