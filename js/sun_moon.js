function switchNightMode() {
    document
        .querySelector("body")
        .insertAdjacentHTML(
            "beforeend",
            '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"></div></div>'
        ),
        setTimeout(function () {
            document.querySelector("body").classList.contains("DarkMode") ?
                (document.querySelector("body").classList.remove("DarkMode"),
                    localStorage.setItem("isDark", "0"),
                    document
                    .getElementById("modeicon")
                    .setAttribute("xlink:href", "#icon-moon")) :
                (document.querySelector("body").classList.add("DarkMode"),
                    localStorage.setItem("isDark", "1"),
                    document
                    .getElementById("modeicon")
                    .setAttribute("xlink:href", "#icon-sun")),
                setTimeout(function () {
                    document.getElementsByClassName(
                        "Cuteen_DarkSky"
                    )[0].style.transition = "opacity 3s";
                    document.getElementsByClassName("Cuteen_DarkSky")[0].style.opacity =
                        "0";
                    setTimeout(function () {
                        document.getElementsByClassName("Cuteen_DarkSky")[0].remove();
                    }, 1e3);
                }, 2e3);
        });
    const nowMode =
        document.documentElement.getAttribute("data-theme") === "dark" ?
        "dark" :
        "light";
    if (nowMode === "light") {
        activateDarkMode();
        saveToLocal.set("theme", "dark", 2);
        GLOBAL_CONFIG.Snackbar !== undefined &&
            btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
        document.getElementById("modeicon").setAttribute("xlink:href", "#icon-sun");
    } else {
        activateLightMode();
        saveToLocal.set("theme", "light", 2);
        document.querySelector("body").classList.add("DarkMode"),
            document
            .getElementById("modeicon")
            .setAttribute("xlink:href", "#icon-moon");
    }
    // handle some cases
    typeof utterancesTheme === "function" && utterancesTheme();
    typeof FB === "object" && window.loadFBComment();
    window.DISQUS &&
        document.getElementById("disqus_thread").children.length &&
        setTimeout(() => window.disqusReset(), 200);
}
$(document).on('pjax:start', function () {
    if (window.aplayers) {
        for (let i = 0; i < window.aplayers.length; i++) {
            window.aplayers[i].destroy();
        }
        window.aplayers = [];
    }
});
//判断网址,防止访客网址不写http和https
function wangzhi(e) {
    http = e.slice(0, 4)
    https = e.slice(0, 5)
    if (http == "http" || https == "https") {
        return e
    } else if (e == "" || e == null || e == undefined) {
        return e
    } else {
        e = 'http://' + e
        return e
    }
}

//调用twikoo最新评论主函数
// function newcomment() {
//     twikoo.getRecentComments({
//         envId: 'https://wechat-delta.vercel.app/', // 环境 ID
//         pageSize: 6, // 获取多少条，默认：10，最大：100
//         includeReply: false // 是否包括最新回复，默认：false
//     }).then(function (res) {
//         console.log(res);
//         var hotComments = $("#hot-comments");
//         for (var i = 0; i < res.length; i++) {
//             if (i === 0) {
//                 console.log(res[0]);
//             }
//             var nick = res[i].nick; //访客姓名
//             var content = res[i].commentText; //评论内容
//             var newcontent = content.substring(0, 50); //字数截取后评论内容
//             var url = res[i].url; //文章链接
//             var avatar = res[i].avatar; //评论者头像
//             var link = wangzhi(res[i].link); //评论者网址
//             var updatedAt = res[i].relativeTime; //评论时间
//             var commentId = '#' + res[i].id; //评论id
//             hotComments.append('<li class="px1 pb2 flex items-center"><img style="width: 40px;height:40px" class="circle mx1 listavatar" src="' + avatar + '"><div class="w100"><div class="flex justify-between"><div class="h6 listauthor overflow-hidden" title="' + nick + '"><a  target="_blank" rel="noopener external nofollow noreferrer" href="' + link + '">' + nick + '</a></div><span class="h6 mr1 listdate wenzi hang1">' + updatedAt + '</span></div> <a href="' + url + commentId + '"><div class="h5 list-comcontent overflow-hidden">' + newcontent + '</div></a></div></li>');
//         }
//     }).catch(function (err) {
//         console.error(err);
//     });
// }

// $(function () {
//     newcomment(); //调用newcomment
// });