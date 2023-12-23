const SEEK_STEP = 3;
const AUDIO_PLAYER = document.getElementById("audioPlayer");
const TOGGLE_PLAY_PAUSE_BUTTON = document.getElementById("togglePlayPause");
const STOP_BUTTON = document.getElementById("stopButton");
const SEEK_FORWARD_BUTTON = document.getElementById("seekForwardButton");
const SEEK_BACKWARD_BUTTON = document.getElementById("seekBackwardButton");

TOGGLE_PLAY_PAUSE_BUTTON.addEventListener("click", togglePlayPause);
STOP_BUTTON.addEventListener("click", stopAudio);
SEEK_FORWARD_BUTTON.addEventListener("click", seekForward);
SEEK_BACKWARD_BUTTON.addEventListener("click", seekBackward);

AUDIO_PLAYER.src = ""; // Thay thế bằng đường dẫn tới tệp MP3 của bạn

function togglePlayPause() {
  if (AUDIO_PLAYER.paused) {
    AUDIO_PLAYER.play();
    TOGGLE_PLAY_PAUSE_BUTTON.textContent = "Pause";
  } else {
    AUDIO_PLAYER.pause();
    TOGGLE_PLAY_PAUSE_BUTTON.textContent = "Play";
  }
}

function stopAudio() {
  AUDIO_PLAYER.pause();
  AUDIO_PLAYER.currentTime = 0;
}

function seekForward() {
  AUDIO_PLAYER.currentTime += SEEK_STEP;
}

function seekBackward() {
  AUDIO_PLAYER.currentTime -= SEEK_STEP;
}

function processSentence(sentence) {
  const sentences = sentence.split(/\n+/); // Tách văn bản thành các câu dựa trên xuống dòng

  const processedSentences = sentences.map((sentence) => {
    const words = sentence.split(/\s+/); // Tách câu thành các từ dựa trên khoảng trắng

    const processedWords = words.map((word) => {
      var pureWord = word.replace(/[^a-zA-Z0-9üäöÜÄÖß]/g, "");
      if (pureWord.length > 1) {
        var nonAlphaNumeric = word.replace(/[a-zA-Z0-9üäöÜÄÖß]/g, "");
        return `<span class="word-container"><span class="first-letter">${
          pureWord[0]
        }</span><input type="text" class="word-input" oninput="checkWord(this, '${pureWord.substr(
          1
        )}')" onkeydown="disableArrowKeys(event)" maxlength="${
          pureWord.length - 1
        }" size="${pureWord.length - 1}" />${nonAlphaNumeric}</span>`;
      }
      return `<span>${word}</span>`;
    });

    return processedWords.join(" ") + "<br>"; // Kết hợp các từ và thêm thẻ <br> ở cuối mỗi câu
  });

  return processedSentences.join("<br>"); // Kết hợp các câu và thêm thẻ <br> ở cuối mỗi đoạn
}

function processLevelUp(sentence) {
  const sentences = sentence.split(/\n+/); // Tách văn bản thành các câu dựa trên xuống dòng

  const processedSentences = sentences.map((sentence) => {
    const words = sentence.split(/\s+/); // Tách câu thành các từ dựa trên khoảng trắng

    const processedWords = words.map((word) => {
      var pureWord = word.replace(/[^a-zA-Z0-9üäöÜÄÖß]/g, "");
      if (pureWord.length >= 1) {
        // Loại bỏ cả ký tự đầu tiên của từ
        var nonAlphaNumeric = word.replace(/[a-zA-Z0-9üäöÜÄÖß]/g, "");
        return `<span class="word-container"><input type="text" class="word-input" oninput="checkLevelUp(this, '${pureWord}')" onkeydown="disableArrowKeys(event)" maxlength="${pureWord.length}" size="${pureWord.length}" />${nonAlphaNumeric}</span>`;
      }
      return `<span>${word}</span>`;
    });

    return processedWords.join(" ") + "<br>"; // Kết hợp các từ và thêm thẻ <br> ở cuối mỗi câu
  });

  return processedSentences.join("<br>"); // Kết hợp các câu và thêm thẻ <br> ở cuối mỗi đoạn
}

function saveFunctionsToLocal() {
  const processSentenceString = JSON.stringify(processSentence);
  const processLevelUpString = JSON.stringify(processLevelUp);

  localStorage.setItem("processSentence", processSentenceString);
  localStorage.setItem("processLevelUp", processLevelUpString);
}

function loadFunctionsFromLocal() {
  const storedProcessSentence = localStorage.getItem("processSentence");
  const storedProcessLevelUp = localStorage.getItem("processLevelUp");

  window.processSentence = new Function(
    "sentence",
    `return ${storedProcessSentence}`
  );
  window.processLevelUp = new Function(
    "sentence",
    `return ${storedProcessLevelUp}`
  );
}

function loadContent(textFile, audioFile) {
  var inputTextElement = document.getElementById("inputText");
  var audio = document.getElementById("audioPlayer");

  fetch(textFile)
    .then((response) => response.text())
    .then((data) => {
      inputTextElement.value = data;
      audio.src = audioFile;
      audio.load();
    });
}

function disableSpaceKey(e) {
  if (e.keyCode === 32) {
    e.preventDefault();
  }
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();
    togglePlayPause();
  } else if (e.code === "ArrowLeft") {
    e.preventDefault();
    seekBackward();
  } else if (e.code === "ArrowRight") {
    e.preventDefault();
    seekForward();
  }
});

function findNextInput(currentInput) {
  // Lấy danh sách tất cả các ô nhập dữ liệu
  var allInputs = document.querySelectorAll(".word-input");

  // Tìm vị trí của currentInput trong danh sách
  var currentIndex = Array.from(allInputs).indexOf(currentInput);

  // Lấy ô nhập dữ liệu tiếp theo (nếu có)
  var nextInput = allInputs[currentIndex + 1];

  return nextInput;
}

function disableArrowKeys(e) {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
    e.preventDefault();
  }
}

function levelUp() {
  var inputTextElement = document.getElementById("inputText");
  var inputText = inputTextElement.value;
  var outputHtml = processLevelUp(inputText);
  document.getElementById("outputText").innerHTML = outputHtml;
  inputTextElement.classList.add("blurred");
}

function checkLevelUp(input, correctWord) {
  var fullWord = correctWord;
  var sanitizedCorrectWord = correctWord.replace(
    /[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,
    ""
  );
  replaceCharacters(input);
  if (input.value.toLowerCase() === sanitizedCorrectWord.toLowerCase()) {
    var wordSpan = document.createElement("span");
    wordSpan.className = "correct-word";
    wordSpan.innerText = fullWord;
    wordSpan.onclick = function () {
      saveWord(fullWord);
      createFallingEffect(wordSpan);
    };
    input.parentNode.replaceWith(wordSpan);

    // Tìm ô nhập dữ liệu tiếp theo và kích hoạt nó
    var nextInput = findNextInput(input);
    if (nextInput) {
      nextInput.focus();
    }
  } else {
    updateInputBackground(input, sanitizedCorrectWord);
  }

  input.addEventListener("input", function () {
    updateInputBackground(input, sanitizedCorrectWord);
  });
}

function loadSelectedExercise() {
  var selectElement = document.getElementById("selectExercise");
  var selectedOption = selectElement.options[selectElement.selectedIndex];
  var values = selectedOption.value.split(",");
  var textFile = values[0];
  var audioFile = values[1];

  var inputTextElement = document.getElementById("inputText");
  var audio = document.getElementById("audioPlayer");

  fetch(textFile)
    .then((response) => response.text())
    .then((data) => {
      inputTextElement.value = data;
      audio.src = audioFile;
      audio.load();
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadContent("text/text1.txt", "mp3/bai1.mp3");
  loadFunctionsFromLocal(); // Load hàm từ localStorage
});
