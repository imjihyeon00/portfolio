// ## Instancing
// const supahscroll = new SupahScroll({
//   el: 'main', // your element or classname or ID
//   speed: 0.1 // lower is slower, this value could go from 0.01 to 1
// })

// ## Methods
// - .update() // update and resize
// - .pause() // pause, every scroll is stopped
// - .play() // play, back to normality after pause
// - .scrollTo(y) // go to your offsetY smoothly
// - .staticScrollTo(y) // go to your offsetY without animation
// - .destroy() // kaput, au revoir, kthxbye

/*------------------------------
SupahScroll
------------------------------*/
class SupahScroll {
    constructor(options) {
        this.opt = options || {};
        this.el = this.opt.el ? this.opt.el : '.supah-scroll';
        this.speed = this.opt.speed ? this.opt.speed : 0.1;
        this.init();
    }
    init() {
        this.scrollX = 0;
        this.supahScroll = document.getElementById(this.el);
        this.supahScroll.classList.add('supah-scroll');
        this.sc = document.querySelector("#scriptP");
        this.work = document.querySelectorAll(".work_section_List");
        this.events();
        this.update();
        this.animate();
    }
    update() {
        if (this.supahScroll === null) return;
        document.body.style.height = `${this.supahScroll.getBoundingClientRect().width}px`;
        // document.body.style.height = `${document.querySelector(".horizen").getBoundingClientRect().width}px`;
    }
    pause() {
        document.body.style.overflow = 'hidden';
        cancelAnimationFrame(this.raf);
    }
    play() {
        document.body.style.overflow = 'inherit';
        this.raf = requestAnimationFrame(this.animate.bind(this));
    }
    destroy() {
        this.supahScroll.classList.remove('supah-scroll'
        );
        this.supahScroll.style.transform = 'none';
        document.body.style.overflow = 'inherit';
        window.removeEventListener('resize', this.update);
        cancelAnimationFrame(this.raf);
        delete this.supahScroll;
    }
    animate() {
        this.scrollX += (window.scrollY - this.scrollX) * this.speed;
        this.supahScroll.style.transform = `translate3d(${-this.scrollX}px,0,0)`;
        this.work.forEach((wk)=>{
            if(scrollX >= this.sc.getBoundingClientRect().left){
                wk.querySelector(" h3 > span").style.transform = `translateX(${-(this.scrollX - (wk.offsetLeft + this.sc.offsetLeft *0.8)) * 0.05}px)`;
            } else {
                wk.querySelector(" h3 > span").style.transform = `translateX(${-(this.scrollX - (wk.offsetLeft * 1.1)) * 0.07}px)`;
            }
        })
        this.raf = requestAnimationFrame(this.animate.bind(this));
    }
    scrollTo(x) {
        window.scrollTo(x, 0);
    }
    staticScrollTo(x) {
        cancelAnimationFrame(this.raf);
        this.scrollX = x;
        window.scrollTo(x, 0);
        this.supahScroll.style.transform = `translate3d(${-x}px,0,0)`;
        this.play();
    }
    events() {
        window.addEventListener('load', this.update.bind(this));
        window.addEventListener('resize', this.update.bind(this));
    }
}
/*------------------------------
Initialize
------------------------------*/
const supahscroll = new SupahScroll({
    el: 'horizon',
    speed: 0.05
});