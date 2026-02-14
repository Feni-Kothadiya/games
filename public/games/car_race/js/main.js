/*
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
(function() {
    var a = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {}
      , f = "undefined" !== typeof module && module.exports
      , c = function() {
        for (var d, b = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], e = 0, k = b.length, l = {}; e < k; e++)
            if ((d = b[e]) && d[1]in a) {
                for (e = 0; e < d.length; e++)
                    l[b[0][e]] = d[e];
                return l
            }
        return !1
    }()
      , g = {
        change: c.fullscreenchange,
        error: c.fullscreenerror
    }
      , h = {
        request: function(d) {
            return new Promise(function(b, e) {
                var k = function() {
                    this.off("change", k);
                    b()
                }
                .bind(this);
                this.on("change", k);
                d = d || a.documentElement;
                Promise.resolve(d[c.requestFullscreen]())["catch"](e)
            }
            .bind(this))
        },
        exit: function() {
            return new Promise(function(d, b) {
                if (this.isFullscreen) {
                    var e = function() {
                        this.off("change", e);
                        d()
                    }
                    .bind(this);
                    this.on("change", e);
                    Promise.resolve(a[c.exitFullscreen]())["catch"](b)
                } else
                    d()
            }
            .bind(this))
        },
        toggle: function(d) {
            return this.isFullscreen ? this.exit() : this.request(d)
        },
        onchange: function(d) {
            this.on("change", d)
        },
        onerror: function(d) {
            this.on("error", d)
        },
        on: function(d, b) {
            var e = g[d];
            e && a.addEventListener(e, b, !1)
        },
        off: function(d, b) {
            var e = g[d];
            e && a.removeEventListener(e, b, !1)
        },
        raw: c
    };
    c ? (Object.defineProperties(h, {
        isFullscreen: {
            get: function() {
                return !!a[c.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return a[c.fullscreenElement]
            }
        },
        isEnabled: {
            enumerable: !0,
            get: function() {
                return !!a[c.fullscreenEnabled]
            }
        }
    }),
    f ? module.exports = h : window.screenfull = h) : f ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
}
)();
(function() {
    function a(q) {
        q = String(q);
        return q.charAt(0).toUpperCase() + q.slice(1)
    }
    function f(q, y) {
        var D = -1
          , C = q ? q.length : 0;
        if ("number" == typeof C && -1 < C && C <= u)
            for (; ++D < C; )
                y(q[D], D, q);
        else
            g(q, y)
    }
    function c(q) {
        q = String(q).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(q) ? q : a(q)
    }
    function g(q, y) {
        for (var D in q)
            A.call(q, D) && y(q[D], D, q)
    }
    function h(q) {
        return null == q ? a(q) : w.call(q).slice(8, -1)
    }
    function d(q, y) {
        var D = null != q ? typeof q[y] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(D) && ("object" == D ? !!q[y] : !0)
    }
    function b(q) {
        return String(q).replace(/([ -])(?!$)/g, "$1?")
    }
    function e(q, y) {
        var D = null;
        f(q, function(C, x) {
            D = y(D, C, x, q)
        });
        return D
    }
    function k(q) {
        function y(S) {
            return e(S, function(N, M) {
                var T = M.pattern || b(M);
                !N && (N = RegExp("\\b" + T + " *\\d+[.\\w_]*", "i").exec(q) || RegExp("\\b" + T + " *\\w+-[\\w]*", "i").exec(q) || RegExp("\\b" + T + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(q)) && ((N = String(M.label && !RegExp(T, "i").test(M.label) ? M.label : N).split("/"))[1] && !/[\d.]+/.test(N[0]) && (N[0] += " " + N[1]),
                M = M.label || M,
                N = c(N[0].replace(RegExp(T, "i"), M).replace(RegExp("; *(?:" + M + "[_-])?", "i"), " ").replace(RegExp("(" + M + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return N
            })
        }
        function D(S) {
            return e(S, function(N, M) {
                return N || (RegExp(M + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(q) || 0)[1] || null
            })
        }
        var C = p
          , x = q && "object" == typeof q && "String" != h(q);
        x && (C = q,
        q = null);
        var F = C.navigator || {}
          , z = F.userAgent || "";
        q || (q = z);
        var I = x ? !!F.likeChrome : /\bChrome\b/.test(q) && !/internal|\n/i.test(w.toString())
          , J = x ? "Object" : "ScriptBridgingProxyObject"
          , Q = x ? "Object" : "Environment"
          , R = x && C.java ? "JavaPackage" : h(C.java)
          , Y = x ? "Object" : "RuntimeObject";
        Q = (R = /\bJava/.test(R) && C.java) && h(C.environment) == Q;
        var Z = R ? "a" : "\u03b1", aa = R ? "b" : "\u03b2", W = C.document || {}, O = C.operamini || C.opera, V = v.test(V = x && O ? O["[[Class]]"] : h(O)) ? V : O = null, r, H = q;
        x = [];
        var G = null
          , P = q == z;
        z = P && O && "function" == typeof O.version && O.version();
        var K = function(S) {
            return e(S, function(N, M) {
                return N || RegExp("\\b" + (M.pattern || b(M)) + "\\b", "i").exec(q) && (M.label || M)
            })
        }([{
            label: "EdgeHTML",
            pattern: "Edge"
        }, "Trident", {
            label: "WebKit",
            pattern: "AppleWebKit"
        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"])
          , B = function(S) {
            return e(S, function(N, M) {
                return N || RegExp("\\b" + (M.pattern || b(M)) + "\\b", "i").exec(q) && (M.label || M)
            })
        }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
            label: "Microsoft Edge",
            pattern: "Edge"
        }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
            label: "Samsung Internet",
            pattern: "SamsungBrowser"
        }, "SeaMonkey", {
            label: "Silk",
            pattern: "(?:Cloud9|Silk-Accelerated)"
        }, "Sleipnir", "SlimBrowser", {
            label: "SRWare Iron",
            pattern: "Iron"
        }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
            label: "Opera Mini",
            pattern: "OPiOS"
        }, "Opera", {
            label: "Opera",
            pattern: "OPR"
        }, "Chrome", {
            label: "Chrome Mobile",
            pattern: "(?:CriOS|CrMo)"
        }, {
            label: "Firefox",
            pattern: "(?:Firefox|Minefield)"
        }, {
            label: "Firefox for iOS",
            pattern: "FxiOS"
        }, {
            label: "IE",
            pattern: "IEMobile"
        }, {
            label: "IE",
            pattern: "MSIE"
        }, "Safari"])
          , L = y([{
            label: "BlackBerry",
            pattern: "BB10"
        }, "BlackBerry", {
            label: "Galaxy S",
            pattern: "GT-I9000"
        }, {
            label: "Galaxy S2",
            pattern: "GT-I9100"
        }, {
            label: "Galaxy S3",
            pattern: "GT-I9300"
        }, {
            label: "Galaxy S4",
            pattern: "GT-I9500"
        }, {
            label: "Galaxy S5",
            pattern: "SM-G900"
        }, {
            label: "Galaxy S6",
            pattern: "SM-G920"
        }, {
            label: "Galaxy S6 Edge",
            pattern: "SM-G925"
        }, {
            label: "Galaxy S7",
            pattern: "SM-G930"
        }, {
            label: "Galaxy S7 Edge",
            pattern: "SM-G935"
        }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
            label: "Kindle Fire",
            pattern: "(?:Cloud9|Silk-Accelerated)"
        }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
            label: "Wii U",
            pattern: "WiiU"
        }, "Wii", "Xbox One", {
            label: "Xbox 360",
            pattern: "Xbox"
        }, "Xoom"])
          , U = function(S) {
            return e(S, function(N, M, T) {
                return N || (M[L] || M[/^[a-z]+(?: +[a-z]+\b)*/i.exec(L)] || RegExp("\\b" + b(T) + "(?:\\b|\\w*\\d)", "i").exec(q)) && T
            })
        }({
            Apple: {
                iPad: 1,
                iPhone: 1,
                iPod: 1
            },
            Archos: {},
            Amazon: {
                Kindle: 1,
                "Kindle Fire": 1
            },
            Asus: {
                Transformer: 1
            },
            "Barnes & Noble": {
                Nook: 1
            },
            BlackBerry: {
                PlayBook: 1
            },
            Google: {
                "Google TV": 1,
                Nexus: 1
            },
            HP: {
                TouchPad: 1
            },
            HTC: {},
            LG: {},
            Microsoft: {
                Xbox: 1,
                "Xbox One": 1
            },
            Motorola: {
                Xoom: 1
            },
            Nintendo: {
                "Wii U": 1,
                Wii: 1
            },
            Nokia: {
                Lumia: 1
            },
            Samsung: {
                "Galaxy S": 1,
                "Galaxy S2": 1,
                "Galaxy S3": 1,
                "Galaxy S4": 1
            },
            Sony: {
                PlayStation: 1,
                "PlayStation Vita": 1
            }
        })
          , E = function(S) {
            return e(S, function(N, M) {
                var T = M.pattern || b(M);
                if (!N && (N = RegExp("\\b" + T + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(q))) {
                    var X = N
                      , ba = M.label || M
                      , ca = {
                        "10.0": "10",
                        "6.4": "10 Technical Preview",
                        "6.3": "8.1",
                        "6.2": "8",
                        "6.1": "Server 2008 R2 / 7",
                        "6.0": "Server 2008 / Vista",
                        "5.2": "Server 2003 / XP 64-bit",
                        "5.1": "XP",
                        "5.01": "2000 SP1",
                        "5.0": "2000",
                        "4.0": "NT",
                        "4.90": "ME"
                    };
                    T && ba && /^Win/i.test(X) && !/^Windows Phone /i.test(X) && (ca = ca[/[\d.]+$/.exec(X)]) && (X = "Windows " + ca);
                    X = String(X);
                    T && ba && (X = X.replace(RegExp(T, "i"), ba));
                    N = X = c(X.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                }
                return N
            })
        }(["Windows Phone", "Android", "CentOS", {
            label: "Chrome OS",
            pattern: "CrOS"
        }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        K && (K = [K]);
        U && !L && (L = y([U]));
        if (r = /\bGoogle TV\b/.exec(L))
            L = r[0];
        /\bSimulator\b/i.test(q) && (L = (L ? L + " " : "") + "Simulator");
        "Opera Mini" == B && /\bOPiOS\b/.test(q) && x.push("running in Turbo/Uncompressed mode");
        "IE" == B && /\blike iPhone OS\b/.test(q) ? (r = k(q.replace(/like iPhone OS/, "")),
        U = r.manufacturer,
        L = r.product) : /^iP/.test(L) ? (B || (B = "Safari"),
        E = "iOS" + ((r = / OS ([\d_]+)/i.exec(q)) ? " " + r[1].replace(/_/g, ".") : "")) : "Konqueror" != B || /buntu/i.test(E) ? U && "Google" != U && (/Chrome/.test(B) && !/\bMobile Safari\b/i.test(q) || /\bVita\b/.test(L)) || /\bAndroid\b/.test(E) && /^Chrome/.test(B) && /\bVersion\//i.test(q) ? (B = "Android Browser",
        E = /\bAndroid\b/.test(E) ? E : "Android") : "Silk" == B ? (/\bMobi/i.test(q) || (E = "Android",
        x.unshift("desktop mode")),
        /Accelerated *= *true/i.test(q) && x.unshift("accelerated")) : "PaleMoon" == B && (r = /\bFirefox\/([\d.]+)\b/.exec(q)) ? x.push("identifying as Firefox " + r[1]) : "Firefox" == B && (r = /\b(Mobile|Tablet|TV)\b/i.exec(q)) ? (E || (E = "Firefox OS"),
        L || (L = r[1])) : !B || (r = !/\bMinefield\b/i.test(q) && /\b(?:Firefox|Safari)\b/.exec(B)) ? (B && !L && /[\/,]|^[^(]+?\)/.test(q.slice(q.indexOf(r + "/") + 8)) && (B = null),
        (r = L || U || E) && (L || U || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(E)) && (B = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(E) ? E : r) + " Browser")) : "Electron" == B && (r = (/\bChrome\/([\d.]+)\b/.exec(q) || 0)[1]) && x.push("Chromium " + r) : E = "Kubuntu";
        z || (z = D(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", b(B), "(?:Firefox|Minefield|NetFront)"]));
        if (r = "iCab" == K && 3 < parseFloat(z) && "WebKit" || /\bOpera\b/.test(B) && (/\bOPR\b/.test(q) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(q) && !/^(?:Trident|EdgeHTML)$/.test(K) && "WebKit" || !K && /\bMSIE\b/i.test(q) && ("Mac OS" == E ? "Tasman" : "Trident") || "WebKit" == K && /\bPlayStation\b(?! Vita\b)/i.test(B) && "NetFront")
            K = [r];
        "IE" == B && (r = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(q) || 0)[1]) ? (B += " Mobile",
        E = "Windows Phone " + (/\+$/.test(r) ? r : r + ".x"),
        x.unshift("desktop mode")) : /\bWPDesktop\b/i.test(q) ? (B = "IE Mobile",
        E = "Windows Phone 8.x",
        x.unshift("desktop mode"),
        z || (z = (/\brv:([\d.]+)/.exec(q) || 0)[1])) : "IE" != B && "Trident" == K && (r = /\brv:([\d.]+)/.exec(q)) && (B && x.push("identifying as " + B + (z ? " " + z : "")),
        B = "IE",
        z = r[1]);
        if (P) {
            if (d(C, "global"))
                if (R && (r = R.lang.System,
                H = r.getProperty("os.arch"),
                E = E || r.getProperty("os.name") + " " + r.getProperty("os.version")),
                Q) {
                    try {
                        z = C.require("ringo/engine").version.join("."),
                        B = "RingoJS"
                    } catch (S) {
                        (r = C.system) && r.global.system == C.system && (B = "Narwhal",
                        E || (E = r[0].os || null))
                    }
                    B || (B = "Rhino")
                } else
                    "object" == typeof C.process && !C.process.browser && (r = C.process) && ("object" == typeof r.versions && ("string" == typeof r.versions.electron ? (x.push("Node " + r.versions.node),
                    B = "Electron",
                    z = r.versions.electron) : "string" == typeof r.versions.nw && (x.push("Chromium " + z, "Node " + r.versions.node),
                    B = "NW.js",
                    z = r.versions.nw)),
                    B || (B = "Node.js",
                    H = r.arch,
                    E = r.platform,
                    z = (z = /[\d.]+/.exec(r.version)) ? z[0] : null));
            else
                h(r = C.runtime) == J ? (B = "Adobe AIR",
                E = r.flash.system.Capabilities.os) : h(r = C.phantom) == Y ? (B = "PhantomJS",
                z = (r = r.version || null) && r.major + "." + r.minor + "." + r.patch) : "number" == typeof W.documentMode && (r = /\bTrident\/(\d+)/i.exec(q)) ? (z = [z, W.documentMode],
                (r = +r[1] + 4) != z[1] && (x.push("IE " + z[1] + " mode"),
                K && (K[1] = ""),
                z[1] = r),
                z = "IE" == B ? String(z[1].toFixed(1)) : z[0]) : "number" == typeof W.documentMode && /^(?:Chrome|Firefox)\b/.test(B) && (x.push("masking as " + B + " " + z),
                B = "IE",
                z = "11.0",
                K = ["Trident"],
                E = "Windows");
            E = E && c(E)
        }
        z && (r = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(z) || /(?:alpha|beta)(?: ?\d)?/i.exec(q + ";" + (P && F.appMinorVersion)) || /\bMinefield\b/i.test(q) && "a") && (G = /b/i.test(r) ? "beta" : "alpha",
        z = z.replace(RegExp(r + "\\+?$"), "") + ("beta" == G ? aa : Z) + (/\d+\+?/.exec(r) || ""));
        if ("Fennec" == B || "Firefox" == B && /\b(?:Android|Firefox OS)\b/.test(E))
            B = "Firefox Mobile";
        else if ("Maxthon" == B && z)
            z = z.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(L))
            "Xbox 360" == L && (E = null),
            "Xbox 360" == L && /\bIEMobile\b/.test(q) && x.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(B) && (!B || L || /Browser|Mobi/.test(B)) || "Windows CE" != E && !/Mobi/i.test(q))
            if ("IE" == B && P)
                try {
                    null === C.external && x.unshift("platform preview")
                } catch (S) {
                    x.unshift("embedded")
                }
            else
                (/\bBlackBerry\b/.test(L) || /\bBB10\b/.test(q)) && (r = (RegExp(L.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(q) || 0)[1] || z) ? (r = [r, /BB10/.test(q)],
                E = (r[1] ? (L = null,
                U = "BlackBerry") : "Device Software") + " " + r[0],
                z = null) : this != g && "Wii" != L && (P && O || /Opera/.test(B) && /\b(?:MSIE|Firefox)\b/i.test(q) || "Firefox" == B && /\bOS X (?:\d+\.){2,}/.test(E) || "IE" == B && (E && !/^Win/.test(E) && 5.5 < z || /\bWindows XP\b/.test(E) && 8 < z || 8 == z && !/\bTrident\b/.test(q))) && !v.test(r = k.call(g, q.replace(v, "") + ";")) && r.name && (r = "ing as " + r.name + ((r = r.version) ? " " + r : ""),
                v.test(B) ? (/\bIE\b/.test(r) && "Mac OS" == E && (E = null),
                r = "identify" + r) : (r = "mask" + r,
                B = V ? c(V.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera",
                /\bIE\b/.test(r) && (E = null),
                P || (z = null)),
                K = ["Presto"],
                x.push(r));
        else
            B += " Mobile";
        if (r = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(q) || 0)[1]) {
            r = [parseFloat(r.replace(/\.(\d)$/, ".0$1")), r];
            if ("Safari" == B && "+" == r[1].slice(-1))
                B = "WebKit Nightly",
                G = "alpha",
                z = r[1].slice(0, -1);
            else if (z == r[1] || z == (r[2] = (/\bSafari\/([\d.]+\+?)/i.exec(q) || 0)[1]))
                z = null;
            r[1] = (/\bChrome\/([\d.]+)/i.exec(q) || 0)[1];
            537.36 == r[0] && 537.36 == r[2] && 28 <= parseFloat(r[1]) && "WebKit" == K && (K = ["Blink"]);
            P && (I || r[1]) ? (K && (K[1] = "like Chrome"),
            r = r[1] || (r = r[0],
            530 > r ? 1 : 532 > r ? 2 : 532.05 > r ? 3 : 533 > r ? 4 : 534.03 > r ? 5 : 534.07 > r ? 6 : 534.1 > r ? 7 : 534.13 > r ? 8 : 534.16 > r ? 9 : 534.24 > r ? 10 : 534.3 > r ? 11 : 535.01 > r ? 12 : 535.02 > r ? "13+" : 535.07 > r ? 15 : 535.11 > r ? 16 : 535.19 > r ? 17 : 536.05 > r ? 18 : 536.1 > r ? 19 : 537.01 > r ? 20 : 537.11 > r ? "21+" : 537.13 > r ? 23 : 537.18 > r ? 24 : 537.24 > r ? 25 : 537.36 > r ? 26 : "Blink" != K ? "27" : "28")) : (K && (K[1] = "like Safari"),
            r = (r = r[0],
            400 > r ? 1 : 500 > r ? 2 : 526 > r ? 3 : 533 > r ? 4 : 534 > r ? "4+" : 535 > r ? 5 : 537 > r ? 6 : 538 > r ? 7 : 601 > r ? 8 : "8"));
            K && (K[1] += " " + (r += "number" == typeof r ? ".x" : /[.+]/.test(r) ? "" : "+"));
            "Safari" == B && (!z || 45 < parseInt(z)) && (z = r)
        }
        "Opera" == B && (r = /\bzbov|zvav$/.exec(E)) ? (B += " ",
        x.unshift("desktop mode"),
        "zvav" == r ? (B += "Mini",
        z = null) : B += "Mobile",
        E = E.replace(RegExp(" *" + r + "$"), "")) : "Safari" == B && /\bChrome\b/.exec(K && K[1]) && (x.unshift("desktop mode"),
        B = "Chrome Mobile",
        z = null,
        /\bOS X\b/.test(E) ? (U = "Apple",
        E = "iOS 4.3+") : E = null);
        z && 0 == z.indexOf(r = /[\d.]+$/.exec(E)) && -1 < q.indexOf("/" + r + "-") && (E = String(E.replace(r, "")).replace(/^ +| +$/g, ""));
        K && !/\b(?:Avant|Nook)\b/.test(B) && (/Browser|Lunascape|Maxthon/.test(B) || "Safari" != B && /^iOS/.test(E) && /\bSafari\b/.test(K[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(B) && K[1]) && (r = K[K.length - 1]) && x.push(r);
        x.length && (x = ["(" + x.join("; ") + ")"]);
        U && L && 0 > L.indexOf(U) && x.push("on " + U);
        L && x.push((/^on /.test(x[x.length - 1]) ? "" : "on ") + L);
        if (E) {
            var da = (r = / ([\d.+]+)$/.exec(E)) && "/" == E.charAt(E.length - r[0].length - 1);
            E = {
                architecture: 32,
                family: r && !da ? E.replace(r[0], "") : E,
                version: r ? r[1] : null,
                toString: function() {
                    var S = this.version;
                    return this.family + (S && !da ? " " + S : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }
        (r = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(H)) && !/\bi686\b/i.test(H) ? (E && (E.architecture = 64,
        E.family = E.family.replace(RegExp(" *" + r), "")),
        B && (/\bWOW64\b/i.test(q) || P && /\w(?:86|32)$/.test(F.cpuClass || F.platform) && !/\bWin64; x64\b/i.test(q)) && x.unshift("32-bit")) : E && /^OS X/.test(E.family) && "Chrome" == B && 39 <= parseFloat(z) && (E.architecture = 64);
        q || (q = null);
        C = {};
        C.description = q;
        C.layout = K && K[0];
        C.manufacturer = U;
        C.name = B;
        C.prerelease = G;
        C.product = L;
        C.ua = q;
        C.version = B && z;
        C.os = E || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        C.parse = k;
        C.toString = function() {
            return this.description || ""
        }
        ;
        C.version && x.unshift(z);
        C.name && x.unshift(B);
        E && B && (E != String(E).split(" ")[0] || E != B.split(" ")[0] && !L) && x.push(L ? "(" + E + ")" : "on " + E);
        x.length && (C.description = x.join(" "));
        return C
    }
    var l = {
        "function": !0,
        object: !0
    }
      , p = l[typeof window] && window || this
      , m = l[typeof exports] && exports;
    l = l[typeof module] && module && !module.nodeType && module;
    var n = m && l && "object" == typeof global && global;
    !n || n.global !== n && n.window !== n && n.self !== n || (p = n);
    var u = Math.pow(2, 53) - 1
      , v = /\bOpera/;
    n = Object.prototype;
    var A = n.hasOwnProperty
      , w = n.toString
      , t = k();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (p.platform = t,
    define(function() {
        return t
    })) : m && l ? g(t, function(q, y) {
        m[y] = q
    }) : p.platform = t
}
).call(this);
function buildIOSMeta() {
    for (var a = [{
        name: "viewport",
        content: "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
    }, {
        name: "apple-mobile-web-app-capable",
        content: "yes"
    }, {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black"
    }], f = 0; f < a.length; f++) {
        var c = document.createElement("meta");
        c.name = a[f].name;
        c.content = a[f].content;
        var g = window.document.head.querySelector('meta[name="' + c.name + '"]');
        g && g.parentNode.removeChild(g);
        window.document.head.appendChild(c)
    }
}
function hideIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "none");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "none");
    jQuery(".xxx-game-iframe-full").removeClass("xxx-game-iframe-iphone-se")
}
function buildIOSFullscreenPanel() {
    jQuery("body").append('<div class="xxx-ios-fullscreen-message"><div class="xxx-ios-fullscreen-swipe"></div></div><div class="xxx-ios-fullscreen-scroll"></div>')
}
function showIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "block");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "block")
}
function __iosResize() {
    window.scrollTo(0, 0);
    console.log(window.devicePixelRatio);
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    if ("iPhone" === platform.product)
        switch (window.devicePixelRatio) {
        case 2:
            switch (window.innerWidth) {
            case 568:
                320 !== window.innerHeight && jQuery(".xxx-game-iframe-full").addClass("xxx-game-iframe-iphone-se");
                break;
            case 667:
                375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                break;
            case 808:
                414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                break;
            default:
                hideIOSFullscreenPanel()
            }
            break;
        case 3:
            switch (window.innerWidth) {
            case 736:
                414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                break;
            case 724:
                375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                break;
            case 808:
                414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                break;
            default:
                hideIOSFullscreenPanel()
            }
            break;
        default:
            hideIOSFullscreenPanel()
        }
}
function iosResize() {
    __iosResize();
    setTimeout(function() {
        __iosResize()
    }, 500)
}
function iosInIframe() {
    try {
        return window.self !== window.top
    } catch (a) {
        return !0
    }
}
function isIOSLessThen13() {
    var a = platform.os
      , f = a.family.toLowerCase();
    a = parseFloat(a.version);
    return "ios" === f && 13 > a ? !0 : !1
}
$(document).ready(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && (buildIOSFullscreenPanel(),
    buildIOSMeta())
});
jQuery(window).resize(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && iosResize()
});
var s_iScaleFactor = 1, s_iOffsetX, s_iOffsetY, s_bIsIphone = !1, s_bFocus = !0;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
}
)(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});
function trace(a) {
    console.log(a)
}
function getSize(a) {
    var f = a.toLowerCase()
      , c = window.document
      , g = c.documentElement;
    if (void 0 === window["inner" + a])
        a = g["client" + a];
    else if (window["inner" + a] != g["client" + a]) {
        var h = c.createElement("body");
        h.id = "vpw-test-b";
        h.style.cssText = "overflow:scroll";
        var d = c.createElement("div");
        d.id = "vpw-test-d";
        d.style.cssText = "position:absolute;top:-1000px";
        d.innerHTML = "<style>@media(" + f + ":" + g["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + f + ":7px!important}}</style>";
        h.appendChild(d);
        g.insertBefore(h, c.head);
        a = 7 == d["offset" + a] ? g["client" + a] : window["inner" + a];
        g.removeChild(h)
    } else
        a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}
function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}
function isIpad() {
    var a = -1 !== navigator.userAgent.toLowerCase().indexOf("ipad");
    return !a && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && 2 < navigator.maxTouchPoints ? !0 : a
}
function isMobile() {
    return isIpad() ? !0 : jQuery.browser.mobile
}
function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    if (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone"))
        return s_bIsIphone = !0;
    for (; a.length; )
        if (navigator.platform === a.pop())
            return s_bIsIphone = !0;
    return s_bIsIphone = !1
}
function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}
function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}
function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = null !== platform.name && "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var f = getSize("Width");
        s_bFocus && _checkOrientation(f, a);
        var c = Math.min(a / CANVAS_HEIGHT, f / CANVAS_WIDTH)
          , g = Math.round(CANVAS_WIDTH * c);
        c = Math.round(CANVAS_HEIGHT * c);
        if (c < a) {
            var h = a - c;
            c += h;
            g += CANVAS_WIDTH / CANVAS_HEIGHT * h
        } else
            g < f && (h = f - g,
            g += h,
            c += CANVAS_HEIGHT / CANVAS_WIDTH * h);
        h = a / 2 - c / 2;
        var d = f / 2 - g / 2
          , b = CANVAS_WIDTH / g;
        if (d * b < -EDGEBOARD_X || h * b < -EDGEBOARD_Y)
            c = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), f / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
            g = Math.round(CANVAS_WIDTH * c),
            c = Math.round(CANVAS_HEIGHT * c),
            h = (a - c) / 2,
            d = (f - g) / 2,
            b = CANVAS_WIDTH / g;
        s_iOffsetX = -1 * d * b;
        s_iOffsetY = -1 * h * b;
        0 <= h && (s_iOffsetY = 0);
        0 <= d && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oWorldMenu && s_oWorldMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"),
        s_oStage.canvas.width = 2 * g,
        s_oStage.canvas.height = 2 * c,
        canvas.style.width = g + "px",
        canvas.style.height = c + "px",
        s_iScaleFactor = 2 * Math.min(g / CANVAS_WIDTH, c / CANVAS_HEIGHT),
        s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor) : s_bMobile || isChrome() ? ($("#canvas").css("width", g + "px"),
        $("#canvas").css("height", c + "px")) : (s_oStage.canvas.width = g,
        s_oStage.canvas.height = c,
        s_iScaleFactor = Math.min(g / CANVAS_WIDTH, c / CANVAS_HEIGHT),
        s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > h || (h = (a - c) / 2);
        $("#canvas").css("top", h + "px");
        $("#canvas").css("left", d + "px");
        fullscreenHandler()
    }
}
function _checkOrientation(a, f) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > f ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"),
    s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
    s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"),
    s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
    s_oMain.stopUpdate()))
}
function playSound(a, f, c) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(),
    s_aSounds[a].volume(f),
    s_aSounds[a].loop(c),
    s_aSounds[a]) : null
}
function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.stop()
}
function setVolume(a, f) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.volume(f)
}
function setMute(a, f) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.mute(f)
}
function fadeSound(a, f, c, g) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.fade(f, c, g)
}
function soundPlaying(a) {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
        return a.playing()
}
function soundSeek(a, f) {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
        return a.seek(f)
}
function soundDuration(a) {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
        return a.duration()
}
function createBitmap(a, f, c) {
    var g = new createjs.Bitmap(a)
      , h = new createjs.Shape;
    f && c ? h.graphics.beginFill("#fff").drawRect(0, 0, f, c) : h.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    g.hitArea = h;
    return g
}
function createSprite(a, f, c, g, h, d) {
    a = null !== f ? new createjs.Sprite(a,f) : new createjs.Sprite(a);
    f = new createjs.Shape;
    f.graphics.beginFill("#000000").drawRect(-c, -g, h, d);
    a.hitArea = f;
    return a
}
function pad(a, f, c) {
    a += "";
    return a.length >= f ? a : Array(f - a.length + 1).join(c || "0") + a
}
function randomFloatBetween(a, f, c) {
    "undefined" === typeof c && (c = 2);
    return parseFloat(Math.min(a + Math.random() * (f - a), f).toFixed(c))
}
function rotateVector2D(a, f) {
    var c = f.getX() * Math.cos(a) + f.getY() * Math.sin(a)
      , g = f.getX() * -Math.sin(a) + f.getY() * Math.cos(a);
    f.set(c, g)
}
function tweenVectorsOnX(a, f, c) {
    return a + c * (f - a)
}
function linearFunction(a, f, c, g, h) {
    return (a - f) * (h - g) / (c - f) + g
}
function shuffle(a) {
    for (var f = a.length, c, g; 0 !== f; )
        g = Math.floor(Math.random() * f),
        --f,
        c = a[f],
        a[f] = a[g],
        a[g] = c;
    return a
}
function bubbleSort(a) {
    do {
        var f = !1;
        for (var c = 0; c < a.length - 1; c++)
            a[c] > a[c + 1] && (f = a[c],
            a[c] = a[c + 1],
            a[c + 1] = f,
            f = !0)
    } while (f)
}
function compare(a, f) {
    return a.index > f.index ? -1 : a.index < f.index ? 1 : 0
}
function easeLinear(a, f, c, g) {
    return c * a / g + f
}
function easeInQuad(a, f, c, g) {
    return c * (a /= g) * a + f
}
function easeInSine(a, f, c, g) {
    return -c * Math.cos(a / g * (Math.PI / 2)) + c + f
}
function easeInCubic(a, f, c, g) {
    return c * (a /= g) * a * a + f
}
function getTrajectoryPoint(a, f) {
    var c = new createjs.Point
      , g = (1 - a) * (1 - a)
      , h = a * a;
    c.x = g * f.start.x + 2 * (1 - a) * a * f.traj.x + h * f.end.x;
    c.y = g * f.start.y + 2 * (1 - a) * a * f.traj.y + h * f.end.y;
    return c
}
function formatTime(a) {
    a /= 1E3;
    var f = Math.floor(a / 60);
    a = parseFloat(a - 60 * f).toFixed(1);
    var c = "";
    c = 10 > f ? c + ("0" + f + ":") : c + (f + ":");
    return 10 > a ? c + ("0" + a) : c + a
}
function degreesToRadians(a) {
    return a * Math.PI / 180
}
function checkRectCollision(a, f) {
    var c = getBounds(a, .9);
    var g = getBounds(f, .98);
    return calculateIntersection(c, g)
}
function calculateIntersection(a, f) {
    var c, g, h, d;
    var b = a.x + (c = a.width / 2);
    var e = a.y + (g = a.height / 2);
    var k = f.x + (h = f.width / 2);
    var l = f.y + (d = f.height / 2);
    b = Math.abs(b - k) - (c + h);
    e = Math.abs(e - l) - (g + d);
    return 0 > b && 0 > e ? (b = Math.min(Math.min(a.width, f.width), -b),
    e = Math.min(Math.min(a.height, f.height), -e),
    {
        x: Math.max(a.x, f.x),
        y: Math.max(a.y, f.y),
        width: b,
        height: e,
        rect1: a,
        rect2: f
    }) : null
}
function getBounds(a, f) {
    var c = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (a instanceof createjs.Container) {
        c.x2 = -Infinity;
        c.y2 = -Infinity;
        var g = a.children, h = g.length, d;
        for (d = 0; d < h; d++) {
            var b = getBounds(g[d], 1);
            b.x < c.x && (c.x = b.x);
            b.y < c.y && (c.y = b.y);
            b.x + b.width > c.x2 && (c.x2 = b.x + b.width);
            b.y + b.height > c.y2 && (c.y2 = b.y + b.height)
        }
        Infinity == c.x && (c.x = 0);
        Infinity == c.y && (c.y = 0);
        Infinity == c.x2 && (c.x2 = 0);
        Infinity == c.y2 && (c.y2 = 0);
        c.width = c.x2 - c.x;
        c.height = c.y2 - c.y;
        delete c.x2;
        delete c.y2
    } else {
        if (a instanceof createjs.Bitmap) {
            h = a.sourceRect || a.image;
            d = h.width * f;
            var e = h.height * f
        } else if (a instanceof createjs.Sprite)
            if (a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image) {
                h = a.spriteSheet.getFrame(a.currentFrame);
                d = h.rect.width;
                e = h.rect.height;
                g = h.regX;
                var k = h.regY
            } else
                c.x = a.x || 0,
                c.y = a.y || 0;
        else
            c.x = a.x || 0,
            c.y = a.y || 0;
        g = g || 0;
        d = d || 0;
        k = k || 0;
        e = e || 0;
        c.regX = g;
        c.regY = k;
        h = a.localToGlobal(0 - g, 0 - k);
        b = a.localToGlobal(d - g, e - k);
        d = a.localToGlobal(d - g, 0 - k);
        g = a.localToGlobal(0 - g, e - k);
        c.x = Math.min(Math.min(Math.min(h.x, b.x), d.x), g.x);
        c.y = Math.min(Math.min(Math.min(h.y, b.y), d.y), g.y);
        c.width = Math.max(Math.max(Math.max(h.x, b.x), d.x), g.x) - c.x;
        c.height = Math.max(Math.max(Math.max(h.y, b.y), d.y), g.y) - c.y
    }
    return c
}
function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
function shuffle(a) {
    for (var f = a.length, c, g; 0 < f; )
        g = Math.floor(Math.random() * f),
        f--,
        c = a[f],
        a[f] = a[g],
        a[g] = c;
    return a
}
NoClickDelay.prototype = {
    handleEvent: function(a) {
        switch (a.type) {
        case "touchstart":
            this.onTouchStart(a);
            break;
        case "touchmove":
            this.onTouchMove(a);
            break;
        case "touchend":
            this.onTouchEnd(a)
        }
    },
    onTouchStart: function(a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(a) {
        this.moved = !0
    },
    onTouchEnd: function(a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend", this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 == a.nodeType && (a = a.parentNode);
            var f = document.createEvent("MouseEvents");
            f.initEvent("click", !0, !0);
            a.dispatchEvent(f)
        }
    }
};
(function() {
    function a(c) {
        var g = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        c = c || window.event;
        c.type in g ? document.body.className = g[c.type] : (document.body.className = this[f] ? "hidden" : "visible",
        "hidden" === document.body.className ? (s_oMain.stopUpdate(),
        s_bFocus = !1) : (s_oMain.startUpdate(),
        s_bFocus = !0))
    }
    var f = "hidden";
    f in document ? document.addEventListener("visibilitychange", a) : (f = "mozHidden")in document ? document.addEventListener("mozvisibilitychange", a) : (f = "webkitHidden")in document ? document.addEventListener("webkitvisibilitychange", a) : (f = "msHidden")in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin"in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
}
)();
function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}
function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}
function getParamValue(a) {
    for (var f = window.location.search.substring(1).split("&"), c = 0; c < f.length; c++) {
        var g = f[c].split("=");
        if (g[0] == a)
            return g[1]
    }
}
var Util = {
    timestamp: function() {
        return (new Date).getTime()
    },
    toInt: function(a, f) {
        if (null !== a) {
            var c = parseInt(a, 10);
            if (!isNaN(c))
                return c
        }
        return Util.toInt(f, 0)
    },
    toFloat: function(a, f) {
        if (null !== a) {
            var c = parseFloat(a);
            if (!isNaN(c))
                return c
        }
        return Util.toFloat(f, 0)
    },
    limit: function(a, f, c) {
        return Math.max(f, Math.min(a, c))
    },
    randomInt: function(a, f) {
        return Math.round(Util.interpolate(a, f, Math.random()))
    },
    randomChoice: function(a) {
        return a[Util.randomInt(0, a.length - 1)]
    },
    percentRemaining: function(a, f) {
        return a % f / f
    },
    accelerate: function(a, f, c) {
        return a + f * c
    },
    interpolate: function(a, f, c) {
        return a + (f - a) * c
    },
    easeIn: function(a, f, c) {
        return a + (f - a) * Math.pow(c, 2)
    },
    easeOut: function(a, f, c) {
        return a + (f - a) * (1 - Math.pow(1 - c, 2))
    },
    easeInOut: function(a, f, c) {
        return a + (f - a) * (-Math.cos(c * Math.PI) / 2 + .5)
    },
    exponentialFog: function(a, f) {
        return 1 / Math.pow(Math.E, a * a * f)
    },
    increase: function(a, f, c) {
        for (a += f; a >= c; )
            a -= c;
        for (; 0 > a; )
            a += c;
        return a
    },
    project: function(a, f, c, g, h) {
        a.camera.x = -f;
        a.camera.y = a.world.y - c;
        a.camera.z = a.world.z - g;
        a.screen.scale = h / a.camera.z;
        a.screen.x = Math.round(HALF_CANVAS_WIDTH + a.screen.scale * a.camera.x * HALF_CANVAS_WIDTH);
        a.screen.y = Math.round(HALF_CANVAS_HEIGHT - a.screen.scale * a.camera.y * HALF_CANVAS_HEIGHT);
        a.screen.w = Math.round(a.screen.scale * ROAD_PER_HALF_CANVAS_WIDTH)
    },
    overlap: function(a, f, c, g, h) {
        h = .5 * (h || 1);
        return !(a + f * h < c - g * h || a - f * h > c + g * h)
    }
};
function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.isEnabled && (s_bFullscreen = screenfull.isFullscreen,
    null !== s_oInterface && s_oInterface.resetFullscreenBut(),
    null !== s_oWorldMenu && s_oWorldMenu.resetFullscreenBut(),
    null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.isEnabled)
    screenfull.on("change", function() {
        s_bFullscreen = screenfull.isFullscreen;
        null !== s_oInterface && s_oInterface.resetFullscreenBut();
        null !== s_oWorldMenu && s_oWorldMenu.resetFullscreenBut();
        null !== s_oMenu && s_oMenu.resetFullscreenBut()
    });
function CSpriteLibrary() {
    var a = {}, f, c, g, h, d, b;
    this.init = function(e, k, l) {
        f = {};
        g = c = 0;
        h = e;
        d = k;
        b = l
    }
    ;
    this.addSprite = function(e, k) {
        if (a.hasOwnProperty(e))
            return !1;
        var l = new Image;
        a[e] = f[e] = {
            szPath: k,
            oSprite: l,
            bLoaded: !1
        };
        c++;
        return !0
    }
    ;
    this.getSprite = function(e) {
        return a.hasOwnProperty(e) ? a[e].oSprite : null
    }
    ;
    this._onSpritesLoaded = function() {
        c = 0;
        d.call(b)
    }
    ;
    this._onSpriteLoaded = function() {
        h.call(b);
        ++g === c && this._onSpritesLoaded()
    }
    ;
    this.loadSprites = function() {
        for (var e in f)
            f[e].oSprite.oSpriteLibrary = this,
            f[e].oSprite.szKey = e,
            f[e].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }
            ,
            f[e].oSprite.onerror = function(k) {
                var l = k.currentTarget;
                setTimeout(function() {
                    f[l.szKey].oSprite.src = f[l.szKey].szPath
                }, 500)
            }
            ,
            f[e].oSprite.src = f[e].szPath
    }
    ;
    this.setLoaded = function(e) {
        a[e].bLoaded = !0
    }
    ;
    this.isLoaded = function(e) {
        return a[e].bLoaded
    }
    ;
    this.getNumSprites = function() {
        return c
    }
}
var CANVAS_WIDTH = 1600, CANVAS_HEIGHT = 960, EDGEBOARD_X = 256, EDGEBOARD_Y = 100, FPS = 60, FPS_DT = 1 / FPS, FPS_TIME = 1E3 / FPS, DISABLE_SOUND_MOBILE = !1, GAME_NAME = "car_rush", PRIMARY_FONT = "ArialBold", SECONDARY_FONT = "Digital", PRIMARY_FONT_COLOUR = "#000000", STATE_LOADING = 0, STATE_MENU = 1, STATE_HELP = 1, STATE_GAME = 3, ON_MOUSE_DOWN = 0, ON_MOUSE_UP = 1, ON_MOUSE_OVER = 2, ON_MOUSE_OUT = 3, ON_DRAG_START = 4, ON_DRAG_END = 5, STATE_GAME_START = 0, STATE_GAME_RACE = 1, STATE_GAME_END = 2, KEY_UP = 38, KEY_DOWN = 40, KEY_RIGHT = 39, KEY_LEFT = 37, KEY_SPACE = 32, NUM_WORLDS = 3, NUM_TRACKS_PER_WORLD = 3, START_COUNTDOWN = 3E3, FOV = 100, CAMERA_HEIGHT = 1E3, CAMERA_DEPTH = 1 / Math.tan(FOV / 2 * Math.PI / 180), PLAYER_Z_FROMCAMERA = CAMERA_HEIGHT * CAMERA_DEPTH, CAR_SIDEVIEW_OFFSET = .2, CAR_FARVIEW_OFFSET = 2600, CAR_CURVEVIEW_OFFSET = .4, PARALLAX_RATIO_X = 2, PARALLAX_RATIO_Y_0 = .004, PARALLAX_RATIO_Y_1 = .005, PLAYER_MAX_SPEED, PLAYER_ACCELERATION, PLAYER_DECELERATION, PLAYER_REAL_MAX_SPEED, CENTRIFUGAL_FORCE = .3, PLAYER_COLLIDER_WIDTH = .22, PLAYER_MIN_SPEED_DAMAGE, TERRAIN_MAX_INERTIA = .03, TERRAIN_INCREASE_INERTIA = .005, TERRAIN_DECREASE_INERTIA = .002, TERRAIN_ADHERENCE = 1, DRAW_DISTANCE = 300, ROAD_WIDTH = 2E3, NUM_LANES = 4, SEGMENT_LENGTH = 200, RUMBLE_LENGTH = 3, TRACK_LENGTH, ROAD_BOUNDS = 2, FOG_DENSITY = 5, ROAD = {
    TYPE: {
        STANDARD: 0,
        CURVE_S: 1,
        BUMPS: 2,
        FINAL: 3
    },
    LENGTH: {
        NONE: 0,
        SHORT: 25,
        MEDIUM: 50,
        LONG: 100,
        EXTRALONG: 200
    },
    HILL: {
        NONE: 0,
        LOW: 20,
        MEDIUM: 40,
        HIGH: 60,
        VERYHIGH: 80
    },
    CURVE: {
        NONE: 0,
        EASY: 2,
        MEDIUM: 4,
        HARD: 6,
        VERYHARD: 8
    }
}, AMBIENT = {
    DISPOSITION: {
        PRECISE: 0,
        DENSITY: 1
    },
    SIDE: {
        LEFT: -1,
        RIGHT: 1,
        BOTH: 2
    }
}, COLORS = {
    LIGHT: {
        road: "#6B6B6B",
        grass: "#96a54b",
        rumble: "#555555",
        lane: "#CCCCCC"
    },
    DARK: {
        road: "#696969",
        grass: "#7e8b3e",
        rumble: "#BBBBBB"
    },
    START: {
        road: "white",
        grass: "white",
        rumble: "white"
    },
    FINISH: {
        road: "black",
        grass: "black",
        rumble: "black"
    }
}, SPRITES = {
    TREE1: {
        name: "tree1",
        collision: {
            center: 240,
            width: 70
        }
    },
    TREE2: {
        name: "tree2",
        collision: {
            center: 170,
            width: 140
        }
    },
    DEAD_TREE: {
        name: "dead_tree",
        collision: {
            center: 90,
            width: 15
        }
    },
    BUSH1: {
        name: "bush1",
        collision: {
            width: 50
        }
    },
    BUSH2: {
        name: "bush2",
        collision: {
            width: 50
        }
    },
    STUMP: {
        name: "stump",
        collision: {
            width: 70
        }
    },
    PALM_TREE: {
        name: "palm_tree",
        collision: {
            center: 156,
            width: 6
        }
    },
    COLUMN: {
        name: "column"
    },
    CACTUS1: {
        name: "cactus1",
        collision: {
            width: 100
        }
    },
    CACTUS2: {
        name: "cactus2",
        collision: {
            center: 48,
            width: 70
        }
    },
    SIGN_CURVE_RIGHT: {
        name: "sign_curve_right"
    },
    SIGN_CURVE_LEFT: {
        name: "sign_curve_left"
    },
    SIGN_INDICATION: {
        name: "sign_indication"
    },
    LAMP_LEFT: {
        name: "lamp_left",
        collision: {
            center: 5,
            width: 1
        }
    },
    LAMP_RIGHT: {
        name: "lamp_right",
        collision: {
            center: 75,
            width: 1
        }
    },
    HOUSE1: {
        name: "house1",
        collision: {
            width: 300
        }
    },
    HOUSE2: {
        name: "house2",
        collision: {
            width: 300
        }
    },
    BILLBOARD01: {
        name: "billboard01"
    },
    BILLBOARD02: {
        name: "billboard02"
    },
    BILLBOARD03: {
        name: "billboard03"
    },
    BILLBOARD04: {
        name: "billboard04"
    },
    BILLBOARD05: {
        name: "billboard05"
    },
    BOULDER: {
        name: "boulder",
        collision: {
            width: 600
        }
    },
    SEMI: {
        name: "semi"
    },
    BUS: {
        name: "bus"
    },
    CAR01: {
        name: "car01"
    },
    CAR02: {
        name: "car02"
    },
    CAR03: {
        name: "car03"
    },
    SCALE: .00375
};
SPRITES.BILLBOARDS = [SPRITES.BILLBOARD01.name, SPRITES.BILLBOARD02.name, SPRITES.BILLBOARD03.name, SPRITES.BILLBOARD04.name, SPRITES.BILLBOARD05.name];
SPRITES.PLANTS = [SPRITES.TREE1.name, SPRITES.TREE2.name, SPRITES.DEAD_TREE.name, SPRITES.PALM_TREE.name, SPRITES.BUSH1.name, SPRITES.BUSH2.name, SPRITES.CACTUS1.name, SPRITES.STUMP.name, SPRITES.BOULDER.name];
SPRITES.CARS = [SPRITES.CAR01.name, SPRITES.CAR02.name, SPRITES.CAR03.name, SPRITES.SEMI.name, SPRITES.BUS.name];
var HALF_CANVAS_WIDTH = CANVAS_WIDTH / 2, HALF_CANVAS_HEIGHT = CANVAS_HEIGHT / 2, ROAD_PER_HALF_CANVAS_WIDTH = HALF_CANVAS_WIDTH * ROAD_WIDTH, ROAD_PER_SCALE_PER_HALF_CANVAS_WIDTH = SPRITES.SCALE * ROAD_PER_HALF_CANVAS_WIDTH, PLAYER_SPEED_CONVERSION_RATIO = PLAYER_REAL_MAX_SPEED / PLAYER_MAX_SPEED, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SOUNDTRACK_VOLUME_IN_GAME = .5, POINTS_PER_SECONDS, AD_SHOW_COUNTER;
TEXT_PRELOADER_CONTINUE = "START";
TEXT_GAMEOVER = "CONGRATULATIONS! YOU COMPLETED ALL TRACKS!";
TEXT_TIME_IS_UP = "TIME IS UP!";
TEXT_SCORE = "SCORE";
TEXT_GO = "GO!";
TEXT_SPEED_INDICATOR = "Km/h";
TEXT_SAVE_REMOVE = "THIS WILL REMOVE ALL YOUR ACHIEVEMENTS! DO YOU WANT TO PROCEED?";
TEXT_ARE_SURE = "ARE YOU SURE?";
TEXT_TRACK_COMPLETED = "TRACK COMPLETED";
TEXT_SELECT_WORLD = "SELECT THE WORLD YOU WANT TO PLAY";
TEXT_SELECT_TRACK = "SELECT TRACK";
TEXT_HELP1 = "USE ARROW KEY TO MOVE THE CAR: UP FOR ACCELERATION AND DOWN FOR BRAKE";
TEXT_HELP1_MOBILE = "USE BUTTONS TO MOVE THE CAR";
TEXT_HELP2 = "REACH THE END, BEFORE TIME GOES UP";
TEXT_DEVELOPED = "DEVELOPED BY";
TEXT_IOS_PRIVATE = 'Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some info may not save or some features may not work properly';
TEXT_SHARE_IMAGE = "200x200.jpg";
TEXT_SHARE_TITLE = "Congratulations!";
TEXT_SHARE_MSG1 = "You collected <strong>";
TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Can you do better";
function CPreloader() {
    var a, f, c, g, h, d, b, e, k, l;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
        s_oSpriteLibrary.loadSprites();
        l = new createjs.Container;
        s_oStage.addChild(l)
    }
    ;
    this.unload = function() {
        l.removeAllChildren();
        k.unload()
    }
    ;
    this._onImagesLoaded = function() {}
    ;
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    }
    ;
    this.attachSprites = function() {
        var p = new createjs.Shape;
        p.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.addChild(p);
        p = s_oSpriteLibrary.getSprite("200x200");
        b = createBitmap(p);
        b.regX = .5 * p.width;
        b.regY = .5 * p.height;
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2 - 180;
        l.addChild(b);
        e = new createjs.Shape;
        e.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(b.x - 100, b.y - 100, 200, 200, 10);
        l.addChild(e);
        b.mask = e;
        p = s_oSpriteLibrary.getSprite("progress_bar");
        g = createBitmap(p);
        g.x = CANVAS_WIDTH / 2 - p.width / 2;
        g.y = CANVAS_HEIGHT / 2 + 50;
        l.addChild(g);
        a = p.width;
        f = p.height;
        h = new createjs.Shape;
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(g.x, g.y, 1, f);
        l.addChild(h);
        g.mask = h;
        c = new createjs.Text("","30px " + PRIMARY_FONT,"#FFF");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2 + 100;
        c.textBaseline = "alphabetic";
        c.textAlign = "center";
        l.addChild(c);
        p = s_oSpriteLibrary.getSprite("but_start");
        k = new CTextButton(CANVAS_WIDTH / 2,CANVAS_HEIGHT / 2,p,TEXT_PRELOADER_CONTINUE,"Arial","#000","bold 50",l);
        k.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
        k.setVisible(!1);
        d = new createjs.Shape;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.addChild(d);
        createjs.Tween.get(d).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(d);
            l.removeChild(d)
        })
    }
    ;
    this._onButStartRelease = function() {
        s_oMain._onRemovePreloader()
    }
    ;
    this.refreshLoader = function(p) {
        c.text = p + "%";
        100 === p && (s_oMain._onRemovePreloader(),
        c.visible = !1,
        g.visible = !1);
        h.graphics.clear();
        p = Math.floor(p * a / 100);
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(g.x, g.y, p, f)
    }
    ;
    this._init()
}
function CMain(a) {
    var f, c = 0, g = 0, h = STATE_LOADING, d, b;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = !1;
        createjs.Touch.enable(s_oStage);
        s_bMobile = isMobile();
        !1 === s_bMobile && (s_oStage.enableMouseOver(20),
        $("body").on("contextmenu", "#canvas", function(k) {
            return !1
        }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        d = new CPreloader;
        s_oLocalStorage = new CLocalStorage(GAME_NAME)
    }
    ;
    this.preloaderReady = function() {
        this._loadImages();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        f = !0
    }
    ;
    this.soundLoaded = function() {
        c++;
        d.refreshLoader(Math.floor(c / g * 100))
    }
    ;
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "menu_soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "menu_soundtrack"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "game_soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "game_soundtrack"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "press_button",
            loop: !1,
            volume: 1,
            ingamename: "click"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "1",
            loop: !1,
            volume: 1,
            ingamename: "1"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "2",
            loop: !1,
            volume: 1,
            ingamename: "2"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "3",
            loop: !1,
            volume: 1,
            ingamename: "3"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "go",
            loop: !1,
            volume: 1,
            ingamename: "go"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "arrive_lose",
            loop: !1,
            volume: 1,
            ingamename: "arrive_lose"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "arrive_win",
            loop: !1,
            volume: 1,
            ingamename: "arrive_win"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "sprint_start",
            loop: !1,
            volume: 1,
            ingamename: "sprint_start"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "crash",
            loop: !1,
            volume: 1,
            ingamename: "crash"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "brake",
            loop: !1,
            volume: 1,
            ingamename: "brake"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "engine",
            loop: !0,
            volume: 1,
            ingamename: "engine"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "engine_stall",
            loop: !0,
            volume: 1,
            ingamename: "engine_stall"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "engine_reverse",
            loop: !0,
            volume: 1,
            ingamename: "engine_reverse"
        });
        g += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var k = 0; k < s_aSoundsInfo.length; k++)
            this.tryToLoadSound(s_aSoundsInfo[k], !1)
    }
    ;
    this.tryToLoadSound = function(k, l) {
        setTimeout(function() {
            s_aSounds[k.ingamename] = new Howl({
                src: [k.path + k.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: k.loop,
                volume: k.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(p, m) {
                    for (var n = 0; n < s_aSoundsInfo.length; n++)
                        if (p === s_aSounds[s_aSoundsInfo[n].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[n], !0);
                            break
                        }
                },
                onplayerror: function(p) {
                    for (var m = 0; m < s_aSoundsInfo.length; m++)
                        if (p === s_aSounds[s_aSoundsInfo[m].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[m].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[m].ingamename].play();
                                "game_soundtrack" === s_aSoundsInfo[m].ingamename && null !== s_oGame && setVolume("game_soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, l ? 200 : 0)
    }
    ;
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("keys", "./sprites/keys.png");
        s_oSpriteLibrary.addSprite("star", "./sprites/star.png");
        s_oSpriteLibrary.addSprite("best_time", "./sprites/best_time.png");
        s_oSpriteLibrary.addSprite("timer", "./sprites/timer.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite("bg_select", "./sprites/bg_select.jpg");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_delete_saving", "./sprites/but_delete_saving.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_level", "./sprites/but_level.png");
        s_oSpriteLibrary.addSprite("but_world0", "./sprites/but_world0.png");
        s_oSpriteLibrary.addSprite("but_world1", "./sprites/but_world1.png");
        s_oSpriteLibrary.addSprite("but_world2", "./sprites/but_world2.png");
        s_oSpriteLibrary.addSprite("w0_bg0", "./sprites/backgrounds/world_0/bg0.png");
        s_oSpriteLibrary.addSprite("w0_bg1", "./sprites/backgrounds/world_0/bg1.png");
        s_oSpriteLibrary.addSprite("w1_bg0", "./sprites/backgrounds/world_1/bg0.png");
        s_oSpriteLibrary.addSprite("w1_bg1", "./sprites/backgrounds/world_1/bg1.png");
        s_oSpriteLibrary.addSprite("w2_bg0", "./sprites/backgrounds/world_2/bg0.png");
        s_oSpriteLibrary.addSprite("w2_bg1", "./sprites/backgrounds/world_2/bg1.png");
        s_oSpriteLibrary.addSprite("key_up", "./sprites/key_up.png");
        s_oSpriteLibrary.addSprite("key_down", "./sprites/key_down.png");
        s_oSpriteLibrary.addSprite("key_left", "./sprites/key_left.png");
        s_oSpriteLibrary.addSprite("key_right", "./sprites/key_right.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_next", "./sprites/but_next.png");
        s_oSpriteLibrary.addSprite("time_panel", "./sprites/time_panel.png");
        s_oSpriteLibrary.addSprite("tachometer", "./sprites/tachometer.png");
        s_oSpriteLibrary.addSprite("baloon_mc", "./sprites/baloon_mc.png");
        for (var k = 1; 5 >= k; k++)
            s_oSpriteLibrary.addSprite("billboard0" + k, "./sprites/elements/billboard0" + k + ".png");
        s_oSpriteLibrary.addSprite("boulder", "./sprites/elements/boulder.png");
        s_oSpriteLibrary.addSprite("finish", "./sprites/elements/finish.png");
        s_oSpriteLibrary.addSprite("bush1", "./sprites/elements/world_0/bush1.png");
        s_oSpriteLibrary.addSprite("bush2", "./sprites/elements/world_0/bush2.png");
        s_oSpriteLibrary.addSprite("dead_tree", "./sprites/elements/world_0/dead_tree.png");
        s_oSpriteLibrary.addSprite("stump", "./sprites/elements/world_0/stump.png");
        s_oSpriteLibrary.addSprite("tree1", "./sprites/elements/world_0/tree1.png");
        s_oSpriteLibrary.addSprite("tree2", "./sprites/elements/world_0/tree2.png");
        s_oSpriteLibrary.addSprite("cactus1", "./sprites/elements/world_1/cactus1.png");
        s_oSpriteLibrary.addSprite("cactus2", "./sprites/elements/world_1/cactus2.png");
        s_oSpriteLibrary.addSprite("palm_tree", "./sprites/elements/world_1/palm_tree.png");
        s_oSpriteLibrary.addSprite("column", "./sprites/elements/world_1/column.png");
        s_oSpriteLibrary.addSprite("sign_curve_left", "./sprites/elements/world_2/sign_curve_left.png");
        s_oSpriteLibrary.addSprite("sign_curve_right", "./sprites/elements/world_2/sign_curve_right.png");
        s_oSpriteLibrary.addSprite("sign_indication", "./sprites/elements/world_2/sign_indication.png");
        s_oSpriteLibrary.addSprite("lamp_left", "./sprites/elements/world_2/lamp_left.png");
        s_oSpriteLibrary.addSprite("lamp_right", "./sprites/elements/world_2/lamp_right.png");
        s_oSpriteLibrary.addSprite("house1", "./sprites/elements/world_2/house1.png");
        s_oSpriteLibrary.addSprite("house2", "./sprites/elements/world_2/house2.png");
        for (k = 1; 3 >= k; k++)
            s_oSpriteLibrary.addSprite("car0" + k + "_center", "./sprites/cars/car0" + k + "/car0" + k + "_center.png"),
            s_oSpriteLibrary.addSprite("car0" + k + "_left", "./sprites/cars/car0" + k + "/car0" + k + "_left.png"),
            s_oSpriteLibrary.addSprite("car0" + k + "_right", "./sprites/cars/car0" + k + "/car0" + k + "_right.png");
        s_oSpriteLibrary.addSprite("semi_center", "./sprites/cars/semi/semi_center.png");
        s_oSpriteLibrary.addSprite("semi_left", "./sprites/cars/semi/semi_left.png");
        s_oSpriteLibrary.addSprite("semi_right", "./sprites/cars/semi/semi_right.png");
        s_oSpriteLibrary.addSprite("bus_center", "./sprites/cars/bus/bus_center.png");
        s_oSpriteLibrary.addSprite("bus_left", "./sprites/cars/bus/bus_left.png");
        s_oSpriteLibrary.addSprite("bus_right", "./sprites/cars/bus/bus_right.png");
        s_oSpriteLibrary.addSprite("player", "./sprites/player.png");
        g += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    }
    ;
    this._onImagesLoaded = function() {
        c++;
        d.refreshLoader(Math.floor(c / g * 100))
    }
    ;
    this._onRemovePreloader = function() {
        d.unload();
        playSound("menu_soundtrack", 1, !0);
        this.gotoMenu()
    }
    ;
    this._onAllImagesLoaded = function() {}
    ;
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    }
    ;
    this.gotoMenu = function() {
        new CMenu;
        h = STATE_MENU
    }
    ;
    this.gotoWorldMenu = function() {
        new CWorldMenu;
        h = STATE_MENU
    }
    ;
    this.gotoGame = function(k) {
        b = new CGame(e,k);
        h = STATE_GAME
    }
    ;
    this.gotoHelp = function() {
        new CHelp;
        h = STATE_HELP
    }
    ;
    this.stopUpdate = function() {
        f = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        Howler.mute(!0)
    }
    ;
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        f = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        s_bAudioActive && Howler.mute(!1)
    }
    ;
    this._update = function(k) {
        if (!1 !== f) {
            var l = (new Date).getTime();
            s_iTimeElaps = l - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = l;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps,
            s_iCntTime -= 1E3,
            s_iCntFps = 0);
            s_oStage.update(k);
            h === STATE_GAME && b.update()
        }
    }
    ;
    s_oMain = this;
    var e = a;
    ENABLE_FULLSCREEN = a.fullscreen;
    ENABLE_CHECK_ORIENTATION = a.check_orientation;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0, s_iCntTime = 0, s_iTimeElaps = 0, s_iPrevTime = 0, s_iCntFps = 0, s_iCurFps = 1 / FPS_DT, s_bFullscreen = !1, s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack, s_oCanvas, s_oLocalStorage, s_aSounds = [], s_aSoundsInfo;
function CCreditsPanel() {
    var a, f, c, g, h;
    this._init = function() {
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = 0;
        f.on("click", function() {});
        s_oStage.addChild(f);
        (new createjs.Tween.get(f)).to({
            alpha: .7
        }, 500);
        c = new createjs.Container;
        s_oStage.addChild(c);
        var d = s_oSpriteLibrary.getSprite("msg_box")
          , b = createBitmap(d);
        b.regX = d.width / 2;
        b.regY = d.height / 2;
        c.addChild(b);
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT + d.height / 2 + 50;
        a = c.y;
        (new createjs.Tween.get(c)).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.quartIn);
        b = new createjs.Text(TEXT_DEVELOPED," 40px " + PRIMARY_FONT,"#ffffff");
        b.y = -d.height / 2 + 110;
        b.textAlign = "center";
        b.textBaseline = "middle";
        b.lineWidth = 400;
        c.addChild(b);
        d = new createjs.Text("www.codethislab.com"," 40px " + PRIMARY_FONT,"#ffffff");
        d.y = 90;
        d.textAlign = "center";
        d.textBaseline = "middle";
        d.lineWidth = 400;
        c.addChild(d);
        d = s_oSpriteLibrary.getSprite("ctl_logo");
        h = createBitmap(d);
        h.on("click", this._onLogoButRelease);
        h.regX = d.width / 2;
        h.regY = d.height / 2;
        c.addChild(h);
        d = s_oSpriteLibrary.getSprite("but_exit");
        g = new CGfxButton(326,-200,d,c);
        g.addEventListener(ON_MOUSE_UP, this.unload, this)
    }
    ;
    this.unload = function() {
        g.setClickable(!1);
        (new createjs.Tween.get(f)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(c)).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            s_oStage.removeChild(f);
            s_oStage.removeChild(c);
            g.unload()
        });
        f.removeAllEventListeners();
        h.removeAllEventListeners()
    }
    ;
    this._onLogoButRelease = function() {
        window.open("http://www.codethislab.com/index.php?&l=en")
    }
    ;
    this._init()
}
function CTextButton(a, f, c, g, h, d, b) {
    var e, k, l, p, m, n, u;
    this._init = function(v, A, w, t, q, y, D) {
        e = [];
        k = [];
        var C = createBitmap(w)
          , x = Math.ceil(D / 20);
        u = new createjs.Text(t,D + "px " + q,"#000000");
        u.textAlign = "center";
        u.textBaseline = "alphabetic";
        var F = u.getBounds();
        u.x = w.width / 2 + x;
        u.y = Math.floor(w.height / 2) + F.height / 3 + x;
        n = new createjs.Text(t,D + "px " + q,y);
        n.textAlign = "center";
        n.textBaseline = "alphabetic";
        F = n.getBounds();
        n.x = w.width / 2;
        n.y = Math.floor(w.height / 2) + F.height / 3;
        m = new createjs.Container;
        m.x = v;
        m.y = A;
        m.regX = w.width / 2;
        m.regY = w.height / 2;
        m.addChild(C, u, n);
        s_oStage.addChild(m);
        this._initListener()
    }
    ;
    this.unload = function() {
        m.off("mousedown", l);
        m.off("pressup", p);
        s_oStage.removeChild(m)
    }
    ;
    this.setVisible = function(v) {
        m.visible = v
    }
    ;
    this._initListener = function() {
        l = m.on("mousedown", this.buttonDown);
        p = m.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(v, A, w) {
        e[v] = A;
        k[v] = w
    }
    ;
    this.buttonRelease = function() {
        m.scaleX = 1;
        m.scaleY = 1;
        e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(k[ON_MOUSE_UP])
    }
    ;
    this.buttonDown = function() {
        m.scaleX = .9;
        m.scaleY = .9;
        e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN])
    }
    ;
    this.setTextPosition = function(v) {
        n.y = v;
        u.y = v + 2
    }
    ;
    this.setPosition = function(v, A) {
        m.x = v;
        m.y = A
    }
    ;
    this.setX = function(v) {
        m.x = v
    }
    ;
    this.setY = function(v) {
        m.y = v
    }
    ;
    this.getButtonImage = function() {
        return m
    }
    ;
    this.getX = function() {
        return m.x
    }
    ;
    this.getY = function() {
        return m.y
    }
    ;
    this._init(a, f, c, g, h, d, b);
    return this
}
function CToggle(a, f, c, g) {
    var h, d, b, e, k, l;
    this._init = function(p, m, n, u) {
        d = [];
        b = [];
        var v = new createjs.SpriteSheet({
            images: [n],
            frames: {
                width: n.width / 2,
                height: n.height,
                regX: n.width / 2 / 2,
                regY: n.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        h = u;
        l = createSprite(v, "state_" + h, n.width / 2 / 2, n.height / 2, n.width / 2, n.height);
        l.x = p;
        l.y = m;
        l.stop();
        s_oStage.addChild(l);
        this._initListener()
    }
    ;
    this.unload = function() {
        l.off("mousedown", e);
        l.off("pressup", k);
        s_oStage.removeChild(l)
    }
    ;
    this._initListener = function() {
        e = l.on("mousedown", this.buttonDown);
        k = l.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(p, m, n) {
        d[p] = m;
        b[p] = n
    }
    ;
    this.setActive = function(p) {
        h = p;
        l.gotoAndStop("state_" + h)
    }
    ;
    this.buttonRelease = function() {
        l.scaleX = 1;
        l.scaleY = 1;
        playSound("click", 1, !1);
        h = !h;
        l.gotoAndStop("state_" + h);
        d[ON_MOUSE_UP] && d[ON_MOUSE_UP].call(b[ON_MOUSE_UP], h)
    }
    ;
    this.buttonDown = function() {
        l.scaleX = .9;
        l.scaleY = .9;
        d[ON_MOUSE_DOWN] && d[ON_MOUSE_DOWN].call(b[ON_MOUSE_DOWN])
    }
    ;
    this.setPosition = function(p, m) {
        l.x = p;
        l.y = m
    }
    ;
    this._init(a, f, c, g)
}
function CGfxButton(a, f, c, g) {
    var h, d, b, e, k = [], l, p, m, n;
    this._init = function(v, A, w, t) {
        h = !1;
        d = 1;
        b = [];
        e = [];
        n = createBitmap(w);
        n.x = v;
        n.y = A;
        n.scaleX = n.scaleY = d;
        n.regX = w.width / 2;
        n.regY = w.height / 2;
        t.addChild(n);
        this._initListener()
    }
    ;
    this.unload = function() {
        n.off("mousedown", l);
        n.off("pressup", p);
        s_bMobile || n.off("mouseover", m);
        g.removeChild(n)
    }
    ;
    this.setVisible = function(v) {
        n.visible = v
    }
    ;
    this.setClickable = function(v) {
        h = !v
    }
    ;
    this._initListener = function() {
        l = n.on("mousedown", this.buttonDown);
        p = n.on("pressup", this.buttonRelease);
        s_bMobile || (m = n.on("mouseover", this.buttonOver))
    }
    ;
    this.addEventListener = function(v, A, w) {
        b[v] = A;
        e[v] = w
    }
    ;
    this.addEventListenerWithParams = function(v, A, w, t) {
        b[v] = A;
        e[v] = w;
        k = t
    }
    ;
    this.buttonRelease = function() {
        h || (n.scaleX = d,
        n.scaleY = d,
        b[ON_MOUSE_UP] && b[ON_MOUSE_UP].call(e[ON_MOUSE_UP], k))
    }
    ;
    this.buttonDown = function() {
        h || (n.scaleX = .9 * d,
        n.scaleY = .9 * d,
        playSound("click", 1, !1),
        b[ON_MOUSE_DOWN] && b[ON_MOUSE_DOWN].call(e[ON_MOUSE_DOWN], k))
    }
    ;
    this.buttonOver = function(v) {
        s_bMobile || h || (v.target.cursor = "pointer")
    }
    ;
    this.pulseAnimation = function() {
        createjs.Tween.get(n).to({
            scaleX: 1.1 * d,
            scaleY: 1.1 * d
        }, 850, createjs.Ease.quadOut).to({
            scaleX: d,
            scaleY: d
        }, 650, createjs.Ease.quadIn).call(function() {
            u.pulseAnimation()
        })
    }
    ;
    this.trembleAnimation = function() {
        createjs.Tween.get(n).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            u.trebleAnimation()
        })
    }
    ;
    this.setPosition = function(v, A) {
        n.x = v;
        n.y = A
    }
    ;
    this.setX = function(v) {
        n.x = v
    }
    ;
    this.setY = function(v) {
        n.y = v
    }
    ;
    this.getButtonImage = function() {
        return n
    }
    ;
    this.getX = function() {
        return n.x
    }
    ;
    this.getY = function() {
        return n.y
    }
    ;
    var u = this;
    this._init(a, f, c, g);
    return this
}
function CMenu() {
    var a, f, c, g, h, d, b, e, k, l, p, m, n, u, v, A = null, w = null;
    this._init = function() {
        k = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(k);
        var t = s_oSpriteLibrary.getSprite("but_play");
        l = new CGfxButton(CANVAS_WIDTH / 2 + 350,CANVAS_HEIGHT - 220,t,s_oStage);
        l.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        l.pulseAnimation();
        t = s_oSpriteLibrary.getSprite("logo_menu");
        var q = createBitmap(t);
        q.regX = t.width / 2;
        q.regY = t.height / 2;
        q.x = CANVAS_WIDTH / 2;
        q.y = CANVAS_HEIGHT / 2 - 150;
        s_oStage.addChild(q);
        t = s_oSpriteLibrary.getSprite("but_credits");
        h = t.width / 2 + 12;
        d = t.height / 2 + 16;
        n = new CGfxButton(h,d,t,s_oStage);
        n.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);
        q = CANVAS_WIDTH;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            t = s_oSpriteLibrary.getSprite("audio_icon"),
            b = CANVAS_WIDTH - t.width / 4 - 12,
            e = t.height / 2 + 16,
            m = new CToggle(b,e,t,s_bAudioActive),
            m.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
            q = b - t.width / 4;
        s_oLocalStorage.isDirty() && (t = s_oSpriteLibrary.getSprite("but_delete_saving"),
        a = q - t.width / 2 - 12,
        f = t.height / 2 + 16,
        v = new CGfxButton(a,f,t,s_oStage),
        v.addEventListener(ON_MOUSE_UP, this._onDeleteBut, this));
        t = window.document;
        q = t.documentElement;
        A = q.requestFullscreen || q.mozRequestFullScreen || q.webkitRequestFullScreen || q.msRequestFullscreen;
        w = t.exitFullscreen || t.mozCancelFullScreen || t.webkitExitFullscreen || t.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (A = !1);
        A && screenfull.isEnabled && (t = s_oSpriteLibrary.getSprite("but_fullscreen"),
        c = h + t.width / 2 + 12,
        g = t.height / 2 + 16,
        u = new CToggle(c,g,t,s_bFullscreen,s_oStage),
        u.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        p = new createjs.Shape;
        p.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(p);
        createjs.Tween.get(p).to({
            alpha: 0
        }, 1E3).call(function() {
            p.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_oLocalStorage.isUsed() || new CMsgBox(TEXT_IOS_PRIVATE)
    }
    ;
    this.unload = function() {
        l.unload();
        l = null;
        p.visible = !1;
        n.unload();
        v && s_oLocalStorage.isDirty() && v.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            m.unload(),
            m = null;
        A && screenfull.isEnabled && u.unload();
        s_oStage.removeChild(k);
        s_oMenu = k = null
    }
    ;
    this.refreshButtonPos = function(t, q) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || m.setPosition(b - t, q + e);
        n.setPosition(h + t, q + d);
        A && screenfull.isEnabled && u.setPosition(c + t, g + q);
        v && s_oLocalStorage.isDirty() && v.setPosition(a - t, f + q)
    }
    ;
    this.resetFullscreenBut = function() {
        A && screenfull.isEnabled && u.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? w.call(window.document) : A.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    this._onCreditsBut = function() {
        new CCreditsPanel
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onDeleteBut = function() {
        (new CAreYouSurePanel(s_oMenu.deleteSavings)).changeMessage(TEXT_SAVE_REMOVE, 24)
    }
    ;
    this.deleteSavings = function() {
        s_oLocalStorage.deleteData();
        s_oLocalStorage.resetData();
        v.unload()
    }
    ;
    this._onButPlayRelease = function() {
        this.unload();
        $(s_oMain).trigger("start_session");
        s_oMain.gotoWorldMenu()
    }
    ;
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;
function CGame(a, f) {
    function c(x) {
        x.preventDefault();
        s_oGame.onKeyUp(x.keyCode)
    }
    function g(x) {
        x || (x = window.event);
        x.preventDefault();
        s_oGame.onKeyDown(x.keyCode)
    }
    var h, d, b, e, k, l, p, m, n, u, v, A = null, w, t, q, y, D, C;
    this._init = function(x) {
        l = x;
        u = [];
        D = new CHorizon(l);
        q = new createjs.Shape;
        s_oStage.addChild(q);
        y = new createjs.Container;
        s_oStage.addChild(y);
        t = new CRoad(q,y,l);
        w = new CPlayer(CANVAS_WIDTH / 2,980,s_oStage);
        u = t.getSegments();
        TRACK_LENGTH = t.getTrackLength();
        v = new CInterface;
        C = [];
        new CLevelBuilder(w,C,y,x);
        this.resetParams()
    }
    ;
    this.getWorldCameraPos = function() {
        var x = w.getPosition().z
          , F = u[this.findSegment(x).index].p1.world
          , z = u[this.findSegment(x + SEGMENT_LENGTH).index].p1.world
          , I = (x - F.z) / SEGMENT_LENGTH;
        x = Util.interpolate(F.x, z.x, I);
        F = Util.interpolate(F.y, z.y, I);
        return {
            x: x,
            y: F
        }
    }
    ;
    this.onKeyUp = function(x) {
        if (h)
            switch (x) {
            case KEY_LEFT:
                w.stopLeft();
                break;
            case KEY_UP:
                w.stopAccelerate();
                break;
            case KEY_RIGHT:
                w.stopRight();
                break;
            case KEY_DOWN:
                w.stopBrake()
            }
    }
    ;
    this.onKeyDown = function(x) {
        if (h)
            switch (x) {
            case KEY_LEFT:
                w.moveLeft();
                break;
            case KEY_UP:
                w.moveAccelerate();
                break;
            case KEY_RIGHT:
                w.moveRight();
                break;
            case KEY_DOWN:
                w.moveBrake()
            }
    }
    ;
    this.resetParams = function() {
        h = !1;
        stopSound(s_aSounds.game_soundtrack);
        if (0 === l)
            new CHelpPanel;
        else {
            h = !0;
            stopSound(s_aSounds.menu_soundtrack);
            playSound("game_soundtrack", 1, !0);
            $(s_oMain).trigger("start_level", l);
            var x = new createjs.Shape;
            x.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            x.alpha = 1;
            s_oStage.addChild(x);
            (new createjs.Tween.get(x)).to({
                alpha: 0
            }, 750).call(function() {
                s_oStage.removeChild(x)
            })
        }
        m = STATE_GAME_START;
        p = 0;
        k = LEVEL_INFO[l].time;
        e = START_COUNTDOWN;
        D.restart();
        v.refreshTimer(k);
        v.refreshCurTime(0);
        var F = l % NUM_TRACKS_PER_WORLD;
        v.setLevelInfo(s_oSpriteLibrary.getSprite("but_world" + Math.floor(l / NUM_WORLDS)), F + 1);
        s_aTimeScore[l] < LEVEL_INFO[l].time && 0 !== s_aTimeScore[l] ? v.setBestTime(s_aTimeScore[l]) : v.setBestTime(LEVEL_INFO[l].time);
        s_bMobile || (document.onkeydown = g,
        document.onkeyup = c);
        t.clearVisual(w.getPosition());
        n = w.getPlayerSegment();
        w.reset()
    }
    ;
    this.restartGame = function() {
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("restart_level", l);
        this.resetParams()
    }
    ;
    this.unload = function() {
        v.unload();
        null !== A && A.unload();
        stopSound(s_aSounds.menu_soundtrack);
        stopSound(s_aSounds.game_soundtrack);
        stopSound(s_aSounds.engine);
        stopSound(s_aSounds.brake);
        stopSound(s_aSounds.engine_reverse);
        stopSound(s_aSounds.engine_stall);
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren()
    }
    ;
    this.checkDamage = function() {
        w.getCurSpeed() > PLAYER_MIN_SPEED_DAMAGE && !d && (d = !0,
        w.damageAnim(),
        new CTremble(s_oStage,250,20,5))
    }
    ;
    this.endDamageTime = function() {
        d = !1
    }
    ;
    this.trackCompleted = function() {
        D.resetPos();
        m !== STATE_GAME_END && ($(s_oMain).trigger("end_level", l),
        $(s_oMain).trigger("show_interlevel_ad"),
        m = STATE_GAME_END,
        s_oGame.stopPlayer(),
        p = Math.floor(k / 1E3 * POINTS_PER_SECONDS),
        new CNextLevelPanel(k,p,l))
    }
    ;
    this._countDown = function() {
        e -= s_iTimeElaps;
        v.refreshCountdown(e);
        0 >= e && (e = 0,
        m = STATE_GAME_RACE,
        v.countDownGo())
    }
    ;
    this.nextLevel = function() {
        l++;
        l < NUM_TRACKS_PER_WORLD * NUM_WORLDS ? (this.unload(),
        this._init(l)) : this.gameOver()
    }
    ;
    this.trackLose = function() {
        m = STATE_GAME_END;
        s_oGame.stopPlayer();
        $(s_oMain).trigger("end_level", l);
        $(s_oMain).trigger("show_interlevel_ad");
        (new CLosePanel(s_oSpriteLibrary.getSprite("msg_box"))).show(p)
    }
    ;
    this.stopPlayer = function() {
        w.stopAll();
        s_bMobile || (document.onkeydown = null,
        document.onkeyup = null)
    }
    ;
    this.onExit = function() {
        s_oGame.unload();
        $(s_oMain).trigger("end_session");
        playSound("menu_soundtrack", 1, !0);
        s_oMain.gotoMenu()
    }
    ;
    this._onExitHelp = function() {
        h = !0;
        stopSound(s_aSounds.menu_soundtrack);
        playSound("game_soundtrack", 1, !0);
        $(s_oMain).trigger("start_level", 1)
    }
    ;
    this.gameOver = function() {
        A = new CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        A.show(p)
    }
    ;
    this.setPause = function() {
        h = !1;
        w.stopAll()
    }
    ;
    this.setResume = function() {
        h = !0
    }
    ;
    this.update = function() {
        var x = 1 / s_iCurFps;
        switch (m) {
        case STATE_GAME_START:
            h && this._countDown();
            break;
        case STATE_GAME_RACE:
            if (!h)
                return;
            k -= s_iTimeElaps;
            0 > k && (k = 0,
            this.trackLose());
            v.refreshTimer(k);
            v.refreshCurTime(LEVEL_INFO[l].time - k);
            w.update(x);
            break;
        case STATE_GAME_END:
            w.update(x),
            w.autoPilot()
        }
        v.refreshSpeed(w.getCurSpeed() * PLAYER_SPEED_CONVERSION_RATIO);
        t.update(w.getPosition());
        D.move(this.getWorldCameraPos());
        for (var F = 0; F < C.length; F++)
            C[F].update(x, w);
        b = !1;
        this._ambientCollision();
        this._carsCollision();
        n = w.getPlayerSegment()
    }
    ;
    this._ambientCollision = function() {
        if (w.isOutOfRoad())
            for (var x = w.getPlayerSegment().index, F = n.index; F <= x; F++)
                for (var z = u[F], I = 0; I < z.sprites.length; I++) {
                    var J = z.sprites[I];
                    if (Util.overlap(w.getPosition().x, w.getPlayerWidth(), J.collision.center, J.collision.width)) {
                        this.checkDamage();
                        w.setCurSpeed(PLAYER_ACCELERATION);
                        w.setPosition(Util.increase(z.p1.world.z, -PLAYER_Z_FROMCAMERA, TRACK_LENGTH));
                        b = !0;
                        w.stopEngineSound();
                        break
                    }
                }
    }
    ;
    this._carsCollision = function() {
        for (var x, F, z = w.getPlayerSegment().index, I = n.index; I <= z; I++)
            for (var J = u[I], Q = 0; Q < J.cars.length; Q++)
                if (x = J.cars[Q],
                F = x.getSprite().width * SPRITES.SCALE,
                w.getCurSpeed() > x.getSpeed() && Util.overlap(w.getPosition().x, w.getPlayerWidth(), x.getOffset(), F, .8)) {
                    this.checkDamage();
                    w.setCurSpeed(x.getSpeed() * (x.getSpeed() / w.getCurSpeed()));
                    w.setPosition(Util.increase(x.getZ(), -PLAYER_Z_FROMCAMERA, TRACK_LENGTH));
                    b = !0;
                    w.stopEngineSound();
                    break
                }
    }
    ;
    this.playerCollide = function() {
        return b
    }
    ;
    this.findSegment = function(x) {
        return t.findSegment(x)
    }
    ;
    this.getSegments = function() {
        return u
    }
    ;
    s_oGame = this;
    PLAYER_MAX_SPEED = a.player_max_speed;
    PLAYER_ACCELERATION = PLAYER_MAX_SPEED / 5;
    PLAYER_DECELERATION = PLAYER_MAX_SPEED / 8;
    PLAYER_MIN_SPEED_DAMAGE = PLAYER_MAX_SPEED / 3;
    PLAYER_REAL_MAX_SPEED = a.player_maxspeed_indicator;
    PLAYER_SPEED_CONVERSION_RATIO = PLAYER_REAL_MAX_SPEED / PLAYER_MAX_SPEED;
    CENTRIFUGAL_FORCE = a.player_centrifugal_force;
    POINTS_PER_SECONDS = a.points_per_seconds_remaining;
    this._init(f)
}
var s_oGame;
function CInterface() {
    var a, f, c, g, h, d, b, e, k, l, p, m, n, u, v, A, w, t, q, y, D, C, x, F, z, I, J, Q, R, Y, Z, aa, W, O, V = null, r = null;
    this._init = function() {
        var H, G = s_oSpriteLibrary.getSprite("but_exit");
        w = CANVAS_WIDTH - G.width / 2 - 12;
        t = G.height / 2 + 16;
        y = new CGfxButton(w,t,G,s_oStage);
        y.addEventListener(ON_MOUSE_UP, this._onExit, this);
        v = H = w - G.width - 12;
        A = G.height / 2 + 16;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            G = s_oSpriteLibrary.getSprite("audio_icon"),
            q = new CToggle(v,A,G,s_bAudioActive),
            q.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
            H = v - G.width / 2 - 12;
        G = window.document;
        var P = G.documentElement;
        V = P.requestFullscreen || P.mozRequestFullScreen || P.webkitRequestFullScreen || P.msRequestFullscreen;
        r = G.exitFullscreen || G.mozCancelFullScreen || G.webkitExitFullscreen || G.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (V = !1);
        V && screenfull.isEnabled && (G = s_oSpriteLibrary.getSprite("but_fullscreen"),
        h = H,
        d = G.height / 2 + 16,
        aa = new CToggle(h,d,G,s_bFullscreen,s_oStage),
        aa.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        c = 12;
        g = 16;
        D = new createjs.Container;
        s_oStage.addChild(D);
        G = s_oSpriteLibrary.getSprite("time_panel");
        H = createBitmap(G);
        D.addChild(H);
        x = new CTimer(110,50,D,50,"#ffffff","best_time","#000000");
        F = new CTimer(110,120,D,50,"#ffffff","timer","#000000");
        a = CANVAS_WIDTH / 2;
        f = 60;
        C = new CTimer(a,f,s_oStage,100,"#fff000",null,"#000000");
        C.resetTextRelativePos();
        C.setAlign("center", "middle");
        z = new CTachometer(152,CANVAS_HEIGHT - 12);
        I = new createjs.Text(""," 300px " + PRIMARY_FONT,"#3e240b");
        I.x = CANVAS_WIDTH / 2;
        I.y = CANVAS_HEIGHT / 2;
        I.textAlign = "center";
        I.textBaseline = "middle";
        I.lineWidth = 200;
        I.outline = 20;
        s_oStage.addChild(I);
        J = new createjs.Text(""," 300px " + PRIMARY_FONT,"rgba(255,224,0,1)");
        J.x = CANVAS_WIDTH / 2;
        J.y = CANVAS_HEIGHT / 2;
        J.textAlign = "center";
        J.textBaseline = "middle";
        J.lineWidth = 200;
        s_oStage.addChild(J);
        s_bMobile && (H = CANVAS_HEIGHT - 270,
        G = s_oSpriteLibrary.getSprite("key_up"),
        n = CANVAS_WIDTH - 180 + G.width / 2,
        u = H,
        Q = new CGfxButton(n,u,G,s_oStage),
        Q.addEventListenerWithParams(ON_MOUSE_UP, s_oGame.onKeyUp, this, KEY_UP),
        Q.addEventListenerWithParams(ON_MOUSE_DOWN, s_oGame.onKeyDown, this, KEY_UP),
        G = s_oSpriteLibrary.getSprite("key_down"),
        p = CANVAS_WIDTH - 180 - G.width / 2,
        m = H,
        R = new CGfxButton(p,m,G,s_oStage),
        R.addEventListenerWithParams(ON_MOUSE_UP, s_oGame.onKeyUp, this, KEY_DOWN),
        R.addEventListenerWithParams(ON_MOUSE_DOWN, s_oGame.onKeyDown, this, KEY_DOWN),
        G = s_oSpriteLibrary.getSprite("key_left"),
        k = 180 - G.width / 2,
        l = H,
        Y = new CGfxButton(k,l,G,s_oStage),
        Y.addEventListenerWithParams(ON_MOUSE_UP, s_oGame.onKeyUp, this, KEY_LEFT),
        Y.addEventListenerWithParams(ON_MOUSE_DOWN, s_oGame.onKeyDown, this, KEY_LEFT),
        G = s_oSpriteLibrary.getSprite("key_right"),
        b = 180 + G.width / 2,
        e = H,
        Z = new CGfxButton(b,e,G,s_oStage),
        Z.addEventListenerWithParams(ON_MOUSE_UP, s_oGame.onKeyUp, this, KEY_RIGHT),
        Z.addEventListenerWithParams(ON_MOUSE_DOWN, s_oGame.onKeyDown, this, KEY_RIGHT));
        O = [];
        for (H = 0; 3 >= H; H++)
            O[H] = !1;
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            q.unload(),
            q = null;
        V && screenfull.isEnabled && aa.unload();
        y.unload();
        s_oInterface = null;
        s_bMobile && (Q.unload(),
        R.unload(),
        Y.unload(),
        Z.unload())
    }
    ;
    this.refreshButtonPos = function(H, G) {
        y.setPosition(w - H, G + t);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || q.setPosition(v - H, G + A);
        V && screenfull.isEnabled && aa.setPosition(h - H, d + G);
        D.x = c + H;
        D.y = g + G;
        s_bMobile && (Q.setPosition(n - H, u - G),
        R.setPosition(p - H, m - G),
        Y.setPosition(k + H, l - G),
        Z.setPosition(b + H, e - G));
        C.setPos(a, f + G);
        z.updateOffset(H, G)
    }
    ;
    this.resetFullscreenBut = function() {
        V && screenfull.isEnabled && aa.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? r.call(window.document) : V.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    this.refreshTimer = function(H) {
        C.setIntTime(H)
    }
    ;
    this.setBestTime = function(H) {
        x.setDecimalTime(H)
    }
    ;
    this.refreshCurTime = function(H) {
        F.setDecimalTime(H)
    }
    ;
    this.refreshCountdown = function(H) {
        var G = Math.ceil(H / 1E3)
          , P = (1E3 * G - H) / 1E3;
        J.alpha = 1 - P;
        J.scaleX = J.scaleY = P;
        J.text = Math.ceil(H / 1E3);
        I.alpha = J.alpha;
        I.scaleX = I.scaleY = P;
        I.text = J.text;
        if (3 === G && !O[3])
            O[3] = !0,
            playSound("3", 1, 0);
        else if (2 === G && !O[2])
            O[2] = !0,
            playSound("2", 1, 0);
        else if (1 === G && !O[1])
            O[1] = !0,
            playSound("1", 1, 0);
        else if (0 === G)
            for (O[0] = !0,
            playSound("go", 1, 0),
            H = 0; H < O.length; H++)
                O[H] = !1
    }
    ;
    this.refreshSpeed = function(H) {
        z.setSpeedIndicator(H)
    }
    ;
    this.countDownGo = function() {
        J.scaleX = J.scaleY = 1;
        I.scaleX = I.scaleY = J.scaleY;
        J.text = TEXT_GO;
        I.text = TEXT_GO;
        createjs.Tween.get(J).wait(500).to({
            alpha: 0
        }, 1E3, createjs.Ease.cubicIn);
        createjs.Tween.get(I).wait(500).to({
            alpha: 0
        }, 1E3, createjs.Ease.cubicIn)
    }
    ;
    this.setLevelInfo = function(H, G) {
        W && W.unload();
        var P = s_oSpriteLibrary.getSprite("time_panel");
        W = new CLevelBut(H.width / 4 * .6 + P.width + 12,H.height / 2 * .6,H,!0,0,D);
        W.setScale(.6);
        W.setClickable(!1);
        W.addLevelText(G)
    }
    ;
    this._onNitro = function() {
        _oButNitro.setVisible(!1);
        s_oGame.setNitro(!0)
    }
    ;
    this._onButRestartRelease = function() {
        O = [];
        for (var H = 0; 3 >= H; H++)
            O[H] = !1;
        s_oGame.restartGame()
    }
    ;
    this.onExitFromHelp = function() {
        _oHelpPanel.unload()
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onExit = function() {
        s_oGame.setPause();
        new CAreYouSurePanel(s_oGame.onExit,s_oGame.setResume)
    }
    ;
    s_oInterface = this;
    this._init();
    return this
}
var s_oInterface = null;
function CHelpPanel() {
    var a, f, c, g;
    this._init = function() {
        c = new createjs.Shape;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        c.alpha = 1;
        c.on("mousedown", function() {
            h._onExitHelp()
        });
        s_oStage.addChild(c);
        (new createjs.Tween.get(c)).to({
            alpha: .7
        }, 500);
        g = new createjs.Container;
        g.on("pressup", function() {
            h._onExitHelp()
        });
        s_oStage.addChild(g);
        var d = s_oSpriteLibrary.getSprite("msg_box")
          , b = createBitmap(d);
        b.regX = d.width / 2;
        b.regY = d.height / 2;
        g.addChild(b);
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT + d.height / 2;
        a = g.y;
        (new createjs.Tween.get(g)).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.cubicOut);
        s_bMobile ? (new CTLText(g,-250,-160,500,48,24,"center","#fff",PRIMARY_FONT,1,0,0,TEXT_HELP1_MOBILE,!0,!0,!0,!1),
        d = s_oSpriteLibrary.getSprite("key_left"),
        b = createBitmap(d),
        b.x = -170,
        b.y = -60,
        b.regX = d.width / 2,
        b.regY = d.height / 2,
        b.scaleX = b.scaleY = .7,
        g.addChild(b),
        d = s_oSpriteLibrary.getSprite("key_right"),
        b = createBitmap(d),
        b.x = -80,
        b.y = -60,
        b.regX = d.width / 2,
        b.regY = d.height / 2,
        b.scaleX = b.scaleY = .7,
        g.addChild(b),
        d = s_oSpriteLibrary.getSprite("key_down"),
        b = createBitmap(d),
        b.x = 80,
        b.y = -60,
        b.regX = d.width / 2,
        b.regY = d.height / 2,
        b.scaleX = b.scaleY = .7,
        g.addChild(b),
        d = s_oSpriteLibrary.getSprite("key_up"),
        b = createBitmap(d),
        b.x = 170,
        b.y = -60,
        b.regX = d.width / 2,
        b.regY = d.height / 2,
        b.scaleX = b.scaleY = .7) : (new CTLText(g,-250,-150,300,120,24,"center","#fff",PRIMARY_FONT,1,0,0,TEXT_HELP1,!0,!0,!0,!1),
        d = s_oSpriteLibrary.getSprite("keys"),
        b = createBitmap(d),
        b.x = 130,
        b.y = -100,
        b.regX = d.width / 2,
        b.regY = d.height / 2);
        g.addChild(b);
        new CTLText(g,10,24,300,120,24,"left","#fff",PRIMARY_FONT,1,0,0,TEXT_HELP2,!0,!0,!0,!1);
        b = new createjs.Container;
        b.x = -130;
        b.y = 130;
        b.scaleX = b.scaleY = .3;
        g.addChild(b);
        d = s_oSpriteLibrary.getSprite("finish");
        var e = createBitmap(d);
        e.regX = d.width / 2;
        e.regY = d.height;
        b.addChild(e);
        new CPlayer(0,0,b)
    }
    ;
    this.unload = function() {
        s_oStage.removeChild(c);
        s_oStage.removeChild(g);
        g.off("pressup", function() {
            h._onExitHelp()
        });
        c.off("pressup", function() {
            h._onExitHelp()
        })
    }
    ;
    this._onExitHelp = function() {
        f || (f = !0,
        (new createjs.Tween.get(c)).to({
            alpha: 0
        }, 500),
        (new createjs.Tween.get(g)).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            h.unload();
            s_oGame._onExitHelp()
        }))
    }
    ;
    var h = this;
    this._init()
}
function CEndPanel() {
    var a, f, c;
    this._init = function() {
        setVolume(s_aSounds.game_soundtrack, SOUNDTRACK_VOLUME_IN_GAME);
        a = new createjs.Shape;
        a.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a.alpha = 0;
        a.on("mousedown", function() {});
        s_oStage.addChild(a);
        (new createjs.Tween.get(a)).to({
            alpha: .7
        }, 500);
        f = new createjs.Container;
        s_oStage.addChild(f);
        var g = s_oSpriteLibrary.getSprite("msg_box")
          , h = createBitmap(g);
        h.regX = g.width / 2;
        h.regY = g.height / 2;
        f.addChild(h);
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT + g.height / 2;
        (new createjs.Tween.get(f)).to({
            y: CANVAS_HEIGHT / 2
        }, 500, createjs.Ease.quartIn);
        new CTLText(f,-250,-g.height / 2 + 40,500,120,40,"center","#fff",PRIMARY_FONT,1,0,0,TEXT_GAMEOVER,!0,!0,!0,!1);
        g = s_oSpriteLibrary.getSprite("finish");
        h = createBitmap(g);
        h.regX = g.width / 2;
        h.regY = g.height;
        h.y = 154;
        h.scaleX = h.scaleY = .6;
        f.addChild(h);
        g = s_oSpriteLibrary.getSprite("but_home");
        c = new CGfxButton(0,100,g,f);
        c.addEventListener(ON_MOUSE_UP, this._onHome, this);
        c.pulseAnimation()
    }
    ;
    this.unload = function() {
        s_oStage.removeChild(f);
        a.off("mousedown", function() {});
        c.unload()
    }
    ;
    this.show = function() {
        playSound("arrive_win", 1, 0);
        $(s_oMain).trigger("share_event", s_iTotalScore)
    }
    ;
    this._onHome = function() {
        a.off("mousedown", function() {});
        s_oStage.removeChild(f);
        s_oGame.onExit()
    }
    ;
    this._init();
    return this
}
function CPlayer(a, f, c) {
    var g, h, d, b, e, k, l, p, m, n, u, v, A, w, t, q, y, D, C, x;
    this._init = function(F, z, I) {
        this.reset();
        n = PLAYER_MAX_SPEED;
        u = PLAYER_ACCELERATION;
        v = -n;
        A = -PLAYER_DECELERATION;
        w = -n / 2;
        t = n / 4;
        var J = s_oSpriteLibrary.getSprite("baloon_mc");
        x = createBitmap(J);
        x.regX = J.width / 2;
        x.regY = J.height / 2;
        x.x = F;
        x.y = z - 260;
        x.alpha = 0;
        I.addChild(x);
        J = s_oSpriteLibrary.getSprite("player");
        var Q = J.width / 3
          , R = J.height;
        J = new createjs.SpriteSheet({
            images: [J],
            frames: {
                width: Q,
                height: R,
                regX: Q / 2,
                regY: R
            },
            animations: {
                left: [0],
                right: [1],
                straight: [2]
            }
        });
        D = createSprite(J, "straight", Q / 2, R, Q, R);
        D.x = F;
        D.y = z;
        I.addChild(D);
        q = PLAYER_COLLIDER_WIDTH
    }
    ;
    this.reset = function() {
        e = k = b = d = h = g = !1;
        y = m = p = l = 0;
        C = s_oGame.findSegment(l + PLAYER_Z_FROMCAMERA)
    }
    ;
    this.setAcceleration = function(F) {
        u = F
    }
    ;
    this.setMaxSpeed = function(F) {
        n = F;
        v = -n;
        A = -PLAYER_DECELERATION;
        w = -n / 2;
        t = n / 4
    }
    ;
    this.stopAll = function() {
        this.stopLeft();
        this.stopRight();
        this.stopAccelerate()
    }
    ;
    this.stopLeft = function() {
        g && (g = !1,
        D.gotoAndStop("straight"),
        stopSound(s_aSounds.brake))
    }
    ;
    this.stopRight = function() {
        h && (h = !1,
        D.gotoAndStop("straight"),
        stopSound(s_aSounds.brake))
    }
    ;
    this.stopAccelerate = function() {
        d = !1;
        stopSound(s_aSounds.engine)
    }
    ;
    this.stopBrake = function() {
        b = !1
    }
    ;
    this.moveLeft = function() {
        0 !== m && (soundPlaying(s_aSounds.brake) || playSound("brake", .5, !1),
        h = !1,
        g = !0,
        D.gotoAndStop("left"))
    }
    ;
    this.moveRight = function() {
        0 !== m && (soundPlaying(s_aSounds.brake) || playSound("brake", .5, !1),
        g = !1,
        h = !0,
        D.gotoAndStop("right"))
    }
    ;
    this.moveAccelerate = function() {
        b = !1;
        d = !0
    }
    ;
    this.moveBrake = function() {
        d = !1;
        b = !0
    }
    ;
    this._increase = function(F, z, I) {
        for (F += z; F >= I; )
            F -= I,
            s_oGame.trackCompleted();
        for (; 0 > F; )
            F += I;
        return F
    }
    ;
    this._accelerate = function(F, z, I) {
        return F + z * I
    }
    ;
    this._limit = function(F, z, I) {
        return Math.max(z, Math.min(F, I))
    }
    ;
    this.getPlayerWidth = function() {
        return q
    }
    ;
    this.getPosition = function() {
        return {
            x: p,
            z: l
        }
    }
    ;
    this.setPosition = function(F) {
        l = F
    }
    ;
    this.autoPilot = function() {
        .5 < p ? (h = !1,
        g = !0) : -.5 > p ? (h = !0,
        g = !1) : .1 >= p && -.1 <= p && (h = g = !1)
    }
    ;
    this.getMaxSpeed = function() {
        return n
    }
    ;
    this.getCurSpeed = function() {
        return m
    }
    ;
    this.setCurSpeed = function(F) {
        m = F
    }
    ;
    this.getPlayerSegment = function() {
        return C
    }
    ;
    this.getFrontPlayerSegment = function() {
        return s_oGame.findSegment(l + SEGMENT_LENGTH + PLAYER_Z_FROMCAMERA)
    }
    ;
    this.damageAnim = function() {
        k || (k = !0,
        playSound("crash", 1, !1),
        createjs.Tween.get(x, {
            override: !0
        }).to({
            alpha: 1
        }, 250, createjs.Ease.cubicOut).to({
            alpha: 0
        }, 250, createjs.Ease.cubicIn).call(function() {
            k = !1
        }))
    }
    ;
    this.isOutOfRoad = function() {
        return e
    }
    ;
    this.stopEngineSound = function() {
        stopSound(s_aSounds.engine);
        stopSound(s_aSounds.engine_stall)
    }
    ;
    this._updateXMovement = function(F, z) {
        var I = F * z * z * C.curve * CENTRIFUGAL_FORCE / TERRAIN_ADHERENCE;
        g ? (y -= TERRAIN_INCREASE_INERTIA * z,
        y < -TERRAIN_MAX_INERTIA && (y = -TERRAIN_MAX_INERTIA),
        p = p - I - F) : h ? (y += TERRAIN_INCREASE_INERTIA * z,
        y > TERRAIN_MAX_INERTIA && (y = TERRAIN_MAX_INERTIA),
        p = p - I + F) : p = p - I + y;
        0 < y ? (y -= TERRAIN_DECREASE_INERTIA,
        0 > y && (y = 0)) : 0 > y && (y += TERRAIN_DECREASE_INERTIA,
        0 < y && (y = 0))
    }
    ;
    this.update = function(F) {
        C = s_oGame.findSegment(l + PLAYER_Z_FROMCAMERA);
        var z = m / n;
        l = this._increase(l, F * m, TRACK_LENGTH);
        this._updateXMovement(2 * F * TERRAIN_ADHERENCE * z, z);
        d ? (m = this._accelerate(m, u, F),
        1 === z ? soundPlaying(s_aSounds.engine_stall) || (stopSound(s_aSounds.engine),
        stopSound(s_aSounds.engine_reverse),
        playSound("engine_stall", .7, !0)) : 0 < m && !soundPlaying(s_aSounds.engine) && !s_oGame.playerCollide() && (stopSound(s_aSounds.brake),
        stopSound(s_aSounds.engine_stall),
        stopSound(s_aSounds.engine_reverse),
        playSound("engine", .7, !1),
        z = linearFunction(z, 0, 1, 0, soundDuration(s_aSounds.engine)),
        soundSeek(s_aSounds.engine, z))) : b ? (m = this._accelerate(m, v, F),
        0 < m && (stopSound(s_aSounds.engine),
        stopSound(s_aSounds.engine_stall),
        stopSound(s_aSounds.engine_reverse),
        soundPlaying(s_aSounds.brake) || playSound("brake", .5, !1))) : (m = this._accelerate(m, A, F),
        0 < m && !soundPlaying(s_aSounds.engine_reverse) && (stopSound(s_aSounds.brake),
        stopSound(s_aSounds.engine_stall),
        stopSound(s_aSounds.engine),
        playSound("engine_reverse", .7, !1),
        z = linearFunction(z, 0, 1, soundDuration(s_aSounds.engine_reverse), 0),
        soundSeek(s_aSounds.engine_reverse, z)));
        e = !1;
        if (-1 > p || 1 < p)
            m > t && (m = this._accelerate(m, w, F)),
            e = !0;
        p = this._limit(p, -ROAD_BOUNDS, ROAD_BOUNDS);
        m = this._limit(m, 0, n)
    }
    ;
    this._init(a, f, c)
}
var Render = {
    polygon: function(a, f, c, g, h, d, b, e, k, l) {
        a.graphics.beginFill(l);
        a.graphics.moveTo(f, c);
        a.graphics.lineTo(g, h);
        a.graphics.lineTo(d, b);
        a.graphics.lineTo(e, k)
    },
    segment: function(a, f, c, g, h, d, b, e, k, l) {
        var p = Render.rumbleWidth(d, c)
          , m = Render.rumbleWidth(k, c)
          , n = Render.laneMarkerWidth(d, c)
          , u = Render.laneMarkerWidth(k, c);
        a.graphics.beginFill(l.grass);
        a.graphics.drawRect(0, e, f, h - e);
        Render.polygon(a, g - d - p, h, g - d, h, b - k, e, b - k - m, e, l.rumble);
        Render.polygon(a, g + d + p, h, g + d, h, b + k, e, b + k + m, e, l.rumble);
        Render.polygon(a, g - d, h, g + d, h, b + k, e, b - k, e, l.road);
        if (l.lane)
            for (f = 2 * d / c,
            p = 2 * k / c,
            g = g - d + f,
            b = b - k + p,
            k = 1; k < c; g += f,
            b += p,
            k++)
                Render.polygon(a, g - n / 2, h, g + n / 2, h, b + u / 2, e, b - u / 2, e, l.lane)
    },
    background: function(a, f, c, g, h, d, b) {
        var e = h.w / 2;
        d = h.x + Math.floor(h.w * (d || 0));
        var k = h.y
          , l = Math.min(e, h.x + h.w - d)
          , p = h.h;
        b = b || 0;
        var m = Math.floor(l / e * c);
        a.drawImage(f, d, k, l, p, 0, b, m, g);
        l < e && a.drawImage(f, h.x, k, e - l, p, m - 1, b, c - m, g)
    },
    sprite: function(a, f, c, g, h, d, b, e) {
        var k = c * ROAD_PER_SCALE_PER_HALF_CANVAS_WIDTH;
        c = a.width * k;
        k *= a.height;
        var l = k / a.height;
        h += k * (b || 0);
        b = e ? Math.max(0, h + k - e) : 0;
        b < k ? (f.x = g + c * (d || 0),
        f.y = h,
        f.scaleX = f.scaleY = l,
        a = new createjs.Rectangle(0,0,a.width,a.height - a.height * b / k),
        f.sourceRect = a) : f.visible = !1
    },
    rumbleWidth: function(a, f) {
        return a / Math.max(6, 2 * f)
    },
    laneMarkerWidth: function(a, f) {
        return a / Math.max(32, 8 * f)
    }
};
function CRoad(a, f, c) {
    var g, h, d;
    this._init = function(b, e, k) {
        g = null;
        h = CAMERA_DEPTH;
        d = [];
        this.resetRoad()
    }
    ;
    this.findSegment = function(b) {
        return d[Math.floor(b / SEGMENT_LENGTH) % d.length]
    }
    ;
    this.lastX = function() {
        return 0 === d.length ? 0 : d[d.length - 1].p2.world.x
    }
    ;
    this.lastY = function() {
        return 0 === d.length ? 0 : d[d.length - 1].p2.world.y
    }
    ;
    this.addSegment = function(b, e) {
        var k = d.length;
        d.push({
            index: k,
            p1: {
                world: {
                    x: this.lastX(),
                    y: this.lastY(),
                    z: k * SEGMENT_LENGTH
                },
                camera: {},
                screen: {}
            },
            p2: {
                world: {
                    x: this.lastX() + b,
                    y: e,
                    z: (k + 1) * SEGMENT_LENGTH
                },
                camera: {},
                screen: {}
            },
            curve: b,
            sprites: [],
            cars: [],
            coins: [],
            color: Math.floor(k / RUMBLE_LENGTH) % 2 ? COLORS.DARK : COLORS.LIGHT
        })
    }
    ;
    this.addRoad = function(b, e, k, l, p) {
        var m = this.lastY();
        p = m + Util.toInt(p, 0) * SEGMENT_LENGTH;
        var n, u = b + e + k;
        for (n = 0; n < b; n++)
            this.addSegment(Util.easeIn(0, l, n / b), Util.easeInOut(m, p, n / u));
        for (n = 0; n < e; n++)
            this.addSegment(l, Util.easeInOut(m, p, (b + n) / u));
        for (n = 0; n < k; n++)
            this.addSegment(Util.easeInOut(l, 0, n / k), Util.easeInOut(m, p, (b + e + n) / u))
    }
    ;
    this.addStraight = function(b) {
        b = b || ROAD.LENGTH.MEDIUM;
        this.addRoad(b, b, b, 0)
    }
    ;
    this.addHill = function(b, e) {
        b = b || ROAD.LENGTH.MEDIUM;
        e = e || ROAD.HILL.MEDIUM;
        this.addRoad(b, b, b, 0, e)
    }
    ;
    this.addCurve = function(b, e, k) {
        b = b || ROAD.LENGTH.MEDIUM;
        e = e || ROAD.CURVE.MEDIUM;
        this.addRoad(b, b, b, e)
    }
    ;
    this.addStandardRoad = function(b, e, k) {
        b = b || ROAD.LENGTH.MEDIUM;
        e = e || ROAD.CURVE.NONE;
        k = k || ROAD.HILL.NONE;
        this.addRoad(b, b, b, e, k)
    }
    ;
    this.addLowRollingHills = function(b, e) {
        b = b || ROAD.LENGTH.SHORT;
        e = e || ROAD.HILL.LOW;
        this.addRoad(b, b, b, 0, e / 2);
        this.addRoad(b, b, b, 0, -e);
        this.addRoad(b, b, b, ROAD.CURVE.EASY, e);
        this.addRoad(b, b, b, 0, 0);
        this.addRoad(b, b, b, -ROAD.CURVE.EASY, e / 2);
        this.addRoad(b, b, b, 0, 0)
    }
    ;
    this.addSCurves = function(b, e, k) {
        b = b || ROAD.LENGTH.MEDIUM;
        e = e || ROAD.CURVE.MEDIUM;
        k = k || ROAD.HILL.NONE;
        var l = 0 <= e ? 1 : -1;
        var p = 0 <= k ? 1 : -1;
        e = Math.abs(e);
        k = Math.abs(k);
        switch (e) {
        case ROAD.CURVE.EASY:
            var m = ROAD.CURVE.NONE;
            var n = ROAD.CURVE.EASY;
            break;
        case ROAD.CURVE.MEDIUM:
            m = ROAD.CURVE.EASY;
            n = ROAD.CURVE.MEDIUM;
            break;
        case ROAD.CURVE.HARD:
            m = ROAD.CURVE.MEDIUM,
            n = ROAD.CURVE.HARD
        }
        switch (k) {
        case ROAD.HILL.EASY:
            var u = ROAD.HILL.NONE;
            var v = ROAD.HILL.LOW;
            break;
        case ROAD.HILL.MEDIUM:
            u = ROAD.HILL.LOW;
            v = ROAD.HILL.MEDIUM;
            break;
        case ROAD.HILL.HIGH:
            u = ROAD.HILL.MEDIUM,
            v = ROAD.HILL.HIGH
        }
        this.addRoad(b, b, b, l * m, ROAD.HILL.NONE);
        this.addRoad(b, b, b, l * n, p * v);
        this.addRoad(b, b, b, l * m, -p * u);
        this.addRoad(b, b, b, -l * m, p * v);
        this.addRoad(b, b, b, -l * n, -p * u)
    }
    ;
    this.addBumps = function(b, e) {
        b = b || ROAD.LENGTH.SHORT / 2;
        e = e || ROAD.CURVE.NONE;
        this.addRoad(b, b, b, 0, b / 2.5);
        this.addRoad(b, b, b, 0, -b / 6.25);
        this.addRoad(b, b, b, e, -b / 2.5);
        this.addRoad(b, b, b, 0, b / 1, 5625);
        this.addRoad(b, b, b, 0, b / 2.5);
        this.addRoad(b, b, b, -e, -b / 1.785);
        this.addRoad(b, b, b, 0, b / 2.5);
        this.addRoad(b, b, b, 0, -b / 6.25)
    }
    ;
    this.addDownhillToEnd = function(b, e) {
        b = b || 200;
        e = e || ROAD.CURVE.NONE;
        this.addRoad(b, b, b, e, -Math.round(this.lastY() / SEGMENT_LENGTH))
    }
    ;
    this.resetRoad = function() {
        d = [];
        for (var b = ROAD_INFO[c], e = 0; e < b.length; e++) {
            var k = b[e];
            switch (k.roadtype) {
            case ROAD.TYPE.STANDARD:
                this.addStandardRoad(k.length, k.curve, k.hill);
                break;
            case ROAD.TYPE.CURVE_S:
                this.addSCurves(k.length, k.curve, k.hill);
                break;
            case ROAD.TYPE.BUMPS:
                this.addBumps(k.length, k.curve);
                break;
            case ROAD.TYPE.FINAL:
                this.addDownhillToEnd(k.length, k.curve)
            }
        }
        d[this.findSegment(PLAYER_Z_FROMCAMERA).index + 2].color = COLORS.START;
        d[this.findSegment(PLAYER_Z_FROMCAMERA).index + 3].color = COLORS.START;
        for (b = 0; b < RUMBLE_LENGTH; b++)
            d[d.length - 1 - b].color = COLORS.FINISH;
        g = d.length * SEGMENT_LENGTH
    }
    ;
    this.setCameraDepth = function(b) {
        h = b
    }
    ;
    this.clearVisual = function(b) {
        a.graphics.clear();
        b = this.findSegment(b.z);
        var e;
        for (e = DRAW_DISTANCE - 1; 0 < e; e--) {
            var k = d[(b.index + e) % d.length];
            for (var l = 0; l < k.cars.length; l++) {
                var p = k.cars[l];
                p.setVisible(!1)
            }
            for (l = 0; l < k.sprites.length; l++)
                p = k.sprites[l],
                p.source.visible = !1
        }
    }
    ;
    this.update = function(b) {
        a.graphics.clear();
        var e = b.z;
        b = b.x;
        var k = this.findSegment(e)
          , l = Util.percentRemaining(e, SEGMENT_LENGTH)
          , p = this.findSegment(e + PLAYER_Z_FROMCAMERA)
          , m = Util.percentRemaining(e + PLAYER_Z_FROMCAMERA, SEGMENT_LENGTH);
        p = Util.interpolate(p.p1.world.y, p.p2.world.y, m);
        m = CANVAS_HEIGHT;
        var n = 0
          , u = -(k.curve * l)
          , v = b * ROAD_WIDTH
          , A = p + CAMERA_HEIGHT;
        for (p = 0; p < DRAW_DISTANCE; p++) {
            l = d[(k.index + p) % d.length];
            l.looped = l.index < k.index;
            l.clip = m;
            var w = e - (l.looped ? g : 0);
            Util.project(l.p1, v - n, A, w, h);
            Util.project(l.p2, v - n - u, A, w, h);
            n += u;
            u += l.curve;
            l.p1.camera.z <= h || l.p2.screen.y >= l.p1.screen.y || l.p2.screen.y >= m || (Render.segment(a, CANVAS_WIDTH, NUM_LANES, l.p1.screen.x, l.p1.screen.y, l.p1.screen.w, l.p2.screen.x, l.p2.screen.y, l.p2.screen.w, l.color),
            m = l.p2.screen.y)
        }
        v = 0;
        for (p = DRAW_DISTANCE - 1; 0 < p; p--) {
            l = d[(k.index + p) % d.length];
            for (n = 0; n < l.cars.length; n++) {
                m = l.cars[n];
                u = m.getZ() - e;
                A = m.getOffset() - b;
                u > CAR_FARVIEW_OFFSET ? l.curve > -CAR_CURVEVIEW_OFFSET && l.curve < CAR_CURVEVIEW_OFFSET ? m.setDirection(CAR_CENTER) : l.curve < CAR_CURVEVIEW_OFFSET ? m.setDirection(CAR_LEFT) : m.setDirection(CAR_RIGHT) : A > -CAR_SIDEVIEW_OFFSET && m.getOffset() - b < CAR_SIDEVIEW_OFFSET ? m.setDirection(CAR_CENTER) : A < -CAR_SIDEVIEW_OFFSET ? m.setDirection(CAR_RIGHT) : m.setDirection(CAR_LEFT);
                u = m.getSprite();
                A = Util.interpolate(l.p1.screen.scale, l.p2.screen.scale, m.getPercent());
                w = Util.interpolate(l.p1.screen.x, l.p2.screen.x, m.getPercent()) + A * m.getOffset() * ROAD_PER_HALF_CANVAS_WIDTH;
                var t = Util.interpolate(l.p1.screen.y, l.p2.screen.y, m.getPercent());
                m.setVisible(!0);
                f.setChildIndex(m.getCar(), v++);
                Render.sprite(u, m.getCar(), A, w, t, -.5, -1, l.clip)
            }
            for (n = 0; n < l.sprites.length; n++)
                u = l.sprites[n],
                A = l.p1.screen.scale,
                w = l.p1.screen.x + A * u.offset * ROAD_PER_HALF_CANVAS_WIDTH,
                t = l.p1.screen.y,
                u.source.visible = !0,
                f.setChildIndex(u.source, v++),
                Render.sprite(u.sprite, u.source, A, w, t, 0 > u.offset ? -1 : 0, -1, l.clip)
        }
        e = (k.index - 25) % d.length;
        if (0 < e)
            for (b = 0; 25 > b; b++) {
                l = d[e + b];
                for (n = 0; n < l.sprites.length; n++)
                    u = l.sprites[n],
                    u.source.visible = !1;
                for (n = 0; n < l.cars.length; n++)
                    m = l.cars[n],
                    m.setVisible(!1)
            }
        else
            for (b = d.length + e - 1; b < d.length; b++) {
                l = d[b];
                for (n = 0; n < l.sprites.length; n++)
                    u = l.sprites[n],
                    u.source.visible = !1;
                for (n = 0; n < l.cars.length; n++)
                    m = l.cars[n],
                    m.setVisible(!1)
            }
    }
    ;
    this.exponentialFog = function(b, e) {
        return 1 / Math.pow(Math.E, b * b * e)
    }
    ;
    this.getTrackLength = function() {
        return g
    }
    ;
    this.getSegments = function() {
        return d
    }
    ;
    this._init(a, f, c)
}
var CAR_CENTER = 0
  , CAR_LEFT = 1
  , CAR_RIGHT = 2;
function CCar(a, f, c, g, h) {
    var d, b, e, k, l, p, m;
    this._init = function(u, v, A, w, t) {
        d = v;
        b = A;
        e = w;
        l = [];
        l[CAR_CENTER] = s_oSpriteLibrary.getSprite(u + "_center");
        l[CAR_LEFT] = s_oSpriteLibrary.getSprite(u + "_left");
        l[CAR_RIGHT] = s_oSpriteLibrary.getSprite(u + "_right");
        m = l[CAR_CENTER];
        p = createBitmap(m);
        p.x = 500;
        p.visible = !1;
        t.addChild(p)
    }
    ;
    this.getCar = function() {
        return p
    }
    ;
    this.getSprite = function() {
        return m
    }
    ;
    this.getOffset = function() {
        return d
    }
    ;
    this.getZ = function() {
        return b
    }
    ;
    this.getSpeed = function() {
        return e
    }
    ;
    this.getPercent = function() {
        return k
    }
    ;
    this.setDirection = function(u) {
        m = l[u];
        p.image = l[u]
    }
    ;
    this.setVisible = function(u) {
        p.visible = u
    }
    ;
    this.updateCarOffset = function(u, v) {
        var A, w;
        var t = n.getSprite().width * SPRITES.SCALE;
        if (u.index - v.getPlayerSegment().index > DRAW_DISTANCE)
            return p.visible = !1,
            0;
        for (A = 1; 20 > A; A++) {
            var q = s_oGame.getSegments();
            var y = q[(u.index + A) % q.length];
            if (y === v.getPlayerSegment() && e > v.getCurSpeed() && Util.overlap(v.getPosition().x, v.getPlayerWidth(), d, t, 1.2))
                return t = .5 < v.getPosition().x ? -1 : -.5 > v.getPosition().x ? 1 : d > v.getPosition().x ? 1 : -1,
                1 * t / A * (e - v.getCurSpeed()) / v.getMaxSpeed();
            for (w = 0; w < y.cars.length; w++) {
                q = y.cars[w];
                var D = q.getSprite().width * SPRITES.SCALE;
                if (e > q.getSpeed() && Util.overlap(d, t, q.getOffset(), D, 1.2))
                    return t = .5 < q.getOffset() ? -1 : -.5 > q.getOffset() ? 1 : d > q.getOffset() ? 1 : -1,
                    1 * t / A * (e - q.getSpeed()) / v.getMaxSpeed()
            }
        }
        return -.9 > d ? .1 : .9 < d ? -.1 : 0
    }
    ;
    this.update = function(u, v) {
        var A = s_oGame.findSegment(b);
        d += this.updateCarOffset(A, v);
        b = Util.increase(b, u * e, TRACK_LENGTH);
        k = Util.percentRemaining(b, SEGMENT_LENGTH);
        var w = s_oGame.findSegment(b);
        if (A !== w) {
            var t = A.cars.indexOf(n);
            A.cars.splice(t, 1);
            w.cars.push(n)
        }
    }
    ;
    var n = this;
    this._init(a, f, c, g, h)
}
function CLevelBuilder(a, f, c, g) {
    var h;
    this._init = function(d, b, e, k) {
        h = LEVEL_INFO[k].num_cars;
        this._initTerrainInfo();
        this._initFinishLane();
        this._initSprites();
        this._initCars()
    }
    ;
    this._attachSprites = function() {
        for (var d = 0; d < s_oGame.getSegments().length; d++)
            for (var b = s_oGame.getSegments()[d].sprites, e = 0; e < b.length; e++)
                c.addChildAt(b[e].source, 0)
    }
    ;
    this._addSprite = function(d, b, e) {
        if (void 0 !== s_oGame.getSegments()[d]) {
            var k = s_oSpriteLibrary.getSprite(b.name)
              , l = createBitmap(k);
            l.visible = !1;
            b.name === SPRITES.SIGN_INDICATION.name && (l.regX = k.width / 2);
            var p = k.width * SPRITES.SCALE
              , m = e + p / 2 * (0 < e ? 1 : -1);
            b.collision && (b.collision.center && (m = e + (0 < e ? b.collision.center : -(k.width - b.collision.center)) * SPRITES.SCALE),
            b.collision.width && (p = b.collision.width * SPRITES.SCALE));
            s_oGame.getSegments()[d].sprites.push({
                source: l,
                offset: e,
                sprite: k,
                collision: {
                    center: m,
                    width: p
                }
            })
        }
    }
    ;
    this._addDensityElements = function(d, b, e, k, l, p, m) {
        p = p || 100;
        m = m || 1;
        if (d === AMBIENT.SIDE.BOTH)
            this._addDensityElements(AMBIENT.SIDE.RIGHT, b, e, k, l, p, m),
            this._addDensityElements(AMBIENT.SIDE.LEFT, b, e, k, l, p, m);
        else
            for (; e <= k; e += m)
                if (100 * Math.random() <= p) {
                    var n = e + Util.randomInt(0, 5);
                    this._addSprite(n, b, d + d * l + 2 * d * Math.random())
                }
    }
    ;
    this._addPreciseElements = function(d, b, e, k, l, p, m) {
        p = p || 100;
        m = m || 1;
        if (d === AMBIENT.SIDE.BOTH)
            this._addPreciseElements(AMBIENT.SIDE.RIGHT, b, e, k, l, p, m),
            this._addPreciseElements(AMBIENT.SIDE.LEFT, b, e, k, l, p, m);
        else
            for (; e <= k; e += m)
                100 * Math.random() <= p && this._addSprite(e, b, d + d * l)
    }
    ;
    this._initSprites = function() {
        var d, b = AMBIENT_INFO[g];
        for (d = 0; d < b.length; d++) {
            var e = b[d];
            if (e.segments.constructor === Array) {
                var k = e.segments[0];
                var l = e.segments[1]
            } else
                l = k = e.segments;
            switch (e.disposition) {
            case AMBIENT.DISPOSITION.PRECISE:
                this._addPreciseElements(e.side, e.sprite, k, l, e.position, e.occurrence, e.repetitionevery);
                break;
            case AMBIENT.DISPOSITION.DENSITY:
                this._addDensityElements(e.side, e.sprite, k, l, e.position, e.occurrence, e.repetitionevery)
            }
        }
        this._attachSprites()
    }
    ;
    this._initFinishLane = function() {
        var d = s_oSpriteLibrary.getSprite("finish")
          , b = createBitmap(d);
        b.visible = !1;
        b.regX = d.width / 2;
        s_oGame.getSegments()[s_oGame.getSegments().length - 1].sprites.push({
            source: b,
            offset: 0,
            sprite: d
        })
    }
    ;
    this._initCars = function() {
        var d;
        for (d = 0; d < h; d++) {
            var b = Math.random() * Util.randomChoice([-.8, .8]);
            var e = Math.floor(Math.random() * s_oGame.getSegments().length) * SEGMENT_LENGTH;
            var k = Util.randomChoice(SPRITES.CARS);
            var l = a.getMaxSpeed() / 4 + Math.random() * a.getMaxSpeed() / (k == SPRITES.SEMI ? 4 : 2);
            b = new CCar(k,b,e,l,c);
            e = s_oGame.findSegment(e);
            e.cars.push(b);
            f.push(b)
        }
    }
    ;
    this._initTerrainInfo = function() {
        COLORS.LIGHT.road = LEVEL_INFO[g].terrain.color.light.road;
        COLORS.LIGHT.grass = LEVEL_INFO[g].terrain.color.light.grass;
        COLORS.LIGHT.rumble = LEVEL_INFO[g].terrain.color.light.rumble;
        COLORS.LIGHT.lane = LEVEL_INFO[g].terrain.color.light.lane;
        COLORS.DARK.road = LEVEL_INFO[g].terrain.color.dark.road;
        COLORS.DARK.grass = LEVEL_INFO[g].terrain.color.dark.grass;
        COLORS.DARK.rumble = LEVEL_INFO[g].terrain.color.dark.rumble;
        TERRAIN_ADHERENCE = LEVEL_INFO[g].terrain.adherence;
        TERRAIN_MAX_INERTIA = LEVEL_INFO[g].terrain.max_inertia;
        NUM_LANES = LEVEL_INFO[g].terrain.num_lanes;
        ROAD_BOUNDS = LEVEL_INFO[g].terrain.roadbounds
    }
    ;
    this._init(a, f, c, g)
}
function CWorldMenu() {
    var a, f, c, g, h, d, b, e, k, l, p, m, n, u, v, A = null, w = null;
    this._init = function() {
        p = createBitmap(s_oSpriteLibrary.getSprite("bg_select"));
        s_oStage.addChild(p);
        new CTLText(s_oStage,CANVAS_WIDTH / 2 - 300,CANVAS_HEIGHT / 2 - 230,600,80,40,"center","#ffffff",PRIMARY_FONT,1,0,0,TEXT_SELECT_WORLD,!0,!0,!0,!1);
        k = [];
        for (var t = 0; t < NUM_WORLDS * NUM_TRACKS_PER_WORLD; t++)
            k[t] = s_aTimeScore[t];
        l = [];
        for (t = 0; t < NUM_WORLDS; t++) {
            var q = s_oSpriteLibrary.getSprite("but_world" + t)
              , y = CANVAS_WIDTH / 2 - 250 + 500 / (NUM_WORLDS - 1) * t
              , D = s_oSpriteLibrary.getSprite("image_" + t)
              , C = s_oSpriteLibrary.getSprite("cover_" + t);
            l[t] = new CLevelBut(y,CANVAS_HEIGHT / 2,q,C,D,s_oStage);
            l[t].addEventListenerWithParams(ON_MOUSE_UP, this._onLevelBut, this, t);
            l[t].disable()
        }
        this._setLevelActive();
        t = s_oSpriteLibrary.getSprite("but_exit");
        b = CANVAS_WIDTH - t.width / 2 - 12;
        e = t.height / 2 + 16;
        m = new CGfxButton(b,e,t,s_oStage);
        m.addEventListener(ON_MOUSE_UP, this._onExit, this);
        c = b - t.width - 12;
        g = t.height / 2 + 16;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            t = s_oSpriteLibrary.getSprite("audio_icon"),
            u = new CToggle(c,g,t,s_bAudioActive),
            u.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        t = window.document;
        q = t.documentElement;
        A = q.requestFullscreen || q.mozRequestFullScreen || q.webkitRequestFullScreen || q.msRequestFullscreen;
        w = t.exitFullscreen || t.mozCancelFullScreen || t.webkitExitFullscreen || t.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (A = !1);
        A && screenfull.isEnabled && (t = s_oSpriteLibrary.getSprite("but_fullscreen"),
        a = t.width / 4 + 12,
        f = t.height / 2 + 16,
        v = new CToggle(a,f,t,s_bFullscreen,s_oStage),
        v.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        h = 64;
        d = CANVAS_HEIGHT - 40;
        n = new createjs.Container;
        n.x = h;
        n.y = d;
        s_oStage.addChild(n);
        t = new createjs.Text(" " + s_iTotalScore,"bold 30px " + PRIMARY_FONT,"#ffffff");
        t.textAlign = "left";
        t.textBaseline = "middle";
        t.lineWidth = 500;
        n.addChild(t);
        t = s_oSpriteLibrary.getSprite("star");
        q = createBitmap(t);
        q.regX = t.width / 2;
        q.regY = t.height / 2;
        q.x = -t.width / 2;
        n.addChild(q);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }
    ;
    this.refreshButtonPos = function(t, q) {
        m.setPosition(b - t, q + e);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || u.setPosition(c - t, q + g);
        A && screenfull.isEnabled && v.setPosition(a + t, f + q);
        n.x = h + t;
        n.y = d - q
    }
    ;
    this.unload = function() {
        for (var t = 0; t < l.length; t++)
            l[t].unload();
        s_oWorldMenu = null;
        s_oStage.removeAllChildren();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
            u.unload(),
            u = null;
        A && screenfull.isEnabled && v.unload()
    }
    ;
    this._setLevelActive = function() {
        for (var t = 0, q = 0; q < k.length; q++)
            0 < k[q] && (t = q + 1);
        if (t === NUM_TRACKS_PER_WORLD * l.length)
            for (q = 0; q < l.length; q++)
                l[q].enable();
        else {
            t = Math.floor(t / NUM_TRACKS_PER_WORLD);
            for (q = 0; q < t + 1; q++)
                l[q].enable();
            l[t].pulseAnimation()
        }
    }
    ;
    this._onLevelBut = function(t) {
        var q = t * NUM_TRACKS_PER_WORLD;
        new CTrackMenu(t,[k[q], k[q + 1], k[q + 2]])
    }
    ;
    this.resetFullscreenBut = function() {
        A && screenfull.isEnabled && v.setActive(s_bFullscreen)
    }
    ;
    this._onFullscreenRelease = function() {
        s_bFullscreen ? w.call(window.document) : A.call(window.document.documentElement);
        sizeHandler()
    }
    ;
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    }
    ;
    this._onExit = function() {
        $(s_oMain).trigger("end_session");
        this.unload();
        s_oMain.gotoMenu()
    }
    ;
    s_oWorldMenu = this;
    this._init()
}
var s_oWorldMenu = null;
function CTrackMenu(a, f) {
    var c, g, h, d, b;
    this._init = function(e, k) {
        h = new createjs.Shape;
        h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.alpha = 0;
        h.on("mousedown", function() {});
        s_oStage.addChild(h);
        (new createjs.Tween.get(h)).to({
            alpha: .7
        }, 500);
        b = new createjs.Container;
        s_oStage.addChild(b);
        var l = s_oSpriteLibrary.getSprite("msg_box")
          , p = createBitmap(l);
        p.regX = l.width / 2;
        p.regY = l.height / 2;
        b.addChild(p);
        new CTLText(b,-300,-133,600,40,40,"center","#ffffff",PRIMARY_FONT,1,0,0,TEXT_SELECT_TRACK,!0,!0,!1,!1);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT + l.height / 2 + 70;
        c = b.y;
        (new createjs.Tween.get(b)).to({
            y: CANVAS_HEIGHT / 2
        }, 500, createjs.Ease.quartIn);
        l = s_oSpriteLibrary.getSprite("but_level");
        p = s_oSpriteLibrary.getSprite("image_" + e);
        var m = s_oSpriteLibrary.getSprite("cover_" + e);
        g = [];
        for (var n = 0; n < NUM_TRACKS_PER_WORLD; n++) {
            var u = n + 1;
            g[n] = new CLevelBut(-180 + 180 * n,0,l,m,p,b);
            g[n].addEventListenerWithParams(ON_MOUSE_UP, this._onStageBut, this, n);
            g[n].addLevelText(u);
            g[n].disable()
        }
        this._setStageInfo();
        l = s_oSpriteLibrary.getSprite("but_exit");
        d = new CGfxButton(326,-200,l,b);
        d.addEventListener(ON_MOUSE_UP, this._onBack, this)
    }
    ;
    this.unload = function() {
        for (var e = 0; e < NUM_TRACKS_PER_WORLD; e++)
            g[e].unload();
        h.off("mousedown", function() {});
        s_oStage.removeChild(h);
        s_oStage.removeChild(b)
    }
    ;
    this._setStageInfo = function() {
        for (var e = 0, k = 0; k < f.length; k++)
            0 < f[k] && (e = k + 1);
        e < NUM_TRACKS_PER_WORLD && (g[e].enable(),
        g[e].addScore(LEVEL_INFO[a * NUM_TRACKS_PER_WORLD + e].time),
        g[e].pulseAnimation());
        for (k = 0; k < e; k++)
            g[k].enable(),
            g[k].addScore(f[k])
    }
    ;
    this._onStageBut = function(e) {
        this.unload();
        s_oWorldMenu.unload();
        s_oMain.gotoGame(a * NUM_TRACKS_PER_WORLD + e)
    }
    ;
    this._onBack = function() {
        for (var e = 0; 3 > e; e++)
            g[e].setClickable();
        d.setClickable();
        var k = this;
        (new createjs.Tween.get(h)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(b)).to({
            y: c
        }, 400, createjs.Ease.backIn).call(function() {
            k.unload()
        })
    }
    ;
    this._init(a, f)
}
function CLevelBut(a, f, c, g, h, d) {
    var b, e, k, l, p = [], m, n, u, v, A = null, w = null, t;
    this._init = function(y, D, C, x) {
        b = !1;
        e = 1;
        k = [];
        l = [];
        m = new createjs.Container;
        m.x = y;
        m.y = D;
        m.scaleX = m.scaleY = e;
        x.addChild(m);
        n = new createjs.Container;
        n.x = y;
        n.y = D;
        n.scaleX = m.scaleY = e;
        x.addChild(n);
        y = C.width / 2;
        D = C.height;
        C = new createjs.SpriteSheet({
            images: [C],
            frames: {
                width: y,
                height: D,
                regX: y / 2,
                regY: D / 2
            },
            animations: {
                on: [0],
                off: [1]
            }
        });
        t = createSprite(C, "on", y / 2, D / 2, y, D);
        m.addChild(t);
        g ? t.gotoAndStop("on") : t.gotoAndStop("off");
        this._initListener()
    }
    ;
    this.unload = function() {
        s_bMobile ? m.off("mousedown", this.buttonDown) : (m.off("mousedown", this.buttonDown),
        m.off("mouseover", this.buttonOver));
        m.off("pressup", this.buttonRelease);
        d.removeChild(m)
    }
    ;
    this.setVisible = function(y) {
        m.visible = y
    }
    ;
    this.enable = function() {
        t.gotoAndStop("on");
        b = !1;
        null !== w && (A.color = "#000000",
        w.color = "#ffffff")
    }
    ;
    this.disable = function() {
        b = !0;
        t.gotoAndStop("off");
        null !== w && (A.color = "#000000",
        w.color = "#a8a8a8")
    }
    ;
    this.setClickable = function(y) {
        b = !y
    }
    ;
    this.addInfo = function(y) {
        u = new createjs.Text(y," 24px " + PRIMARY_FONT,"#000000");
        u.x = c.height / 2 - 24;
        u.y = -c.height / 2 + 10;
        u.textAlign = "center";
        u.textBaseline = "middle";
        u.lineWidth = 200;
        u.outline = 4;
        u.rotation = 30;
        m.addChild(u);
        v = new createjs.Text(y," 24px " + PRIMARY_FONT,"#ffffff");
        v.x = u.x;
        v.y = u.y;
        v.textAlign = "center";
        v.textBaseline = "middle";
        v.lineWidth = 200;
        v.rotation = u.rotation;
        m.addChild(v)
    }
    ;
    this.addScore = function(y) {
        var D = new createjs.Text(formatTime(y)," 30px " + PRIMARY_FONT,"#000000");
        D.y = c.height / 2 + 12;
        D.textAlign = "center";
        D.textBaseline = "middle";
        D.lineWidth = 200;
        D.outline = 4;
        n.addChild(D);
        y = new createjs.Text(formatTime(y)," 30px " + PRIMARY_FONT,"#ffffff");
        y.y = D.y;
        y.textAlign = "center";
        y.textBaseline = "middle";
        y.lineWidth = 200;
        n.addChild(y)
    }
    ;
    this.addLevelText = function(y) {
        A = new createjs.Text(y," 80px " + PRIMARY_FONT,"#000000");
        A.y = 2;
        A.textAlign = "center";
        A.textBaseline = "middle";
        A.lineWidth = 200;
        A.outline = 8;
        m.addChild(A);
        w = new createjs.Text(y," 80px " + PRIMARY_FONT,"#ffd800");
        w.y = 2;
        w.textAlign = "center";
        w.textBaseline = "middle";
        w.lineWidth = 200;
        m.addChild(w)
    }
    ;
    this._initListener = function() {
        if (s_bMobile)
            m.on("mousedown", this.buttonDown);
        else
            m.on("mousedown", this.buttonDown),
            m.on("mouseover", this.buttonOver);
        m.on("pressup", this.buttonRelease)
    }
    ;
    this.addEventListener = function(y, D, C) {
        k[y] = D;
        l[y] = C
    }
    ;
    this.addEventListenerWithParams = function(y, D, C, x) {
        k[y] = D;
        l[y] = C;
        p = x
    }
    ;
    this.buttonRelease = function() {
        b || (m.scaleX = e,
        m.scaleY = e,
        k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(l[ON_MOUSE_UP], p))
    }
    ;
    this.buttonDown = function() {
        b || (playSound("click", 1, 0),
        m.scaleX = .9 * e,
        m.scaleY = .9 * e,
        k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN], p))
    }
    ;
    this.buttonOver = function(y) {
        s_bMobile || b || (y.target.cursor = "pointer")
    }
    ;
    this.pulseAnimation = function() {
        createjs.Tween.get(m).to({
            scaleX: 1.1 * e,
            scaleY: 1.1 * e
        }, 850, createjs.Ease.quadOut).to({
            scaleX: e,
            scaleY: e
        }, 650, createjs.Ease.quadIn).call(function() {
            q.pulseAnimation()
        })
    }
    ;
    this.trembleAnimation = function() {
        createjs.Tween.get(m).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            q.trebleAnimation()
        })
    }
    ;
    this.setImage = function(y) {}
    ;
    this.setPosition = function(y, D) {
        m.x = y;
        m.y = D
    }
    ;
    this.setScale = function(y) {
        e = y;
        m.scaleX = m.scaleY = y
    }
    ;
    this.setX = function(y) {
        m.x = y
    }
    ;
    this.setY = function(y) {
        m.y = y
    }
    ;
    this.getButtonImage = function() {
        return m
    }
    ;
    this.getX = function() {
        return m.x
    }
    ;
    this.getY = function() {
        return m.y
    }
    ;
    var q = this;
    this._init(a, f, c, d);
    return this
}
var ROAD_INFO = []
  , AMBIENT_INFO = []
  , LEVEL_INFO = [];
ROAD_INFO[0] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.MEDIUM
}];
LEVEL_INFO[0] = {
    time: 65E3,
    num_cars: 10,
    terrain: {
        roadbounds: 2,
        num_lanes: 3,
        adherence: 1,
        max_inertia: .03,
        color: {
            light: {
                road: "#6B6B6B",
                grass: "#96a54b",
                rumble: "#555555",
                lane: "#CCCCCC"
            },
            dark: {
                road: "#696969",
                grass: "#7e8b3e",
                rumble: "#BBBBBB"
            }
        }
    }
};
AMBIENT_INFO[0] = [{
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [0, 800],
    position: 0,
    occurrence: 30,
    repetitionevery: 1,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [800, 1200],
    position: 0,
    occurrence: 30,
    repetitionevery: 2,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BUSH1,
    segments: [1E3, 1200],
    position: 0,
    occurrence: 10,
    repetitionevery: 1,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BUSH1,
    segments: [1200, 2E3],
    position: 0,
    occurrence: 10,
    repetitionevery: 3,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BUSH2,
    segments: [1600, 2600],
    position: 0,
    occurrence: 10,
    repetitionevery: 3,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [1200, 4E3],
    position: .5,
    occurrence: 10,
    repetitionevery: 3,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [2E3, 4E3],
    position: .5,
    occurrence: 30,
    repetitionevery: 3,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BILLBOARD03,
    segments: 400,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD01,
    segments: 1200,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD01,
    segments: [3E3, 3200],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BOULDER,
    segments: 1800,
    position: 1,
    disposition: AMBIENT.DISPOSITION.PRECISE
}];
ROAD_INFO[1] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.CURVE_S,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.CURVE_S,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM
}];
LEVEL_INFO[1] = {
    time: 7E4,
    num_cars: 15,
    terrain: {
        roadbounds: 2,
        num_lanes: 3,
        adherence: 1,
        max_inertia: .03,
        color: {
            light: {
                road: "#6B6B6B",
                grass: "#96a54b",
                rumble: "#555555",
                lane: "#CCCCCC"
            },
            dark: {
                road: "#696969",
                grass: "#7e8b3e",
                rumble: "#BBBBBB"
            }
        }
    }
};
AMBIENT_INFO[1] = [{
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.TREE2,
    segments: [0, 450],
    position: 0,
    occurrence: 30,
    repetitionevery: 2,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BUSH2,
    segments: [0, 450],
    position: 0,
    occurrence: 30,
    repetitionevery: 2,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BOULDER,
    segments: [0, 450],
    position: 0,
    occurrence: 10,
    repetitionevery: 3,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BILLBOARD02,
    segments: [350, 450],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE2,
    segments: [450, 1500],
    position: 0,
    occurrence: 40,
    repetitionevery: 2,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BUSH2,
    segments: [450, 1500],
    position: 0,
    occurrence: 30,
    repetitionevery: 4,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD04,
    segments: [900, 1200],
    position: 0,
    repetitionevery: 50,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD04,
    segments: [925, 1225],
    position: 0,
    repetitionevery: 50,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE2,
    segments: [1500, 3800],
    position: 1,
    occurrence: 20,
    repetitionevery: 4,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BOULDER,
    segments: [1500, 2800],
    position: 0,
    occurrence: 10,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.STUMP,
    segments: [1500, 2800],
    position: 0,
    occurrence: 10,
    repetitionevery: 15,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.TREE1,
    segments: [2400, 3200],
    position: 0,
    occurrence: 30,
    repetitionevery: 5,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BUSH2,
    segments: [3200, 3800],
    position: 0,
    occurrence: 20,
    repetitionevery: 4,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD03,
    segments: 1700,
    position: 5,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD01,
    segments: 2E3,
    position: 4,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD04,
    segments: 2300,
    position: 5,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD02,
    segments: 2600,
    position: 6,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD03,
    segments: 2900,
    position: 3,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BILLBOARD03,
    segments: 3650,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}];
ROAD_INFO[2] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: -ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: -ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: -ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.MEDIUM
}];
LEVEL_INFO[2] = {
    time: 7E4,
    num_cars: 15,
    terrain: {
        roadbounds: 2,
        num_lanes: 3,
        adherence: 1,
        max_inertia: .03,
        color: {
            light: {
                road: "#6B6B6B",
                grass: "#96a54b",
                rumble: "#555555",
                lane: "#CCCCCC"
            },
            dark: {
                road: "#696969",
                grass: "#7e8b3e",
                rumble: "#BBBBBB"
            }
        }
    }
};
AMBIENT_INFO[2] = [{
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.TREE2,
    segments: [0, 700],
    position: 0,
    occurrence: 30,
    repetitionevery: 3,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [0, 1700],
    position: 0,
    occurrence: 30,
    repetitionevery: 4,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BUSH1,
    segments: [480, 1700],
    position: 0,
    occurrence: 30,
    repetitionevery: 4,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [1700, 2300],
    position: 0,
    occurrence: 20,
    repetitionevery: 5,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.DEAD_TREE,
    segments: [1700, 2700],
    position: 0,
    occurrence: 40,
    repetitionevery: 5,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.DEAD_TREE,
    segments: [2300, 3700],
    position: 0,
    occurrence: 40,
    repetitionevery: 5,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [3400, 3700],
    position: 0,
    occurrence: 20,
    repetitionevery: 6,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BOULDER,
    segments: [1500, 3700],
    position: 0,
    occurrence: 10,
    repetitionevery: 16,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD01,
    segments: [1700, 2E3],
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD01,
    segments: [1725, 2025],
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD03,
    segments: 1300,
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD05,
    segments: [2400, 2800],
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD01,
    segments: [3100, 3400],
    position: .5,
    repetitionevery: 50,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BILLBOARD05,
    segments: 2300,
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}];
ROAD_INFO[3] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: -ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: ROAD.CURVE.EASY,
    hill: ROAD.HILL.LOW
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: -ROAD.CURVE.EASY,
    hill: ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: -ROAD.CURVE.MEDIUM,
    hill: ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: ROAD.CURVE.MEDIUM,
    hill: ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.LONG
}];
LEVEL_INFO[3] = {
    time: 73E3,
    num_cars: 20,
    terrain: {
        roadbounds: 2,
        num_lanes: 2,
        adherence: .5,
        max_inertia: 0,
        color: {
            light: {
                road: "#d5c95f",
                grass: "#f4e77a",
                rumble: "#a76b24",
                lane: "#a76b24"
            },
            dark: {
                road: "#dbce64",
                grass: "#ebde6f",
                rumble: "#a76b24"
            }
        }
    }
};
AMBIENT_INFO[3] = [{
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.PALM_TREE,
    segments: [0, 800],
    position: 0,
    repetitionevery: 16,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.PALM_TREE,
    segments: [0, 800],
    position: 0,
    repetitionevery: 13,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.PALM_TREE,
    segments: [800, 1600],
    position: 2,
    occurrence: 20,
    repetitionevery: 20,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.CACTUS1,
    segments: [1400, 2600],
    position: .5,
    occurrence: 20,
    repetitionevery: 5,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BOULDER,
    segments: [0, 2800],
    position: 2,
    occurrence: 10,
    repetitionevery: 13,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD01,
    segments: [2200, 2500],
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD02,
    segments: [2800, 3200],
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}];
ROAD_INFO[4] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    hill: ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.BUMPS,
    length: ROAD.LENGTH.SHORT / 2,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.BUMPS,
    length: ROAD.LENGTH.SHORT / 2,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.CURVE_S,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.HARD,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.CURVE_S,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.MEDIUM,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.LONG
}];
LEVEL_INFO[4] = {
    time: 78E3,
    num_cars: 20,
    terrain: {
        roadbounds: 2,
        num_lanes: 2,
        adherence: .5,
        max_inertia: 0,
        color: {
            light: {
                road: "#f4e77a",
                grass: "#f4e77a",
                rumble: "#a76b24",
                lane: "#a76b24"
            },
            dark: {
                road: "#ebde6f",
                grass: "#ebde6f",
                rumble: "#a76b24"
            }
        }
    }
};
AMBIENT_INFO[4] = [{
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BOULDER,
    segments: [0, 3900],
    position: 2,
    occurrence: 10,
    repetitionevery: 20,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BOULDER,
    segments: [0, 3900],
    position: 5,
    occurrence: 5,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BILLBOARD04,
    segments: 770,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.COLUMN,
    segments: [780, 1400],
    position: 0,
    repetitionevery: 14,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.CACTUS1,
    segments: [1800, 3200],
    position: 5,
    occurrence: 30,
    repetitionevery: 15,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD04,
    segments: 1650,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD02,
    segments: 2E3,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.CACTUS1,
    segments: [2400, 3600],
    position: 0,
    occurrence: 70,
    repetitionevery: 15,
    disposition: AMBIENT.DISPOSITION.DENSITY
}];
ROAD_INFO[5] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    hill: ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    hill: ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT / 2,
    curve: -ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT / 2,
    curve: ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT / 2,
    curve: -ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: ROAD.CURVE.HARD,
    hill: -ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT / 2,
    curve: ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT / 2,
    curve: -ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT / 2,
    curve: ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: -ROAD.CURVE.HARD,
    hill: ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.BUMPS,
    length: ROAD.LENGTH.SHORT / 2
}, {
    roadtype: ROAD.TYPE.BUMPS,
    length: ROAD.LENGTH.SHORT,
    curve: -ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: -ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.LONG
}];
LEVEL_INFO[5] = {
    time: 6E4,
    num_cars: 25,
    terrain: {
        roadbounds: 2,
        num_lanes: 2,
        adherence: .5,
        max_inertia: 0,
        color: {
            light: {
                road: "#f4e77a",
                grass: "#f4e77a",
                rumble: "#a76b24",
                lane: "#a76b24"
            },
            dark: {
                road: "#ebde6f",
                grass: "#ebde6f",
                rumble: "#a76b24"
            }
        }
    }
};
AMBIENT_INFO[5] = [{
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BILLBOARD05,
    segments: 20,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BOULDER,
    segments: [0, 3900],
    position: 2,
    occurrence: 10,
    repetitionevery: 20,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BOULDER,
    segments: [0, 3900],
    position: 5,
    occurrence: 5,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.CACTUS2,
    segments: [40, 1600],
    position: 0,
    occurrence: 70,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.CACTUS2,
    segments: [1600, 3900],
    position: 1,
    occurrence: 35,
    repetitionevery: 20,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD03,
    segments: [1500, 1700],
    position: 0,
    repetitionevery: 40,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD04,
    segments: [1525, 1725],
    position: 0,
    repetitionevery: 40,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BOULDER,
    segments: [2200, 2650],
    position: 0,
    occurrence: 70,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BOULDER,
    segments: [2200, 2650],
    position: 0,
    occurrence: 40,
    repetitionevery: 8,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BOULDER,
    segments: [2200, 2650],
    position: 0,
    occurrence: 30,
    repetitionevery: 7,
    disposition: AMBIENT.DISPOSITION.DENSITY
}];
ROAD_INFO[6] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: ROAD.CURVE.HARD,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.HARD,
    hill: -ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    hill: -ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: ROAD.CURVE.VERYHARD,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: -ROAD.CURVE.VERYHARD,
    hill: -ROAD.HILL.LOW
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    hill: -ROAD.HILL.LOW
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: ROAD.CURVE.VERYHARD,
    hill: -ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.LONG
}];
LEVEL_INFO[6] = {
    time: 9E4,
    num_cars: 60,
    terrain: {
        roadbounds: 2,
        num_lanes: 4,
        adherence: 1,
        max_inertia: .03,
        color: {
            light: {
                road: "#2a2a2a",
                grass: "#010e18",
                rumble: "#2a2a2a",
                lane: "#ffffff"
            },
            dark: {
                road: "#2a2a2a",
                grass: "#00080e",
                rumble: "#ffffff"
            }
        }
    }
};
AMBIENT_INFO[6] = [{
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.HOUSE1,
    segments: [0, 5E3],
    position: 5,
    occurrence: 20,
    repetitionevery: 100,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.SIGN_INDICATION,
    segments: [900, 5E3],
    position: -1,
    repetitionevery: 900,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.SIGN_CURVE_RIGHT,
    segments: [3845, 3900],
    position: .3,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.SIGN_CURVE_RIGHT,
    segments: [2100, 2550],
    position: .3,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.SIGN_CURVE_LEFT,
    segments: [2700, 3150],
    position: .3,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.LAMP_LEFT,
    segments: [300, 850],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.LAMP_RIGHT,
    segments: [300, 850],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.LAMP_LEFT,
    segments: [3950, 4500],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.LAMP_RIGHT,
    segments: [3965, 4500],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}];
ROAD_INFO[7] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.MEDIUM,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.HARD,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.HARD,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.VERYHARD,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.VERYHARD,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.VERYHARD,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.VERYHARD,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.VERYHARD,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.VERYHARD,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.VERYHARD,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.VERYHARD,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: -ROAD.CURVE.VERYHARD,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: ROAD.CURVE.VERYHARD,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.LONG
}];
LEVEL_INFO[7] = {
    time: 11E4,
    num_cars: 70,
    terrain: {
        roadbounds: 2,
        num_lanes: 4,
        adherence: 1,
        max_inertia: .03,
        color: {
            light: {
                road: "#2a2a2a",
                grass: "#010e18",
                rumble: "#2a2a2a",
                lane: "#ffffff"
            },
            dark: {
                road: "#2a2a2a",
                grass: "#00080e",
                rumble: "#ffffff"
            }
        }
    }
};
AMBIENT_INFO[7] = [{
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.LAMP_LEFT,
    segments: [0, 5E3],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.LAMP_RIGHT,
    segments: [15, 5E3],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.HOUSE1,
    segments: [50, 5E3],
    position: 5,
    occurrence: 20,
    repetitionevery: 100,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.HOUSE2,
    segments: [0, 5E3],
    position: 5,
    occurrence: 20,
    repetitionevery: 100,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.SIGN_INDICATION,
    segments: [1100, 5E3],
    position: -1,
    repetitionevery: 1100,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BILLBOARD01,
    segments: [10, 650],
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.SIGN_CURVE_LEFT,
    segments: [3070, 3270],
    position: .3,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.SIGN_CURVE_RIGHT,
    segments: [3400, 3570],
    position: .3,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.SIGN_CURVE_LEFT,
    segments: [3700, 4100],
    position: .3,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.SIGN_CURVE_RIGHT,
    segments: [4300, 4700],
    position: .3,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.PRECISE
}];
ROAD_INFO[8] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: -ROAD.CURVE.MEDIUM,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: ROAD.CURVE.HARD,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.MEDIUM,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.MEDIUM,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    hill: ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: ROAD.CURVE.MEDIUM,
    hill: ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.HARD,
    hill: ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.VERYHARD,
    hill: -ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: -ROAD.CURVE.VERYHARD,
    hill: ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: -ROAD.CURVE.EASY,
    hill: ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.VERYHARD,
    hill: -ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: -ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.MEDIUM,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: ROAD.CURVE.MEDIUM,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: -ROAD.CURVE.HARD,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    hill: -ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: -ROAD.CURVE.MEDIUM,
    hill: -ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.HARD,
    hill: -ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.VERYHARD,
    hill: ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: ROAD.CURVE.VERYHARD,
    hill: -ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT,
    curve: ROAD.CURVE.EASY,
    hill: -ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.VERYHARD,
    hill: ROAD.HILL.VERYHIGH
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.EXTRALONG
}];
LEVEL_INFO[8] = {
    time: 13E4,
    num_cars: 80,
    terrain: {
        roadbounds: 4,
        num_lanes: 4,
        adherence: 1,
        max_inertia: .03,
        color: {
            light: {
                road: "#2a2a2a",
                grass: "#010e18",
                rumble: "#2a2a2a",
                lane: "#ffffff"
            },
            dark: {
                road: "#2a2a2a",
                grass: "#00080e",
                rumble: "#ffffff"
            }
        }
    }
};
AMBIENT_INFO[8] = [{
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.HOUSE2,
    segments: [0, 7E3],
    position: 5,
    occurrence: 20,
    repetitionevery: 50,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.HOUSE1,
    segments: [2500, 3700],
    position: 1,
    occurrence: 40,
    repetitionevery: 12,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.HOUSE2,
    segments: [2505, 3700],
    position: 1,
    occurrence: 40,
    repetitionevery: 12,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.LAMP_LEFT,
    segments: [0, 2400],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.LAMP_RIGHT,
    segments: [15, 2400],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BILLBOARD04,
    segments: 2480,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.LAMP_LEFT,
    segments: [2500, 3680],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.LAMP_RIGHT,
    segments: [2500, 3680],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BILLBOARD04,
    segments: 3700,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.LAMP_LEFT,
    segments: [3750, 6570],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.LAMP_RIGHT,
    segments: [3765, 6585],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.SIGN_INDICATION,
    segments: [900, 6E3],
    position: -1,
    repetitionevery: 900,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.SIGN_CURVE_RIGHT,
    segments: [1500, 1700],
    position: .3,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.SIGN_CURVE_LEFT,
    segments: [2E3, 2400],
    position: .3,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.SIGN_CURVE_LEFT,
    segments: [4800, 5E3],
    position: .3,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.SIGN_CURVE_RIGHT,
    segments: [5100, 5200],
    position: .3,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.SIGN_CURVE_RIGHT,
    segments: [5300, 5700],
    position: .3,
    repetitionevery: 10,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD01,
    segments: 6100,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD02,
    segments: 6200,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD03,
    segments: 6300,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD04,
    segments: 6400,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD05,
    segments: 6500,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD01,
    segments: 6150,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD02,
    segments: 6250,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD03,
    segments: 6350,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD04,
    segments: 6450,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD05,
    segments: 6550,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}];
function CHorizon(a) {
    var f, c, g;
    this._init = function(h) {
        f = 0;
        g = new createjs.Container;
        s_oStage.addChild(g);
        c = [];
        var d = Math.floor(h / NUM_TRACKS_PER_WORLD);
        h = "w" + d + "_bg1";
        d = s_oSpriteLibrary.getSprite("w" + d + "_bg0");
        this._addBG(d);
        d = s_oSpriteLibrary.getSprite(h);
        this._addBG(d)
    }
    ;
    this._addBG = function(h) {
        h = new CBackground(h,g);
        c.push(h)
    }
    ;
    this.resetPos = function() {
        f = 0
    }
    ;
    this.restart = function() {
        for (var h = 0; h < c.length; h++)
            c[h].restart()
    }
    ;
    this.move = function(h) {
        var d = f - h.x;
        30 < d || -30 > d || (c[0].moveX(d),
        c[1].moveX(d * PARALLAX_RATIO_X),
        c[0].moveY(h.y * PARALLAX_RATIO_Y_0),
        c[1].moveY(h.y * PARALLAX_RATIO_Y_1));
        f = h.x
    }
    ;
    this._init(a)
}
function CBackground(a, f) {
    var c, g, h;
    this._init = function() {
        c = a.height / 2 - (CANVAS_HEIGHT - 2 * s_iOffsetY) / 2;
        h = new createjs.Container;
        f.addChild(h);
        g = [];
        for (var d = 0; 2 > d; d++)
            g[d] = createBitmap(a),
            g[d].regY = a.height / 2,
            g[d].x = d * a.width,
            g[d].y = CANVAS_HEIGHT / 2,
            h.addChild(g[d]),
            g[d].cache(0, 0, a.width, a.height)
    }
    ;
    this.restart = function() {
        h.x = 0;
        for (var d = h.y = 0; 2 > d; d++)
            g[d].x = d * a.width,
            g[d].y = CANVAS_HEIGHT / 2
    }
    ;
    this.moveX = function(d) {
        h.x += d;
        d = Math.floor(-h.x / a.width) * a.width;
        for (var b = 0; 2 > b; b++)
            g[b].x = d + b * a.width
    }
    ;
    this.moveY = function(d) {
        d < -c && (d = -c);
        d > c && (d = c);
        h.y = d
    }
    ;
    this._init()
}
function CNextLevelPanel(a, f, c) {
    var g, h, d, b, e;
    this._init = function(l, p, m) {
        playSound("arrive_win", 1, !1);
        setVolume(s_aSounds.game_soundtrack, SOUNDTRACK_VOLUME_IN_GAME);
        d = new createjs.Shape;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        d.alpha = 0;
        d.on("mousedown", function() {});
        s_oStage.addChild(d);
        (new createjs.Tween.get(d)).to({
            alpha: .7
        }, 500);
        h = new createjs.Container;
        s_oStage.addChild(h);
        var n = s_oSpriteLibrary.getSprite("msg_box")
          , u = createBitmap(n);
        u.regX = n.width / 2;
        u.regY = n.height / 2;
        h.addChild(u);
        new CTLText(h,-300,-180,600,40,40,"center","#fff",PRIMARY_FONT,1,0,0,TEXT_TRACK_COMPLETED,!0,!0,!1,!1);
        u = new createjs.Container;
        u.x = -220;
        u.y = -50;
        h.addChild(u);
        n = s_oSpriteLibrary.getSprite("timer");
        var v = createBitmap(n);
        v.regX = n.width / 2;
        v.regY = n.height / 2;
        u.addChild(v);
        new CTLText(u,34,-20,150,50,50,"left","#fff",PRIMARY_FONT,1,0,0,formatTime(LEVEL_INFO[m].time - l),!0,!0,!1,!1);
        l = new createjs.Container;
        l.x = 120;
        l.y = u.y;
        h.addChild(l);
        n = s_oSpriteLibrary.getSprite("star");
        m = createBitmap(n);
        m.regX = n.width / 2;
        m.regY = n.height / 2;
        l.addChild(m);
        var A = new CTLText(l,34,-20,150,50,50,"left","#fff",PRIMARY_FONT,1,0,0,"0",!0,!0,!1,!1);
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT + n.height / 2;
        g = h.y;
        (new createjs.Tween.get(h)).to({
            y: CANVAS_HEIGHT / 2
        }, 500, createjs.Ease.quartIn).call(function() {
            new CRollingText(A.getText(),p,5E3,!1)
        });
        this._sendScore();
        n = s_oSpriteLibrary.getSprite("but_next");
        b = new CGfxButton(120,100,n,h);
        b.addEventListener(ON_MOUSE_UP, this._onContinue, this);
        b.pulseAnimation();
        n = s_oSpriteLibrary.getSprite("but_restart");
        e = new CGfxButton(-120,100,n,h);
        e.addEventListener(ON_MOUSE_UP, this._onRestart, this)
    }
    ;
    this.unload = function() {
        d.off("mousedown", function() {});
        s_oStage.removeChild(d);
        h.removeAllChildren(d);
        b.unload();
        e.unload()
    }
    ;
    this._sendScore = function() {
        var l = LEVEL_INFO[c].time - a;
        s_iTotalScore += f;
        if (l < s_aTimeScore[c] || 0 === s_aTimeScore[c])
            s_aTimeScore[c] = l;
        s_oLocalStorage.saveData();
        $(s_oMain).trigger("save_score", s_iTotalScore)
    }
    ;
    this._onContinue = function() {
        e.setClickable(!1);
        b.setClickable(!1);
        (new createjs.Tween.get(d)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(h)).to({
            y: g
        }, 400, createjs.Ease.backIn).call(function() {
            k.unload();
            s_oGame.nextLevel()
        })
    }
    ;
    this._onRestart = function() {
        e.setClickable(!1);
        b.setClickable(!1);
        (new createjs.Tween.get(d)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(h)).to({
            y: g
        }, 400, createjs.Ease.backIn).call(function() {
            k.unload();
            s_oGame.restartGame()
        })
    }
    ;
    this._onFinishRolling = function() {}
    ;
    this._onRollingRemoved = function() {}
    ;
    this._onRollingText = function(l) {
        (void 0).playManualMode(l, STAR_EFFECT_SCALE)
    }
    ;
    var k = this;
    this._init(a, f, c)
}
function CRollingText(a, f, c, g) {
    var h = null, d;
    this._init = function(b, e, k) {
        d = {
            value: parseInt(b.text)
        };
        h = createjs.Tween.get(d, {
            override: !0
        }).to({
            value: e
        }, k, createjs.Ease.cubicInOut).addEventListener("change", function() {
            b.text = g ? formatTime(d.value) : "+" + Math.floor(d.value)
        }).call(function() {
            createjs.Tween.removeTweens(h)
        })
    }
    ;
    this._init(a, f, c);
    return this
}
var LOCALSTORAGE_TIMES = "times"
  , LOCALSTORAGE_TOTALSCORE = "totalscore"
  , s_aTimeScore = []
  , s_iTotalScore = 0;
function CLocalStorage(a) {
    var f = !0;
    this._init = function(c) {
        try {
            var g = window.localStorage.getItem(c);
            this.resetData();
            null !== g && void 0 !== g && this.loadData()
        } catch (h) {
            this.resetData()
        }
    }
    ;
    this.isDirty = function() {
        for (var c = 0; c < s_aTimeScore.length; c++)
            if (0 < s_aTimeScore[c])
                return !0;
        return !1
    }
    ;
    this.isUsed = function() {
        try {
            window.localStorage.setItem("ls_available", "ok")
        } catch (c) {
            f = !1
        }
        return f
    }
    ;
    this.resetData = function() {
        s_aTimeScore = [];
        for (var c = 0; c < NUM_TRACKS_PER_WORLD * NUM_WORLDS; c++)
            s_aTimeScore[c] = 0;
        s_iTotalScore = 0
    }
    ;
    this.deleteData = function() {
        window.localStorage.removeItem(a)
    }
    ;
    this.saveData = function() {
        var c = {};
        c[LOCALSTORAGE_TIMES] = s_aTimeScore;
        c[LOCALSTORAGE_TOTALSCORE] = s_iTotalScore;
        window.localStorage.setItem(a, JSON.stringify(c))
    }
    ;
    this.loadData = function() {
        var c = JSON.parse(window.localStorage.getItem(a))
          , g = c[LOCALSTORAGE_TIMES];
        s_aTimeScore = [];
        for (var h = 0; h < g.length; h++)
            s_aTimeScore[h] = parseInt(g[h]);
        s_iTotalScore = parseInt(c[LOCALSTORAGE_TOTALSCORE])
    }
    ;
    this._init(a)
}
function CLosePanel() {
    var a, f, c, g, h;
    this._init = function() {
        setVolume(s_aSounds.game_soundtrack, SOUNDTRACK_VOLUME_IN_GAME);
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = 0;
        f.on("mousedown", function() {});
        s_oStage.addChild(f);
        (new createjs.Tween.get(f)).to({
            alpha: .7
        }, 500);
        c = new createjs.Container;
        s_oStage.addChild(c);
        var b = s_oSpriteLibrary.getSprite("msg_box")
          , e = createBitmap(b);
        e.regX = b.width / 2;
        e.regY = b.height / 2;
        c.addChild(e);
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT + b.height / 2;
        a = c.y;
        (new createjs.Tween.get(c)).to({
            y: CANVAS_HEIGHT / 2
        }, 500, createjs.Ease.quartIn);
        b = s_oSpriteLibrary.getSprite("baloon_mc");
        e = createBitmap(b);
        e.regX = b.width / 2;
        e.regY = b.height / 2;
        e.y = -10;
        e.scaleX = e.scaleY = .6;
        c.addChild(e);
        new CTLText(c,-300,-180,600,100,50,"center","#fff",PRIMARY_FONT,1,0,0,TEXT_TIME_IS_UP,!0,!0,!0,!1);
        b = s_oSpriteLibrary.getSprite("but_exit");
        g = new CGfxButton(120,100,b,c);
        g.addEventListener(ON_MOUSE_UP, this._onExit, this);
        b = s_oSpriteLibrary.getSprite("but_restart");
        h = new CGfxButton(-120,100,b,c);
        h.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        h.pulseAnimation()
    }
    ;
    this.unload = function() {
        s_oStage.removeChild(c);
        f.off("mousedown", function() {});
        g.unload();
        h.unload()
    }
    ;
    this.show = function() {
        playSound("arrive_lose", 1, 0)
    }
    ;
    this._onExit = function() {
        f.off("mousedown", function() {});
        s_oStage.removeChild(c);
        s_oGame.onExit()
    }
    ;
    this._onRestart = function() {
        h.setClickable(!1);
        g.setClickable(!1);
        (new createjs.Tween.get(f)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(c)).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            d.unload();
            s_oGame.restartGame()
        })
    }
    ;
    var d = this;
    this._init();
    return this
}
function CTimer(a, f, c, g, h, d, b) {
    var e, k, l;
    this._init = function(p, m, n, u, v, A, w) {
        e = new createjs.Container;
        e.x = p;
        e.y = m;
        n.addChild(e);
        p = 0;
        A && (A = s_oSpriteLibrary.getSprite(A),
        p = createBitmap(A),
        p.regY = A.height / 2,
        e.addChild(p),
        p = A.width);
        k = new createjs.Text("00:00"," " + u + "px " + PRIMARY_FONT,w);
        k.x = p + 10;
        k.textAlign = "left";
        k.textBaseline = "middle";
        k.lineWidth = 500;
        k.outline = 6;
        e.addChild(k);
        l = new createjs.Text(k.text," " + u + "px " + PRIMARY_FONT,v);
        l.x = k.x;
        l.y = k.y;
        l.textAlign = k.textAlign;
        l.textBaseline = k.textBaseline;
        l.lineWidth = k.lineWidth;
        e.addChild(l);
        e.regX = e.getBounds().width / 2
    }
    ;
    this.setDecimalTime = function(p) {
        p = formatTime(p);
        k.text = p;
        l.text = p
    }
    ;
    this.setIntTime = function(p) {
        p = Math.floor(p / 1E3);
        k.text = p;
        l.text = p
    }
    ;
    this.setSpeedIndicator = function(p) {
        p = Math.floor(p);
        k.text = p;
        l.text = p
    }
    ;
    this.setAlign = function(p, m) {
        k.textAlign = p;
        k.textBaseline = m;
        l.textAlign = k.textAlign;
        l.textBaseline = k.textBaseline
    }
    ;
    this.resetTextRelativePos = function() {
        k.x = 0;
        k.y = 0;
        l.x = k.x;
        l.y = k.y;
        e.regX = 0
    }
    ;
    this.setPos = function(p, m) {
        e.x = p;
        e.y = m
    }
    ;
    this._init(a, f, c, g, h, d, b)
}
function CTachometer(a, f) {
    var c, g, h, d;
    this._init = function(b, e) {
        c = b;
        g = e;
        h = new createjs.Container;
        h.x = c;
        h.y = g;
        s_oStage.addChild(h);
        var k = s_oSpriteLibrary.getSprite("tachometer")
          , l = createBitmap(k);
        l.regX = k.width / 2;
        l.regY = k.height;
        h.addChild(l);
        new CTLText(h,-70,-115,140,40,40,"center","#ffcc00",PRIMARY_FONT,1,0,0,TEXT_SPEED_INDICATOR,!0,!0,!1,!1);
        new CTLText(h,-45,-73,90,60,60,"right","#222222",SECONDARY_FONT,1,0,0,"888",!0,!0,!1,!1);
        d = new CTLText(h,-45,-73,90,60,60,"right","#fff",SECONDARY_FONT,1,0,0,"0",!0,!0,!1,!1)
    }
    ;
    this.setSpeedIndicator = function(b) {
        d.refreshText(Math.floor(b))
    }
    ;
    this.updateOffset = function(b, e) {
        h.x = c + b;
        h.y = g - e
    }
    ;
    this._init(a, f)
}
function CMsgBox(a, f) {
    var c, g, h, d, b;
    this._init = function(k, l) {
        d = new createjs.Shape;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        d.alpha = 0;
        d.on("mousedown", function() {});
        s_oStage.addChild(d);
        (new createjs.Tween.get(d)).to({
            alpha: .7
        }, 500);
        b = new createjs.Container;
        s_oStage.addChild(b);
        var p = s_oSpriteLibrary.getSprite("msg_box")
          , m = createBitmap(p);
        m.regX = p.width / 2;
        m.regY = p.height / 2;
        b.addChild(m);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT + p.height / 2;
        c = b.y;
        (new createjs.Tween.get(b)).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.quartIn);
        g = new CTLText(b,-300,-190,600,170,26,"center","#fff",PRIMARY_FONT,1,0,0,k,!0,!0,!0,!1);
        h = new CGfxButton(0,80,s_oSpriteLibrary.getSprite("but_yes"),b);
        h.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        h.pulseAnimation()
    }
    ;
    this._onButYes = function() {
        h.setClickable(!1);
        (new createjs.Tween.get(d)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(b)).to({
            y: c
        }, 400, createjs.Ease.backIn).call(function() {
            e.unload();
            f && f()
        })
    }
    ;
    this.changeMessage = function(k) {
        g.refreshText(k)
    }
    ;
    this.unload = function() {
        h.unload();
        s_oStage.removeChild(d);
        s_oStage.removeChild(b);
        d.off("mousedown", function() {})
    }
    ;
    var e = this;
    this._init(a, f)
}
function CTremble(a, f, c, g) {
    var h, d, b, e, k, l, p;
    this._init = function(n, u, v, A) {
        e = b = !1;
        l = 0;
        this._calculateDuration();
        h = n.x;
        d = n.y;
        b || (b = !0,
        k = setInterval(function() {
            m._tremble()
        }, v))
    }
    ;
    this._tremble = function() {
        if (e = !e) {
            var n = .5 > Math.random() ? -g : g;
            var u = .5 > Math.random() ? -g : g;
            a.x += n;
            a.y += u
        } else
            a.x = h,
            a.y = d;
        l++;
        l > p && (l = 0,
        b = !1,
        s_oGame.endDamageTime(),
        a.x = h,
        a.y = d,
        0 === f ? k = setInterval(function() {
            m._tremble()
        }, c) : clearInterval(k))
    }
    ;
    this._calculateDuration = function() {
        p = f / c
    }
    ;
    this.stopTremble = function() {
        clearInterval(k)
    }
    ;
    var m = this;
    this._init(a, f, c, g)
}
function CAreYouSurePanel(a, f) {
    var c, g, h, d, b, e, k;
    this._init = function(p, m) {
        e = new createjs.Shape;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.alpha = 0;
        e.on("mousedown", function() {});
        s_oStage.addChild(e);
        (new createjs.Tween.get(e)).to({
            alpha: .7
        }, 500);
        k = new createjs.Container;
        s_oStage.addChild(k);
        var n = s_oSpriteLibrary.getSprite("msg_box")
          , u = createBitmap(n);
        u.regX = n.width / 2;
        u.regY = n.height / 2;
        k.addChild(u);
        k.x = CANVAS_WIDTH / 2;
        k.y = CANVAS_HEIGHT + n.height / 2;
        c = k.y;
        (new createjs.Tween.get(k)).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.cubicOut);
        g = new CTLText(k,-300,-n.height / 2 + 40,600,140,70,"center","#000",PRIMARY_FONT,1,0,0,TEXT_ARE_SURE,!0,!0,!0,!1);
        g.setOutline(5);
        h = new CTLText(k,-300,-n.height / 2 + 40,600,140,70,"center","#fff",PRIMARY_FONT,1,0,0,TEXT_ARE_SURE,!0,!0,!0,!1);
        d = new CGfxButton(110,80,s_oSpriteLibrary.getSprite("but_yes"),k);
        d.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        b = new CGfxButton(-110,80,s_oSpriteLibrary.getSprite("but_exit"),k);
        b.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        b.pulseAnimation()
    }
    ;
    this._onButYes = function() {
        b.setClickable(!1);
        d.setClickable(!1);
        (new createjs.Tween.get(e)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(k)).to({
            y: c
        }, 400, createjs.Ease.backIn).call(function() {
            l.unload();
            a && a()
        })
    }
    ;
    this._onButNo = function() {
        b.setClickable(!1);
        d.setClickable(!1);
        (new createjs.Tween.get(e)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(k)).to({
            y: c
        }, 400, createjs.Ease.backIn).call(function() {
            l.unload();
            f && f()
        })
    }
    ;
    this.changeMessage = function(p, m) {
        g.refreshText(p);
        h.refreshText(p)
    }
    ;
    this.unload = function() {
        b.unload();
        d.unload();
        s_oStage.removeChild(e);
        s_oStage.removeChild(k);
        e.off("mousedown", function() {})
    }
    ;
    var l = this;
    this._init(a, f)
}
CTLText.prototype = {
    constructor: CTLText,
    __autofit: function() {
        if (this._bFitText) {
            for (var a = this._iFontSize; (this._oText.getBounds().height > this._iHeight - 2 * this._iPaddingV || this._oText.getBounds().width > this._iWidth - 2 * this._iPaddingH) && !(a--,
            this._oText.font = a + "px " + this._szFont,
            this._oText.lineHeight = Math.round(a * this._fLineHeightFactor),
            this.__updateY(),
            this.__verticalAlign(),
            8 > a); )
                ;
            this._iFontSize = a
        }
    },
    __verticalAlign: function() {
        if (this._bVerticalAlign) {
            var a = this._oText.getBounds().height;
            this._oText.y -= (a - this._iHeight) / 2 + this._iPaddingV
        }
    },
    __updateY: function() {
        this._oText.y = this._y + this._iPaddingV;
        switch (this._oText.textBaseline) {
        case "middle":
            this._oText.y += this._oText.lineHeight / 2 + (this._iFontSize * this._fLineHeightFactor - this._iFontSize)
        }
    },
    __createText: function(a) {
        this._bDebug && (this._oDebugShape = new createjs.Shape,
        this._oDebugShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(this._x, this._y, this._iWidth, this._iHeight),
        this._oContainer.addChild(this._oDebugShape));
        this._oText = new createjs.Text(a,this._iFontSize + "px " + this._szFont,this._szColor);
        this._oText.textBaseline = "middle";
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this._oText.textAlign = this._szAlign;
        this._oText.lineWidth = this._bMultiline ? this._iWidth - 2 * this._iPaddingH : null;
        switch (this._szAlign) {
        case "center":
            this._oText.x = this._x + this._iWidth / 2;
            break;
        case "left":
            this._oText.x = this._x + this._iPaddingH;
            break;
        case "right":
            this._oText.x = this._x + this._iWidth - this._iPaddingH
        }
        this._oContainer.addChild(this._oText);
        this.refreshText(a)
    },
    setVerticalAlign: function(a) {
        this._bVerticalAlign = a
    },
    setOutline: function(a) {
        null !== this._oText && (this._oText.outline = a)
    },
    setShadow: function(a, f, c, g) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a,f,c,g))
    },
    setColor: function(a) {
        this._oText.color = a
    },
    setAlpha: function(a) {
        this._oText.alpha = a
    },
    removeTweens: function() {
        createjs.Tween.removeTweens(this._oText)
    },
    getText: function() {
        return this._oText
    },
    getString: function() {
        return this._oText.text
    },
    getY: function() {
        return this._y
    },
    getFontSize: function() {
        return this._iFontSize
    },
    refreshText: function(a) {
        "" === a && (a = " ");
        null === this._oText && this.__createText(a);
        this._oText.text = a;
        this._oText.font = this._iFontSize + "px " + this._szFont;
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this.__autofit();
        this.__updateY();
        this.__verticalAlign()
    }
};
function CTLText(a, f, c, g, h, d, b, e, k, l, p, m, n, u, v, A, w) {
    this._oContainer = a;
    this._x = f;
    this._y = c;
    this._iWidth = g;
    this._iHeight = h;
    this._bMultiline = A;
    this._iFontSize = d;
    this._szAlign = b;
    this._szColor = e;
    this._szFont = k;
    this._iPaddingH = p;
    this._iPaddingV = m;
    this._bVerticalAlign = v;
    this._bFitText = u;
    this._bDebug = w;
    this._oDebugShape = null;
    this._fLineHeightFactor = l;
    this._oText = null;
    n && this.__createText(n)
}
function extractHostname(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    a = a.split(":")[0];
    return a = a.split("?")[0]
}
function extractRootDomain(a) {
    a = extractHostname(a);
    var f = a.split(".")
      , c = f.length;
    2 < c && (a = f[c - 2] + "." + f[c - 1]);
    return a
}
var getClosestTop = function() {
    var a = window
      , f = !1;
    try {
        for (; a.parent.document !== a.document; )
            if (a.parent.document)
                a = a.parent;
            else {
                f = !0;
                break
            }
    } catch (c) {
        f = !0
    }
    return {
        topFrame: a,
        err: f
    }
}
  , getBestPageUrl = function(a) {
    var f = a.topFrame
      , c = "";
    if (a.err)
        try {
            try {
                c = window.top.location.href
            } catch (h) {
                var g = window.location.ancestorOrigins;
                c = g[g.length - 1]
            }
        } catch (h) {
            c = f.document.referrer
        }
    else
        c = f.location.href;
    return c
}
  , TOPFRAMEOBJ = getClosestTop()
  , PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);
function seekAndDestroy() {
    for (var a = extractRootDomain(PAGE_URL), f = [String.fromCharCode(99, 111, 100, 101, 116, 104, 105, 115, 108, 97, 98, 46, 99, 111, 109), String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116)], c = 0; c < f.length; c++)
        if (f[c] === a)
            return !0;
    return !1
}
;