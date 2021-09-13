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

function finish(movement, time) {
  if (time++ > 3000) {
    console.log("again");
    return;
  }
  const main = document.getElementById("timer");
  main.innerHTML = "RUN!!!";
  main.style.color = "#ffbb34";
  main.style.fontSize = "600%";
  const dvd = document.getElementById("dvd");
  movement = move_dvd(dvd, movement);
  setTimeout(finish, 5, movement, time);
}

function reload() {
  const hour = document.createElement("p");
  hour.setAttribute("id", "hours");
  const semi1 = document.createElement("p");
  semi1.innerHTML = ":";
  semi1.setAttribute("id", "semi1");
  const semi2 = document.createElement("p");
  semi2.innerHTML = ":";
  semi2.setAttribute("id", "semi2");
  const min = document.createElement("p");
  min.setAttribute("id", "mins");
  const sec = document.createElement("p");
  sec.setAttribute("id", "secs");
  const main = document.getElementById("timer");
  main.appendChild(hour);
  main.appendChild(semi1);
  main.appendChild(min);
  main.appendChild(semi2);
  main.appendChild(sec);
}

function print_time(movement) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const times = [960, 905, 1070, 905, 960];
  const time = Date();
  const day = time.substr(0, 3);
  const dvd = document.getElementById("dvd");
  if (day === "Sat" || day === "Sun") {
    const main = document.getElementById("timer");
    main.innerHTML = "See you on Monday ;)";
    main.style.color = "#ffbb34";
    main.style.fontSize = "400%";
    movement = move_dvd(dvd, movement);
    setTimeout(print_time, 10, movement);
  }
  const dex = days.indexOf(day);
  const out = times[dex];
  const finishtime =
    new Date(
      `${time.substr(8, 2)}/${time.substr(4, 3)}/${time.substr(11, 4)}`
    ).getTime() /
      1000 +
    out * 60;
  const totaltime = ~~(finishtime - new Date().getTime() / 1000);
  if (totaltime < -100) {
    const main = document.getElementById("timer");
    main.innerHTML = "See you tomorrow :)";
    main.style.color = "#ffbb34";
    main.style.fontSize = "400%";
  }
  if (totaltime < 0 && totaltime > -100) {
    finish([4, 4], 0);
  }
  if (totaltime > 0) {
    if (!document.getElementById("secs")) {
      reload();
      console.log("reloading");
    }
    const seconds = document.getElementById("secs");
    const minutes = document.getElementById("mins");
    const hours = document.getElementById("hours");
    seconds.innerHTML = double_digit(totaltime % 60);
    minutes.innerHTML = double_digit(~~(totaltime / 60) % 60);
    hours.innerHTML = double_digit(~~(totaltime / 60 / 60));
    movement = move_dvd(dvd, movement);
  }
  setTimeout(print_time, 10, movement);
}

window.addEventListener("load", function () {
  let movement = [3, 3];
  print_time(movement);
});
