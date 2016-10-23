$(document).ready(function() {
  $('#speakButton').click(function() {
    var recognition = new webkitSpeechRecognition();
    // set properties
    recognition.lang = 'en';
    recognition.continuous = false;
    recognition.onresult = function(res) {
      var text = '';
      text = res.results[0][0].transcript;
      console.log(text.split(' '));
    };
    recognition.onerror = function(event) {
      if (event.error === 'not-allowed') {
        window.open(chrome.extension.getURL('audioPermission.html'));
      }
    }
    recognition.start();
  })
})
