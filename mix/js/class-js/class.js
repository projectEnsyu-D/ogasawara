/*ローカルストレージ*/
let data = {};

window.onload = function() {
    shutoku();
};

function shutoku() {
    let lokal = localStorage.getItem("table_data");
    if (lokal) {
        data = JSON.parse(lokal);
        console.log(lokal);
        restoreTable(data);
    }
}

function saveClass() {
    let className = document.getElementById("class-name").value;
    let dayOfWeek = document.getElementById("day-of-week").value;
    let time = document.getElementById("time").value;
    let unit = document.getElementById("unit").value;
    let room = document.getElementById("room").value;

    let cellId = getCellId(dayOfWeek, time);
    let cell = document.getElementById(cellId);
    if (cell) {
        cell.innerHTML = `${className} (${room})`;
        // データをlocalStorageに保存する
        let cellData = { className: className, dayOfWeek: dayOfWeek, time: time, unit: unit, room: room };
        data[cellId] = cellData; // オブジェクト形式で保存

        localStorage.setItem("table_data", JSON.stringify(data));
    }
}


function getCellId(dayOfWeek, time) {
    let days = { "月": "a", "火": "b", "水": "c", "木": "d", "金": "e" };
    if (days[dayOfWeek] && time >= 1 && time <= 6) {
        return days[dayOfWeek] + time;
    }
    return null;
}

function clicked(id) {
    let cell = document.getElementById(id);
    let dayOfWeek = getDayOfWeekFromCellId(id[0]);
    let time = id[1];

    document.getElementById("day-of-week").value = dayOfWeek;
    document.getElementById("time").value = time;
}

function getDayOfWeekFromCellId(cellId) {
    let days = { "a": "月", "b": "火", "c": "水", "d": "木", "e": "金" };
    return days[cellId];
}

function restoreTable(data) {
    for (let cellId in data) {
        let cell = document.getElementById(cellId);
        if (cell) {
            let cellData = data[cellId];
            if (cellData) {
                let { className, room } = cellData;
                cell.innerHTML = `${className} (${room})`;
            }
        }
    }
}

/*現在の曜日を取得*/
function WeekDay() {
    var today = new Date();
    var weekday = ["日", "月", "火", "水", "木", "金", "土"];
    var days = { "日": "a", "月": "a", "火": "b", "水": "c", "木": "d", "金": "e", "土": "a" };
    var day = weekday[today.getDay()];
    var prefix = days[day];
    var wday = day + "曜日";

    document.getElementById("weekday").innerText = "今日は " + wday;

    for (var i = 1; i <= 6; i++) {
        ["a", "b", "c", "d", "e"].forEach(function(d) {
            var cell = document.getElementById(d + i);
            if (cell) {
                cell.style.display = d === prefix ? "" : "none";
            }
        });
    }
}

window.onload = function() {
    WeekDay();
    loadSavedData();
};

function clicked(id) {
    let cell = document.getElementById(id);
    let dayOfWeek = getDayOfWeekFromCellId(id[0]);
    let time = id[1];
    document.getElementById("day-of-week").value = dayOfWeek;
    document.getElementById("time").value = time;
}

function getDayOfWeekFromCellId(cellId) {
    let days = { "a": "月", "b": "火", "c": "水", "d": "木", "e": "金" };
    return days[cellId];
}
function loadSavedData() {
    let lokal = localStorage.getItem("table_data");
    if (lokal) {
        data = JSON.parse(lokal);
        displaySavedData(data);
    }
}

function displaySavedData(data) {
    for (let cellId in data) {
        let cell = document.getElementById(cellId);
        if (cell) {
            let cellData = data[cellId];
            if (cellData) {
                let { className, room } = cellData;
                cell.innerHTML = `${className} (${room})`;
            }
        }
    }
}






