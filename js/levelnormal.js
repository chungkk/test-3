function processText() {
  var inputTextElement = document.getElementById("inputText");
  var inputText = inputTextElement.value;
  var outputHtml = processSentence(inputText);
  document.getElementById("outputText").innerHTML = outputHtml;
  inputTextElement.classList.add("blurred");
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
