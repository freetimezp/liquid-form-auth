class AuthForm {
    constructor(selector, options = {}) {
        this.form = document.querySelector(selector);
        this.onSuccess = options.onSuccess || (() => {});

        this.magazineSelect = this.form.querySelector("[data-magazine]");
        this.innInput = this.form.querySelector("[data-inn]");
        this.passInput = this.form.querySelector("[data-pass]");
        this.passGroup = this.form.querySelector("[data-pass-group]");
        this.usernameDisplay = this.form.querySelector("[data-username]");
        this.cashGroup = this.form.querySelector("[data-cash-group]");
        this.cashSelect = this.form.querySelector("[data-cash]");
        this.error = document.getElementById("error-msg");

        this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.showMessage("");

        const inn = this.innInput.value.trim();
        const magazine = this.magazineSelect.value.trim();
        const pass = this.passInput.value.trim();
        const cash = this.cashSelect.value.trim();

        if (!magazine) return this.showMessage("Оберіть магазин!", "danger");
        if (!/^\d{10}$/.test(inn)) return this.showMessage("ІНН має містити 10 цифр!", "danger");

        let user;
        try {
            const res = await fetch("./controllers/check_inn.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inn }),
            });
            const data = await res.json();
            if (data.status === "error") return this.showMessage(data.message, "danger");
            user = data.user;
        } catch {
            return this.showMessage("Помилка сервера!", "danger");
        }

        if (!user.magazines.includes(magazine))
            return this.showMessage("У вас немає доступу до цього магазину!", "danger");

        const today = new Date().getDay();
        if (!user.workdays.includes(today)) return this.showMessage("Сьогодні не ваш робочий день!", "danger");

        // Show password/cash
        if (this.passGroup.classList.contains("d-none")) {
            this.passGroup.classList.remove("d-none");
            this.cashGroup.classList.remove("d-none");

            this.usernameDisplay.textContent = `Вітаємо, ${user.name}!`;
            this.usernameDisplay.classList.remove("d-none");

            this.magazineSelect.disabled = true;
            this.innInput.disabled = true;

            this.cashSelect.innerHTML =
                user.cashRegisters.length === 1
                    ? `<option value="${user.cashRegisters[0]}">Каса № ${user.cashRegisters[0]}</option>`
                    : `<option value="">Оберіть касу</option>` +
                      user.cashRegisters.map((reg) => `<option value="${reg}">Каса № ${reg}</option>`).join("");

            return this.showMessage("Введіть пароль!", "info");
        }

        if (pass !== user.password) return this.showMessage("Невірний пароль!", "danger");

        if (!cash) return this.showMessage("Оберіть касу!", "danger");

        this.showMessage("Успішний вхід!", "success");
        setTimeout(() => this.onSuccess(user), 300);
    }

    showMessage(msg, type = "danger") {
        if (!msg) {
            this.error.classList.add("d-none");
            return;
        }
        this.error.textContent = msg;
        this.error.className = `alert alert-${type} mt-3`;
    }
}
