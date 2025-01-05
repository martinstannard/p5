class OPC {
    constructor() {
        this.values = {};
        this.controls = {};
        this.container = null;
        this.setupContainer();
    }

    setupContainer() {
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.top = '10px';
        this.container.style.right = '10px';
        this.container.style.backgroundColor = 'rgba(0,0,0,0.7)';
        this.container.style.padding = '10px';
        this.container.style.borderRadius = '5px';
        document.body.appendChild(this.container);
    }

    addSlider(name, min, max, defaultValue = min) {
        const div = document.createElement('div');
        div.style.marginBottom = '10px';
        
        const label = document.createElement('label');
        label.textContent = name;
        label.style.color = 'white';
        label.style.display = 'block';
        label.style.marginBottom = '5px';
        
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.step = (max - min) / 100;
        slider.value = defaultValue;
        
        const valueDisplay = document.createElement('span');
        valueDisplay.style.color = 'white';
        valueDisplay.style.marginLeft = '10px';
        valueDisplay.textContent = defaultValue;
        
        this.values[name] = defaultValue;
        
        slider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            this.values[name] = value;
            valueDisplay.textContent = value.toFixed(2);
        });
        
        div.appendChild(label);
        div.appendChild(slider);
        div.appendChild(valueDisplay);
        this.container.appendChild(div);
        
        this.controls[name] = slider;
        return this;
    }

    get(name) {
        return this.values[name];
    }

    set(name, value) {
        if (this.controls[name]) {
            this.controls[name].value = value;
            this.values[name] = value;
            // Update the display value
            const valueDisplay = this.controls[name].nextSibling;
            if (valueDisplay) {
                valueDisplay.textContent = value.toFixed(2);
            }
        }
    }
}
