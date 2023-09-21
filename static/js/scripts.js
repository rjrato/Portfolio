let enJson, ptJson;

//element selectors
const elements = {
    lang: ["#lang-pt", "#lang-en"],
    nav: ["#nav-home", "#nav-about", "#nav-skills", "#nav-projects", "#nav-contact"],
    home: ["#home-title", "#home-and", "#home-flip1", "#home-flip2", "#home-flip3", "#home-flip4", "#home-flip5", "#home-flip6", "#home-flip7"],
    about: ["#about-h3", "#about-h2", "#about-p1", "#about-p2", "#about-p3", "#about-cv"],
    skills: ["#skills-h3", "#skills-h2"],
    projects: ["#projects-h3", "#projects-h2", "#project1-p-right", "#btn-project1-view", "#btn-project1-github", "#project2-p-left", "#btn-project2-view", "#btn-project2-github", "#project3-p-right", "#project4-p-left"],
    contact: ["#contact-h2", "#contact-p1", "#contact-p2", "#form-name", "#form-message", "#btn-message"]
}

let el = {};
for(let key in elements) {
    el[key] = elements[key].map(id => document.querySelector(id));
}

function kebabToCamel(s) {
    return s.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

// Language change
fetch('./static/JSON/en.json')
    .then(response => response.json())
    .then(data => {
        enJson = data;
        el.lang[1].addEventListener("click", () => applyJsonValues(enJson, 'english')); // use 'english' directly
    })
    .catch(error => console.error('Error:', error));

fetch('./static/JSON/pt.json')
    .then(response => response.json())
    .then(data => {
        ptJson = data;
        el.lang[0].addEventListener("click", () => applyJsonValues(ptJson, 'portuguese')); // use 'portuguese' directly
    })
    .catch(error => console.error('Error:', error));

// navbar navigation
document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('hamburger').checked = false;
        setTimeout(() => window.location.hash = item.getAttribute('href'), 50);
    });
});

//Footer getYear
document.getElementById("year").textContent = new Date().getFullYear();

// Function to apply the JSON values
function applyJsonValues(jsonData, attr) {
    for(let key in el) {
        el[key].forEach((element, index) => {
            const id = kebabToCamel(elements[key][index].substring(1)); // Get the id by removing the '#'
            if(jsonData[attr][id]) {
                if(id === "aboutCv") { // correct condition check
                    // select the 'a' tag within the 'h3' tag
                    const linkElement = element.querySelector('#about-cv-link');
                    // update the href attribute of the 'a' tag
                    linkElement.setAttribute('href', jsonData[attr]["aboutCvLink"]);
                    // update the text content of the 'a' tag
                    linkElement.innerHTML = `<strong>${jsonData[attr]["aboutCvLinkText"]}</strong>`;
                    // update the text of the 'h3' tag
                    element.childNodes[0].nodeValue = jsonData[attr][id] + " ";
                } else {
                    element.innerHTML = jsonData[attr][id];
                }
                addRequiredClass(element, 'strong', 'about-strong');
                addRequiredClass(element, '.about-resume-a', 'about-resume-a', ".about-resume-a:hover");
            }
        });
    }
    addAsteriskToForms();
}

function addRequiredClass(parentElement, selector, newClass) {
    const elements = parentElement.querySelectorAll(selector);
    elements.forEach(el => el.classList.add(newClass));
}

function addAsteriskToForms() {
    let asterisk = document.createElement('span'); 
    asterisk.textContent = '*'; 
    asterisk.classList.add('required'); 

    el.contact[3].appendChild(asterisk.cloneNode(true)); // for '#form-name'
    el.contact[4].appendChild(asterisk.cloneNode(true)); // for '#form-message'
}