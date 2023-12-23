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
