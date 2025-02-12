function openYouTube(event) {
    event.preventDefault(); // Prevent default navigation
    const videoId = "U-h2b75Swh0"; // Replace with actual video ID

    const iosAppUrl = "youtube://www.youtube.com/watch?v=" + videoId;
    const androidAppUrl = "intent://www.youtube.com/watch?v=" + videoId + "#Intent;package=com.google.android.youtube;scheme=https;end;";
    const webUrl = "https://www.youtube.com/watch?v=" + videoId;

    // Detect if the user is on iOS or Android
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isIOS) {
        window.location.href = iosAppUrl;
    } else if (isAndroid) {
        window.location.href = androidAppUrl;
    } else {
        window.location.href = webUrl;
    }

    // Fallback to web version after a delay in case the app is not installed
    setTimeout(() => {
        window.location.href = webUrl;
    }, 1000);
}