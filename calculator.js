> Anastasia:
// Базовая конфигурация цен
const priceConfig = {
    basic: {
        basePrice: 1000,
        options: {},
        property: false
    },
    premium: {
        basePrice: 2000,
        options: {
            standard: 0,
            extended: 500,
            professional: 1000
        },
        property: false
    },
    custom: {
        basePrice: 1500,
        options: {},
        property: {
            enabled: 800
        }
    }
};

// Текущее состояние калькулятора
let currentState = {
    quantity: 1,
    serviceType: 'basic',
    option: 'standard',
    propertyEnabled: false
};

// Инициализация после загрузки DOM
window.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    
    // Получаем элементы DOM
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const optionsSelect = document.getElementById('options');
    const propertyCheckbox = document.getElementById('property');
    const optionsGroup = document.getElementById('options-group');
    const propertyGroup = document.getElementById('property-group');
    
    // Инициализируем начальное состояние
    updateDynamicFields();
    calculateTotal();
    
    // Обработчики событий
    
    // Изменение количества
    quantityInput.addEventListener('input', function() {
        currentState.quantity = parseInt(this.value) || 1;
        calculateTotal();
    });
    
    // Изменение типа услуги
    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                currentState.serviceType = this.value;
                updateDynamicFields();
                calculateTotal();
            }
        });
    });
    
    // Изменение опции
    optionsSelect.addEventListener('change', function() {
        currentState.option = this.value;
        calculateTotal();
    });
    
    // Изменение свойства
    propertyCheckbox.addEventListener('change', function() {
        currentState.propertyEnabled = this.checked;
        calculateTotal();
    });
});

// Функция для обновления динамических полей
function updateDynamicFields() {
    const optionsGroup = document.getElementById('options-group');
    const propertyGroup = document.getElementById('property-group');
    const optionsSelect = document.getElementById('options');
    const propertyCheckbox = document.getElementById('property');
    
    // Сбрасываем состояния
    optionsGroup.classList.add('hidden');
    propertyGroup.classList.add('hidden');
    propertyCheckbox.checked = false;
    currentState.propertyEnabled = false;
    
    // Показываем/скрываем поля в зависимости от типа услуги
    switch(currentState.serviceType) {
        case 'basic':
            // Ничего не показываем
            break;
        case 'premium':
            optionsGroup.classList.remove('hidden');
            break;
        case 'custom':
            propertyGroup.classList.remove('hidden');
            break;
    }
    
    // Сбрасываем опцию по умолчанию
    currentState.option = 'standard';
    optionsSelect.value = 'standard';
}

// Функция для расчета общей стоимости
function calculateTotal() {
    const config = priceConfig[currentState.serviceType];
    let total = config.basePrice;
    
    // Добавляем стоимость опции для premium услуг
    if (currentState.serviceType === 'premium' && config.options) {
        total += config.options[currentState.option] || 0;
    }
    
    // Добавляем стоимость свойства для custom услуг
    if (currentState.serviceType === 'custom' && currentState.propertyEnabled) {
        total += config.property.enabled;
    }
    
    // Умножаем на количество
    total *= currentState.quantity;

> Anastasia:
// Обновляем отображение
    document.getElementById('total-cost').textContent = total.toLocaleString('ru-RU');
    
    console.log('Расчет стоимости:', {
        serviceType: currentState.serviceType,
        quantity: currentState.quantity,
        option: currentState.option,
        propertyEnabled: currentState.propertyEnabled,
        total: total
    });
}
