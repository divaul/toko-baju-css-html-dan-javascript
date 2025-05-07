document.addEventListener('DOMContentLoaded', function() {
    // Step navigation
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.step-content');
    const nextToPaymentBtn = document.getElementById('nextToPayment');
    const backToShippingBtn = document.getElementById('backToShipping');
    const reviewOrderBtn = document.getElementById('reviewOrder');
    const backToPaymentBtn = document.getElementById('backToPayment');
    const placeOrderBtn = document.getElementById('placeOrder');
    const cancelCheckoutBtn = document.getElementById('cancelCheckout');
    
    // City options based on province
    const cityOptions = {
        'DKI Jakarta': ['Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Barat', 'Jakarta Timur', 'Jakarta Utara'],
        'Jawa Barat': ['Bandung', 'Bogor', 'Bekasi', 'Depok', 'Cimahi'],
        'Jawa Tengah': ['Semarang', 'Solo', 'Magelang', 'Pekalongan', 'Tegal'],
        'Jawa Timur': ['Surabaya', 'Malang', 'Sidoarjo', 'Madiun', 'Kediri'],
        'Bali': ['Denpasar', 'Badung', 'Gianyar', 'Tabanan', 'Klungkung']
    };
    
    // Initialize checkout
    function initCheckout() {
        // Set first step as active
        setActiveStep(1);
        
        // Province change event
        document.getElementById('province').addEventListener('change', function() {
            const province = this.value;
            const citySelect = document.getElementById('city');
            
            // Clear existing options
            citySelect.innerHTML = '<option value="">Pilih Kota/Kabupaten</option>';
            
            // Add new options
            if (province && cityOptions[province]) {
                cityOptions[province].forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            }
        });
    }
    
    // Set active step
    function setActiveStep(stepNumber) {
        // Update steps
        steps.forEach(step => {
            if (parseInt(step.dataset.step) <= stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update content
        stepContents.forEach(content => {
            if (parseInt(content.dataset.step) === stepNumber) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
    
    // Validate shipping form
    function validateShippingForm() {
        const form = document.getElementById('shippingForm');
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value) {
                field.style.borderColor = 'red';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        return isValid;
    }
    
    // Validate payment form
    function validatePaymentForm() {
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        
        if (!paymentMethod) {
            alert('Silakan pilih metode pembayaran');
            return false;
        }
        
        if (paymentMethod.value === 'creditCard') {
            const cardNumber = document.getElementById('cardNumber').value;
            const cardName = document.getElementById('cardName').value;
            const cardExpiry = document.getElementById('cardExpiry').value;
            const cardCvv = document.getElementById('cardCvv').value;
            
            if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
                alert('Silakan lengkapi informasi kartu kredit');
                return false;
            }
        }
        
        return true;
    }
    
    // Update order confirmation
    function updateOrderConfirmation() {
        // Shipping info
        document.getElementById('confirmName').textContent = document.getElementById('fullName').value;
        document.getElementById('confirmPhone').textContent = document.getElementById('phone').value;
        document.getElementById('confirmAddress').textContent = document.getElementById('address').value;
        document.getElementById('confirmCity').textContent = `${document.getElementById('city').value}, ${document.getElementById('province').value}`;
        document.getElementById('confirmShipping').textContent = document.getElementById('shippingMethod').options[document.getElementById('shippingMethod').selectedIndex].text;
        
        // Payment info
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        document.getElementById('confirmPaymentMethod').textContent = paymentMethod === 'creditCard' ? 'Kartu Kredit/Debit' : 
                                                                 paymentMethod === 'bankTransfer' ? 'Transfer Bank' : 'E-Wallet';
        
        const paymentDetails = document.getElementById('confirmPaymentDetails');
        paymentDetails.innerHTML = '';
        
        if (paymentMethod === 'creditCard') {
            paymentDetails.innerHTML = `
                <p>Kartu: **** **** **** ${document.getElementById('cardNumber').value.slice(-4)}</p>
                <p>Nama di Kartu: ${document.getElementById('cardName').value}</p>
            `;
        } else if (paymentMethod === 'bankTransfer') {
            paymentDetails.innerHTML = `
                <div class="bank-account">
                    <p><strong>Bank BCA</strong></p>
                    <p>No. Rekening: 123 456 7890</p>
                    <p>Atas Nama: PT PRESTIGE FASHION</p>
                </div>
            `;
        } else {
            const ewallet = document.querySelector('input[name="ewallet"]:checked').value;
            paymentDetails.innerHTML = `
                <p>${ewallet.charAt(0).toUpperCase() + ewallet.slice(1)}</p>
            `;
        }
    }
    
    // Event listeners
    nextToPaymentBtn.addEventListener('click', function() {
        if (validateShippingForm()) {
            setActiveStep(2);
        }
    });
    
    backToShippingBtn.addEventListener('click', function() {
        setActiveStep(1);
    });
    
    reviewOrderBtn.addEventListener('click', function() {
        if (validatePaymentForm()) {
            updateOrderConfirmation();
            setActiveStep(3);
        }
    });
    
    backToPaymentBtn.addEventListener('click', function() {
        setActiveStep(2);
    });
    
    placeOrderBtn.addEventListener('click', function() {
        // Simulate order processing
        alert('Pesanan Anda berhasil dibuat! Terima kasih telah berbelanja di PRESTIGE.');
        window.location.href = 'index.html';
    });
    
    cancelCheckoutBtn.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin membatalkan checkout? Produk dalam keranjang akan tetap tersimpan.')) {
            window.location.href = 'keranjang.html';
        }
    });
    
    // Initialize
    initCheckout();
});