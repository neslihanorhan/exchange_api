async function getRates() {
    const ratesResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/try`);
    const rates = await ratesResponse.json();
    return rates;
}

const UIModule = (function() {
    const Elements = {
        currencyList: document.getElementById("currency"),
        baseCurrency: document.getElementById("value"),
        result: document.getElementById("result")
    }
    return {
        getElements: function() {
            return Elements;
        },
        createPage: function() {
            getRates().then(res => {
                var ratesKeys = Object.keys(res.rates);
                var ratesValues = Object.values(res.rates);
                let html_options;
                for (let i = 0; i < ratesKeys.length-1; i++) {
                    html_options += `<option value=${ratesValues[i+1]}>${ratesKeys[i+1]}</option>`;
                }
                Elements.currencyList.innerHTML += html_options;
            }).catch(err => {
                console.log(err);
            })
        }
    }
})();

const CalculateModule = (function(UIProp) {
    const UIElements = UIProp.getElements();
    
    return {
        calculateExchangerate: function() {
            // console.log(UIElements.currencyList.selectedIndex)
            if (UIElements.currencyList.selectedIndex <= 0) return;
            // console.log("Seçti")
            var currencyName = UIElements.currencyList.options[UIElements.currencyList.selectedIndex].text;
            var currencyValue = UIElements.currencyList.options[UIElements.currencyList.selectedIndex].value;
            var currencyValueToFixed = parseFloat(parseFloat(currencyValue).toFixed(2));
            var trValue = parseFloat(UIElements.baseCurrency.value);
            trValue = isNaN(trValue) ? 1 : trValue;
            var html = `<span><strong>${trValue} TRY = </strong></span>`;
            UIElements.result.innerHTML = html + `<span><strong>${(currencyValueToFixed * trValue).toFixed(2)} ${currencyName}</strong></span>`;
        }
    }
})(UIModule);

const AppModule = (function(UIProp, CalProp) {
    const UIElements = UIProp.getElements();
    
    const loadEventListeners = function() {
        // console.log("HEY");
        window.addEventListener("load", UIProp.createPage);
        UIElements.currencyList.addEventListener("change", CalProp.calculateExchangerate);
        UIElements.baseCurrency.addEventListener("keyup", CalProp.calculateExchangerate);
    }    
    return {        
        showResult: function() {
            // console.log("ok");
            loadEventListeners();
        }
    }
})(UIModule,CalculateModule);

AppModule.showResult();

    // *************************
// async function getRates() {
//     const ratesResponse = await fetch(`https://api.exchangerate-api.com/v4/latest/try`);
//     const rates = await ratesResponse.json();
//     return rates;
// }

// const currencyList = document.getElementById("currency");
// const baseCurrency = document.getElementById("value");
// const result = document.getElementById("result");

// function showResult() {
//     var currencyName = currencyList.options[currencyList.selectedIndex].text;
//     var currencyValue = currencyList.options[currencyList.selectedIndex].value;
//     var currencyValueToFixed = parseFloat(parseFloat(currencyValue).toFixed(2));
//     var trValue = parseFloat(baseCurrency.value);
//     trValue = isNaN(trValue) ? 1 : trValue;        
//     var html = `<span><strong>${trValue} TRY = </strong></span>`;
//     result.innerHTML = html + `<span><strong>${currencyValueToFixed * trValue} ${currencyName}</strong></span>`;
// }

// currencyList.addEventListener("change", () => {
//     showResult();
// })

// baseCurrency.addEventListener("keyup", () => {
//     if (currencyList.selectedIndex > 0) {
//         showResult();
//     }
// })

// window.addEventListener("load", () => {
//     getRates().then(res => {
//         var ratesKeys = Object.keys(res.rates);
//         var ratesValues = Object.values(res.rates);
//         let html_options;
//         for (let i = 0; i < ratesKeys.length-1; i++) {
//             html_options += `<option value=${ratesValues[i+1]}>${ratesKeys[i+1]}</option>`;
//         }
//         currencyList.innerHTML += html_options;
//     }).catch(err => {
//         console.log(err);
//     })
// })