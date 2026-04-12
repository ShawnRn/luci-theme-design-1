/**
 * Luci theme Design runtime helpers.
 * Updated for LuCI 24.10 menu rendering and modern client-side views.
 */
(function ($) {
    var lastNode;
    var mainNodeName;
    var showSide = false;

    function normalizeLocation() {
        if (!window.luciLocation || !window.luciLocation.length) {
            window.luciLocation = ["main", "login"];
            return;
        }

        if (window.luciLocation[0] === "admin") {
            window.luciLocation = window.luciLocation.slice(1);
        }
    }

    function currentNodeUrl() {
        return (window.luciLocation || []).join("/");
    }

    function menuSelector() {
        return ".main > .main-left > .nav > .slide > .menu";
    }

    function submenuSelector() {
        return ".main > .main-left > .nav > .slide > .slide-menu > li";
    }

    function refreshCurrentNode() {
        normalizeLocation();

        if (!$("body").hasClass("logged-in")) {
            $("body").addClass("node-main-login");
            return false;
        }

        var nodeUrl = currentNodeUrl();
        var urlReg = new RegExp(nodeUrl + "$");
        var matched = false;

        $(menuSelector()).removeClass("active");
        $(".main > .main-left > .nav > .slide > .slide-menu").removeClass("active").hide();
        $(submenuSelector()).removeClass("active");

        $(menuSelector()).each(function () {
            var toggle = $(this);
            var submenu = toggle.next(".slide-menu");

            submenu.find("a").each(function () {
                var anchor = $(this);
                var href = anchor.attr("href") || "";

                if (urlReg.test(href)) {
                    toggle.addClass("active");
                    submenu.addClass("active").show();
                    lastNode = anchor.parent();
                    lastNode.addClass("active");
                    matched = true;
                    return false;
                }
            });

            if (matched) {
                return false;
            }
        });

        if (matched && window.luciLocation.length >= 2) {
            mainNodeName = "node-" + window.luciLocation[0] + "-" + window.luciLocation[1];
            mainNodeName = mainNodeName.replace(/[ \t\n\r\/]+/g, "_").toLowerCase();
            $("body").addClass(mainNodeName);
        }

        return matched;
    }

    function bindSidebar() {
        $(document).off("click.design.menu").on("click.design.menu", menuSelector(), function (ev) {
            ev.preventDefault();

            var toggle = $(this);
            var submenu = toggle.next(".slide-menu");
            var isOpen = toggle.hasClass("active");

            $(menuSelector()).not(toggle).removeClass("active");
            $(".main > .main-left > .nav > .slide > .slide-menu").not(submenu).removeClass("active").stop(true, true).slideUp("fast");

            if (isOpen) {
                toggle.removeClass("active");
                submenu.removeClass("active").stop(true, true).slideUp("fast");
            } else {
                toggle.addClass("active");
                submenu.addClass("active").stop(true, true).slideDown("fast");
            }
        });

        $(document).off("click.design.submenu").on("click.design.submenu", submenuSelector() + " > a", function () {
            if (lastNode)
                lastNode.removeClass("active");
            lastNode = $(this).parent().addClass("active");
            $(".main > .loading").fadeIn("fast");
            return true;
        });

        $(document).off("click.design.submenuLi").on("click.design.submenuLi", submenuSelector(), function (ev) {
            if ($(ev.target).is("a"))
                return true;
            if (lastNode)
                lastNode.removeClass("active");
            lastNode = $(this).addClass("active");
            $(".main > .loading").fadeIn("fast");
            window.location = $($(this).find("a")[0]).attr("href");
            return false;
        });
    }

    function bindLinks() {
        $("#maincontent > .container").find("a").each(function () {
            var that = $(this);
            var onclick = that.attr("onclick");

            if (!onclick) {
                that.off("click.design.link").on("click.design.link", function () {
                    var href = that.attr("href");
                    if (href && href.indexOf("#") === -1) {
                        $(".main > .loading").fadeIn("fast");
                    }
                    return true;
                });
            }
        });
    }

    function applyResponsiveShell() {
        if ($(window).width() > 992) {
            showSide = false;
            $(".showSide").css("display", "");
            $(".main-left").css("width", "");
            $(".darkMask").stop(true, true).hide();
            $("header").css("box-shadow", "18rem 2px 4px rgb(0 0 0 / 8%)");
            $("header>.container>.brand").css("padding", "0rem");
            $(".main-right").css("overflow-y", "auto");
        } else {
            $("header").css("box-shadow", "0 2px 4px rgb(0 0 0 / 8%)");
            $("header>.container>.brand").css("padding", "0 4.5rem");
        }
    }

    function bindDrawer() {
        $(".showSide").off("click.design.drawer").on("click.design.drawer", function () {
            if (showSide) {
                $(".darkMask").stop(true, true).fadeOut("fast");
                $(".main-left").stop(true, true).animate({ width: "0" }, "fast");
                $(".main-right").css("overflow-y", "auto");
                $(".showSide").css("display", "");
                $("header").css("box-shadow", "0 2px 4px rgb(0 0 0 / 8%)");
                $("header>.container>.brand").css("padding", "0 4.5rem");
                showSide = false;
            } else {
                $(".darkMask").stop(true, true).fadeIn("fast");
                $(".main-left").stop(true, true).animate({ width: "18rem" }, "fast");
                $(".main-right").css("overflow-y", "hidden");
                $(".showSide").css("display", "none");
                $("header").css("box-shadow", "18rem 2px 4px rgb(0 0 0 / 8%)");
                $("header>.container>.brand").css("padding", "0rem");
                showSide = true;
            }
        });

        $(".darkMask").off("click.design.drawer").on("click.design.drawer", function () {
            if (!showSide)
                return;
            $(".darkMask").stop(true, true).fadeOut("fast");
            $(".main-left").stop(true, true).animate({ width: "0" }, "fast");
            $(".main-right").css("overflow-y", "auto");
            $(".showSide").css("display", "");
            $("header").css("box-shadow", "0 2px 4px rgb(0 0 0 / 8%)");
            $("header>.container>.brand").css("padding", "0 4.5rem");
            showSide = false;
        });

        $(window).off("resize.design.drawer").on("resize.design.drawer", function () {
            applyResponsiveShell();
            if (showSide) {
                $("header").css("box-shadow", "18rem 2px 4px rgb(0 0 0 / 8%)");
                $("header>.container>.brand").css("padding", "0rem");
            }
        });
    }

    function applyPageFixups() {
        $(".main-right").focus().blur();
        $("input").attr("size", "0");

        switch (mainNodeName) {
            case "node-status-system_log":
            case "node-status-kernel_log":
                $("#syslog").off("focus.design").on("focus.design", function () {
                    $("#syslog").blur();
                    $(".main-right").focus().blur();
                });
                break;
            case "node-status-firewall":
                $(".node-status-firewall > .main fieldset li > a").addClass("cbi-button cbi-button-reset a-to-btn");
                break;
            case "node-system-reboot":
                $(".node-system-reboot > .main > .main-right p > a").addClass("cbi-button cbi-input-reset a-to-btn");
                break;
        }
    }

    window.designThemeRefresh = function () {
        $(".main > .loading").fadeOut();
        refreshCurrentNode();
        bindLinks();
        applyPageFixups();
        applyResponsiveShell();
    };

    $(function () {
        bindSidebar();
        bindDrawer();
        window.designThemeRefresh();
    });
})(jQuery);
