document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsGroup = document.getElementById('optionsGroup');
    const propertiesGroup = document.getElementById('propertiesGroup');
    const totalPriceElement = document.getElementById('totalPrice');
    const quantityError = document.getElementById('quantityError');

    const servicePrices = {
        basic: 4500,
        premium: 5500,
        vip: 5000
    };

    const optionPrices = {
        standard: 0,
        express: 500,
        priority: 800
    };

    const propertyPrice = 1000;

    function validateQuantity() {
        const quantity = quantityInput.value.trim();
        const isValid = /^\d+$/.test(quantity) && parseInt(quantity) > 0;

        if (!isValid) {
            quantityError.style.display = 'block';
            return false;
        } else {
            quantityError.style.display = 'none';
            return true;
        }
    }

    function toggleAdditionalOptions() {
        const selectedService = document.querySelector('input[name="serviceType"]:checked').value;

        if (selectedService === 'premium') {
            optionsGroup.classList.remove('hidden');
        } else {
            optionsGroup.classList.add('hidden');
            document.getElementById('options').value = 'standard';
        }

        if (selectedService === 'basic') {
            propertiesGroup.classList.remove('hidden');
        } else {
            propertiesGroup.classList.add('hidden');
            document.getElementById('property').checked = false;
        }
    }

    function calculateTotal() {
        if (!validateQuantity()) {
            totalPriceElement.textContent = '0';
            return;
        }

        const quantity = parseInt(quantityInput.value);
        const selectedService = document.querySelector('input[name="serviceType"]:checked').value;
        const selectedOption = document.getElementById('options').value;
        const hasProperty = document.getElementById('property').checked;

        let basePrice = servicePrices[selectedService];
        let optionPrice = 0;
        let propertyCost = 0;

        if (selectedService === 'premium') {
            optionPrice = optionPrices[selectedOption];
        }

        if (selectedService === 'basic' && hasProperty) {
            propertyCost = propertyPrice;
        }

        const total = (basePrice + optionPrice + propertyCost) * quantity;
        totalPriceElement.textContent = total.toLocaleString();
    }

    quantityInput.addEventListener('input', function() {
        validateQuantity();
        calculateTotal();
    });

    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            toggleAdditionalOptions();
            calculateTotal();
        });
    });

    document.getElementById('options').addEventListener('change', calculateTotal);
    document.getElementById('property').addEventListener('change', calculateTotal);

    toggleAdditionalOptions();
    calculateTotal();
});