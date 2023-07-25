/*!
 Summer bunny 2023
 https://codepen.io/wakana-k/pen/JjeZjrq
 @wakana-k
*/
async function e() {
    function e(e) {
        let t = null;
        h.setValue(0, 0, 0);
        let o = e.attributes.position.array;
        t = new Ammo.btConvexHullShape();
        for (let e = 0, a = o.length; e < a; e += 3) {
            h.setValue(o[e], o[e + 1], o[e + 2]);
            const n = e >= a - 3;
            t.addPoint(h, n);
        }
        return t && t.setMargin(0), t;
    }
    if ("Ammo" in window == !1) return;
    let t;
    const o = await Ammo(),
        a = new o.btDefaultCollisionConfiguration(),
        n = new o.btCollisionDispatcher(a),
        r = new o.btDbvtBroadphase(),
        i = new o.btSequentialImpulseConstraintSolver(),
        s = new o.btDiscreteDynamicsWorld(n, r, i, a);
    s.setGravity(new o.btVector3(0, -50, 0));
    let l = new o.btTransform();
    const d = new o.btTransform();
    let c,
        h = new o.btVector3(0, 0, 0),
        w = new o.btQuaternion(0, 0, 0, 0),
        p = [],
        E = new WeakMap();
    const u = -7.1;
    let m = 0,
        S = null;
    return (
        setInterval(function() {
            const e = performance.now();
            if (m > 0) {
                const t = (e - m) / 1e3;
                s.stepSimulation(t, 10);
            }
            m = e;
            for (let e = 0, o = p.length; e < o; e++) {
                if (!p[e]) continue;
                let o = p[e];
                if (o.isMesh) {
                    if (!E.has(o)) continue;
                    const e = E.get(o);
                    if (
                        (e.getMotionState().getWorldTransform(d),
                            (c = d.getOrigin()).y() < u)
                    ) {
                        if (S) continue;
                        S = setTimeout(function() {
                            clearTimeout(S), (S = null);
                            let a = THREE.MathUtils.randFloat(t.x - 0.5, t.x + 0.5),
                                n = t.y,
                                r = THREE.MathUtils.randFloat(t.z - 0.5, t.z + 0.5);
                            h.setValue(a, n, r),
                                d.setIdentity(),
                                d.setOrigin(h),
                                e.setWorldTransform(d),
                                h.setValue(0, 0, 0),
                                e.setLinearVelocity(h),
                                e.setAngularVelocity(h),
                                e.clearForces(),
                                w.setValue(0, 0, 0, 0),
                                o.position.set(a, n, r);
                        }, THREE.MathUtils.randInt(3e3, 7800));
                    } else(w = d.getRotation()), o.position.set(c.x(), c.y(), c.z());
                    o.quaternion.set(w.x(), w.y(), w.z(), w.w());
                }
            }
        }, 1e3 / 60), {
            addMesh: function(t, a = 0, n = null) {
                let r;
                if (!(r = e(n || t.geometry))) return !1;
                !(function(e, t, a) {
                    (c = e.position),
                    (w = e.quaternion),
                    l.setIdentity(),
                        h.setValue(c.x, c.y, c.z),
                        l.setOrigin(h),
                        l.setRotation(new o.btQuaternion(w.x, w.y, w.z, w.w));
                    const n = e.scale;
                    h.setValue(n.x, n.y, n.z), a.setLocalScaling(h), h.setValue(0, 0, 0);
                    const r = new o.btDefaultMotionState(l),
                        i = h;
                    t > 0 && a.calculateLocalInertia(t, i);
                    const d = new o.btRigidBodyConstructionInfo(t, r, a, i),
                        u = new o.btRigidBody(d);
                    u.setFriction(0.03),
                        u.setRestitution(0.5),
                        u.setDamping(0, 0),
                        s.addRigidBody(u),
                        t > 0 && (p.push(e), E.set(e, u));
                })(t, a, r);
            },
            init: function(
                e = {
                    x: 0,
                    y: 1,
                    z: 0
                }
            ) {
                t = e;
            }
        }
    );
}

import * as THREE from "three";

import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import { OrbitControls as t } from "three/addons/controls/OrbitControls.js";

!(function() {
    "use strict";

    function o() {
        (n.aspect = window.innerWidth / window.innerHeight),
        n.updateProjectionMatrix(),
            i.setSize(window.innerWidth, window.innerHeight);
    }

    function a() {
        requestAnimationFrame(a),
            s.update(),
            (function() {
                (T > m || T < S) && (f *= -1);
                E.rotation.set(0, 0, (T += f)), i.render(r, n);
            })();
    }
    let n,
        r,
        i,
        s,
        l,
        d,
        c,
        h,
        w = [];
    const p = 70;
    let E,
        u = {
            x: -32,
            y: 33,
            z: 3
        };
    const m = -Math.PI / 1.75,
        S = -Math.PI / 1.15;
    let f = 0.05,
        T = m;
    const R = window.innerWidth < window.innerHeight;
    !(async function() {
        (l = await e()).init(u),
            ((r = new THREE.Scene()).background = new THREE.Color("black")),
            (i = new THREE.WebGLRenderer({
                antialias: !0,
                canvas: canvas
            })).setPixelRatio(window.devicePixelRatio),
            i.setSize(window.innerWidth, window.innerHeight),
            (i.useLegacyLights = !1),
            (i.shadowMap.enabled = !0),
            (n = new THREE.PerspectiveCamera(
                40,
                window.innerWidth / window.innerHeight,
                0.1,
                5e3
            )),
            R ? n.position.set(0, 40, 140) : n.position.set(0, 32, 120),
            n.lookAt(0, 0, 0);
        const m = new THREE.AmbientLight(16777215, 1.3);
        r.add(m);
        const S = new THREE.DirectionalLight(16777215, 1.2);
        (S.castShadow = !0),
        S.position.set(0, 30, 30),
            (S.shadow.camera.right = 50),
            (S.shadow.camera.left = -50),
            (S.shadow.camera.top = -50),
            (S.shadow.camera.bottom = 50),
            (S.shadow.mapSize.width = 512),
            (S.shadow.mapSize.height = 512),
            r.add(S);
        let f = new THREE.Mesh(
            new THREE.SphereGeometry(500, 4, 4),
            new THREE.MeshBasicMaterial({
                color: "lightcyan",
                side: THREE.BackSide
            })
        );
        r.add(f),
            (c = new THREE.MeshLambertMaterial({})),
            (h = new THREE.MeshPhongMaterial({
                specular: "#4d4d4d",
                shininess: 70,
                side: THREE.DoubleSide
            })),
            (w = []),
            (d = new THREE.SphereGeometry(15, 11, 5, 0, 6.3, 1.865, 3.14)).rotateX(
                Math.PI
            ),
            d.rotateZ(Math.PI / 10),
            d.translate(2, 28.5, 0),
            d.computeVertexNormals(),
            (d = BufferGeometryUtils.mergeVertices(d));
        let T = c.clone();
        T.color.set("limegreen"), (T.side = THREE.DoubleSide);
        const C = new THREE.Mesh(d, T);
        (d = new THREE.SphereGeometry(3.5, 10, 10)).scale(0.9, 1, 0.9),
            d.translate(4, 28, 0),
            w.push(d),
            (d = d.clone()).translate(-3, 2.5, 3),
            w.push(d),
            (d = BufferGeometryUtils.mergeGeometries(w)),
            (c = c.clone()).color.set("yellow");
        const g = new THREE.Mesh(d, c);
        (g.castShadow = !0),
        C.add(g),
            (d = new THREE.SphereGeometry(3.5, 10, 10)).scale(0.8, 1, 0.8);
        const H = new THREE.Mesh(d, c);
        H.position.set(u.x, u.y, u.z),
            (H.castShadow = !0),
            r.add(H),
            l.addMesh(H, 10),
            (d = new THREE.CylinderGeometry(1.3, 3, 43, 8)).translate(0, 13, 0),
            d.translate(-30, 1.5, 0),
            (c = c.clone()).color.set("peru");
        const y = new THREE.Mesh(d, c);
        (y.castShadow = !0),
        r.add(y),
            l.addMesh(y, 0),
            C.position.set(-30, 1.5, 0),
            (C.name = "tree"),
            (C.castShadow = !0),
            r.add(C),
            (d = new THREE.SphereGeometry(6, 12, 10));
        let M = h.clone();
        M.color.set("white"),
            (M.map = (function() {
                let e = document.createElement("canvas");
                (e.width = 300), (e.height = 300);
                let t = e.getContext("2d");
                var o = t.createLinearGradient(0, 0, e.width, 0);
                o.addColorStop(0, "white"),
                    o.addColorStop(0.5, "white"),
                    o.addColorStop(0.5, "orange"),
                    o.addColorStop(1, "orange"),
                    (t.fillStyle = o),
                    t.fillRect(0, 0, e.width, e.height);
                let a = new THREE.CanvasTexture(e);
                return (
                    (a.wrapS = a.wrapT = THREE.RepeatWrapping), a.repeat.set(3, 1), a
                );
            })());
        const b = new THREE.Mesh(d, M);
        b.position.set(23, 4, 15),
            (b.name = "beachball"),
            (b.castShadow = !0),
            r.add(b),
            (w = []),
            (d = new THREE.CapsuleGeometry(5, 7, 4, 10)).translate(0, 0, 0),
            w.push(d),
            (d = new THREE.CapsuleGeometry(1.5, 8, 4, 10)).rotateZ(Math.PI / 3.5),
            d.translate(6.5, 2, 0),
            w.push(d),
            (d = new THREE.CapsuleGeometry(1.8, 5, 4, 10)).translate(2, -10, 0),
            w.push(d),
            (d = new THREE.CapsuleGeometry(1.8, 5, 4, 10)).translate(-2, -10, 0),
            w.push(d),
            (d = new THREE.SphereGeometry(5, 10, 10)).translate(0, 12, 0),
            w.push(d),
            (d = new THREE.CapsuleGeometry(1.5, 5, 4, 8)).translate(2, 18, 0),
            w.push(d),
            (d = new THREE.CapsuleGeometry(1.5, 5, 4, 8)).translate(-2, 18, 0),
            w.push(d),
            (d = BufferGeometryUtils.mergeGeometries(w)),
            (c = c.clone()).color.set("bisque");
        const v = new THREE.Mesh(d, c);
        (d = new THREE.SphereGeometry(1.5, 5, 5)).translate(0, -3, -5),
            (c = c.clone()).color.set("white");
        const G = new THREE.Mesh(d, c);
        (G.castShadow = !0),
        v.add(G),
            (d = new THREE.CylinderGeometry(0, 45, 1, 30)).translate(0, -14, 0),
            d.translate(0, 13, 0),
            (c = c.clone()).color.set("lightcyan");
        const x = new THREE.Mesh(d, c);
        (x.receiveShadow = !0),
        r.add(x),
            l.addMesh(v, 0, x.geometry),
            (d = new THREE.SphereGeometry(0.7, 10, 10)).translate(1.8, 13, 4),
            (c = c.clone()).color.set("black");
        const P = new THREE.Mesh(d, c);
        v.add(P), (d = d.clone()).translate(-3.6, 0, 0);
        const z = new THREE.Mesh(d, c);
        v.add(z);
        const I = new THREE.Shape();
        I.moveTo(25, 25),
            I.bezierCurveTo(25, 25, 20, 0, 0, 0),
            I.bezierCurveTo(-30, 0, -30, 35, -30, 35),
            I.bezierCurveTo(-30, 55, -10, 77, 25, 95),
            I.bezierCurveTo(60, 77, 80, 55, 80, 35),
            I.bezierCurveTo(80, 35, 80, 0, 50, 0),
            I.bezierCurveTo(35, 0, 25, 25, 25, 25),
            (d = new THREE.ExtrudeGeometry(I, {
                depth: 1,
                bevelEnabled: !0,
                bevelSegments: 5,
                steps: 1,
                bevelSize: 10,
                bevelThickness: 10
            })),
            (c = c.clone()).color.set("red");
        const V = new THREE.Mesh(d, c);
        V.scale.set(0.03, 0.03, 0.03),
            V.position.set(0.7, 3.5, 5),
            V.rotateZ(Math.PI),
            v.add(V),
            (d = new THREE.TorusGeometry(7.5, 2.5, 12, 15)).rotateX(Math.PI / 2),
            d.rotateZ(Math.PI / 8);
        let L = h.clone();
        L.color.set("white"),
            (L.map = (function() {
                let e = document.createElement("canvas");
                (e.width = 300), (e.height = 300);
                let t = e.getContext("2d");
                var o = t.createLinearGradient(0, 0, 0, e.height);
                o.addColorStop(0, "deeppink"),
                    o.addColorStop(0.5, "deeppink"),
                    o.addColorStop(0.5, "springgreen"),
                    o.addColorStop(1, "springgreen"),
                    (t.fillStyle = o),
                    t.fillRect(0, 0, e.width, e.height);
                let a = new THREE.CanvasTexture(e);
                return (
                    (a.wrapS = a.wrapT = THREE.RepeatWrapping), a.repeat.set(1, 1), a
                );
            })());
        const D = new THREE.Mesh(d, L);
        D.position.set(0, -4, 0),
            (D.castShadow = !0),
            v.add(D),
            (d = new THREE.CapsuleGeometry(1.5, 8, 4, 10)).translate(0, -4, 0),
            (d.verticesNeedUpdate = !0),
            (c = c.clone()).color.set("bisque"),
            (E = new THREE.Mesh(d, c)).position.set(-4.5, 5, 0),
            E.rotation.set(0, 0, -Math.PI / 1.2),
            (E.castShadow = !0),
            v.add(E),
            v.position.set(0, 13, 0),
            (v.name = "bunny"),
            (v.castShadow = !0),
            r.add(v),
            (w = []),
            (d = new THREE.SphereGeometry(
                1.8,
                6,
                8,
                0,
                2 * Math.PI,
                0,
                (Math.PI / 2) * 0.65
            )).translate(0, 0, 0),
            d.computeVertexNormals(),
            (d = BufferGeometryUtils.mergeVertices(d)),
            w.push(d);
        let B = h.clone();
        B.color.set("white"),
            (B.map = (function() {
                let e = document.createElement("canvas");
                (e.width = 300), (e.height = 300);
                let t = e.getContext("2d");
                var o = t.createLinearGradient(0, 0, e.width, 0);
                o.addColorStop(0, "white"),
                    o.addColorStop(0.5, "white"),
                    o.addColorStop(0.5, "blue"),
                    o.addColorStop(1, "blue"),
                    (t.fillStyle = o),
                    t.fillRect(0, 0, e.width, e.height);
                let a = new THREE.CanvasTexture(e);
                return (
                    (a.wrapS = a.wrapT = THREE.RepeatWrapping), a.repeat.set(3, 1), a
                );
            })()),
            (B.side = THREE.DoubleSide);
        const W = new THREE.Mesh(d, B);
        (d = new THREE.CylinderGeometry(0.04, 0.04, 3.5, 6)), w.push(d);
        let k = h.clone();
        k.color.set("lightgray");
        const U = new THREE.Mesh(d, k);
        (U.castShadow = !0),
        W.add(U),
            W.position.set(18, 20, -10),
            W.rotation.set(0, 0, -Math.PI / 18),
            W.scale.set(17, 17, 17),
            (W.name = "umbrella"),
            (W.castShadow = !0),
            r.add(W),
            (d = new THREE.CircleGeometry(100, 50)).rotateX(-Math.PI / 2),
            (c = h.clone()).color.set("aqua");
        const A = new THREE.Mesh(d, c);
        A.position.set(0, -2, 0),
            (A.name = "floor"),
            (A.receiveShadow = !0),
            r.add(A),
            (d = new THREE.TorusGeometry(70, 10, 15, 20, Math.PI)),
            (c = new THREE.MeshBasicMaterial({
                map: (function() {
                    let e = document.createElement("canvas");
                    (e.width = 300), (e.height = 300);
                    let t = e.getContext("2d");
                    var o = t.createLinearGradient(0, e.height, 0, 0);
                    return (
                        o.addColorStop(0, "#ff3333"),
                        o.addColorStop(0.17, "#ff3333"),
                        o.addColorStop(0.17, "orange"),
                        o.addColorStop(0.23, "orange"),
                        o.addColorStop(0.23, "yellow"),
                        o.addColorStop(0.27, "yellow"),
                        o.addColorStop(0.27, "#33ff33"),
                        o.addColorStop(0.31, "#33ff33"),
                        o.addColorStop(0.31, "#3399ff"),
                        o.addColorStop(0.35, "#3399ff"),
                        o.addColorStop(0.35, "#3333ff"),
                        o.addColorStop(0.4, "#3333ff"),
                        o.addColorStop(0.4, "violet"),
                        o.addColorStop(0.5, "violet"),
                        o.addColorStop(0.5, "violet"),
                        o.addColorStop(0.6, "violet"),
                        o.addColorStop(0.6, "#3333ff"),
                        o.addColorStop(0.63, "#3333ff"),
                        o.addColorStop(0.63, "#3399ff"),
                        o.addColorStop(0.66, "#3399ff"),
                        o.addColorStop(0.66, "#33ff33"),
                        o.addColorStop(0.7, "#33ff33"),
                        o.addColorStop(0.7, "yellow"),
                        o.addColorStop(0.76, "yellow"),
                        o.addColorStop(0.76, "orange"),
                        o.addColorStop(0.82, "orange"),
                        o.addColorStop(0.82, "#ff3333"),
                        o.addColorStop(1, "#ff3333"),
                        (t.fillStyle = o),
                        t.fillRect(0, 0, e.width, e.height),
                        new THREE.CanvasTexture(e)
                    );
                })(),
                alphaMap: (function() {
                    let e = document.createElement("canvas");
                    (e.width = 300), (e.height = 300);
                    let t = e.getContext("2d");
                    var o = t.createLinearGradient(0, 0, e.width, 0);
                    return (
                        o.addColorStop(0, "black"),
                        o.addColorStop(0.33, "white"),
                        o.addColorStop(0.5, "white"),
                        o.addColorStop(0.66, "white"),
                        o.addColorStop(1, "black"),
                        (t.fillStyle = o),
                        t.fillRect(0, 0, e.width, e.height),
                        new THREE.CanvasTexture(e)
                    );
                })(),
                transparent: !0,
                opacity: 0.6
            }));
        let q = new THREE.Mesh(d, c);
        q.position.set(0, 0, -80),
            r.add(q),
            ((s = new t(n, i.domElement)).autoRotate = !0),
            (s.autoRotateSpeed = 1),
            (s.enableDamping = !0),
            (s.enablePan = !1),
            (s.minDistance = 20),
            (s.maxDistance = 200),
            (s.minPolarAngle = 0),
            (s.maxPolarAngle = Math.PI / 2),
            s.target.set(0, p / 4, 0),
            s.update(),
            a(),
            window.addEventListener("resize", o);
    })();
})();

export { e as AmmoPhysics };


Resources