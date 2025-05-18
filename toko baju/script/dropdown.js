    document.addEventListener('DOMContentLoaded', function() {
        const accountMenu = document.querySelector('.account-menu');
        const accountTrigger = document.querySelector('.account-trigger');
        const accountDropdown = document.querySelector('.account-dropdown');
        
        // Toggle dropdown on click
        accountTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            accountMenu.classList.toggle('active');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.account-menu')) {
                accountMenu.classList.remove('active');
            }
        });
        
        // Smooth close when clicking menu items
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function() {
                accountMenu.classList.remove('active');
            });
        });
    });
