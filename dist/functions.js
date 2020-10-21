/* eslint-disable */
import { __awaiter, __generator } from "tslib";
import fetch from "node-fetch";
//Emitter for A/B Testing
export var emitterHandler = function (variant, name, url) { return __awaiter(void 0, void 0, void 0, function () {
    var post_body, response, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                post_body = {
                    name: name,
                    varA: variant === "A" ? 1 : 0,
                    varB: variant === "B" ? 1 : 0
                };
                return [4 /*yield*/, fetch(url, {
                        method: "POST",
                        headers: { "content-type": "application/x-www-form-urlencoded" },
                        body: JSON.stringify(post_body)
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                e_1 = _a.sent();
                return [2 /*return*/, e_1];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var queryBuilder = function (params) {
    var esc = encodeURIComponent;
    return Object.keys(params)
        .filter(function (key) { return params[key] !== undefined && params[key] && params[key] !== null; })
        .map(function (key) { return esc(key) + "=" + esc(params[key]); })
        .join("&");
};
