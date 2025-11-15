<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Авторизація</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light d-flex justify-content-center align-items-center vh-100">

<div class="container" style="max-width: 480px;">

    <!-- LOGIN CARD -->
    <div id="auth-card" class="card shadow-sm">
        <div class="card-body">

            <h3 class="text-center mb-4">Вхід до системи</h3>

            <form id="login-form">

                <!-- Магазин -->
                <div class="mb-3">
                    <label class="form-label">Оберіть магазин</label>
                    <select class="form-select" data-magazine>
                        <option value="">Оберіть магазин...</option>
                        <option value="shop1">Магазин №1</option>
                        <option value="shop2">Магазин №2</option>
                        <option value="shop3">Магазин №3</option>
                    </select>
                </div>

                <!-- ІНН -->
                <div class="mb-3">
                    <label class="form-label">ІНН</label>
                    <input type="text" class="form-control" data-inn placeholder="Введіть ІНН">
                </div>

                <!-- Вітання -->
                <p class="text-success fw-semibold mb-3 d-none" data-username></p>

                <!-- Пароль -->
                <div class="mb-3 d-none" data-pass-group>
                    <label class="form-label">Пароль</label>
                    <input type="password" class="form-control" data-pass placeholder="Введіть пароль">
                </div>

                <!-- Каса -->
                <div class="mb-3 d-none" data-cash-group>
                    <label class="form-label">Касовий апарат</label>
                    <select class="form-select" data-cash></select>
                </div>

                <button type="submit" class="btn btn-primary w-100">Увійти</button>

                <!-- Повідомлення -->
                <div id="error-msg" class="alert mt-3 d-none"></div>

            </form>

        </div>
    </div>

    <!-- SUCCESS SECTION -->
    <div id="success-section" class="card shadow-sm d-none mt-3">
        <div class="card-body">
            <h3 class="text-success mb-3">Вітаємо!</h3>

            <p class="mb-1"><strong>Користувач:</strong> <span id="user-name"></span></p>
            <p class="mb-1"><strong>Магазин:</strong> <span id="user-shop"></span></p>
            <p class="mb-1"><strong>Каса:</strong> <span id="user-cash"></span></p>

            <hr>

            <button class="btn btn-secondary w-100" id="logout-btn">Вихід</button>
        </div>
    </div>

</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="./assets/js/auth.js"></script>

<script>
    new AuthForm("#login-form", {
        onSuccess: (user, selectedShop, selectedCash) => {
            document.getElementById("auth-card").classList.add("d-none");

            // Fill data
            document.getElementById("user-name").textContent = user.name;
            document.getElementById("user-shop").textContent = selectedShop;
            document.getElementById("user-cash").textContent = selectedCash;

            // Show section
            document.getElementById("success-section").classList.remove("d-none");
        }
    });

    document.getElementById("logout-btn").addEventListener("click", () => {
        location.reload();
    });
</script>

</body>
</html>
