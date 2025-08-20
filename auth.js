document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = registerForm.username.value;
            const password = registerForm.password.value;

            // Verificar si el usuario ya existe
            const response = await fetch('http://localhost:3000/users?username=' + username);
            const existingUsers = await response.json();

            if (existingUsers.length > 0) {
                alert('El nombre de usuario ya existe.');
                return;
            }

            // Registrar nuevo usuario
            const newUser = { username, password };
            await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            alert('Registro exitoso. Ahora puedes iniciar sesión.');
            window.location.href = 'login.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;

            const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
            const users = await response.json();

            if (users.length > 0) {
                // Iniciar sesión exitoso
                sessionStorage.setItem('user', JSON.stringify(users[0]));
                alert('Inicio de sesión exitoso.');
                window.location.href = 'index.html'; // Redirigir a la página principal
            } else {
                alert('Nombre de usuario o contraseña incorrectos.');
            }
        });
    }
});
