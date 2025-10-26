window.addEventListener('DOMContentLoaded', function() {
    const quantity = document.getElementById('quantity');
    const optionsGroup = document.getElementById('optionsGroup');
    const propertiesGroup = document.getElementById('propertiesGroup');
    const totalPrice = document.getElementById('totalPrice');
    const quantityError = document.getElementById('quantityError');

    const prices = {
        basic: 4500,
        premium: 5500,
        vip: 5000
    };

    const optionPrices = {
        standard: 0,
        express: 500,
        priority: 800
    };

    function isValidNumber(input) {
        return /^\d+$/.test(input);
    }

    function getSelectedType() {
        return document.querySelector('input[name="serviceType"]:checked').value;
    }

    function validateQuantity() {
        if (!isValidNumber(quantity.value)) {
            quantityError.style.display = 'block';
            return 0;
        } else {
            quantityError.style.display = 'none';
            return parseInt(quantity.value);
        }
    }

    function calculate() {
        const type = getSelectedType();
        const count = validateQuantity();

        if (count === 0) {
            totalPrice.textContent = '0';
            return;
        }

        let price = prices[type];

        if (type === 'premium') {
            price += optionPrices[document.getElementById('options').value];
        }

        if (type === 'vip' && document.getElementById('property').checked) {
            price += 1000;
        }

        totalPrice.textContent = price * count;
    }

    function updateVisibility() {
        const type = getSelectedType();

        optionsGroup.classList.toggle('hidden', type !== 'premium');
        propertiesGroup.classList.toggle('hidden', type !== 'vip');
    }

    function handleTypeChange() {
        updateVisibility();
        calculate();
    }


    quantity.addEventListener('input', function() {
        calculate();
    });

    document.querySelectorAll('input[name="serviceType"]').forEach(radio => {
        radio.addEventListener('change', handleTypeChange);
    });
    document.getElementById('options').addEventListener('change', calculate);
    document.getElementById('property').addEventListener('change', calculate);

    updateVisibility();
    calculate();
});