// var adsLoaded = false;
// var adContainer;
// var videoElement;
// var adDisplayContainer;
// var adsLoader;

$(document).ready(function () {

});
window.addEventListener('load', function () {
    passData();
});

// function VideoPlayback() {
//     initializeIMA();
//     videoElement.addEventListener('play', function (event) {
//         loadAds(event);
//     });
//     window.addEventListener('load', function (event) {
//         videoElement = document.getElementById('video-element');
//         videoElement.play();
//     });
// }
// function initializeIMA() {
//     adContainer = document.getElementById('ad-container');
//     adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, videoElement);
//     adsLoader = new google.ima.AdsLoader(adDisplayContainer);

//     // Let the AdsLoader know when the video has ended
//     videoElement.addEventListener('ended', function () {
//         adsLoader.contentComplete();
//     });

//     var adsRequest = new google.ima.AdsRequest();
//     adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=';

//     // Specify the linear and nonlinear slot sizes. This helps the SDK to
//     // select the correct creative if multiple are returned.
//     adsRequest.linearAdSlotWidth = videoElement.clientWidth;
//     adsRequest.linearAdSlotHeight = videoElement.clientHeight;
//     adsRequest.nonLinearAdSlotWidth = videoElement.clientWidth;
//     adsRequest.nonLinearAdSlotHeight = videoElement.clientHeight / 3;

//     // Pass the request to the adsLoader to request ads
//     adsLoader.requestAds(adsRequest);
// }

// function loadAds(event) {
//     // Prevent this function from running on if there are already ads loaded
//     if (adsLoaded) {
//         return;
//     }
//     adsLoaded = true;

//     // Prevent triggering immediate playback when ads are loading
//     event.preventDefault();

//     console.log("loading ads");
// }

function passData() {
    var data;
    readTextFile("/content/data.json", function (text) {
        const match = document.URL.match(/\/game\/(.+?)\//);
        var id = "luminia_square";
        if (match) {
            id = match[1];
        }
        const obj = JSON.parse(text);
        const data = obj[id];
        if (data != undefined) {
            $("#game_title").html(obj[id].title);
            $("#game_desc").html(obj[id].desc.replaceAll("/n", "<br>"));
        }
    });
    const match = document.URL.match(/\/game\/(.+?)\//);
    var id = "luminia_square";
    if (match) {
        id = match[1];
    }

    var name = id.replaceAll("_", " ");
    $(".single-title").text(name[0].toUpperCase() + name.slice(1));
    if (document.title != id) {
        document.title = name[0].toUpperCase() + name.slice(1);
    }


    $('meta[name="description"]').attr("content", id);
    // $('#play_game_link').attr("href", "/games/" + id + "/index.html");
    // $(".game-iframe-container").prepend("<img id='img_thumb' src='/thumbs/" + id + ".webp' />")

    var url = "/games/" + id + "/index.html";

    $("#play_game_link").click(function () {
        if (adBreak.ready) {
            adBreak({
                type: 'reward',
                name: 'game_started',
                beforeAd: function () {

                },
                afterAd: function () {

                },
                adDismissed: () => { },               // Player dismissed the ad before completion
                adViewed: () => { },                  // Ad was viewed and closed
                adBreakDone: (placementInfo) => {
                    openGame(url);
                },
            });
        } else {
            openGame(url);
        }

    });

}

function openGame(data) {
    // $("#img_thumb").hide();
    // $("#play_game_link").hide();
    // $("#game-area").show();
    // $("#game-area").attr("src",data);
    location.href = data;
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
