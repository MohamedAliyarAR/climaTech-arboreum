let form = document.getElementById('btn').addEventListener('click', fetchIt);

async function fetchIt() {
  var place = document.getElementById('place').value;
  const appId = '96964f90bb1ed1b2bc23951e38e37456';
  const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + place + '&appid=' + appId + '&units=metric';

  fetch(url)
    .then(res => res.json())
    .then(data => {
      var weatherData = data;
      console.log(weatherData);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange =   function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let trees = xhr.responseText
          console.log(xhr.responseText);
          let t = document.getElementById('trees');
          t.innerHTML =  `<h2> ${trees} </h2>`;
        }
      }

      var json_data = JSON.stringify(weatherData)
      xhr.send(json_data);
      
      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
      
      document.querySelector('#response').innerHTML = `
        <img class="img" src="${iconUrl}" alt="climate image">
        <h2 class="temp"><span class='bigger'>${temp}</span> &#8451;</h2>
        <h3 class="desc">The weather in ${place} is ${des}</h3>
      `;
    })
    .catch(err => {
      document.getElementById('answer').innerHTML = `
        <h3>Check your internet or enter the correct city name</h3>
      `;
    });
}
