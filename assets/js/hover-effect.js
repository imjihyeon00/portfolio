var e, t = require("three"),
    i = (e = require("gsap/TweenMax")) && "object" == typeof e && "default" in e ? e.default : e;
module.exports = function (e) {
    function n() {
        for (var e = arguments, t = 0; t < arguments.length; t++)
            if (void 0 !== e[t]) return e[t]
    }
    console.log("%c Hover effect by Robin Delaporte: https://github.com/robin-dela/hover-effect ", "color: #bada55; font-size: 0.8rem");
    var r = e.parent,
        o = e.displacementImage,
        a = e.image1,
        s = e.image2,
        l = n(e.imagesRatio, 1),
        f = n(e.intensity1, e.intensity, 1),
        d = n(e.intensity2, e.intensity, 1),
        u = n(e.angle, Math.PI / 4),
        v = n(e.angle1, u),
        m = n(e.angle2, 3 * -u),
        c = n(e.speedIn, e.speed, 1.6),
        p = n(e.speedOut, e.speed, 1.2),
        g = n(e.hover, !0),
        h = n(e.easing, Expo.easeOut),
        y = n(e.video, !1);
    if (r)
        if (a && s && o) {
            var F = new t.Scene,
                x = new t.OrthographicCamera(r.offsetWidth / -2, r.offsetWidth / 2, r.offsetHeight / 2, r.offsetHeight / -2, 1, 1e3);
            x.position.z = 1;
            var w = new t.WebGLRenderer({
                antialias: !1,
                alpha: !0
            });
            w.setPixelRatio(2), w.setClearColor(16777215, 0), w.setSize(r.offsetWidth, r.offsetHeight), r.appendChild(w.domElement);
            var L = function () {
                    w.render(F, x)
                },
                H = new t.TextureLoader;
            H.crossOrigin = "";
            var W, V, E = H.load(o, L);
            if (E.magFilter = E.minFilter = t.LinearFilter, y) {
                var P = function () {
                    requestAnimationFrame(P), w.render(F, x)
                };
                P(), (y = document.createElement("video")).autoplay = !0, y.loop = !0, y.src = a, y.load();
                var M = document.createElement("video");
                M.autoplay = !0, M.loop = !0, M.src = s, M.load();
                var U = new t.VideoTexture(y),
                    C = new t.VideoTexture(M);
                U.magFilter = C.magFilter = t.LinearFilter, U.minFilter = C.minFilter = t.LinearFilter, M.addEventListener("loadeddata", function () {
                    M.play(), (C = new t.VideoTexture(M)).magFilter = t.LinearFilter, C.minFilter = t.LinearFilter, b.uniforms.texture2.value = C
                }, !1), y.addEventListener("loadeddata", function () {
                    y.play(), (U = new t.VideoTexture(y)).magFilter = t.LinearFilter, U.minFilter = t.LinearFilter, b.uniforms.texture1.value = U
                }, !1)
            } else U = H.load(a, L), C = H.load(s, L), U.magFilter = C.magFilter = t.LinearFilter, U.minFilter = C.minFilter = t.LinearFilter;
            var R = l;
            r.offsetHeight / r.offsetWidth < R ? (W = 1, V = r.offsetHeight / r.offsetWidth / R) : (W = r.offsetWidth / r.offsetHeight * R, V = 1);
            var b = new t.ShaderMaterial({
                    uniforms: {
                        intensity1: {
                            type: "f",
                            value: f
                        },
                        intensity2: {
                            type: "f",
                            value: d
                        },
                        dispFactor: {
                            type: "f",
                            value: 0
                        },
                        angle1: {
                            type: "f",
                            value: v
                        },
                        angle2: {
                            type: "f",
                            value: m
                        },
                        texture1: {
                            type: "t",
                            value: U
                        },
                        texture2: {
                            type: "t",
                            value: C
                        },
                        disp: {
                            type: "t",
                            value: E
                        },
                        res: {
                            type: "vec4",
                            value: new t.Vector4(r.offsetWidth, r.offsetHeight, W, V)
                        },
                        dpr: {
                            type: "f",
                            value: window.devicePixelRatio
                        }
                    },
                    vertexShader: "\nvarying vec2 vUv;\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n",
                    fragmentShader: "\nvarying vec2 vUv;\n\nuniform float dispFactor;\nuniform float dpr;\nuniform sampler2D disp;\n\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform float angle1;\nuniform float angle2;\nuniform float intensity1;\nuniform float intensity2;\nuniform vec4 res;\nuniform vec2 parent;\n\nmat2 getRotM(float angle) {\n  float s = sin(angle);\n  float c = cos(angle);\n  return mat2(c, -s, s, c);\n}\n\nvoid main() {\n  vec4 disp = texture2D(disp, vUv);\n  vec2 dispVec = vec2(disp.r, disp.g);\n\n  vec2 uv = 0.5 * gl_FragCoord.xy / (res.xy) ;\n  vec2 myUV = (uv - vec2(0.5))*res.zw + vec2(0.5);\n\n\n  vec2 distortedPosition1 = myUV + getRotM(angle1) * dispVec * intensity1 * dispFactor;\n  vec2 distortedPosition2 = myUV + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);\n  vec4 _texture1 = texture2D(texture1, distortedPosition1);\n  vec4 _texture2 = texture2D(texture2, distortedPosition2);\n  gl_FragColor = mix(_texture1, _texture2, dispFactor);\n}\n",
                    transparent: !0,
                    opacity: 1
                }),
                D = new t.PlaneBufferGeometry(r.offsetWidth, r.offsetHeight, 1),
                _ = new t.Mesh(D, b);
            F.add(_), g && (r.addEventListener("mouseenter", z), r.addEventListener("touchstart", z), r.addEventListener("mouseleave", S), r.addEventListener("touchend", S)), window.addEventListener("resize", function (e) {
                r.offsetHeight / r.offsetWidth < R ? (W = 1, V = r.offsetHeight / r.offsetWidth / R) : (W = r.offsetWidth / r.offsetHeight * R, V = 1), _.material.uniforms.res.value = new t.Vector4(r.offsetWidth, r.offsetHeight, W, V), w.setSize(r.offsetWidth, r.offsetHeight), L()
            }), this.next = z, this.previous = S
        } else console.warn("One or more images are missing");
    else console.warn("Parent missing");

    function z() {
        i.to(b.uniforms.dispFactor, c, {
            value: 1,
            ease: h,
            onUpdate: L,
            onComplete: L
        })
    }

    function S() {
        i.to(b.uniforms.dispFactor, p, {
            value: 0,
            ease: h,
            onUpdate: L,
            onComplete: L
        })
    }
};
//# sourceMappingURL=hover-effect.js.map