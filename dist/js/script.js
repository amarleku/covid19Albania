var request;
(request = new XMLHttpRequest).open("GET", "https://coronavirus-19-api.herokuapp.com/countries/Albania", !0),
    request.onload = function () {

        var e = JSON.parse(this.response);
        document.getElementById("cases").innerHTML = e.cases,
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
	