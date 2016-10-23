var endpoint = '';
$(document).ready(function() {
  $('#speakButton').click(function() {
    var recognition = new webkitSpeechRecognition();
    // set properties
    recognition.lang = 'en';
    recognition.continuous = false;
    recognition.onresult = function(res) {
      var text = '';
      text = res.results[0][0].transcript;
      $.ajax({
        method: 'POST',
        url: endpoint + '/translate',
        data: { words: text.split(' ') }
      }).then(function(response) {
        for(var i = 0; i < reponse.length; i++) {
          // Do video logic here
        }
      })
    };
    recognition.onerror = function(event) {
      if (event.error === 'not-allowed') {
        window.open(chrome.extension.getURL('audioPermission.html'));
      }
    }
    recognition.start();
  })
})
