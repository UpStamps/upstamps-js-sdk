import { __awaiter, __generator } from "tslib";
import fetch from "node-fetch";
//Utils
import { emitterHandler, queryBuilder } from "./functions";
//Constants
var apiUrl = "https://services.upstamps.com/api";
var UpStamps = /** @class */ (function () {
    function UpStamps(_a) {
        var clientId = _a.clientId, projectKey = _a.projectKey, envKey = _a.envKey;
        this.clientId = clientId;
        this.projectKey = projectKey;
        this.envKey = envKey;
    }
    UpStamps.prototype.scopes = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, data, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        url = apiUrl + "/" + this.clientId + "/" + this.projectKey + "/scopes/add";
                        return [4 /*yield*/, fetch(url, {
                                method: "POST",
                                headers: { "content-type": "application/x-www-form-urlencoded" },
                                body: JSON.stringify({
                                    name: params.name,
                                    email: params.email
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (data.response !== undefined && data.response.errors.length > 0) {
                            return [2 /*return*/, {
                                    error: true,
                                    message: "Uniqueness violation. duplicate email value violates unique constraint"
                                }];
                        }
                        else {
                            return [2 /*return*/, {
                                    error: false,
                                    success: true,
                                    message: "Scope created"
                                }];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UpStamps.prototype.flag = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, flags, data, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        url = apiUrl + "/" + this.clientId + "/" + this.projectKey + "/" + this.envKey + "/flags";
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        flags = (_a.sent()).flags;
                        data = flags.map(function (item) { return item.name; });
                        return [2 /*return*/, {
                                show: data.indexOf(name) !== -1
                            }];
                    case 3:
                        e_2 = _a.sent();
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UpStamps.prototype.remote = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, remotes, remote, verifyRemote, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        url = apiUrl + "/" + this.clientId + "/" + this.projectKey + "/" + this.envKey + "/remotes";
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        remotes = (_a.sent()).remotes;
                        remote = remotes.filter(function (item) { return item.name === name; });
                        verifyRemote = remote.length > 0;
                        return [2 /*return*/, verifyRemote
                                ? { show: true, data: remote[0].data }
                                : { show: false }];
                    case 3:
                        e_3 = _a.sent();
                        throw e_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UpStamps.prototype.test = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var variantTypes_1, url_1, response, ABTesting, result, show, randomVariant_1, onEmitter, e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        variantTypes_1 = ["A", "B"];
                        url_1 = apiUrl + "/" + this.clientId + "/" + this.projectKey + "/" + this.envKey + "/testing";
                        return [4 /*yield*/, fetch(url_1)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        ABTesting = (_a.sent()).ABTesting;
                        result = ABTesting.filter(function (item) { return item.name === name; });
                        show = result.length > 0;
                        randomVariant_1 = Math.floor(Math.random() * variantTypes_1.length);
                        onEmitter = function () { return __awaiter(_this, void 0, void 0, function () {
                            var e_5;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, emitterHandler(variantTypes_1[randomVariant_1], name, url_1)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                    case 2:
                                        e_5 = _a.sent();
                                        return [2 /*return*/, e_5];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [2 /*return*/, {
                                show: show,
                                variant: variantTypes_1[randomVariant_1],
                                emitter: onEmitter
                            }];
                    case 3:
                        e_4 = _a.sent();
                        throw e_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UpStamps.prototype.segment = function (name, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, query, response, segment, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        url = apiUrl + "/" + this.clientId + "/" + this.projectKey + "/" + this.envKey + "/segment";
                        query = queryBuilder({
                            name: name,
                            country: params.country,
                            client: params.client,
                            clientType: params.clientType
                        });
                        return [4 /*yield*/, fetch(url + "?" + query, {
                                method: "GET"
                            })];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        segment = (_a.sent()).segment;
                        return [2 /*return*/, {
                                show: segment.length > 0
                            }];
                    case 3:
                        e_6 = _a.sent();
                        throw e_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UpStamps;
}());
export default UpStamps;
