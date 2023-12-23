function checkWord(input, correctWord) {
  var fullWord = input.previousElementSibling.innerText + correctWord;
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
    // replaceCharacters(input);
  });
}
// function checkWord(input, correctWord) {
//   var fullWord = input.previousElementSibling.innerText + correctWord;
//   var sanitizedCorrectWord = correctWord.replace(
//     /[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,
//     ""
//   );
//   replaceCharacters(input);

//   function updateInput() {
//     updateInputBackground(input, sanitizedCorrectWord);
//     saveState(); // Lưu trạng thái sau mỗi lần người dùng nhập
//   }

//   if (input.value.toLowerCase() === sanitizedCorrectWord.toLowerCase()) {
//     var wordSpan = document.createElement("span");
//     wordSpan.className = "correct-word";
//     wordSpan.innerText = fullWord;
//     wordSpan.onclick = function () {
//       saveWord(fullWord);
//       createFallingEffect(wordSpan);
//     };
//     input.parentNode.replaceWith(wordSpan);

//     // Tìm ô nhập dữ liệu tiếp theo và kích hoạt nó
//     var nextInput = findNextInput(input);
//     if (nextInput) {
//       nextInput.focus();
//     }
//   } else {
//     updateInput();
//   }

//   input.addEventListener("input", function () {
//     updateInput();
//   });
// }

function findNextInput(currentInput) {
  // Lấy danh sách tất cả các ô nhập dữ liệu
  var allInputs = document.querySelectorAll(".word-input");

  // Tìm vị trí của currentInput trong danh sách
  var currentIndex = Array.from(allInputs).indexOf(currentInput);

  // Lấy ô nhập dữ liệu tiếp theo (nếu có)
  var nextInput = allInputs[currentIndex + 1];

  return nextInput;
}

let lastKeyPressTime = 0; // Biến để lưu thời gian lần gõ ký tự cuối cùng
const transformationDelay = 1000; // Khoảng thời gian giữa hai lần gõ (1 giây)

function replaceCharacters(input) {
  const currentTime = new Date().getTime(); // Lấy thời gian hiện tại
  const timeDiff = currentTime - lastKeyPressTime;

  const transformations = [
    { find: "ae", replace: "ä" },
    { find: "oe", replace: "ö" },
    { find: "ue", replace: "ü" },
    { find: "ss", replace: "ß" },
    // Thêm các cặp thay thế khác ở đây nếu cần
  ];

  if (timeDiff < transformationDelay) {
    // Kiểm tra nếu thời gian giữa hai lần gõ liên tiếp nhỏ hơn khoảng thời gian đặt trước
    for (const transformation of transformations) {
      if (input.value.includes(transformation.find)) {
        input.value = input.value.replace(
          new RegExp(transformation.find, "g"),
          transformation.replace
        );
      }
    }
  }

  lastKeyPressTime = currentTime; // Cập nhật thời gian lần gõ ký tự cuối cùng
}

function updateInputBackground(input, correctWord) {
  if (
    input.value.toLowerCase() ===
    correctWord.substring(0, input.value.length).toLowerCase()
  ) {
    input.style.backgroundColor = "lightgreen";
  } else {
    input.style.backgroundColor = "red";
  }
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
      levelUp(); // Tự động xử lý văn bản khi chọn bài
    });
}
function loadRandomExercise() {
  var selectElement = document.getElementById("selectExercise");
  // Chọn index cố định hoặc index mong muốn
  var fixedIndex = 0; // Đặt giá trị index cố định, ví dụ: Bài 1
  selectElement.selectedIndex = fixedIndex;
  loadSelectedExercise();
}

document.addEventListener("DOMContentLoaded", function () {
  loadRandomExercise();
});
// ==========================
// ==========================
// ==========================
function saveState() {
  var allInputs = document.querySelectorAll(".word-input");
  var state = {};

  allInputs.forEach(function (input, index) {
    state["input_" + index] = input.value;
  });

  localStorage.setItem("exerciseState", JSON.stringify(state));
}
function restoreState() {
  var savedState = localStorage.getItem("exerciseState");

  if (savedState) {
    savedState = JSON.parse(savedState);
    var allInputs = document.querySelectorAll(".word-input");

    allInputs.forEach(function (input, index) {
      var savedValue = savedState["input_" + index];
      if (savedValue !== undefined) {
        input.value = savedValue;
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  restoreState();
  loadRandomExercise();
});
