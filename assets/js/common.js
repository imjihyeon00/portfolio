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

    //모달 창 스크립트
    const codeBtn = document.querySelectorAll(".code_btn");
    const codeViewArea = document.querySelectorAll(".codeView");
    const modal = document.querySelectorAll("#modal");
    const modalBtn = document.querySelectorAll(".view-header .dot span:nth-child(1) ");

    codeBtn.forEach((btn, idx) => {
        btn.addEventListener("click", function () {
            // console.log(modal[idx].classList.contains("hide"));
            if (modal[idx].classList.contains("hide")) {
                modal[idx].classList.remove("hide");
            }
            codeViewArea[idx].classList.add("show");
            modal[idx].classList.add("show");
        });
    });

    modalBtn.forEach((btn, idx) => {
        btn.addEventListener("click", function () {
            modal[idx].classList.remove("show");
            modal[idx].classList.add("hide");
            setTimeout(() => {
                codeViewArea[idx].classList.remove("show");
            }, 500);
        });

    })


    codeViewArea.forEach((codeView, idx) => {
        const viewBtn = codeView.querySelectorAll(".view-title ul li");
        const viewCont = codeView.querySelectorAll(".view-cont > div");

        viewBtn.forEach((btn, index) => {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                viewBtn.forEach(el => el.classList.remove("active"));
                btn.classList.add("active");

                viewCont.forEach(el => el.style.display = "none");
                viewCont[index].style.display = "block";
            });
        });
    })

    //모달창event
    // document.querySelectorAll(".code_btn").forEach((btn, idx) => {
    //     btn.addEventListener("click", e => {
    //         new Modal(btn.closest(".work_section_List"));
    //     })
    // });

};

    
// class Modal {
//     constructor(modalCont) {
//         //모달 위치
//         this.codeViewArea = modalCont.querySelector(".codeView");
//         this.modalc = modalCont.querySelector("#modal");
//         //버튼
//         // this.showBtn = modalCont.querySelector(".code_btn");
//         this.hideBtn = modalCont.querySelector(".view-header .dot span:nth-child(1)");
//         //탭메뉴
//         this.viewBtn = modalCont.querySelectorAll(".view-title ul li");
//         this.viewCont = modalCont.querySelectorAll(".view-cont > div");
//         this.init();
//     }
//     init() {
//         this.showModal();
//         this.events();
//         this.tabmenu();
//     }

//     showModal() {
//         this.modalc.classList.remove("show", "hide");
//         this.codeViewArea.classList.add("show");
//         this.modalc.classList.add("show");
//     }
//     hideModal() {

//         console.log(11);
//         // this.modalc.classList.remove("show", "hide");
//         this.modalc.classList.add("hide").sibling().remove("show", "hide");
//         // setTimeout(() => {
//         //     this.codeViewArea.classList.remove("show");
//         // }, 500);
//     }
//     tabmenu() {
//         console.log(22);
//         this.viewBtn.forEach((btn, index) => {
//             this.removeAct();
//             btn.addEventListener("click", function (e) {
//                 e.preventDefault();
//                 btn.classList.add("active");
//                 this.viewCont.style.display = "block";
//             });
//         });
//     }
//     removeAct(){
//         this.viewBtn.forEach(el => el.classList.remove("active"));
//         this.viewCont.forEach(el => el.style.display = "none");
//     }
//     events() {
//         // this.showBtn.addEventListener("click", this.showModal());
//         this.hideBtn.addEventListener("click", this.hideModal);
//     }
// }