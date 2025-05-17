import RegisterPagePresenter from '../presenters/register-presenter.js';

const RegisterPage = {
  async render() {
    return `
      <div class="page-container">
        <div class="auth-container">
          <h2>Register</h2>
          <form id="register-form">
            <div class="form-group">
              <label for="name">Nama:</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Register</button>
            <p>Sudah punya akun? <a href="#/login">Login di sini</a></p>
          </form>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const registerForm = document.getElementById('register-form');
    
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        await RegisterPagePresenter.register(name, email, password);
        alert('Registrasi berhasil! Silakan login.');
        window.location.hash = '/login';
      } catch (error) {
        alert(error.message);
      }
    });
  },
};

export default RegisterPage; 