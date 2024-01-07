function levelUp() {
  var inputTextElement = document.getElementById("inputText");
  var inputText = inputTextElement.value;
  var outputHtml = processLevelUp(inputText);
  document.getElementById("outputText2").innerHTML = outputHtml;
  inputTextElement.classList.add("blurred");
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

// function checkLevelUp(input, correctWord) {
//   var fullWord = correctWord;
//   var sanitizedCorrectWord = correctWord.replace(
//     /[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,
//     ""
//   );
//   replaceCharacters(input);
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
//     updateInputBackground(input, sanitizedCorrectWord);
//   }

//   input.addEventListener("input", function () {
//     updateInputBackground(input, sanitizedCorrectWord);
//   });
// }
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

    // Tự động lưu từ và tạo hiệu ứng rơi xuống khi nhập đúng
    saveWord(fullWord);
    createFallingEffect(wordSpan);

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
