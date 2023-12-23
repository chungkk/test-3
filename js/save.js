function saveWord(word) {
  var savedWordsDiv = document.getElementById("savedWords");
  var currentSavedWords = savedWordsDiv.innerText;

  if (!currentSavedWords.includes(word)) {
    savedWordsDiv.innerHTML += `<span class="saved-word">${word}</span>, `;
  }
}

function createFallingEffect(element) {
  var rect = element.getBoundingClientRect();
  var fallingWord = element.cloneNode(true);
  fallingWord.style.position = "absolute";
  fallingWord.style.left = rect.left + "px";
  fallingWord.style.top = rect.top + "px";
  fallingWord.style.zIndex = 1000;
  document.body.appendChild(fallingWord);

  var targetRect = document
    .getElementById("savedWords")
    .getBoundingClientRect();
  fallingWord.animate(
    [
      { transform: "translateY(0px)" },
      { transform: `translateY(${targetRect.top - rect.top}px)` },
    ],
    {
      duration: 1000,
      easing: "ease-in",
    }
  ).onfinish = function () {
    fallingWord.remove();
  };
}
