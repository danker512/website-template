///<reference path="../../typings/index.d.ts" />

"use strict";

// node_modules
require("jquery");
require("bxslider");
require("bootstrap");

(function ($) {
    $(document).ready(function () {
        $(".bxslider").bxSlider({
            slideWidth: 400
        });
    });
}(jQuery));
