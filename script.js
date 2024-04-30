const RANDAM_SENTENCE_URL_API ="https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");

const typeSound = new Audio("./audio/typing-sound.mp3");
const wrongSound = new Audio("./audio/wrong.mp3");
const correctSound = new Audio("./audio/correct.mp3");



// inputText入力の正誤判定
typeInput.addEventListener("input", () => {
    // タイプ音
    typeSound.play();
    typeSound.currentTime = 0;


    const sentenceArray = typeDisplay.querySelectorAll("span");
    // console.log(sentenceArray);
    const arrayValue = typeInput.value.split("");

    let correct = true;

    sentenceArray.forEach((characterSpan, index) => {
        if((arrayValue[index] == null)){
            characterSpan.classList.remove("correct");
            characterSpan.classList.remove("incorrect");
            correct = false;
        }
        else if(characterSpan.innerText == arrayValue[index]){
            characterSpan.classList.add("correct");
            characterSpan.classList.remove("incorrect");

        } else{
            characterSpan.classList.add("incorrect");
            characterSpan.classList.remove("correct");

            wrongSound.volume = 0.8;
            wrongSound.play();
            wrongSound.currentTime = 0;
            correct = false;
        }
    });

    if (correct == true){
        correctSound.play();
        correctSound.currentTime = 0;
        RenderNextSentence();
    }
});

function GetRandomSentence(){
    return fetch(RANDAM_SENTENCE_URL_API)
    .then((resonse) => resonse.json())
    .then((data) => data.content);
}

async function RenderNextSentence() {
    const sentence = await GetRandomSentence();
    /* ディスプレイに表示 */
    typeDisplay.innerText = ""; //最初はsentenceが入ってた。
    /* 文章を1文字ずつ分解して、spanタグを生成する(クラス付与のため) */
    sentence.split("").forEach((character) => {
      const characterSpan = document.createElement("span");
      // characterSpan.classList.add("correct");
      characterSpan.innerText = character;
      typeDisplay.appendChild(characterSpan);
      /* 確認 */
      console.log(characterSpan);
    });
    /* テキストボックスの中身を消す。 */
    typeInput.value = null;
  
    /* タイマーのリセット */
    statTimer();
  }

let statTime;
let originTime = 30;
function statTimer(){
    timer.innerText = originTime;
    statTime = new Date();
    setInterval(() => {
        timer.innerText = originTime - getTimerTime();
        if (timer.innerText <= 0) TimeUp();
    }, 1000);
}

function getTimerTime(){
    return Math.floor((new Date() -statTime) / 1000);
}

function TimeUp(){
    RenderNextSentence();
}

RenderNextSentence();
