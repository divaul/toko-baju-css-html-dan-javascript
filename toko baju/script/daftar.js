document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.querySelectorAll('.toggle-password');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    togglePassword.forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.innerHTML = type === 'password' ? '<i class="far fa-eye"></i>' : '<i class="far fa-eye-slash"></i>';
        });
    });

    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const strengthMeter = document.querySelector('.strength-meter');
        const strengthText = document.querySelector('.strength-text');
        const password = this.value;
        let strength = 0;
        
        // Check password length
        if (password.length > 0) strength += 1;
        if (password.length >= 8) strength += 1;
        
        // Check for mixed case
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
        
        // Check for numbers
        if (/\d/.test(password)) strength += 1;
        
        // Check for special characters
        if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
        
        // Update strength meter
        let width = 0;
        let color = '';
        let text = '';
        
        switch(strength) {
            case 0:
                width = 0;
                color = '#e74c3c';
                text = 'Sangat lemah';
                break;
            case 1:
                width = '25%';
                color = '#e74c3c';
                text = 'Lemah';
                break;
            case 2:
                width = '50%';
                color = '#f39c12';
                text = 'Sedang';
                break;
            case 3:
                width = '75%';
                color = '#3498db';
                text = 'Kuat';
                break;
            case 4:
            case 5:
                width = '100%';
                color = '#2ecc71';
                text = 'Sangat kuat';
                break;
        }
        
        strengthMeter.style.setProperty('--strength-color', color);
        strengthMeter.querySelector('::after').style.width = width;
        strengthText.textContent = text;
        strengthText.style.color = color;
    });

    // Form validation
    const registerForm = document.getElementById('registerForm');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsChecked = document.getElementById('terms').checked;
        
        // Validate form
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            alert('Silakan lengkapi semua field yang wajib diisi');
            return;
        }
        
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            alert('Silakan masukkan alamat email yang valid');
            return;
        }
        
        if (password.length < 8) {
            alert('Password harus terdiri dari minimal 8 karakter');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok');
            return;
        }
        
        if (!termsChecked) {
            alert('Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi');
            return;
        }
        
        // Simulate registration process
        const userData = {
            firstName,
            lastName,
            email,
            phone,
            password, // Note: In real app, never store plain password
            subscribed: document.getElementById('subscribe').checked,
            birthDate: document.getElementById('birthDate').value
        };
        
        console.log('Registration data:', userData);
        alert('Pendaftaran berhasil! Silakan verifikasi email Anda.');
        window.location.href = 'login.html';
    });

    // Format phone number
    document.getElementById('phone').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '')
            .replace(/^(\d{3})(\d{3})(\d{4}).*/, '($1) $2-$3');
    });
});