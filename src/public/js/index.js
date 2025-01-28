// on scroll down add dark navbar to #navbar
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar')
    if (window.scrollY > 0) {
        navbar.classList.add('bg-green-nav-shadow')
        navbar.classList.add('fadeInDown')
    } else {
        navbar.classList.remove('bg-green-nav-shadow')
        navbar.classList.remove('fadeInDown')
    }
})