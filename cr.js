const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const but = document.getElementById("but");
const shift = document.getElementById("shift"); // Corrected the variable name

let fromcurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let message = document.getElementById("msg");

for (let select of dropdowns) {
  for (let curcode in countryList) {
    let dynamic_option = document.createElement("option");
    dynamic_option.innerText = curcode;
    dynamic_option.value = curcode;
    if (select.name === "from" && curcode === "USD") {
      dynamic_option.selected = "selected";
    }
    if (select.name === "to" && curcode === "INR") {
      dynamic_option.selected = "selected";
    }
    select.append(dynamic_option);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

function updateFlag(element) {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
}

async function generateresult() {
  let amount = document.querySelector(".amount input");
  let amountval = amount.value;
  if (amountval === "" || amountval < 1) {
    amountval = 1;
    amount.value = "1";
  }

  const url = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[tocurr.value.toLowerCase()];

  let finalamount = amountval * rate;
  message.innerText = `${amountval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
}

but.addEventListener("click", async (evt) => {
  evt.preventDefault();
  generateresult();
});

async function generateClickedResult(from, to) {
  const url = `${BASE_URL}/${from.toLowerCase()}/${to.toLowerCase()}.json`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[to.value.toLowerCase()];

  let amountval = document.querySelector(".amount input").value;

  let finalamount = amountval * rate;
  message.innerText = `${amountval} ${from} = ${finalamount} ${to}`;
}

shift.addEventListener("click", () => {
  let fromValue = fromcurr.value;
  let toValue = tocurr.value;
  fromcurr.value = toValue;
  tocurr.value = fromValue;

  updateFlag(fromcurr);
  updateFlag(tocurr);
  generateClickedResult(fromValue, toValue);
});
