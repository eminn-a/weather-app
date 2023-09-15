async function attachEvents() {
  //get input
  let location = document.getElementById("location").value;
  let button = document.getElementById("submit");
  let currentConditionOutpu = document.getElementById("current");
  let output = document.getElementById("forecast");

  button.addEventListener("click", async () => {
    // document.getElementById("forecast").innerHTML = "";
    let locationUrl = await fetch(
      "http://localhost:3030/jsonstore/forecaster/locations"
    );
    let data = await locationUrl.json();
    let findLocation = data.find((x) => x.name === location);
    let code = findLocation.code;
    document.getElementById("location").value = "";
    let todayUrl = await fetch(
      `http://localhost:3030/jsonstore/forecaster/today/${code}`
    );
    let todayData = await todayUrl.json();
    let symbol = "";
    if (todayData.forecast.condition === "Sunny") {
      symbol = "\u2600";
    } else if (todayData.forecast.condition === "Partly sunny") {
      symbol = "\u26C5";
    } else if (todayData.forecast.condition === "Overcast") {
      symbol = "\u2601";
    } else if (todayData.forecast.condition === "Rain") {
      symbol = "\u2614";
    }
    //create elements
    let mainDiv = document.createElement("div");
    mainDiv.classList.add("forecasts");
    let symbolsp = document.createElement("span");
    symbolsp.classList.add("condition");
    symbolsp.classList.add("symbol");
    symbolsp.textContent = symbol;
    let conditionSpan = document.createElement("span");
    conditionSpan.classList.add("condition");
    let nameSpan = document.createElement("span");
    nameSpan.textContent = todayData.name;
    let tempSpan = document.createElement("span");
    tempSpan.textContent = `${todayData.forecast.high}°/${todayData.forecast.low}°`;
    let condSan = document.createElement("span");
    condSan.textContent = todayData.forecast.condition;

    nameSpan.classList.add("forecast-data");
    tempSpan.classList.add("forecast-data");
    condSan.classList.add("forecast-data");
    //appending elements
    conditionSpan.appendChild(nameSpan);
    conditionSpan.appendChild(tempSpan);
    conditionSpan.appendChild(condSan);
    mainDiv.appendChild(symbolsp);
    mainDiv.appendChild(conditionSpan);
    currentConditionOutpu.appendChild(mainDiv);

    document.getElementById("forecast").style.display = "block";
  });
}

attachEvents();
