"use strict";

var $:JQueryStatic = require("jquery");

interface OptionsType {
    elem:string;
    speed?:number;
    easing?:string;
    callback?:any;
}

export class Scroll {

    $body:JQuery;
    $elem:JQuery;

    constructor(private ops:OptionsType) {
        this.$body = $("html, body");
        this.$elem = $(ops.elem);
        this.handleEvents();
    }

    private handleEvents() {
        this.$elem.on("click", () => {
            this.scroll();
            return false;
        });
    }

    private scroll() {
        let target = this.getTarget(this.$elem);
        let topPosition = this.getOffsetTop(target);
        this.$body.animate({
            scrollTop: topPosition
        }, this.ops.speed, this.ops.easing).promise().done(() => {
            this.ops.callback();
        });
    }

    private getOffsetTop(target):number {
        return $(target).offset() ? $(target).offset().top : 0;
    }

    private getTarget($elem):string {
        return $elem.attr("href");
    }
}
