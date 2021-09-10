function double_digit(int) {
  const strint = `${int}`;
  if (strint.length === 1) {
    const back = "0".concat(strint);
    return back;
  }
  return strint;
}

function print_time() {
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
  const seconds = document.getElementById("secs");
  const minutes = document.getElementById("mins");
  const hours = document.getElementById("hours");
  seconds.innerHTML = double_digit(totaltime % 60);
  minutes.innerHTML = double_digit(~~(totaltime / 60) % 60);
  hours.innerHTML = double_digit(~~(totaltime / 60 / 60));
  setTimeout(print_time, 100);
}

window.addEventListener("load", function () {
  print_time();
});
