document.addEventListener('DOMContentLoaded', function() {
    // Quantity controls
    const minusBtns = document.querySelectorAll('.minus');
    const plusBtns = document.querySelectorAll('.plus');
    const qtyInputs = document.querySelectorAll('.qty-input');
    const removeBtns = document.querySelectorAll('.remove-item');
    
    // Update quantity
    function updateQuantity(input, change) {
        let newValue = parseInt(input.value) + change;
        if (newValue < 1) newValue = 1;
        input.value = newValue;
        updateCart();
    }
    
    // Update cart totals
    function updateCart() {
        let subtotal = 0;
        const cartItems = document.querySelectorAll('.cart-item');
        
        cartItems.forEach(item => {
            const priceText = item.querySelector('.product-price').textContent;
            const price = parseInt(priceText.replace(/\D/g, ''));
            const quantity = parseInt(item.querySelector('.qty-input').value);
            const itemSubtotal = price * quantity;
            
            item.querySelector('.product-subtotal').textContent = `Rp ${itemSubtotal.toLocaleString('id-ID')}`;
            subtotal += itemSubtotal;
        });
        
        // Update summary
        document.querySelector('.subtotal-amount').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
        
        // Calculate shipping
        const shippingSelect = document.getElementById('shipping');
        let shipping = 0;
        
        if (subtotal >= 1000000 && shippingSelect.value === 'free') {
            shipping = 0;
        } else if (shippingSelect.value === 'standard') {
            shipping = 25000;
        } else if (shippingSelect.value === 'express') {
            shipping = 50000;
        }
        
        // Apply discount (example)
        const discount = subtotal >= 1000000 ? 100000 : 0;
        
        // Calculate total
        const total = subtotal + shipping - discount;
        
        // Update UI
        document.querySelector('.discount-amount').textContent = `- Rp ${discount.toLocaleString('id-ID')}`;
        document.querySelector('.total-amount').textContent = `Rp ${total.toLocaleString('id-ID')}`;
        
        // Update cart count
        const itemCount = cartItems.length;
        document.querySelector('.cart-count').textContent = itemCount;
    }
    
    // Event listeners
    minusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            updateQuantity(input, -1);
        });
    });
    
    plusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            updateQuantity(input, 1);
        });
    });
    
    qtyInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value < 1) this.value = 1;
            updateCart();
        });
    });
    
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus produk ini dari keranjang?')) {
                this.closest('.cart-item').remove();
                updateCart();
            }
        });
    });
    
    document.getElementById('shipping').addEventListener('change', updateCart);
    
    // Initialize cart
    updateCart();
    
    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        const itemCount = document.querySelectorAll('.cart-item').length;
        if (itemCount > 0) {
            window.location.href = 'checkout.html';
        } else {
            alert('Keranjang belanja Anda kosong. Silakan tambahkan produk terlebih dahulu.');
        }
    });
});