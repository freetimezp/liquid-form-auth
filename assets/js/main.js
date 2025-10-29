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

// const users = {
//     1234567890: {
//         password: "pass123",
//         workdays: [1, 2, 3, 4, 5], // Monday–Friday
//     },
//     9876543210: {
//         password: "qwerty",
//         workdays: [2, 4, 6], // Tue, Thu, Sat
//     },
// };

// const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.

// loginForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     errorMsg.textContent = "";

//     const inn = innInput.value.trim();
//     const pass = passInput.value.trim();

//     if (!/^\d{10}$/.test(inn)) {
//         errorMsg.textContent = "ІНН має містити лише 10 цифр!";
//         return;
//     }

//     const user = users[inn];

//     if (!user) {
//         errorMsg.textContent = "Користувача з таким ІНН не знайдено!";
//         return;
//     }

//     // Step 2: check workday
//     if (!user.workdays.includes(today)) {
//         errorMsg.textContent = "Сьогодні не ваш робочий день!";
//         return;
//     }

//     // Step 3: show password input
//     if (passGroup.classList.contains("hidden")) {
//         passGroup.classList.remove("hidden");
//         gsap.fromTo(passGroup, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6 });
//         errorMsg.textContent = "Введіть пароль для входу";
//         return;
//     }

//     // Step 4: password check
//     if (pass !== user.password) {
//         errorMsg.textContent = "Невірний пароль!";
//         return;
//     }

//     // Step 5: success → hide form, show app
//     gsap.to(authContainer, {
//         opacity: 0,
//         duration: 1,
//         onComplete: () => {
//             authContainer.classList.add("hidden");
//             appContent.classList.remove("hidden");
//             gsap.fromTo(appContent, { opacity: 0 }, { opacity: 1, duration: 1 });
//         },
//     });
// });
