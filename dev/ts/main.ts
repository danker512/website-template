///<reference path="../../typings/index.d.ts" />

"use strict";

// node_modules
require("bxslider");
require("bootstrap");

// utility modules
import ScrollModule = require("./util/jquery.scroll");

// read jQuery
var $:JQueryStatic = require("jquery");

$(document).ready(function () {
    let scrollOption = {
        elem: "a[href^='#']",
        callback: scrollCallback
    };

    function scrollCallback() {
        console.log("animated!!");
    }

    var scroll:ScrollModule.Scroll = new ScrollModule.Scroll(scrollOption);

    $(".bxslider").bxSlider({
        slideWidth: 400
    });
});
