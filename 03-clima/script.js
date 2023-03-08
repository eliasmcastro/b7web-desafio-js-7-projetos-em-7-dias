const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f644b4a13b816094f9eedacab1c261ee';
const UNITS = 'metric';
const LANG = 'pt_br';

document.querySelector('.busca').addEventListener('submit', async (event) => {
  event.preventDefault();

  let input = document.querySelector('#searchInput').value;

  if (input !== '') {
    clearInfo();
    showWarning('Carregando...');

    let url = `${BASE_URL}?q=${encodeURI(input)}&units=${UNITS}&lang=${LANG}&appid=${API_KEY}`;

    let results = await fetch(url);
    let json = await results.json();

    if (json.cod === 200) {
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning('Não encontramos esta localização');
    }
  } else {
    clearInfo();
  }
});

function showInfo(infos) {
  showWarning('');

  document.querySelector('.titulo').innerHTML = `${infos.name}, ${infos.country}`;
  document.querySelector('.tempInfo').innerHTML = `${infos.temp} <sup>ºC</sup>`;
  document.querySelector('.ventoInfo').innerHTML = `${infos.windSpeed} <span>km/h</span>`;
  document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${infos.tempIcon}@2x.png`);
  document.querySelector('.ventoPonto').style.transform = `rotate(${infos.windAngle - 90}deg)`;

  document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
  document.querySelector('.resultado').style.display = 'none';

  showWarning('');
}

function showWarning(msg) {
  document.querySelector('.aviso').innerHTML = msg;
}
