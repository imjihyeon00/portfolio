window.onload = ()=>{
    //운영체제 정보 알아내기
    let os = navigator.userAgent.toLowerCase();

    if (os.indexOf("windows") >= 0) {
      document.querySelector("body").classList.add("windows");
    } else if (os.indexOf("macintosh") >= 0) {
      document.querySelector("body").classList.add("mac");
    } else if (os.indexOf("iphone") >= 0) {
      document.querySelector("body").classList.add("iphone");
    } else if (os.indexOf("android") >= 0) {
      document.querySelector("body").classList.add("android");
    }
};