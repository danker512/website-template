///<reference path="../../typings/index.d.ts" />

"use strict";

// node_modules
require("bxslider");
require("bootstrap");

// read jQuery
var $:JQueryStatic = require("jquery");

$(document).ready(function () {
    $(".bxslider").bxSlider({
        slideWidth: 400
    });
});
