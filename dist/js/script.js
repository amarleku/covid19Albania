var request;
(request = new XMLHttpRequest).open("GET", "https://coronavirus-19-api.herokuapp.com/countries/Albania", !0),
    request.onload = function () {

        var e = JSON.parse(this.response);
        document.getElementById("cases").innerHTML = e.cases,
            document.getElementById("recovered").innerHTML = e.recovered,
            document.getElementById("deaths").innerHTML = e.deaths,
            document.getElementById("todayCases").innerHTML = e.todayCases,
            document.getElementById("critical").innerHTML = e.critical,
            document.getElementById("active").innerHTML = e.active

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