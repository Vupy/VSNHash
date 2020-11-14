"use strict";
exports.__esModule = true;
var VshHash = /** @class */ (function () {
    function VshHash() {
    }
    VshHash.prototype.make_hash = function (text, salt, capo) {
        if (salt === void 0) { salt = 'vsninc'; }
        if (capo === void 0) { capo = ''; }
        var out = '';
        var s = 0;
        var sal;
        var numbers = [2, 3, 5, 7];
        var x;
        if (capo != '') {
            x = parseInt(capo[0]);
            sal = this.gen_salt(salt, capo[1]);
        }
        else {
            x = numbers[Math.floor(Math.random() * numbers.length)];
            sal = this.gen_salt(salt);
        }
        var keywork = parseInt(sal[1]) + parseInt(sal[sal.length - 1]);
        for (var _i = 0, salt_1 = salt; _i < salt_1.length; _i++) {
            var i = salt_1[_i];
            s += (i.charCodeAt(0) + 2) >> 1;
        }
        for (var _a = 0, text_1 = text; _a < text_1.length; _a++) {
            var i = text_1[_a];
            var n = (Math.pow(i.charCodeAt(0), 2) << 2) + 2 + s;
            n = n >> x;
            out += (n + keywork).toString(16);
        }
        out = ((parseInt(out, 16) << 1) * 13 + 3).toString(16);
        return sal + "." + x + out;
    };
    VshHash.prototype.gen_salt = function (salt, capo) {
        if (capo === void 0) { capo = ''; }
        var x = capo ? parseInt(capo) : Math.floor(Math.random() * 7) + 1;
        var n = "";
        var l = salt.length;
        for (var _i = 0, salt_2 = salt; _i < salt_2.length; _i++) {
            var i = salt_2[_i];
            n += ((i.charCodeAt(0) + 19 - l) >> x).toString(16);
        }
        return "" + x + parseInt(n, 16);
    };
    VshHash.prototype.verify = function (hash, word, salt) {
        if (salt === void 0) { salt = 'vsninc'; }
        var capos = hash.split('.')[1][0] + hash[0];
        var has = this.make_hash(word, salt, capos);
        console.log(hash, has);
        return hash == has;
    };
    return VshHash;
}());
exports["default"] = VshHash;
