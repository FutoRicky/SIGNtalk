const endpoint = 'http://aeaee510.ngrok.io/api';
const video_source = 'https://www.signingsavvy.com/';
var replay = [];
var playVideos = function(videos) {
  if(videos.length > 0) {
    video = videos.pop();
    $('#ss').attr("src", video_source + video);
    $('#myVideo').get(0).load();
    $('#myVideo').get(0).addEventListener('canplaythrough', function() {
      this.onended = function() {
        playVideos(videos);
      }
      this.play();
    });
  }
  return;
}

$(document).ready(function() {

  $('#speakButton').click(function() {
    var recognition = new webkitSpeechRecognition();


    $('#speakButton').text('recording...');

    // set properties
    recognition.lang = 'en';
    recognition.continuous = false;
    recognition.onresult = function(res) {
      var text = '';
      text = res.results[0][0].transcript;
      $('#display-text').css('display', 'block');
      $('#display-text').text(text);
      $('#speakButton').text('Start recording speech');
      $('.sign-language-container').css('display', 'flex');
      $('.sign-language-container').html("<img id='loader' src='assets/img/loader.gif' alt='loader'>");
      $.ajax({
        method: 'POST',
        url: endpoint + '/translation',
        data: { words: text.split(' ') }
      }).then(function(response) {
        replay = response.videos.reverse();
        videos = replay;
        playVideos(videos);
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
