var timerid;

(function () {
    var storageKey = "dora_theme";
    var theme = "dark";

    try {
        var savedTheme = localStorage.getItem(storageKey);
        if (savedTheme === "light" || savedTheme === "dark") {
            theme = savedTheme;
        }
    } catch (e) {
        theme = "dark";
    }

    document.documentElement.setAttribute("data-theme", theme);
})();

$(document).ready(function () {
    if (!$(".app-sidebar").length) {
        $(".sidebar-toggle").hide();
    }

    $(".back-div").click(function () {
        $("#mobile-gameframe").hide();
        $(".back-div").attr("style", "display:none");
        $("#mobile-gameframe").attr("src", "");
        setGamePreviewVisible(true);
    });

    // Sidebar open/close for responsive navigation.
    $(document).on("click", ".sidebar-toggle", function () {
        $("body").toggleClass("sidebar-open");
    });

    $(document).on("click", ".sidebar-close, .sidebar-backdrop", function () {
        $("body").removeClass("sidebar-open");
    });

    $(document).on("click", ".app-sidebar a", function () {
        if (window.matchMedia("(max-width: 1080px)").matches) {
            $("body").removeClass("sidebar-open");
        }
    });

    // Always close sidebar before navigating to a game for cleaner transition.
    $(document).on("click", ".home-game-card, .PlayBtn", function () {
        $("body").removeClass("sidebar-open");
    });

    $(document).on("keydown", function (event) {
        if (event.key === "Escape") {
            $("body").removeClass("sidebar-open");
        }
    });

    // Theme toggle: dark and light mode.
    $(document).on("click", ".theme-toggle", function () {
        var current = document.documentElement.getAttribute("data-theme");
        var next = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        try {
            localStorage.setItem("dora_theme", next);
        } catch (e) { }
    });

    // Navbar search: focus on the input whenever search shell is clicked.
    $(document).on("click", ".ic-nav-search", function () {
        var $input = $(this).find(".nav-search-input");
        if ($input.length) {
            $input.focus();
        }
    });

    // Inline search on home page.
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
        }, 350);
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
    setGamePreviewVisible(false);

    if (isMobile.any()) {
        open_fullscreen();
        $("#mobile-gameframe").show();
        $(".back-div").attr("style", "display:flex");
        $("#mobile-gameframe").attr("src", data.href);
    } else {
        $("#desktop-gameframe").show();
        $("#desktop-gameframe").attr("src", data.href);
    }
    return false;
}

function setGamePreviewVisible(isVisible) {
    var $playButton = $("#play_game_link");
    var $thumb = $("#img_thumb");
    if (!$playButton.length || !$thumb.length) return;

    if (isVisible) {
        $playButton.show();
        $thumb.show();
    } else {
        $playButton.hide();
        $thumb.hide();
    }
}

function open_fullscreen() {
    let game = document.getElementById("mobile-gameframe");
    if (game.requestFullscreen) {
        game.requestFullscreen();
    } else if (game.mozRequestFullScreen) {
        game.mozRequestFullScreen();
    } else if (game.webkitRequestFullscreen) {
        game.webkitRequestFullscreen();
    } else if (game.msRequestFullscreen) {
        game.msRequestFullscreen();
    }
}
