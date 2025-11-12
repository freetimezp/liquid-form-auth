class AuthForm {
    constructor(selector, options = {}) {
        this.container = document.querySelector(selector);
        this.onSuccess = options.onSuccess || (() => {});
        this.users = options.users || {};
        this.init();
    }

    init() {
        this.form = this.container.querySelector("form");
        this.magazineSelect = this.form.querySelector("[data-magazine]");
        this.innInput = this.form.querySelector("[data-inn]");
        this.passInput = this.form.querySelector("[data-pass]");
        this.passGroup = this.form.querySelector("[data-pass-group]");
        this.error = this.form.querySelector("[data-error]");
        this.usernameDisplay = this.form.querySelector("[data-username]");
        this.cashGroup = this.form.querySelector("[data-cash-group]");
        this.cashSelect = this.form.querySelector("[data-cash]");

        this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        const inn = this.innInput.value.trim();
        const magazine = this.magazineSelect.value.trim();
        const pass = this.passInput.value.trim();
        const cash = this.cashSelect.value.trim();
        this.error.textContent = "";

        // Step 1: check store selection
        if (!magazine) return this.showMessage("Оберіть магазин!", "error");

        // Step 2: validate IIN format
        if (!/^\d{10}$/.test(inn)) return this.showMessage("ІНН має містити лише 10 цифр!", "error");

        // --- ✅ CALL PHP CONTROLLER HERE ---
        let user;
        try {
            const response = await fetch("./controllers/check_inn.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inn }),
            });

            const data = await response.json();
            if (data.status === "error") return this.showMessage(data.message, "error");
            user = data.user;
        } catch (err) {
            return this.showMessage("Помилка сервера!", "error");
        }

        // Step 3: check if user belongs to store
        if (!user.magazines.includes(magazine))
            return this.showMessage("У вас немає доступу до цього магазину!", "error");

        // Step 4: check workday
        const today = new Date().getDay();
        if (!user.workdays.includes(today)) return this.showMessage("Сьогодні не ваш робочий день!", "error");

        // Step 5: show password and cash fields
        if (this.passGroup.classList.contains("hidden")) {
            this.passGroup.classList.remove("hidden");
            this.usernameDisplay.textContent = `Вітаємо, ${user.name}!`;
            this.usernameDisplay.classList.remove("hidden");
            this.magazineSelect.disabled = true;
            this.innInput.disabled = true;

            // Populate cash registers
            this.cashSelect.innerHTML = "";
            if (user.cashRegisters.length === 1) {
                const reg = user.cashRegisters[0];
                this.cashSelect.innerHTML = `<option value="${reg}">Каса № ${reg}</option>`;
                this.cashSelect.disabled = true;
            } else {
                this.cashSelect.innerHTML = `<option value="">Оберіть касу</option>`;
                user.cashRegisters.forEach((reg) => {
                    this.cashSelect.innerHTML += `<option value="${reg}">Каса № ${reg}</option>`;
                });
            }
            this.cashGroup.classList.remove("hidden");
            return this.showMessage("Будь ласка, введіть пароль для входу!", "info");
        }

        // Step 6: check password
        if (pass !== user.password) return this.showMessage("Невірний пароль!", "error");

        // Step 7: check cash register
        if (!cash) return this.showMessage("Оберіть касу!", "error");

        // Step 8: success
        this.showMessage("Успішний вхід!", "success");
        setTimeout(() => this.onSuccess(user), 800);
    }

    //функція що покаже повідомлення
    showMessage(msg, type = "error") {
        this.error.textContent = msg;
        this.error.className = "message " + type;
    }
}
