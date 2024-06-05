//時刻のDOM操作
function onDisplay(
  hour1,
  hour2,
  hour3,
  minutes1,
  minutes2,
  minutes3,
  isFirst,
  first,
  second,
  third,
  firstTo,
  secondTo,
  thirdTo
) {
  //一番近いダイヤ
  if (isFirst) {
    document.getElementById(firstTo).innerText =
      "[始発] 0" + hour1 + ":" + ("00" + minutes1).slice(-2);
  } else if (minutes1 == -1 || minutes1 == undefined) {
    document.getElementById(first).style.display = "none";
    document.getElementById(firstTo).style.marginTop = "10px";
    document.getElementById(firstTo).innerText = "本日の運行は終了しました";
  } else {
    document.getElementById(firstTo).innerText =
      hour1 + ":" + ("00" + minutes1).slice(-2);
  }

  //2番目に近いダイヤ
  if (minutes2 == -1 || minutes2 == undefined) {
    document.getElementById(second).style.display = "none";
    document.getElementById(secondTo).style.display = "none";
  } else {
    document.getElementById(secondTo).innerText =
      hour2 + ":" + ("00" + minutes2).slice(-2);
  }

  //3番目に近いダイヤ
  if (minutes3 == -1 || minutes3 == undefined) {
    document.getElementById(third).style.display = "none";
    document.getElementById(thirdTo).style.display = "none";
  } else {
    document.getElementById(thirdTo).innerText =
      hour3 + ":" + ("00" + minutes3).slice(-2);
  }
}

async function main() {
  //バスダイヤの取得
  const firstBusInfoUrl = "https://bus-api.bigbell.dev/api/v1/nextbus?offset=0";
  const secondBusInfoUrl = "https://bus-api.bigbell.dev/api/v1/nextbus?offset=1";
  const thirdBusInfoUrl = "https://bus-api.bigbell.dev/api/v1/nextbus?offset=2";

  const firstBusInfo = await fetch(firstBusInfoUrl).then((response) =>
    response.json()
  );
  const secondBusInfo = await fetch(secondBusInfoUrl).then((response) =>
    response.json()
  );
  const thirdBusInfo = await fetch(thirdBusInfoUrl).then((response) =>
    response.json()
  );

  //apiの取得結果の表示
  console.info(firstBusInfo);
  console.info(secondBusInfo);
  console.info(thirdBusInfo);
  console.log("================================");

  //バスの運行がない日の場合
  if (firstBusInfo["schedule"] == "") {
    document.getElementById("daiya").innerText = "本日バスの運行はありません";
    document.getElementById("subtitle").style.display = "none";
    document.getElementById("timeTable").style.display = "none";
    return;
  }

  //ダイヤの表示
  document.getElementById("daiya").innerText =
    "今日は" + firstBusInfo["schedule"] + "ダイヤです";

  //愛工大行き
  onDisplay(
    firstBusInfo["nextHourToAIT"],
    secondBusInfo["nextHourToAIT"],
    thirdBusInfo["nextHourToAIT"],
    firstBusInfo["nextMinuteToAIT"],
    secondBusInfo["nextMinuteToAIT"],
    thirdBusInfo["nextMinuteToAIT"],
    firstBusInfo["busState"]["IsFirst"],
    "firstAit",
    "secondAit",
    "thirdAit",
    "firstToAit",
    "secondToAit",
    "thirdToAit"
  );

  //八草行き
  onDisplay(
    firstBusInfo["nextHourToYakusa"],
    secondBusInfo["nextHourToYakusa"],
    thirdBusInfo["nextHourToYakusa"],
    firstBusInfo["nextMinuteToYakusa"],
    secondBusInfo["nextMinuteToYakusa"],
    thirdBusInfo["nextMinuteToYakusa"],
    firstBusInfo["busState"]["IsFirst"],
    "firstYakusa",
    "secondYakusa",
    "thirdYakusa",
    "firstToYakusa",
    "secondToYakusa",
    "thirdToYakusa"
  );
}

main();

//タイマー処理
setInterval(function () {
  var nowTime = new Date();
  var nowSec = nowTime.getSeconds();
  if (nowSec == 0) {
    main();
  }
}, 1000);
