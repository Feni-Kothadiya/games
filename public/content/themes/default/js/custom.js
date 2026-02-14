var timerid;

$(document).ready(function () {
    $(".back-div").click(function () {
        $("#mobile-gameframe").hide();
        $(".back-div").attr('style', 'display:none');
        $("#mobile-gameframe").attr('src', '');
    });

    // Navbar search: always use top navbar input only (no sidebar overlay)
    $(document).on("click", ".ic-nav-search", function () {
        var $input = $(this).find(".nav-search-input");
        if ($input.length) {
            $input.focus();
        }
    });

    // Inline search on home page: filter data within home layout itself
    var homeSearchTimer;
    $(document).on("input", ".nav-search-input", function () {
        if (!$("#home-search-section").length) return;
        var value = $(this).val().trim();
        clearTimeout(homeSearchTimer);
        if (value === "") {
            $("#home-search-section").hide();
            $("#home-search-results").empty();
            $("#home-search-empty").hide();
            return;
        }
        homeSearchTimer = setTimeout(function () {
            homeInlineSearch(value);
        }, 400);
    });
});

function homeInlineSearch(keyword) {
    if (keyword.length < 2) return;
    $("#home-search-section").show();
    $("#home-default-content").show();
    $("#home-search-results").html("");
    $("#home-search-empty").hide();

    fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: keyword })
    })
        .then(function (response) { return response.text(); })
        .then(function (html) {
            if (html && html.trim() !== "") {
                $("#home-search-results").html(html);
                $("#home-search-empty").hide();
            } else {
                $("#home-search-results").empty();
                $("#home-search-empty").show();
            }
        })
        .catch(function () {
            $("#home-search-results").empty();
            $("#home-search-empty").show();
        });
}

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS());
    }
};
function openGamePage(data) {

    if (isMobile.any()) {
        open_fullscreen();
        $("#mobile-gameframe").show();
        $(".back-div").attr('style', 'display:flex');
        $("#mobile-gameframe").attr('src', data.href);

    } else {
        $("#desktop-gameframe").show();
        $("#desktop-gameframe").attr('src', data.href);
    }
    return false;
}
function open_fullscreen() {
    let game = document.getElementById("mobile-gameframe");
    if (game.requestFullscreen) {
        game.requestFullscreen();
    } else if (game.mozRequestFullScreen) { /* Firefox */
        game.mozRequestFullScreen();
    } else if (game.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        game.webkitRequestFullscreen();
    } else if (game.msRequestFullscreen) { /* IE/Edge */
        game.msRequestFullscreen();
    }
};