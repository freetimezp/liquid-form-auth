// auth.js
class AuthForm {
    constructor(selector, options = {}) {
        this.container = document.querySelector(selector);
        this.onSuccess = options.onSuccess || (() => {});
        this.users = options.users || {};
        this.init();
    }

    init() {
        this.form = this.container.querySelector("form");
        this.innInput = this.form.querySelector("[data-inn]");
        this.passInput = this.form.querySelector("[data-pass]");
        this.passGroup = this.form.querySelector("[data-pass-group]");
        this.error = this.form.querySelector("[data-error]");

        this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        const inn = this.innInput.value.trim();
        const pass = this.passInput.value.trim();

        // Validate INN
        if (!/^\d{10}$/.test(inn)) {
            return this.showError("ІНН має містити лише 10 цифр!");
        }

        const user = this.users[inn];
        const today = new Date().getDay();

        if (!user) return this.showError("Користувача не знайдено!");
        if (!user.workdays.includes(today)) return this.showError("Сьогодні не ваш робочий день!");

        // Step 2: Show password input
        if (this.passGroup.classList.contains("hidden")) {
            this.passGroup.classList.remove("hidden");
            this.showError("Введіть пароль для входу");
            return;
        }

        // Step 3: Check password
        if (pass !== user.password) return this.showError("Невірний пароль!");

        // Step 4: Success
        this.onSuccess(user);
    }

    showError(msg) {
        this.error.textContent = msg;
    }
}
