"use strict";
var power_assert_1 = require("power-assert");
var main_1 = require("../ts/main");
describe("Main", function () {
    it("should have a name", function () {
        var testTarget = new main_1.default('toshiyuki');
        power_assert_1.default.equal(testTarget.name, 'toshiyuki');
    });
});
//# sourceMappingURL=main.spec.js.map