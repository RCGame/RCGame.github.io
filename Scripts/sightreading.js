function openYouTube(event) {
    event.preventDefault(); // Prevent default navigation
    const videoId = "U-h2b75Swh0"; // Replace with actual video ID
    const appUrl = "youtube://www.youtube.com/watch?v=" + videoId;

    // Try opening the YouTube app
    window.location.href = appUrl;

    // Fallback to web version if the app doesn't open (small delay)
    setTimeout(() => {
        window.location.href = "https://www.youtube.com/watch?v=U-h2b75Swh0";
    }, 1000);
}