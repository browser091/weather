let citys = "minsk";
let city = document.querySelector(".find_city");
city.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    console.log(city.value);
    citys = city.value;
    city.value = "";
    startWather();
  }
});
document.querySelector(".find_city_btn").addEventListener("click", function() {
  console.log(city.value);
  citys = city.value;
  city.value = "";
  startWather();
});

function startWather() {
  async function getWeather() {
    try {
      let resp = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${citys}&lang=ru&appid=6c8cdc6de569a52b307c81c057c3489e`
      );
      let data = await resp.json();
      return data;
    } catch (err) {
      console.error(err);
    }
  }
  getWeather().then(function(data) {
    console.log(data);
    document.querySelector(".city_name").innerHTML = data.city.name;
    // выводим температуру
    document.querySelector(".city_temp").innerHTML =
      Math.round(data.list[0].main.temp - 273) + "&deg;" + "C"; //текущая температура
    document.querySelector(".t1").innerHTML =
      Math.round(data.list[9].main.temp - 273) + "&deg;" + "C"; //температура +1 день
    document.querySelector(".t2").innerHTML =
      Math.round(data.list[17].main.temp - 273) + "&deg;" + "C"; //температура +2 день
    document.querySelector(".t3").innerHTML =
      Math.round(data.list[25].main.temp - 273) + "&deg;" + "C"; //температура +3 день
    document.querySelector(".t4").innerHTML =
      Math.round(data.list[33].main.temp - 273) + "&deg;" + "C"; //температура +4 день

    let day0 = data.list[0].weather[0]["icon"];
    let day1 = data.list[9].weather[0]["icon"];
    let day2 = data.list[17].weather[0]["icon"];
    let day3 = data.list[25].weather[0]["icon"];
    let day4 = data.list[33].weather[0]["icon"];
    let newIcon;

    //выводим иконки
    function switchCaseIcon(icon) {
      if (icon === day0) {
        newIcon = ".icon";
        swCa();
      }
      if (icon === day1) {
        newIcon = ".i1";
        swCa();
      }
      if (icon === day2) {
        newIcon = ".i2";
        swCa();
      }
      if (icon === day3) {
        newIcon = ".i3";
        swCa();
      }
      if (icon === day4) {
        newIcon = ".i4";
        swCa();
      }

      function swCa() {
        switch (icon) {
          case "03d":
          case "03n":
          case "04d":
          case "04n":
          case "50d":
          case "50n":
            document.querySelector(newIcon).innerHTML =
              "<img src='/img/animated/cloudy.svg'>";
            break;
          case "01d":
            document.querySelector(newIcon).innerHTML =
              "<img src='/img/animated/day.svg'>";
            break;
          case "01n":
            document.querySelector(newIcon).innerHTML =
              "<img src='/img/animated/night.svg'>";
            break;
          case "02d":
            document.querySelector(newIcon).innerHTML =
              "<img src='/img/animated/cloudy-day-3.svg'>";
            break;
          case "02n":
            document.querySelector(newIcon).innerHTML =
              "<img src='/img/animated/cloudy-night-3.svg'>";
            break;
          case "09d":
          case "09n":
            document.querySelector(newIcon).innerHTML =
              "<img src='/img/animated/rainy-6.svg'>";
            break;
          case "10d":
          case "10n":
            document.querySelector(newIcon).innerHTML =
              "<img src='/img/animated/rainy-1.svg'>";
            break;
          case "13d":
          case "13n":
            document.querySelector(newIcon).innerHTML =
              "<img src='/img/animated/snowy-6.svg'>";
            break;
          case "50d":
          case "50n":
            document.querySelector(newIcon).innerHTML =
              "<img src='/img/animated/snowy-6.svg'>";
            break;
          default:
            console.log("no");
            break;
        }
      }
    }
    switchCaseIcon(day0);
    switchCaseIcon(day2);
    switchCaseIcon(day3);
    switchCaseIcon(day4);

    switchCaseIcon(day1);
    document.querySelector(".state").textContent =
      data.list[0].weather[0].description;
    document.querySelector(".wind").innerHTML =
      "Ветер: " + data.list[0].wind.speed + " м/с";
    document.querySelector(".pressure").innerHTML =
      "Давление: " +
      Math.round(data.list[0].main.pressure * 0.75006375541921) +
      " мм рт. ст.";
  });
  let date = new Date();
  Data = new Date();

  // Получаем день недели текущий
  function getWeekDay(date) {
    let days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    return days[date.getDay()];
  }
  // Получаем месяц
  function getWeekMonthy(date) {
    let month = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"
    ];
    return month[date.getMonth()];
  }
  // получаем дату текущую
  Day = Data.getDate();
  document.querySelector(".date").innerHTML = `${getWeekDay(
    date
  )}, ${Day} ${getWeekMonthy(date)}, `;
  // Получаем время текущее
  function clock() {
    let date = new Date(),
      hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
      minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
      seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    document.querySelector(".times").innerHTML =
      hours + ":" + minutes + ":" + seconds;
  }
  setInterval(clock, 500);

  // Получаем 4е дня недели
  function getDayName(date, locale) {
    return date.toLocaleDateString(locale, {
      weekday: "long"
    });
  }
  let date0 = new Date(new Date().setDate(new Date().getDate() + 1));
  let date1 = new Date(new Date().setDate(new Date().getDate() + 2));
  let date2 = new Date(new Date().setDate(new Date().getDate() + 3));
  let date3 = new Date(new Date().setDate(new Date().getDate() + 4));
  document.querySelector(".n1").innerHTML = `${getDayName(date0, "ru-RU")}`;
  document.querySelector(".n2").innerHTML = `${getDayName(date1, "ru-RU")}`;
  document.querySelector(".n3").innerHTML = `${getDayName(date2, "ru-RU")}`;
  document.querySelector(".n4").innerHTML = `${getDayName(date3, "ru-RU")}`;
}

const interval = setInterval(() => {
  startWather();
}, 1000000);
