var showSpeech = function(response) {
  // debugger;
  $('#videoParagraph').text()
}

$(document).ready(function() {

  $('#speakButton').click(function() {
    var recognition = new webkitSpeechRecognition();
    // set properties
    recognition.lang = 'en';
    recognition.continuous = false;
    recognition.onresult = function() {
      console.log(response);
    };
    recognition.onerror = function(event) {
      if (event.error === 'not-allowed') {
        console.log('this happened');
        window.open(chrome.extension.getURL('audioPermission.html'), '_blank');
      }
    }
    // recognition.onend = function() {
    //   recognition.end();
    // }
    recognition.start();
  })
})
