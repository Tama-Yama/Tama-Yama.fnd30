'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// 天気（配列）
const weatherList = ["晴れ", "曇り", "雨"];
// 風量（配列）
const windList = ["強風","そよ風","無風"]
// 季節（配列）
const seasonList = ["春", "夏", "秋", "冬"];

// 再エネ発電量算出関数
// ①太陽光発電量（ランダム関数で出した天気を引数とする。天気の値に応じて条件分岐。数値（発電量）を返す）
const solarPowerSimulate = function(weather){
        if(weather === "晴れ"){
            return 8;
        }else if(weather === "曇り"){
            return 3;     
        }else if(weather === "雨"){
            return 1;   
        }
    };

// ②風力発電量（ランダム関数で出した風量を引数とする。風量の値に応じて条件分岐。数値（発電量）を返す）
const windPowerSimulate = function(wind){
        if(wind === "強風"){
            return 4;            
        }else if(wind === "そよ風"){
            return 2; 
        }else if(wind === "無風"){
            return 0; 
        }
    };

// ランダム関数（ランダムで天気と風量と季節を決める関数。）

let randomWeatherItem = weatherList[Math.floor(Math.random() * weatherList.length)];
let randomWindItem = windList[Math.floor(Math.random() * windList.length)];
let randomSeasonItem = seasonList[Math.floor(Math.random() * seasonList.length)];


// 再エネ発電量算出関数の引数に、ランダム関数で算出した天気・風量を入れ、今日の再エネ発電量を確定させる。

let todaySolarPower = solarPowerSimulate(randomWeatherItem);
let todayWindPower = windPowerSimulate(randomWindItem);
let todayRenewablePower = todaySolarPower + todayWindPower;


// 電力需要量（季節を引数とする。季節の値に応じて条件分岐。数値（需要量）を返す）
const consumptionSimulate = function(season){
        if(season === "春"){
            return 22;
        }else if(season === "夏"){
            return 26;     
        }else if(season === "秋"){
            return 22;   
        }else if(season === "冬"){
            return 26;  
        }
    };

//ランダム関数で出した季節を代入し、今日の電力需要量を確定させる。
let consumption = consumptionSimulate(randomSeasonItem);

// 火力発電量算出。fuelSelectedByUserはユーザーの入力値。
const fuelPowerSimulate = function(fuelSelectedByUser){
        if(fuelSelectedByUser === "very-small"){
            return 5; 
        }else if(fuelSelectedByUser === "small"){
            return 10; 
        }else if(fuelSelectedByUser === "middle"){
            return 15; 
        }else if(fuelSelectedByUser === "large"){
            return 20; 
        }else if(fuelSelectedByUser === "very-large"){
            return 25; 
        }
};

// ID指定したHTML要素にInnerTextプロパティで文章を追加する。「ランダムで決まる天気と風量を表示する場所」にわたす。
document.querySelector("#weatherDisplay").innerText = randomWeatherItem;
document.querySelector("#windDisplay").innerText = randomWindItem;
document.querySelector("#seasonDisplay").innerText = randomSeasonItem;

// ID＝Jedgeをもつ要素で、第一引数のクリック操作が行われると、イベントリスナーが作動し、第二引数の関数が処理される。

document.querySelector("#judge").addEventListener("click", () => {
    let fuelSelectedUser = document.querySelector("#fuelSelect").value;
    let todayFuelPower = fuelPowerSimulate(fuelSelectedUser);
    let todayPower = todayRenewablePower + todayFuelPower;
        if (5 >= Math.abs(todayPower - consumption)) {
            document.querySelector("#result").innerText = "ありがとう！あなたのおかげで電力の同時同量が保たれました！";
            document.querySelector("#resultText").innerText= `本日の需要＝供給量は、約 ${(todayPower + consumption)/2} 億kWhでした。内訳は以下の通りです。火力発電量： ${todayFuelPower} 億kWh、太陽光発電量： ${todaySolarPower} 億kWh、風力発電量： ${todayWindPower} 億kWh。`;
        }
        else{
            document.querySelector("#result").innerText = "火力発電量が不足または過剰のようだ…。Let's Agein!🥲";
            document.querySelector("#resultText").innerText= "";
        }
    }
);


//ID=をもつ要素で、第一引数のクリック操作が行われると、イベントリスナーが作動し、ランダム関数が再び処理され、季節、天気、風量が更新され、結果発表のInnerTextが初期化される。
document.querySelector("#constraintsReflesh").addEventListener("click", () => {
    randomWeatherItem = weatherList[Math.floor(Math.random() * weatherList.length)];
    randomWindItem = windList[Math.floor(Math.random() * windList.length)];
    randomSeasonItem = seasonList[Math.floor(Math.random() * seasonList.length)];
    todaySolarPower = solarPowerSimulate(randomWeatherItem);
    todayWindPower = windPowerSimulate(randomWindItem);
    todayRenewablePower = todaySolarPower + todayWindPower;
    consumption = consumptionSimulate(randomSeasonItem);
    document.querySelector("#weatherDisplay").innerText = randomWeatherItem;
    document.querySelector("#windDisplay").innerText = randomWindItem;
    document.querySelector("#seasonDisplay").innerText = randomSeasonItem;
    document.querySelector("#result").innerText = "";
    document.querySelector("#resultText").innerText= "";
    }
)

const clickBtn = document.getElementById('click-btn');
const popupWrapper = document.getElementById('popup-wrapper');
const close = document.getElementById('close');

// ボタンをクリックしたときにポップアップを表示させる
clickBtn.addEventListener('click', () => {
  popupWrapper.style.display = "block";
});

// ポップアップの外側又は「x」のマークをクリックしたときポップアップを閉じる
popupWrapper.addEventListener('click', e => {
  if (e.target.id === popupWrapper.id || e.target.id === close.id) {
    popupWrapper.style.display = 'none';
  }
});
