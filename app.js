const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { // multiple entries (sections) used so for loop needed.
        console.log(entry); 
        if (entry.isIntersecting) { // element is visible
            entry.target.classList.add('opacity-100');
            entry.target.classList.add('translate-x-0');
        } else { // element is not visible
            entry.target.classList.remove('opacity-100');
            entry.target.classList.remove('translate-x-0');
        }
    }); 
});

const elementToDrag = document.querySelector('.fixed');
function dragElement() {
    const totalWidth = 1085;
    const scrollPosition = parseInt(window.scrollY);
    
    // Draggin
    const dragPerc = parseInt((scrollPosition / totalWidth) * 100);
    elementToDrag.style.top = + String(dragPerc) + '%';
    
    // Rotation
    const nRotations = Math.floor(scrollPosition/100);
    const rotationAngle = 180*nRotations + 'deg';
    elementToDrag.style.transform = `rotate(${rotationAngle})`;
}

// Shifting in a cool way.
const hiddenElements = document.querySelectorAll('.-translate-x-96'); // 2 elements to hide
hiddenElements.forEach((el) => {observer.observe(el)});
// Yeyy rotating
window.addEventListener('scroll', dragElement);


// Character
var character = document.querySelector(".character");
var map = document.querySelector(".map");

// State of character
var x = 0;
var y = 0;
var held_directions = []; // State of which arrow keys we are holding down
var speed = 4; // How fast the char. moves
const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
};

const placeCharacter = () => {
    var pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')
    );

    const held_direction = held_directions[0];
    if (held_direction) {
        if (held_direction == directions.right) {x += speed;}
        if (held_direction == directions.left) {x -= speed;}
        if (held_direction == directions.down) {y += speed;}
        if (held_direction == directions.up) {y -= speed;}
        character.setAttribute("facing", held_direction);
    }
    character.setAttribute("walking", held_direction ? "true": "false");

    character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0)`;
}

// Set up the game loop
const step = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {
        step();
    })
}
step();

const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right,
    40: directions.down,
};

document.addEventListener("keydown", (e) => {
    var dir = keys[e.which];
    if (dir && held_directions.indexOf(dir) === -1) {
       held_directions.unshift(dir)
    }
 })
 
 document.addEventListener("keyup", (e) => {
    var dir = keys[e.which];
    var index = held_directions.indexOf(dir);
    if (index > -1) {
       held_directions.splice(index, 1)
    }
 });