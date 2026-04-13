/* LuCI Design Theme Compatibility Script */
(function() {
    document.addEventListener('luci-loaded', function() {
        // 自动折叠空菜单项
        document.querySelectorAll('.main-left .nav li').forEach(function(li) {
            if (li.querySelectorAll('ul li').length === 0 && !li.querySelector('a').getAttribute('href')) {
                li.style.display = 'none';
            }
        });

        // 修复移动端导航点击
        var showSide = document.querySelector('.showSide');
        var darkMask = document.querySelector('.darkMask');
        if (showSide && darkMask) {
            showSide.onclick = function() {
                document.body.classList.add('side-active');
            };
            darkMask.onclick = function() {
                document.body.classList.remove('side-active');
            };
        }
    });

    // 针对 OpenWrt 23+ 的 XHR 劫持，确保加载状态正常同步
    var oldXHR = window.XMLHttpRequest;
    function newXHR() {
        var realXHR = new oldXHR();
        realXHR.addEventListener('readystatechange', function() {
            if (realXHR.readyState === 1) {
                document.body.classList.add('loading-active');
            } else if (realXHR.readyState === 4) {
                setTimeout(function() {
                    document.body.classList.remove('loading-active');
                }, 300);
            }
        }, false);
        return realXHR;
    }
    window.XMLHttpRequest = newXHR;
})();
