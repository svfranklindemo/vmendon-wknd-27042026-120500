export default async function decorate(block) {

    let res = null;
    try {
        const response = await fetch('/calculator.json');
        res = await response.json();
      } catch (e) {
        // error handling
        console.log("error")
      }

      
    let calcHTML = '<div class="calculator-content"><h2>Calculate the value of holding</h2><div class="calc-elem"><p>[rateLbl]</p> <span type="number" id="sharePrice" data-shareval="[rate]" class="bold-span">[rateFieldLbl]</span></div><div class="calc-elem"><p>[inputLbl]</p> <input type="number" id="sharesOwned" placeholder=""></div><div class="calc-elem btn-wrapper"><button class="calculateHolding">[btnLbl]</button></div><div class="calc-elem"><p>[resultLbl]</p> <span id="holdingValue" class="bold-span">0GBP</span></div></div>';

    if (res?.data) {
        res.data.forEach(item => {
            calcHTML = calcHTML.replace('['+item.property+']', item.value);
          });
    }

    block.innerHTML = calcHTML;

    const calc = block.querySelector('.calculateHolding');

    function calculateHolding() {
        const stockPrice = parseFloat(document.getElementById("sharePrice").getAttribute('data-shareval'));
        const sharesOwned = parseFloat(document.getElementById("sharesOwned").value);
        const holdingValue = stockPrice * sharesOwned;

        document.getElementById("holdingValue").textContent = `${holdingValue.toFixed(2)}GBP`;
    }

    calc.addEventListener(
        'click',
        () => {
            calculateHolding();
        },
        { passive: true },
    );

}


