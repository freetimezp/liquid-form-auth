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

    handleSubmit(e) {
        e.preventDefault();
        const inn = this.innInput.value.trim();
        const magazine = this.magazineSelect.value.trim();
        const pass = this.passInput.value.trim();
        const cash = this.cashSelect.value.trim();
        this.error.textContent = "";

        // Step 1: перевірка, чи обран магазин
        if (!magazine) return this.showMessage("Оберіть магазин!", "error");

        // Step 2: перевірка для ІННб лише цифри та довжина 10 символів
        if (!/^\d{10}$/.test(inn)) return this.showMessage("ІНН має містити лише 10 цифр!", "error");

        const user = this.users[inn];
        if (!user) return this.showMessage("Користувача не знайдено!", "error");

        // Step 3: перевірка, чи належить користувач до цього магазину
        if (!user.magazines.includes(magazine))
            return this.showMessage("У вас немає доступу до цього магазину!", "error");

        // Step 4: перевірка робочого дня
        const today = new Date().getDay();
        if (!user.workdays.includes(today)) return this.showMessage("Сьогодні не ваш робочий день!", "error");

        // Step 5: показуємо пароль, якщо пройдені перевірки вище
        if (this.passGroup.classList.contains("hidden")) {
            this.passGroup.classList.remove("hidden");
            this.usernameDisplay.textContent = `Вітаємо, ${user.name}!`;
            this.usernameDisplay.classList.remove("hidden");

            // блокуємо зміну магазину та ІНН, якщо перевірка вже пройдена
            this.magazineSelect.disabled = true;
            this.innInput.disabled = true;

            // показуємо перелік касових апаратів, якщо пройдені перевірки вище
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

        // Step 6: перевірка пароля
        if (pass !== user.password) return this.showMessage("Невірний пароль!", "error");

        // Step 7: перевірка. чи обрав користувач касовий апарат
        if (!cash) return this.showMessage("Оберіть касу!", "error");

        // Step 8: повідомлення про успіх
        this.showMessage("Успішний вхід!", "success");
        setTimeout(() => this.onSuccess(user), 800);
    }

    //функція що покаже повідомлення
    showMessage(msg, type = "error") {
        this.error.textContent = msg;
        this.error.className = "message " + type;
    }
}
