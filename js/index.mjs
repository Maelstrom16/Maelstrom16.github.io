//import { loadShaders } from "./webgl.mjs"; // Might try implementing WebGL later
import * as CanvasElement from "./canvaselement.mjs";

// Variables
var canvas;
var ctx;
var objects = []

var prevMouseX = 0;
var prevMouseY = 0;
var mouseX = 0;
var mouseY = 0;

var prevRadius = 5;
var prevWord = "creative"

// Execute on startup
window.onload = function(){
    // Link events
    document.addEventListener("keydown", handleKeyboardInput)

    // Get canvas and resize
    canvas = document.getElementById("canvas");
    canvas.addEventListener("mousemove", mouseover)
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas)

    // Get context for drawing
    ctx = canvas.getContext("2d");

    // Set heartbeat function
    setInterval(heartbeat, 10);

    //loadShaders(canvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function handleKeyboardInput (event) {
    const key = event.key; // The actual key that was pressed

    if (key.match(/^[a-z]$/)) // Key is a letter
        getWord(key);
    else
        handleQuirk(key);
}

async function getWord(startLetter) {
    const defaultWords = {
        "a": "application",
        "b": "binary",
        "c": "calculus",
        "d": "derivative",
        "e": "electricity",
        "f": "function",
        "g": "googolplex",
        "h": "hexadecimal",
        "i": "internet",
        "j": "javascript",
        "k": "kernel",
        "l": "logic",
        "m": "machine",
        "n": "network",
        "o": "orthogonal",
        "p": "perceptron",
        "q": "query",
        "r": "regression",
        "s": "software",
        "t": "turing",
        "u": "unicode",
        "v": "variable",
        "w": "wii",
        "x": "xbox",
        "y": "yottabyte",
        "z": "zip",
    }

    // Query for a word that starts
    let query = "https://api.datamuse.com/words?max=5&topics=computers,video_games,calculus,mathematics,physics&sp=" + startLetter + "*"
    let relation = "&rel_trg=" + prevWord;
    let response = await fetch(query+relation);
    let data = await response.json();

    // Update the previous word with the closest match
    if (data?.length > 0) {
        prevWord = (data[0].word);
    } 
    // Or, if there were no results, use a default word
    else {
        prevWord = defaultWords[startLetter];
    }

    objects.push(new CanvasElement.FloatingText(prevWord));
}

function handleQuirk(num) {
    // Soon. ;)
}

function heartbeat() {
    const movementRatio = 0.05;
    var movementMagnitude = Math.abs(mouseX - prevMouseX) + Math.abs(mouseY - prevMouseY);
    var movementRadius = (movementRatio * (movementMagnitude+5)) + ((1-movementRatio) * prevRadius);
    var movementAlpha = Math.min(1, (movementRadius-5)/100)

    objects.push(new CanvasElement.Ripple(mouseX, mouseY, movementRadius, movementAlpha));
    draw();
    update();

    prevRadius = movementRadius;
    prevMouseX = mouseX;
    prevMouseY = mouseY;
}

function draw() {
    ctx.reset();
    for (const object of objects) {
        object.draw(ctx);
    }
}

function update() {
    for (const object of objects) {
        object.update(objects);
    }
}

function mouseover(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}