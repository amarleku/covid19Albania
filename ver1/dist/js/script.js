var request;
(request = new XMLHttpRequest).open("GET", "https://coronavirus-19-api.herokuapp.com/countries/Albania", !0),
    request.onload = function () {

        var e = JSON.parse(this.response);
        document.getElementById("acases").innerHTML = e.cases,
            document.getElementById("arecovered").innerHTML = e.recovered,
            document.getElementById("adeaths").innerHTML = e.deaths,
            document.getElementById("atodayCases").innerHTML = e.todayCases,
            document.getElementById("acritical").innerHTML = e.critical,
            document.getElementById("aactive").innerHTML = e.active

    },

    request.send(),

    (request = new XMLHttpRequest).open("GET", "https://coronavirus-19-api.herokuapp.com/all", !0),
    request.onload = function () {

        var e = JSON.parse(this.response);
        document.getElementById("allCases").innerHTML = e.cases,
            document.getElementById("allRecovered").innerHTML = e.recovered,
            document.getElementById("allDeaths").innerHTML = e.deaths
    },

    request.send();

(request = new XMLHttpRequest).open("GET", "https://covidks.s3.amazonaws.com/data.json", !0),
    request.onload = function () {
        var e = JSON.parse(this.response);
        document.getElementById("allCasesKosovo").innerHTML = e.cases,
            document.getElementById("allDeathsKosovo").innerHTML = e.deaths,
            document.getElementById("allRecoveres").innerHTML = e.recoveries
    },

    request.send();
	
	// World Map
google.charts.load("current", {
  packages: ["geochart"]
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  fetch("https://api.covid19api.com/summary")
    .then((res) => res.json())
    .then((res) => {
      // Set number of cases
      setNumbers(res.Global);
      let cases = [];

      res.Countries.forEach((country) => {
        cases.push([country.CountryCode, country.TotalConfirmed]);
      });

      var data = google.visualization.arrayToDataTable([
        ["Country", "Number of cases: "],
        ...cases
      ]);

      var options = {
        colorAxis: { colors: ["#3498db", "#ff7675", "#ff6b81", "#c0392b"] }
      };

      var chart = new google.visualization.GeoChart(
        document.querySelector(".world-map")
      );

      chart.draw(data, options);
    });
}

// Line charts
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

// var countryName = 'albania'; // Default country name

function drawChart(countryName = "albania") {
  fetch(
    "https://api.covid19api.com/total/country/" +
      countryName +
      "/status/confirmed"
  )
    .then((res) => res.json())
    .then((res) => {
      let cases = [];
      if (res.length !== 0) {
        res.forEach((day) => {
          cases.push([day.Date.slice(0, 10), day.Cases]);
        });

        var data = google.visualization.arrayToDataTable([
          ["Date", "Cases"],
          ...cases
        ]);

        var options = {
          title: "Number of cases",
          legend: { position: "bottom" }
        };

        var chart = new google.visualization.LineChart(
          document.querySelector(".country-chart")
        );

        chart.draw(data, options);
      } else {
        document.querySelector(".country-chart").innerHTML = "No data";
      }
    });
}

function setNumbers(numbers) {
  document.getElementById("cases").innerHTML = numbers.TotalConfirmed;
  document.getElementById("deaths").innerHTML = numbers.TotalDeaths;
  document.getElementById("recovered").innerHTML = numbers.TotalRecovered;
}

const select1 = document.getElementById("country");
window.onload = function () {
  fetch("https://api.covid19api.com/countries")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((d) => {
        select1.innerHTML += `<option value="${d.Slug}">${d.Country}</option>`;
      });
      select1.value = "albania";
    });
};

select.addEventListener("change", () => {
  document.querySelector(".country-chart").innerHTML = "";
  drawChart(select.value);
});
	