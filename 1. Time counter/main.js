const daysHTML = document.querySelector("#days");
const hoursHTML = document.querySelector("#hours");
const minutesHTML = document.querySelector("#minutes");
const secondsHTML = document.querySelector("#seconds");

const newYearDate = new Date('2022-12-31T00:00');

const updateTime = () => {
    const currDate = new Date();
    const totalSeconds = (newYearDate - currDate) / 1000;

    let days = Math.floor(totalSeconds / (3600 * 24));
    let hours = Math.floor(totalSeconds / 3600) % 24;
    let minutes = Math.floor(totalSeconds / 60) % 60;
    let seconds = Math.floor(totalSeconds % 60);

    daysHTML.textContent = days;
    hoursHTML.textContent = formatTime(hours);
    minutesHTML.textContent = formatTime(minutes);
    secondsHTML.textContent = formatTime(seconds);
}

const formatTime = (time) =>{
    return time < 10 ? `0${time}` : time;
}

updateTime();
setInterval(updateTime, 1000);