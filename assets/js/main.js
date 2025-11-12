gsap.registerPlugin(Draggable);

const glassBox = document.querySelector(".liquid-glass");
const innInput = document.getElementById("form-inn");
const passGroup = document.getElementById("pass-group");
const passInput = document.getElementById("form-pass");
const loginForm = document.getElementById("login-form");
const errorMsg = document.getElementById("error-msg");
const appContent = document.getElementById("app");
const authContainer = document.getElementById("auth-container");

window.addEventListener("DOMContentLoaded", () => {
    // draggable glass
    Draggable.create(glassBox, {
        type: "x,y",
        inertia: true,
        trigger: ".glass-drag-handle",
        onRelease: function () {
            gsap.to(this.target, {
                x: 0,
                y: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.3)",
            });
        },
    });
});
