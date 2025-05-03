// api.js

function GetTimeColor(stars)
{
    var color = '';
    switch (stars) {
        case 1:
            color = 'rgba(255, 99, 132, 0.5)';
            break;
        case 2:
            color = 'rgba(65, 79, 241, 0.5)';
            break;
        case 3:
            color = 'rgba(54, 162, 235, 0.5)';
            break;
        case 4:
            color = 'rgba(239, 161, 5, 0.5)';
            break;
        case 5:
            color = 'rgba(8, 241, 58, 0.5)';
            break;
    }
    return color;
}

function GetMicColor(screenKeybaord) {
  return screenKeybaord ? 'rgb(76, 63, 77)' : 'rgb(188, 43, 14)';
}

function GetInstrumentColor(instrument) {
  var color = '';
  switch (instrument) {
    case 1:
      color = 'rgb(173, 139, 132)';
      break;
    case 2:
      color = 'rgb(129, 164, 105)';
      break;
    case 3:
      color = 'rgb(233, 240, 230)';
      break;
    case 4:
      color = 'rgb(16, 129, 160)';
      break;
    case 5:
      color = 'rgb(241, 230, 3)';
      break;
    case 6:
      color = 'rgb(4, 78, 55)';
      break;
    case 9:
      color = 'rgb(236, 102, 40)';
      break;
    case 16:
      color = 'rgb(98, 63, 180)';
      break;
  }
  return color;
}

function GetLanguageColor(language)
{
  var color = '';
  switch (language) {
    case 1:
      color = 'rgba(245, 69, 66, 1)';
      break;
    case 2:
      color = 'rgba(245, 164, 66, 1)';
      break;
    case 4:
      color = 'rgba(245, 233, 66, 1)';
      break;
    case 8:
      color = 'rgba(72, 245, 66, 1)';
      break;
    case 16:
      color = 'rgba(66, 176, 245, 1)';
      break;
    case 32:
      color = 'rgb(158, 126, 154)';
      break;
    case 64:
      color = 'rgb(205, 8, 182)';
      break;
    case 128:
      break;
  }
  return color;
}

function GetDataSets(data) {
    var levels = [];
    var arr = [];
    for (var i = 0; i <= 5; i++) {
        var level = data.filter(item => item.level === i);
        levels.push(level);
        arr.push(level.length);
    }
    const max = Math.max(...arr);
    var datasetsTime = [];
    var datasetsLanguage = [];
    var datasetsInstrument = [];
    var datasetsRealPiano = [];
    for (var i = 0; i < max; i++) {
        datasetsTime.push({});
        datasetsLanguage.push({});
        datasetsInstrument.push({});
        datasetsRealPiano.push({});
    }
    var index = 0;
    datasetsTime.forEach(item => {
        item.label = "Time";
        item.data = [];
        item.backgroundColor = [];
        for (var i = 0; i <= 5; i++) {
            item.data.push(index < levels[i].length ? levels[i][index].timeTaken : 0);
            item.backgroundColor.push(index < levels[i].length ? GetTimeColor(levels[i][index].stars) : '');
        }
        item.stack = 'Stack ' + index.toString();
        index++;
      });
      index = 0;
      datasetsLanguage.forEach(item => {
        item.label = "Language";
        item.data = [];
        item.backgroundColor = [];
        for (var i = 0; i <= 5; i++) {
            item.data.push(index < levels[i].length ? 10 : 0);
            item.backgroundColor.push(index < levels[i].length ? GetLanguageColor(levels[i][index].language) : '');
        }
        item.stack = 'Stack ' + index.toString();
        index++;
      });
      index = 0;
      datasetsInstrument.forEach(item => {
        item.label = "Instrument";
        item.data = [];
        item.backgroundColor = [];
        for (var i = 0; i <= 5; i++) {
            item.data.push(index < levels[i].length ? 10 : 0);
            item.backgroundColor.push(index < levels[i].length ? GetInstrumentColor(levels[i][index].instrument) : '');
        }
        item.stack = 'Stack ' + index.toString();
        index++;
      });
      index = 0;
      datasetsRealPiano.forEach(item => {
        item.label = "Screen Keyboard";
        item.data = [];
        item.backgroundColor = [];
        for (var i = 0; i <= 5; i++) {
            item.data.push(index < levels[i].length ? 10 : 0);
            item.backgroundColor.push(index < levels[i].length ? GetMicColor(levels[i][index].useScreenKeyboard) : '');
        }
        item.stack = 'Stack ' + index.toString();
        index++;
      });
      return datasetsTime.concat(datasetsLanguage).concat(datasetsInstrument).concat(datasetsRealPiano);
}

const queryString = window.location.search;

// Create a URLSearchParams object
const params = new URLSearchParams(queryString);
var queryStr = "";
// Check if the "from" parameter exists
if (params.has("from")) {
    queryStr += "?from=" + params.get("from");
}
if (params.has("to")) {
  queryStr += "&to=" + params.get("to");
}

// 1. Define your API endpoint
const apiUrl = 'https://rcgame.azurewebsites.net/api/GetLevelAchievementsD4j2Drb88fDaKfQb75P' + queryStr; // <- Replace with your real API URL

if (queryStr.length > 0) {
// 2. Fetch data from API
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    // 3. Build the chart after data is loaded
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Custom', 1, 2, 3, 4, 5],
        datasets: GetDataSets(data)
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}