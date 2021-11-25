window.onload = () => {
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


//모달 창 스크립트
const codeViewArea = document.querySelector(".codeView");
const codeBtn = document.querySelector(".code_btn");
const modal = document.querySelector("#modal");
// const modalBtn = document.querySelector("#modal button");
const modalBtn = document.querySelector(".view-header .dot span:nth-child(1) ");

codeBtn.addEventListener("click", function () {
    modal.classList.remove("show", "hide");
    codeViewArea.classList.add("show");
    modal.classList.add("show");
});

modalBtn.addEventListener("click", function () {
    modal.classList.remove("show", "hide");
    modal.classList.add("hide");
    setTimeout(()=>{
        codeViewArea.classList.remove("show");
    },500);
});

//Code tab menu
//js
const viewBtn = document.querySelectorAll(".view-title ul li");
const viewCont = document.querySelectorAll(".view-cont > div");

viewBtn.forEach((btn, index) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    viewBtn.forEach(el => el.classList.remove("active"));
    btn.classList.add("active");

    viewCont.forEach(el => el.style.display = "none");
    viewCont[index].style.display = "block";
  });
});