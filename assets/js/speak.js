const endpoint = 'https://sign-talk-api.herokuapp.com/api';
const video_source = 'https://www.signingsavvy.com/';
var replay = [];
var playVideos = function(videos) {
  if(videos.length > 0) {
    video = videos.pop();
    $('#ss').attr("src", video_source + video);
    $('#myVideo').get(0).load();
    return $('#myVideo').get(0).addEventListener('canplaythrough', function() {
      this.onended = function() {
        playVideos(videos);
      }
      this.play();
    });
  }
  $('#myVideo').addClass('hidden');
  $('#replayButton').removeClass('hidden');
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
      $('.sign-language-container').append("<img id='loader' src='assets/img/loader.gif' alt='loader'>");
      $.ajax({
        method: 'POST',
        url: endpoint + '/translation',
        data: { words: text.split(' ') }
      }).then(function(response) {
        chrome.storage.local.set({ "videos": response.videos.reverse() });
        videos = response.videos;
        $('#loader').remove();
        $('#myVideo').removeClass('hidden');
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

  $('#replayButton').click(function() {
    chrome.storage.local.get(["videos"], function(item){
      $('#myVideo').removeClass('hidden');
      videos = item.videos
      playVideos(videos);
    });
  })

})
