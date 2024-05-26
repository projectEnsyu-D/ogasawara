//時刻のDOM操作
function onDisplay(hour1, hour2, hour3, minutes1, minutes2, minutes3, isFirst,
  first, second, third, firstTo, secondTo, thirdTo
) {
  //First
  if(isFirst){
    document.getElementById(firstTo).innerHTML =
      "[始発] 0" + hour3 + ":" + ("00" + minutes1).slice(-2);
  }else if(minutes1 == -1){
    document.getElementById(firstTo).innerHTML = "本日の運行は終了しました";
  }else{
    document.getElementById(id1).innerHTML =
      hour1 + ":" + ("00" + minutes1).slice(-2);
  }

  //second
  if(minutes2 == -1){
    document.getElementById(second).style.display = "none";
    document.getElementById(secondTo).style.display = "none";
  }else{
    document.getElementById(secondTo).innerHTML =
      hour2 + ":" + ("00" + minutes2).slice(-2);
  }

  //third
  if(minutes2 == -1) {
    document.getElementById(third).style.display = "none";
    document.getElementById(thirdTo).style.display = "none";
  }else{
    document.getElementById(thirdTo).innerHTML =
      hour3 + ":" + ("00" + minutes3).slice(-2);
  }
}

//main
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

  //情報の出力用
  console.info(firstBusInfo);
  console.info(secondBusInfo);
  console.info(thirdBusInfo);
  console.log("================================");

  //バスの運行がない日の場合
  //HTMLに出力するためのDOM操作
  //やっぱりDOM操作はonDisplay関数にまとめる
  //onDisplayは複数回実行するからまとめられない
  if (firstBusInfo["schedule"] == "") {
    document.getElementById("daiya").innerHTML 
      = "本日バスの運行はありません";
    document.getElementById("subtitle").style.display = "none";
    document.getElementById("timeTable").style.display = "none";
    return;
  }

  //ダイヤの表示
  //これもonDisplay関数にまとめた方が良いかも
  //onDisplayは複数回実行するからまとめられない
  document.getElementById("daiya").innerHTML 
    = "今日は" + firstBusInfo["schedule"] + "ダイヤです";

  //onDisplay
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

//ここから実際に動く順番
main();

//タイマー処理
setInterval(function () {
  var nowTime = new Date();
  var nowSec = nowTime.getSeconds();
  if (nowSec == 0) {
    main();
  }
}, 1000);
