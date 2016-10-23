navigator.webkitGetUserMedia({
    audio: true,
}, function() {
    // Now you know that you have audio permission. Do whatever you want...
}, function() {
    // Aw. No permission (or no microphone available).
});
