( (e, t) => {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).zip = {})
}
)(this, (function(e) {
    "use strict";
    const {Array: t, Object: n, String: r, Number: s, BigInt: i, Math: a, Date: o, Map: c, Set: l, Response: u, URL: f, Error: d, Uint8Array: w, Uint16Array: p, Uint32Array: h, DataView: g, Blob: m, Promise: y, TextEncoder: b, TextDecoder: S, document: k, crypto: z, btoa: v, TransformStream: x, ReadableStream: A, WritableStream: C, CompressionStream: _, DecompressionStream: D, navigator: W, Worker: R} = "undefined" != typeof globalThis ? globalThis : this || self;
    var F = void 0 !== k ? k.currentScript : null;
    const E = 4294967295
      , T = 65535
      , L = 67324752
      , U = 134695760
      , I = U
      , N = 33639248
      , q = 101010256
      , O = 101075792
      , P = 117853008
      , H = 22
      , M = 21589
      , B = 2048
      , V = "/"
      , Z = new o(2107,11,31)
      , K = new o(1980,0,1)
      , G = void 0
      , X = "undefined"
      , Y = "function";
    class j {
        constructor(e) {
            return class extends x {
                constructor(t, n) {
                    const r = new e(n);
                    super({
                        transform(e, t) {
                            t.enqueue(r.append(e))
                        },
                        flush(e) {
                            const t = r.flush();
                            t && e.enqueue(t)
                        }
                    })
                }
            }
        }
    }
    let J = 2;
    try {
        typeof W != X && W.hardwareConcurrency && (J = W.hardwareConcurrency)
    } catch (e) {}
    const Q = {
        chunkSize: 524288,
        maxWorkers: J,
        terminateWorkerTimeout: 5e3,
        useWebWorkers: !0,
        useCompressionStream: !0,
        workerScripts: G,
        CompressionStreamNative: typeof _ != X && _,
        DecompressionStreamNative: typeof D != X && D
    }
      , $ = n.assign({}, Q);
    function ee() {
        return $
    }
    function te(e) {
        return a.max(e.chunkSize, 64)
    }
    function ne(e) {
        const {baseURL: n, chunkSize: r, maxWorkers: s, terminateWorkerTimeout: i, useCompressionStream: a, useWebWorkers: o, Deflate: c, Inflate: l, CompressionStream: u, DecompressionStream: f, workerScripts: w} = e;
        if (re("baseURL", n),
        re("chunkSize", r),
        re("maxWorkers", s),
        re("terminateWorkerTimeout", i),
        re("useCompressionStream", a),
        re("useWebWorkers", o),
        c && ($.CompressionStream = new j(c)),
        l && ($.DecompressionStream = new j(l)),
        re("CompressionStream", u),
        re("DecompressionStream", f),
        w !== G) {
            const {deflate: e, inflate: n} = w;
            if ((e || n) && ($.workerScripts || ($.workerScripts = {})),
            e) {
                if (!t.isArray(e))
                    throw new d("workerScripts.deflate must be an array");
                $.workerScripts.deflate = e
            }
            if (n) {
                if (!t.isArray(n))
                    throw new d("workerScripts.inflate must be an array");
                $.workerScripts.inflate = n
            }
        }
    }
    function re(e, t) {
        t !== G && ($[e] = t)
    }
    function se(e, t, r) {
        return class {
            constructor(s) {
                const i = this;
                var a, o;
                a = s,
                o = "level",
                (typeof n.hasOwn === Y ? n.hasOwn(a, o) : a.hasOwnProperty(o)) && s.level === G && delete s.level,
                i.codec = new e(n.assign({}, t, s)),
                r(i.codec, (e => {
                    if (i.pendingData) {
                        const t = i.pendingData;
                        i.pendingData = new w(t.length + e.length);
                        const {pendingData: n} = i;
                        n.set(t, 0),
                        n.set(e, t.length)
                    } else
                        i.pendingData = new w(e)
                }
                ))
            }
            append(e) {
                return this.codec.push(e),
                s(this)
            }
            flush() {
                return this.codec.push(new w, !0),
                s(this)
            }
        }
        ;
        function s(e) {
            if (e.pendingData) {
                const t = e.pendingData;
                return e.pendingData = null,
                t
            }
            return new w
        }
    }
    const ie = [];
    for (let e = 0; 256 > e; e++) {
        let t = e;
        for (let e = 0; 8 > e; e++)
            1 & t ? t = t >>> 1 ^ 3988292384 : t >>>= 1;
        ie[e] = t
    }
    class ae {
        constructor(e) {
            this.crc = e || -1
        }
        append(e) {
            let t = 0 | this.crc;
            for (let n = 0, r = 0 | e.length; r > n; n++)
                t = t >>> 8 ^ ie[255 & (t ^ e[n])];
            this.crc = t
        }
        get() {
            return ~this.crc
        }
    }
    class oe extends x {
        constructor() {
            let e;
            const t = new ae;
            super({
                transform(e, n) {
                    t.append(e),
                    n.enqueue(e)
                },
                flush() {
                    const n = new w(4);
                    new g(n.buffer).setUint32(0, t.get()),
                    e.value = n
                }
            }),
            e = this
        }
    }
    function ce(e) {
        if (typeof b == X) {
            const t = new w((e = unescape(encodeURIComponent(e))).length);
            for (let n = 0; n < t.length; n++)
                t[n] = e.charCodeAt(n);
            return t
        }
        return (new b).encode(e)
    }
    const le = {
        concat(e, t) {
            if (0 === e.length || 0 === t.length)
                return e.concat(t);
            const n = e[e.length - 1]
              , r = le.getPartial(n);
            return 32 === r ? e.concat(t) : le._shiftRight(t, r, 0 | n, e.slice(0, e.length - 1))
        },
        bitLength(e) {
            const t = e.length;
            if (0 === t)
                return 0;
            const n = e[t - 1];
            return 32 * (t - 1) + le.getPartial(n)
        },
        clamp(e, t) {
            if (32 * e.length < t)
                return e;
            const n = (e = e.slice(0, a.ceil(t / 32))).length;
            return t &= 31,
            n > 0 && t && (e[n - 1] = le.partial(t, e[n - 1] & 2147483648 >> t - 1, 1)),
            e
        },
        partial: (e, t, n) => 32 === e ? t : (n ? 0 | t : t << 32 - e) + 1099511627776 * e,
        getPartial: e => a.round(e / 1099511627776) || 32,
        _shiftRight(e, t, n, r) {
            for (void 0 === r && (r = []); t >= 32; t -= 32)
                r.push(n),
                n = 0;
            if (0 === t)
                return r.concat(e);
            for (let s = 0; s < e.length; s++)
                r.push(n | e[s] >>> t),
                n = e[s] << 32 - t;
            const s = e.length ? e[e.length - 1] : 0
              , i = le.getPartial(s);
            return r.push(le.partial(t + i & 31, t + i > 32 ? n : r.pop(), 1)),
            r
        }
    }
      , ue = {
        bytes: {
            fromBits(e) {
                const t = le.bitLength(e) / 8
                  , n = new w(t);
                let r;
                for (let s = 0; t > s; s++)
                    3 & s || (r = e[s / 4]),
                    n[s] = r >>> 24,
                    r <<= 8;
                return n
            },
            toBits(e) {
                const t = [];
                let n, r = 0;
                for (n = 0; n < e.length; n++)
                    r = r << 8 | e[n],
                    3 & ~n || (t.push(r),
                    r = 0);
                return 3 & n && t.push(le.partial(8 * (3 & n), r)),
                t
            }
        }
    }
      , fe = class {
        constructor(e) {
            const t = this;
            t.blockSize = 512,
            t._init = [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
            t._key = [1518500249, 1859775393, 2400959708, 3395469782],
            e ? (t._h = e._h.slice(0),
            t._buffer = e._buffer.slice(0),
            t._length = e._length) : t.reset()
        }
        reset() {
            const e = this;
            return e._h = e._init.slice(0),
            e._buffer = [],
            e._length = 0,
            e
        }
        update(e) {
            const t = this;
            "string" == typeof e && (e = ue.utf8String.toBits(e));
            const n = t._buffer = le.concat(t._buffer, e)
              , r = t._length
              , s = t._length = r + le.bitLength(e);
            if (s > 9007199254740991)
                throw new d("Cannot hash more than 2^53 - 1 bits");
            const i = new h(n);
            let a = 0;
            for (let e = t.blockSize + r - (t.blockSize + r & t.blockSize - 1); s >= e; e += t.blockSize)
                t._block(i.subarray(16 * a, 16 * (a + 1))),
                a += 1;
            return n.splice(0, 16 * a),
            t
        }
        finalize() {
            const e = this;
            let t = e._buffer;
            const n = e._h;
            t = le.concat(t, [le.partial(1, 1)]);
            for (let e = t.length + 2; 15 & e; e++)
                t.push(0);
            for (t.push(a.floor(e._length / 4294967296)),
            t.push(0 | e._length); t.length; )
                e._block(t.splice(0, 16));
            return e.reset(),
            n
        }
        _f(e, t, n, r) {
            return e > 19 ? e > 39 ? e > 59 ? e > 79 ? void 0 : t ^ n ^ r : t & n | t & r | n & r : t ^ n ^ r : t & n | ~t & r
        }
        _S(e, t) {
            return t << e | t >>> 32 - e
        }
        _block(e) {
            const n = this
              , r = n._h
              , s = t(80);
            for (let t = 0; 16 > t; t++)
                s[t] = e[t];
            let i = r[0]
              , o = r[1]
              , c = r[2]
              , l = r[3]
              , u = r[4];
            for (let e = 0; 79 >= e; e++) {
                16 > e || (s[e] = n._S(1, s[e - 3] ^ s[e - 8] ^ s[e - 14] ^ s[e - 16]));
                const t = n._S(5, i) + n._f(e, o, c, l) + u + s[e] + n._key[a.floor(e / 20)] | 0;
                u = l,
                l = c,
                c = n._S(30, o),
                o = i,
                i = t
            }
            r[0] = r[0] + i | 0,
            r[1] = r[1] + o | 0,
            r[2] = r[2] + c | 0,
            r[3] = r[3] + l | 0,
            r[4] = r[4] + u | 0
        }
    }
      , de = {
        getRandomValues(e) {
            const t = new h(e.buffer)
              , n = e => {
                let t = 987654321;
                const n = 4294967295;
                return () => (t = 36969 * (65535 & t) + (t >> 16) & n,
                (((t << 16) + (e = 18e3 * (65535 & e) + (e >> 16) & n) & n) / 4294967296 + .5) * (a.random() > .5 ? 1 : -1))
            }
            ;
            for (let r, s = 0; s < e.length; s += 4) {
                const e = n(4294967296 * (r || a.random()));
                r = 987654071 * e(),
                t[s / 4] = 4294967296 * e() | 0
            }
            return e
        }
    }
      , we = {
        importKey: e => new we.hmacSha1(ue.bytes.toBits(e)),
        pbkdf2(e, t, n, r) {
            if (n = n || 1e4,
            0 > r || 0 > n)
                throw new d("invalid params to pbkdf2");
            const s = 1 + (r >> 5) << 2;
            let i, a, o, c, l;
            const u = new ArrayBuffer(s)
              , f = new g(u);
            let w = 0;
            const p = le;
            for (t = ue.bytes.toBits(t),
            l = 1; (s || 1) > w; l++) {
                for (i = a = e.encrypt(p.concat(t, [l])),
                o = 1; n > o; o++)
                    for (a = e.encrypt(a),
                    c = 0; c < a.length; c++)
                        i[c] ^= a[c];
                for (o = 0; (s || 1) > w && o < i.length; o++)
                    f.setInt32(w, i[o]),
                    w += 4
            }
            return u.slice(0, r / 8)
        },
        hmacSha1: class {
            constructor(e) {
                const t = this
                  , n = t._hash = fe
                  , r = [[], []];
                t._baseHash = [new n, new n];
                const s = t._baseHash[0].blockSize / 32;
                e.length > s && (e = (new n).update(e).finalize());
                for (let t = 0; s > t; t++)
                    r[0][t] = 909522486 ^ e[t],
                    r[1][t] = 1549556828 ^ e[t];
                t._baseHash[0].update(r[0]),
                t._baseHash[1].update(r[1]),
                t._resultHash = new n(t._baseHash[0])
            }
            reset() {
                const e = this;
                e._resultHash = new e._hash(e._baseHash[0]),
                e._updated = !1
            }
            update(e) {
                this._updated = !0,
                this._resultHash.update(e)
            }
            digest() {
                const e = this
                  , t = e._resultHash.finalize()
                  , n = new e._hash(e._baseHash[1]).update(t).finalize();
                return e.reset(),
                n
            }
            encrypt(e) {
                if (this._updated)
                    throw new d("encrypt on already updated hmac called!");
                return this.update(e),
                this.digest(e)
            }
        }
    }
      , pe = typeof z != X && typeof z.getRandomValues == Y
      , he = "Invalid password"
      , ge = "Invalid signature"
      , me = "zipjs-abort-check-password";
    function ye(e) {
        return pe ? z.getRandomValues(e) : de.getRandomValues(e)
    }
    const be = 16
      , Se = {
        name: "PBKDF2"
    }
      , ke = n.assign({
        hash: {
            name: "HMAC"
        }
    }, Se)
      , ze = n.assign({
        iterations: 1e3,
        hash: {
            name: "SHA-1"
        }
    }, Se)
      , ve = ["deriveBits"]
      , xe = [8, 12, 16]
      , Ae = [16, 24, 32]
      , Ce = 10
      , _e = [0, 0, 0, 0]
      , De = typeof z != X
      , We = De && z.subtle
      , Re = De && typeof We != X
      , Fe = ue.bytes
      , Ee = class {
        constructor(e) {
            const t = this;
            t._tables = [[[], [], [], [], []], [[], [], [], [], []]],
            t._tables[0][0][0] || t._precompute();
            const n = t._tables[0][4]
              , r = t._tables[1]
              , s = e.length;
            let i, a, o, c = 1;
            if (4 !== s && 6 !== s && 8 !== s)
                throw new d("invalid aes key size");
            for (t._key = [a = e.slice(0), o = []],
            i = s; 4 * s + 28 > i; i++) {
                let e = a[i - 1];
                (i % s == 0 || 8 === s && i % s == 4) && (e = n[e >>> 24] << 24 ^ n[e >> 16 & 255] << 16 ^ n[e >> 8 & 255] << 8 ^ n[255 & e],
                i % s == 0 && (e = e << 8 ^ e >>> 24 ^ c << 24,
                c = c << 1 ^ 283 * (c >> 7))),
                a[i] = a[i - s] ^ e
            }
            for (let e = 0; i; e++,
            i--) {
                const t = a[3 & e ? i : i - 4];
                o[e] = 4 >= i || 4 > e ? t : r[0][n[t >>> 24]] ^ r[1][n[t >> 16 & 255]] ^ r[2][n[t >> 8 & 255]] ^ r[3][n[255 & t]]
            }
        }
        encrypt(e) {
            return this._crypt(e, 0)
        }
        decrypt(e) {
            return this._crypt(e, 1)
        }
        _precompute() {
            const e = this._tables[0]
              , t = this._tables[1]
              , n = e[4]
              , r = t[4]
              , s = []
              , i = [];
            let a, o, c, l;
            for (let e = 0; 256 > e; e++)
                i[(s[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
            for (let u = a = 0; !n[u]; u ^= o || 1,
            a = i[a] || 1) {
                let i = a ^ a << 1 ^ a << 2 ^ a << 3 ^ a << 4;
                i = i >> 8 ^ 255 & i ^ 99,
                n[u] = i,
                r[i] = u,
                l = s[c = s[o = s[u]]];
                let f = 16843009 * l ^ 65537 * c ^ 257 * o ^ 16843008 * u
                  , d = 257 * s[i] ^ 16843008 * i;
                for (let n = 0; 4 > n; n++)
                    e[n][u] = d = d << 24 ^ d >>> 8,
                    t[n][i] = f = f << 24 ^ f >>> 8
            }
            for (let n = 0; 5 > n; n++)
                e[n] = e[n].slice(0),
                t[n] = t[n].slice(0)
        }
        _crypt(e, t) {
            if (4 !== e.length)
                throw new d("invalid aes block size");
            const n = this._key[t]
              , r = n.length / 4 - 2
              , s = [0, 0, 0, 0]
              , i = this._tables[t]
              , a = i[0]
              , o = i[1]
              , c = i[2]
              , l = i[3]
              , u = i[4];
            let f, w, p, h = e[0] ^ n[0], g = e[t ? 3 : 1] ^ n[1], m = e[2] ^ n[2], y = e[t ? 1 : 3] ^ n[3], b = 4;
            for (let e = 0; r > e; e++)
                f = a[h >>> 24] ^ o[g >> 16 & 255] ^ c[m >> 8 & 255] ^ l[255 & y] ^ n[b],
                w = a[g >>> 24] ^ o[m >> 16 & 255] ^ c[y >> 8 & 255] ^ l[255 & h] ^ n[b + 1],
                p = a[m >>> 24] ^ o[y >> 16 & 255] ^ c[h >> 8 & 255] ^ l[255 & g] ^ n[b + 2],
                y = a[y >>> 24] ^ o[h >> 16 & 255] ^ c[g >> 8 & 255] ^ l[255 & m] ^ n[b + 3],
                b += 4,
                h = f,
                g = w,
                m = p;
            for (let e = 0; 4 > e; e++)
                s[t ? 3 & -e : e] = u[h >>> 24] << 24 ^ u[g >> 16 & 255] << 16 ^ u[m >> 8 & 255] << 8 ^ u[255 & y] ^ n[b++],
                f = h,
                h = g,
                g = m,
                m = y,
                y = f;
            return s
        }
    }
      , Te = class {
        constructor(e, t) {
            this._prf = e,
            this._initIv = t,
            this._iv = t
        }
        reset() {
            this._iv = this._initIv
        }
        update(e) {
            return this.calculate(this._prf, e, this._iv)
        }
        incWord(e) {
            if (255 & ~(e >> 24))
                e += 1 << 24;
            else {
                let t = e >> 16 & 255
                  , n = e >> 8 & 255
                  , r = 255 & e;
                255 === t ? (t = 0,
                255 === n ? (n = 0,
                255 === r ? r = 0 : ++r) : ++n) : ++t,
                e = 0,
                e += t << 16,
                e += n << 8,
                e += r
            }
            return e
        }
        incCounter(e) {
            0 === (e[0] = this.incWord(e[0])) && (e[1] = this.incWord(e[1]))
        }
        calculate(e, t, n) {
            let r;
            if (!(r = t.length))
                return [];
            const s = le.bitLength(t);
            for (let s = 0; r > s; s += 4) {
                this.incCounter(n);
                const r = e.encrypt(n);
                t[s] ^= r[0],
                t[s + 1] ^= r[1],
                t[s + 2] ^= r[2],
                t[s + 3] ^= r[3]
            }
            return le.clamp(t, s)
        }
    }
      , Le = we.hmacSha1;
    let Ue = De && Re && typeof We.importKey == Y
      , Ie = De && Re && typeof We.deriveBits == Y;
    class Ne extends x {
        constructor({password: e, rawPassword: t, signed: r, encryptionStrength: s, checkPasswordOnly: i}) {
            super({
                start() {
                    n.assign(this, {
                        ready: new y((e => this.resolveReady = e)),
                        password: He(e, t),
                        signed: r,
                        strength: s - 1,
                        pending: new w
                    })
                },
                async transform(e, t) {
                    const n = this
                      , {password: r, strength: s, resolveReady: a, ready: o} = n;
                    r ? (await (async (e, t, n, r) => {
                        const s = await Pe(e, t, n, Be(r, 0, xe[t]))
                          , i = Be(r, xe[t]);
                        if (s[0] != i[0] || s[1] != i[1])
                            throw new d(he)
                    }
                    )(n, s, r, Be(e, 0, xe[s] + 2)),
                    e = Be(e, xe[s] + 2),
                    i ? t.error(new d(me)) : a()) : await o;
                    const c = new w(e.length - Ce - (e.length - Ce) % be);
                    t.enqueue(Oe(n, e, c, 0, Ce, !0))
                },
                async flush(e) {
                    const {signed: t, ctr: n, hmac: r, pending: s, ready: i} = this;
                    if (r && n) {
                        await i;
                        const a = Be(s, 0, s.length - Ce)
                          , o = Be(s, s.length - Ce);
                        let c = new w;
                        if (a.length) {
                            const e = Ze(Fe, a);
                            r.update(e);
                            const t = n.update(e);
                            c = Ve(Fe, t)
                        }
                        if (t) {
                            const e = Be(Ve(Fe, r.digest()), 0, Ce);
                            for (let t = 0; Ce > t; t++)
                                if (e[t] != o[t])
                                    throw new d(ge)
                        }
                        e.enqueue(c)
                    }
                }
            })
        }
    }
    class qe extends x {
        constructor({password: e, rawPassword: t, encryptionStrength: r}) {
            let s;
            super({
                start() {
                    n.assign(this, {
                        ready: new y((e => this.resolveReady = e)),
                        password: He(e, t),
                        strength: r - 1,
                        pending: new w
                    })
                },
                async transform(e, t) {
                    const n = this
                      , {password: r, strength: s, resolveReady: i, ready: a} = n;
                    let o = new w;
                    r ? (o = await (async (e, t, n) => {
                        const r = ye(new w(xe[t]));
                        return Me(r, await Pe(e, t, n, r))
                    }
                    )(n, s, r),
                    i()) : await a;
                    const c = new w(o.length + e.length - e.length % be);
                    c.set(o, 0),
                    t.enqueue(Oe(n, e, c, o.length, 0))
                },
                async flush(e) {
                    const {ctr: t, hmac: n, pending: r, ready: i} = this;
                    if (n && t) {
                        await i;
                        let a = new w;
                        if (r.length) {
                            const e = t.update(Ze(Fe, r));
                            n.update(e),
                            a = Ve(Fe, e)
                        }
                        s.signature = Ve(Fe, n.digest()).slice(0, Ce),
                        e.enqueue(Me(a, s.signature))
                    }
                }
            }),
            s = this
        }
    }
    function Oe(e, t, n, r, s, i) {
        const {ctr: a, hmac: o, pending: c} = e
          , l = t.length - s;
        let u;
        for (c.length && (t = Me(c, t),
        n = ( (e, t) => {
            if (t && t > e.length) {
                const n = e;
                (e = new w(t)).set(n, 0)
            }
            return e
        }
        )(n, l - l % be)),
        u = 0; l - be >= u; u += be) {
            const e = Ze(Fe, Be(t, u, u + be));
            i && o.update(e);
            const s = a.update(e);
            i || o.update(s),
            n.set(Ve(Fe, s), u + r)
        }
        return e.pending = Be(t, u),
        n
    }
    async function Pe(e, r, s, i) {
        e.password = null;
        const a = await (async (e, t, n, r, s) => {
            if (!Ue)
                return we.importKey(t);
            try {
                return await We.importKey("raw", t, n, !1, s)
            } catch (e) {
                return Ue = !1,
                we.importKey(t)
            }
        }
        )(0, s, ke, 0, ve)
          , o = await (async (e, t, n) => {
            if (!Ie)
                return we.pbkdf2(t, e.salt, ze.iterations, n);
            try {
                return await We.deriveBits(e, t, n)
            } catch (r) {
                return Ie = !1,
                we.pbkdf2(t, e.salt, ze.iterations, n)
            }
        }
        )(n.assign({
            salt: i
        }, ze), a, 8 * (2 * Ae[r] + 2))
          , c = new w(o)
          , l = Ze(Fe, Be(c, 0, Ae[r]))
          , u = Ze(Fe, Be(c, Ae[r], 2 * Ae[r]))
          , f = Be(c, 2 * Ae[r]);
        return n.assign(e, {
            keys: {
                key: l,
                authentication: u,
                passwordVerification: f
            },
            ctr: new Te(new Ee(l),t.from(_e)),
            hmac: new Le(u)
        }),
        f
    }
    function He(e, t) {
        return t === G ? ce(e) : t
    }
    function Me(e, t) {
        let n = e;
        return e.length + t.length && (n = new w(e.length + t.length),
        n.set(e, 0),
        n.set(t, e.length)),
        n
    }
    function Be(e, t, n) {
        return e.subarray(t, n)
    }
    function Ve(e, t) {
        return e.fromBits(t)
    }
    function Ze(e, t) {
        return e.toBits(t)
    }
    class Ke extends x {
        constructor({password: e, passwordVerification: t, checkPasswordOnly: r}) {
            super({
                start() {
                    n.assign(this, {
                        password: e,
                        passwordVerification: t
                    }),
                    je(this, e)
                },
                transform(e, t) {
                    const n = this;
                    if (n.password) {
                        const t = Xe(n, e.subarray(0, 12));
                        if (n.password = null,
                        t[11] != n.passwordVerification)
                            throw new d(he);
                        e = e.subarray(12)
                    }
                    r ? t.error(new d(me)) : t.enqueue(Xe(n, e))
                }
            })
        }
    }
    class Ge extends x {
        constructor({password: e, passwordVerification: t}) {
            super({
                start() {
                    n.assign(this, {
                        password: e,
                        passwordVerification: t
                    }),
                    je(this, e)
                },
                transform(e, t) {
                    const n = this;
                    let r, s;
                    if (n.password) {
                        n.password = null;
                        const t = ye(new w(12));
                        t[11] = n.passwordVerification,
                        r = new w(e.length + t.length),
                        r.set(Ye(n, t), 0),
                        s = 12
                    } else
                        r = new w(e.length),
                        s = 0;
                    r.set(Ye(n, e), s),
                    t.enqueue(r)
                }
            })
        }
    }
    function Xe(e, t) {
        const n = new w(t.length);
        for (let r = 0; r < t.length; r++)
            n[r] = Qe(e) ^ t[r],
            Je(e, n[r]);
        return n
    }
    function Ye(e, t) {
        const n = new w(t.length);
        for (let r = 0; r < t.length; r++)
            n[r] = Qe(e) ^ t[r],
            Je(e, t[r]);
        return n
    }
    function je(e, t) {
        const r = [305419896, 591751049, 878082192];
        n.assign(e, {
            keys: r,
            crcKey0: new ae(r[0]),
            crcKey2: new ae(r[2])
        });
        for (let n = 0; n < t.length; n++)
            Je(e, t.charCodeAt(n))
    }
    function Je(e, t) {
        let[n,r,s] = e.keys;
        e.crcKey0.append([t]),
        n = ~e.crcKey0.get(),
        r = et(a.imul(et(r + $e(n)), 134775813) + 1),
        e.crcKey2.append([r >>> 24]),
        s = ~e.crcKey2.get(),
        e.keys = [n, r, s]
    }
    function Qe(e) {
        const t = 2 | e.keys[2];
        return $e(a.imul(t, 1 ^ t) >>> 8)
    }
    function $e(e) {
        return 255 & e
    }
    function et(e) {
        return 4294967295 & e
    }
    const tt = "deflate-raw";
    class nt extends x {
        constructor(e, {chunkSize: t, CompressionStream: n, CompressionStreamNative: r}) {
            super({});
            const {compressed: s, encrypted: i, useCompressionStream: a, zipCrypto: o, signed: c, level: l} = e
              , u = this;
            let f, d, w = st(super.readable);
            i && !o || !c || (f = new oe,
            w = ot(w, f)),
            s && (w = at(w, a, {
                level: l,
                chunkSize: t
            }, r, n)),
            i && (o ? w = ot(w, new Ge(e)) : (d = new qe(e),
            w = ot(w, d))),
            it(u, w, ( () => {
                let e;
                i && !o && (e = d.signature),
                i && !o || !c || (e = new g(f.value.buffer).getUint32(0)),
                u.signature = e
            }
            ))
        }
    }
    class rt extends x {
        constructor(e, {chunkSize: t, DecompressionStream: n, DecompressionStreamNative: r}) {
            super({});
            const {zipCrypto: s, encrypted: i, signed: a, signature: o, compressed: c, useCompressionStream: l} = e;
            let u, f, w = st(super.readable);
            i && (s ? w = ot(w, new Ke(e)) : (f = new Ne(e),
            w = ot(w, f))),
            c && (w = at(w, l, {
                chunkSize: t
            }, r, n)),
            i && !s || !a || (u = new oe,
            w = ot(w, u)),
            it(this, w, ( () => {
                if ((!i || s) && a) {
                    const e = new g(u.value.buffer);
                    if (o != e.getUint32(0, !1))
                        throw new d(ge)
                }
            }
            ))
        }
    }
    function st(e) {
        return ot(e, new x({
            transform(e, t) {
                e && e.length && t.enqueue(e)
            }
        }))
    }
    function it(e, t, r) {
        t = ot(t, new x({
            flush: r
        })),
        n.defineProperty(e, "readable", {
            get: () => t
        })
    }
    function at(e, t, n, r, s) {
        try {
            e = ot(e, new (t && r ? r : s)(tt,n))
        } catch (r) {
            if (!t)
                return e;
            try {
                e = ot(e, new s(tt,n))
            } catch (t) {
                return e
            }
        }
        return e
    }
    function ot(e, t) {
        return e.pipeThrough(t)
    }
    const ct = "data"
      , lt = "close"
      , ut = "deflate"
      , ft = "inflate";
    class dt extends x {
        constructor(e, t) {
            super({});
            const r = this
              , {codecType: s} = e;
            let i;
            s.startsWith(ut) ? i = nt : s.startsWith(ft) && (i = rt);
            let a = 0
              , o = 0;
            const c = new i(e,t)
              , l = super.readable
              , u = new x({
                transform(e, t) {
                    e && e.length && (o += e.length,
                    t.enqueue(e))
                },
                flush() {
                    n.assign(r, {
                        inputSize: o
                    })
                }
            })
              , f = new x({
                transform(e, t) {
                    e && e.length && (a += e.length,
                    t.enqueue(e))
                },
                flush() {
                    const {signature: e} = c;
                    n.assign(r, {
                        signature: e,
                        outputSize: a,
                        inputSize: o
                    })
                }
            });
            n.defineProperty(r, "readable", {
                get: () => l.pipeThrough(u).pipeThrough(c).pipeThrough(f)
            })
        }
    }
    class wt extends x {
        constructor(e) {
            let t;
            super({
                transform: function n(r, s) {
                    if (t) {
                        const e = new w(t.length + r.length);
                        e.set(t),
                        e.set(r, t.length),
                        r = e,
                        t = null
                    }
                    r.length > e ? (s.enqueue(r.slice(0, e)),
                    n(r.slice(e), s)) : t = r
                },
                flush(e) {
                    t && t.length && e.enqueue(t)
                }
            })
        }
    }
    let pt = typeof R != X;
    class ht {
        constructor(e, {readable: t, writable: r}, {options: s, config: i, streamOptions: a, useWebWorkers: o, transferStreams: c, scripts: l}, u) {
            const {signal: f} = a;
            return n.assign(e, {
                busy: !0,
                readable: t.pipeThrough(new wt(i.chunkSize)).pipeThrough(new gt(t,a), {
                    signal: f
                }),
                writable: r,
                options: n.assign({}, s),
                scripts: l,
                transferStreams: c,
                terminate: () => new y((t => {
                    const {worker: n, busy: r} = e;
                    n ? (r ? e.resolveTerminated = t : (n.terminate(),
                    t()),
                    e.interface = null) : t()
                }
                )),
                onTaskFinished() {
                    const {resolveTerminated: t} = e;
                    t && (e.resolveTerminated = null,
                    e.terminated = !0,
                    e.worker.terminate(),
                    t()),
                    e.busy = !1,
                    u(e)
                }
            }),
            (o && pt ? bt : yt)(e, i)
        }
    }
    class gt extends x {
        constructor(e, {onstart: t, onprogress: n, size: r, onend: s}) {
            let i = 0;
            super({
                async start() {
                    t && await mt(t, r)
                },
                async transform(e, t) {
                    i += e.length,
                    n && await mt(n, i, r),
                    t.enqueue(e)
                },
                async flush() {
                    e.size = i,
                    s && await mt(s, i)
                }
            })
        }
    }
    async function mt(e, ...t) {
        try {
            await e(...t)
        } catch (e) {}
    }
    function yt(e, t) {
        return {
            run: () => (async ({options: e, readable: t, writable: n, onTaskFinished: r}, s) => {
                try {
                    const r = new dt(e,s);
                    await t.pipeThrough(r).pipeTo(n, {
                        preventClose: !0,
                        preventAbort: !0
                    });
                    const {signature: i, inputSize: a, outputSize: o} = r;
                    return {
                        signature: i,
                        inputSize: a,
                        outputSize: o
                    }
                } finally {
                    r()
                }
            }
            )(e, t)
        }
    }
    function bt(e, t) {
        const {baseURL: r, chunkSize: s} = t;
        if (!e.interface) {
            let i;
            try {
                i = ( (e, t, r) => {
                    const s = {
                        type: "module"
                    };
                    let i, a;
                    typeof e == Y && (e = e());
                    try {
                        i = new f(e,t)
                    } catch (t) {
                        i = e
                    }
                    if (St)
                        try {
                            a = new R(i)
                        } catch (e) {
                            St = !1,
                            a = new R(i,s)
                        }
                    else
                        a = new R(i,s);
                    return a.addEventListener("message", (e => (async ({data: e}, t) => {
                        const {type: r, value: s, messageId: i, result: a, error: o} = e
                          , {reader: c, writer: l, resolveResult: u, rejectResult: f, onTaskFinished: p} = t;
                        try {
                            if (o) {
                                const {message: e, stack: t, code: r, name: s} = o
                                  , i = new d(e);
                                n.assign(i, {
                                    stack: t,
                                    code: r,
                                    name: s
                                }),
                                h(i)
                            } else {
                                if ("pull" == r) {
                                    const {value: e, done: n} = await c.read();
                                    zt({
                                        type: ct,
                                        value: e,
                                        done: n,
                                        messageId: i
                                    }, t)
                                }
                                r == ct && (await l.ready,
                                await l.write(new w(s)),
                                zt({
                                    type: "ack",
                                    messageId: i
                                }, t)),
                                r == lt && h(null, a)
                            }
                        } catch (o) {
                            zt({
                                type: lt,
                                messageId: i
                            }, t),
                            h(o)
                        }
                        function h(e, t) {
                            e ? f(e) : u(t),
                            l && l.releaseLock(),
                            p()
                        }
                    }
                    )(e, r))),
                    a
                }
                )(e.scripts[0], r, e)
            } catch (n) {
                return pt = !1,
                yt(e, t)
            }
            n.assign(e, {
                worker: i,
                interface: {
                    run: () => (async (e, t) => {
                        let r, s;
                        const i = new y(( (e, t) => {
                            r = e,
                            s = t
                        }
                        ));
                        n.assign(e, {
                            reader: null,
                            writer: null,
                            resolveResult: r,
                            rejectResult: s,
                            result: i
                        });
                        const {readable: a, options: o, scripts: c} = e
                          , {writable: l, closed: u} = (e => {
                            let t;
                            const n = new y((e => t = e));
                            return {
                                writable: new C({
                                    async write(t) {
                                        const n = e.getWriter();
                                        await n.ready,
                                        await n.write(t),
                                        n.releaseLock()
                                    },
                                    close() {
                                        t()
                                    },
                                    abort: t => e.getWriter().abort(t)
                                }),
                                closed: n
                            }
                        }
                        )(e.writable)
                          , f = zt({
                            type: "start",
                            scripts: c.slice(1),
                            options: o,
                            config: t,
                            readable: a,
                            writable: l
                        }, e);
                        f || n.assign(e, {
                            reader: a.getReader(),
                            writer: l.getWriter()
                        });
                        const d = await i;
                        return f || await l.getWriter().close(),
                        await u,
                        d
                    }
                    )(e, {
                        chunkSize: s
                    })
                }
            })
        }
        return e.interface
    }
    let St = !0
      , kt = !0;
    function zt(e, {worker: t, writer: n, onTaskFinished: r, transferStreams: s}) {
        try {
            const {value: n, readable: r, writable: i} = e
              , a = [];
            if (n && (n.byteLength < n.buffer.byteLength ? e.value = n.buffer.slice(0, n.byteLength) : e.value = n.buffer,
            a.push(e.value)),
            s && kt ? (r && a.push(r),
            i && a.push(i)) : e.readable = e.writable = null,
            a.length)
                try {
                    return t.postMessage(e, a),
                    !0
                } catch (n) {
                    kt = !1,
                    e.readable = e.writable = null,
                    t.postMessage(e)
                }
            else
                t.postMessage(e)
        } catch (e) {
            throw n && n.releaseLock(),
            r(),
            e
        }
    }
    let vt = [];
    const xt = [];
    let At = 0;
    async function Ct(e, t) {
        const {options: n, config: r} = t
          , {transferStreams: i, useWebWorkers: a, useCompressionStream: o, codecType: c, compressed: l, signed: u, encrypted: f} = n
          , {workerScripts: d, maxWorkers: w} = r;
        t.transferStreams = i || i === G;
        const p = !(l || u || f || t.transferStreams);
        return t.useWebWorkers = !p && (a || a === G && r.useWebWorkers),
        t.scripts = t.useWebWorkers && d ? d[c] : [],
        n.useCompressionStream = o || o === G && r.useCompressionStream,
        (await (async () => {
            const n = vt.find((e => !e.busy));
            if (n)
                return _t(n),
                new ht(n,e,t,h);
            if (vt.length < w) {
                const n = {
                    indexWorker: At
                };
                return At++,
                vt.push(n),
                new ht(n,e,t,h)
            }
            return new y((n => xt.push({
                resolve: n,
                stream: e,
                workerOptions: t
            })))
        }
        )()).run();
        function h(e) {
            if (xt.length) {
                const [{resolve: t, stream: n, workerOptions: r}] = xt.splice(0, 1);
                t(new ht(e,n,r,h))
            } else
                e.worker ? (_t(e),
                ( (e, t) => {
                    const {config: n} = t
                      , {terminateWorkerTimeout: r} = n;
                    s.isFinite(r) && r >= 0 && (e.terminated ? e.terminated = !1 : e.terminateTimeout = setTimeout((async () => {
                        vt = vt.filter((t => t != e));
                        try {
                            await e.terminate()
                        } catch (e) {}
                    }
                    ), r))
                }
                )(e, t)) : vt = vt.filter((t => t != e))
        }
    }
    function _t(e) {
        const {terminateTimeout: t} = e;
        t && (clearTimeout(t),
        e.terminateTimeout = null)
    }
    const Dt = "HTTP error "
      , Wt = "HTTP Range not supported"
      , Rt = "Writer iterator completed too soon"
      , Ft = "Range"
      , Et = "GET"
      , Tt = "bytes"
      , Lt = 65536
      , Ut = "writable";
    class It {
        constructor() {
            this.size = 0
        }
        init() {
            this.initialized = !0
        }
    }
    class Nt extends It {
        get readable() {
            const e = this
              , {chunkSize: t=Lt} = e
              , n = new A({
                start() {
                    this.chunkOffset = 0
                },
                async pull(r) {
                    const {offset: s=0, size: i, diskNumberStart: o} = n
                      , {chunkOffset: c} = this;
                    r.enqueue(await on(e, s + c, a.min(t, i - c), o)),
                    c + t > i ? r.close() : this.chunkOffset += t
                }
            });
            return n
        }
    }
    class qt extends It {
        constructor() {
            super();
            const e = this
              , t = new C({
                write: t => e.writeUint8Array(t)
            });
            n.defineProperty(e, Ut, {
                get: () => t
            })
        }
        writeUint8Array() {}
    }
    class Ot extends Nt {
        constructor(e) {
            super(),
            n.assign(this, {
                blob: e,
                size: e.size
            })
        }
        async readUint8Array(e, t) {
            const n = this
              , r = e + t
              , s = e || r < n.size ? n.blob.slice(e, r) : n.blob;
            let i = await s.arrayBuffer();
            return i.byteLength > t && (i = i.slice(e, r)),
            new w(i)
        }
    }
    class Pt extends It {
        constructor(e) {
            super();
            const t = new x
              , r = [];
            e && r.push(["Content-Type", e]),
            n.defineProperty(this, Ut, {
                get: () => t.writable
            }),
            this.blob = new u(t.readable,{
                headers: r
            }).blob()
        }
        getData() {
            return this.blob
        }
    }
    class Ht extends Nt {
        constructor(e, t) {
            super(),
            Bt(this, e, t)
        }
        async init() {
            await Vt(this, Qt, Xt),
            super.init()
        }
        readUint8Array(e, t) {
            return Zt(this, e, t, Qt, Xt)
        }
    }
    class Mt extends Nt {
        constructor(e, t) {
            super(),
            Bt(this, e, t)
        }
        async init() {
            await Vt(this, $t, Yt),
            super.init()
        }
        readUint8Array(e, t) {
            return Zt(this, e, t, $t, Yt)
        }
    }
    function Bt(e, t, r) {
        const {preventHeadRequest: s, useRangeHeader: i, forceRangeRequests: a, combineSizeEocd: o} = r;
        delete (r = n.assign({}, r)).preventHeadRequest,
        delete r.useRangeHeader,
        delete r.forceRangeRequests,
        delete r.combineSizeEocd,
        delete r.useXHR,
        n.assign(e, {
            url: t,
            options: r,
            preventHeadRequest: s,
            useRangeHeader: i,
            forceRangeRequests: a,
            combineSizeEocd: o
        })
    }
    async function Vt(e, t, n) {
        const {url: r, preventHeadRequest: i, useRangeHeader: a, forceRangeRequests: o, combineSizeEocd: c} = e;
        if ((e => {
            const {baseURL: t} = ee()
              , {protocol: n} = new f(e,t);
            return "http:" == n || "https:" == n
        }
        )(r) && (a || o) && (void 0 === i || i)) {
            const r = await t(Et, e, Kt(e, c ? -22 : void 0));
            if (!o && r.headers.get("Accept-Ranges") != Tt)
                throw new d(Wt);
            {
                let i;
                c && (e.eocdCache = new w(await r.arrayBuffer()));
                const a = r.headers.get("Content-Range");
                if (a) {
                    const e = a.trim().split(/\s*\/\s*/);
                    if (e.length) {
                        const t = e[1];
                        t && "*" != t && (i = s(t))
                    }
                }
                i === G ? await Jt(e, t, n) : e.size = i
            }
        } else
            await Jt(e, t, n)
    }
    async function Zt(e, t, n, r, s) {
        const {useRangeHeader: i, forceRangeRequests: a, eocdCache: o, size: c, options: l} = e;
        if (i || a) {
            if (o && t == c - H && n == H)
                return o;
            const s = await r(Et, e, Kt(e, t, n));
            if (206 != s.status)
                throw new d(Wt);
            return new w(await s.arrayBuffer())
        }
        {
            const {data: r} = e;
            return r || await s(e, l),
            new w(e.data.subarray(t, t + n))
        }
    }
    function Kt(e, t=0, r=1) {
        return n.assign({}, Gt(e), {
            [Ft]: Tt + "=" + (0 > t ? t : t + "-" + (t + r - 1))
        })
    }
    function Gt({options: e}) {
        const {headers: t} = e;
        if (t)
            return Symbol.iterator in t ? n.fromEntries(t) : t
    }
    async function Xt(e) {
        await jt(e, Qt)
    }
    async function Yt(e) {
        await jt(e, $t)
    }
    async function jt(e, t) {
        const n = await t(Et, e, Gt(e));
        e.data = new w(await n.arrayBuffer()),
        e.size || (e.size = e.data.length)
    }
    async function Jt(e, t, n) {
        if (e.preventHeadRequest)
            await n(e, e.options);
        else {
            const r = (await t("HEAD", e, Gt(e))).headers.get("Content-Length");
            r ? e.size = s(r) : await n(e, e.options)
        }
    }
    async function Qt(e, {options: t, url: r}, s) {
        const i = await fetch(r, n.assign({}, t, {
            method: e,
            headers: s
        }));
        if (400 > i.status)
            return i;
        throw 416 == i.status ? new d(Wt) : new d(Dt + (i.statusText || i.status))
    }
    function $t(e, {url: t}, r) {
        return new y(( (s, i) => {
            const a = new XMLHttpRequest;
            if (a.addEventListener("load", ( () => {
                if (400 > a.status) {
                    const e = [];
                    a.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach((t => {
                        const n = t.trim().split(/\s*:\s*/);
                        n[0] = n[0].trim().replace(/^[a-z]|-[a-z]/g, (e => e.toUpperCase())),
                        e.push(n)
                    }
                    )),
                    s({
                        status: a.status,
                        arrayBuffer: () => a.response,
                        headers: new c(e)
                    })
                } else
                    i(416 == a.status ? new d(Wt) : new d(Dt + (a.statusText || a.status)))
            }
            ), !1),
            a.addEventListener("error", (e => i(e.detail ? e.detail.error : new d("Network error"))), !1),
            a.open(e, t),
            r)
                for (const e of n.entries(r))
                    a.setRequestHeader(e[0], e[1]);
            a.responseType = "arraybuffer",
            a.send()
        }
        ))
    }
    class en extends Nt {
        constructor(e, t={}) {
            super(),
            n.assign(this, {
                url: e,
                reader: t.useXHR ? new Mt(e,t) : new Ht(e,t)
            })
        }
        set size(e) {}
        get size() {
            return this.reader.size
        }
        async init() {
            await this.reader.init(),
            super.init()
        }
        readUint8Array(e, t) {
            return this.reader.readUint8Array(e, t)
        }
    }
    class tn extends Nt {
        constructor(e) {
            super(),
            this.readers = e
        }
        async init() {
            const e = this
              , {readers: t} = e;
            e.lastDiskNumber = 0,
            e.lastDiskOffset = 0,
            await y.all(t.map((async (n, r) => {
                await n.init(),
                r != t.length - 1 && (e.lastDiskOffset += n.size),
                e.size += n.size
            }
            ))),
            super.init()
        }
        async readUint8Array(e, t, n=0) {
            const r = this
              , {readers: s} = this;
            let i, o = n;
            -1 == o && (o = s.length - 1);
            let c = e;
            for (; c >= s[o].size; )
                c -= s[o].size,
                o++;
            const l = s[o]
              , u = l.size;
            if (c + t > u) {
                const s = u - c;
                i = new w(t),
                i.set(await on(l, c, s)),
                i.set(await r.readUint8Array(e + s, t - s, n), s)
            } else
                i = await on(l, c, t);
            return r.lastDiskNumber = a.max(o, r.lastDiskNumber),
            i
        }
    }
    class nn extends It {
        constructor(e, t=4294967295) {
            super();
            const r = this;
            let s, i, a;
            n.assign(r, {
                diskNumber: 0,
                diskOffset: 0,
                size: 0,
                maxSize: t,
                availableSize: t
            });
            const o = new C({
                async write(t) {
                    const {availableSize: n} = r;
                    if (a)
                        t.length < n ? await c(t) : (await c(t.slice(0, n)),
                        await l(),
                        r.diskOffset += s.size,
                        r.diskNumber++,
                        a = null,
                        await this.write(t.slice(n)));
                    else {
                        const {value: n, done: o} = await e.next();
                        if (o && !n)
                            throw new d(Rt);
                        s = n,
                        s.size = 0,
                        s.maxSize && (r.maxSize = s.maxSize),
                        r.availableSize = r.maxSize,
                        await rn(s),
                        i = n.writable,
                        a = i.getWriter(),
                        await this.write(t)
                    }
                },
                async close() {
                    await a.ready,
                    await l()
                }
            });
            async function c(e) {
                const t = e.length;
                t && (await a.ready,
                await a.write(e),
                s.size += t,
                r.size += t,
                r.availableSize -= t)
            }
            async function l() {
                i.size = s.size,
                await a.close()
            }
            n.defineProperty(r, Ut, {
                get: () => o
            })
        }
    }
    async function rn(e, t) {
        if (!e.init || e.initialized)
            return y.resolve();
        await e.init(t)
    }
    function sn(e) {
        return t.isArray(e) && (e = new tn(e)),
        e instanceof A && (e = {
            readable: e
        }),
        e
    }
    function an(e) {
        e.writable === G && typeof e.next == Y && (e = new nn(e)),
        e instanceof C && (e = {
            writable: e
        });
        const {writable: t} = e;
        return t.size === G && (t.size = 0),
        e instanceof nn || n.assign(e, {
            diskNumber: 0,
            diskOffset: 0,
            availableSize: 1 / 0,
            maxSize: 1 / 0
        }),
        e
    }
    function on(e, t, n, r) {
        return e.readUint8Array(t, n, r)
    }
    const cn = tn
      , ln = nn
      , un = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split("");
    function fn(e, t) {
        return t && "cp437" == t.trim().toLowerCase() ? (e => {
            {
                let t = "";
                for (let n = 0; n < e.length; n++)
                    t += un[e[n]];
                return t
            }
        }
        )(e) : new S(t).decode(e)
    }
    const dn = "filename"
      , wn = "rawFilename"
      , pn = "comment"
      , hn = "rawComment"
      , gn = "uncompressedSize"
      , mn = "compressedSize"
      , yn = "offset"
      , bn = "diskNumberStart"
      , Sn = "lastModDate"
      , kn = "rawLastModDate"
      , zn = "lastAccessDate"
      , vn = "creationDate"
      , xn = "internalFileAttribute"
      , An = "externalFileAttribute"
      , Cn = "msDosCompatible"
      , _n = "zip64"
      , Dn = "encrypted"
      , Wn = "version"
      , Rn = "versionMadeBy"
      , Fn = "zipCrypto"
      , En = [dn, wn, mn, gn, Sn, kn, pn, hn, zn, vn, yn, bn, bn, xn, An, Cn, _n, Dn, Wn, Rn, Fn, "directory", "bitFlag", "signature", "filenameUTF8", "commentUTF8", "compressionMethod", "extraField", "rawExtraField", "extraFieldZip64", "extraFieldUnicodePath", "extraFieldUnicodeComment", "extraFieldAES", "extraFieldNTFS", "extraFieldExtendedTimestamp"];
    class Tn {
        constructor(e) {
            En.forEach((t => this[t] = e[t]))
        }
    }
    const Ln = "File format is not recognized"
      , Un = "End of central directory not found"
      , In = "End of Zip64 central directory locator not found"
      , Nn = "Central directory header not found"
      , qn = "Local file header not found"
      , On = "Zip64 extra field not found"
      , Pn = "File contains encrypted entry"
      , Hn = "Encryption method not supported"
      , Mn = "Compression method not supported"
      , Bn = "Split zip file"
      , Vn = "utf-8"
      , Zn = "cp437"
      , Kn = [[gn, E], [mn, E], [yn, E], [bn, T]]
      , Gn = {
        [T]: {
            getValue: sr,
            bytes: 4
        },
        [E]: {
            getValue: ir,
            bytes: 8
        }
    };
    class Xn {
        constructor(e, t={}) {
            n.assign(this, {
                reader: sn(e),
                options: t,
                config: ee()
            })
        }
        async*getEntriesGenerator(e={}) {
            const t = this;
            let {reader: r} = t;
            const {config: s} = t;
            if (await rn(r),
            r.size !== G && r.readUint8Array || (r = new Ot(await new u(r.readable).blob()),
            await rn(r)),
            r.size < H)
                throw new d(Ln);
            r.chunkSize = te(s);
            const i = await (async (e, t, n) => {
                const r = new w(4);
                var s;
                return s = t,
                ar(r).setUint32(0, s, !0),
                await i(22) || await i(a.min(1048582, n));
                async function i(t) {
                    const s = n - t
                      , i = await on(e, s, t);
                    for (let e = i.length - 22; e >= 0; e--)
                        if (i[e] == r[0] && i[e + 1] == r[1] && i[e + 2] == r[2] && i[e + 3] == r[3])
                            return {
                                offset: s + e,
                                buffer: i.slice(e, e + 22).buffer
                            }
                }
            }
            )(r, q, r.size);
            if (!i)
                throw sr(ar(await on(r, 0, 4))) == U ? new d(Bn) : new d(Un);
            const o = ar(i);
            let c = sr(o, 12)
              , l = sr(o, 16);
            const f = i.offset
              , p = rr(o, 20)
              , h = f + H + p;
            let g = rr(o, 4);
            const m = r.lastDiskNumber || 0;
            let y = rr(o, 6)
              , b = rr(o, 8)
              , S = 0
              , k = 0;
            if (l == E || c == E || b == T || y == T) {
                const e = ar(await on(r, i.offset - 20, 20));
                if (sr(e, 0) == P) {
                    l = ir(e, 8);
                    let t = await on(r, l, 56, -1)
                      , n = ar(t);
                    const s = i.offset - 20 - 56;
                    if (sr(n, 0) != O && l != s) {
                        const e = l;
                        l = s,
                        S = l - e,
                        t = await on(r, l, 56, -1),
                        n = ar(t)
                    }
                    if (sr(n, 0) != O)
                        throw new d(In);
                    g == T && (g = sr(n, 16)),
                    y == T && (y = sr(n, 20)),
                    b == T && (b = ir(n, 32)),
                    c == E && (c = ir(n, 40)),
                    l -= c
                }
            }
            if (l < r.size || (S = r.size - l - c - H,
            l = r.size - c - H),
            m != g)
                throw new d(Bn);
            if (0 > l)
                throw new d(Ln);
            let z = 0
              , v = await on(r, l, c, y)
              , x = ar(v);
            if (c) {
                const e = i.offset - c;
                if (sr(x, z) != N && l != e) {
                    const t = l;
                    l = e,
                    S += l - t,
                    v = await on(r, l, c, y),
                    x = ar(v)
                }
            }
            const A = i.offset - l - (r.lastDiskOffset || 0);
            if (c == A || 0 > A || (c = A,
            v = await on(r, l, c, y),
            x = ar(v)),
            0 > l || l >= r.size)
                throw new d(Ln);
            const C = $n(t, e, "filenameEncoding")
              , _ = $n(t, e, "commentEncoding");
            for (let i = 0; b > i; i++) {
                const o = new Yn(r,s,t.options);
                if (sr(x, z) != N)
                    throw new d(Nn);
                jn(o, x, z + 6);
                const c = !!o.bitFlag.languageEncodingFlag
                  , l = z + 46
                  , u = l + o.filenameLength
                  , f = u + o.extraFieldLength
                  , w = rr(x, z + 4)
                  , p = !0
                  , h = v.subarray(l, u)
                  , g = rr(x, z + 32)
                  , m = f + g
                  , y = v.subarray(f, m)
                  , A = c
                  , D = c
                  , W = p && !(16 & ~nr(x, z + 38))
                  , R = sr(x, z + 42) + S;
                n.assign(o, {
                    versionMadeBy: w,
                    msDosCompatible: p,
                    compressedSize: 0,
                    uncompressedSize: 0,
                    commentLength: g,
                    directory: W,
                    offset: R,
                    diskNumberStart: rr(x, z + 34),
                    internalFileAttribute: rr(x, z + 36),
                    externalFileAttribute: sr(x, z + 38),
                    rawFilename: h,
                    filenameUTF8: A,
                    commentUTF8: D,
                    rawExtraField: v.subarray(u, f)
                });
                const F = $n(t, e, "decodeText") || fn
                  , E = A ? Vn : C || Zn
                  , T = D ? Vn : _ || Zn;
                let L = F(h, E);
                L === G && (L = fn(h, E));
                let U = F(y, T);
                U === G && (U = fn(y, T)),
                n.assign(o, {
                    rawComment: y,
                    filename: L,
                    comment: U,
                    directory: W || L.endsWith(V)
                }),
                k = a.max(R, k),
                Jn(o, o, x, z + 6),
                o.zipCrypto = o.encrypted && !o.extraFieldAES;
                const I = new Tn(o);
                I.getData = (e, t) => o.getData(e, I, t),
                z = m;
                const {onprogress: q} = e;
                if (q)
                    try {
                        await q(i + 1, b, new Tn(o))
                    } catch (e) {}
                yield I
            }
            const D = $n(t, e, "extractPrependedData")
              , W = $n(t, e, "extractAppendedData");
            return D && (t.prependedData = k > 0 ? await on(r, 0, k) : new w),
            t.comment = p ? await on(r, f + H, p) : new w,
            W && (t.appendedData = h < r.size ? await on(r, h, r.size - h) : new w),
            !0
        }
        async getEntries(e={}) {
            const t = [];
            for await(const n of this.getEntriesGenerator(e))
                t.push(n);
            return t
        }
        async close() {}
    }
    class Yn {
        constructor(e, t, r) {
            n.assign(this, {
                reader: e,
                config: t,
                options: r
            })
        }
        async getData(e, t, r={}) {
            const s = this
              , {reader: i, offset: a, diskNumberStart: o, extraFieldAES: c, compressionMethod: l, config: u, bitFlag: f, signature: p, rawLastModDate: h, uncompressedSize: g, compressedSize: m} = s
              , y = t.localDirectory = {}
              , b = ar(await on(i, a, 30, o));
            let S = $n(s, r, "password")
              , k = $n(s, r, "rawPassword");
            const z = $n(s, r, "passThrough");
            if (S = S && S.length && S,
            k = k && k.length && k,
            c && 99 != c.originalCompressionMethod)
                throw new d(Mn);
            if (0 != l && 8 != l && !z)
                throw new d(Mn);
            if (sr(b, 0) != L)
                throw new d(qn);
            jn(y, b, 4),
            y.rawExtraField = y.extraFieldLength ? await on(i, a + 30 + y.filenameLength, y.extraFieldLength, o) : new w,
            Jn(s, y, b, 4, !0),
            n.assign(t, {
                lastAccessDate: y.lastAccessDate,
                creationDate: y.creationDate
            });
            const v = s.encrypted && y.encrypted && !z
              , x = v && !c;
            if (z || (t.zipCrypto = x),
            v) {
                if (!x && c.strength === G)
                    throw new d(Hn);
                if (!S && !k)
                    throw new d(Pn)
            }
            const A = a + 30 + y.filenameLength + y.extraFieldLength
              , _ = m
              , D = i.readable;
            n.assign(D, {
                diskNumberStart: o,
                offset: A,
                size: _
            });
            const W = $n(s, r, "signal")
              , R = $n(s, r, "checkPasswordOnly");
            R && (e = new C),
            e = an(e),
            await rn(e, z ? m : g);
            const {writable: F} = e
              , {onstart: E, onprogress: T, onend: U} = r
              , I = {
                options: {
                    codecType: ft,
                    password: S,
                    rawPassword: k,
                    zipCrypto: x,
                    encryptionStrength: c && c.strength,
                    signed: $n(s, r, "checkSignature") && !z,
                    passwordVerification: x && (f.dataDescriptor ? h >>> 8 & 255 : p >>> 24 & 255),
                    signature: p,
                    compressed: 0 != l && !z,
                    encrypted: s.encrypted && !z,
                    useWebWorkers: $n(s, r, "useWebWorkers"),
                    useCompressionStream: $n(s, r, "useCompressionStream"),
                    transferStreams: $n(s, r, "transferStreams"),
                    checkPasswordOnly: R
                },
                config: u,
                streamOptions: {
                    signal: W,
                    size: _,
                    onstart: E,
                    onprogress: T,
                    onend: U
                }
            };
            let N = 0;
            try {
                ({outputSize: N} = await Ct({
                    readable: D,
                    writable: F
                }, I))
            } catch (e) {
                if (!R || e.message != me)
                    throw e
            } finally {
                const e = $n(s, r, "preventClose");
                F.size += N,
                e || F.locked || await F.getWriter().close()
            }
            return R ? G : e.getData ? e.getData() : F
        }
    }
    function jn(e, t, r) {
        const s = e.rawBitFlag = rr(t, r + 2)
          , i = !(1 & ~s)
          , a = sr(t, r + 6);
        n.assign(e, {
            encrypted: i,
            version: rr(t, r),
            bitFlag: {
                level: (6 & s) >> 1,
                dataDescriptor: !(8 & ~s),
                languageEncodingFlag: (s & B) == B
            },
            rawLastModDate: a,
            lastModDate: er(a),
            filenameLength: rr(t, r + 22),
            extraFieldLength: rr(t, r + 24)
        })
    }
    function Jn(e, t, r, s, i) {
        const {rawExtraField: a} = t
          , l = t.extraField = new c
          , u = ar(new w(a));
        let f = 0;
        try {
            for (; f < a.length; ) {
                const e = rr(u, f)
                  , t = rr(u, f + 2);
                l.set(e, {
                    type: e,
                    data: a.slice(f + 4, f + 4 + t)
                }),
                f += 4 + t
            }
        } catch (e) {}
        const p = rr(r, s + 4);
        n.assign(t, {
            signature: sr(r, s + 10),
            uncompressedSize: sr(r, s + 18),
            compressedSize: sr(r, s + 14)
        });
        const h = l.get(1);
        h && (( (e, t) => {
            t.zip64 = !0;
            const n = ar(e.data)
              , r = Kn.filter(( ([e,n]) => t[e] == n));
            for (let s = 0, i = 0; s < r.length; s++) {
                const [a,o] = r[s];
                if (t[a] == o) {
                    const r = Gn[o];
                    t[a] = e[a] = r.getValue(n, i),
                    i += r.bytes
                } else if (e[a])
                    throw new d(On)
            }
        }
        )(h, t),
        t.extraFieldZip64 = h);
        const g = l.get(28789);
        g && (Qn(g, dn, wn, t, e),
        t.extraFieldUnicodePath = g);
        const m = l.get(25461);
        m && (Qn(m, pn, hn, t, e),
        t.extraFieldUnicodeComment = m);
        const y = l.get(39169);
        y ? (( (e, t, r) => {
            const s = ar(e.data)
              , i = nr(s, 4);
            n.assign(e, {
                vendorVersion: nr(s, 0),
                vendorId: nr(s, 2),
                strength: i,
                originalCompressionMethod: r,
                compressionMethod: rr(s, 5)
            }),
            t.compressionMethod = e.compressionMethod
        }
        )(y, t, p),
        t.extraFieldAES = y) : t.compressionMethod = p;
        const b = l.get(10);
        b && (( (e, t) => {
            const r = ar(e.data);
            let s, i = 4;
            try {
                for (; i < e.data.length && !s; ) {
                    const t = rr(r, i)
                      , n = rr(r, i + 2);
                    1 == t && (s = e.data.slice(i + 4, i + 4 + n)),
                    i += 4 + n
                }
            } catch (e) {}
            try {
                if (s && 24 == s.length) {
                    const r = ar(s)
                      , i = r.getBigUint64(0, !0)
                      , a = r.getBigUint64(8, !0)
                      , o = r.getBigUint64(16, !0);
                    n.assign(e, {
                        rawLastModDate: i,
                        rawLastAccessDate: a,
                        rawCreationDate: o
                    });
                    const c = {
                        lastModDate: tr(i),
                        lastAccessDate: tr(a),
                        creationDate: tr(o)
                    };
                    n.assign(e, c),
                    n.assign(t, c)
                }
            } catch (e) {}
        }
        )(b, t),
        t.extraFieldNTFS = b);
        const S = l.get(M);
        S && (( (e, t, n) => {
            const r = ar(e.data)
              , s = nr(r, 0)
              , i = []
              , a = [];
            n ? (1 & ~s || (i.push(Sn),
            a.push(kn)),
            2 & ~s || (i.push(zn),
            a.push("rawLastAccessDate")),
            4 & ~s || (i.push(vn),
            a.push("rawCreationDate"))) : 5 > e.data.length || (i.push(Sn),
            a.push(kn));
            let c = 1;
            i.forEach(( (n, s) => {
                if (e.data.length >= c + 4) {
                    const i = sr(r, c);
                    t[n] = e[n] = new o(1e3 * i);
                    const l = a[s];
                    e[l] = i
                }
                c += 4
            }
            ))
        }
        )(S, t, i),
        t.extraFieldExtendedTimestamp = S);
        const k = l.get(6534);
        k && (t.extraFieldUSDZ = k)
    }
    function Qn(e, t, r, s, i) {
        const a = ar(e.data)
          , o = new ae;
        o.append(i[r]);
        const c = ar(new w(4));
        c.setUint32(0, o.get(), !0);
        const l = sr(a, 1);
        n.assign(e, {
            version: nr(a, 0),
            [t]: fn(e.data.subarray(5)),
            valid: !i.bitFlag.languageEncodingFlag && l == sr(c, 0)
        }),
        e.valid && (s[t] = e[t],
        s[t + "UTF8"] = !0)
    }
    function $n(e, t, n) {
        return t[n] === G ? e.options[n] : t[n]
    }
    function er(e) {
        const t = (4294901760 & e) >> 16
          , n = 65535 & e;
        try {
            return new o(1980 + ((65024 & t) >> 9),((480 & t) >> 5) - 1,31 & t,(63488 & n) >> 11,(2016 & n) >> 5,2 * (31 & n),0)
        } catch (e) {}
    }
    function tr(e) {
        return new o(s(e / i(1e4) - i(116444736e5)))
    }
    function nr(e, t) {
        return e.getUint8(t)
    }
    function rr(e, t) {
        return e.getUint16(t, !0)
    }
    function sr(e, t) {
        return e.getUint32(t, !0)
    }
    function ir(e, t) {
        return s(e.getBigUint64(t, !0))
    }
    function ar(e) {
        return new g(e.buffer)
    }
    const or = "File already exists"
      , cr = "Zip file comment exceeds 64KB"
      , lr = "File entry comment exceeds 64KB"
      , ur = "File entry name exceeds 64KB"
      , fr = "Version exceeds 65535"
      , dr = "The strength must equal 1, 2, or 3"
      , wr = "Extra field type exceeds 65535"
      , pr = "Extra field data exceeds 64KB"
      , hr = "Zip64 is not supported (make sure 'keepOrder' is set to 'true')"
      , gr = "Undefined uncompressed size"
      , mr = new w([7, 0, 2, 0, 65, 69, 3, 0, 0]);
    let yr = 0;
    const br = [];
    class Sr {
        constructor(e, t={}) {
            const r = (e = an(e)).availableSize !== G && e.availableSize > 0 && e.availableSize !== 1 / 0 && e.maxSize !== G && e.maxSize > 0 && e.maxSize !== 1 / 0;
            n.assign(this, {
                writer: e,
                addSplitZipSignature: r,
                options: t,
                config: ee(),
                files: new c,
                filenames: new l,
                offset: t.offset === G ? e.writable.size : t.offset,
                pendingEntriesSize: 0,
                pendingAddFileCalls: new l,
                bufferedWrites: 0
            })
        }
        async add(e="", r, s={}) {
            const c = this
              , {pendingAddFileCalls: l, config: f} = c;
            let m;
            yr < f.maxWorkers ? yr++ : await new y((e => br.push(e)));
            try {
                if (e = e.trim(),
                c.filenames.has(e))
                    throw new d(or);
                return c.filenames.add(e),
                m = (async (e, r, s, c) => {
                    r = r.trim(),
                    c.directory && !r.endsWith(V) ? r += V : c.directory = r.endsWith(V);
                    const l = vr(e, c, "encodeText", ce);
                    let f = l(r);
                    if (f === G && (f = ce(r)),
                    Fr(f) > T)
                        throw new d(ur);
                    const m = c.comment || "";
                    let b = l(m);
                    if (b === G && (b = ce(m)),
                    Fr(b) > T)
                        throw new d(lr);
                    const S = vr(e, c, Wn, 20);
                    if (S > T)
                        throw new d(fr);
                    const k = vr(e, c, Rn, 20);
                    if (k > T)
                        throw new d(fr);
                    const z = vr(e, c, Sn, new o)
                      , v = vr(e, c, zn)
                      , A = vr(e, c, vn)
                      , C = vr(e, c, Cn, !0)
                      , _ = vr(e, c, xn, 0)
                      , D = vr(e, c, An, 0)
                      , W = vr(e, c, "passThrough");
                    let R, F;
                    W || (R = vr(e, c, "password"),
                    F = vr(e, c, "rawPassword"));
                    const N = vr(e, c, "encryptionStrength", 3)
                      , q = vr(e, c, Fn)
                      , O = vr(e, c, "extendedTimestamp", !0)
                      , P = vr(e, c, "keepOrder", !0)
                      , H = vr(e, c, "level")
                      , X = vr(e, c, "useWebWorkers")
                      , Y = vr(e, c, "bufferedWrite")
                      , j = vr(e, c, "dataDescriptorSignature", !1)
                      , J = vr(e, c, "signal")
                      , Q = vr(e, c, "useUnicodeFileNames", !0)
                      , $ = vr(e, c, "useCompressionStream")
                      , ee = vr(e, c, "compressionMethod");
                    let ne = vr(e, c, "dataDescriptor", !0)
                      , re = vr(e, c, _n);
                    if (!q && (R !== G || F !== G) && (1 > N || N > 3))
                        throw new d(dr);
                    let se = new w;
                    const {extraField: ie} = c;
                    if (ie) {
                        let e = 0
                          , t = 0;
                        ie.forEach((t => e += 4 + Fr(t))),
                        se = new w(e),
                        ie.forEach(( (e, n) => {
                            if (n > T)
                                throw new d(wr);
                            if (Fr(e) > T)
                                throw new d(pr);
                            Wr(se, new p([n]), t),
                            Wr(se, new p([Fr(e)]), t + 2),
                            Wr(se, e, t + 4),
                            t += 4 + Fr(e)
                        }
                        ))
                    }
                    let ae = 0
                      , oe = 0
                      , le = 0;
                    if (W && (({uncompressedSize: le} = c),
                    le === G))
                        throw new d(gr);
                    const ue = !0 === re;
                    s && (s = sn(s),
                    await rn(s),
                    W ? ae = xr(le) : s.size === G ? (ne = !0,
                    (re || re === G) && (re = !0,
                    le = ae = 4294967296)) : (le = s.size,
                    ae = xr(le)));
                    const {diskOffset: fe, diskNumber: de, maxSize: we} = e.writer
                      , pe = ue || le > E
                      , he = ue || ae > E
                      , ge = ue || e.offset + e.pendingEntriesSize - fe > E
                      , me = vr(e, c, "supportZip64SplitFile", !0) && ue || de + a.ceil(e.pendingEntriesSize / we) > T;
                    if (ge || pe || he || me) {
                        if (!1 === re || !P)
                            throw new d(hr);
                        re = !0
                    }
                    re = re || !1;
                    const ye = vr(e, c, Dn)
                      , {signature: be} = c
                      , Se = (e => {
                        const {rawFilename: t, lastModDate: n, lastAccessDate: r, creationDate: s, level: i, zip64: o, zipCrypto: c, useUnicodeFileNames: l, dataDescriptor: u, directory: f, rawExtraField: d, encryptionStrength: p, extendedTimestamp: g, encrypted: m} = e;
                        let {version: y, compressionMethod: b} = e;
                        const S = !f && (i > 0 || i === G && 0 !== b);
                        let k, z, v, x;
                        if (m && !c) {
                            k = new w(Fr(mr) + 2);
                            const e = Rr(k);
                            Cr(e, 0, 39169),
                            Wr(k, mr, 2),
                            Ar(e, 8, p)
                        } else
                            k = new w;
                        if (g) {
                            v = new w(9 + (r ? 4 : 0) + (s ? 4 : 0));
                            const e = Rr(v);
                            Cr(e, 0, M),
                            Cr(e, 2, Fr(v) - 4),
                            x = 1 + (r ? 2 : 0) + (s ? 4 : 0),
                            Ar(e, 4, x);
                            let t = 5;
                            _r(e, t, a.floor(n.getTime() / 1e3)),
                            t += 4,
                            r && (_r(e, t, a.floor(r.getTime() / 1e3)),
                            t += 4),
                            s && _r(e, t, a.floor(s.getTime() / 1e3));
                            try {
                                z = new w(36);
                                const e = Rr(z)
                                  , t = zr(n);
                                Cr(e, 0, 10),
                                Cr(e, 2, 32),
                                Cr(e, 8, 1),
                                Cr(e, 10, 24),
                                Dr(e, 12, t),
                                Dr(e, 20, zr(r) || t),
                                Dr(e, 28, zr(s) || t)
                            } catch (e) {
                                z = new w
                            }
                        } else
                            z = v = new w;
                        let A = 0;
                        l && (A |= B),
                        u && (A |= 8),
                        b === G && (b = S ? 8 : 0),
                        8 == b && (i >= 1 && 3 > i && (A |= 6),
                        i >= 3 && 5 > i && (A |= 1),
                        9 === i && (A |= 2)),
                        o && (y = y > 45 ? y : 45),
                        m && (A |= 1,
                        c || (y = y > 51 ? y : 51,
                        k[9] = b,
                        b = 99));
                        const C = new w(26)
                          , _ = Rr(C);
                        Cr(_, 0, y),
                        Cr(_, 2, A),
                        Cr(_, 4, b);
                        const D = new h(1)
                          , W = Rr(D);
                        let R;
                        R = K > n ? K : n > Z ? Z : n,
                        Cr(W, 0, (R.getHours() << 6 | R.getMinutes()) << 5 | R.getSeconds() / 2),
                        Cr(W, 2, (R.getFullYear() - 1980 << 4 | R.getMonth() + 1) << 5 | R.getDate());
                        const F = D[0];
                        _r(_, 6, F),
                        Cr(_, 22, Fr(t));
                        const E = Fr(k, v, z, d);
                        Cr(_, 24, E);
                        const T = new w(30 + Fr(t) + E);
                        return _r(Rr(T), 0, L),
                        Wr(T, C, 4),
                        Wr(T, t, 30),
                        Wr(T, k, 30 + Fr(t)),
                        Wr(T, v, 30 + Fr(t, k)),
                        Wr(T, z, 30 + Fr(t, k, v)),
                        Wr(T, d, 30 + Fr(t, k, v, z)),
                        {
                            localHeaderArray: T,
                            headerArray: C,
                            headerView: _,
                            lastModDate: n,
                            rawLastModDate: F,
                            encrypted: m,
                            compressed: S,
                            version: y,
                            compressionMethod: b,
                            extraFieldExtendedTimestampFlag: x,
                            rawExtraFieldExtendedTimestamp: v,
                            rawExtraFieldNTFS: z,
                            rawExtraFieldAES: k,
                            extraFieldLength: E
                        }
                    }
                    )(c = n.assign({}, c, {
                        rawFilename: f,
                        rawComment: b,
                        version: S,
                        versionMadeBy: k,
                        lastModDate: z,
                        lastAccessDate: v,
                        creationDate: A,
                        rawExtraField: se,
                        zip64: re,
                        zip64UncompressedSize: pe,
                        zip64CompressedSize: he,
                        zip64Offset: ge,
                        zip64DiskNumberStart: me,
                        password: R,
                        rawPassword: F,
                        level: $ || e.config.CompressionStream !== G || e.config.CompressionStreamNative !== G ? H : 0,
                        useWebWorkers: X,
                        encryptionStrength: N,
                        extendedTimestamp: O,
                        zipCrypto: q,
                        bufferedWrite: Y,
                        keepOrder: P,
                        useUnicodeFileNames: Q,
                        dataDescriptor: ne,
                        dataDescriptorSignature: j,
                        signal: J,
                        msDosCompatible: C,
                        internalFileAttribute: _,
                        externalFileAttribute: D,
                        useCompressionStream: $,
                        passThrough: W,
                        encrypted: !!(R && Fr(R) || F && Fr(F)) || W && ye,
                        signature: be,
                        compressionMethod: ee
                    }))
                      , ke = (e => {
                        const {zip64: t, dataDescriptor: n, dataDescriptorSignature: r} = e;
                        let s, i = new w, a = 0;
                        return n && (i = new w(t ? r ? 24 : 20 : r ? 16 : 12),
                        s = Rr(i),
                        r && (a = 4,
                        _r(s, 0, I))),
                        {
                            dataDescriptorArray: i,
                            dataDescriptorView: s,
                            dataDescriptorOffset: a
                        }
                    }
                    )(c)
                      , ze = Fr(Se.localHeaderArray, ke.dataDescriptorArray);
                    let ve;
                    oe = ze + ae,
                    e.options.usdz && (oe += oe + 64),
                    e.pendingEntriesSize += oe;
                    try {
                        ve = await (async (e, r, s, a, o) => {
                            const {files: c, writer: l} = e
                              , {keepOrder: f, dataDescriptor: p, signal: h} = o
                              , {headerInfo: m} = a
                              , {usdz: b} = e.options
                              , S = t.from(c.values()).pop();
                            let k, z, v, A, C, _, D, W = {};
                            c.set(r, W);
                            try {
                                let t;
                                f && (t = S && S.lock,
                                W.lock = new y((e => v = e))),
                                !(o.bufferedWrite || e.writerLocked || e.bufferedWrites && f) && p || b ? (_ = l,
                                await R()) : (_ = new x,
                                D = new u(_.readable).blob(),
                                _.writable.size = 0,
                                k = !0,
                                e.bufferedWrites++,
                                await rn(l)),
                                await rn(_);
                                const {writable: m} = l;
                                let {diskOffset: z} = l;
                                if (e.addSplitZipSignature) {
                                    delete e.addSplitZipSignature;
                                    const t = new w(4);
                                    _r(Rr(t), 0, U),
                                    await kr(m, t),
                                    e.offset += 4
                                }
                                b && ( (e, t) => {
                                    const {headerInfo: n} = e;
                                    let {localHeaderArray: r, extraFieldLength: s} = n
                                      , i = Rr(r)
                                      , a = 64 - (t + Fr(r)) % 64;
                                    4 > a && (a += 64);
                                    const o = new w(a)
                                      , c = Rr(o);
                                    Cr(c, 0, 6534),
                                    Cr(c, 2, a - 2);
                                    const l = r;
                                    n.localHeaderArray = r = new w(Fr(l) + a),
                                    Wr(r, l),
                                    Wr(r, o, Fr(l)),
                                    i = Rr(r),
                                    Cr(i, 28, s + a),
                                    e.metadataSize += a
                                }
                                )(a, e.offset - z),
                                k || (await t,
                                await F(m));
                                const {diskNumber: T} = l;
                                if (C = !0,
                                W.diskNumberStart = T,
                                W = await (async (e, t, {diskNumberStart: r, lock: s}, a, o, c) => {
                                    const {headerInfo: l, dataDescriptorInfo: u, metadataSize: f} = a
                                      , {localHeaderArray: d, headerArray: p, lastModDate: h, rawLastModDate: g, encrypted: m, compressed: y, version: b, compressionMethod: S, rawExtraFieldExtendedTimestamp: k, extraFieldExtendedTimestampFlag: z, rawExtraFieldNTFS: v, rawExtraFieldAES: x} = l
                                      , {dataDescriptorArray: A} = u
                                      , {rawFilename: C, lastAccessDate: _, creationDate: D, password: W, rawPassword: R, level: F, zip64: T, zip64UncompressedSize: L, zip64CompressedSize: U, zip64Offset: I, zip64DiskNumberStart: N, zipCrypto: q, dataDescriptor: O, directory: P, versionMadeBy: H, rawComment: M, rawExtraField: B, useWebWorkers: V, onstart: Z, onprogress: K, onend: X, signal: Y, encryptionStrength: j, extendedTimestamp: J, msDosCompatible: Q, internalFileAttribute: $, externalFileAttribute: ee, useCompressionStream: ne, passThrough: re} = c
                                      , se = {
                                        lock: s,
                                        versionMadeBy: H,
                                        zip64: T,
                                        directory: !!P,
                                        filenameUTF8: !0,
                                        rawFilename: C,
                                        commentUTF8: !0,
                                        rawComment: M,
                                        rawExtraFieldExtendedTimestamp: k,
                                        rawExtraFieldNTFS: v,
                                        rawExtraFieldAES: x,
                                        rawExtraField: B,
                                        extendedTimestamp: J,
                                        msDosCompatible: Q,
                                        internalFileAttribute: $,
                                        externalFileAttribute: ee,
                                        diskNumberStart: r
                                    };
                                    let {signature: ie, uncompressedSize: ae} = c
                                      , oe = 0;
                                    re || (ae = 0);
                                    const {writable: ce} = t;
                                    if (e) {
                                        e.chunkSize = te(o),
                                        await kr(ce, d);
                                        const t = e.readable
                                          , n = t.size = e.size
                                          , r = {
                                            options: {
                                                codecType: ut,
                                                level: F,
                                                rawPassword: R,
                                                password: W,
                                                encryptionStrength: j,
                                                zipCrypto: m && q,
                                                passwordVerification: m && q && g >> 8 & 255,
                                                signed: !re,
                                                compressed: y && !re,
                                                encrypted: m && !re,
                                                useWebWorkers: V,
                                                useCompressionStream: ne,
                                                transferStreams: !1
                                            },
                                            config: o,
                                            streamOptions: {
                                                signal: Y,
                                                size: n,
                                                onstart: Z,
                                                onprogress: K,
                                                onend: X
                                            }
                                        }
                                          , s = await Ct({
                                            readable: t,
                                            writable: ce
                                        }, r);
                                        oe = s.outputSize,
                                        re || (ae = s.inputSize,
                                        ie = s.signature),
                                        ce.size += ae
                                    } else
                                        await kr(ce, d);
                                    let le;
                                    if (T) {
                                        let e = 4;
                                        L && (e += 8),
                                        U && (e += 8),
                                        I && (e += 8),
                                        N && (e += 4),
                                        le = new w(e)
                                    } else
                                        le = new w;
                                    return ( (e, t) => {
                                        const {signature: n, rawExtraFieldZip64: r, compressedSize: s, uncompressedSize: a, headerInfo: o, dataDescriptorInfo: c} = e
                                          , {headerView: l, encrypted: u} = o
                                          , {dataDescriptorView: f, dataDescriptorOffset: d} = c
                                          , {zip64: w, zip64UncompressedSize: p, zip64CompressedSize: h, zipCrypto: g, dataDescriptor: m} = t;
                                        if (u && !g || n === G || (_r(l, 10, n),
                                        m && _r(f, d, n)),
                                        w) {
                                            const e = Rr(r);
                                            Cr(e, 0, 1),
                                            Cr(e, 2, Fr(r) - 4);
                                            let t = 4;
                                            p && (_r(l, 18, E),
                                            Dr(e, t, i(a)),
                                            t += 8),
                                            h && (_r(l, 14, E),
                                            Dr(e, t, i(s))),
                                            m && (Dr(f, d + 4, i(s)),
                                            Dr(f, d + 12, i(a)))
                                        } else
                                            _r(l, 14, s),
                                            _r(l, 18, a),
                                            m && (_r(f, d + 4, s),
                                            _r(f, d + 8, a))
                                    }
                                    )({
                                        signature: ie,
                                        rawExtraFieldZip64: le,
                                        compressedSize: oe,
                                        uncompressedSize: ae,
                                        headerInfo: l,
                                        dataDescriptorInfo: u
                                    }, c),
                                    O && await kr(ce, A),
                                    n.assign(se, {
                                        uncompressedSize: ae,
                                        compressedSize: oe,
                                        lastModDate: h,
                                        rawLastModDate: g,
                                        creationDate: D,
                                        lastAccessDate: _,
                                        encrypted: m,
                                        zipCrypto: q,
                                        size: f + oe,
                                        compressionMethod: S,
                                        version: b,
                                        headerArray: p,
                                        signature: ie,
                                        rawExtraFieldZip64: le,
                                        extraFieldExtendedTimestampFlag: z,
                                        zip64UncompressedSize: L,
                                        zip64CompressedSize: U,
                                        zip64Offset: I,
                                        zip64DiskNumberStart: N
                                    }),
                                    se
                                }
                                )(s, _, W, a, e.config, o),
                                C = !1,
                                c.set(r, W),
                                W.filename = r,
                                k) {
                                    await _.writable.getWriter().close();
                                    let e = await D;
                                    await t,
                                    await R(),
                                    A = !0,
                                    p || (e = await (async (e, t, n, {zipCrypto: r}) => {
                                        let s;
                                        s = await t.slice(0, 26).arrayBuffer(),
                                        26 != s.byteLength && (s = s.slice(0, 26));
                                        const i = new g(s);
                                        return e.encrypted && !r || _r(i, 14, e.signature),
                                        e.zip64 ? (_r(i, 18, E),
                                        _r(i, 22, E)) : (_r(i, 18, e.compressedSize),
                                        _r(i, 22, e.uncompressedSize)),
                                        await kr(n, new w(s)),
                                        t.slice(s.byteLength)
                                    }
                                    )(W, e, m, o)),
                                    await F(m),
                                    W.diskNumberStart = l.diskNumber,
                                    z = l.diskOffset,
                                    await e.stream().pipeTo(m, {
                                        preventClose: !0,
                                        preventAbort: !0,
                                        signal: h
                                    }),
                                    m.size += e.size,
                                    A = !1
                                }
                                if (W.offset = e.offset - z,
                                W.zip64)
                                    ( (e, t) => {
                                        const {rawExtraFieldZip64: n, offset: r, diskNumberStart: s} = e
                                          , {zip64UncompressedSize: a, zip64CompressedSize: o, zip64Offset: c, zip64DiskNumberStart: l} = t
                                          , u = Rr(n);
                                        let f = 4;
                                        a && (f += 8),
                                        o && (f += 8),
                                        c && (Dr(u, f, i(r)),
                                        f += 8),
                                        l && _r(u, f, s)
                                    }
                                    )(W, o);
                                else if (W.offset > E)
                                    throw new d(hr);
                                return e.offset += W.size,
                                W
                            } catch (t) {
                                if (k && A || !k && C) {
                                    if (e.hasCorruptedEntries = !0,
                                    t)
                                        try {
                                            t.corruptedEntry = !0
                                        } catch (e) {}
                                    k ? e.offset += _.writable.size : e.offset = _.writable.size
                                }
                                throw c.delete(r),
                                t
                            } finally {
                                k && e.bufferedWrites--,
                                v && v(),
                                z && z()
                            }
                            async function R() {
                                e.writerLocked = !0;
                                const {lockWriter: t} = e;
                                e.lockWriter = new y((t => z = () => {
                                    e.writerLocked = !1,
                                    t()
                                }
                                )),
                                await t
                            }
                            async function F(e) {
                                Fr(m.localHeaderArray) > l.availableSize && (l.availableSize = 0,
                                await kr(e, new w))
                            }
                        }
                        )(e, r, s, {
                            headerInfo: Se,
                            dataDescriptorInfo: ke,
                            metadataSize: ze
                        }, c)
                    } finally {
                        e.pendingEntriesSize -= oe
                    }
                    return n.assign(ve, {
                        name: r,
                        comment: m,
                        extraField: ie
                    }),
                    new Tn(ve)
                }
                )(c, e, r, s),
                l.add(m),
                await m
            } catch (t) {
                throw c.filenames.delete(e),
                t
            } finally {
                l.delete(m);
                const e = br.shift();
                e ? e() : yr--
            }
        }
        async close(e=new w, n={}) {
            const {pendingAddFileCalls: r, writer: s} = this
              , {writable: o} = s;
            for (; r.size; )
                await y.allSettled(t.from(r));
            return await (async (e, n, r) => {
                const {files: s, writer: o} = e
                  , {diskOffset: c, writable: l} = o;
                let {diskNumber: u} = o
                  , f = 0
                  , p = 0
                  , h = e.offset - c
                  , g = s.size;
                for (const [,e] of s) {
                    const {rawFilename: t, rawExtraFieldZip64: n, rawExtraFieldAES: r, rawComment: s, rawExtraFieldNTFS: i, rawExtraField: o, extendedTimestamp: c, extraFieldExtendedTimestampFlag: l, lastModDate: u} = e;
                    let f;
                    if (c) {
                        f = new w(9);
                        const e = Rr(f);
                        Cr(e, 0, M),
                        Cr(e, 2, 5),
                        Ar(e, 4, l),
                        _r(e, 5, a.floor(u.getTime() / 1e3))
                    } else
                        f = new w;
                    e.rawExtraFieldCDExtendedTimestamp = f,
                    p += 46 + Fr(t, s, n, r, i, f, o)
                }
                const m = new w(p)
                  , y = Rr(m);
                await rn(o);
                let b = 0;
                for (const [e,n] of t.from(s.values()).entries()) {
                    const {offset: t, rawFilename: i, rawExtraFieldZip64: a, rawExtraFieldAES: c, rawExtraFieldCDExtendedTimestamp: u, rawExtraFieldNTFS: d, rawExtraField: w, rawComment: p, versionMadeBy: h, headerArray: g, directory: S, zip64: k, zip64UncompressedSize: z, zip64CompressedSize: v, zip64DiskNumberStart: x, zip64Offset: A, msDosCompatible: C, internalFileAttribute: _, externalFileAttribute: D, diskNumberStart: W, uncompressedSize: R, compressedSize: F} = n
                      , L = Fr(a, c, u, d, w);
                    _r(y, f, N),
                    Cr(y, f + 4, h);
                    const U = Rr(g);
                    z || _r(U, 18, R),
                    v || _r(U, 14, F),
                    Wr(m, g, f + 6),
                    Cr(y, f + 30, L),
                    Cr(y, f + 32, Fr(p)),
                    Cr(y, f + 34, k && x ? T : W),
                    Cr(y, f + 36, _),
                    D ? _r(y, f + 38, D) : S && C && Ar(y, f + 38, 16),
                    _r(y, f + 42, k && A ? E : t),
                    Wr(m, i, f + 46),
                    Wr(m, a, f + 46 + Fr(i)),
                    Wr(m, c, f + 46 + Fr(i, a)),
                    Wr(m, u, f + 46 + Fr(i, a, c)),
                    Wr(m, d, f + 46 + Fr(i, a, c, u)),
                    Wr(m, w, f + 46 + Fr(i, a, c, u, d)),
                    Wr(m, p, f + 46 + Fr(i) + L);
                    const I = 46 + Fr(i, p) + L;
                    if (f - b > o.availableSize && (o.availableSize = 0,
                    await kr(l, m.slice(b, f)),
                    b = f),
                    f += I,
                    r.onprogress)
                        try {
                            await r.onprogress(e + 1, s.size, new Tn(n))
                        } catch (e) {}
                }
                await kr(l, b ? m.slice(b) : m);
                let S = o.diskNumber;
                const {availableSize: k} = o;
                H > k && S++;
                let z = vr(e, r, _n);
                if (h > E || p > E || g > T || S > T) {
                    if (!1 === z)
                        throw new d(hr);
                    z = !0
                }
                const v = new w(z ? 98 : H)
                  , x = Rr(v);
                f = 0,
                z && (_r(x, 0, O),
                Dr(x, 4, i(44)),
                Cr(x, 12, 45),
                Cr(x, 14, 45),
                _r(x, 16, S),
                _r(x, 20, u),
                Dr(x, 24, i(g)),
                Dr(x, 32, i(g)),
                Dr(x, 40, i(p)),
                Dr(x, 48, i(h)),
                _r(x, 56, P),
                Dr(x, 64, i(h) + i(p)),
                _r(x, 72, S + 1),
                vr(e, r, "supportZip64SplitFile", !0) && (S = T,
                u = T),
                g = T,
                h = E,
                p = E,
                f += 76),
                _r(x, f, q),
                Cr(x, f + 4, S),
                Cr(x, f + 6, u),
                Cr(x, f + 8, g),
                Cr(x, f + 10, g),
                _r(x, f + 12, p),
                _r(x, f + 16, h);
                const A = Fr(n);
                if (A) {
                    if (A > T)
                        throw new d(cr);
                    Cr(x, f + 20, A)
                }
                await kr(l, v),
                A && await kr(l, n)
            }
            )(this, e, n),
            vr(this, n, "preventClose") || await o.getWriter().close(),
            s.getData ? s.getData() : o
        }
    }
    async function kr(e, t) {
        const n = e.getWriter();
        try {
            await n.ready,
            e.size += Fr(t),
            await n.write(t)
        } finally {
            n.releaseLock()
        }
    }
    function zr(e) {
        if (e)
            return (i(e.getTime()) + i(116444736e5)) * i(1e4)
    }
    function vr(e, t, n, r) {
        const s = t[n] === G ? e.options[n] : t[n];
        return s === G ? r : s
    }
    function xr(e) {
        return e + 5 * (a.floor(e / 16383) + 1)
    }
    function Ar(e, t, n) {
        e.setUint8(t, n)
    }
    function Cr(e, t, n) {
        e.setUint16(t, n, !0)
    }
    function _r(e, t, n) {
        e.setUint32(t, n, !0)
    }
    function Dr(e, t, n) {
        e.setBigUint64(t, n, !0)
    }
    function Wr(e, t, n) {
        e.set(t, n)
    }
    function Rr(e) {
        return new g(e.buffer)
    }
    function Fr(...e) {
        let t = 0;
        return e.forEach((e => e && (t += e.length))),
        t
    }
    let Er;
    try {
        Er = void 0 === k && "undefined" == typeof location ? require("url").pathToFileURL(__filename).href : void 0 === k ? location.href : F && "SCRIPT" === F.tagName.toUpperCase() && F.src || new f("zip.min.js",k.baseURI).href
    } catch (e) {}
    ne({
        baseURL: Er
    }),
    ( (e, t={}) => {
        const n = 'const{Array:e,Object:t,Number:n,Math:r,Error:s,Uint8Array:i,Uint16Array:o,Uint32Array:c,Int32Array:f,Map:a,DataView:l,Promise:u,TextEncoder:w,crypto:h,postMessage:d,TransformStream:p,ReadableStream:y,WritableStream:m,CompressionStream:b,DecompressionStream:g}=self,k=void 0,v="undefined",S="function";class z{constructor(e){return class extends p{constructor(t,n){const r=new e(n);super({transform(e,t){t.enqueue(r.append(e))},flush(e){const t=r.flush();t&&e.enqueue(t)}})}}}}const C=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;C[e]=t}class x{constructor(e){this.t=e||-1}append(e){let t=0|this.t;for(let n=0,r=0|e.length;r>n;n++)t=t>>>8^C[255&(t^e[n])];this.t=t}get(){return~this.t}}class A extends p{constructor(){let e;const t=new x;super({transform(e,n){t.append(e),n.enqueue(e)},flush(){const n=new i(4);new l(n.buffer).setUint32(0,t.get()),e.value=n}}),e=this}}const _={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const n=e[e.length-1],r=_.i(n);return 32===r?e.concat(t):_.o(t,r,0|n,e.slice(0,e.length-1))},l(e){const t=e.length;if(0===t)return 0;const n=e[t-1];return 32*(t-1)+_.i(n)},u(e,t){if(32*e.length<t)return e;const n=(e=e.slice(0,r.ceil(t/32))).length;return t&=31,n>0&&t&&(e[n-1]=_.h(t,e[n-1]&2147483648>>t-1,1)),e},h:(e,t,n)=>32===e?t:(n?0|t:t<<32-e)+1099511627776*e,i:e=>r.round(e/1099511627776)||32,o(e,t,n,r){for(void 0===r&&(r=[]);t>=32;t-=32)r.push(n),n=0;if(0===t)return r.concat(e);for(let s=0;s<e.length;s++)r.push(n|e[s]>>>t),n=e[s]<<32-t;const s=e.length?e[e.length-1]:0,i=_.i(s);return r.push(_.h(t+i&31,t+i>32?n:r.pop(),1)),r}},I={bytes:{p(e){const t=_.l(e)/8,n=new i(t);let r;for(let s=0;t>s;s++)3&s||(r=e[s/4]),n[s]=r>>>24,r<<=8;return n},m(e){const t=[];let n,r=0;for(n=0;n<e.length;n++)r=r<<8|e[n],3&~n||(t.push(r),r=0);return 3&n&&t.push(_.h(8*(3&n),r)),t}}},P=class{constructor(e){const t=this;t.blockSize=512,t.k=[1732584193,4023233417,2562383102,271733878,3285377520],t.v=[1518500249,1859775393,2400959708,3395469782],e?(t.S=e.S.slice(0),t.C=e.C.slice(0),t.A=e.A):t.reset()}reset(){const e=this;return e.S=e.k.slice(0),e.C=[],e.A=0,e}update(e){const t=this;"string"==typeof e&&(e=I._.m(e));const n=t.C=_.concat(t.C,e),r=t.A,i=t.A=r+_.l(e);if(i>9007199254740991)throw new s("Cannot hash more than 2^53 - 1 bits");const o=new c(n);let f=0;for(let e=t.blockSize+r-(t.blockSize+r&t.blockSize-1);i>=e;e+=t.blockSize)t.I(o.subarray(16*f,16*(f+1))),f+=1;return n.splice(0,16*f),t}P(){const e=this;let t=e.C;const n=e.S;t=_.concat(t,[_.h(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(r.floor(e.A/4294967296)),t.push(0|e.A);t.length;)e.I(t.splice(0,16));return e.reset(),n}D(e,t,n,r){return e>19?e>39?e>59?e>79?void 0:t^n^r:t&n|t&r|n&r:t^n^r:t&n|~t&r}V(e,t){return t<<e|t>>>32-e}I(t){const n=this,s=n.S,i=e(80);for(let e=0;16>e;e++)i[e]=t[e];let o=s[0],c=s[1],f=s[2],a=s[3],l=s[4];for(let e=0;79>=e;e++){16>e||(i[e]=n.V(1,i[e-3]^i[e-8]^i[e-14]^i[e-16]));const t=n.V(5,o)+n.D(e,c,f,a)+l+i[e]+n.v[r.floor(e/20)]|0;l=a,a=f,f=n.V(30,c),c=o,o=t}s[0]=s[0]+o|0,s[1]=s[1]+c|0,s[2]=s[2]+f|0,s[3]=s[3]+a|0,s[4]=s[4]+l|0}},D={getRandomValues(e){const t=new c(e.buffer),n=e=>{let t=987654321;const n=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&n,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&n)&n)/4294967296+.5)*(r.random()>.5?1:-1))};for(let s,i=0;i<e.length;i+=4){const e=n(4294967296*(s||r.random()));s=987654071*e(),t[i/4]=4294967296*e()|0}return e}},V={importKey:e=>new V.R(I.bytes.m(e)),B(e,t,n,r){if(n=n||1e4,0>r||0>n)throw new s("invalid params to pbkdf2");const i=1+(r>>5)<<2;let o,c,f,a,u;const w=new ArrayBuffer(i),h=new l(w);let d=0;const p=_;for(t=I.bytes.m(t),u=1;(i||1)>d;u++){for(o=c=e.encrypt(p.concat(t,[u])),f=1;n>f;f++)for(c=e.encrypt(c),a=0;a<c.length;a++)o[a]^=c[a];for(f=0;(i||1)>d&&f<o.length;f++)h.setInt32(d,o[f]),d+=4}return w.slice(0,r/8)},R:class{constructor(e){const t=this,n=t.M=P,r=[[],[]];t.U=[new n,new n];const s=t.U[0].blockSize/32;e.length>s&&(e=(new n).update(e).P());for(let t=0;s>t;t++)r[0][t]=909522486^e[t],r[1][t]=1549556828^e[t];t.U[0].update(r[0]),t.U[1].update(r[1]),t.K=new n(t.U[0])}reset(){const e=this;e.K=new e.M(e.U[0]),e.N=!1}update(e){this.N=!0,this.K.update(e)}digest(){const e=this,t=e.K.P(),n=new e.M(e.U[1]).update(t).P();return e.reset(),n}encrypt(e){if(this.N)throw new s("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},R=typeof h!=v&&typeof h.getRandomValues==S,B="Invalid password",E="Invalid signature",M="zipjs-abort-check-password";function U(e){return R?h.getRandomValues(e):D.getRandomValues(e)}const K=16,N={name:"PBKDF2"},O=t.assign({hash:{name:"HMAC"}},N),T=t.assign({iterations:1e3,hash:{name:"SHA-1"}},N),W=["deriveBits"],j=[8,12,16],H=[16,24,32],L=10,F=[0,0,0,0],q=typeof h!=v,G=q&&h.subtle,J=q&&typeof G!=v,Q=I.bytes,X=class{constructor(e){const t=this;t.O=[[[],[],[],[],[]],[[],[],[],[],[]]],t.O[0][0][0]||t.T();const n=t.O[0][4],r=t.O[1],i=e.length;let o,c,f,a=1;if(4!==i&&6!==i&&8!==i)throw new s("invalid aes key size");for(t.v=[c=e.slice(0),f=[]],o=i;4*i+28>o;o++){let e=c[o-1];(o%i==0||8===i&&o%i==4)&&(e=n[e>>>24]<<24^n[e>>16&255]<<16^n[e>>8&255]<<8^n[255&e],o%i==0&&(e=e<<8^e>>>24^a<<24,a=a<<1^283*(a>>7))),c[o]=c[o-i]^e}for(let e=0;o;e++,o--){const t=c[3&e?o:o-4];f[e]=4>=o||4>e?t:r[0][n[t>>>24]]^r[1][n[t>>16&255]]^r[2][n[t>>8&255]]^r[3][n[255&t]]}}encrypt(e){return this.W(e,0)}decrypt(e){return this.W(e,1)}T(){const e=this.O[0],t=this.O[1],n=e[4],r=t[4],s=[],i=[];let o,c,f,a;for(let e=0;256>e;e++)i[(s[e]=e<<1^283*(e>>7))^e]=e;for(let l=o=0;!n[l];l^=c||1,o=i[o]||1){let i=o^o<<1^o<<2^o<<3^o<<4;i=i>>8^255&i^99,n[l]=i,r[i]=l,a=s[f=s[c=s[l]]];let u=16843009*a^65537*f^257*c^16843008*l,w=257*s[i]^16843008*i;for(let n=0;4>n;n++)e[n][l]=w=w<<24^w>>>8,t[n][i]=u=u<<24^u>>>8}for(let n=0;5>n;n++)e[n]=e[n].slice(0),t[n]=t[n].slice(0)}W(e,t){if(4!==e.length)throw new s("invalid aes block size");const n=this.v[t],r=n.length/4-2,i=[0,0,0,0],o=this.O[t],c=o[0],f=o[1],a=o[2],l=o[3],u=o[4];let w,h,d,p=e[0]^n[0],y=e[t?3:1]^n[1],m=e[2]^n[2],b=e[t?1:3]^n[3],g=4;for(let e=0;r>e;e++)w=c[p>>>24]^f[y>>16&255]^a[m>>8&255]^l[255&b]^n[g],h=c[y>>>24]^f[m>>16&255]^a[b>>8&255]^l[255&p]^n[g+1],d=c[m>>>24]^f[b>>16&255]^a[p>>8&255]^l[255&y]^n[g+2],b=c[b>>>24]^f[p>>16&255]^a[y>>8&255]^l[255&m]^n[g+3],g+=4,p=w,y=h,m=d;for(let e=0;4>e;e++)i[t?3&-e:e]=u[p>>>24]<<24^u[y>>16&255]<<16^u[m>>8&255]<<8^u[255&b]^n[g++],w=p,p=y,y=m,m=b,b=w;return i}},Y=class{constructor(e,t){this.j=e,this.H=t,this.L=t}reset(){this.L=this.H}update(e){return this.F(this.j,e,this.L)}q(e){if(255&~(e>>24))e+=1<<24;else{let t=e>>16&255,n=e>>8&255,r=255&e;255===t?(t=0,255===n?(n=0,255===r?r=0:++r):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=r}return e}G(e){0===(e[0]=this.q(e[0]))&&(e[1]=this.q(e[1]))}F(e,t,n){let r;if(!(r=t.length))return[];const s=_.l(t);for(let s=0;r>s;s+=4){this.G(n);const r=e.encrypt(n);t[s]^=r[0],t[s+1]^=r[1],t[s+2]^=r[2],t[s+3]^=r[3]}return _.u(t,s)}},Z=V.R;let $=q&&J&&typeof G.importKey==S,ee=q&&J&&typeof G.deriveBits==S;class te extends p{constructor({password:e,rawPassword:n,signed:r,encryptionStrength:o,checkPasswordOnly:c}){super({start(){t.assign(this,{ready:new u((e=>this.J=e)),password:ie(e,n),signed:r,X:o-1,pending:new i})},async transform(e,t){const n=this,{password:r,X:o,J:f,ready:a}=n;r?(await(async(e,t,n,r)=>{const i=await se(e,t,n,ce(r,0,j[t])),o=ce(r,j[t]);if(i[0]!=o[0]||i[1]!=o[1])throw new s(B)})(n,o,r,ce(e,0,j[o]+2)),e=ce(e,j[o]+2),c?t.error(new s(M)):f()):await a;const l=new i(e.length-L-(e.length-L)%K);t.enqueue(re(n,e,l,0,L,!0))},async flush(e){const{signed:t,Y:n,Z:r,pending:o,ready:c}=this;if(r&&n){await c;const f=ce(o,0,o.length-L),a=ce(o,o.length-L);let l=new i;if(f.length){const e=ae(Q,f);r.update(e);const t=n.update(e);l=fe(Q,t)}if(t){const e=ce(fe(Q,r.digest()),0,L);for(let t=0;L>t;t++)if(e[t]!=a[t])throw new s(E)}e.enqueue(l)}}})}}class ne extends p{constructor({password:e,rawPassword:n,encryptionStrength:r}){let s;super({start(){t.assign(this,{ready:new u((e=>this.J=e)),password:ie(e,n),X:r-1,pending:new i})},async transform(e,t){const n=this,{password:r,X:s,J:o,ready:c}=n;let f=new i;r?(f=await(async(e,t,n)=>{const r=U(new i(j[t]));return oe(r,await se(e,t,n,r))})(n,s,r),o()):await c;const a=new i(f.length+e.length-e.length%K);a.set(f,0),t.enqueue(re(n,e,a,f.length,0))},async flush(e){const{Y:t,Z:n,pending:r,ready:o}=this;if(n&&t){await o;let c=new i;if(r.length){const e=t.update(ae(Q,r));n.update(e),c=fe(Q,e)}s.signature=fe(Q,n.digest()).slice(0,L),e.enqueue(oe(c,s.signature))}}}),s=this}}function re(e,t,n,r,s,o){const{Y:c,Z:f,pending:a}=e,l=t.length-s;let u;for(a.length&&(t=oe(a,t),n=((e,t)=>{if(t&&t>e.length){const n=e;(e=new i(t)).set(n,0)}return e})(n,l-l%K)),u=0;l-K>=u;u+=K){const e=ae(Q,ce(t,u,u+K));o&&f.update(e);const s=c.update(e);o||f.update(s),n.set(fe(Q,s),u+r)}return e.pending=ce(t,u),n}async function se(n,r,s,o){n.password=null;const c=await(async(e,t,n,r,s)=>{if(!$)return V.importKey(t);try{return await G.importKey("raw",t,n,!1,s)}catch(e){return $=!1,V.importKey(t)}})(0,s,O,0,W),f=await(async(e,t,n)=>{if(!ee)return V.B(t,e.salt,T.iterations,n);try{return await G.deriveBits(e,t,n)}catch(r){return ee=!1,V.B(t,e.salt,T.iterations,n)}})(t.assign({salt:o},T),c,8*(2*H[r]+2)),a=new i(f),l=ae(Q,ce(a,0,H[r])),u=ae(Q,ce(a,H[r],2*H[r])),w=ce(a,2*H[r]);return t.assign(n,{keys:{key:l,$:u,passwordVerification:w},Y:new Y(new X(l),e.from(F)),Z:new Z(u)}),w}function ie(e,t){return t===k?(e=>{if(typeof w==v){const t=new i((e=unescape(encodeURIComponent(e))).length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return t}return(new w).encode(e)})(e):t}function oe(e,t){let n=e;return e.length+t.length&&(n=new i(e.length+t.length),n.set(e,0),n.set(t,e.length)),n}function ce(e,t,n){return e.subarray(t,n)}function fe(e,t){return e.p(t)}function ae(e,t){return e.m(t)}class le extends p{constructor({password:e,passwordVerification:n,checkPasswordOnly:r}){super({start(){t.assign(this,{password:e,passwordVerification:n}),de(this,e)},transform(e,t){const n=this;if(n.password){const t=we(n,e.subarray(0,12));if(n.password=null,t[11]!=n.passwordVerification)throw new s(B);e=e.subarray(12)}r?t.error(new s(M)):t.enqueue(we(n,e))}})}}class ue extends p{constructor({password:e,passwordVerification:n}){super({start(){t.assign(this,{password:e,passwordVerification:n}),de(this,e)},transform(e,t){const n=this;let r,s;if(n.password){n.password=null;const t=U(new i(12));t[11]=n.passwordVerification,r=new i(e.length+t.length),r.set(he(n,t),0),s=12}else r=new i(e.length),s=0;r.set(he(n,e),s),t.enqueue(r)}})}}function we(e,t){const n=new i(t.length);for(let r=0;r<t.length;r++)n[r]=ye(e)^t[r],pe(e,n[r]);return n}function he(e,t){const n=new i(t.length);for(let r=0;r<t.length;r++)n[r]=ye(e)^t[r],pe(e,t[r]);return n}function de(e,n){const r=[305419896,591751049,878082192];t.assign(e,{keys:r,ee:new x(r[0]),te:new x(r[2])});for(let t=0;t<n.length;t++)pe(e,n.charCodeAt(t))}function pe(e,t){let[n,s,i]=e.keys;e.ee.append([t]),n=~e.ee.get(),s=be(r.imul(be(s+me(n)),134775813)+1),e.te.append([s>>>24]),i=~e.te.get(),e.keys=[n,s,i]}function ye(e){const t=2|e.keys[2];return me(r.imul(t,1^t)>>>8)}function me(e){return 255&e}function be(e){return 4294967295&e}const ge="deflate-raw";class ke extends p{constructor(e,{chunkSize:t,CompressionStream:n,CompressionStreamNative:r}){super({});const{compressed:s,encrypted:i,useCompressionStream:o,zipCrypto:c,signed:f,level:a}=e,u=this;let w,h,d=Se(super.readable);i&&!c||!f||(w=new A,d=xe(d,w)),s&&(d=Ce(d,o,{level:a,chunkSize:t},r,n)),i&&(c?d=xe(d,new ue(e)):(h=new ne(e),d=xe(d,h))),ze(u,d,(()=>{let e;i&&!c&&(e=h.signature),i&&!c||!f||(e=new l(w.value.buffer).getUint32(0)),u.signature=e}))}}class ve extends p{constructor(e,{chunkSize:t,DecompressionStream:n,DecompressionStreamNative:r}){super({});const{zipCrypto:i,encrypted:o,signed:c,signature:f,compressed:a,useCompressionStream:u}=e;let w,h,d=Se(super.readable);o&&(i?d=xe(d,new le(e)):(h=new te(e),d=xe(d,h))),a&&(d=Ce(d,u,{chunkSize:t},r,n)),o&&!i||!c||(w=new A,d=xe(d,w)),ze(this,d,(()=>{if((!o||i)&&c){const e=new l(w.value.buffer);if(f!=e.getUint32(0,!1))throw new s(E)}}))}}function Se(e){return xe(e,new p({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function ze(e,n,r){n=xe(n,new p({flush:r})),t.defineProperty(e,"readable",{get:()=>n})}function Ce(e,t,n,r,s){try{e=xe(e,new(t&&r?r:s)(ge,n))}catch(r){if(!t)return e;try{e=xe(e,new s(ge,n))}catch(t){return e}}return e}function xe(e,t){return e.pipeThrough(t)}const Ae="data",_e="close";class Ie extends p{constructor(e,n){super({});const r=this,{codecType:s}=e;let i;s.startsWith("deflate")?i=ke:s.startsWith("inflate")&&(i=ve);let o=0,c=0;const f=new i(e,n),a=super.readable,l=new p({transform(e,t){e&&e.length&&(c+=e.length,t.enqueue(e))},flush(){t.assign(r,{inputSize:c})}}),u=new p({transform(e,t){e&&e.length&&(o+=e.length,t.enqueue(e))},flush(){const{signature:e}=f;t.assign(r,{signature:e,outputSize:o,inputSize:c})}});t.defineProperty(r,"readable",{get:()=>a.pipeThrough(l).pipeThrough(f).pipeThrough(u)})}}class Pe extends p{constructor(e){let t;super({transform:function n(r,s){if(t){const e=new i(t.length+r.length);e.set(t),e.set(r,t.length),r=e,t=null}r.length>e?(s.enqueue(r.slice(0,e)),n(r.slice(e),s)):t=r},flush(e){t&&t.length&&e.enqueue(t)}})}}const De=new a,Ve=new a;let Re,Be=0,Ee=!0;async function Me(e){try{const{options:t,scripts:r,config:s}=e;if(r&&r.length)try{Ee?importScripts.apply(k,r):await Ue(r)}catch(e){Ee=!1,await Ue(r)}self.initCodec&&self.initCodec(),s.CompressionStreamNative=self.CompressionStream,s.DecompressionStreamNative=self.DecompressionStream,self.Deflate&&(s.CompressionStream=new z(self.Deflate)),self.Inflate&&(s.DecompressionStream=new z(self.Inflate));const i={highWaterMark:1},o=e.readable||new y({async pull(e){const t=new u((e=>De.set(Be,e)));Ke({type:"pull",messageId:Be}),Be=(Be+1)%n.MAX_SAFE_INTEGER;const{value:r,done:s}=await t;e.enqueue(r),s&&e.close()}},i),c=e.writable||new m({async write(e){let t;const r=new u((e=>t=e));Ve.set(Be,t),Ke({type:Ae,value:e,messageId:Be}),Be=(Be+1)%n.MAX_SAFE_INTEGER,await r}},i),f=new Ie(t,s);Re=new AbortController;const{signal:a}=Re;await o.pipeThrough(f).pipeThrough(new Pe(s.chunkSize)).pipeTo(c,{signal:a,preventClose:!0,preventAbort:!0}),await c.getWriter().close();const{signature:l,inputSize:w,outputSize:h}=f;Ke({type:_e,result:{signature:l,inputSize:w,outputSize:h}})}catch(e){Ne(e)}}async function Ue(e){for(const t of e)await import(t)}function Ke(e){let{value:t}=e;if(t)if(t.length)try{t=new i(t),e.value=t.buffer,d(e,[e.value])}catch(t){d(e)}else d(e);else d(e)}function Ne(e=new s("Unknown error")){const{message:t,stack:n,code:r,name:i}=e;d({error:{message:t,stack:n,code:r,name:i}})}addEventListener("message",(({data:e})=>{const{type:t,messageId:n,value:r,done:s}=e;try{if("start"==t&&Me(e),t==Ae){const e=De.get(n);De.delete(n),e({value:new i(r),done:s})}if("ack"==t){const e=Ve.get(n);Ve.delete(n),e()}t==_e&&Re.abort()}catch(e){Ne(e)}}));const Oe=-2;function Te(t){return We(t.map((([t,n])=>new e(t).fill(n,0,t))))}function We(t){return t.reduce(((t,n)=>t.concat(e.isArray(n)?We(n):n)),[])}const je=[0,1,2,3].concat(...Te([[2,4],[2,5],[4,6],[4,7],[8,8],[8,9],[16,10],[16,11],[32,12],[32,13],[64,14],[64,15],[2,0],[1,16],[1,17],[2,18],[2,19],[4,20],[4,21],[8,22],[8,23],[16,24],[16,25],[32,26],[32,27],[64,28],[64,29]]));function He(){const e=this;function t(e,t){let n=0;do{n|=1&e,e>>>=1,n<<=1}while(--t>0);return n>>>1}e.ne=n=>{const s=e.re,i=e.ie.se,o=e.ie.oe;let c,f,a,l=-1;for(n.ce=0,n.fe=573,c=0;o>c;c++)0!==s[2*c]?(n.ae[++n.ce]=l=c,n.le[c]=0):s[2*c+1]=0;for(;2>n.ce;)a=n.ae[++n.ce]=2>l?++l:0,s[2*a]=1,n.le[a]=0,n.ue--,i&&(n.we-=i[2*a+1]);for(e.he=l,c=r.floor(n.ce/2);c>=1;c--)n.de(s,c);a=o;do{c=n.ae[1],n.ae[1]=n.ae[n.ce--],n.de(s,1),f=n.ae[1],n.ae[--n.fe]=c,n.ae[--n.fe]=f,s[2*a]=s[2*c]+s[2*f],n.le[a]=r.max(n.le[c],n.le[f])+1,s[2*c+1]=s[2*f+1]=a,n.ae[1]=a++,n.de(s,1)}while(n.ce>=2);n.ae[--n.fe]=n.ae[1],(t=>{const n=e.re,r=e.ie.se,s=e.ie.pe,i=e.ie.ye,o=e.ie.me;let c,f,a,l,u,w,h=0;for(l=0;15>=l;l++)t.be[l]=0;for(n[2*t.ae[t.fe]+1]=0,c=t.fe+1;573>c;c++)f=t.ae[c],l=n[2*n[2*f+1]+1]+1,l>o&&(l=o,h++),n[2*f+1]=l,f>e.he||(t.be[l]++,u=0,i>f||(u=s[f-i]),w=n[2*f],t.ue+=w*(l+u),r&&(t.we+=w*(r[2*f+1]+u)));if(0!==h){do{for(l=o-1;0===t.be[l];)l--;t.be[l]--,t.be[l+1]+=2,t.be[o]--,h-=2}while(h>0);for(l=o;0!==l;l--)for(f=t.be[l];0!==f;)a=t.ae[--c],a>e.he||(n[2*a+1]!=l&&(t.ue+=(l-n[2*a+1])*n[2*a],n[2*a+1]=l),f--)}})(n),((e,n,r)=>{const s=[];let i,o,c,f=0;for(i=1;15>=i;i++)s[i]=f=f+r[i-1]<<1;for(o=0;n>=o;o++)c=e[2*o+1],0!==c&&(e[2*o]=t(s[c]++,c))})(s,e.he,n.be)}}function Le(e,t,n,r,s){const i=this;i.se=e,i.pe=t,i.ye=n,i.oe=r,i.me=s}He.ge=[0,1,2,3,4,5,6,7].concat(...Te([[2,8],[2,9],[2,10],[2,11],[4,12],[4,13],[4,14],[4,15],[8,16],[8,17],[8,18],[8,19],[16,20],[16,21],[16,22],[16,23],[32,24],[32,25],[32,26],[31,27],[1,28]])),He.ke=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],He.ve=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],He.Se=e=>256>e?je[e]:je[256+(e>>>7)],He.ze=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],He.Ce=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],He.xe=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],He.Ae=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];const Fe=Te([[144,8],[112,9],[24,7],[8,8]]);Le._e=We([12,140,76,204,44,172,108,236,28,156,92,220,60,188,124,252,2,130,66,194,34,162,98,226,18,146,82,210,50,178,114,242,10,138,74,202,42,170,106,234,26,154,90,218,58,186,122,250,6,134,70,198,38,166,102,230,22,150,86,214,54,182,118,246,14,142,78,206,46,174,110,238,30,158,94,222,62,190,126,254,1,129,65,193,33,161,97,225,17,145,81,209,49,177,113,241,9,137,73,201,41,169,105,233,25,153,89,217,57,185,121,249,5,133,69,197,37,165,101,229,21,149,85,213,53,181,117,245,13,141,77,205,45,173,109,237,29,157,93,221,61,189,125,253,19,275,147,403,83,339,211,467,51,307,179,435,115,371,243,499,11,267,139,395,75,331,203,459,43,299,171,427,107,363,235,491,27,283,155,411,91,347,219,475,59,315,187,443,123,379,251,507,7,263,135,391,71,327,199,455,39,295,167,423,103,359,231,487,23,279,151,407,87,343,215,471,55,311,183,439,119,375,247,503,15,271,143,399,79,335,207,463,47,303,175,431,111,367,239,495,31,287,159,415,95,351,223,479,63,319,191,447,127,383,255,511,0,64,32,96,16,80,48,112,8,72,40,104,24,88,56,120,4,68,36,100,20,84,52,116,3,131,67,195,35,163,99,227].map(((e,t)=>[e,Fe[t]])));const qe=Te([[30,5]]);function Ge(e,t,n,r,s){const i=this;i.Ie=e,i.Pe=t,i.De=n,i.Ve=r,i.Re=s}Le.Be=We([0,16,8,24,4,20,12,28,2,18,10,26,6,22,14,30,1,17,9,25,5,21,13,29,3,19,11,27,7,23].map(((e,t)=>[e,qe[t]]))),Le.Ee=new Le(Le._e,He.ze,257,286,15),Le.Me=new Le(Le.Be,He.Ce,0,30,15),Le.Ue=new Le(null,He.xe,0,19,7);const Je=[new Ge(0,0,0,0,0),new Ge(4,4,8,4,1),new Ge(4,5,16,8,1),new Ge(4,6,32,32,1),new Ge(4,4,16,16,2),new Ge(8,16,32,32,2),new Ge(8,16,128,128,2),new Ge(8,32,128,256,2),new Ge(32,128,258,1024,2),new Ge(32,258,258,4096,2)],Qe=["need dictionary","stream end","","","stream error","data error","","buffer error","",""],Xe=113,Ye=666,Ze=262;function $e(e,t,n,r){const s=e[2*t],i=e[2*n];return i>s||s==i&&r[t]<=r[n]}function et(){const e=this;let t,n,s,c,f,a,l,u,w,h,d,p,y,m,b,g,k,v,S,z,C,x,A,_,I,P,D,V,R,B,E,M,U;const K=new He,N=new He,O=new He;let T,W,j,H,L,F;function q(){let t;for(t=0;286>t;t++)E[2*t]=0;for(t=0;30>t;t++)M[2*t]=0;for(t=0;19>t;t++)U[2*t]=0;E[512]=1,e.ue=e.we=0,W=j=0}function G(e,t){let n,r=-1,s=e[1],i=0,o=7,c=4;0===s&&(o=138,c=3),e[2*(t+1)+1]=65535;for(let f=0;t>=f;f++)n=s,s=e[2*(f+1)+1],++i<o&&n==s||(c>i?U[2*n]+=i:0!==n?(n!=r&&U[2*n]++,U[32]++):i>10?U[36]++:U[34]++,i=0,r=n,0===s?(o=138,c=3):n==s?(o=6,c=3):(o=7,c=4))}function J(t){e.Ke[e.pending++]=t}function Q(e){J(255&e),J(e>>>8&255)}function X(e,t){let n;const r=t;F>16-r?(n=e,L|=n<<F&65535,Q(L),L=n>>>16-F,F+=r-16):(L|=e<<F&65535,F+=r)}function Y(e,t){const n=2*e;X(65535&t[n],65535&t[n+1])}function Z(e,t){let n,r,s=-1,i=e[1],o=0,c=7,f=4;for(0===i&&(c=138,f=3),n=0;t>=n;n++)if(r=i,i=e[2*(n+1)+1],++o>=c||r!=i){if(f>o)do{Y(r,U)}while(0!=--o);else 0!==r?(r!=s&&(Y(r,U),o--),Y(16,U),X(o-3,2)):o>10?(Y(18,U),X(o-11,7)):(Y(17,U),X(o-3,3));o=0,s=r,0===i?(c=138,f=3):r==i?(c=6,f=3):(c=7,f=4)}}function $(){16==F?(Q(L),L=0,F=0):8>F||(J(255&L),L>>>=8,F-=8)}function ee(t,n){let s,i,o;if(e.Ne[W]=t,e.Oe[W]=255&n,W++,0===t?E[2*n]++:(j++,t--,E[2*(He.ge[n]+256+1)]++,M[2*He.Se(t)]++),!(8191&W)&&D>2){for(s=8*W,i=C-k,o=0;30>o;o++)s+=M[2*o]*(5+He.Ce[o]);if(s>>>=3,j<r.floor(W/2)&&s<r.floor(i/2))return!0}return W==T-1}function te(t,n){let r,s,i,o,c=0;if(0!==W)do{r=e.Ne[c],s=e.Oe[c],c++,0===r?Y(s,t):(i=He.ge[s],Y(i+256+1,t),o=He.ze[i],0!==o&&(s-=He.ke[i],X(s,o)),r--,i=He.Se(r),Y(i,n),o=He.Ce[i],0!==o&&(r-=He.ve[i],X(r,o)))}while(W>c);Y(256,t),H=t[513]}function ne(){F>8?Q(L):F>0&&J(255&L),L=0,F=0}function re(t,n,r){X(0+(r?1:0),3),((t,n)=>{ne(),H=8,Q(n),Q(~n),e.Ke.set(u.subarray(t,t+n),e.pending),e.pending+=n})(t,n)}function se(n){((t,n,r)=>{let s,i,o=0;D>0?(K.ne(e),N.ne(e),o=(()=>{let t;for(G(E,K.he),G(M,N.he),O.ne(e),t=18;t>=3&&0===U[2*He.Ae[t]+1];t--);return e.ue+=14+3*(t+1),t})(),s=e.ue+3+7>>>3,i=e.we+3+7>>>3,i>s||(s=i)):s=i=n+5,n+4>s||-1==t?i==s?(X(2+(r?1:0),3),te(Le._e,Le.Be)):(X(4+(r?1:0),3),((e,t,n)=>{let r;for(X(e-257,5),X(t-1,5),X(n-4,4),r=0;n>r;r++)X(U[2*He.Ae[r]+1],3);Z(E,e-1),Z(M,t-1)})(K.he+1,N.he+1,o+1),te(E,M)):re(t,n,r),q(),r&&ne()})(0>k?-1:k,C-k,n),k=C,t.Te()}function ie(){let e,n,r,s;do{if(s=w-A-C,0===s&&0===C&&0===A)s=f;else if(-1==s)s--;else if(C>=f+f-Ze){u.set(u.subarray(f,f+f),0),x-=f,C-=f,k-=f,e=y,r=e;do{n=65535&d[--r],d[r]=f>n?0:n-f}while(0!=--e);e=f,r=e;do{n=65535&h[--r],h[r]=f>n?0:n-f}while(0!=--e);s+=f}if(0===t.We)return;e=t.je(u,C+A,s),A+=e,3>A||(p=255&u[C],p=(p<<g^255&u[C+1])&b)}while(Ze>A&&0!==t.We)}function oe(e){let t,n,r=I,s=C,i=_;const o=C>f-Ze?C-(f-Ze):0;let c=B;const a=l,w=C+258;let d=u[s+i-1],p=u[s+i];R>_||(r>>=2),c>A&&(c=A);do{if(t=e,u[t+i]==p&&u[t+i-1]==d&&u[t]==u[s]&&u[++t]==u[s+1]){s+=2,t++;do{}while(u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&w>s);if(n=258-(w-s),s=w-258,n>i){if(x=e,i=n,n>=c)break;d=u[s+i-1],p=u[s+i]}}}while((e=65535&h[e&a])>o&&0!=--r);return i>A?A:i}e.le=[],e.be=[],e.ae=[],E=[],M=[],U=[],e.de=(t,n)=>{const r=e.ae,s=r[n];let i=n<<1;for(;i<=e.ce&&(i<e.ce&&$e(t,r[i+1],r[i],e.le)&&i++,!$e(t,s,r[i],e.le));)r[n]=r[i],n=i,i<<=1;r[n]=s},e.He=(t,S,x,W,j,G)=>(W||(W=8),j||(j=8),G||(G=0),t.Le=null,-1==S&&(S=6),1>j||j>9||8!=W||9>x||x>15||0>S||S>9||0>G||G>2?Oe:(t.Fe=e,a=x,f=1<<a,l=f-1,m=j+7,y=1<<m,b=y-1,g=r.floor((m+3-1)/3),u=new i(2*f),h=[],d=[],T=1<<j+6,e.Ke=new i(4*T),s=4*T,e.Ne=new o(T),e.Oe=new i(T),D=S,V=G,(t=>(t.qe=t.Ge=0,t.Le=null,e.pending=0,e.Je=0,n=Xe,c=0,K.re=E,K.ie=Le.Ee,N.re=M,N.ie=Le.Me,O.re=U,O.ie=Le.Ue,L=0,F=0,H=8,q(),(()=>{w=2*f,d[y-1]=0;for(let e=0;y-1>e;e++)d[e]=0;P=Je[D].Pe,R=Je[D].Ie,B=Je[D].De,I=Je[D].Ve,C=0,k=0,A=0,v=_=2,z=0,p=0})(),0))(t))),e.Qe=()=>42!=n&&n!=Xe&&n!=Ye?Oe:(e.Oe=null,e.Ne=null,e.Ke=null,d=null,h=null,u=null,e.Fe=null,n==Xe?-3:0),e.Xe=(e,t,n)=>{let r=0;return-1==t&&(t=6),0>t||t>9||0>n||n>2?Oe:(Je[D].Re!=Je[t].Re&&0!==e.qe&&(r=e.Ye(1)),D!=t&&(D=t,P=Je[D].Pe,R=Je[D].Ie,B=Je[D].De,I=Je[D].Ve),V=n,r)},e.Ze=(e,t,r)=>{let s,i=r,o=0;if(!t||42!=n)return Oe;if(3>i)return 0;for(i>f-Ze&&(i=f-Ze,o=r-i),u.set(t.subarray(o,o+i),0),C=i,k=i,p=255&u[0],p=(p<<g^255&u[1])&b,s=0;i-3>=s;s++)p=(p<<g^255&u[s+2])&b,h[s&l]=d[p],d[p]=s;return 0},e.Ye=(r,i)=>{let o,w,m,I,R;if(i>4||0>i)return Oe;if(!r.$e||!r.et&&0!==r.We||n==Ye&&4!=i)return r.Le=Qe[4],Oe;if(0===r.tt)return r.Le=Qe[7],-5;var B;if(t=r,I=c,c=i,42==n&&(w=8+(a-8<<4)<<8,m=(D-1&255)>>1,m>3&&(m=3),w|=m<<6,0!==C&&(w|=32),w+=31-w%31,n=Xe,J((B=w)>>8&255),J(255&B)),0!==e.pending){if(t.Te(),0===t.tt)return c=-1,0}else if(0===t.We&&I>=i&&4!=i)return t.Le=Qe[7],-5;if(n==Ye&&0!==t.We)return r.Le=Qe[7],-5;if(0!==t.We||0!==A||0!=i&&n!=Ye){switch(R=-1,Je[D].Re){case 0:R=(e=>{let n,r=65535;for(r>s-5&&(r=s-5);;){if(1>=A){if(ie(),0===A&&0==e)return 0;if(0===A)break}if(C+=A,A=0,n=k+r,(0===C||C>=n)&&(A=C-n,C=n,se(!1),0===t.tt))return 0;if(C-k>=f-Ze&&(se(!1),0===t.tt))return 0}return se(4==e),0===t.tt?4==e?2:0:4==e?3:1})(i);break;case 1:R=(e=>{let n,r=0;for(;;){if(Ze>A){if(ie(),Ze>A&&0==e)return 0;if(0===A)break}if(3>A||(p=(p<<g^255&u[C+2])&b,r=65535&d[p],h[C&l]=d[p],d[p]=C),0===r||(C-r&65535)>f-Ze||2!=V&&(v=oe(r)),3>v)n=ee(0,255&u[C]),A--,C++;else if(n=ee(C-x,v-3),A-=v,v>P||3>A)C+=v,v=0,p=255&u[C],p=(p<<g^255&u[C+1])&b;else{v--;do{C++,p=(p<<g^255&u[C+2])&b,r=65535&d[p],h[C&l]=d[p],d[p]=C}while(0!=--v);C++}if(n&&(se(!1),0===t.tt))return 0}return se(4==e),0===t.tt?4==e?2:0:4==e?3:1})(i);break;case 2:R=(e=>{let n,r,s=0;for(;;){if(Ze>A){if(ie(),Ze>A&&0==e)return 0;if(0===A)break}if(3>A||(p=(p<<g^255&u[C+2])&b,s=65535&d[p],h[C&l]=d[p],d[p]=C),_=v,S=x,v=2,0!==s&&P>_&&f-Ze>=(C-s&65535)&&(2!=V&&(v=oe(s)),5>=v&&(1==V||3==v&&C-x>4096)&&(v=2)),3>_||v>_)if(0!==z){if(n=ee(0,255&u[C-1]),n&&se(!1),C++,A--,0===t.tt)return 0}else z=1,C++,A--;else{r=C+A-3,n=ee(C-1-S,_-3),A-=_-1,_-=2;do{++C>r||(p=(p<<g^255&u[C+2])&b,s=65535&d[p],h[C&l]=d[p],d[p]=C)}while(0!=--_);if(z=0,v=2,C++,n&&(se(!1),0===t.tt))return 0}}return 0!==z&&(n=ee(0,255&u[C-1]),z=0),se(4==e),0===t.tt?4==e?2:0:4==e?3:1})(i)}if(2!=R&&3!=R||(n=Ye),0==R||2==R)return 0===t.tt&&(c=-1),0;if(1==R){if(1==i)X(2,3),Y(256,Le._e),$(),9>1+H+10-F&&(X(2,3),Y(256,Le._e),$()),H=7;else if(re(0,0,!1),3==i)for(o=0;y>o;o++)d[o]=0;if(t.Te(),0===t.tt)return c=-1,0}}return 4!=i?0:1}}function tt(){const e=this;e.nt=0,e.rt=0,e.We=0,e.qe=0,e.tt=0,e.Ge=0}function nt(e){const t=new tt,n=(o=e&&e.chunkSize?e.chunkSize:65536)+5*(r.floor(o/16383)+1);var o;const c=new i(n);let f=e?e.level:-1;void 0===f&&(f=-1),t.He(f),t.$e=c,this.append=(e,r)=>{let o,f,a=0,l=0,u=0;const w=[];if(e.length){t.nt=0,t.et=e,t.We=e.length;do{if(t.rt=0,t.tt=n,o=t.Ye(0),0!=o)throw new s("deflating: "+t.Le);t.rt&&(t.rt==n?w.push(new i(c)):w.push(c.subarray(0,t.rt))),u+=t.rt,r&&t.nt>0&&t.nt!=a&&(r(t.nt),a=t.nt)}while(t.We>0||0===t.tt);return w.length>1?(f=new i(u),w.forEach((e=>{f.set(e,l),l+=e.length}))):f=w[0]?new i(w[0]):new i,f}},this.flush=()=>{let e,r,o=0,f=0;const a=[];do{if(t.rt=0,t.tt=n,e=t.Ye(4),1!=e&&0!=e)throw new s("deflating: "+t.Le);n-t.tt>0&&a.push(c.slice(0,t.rt)),f+=t.rt}while(t.We>0||0===t.tt);return t.Qe(),r=new i(f),a.forEach((e=>{r.set(e,o),o+=e.length})),r}}tt.prototype={He(e,t){const n=this;return n.Fe=new et,t||(t=15),n.Fe.He(n,e,t)},Ye(e){const t=this;return t.Fe?t.Fe.Ye(t,e):Oe},Qe(){const e=this;if(!e.Fe)return Oe;const t=e.Fe.Qe();return e.Fe=null,t},Xe(e,t){const n=this;return n.Fe?n.Fe.Xe(n,e,t):Oe},Ze(e,t){const n=this;return n.Fe?n.Fe.Ze(n,e,t):Oe},je(e,t,n){const r=this;let s=r.We;return s>n&&(s=n),0===s?0:(r.We-=s,e.set(r.et.subarray(r.nt,r.nt+s),t),r.nt+=s,r.qe+=s,s)},Te(){const e=this;let t=e.Fe.pending;t>e.tt&&(t=e.tt),0!==t&&(e.$e.set(e.Fe.Ke.subarray(e.Fe.Je,e.Fe.Je+t),e.rt),e.rt+=t,e.Fe.Je+=t,e.Ge+=t,e.tt-=t,e.Fe.pending-=t,0===e.Fe.pending&&(e.Fe.Je=0))}};const rt=-2,st=-3,it=-5,ot=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],ct=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255],ft=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577],at=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],lt=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112],ut=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],wt=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];function ht(){let e,t,n,r,s,i;function o(e,t,o,c,f,a,l,u,w,h,d){let p,y,m,b,g,k,v,S,z,C,x,A,_,I,P;C=0,g=o;do{n[e[t+C]]++,C++,g--}while(0!==g);if(n[0]==o)return l[0]=-1,u[0]=0,0;for(S=u[0],k=1;15>=k&&0===n[k];k++);for(v=k,k>S&&(S=k),g=15;0!==g&&0===n[g];g--);for(m=g,S>g&&(S=g),u[0]=S,I=1<<k;g>k;k++,I<<=1)if(0>(I-=n[k]))return st;if(0>(I-=n[g]))return st;for(n[g]+=I,i[1]=k=0,C=1,_=2;0!=--g;)i[_]=k+=n[C],_++,C++;g=0,C=0;do{0!==(k=e[t+C])&&(d[i[k]++]=g),C++}while(++g<o);for(o=i[m],i[0]=g=0,C=0,b=-1,A=-S,s[0]=0,x=0,P=0;m>=v;v++)for(p=n[v];0!=p--;){for(;v>A+S;){if(b++,A+=S,P=m-A,P=P>S?S:P,(y=1<<(k=v-A))>p+1&&(y-=p+1,_=v,P>k))for(;++k<P&&(y<<=1)>n[++_];)y-=n[_];if(P=1<<k,h[0]+P>1440)return st;s[b]=x=h[0],h[0]+=P,0!==b?(i[b]=g,r[0]=k,r[1]=S,k=g>>>A-S,r[2]=x-s[b-1]-k,w.set(r,3*(s[b-1]+k))):l[0]=x}for(r[1]=v-A,o>C?d[C]<c?(r[0]=256>d[C]?0:96,r[2]=d[C++]):(r[0]=a[d[C]-c]+16+64,r[2]=f[d[C++]-c]):r[0]=192,y=1<<v-A,k=g>>>A;P>k;k+=y)w.set(r,3*(x+k));for(k=1<<v-1;g&k;k>>>=1)g^=k;for(g^=k,z=(1<<A)-1;(g&z)!=i[b];)b--,A-=S,z=(1<<A)-1}return 0!==I&&1!=m?it:0}function c(o){let c;for(e||(e=[],t=[],n=new f(16),r=[],s=new f(15),i=new f(16)),t.length<o&&(t=[]),c=0;o>c;c++)t[c]=0;for(c=0;16>c;c++)n[c]=0;for(c=0;3>c;c++)r[c]=0;s.set(n.subarray(0,15),0),i.set(n.subarray(0,16),0)}this.st=(n,r,s,i,f)=>{let a;return c(19),e[0]=0,a=o(n,0,19,19,null,null,s,r,i,e,t),a==st?f.Le="oversubscribed dynamic bit lengths tree":a!=it&&0!==r[0]||(f.Le="incomplete dynamic bit lengths tree",a=st),a},this.it=(n,r,s,i,f,a,l,u,w)=>{let h;return c(288),e[0]=0,h=o(s,0,n,257,at,lt,a,i,u,e,t),0!=h||0===i[0]?(h==st?w.Le="oversubscribed literal/length tree":-4!=h&&(w.Le="incomplete literal/length tree",h=st),h):(c(288),h=o(s,n,r,0,ut,wt,l,f,u,e,t),0!=h||0===f[0]&&n>257?(h==st?w.Le="oversubscribed distance tree":h==it?(w.Le="incomplete distance tree",h=st):-4!=h&&(w.Le="empty distance tree with lengths",h=st),h):0)}}function dt(){const e=this;let t,n,r,s,i=0,o=0,c=0,f=0,a=0,l=0,u=0,w=0,h=0,d=0;function p(e,t,n,r,s,i,o,c){let f,a,l,u,w,h,d,p,y,m,b,g,k,v,S,z;d=c.nt,p=c.We,w=o.ot,h=o.ct,y=o.write,m=y<o.read?o.read-y-1:o.end-y,b=ot[e],g=ot[t];do{for(;20>h;)p--,w|=(255&c.ft(d++))<<h,h+=8;if(f=w&b,a=n,l=r,z=3*(l+f),0!==(u=a[z]))for(;;){if(w>>=a[z+1],h-=a[z+1],16&u){for(u&=15,k=a[z+2]+(w&ot[u]),w>>=u,h-=u;15>h;)p--,w|=(255&c.ft(d++))<<h,h+=8;for(f=w&g,a=s,l=i,z=3*(l+f),u=a[z];;){if(w>>=a[z+1],h-=a[z+1],16&u){for(u&=15;u>h;)p--,w|=(255&c.ft(d++))<<h,h+=8;if(v=a[z+2]+(w&ot[u]),w>>=u,h-=u,m-=k,v>y){S=y-v;do{S+=o.end}while(0>S);if(u=o.end-S,k>u){if(k-=u,y-S>0&&u>y-S)do{o.lt[y++]=o.lt[S++]}while(0!=--u);else o.lt.set(o.lt.subarray(S,S+u),y),y+=u,S+=u,u=0;S=0}}else S=y-v,y-S>0&&2>y-S?(o.lt[y++]=o.lt[S++],o.lt[y++]=o.lt[S++],k-=2):(o.lt.set(o.lt.subarray(S,S+2),y),y+=2,S+=2,k-=2);if(y-S>0&&k>y-S)do{o.lt[y++]=o.lt[S++]}while(0!=--k);else o.lt.set(o.lt.subarray(S,S+k),y),y+=k,S+=k,k=0;break}if(64&u)return c.Le="invalid distance code",k=c.We-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ot=w,o.ct=h,c.We=p,c.qe+=d-c.nt,c.nt=d,o.write=y,st;f+=a[z+2],f+=w&ot[u],z=3*(l+f),u=a[z]}break}if(64&u)return 32&u?(k=c.We-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ot=w,o.ct=h,c.We=p,c.qe+=d-c.nt,c.nt=d,o.write=y,1):(c.Le="invalid literal/length code",k=c.We-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ot=w,o.ct=h,c.We=p,c.qe+=d-c.nt,c.nt=d,o.write=y,st);if(f+=a[z+2],f+=w&ot[u],z=3*(l+f),0===(u=a[z])){w>>=a[z+1],h-=a[z+1],o.lt[y++]=a[z+2],m--;break}}else w>>=a[z+1],h-=a[z+1],o.lt[y++]=a[z+2],m--}while(m>=258&&p>=10);return k=c.We-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ot=w,o.ct=h,c.We=p,c.qe+=d-c.nt,c.nt=d,o.write=y,0}e.init=(e,i,o,c,f,a)=>{t=0,u=e,w=i,r=o,h=c,s=f,d=a,n=null},e.ut=(e,y,m)=>{let b,g,k,v,S,z,C,x=0,A=0,_=0;for(_=y.nt,v=y.We,x=e.ot,A=e.ct,S=e.write,z=S<e.read?e.read-S-1:e.end-S;;)switch(t){case 0:if(z>=258&&v>=10&&(e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,m=p(u,w,r,h,s,d,e,y),_=y.nt,v=y.We,x=e.ot,A=e.ct,S=e.write,z=S<e.read?e.read-S-1:e.end-S,0!=m)){t=1==m?7:9;break}c=u,n=r,o=h,t=1;case 1:for(b=c;b>A;){if(0===v)return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,v--,x|=(255&y.ft(_++))<<A,A+=8}if(g=3*(o+(x&ot[b])),x>>>=n[g+1],A-=n[g+1],k=n[g],0===k){f=n[g+2],t=6;break}if(16&k){a=15&k,i=n[g+2],t=2;break}if(!(64&k)){c=k,o=g/3+n[g+2];break}if(32&k){t=7;break}return t=9,y.Le="invalid literal/length code",m=st,e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);case 2:for(b=a;b>A;){if(0===v)return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,v--,x|=(255&y.ft(_++))<<A,A+=8}i+=x&ot[b],x>>=b,A-=b,c=w,n=s,o=d,t=3;case 3:for(b=c;b>A;){if(0===v)return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,v--,x|=(255&y.ft(_++))<<A,A+=8}if(g=3*(o+(x&ot[b])),x>>=n[g+1],A-=n[g+1],k=n[g],16&k){a=15&k,l=n[g+2],t=4;break}if(!(64&k)){c=k,o=g/3+n[g+2];break}return t=9,y.Le="invalid distance code",m=st,e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);case 4:for(b=a;b>A;){if(0===v)return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,v--,x|=(255&y.ft(_++))<<A,A+=8}l+=x&ot[b],x>>=b,A-=b,t=5;case 5:for(C=S-l;0>C;)C+=e.end;for(;0!==i;){if(0===z&&(S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z&&(e.write=S,m=e.wt(y,m),S=e.write,z=S<e.read?e.read-S-1:e.end-S,S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z)))return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);e.lt[S++]=e.lt[C++],z--,C==e.end&&(C=0),i--}t=0;break;case 6:if(0===z&&(S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z&&(e.write=S,m=e.wt(y,m),S=e.write,z=S<e.read?e.read-S-1:e.end-S,S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z)))return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,e.lt[S++]=f,z--,t=0;break;case 7:if(A>7&&(A-=8,v++,_--),e.write=S,m=e.wt(y,m),S=e.write,z=S<e.read?e.read-S-1:e.end-S,e.read!=e.write)return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);t=8;case 8:return m=1,e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);case 9:return m=st,e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);default:return m=rt,e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m)}},e.ht=()=>{}}ht.dt=(e,t,n,r)=>(e[0]=9,t[0]=5,n[0]=ct,r[0]=ft,0);const pt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function yt(e,t){const n=this;let r,s=0,o=0,c=0,a=0;const l=[0],u=[0],w=new dt;let h=0,d=new f(4320);const p=new ht;n.ct=0,n.ot=0,n.lt=new i(t),n.end=t,n.read=0,n.write=0,n.reset=(e,t)=>{t&&(t[0]=0),6==s&&w.ht(e),s=0,n.ct=0,n.ot=0,n.read=n.write=0},n.reset(e,null),n.wt=(e,t)=>{let r,s,i;return s=e.rt,i=n.read,r=(i>n.write?n.end:n.write)-i,r>e.tt&&(r=e.tt),0!==r&&t==it&&(t=0),e.tt-=r,e.Ge+=r,e.$e.set(n.lt.subarray(i,i+r),s),s+=r,i+=r,i==n.end&&(i=0,n.write==n.end&&(n.write=0),r=n.write-i,r>e.tt&&(r=e.tt),0!==r&&t==it&&(t=0),e.tt-=r,e.Ge+=r,e.$e.set(n.lt.subarray(i,i+r),s),s+=r,i+=r),e.rt=s,n.read=i,t},n.ut=(e,t)=>{let i,f,y,m,b,g,k,v;for(m=e.nt,b=e.We,f=n.ot,y=n.ct,g=n.write,k=g<n.read?n.read-g-1:n.end-g;;){let S,z,C,x,A,_,I,P;switch(s){case 0:for(;3>y;){if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}switch(i=7&f,h=1&i,i>>>1){case 0:f>>>=3,y-=3,i=7&y,f>>>=i,y-=i,s=1;break;case 1:S=[],z=[],C=[[]],x=[[]],ht.dt(S,z,C,x),w.init(S[0],z[0],C[0],0,x[0],0),f>>>=3,y-=3,s=6;break;case 2:f>>>=3,y-=3,s=3;break;case 3:return f>>>=3,y-=3,s=9,e.Le="invalid block type",t=st,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t)}break;case 1:for(;32>y;){if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}if((~f>>>16&65535)!=(65535&f))return s=9,e.Le="invalid stored block lengths",t=st,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);o=65535&f,f=y=0,s=0!==o?2:0!==h?7:0;break;case 2:if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);if(0===k&&(g==n.end&&0!==n.read&&(g=0,k=g<n.read?n.read-g-1:n.end-g),0===k&&(n.write=g,t=n.wt(e,t),g=n.write,k=g<n.read?n.read-g-1:n.end-g,g==n.end&&0!==n.read&&(g=0,k=g<n.read?n.read-g-1:n.end-g),0===k)))return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);if(t=0,i=o,i>b&&(i=b),i>k&&(i=k),n.lt.set(e.je(m,i),g),m+=i,b-=i,g+=i,k-=i,0!=(o-=i))break;s=0!==h?7:0;break;case 3:for(;14>y;){if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}if(c=i=16383&f,(31&i)>29||(i>>5&31)>29)return s=9,e.Le="too many length or distance symbols",t=st,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);if(i=258+(31&i)+(i>>5&31),!r||r.length<i)r=[];else for(v=0;i>v;v++)r[v]=0;f>>>=14,y-=14,a=0,s=4;case 4:for(;4+(c>>>10)>a;){for(;3>y;){if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}r[pt[a++]]=7&f,f>>>=3,y-=3}for(;19>a;)r[pt[a++]]=0;if(l[0]=7,i=p.st(r,l,u,d,e),0!=i)return(t=i)==st&&(r=null,s=9),n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);a=0,s=5;case 5:for(;i=c,258+(31&i)+(i>>5&31)>a;){let o,w;for(i=l[0];i>y;){if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}if(i=d[3*(u[0]+(f&ot[i]))+1],w=d[3*(u[0]+(f&ot[i]))+2],16>w)f>>>=i,y-=i,r[a++]=w;else{for(v=18==w?7:w-14,o=18==w?11:3;i+v>y;){if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}if(f>>>=i,y-=i,o+=f&ot[v],f>>>=v,y-=v,v=a,i=c,v+o>258+(31&i)+(i>>5&31)||16==w&&1>v)return r=null,s=9,e.Le="invalid bit length repeat",t=st,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);w=16==w?r[v-1]:0;do{r[v++]=w}while(0!=--o);a=v}}if(u[0]=-1,A=[],_=[],I=[],P=[],A[0]=9,_[0]=6,i=c,i=p.it(257+(31&i),1+(i>>5&31),r,A,_,I,P,d,e),0!=i)return i==st&&(r=null,s=9),t=i,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);w.init(A[0],_[0],d,I[0],d,P[0]),s=6;case 6:if(n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,1!=(t=w.ut(n,e,t)))return n.wt(e,t);if(t=0,w.ht(e),m=e.nt,b=e.We,f=n.ot,y=n.ct,g=n.write,k=g<n.read?n.read-g-1:n.end-g,0===h){s=0;break}s=7;case 7:if(n.write=g,t=n.wt(e,t),g=n.write,k=g<n.read?n.read-g-1:n.end-g,n.read!=n.write)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);s=8;case 8:return t=1,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);case 9:return t=st,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);default:return t=rt,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t)}}},n.ht=e=>{n.reset(e,null),n.lt=null,d=null},n.yt=(e,t,r)=>{n.lt.set(e.subarray(t,t+r),0),n.read=n.write=r},n.bt=()=>1==s?1:0}const mt=13,bt=[0,0,255,255];function gt(){const e=this;function t(e){return e&&e.gt?(e.qe=e.Ge=0,e.Le=null,e.gt.mode=7,e.gt.kt.reset(e,null),0):rt}e.mode=0,e.method=0,e.vt=[0],e.St=0,e.marker=0,e.zt=0,e.Ct=t=>(e.kt&&e.kt.ht(t),e.kt=null,0),e.xt=(n,r)=>(n.Le=null,e.kt=null,8>r||r>15?(e.Ct(n),rt):(e.zt=r,n.gt.kt=new yt(n,1<<r),t(n),0)),e.At=(e,t)=>{let n,r;if(!e||!e.gt||!e.et)return rt;const s=e.gt;for(t=4==t?it:0,n=it;;)switch(s.mode){case 0:if(0===e.We)return n;if(n=t,e.We--,e.qe++,8!=(15&(s.method=e.ft(e.nt++)))){s.mode=mt,e.Le="unknown compression method",s.marker=5;break}if(8+(s.method>>4)>s.zt){s.mode=mt,e.Le="invalid win size",s.marker=5;break}s.mode=1;case 1:if(0===e.We)return n;if(n=t,e.We--,e.qe++,r=255&e.ft(e.nt++),((s.method<<8)+r)%31!=0){s.mode=mt,e.Le="incorrect header check",s.marker=5;break}if(!(32&r)){s.mode=7;break}s.mode=2;case 2:if(0===e.We)return n;n=t,e.We--,e.qe++,s.St=(255&e.ft(e.nt++))<<24&4278190080,s.mode=3;case 3:if(0===e.We)return n;n=t,e.We--,e.qe++,s.St+=(255&e.ft(e.nt++))<<16&16711680,s.mode=4;case 4:if(0===e.We)return n;n=t,e.We--,e.qe++,s.St+=(255&e.ft(e.nt++))<<8&65280,s.mode=5;case 5:return 0===e.We?n:(n=t,e.We--,e.qe++,s.St+=255&e.ft(e.nt++),s.mode=6,2);case 6:return s.mode=mt,e.Le="need dictionary",s.marker=0,rt;case 7:if(n=s.kt.ut(e,n),n==st){s.mode=mt,s.marker=0;break}if(0==n&&(n=t),1!=n)return n;n=t,s.kt.reset(e,s.vt),s.mode=12;case 12:return e.We=0,1;case mt:return st;default:return rt}},e._t=(e,t,n)=>{let r=0,s=n;if(!e||!e.gt||6!=e.gt.mode)return rt;const i=e.gt;return s<1<<i.zt||(s=(1<<i.zt)-1,r=n-s),i.kt.yt(t,r,s),i.mode=7,0},e.It=e=>{let n,r,s,i,o;if(!e||!e.gt)return rt;const c=e.gt;if(c.mode!=mt&&(c.mode=mt,c.marker=0),0===(n=e.We))return it;for(r=e.nt,s=c.marker;0!==n&&4>s;)e.ft(r)==bt[s]?s++:s=0!==e.ft(r)?0:4-s,r++,n--;return e.qe+=r-e.nt,e.nt=r,e.We=n,c.marker=s,4!=s?st:(i=e.qe,o=e.Ge,t(e),e.qe=i,e.Ge=o,c.mode=7,0)},e.Pt=e=>e&&e.gt&&e.gt.kt?e.gt.kt.bt():rt}function kt(){}function vt(e){const t=new kt,n=e&&e.chunkSize?r.floor(2*e.chunkSize):131072,o=new i(n);let c=!1;t.xt(),t.$e=o,this.append=(e,r)=>{const f=[];let a,l,u=0,w=0,h=0;if(0!==e.length){t.nt=0,t.et=e,t.We=e.length;do{if(t.rt=0,t.tt=n,0!==t.We||c||(t.nt=0,c=!0),a=t.At(0),c&&a===it){if(0!==t.We)throw new s("inflating: bad input")}else if(0!==a&&1!==a)throw new s("inflating: "+t.Le);if((c||1===a)&&t.We===e.length)throw new s("inflating: bad input");t.rt&&(t.rt===n?f.push(new i(o)):f.push(o.subarray(0,t.rt))),h+=t.rt,r&&t.nt>0&&t.nt!=u&&(r(t.nt),u=t.nt)}while(t.We>0||0===t.tt);return f.length>1?(l=new i(h),f.forEach((e=>{l.set(e,w),w+=e.length}))):l=f[0]?new i(f[0]):new i,l}},this.flush=()=>{t.Ct()}}kt.prototype={xt(e){const t=this;return t.gt=new gt,e||(e=15),t.gt.xt(t,e)},At(e){const t=this;return t.gt?t.gt.At(t,e):rt},Ct(){const e=this;if(!e.gt)return rt;const t=e.gt.Ct(e);return e.gt=null,t},It(){const e=this;return e.gt?e.gt.It(e):rt},_t(e,t){const n=this;return n.gt?n.gt._t(n,e,t):rt},ft(e){return this.et[e]},je(e,t){return this.et.subarray(e,e+t)}},self.initCodec=()=>{self.Deflate=nt,self.Inflate=vt};\n'
          , r = () => t.useDataURI ? "data:text/javascript," + encodeURIComponent(n) : f.createObjectURL(new m([n],{
            type: "text/javascript"
        }));
        e({
            workerScripts: {
                inflate: [r],
                deflate: [r]
            }
        })
    }
    )(ne),
    e.BlobReader = Ot,
    e.BlobWriter = Pt,
    e.Data64URIReader = class extends Nt {
        constructor(e) {
            super();
            let t = e.length;
            for (; "=" == e.charAt(t - 1); )
                t--;
            const r = e.indexOf(",") + 1;
            n.assign(this, {
                dataURI: e,
                dataStart: r,
                size: a.floor(.75 * (t - r))
            })
        }
        readUint8Array(e, t) {
            const {dataStart: n, dataURI: r} = this
              , s = new w(t)
              , i = 4 * a.floor(e / 3)
              , o = atob(r.substring(i + n, 4 * a.ceil((e + t) / 3) + n))
              , c = e - 3 * a.floor(i / 4);
            for (let e = c; c + t > e; e++)
                s[e - c] = o.charCodeAt(e);
            return s
        }
    }
    ,
    e.Data64URIWriter = class extends qt {
        constructor(e) {
            super(),
            n.assign(this, {
                data: "data:" + (e || "") + ";base64,",
                pending: []
            })
        }
        writeUint8Array(e) {
            const t = this;
            let n = 0
              , s = t.pending;
            const i = t.pending.length;
            for (t.pending = "",
            n = 0; n < 3 * a.floor((i + e.length) / 3) - i; n++)
                s += r.fromCharCode(e[n]);
            for (; n < e.length; n++)
                t.pending += r.fromCharCode(e[n]);
            s.length > 2 ? t.data += v(s) : t.pending = s
        }
        getData() {
            return this.data + v(this.pending)
        }
    }
    ,
    e.ERR_BAD_FORMAT = Ln,
    e.ERR_CENTRAL_DIRECTORY_NOT_FOUND = Nn,
    e.ERR_DUPLICATED_NAME = or,
    e.ERR_ENCRYPTED = Pn,
    e.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = In,
    e.ERR_EOCDR_NOT_FOUND = Un,
    e.ERR_EXTRAFIELD_ZIP64_NOT_FOUND = On,
    e.ERR_HTTP_RANGE = Wt,
    e.ERR_INVALID_COMMENT = cr,
    e.ERR_INVALID_ENCRYPTION_STRENGTH = dr,
    e.ERR_INVALID_ENTRY_COMMENT = lr,
    e.ERR_INVALID_ENTRY_NAME = ur,
    e.ERR_INVALID_EXTRAFIELD_DATA = pr,
    e.ERR_INVALID_EXTRAFIELD_TYPE = wr,
    e.ERR_INVALID_PASSWORD = he,
    e.ERR_INVALID_SIGNATURE = ge,
    e.ERR_INVALID_VERSION = fr,
    e.ERR_ITERATOR_COMPLETED_TOO_SOON = Rt,
    e.ERR_LOCAL_FILE_HEADER_NOT_FOUND = qn,
    e.ERR_SPLIT_ZIP_FILE = Bn,
    e.ERR_UNDEFINED_UNCOMPRESSED_SIZE = gr,
    e.ERR_UNSUPPORTED_COMPRESSION = Mn,
    e.ERR_UNSUPPORTED_ENCRYPTION = Hn,
    e.ERR_UNSUPPORTED_FORMAT = hr,
    e.HttpRangeReader = class extends en {
        constructor(e, t={}) {
            t.useRangeHeader = !0,
            super(e, t)
        }
    }
    ,
    e.HttpReader = en,
    e.Reader = Nt,
    e.SplitDataReader = tn,
    e.SplitDataWriter = nn,
    e.SplitZipReader = cn,
    e.SplitZipWriter = ln,
    e.TextReader = class extends Ot {
        constructor(e) {
            super(new m([e],{
                type: "text/plain"
            }))
        }
    }
    ,
    e.TextWriter = class extends Pt {
        constructor(e) {
            super(e),
            n.assign(this, {
                encoding: e,
                utf8: !e || "utf-8" == e.toLowerCase()
            })
        }
        async getData() {
            const {encoding: e, utf8: t} = this
              , r = await super.getData();
            if (r.text && t)
                return r.text();
            {
                const t = new FileReader;
                return new y(( (s, i) => {
                    n.assign(t, {
                        onload: ({target: e}) => s(e.result),
                        onerror: () => i(t.error)
                    }),
                    t.readAsText(r, e)
                }
                ))
            }
        }
    }
    ,
    e.Uint8ArrayReader = class extends Nt {
        constructor(e) {
            super(),
            n.assign(this, {
                array: e,
                size: e.length
            })
        }
        readUint8Array(e, t) {
            return this.array.slice(e, e + t)
        }
    }
    ,
    e.Uint8ArrayWriter = class extends qt {
        init(e=0) {
            n.assign(this, {
                offset: 0,
                array: new w(e)
            }),
            super.init()
        }
        writeUint8Array(e) {
            const t = this;
            if (t.offset + e.length > t.array.length) {
                const n = t.array;
                t.array = new w(n.length + e.length),
                t.array.set(n)
            }
            t.array.set(e, t.offset),
            t.offset += e.length
        }
        getData() {
            return this.array
        }
    }
    ,
    e.Writer = qt,
    e.ZipReader = Xn,
    e.ZipReaderStream = class {
        constructor(e={}) {
            const {readable: t, writable: n} = new x
              , r = new Xn(t,e).getEntriesGenerator();
            this.readable = new A({
                async pull(e) {
                    const {done: t, value: n} = await r.next();
                    if (t)
                        return e.close();
                    const s = {
                        ...n,
                        readable: ( () => {
                            const {readable: e, writable: t} = new x;
                            if (n.getData)
                                return n.getData(t),
                                e
                        }
                        )()
                    };
                    delete s.getData,
                    e.enqueue(s)
                }
            }),
            this.writable = n
        }
    }
    ,
    e.ZipWriter = Sr,
    e.ZipWriterStream = class {
        constructor(e={}) {
            const {readable: t, writable: n} = new x;
            this.readable = t,
            this.zipWriter = new Sr(n,e)
        }
        transform(e) {
            const {readable: t, writable: n} = new x({
                flush: () => {
                    this.zipWriter.close()
                }
            });
            return this.zipWriter.add(e, t),
            {
                readable: this.readable,
                writable: n
            }
        }
        writable(e) {
            const {readable: t, writable: n} = new x;
            return this.zipWriter.add(e, t),
            n
        }
        close(e, t={}) {
            return this.zipWriter.close(e, t)
        }
    }
    ,
    e.configure = ne,
    e.getMimeType = () => "application/octet-stream",
    e.initReader = sn,
    e.initShimAsyncCodec = (e, t={}, n) => ({
        Deflate: se(e.Deflate, t.deflate, n),
        Inflate: se(e.Inflate, t.inflate, n)
    }),
    e.initStream = rn,
    e.initWriter = an,
    e.readUint8Array = on,
    e.terminateWorkers = async () => {
        await y.allSettled(vt.map((e => (_t(e),
        e.terminate()))))
    }
}
));
folderRegistry = new Set;
class OPFSFileSystem {
    constructor(e) {
        this.name = e
    }
    async init() {
        try {
            this.rootHandle = await navigator.storage.getDirectory(),
            this.rootHandle = await this.rootHandle.getDirectoryHandle(this.name, {
                create: !0
            })
        } catch (e) {
            throw Error(`Unable to initialize filesystem: ${e.message}`)
        }
    }
    async getFile(e) {
        let t = e.split("/")
          , a = this.rootHandle;
        for (let l = 0; l < t.length - 1; l++)
            try {
                a = await a.getDirectoryHandle(t[l], {
                    create: !1
                })
            } catch (i) {
                throw Error(`Unable to find file ${e}, directory ${t[l]} does not exist.`)
            }
        try {
            a = await a.getFileHandle(t[t.length - 1], {
                create: !1
            })
        } catch (r) {
            throw Error(`Unable to find file ${e}, file ${t[t.length - 1]} does not exist.`)
        }
        return new OPFSFile(a)
    }
    async createFile(e, t) {
        let a = e.split("/")
          , l = this.rootHandle;
        for (let i = 0; i < a.length - 1; i++)
            try {
                l = await l.getDirectoryHandle(a[i], {
                    create: !0
                })
            } catch (r) {
                throw Error(`Unable to create file ${e}, directory ${a[i]} could not be created.`)
            }
        try {
            l = await l.getFileHandle(a[a.length - 1], {
                create: !0
            })
        } catch (o) {
            throw Error(`Unable to create file ${e}, file ${a[a.length - 1]} could not be created.`)
        }
        try {
            let n = await l.createWritable();
            await n.write({ type: 'write', data: t }),
            await n.close()
        } catch (s) {
            throw Error(`Unable to write to file ${e}: ${s.message}`)
        }
        let c = e.split("/")
          , d = c.slice(0, -1).join("/");
        for (let h of folderRegistry)
            h.folderHandle.name === d && await h.indexFiles();
        return new OPFSFile(l)
    }
    async deleteFile(e) {
        let t = e.split("/")
          , a = this.rootHandle;
        for (let l = 0; l < t.length - 1; l++)
            try {
                a = await a.getDirectoryHandle(t[l], {
                    create: !1
                })
            } catch (i) {
                throw Error(`Unable to delete file ${e}, directory ${t[l]} does not exist.`)
            }
        try {
            a = await a.getFileHandle(t[t.length - 1], {
                create: !1
            })
        } catch (r) {
            throw Error(`Unable to delete file ${e}, file ${t[t.length - 1]} does not exist.`)
        }
        try {
            await a.remove()
        } catch (o) {
            throw Error(`Unable to delete file ${e}: ${o.message}`)
        }
    }
    async getFolder(e) {
        let t = e.split("/")
          , a = this.rootHandle;
        for (let l = 0; l < t.length; l++)
            try {
                a = await a.getDirectoryHandle(t[l], {
                    create: !1
                })
            } catch (i) {
                throw Error(`Unable to find folder ${e}, directory ${t[l]} does not exist.`)
            }
        return new OPFSFolder(a)
    }
    async createFolder(e) {
        let t = e.split("/")
          , a = this.rootHandle;
        for (let l = 0; l < t.length; l++)
            try {
                a = await a.getDirectoryHandle(t[l], {
                    create: !0
                })
            } catch (i) {
                throw Error(`Unable to create folder ${e}, directory ${t[l]} could not be created.`)
            }
        return new OPFSFolder(a)
    }
    async deleteFolder(e) {
        let t = e.split("/")
          , a = this.rootHandle;
        for (let l = 0; l < t.length; l++)
            try {
                a = await a.getDirectoryHandle(t[l], {
                    create: !1
                })
            } catch (i) {
                throw Error(`Unable to delete folder ${e}, directory ${t[l]} does not exist.`)
            }
        try {
            await a.remove()
        } catch (r) {
            throw Error(`Unable to delete folder ${e}: ${r.message}`)
        }
    }
}
class OPFSFile {
    constructor(e) {
        this.fileHandle = e,
        this.metadata = {},
        this.#a()
    }
    async json() {
        try {
            let blob = await this.getBlob()
            let text = await blob.text()
            return JSON.parse(text)
        } catch (e) {
            throw Error(`Unable to parse JSON: ${e.message}`)
        }
    }
    async getBlob() {
        try {
            return await this.fileHandle.getFile()
        } catch (e) {
            throw Error(`Unable to get blob: ${e.message}`)
        }
    }
    async getURL() {
        try {
            return URL.createObjectURL(await this.getBlob())
        } catch (e) {
            throw Error(`Unable to get URL: ${e.message}`)
        }
    }
    async write(e) {
        try {
            let t = await this.fileHandle.createWritable();
            await t.write(e),
            await t.close(),
            this.#a()
        } catch (a) {
            throw Error(`Unable to write to file: ${a.message}`)
        }
    }
    async download() {
        try {
            let e = await this.getURL()
              , t = document.createElement("a");
            t.href = e,
            t.download = this.fileHandle.name,
            t.click(),
            URL.revokeObjectURL(e),
            t.remove()
        } catch (a) {
            throw Error(`Unable to download file: ${a.message}`)
        }
    }
    async delete() {
        try {
            await this.fileHandle.remove()
        } catch (e) {
            throw Error(`Unable to delete file: ${e.message}`)
        }
    }
    async move(e) {
        let t = e.split("/")
          , a = this.fileHandle;
        for (let l = 0; l < t.length - 1; l++)
            try {
                a = await a.getParent().getDirectoryHandle(t[l], {
                    create: !0
                })
            } catch (i) {
                throw Error(`Unable to move file to ${e}, directory ${t[l]} could not be created.`)
            }
        try {
            a = await a.getFileHandle(t[t.length - 1], {
                create: !0
            })
        } catch (r) {
            throw Error(`Unable to move file to ${e}, file ${t[t.length - 1]} could not be created.`)
        }
        try {
            await this.fileHandle.move(a),
            this.fileHandle = a,
            this.#a()
        } catch (o) {
            throw Error(`Unable to move file: ${o.message}`)
        }
    }
    #a() {
        this.metadata = {},
        this.fileHandle.getFile().then(async e => {
            this.metadata.lastModified = e.lastModifiedDate,
            this.metadata.size = e.size,
            this.metadata.type = e.type
        }
        ).catch(e => {
            throw Error(`Unable to index metadata: ${e.message}`)
        }
        )
    }
}
class OPFSFolder {
    constructor(e) {
        this.folderHandle = e,
        this.files = {},
        folderRegistry.add(this),
        this.indexFiles()
    }
    async indexFiles() {
        try {
            let e = await this.folderHandle.values();
            for await(let t of (this.files = {},
            e))
                this.files[t.name] = async () => new OPFSFile(await this.folderHandle.getFileHandle(t.name))
        } catch (a) {
            throw Error(`Unable to index files: ${a.message}`)
        }
    }
    async getFile(e) {
        return await this.indexFiles(),
        this.files[e] ? this.files[e]() : null
    }
    async createFile(e, t) {
        try {
            let a = await this.folderHandle.getFileHandle(e, {
                create: !0
            })
              , l = await a.createWritable();
            return await l.write(t),
            await l.close(),
            await this.indexFiles(),
            new OPFSFile(a)
        } catch (i) {
            throw Error(`Unable to create file ${e}: ${i.message}`)
        }
    }
    async deleteFile(e) {
        try {
            await this.folderHandle.getFileHandle(e).remove(),
            await this.indexFiles()
        } catch (t) {
            throw Error(`Unable to delete file ${e}: ${t.message}`)
        }
    }
    async hasFile(e) {
        return await this.indexFiles(),
        !!this.files[e]
    }
    async delete() {
        try {
            await this.folderHandle.remove(),
            folderRegistry.delete(this)
        } catch (e) {
            throw Error(`Unable to delete folder: ${e.message}`)
        }
    }
    async createFolder(e) {
        try {
            let t = await this.folderHandle.getDirectoryHandle(e, {
                create: !0
            });
            return new OPFSFolder(t)
        } catch (a) {
            throw Error(`Unable to create folder ${e}: ${a.message}`)
        }
    }
    async downloadAll() {
        try {
            let e = await this.folderHandle.values();
            for await(let t of e) {
                let a = URL.createObjectURL(await this.folderHandle.getFileHandle(t.name).getFile())
                  , l = document.createElement("a");
                l.href = a,
                l.download = t.name,
                l.click(),
                URL.revokeObjectURL(a),
                l.remove()
            }
        } catch (i) {
            throw Error(`Unable to download all files: ${i.message}`)
        }
    }
    async downloadZip() {
        try {
            let e = new zip.ZipWriter(new zip.BlobWriter("application/zip"),{
                bufferedWrite: !0
            })
              , t = await this.folderHandle.values();
            for await(let a of t)
                await e.add(a.name, new zip.BlobReader(await (await this.folderHandle.getFileHandle(a.name)).getFile()));
            let l = await e.close()
              , i = URL.createObjectURL(l)
              , r = document.createElement("a");
            r.href = i,
            r.download = this.folderHandle.name + ".zip",
            r.click(),
            URL.revokeObjectURL(i),
            r.remove()
        } catch (o) {
            throw Error(`Unable to download zip: ${o.message}`)
        }
    }
}
