const homeSection = document.querySelector("#home");
const myCoursesSection = document.querySelector('#MyCourses');
const createCourseSection = document.querySelector('#create-course');
const earningSection = document.querySelector('#earnings');
const profileSection = document.querySelector('#update-profile');

sections = [homeSection, myCoursesSection, createCourseSection, earningSection, profileSection]
let activePage = localStorage.getItem('activePage');
console.log(activePage)
updatePage()

function showSection(params) {
    if (params === 'home') {
        addHider();
        activePage = localStorage.setItem('activePage', params);
        homeSection.classList.remove('hider');
    }
    if (params === 'my courses') {
        addHider();
        activePage = localStorage.setItem('activePage', params)
        myCoursesSection.classList.remove('hider');
    }
    if (params === 'create courses') {
        addHider();
        activePage = localStorage.setItem('activePage', params);
        createCourseSection.classList.remove('hider');
    }
    if (params === 'earnings') {
        addHider();
        activePage = localStorage.setItem('activePage', params);
        earningSection.classList.remove('hider');
    }
    if (params === 'profile update') {
        addHider();
        activePage = localStorage.setItem('activePage', params);
        profileSection.classList.remove('hider');
    }
}

function addHider() {
    for (let i = 0; i < sections.length; i++) {
        const element = sections[i];
        element.classList.add('hider');
    }
}

function updatePage() {
    if (activePage === 'home') {
        addHider();
        homeSection.classList.remove('hider');
        console.log('updated page to ' + activePage)
    }
    if (activePage === 'my courses') {
        addHider();
        myCoursesSection.classList.remove('hider');
        console.log('updated page to ' + activePage)
    }
    if (activePage === 'create courses') {
        addHider();
        createCourseSection.classList.remove('hider');
        console.log('updated page to ' + activePage)
    }
    if (activePage === 'earnings') {
        addHider();
        earningSection.classList.remove('hider');
        console.log('updated page to ' + activePage)
    }
    if (activePage === 'profile update') {
        addHider();
        profileSection.classList.remove('hider');
        console.log('updated page to ' + activePage)
    }

}