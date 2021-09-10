function double_digit(int) {
  const strint = `${int}`;
  if (strint.length === 1) {
    const back = "0".concat(strint);
    return back;
  }
  return strint;
}

function move_dvd(dvd, movement) {
  const dvdrect = dvd.getBoundingClientRect();
  const bodyrect = document.body.getBoundingClientRect();
  if (dvdrect.top < bodyrect.top || dvdrect.bottom > bodyrect.bottom - 1) {
    movement[0] = -movement[0];
  }
  if (dvdrect.left < bodyrect.left || dvdrect.right > bodyrect.right - 3) {
    movement[1] = -movement[1];
  }
  dvd.style.left = `${dvdrect.left + movement[1]}px`;
  dvd.style.top = `${dvdrect.top + movement[0]}px`;
  return movement;
}

function finish() {
  const main = document.getElementById("timer");
  main.innerHTML = "RUN!!!";
  main.style.color = "#ffbb34";
  main.style.fontSize = "600%";
  const dvd = document.getElementById("dvd");
  const movement = [4, 4];
  for (let i = 0; i < 30000; i++) {
    setInterval(move_dvd, 10, dvd, movement);
  }
}

function print_time(movement) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const times = [960, 905, 1070, 905, 960];
  const time = Date();
  const day = time.substr(0, 3);
  const dex = days.indexOf(day);
  const out = times[dex];
  const finishtime =
    new Date(
      `${time.substr(8, 2)}/${time.substr(4, 3)}/${time.substr(11, 4)}`
    ).getTime() /
      1000 +
    out * 60;
  const totaltime = ~~(finishtime - new Date().getTime() / 1000);
  if (totaltime < 0) {
    finish();
  }
  const seconds = document.getElementById("secs");
  const minutes = document.getElementById("mins");
  const hours = document.getElementById("hours");
  seconds.innerHTML = double_digit(totaltime % 60);
  minutes.innerHTML = double_digit(~~(totaltime / 60) % 60);
  hours.innerHTML = double_digit(~~(totaltime / 60 / 60));
  const dvd = document.getElementById("dvd");
  console.log(dvd.getBoundingClientRect().top);
  movement = move_dvd(dvd, movement);
  console.log(dvd.getBoundingClientRect().top);
  setTimeout(print_time, 10, movement);
}

window.addEventListener("load", function () {
  let movement = [3, 3];
  print_time(movement);
});
