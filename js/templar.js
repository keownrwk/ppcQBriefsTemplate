jQuery.migrateTrace = false; //added for migration to jquery 1.9.0 - primarily fixing use of "browser" object deleted in 1.9.0

/*
 * SimpleModal 1.4.4 - jQuery Plugin
 * http://simplemodal.com/
 * Copyright (c) 2013 Eric Martin
 * Licensed under MIT and GPL
 * Date: Sun, Jan 20 2013 15:58:56 -0800
 */
(function (b) {
    "function" === typeof define && define.amd ? define(["jquery"], b) : b(jQuery)
})(function (b) {
    var j = [], n = b(document), k = navigator.userAgent.toLowerCase(), l = b(window), g = [], o = null, p = /msie/.test(k) && !/opera/.test(k), q = /opera/.test(k), m, r;
    m = p && /msie 6./.test(k) && "object" !== typeof window.XMLHttpRequest;
    r = p && /msie 7.0/.test(k);
    b.modal = function (a, h) {
        return b.modal.impl.init(a, h)
    };
    b.modal.close = function () {
        b.modal.impl.close()
    };
    b.modal.focus = function (a) {
        b.modal.impl.focus(a)
    };
    b.modal.setContainerDimensions =
        function () {
            b.modal.impl.setContainerDimensions()
        };
    b.modal.setPosition = function () {
        b.modal.impl.setPosition()
    };
    b.modal.update = function (a, h) {
        b.modal.impl.update(a, h)
    };
    b.fn.modal = function (a) {
        return b.modal.impl.init(this, a)
    };
    b.modal.defaults = {appendTo:"body", focus:!0, opacity:50, overlayId:"simplemodal-overlay", overlayCss:{}, containerId:"simplemodal-container", containerCss:{}, dataId:"simplemodal-data", dataCss:{}, minHeight:null, minWidth:null, maxHeight:null, maxWidth:null, autoResize:!1, autoPosition:!0, zIndex:1E3,
        close:!0, closeHTML:'<a class="modalCloseImg" title="Close"></a>', closeClass:"simplemodal-close", escClose:!0, overlayClose:!1, fixed:!0, position:null, persist:!1, modal:!0, onOpen:null, onShow:null, onClose:null};
    b.modal.impl = {d:{}, init:function (a, h) {
        if (this.d.data)return!1;
        o = p && !b.support.boxModel;
        this.o = b.extend({}, b.modal.defaults, h);
        this.zIndex = this.o.zIndex;
        this.occb = !1;
        if ("object" === typeof a) {
            if (a = a instanceof b ? a : b(a), this.d.placeholder = !1, 0 < a.parent().parent().size() && (a.before(b("<span></span>").attr("id",
                "simplemodal-placeholder").css({display:"none"})), this.d.placeholder = !0, this.display = a.css("display"), !this.o.persist))this.d.orig = a.clone(!0)
        } else if ("string" === typeof a || "number" === typeof a)a = b("<div></div>").html(a); else return alert("SimpleModal Error: Unsupported data type: " + typeof a), this;
        this.create(a);
        this.open();
        b.isFunction(this.o.onShow) && this.o.onShow.apply(this, [this.d]);
        return this
    }, create:function (a) {
        this.getDimensions();
        if (this.o.modal && m)this.d.iframe = b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss,
            {display:"none", opacity:0, position:"fixed", height:g[0], width:g[1], zIndex:this.o.zIndex, top:0, left:0})).appendTo(this.o.appendTo);
        this.d.overlay = b("<div></div>").attr("id", this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss, {display:"none", opacity:this.o.opacity / 100, height:this.o.modal ? j[0] : 0, width:this.o.modal ? j[1] : 0, position:"fixed", left:0, top:0, zIndex:this.o.zIndex + 1})).appendTo(this.o.appendTo);
        this.d.container = b("<div></div>").attr("id", this.o.containerId).addClass("simplemodal-container").css(b.extend({position:this.o.fixed ?
            "fixed" : "absolute"}, this.o.containerCss, {display:"none", zIndex:this.o.zIndex + 2})).append(this.o.close && this.o.closeHTML ? b(this.o.closeHTML).addClass(this.o.closeClass) : "").appendTo(this.o.appendTo);
        this.d.wrap = b("<div></div>").attr("tabIndex", -1).addClass("simplemodal-wrap").css({height:"100%", outline:0, width:"100%"}).appendTo(this.d.container);
        this.d.data = a.attr("id", a.attr("id") || this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss, {display:"none"})).appendTo("body");
        this.setContainerDimensions();
        this.d.data.appendTo(this.d.wrap);
        (m || o) && this.fixIE()
    }, bindEvents:function () {
        var a = this;
        b("." + a.o.closeClass).bind("click.simplemodal", function (b) {
            b.preventDefault();
            a.close()
        });
        a.o.modal && a.o.close && a.o.overlayClose && a.d.overlay.bind("click.simplemodal", function (b) {
            b.preventDefault();
            a.close()
        });
        n.bind("keydown.simplemodal", function (b) {
            a.o.modal && 9 === b.keyCode ? a.watchTab(b) : a.o.close && a.o.escClose && 27 === b.keyCode && (b.preventDefault(), a.close())
        });
        l.bind("resize.simplemodal orientationchange.simplemodal",
            function () {
                a.getDimensions();
                a.o.autoResize ? a.setContainerDimensions() : a.o.autoPosition && a.setPosition();
                m || o ? a.fixIE() : a.o.modal && (a.d.iframe && a.d.iframe.css({height:g[0], width:g[1]}), a.d.overlay.css({height:j[0], width:j[1]}))
            })
    }, unbindEvents:function () {
        b("." + this.o.closeClass).unbind("click.simplemodal");
        n.unbind("keydown.simplemodal");
        l.unbind(".simplemodal");
        this.d.overlay.unbind("click.simplemodal")
    }, fixIE:function () {
        var a = this.o.position;
        b.each([this.d.iframe || null, !this.o.modal ? null : this.d.overlay,
            "fixed" === this.d.container.css("position") ? this.d.container : null], function (b, e) {
            if (e) {
                var f = e[0].style;
                f.position = "absolute";
                if (2 > b)f.removeExpression("height"), f.removeExpression("width"), f.setExpression("height", 'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'), f.setExpression("width", 'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"'); else {
                    var c, d;
                    a && a.constructor ===
                        Array ? (c = a[0] ? "number" === typeof a[0] ? a[0].toString() : a[0].replace(/px/, "") : e.css("top").replace(/px/, ""), c = -1 === c.indexOf("%") ? c + ' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"' : parseInt(c.replace(/%/, "")) + ' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"', a[1] && (d = "number" === typeof a[1] ?
                        a[1].toString() : a[1].replace(/px/, ""), d = -1 === d.indexOf("%") ? d + ' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"' : parseInt(d.replace(/%/, "")) + ' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')) : (c = '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
                        d = '(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');
                    f.removeExpression("top");
                    f.removeExpression("left");
                    f.setExpression("top", c);
                    f.setExpression("left", d)
                }
            }
        })
    }, focus:function (a) {
        var h = this, a = a && -1 !== b.inArray(a, ["first", "last"]) ? a : "first", e = b(":input:enabled:visible:" + a, h.d.wrap);
        setTimeout(function () {
                0 < e.length ? e.focus() : h.d.wrap.focus()
            },
            10)
    }, getDimensions:function () {
        var a = "undefined" === typeof window.innerHeight ? l.height() : window.innerHeight;
        j = [n.height(), n.width()];
        g = [a, l.width()]
    }, getVal:function (a, b) {
        return a ? "number" === typeof a ? a : "auto" === a ? 0 : 0 < a.indexOf("%") ? parseInt(a.replace(/%/, "")) / 100 * ("h" === b ? g[0] : g[1]) : parseInt(a.replace(/px/, "")) : null
    }, update:function (a, b) {
        if (!this.d.data)return!1;
        this.d.origHeight = this.getVal(a, "h");
        this.d.origWidth = this.getVal(b, "w");
        this.d.data.hide();
        a && this.d.container.css("height", a);
        b && this.d.container.css("width",
            b);
        this.setContainerDimensions();
        this.d.data.show();
        this.o.focus && this.focus();
        this.unbindEvents();
        this.bindEvents()
    }, setContainerDimensions:function () {
        var a = m || r, b = this.d.origHeight ? this.d.origHeight : q ? this.d.container.height() : this.getVal(a ? this.d.container[0].currentStyle.height : this.d.container.css("height"), "h"), a = this.d.origWidth ? this.d.origWidth : q ? this.d.container.width() : this.getVal(a ? this.d.container[0].currentStyle.width : this.d.container.css("width"), "w"), e = this.d.data.outerHeight(!0), f =
            this.d.data.outerWidth(!0);
        this.d.origHeight = this.d.origHeight || b;
        this.d.origWidth = this.d.origWidth || a;
        var c = this.o.maxHeight ? this.getVal(this.o.maxHeight, "h") : null, d = this.o.maxWidth ? this.getVal(this.o.maxWidth, "w") : null, c = c && c < g[0] ? c : g[0], d = d && d < g[1] ? d : g[1], i = this.o.minHeight ? this.getVal(this.o.minHeight, "h") : "auto", b = b ? this.o.autoResize && b > c ? c : b < i ? i : b : e ? e > c ? c : this.o.minHeight && "auto" !== i && e < i ? i : e : i, c = this.o.minWidth ? this.getVal(this.o.minWidth, "w") : "auto", a = a ? this.o.autoResize && a > d ? d : a < c ? c : a : f ?
            f > d ? d : this.o.minWidth && "auto" !== c && f < c ? c : f : c;
        this.d.container.css({height:b, width:a});
        this.d.wrap.css({overflow:e > b || f > a ? "auto" : "visible"});
        this.o.autoPosition && this.setPosition()
    }, setPosition:function () {
        var a, b;
        a = g[0] / 2 - this.d.container.outerHeight(!0) / 2;
        b = g[1] / 2 - this.d.container.outerWidth(!0) / 2;
        var e = "fixed" !== this.d.container.css("position") ? l.scrollTop() : 0;
        this.o.position && "[object Array]" === Object.prototype.toString.call(this.o.position) ? (a = e + (this.o.position[0] || a), b = this.o.position[1] || b) :
            a = e + a;
        this.d.container.css({left:b, top:a})
    }, watchTab:function (a) {
        if (0 < b(a.target).parents(".simplemodal-container").length) {
            if (this.inputs = b(":input:enabled:visible:first, :input:enabled:visible:last", this.d.data[0]), !a.shiftKey && a.target === this.inputs[this.inputs.length - 1] || a.shiftKey && a.target === this.inputs[0] || 0 === this.inputs.length)a.preventDefault(), this.focus(a.shiftKey ? "last" : "first")
        } else a.preventDefault(), this.focus()
    }, open:function () {
        this.d.iframe && this.d.iframe.show();
        b.isFunction(this.o.onOpen) ?
            this.o.onOpen.apply(this, [this.d]) : (this.d.overlay.show(), this.d.container.show(), this.d.data.show());
        this.o.focus && this.focus();
        this.bindEvents()
    }, close:function () {
        if (!this.d.data)return!1;
        this.unbindEvents();
        if (b.isFunction(this.o.onClose) && !this.occb)this.occb = !0, this.o.onClose.apply(this, [this.d]); else {
            if (this.d.placeholder) {
                var a = b("#simplemodal-placeholder");
                this.o.persist ? a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display", this.display)) : (this.d.data.hide().remove(), a.replaceWith(this.d.orig))
            } else this.d.data.hide().remove();
            this.d.container.hide().remove();
            this.d.overlay.hide();
            this.d.iframe && this.d.iframe.hide().remove();
            this.d.overlay.remove();
            this.d = {}
        }
    }}
});

/**
 * jQuery.ScrollTo
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 *
 * @projectDescription Easy element scrolling using jQuery.
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 * Works with jQuery +1.2.6. Tested on FF 2/3, IE 6/7/8, Opera 9.5/6, Safari 3, Chrome 1 on WinXP.
 *
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * @id jQuery.scrollTo
 * @id jQuery.fn.scrollTo
 * @param {String, Number, DOMElement, jQuery, Object} target Where to scroll the matched elements.
 *      The different options for target are:
 *        - A number position (will be applied to all axes).
 *        - A string position ('44', '100px', '+=90', etc ) will be applied to all axes
 *        - A jQuery/DOM element ( logically, child of the element to scroll )
 *        - A string selector, that will be relative to the element to scroll ( 'li:eq(2)', etc )
 *        - A hash { top:x, left:y }, x and y can be any kind of number/string like above.
 *        - A percentage of the container's dimension/s, for example: 50% to go to the middle.
 *        - The string 'max' for go-to-end.
 * @param {Number} duration The OVERALL length of the animation, this argument can be the settings object instead.
 * @param {Object,Function} settings Optional set of settings or the onAfter callback.
 *     @option {String} axis Which axis must be scrolled, use 'x', 'y', 'xy' or 'yx'.
 *     @option {Number} duration The OVERALL length of the animation.
 *     @option {String} easing The easing method for the animation.
 *     @option {Boolean} margin If true, the margin of the target element will be deducted from the final position.
 *     @option {Object, Number} offset Add/deduct from the end position. One number for both axes or { top:x, left:y }.
 *     @option {Object, Number} over Add/deduct the height/width multiplied by 'over', can be { top:x, left:y } when using both axes.
 *     @option {Boolean} queue If true, and both axis are given, the 2nd axis will only be animated after the first one ends.
 *     @option {Function} onAfter Function to be called after the scrolling ends.
 *     @option {Function} onAfterFirst If queuing is activated, this function will be called after the first scrolling ends.
 * @return {jQuery} Returns the same jQuery object, for chaining.
 *
 * @desc Scroll to a fixed position
 * @example $('div').scrollTo( 340 );
 *
 * @desc Scroll relatively to the actual position
 * @example $('div').scrollTo( '+=340px', { axis:'y' } );
 *
 * @dec Scroll using a selector (relative to the scrolled element)
 * @example $('div').scrollTo( 'p.paragraph:eq(2)', 500, { easing:'swing', queue:true, axis:'xy' } );
 *
 * @ Scroll to a DOM element (same for jQuery object)
 * @example var second_child = document.getElementById('container').firstChild.nextSibling;
 *            $('#container').scrollTo( second_child, { duration:500, axis:'x', onAfter:function(){
 *				alert('scrolled!!');																   
 *			}});
 *
 * @desc Scroll on both axes, to different values
 * @example $('div').scrollTo( { top: 300, left:'+=200' }, { axis:'xy', offset:-20 } );
 */
;
(function ($) {

    var $scrollTo = $.scrollTo = function (target, duration, settings) {
        $(window).scrollTo(target, duration, settings);
    };

    $scrollTo.defaults = {
        axis:'xy',
        duration:parseFloat($.fn.jquery) >= 1.3 ? 0 : 1
    };

    // Returns the element that needs to be animated to scroll the window.
    // Kept for backwards compatibility (specially for localScroll & serialScroll)
    $scrollTo.window = function (scope) {
        return $(window)._scrollable();
    };

    // Hack, hack, hack :)
    // Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
    $.fn._scrollable = function () {
        return this.map(function () {
            var elem = this,
                isWin = !elem.nodeName || $.inArray(elem.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;

            if (!isWin)
                return elem;

            var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;

            return $.browser.safari || doc.compatMode == 'BackCompat' ?
                doc.body :
                doc.documentElement;
        });
    };

    $.fn.scrollTo = function (target, duration, settings) {
        if (typeof duration == 'object') {
            settings = duration;
            duration = 0;
        }
        if (typeof settings == 'function')
            settings = { onAfter:settings };

        if (target == 'max')
            target = 9e9;

        settings = $.extend({}, $scrollTo.defaults, settings);
        // Speed is still recognized for backwards compatibility
        duration = duration || settings.speed || settings.duration;
        // Make sure the settings are given right
        settings.queue = settings.queue && settings.axis.length > 1;

        if (settings.queue)
        // Let's keep the overall duration
            duration /= 2;
        settings.offset = both(settings.offset);
        settings.over = both(settings.over);

        return this._scrollable().each(function () {
            var elem = this,
                $elem = $(elem),
                targ = target, toff, attr = {},
                win = $elem.is('html,body');

            switch (typeof targ) {
                // A number will pass the regex
                case 'number':
                case 'string':
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
                        targ = both(targ);
                        // We are done
                        break;
                    }
                    // Relative selector, no break!
                    targ = $(targ, this);
                case 'object':
                    // DOMElement / jQuery
                    if (targ.is || targ.style)
                    // Get the real position of the target 
                        toff = (targ = $(targ)).offset();
            }
            $.each(settings.axis.split(''), function (i, axis) {
                var Pos = axis == 'x' ? 'Left' : 'Top',
                    pos = Pos.toLowerCase(),
                    key = 'scroll' + Pos,
                    old = elem[key],
                    max = $scrollTo.max(elem, axis);

                if (toff) {// jQuery / DOMElement
                    attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

                    // If it's a dom element, reduce the margin
                    if (settings.margin) {
                        attr[key] -= parseInt(targ.css('margin' + Pos)) || 0;
                        attr[key] -= parseInt(targ.css('border' + Pos + 'Width')) || 0;
                    }

                    attr[key] += settings.offset[pos] || 0;

                    if (settings.over[pos])
                    // Scroll to a fraction of its width/height
                        attr[key] += targ[axis == 'x' ? 'width' : 'height']() * settings.over[pos];
                } else {
                    var val = targ[pos];
                    // Handle percentage values
                    attr[key] = val.slice && val.slice(-1) == '%' ?
                        parseFloat(val) / 100 * max
                        : val;
                }

                // Number or 'number'
                if (/^\d+$/.test(attr[key]))
                // Check the limits
                    attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);

                // Queueing axes
                if (!i && settings.queue) {
                    // Don't waste time animating, if there's no need.
                    if (old != attr[key])
                    // Intermediate animation
                        animate(settings.onAfterFirst);
                    // Don't animate this axis again in the next iteration.
                    delete attr[key];
                }
            });

            animate(settings.onAfter);

            function animate(callback) {
                $elem.animate(attr, duration, settings.easing, callback && function () {
                    callback.call(this, target, settings);
                });
            }

            ;

        }).end();
    };

    // Max scrolling position, works on quirks mode
    // It only fails (not too badly) on IE, quirks mode.
    $scrollTo.max = function (elem, axis) {
        var Dim = axis == 'x' ? 'Width' : 'Height',
            scroll = 'scroll' + Dim;

        if (!$(elem).is('html,body'))
            return elem[scroll] - $(elem)[Dim.toLowerCase()]();

        var size = 'client' + Dim,
            html = elem.ownerDocument.documentElement,
            body = elem.ownerDocument.body;

        return Math.max(html[scroll], body[scroll])
            - Math.min(html[size], body[size]);

    };

    function both(val) {
        return typeof val == 'object' ? val : { top:val, left:val };
    }

    ;

})(jQuery);
/*!
 * jQuery QueryString v0.9.0 (Beta version)
 *
 * http://www.darlesson.com/
 *
 * Copyright 2010, Darlesson Oliveira
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * @requires jQuery v1.3.2 or above
 *
 * Reporting bugs, comments or suggestions: http://darlesson.com/contact/
 * Documentation and other jQuery plug-ins: http://darlesson.com/jquery/
 * Donations are welcome: http://darlesson.com/donate/
 */

(function ($) {
    $.QueryString = function (queryString, options) {
        var defaults = {href:window.location.href, index:null, isCaseSensitive:true}, settings = $.extend({}, defaults, options);
        var isCaseSensitive = settings.isCaseSensitive, queryString = (queryString == null) ? null : (isCaseSensitive) ? queryString.toString() : queryString.toString().toLowerCase(), href = settings.href.toString(), href = (href.lastIndexOf("?") > -1) ? href.substring(href.lastIndexOf("?") + 1, href.length) : null;
        this.size = 0;
        if (href && !queryString) {
            var arr = href.split("&"), arrValue = "", thisObject = "";
            this.size = arr.length;
            for (var x = 0; x < arr.length; x++) {
                var query = (isCaseSensitive) ? arr[x].split("=")[0] : arr[x].split("=")[0].toLowerCase(), value = arr[x].split("=")[1], insertComma = (arrValue == "") ? "[{" : ", ";
                arrValue += (insertComma + "" + query + " : '" + value + "'");
                thisObject += ("this." + query + " = '" + value + "';");
            }
            arrValue = eval(arrValue + "}]")[0];
            eval(thisObject);
            return this;
        } else if (href && queryString && href.indexOf(queryString + "=") > -1) {
            var arr = href.split("&"), firstItemValue = null, count = 0, arrValue = new Array();
            for (var x = 0; x < arr.length; x++) {
                var query = (isCaseSensitive) ? arr[x].split("=")[0] : arr[x].split("=")[0].toLowerCase(), value = arr[x].split("=")[1];
                if (isNaN(settings.index) || settings.index > arr.length) {
                    return null;
                } else if (query == queryString && settings.index === x) {
                    return value;
                } else if (query == queryString) {
                    if (!firstItemValue) {
                        firstItemValue = value;
                    }
                    ;
                    arrValue[count] = value;
                    count += 1;
                }
                ;
            }
            ;
            if (arrValue.length > 1) {
                return arrValue;
            } else {
                return firstItemValue;
            }
            ;
        } else if (href && queryString && href.indexOf(queryString + "=") == -1) {
            return null;
        }
        ;
        return null;
    };
})(jQuery);
/*
 * jScrollPane - v2.0.0beta11 - 2011-07-04
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2010 Kelvin Luck
 * Dual licensed under the MIT and GPL licenses.
 */
(function (b, a, c) {
    b.fn.jScrollPane = function (e) {
        function d(D, O) {
            var az, Q = this, Y, ak, v, am, T, Z, y, q, aA, aF, av, i, I, h, j, aa, U, aq, X, t, A, ar, af, an, G, l, au, ay, x, aw, aI, f, L, aj = true, P = true, aH = false, k = false, ap = D.clone(false, false).empty(), ac = b.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
            aI = D.css("paddingTop") + " " + D.css("paddingRight") + " " + D.css("paddingBottom") + " " + D.css("paddingLeft");
            f = (parseInt(D.css("paddingLeft"), 10) || 0) + (parseInt(D.css("paddingRight"), 10) || 0);
            function at(aR) {
                var aM, aO, aN, aK, aJ, aQ, aP = false, aL = false;
                az = aR;
                if (Y === c) {
                    aJ = D.scrollTop();
                    aQ = D.scrollLeft();
                    D.css({overflow:"hidden", padding:0});
                    ak = D.innerWidth() + f;
                    v = D.innerHeight();
                    D.width(ak);
                    Y = b('<div class="jspPane" />').css("padding", aI).append(D.children());
                    am = b('<div class="jspContainer" />').css({width:ak + "px", height:v + "px"}).append(Y).appendTo(D)
                } else {
                    D.css("width", "");
                    aP = az.stickToBottom && K();
                    aL = az.stickToRight && B();
                    aK = D.innerWidth() + f != ak || D.outerHeight() != v;
                    if (aK) {
                        ak = D.innerWidth() + f;
                        v = D.innerHeight();
                        am.css({width:ak + "px", height:v + "px"})
                    }
                    if (!aK && L == T && Y.outerHeight() == Z) {
                        D.width(ak);
                        return
                    }
                    L = T;
                    Y.css("width", "");
                    D.width(ak);
                    am.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
                }
                Y.css("overflow", "auto");
                if (aR.contentWidth) {
                    T = aR.contentWidth
                } else {
                    T = Y[0].scrollWidth
                }
                Z = Y[0].scrollHeight;
                Y.css("overflow", "");
                y = T / ak;
                q = Z / v;
                aA = q > 1;
                aF = y > 1;
                if (!(aF || aA)) {
                    D.removeClass("jspScrollable");
                    Y.css({top:0, width:am.width() - f});
                    n();
                    E();
                    R();
                    w();
                    ai()
                } else {
                    D.addClass("jspScrollable");
                    aM = az.maintainPosition && (I || aa);
                    if (aM) {
                        aO = aD();
                        aN = aB()
                    }
                    aG();
                    z();
                    F();
                    if (aM) {
                        N(aL ? (T - ak) : aO, false);
                        M(aP ? (Z - v) : aN, false)
                    }
                    J();
                    ag();
                    ao();
                    if (az.enableKeyboardNavigation) {
                        S()
                    }
                    if (az.clickOnTrack) {
                        p()
                    }
                    C();
                    if (az.hijackInternalLinks) {
                        m()
                    }
                }
                if (az.autoReinitialise && !aw) {
                    aw = setInterval(function () {
                        at(az)
                    }, az.autoReinitialiseDelay)
                } else {
                    if (!az.autoReinitialise && aw) {
                        clearInterval(aw)
                    }
                }
                aJ && D.scrollTop(0) && M(aJ, false);
                aQ && D.scrollLeft(0) && N(aQ, false);
                D.trigger("jsp-initialised", [aF || aA])
            }

            function aG() {
                if (aA) {
                    am.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'), b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'), b('<div class="jspDragBottom" />'))), b('<div class="jspCap jspCapBottom" />')));
                    U = am.find(">.jspVerticalBar");
                    aq = U.find(">.jspTrack");
                    av = aq.find(">.jspDrag");
                    if (az.showArrows) {
                        ar = b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", aE(0, -1)).bind("click.jsp", aC);
                        af = b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", aE(0, 1)).bind("click.jsp", aC);
                        if (az.arrowScrollOnHover) {
                            ar.bind("mouseover.jsp", aE(0, -1, ar));
                            af.bind("mouseover.jsp", aE(0, 1, af))
                        }
                        al(aq, az.verticalArrowPositions, ar, af)
                    }
                    t = v;
                    am.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function () {
                        t -= b(this).outerHeight()
                    });
                    av.hover(function () {
                        av.addClass("jspHover")
                    },function () {
                        av.removeClass("jspHover")
                    }).bind("mousedown.jsp", function (aJ) {
                            b("html").bind("dragstart.jsp selectstart.jsp", aC);
                            av.addClass("jspActive");
                            var s = aJ.pageY - av.position().top;
                            b("html").bind("mousemove.jsp",function (aK) {
                                V(aK.pageY - s, false)
                            }).bind("mouseup.jsp mouseleave.jsp", ax);
                            return false
                        });
                    o()
                }
            }

            function o() {
                aq.height(t + "px");
                I = 0;
                X = az.verticalGutter + aq.outerWidth();
                Y.width(ak - X - f);
                try {
                    if (U.position().left === 0) {
                        Y.css("margin-left", X + "px")
                    }
                } catch (s) {
                }
            }

            function z() {
                if (aF) {
                    am.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'), b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'), b('<div class="jspDragRight" />'))), b('<div class="jspCap jspCapRight" />')));
                    an = am.find(">.jspHorizontalBar");
                    G = an.find(">.jspTrack");
                    h = G.find(">.jspDrag");
                    if (az.showArrows) {
                        ay = b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", aE(-1, 0)).bind("click.jsp", aC);
                        x = b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", aE(1, 0)).bind("click.jsp", aC);
                        if (az.arrowScrollOnHover) {
                            ay.bind("mouseover.jsp", aE(-1, 0, ay));
                            x.bind("mouseover.jsp", aE(1, 0, x))
                        }
                        al(G, az.horizontalArrowPositions, ay, x)
                    }
                    h.hover(function () {
                        h.addClass("jspHover")
                    },function () {
                        h.removeClass("jspHover")
                    }).bind("mousedown.jsp", function (aJ) {
                            b("html").bind("dragstart.jsp selectstart.jsp", aC);
                            h.addClass("jspActive");
                            var s = aJ.pageX - h.position().left;
                            b("html").bind("mousemove.jsp",function (aK) {
                                W(aK.pageX - s, false)
                            }).bind("mouseup.jsp mouseleave.jsp", ax);
                            return false
                        });
                    l = am.innerWidth();
                    ah()
                }
            }

            function ah() {
                am.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function () {
                    l -= b(this).outerWidth()
                });
                G.width(l + "px");
                aa = 0
            }

            function F() {
                if (aF && aA) {
                    var aJ = G.outerHeight(), s = aq.outerWidth();
                    t -= aJ;
                    b(an).find(">.jspCap:visible,>.jspArrow").each(function () {
                        l += b(this).outerWidth()
                    });
                    l -= s;
                    v -= s;
                    ak -= aJ;
                    G.parent().append(b('<div class="jspCorner" />').css("width", aJ + "px"));
                    o();
                    ah()
                }
                if (aF) {
                    Y.width((am.outerWidth() - f) + "px")
                }
                Z = Y.outerHeight();
                q = Z / v;
                if (aF) {
                    au = Math.ceil(1 / y * l);
                    if (au > az.horizontalDragMaxWidth) {
                        au = az.horizontalDragMaxWidth
                    } else {
                        if (au < az.horizontalDragMinWidth) {
                            au = az.horizontalDragMinWidth
                        }
                    }
                    h.width(au + "px");
                    j = l - au;
                    ae(aa)
                }
                if (aA) {
                    A = Math.ceil(1 / q * t);
                    if (A > az.verticalDragMaxHeight) {
                        A = az.verticalDragMaxHeight
                    } else {
                        if (A < az.verticalDragMinHeight) {
                            A = az.verticalDragMinHeight
                        }
                    }
                    av.height(A + "px");
                    i = t - A;
                    ad(I)
                }
            }

            function al(aK, aM, aJ, s) {
                var aO = "before", aL = "after", aN;
                if (aM == "os") {
                    aM = /Mac/.test(navigator.platform) ? "after" : "split"
                }
                if (aM == aO) {
                    aL = aM
                } else {
                    if (aM == aL) {
                        aO = aM;
                        aN = aJ;
                        aJ = s;
                        s = aN
                    }
                }
                aK[aO](aJ)[aL](s)
            }

            function aE(aJ, s, aK) {
                return function () {
                    H(aJ, s, this, aK);
                    this.blur();
                    return false
                }
            }

            function H(aM, aL, aP, aO) {
                aP = b(aP).addClass("jspActive");
                var aN, aK, aJ = true, s = function () {
                    if (aM !== 0) {
                        Q.scrollByX(aM * az.arrowButtonSpeed)
                    }
                    if (aL !== 0) {
                        Q.scrollByY(aL * az.arrowButtonSpeed)
                    }
                    aK = setTimeout(s, aJ ? az.initialDelay : az.arrowRepeatFreq);
                    aJ = false
                };
                s();
                aN = aO ? "mouseout.jsp" : "mouseup.jsp";
                aO = aO || b("html");
                aO.bind(aN, function () {
                    aP.removeClass("jspActive");
                    aK && clearTimeout(aK);
                    aK = null;
                    aO.unbind(aN)
                })
            }

            function p() {
                w();
                if (aA) {
                    aq.bind("mousedown.jsp", function (aO) {
                        if (aO.originalTarget === c || aO.originalTarget == aO.currentTarget) {
                            var aM = b(this), aP = aM.offset(), aN = aO.pageY - aP.top - I, aK, aJ = true, s = function () {
                                var aS = aM.offset(), aT = aO.pageY - aS.top - A / 2, aQ = v * az.scrollPagePercent, aR = i * aQ / (Z - v);
                                if (aN < 0) {
                                    if (I - aR > aT) {
                                        Q.scrollByY(-aQ)
                                    } else {
                                        V(aT)
                                    }
                                } else {
                                    if (aN > 0) {
                                        if (I + aR < aT) {
                                            Q.scrollByY(aQ)
                                        } else {
                                            V(aT)
                                        }
                                    } else {
                                        aL();
                                        return
                                    }
                                }
                                aK = setTimeout(s, aJ ? az.initialDelay : az.trackClickRepeatFreq);
                                aJ = false
                            }, aL = function () {
                                aK && clearTimeout(aK);
                                aK = null;
                                b(document).unbind("mouseup.jsp", aL)
                            };
                            s();
                            b(document).bind("mouseup.jsp", aL);
                            return false
                        }
                    })
                }
                if (aF) {
                    G.bind("mousedown.jsp", function (aO) {
                        if (aO.originalTarget === c || aO.originalTarget == aO.currentTarget) {
                            var aM = b(this), aP = aM.offset(), aN = aO.pageX - aP.left - aa, aK, aJ = true, s = function () {
                                var aS = aM.offset(), aT = aO.pageX - aS.left - au / 2, aQ = ak * az.scrollPagePercent, aR = j * aQ / (T - ak);
                                if (aN < 0) {
                                    if (aa - aR > aT) {
                                        Q.scrollByX(-aQ)
                                    } else {
                                        W(aT)
                                    }
                                } else {
                                    if (aN > 0) {
                                        if (aa + aR < aT) {
                                            Q.scrollByX(aQ)
                                        } else {
                                            W(aT)
                                        }
                                    } else {
                                        aL();
                                        return
                                    }
                                }
                                aK = setTimeout(s, aJ ? az.initialDelay : az.trackClickRepeatFreq);
                                aJ = false
                            }, aL = function () {
                                aK && clearTimeout(aK);
                                aK = null;
                                b(document).unbind("mouseup.jsp", aL)
                            };
                            s();
                            b(document).bind("mouseup.jsp", aL);
                            return false
                        }
                    })
                }
            }

            function w() {
                if (G) {
                    G.unbind("mousedown.jsp")
                }
                if (aq) {
                    aq.unbind("mousedown.jsp")
                }
            }

            function ax() {
                b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");
                if (av) {
                    av.removeClass("jspActive")
                }
                if (h) {
                    h.removeClass("jspActive")
                }
            }

            function V(s, aJ) {
                if (!aA) {
                    return
                }
                if (s < 0) {
                    s = 0
                } else {
                    if (s > i) {
                        s = i
                    }
                }
                if (aJ === c) {
                    aJ = az.animateScroll
                }
                if (aJ) {
                    Q.animate(av, "top", s, ad)
                } else {
                    av.css("top", s);
                    ad(s)
                }
            }

            function ad(aJ) {
                if (aJ === c) {
                    aJ = av.position().top
                }
                am.scrollTop(0);
                I = aJ;
                var aM = I === 0, aK = I == i, aL = aJ / i, s = -aL * (Z - v);
                if (aj != aM || aH != aK) {
                    aj = aM;
                    aH = aK;
                    D.trigger("jsp-arrow-change", [aj, aH, P, k])
                }
                u(aM, aK);
                Y.css("top", s);
                D.trigger("jsp-scroll-y", [-s, aM, aK]).trigger("scroll")
            }

            function W(aJ, s) {
                if (!aF) {
                    return
                }
                if (aJ < 0) {
                    aJ = 0
                } else {
                    if (aJ > j) {
                        aJ = j
                    }
                }
                if (s === c) {
                    s = az.animateScroll
                }
                if (s) {
                    Q.animate(h, "left", aJ, ae)
                } else {
                    h.css("left", aJ);
                    ae(aJ)
                }
            }

            function ae(aJ) {
                if (aJ === c) {
                    aJ = h.position().left
                }
                am.scrollTop(0);
                aa = aJ;
                var aM = aa === 0, aL = aa == j, aK = aJ / j, s = -aK * (T - ak);
                if (P != aM || k != aL) {
                    P = aM;
                    k = aL;
                    D.trigger("jsp-arrow-change", [aj, aH, P, k])
                }
                r(aM, aL);
                Y.css("left", s);
                D.trigger("jsp-scroll-x", [-s, aM, aL]).trigger("scroll")
            }

            function u(aJ, s) {
                if (az.showArrows) {
                    ar[aJ ? "addClass" : "removeClass"]("jspDisabled");
                    af[s ? "addClass" : "removeClass"]("jspDisabled")
                }
            }

            function r(aJ, s) {
                if (az.showArrows) {
                    ay[aJ ? "addClass" : "removeClass"]("jspDisabled");
                    x[s ? "addClass" : "removeClass"]("jspDisabled")
                }
            }

            function M(s, aJ) {
                var aK = s / (Z - v);
                V(aK * i, aJ)
            }

            function N(aJ, s) {
                var aK = aJ / (T - ak);
                W(aK * j, s)
            }

            function ab(aW, aR, aK) {
                var aO, aL, aM, s = 0, aV = 0, aJ, aQ, aP, aT, aS, aU;
                try {
                    aO = b(aW)
                } catch (aN) {
                    return
                }
                aL = aO.outerHeight();
                aM = aO.outerWidth();
                am.scrollTop(0);
                am.scrollLeft(0);
                while (!aO.is(".jspPane")) {
                    s += aO.position().top;
                    aV += aO.position().left;
                    aO = aO.offsetParent();
                    if (/^body|html$/i.test(aO[0].nodeName)) {
                        return
                    }
                }
                aJ = aB();
                aP = aJ + v;
                if (s < aJ || aR) {
                    aS = s - az.verticalGutter
                } else {
                    if (s + aL > aP) {
                        aS = s - v + aL + az.verticalGutter
                    }
                }
                if (aS) {
                    M(aS, aK)
                }
                aQ = aD();
                aT = aQ + ak;
                if (aV < aQ || aR) {
                    aU = aV - az.horizontalGutter
                } else {
                    if (aV + aM > aT) {
                        aU = aV - ak + aM + az.horizontalGutter
                    }
                }
                if (aU) {
                    N(aU, aK)
                }
            }

            function aD() {
                return -Y.position().left
            }

            function aB() {
                return -Y.position().top
            }

            function K() {
                var s = Z - v;
                return(s > 20) && (s - aB() < 10)
            }

            function B() {
                var s = T - ak;
                return(s > 20) && (s - aD() < 10)
            }

            function ag() {
                am.unbind(ac).bind(ac, function (aM, aN, aL, aJ) {
                    var aK = aa, s = I;
                    Q.scrollBy(aL * az.mouseWheelSpeed, -aJ * az.mouseWheelSpeed, false);
                    return aK == aa && s == I
                })
            }

            function n() {
                am.unbind(ac)
            }

            function aC() {
                return false
            }

            function J() {
                Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function (s) {
                    ab(s.target, false)
                })
            }

            function E() {
                Y.find(":input,a").unbind("focus.jsp")
            }

            function S() {
                var s, aJ, aL = [];
                aF && aL.push(an[0]);
                aA && aL.push(U[0]);
                Y.focus(function () {
                    D.focus()
                });
                D.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function (aO) {
                    if (aO.target !== this && !(aL.length && b(aO.target).closest(aL).length)) {
                        return
                    }
                    var aN = aa, aM = I;
                    switch (aO.keyCode) {
                        case 40:
                        case 38:
                        case 34:
                        case 32:
                        case 33:
                        case 39:
                        case 37:
                            s = aO.keyCode;
                            aK();
                            break;
                        case 35:
                            M(Z - v);
                            s = null;
                            break;
                        case 36:
                            M(0);
                            s = null;
                            break
                    }
                    aJ = aO.keyCode == s && aN != aa || aM != I;
                    return !aJ
                }).bind("keypress.jsp", function (aM) {
                        if (aM.keyCode == s) {
                            aK()
                        }
                        return !aJ
                    });
                if (az.hideFocus) {
                    D.css("outline", "none");
                    if ("hideFocus" in am[0]) {
                        D.attr("hideFocus", true)
                    }
                } else {
                    D.css("outline", "");
                    if ("hideFocus" in am[0]) {
                        D.attr("hideFocus", false)
                    }
                }
                function aK() {
                    var aN = aa, aM = I;
                    switch (s) {
                        case 40:
                            Q.scrollByY(az.keyboardSpeed, false);
                            break;
                        case 38:
                            Q.scrollByY(-az.keyboardSpeed, false);
                            break;
                        case 34:
                        case 32:
                            Q.scrollByY(v * az.scrollPagePercent, false);
                            break;
                        case 33:
                            Q.scrollByY(-v * az.scrollPagePercent, false);
                            break;
                        case 39:
                            Q.scrollByX(az.keyboardSpeed, false);
                            break;
                        case 37:
                            Q.scrollByX(-az.keyboardSpeed, false);
                            break
                    }
                    aJ = aN != aa || aM != I;
                    return aJ
                }
            }

            function R() {
                D.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")
            }

            function C() {
                if (location.hash && location.hash.length > 1) {
                    var aL, aJ, aK = escape(location.hash);
                    try {
                        aL = b(aK)
                    } catch (s) {
                        return
                    }
                    if (aL.length && Y.find(aK)) {
                        if (am.scrollTop() === 0) {
                            aJ = setInterval(function () {
                                if (am.scrollTop() > 0) {
                                    ab(aK, true);
                                    b(document).scrollTop(am.position().top);
                                    clearInterval(aJ)
                                }
                            }, 50)
                        } else {
                            ab(aK, true);
                            b(document).scrollTop(am.position().top)
                        }
                    }
                }
            }

            function ai() {
                b("a.jspHijack").unbind("click.jsp-hijack").removeClass("jspHijack")
            }

            function m() {
                ai();
                b("a[href^=#]").addClass("jspHijack").bind("click.jsp-hijack", function () {
                    var s = this.href.split("#"), aJ;
                    if (s.length > 1) {
                        aJ = s[1];
                        if (aJ.length > 0 && Y.find("#" + aJ).length > 0) {
                            ab("#" + aJ, true);
                            return false
                        }
                    }
                })
            }

            function ao() {
                var aK, aJ, aM, aL, aN, s = false;
                am.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function (aO) {
                    var aP = aO.originalEvent.touches[0];
                    aK = aD();
                    aJ = aB();
                    aM = aP.pageX;
                    aL = aP.pageY;
                    aN = false;
                    s = true
                }).bind("touchmove.jsp",function (aR) {
                        if (!s) {
                            return
                        }
                        var aQ = aR.originalEvent.touches[0], aP = aa, aO = I;
                        Q.scrollTo(aK + aM - aQ.pageX, aJ + aL - aQ.pageY);
                        aN = aN || Math.abs(aM - aQ.pageX) > 5 || Math.abs(aL - aQ.pageY) > 5;
                        return aP == aa && aO == I
                    }).bind("touchend.jsp",function (aO) {
                        s = false
                    }).bind("click.jsp-touchclick", function (aO) {
                        if (aN) {
                            aN = false;
                            return false
                        }
                    })
            }

            function g() {
                var s = aB(), aJ = aD();
                D.removeClass("jspScrollable").unbind(".jsp");
                D.replaceWith(ap.append(Y.children()));
                ap.scrollTop(s);
                ap.scrollLeft(aJ)
            }

            b.extend(Q, {reinitialise:function (aJ) {
                aJ = b.extend({}, az, aJ);
                at(aJ)
            }, scrollToElement:function (aK, aJ, s) {
                ab(aK, aJ, s)
            }, scrollTo:function (aK, s, aJ) {
                N(aK, aJ);
                M(s, aJ)
            }, scrollToX:function (aJ, s) {
                N(aJ, s)
            }, scrollToY:function (s, aJ) {
                M(s, aJ)
            }, scrollToPercentX:function (aJ, s) {
                N(aJ * (T - ak), s)
            }, scrollToPercentY:function (aJ, s) {
                M(aJ * (Z - v), s)
            }, scrollBy:function (aJ, s, aK) {
                Q.scrollByX(aJ, aK);
                Q.scrollByY(s, aK)
            }, scrollByX:function (s, aK) {
                var aJ = aD() + Math[s < 0 ? "floor" : "ceil"](s), aL = aJ / (T - ak);
                W(aL * j, aK)
            }, scrollByY:function (s, aK) {
                var aJ = aB() + Math[s < 0 ? "floor" : "ceil"](s), aL = aJ / (Z - v);
                V(aL * i, aK)
            }, positionDragX:function (s, aJ) {
                W(s, aJ)
            }, positionDragY:function (aJ, s) {
                V(aJ, s)
            }, animate:function (aJ, aM, s, aL) {
                var aK = {};
                aK[aM] = s;
                aJ.animate(aK, {duration:az.animateDuration, easing:az.animateEase, queue:false, step:aL})
            }, getContentPositionX:function () {
                return aD()
            }, getContentPositionY:function () {
                return aB()
            }, getContentWidth:function () {
                return T
            }, getContentHeight:function () {
                return Z
            }, getPercentScrolledX:function () {
                return aD() / (T - ak)
            }, getPercentScrolledY:function () {
                return aB() / (Z - v)
            }, getIsScrollableH:function () {
                return aF
            }, getIsScrollableV:function () {
                return aA
            }, getContentPane:function () {
                return Y
            }, scrollToBottom:function (s) {
                V(i, s)
            }, hijackInternalLinks:function () {
                m()
            }, destroy:function () {
                g()
            }});
            at(O)
        }

        e = b.extend({}, b.fn.jScrollPane.defaults, e);
        b.each(["mouseWheelSpeed", "arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function () {
            e[this] = e[this] || e.speed
        });
        return this.each(function () {
            var f = b(this), g = f.data("jsp");
            if (g) {
                g.reinitialise(e)
            } else {
                g = new d(f, e);
                f.data("jsp", g)
            }
        })
    };
    b.fn.jScrollPane.defaults = {showArrows:false, maintainPosition:true, stickToBottom:false, stickToRight:false, clickOnTrack:true, autoReinitialise:false, autoReinitialiseDelay:500, verticalDragMinHeight:0, verticalDragMaxHeight:99999, horizontalDragMinWidth:0, horizontalDragMaxWidth:99999, contentWidth:c, animateScroll:false, animateDuration:300, animateEase:"linear", hijackInternalLinks:false, verticalGutter:4, horizontalGutter:4, mouseWheelSpeed:0, arrowButtonSpeed:0, arrowRepeatFreq:50, arrowScrollOnHover:false, trackClickSpeed:0, trackClickRepeatFreq:70, verticalArrowPositions:"split", horizontalArrowPositions:"split", enableKeyboardNavigation:true, hideFocus:false, keyboardSpeed:0, initialDelay:300, speed:30, scrollPagePercent:0.8}
})(jQuery, this);
/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function ($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for (var i = types.length; i;) {
            $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup:function () {
            if (this.addEventListener) {
                for (var i = types.length; i;) {
                    this.addEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown:function () {
            if (this.removeEventListener) {
                for (var i = types.length; i;) {
                    this.removeEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel:function (fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel:function (fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call(arguments, 1), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if (orgEvent.wheelDelta) {
            delta = orgEvent.wheelDelta / 120;
        }
        if (orgEvent.detail) {
            delta = -orgEvent.detail / 3;
        }

        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;

        // Gecko
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = -1 * delta;
        }

        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) {
            deltaY = orgEvent.wheelDeltaY / 120;
        }
        if (orgEvent.wheelDeltaX !== undefined) {
            deltaX = -1 * orgEvent.wheelDeltaX / 120;
        }

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

})(jQuery);
/*
 * jQuery.SerialScroll - Animated scrolling of series
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 06/14/2009
 * @author Ariel Flesler
 * @version 1.2.2
 * http://flesler.blogspot.com/2008/02/jqueryserialscroll.html
 */
;
(function (a) {
    var b = a.serialScroll = function (c) {
        return a(window).serialScroll(c)
    };
    b.defaults = {duration:1e3, axis:"x", event:"click", start:0, step:1, lock:!0, cycle:!0, constant:!0};
    a.fn.serialScroll = function (c) {
        return this.each(function () {
            var t = a.extend({}, b.defaults, c), s = t.event, i = t.step, r = t.lazy, e = t.target ? this : document, u = a(t.target || this, e), p = u[0], m = t.items, h = t.start, g = t.interval, k = t.navigation, l;
            if (!r) {
                m = d()
            }
            if (t.force) {
                f({}, h)
            }
            a(t.prev || [], e).bind(s, -i, q);
            a(t.next || [], e).bind(s, i, q);
            if (!p.ssbound) {
                u.bind("prev.serialScroll", -i, q).bind("next.serialScroll", i, q).bind("goto.serialScroll", f)
            }
            if (g) {
                u.bind("start.serialScroll",function (v) {
                    if (!g) {
                        o();
                        g = !0;
                        n()
                    }
                }).bind("stop.serialScroll", function () {
                        o();
                        g = !1
                    })
            }
            u.bind("notify.serialScroll", function (x, w) {
                var v = j(w);
                if (v > -1) {
                    h = v
                }
            });
            p.ssbound = !0;
            if (t.jump) {
                (r ? u : d()).bind(s, function (v) {
                    f(v, j(v.target))
                })
            }
            if (k) {
                k = a(k, e).bind(s, function (v) {
                    v.data = Math.round(d().length / k.length) * k.index(this);
                    f(v, this)
                })
            }
            function q(v) {
                v.data += h;
                f(v, this)
            }

            function f(B, z) {
                if (!isNaN(z)) {
                    B.data = z;
                    z = p
                }
                var C = B.data, v, D = B.type, A = t.exclude ? d().slice(0, -t.exclude) : d(), y = A.length, w = A[C], x = t.duration;
                if (D) {
                    B.preventDefault()
                }
                if (g) {
                    o();
                    l = setTimeout(n, t.interval)
                }
                if (!w) {
                    v = C < 0 ? 0 : y - 1;
                    if (h != v) {
                        C = v
                    } else {
                        if (!t.cycle) {
                            return
                        } else {
                            C = y - v - 1
                        }
                    }
                    w = A[C]
                }
                if (!w || t.lock && u.is(":animated") || D && t.onBefore && t.onBefore(B, w, u, d(), C) === !1) {
                    return
                }
                if (t.stop) {
                    u.queue("fx", []).stop()
                }
                if (t.constant) {
                    x = Math.abs(x / i * (h - C))
                }
                u.scrollTo(w, x, t).trigger("notify.serialScroll", [C])
            }

            function n() {
                u.trigger("next.serialScroll")
            }

            function o() {
                clearTimeout(l)
            }

            function d() {
                return a(m, p)
            }

            function j(w) {
                if (!isNaN(w)) {
                    return w
                }
                var x = d(), v;
                while ((v = x.index(w)) == -1 && w != p) {
                    w = w.parentNode
                }
                return v
            }
        })
    }
})(jQuery);
/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2012 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.7.0-dev
 *
 */
(function ($, window) {

    $window = $(window);

    $.fn.lazyload = function (options) {
        var settings = {
            threshold:0,
            failure_limit:0,
            event:"scroll",
            effect:"show",
            container:window,
            data_attribute:"original",
            skip_invisible:true,
            appear:null,
            load:null
        };

        if (options) {
            /* Maintain BC for a couple of version. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        var elements = this;
        if (0 == settings.event.indexOf("scroll")) {
            $(settings.container).bind(settings.event, function (event) {
                var counter = 0;
                elements.each(function () {
                    $this = $(this);
                    if (settings.skip_invisible && !$this.is(":visible")) return;
                    if ($.abovethetop(this, settings) ||
                        $.leftofbegin(this, settings)) {
                        /* Nothing. */
                    } else if (!$.belowthefold(this, settings) && !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                    } else {
                        if (++counter > settings.failure_limit) {
                            return false;
                        }
                    }
                });
            });
        }

        this.each(function () {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* When appear is triggered load original image. */
            $self.one("appear", function () {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function () {
                            $self
                                .hide()
                                .attr("src", $self.data(settings.data_attribute))
                                [settings.effect](settings.effect_speed);
                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function (element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.data(settings.data_attribute));
                }
                ;
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 != settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function (event) {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function (event) {
            $(settings.container).trigger(settings.event);
        });

        /* Force initial check if images should appear. */
        $(settings.container).trigger(settings.event);

        return this;

    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $window.height() + $window.scrollTop();
        } else {
            var fold = $(settings.container).offset().top + $(settings.container).height();
        }
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $window.width() + $window.scrollLeft();
        } else {
            var fold = $(settings.container).offset().left + $(settings.container).width();
        }
        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $window.scrollTop();
        } else {
            var fold = $(settings.container).offset().top;
        }
        return fold >= $(element).offset().top + settings.threshold + $(element).height();
    };

    $.leftofbegin = function (element, settings) {
        if (settings.container === undefined || settings.container === window) {
            var fold = $window.scrollLeft();
        } else {
            var fold = $(settings.container).offset().left;
        }
        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function (element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() */

    $.extend($.expr[':'], {
        "below-the-fold":function (a) {
            return $.belowthefold(a, {threshold:0, container:window})
        },
        "above-the-top":function (a) {
            return !$.belowthefold(a, {threshold:0, container:window})
        },
        "right-of-screen":function (a) {
            return $.rightoffold(a, {threshold:0, container:window})
        },
        "left-of-screen":function (a) {
            return !$.rightoffold(a, {threshold:0, container:window})
        },
        "in-viewport":function (a) {
            return !$.inviewport(a, {threshold:0, container:window})
        },
        /* Maintain BC for couple of versions. */
        "above-the-fold":function (a) {
            return !$.belowthefold(a, {threshold:0, container:window})
        },
        "right-of-fold":function (a) {
            return $.rightoffold(a, {threshold:0, container:window})
        },
        "left-of-fold":function (a) {
            return !$.rightoffold(a, {threshold:0, container:window})
        }
    });

})(jQuery, window);
/*!
 * MediaElement.js
 * HTML5 <video> and <audio> shim and player
 * http://mediaelementjs.com/
 *
 * Creates a JavaScript object that mimics HTML5 MediaElement API
 * for browsers that don't understand HTML5 or can't play the provided codec
 * Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
 *
 * Copyright 2010-2012, John Dyer (http://j.hn)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
// Namespace

var mejs = mejs || {};


// version number

mejs.version = '2.9.3';


// player number (for missing, same id attr)

mejs.meIndex = 0;


// media types accepted by plugins

mejs.plugins = {

    silverlight:[

        {version:[3, 0], types:['video/mp4', 'video/m4v', 'video/mov', 'video/wmv', 'audio/wma', 'audio/m4a', 'audio/mp3', 'audio/wav', 'audio/mpeg']}

    ],

    flash:[

        {version:[9, 0, 124], types:['video/mp4', 'video/m4v', 'video/mov', 'video/flv', 'video/x-flv', 'audio/flv', 'audio/x-flv', 'audio/mp3', 'audio/m4a', 'audio/mpeg', 'video/youtube', 'video/x-youtube']}

        //,{version: [12,0], types: ['video/webm']} // for future reference (hopefully!)

    ],

    youtube:[

        {version:null, types:['video/youtube', 'video/x-youtube']}

    ],

    vimeo:[

        {version:null, types:['video/vimeo']}

    ]

};


/*

 Utility methods

 */

mejs.Utility = {

    encodeUrl:function (url) {

        return encodeURIComponent(url); //.replace(/\?/gi,'%3F').replace(/=/gi,'%3D').replace(/&/gi,'%26');

    },

    escapeHTML:function (s) {

        return s.toString().split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;');

    },

    absolutizeUrl:function (url) {

        var el = document.createElement('div');

        el.innerHTML = '<a href="' + this.escapeHTML(url) + '">x</a>';

        return el.firstChild.href;

    },

    getScriptPath:function (scriptNames) {

        var

            i = 0,

            j,

            path = '',

            name = '',

            script,

            scripts = document.getElementsByTagName('script'),

            il = scripts.length,

            jl = scriptNames.length;


        for (; i < il; i++) {

            script = scripts[i].src;

            for (j = 0; j < jl; j++) {

                name = scriptNames[j];

                if (script.indexOf(name) > -1) {

                    path = script.substring(0, script.indexOf(name));

                    break;

                }

            }

            if (path !== '') {

                break;

            }

        }

        return path;

    },

    secondsToTimeCode:function (time, forceHours, showFrameCount, fps) {

        //add framecount

        if (typeof showFrameCount == 'undefined') {

            showFrameCount = false;

        } else if (typeof fps == 'undefined') {

            fps = 25;

        }


        var hours = Math.floor(time / 3600) % 24,

            minutes = Math.floor(time / 60) % 60,

            seconds = Math.floor(time % 60),

            frames = Math.floor(((time % 1) * fps).toFixed(3)),

            result =

                ( (forceHours || hours > 0) ? (hours < 10 ? '0' + hours : hours) + ':' : '')

                    + (minutes < 10 ? '0' + minutes : minutes) + ':'

                    + (seconds < 10 ? '0' + seconds : seconds)

                    + ((showFrameCount) ? ':' + (frames < 10 ? '0' + frames : frames) : '');


        return result;

    },


    timeCodeToSeconds:function (hh_mm_ss_ff, forceHours, showFrameCount, fps) {

        if (typeof showFrameCount == 'undefined') {

            showFrameCount = false;

        } else if (typeof fps == 'undefined') {

            fps = 25;

        }


        var tc_array = hh_mm_ss_ff.split(":"),

            tc_hh = parseInt(tc_array[0], 10),

            tc_mm = parseInt(tc_array[1], 10),

            tc_ss = parseInt(tc_array[2], 10),

            tc_ff = 0,

            tc_in_seconds = 0;


        if (showFrameCount) {

            tc_ff = parseInt(tc_array[3]) / fps;

        }


        tc_in_seconds = ( tc_hh * 3600 ) + ( tc_mm * 60 ) + tc_ss + tc_ff;


        return tc_in_seconds;

    },


    /* borrowed from SWFObject: http://code.google.com/p/swfobject/source/browse/trunk/swfobject/src/swfobject.js#474 */

    removeSwf:function (id) {

        var obj = document.getElementById(id);

        if (obj && obj.nodeName == "OBJECT") {

            if (mejs.MediaFeatures.isIE) {

                obj.style.display = "none";

                (function () {

                    if (obj.readyState == 4) {

                        mejs.Utility.removeObjectInIE(id);

                    } else {

                        setTimeout(arguments.callee, 10);

                    }

                })();

            } else {

                obj.parentNode.removeChild(obj);

            }

        }

    },

    removeObjectInIE:function (id) {

        var obj = document.getElementById(id);

        if (obj) {

            for (var i in obj) {

                if (typeof obj[i] == "function") {

                    obj[i] = null;

                }

            }

            obj.parentNode.removeChild(obj);

        }

    }

};


// Core detector, plugins are added below
mejs.PluginDetector = {

    // main public function to test a plug version number PluginDetector.hasPluginVersion('flash',[9,0,125]);
    hasPluginVersion:function (plugin, v) {
        var pv = this.plugins[plugin];
        v[1] = v[1] || 0;
        v[2] = v[2] || 0;
        return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
    },

    // cached values
    nav:window.navigator,
    ua:window.navigator.userAgent.toLowerCase(),

    // stored version numbers
    plugins:[],

    // runs detectPlugin() and stores the version number
    addPlugin:function (p, pluginName, mimeType, activeX, axDetect) {
        this.plugins[p] = this.detectPlugin(pluginName, mimeType, activeX, axDetect);
    },

    // get the version number from the mimetype (all but IE) or ActiveX (IE)
    detectPlugin:function (pluginName, mimeType, activeX, axDetect) {

        var version = [0, 0, 0],
            description,
            i,
            ax;

        // Firefox, Webkit, Opera
        if (typeof(this.nav.plugins) != 'undefined' && typeof this.nav.plugins[pluginName] == 'object') {
            description = this.nav.plugins[pluginName].description;
            if (description && !(typeof this.nav.mimeTypes != 'undefined' && this.nav.mimeTypes[mimeType] && !this.nav.mimeTypes[mimeType].enabledPlugin)) {
                version = description.replace(pluginName, '').replace(/^\s+/, '').replace(/\sr/gi, '.').split('.');
                for (i = 0; i < version.length; i++) {
                    version[i] = parseInt(version[i].match(/\d+/), 10);
                }
            }
            // Internet Explorer / ActiveX
        } else if (typeof(window.ActiveXObject) != 'undefined') {
            try {
                ax = new ActiveXObject(activeX);
                if (ax) {
                    version = axDetect(ax);
                }
            }
            catch (e) {
            }
        }
        return version;
    }
};

// Add Flash detection
mejs.PluginDetector.addPlugin('flash', 'Shockwave Flash', 'application/x-shockwave-flash', 'ShockwaveFlash.ShockwaveFlash', function (ax) {
    // adapted from SWFObject
    var version = [],
        d = ax.GetVariable("$version");
    if (d) {
        d = d.split(" ")[1].split(",");
        version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
    }
    return version;
});

// Add Silverlight detection
mejs.PluginDetector.addPlugin('silverlight', 'Silverlight Plug-In', 'application/x-silverlight-2', 'AgControl.AgControl', function (ax) {
    // Silverlight cannot report its version number to IE
    // but it does have a isVersionSupported function, so we have to loop through it to get a version number.
    // adapted from http://www.silverlightversion.com/
    var v = [0, 0, 0, 0],
        loopMatch = function (ax, v, i, n) {
            while (ax.isVersionSupported(v[0] + "." + v[1] + "." + v[2] + "." + v[3])) {
                v[i] += n;
            }
            v[i] -= n;
        };
    loopMatch(ax, v, 0, 1);
    loopMatch(ax, v, 1, 1);
    loopMatch(ax, v, 2, 10000); // the third place in the version number is usually 5 digits (4.0.xxxxx)
    loopMatch(ax, v, 2, 1000);
    loopMatch(ax, v, 2, 100);
    loopMatch(ax, v, 2, 10);
    loopMatch(ax, v, 2, 1);
    loopMatch(ax, v, 3, 1);

    return v;
});
// add adobe acrobat
/*
 PluginDetector.addPlugin('acrobat','Adobe Acrobat','application/pdf','AcroPDF.PDF', function (ax) {
 var version = [],
 d = ax.GetVersions().split(',')[0].split('=')[1].split('.');

 if (d) {
 version = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
 }
 return version;
 });
 */
// necessary detection (fixes for <IE9)
mejs.MediaFeatures = {
    init:function () {
        var
            t = this,
            d = document,
            nav = mejs.PluginDetector.nav,
            ua = mejs.PluginDetector.ua.toLowerCase(),
            i,
            v,
            html5Elements = ['source', 'track', 'audio', 'video'];

        // detect browsers (only the ones that have some kind of quirk we need to work around)
        t.isiPad = (ua.match(/ipad/i) !== null);
        t.isiPhone = (ua.match(/iphone/i) !== null);
        t.isiOS = t.isiPhone || t.isiPad;
        t.isAndroid = (ua.match(/android/i) !== null);
        t.isBustedAndroid = (ua.match(/android 2\.[12]/) !== null);
        t.isIE = (nav.appName.toLowerCase().indexOf("microsoft") != -1);
        t.isChrome = (ua.match(/chrome/gi) !== null);
        t.isFirefox = (ua.match(/firefox/gi) !== null);
        t.isWebkit = (ua.match(/webkit/gi) !== null);
        t.isGecko = (ua.match(/gecko/gi) !== null) && !t.isWebkit;
        t.isOpera = (ua.match(/opera/gi) !== null);
        t.hasTouch = ('ontouchstart' in window);

        // create HTML5 media elements for IE before 9, get a <video> element for fullscreen detection
        for (i = 0; i < html5Elements.length; i++) {
            v = document.createElement(html5Elements[i]);
        }

        t.supportsMediaTag = (typeof v.canPlayType !== 'undefined' || t.isBustedAndroid);

        // detect native JavaScript fullscreen (Safari/Firefox only, Chrome still fails)

        // iOS
        t.hasSemiNativeFullScreen = (typeof v.webkitEnterFullscreen !== 'undefined');

        // Webkit/firefox
        t.hasWebkitNativeFullScreen = (typeof v.webkitRequestFullScreen !== 'undefined');
        t.hasMozNativeFullScreen = (typeof v.mozRequestFullScreen !== 'undefined');

        t.hasTrueNativeFullScreen = (t.hasWebkitNativeFullScreen || t.hasMozNativeFullScreen);
        t.nativeFullScreenEnabled = t.hasTrueNativeFullScreen;
        if (t.hasMozNativeFullScreen) {
            t.nativeFullScreenEnabled = v.mozFullScreenEnabled;
        }


        if (this.isChrome) {
            t.hasSemiNativeFullScreen = false;
        }

        if (t.hasTrueNativeFullScreen) {
            t.fullScreenEventName = (t.hasWebkitNativeFullScreen) ? 'webkitfullscreenchange' : 'mozfullscreenchange';


            t.isFullScreen = function () {
                if (v.mozRequestFullScreen) {
                    return d.mozFullScreen;
                } else if (v.webkitRequestFullScreen) {
                    return d.webkitIsFullScreen;
                }
            }

            t.requestFullScreen = function (el) {

                if (t.hasWebkitNativeFullScreen) {
                    el.webkitRequestFullScreen();
                } else if (t.hasMozNativeFullScreen) {
                    el.mozRequestFullScreen();
                }
            }

            t.cancelFullScreen = function () {
                if (t.hasWebkitNativeFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (t.hasMozNativeFullScreen) {
                    document.mozCancelFullScreen();
                }
            }

        }


        // OS X 10.5 can't do this even if it says it can :(
        if (t.hasSemiNativeFullScreen && ua.match(/mac os x 10_5/i)) {
            t.hasNativeFullScreen = false;
            t.hasSemiNativeFullScreen = false;
        }

    }
};
mejs.MediaFeatures.init();


/*
 extension methods to <video> or <audio> object to bring it into parity with PluginMediaElement (see below)
 */
mejs.HtmlMediaElement = {
    pluginType:'native',
    isFullScreen:false,

    setCurrentTime:function (time) {
        this.currentTime = time;
    },

    setMuted:function (muted) {
        this.muted = muted;
    },

    setVolume:function (volume) {
        this.volume = volume;
    },

    // for parity with the plugin versions
    stop:function () {
        this.pause();
    },

    // This can be a url string
    // or an array [{src:'file.mp4',type:'video/mp4'},{src:'file.webm',type:'video/webm'}]
    setSrc:function (url) {

        // Fix for IE9 which can't set .src when there are <source> elements. Awesome, right?
        var
            existingSources = this.getElementsByTagName('source');
        while (existingSources.length > 0) {
            this.removeChild(existingSources[0]);
        }

        if (typeof url == 'string') {
            this.src = url;
        } else {
            var i, media;

            for (i = 0; i < url.length; i++) {
                media = url[i];
                if (this.canPlayType(media.type)) {
                    this.src = media.src;
                }
            }
        }
    },

    setVideoSize:function (width, height) {
        this.width = width;
        this.height = height;
    }
};

/*
 Mimics the <video/audio> element by calling Flash's External Interface or Silverlights [ScriptableMember]
 */
mejs.PluginMediaElement = function (pluginid, pluginType, mediaUrl) {
    this.id = pluginid;
    this.pluginType = pluginType;
    this.src = mediaUrl;
    this.events = {};
};

// JavaScript values and ExternalInterface methods that match HTML5 video properties methods
// http://www.adobe.com/livedocs/flash/9.0/ActionScriptLangRefV3/fl/video/FLVPlayback.html
// http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html
mejs.PluginMediaElement.prototype = {

    // special
    pluginElement:null,
    pluginType:'',
    isFullScreen:false,

    // not implemented :(
    playbackRate:-1,
    defaultPlaybackRate:-1,
    seekable:[],
    played:[],

    // HTML5 read-only properties
    paused:true,
    ended:false,
    seeking:false,
    duration:0,
    error:null,
    tagName:'',

    // HTML5 get/set properties, but only set (updated by event handlers)
    muted:false,
    volume:1,
    currentTime:0,

    // HTML5 methods
    play:function () {
        if (this.pluginApi != null) {
            if (this.pluginType == 'youtube') {
                this.pluginApi.playVideo();
            } else {
                this.pluginApi.playMedia();
            }
            this.paused = false;
        }
    },
    load:function () {
        if (this.pluginApi != null) {
            if (this.pluginType == 'youtube') {
            } else {
                this.pluginApi.loadMedia();
            }

            this.paused = false;
        }
    },
    pause:function () {
        if (this.pluginApi != null) {
            if (this.pluginType == 'youtube') {
                this.pluginApi.pauseVideo();
            } else {
                this.pluginApi.pauseMedia();
            }


            this.paused = true;
        }
    },
    stop:function () {
        if (this.pluginApi != null) {
            if (this.pluginType == 'youtube') {
                this.pluginApi.stopVideo();
            } else {
                this.pluginApi.stopMedia();
            }
            this.paused = true;
        }
    },
    canPlayType:function (type) {
        var i,
            j,
            pluginInfo,
            pluginVersions = mejs.plugins[this.pluginType];

        for (i = 0; i < pluginVersions.length; i++) {
            pluginInfo = pluginVersions[i];

            // test if user has the correct plugin version
            if (mejs.PluginDetector.hasPluginVersion(this.pluginType, pluginInfo.version)) {

                // test for plugin playback types
                for (j = 0; j < pluginInfo.types.length; j++) {
                    // find plugin that can play the type
                    if (type == pluginInfo.types[j]) {
                        return true;
                    }
                }
            }
        }

        return false;
    },

    positionFullscreenButton:function (x, y, visibleAndAbove) {
        if (this.pluginApi != null && this.pluginApi.positionFullscreenButton) {
            this.pluginApi.positionFullscreenButton(x, y, visibleAndAbove);
        }
    },

    hideFullscreenButton:function () {
        if (this.pluginApi != null && this.pluginApi.hideFullscreenButton) {
            this.pluginApi.hideFullscreenButton();
        }
    },


    // custom methods since not all JavaScript implementations support get/set

    // This can be a url string
    // or an array [{src:'file.mp4',type:'video/mp4'},{src:'file.webm',type:'video/webm'}]
    setSrc:function (url) {
        if (typeof url == 'string') {
            this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(url));
            this.src = mejs.Utility.absolutizeUrl(url);
        } else {
            var i, media;

            for (i = 0; i < url.length; i++) {
                media = url[i];
                if (this.canPlayType(media.type)) {
                    this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(media.src));
                    this.src = mejs.Utility.absolutizeUrl(url);
                }
            }
        }

    },
    setCurrentTime:function (time) {
        if (this.pluginApi != null) {
            if (this.pluginType == 'youtube') {
                this.pluginApi.seekTo(time);
            } else {
                this.pluginApi.setCurrentTime(time);
            }


            this.currentTime = time;
        }
    },
    setVolume:function (volume) {
        if (this.pluginApi != null) {
            // same on YouTube and MEjs
            if (this.pluginType == 'youtube') {
                this.pluginApi.setVolume(volume * 100);
            } else {
                this.pluginApi.setVolume(volume);
            }
            this.volume = volume;
        }
    },
    setMuted:function (muted) {
        if (this.pluginApi != null) {
            if (this.pluginType == 'youtube') {
                if (muted) {
                    this.pluginApi.mute();
                } else {
                    this.pluginApi.unMute();
                }
                this.muted = muted;
                this.dispatchEvent('volumechange');
            } else {
                this.pluginApi.setMuted(muted);
            }
            this.muted = muted;
        }
    },

    // additional non-HTML5 methods
    setVideoSize:function (width, height) {

        //if (this.pluginType == 'flash' || this.pluginType == 'silverlight') {
        if (this.pluginElement.style) {
            this.pluginElement.style.width = width + 'px';
            this.pluginElement.style.height = height + 'px';
        }
        if (this.pluginApi != null && this.pluginApi.setVideoSize) {
            this.pluginApi.setVideoSize(width, height);
        }
        //}
    },

    setFullscreen:function (fullscreen) {
        if (this.pluginApi != null && this.pluginApi.setFullscreen) {
            this.pluginApi.setFullscreen(fullscreen);
        }
    },

    enterFullScreen:function () {
        if (this.pluginApi != null && this.pluginApi.setFullscreen) {
            this.setFullscreen(true);
        }

    },

    exitFullScreen:function () {
        if (this.pluginApi != null && this.pluginApi.setFullscreen) {
            this.setFullscreen(false);
        }
    },

    // start: fake events
    addEventListener:function (eventName, callback, bubble) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(callback);
    },
    removeEventListener:function (eventName, callback) {
        if (!eventName) {
            this.events = {};
            return true;
        }
        var callbacks = this.events[eventName];
        if (!callbacks) return true;
        if (!callback) {
            this.events[eventName] = [];
            return true;
        }
        for (i = 0; i < callbacks.length; i++) {
            if (callbacks[i] === callback) {
                this.events[eventName].splice(i, 1);
                return true;
            }
        }
        return false;
    },
    dispatchEvent:function (eventName) {
        var i,
            args,
            callbacks = this.events[eventName];

        if (callbacks) {
            args = Array.prototype.slice.call(arguments, 1);
            for (i = 0; i < callbacks.length; i++) {
                callbacks[i].apply(null, args);
            }
        }
    },
    // end: fake events

    // fake DOM attribute methods
    attributes:{},
    hasAttribute:function (name) {
        return (name in this.attributes);
    },
    removeAttribute:function (name) {
        delete this.attributes[name];
    },
    getAttribute:function (name) {
        if (this.hasAttribute(name)) {
            return this.attributes[name];
        }
        return '';
    },
    setAttribute:function (name, value) {
        this.attributes[name] = value;
    },

    remove:function () {
        mejs.Utility.removeSwf(this.pluginElement.id);
    }
};

// Handles calls from Flash/Silverlight and reports them as native <video/audio> events and properties
mejs.MediaPluginBridge = {

    pluginMediaElements:{},
    htmlMediaElements:{},

    registerPluginElement:function (id, pluginMediaElement, htmlMediaElement) {
        this.pluginMediaElements[id] = pluginMediaElement;
        this.htmlMediaElements[id] = htmlMediaElement;
    },

    // when Flash/Silverlight is ready, it calls out to this method
    initPlugin:function (id) {

        var pluginMediaElement = this.pluginMediaElements[id],
            htmlMediaElement = this.htmlMediaElements[id];

        if (pluginMediaElement) {
            // find the javascript bridge
            switch (pluginMediaElement.pluginType) {
                case "flash":
                    pluginMediaElement.pluginElement = pluginMediaElement.pluginApi = document.getElementById(id);
                    break;
                case "silverlight":
                    pluginMediaElement.pluginElement = document.getElementById(pluginMediaElement.id);
                    pluginMediaElement.pluginApi = pluginMediaElement.pluginElement.Content.MediaElementJS;
                    break;
            }

            if (pluginMediaElement.pluginApi != null && pluginMediaElement.success) {
                pluginMediaElement.success(pluginMediaElement, htmlMediaElement);
            }
        }
    },

    // receives events from Flash/Silverlight and sends them out as HTML5 media events
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html
    fireEvent:function (id, eventName, values) {

        var
            e,
            i,
            bufferedTime,
            pluginMediaElement = this.pluginMediaElements[id];

        pluginMediaElement.ended = false;
        pluginMediaElement.paused = true;

        // fake event object to mimic real HTML media event.
        e = {
            type:eventName,
            target:pluginMediaElement
        };

        // attach all values to element and event object
        for (i in values) {
            pluginMediaElement[i] = values[i];
            e[i] = values[i];
        }

        // fake the newer W3C buffered TimeRange (loaded and total have been removed)
        bufferedTime = values.bufferedTime || 0;

        e.target.buffered = e.buffered = {
            start:function (index) {
                return 0;
            },
            end:function (index) {
                return bufferedTime;
            },
            length:1
        };

        pluginMediaElement.dispatchEvent(e.type, e);
    }
};

/*
 Default options
 */
mejs.MediaElementDefaults = {
    // allows testing on HTML5, flash, silverlight
    // auto: attempts to detect what the browser can do
    // auto_plugin: prefer plugins and then attempt native HTML5
    // native: forces HTML5 playback
    // shim: disallows HTML5, will attempt either Flash or Silverlight
    // none: forces fallback view
    mode:'auto',
    // remove or reorder to change plugin priority and availability
    plugins:['flash', 'silverlight', 'youtube', 'vimeo'],
    // shows debug errors on screen
    enablePluginDebug:false,
    // overrides the type specified, useful for dynamic instantiation
    type:'',
    // path to Flash and Silverlight plugins
    pluginPath:mejs.Utility.getScriptPath(['mediaelement.js', 'mediaelement.min.js', 'mediaelement-and-player.js', 'mediaelement-and-player.min.js']),
    // name of flash file
    flashName:'flashmediaelement.swf',
    // turns on the smoothing filter in Flash
    enablePluginSmoothing:false,
    // name of silverlight file
    silverlightName:'silverlightmediaelement.xap',
    // default if the <video width> is not specified
    defaultVideoWidth:480,
    // default if the <video height> is not specified
    defaultVideoHeight:270,
    // overrides <video width>
    pluginWidth:-1,
    // overrides <video height>
    pluginHeight:-1,
    // additional plugin variables in 'key=value' form
    pluginVars:[],
    // rate in milliseconds for Flash and Silverlight to fire the timeupdate event
    // larger number is less accurate, but less strain on plugin->JavaScript bridge
    timerRate:250,
    // initial volume for player
    startVolume:0.8,
    success:function () {
    },
    error:function () {
    }
};

/*
 Determines if a browser supports the <video> or <audio> element
 and returns either the native element or a Flash/Silverlight version that
 mimics HTML5 MediaElement
 */
mejs.MediaElement = function (el, o) {
    return mejs.HtmlMediaElementShim.create(el, o);
};

mejs.HtmlMediaElementShim = {

    create:function (el, o) {
        var
            options = mejs.MediaElementDefaults,
            htmlMediaElement = (typeof(el) == 'string') ? document.getElementById(el) : el,
            tagName = htmlMediaElement.tagName.toLowerCase(),
            isMediaTag = (tagName === 'audio' || tagName === 'video'),
            src = (isMediaTag) ? htmlMediaElement.getAttribute('src') : htmlMediaElement.getAttribute('href'),
            poster = htmlMediaElement.getAttribute('poster'),
            autoplay = htmlMediaElement.getAttribute('autoplay'),
            preload = htmlMediaElement.getAttribute('preload'),
            controls = htmlMediaElement.getAttribute('controls'),
            playback,
            prop;

        // extend options
        for (prop in o) {
            options[prop] = o[prop];
        }

        // clean up attributes
        src = (typeof src == 'undefined' || src === null || src == '') ? null : src;
        poster = (typeof poster == 'undefined' || poster === null) ? '' : poster;
        preload = (typeof preload == 'undefined' || preload === null || preload === 'false') ? 'none' : preload;
        autoplay = !(typeof autoplay == 'undefined' || autoplay === null || autoplay === 'false');
        controls = !(typeof controls == 'undefined' || controls === null || controls === 'false');

        // test for HTML5 and plugin capabilities
        playback = this.determinePlayback(htmlMediaElement, options, mejs.MediaFeatures.supportsMediaTag, isMediaTag, src);
        playback.url = (playback.url !== null) ? mejs.Utility.absolutizeUrl(playback.url) : '';

        if (playback.method == 'native') {
            // second fix for android
            if (mejs.MediaFeatures.isBustedAndroid) {
                htmlMediaElement.src = playback.url;
                htmlMediaElement.addEventListener('click', function () {
                    htmlMediaElement.play();
                }, false);
            }

            // add methods to native HTMLMediaElement
            return this.updateNative(playback, options, autoplay, preload);
        } else if (playback.method !== '') {
            // create plugin to mimic HTMLMediaElement

            return this.createPlugin(playback, options, poster, autoplay, preload, controls);
        } else {
            // boo, no HTML5, no Flash, no Silverlight.
            this.createErrorMessage(playback, options, poster);

            return this;
        }
    },

    determinePlayback:function (htmlMediaElement, options, supportsMediaTag, isMediaTag, src) {
        var
            mediaFiles = [],
            i,
            j,
            k,
            l,
            n,
            type,
            result = { method:'', url:'', htmlMediaElement:htmlMediaElement, isVideo:(htmlMediaElement.tagName.toLowerCase() != 'audio')},
            pluginName,
            pluginVersions,
            pluginInfo,
            dummy;

        // STEP 1: Get URL and type from <video src> or <source src>

        // supplied type overrides <video type> and <source type>
        if (typeof options.type != 'undefined' && options.type !== '') {

            // accept either string or array of types
            if (typeof options.type == 'string') {
                mediaFiles.push({type:options.type, url:src});
            } else {

                for (i = 0; i < options.type.length; i++) {
                    mediaFiles.push({type:options.type[i], url:src});
                }
            }

            // test for src attribute first
        } else if (src !== null) {
            type = this.formatType(src, htmlMediaElement.getAttribute('type'));
            mediaFiles.push({type:type, url:src});

            // then test for <source> elements
        } else {
            // test <source> types to see if they are usable
            for (i = 0; i < htmlMediaElement.childNodes.length; i++) {
                n = htmlMediaElement.childNodes[i];
                if (n.nodeType == 1 && n.tagName.toLowerCase() == 'source') {
                    src = n.getAttribute('src');
                    type = this.formatType(src, n.getAttribute('type'));
                    mediaFiles.push({type:type, url:src});
                }
            }
        }

        // in the case of dynamicly created players
        // check for audio types
        if (!isMediaTag && mediaFiles.length > 0 && mediaFiles[0].url !== null && this.getTypeFromFile(mediaFiles[0].url).indexOf('audio') > -1) {
            result.isVideo = false;
        }


        // STEP 2: Test for playback method

        // special case for Android which sadly doesn't implement the canPlayType function (always returns '')
        if (mejs.MediaFeatures.isBustedAndroid) {
            htmlMediaElement.canPlayType = function (type) {
                return (type.match(/video\/(mp4|m4v)/gi) !== null) ? 'maybe' : '';
            };
        }


        // test for native playback first
        if (supportsMediaTag && (options.mode === 'auto' || options.mode === 'auto_plugin' || options.mode === 'native')) {

            if (!isMediaTag) {

                // create a real HTML5 Media Element 
                dummy = document.createElement(result.isVideo ? 'video' : 'audio');
                htmlMediaElement.parentNode.insertBefore(dummy, htmlMediaElement);
                htmlMediaElement.style.display = 'none';

                // use this one from now on
                result.htmlMediaElement = htmlMediaElement = dummy;
            }

            for (i = 0; i < mediaFiles.length; i++) {
                // normal check
                if (htmlMediaElement.canPlayType(mediaFiles[i].type).replace(/no/, '') !== ''
                    // special case for Mac/Safari 5.0.3 which answers '' to canPlayType('audio/mp3') but 'maybe' to canPlayType('audio/mpeg')
                    || htmlMediaElement.canPlayType(mediaFiles[i].type.replace(/mp3/, 'mpeg')).replace(/no/, '') !== '') {
                    result.method = 'native';
                    result.url = mediaFiles[i].url;
                    break;
                }
            }

            if (result.method === 'native') {
                if (result.url !== null) {
                    htmlMediaElement.src = result.url;
                }

                // if `auto_plugin` mode, then cache the native result but try plugins.
                if (options.mode !== 'auto_plugin') {
                    return result;
                }
            }
        }

        // if native playback didn't work, then test plugins
        if (options.mode === 'auto' || options.mode === 'auto_plugin' || options.mode === 'shim') {
            for (i = 0; i < mediaFiles.length; i++) {
                type = mediaFiles[i].type;

                // test all plugins in order of preference [silverlight, flash]
                for (j = 0; j < options.plugins.length; j++) {

                    pluginName = options.plugins[j];

                    // test version of plugin (for future features)
                    pluginVersions = mejs.plugins[pluginName];

                    for (k = 0; k < pluginVersions.length; k++) {
                        pluginInfo = pluginVersions[k];

                        // test if user has the correct plugin version

                        // for youtube/vimeo
                        if (pluginInfo.version == null ||

                            mejs.PluginDetector.hasPluginVersion(pluginName, pluginInfo.version)) {

                            // test for plugin playback types
                            for (l = 0; l < pluginInfo.types.length; l++) {
                                // find plugin that can play the type
                                if (type == pluginInfo.types[l]) {
                                    result.method = pluginName;
                                    result.url = mediaFiles[i].url;
                                    return result;
                                }
                            }
                        }
                    }
                }
            }
        }

        // at this point, being in 'auto_plugin' mode implies that we tried plugins but failed.
        // if we have native support then return that.
        if (options.mode === 'auto_plugin' && result.method === 'native') {
            return result;
        }

        // what if there's nothing to play? just grab the first available
        if (result.method === '' && mediaFiles.length > 0) {
            result.url = mediaFiles[0].url;
        }

        return result;
    },

    formatType:function (url, type) {
        var ext;

        // if no type is supplied, fake it with the extension
        if (url && !type) {
            return this.getTypeFromFile(url);
        } else {
            // only return the mime part of the type in case the attribute contains the codec
            // see http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html#the-source-element
            // `video/mp4; codecs="avc1.42E01E, mp4a.40.2"` becomes `video/mp4`

            if (type && ~type.indexOf(';')) {
                return type.substr(0, type.indexOf(';'));
            } else {
                return type;
            }
        }
    },

    getTypeFromFile:function (url) {
        var ext = url.substring(url.lastIndexOf('.') + 1);
        return (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(ext) ? 'video' : 'audio') + '/' + this.getTypeFromExtension(ext);
    },

    getTypeFromExtension:function (ext) {

        switch (ext) {
            case 'mp4':
            case 'm4v':
                return 'mp4';
            case 'webm':
            case 'webma':
            case 'webmv':
                return 'webm';
            case 'ogg':
            case 'oga':
            case 'ogv':
                return 'ogg';
            default:
                return ext;
        }
    },

    createErrorMessage:function (playback, options, poster) {
        var
            htmlMediaElement = playback.htmlMediaElement,
            errorContainer = document.createElement('div');

        errorContainer.className = 'me-cannotplay';

        try {
            errorContainer.style.width = htmlMediaElement.width + 'px';
            errorContainer.style.height = htmlMediaElement.height + 'px';
        } catch (e) {
        }

        errorContainer.innerHTML = (poster !== '') ?
            '<a href="' + playback.url + '"><img src="' + poster + '" width="100%" height="100%" /></a>' :
            '<a href="' + playback.url + '"><span>Download File</span></a>';

        htmlMediaElement.parentNode.insertBefore(errorContainer, htmlMediaElement);
        htmlMediaElement.style.display = 'none';

        options.error(htmlMediaElement);
    },

    createPlugin:function (playback, options, poster, autoplay, preload, controls) {
        var
            htmlMediaElement = playback.htmlMediaElement,
            width = 1,
            height = 1,
            pluginid = 'me_' + playback.method + '_' + (mejs.meIndex++),
            pluginMediaElement = new mejs.PluginMediaElement(pluginid, playback.method, playback.url),
            container = document.createElement('div'),
            specialIEContainer,
            node,
            initVars;

        // copy tagName from html media element
        pluginMediaElement.tagName = htmlMediaElement.tagName

        // copy attributes from html media element to plugin media element
        for (var i = 0; i < htmlMediaElement.attributes.length; i++) {
            var attribute = htmlMediaElement.attributes[i];
            if (attribute.specified == true) {
                pluginMediaElement.setAttribute(attribute.name, attribute.value);
            }
        }

        // check for placement inside a <p> tag (sometimes WYSIWYG editors do this)
        node = htmlMediaElement.parentNode;
        while (node !== null && node.tagName.toLowerCase() != 'body') {
            if (node.parentNode.tagName.toLowerCase() == 'p') {
                node.parentNode.parentNode.insertBefore(node, node.parentNode);
                break;
            }
            node = node.parentNode;
        }

        if (playback.isVideo) {
            width = (options.videoWidth > 0) ? options.videoWidth : (htmlMediaElement.getAttribute('width') !== null) ? htmlMediaElement.getAttribute('width') : options.defaultVideoWidth;
            height = (options.videoHeight > 0) ? options.videoHeight : (htmlMediaElement.getAttribute('height') !== null) ? htmlMediaElement.getAttribute('height') : options.defaultVideoHeight;

            // in case of '%' make sure it's encoded
            width = mejs.Utility.encodeUrl(width);
            height = mejs.Utility.encodeUrl(height);

        } else {
            if (options.enablePluginDebug) {
                width = 320;
                height = 240;
            }
        }

        // register plugin
        pluginMediaElement.success = options.success;
        mejs.MediaPluginBridge.registerPluginElement(pluginid, pluginMediaElement, htmlMediaElement);

        // add container (must be added to DOM before inserting HTML for IE)
        container.className = 'me-plugin';
        container.id = pluginid + '_container';

        if (playback.isVideo) {
            htmlMediaElement.parentNode.insertBefore(container, htmlMediaElement);
        } else {
            document.body.insertBefore(container, document.body.childNodes[0]);
        }

        // flash/silverlight vars
        initVars = [
            'id=' + pluginid,
            'isvideo=' + ((playback.isVideo) ? "true" : "false"),
            'autoplay=' + ((autoplay) ? "true" : "false"),
            'preload=' + preload,
            'width=' + width,
            'startvolume=' + options.startVolume,
            'timerrate=' + options.timerRate,
            'height=' + height];

        if (playback.url !== null) {
            if (playback.method == 'flash') {
                initVars.push('file=' + mejs.Utility.encodeUrl(playback.url));
            } else {
                initVars.push('file=' + playback.url);
            }
        }
        if (options.enablePluginDebug) {
            initVars.push('debug=true');
        }
        if (options.enablePluginSmoothing) {
            initVars.push('smoothing=true');
        }
        if (controls) {
            initVars.push('controls=true'); // shows controls in the plugin if desired
        }
        if (options.pluginVars) {
            initVars = initVars.concat(options.pluginVars);
        }

        switch (playback.method) {
            case 'silverlight':
                container.innerHTML =
                    '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + pluginid + '" name="' + pluginid + '" width="' + width + '" height="' + height + '">' +
                        '<param name="initParams" value="' + initVars.join(',') + '" />' +
                        '<param name="windowless" value="true" />' +
                        '<param name="background" value="black" />' +
                        '<param name="minRuntimeVersion" value="3.0.0.0" />' +
                        '<param name="autoUpgrade" value="true" />' +
                        '<param name="source" value="' + options.pluginPath + options.silverlightName + '" />' +
                        '</object>';
                break;

            case 'flash':

                if (mejs.MediaFeatures.isIE) {
                    specialIEContainer = document.createElement('div');
                    container.appendChild(specialIEContainer);
                    specialIEContainer.outerHTML =
                        '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" ' +
                            'id="' + pluginid + '" width="' + width + '" height="' + height + '">' +
                            '<param name="movie" value="' + options.pluginPath + options.flashName + '?x=' + (new Date()) + '" />' +
                            '<param name="flashvars" value="' + initVars.join('&amp;') + '" />' +
                            '<param name="quality" value="high" />' +
                            '<param name="bgcolor" value="#000000" />' +
                            '<param name="wmode" value="transparent" />' +
                            '<param name="allowScriptAccess" value="always" />' +
                            '<param name="allowFullScreen" value="true" />' +
                            '</object>';

                } else {

                    container.innerHTML =
                        '<embed id="' + pluginid + '" name="' + pluginid + '" ' +
                            'play="true" ' +
                            'loop="false" ' +
                            'quality="high" ' +
                            'bgcolor="#000000" ' +
                            'wmode="transparent" ' +
                            'allowScriptAccess="always" ' +
                            'allowFullScreen="true" ' +
                            'type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" ' +
                            'src="' + options.pluginPath + options.flashName + '" ' +
                            'flashvars="' + initVars.join('&') + '" ' +
                            'width="' + width + '" ' +
                            'height="' + height + '"></embed>';
                }
                break;

            case 'youtube':


                var
                    videoId = playback.url.substr(playback.url.lastIndexOf('=') + 1);
                youtubeSettings = {
                    container:container,
                    containerId:container.id,
                    pluginMediaElement:pluginMediaElement,
                    pluginId:pluginid,
                    videoId:videoId,
                    height:height,
                    width:width
                };

                if (mejs.PluginDetector.hasPluginVersion('flash', [10, 0, 0])) {
                    mejs.YouTubeApi.createFlash(youtubeSettings);
                } else {
                    mejs.YouTubeApi.enqueueIframe(youtubeSettings);
                }

                break;

            // DEMO Code. Does NOT work.
            case 'vimeo':
                //console.log('vimeoid');

                pluginMediaElement.vimeoid = playback.url.substr(playback.url.lastIndexOf('/') + 1);

                container.innerHTML =
                    '<object width="' + width + '" height="' + height + '">' +
                        '<param name="allowfullscreen" value="true" />' +
                        '<param name="allowscriptaccess" value="always" />' +
                        '<param name="flashvars" value="api=1" />' +
                        '<param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=' + pluginMediaElement.vimeoid + '&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" />' +
                        '<embed src="//vimeo.com/moogaloop.swf?api=1&amp;clip_id=' + pluginMediaElement.vimeoid + '&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="' + width + '" height="' + height + '"></embed>' +
                        '</object>';

                break;
        }
        // hide original element
        htmlMediaElement.style.display = 'none';

        // FYI: options.success will be fired by the MediaPluginBridge

        return pluginMediaElement;
    },

    updateNative:function (playback, options, autoplay, preload) {

        var htmlMediaElement = playback.htmlMediaElement,
            m;


        // add methods to video object to bring it into parity with Flash Object
        for (m in mejs.HtmlMediaElement) {
            htmlMediaElement[m] = mejs.HtmlMediaElement[m];
        }

        /*
         Chrome now supports preload="none"
         if (mejs.MediaFeatures.isChrome) {

         // special case to enforce preload attribute (Chrome doesn't respect this)
         if (preload === 'none' && !autoplay) {

         // forces the browser to stop loading (note: fails in IE9)
         htmlMediaElement.src = '';
         htmlMediaElement.load();
         htmlMediaElement.canceledPreload = true;

         htmlMediaElement.addEventListener('play',function() {
         if (htmlMediaElement.canceledPreload) {
         htmlMediaElement.src = playback.url;
         htmlMediaElement.load();
         htmlMediaElement.play();
         htmlMediaElement.canceledPreload = false;
         }
         }, false);
         // for some reason Chrome forgets how to autoplay sometimes.
         } else if (autoplay) {
         htmlMediaElement.load();
         htmlMediaElement.play();
         }
         }
         */

        // fire success code
        options.success(htmlMediaElement, htmlMediaElement);

        return htmlMediaElement;
    }
};

/*
 - test on IE (object vs. embed)
 - determine when to use iframe (Firefox, Safari, Mobile) vs. Flash (Chrome, IE)
 - fullscreen?
 */

// YouTube Flash and Iframe API
mejs.YouTubeApi = {
    isIframeStarted:false,
    isIframeLoaded:false,
    loadIframeApi:function () {
        if (!this.isIframeStarted) {
            var tag = document.createElement('script');
            tag.src = "http://www.youtube.com/player_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            this.isIframeStarted = true;
        }
    },
    iframeQueue:[],
    enqueueIframe:function (yt) {

        if (this.isLoaded) {
            this.createIframe(yt);
        } else {
            this.loadIframeApi();
            this.iframeQueue.push(yt);
        }
    },
    createIframe:function (settings) {

        var
            pluginMediaElement = settings.pluginMediaElement,
            player = new YT.Player(settings.containerId, {
                height:settings.height,
                width:settings.width,
                videoId:settings.videoId,
                playerVars:{controls:0},
                events:{
                    'onReady':function () {

                        // hook up iframe object to MEjs
                        settings.pluginMediaElement.pluginApi = player;

                        // init mejs
                        mejs.MediaPluginBridge.initPlugin(settings.pluginId);

                        // create timer
                        setInterval(function () {
                            mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'timeupdate');
                        }, 250);
                    },
                    'onStateChange':function (e) {

                        mejs.YouTubeApi.handleStateChange(e.data, player, pluginMediaElement);

                    }
                }
            });
    },

    createEvent:function (player, pluginMediaElement, eventName) {
        var obj = {
            type:eventName,
            target:pluginMediaElement
        };

        if (player && player.getDuration) {

            // time 
            pluginMediaElement.currentTime = obj.currentTime = player.getCurrentTime();
            pluginMediaElement.duration = obj.duration = player.getDuration();

            // state
            obj.paused = pluginMediaElement.paused;
            obj.ended = pluginMediaElement.ended;

            // sound
            obj.muted = player.isMuted();
            obj.volume = player.getVolume() / 100;

            // progress
            obj.bytesTotal = player.getVideoBytesTotal();
            obj.bufferedBytes = player.getVideoBytesLoaded();

            // fake the W3C buffered TimeRange
            var bufferedTime = obj.bufferedBytes / obj.bytesTotal * obj.duration;

            obj.target.buffered = obj.buffered = {
                start:function (index) {
                    return 0;
                },
                end:function (index) {
                    return bufferedTime;
                },
                length:1
            };

        }

        // send event up the chain
        pluginMediaElement.dispatchEvent(obj.type, obj);
    },

    iFrameReady:function () {

        this.isLoaded = true;
        this.isIframeLoaded = true;

        while (this.iframeQueue.length > 0) {
            var settings = this.iframeQueue.pop();
            this.createIframe(settings);
        }
    },

    // FLASH!
    flashPlayers:{},
    createFlash:function (settings) {

        this.flashPlayers[settings.pluginId] = settings;

        /*
         settings.container.innerHTML =
         '<object type="application/x-shockwave-flash" id="' + settings.pluginId + '" data="//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=' + settings.pluginId  + '&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0" ' +
         'width="' + settings.width + '" height="' + settings.height + '" style="visibility: visible; ">' +
         '<param name="allowScriptAccess" value="always">' +
         '<param name="wmode" value="transparent">' +
         '</object>';
         */

        var specialIEContainer,
            youtubeUrl = 'http://www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=' + settings.pluginId + '&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0';

        if (mejs.MediaFeatures.isIE) {

            specialIEContainer = document.createElement('div');
            settings.container.appendChild(specialIEContainer);
            specialIEContainer.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" ' +
                'id="' + settings.pluginId + '" width="' + settings.width + '" height="' + settings.height + '">' +
                '<param name="movie" value="' + youtubeUrl + '" />' +
                '<param name="wmode" value="transparent" />' +
                '<param name="allowScriptAccess" value="always" />' +
                '<param name="allowFullScreen" value="true" />' +
                '</object>';
        } else {
            settings.container.innerHTML =
                '<object type="application/x-shockwave-flash" id="' + settings.pluginId + '" data="' + youtubeUrl + '" ' +
                    'width="' + settings.width + '" height="' + settings.height + '" style="visibility: visible; ">' +
                    '<param name="allowScriptAccess" value="always">' +
                    '<param name="wmode" value="transparent">' +
                    '</object>';
        }

    },

    flashReady:function (id) {
        var
            settings = this.flashPlayers[id],
            player = document.getElementById(id),
            pluginMediaElement = settings.pluginMediaElement;

        // hook up and return to MediaELementPlayer.success	
        pluginMediaElement.pluginApi =
            pluginMediaElement.pluginElement = player;
        mejs.MediaPluginBridge.initPlugin(id);

        // load the youtube video
        player.cueVideoById(settings.videoId);

        var callbackName = settings.containerId + '_callback'

        window[callbackName] = function (e) {
            mejs.YouTubeApi.handleStateChange(e, player, pluginMediaElement);
        }

        player.addEventListener('onStateChange', callbackName);

        setInterval(function () {
            mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'timeupdate');
        }, 250);
    },

    handleStateChange:function (youTubeState, player, pluginMediaElement) {
        switch (youTubeState) {
            case -1: // not started
                pluginMediaElement.paused = true;
                pluginMediaElement.ended = true;
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'loadedmetadata');
                //createYouTubeEvent(player, pluginMediaElement, 'loadeddata');
                break;
            case 0:
                pluginMediaElement.paused = false;
                pluginMediaElement.ended = true;
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'ended');
                break;
            case 1:
                pluginMediaElement.paused = false;
                pluginMediaElement.ended = false;
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'play');
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'playing');
                break;
            case 2:
                pluginMediaElement.paused = true;
                pluginMediaElement.ended = false;
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'pause');
                break;
            case 3: // buffering
                mejs.YouTubeApi.createEvent(player, pluginMediaElement, 'progress');
                break;
            case 5:
                // cued?
                break;

        }

    }
}
// IFRAME
function onYouTubePlayerAPIReady() {
    mejs.YouTubeApi.iFrameReady();
}
// FLASH
function onYouTubePlayerReady(id) {
    mejs.YouTubeApi.flashReady(id);
}

window.mejs = mejs;
window.MediaElement = mejs.MediaElement;


/*!
 * MediaElementPlayer
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
 *
 * Copyright 2010-2012, John Dyer (http://j.hn/)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */
if (typeof jQuery != 'undefined') {
    mejs.$ = jQuery;
} else if (typeof ender != 'undefined') {
    mejs.$ = ender;
}
(function ($) {



    // default player values

    mejs.MepDefaults = {

        // url to poster (to fix iOS 3.x)

        poster:'',

        // default if the <video width> is not specified

        defaultVideoWidth:480,

        // default if the <video height> is not specified

        defaultVideoHeight:270,

        // if set, overrides <video width>

        videoWidth:-1,

        // if set, overrides <video height>

        videoHeight:-1,

        // default if the user doesn't specify

        defaultAudioWidth:400,

        // default if the user doesn't specify

        defaultAudioHeight:30,


        // default amount to move back when back key is pressed		

        defaultSeekBackwardInterval:function (media) {

            return (media.duration * 0.05);

        },

        // default amount to move forward when forward key is pressed				

        defaultSeekForwardInterval:function (media) {

            return (media.duration * 0.05);

        },


        // width of audio player

        audioWidth:-1,

        // height of audio player

        audioHeight:-1,

        // initial volume when the player starts (overrided by user cookie)

        startVolume:0.8,

        // useful for <audio> player loops

        loop:false,

        // resize to media dimensions

        enableAutosize:true,

        // forces the hour marker (##:00:00)

        alwaysShowHours:false,


        // show framecount in timecode (##:00:00:00)

        showTimecodeFrameCount:false,

        // used when showTimecodeFrameCount is set to true

        framesPerSecond:25,


        // automatically calculate the width of the progress bar based on the sizes of other elements

        autosizeProgress:true,

        // Hide controls when playing and mouse is not over the video

        alwaysShowControls:false,

        // force iPad's native controls

        iPadUseNativeControls:false,

        // force iPhone's native controls

        iPhoneUseNativeControls:false,

        // force Android's native controls

        AndroidUseNativeControls:false,

        // features to show

        features:['playpause', 'current', 'progress', 'duration', 'tracks', 'volume', 'fullscreen'],

        // only for dynamic

        isVideo:true,


        // turns keyboard support on and off for this instance

        enableKeyboard:true,


        // whenthis player starts, it will pause other players

        pauseOtherPlayers:true,


        // array of keyboard actions such as play pause

        keyActions:[

            {

                keys:[

                    32, // SPACE

                    179 // GOOGLE play/pause button

                ],

                action:function (player, media) {

                    if (media.paused || media.ended) {

                        media.play();

                    } else {

                        media.pause();

                    }

                }

            },

            {

                keys:[38], // UP

                action:function (player, media) {

                    var newVolume = Math.min(media.volume + 0.1, 1);

                    media.setVolume(newVolume);

                }

            },

            {

                keys:[40], // DOWN

                action:function (player, media) {

                    var newVolume = Math.max(media.volume - 0.1, 0);

                    media.setVolume(newVolume);

                }

            },

            {

                keys:[

                    37, // LEFT

                    227 // Google TV rewind

                ],

                action:function (player, media) {

                    if (!isNaN(media.duration) && media.duration > 0) {

                        if (player.isVideo) {

                            player.showControls();

                            player.startControlsTimer();

                        }


                        // 5%

                        var newTime = Math.max(media.currentTime - player.options.defaultSeekBackwardInterval(media), 0);

                        media.setCurrentTime(newTime);

                    }

                }

            },

            {

                keys:[

                    39, // RIGHT

                    228 // Google TV forward

                ],

                action:function (player, media) {

                    if (!isNaN(media.duration) && media.duration > 0) {

                        if (player.isVideo) {

                            player.showControls();

                            player.startControlsTimer();

                        }


                        // 5%

                        var newTime = Math.min(media.currentTime + player.options.defaultSeekForwardInterval(media), media.duration);

                        media.setCurrentTime(newTime);

                    }

                }

            },

            {

                keys:[70], // f

                action:function (player, media) {

                    if (typeof player.enterFullScreen != 'undefined') {

                        if (player.isFullScreen) {

                            player.exitFullScreen();

                        } else {

                            player.enterFullScreen();

                        }

                    }

                }

            }

        ]

    };


    mejs.mepIndex = 0;


    mejs.players = [];


    // wraps a MediaElement object in player controls

    mejs.MediaElementPlayer = function (node, o) {

        // enforce object, even without "new" (via John Resig)

        if (!(this instanceof mejs.MediaElementPlayer)) {

            return new mejs.MediaElementPlayer(node, o);

        }


        var t = this;


        // these will be reset after the MediaElement.success fires

        t.$media = t.$node = $(node);

        t.node = t.media = t.$media[0];


        // check for existing player

        if (typeof t.node.player != 'undefined') {

            return t.node.player;

        } else {

            // attach player to DOM node for reference

            t.node.player = t;

        }


        // try to get options from data-mejsoptions

        if (typeof o == 'undefined') {

            o = t.$node.data('mejsoptions');

        }


        // extend default options

        t.options = $.extend({}, mejs.MepDefaults, o);


        // add to player array (for focus events)

        mejs.players.push(t);


        // start up

        t.init();


        return t;

    };


    // actual player

    mejs.MediaElementPlayer.prototype = {



        hasFocus:false,


        controlsAreVisible:true,


        init:function () {


            var

                t = this,

                mf = mejs.MediaFeatures,

            // options for MediaElement (shim)

                meOptions = $.extend(true, {}, t.options, {

                    success:function (media, domNode) {
                        t.meReady(media, domNode);
                    },

                    error:function (e) {
                        t.handleError(e);
                    }

                }),

                tagName = t.media.tagName.toLowerCase();


            t.isDynamic = (tagName !== 'audio' && tagName !== 'video');


            if (t.isDynamic) {

                // get video from src or href?				

                t.isVideo = t.options.isVideo;

            } else {

                t.isVideo = (tagName !== 'audio' && t.options.isVideo);

            }


            // use native controls in iPad, iPhone, and Android	

            if ((mf.isiPad && t.options.iPadUseNativeControls) || (mf.isiPhone && t.options.iPhoneUseNativeControls)) {



                // add controls and stop

                t.$media.attr('controls', 'controls');


                // attempt to fix iOS 3 bug

                //t.$media.removeAttr('poster');

                // no Issue found on iOS3 -ttroxell


                // override Apple's autoplay override for iPads

                if (mf.isiPad && t.media.getAttribute('autoplay') !== null) {

                    t.media.load();

                    t.media.play();

                }


            } else if (mf.isAndroid && t.AndroidUseNativeControls) {



                // leave default player


            } else {



                // DESKTOP: use MediaElementPlayer controls


                // remove native controls 			

                t.$media.removeAttr('controls');


                // unique ID

                t.id = 'mep_' + mejs.mepIndex++;


                // build container

                t.container =

                    $('<div id="' + t.id + '" class="mejs-container">' +

                        '<div class="mejs-inner">' +

                        '<div class="mejs-mediaelement"></div>' +

                        '<div class="mejs-layers"></div>' +

                        '<div class="mejs-controls"></div>' +

                        '<div class="mejs-clear"></div>' +

                        '</div>' +

                        '</div>')

                        .addClass(t.$media[0].className)

                        .insertBefore(t.$media);


                // add classes for user and content

                t.container.addClass(

                    (mf.isAndroid ? 'mejs-android ' : '') +

                        (mf.isiOS ? 'mejs-ios ' : '') +

                        (mf.isiPad ? 'mejs-ipad ' : '') +

                        (mf.isiPhone ? 'mejs-iphone ' : '') +

                        (t.isVideo ? 'mejs-video ' : 'mejs-audio ')

                );


                // move the <video/video> tag into the right spot

                if (mf.isiOS) {



                    // sadly, you can't move nodes in iOS, so we have to destroy and recreate it!

                    var $newMedia = t.$media.clone();


                    t.container.find('.mejs-mediaelement').append($newMedia);


                    t.$media.remove();

                    t.$node = t.$media = $newMedia;

                    t.node = t.media = $newMedia[0]


                } else {



                    // normal way of moving it into place (doesn't work on iOS)

                    t.container.find('.mejs-mediaelement').append(t.$media);

                }


                // find parts

                t.controls = t.container.find('.mejs-controls');

                t.layers = t.container.find('.mejs-layers');


                // determine the size


                /* size priority:

                 (1) videoWidth (forced), 

                 (2) style="width;height;"

                 (3) width attribute,

                 (4) defaultVideoWidth (for unspecified cases)

                 */


                var tagType = (t.isVideo ? 'video' : 'audio'),

                    capsTagName = tagType.substring(0, 1).toUpperCase() + tagType.substring(1);


                if (t.options[tagType + 'Width'] > 0 || t.options[tagType + 'Width'].toString().indexOf('%') > -1) {

                    t.width = t.options[tagType + 'Width'];

                } else if (t.media.style.width !== '' && t.media.style.width !== null) {

                    t.width = t.media.style.width;

                } else if (t.media.getAttribute('width') !== null) {

                    t.width = t.$media.attr('width');

                } else {

                    t.width = t.options['default' + capsTagName + 'Width'];

                }


                if (t.options[tagType + 'Height'] > 0 || t.options[tagType + 'Height'].toString().indexOf('%') > -1) {

                    t.height = t.options[tagType + 'Height'];

                } else if (t.media.style.height !== '' && t.media.style.height !== null) {

                    t.height = t.media.style.height;

                } else if (t.$media[0].getAttribute('height') !== null) {

                    t.height = t.$media.attr('height');

                } else {

                    t.height = t.options['default' + capsTagName + 'Height'];

                }


                // set the size, while we wait for the plugins to load below

                t.setPlayerSize(t.width, t.height);


                // create MediaElementShim

                meOptions.pluginWidth = t.height;

                meOptions.pluginHeight = t.width;

            }


            // create MediaElement shim

            mejs.MediaElement(t.$media[0], meOptions);

        },


        showControls:function (doAnimation) {

            var t = this;


            doAnimation = typeof doAnimation == 'undefined' || doAnimation;


            if (t.controlsAreVisible)

                return;


            if (doAnimation) {

                t.controls

                    .css('visibility', 'visible')

                    .stop(true, true).fadeIn(200, function () {
                        t.controlsAreVisible = true;
                    });


                // any additional controls people might add and want to hide

                t.container.find('.mejs-control')

                    .css('visibility', 'visible')

                    .stop(true, true).fadeIn(200, function () {
                        t.controlsAreVisible = true;
                    });


            } else {

                t.controls

                    .css('visibility', 'visible')

                    .css('display', 'block');


                // any additional controls people might add and want to hide

                t.container.find('.mejs-control')

                    .css('visibility', 'visible')

                    .css('display', 'block');


                t.controlsAreVisible = true;

            }


            t.setControlsSize();


        },


        hideControls:function (doAnimation) {

            var t = this;


            doAnimation = typeof doAnimation == 'undefined' || doAnimation;


            if (!t.controlsAreVisible)

                return;


            if (doAnimation) {

                // fade out main controls

                t.controls.stop(true, true).fadeOut(200, function () {

                    $(this)

                        .css('visibility', 'hidden')

                        .css('display', 'block');


                    t.controlsAreVisible = false;

                });


                // any additional controls people might add and want to hide

                t.container.find('.mejs-control').stop(true, true).fadeOut(200, function () {

                    $(this)

                        .css('visibility', 'hidden')

                        .css('display', 'block');

                });

            } else {



                // hide main controls

                t.controls

                    .css('visibility', 'hidden')

                    .css('display', 'block');


                // hide others

                t.container.find('.mejs-control')

                    .css('visibility', 'hidden')

                    .css('display', 'block');


                t.controlsAreVisible = false;

            }

        },


        controlsTimer:null,


        startControlsTimer:function (timeout) {


            var t = this;


            timeout = typeof timeout != 'undefined' ? timeout : 1500;


            t.killControlsTimer('start');


            t.controlsTimer = setTimeout(function () {

                //console.log('timer fired');

                t.hideControls();

                t.killControlsTimer('hide');

            }, timeout);

        },


        killControlsTimer:function (src) {


            var t = this;


            if (t.controlsTimer !== null) {

                clearTimeout(t.controlsTimer);

                delete t.controlsTimer;

                t.controlsTimer = null;

            }

        },


        controlsEnabled:true,


        disableControls:function () {

            var t = this;


            t.killControlsTimer();

            t.hideControls(false);

            this.controlsEnabled = false;

        },


        enableControls:function () {

            var t = this;


            t.showControls(false);


            t.controlsEnabled = true;

        },


        // Sets up all controls and events

        meReady:function (media, domNode) {


            var t = this,

                mf = mejs.MediaFeatures,

                autoplayAttr = domNode.getAttribute('autoplay'),

                autoplay = !(typeof autoplayAttr == 'undefined' || autoplayAttr === null || autoplayAttr === 'false'),

                featureIndex,

                feature;


            // make sure it can't create itself again if a plugin reloads

            if (t.created)

                return;

            else

                t.created = true;


            t.media = media;

            t.domNode = domNode;


            if (!(mf.isAndroid && t.options.AndroidUseNativeControls) && !(mf.isiPad && t.options.iPadUseNativeControls) && !(mf.isiPhone && t.options.iPhoneUseNativeControls)) {



                // two built in features

                t.buildposter(t, t.controls, t.layers, t.media);

                t.buildkeyboard(t, t.controls, t.layers, t.media);

                t.buildoverlays(t, t.controls, t.layers, t.media);


                // grab for use by features

                t.findTracks();


                // add user-defined features/controls

                for (featureIndex in t.options.features) {

                    feature = t.options.features[featureIndex];

                    if (t['build' + feature]) {

                        try {

                            t['build' + feature](t, t.controls, t.layers, t.media);

                        } catch (e) {

                            // TODO: report control error

                            //throw e;

                            //console.log('error building ' + feature);

                            //console.log(e);

                        }

                    }

                }


                t.container.trigger('controlsready');


                // reset all layers and controls

                t.setPlayerSize(t.width, t.height);

                t.setControlsSize();


                // controls fade

                if (t.isVideo) {


                    if (mejs.MediaFeatures.hasTouch) {



                        // for touch devices (iOS, Android)

                        // show/hide without animation on touch


                        t.$media.bind('touchstart', function () {





                            // toggle controls

                            if (t.controlsAreVisible) {

                                t.hideControls(false);

                            } else {

                                if (t.controlsEnabled) {

                                    t.showControls(false);

                                }

                            }

                        });


                    } else {

                        // click controls

                        var clickElement = (t.media.pluginType == 'native') ? t.$media : $(t.media.pluginElement);


                        // click to play/pause

                        clickElement.click(function () {

                            if (media.paused) {

                                media.play();

                            } else {

                                media.pause();

                            }

                        });


                        // show/hide controls

                        t.container

                            .bind('mouseenter mouseover', function () {

                                if (t.controlsEnabled) {

                                    if (!t.options.alwaysShowControls) {

                                        t.killControlsTimer('enter');

                                        t.showControls();

                                        t.startControlsTimer(2500);

                                    }

                                }

                            })

                            .bind('mousemove', function () {

                                if (t.controlsEnabled) {

                                    if (!t.controlsAreVisible) {

                                        t.showControls();

                                    }

                                    //t.killControlsTimer('move');

                                    if (!t.options.alwaysShowControls) {

                                        t.startControlsTimer(2500);

                                    }

                                }

                            })

                            .bind('mouseleave', function () {

                                if (t.controlsEnabled) {

                                    if (!t.media.paused && !t.options.alwaysShowControls) {

                                        t.startControlsTimer(1000);

                                    }

                                }

                            });

                    }


                    // check for autoplay

                    if (autoplay && !t.options.alwaysShowControls) {

                        t.hideControls();

                    }


                    // resizer

                    if (t.options.enableAutosize) {

                        t.media.addEventListener('loadedmetadata', function (e) {

                            // if the <video height> was not set and the options.videoHeight was not set

                            // then resize to the real dimensions

                            if (t.options.videoHeight <= 0 && t.domNode.getAttribute('height') === null && !isNaN(e.target.videoHeight)) {

                                t.setPlayerSize(e.target.videoWidth, e.target.videoHeight);

                                t.setControlsSize();

                                t.media.setVideoSize(e.target.videoWidth, e.target.videoHeight);

                            }

                        }, false);

                    }

                }


                // EVENTS


                // FOCUS: when a video starts playing, it takes focus from other players (possibily pausing them)

                media.addEventListener('play', function () {



                    // go through all other players

                    for (var i = 0, il = mejs.players.length; i < il; i++) {

                        var p = mejs.players[i];

                        if (p.id != t.id && t.options.pauseOtherPlayers && !p.paused && !p.ended) {

                            p.pause();

                        }

                        p.hasFocus = false;

                    }


                    t.hasFocus = true;

                }, false);


                // ended for all

                t.media.addEventListener('ended', function (e) {

                    try {

                        t.media.setCurrentTime(0);

                    } catch (exp) {


                    }

                    t.media.pause();


                    if (t.setProgressRail)

                        t.setProgressRail();

                    if (t.setCurrentRail)

                        t.setCurrentRail();


                    if (t.options.loop) {

                        t.media.play();

                    } else if (!t.options.alwaysShowControls && t.controlsEnabled) {

                        t.showControls();

                    }

                }, false);


                // resize on the first play

                t.media.addEventListener('loadedmetadata', function (e) {

                    if (t.updateDuration) {

                        t.updateDuration();

                    }

                    if (t.updateCurrent) {

                        t.updateCurrent();

                    }


                    if (!t.isFullScreen) {

                        t.setPlayerSize(t.width, t.height);

                        t.setControlsSize();

                    }

                }, false);


                // webkit has trouble doing this without a delay

                setTimeout(function () {

                    t.setPlayerSize(t.width, t.height);

                    t.setControlsSize();

                }, 50);


                // adjust controls whenever window sizes (used to be in fullscreen only)

                $(window).resize(function () {



                    // don't resize for fullscreen mode				

                    if (!(t.isFullScreen || (mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen))) {

                        t.setPlayerSize(t.width, t.height);

                    }


                    // always adjust controls

                    t.setControlsSize();

                });


                // TEMP: needs to be moved somewhere else

                if (t.media.pluginType == 'youtube') {

                    t.container.find('.mejs-overlay-play').hide();

                }

            }


            // force autoplay for HTML5

            if (autoplay && media.pluginType == 'native') {

                media.load();

                media.play();

            }


            if (t.options.success) {


                if (typeof t.options.success == 'string') {

                    window[t.options.success](t.media, t.domNode, t);

                } else {

                    t.options.success(t.media, t.domNode, t);

                }

            }

        },


        handleError:function (e) {

            var t = this;


            t.controls.hide();


            // Tell user that the file cannot be played

            if (t.options.error) {

                t.options.error(e);

            }

        },


        setPlayerSize:function (width, height) {

            var t = this;


            if (typeof width != 'undefined')

                t.width = width;


            if (typeof height != 'undefined')

                t.height = height;


            // detect 100% mode

            if (t.height.toString().indexOf('%') > 0 || t.$node.css('max-width') === '100%') {



                // do we have the native dimensions yet?

                var

                    nativeWidth = (t.media.videoWidth && t.media.videoWidth > 0) ? t.media.videoWidth : t.options.defaultVideoWidth,

                    nativeHeight = (t.media.videoHeight && t.media.videoHeight > 0) ? t.media.videoHeight : t.options.defaultVideoHeight,

                    parentWidth = t.container.parent().width(),

                    newHeight = parseInt(parentWidth * nativeHeight / nativeWidth, 10);


                if (t.container.parent()[0].tagName.toLowerCase() === 'body') { // && t.container.siblings().count == 0) {

                    parentWidth = $(window).width();

                    newHeight = $(window).height();

                }


                if (newHeight != 0) {

                    // set outer container size

                    t.container

                        .width(parentWidth)

                        .height(newHeight);


                    // set native <video>

                    t.$media

                        .width('100%')

                        .height('100%');


                    // set shims

                    t.container.find('object, embed, iframe')

                        .width('100%')

                        .height('100%');


                    // if shim is ready, send the size to the embeded plugin	

                    if (t.isVideo) {

                        if (t.media.setVideoSize) {

                            t.media.setVideoSize(parentWidth, newHeight);

                        }

                    }


                    // set the layers

                    t.layers.children('.mejs-layer')

                        .width('100%')

                        .height('100%');

                }


            } else {


                t.container

                    .width(t.width)

                    .height(t.height);


                t.layers.children('.mejs-layer')

                    .width(t.width)

                    .height(t.height);


            }

        },


        setControlsSize:function () {

            var t = this,

                usedWidth = 0,

                railWidth = 0,

                rail = t.controls.find('.mejs-time-rail'),

                total = t.controls.find('.mejs-time-total'),

                current = t.controls.find('.mejs-time-current'),

                loaded = t.controls.find('.mejs-time-loaded'),

                others = rail.siblings();


            // allow the size to come from custom CSS

            if (t.options && !t.options.autosizeProgress) {

                // Also, frontends devs can be more flexible 

                // due the opportunity of absolute positioning.

                railWidth = parseInt(rail.css('width'));

            }


            // attempt to autosize

            if (railWidth === 0 || !railWidth) {



                // find the size of all the other controls besides the rail

                others.each(function () {

                    if ($(this).css('position') != 'absolute') {

                        usedWidth += $(this).outerWidth(true);

                    }

                });


                // fit the rail into the remaining space

                railWidth = t.controls.width() - usedWidth - (rail.outerWidth(true) - rail.width());

            }


            // outer area

            rail.width(railWidth);

            // dark space

            total.width(railWidth - (total.outerWidth(true) - total.width()));


            if (t.setProgressRail)

                t.setProgressRail();

            if (t.setCurrentRail)

                t.setCurrentRail();

        },


        buildposter:function (player, controls, layers, media) {

            var t = this,

                poster =

                    $('<div class="mejs-poster mejs-layer">' +

                        '</div>')

                        .appendTo(layers),

                posterUrl = player.$media.attr('poster');


            // prioriy goes to option (this is useful if you need to support iOS 3.x (iOS completely fails with poster)

            if (player.options.poster !== '') {

                posterUrl = player.options.poster;

            }


            // second, try the real poster

            if (posterUrl !== '' && posterUrl != null) {

                t.setPoster(posterUrl);

            } else {

                poster.hide();

            }


            media.addEventListener('play', function () {

                poster.hide();

            }, false);

        },


        setPoster:function (url) {

            var t = this,

                posterDiv = t.container.find('.mejs-poster'),

                posterImg = posterDiv.find('img');


            if (posterImg.length == 0) {

                posterImg = $('<img width="100%" height="100%" />').appendTo(posterDiv);

            }


            posterImg.attr('src', url);

        },


        buildoverlays:function (player, controls, layers, media) {

            if (!player.isVideo)

                return;


            var

                loading =

                    $('<div class="mejs-overlay mejs-layer">' +

                        '<div class="mejs-overlay-loading"><span></span></div>' +

                        '</div>')

                        .hide()// start out hidden

                        .appendTo(layers),

                error =

                    $('<div class="mejs-overlay mejs-layer">' +

                        '<div class="mejs-overlay-error"></div>' +

                        '</div>')

                        .hide()// start out hidden

                        .appendTo(layers),

            // this needs to come last so it's on top

                bigPlay =

                    $('<div class="mejs-overlay mejs-layer mejs-overlay-play">' +

                        '<div class="mejs-overlay-button"></div>' +

                        '</div>')

                        .appendTo(layers)

                        .click(function () {

                            if (media.paused) {

                                media.play();

                            } else {

                                media.pause();

                            }

                        });


            /*

             if (mejs.MediaFeatures.isiOS || mejs.MediaFeatures.isAndroid) {

             bigPlay.remove();

             loading.remove();

             }

             */


            // show/hide big play button

            media.addEventListener('play', function () {

                bigPlay.hide();

                loading.hide();

                controls.find('.mejs-time-buffering').hide();

                error.hide();

            }, false);


            media.addEventListener('playing', function () {

                bigPlay.hide();

                loading.hide();

                controls.find('.mejs-time-buffering').hide();

                error.hide();

            }, false);


            media.addEventListener('seeking', function () {

                loading.show();

                controls.find('.mejs-time-buffering').show();

            }, false);


            media.addEventListener('seeked', function () {

                loading.hide();

                controls.find('.mejs-time-buffering').hide();

            }, false);


            media.addEventListener('pause', function () {

                if (!mejs.MediaFeatures.isiPhone) {

                    bigPlay.show();

                }

            }, false);


            media.addEventListener('waiting', function () {

                loading.show();

                controls.find('.mejs-time-buffering').show();

            }, false);


            // show/hide loading			

            media.addEventListener('loadeddata', function () {

                // for some reason Chrome is firing this event

                //if (mejs.MediaFeatures.isChrome && media.getAttribute && media.getAttribute('preload') === 'none')

                //	return;


                loading.show();

                controls.find('.mejs-time-buffering').show();

            }, false);

            media.addEventListener('canplay', function () {

                loading.hide();

                controls.find('.mejs-time-buffering').hide();

            }, false);


            // error handling

            media.addEventListener('error', function () {

                loading.hide();

                controls.find('.mejs-time-buffering').hide();

                error.show();

                error.find('mejs-overlay-error').html("Error loading this resource");

            }, false);

        },


        buildkeyboard:function (player, controls, layers, media) {


            var t = this;


            // listen for key presses

            $(document).keydown(function (e) {


                if (player.hasFocus && player.options.enableKeyboard) {



                    // find a matching key

                    for (var i = 0, il = player.options.keyActions.length; i < il; i++) {

                        var keyAction = player.options.keyActions[i];


                        for (var j = 0, jl = keyAction.keys.length; j < jl; j++) {

                            if (e.keyCode == keyAction.keys[j]) {

                                e.preventDefault();

                                keyAction.action(player, media, e.keyCode);

                                return false;

                            }

                        }

                    }

                }


                return true;

            });


            // check if someone clicked outside a player region, then kill its focus

            $(document).click(function (event) {

                if ($(event.target).closest('.mejs-container').length == 0) {

                    player.hasFocus = false;

                }

            });


        },


        findTracks:function () {

            var t = this,

                tracktags = t.$media.find('track');


            // store for use by plugins

            t.tracks = [];

            tracktags.each(function (index, track) {


                track = $(track);


                t.tracks.push({

                    srclang:track.attr('srclang').toLowerCase(),

                    src:track.attr('src'),

                    kind:track.attr('kind'),

                    label:track.attr('label') || '',

                    entries:[],

                    isLoaded:false

                });

            });

        },

        changeSkin:function (className) {

            this.container[0].className = 'mejs-container ' + className;

            this.setPlayerSize(this.width, this.height);

            this.setControlsSize();

        },

        play:function () {

            this.media.play();

        },

        pause:function () {

            this.media.pause();

        },

        load:function () {

            this.media.load();

        },

        setMuted:function (muted) {

            this.media.setMuted(muted);

        },

        setCurrentTime:function (time) {

            this.media.setCurrentTime(time);

        },

        getCurrentTime:function () {

            return this.media.currentTime;

        },

        setVolume:function (volume) {

            this.media.setVolume(volume);

        },

        getVolume:function () {

            return this.media.volume;

        },

        setSrc:function (src) {

            this.media.setSrc(src);

        },

        remove:function () {

            var t = this;


            if (t.media.pluginType === 'flash') {

                t.media.remove();

            } else if (t.media.pluginType === 'native') {

                t.$media.prop('controls', true);

            }


            // grab video and put it back in place

            if (!t.isDynamic) {

                t.$node.insertBefore(t.container)

            }


            t.container.remove();

        }

    };


    // turn into jQuery plugin

    if (typeof jQuery != 'undefined') {

        jQuery.fn.mediaelementplayer = function (options) {

            return this.each(function () {

                new mejs.MediaElementPlayer(this, options);

            });

        };

    }


    $(document).ready(function () {

        // auto enable using JSON attribute

        $('.mejs-player').mediaelementplayer();

    });


    // push out to window

    window.MediaElementPlayer = mejs.MediaElementPlayer;


})(mejs.$);


(function ($) {

    $.extend(mejs.MepDefaults, {
        playpauseText:'Play/Pause'
    });

    // PLAY/pause BUTTON
    $.extend(MediaElementPlayer.prototype, {
        buildplaypause:function (player, controls, layers, media) {
            var
                t = this,
                play =
                    $('<div class="mejs-button mejs-playpause-button mejs-play" >' +
                        '<button type="button" aria-controls="' + t.id + '" title="' + t.options.playpauseText + '"></button>' +
                        '</div>')
                        .appendTo(controls)
                        .click(function (e) {
                            e.preventDefault();

                            if (media.paused) {
                                media.play();
                            } else {
                                media.pause();
                            }

                            return false;
                        });

            media.addEventListener('play', function () {
                play.removeClass('mejs-play').addClass('mejs-pause');
            }, false);
            media.addEventListener('playing', function () {
                play.removeClass('mejs-play').addClass('mejs-pause');
            }, false);


            media.addEventListener('pause', function () {
                play.removeClass('mejs-pause').addClass('mejs-play');
            }, false);
            media.addEventListener('paused', function () {
                play.removeClass('mejs-pause').addClass('mejs-play');
            }, false);
        }
    });

})(mejs.$);
(function ($) {

    $.extend(mejs.MepDefaults, {
        stopText:'Stop'
    });

    // STOP BUTTON
    $.extend(MediaElementPlayer.prototype, {
        buildstop:function (player, controls, layers, media) {
            var t = this,
                stop =
                    $('<div class="mejs-button mejs-stop-button mejs-stop">' +
                        '<button type="button" aria-controls="' + t.id + '" title="' + t.options.stopText + '"></button>' +
                        '</div>')
                        .appendTo(controls)
                        .click(function () {
                            if (!media.paused) {
                                media.pause();
                            }
                            if (media.currentTime > 0) {
                                media.setCurrentTime(0);
                                controls.find('.mejs-time-current').width('0px');
                                controls.find('.mejs-time-handle').css('left', '0px');
                                controls.find('.mejs-time-float-current').html(mejs.Utility.secondsToTimeCode(0));
                                controls.find('.mejs-currenttime').html(mejs.Utility.secondsToTimeCode(0));
                                layers.find('.mejs-poster').show();
                            }
                        });
        }
    });

})(mejs.$);
(function ($) {
    // progress/loaded bar
    $.extend(MediaElementPlayer.prototype, {
        buildprogress:function (player, controls, layers, media) {

            $('<div class="mejs-time-rail">' +
                '<span class="mejs-time-total">' +
                '<span class="mejs-time-buffering"></span>' +
                '<span class="mejs-time-loaded"></span>' +
                '<span class="mejs-time-current"></span>' +
                '<span class="mejs-time-handle"></span>' +
                '<span class="mejs-time-float">' +
                '<span class="mejs-time-float-current">00:00</span>' +
                '<span class="mejs-time-float-corner"></span>' +
                '</span>' +
                '</span>' +
                '</div>')
                .appendTo(controls);
            controls.find('.mejs-time-buffering').hide();

            var
                t = this,
                total = controls.find('.mejs-time-total'),
                loaded = controls.find('.mejs-time-loaded'),
                current = controls.find('.mejs-time-current'),
                handle = controls.find('.mejs-time-handle'),
                timefloat = controls.find('.mejs-time-float'),
                timefloatcurrent = controls.find('.mejs-time-float-current'),
                handleMouseMove = function (e) {
                    // mouse position relative to the object
                    var x = e.pageX,
                        offset = total.offset(),
                        width = total.outerWidth(),
                        percentage = 0,
                        newTime = 0,
                        pos = x - offset.left;


                    if (x > offset.left && x <= width + offset.left && media.duration) {
                        percentage = ((x - offset.left) / width);
                        newTime = (percentage <= 0.02) ? 0 : percentage * media.duration;

                        // seek to where the mouse is
                        if (mouseIsDown) {
                            media.setCurrentTime(newTime);
                        }

                        // position floating time box
                        if (!mejs.MediaFeatures.hasTouch) {
                            timefloat.css('left', pos);
                            timefloatcurrent.html(mejs.Utility.secondsToTimeCode(newTime));
                            timefloat.show();
                        }
                    }
                },
                mouseIsDown = false,
                mouseIsOver = false;

            // handle clicks
            //controls.find('.mejs-time-rail').delegate('span', 'click', handleMouseMove);
            total
                .bind('mousedown', function (e) {
                    // only handle left clicks
                    if (e.which === 1) {
                        mouseIsDown = true;
                        handleMouseMove(e);
                        $(document)
                            .bind('mousemove.dur', function (e) {
                                handleMouseMove(e);
                            })
                            .bind('mouseup.dur', function (e) {
                                mouseIsDown = false;
                                timefloat.hide();
                                $(document).unbind('.dur');
                            });
                        return false;
                    }
                })
                .bind('mouseenter', function (e) {
                    mouseIsOver = true;
                    $(document).bind('mousemove.dur', function (e) {
                        handleMouseMove(e);
                    });
                    if (!mejs.MediaFeatures.hasTouch) {
                        timefloat.show();
                    }
                })
                .bind('mouseleave', function (e) {
                    mouseIsOver = false;
                    if (!mouseIsDown) {
                        $(document).unbind('.dur');
                        timefloat.hide();
                    }
                });

            // loading
            media.addEventListener('progress', function (e) {
                player.setProgressRail(e);
                player.setCurrentRail(e);
            }, false);

            // current time
            media.addEventListener('timeupdate', function (e) {
                player.setProgressRail(e);
                player.setCurrentRail(e);
            }, false);


            // store for later use
            t.loaded = loaded;
            t.total = total;
            t.current = current;
            t.handle = handle;
        },
        setProgressRail:function (e) {

            var
                t = this,
                target = (e != undefined) ? e.target : t.media,
                percent = null;

            // newest HTML5 spec has buffered array (FF4, Webkit)
            if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && target.duration) {
                // TODO: account for a real array with multiple values (only Firefox 4 has this so far) 
                percent = target.buffered.end(0) / target.duration;
            }
            // Some browsers (e.g., FF3.6 and Safari 5) cannot calculate target.bufferered.end()
            // to be anything other than 0. If the byte count is available we use this instead.
            // Browsers that support the else if do not seem to have the bufferedBytes value and
            // should skip to there. Tested in Safari 5, Webkit head, FF3.6, Chrome 6, IE 7/8.
            else if (target && target.bytesTotal != undefined && target.bytesTotal > 0 && target.bufferedBytes != undefined) {
                percent = target.bufferedBytes / target.bytesTotal;
            }
            // Firefox 3 with an Ogg file seems to go this way
            else if (e && e.lengthComputable && e.total != 0) {
                percent = e.loaded / e.total;
            }

            // finally update the progress bar
            if (percent !== null) {
                percent = Math.min(1, Math.max(0, percent));
                // update loaded bar
                if (t.loaded && t.total) {
                    t.loaded.width(t.total.width() * percent);
                }
            }
        },
        setCurrentRail:function () {

            var t = this;

            if (t.media.currentTime != undefined && t.media.duration) {

                // update bar and handle
                if (t.total && t.handle) {
                    var
                        newWidth = t.total.width() * t.media.currentTime / t.media.duration,
                        handlePos = newWidth - (t.handle.outerWidth(true) / 2);

                    t.current.width(newWidth);
                    t.handle.css('left', handlePos);
                }
            }

        }
    });
})(mejs.$);
(function ($) {



    // options

    $.extend(mejs.MepDefaults, {

        duration:-1,

        timeAndDurationSeparator:' <span> | </span> '

    });


    // current and duration 00:00 / 00:00

    $.extend(MediaElementPlayer.prototype, {

        buildcurrent:function (player, controls, layers, media) {

            var t = this;


            $('<div class="mejs-time">' +

                '<span class="mejs-currenttime">' + (player.options.alwaysShowHours ? '00:' : '')

                + (player.options.showTimecodeFrameCount ? '00:00:00' : '00:00') + '</span>' +

                '</div>')

                .appendTo(controls);


            t.currenttime = t.controls.find('.mejs-currenttime');


            media.addEventListener('timeupdate', function () {

                player.updateCurrent();

            }, false);

        },


        buildduration:function (player, controls, layers, media) {

            var t = this;


            if (controls.children().last().find('.mejs-currenttime').length > 0) {

                $(t.options.timeAndDurationSeparator +

                    '<span class="mejs-duration">' +

                    (t.options.duration > 0 ?

                        mejs.Utility.secondsToTimeCode(t.options.duration, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25) :

                        ((player.options.alwaysShowHours ? '00:' : '') + (player.options.showTimecodeFrameCount ? '00:00:00' : '00:00'))

                        ) +

                    '</span>')

                    .appendTo(controls.find('.mejs-time'));

            } else {



                // add class to current time

                controls.find('.mejs-currenttime').parent().addClass('mejs-currenttime-container');


                $('<div class="mejs-time mejs-duration-container">' +

                    '<span class="mejs-duration">' +

                    (t.options.duration > 0 ?

                        mejs.Utility.secondsToTimeCode(t.options.duration, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25) :

                        ((player.options.alwaysShowHours ? '00:' : '') + (player.options.showTimecodeFrameCount ? '00:00:00' : '00:00'))

                        ) +

                    '</span>' +

                    '</div>')

                    .appendTo(controls);

            }


            t.durationD = t.controls.find('.mejs-duration');


            media.addEventListener('timeupdate', function () {

                player.updateDuration();

            }, false);

        },


        updateCurrent:function () {

            var t = this;


            if (t.currenttime) {

                t.currenttime.html(mejs.Utility.secondsToTimeCode(t.media.currentTime, t.options.alwaysShowHours || t.media.duration > 3600, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25));

            }

        },


        updateDuration:function () {

            var t = this;


            if (t.media.duration && t.durationD) {

                t.durationD.html(mejs.Utility.secondsToTimeCode(t.media.duration, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond || 25));

            }

        }

    });


})(mejs.$);
(function ($) {

    $.extend(mejs.MepDefaults, {
        muteText:'Mute Toggle',
        hideVolumeOnTouchDevices:true,

        audioVolume:'horizontal',
        videoVolume:'vertical'
    });

    $.extend(MediaElementPlayer.prototype, {
        buildvolume:function (player, controls, layers, media) {

            // Android and iOS don't support volume controls
            if (mejs.MediaFeatures.hasTouch && this.options.hideVolumeOnTouchDevices)
                return;

            var t = this,
                mode = (t.isVideo) ? t.options.videoVolume : t.options.audioVolume,
                mute = (mode == 'horizontal') ?

                    // horizontal version
                    $('<div class="mejs-button mejs-volume-button mejs-mute">' +
                        '<button type="button" aria-controls="' + t.id + '" title="' + t.options.muteText + '"></button>' +
                        '</div>' +
                        '<div class="mejs-horizontal-volume-slider">' + // outer background
                        '<div class="mejs-horizontal-volume-total"></div>' + // line background
                        '<div class="mejs-horizontal-volume-current"></div>' + // current volume
                        '<div class="mejs-horizontal-volume-handle"></div>' + // handle
                        '</div>'
                    )
                        .appendTo(controls) :

                    // vertical version
                    $('<div class="mejs-button mejs-volume-button mejs-mute">' +
                        '<button type="button" aria-controls="' + t.id + '" title="' + t.options.muteText + '"></button>' +
                        '<div class="mejs-volume-slider">' + // outer background
                        '<div class="mejs-volume-total"></div>' + // line background
                        '<div class="mejs-volume-current"></div>' + // current volume
                        '<div class="mejs-volume-handle"></div>' + // handle
                        '</div>' +
                        '</div>')
                        .appendTo(controls),
                volumeSlider = t.container.find('.mejs-volume-slider, .mejs-horizontal-volume-slider'),
                volumeTotal = t.container.find('.mejs-volume-total, .mejs-horizontal-volume-total'),
                volumeCurrent = t.container.find('.mejs-volume-current, .mejs-horizontal-volume-current'),
                volumeHandle = t.container.find('.mejs-volume-handle, .mejs-horizontal-volume-handle'),

                positionVolumeHandle = function (volume, secondTry) {

                    if (!volumeSlider.is(':visible') && typeof secondTry != 'undefined') {
                        volumeSlider.show();
                        positionVolumeHandle(volume, true);
                        volumeSlider.hide()
                        return;
                    }

                    // correct to 0-1
                    volume = Math.max(0, volume);
                    volume = Math.min(volume, 1);

                    // ajust mute button style
                    if (volume == 0) {
                        mute.removeClass('mejs-mute').addClass('mejs-unmute');
                    } else {
                        mute.removeClass('mejs-unmute').addClass('mejs-mute');
                    }

                    // position slider 
                    if (mode == 'vertical') {
                        var

                        // height of the full size volume slider background
                            totalHeight = volumeTotal.height(),

                        // top/left of full size volume slider background
                            totalPosition = volumeTotal.position(),

                        // the new top position based on the current volume
                        // 70% volume on 100px height == top:30px
                            newTop = totalHeight - (totalHeight * volume);

                        // handle
                        volumeHandle.css('top', totalPosition.top + newTop - (volumeHandle.height() / 2));

                        // show the current visibility
                        volumeCurrent.height(totalHeight - newTop);
                        volumeCurrent.css('top', totalPosition.top + newTop);
                    } else {
                        var

                        // height of the full size volume slider background
                            totalWidth = volumeTotal.width(),

                        // top/left of full size volume slider background
                            totalPosition = volumeTotal.position(),

                        // the new left position based on the current volume
                            newLeft = totalWidth * volume;

                        // handle
                        volumeHandle.css('left', totalPosition.left + newLeft - (volumeHandle.width() / 2));

                        // rezize the current part of the volume bar
                        volumeCurrent.width(newLeft);
                    }
                },
                handleVolumeMove = function (e) {

                    var volume = null,
                        totalOffset = volumeTotal.offset();

                    // calculate the new volume based on the moust position
                    if (mode == 'vertical') {

                        var
                            railHeight = volumeTotal.height(),
                            totalTop = parseInt(volumeTotal.css('top').replace(/px/, ''), 10),
                            newY = e.pageY - totalOffset.top;

                        volume = (railHeight - newY) / railHeight;

                        // the controls just hide themselves (usually when mouse moves too far up)
                        if (totalOffset.top == 0 || totalOffset.left == 0)
                            return;

                    } else {
                        var
                            railWidth = volumeTotal.width(),
                            newX = e.pageX - totalOffset.left;

                        volume = newX / railWidth;
                    }

                    // ensure the volume isn't outside 0-1
                    volume = Math.max(0, volume);
                    volume = Math.min(volume, 1);

                    // position the slider and handle			
                    positionVolumeHandle(volume);

                    // set the media object (this will trigger the volumechanged event)
                    if (volume == 0) {
                        media.setMuted(true);
                    } else {
                        media.setMuted(false);
                    }
                    media.setVolume(volume);
                },
                mouseIsDown = false,
                mouseIsOver = false;

            // SLIDER

            mute
                .hover(function () {
                    volumeSlider.show();
                    mouseIsOver = true;
                }, function () {
                    mouseIsOver = false;

                    if (!mouseIsDown && mode == 'vertical') {
                        volumeSlider.hide();
                    }
                });

            volumeSlider
                .bind('mouseover', function () {
                    mouseIsOver = true;
                })
                .bind('mousedown', function (e) {
                    handleVolumeMove(e);
                    $(document)
                        .bind('mousemove.vol', function (e) {
                            handleVolumeMove(e);
                        })
                        .bind('mouseup.vol', function () {
                            mouseIsDown = false;
                            $(document).unbind('.vol');

                            if (!mouseIsOver && mode == 'vertical') {
                                volumeSlider.hide();
                            }
                        });
                    mouseIsDown = true;

                    return false;
                });


            // MUTE button
            mute.find('button').click(function () {
                media.setMuted(!media.muted);
            });

            // listen for volume change events from other sources
            media.addEventListener('volumechange', function (e) {
                if (!mouseIsDown) {
                    if (media.muted) {
                        positionVolumeHandle(0);
                        mute.removeClass('mejs-mute').addClass('mejs-unmute');
                    } else {
                        positionVolumeHandle(media.volume);
                        mute.removeClass('mejs-unmute').addClass('mejs-mute');
                    }
                }
            }, false);

            if (t.container.is(':visible')) {
                // set initial volume
                positionVolumeHandle(player.options.startVolume);

                // shim gets the startvolume as a parameter, but we have to set it on the native <video> and <audio> elements
                if (media.pluginType === 'native') {
                    media.setVolume(player.options.startVolume);
                }
            }
        }
    });

})(mejs.$);

(function ($) {


    $.extend(mejs.MepDefaults, {

        usePluginFullScreen:true,

        newWindowCallback:function () {
            return '';
        },

        fullscreenText:'Fullscreen'

    });


    $.extend(MediaElementPlayer.prototype, {



        isFullScreen:false,


        isNativeFullScreen:false,


        docStyleOverflow:null,


        isInIframe:false,


        buildfullscreen:function (player, controls, layers, media) {


            if (!player.isVideo)

                return;


            player.isInIframe = (window.location != window.parent.location);


            // native events

            if (mejs.MediaFeatures.hasTrueNativeFullScreen) {



                // chrome doesn't alays fire this in an iframe

                var target = null;


                if (mejs.MediaFeatures.hasMozNativeFullScreen) {

                    target = $(document);

                } else {

                    target = player.container;

                }


                target.bind(mejs.MediaFeatures.fullScreenEventName, function (e) {


                    if (mejs.MediaFeatures.isFullScreen()) {

                        player.isNativeFullScreen = true;

                        // reset the controls once we are fully in full screen

                        player.setControlsSize();

                    } else {

                        player.isNativeFullScreen = false;

                        // when a user presses ESC

                        // make sure to put the player back into place								

                        player.exitFullScreen();

                    }

                });

            }


            var t = this,

                normalHeight = 0,

                normalWidth = 0,

                container = player.container,

                fullscreenBtn =

                    $('<div class="mejs-button mejs-fullscreen-button">' +

                        '<button type="button" aria-controls="' + t.id + '" title="' + t.options.fullscreenText + '"></button>' +

                        '</div>')

                        .appendTo(controls);


            if (t.media.pluginType === 'native' || (!t.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox)) {


                fullscreenBtn.click(function () {

                    var isFullScreen = (mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen()) || player.isFullScreen;


                    if (isFullScreen) {

                        player.exitFullScreen();

                    } else {

                        player.enterFullScreen();

                    }

                });


            } else {


                var hideTimeout = null,

                    supportsPointerEvents = (function () {

                        // TAKEN FROM MODERNIZR

                        var element = document.createElement('x'),

                            documentElement = document.documentElement,

                            getComputedStyle = window.getComputedStyle,

                            supports;

                        if (!('pointerEvents' in element.style)) {

                            return false;

                        }

                        element.style.pointerEvents = 'auto';

                        element.style.pointerEvents = 'x';

                        documentElement.appendChild(element);

                        supports = getComputedStyle &&

                            getComputedStyle(element, '').pointerEvents === 'auto';

                        documentElement.removeChild(element);

                        return !!supports;

                    })();


                //console.log('supportsPointerEvents', supportsPointerEvents);


                if (supportsPointerEvents && !mejs.MediaFeatures.isOpera) { // opera doesn't allow this :(


                    // allows clicking through the fullscreen button and controls down directly to Flash


                    /*

                     When a user puts his mouse over the fullscreen button, the controls are disabled

                     So we put a div over the video and another one on iether side of the fullscreen button

                     that caputre mouse movement

                     and restore the controls once the mouse moves outside of the fullscreen button

                     */


                    var fullscreenIsDisabled = false,

                        restoreControls = function () {

                            if (fullscreenIsDisabled) {

                                // hide the hovers

                                videoHoverDiv.hide();

                                controlsLeftHoverDiv.hide();

                                controlsRightHoverDiv.hide();


                                // restore the control bar

                                fullscreenBtn.css('pointer-events', '');

                                t.controls.css('pointer-events', '');


                                // store for later

                                fullscreenIsDisabled = false;

                            }

                        },

                        videoHoverDiv = $('<div class="mejs-fullscreen-hover" />').appendTo(t.container).mouseover(restoreControls),

                        controlsLeftHoverDiv = $('<div class="mejs-fullscreen-hover"  />').appendTo(t.container).mouseover(restoreControls),

                        controlsRightHoverDiv = $('<div class="mejs-fullscreen-hover"  />').appendTo(t.container).mouseover(restoreControls),

                        positionHoverDivs = function () {

                            var style = {position:'absolute', top:0, left:0}; //, backgroundColor: '#f00'};

                            videoHoverDiv.css(style);

                            controlsLeftHoverDiv.css(style);

                            controlsRightHoverDiv.css(style);


                            // over video, but not controls

                            videoHoverDiv

                                .width(t.container.width())

                                .height(t.container.height() - t.controls.height());


                            // over controls, but not the fullscreen button

                            var fullScreenBtnOffset = fullscreenBtn.offset().left - t.container.offset().left;

                            fullScreenBtnWidth = fullscreenBtn.outerWidth(true);


                            controlsLeftHoverDiv

                                .width(fullScreenBtnOffset)

                                .height(t.controls.height())

                                .css({top:t.container.height() - t.controls.height()});


                            // after the fullscreen button

                            controlsRightHoverDiv

                                .width(t.container.width() - fullScreenBtnOffset - fullScreenBtnWidth)

                                .height(t.controls.height())

                                .css({top:t.container.height() - t.controls.height(),

                                    left:fullScreenBtnOffset + fullScreenBtnWidth});

                        };


                    $(document).resize(function () {

                        positionHoverDivs();

                    });


                    // on hover, kill the fullscreen button's HTML handling, allowing clicks down to Flash

                    fullscreenBtn

                        .mouseover(function () {


                            if (!t.isFullScreen) {


                                var buttonPos = fullscreenBtn.offset(),

                                    containerPos = player.container.offset();


                                // move the button in Flash into place

                                media.positionFullscreenButton(buttonPos.left - containerPos.left, buttonPos.top - containerPos.top, false);


                                // allows click through

                                fullscreenBtn.css('pointer-events', 'none');

                                t.controls.css('pointer-events', 'none');


                                // show the divs that will restore things

                                videoHoverDiv.show();

                                controlsRightHoverDiv.show();

                                controlsLeftHoverDiv.show();

                                positionHoverDivs();


                                fullscreenIsDisabled = true;

                            }


                        });


                    // restore controls anytime the user enters or leaves fullscreen	

                    media.addEventListener('fullscreenchange', function (e) {

                        restoreControls();

                    });


                    // the mouseout event doesn't work on the fullscren button, because we already killed the pointer-events

                    // so we use the document.mousemove event to restore controls when the mouse moves outside the fullscreen button 

                    /*

                     $(document).mousemove(function(e) {



                     // if the mouse is anywhere but the fullsceen button, then restore it all

                     if (fullscreenIsDisabled) {



                     var fullscreenBtnPos = fullscreenBtn.offset();





                     if (e.pageY < fullscreenBtnPos.top || e.pageY > fullscreenBtnPos.top + fullscreenBtn.outerHeight(true) ||

                     e.pageX < fullscreenBtnPos.left || e.pageX > fullscreenBtnPos.left + fullscreenBtn.outerWidth(true)

                     ) {



                     fullscreenBtn.css('pointer-events', '');

                     t.controls.css('pointer-events', '');



                     fullscreenIsDisabled = false;

                     }

                     }

                     });

                     */


                } else {



                    // the hover state will show the fullscreen button in Flash to hover up and click


                    fullscreenBtn

                        .mouseover(function () {


                            if (hideTimeout !== null) {

                                clearTimeout(hideTimeout);

                                delete hideTimeout;

                            }


                            var buttonPos = fullscreenBtn.offset(),

                                containerPos = player.container.offset();


                            media.positionFullscreenButton(buttonPos.left - containerPos.left, buttonPos.top - containerPos.top, true);


                        })

                        .mouseout(function () {


                            if (hideTimeout !== null) {

                                clearTimeout(hideTimeout);

                                delete hideTimeout;

                            }


                            hideTimeout = setTimeout(function () {

                                media.hideFullscreenButton();

                            }, 1500);


                        });

                }

            }


            player.fullscreenBtn = fullscreenBtn;


            $(document).bind('keydown', function (e) {

                if (((mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen()) || t.isFullScreen) && e.keyCode == 27) {

                    player.exitFullScreen();

                }

            });


        },

        enterFullScreen:function () {


            var t = this;


            // firefox+flash can't adjust plugin sizes without resetting :(

            if (t.media.pluginType !== 'native' && (mejs.MediaFeatures.isFirefox || t.options.usePluginFullScreen)) {

                //t.media.setFullscreen(true);

                //player.isFullScreen = true;

                return;

            }


            // store overflow 

            docStyleOverflow = document.documentElement.style.overflow;

            // set it to not show scroll bars so 100% will work

            document.documentElement.style.overflow = 'hidden';


            // store sizing

            normalHeight = t.container.height();

            normalWidth = t.container.width();


            // attempt to do true fullscreen (Safari 5.1 and Firefox Nightly only for now)

            if (t.media.pluginType === 'native') {

                if (mejs.MediaFeatures.hasTrueNativeFullScreen) {


                    mejs.MediaFeatures.requestFullScreen(t.container[0]);

                    //return;


                    if (t.isInIframe) {

                        // sometimes exiting from fullscreen doesn't work

                        // notably in Chrome <iframe>. Fixed in version 17

                        setTimeout(function checkFullscreen() {


                            if (t.isNativeFullScreen) {



                                // check if the video is suddenly not really fullscreen

                                if ($(window).width() !== screen.width) {

                                    // manually exit

                                    t.exitFullScreen();

                                } else {

                                    // test again

                                    setTimeout(checkFullscreen, 500);

                                }

                            }


                        }, 500);

                    }


                } else if (mejs.MediaFeatures.hasSemiNativeFullScreen) {

                    t.media.webkitEnterFullscreen();

                    return;

                }

            }


            // check for iframe launch

            if (t.isInIframe) {

                var url = t.options.newWindowCallback(this);


                if (url !== '') {



                    // launch immediately

                    if (!mejs.MediaFeatures.hasTrueNativeFullScreen) {

                        t.pause();

                        window.open(url, t.id, 'top=0,left=0,width=' + screen.availWidth + ',height=' + screen.availHeight + ',resizable=yes,scrollbars=no,status=no,toolbar=no');

                        return;

                    } else {

                        setTimeout(function () {

                            if (!t.isNativeFullScreen) {

                                t.pause();

                                window.open(url, t.id, 'top=0,left=0,width=' + screen.availWidth + ',height=' + screen.availHeight + ',resizable=yes,scrollbars=no,status=no,toolbar=no');

                            }

                        }, 250);

                    }

                }


            }


            // full window code


            // make full size

            t.container

                .addClass('mejs-container-fullscreen')

                .width('100%')

                .height('100%');

            //.css({position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', width: '100%', height: '100%', 'z-index': 1000});				


            // Only needed for safari 5.1 native full screen, can cause display issues elsewhere

            // Actually, it seems to be needed for IE8, too

            //if (mejs.MediaFeatures.hasTrueNativeFullScreen) {

            setTimeout(function () {

                t.container.css({width:'100%', height:'100%'});

                t.setControlsSize();

            }, 500);

            //}


            if (t.pluginType === 'native') {

                t.$media

                    .width('100%')

                    .height('100%');

            } else {

                t.container.find('object, embed, iframe')

                    .width('100%')

                    .height('100%');


                //if (!mejs.MediaFeatures.hasTrueNativeFullScreen) {

                t.media.setVideoSize($(window).width(), $(window).height());

                //}

            }


            t.layers.children('div')

                .width('100%')

                .height('100%');


            if (t.fullscreenBtn) {

                t.fullscreenBtn

                    .removeClass('mejs-fullscreen')

                    .addClass('mejs-unfullscreen');

            }


            t.setControlsSize();

            t.isFullScreen = true;

        },


        exitFullScreen:function () {


            var t = this;


            // firefox can't adjust plugins

            if (t.media.pluginType !== 'native' && mejs.MediaFeatures.isFirefox) {

                t.media.setFullscreen(false);

                //player.isFullScreen = false;

                return;

            }


            // come outo of native fullscreen

            if (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || t.isFullScreen)) {

                mejs.MediaFeatures.cancelFullScreen();

            }


            // restore scroll bars to document

            document.documentElement.style.overflow = docStyleOverflow;


            t.container

                .removeClass('mejs-container-fullscreen')

                .width(normalWidth)

                .height(normalHeight);

            //.css({position: '', left: '', top: '', right: '', bottom: '', overflow: 'inherit', width: normalWidth + 'px', height: normalHeight + 'px', 'z-index': 1});


            if (t.pluginType === 'native') {

                t.$media

                    .width(normalWidth)

                    .height(normalHeight);

            } else {

                t.container.find('object embed')

                    .width(normalWidth)

                    .height(normalHeight);


                t.media.setVideoSize(normalWidth, normalHeight);

            }


            t.layers.children('div')

                .width(normalWidth)

                .height(normalHeight);


            t.fullscreenBtn

                .removeClass('mejs-unfullscreen')

                .addClass('mejs-fullscreen');


            t.setControlsSize();

            t.isFullScreen = false;

        }

    });


})(mejs.$);


(function ($) {

    // add extra default options 
    $.extend(mejs.MepDefaults, {
        // this will automatically turn on a <track>
        startLanguage:'',

        tracksText:'Captions/Subtitles'
    });

    $.extend(MediaElementPlayer.prototype, {

        hasChapters:false,

        buildtracks:function (player, controls, layers, media) {
            if (!player.isVideo)
                return;

            if (player.tracks.length == 0)
                return;

            var t = this, i, options = '';

            player.chapters =
                $('<div class="mejs-chapters mejs-layer"></div>')
                    .prependTo(layers).hide();
            player.captions =
                $('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position"><span class="mejs-captions-text"></span></div></div>')
                    .prependTo(layers).hide();
            player.captionsText = player.captions.find('.mejs-captions-text');
            player.captionsButton =
                $('<div class="mejs-button mejs-captions-button">' +
                    '<button type="button" aria-controls="' + t.id + '" title="' + t.options.tracksText + '"></button>' +
                    '<div class="mejs-captions-selector">' +
                    '<ul>' +
                    '<li>' +
                    '<input type="radio" name="' + player.id + '_captions" id="' + player.id + '_captions_none" value="none" checked="checked" />' +
                    '<label for="' + player.id + '_captions_none">None</label>' +
                    '</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>')
                    .appendTo(controls)

                    // hover
                    .hover(function () {
                        $(this).find('.mejs-captions-selector').css('visibility', 'visible');
                    }, function () {
                        $(this).find('.mejs-captions-selector').css('visibility', 'hidden');
                    })

                    // handle clicks to the language radio buttons
                    .delegate('input[type=radio]', 'click', function () {
                        lang = this.value;

                        if (lang == 'none') {
                            player.selectedTrack = null;
                        } else {
                            for (i = 0; i < player.tracks.length; i++) {
                                if (player.tracks[i].srclang == lang) {
                                    player.selectedTrack = player.tracks[i];
                                    player.captions.attr('lang', player.selectedTrack.srclang);
                                    player.displayCaptions();
                                    break;
                                }
                            }
                        }
                    });
            //.bind('mouseenter', function() {
            //	player.captionsButton.find('.mejs-captions-selector').css('visibility','visible')
            //});

            if (!player.options.alwaysShowControls) {
                // move with controls
                player.container
                    .bind('mouseenter', function () {
                        // push captions above controls
                        player.container.find('.mejs-captions-position').addClass('mejs-captions-position-hover');

                    })
                    .bind('mouseleave', function () {
                        if (!media.paused) {
                            // move back to normal place
                            player.container.find('.mejs-captions-position').removeClass('mejs-captions-position-hover');
                        }
                    });
            } else {
                player.container.find('.mejs-captions-position').addClass('mejs-captions-position-hover');
            }

            player.trackToLoad = -1;
            player.selectedTrack = null;
            player.isLoadingTrack = false;


            // add to list
            for (i = 0; i < player.tracks.length; i++) {
                if (player.tracks[i].kind == 'subtitles') {
                    player.addTrackButton(player.tracks[i].srclang, player.tracks[i].label);
                }
            }

            player.loadNextTrack();


            media.addEventListener('timeupdate', function (e) {
                player.displayCaptions();
            }, false);

            media.addEventListener('loadedmetadata', function (e) {
                player.displayChapters();
            }, false);

            player.container.hover(
                function () {
                    // chapters
                    if (player.hasChapters) {
                        player.chapters.css('visibility', 'visible');
                        player.chapters.fadeIn(200).height(player.chapters.find('.mejs-chapter').outerHeight());
                    }
                },
                function () {
                    if (player.hasChapters && !media.paused) {
                        player.chapters.fadeOut(200, function () {
                            $(this).css('visibility', 'hidden');
                            $(this).css('display', 'block');
                        });
                    }
                });

            // check for autoplay
            if (player.node.getAttribute('autoplay') !== null) {
                player.chapters.css('visibility', 'hidden');
            }
        },

        loadNextTrack:function () {
            var t = this;

            t.trackToLoad++;
            if (t.trackToLoad < t.tracks.length) {
                t.isLoadingTrack = true;
                t.loadTrack(t.trackToLoad);
            } else {
                // add done?
                t.isLoadingTrack = false;
            }
        },

        loadTrack:function (index) {
            var
                t = this,
                track = t.tracks[index],
                after = function () {

                    track.isLoaded = true;

                    // create button
                    //t.addTrackButton(track.srclang);
                    t.enableTrackButton(track.srclang, track.label);

                    t.loadNextTrack();

                };

            if (track.isTranslation) {

                // translate the first track
                mejs.TrackFormatParser.translateTrackText(t.tracks[0].entries, t.tracks[0].srclang, track.srclang, t.options.googleApiKey, function (newOne) {

                    // store the new translation
                    track.entries = newOne;

                    after();
                });

            } else {
                $.ajax({
                    url:track.src,
                    success:function (d) {

                        // parse the loaded file
                        track.entries = mejs.TrackFormatParser.parse(d);
                        after();

                        if (track.kind == 'chapters' && t.media.duration > 0) {
                            t.drawChapters(track);
                        }
                    },
                    error:function () {
                        t.loadNextTrack();
                    }
                });
            }
        },

        enableTrackButton:function (lang, label) {
            var t = this;

            if (label === '') {
                label = mejs.language.codes[lang] || lang;
            }

            t.captionsButton
                .find('input[value=' + lang + ']')
                .prop('disabled', false)
                .siblings('label')
                .html(label);

            // auto select
            if (t.options.startLanguage == lang) {
                $('#' + t.id + '_captions_' + lang).click();
            }

            t.adjustLanguageBox();
        },

        addTrackButton:function (lang, label) {
            var t = this;
            if (label === '') {
                label = mejs.language.codes[lang] || lang;
            }

            t.captionsButton.find('ul').append(
                $('<li>' +
                    '<input type="radio" name="' + t.id + '_captions" id="' + t.id + '_captions_' + lang + '" value="' + lang + '" disabled="disabled" />' +
                    '<label for="' + t.id + '_captions_' + lang + '">' + label + ' (loading)' + '</label>' +
                    '</li>')
            );

            t.adjustLanguageBox();

            // remove this from the dropdownlist (if it exists)
            t.container.find('.mejs-captions-translations option[value=' + lang + ']').remove();
        },

        adjustLanguageBox:function () {
            var t = this;
            // adjust the size of the outer box
            t.captionsButton.find('.mejs-captions-selector').height(
                t.captionsButton.find('.mejs-captions-selector ul').outerHeight(true) +
                    t.captionsButton.find('.mejs-captions-translations').outerHeight(true)
            );
        },

        displayCaptions:function () {

            if (typeof this.tracks == 'undefined')
                return;

            var
                t = this,
                i,
                track = t.selectedTrack;

            if (track != null && track.isLoaded) {
                for (i = 0; i < track.entries.times.length; i++) {
                    if (t.media.currentTime >= track.entries.times[i].start && t.media.currentTime <= track.entries.times[i].stop) {
                        t.captionsText.html(track.entries.text[i]);
                        t.captions.show().height(0);
                        return; // exit out if one is visible;
                    }
                }
                t.captions.hide();
            } else {
                t.captions.hide();
            }
        },

        displayChapters:function () {
            var
                t = this,
                i;

            for (i = 0; i < t.tracks.length; i++) {
                if (t.tracks[i].kind == 'chapters' && t.tracks[i].isLoaded) {
                    t.drawChapters(t.tracks[i]);
                    t.hasChapters = true;
                    break;
                }
            }
        },

        drawChapters:function (chapters) {
            var
                t = this,
                i,
                dur,
            //width,
            //left,
                percent = 0,
                usedPercent = 0;

            t.chapters.empty();

            for (i = 0; i < chapters.entries.times.length; i++) {
                dur = chapters.entries.times[i].stop - chapters.entries.times[i].start;
                percent = Math.floor(dur / t.media.duration * 100);
                if (percent + usedPercent > 100 || // too large
                    i == chapters.entries.times.length - 1 && percent + usedPercent < 100) // not going to fill it in
                {
                    percent = 100 - usedPercent;
                }
                //width = Math.floor(t.width * dur / t.media.duration);
                //left = Math.floor(t.width * chapters.entries.times[i].start / t.media.duration);
                //if (left + width > t.width) {
                //	width = t.width - left;
                //}

                t.chapters.append($(
                    '<div class="mejs-chapter" rel="' + chapters.entries.times[i].start + '" style="left: ' + usedPercent.toString() + '%;width: ' + percent.toString() + '%;">' +
                        '<div class="mejs-chapter-block' + ((i == chapters.entries.times.length - 1) ? ' mejs-chapter-block-last' : '') + '">' +
                        '<span class="ch-title">' + chapters.entries.text[i] + '</span>' +
                        '<span class="ch-time">' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].start) + '&ndash;' + mejs.Utility.secondsToTimeCode(chapters.entries.times[i].stop) + '</span>' +
                        '</div>' +
                        '</div>'));
                usedPercent += percent;
            }

            t.chapters.find('div.mejs-chapter').click(function () {
                t.media.setCurrentTime(parseFloat($(this).attr('rel')));
                if (t.media.paused) {
                    t.media.play();
                }
            });

            t.chapters.show();
        }
    });


    mejs.language = {
        codes:{
            af:'Afrikaans',
            sq:'Albanian',
            ar:'Arabic',
            be:'Belarusian',
            bg:'Bulgarian',
            ca:'Catalan',
            zh:'Chinese',
            'zh-cn':'Chinese Simplified',
            'zh-tw':'Chinese Traditional',
            hr:'Croatian',
            cs:'Czech',
            da:'Danish',
            nl:'Dutch',
            en:'English',
            et:'Estonian',
            tl:'Filipino',
            fi:'Finnish',
            fr:'French',
            gl:'Galician',
            de:'German',
            el:'Greek',
            ht:'Haitian Creole',
            iw:'Hebrew',
            hi:'Hindi',
            hu:'Hungarian',
            is:'Icelandic',
            id:'Indonesian',
            ga:'Irish',
            it:'Italian',
            ja:'Japanese',
            ko:'Korean',
            lv:'Latvian',
            lt:'Lithuanian',
            mk:'Macedonian',
            ms:'Malay',
            mt:'Maltese',
            no:'Norwegian',
            fa:'Persian',
            pl:'Polish',
            pt:'Portuguese',
            //'pt-pt':'Portuguese (Portugal)',
            ro:'Romanian',
            ru:'Russian',
            sr:'Serbian',
            sk:'Slovak',
            sl:'Slovenian',
            es:'Spanish',
            sw:'Swahili',
            sv:'Swedish',
            tl:'Tagalog',
            th:'Thai',
            tr:'Turkish',
            uk:'Ukrainian',
            vi:'Vietnamese',
            cy:'Welsh',
            yi:'Yiddish'
        }
    };

    /*
     Parses WebVVT format which should be formatted as
     ================================
     WEBVTT

     1
     00:00:01,1 --> 00:00:05,000
     A line of text

     2
     00:01:15,1 --> 00:02:05,000
     A second line of text

     ===============================

     Adapted from: http://www.delphiki.com/html5/playr
     */
    mejs.TrackFormatParser = {
        // match start "chapter-" (or anythingelse)
        pattern_identifier:/^([a-zA-z]+-)?[0-9]+$/,
        pattern_timecode:/^([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,

        split2:function (text, regex) {
            // normal version for compliant browsers
            // see below for IE fix
            return text.split(regex);
        },
        parse:function (trackText) {
            var
                i = 0,
                lines = this.split2(trackText, /\r?\n/),
                entries = {text:[], times:[]},
                timecode,
                text;

            for (; i < lines.length; i++) {
                // check for the line number
                if (this.pattern_identifier.exec(lines[i])) {
                    // skip to the next line where the start --> end time code should be
                    i++;
                    timecode = this.pattern_timecode.exec(lines[i]);

                    if (timecode && i < lines.length) {
                        i++;
                        // grab all the (possibly multi-line) text that follows
                        text = lines[i];
                        i++;
                        while (lines[i] !== '' && i < lines.length) {
                            text = text + '\n' + lines[i];
                            i++;
                        }

                        // Text is in a different array so I can use .join
                        entries.text.push(text);
                        entries.times.push(
                            {
                                start:mejs.Utility.timeCodeToSeconds(timecode[1]),
                                stop:mejs.Utility.timeCodeToSeconds(timecode[3]),
                                settings:timecode[5]
                            });
                    }
                }
            }

            return entries;
        }
    };

    // test for browsers with bad String.split method.
    if ('x\n\ny'.split(/\n/gi).length != 3) {
        // add super slow IE8 and below version
        mejs.TrackFormatParser.split2 = function (text, regex) {
            var
                parts = [],
                chunk = '',
                i;

            for (i = 0; i < text.length; i++) {
                chunk += text.substring(i, i + 1);
                if (regex.test(chunk)) {
                    parts.push(chunk.replace(regex, ''));
                    chunk = '';
                }
            }
            parts.push(chunk);
            return parts;
        }
    }

})(mejs.$);

/*

 * ContextMenu Plugin

 * 

 *

 */


(function ($) {


    $.extend(mejs.MepDefaults,

        { 'contextMenuItems':[

            // demo of a fullscreen option

            {

                render:function (player) {



                    // check for fullscreen plugin

                    if (typeof player.enterFullScreen == 'undefined')

                        return null;


                    if (player.isFullScreen) {

                        return "Turn off Fullscreen";

                    } else {

                        return "Go Fullscreen";

                    }

                },

                click:function (player) {

                    if (player.isFullScreen) {

                        player.exitFullScreen();

                    } else {

                        player.enterFullScreen();

                    }

                }

            }

            ,

            // demo of a mute/unmute button

            {

                render:function (player) {

                    if (player.media.muted) {

                        return "Unmute";

                    } else {

                        return "Mute";

                    }

                },

                click:function (player) {

                    if (player.media.muted) {

                        player.setMuted(false);

                    } else {

                        player.setMuted(true);

                    }

                }

            },

            // separator

            {

                isSeparator:true

            }

            ,

            // demo of simple download video

            {

                render:function (player) {

                    return "Download Video";

                },

                click:function (player) {

                    window.location.href = player.media.currentSrc;

                }

            }

        ]}

    );


    $.extend(MediaElementPlayer.prototype, {

        buildcontextmenu:function (player, controls, layers, media) {



            // create context menu

            player.contextMenu = $('<div class="mejs-contextmenu"></div>')

                .appendTo($('body'))

                .hide();


            // create events for showing context menu

            player.container.bind('contextmenu', function (e) {

                if (player.isContextMenuEnabled) {

                    e.preventDefault();

                    player.renderContextMenu(e.clientX - 1, e.clientY - 1);

                    return false;

                }

            });

            player.container.bind('click', function () {

                player.contextMenu.hide();

            });

            player.contextMenu.bind('mouseleave', function () {



                //console.log('context hover out');

                player.startContextMenuTimer();


            });

        },


        isContextMenuEnabled:true,

        enableContextMenu:function () {

            this.isContextMenuEnabled = true;

        },

        disableContextMenu:function () {

            this.isContextMenuEnabled = false;

        },


        contextMenuTimeout:null,

        startContextMenuTimer:function () {

            //console.log('startContextMenuTimer');


            var t = this;


            t.killContextMenuTimer();


            t.contextMenuTimer = setTimeout(function () {

                t.hideContextMenu();

                t.killContextMenuTimer();

            }, 750);

        },

        killContextMenuTimer:function () {

            var timer = this.contextMenuTimer;


            //console.log('killContextMenuTimer', timer);


            if (timer != null) {

                clearTimeout(timer);

                delete timer;

                timer = null;

            }

        },


        hideContextMenu:function () {

            this.contextMenu.hide();

        },


        renderContextMenu:function (x, y) {



            // alway re-render the items so that things like "turn fullscreen on" and "turn fullscreen off" are always written correctly

            var t = this,

                html = '',

                items = t.options.contextMenuItems;


            for (var i = 0, il = items.length; i < il; i++) {


                if (items[i].isSeparator) {

                    html += '<div class="mejs-contextmenu-separator"></div>';

                } else {


                    var rendered = items[i].render(t);


                    // render can return null if the item doesn't need to be used at the moment

                    if (rendered != null) {

                        html += '<div class="mejs-contextmenu-item" data-itemindex="' + i + '" id="element-' + (Math.random() * 1000000) + '">' + rendered + '</div>';

                    }

                }

            }


            // position and show the context menu

            t.contextMenu

                .empty()

                .append($(html))

                .css({top:y, left:x})

                .show();


            // bind events

            t.contextMenu.find('.mejs-contextmenu-item').each(function () {



                // which one is this?

                var $dom = $(this),

                    itemIndex = parseInt($dom.data('itemindex'), 10),

                    item = t.options.contextMenuItems[itemIndex];


                // bind extra functionality?

                if (typeof item.show != 'undefined')

                    item.show($dom, t);


                // bind click action

                $dom.click(function () {

                    // perform click action

                    if (typeof item.click != 'undefined')

                        item.click(t);


                    // close

                    t.contextMenu.hide();

                });

            });


            // stop the controls from hiding

            setTimeout(function () {

                t.killControlsTimer('rev3');

            }, 100);


        }

    });


})(mejs.$);


/*!
 * iScroll v4.1.9 ~ Copyright (c) 2011 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
(function () {
    var m = Math,
        mround = function (r) {
            return r >> 0;
        },
        vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
            (/firefox/i).test(navigator.userAgent) ? 'Moz' :
                'opera' in window ? 'O' : '',

    // Browser capabilities
        isAndroid = (/android/gi).test(navigator.appVersion),
        isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
        isPlaybook = (/playbook/gi).test(navigator.appVersion),
        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),

        has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
        hasTouch = 'ontouchstart' in window && !isTouchPad,
        hasTransform = vendor + 'Transform' in document.documentElement.style,
        hasTransitionEnd = isIDevice || isPlaybook,

        nextFrame = (function () {
            return window.requestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.mozRequestAnimationFrame
                || window.oRequestAnimationFrame
                || window.msRequestAnimationFrame
                || function (callback) {
                return setTimeout(callback, 1);
            }
        })(),
        cancelFrame = (function () {
            return window.cancelRequestAnimationFrame
                || window.webkitCancelAnimationFrame
                || window.webkitCancelRequestAnimationFrame
                || window.mozCancelRequestAnimationFrame
                || window.oCancelRequestAnimationFrame
                || window.msCancelRequestAnimationFrame
                || clearTimeout
        })(),

    // Events
        RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
        START_EV = hasTouch ? 'touchstart' : 'mousedown',
        MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
        END_EV = hasTouch ? 'touchend' : 'mouseup',
        CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
        WHEEL_EV = vendor == 'Moz' ? 'DOMMouseScroll' : 'mousewheel',

    // Helpers
        trnOpen = 'translate' + (has3d ? '3d(' : '('),
        trnClose = has3d ? ',0)' : ')',

    // Constructor
        iScroll = function (el, options) {
            var that = this,
                doc = document,
                i;

            that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
            that.wrapper.style.overflow = 'hidden';
            that.scroller = that.wrapper.children[0];

            // Default options
            that.options = {
                hScroll:true,
                vScroll:true,
                x:0,
                y:0,
                bounce:true,
                bounceLock:false,
                momentum:true,
                lockDirection:true,
                useTransform:true,
                useTransition:false,
                topOffset:0,
                checkDOMChanges:false, // Experimental

                // Scrollbar
                hScrollbar:true,
                vScrollbar:true,
                fixedScrollbar:isAndroid,
                hideScrollbar:isIDevice,
                fadeScrollbar:isIDevice && has3d,
                scrollbarClass:'',

                // Zoom
                zoom:false,
                zoomMin:1,
                zoomMax:4,
                doubleTapZoom:2,
                wheelAction:'scroll',

                // Snap
                snap:false,
                snapThreshold:1,

                // Events
                onRefresh:null,
                onBeforeScrollStart:function (e) {
                    e.preventDefault();
                },
                onScrollStart:null,
                onBeforeScrollMove:null,
                onScrollMove:null,
                onBeforeScrollEnd:null,
                onScrollEnd:null,
                onTouchEnd:null,
                onDestroy:null,
                onZoomStart:null,
                onZoom:null,
                onZoomEnd:null
            };

            // User defined options
            for (i in options) that.options[i] = options[i];

            // Set starting position
            that.x = that.options.x;
            that.y = that.options.y;

            // Normalize options
            that.options.useTransform = hasTransform ? that.options.useTransform : false;
            that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
            that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
            that.options.zoom = that.options.useTransform && that.options.zoom;
            that.options.useTransition = hasTransitionEnd && that.options.useTransition;

            // Helpers FIX ANDROID BUG!
            // translate3d and scale doesn't work together! 
            // Ignoring 3d ONLY WHEN YOU SET that.options.zoom
            if (that.options.zoom && isAndroid) {
                trnOpen = 'translate(';
                trnClose = ')';
            }

            // Set some default styles
            that.scroller.style[vendor + 'TransitionProperty'] = that.options.useTransform ? '-' + vendor.toLowerCase() + '-transform' : 'top left';
            that.scroller.style[vendor + 'TransitionDuration'] = '0';
            that.scroller.style[vendor + 'TransformOrigin'] = '0 0';
            if (that.options.useTransition) that.scroller.style[vendor + 'TransitionTimingFunction'] = 'cubic-bezier(0.33,0.66,0.66,1)';

            if (that.options.useTransform) that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose;
            else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';

            if (that.options.useTransition) that.options.fixedScrollbar = true;

            that.refresh();

            that._bind(RESIZE_EV, window);
            that._bind(START_EV);
            if (!hasTouch) {
                that._bind('mouseout', that.wrapper);
                if (that.options.wheelAction != 'none')
                    that._bind(WHEEL_EV);
            }

            if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {
                that._checkDOMChanges();
            }, 500);
        };

// Prototype
    iScroll.prototype = {
        enabled:true,
        x:0,
        y:0,
        steps:[],
        scale:1,
        currPageX:0, currPageY:0,
        pagesX:[], pagesY:[],
        aniTime:null,
        wheelZoomCount:0,

        handleEvent:function (e) {
            var that = this;
            switch (e.type) {
                case START_EV:
                    if (!hasTouch && e.button !== 0) return;
                    that._start(e);
                    break;
                case MOVE_EV:
                    that._move(e);
                    break;
                case END_EV:
                case CANCEL_EV:
                    that._end(e);
                    break;
                case RESIZE_EV:
                    that._resize();
                    break;
                case WHEEL_EV:
                    that._wheel(e);
                    break;
                case 'mouseout':
                    that._mouseout(e);
                    break;
                case 'webkitTransitionEnd':
                    that._transitionEnd(e);
                    break;
            }
        },

        _checkDOMChanges:function () {
            if (this.moved || this.zoomed || this.animating ||
                (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) return;

            this.refresh();
        },

        _scrollbar:function (dir) {
            var that = this,
                doc = document,
                bar;

            if (!that[dir + 'Scrollbar']) {
                if (that[dir + 'ScrollbarWrapper']) {
                    if (hasTransform) that[dir + 'ScrollbarIndicator'].style[vendor + 'Transform'] = '';
                    that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
                    that[dir + 'ScrollbarWrapper'] = null;
                    that[dir + 'ScrollbarIndicator'] = null;
                }

                return;
            }

            if (!that[dir + 'ScrollbarWrapper']) {
                // Create the scrollbar wrapper
                bar = doc.createElement('div');

                if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase();
                else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');

                bar.style.cssText += ';pointer-events:none;-' + vendor + '-transition-property:opacity;-' + vendor + '-transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');

                that.wrapper.appendChild(bar);
                that[dir + 'ScrollbarWrapper'] = bar;

                // Create the scrollbar indicator
                bar = doc.createElement('div');
                if (!that.options.scrollbarClass) {
                    bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-' + vendor + '-background-clip:padding-box;-' + vendor + '-box-sizing:border-box;' + (dir == 'h' ? 'height:100%' : 'width:100%') + ';-' + vendor + '-border-radius:3px;border-radius:3px';
                }
                bar.style.cssText += ';pointer-events:none;-' + vendor + '-transition-property:-' + vendor + '-transform;-' + vendor + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-' + vendor + '-transition-duration:0;-' + vendor + '-transform:' + trnOpen + '0,0' + trnClose;
                if (that.options.useTransition) bar.style.cssText += ';-' + vendor + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';

                that[dir + 'ScrollbarWrapper'].appendChild(bar);
                that[dir + 'ScrollbarIndicator'] = bar;
            }

            if (dir == 'h') {
                that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
                that.hScrollbarIndicatorSize = m.max(mround(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
                that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
                that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
                that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
            } else {
                that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
                that.vScrollbarIndicatorSize = m.max(mround(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
                that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
                that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
                that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
            }

            // Reset position
            that._scrollbarPos(dir, true);
        },

        _resize:function () {
            var that = this;
            setTimeout(function () {
                that.refresh();
            }, isAndroid ? 200 : 0);
        },

        _pos:function (x, y) {
            x = this.hScroll ? x : 0;
            y = this.vScroll ? y : 0;

            if (this.options.useTransform) {
                this.scroller.style[vendor + 'Transform'] = trnOpen + x + 'px,' + y + 'px' + trnClose + ' scale(' + this.scale + ')';
            } else {
                x = mround(x);
                y = mround(y);
                this.scroller.style.left = x + 'px';
                this.scroller.style.top = y + 'px';
            }

            this.x = x;
            this.y = y;

            this._scrollbarPos('h');
            this._scrollbarPos('v');
        },

        _scrollbarPos:function (dir, hidden) {
            var that = this,
                pos = dir == 'h' ? that.x : that.y,
                size;

            if (!that[dir + 'Scrollbar']) return;

            pos = that[dir + 'ScrollbarProp'] * pos;

            if (pos < 0) {
                if (!that.options.fixedScrollbar) {
                    size = that[dir + 'ScrollbarIndicatorSize'] + mround(pos * 3);
                    if (size < 8) size = 8;
                    that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
                }
                pos = 0;
            } else if (pos > that[dir + 'ScrollbarMaxScroll']) {
                if (!that.options.fixedScrollbar) {
                    size = that[dir + 'ScrollbarIndicatorSize'] - mround((pos - that[dir + 'ScrollbarMaxScroll']) * 3);
                    if (size < 8) size = 8;
                    that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
                    pos = that[dir + 'ScrollbarMaxScroll'] + (that[dir + 'ScrollbarIndicatorSize'] - size);
                } else {
                    pos = that[dir + 'ScrollbarMaxScroll'];
                }
            }

            that[dir + 'ScrollbarWrapper'].style[vendor + 'TransitionDelay'] = '0';
            that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
            that[dir + 'ScrollbarIndicator'].style[vendor + 'Transform'] = trnOpen + (dir == 'h' ? pos + 'px,0' : '0,' + pos + 'px') + trnClose;
        },

        _start:function (e) {
            var that = this,
                point = hasTouch ? e.touches[0] : e,
                matrix, x, y,
                c1, c2;

            if (!that.enabled) return;

            if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);

            if (that.options.useTransition || that.options.zoom) that._transitionTime(0);

            that.moved = false;
            that.animating = false;
            that.zoomed = false;
            that.distX = 0;
            that.distY = 0;
            that.absDistX = 0;
            that.absDistY = 0;
            that.dirX = 0;
            that.dirY = 0;

            // Gesture start
            if (that.options.zoom && hasTouch && e.touches.length > 1) {
                c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
                c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
                that.touchesDistStart = m.sqrt(c1 * c1 + c2 * c2);

                that.originX = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 - that.x;
                that.originY = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop * 2) / 2 - that.y;

                if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
            }

            if (that.options.momentum) {
                if (that.options.useTransform) {
                    // Very lame general purpose alternative to CSSMatrix
                    matrix = getComputedStyle(that.scroller, null)[vendor + 'Transform'].replace(/[^0-9-.,]/g, '').split(',');
                    x = matrix[4] * 1;
                    y = matrix[5] * 1;
                } else {
                    x = getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '') * 1;
                    y = getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '') * 1;
                }

                if (x != that.x || y != that.y) {
                    if (that.options.useTransition) that._unbind('webkitTransitionEnd');
                    else cancelFrame(that.aniTime);
                    that.steps = [];
                    that._pos(x, y);
                }
            }

            that.absStartX = that.x;	// Needed by snap threshold
            that.absStartY = that.y;

            that.startX = that.x;
            that.startY = that.y;
            that.pointX = point.pageX;
            that.pointY = point.pageY;

            that.startTime = e.timeStamp || Date.now();

            if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);

            that._bind(MOVE_EV);
            that._bind(END_EV);
            that._bind(CANCEL_EV);
        },

        _move:function (e) {
            var that = this,
                point = hasTouch ? e.touches[0] : e,
                deltaX = point.pageX - that.pointX,
                deltaY = point.pageY - that.pointY,
                newX = that.x + deltaX,
                newY = that.y + deltaY,
                c1, c2, scale,
                timestamp = e.timeStamp || Date.now();

            if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);

            // Zoom
            if (that.options.zoom && hasTouch && e.touches.length > 1) {
                c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
                c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
                that.touchesDist = m.sqrt(c1 * c1 + c2 * c2);

                that.zoomed = true;

                scale = 1 / that.touchesDistStart * that.touchesDist * this.scale;

                if (scale < that.options.zoomMin) scale = 0.5 * that.options.zoomMin * Math.pow(2.0, scale / that.options.zoomMin);
                else if (scale > that.options.zoomMax) scale = 2.0 * that.options.zoomMax * Math.pow(0.5, that.options.zoomMax / scale);

                that.lastScale = scale / this.scale;

                newX = this.originX - this.originX * that.lastScale + this.x,
                    newY = this.originY - this.originY * that.lastScale + this.y;

                this.scroller.style[vendor + 'Transform'] = trnOpen + newX + 'px,' + newY + 'px' + trnClose + ' scale(' + scale + ')';

                if (that.options.onZoom) that.options.onZoom.call(that, e);
                return;
            }

            that.pointX = point.pageX;
            that.pointY = point.pageY;

            // Slow down if outside of the boundaries
            if (newX > 0 || newX < that.maxScrollX) {
                newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
            }
            if (newY > that.minScrollY || newY < that.maxScrollY) {
                newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
            }

            if (that.absDistX < 6 && that.absDistY < 6) {
                that.distX += deltaX;
                that.distY += deltaY;
                that.absDistX = m.abs(that.distX);
                that.absDistY = m.abs(that.distY);

                return;
            }

            // Lock direction
            if (that.options.lockDirection) {
                if (that.absDistX > that.absDistY + 5) {
                    newY = that.y;
                    deltaY = 0;
                } else if (that.absDistY > that.absDistX + 5) {
                    newX = that.x;
                    deltaX = 0;
                }
            }

            that.moved = true;
            that._pos(newX, newY);
            that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
            that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

            if (timestamp - that.startTime > 300) {
                that.startTime = timestamp;
                that.startX = that.x;
                that.startY = that.y;
            }

            if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
        },

        _end:function (e) {
            if (hasTouch && e.touches.length != 0) return;

            var that = this,
                point = hasTouch ? e.changedTouches[0] : e,
                target, ev,
                momentumX = { dist:0, time:0 },
                momentumY = { dist:0, time:0 },
                duration = (e.timeStamp || Date.now()) - that.startTime,
                newPosX = that.x,
                newPosY = that.y,
                distX, distY,
                newDuration,
                snap,
                scale;

            that._unbind(MOVE_EV);
            that._unbind(END_EV);
            that._unbind(CANCEL_EV);

            if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);

            if (that.zoomed) {
                scale = that.scale * that.lastScale;
                scale = Math.max(that.options.zoomMin, scale);
                scale = Math.min(that.options.zoomMax, scale);
                that.lastScale = scale / that.scale;
                that.scale = scale;

                that.x = that.originX - that.originX * that.lastScale + that.x;
                that.y = that.originY - that.originY * that.lastScale + that.y;

                that.scroller.style[vendor + 'TransitionDuration'] = '200ms';
                that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + that.scale + ')';

                that.zoomed = false;
                that.refresh();

                if (that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
                return;
            }

            if (!that.moved) {
                if (hasTouch) {
                    if (that.doubleTapTimer && that.options.zoom) {
                        // Double tapped
                        clearTimeout(that.doubleTapTimer);
                        that.doubleTapTimer = null;
                        if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
                        that.zoom(that.pointX, that.pointY, that.scale == 1 ? that.options.doubleTapZoom : 1);
                        if (that.options.onZoomEnd) {
                            setTimeout(function () {
                                that.options.onZoomEnd.call(that, e);
                            }, 200); // 200 is default zoom duration
                        }
                    } else {
                        that.doubleTapTimer = setTimeout(function () {
                            that.doubleTapTimer = null;

                            // Find the last touched element
                            target = point.target;
                            while (target.nodeType != 1) target = target.parentNode;

                            if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
                                ev = document.createEvent('MouseEvents');
                                ev.initMouseEvent('click', true, true, e.view, 1,
                                    point.screenX, point.screenY, point.clientX, point.clientY,
                                    e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
                                    0, null);
                                ev._fake = true;
                                target.dispatchEvent(ev);
                            }
                        }, that.options.zoom ? 250 : 0);
                    }
                }

                that._resetPos(200);

                if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
                return;
            }

            if (duration < 300 && that.options.momentum) {
                momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
                momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;

                newPosX = that.x + momentumX.dist;
                newPosY = that.y + momentumY.dist;

                if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = { dist:0, time:0 };
                if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = { dist:0, time:0 };
            }

            if (momentumX.dist || momentumY.dist) {
                newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);

                // Do we need to snap?
                if (that.options.snap) {
                    distX = newPosX - that.absStartX;
                    distY = newPosY - that.absStartY;
                    if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) {
                        that.scrollTo(that.absStartX, that.absStartY, 200);
                    }
                    else {
                        snap = that._snap(newPosX, newPosY);
                        newPosX = snap.x;
                        newPosY = snap.y;
                        newDuration = m.max(snap.time, newDuration);
                    }
                }

                that.scrollTo(mround(newPosX), mround(newPosY), newDuration);

                if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
                return;
            }

            // Do we need to snap?
            if (that.options.snap) {
                distX = newPosX - that.absStartX;
                distY = newPosY - that.absStartY;
                if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) that.scrollTo(that.absStartX, that.absStartY, 200);
                else {
                    snap = that._snap(that.x, that.y);
                    if (snap.x != that.x || snap.y != that.y) that.scrollTo(snap.x, snap.y, snap.time);
                }

                if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
                return;
            }

            that._resetPos(200);
            if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
        },

        _resetPos:function (time) {
            var that = this,
                resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
                resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

            if (resetX == that.x && resetY == that.y) {
                if (that.moved) {
                    that.moved = false;
                    if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);		// Execute custom code on scroll end
                }

                if (that.hScrollbar && that.options.hideScrollbar) {
                    if (vendor == 'webkit') that.hScrollbarWrapper.style[vendor + 'TransitionDelay'] = '300ms';
                    that.hScrollbarWrapper.style.opacity = '0';
                }
                if (that.vScrollbar && that.options.hideScrollbar) {
                    if (vendor == 'webkit') that.vScrollbarWrapper.style[vendor + 'TransitionDelay'] = '300ms';
                    that.vScrollbarWrapper.style.opacity = '0';
                }

                return;
            }

            that.scrollTo(resetX, resetY, time || 0);
        },

        _wheel:function (e) {
            var that = this,
                wheelDeltaX, wheelDeltaY,
                deltaX, deltaY,
                deltaScale;

            if ('wheelDeltaX' in e) {
                wheelDeltaX = e.wheelDeltaX / 12;
                wheelDeltaY = e.wheelDeltaY / 12;
            } else if ('detail' in e) {
                wheelDeltaX = wheelDeltaY = -e.detail * 3;
            } else {
                wheelDeltaX = wheelDeltaY = -e.wheelDelta;
            }

            if (that.options.wheelAction == 'zoom') {
                deltaScale = that.scale * Math.pow(2, 1 / 3 * (wheelDeltaY ? wheelDeltaY / Math.abs(wheelDeltaY) : 0));
                if (deltaScale < that.options.zoomMin) deltaScale = that.options.zoomMin;
                if (deltaScale > that.options.zoomMax) deltaScale = that.options.zoomMax;

                if (deltaScale != that.scale) {
                    if (!that.wheelZoomCount && that.options.onZoomStart) that.options.onZoomStart.call(that, e);
                    that.wheelZoomCount++;

                    that.zoom(e.pageX, e.pageY, deltaScale, 400);

                    setTimeout(function () {
                        that.wheelZoomCount--;
                        if (!that.wheelZoomCount && that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
                    }, 400);
                }

                return;
            }

            deltaX = that.x + wheelDeltaX;
            deltaY = that.y + wheelDeltaY;

            if (deltaX > 0) deltaX = 0;
            else if (deltaX < that.maxScrollX) deltaX = that.maxScrollX;

            if (deltaY > that.minScrollY) deltaY = that.minScrollY;
            else if (deltaY < that.maxScrollY) deltaY = that.maxScrollY;

            that.scrollTo(deltaX, deltaY, 0);
        },

        _mouseout:function (e) {
            var t = e.relatedTarget;

            if (!t) {
                this._end(e);
                return;
            }

            while (t = t.parentNode) if (t == this.wrapper) return;

            this._end(e);
        },

        _transitionEnd:function (e) {
            var that = this;

            if (e.target != that.scroller) return;

            that._unbind('webkitTransitionEnd');

            that._startAni();
        },


        /**
         *
         * Utilities
         *
         */
        _startAni:function () {
            var that = this,
                startX = that.x, startY = that.y,
                startTime = Date.now(),
                step, easeOut,
                animate;

            if (that.animating) return;

            if (!that.steps.length) {
                that._resetPos(400);
                return;
            }

            step = that.steps.shift();

            if (step.x == startX && step.y == startY) step.time = 0;

            that.animating = true;
            that.moved = true;

            if (that.options.useTransition) {
                that._transitionTime(step.time);
                that._pos(step.x, step.y);
                that.animating = false;
                if (step.time) that._bind('webkitTransitionEnd');
                else that._resetPos(0);
                return;
            }

            animate = function () {
                var now = Date.now(),
                    newX, newY;

                if (now >= startTime + step.time) {
                    that._pos(step.x, step.y);
                    that.animating = false;
                    if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);			// Execute custom code on animation end
                    that._startAni();
                    return;
                }

                now = (now - startTime) / step.time - 1;
                easeOut = m.sqrt(1 - now * now);
                newX = (step.x - startX) * easeOut + startX;
                newY = (step.y - startY) * easeOut + startY;
                that._pos(newX, newY);
                if (that.animating) that.aniTime = nextFrame(animate);
            };

            animate();
        },

        _transitionTime:function (time) {
            time += 'ms';
            this.scroller.style[vendor + 'TransitionDuration'] = time;
            if (this.hScrollbar) this.hScrollbarIndicator.style[vendor + 'TransitionDuration'] = time;
            if (this.vScrollbar) this.vScrollbarIndicator.style[vendor + 'TransitionDuration'] = time;
        },

        _momentum:function (dist, time, maxDistUpper, maxDistLower, size) {
            var deceleration = 0.0006,
                speed = m.abs(dist) / time,
                newDist = (speed * speed) / (2 * deceleration),
                newTime = 0, outsideDist = 0;

            // Proportinally reduce speed if we are outside of the boundaries 
            if (dist > 0 && newDist > maxDistUpper) {
                outsideDist = size / (6 / (newDist / speed * deceleration));
                maxDistUpper = maxDistUpper + outsideDist;
                speed = speed * maxDistUpper / newDist;
                newDist = maxDistUpper;
            } else if (dist < 0 && newDist > maxDistLower) {
                outsideDist = size / (6 / (newDist / speed * deceleration));
                maxDistLower = maxDistLower + outsideDist;
                speed = speed * maxDistLower / newDist;
                newDist = maxDistLower;
            }

            newDist = newDist * (dist < 0 ? -1 : 1);
            newTime = speed / deceleration;

            return { dist:newDist, time:mround(newTime) };
        },

        _offset:function (el) {
            var left = -el.offsetLeft,
                top = -el.offsetTop;

            while (el = el.offsetParent) {
                left -= el.offsetLeft;
                top -= el.offsetTop;
            }

            if (el != this.wrapper) {
                left *= this.scale;
                top *= this.scale;
            }

            return { left:left, top:top };
        },

        _snap:function (x, y) {
            var that = this,
                i, l,
                page, time,
                sizeX, sizeY;

            // Check page X
            page = that.pagesX.length - 1;
            for (i = 0, l = that.pagesX.length; i < l; i++) {
                if (x >= that.pagesX[i]) {
                    page = i;
                    break;
                }
            }
            if (page == that.currPageX && page > 0 && that.dirX < 0) page--;
            x = that.pagesX[page];
            sizeX = m.abs(x - that.pagesX[that.currPageX]);
            sizeX = sizeX ? m.abs(that.x - x) / sizeX * 500 : 0;
            that.currPageX = page;

            // Check page Y
            page = that.pagesY.length - 1;
            for (i = 0; i < page; i++) {
                if (y >= that.pagesY[i]) {
                    page = i;
                    break;
                }
            }
            if (page == that.currPageY && page > 0 && that.dirY < 0) page--;
            y = that.pagesY[page];
            sizeY = m.abs(y - that.pagesY[that.currPageY]);
            sizeY = sizeY ? m.abs(that.y - y) / sizeY * 500 : 0;
            that.currPageY = page;

            // Snap with constant speed (proportional duration)
            time = mround(m.max(sizeX, sizeY)) || 200;

            return { x:x, y:y, time:time };
        },

        _bind:function (type, el, bubble) {
            (el || this.scroller).addEventListener(type, this, !!bubble);
        },

        _unbind:function (type, el, bubble) {
            (el || this.scroller).removeEventListener(type, this, !!bubble);
        },


        /**
         *
         * Public methods
         *
         */
        destroy:function () {
            var that = this;

            that.scroller.style[vendor + 'Transform'] = '';

            // Remove the scrollbars
            that.hScrollbar = false;
            that.vScrollbar = false;
            that._scrollbar('h');
            that._scrollbar('v');

            // Remove the event listeners
            that._unbind(RESIZE_EV, window);
            that._unbind(START_EV);
            that._unbind(MOVE_EV);
            that._unbind(END_EV);
            that._unbind(CANCEL_EV);

            if (!that.options.hasTouch) {
                that._unbind('mouseout', that.wrapper);
                that._unbind(WHEEL_EV);
            }

            if (that.options.useTransition) that._unbind('webkitTransitionEnd');

            if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);

            if (that.options.onDestroy) that.options.onDestroy.call(that);
        },

        refresh:function () {
            var that = this,
                offset,
                i, l,
                els,
                pos = 0,
                page = 0;

            if (that.scale < that.options.zoomMin) that.scale = that.options.zoomMin;
            that.wrapperW = that.wrapper.clientWidth || 1;
            that.wrapperH = that.wrapper.clientHeight || 1;

            that.minScrollY = -that.options.topOffset || 0;
            that.scrollerW = mround(that.scroller.offsetWidth * that.scale);
            that.scrollerH = mround((that.scroller.offsetHeight + that.minScrollY) * that.scale);
            that.maxScrollX = that.wrapperW - that.scrollerW;
            that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
            that.dirX = 0;
            that.dirY = 0;

            if (that.options.onRefresh) that.options.onRefresh.call(that);

            that.hScroll = that.options.hScroll && that.maxScrollX < 0;
            that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);

            that.hScrollbar = that.hScroll && that.options.hScrollbar;
            that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;

            offset = that._offset(that.wrapper);
            that.wrapperOffsetLeft = -offset.left;
            that.wrapperOffsetTop = -offset.top;

            // Prepare snap
            if (typeof that.options.snap == 'string') {
                that.pagesX = [];
                that.pagesY = [];
                els = that.scroller.querySelectorAll(that.options.snap);
                for (i = 0, l = els.length; i < l; i++) {
                    pos = that._offset(els[i]);
                    pos.left += that.wrapperOffsetLeft;
                    pos.top += that.wrapperOffsetTop;
                    that.pagesX[i] = pos.left < that.maxScrollX ? that.maxScrollX : pos.left * that.scale;
                    that.pagesY[i] = pos.top < that.maxScrollY ? that.maxScrollY : pos.top * that.scale;
                }
            } else if (that.options.snap) {
                that.pagesX = [];
                while (pos >= that.maxScrollX) {
                    that.pagesX[page] = pos;
                    pos = pos - that.wrapperW;
                    page++;
                }
                if (that.maxScrollX % that.wrapperW) that.pagesX[that.pagesX.length] = that.maxScrollX - that.pagesX[that.pagesX.length - 1] + that.pagesX[that.pagesX.length - 1];

                pos = 0;
                page = 0;
                that.pagesY = [];
                while (pos >= that.maxScrollY) {
                    that.pagesY[page] = pos;
                    pos = pos - that.wrapperH;
                    page++;
                }
                if (that.maxScrollY % that.wrapperH) that.pagesY[that.pagesY.length] = that.maxScrollY - that.pagesY[that.pagesY.length - 1] + that.pagesY[that.pagesY.length - 1];
            }

            // Prepare the scrollbars
            that._scrollbar('h');
            that._scrollbar('v');

            if (!that.zoomed) {
                that.scroller.style[vendor + 'TransitionDuration'] = '0';
                that._resetPos(200);
            }
        },

        scrollTo:function (x, y, time, relative) {
            var that = this,
                step = x,
                i, l;

            that.stop();

            if (!step.length) step = [
                { x:x, y:y, time:time, relative:relative }
            ];

            for (i = 0, l = step.length; i < l; i++) {
                if (step[i].relative) {
                    step[i].x = that.x - step[i].x;
                    step[i].y = that.y - step[i].y;
                }
                that.steps.push({ x:step[i].x, y:step[i].y, time:step[i].time || 0 });
            }

            that._startAni();
        },

        scrollToElement:function (el, time) {
            var that = this, pos;
            el = el.nodeType ? el : that.scroller.querySelector(el);
            if (!el) return;

            pos = that._offset(el);
            pos.left += that.wrapperOffsetLeft;
            pos.top += that.wrapperOffsetTop;

            pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
            pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
            time = time === undefined ? m.max(m.abs(pos.left) * 2, m.abs(pos.top) * 2) : time;

            that.scrollTo(pos.left, pos.top, time);
        },

        scrollToPage:function (pageX, pageY, time) {
            var that = this, x, y;

            time = time === undefined ? 400 : time;

            if (that.options.onScrollStart) that.options.onScrollStart.call(that);

            if (that.options.snap) {
                pageX = pageX == 'next' ? that.currPageX + 1 : pageX == 'prev' ? that.currPageX - 1 : pageX;
                pageY = pageY == 'next' ? that.currPageY + 1 : pageY == 'prev' ? that.currPageY - 1 : pageY;

                pageX = pageX < 0 ? 0 : pageX > that.pagesX.length - 1 ? that.pagesX.length - 1 : pageX;
                pageY = pageY < 0 ? 0 : pageY > that.pagesY.length - 1 ? that.pagesY.length - 1 : pageY;

                that.currPageX = pageX;
                that.currPageY = pageY;
                x = that.pagesX[pageX];
                y = that.pagesY[pageY];
            } else {
                x = -that.wrapperW * pageX;
                y = -that.wrapperH * pageY;
                if (x < that.maxScrollX) x = that.maxScrollX;
                if (y < that.maxScrollY) y = that.maxScrollY;
            }

            that.scrollTo(x, y, time);
        },

        disable:function () {
            this.stop();
            this._resetPos(0);
            this.enabled = false;

            // If disabled after touchstart we make sure that there are no left over events
            this._unbind(MOVE_EV);
            this._unbind(END_EV);
            this._unbind(CANCEL_EV);
        },

        enable:function () {
            this.enabled = true;
        },

        stop:function () {
            if (this.options.useTransition) this._unbind('webkitTransitionEnd');
            else cancelFrame(this.aniTime);
            this.steps = [];
            this.moved = false;
            this.animating = false;
        },

        zoom:function (x, y, scale, time) {
            var that = this,
                relScale = scale / that.scale;

            if (!that.options.useTransform) return;

            that.zoomed = true;
            time = time === undefined ? 200 : time;
            x = x - that.wrapperOffsetLeft - that.x;
            y = y - that.wrapperOffsetTop - that.y;
            that.x = x - x * relScale + that.x;
            that.y = y - y * relScale + that.y;

            that.scale = scale;
            that.refresh();

            that.x = that.x > 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x;
            that.y = that.y > that.minScrollY ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

            that.scroller.style[vendor + 'TransitionDuration'] = time + 'ms';
            that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + scale + ')';
            that.zoomed = false;
        },

        isReady:function () {
            return !this.moved && !this.zoomed && !this.animating;
        }
    };

    if (typeof exports !== 'undefined') exports.iScroll = iScroll;
    else window.iScroll = iScroll;

})();
!function(t,e,i){var o=["webkit","Moz","ms","O"],r={},n;function a(t,i){var o=e.createElement(t||"div"),r;for(r in i)o[r]=i[r];return o}function s(t){for(var e=1,i=arguments.length;e<i;e++)t.appendChild(arguments[e]);return t}var f=function(){var t=a("style",{type:"text/css"});s(e.getElementsByTagName("head")[0],t);return t.sheet||t.styleSheet}();function l(t,e,i,o){var a=["opacity",e,~~(t*100),i,o].join("-"),s=.01+i/o*100,l=Math.max(1-(1-t)/e*(100-s),t),p=n.substring(0,n.indexOf("Animation")).toLowerCase(),u=p&&"-"+p+"-"||"";if(!r[a]){f.insertRule("@"+u+"keyframes "+a+"{"+"0%{opacity:"+l+"}"+s+"%{opacity:"+t+"}"+(s+.01)+"%{opacity:1}"+(s+e)%100+"%{opacity:"+t+"}"+"100%{opacity:"+l+"}"+"}",f.cssRules.length);r[a]=1}return a}function p(t,e){var r=t.style,n,a;if(r[e]!==i)return e;e=e.charAt(0).toUpperCase()+e.slice(1);for(a=0;a<o.length;a++){n=o[a]+e;if(r[n]!==i)return n}}function u(t,e){for(var i in e)t.style[p(t,i)||i]=e[i];return t}function c(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var r in o)if(t[r]===i)t[r]=o[r]}return t}function d(t){var e={x:t.offsetLeft,y:t.offsetTop};while(t=t.offsetParent)e.x+=t.offsetLeft,e.y+=t.offsetTop;return e}var h={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",speed:1,trail:100,opacity:1/4,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto",position:"relative"};function m(t){if(!this.spin)return new m(t);this.opts=c(t||{},m.defaults,h)}m.defaults={};c(m.prototype,{spin:function(t){this.stop();var e=this,i=e.opts,o=e.el=u(a(0,{className:i.className}),{position:i.position,width:0,zIndex:i.zIndex}),r=i.radius+i.length+i.width,s,f;if(t){t.insertBefore(o,t.firstChild||null);f=d(t);s=d(o);u(o,{left:(i.left=="auto"?f.x-s.x+(t.offsetWidth>>1):parseInt(i.left,10)+r)+"px",top:(i.top=="auto"?f.y-s.y+(t.offsetHeight>>1):parseInt(i.top,10)+r)+"px"})}o.setAttribute("aria-role","progressbar");e.lines(o,e.opts);if(!n){var l=0,p=i.fps,c=p/i.speed,h=(1-i.opacity)/(c*i.trail/100),m=c/i.lines;(function y(){l++;for(var t=i.lines;t;t--){var r=Math.max(1-(l+t*m)%c*h,i.opacity);e.opacity(o,i.lines-t,r,i)}e.timeout=e.el&&setTimeout(y,~~(1e3/p))})()}return e},stop:function(){var t=this.el;if(t){clearTimeout(this.timeout);if(t.parentNode)t.parentNode.removeChild(t);this.el=i}return this},lines:function(t,e){var i=0,o;function r(t,o){return u(a(),{position:"absolute",width:e.length+e.width+"px",height:e.width+"px",background:t,boxShadow:o,transformOrigin:"left",transform:"rotate("+~~(360/e.lines*i+e.rotate)+"deg) translate("+e.radius+"px"+",0)",borderRadius:(e.corners*e.width>>1)+"px"})}for(;i<e.lines;i++){o=u(a(),{position:"absolute",top:1+~(e.width/2)+"px",transform:e.hwaccel?"translate3d(0,0,0)":"",opacity:e.opacity,animation:n&&l(e.opacity,e.trail,i,e.lines)+" "+1/e.speed+"s linear infinite"});if(e.shadow)s(o,u(r("#000","0 0 4px "+"#000"),{top:2+"px"}));s(t,s(o,r(e.color,"0 0 1px rgba(0,0,0,.1)")))}return t},opacity:function(t,e,i){if(e<t.childNodes.length)t.childNodes[e].style.opacity=i}});(function(){function t(t,e){return a("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',e)}var e=u(a("group"),{behavior:"url(#default#VML)"});if(!p(e,"transform")&&e.adj){f.addRule(".spin-vml","behavior:url(#default#VML)");m.prototype.lines=function(e,i){var o=i.length+i.width,r=2*o;function n(){return u(t("group",{coordsize:r+" "+r,coordorigin:-o+" "+-o}),{width:r,height:r})}var a=-(i.width+i.length)*2+"px",f=u(n(),{position:"absolute",top:a,left:a}),l;function p(e,r,a){s(f,s(u(n(),{rotation:360/i.lines*e+"deg",left:~~r}),s(u(t("roundrect",{arcsize:i.corners}),{width:o,height:i.width,left:i.radius,top:-i.width>>1,filter:a}),t("fill",{color:i.color,opacity:i.opacity}),t("stroke",{opacity:0}))))}if(i.shadow)for(l=1;l<=i.lines;l++)p(l,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(l=1;l<=i.lines;l++)p(l);return s(e,f)};m.prototype.opacity=function(t,e,i,o){var r=t.firstChild;o=o.shadow&&o.lines||0;if(r&&e+o<r.childNodes.length){r=r.childNodes[e+o];r=r&&r.firstChild;r=r&&r.firstChild;if(r)r.opacity=i}}}else n=p(e,"animation")})();if(typeof define=="function"&&define.amd)define(function(){return m});else t.Spinner=m}(window,document);


/*©2012 Medipix Productions, Inc. All Rights Reserved. Created by Rob Keown
 The requires statements below are for http://www.nczonline.net/blog/2009/09/22/introducing-combiner-a-javascriptcss-concatenation-tool/ which is used for deployment*/


var xmlVideoType;
var xmlHasVideo;
var myScroll;
var scrollHPane;
var scrollApi;
var currentSlide;
var currentTime;
var currentTimeDisp;
var durationDisp;
var zoomed = false;
var totalSlides;
var SlideNum = 0;
var lastDirClick = 'next';
var progressPosition;
var latestCueTimeNextSlide;
var latestCueTimeThisSlide;
var timer;
var xmlTitle;
var xmlPresenter;
var playAllPos = -1;
var xmlDuration;
var playReady = false;
var slideLoaded = false;
has_intro = 0;
has_outro = 0;
playAllMode = false;
var has_menu = 0;
var return_menu_link = "menu.php?passback=main";
var preload_ctr = 0;
var showTitleNow;
var showTitleArr = new Array();
var slideFormat;
var thumbFormat;
var leadZero;
var xmlAvFile;
var medType = 'video/mp4';
var playAll = new Array();

var moduleVar;
var playAll;
var videoWidth_ms; //prevent contention with other modules
var videoHeight_ms; //prevent contention with other modules



function slideLoader_stat() {
    //used when pre-loading the first X slides
    preload_ctr++;
    $('#pre-load-status').html('Preloaded ' + preload_ctr + ' slides');
    if (preload_ctr >= 3) {
        slideLoaded = true;
        $('#pre-load-status').html('Slides loaded...pre-loading video...');
    };
}


//we can't do feature checks for what we need to know
var ua = navigator.userAgent; //load array with mobile environment
var checker = {
    iPad:ua.match(/(iPad)/), //only iPad for now
    blackberry:ua.match(/BlackBerry/), //don't know if we'll ever use this
    android:ua.match(/Android/),
    iPhone:ua.match(/(iPhone)/)
};
var smartDevice = (checker.iPad == null && checker.android == null && checker.iPhone == null) ? false : true; //smartDevice is something that can do a uiwebview. We assume everything but an iPhone. We need this to disable/provide certain features in mobile devices.

var iPhone = (checker.iPhone == null) ? false : true;

var isIE6_8 = ($.browser.msie && $.browser.version <= "8.0") ? true : false;

(function () {
    function convertSecondsToTimecode2(seconds) {
        seconds = parseInt(seconds);

        if (seconds < 10) {
            return '00:0' + seconds.toString();
        } else if (seconds < 60) {
            return '00:' + seconds.toString();
        } else {
            var minutes = Math.round(seconds / 60);
            var seconds = Math.round(seconds % 60);

            return ((minutes < 10) ? '0' : '') + minutes.toString() +
                ':' +
                ((seconds < 10) ? '0' : '') + seconds.toString();
        }
    }

    function convertSecondsToTimecode(seconds) {
        seconds = Math.round(seconds);
        minutes = Math.floor(seconds / 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
    }

    function convertMillisecondsToSeconds(milliseconds) {
        return (milliseconds / 1000);
    }

    function convertTimecodeToSeconds(timecode) {
        timecode = timecode.replace(/&#xD;/g, '').replace(/&#xA;/g, '');

        var parts = timecode.split(':');

        if (parts.length == 3)
            return parseInt(parts[0], 10) * 360 +
                parseInt(parts[1], 10) * 60 +
                parseInt(parts[2], 10);
        else if (parts.length == 2)
            return parseInt(parts[0], 10) * 60 +
                parseInt(parts[1], 10);
        else if (parts.length == 1)
            return parseInt(parts[0], 10);
        else
            return -1;
    }

    // class=be101&unit=1 ==> {class: 'be1o1', unit: 1}
    function parseTokens(input) {
        var tokens = {};
        var parts = input.replace('#', '').split('&');
        for (var i in parts) {
            var p = parts[i].split('=');
            tokens[p[0]] = p[1];
        }
        return tokens;
    }

    // {class: 'be1o1', unit: 1} ==> class=be101&unit=1
    function tokensToString(tokens) {
        var parts = [];
        for (var i in tokens) {
            parts.push(i + '=' + tokens[i]);
        }
        return parts.join('&');
    }

    window.videoUtils = {
        convertSecondsToTimecode:convertSecondsToTimecode,
        convertTimecodeToSeconds:convertTimecodeToSeconds
    }


    var DtsUserControls = function (video) {

        if (navigator.userAgent.match(/iPad/i) != null) {

            video.setAttribute('controls', 'controls');
        }

        var loaded = false;

        var controls = $('#video1-controls');
        /*
         controls.css('opacity', 0.3);
         video.addEventListener('loadeddata', function() {
         controls.css('opacity', 1);
         });
         */

        var playPauseButton = $('#video1-playpause');
        var muteButton = $('#video1-mute');
        var toggleTranscriptButton = $('#video1-toggle-transcript');


        currentTimeDisp = $('#video1-currentTime'); //made this global to eliminate one eventListener for timer display
        durationDisp = $('#video1-duration');

        var progressWrapper = $('#video1-progress-wrapper');
        var progreesLoaded = $('#video1-loaded');
        progressPosition = $('#video1-progress'); //made this global to eliminate one eventListener for timer display
        var progressHandle = $('.media-progress-handle');

        // PLAY/PAUSE button
        playPauseButton.bind('click', function () {
           // console.log('play/pause clicked', video);
            if (video.paused)
                video.play();
            else
                video.pause();
        });


        function handlePlayerState(e) {
            video = e.target;

          //  console.log('state change: ' + e.type, e);

            switch (e.type) {
                case 'canplay':
                    playReady = true;

              /*      if (!smartDevice) {
                        video.pause();
                    }*/

                    break;
                case 'seeked' :
                    if (video.paused) {
                        video.play();
                    } //to restart video if paused at end of video - this is a
                    //workaround to handle weird state when player 'ended' event fires.
                    console.log('seeked');
                    break;
                case 'seeking' :
                    break;
                case 'playing':
                    console.log('playing');

                    break;
                case 'ended' :
                    if (video.currentTime > 6) { //ended event is very unpredictable across browsers, sometimes firing at beginning
                        doEnd();
                    }
                    break;

                case 'play':
                    playPauseButton.find('.play').hide();
                    playPauseButton.find('.pause').css('display', 'block');
                    break;
                case 'paused':
                case 'pause':
                    playPauseButton.find('.pause').hide();
                    playPauseButton.find('.play').css('display', 'block');
                    break;
                case 'loadstart':
                    progreesLoaded.width('0%');
                    progressPosition.width('0%');
                    break;
                case 'loadedmetadata' :
                    break;


            }
        }

        // events
        var events = 'loadstart abort ended loadedmetadata loadeddata play playing pause paused stop seeking seeked canplay canplaythrough waiting'.split(' ');
        for (var i = 0; i < events.length; i++) {
         //   console.log('adding', events[i]);
            video.addEventListener(events[i], handlePlayerState, true);
        }

        // MUTE: todo
        muteButton.toggle(

            function () {
                video.setMuted(true);
                $(this).find('.mute').hide();
                $(this).find('.unmute').css('display', 'block');
            },
            function () {
                video.setMuted(false);
                $(this).find('.mute').css('display', 'block');
                $(this).find('.unmute').hide();
            });

        // TRANSCRIPT
        toggleTranscriptButton.toggle(

            function () {
                $('#transcript').hide();
                $(this).find('.transcript-on').hide();
                $(this).find('.transcript-off').css('display', 'block');
            },
            function () {
                $('#transcript').show();
                $(this).find('.transcript-on').css('display', 'block');
                $(this).find('.transcript-off').hide();
            });


        // DURATION/PROGRESS
        /*        video.addEventListener('timeupdate', function () {
         currentTime.html(convertSecondsToTimecode(video.currentTime));

         if (!isNaN(video.duration)) {
         duration.html(convertSecondsToTimecode(video.duration));

         // bars
         var percent = (video.currentTime / video.duration * 100);
         progressPosition.width(percent.toString() + '%');
         }
         }, false);*/


        video.addEventListener('progress', function (e) {

            if (e.target == null)
                return;

            var percent = 0;

            // flash/silverlight (html5 early browsers)
            if (!isNaN(e.target.loaded) && !isNaN(e.target.total)) {
                percent = (e.loaded / e.total);
                // html5 revision (safari 5 supports this, but chrome mis-reports it as always having 100% buffered)
            } else if (e.target.buffered && e.target.buffered.end) {
                try {
                    percent = e.target.buffered.end() / e.target.duration;
                } catch (e) {
                }
            }

            try {
                progreesLoaded.width(progressWrapper.width() * percent);
            } catch (e) {
            }


        }, false);

        function handleProgressClick(e) {
           // console.log('clicked progressWrapper');

            // mouse position relative to the object!
            var x = e.pageX,
                offset = progressWrapper.offset(),
                percentage = ((x - offset.left) / progressWrapper.outerWidth(true)),
                newTime = percentage * video.duration;

            video.setCurrentTime(newTime);
        }

        progressWrapper.bind('click', handleProgressClick);
        //progreesLoaded.bind('click', handleProgressClick);
        //progressPosition.bind('click', handleProgressClick);

    };


    var DtsPlayerController;
    DtsPlayerController = function (player) {

        var slidesData = [];
        var transcriptData = [];
        currentSlide = ''; //globalized at top
        var _lastTime = 0;


        var prevSlideButton = $('#video1-prevSlide');
        var nextSlideButton = $('#video1-nextSlide');


        //NEXT/PREV SLIDE
        nextSlideButton.bind('click', handleNextSlideButton);
        prevSlideButton.bind('click', handlePrevSlideButton);
        $('.arrow.back a').bind('click', function (e) {
            $('#video1-prevSlide').click();
            e.preventDefault();
        });
        $('.arrow.forward a').bind('click', function (e) {
            $('#video1-nextSlide').click();
            e.preventDefault();
        });


        function handleNextSlideButton(e) {
            var slideNavArr = currentSlide.split('-');
            var targetSlide = parseInt(slideNavArr[1]) + 1;
            if (targetSlide < slidesData.length - 1) {

                gotoAndPlaySlide(targetSlide);
            }
        }

        function handlePrevSlideButton() {
            if (currentSlide == '') return;
            var slideNavArr = currentSlide.split('-');
            var targetSlide = parseInt(slideNavArr[1]) - 1;
            if (targetSlide >= 0) {


                gotoAndPlaySlide(targetSlide);
            }

        }


        player.addEventListener('timeupdate', processPlayhead, false); //made this non-anonymous so I could call it after slide change events.
//This uses straight js since we need to maximize performance!
        function processPlayhead(e) {


            currentTime = player.currentTime;

            //update the progress timer

            currentTimeDisp.html(convertSecondsToTimecode(currentTime) + ' /');

            if (!isNaN(player.duration)) {
                durationDisp.html(convertSecondsToTimecode(player.duration));

                // bars
                var percent = (currentTime / player.duration * 100);
                progressPosition.width(percent.toString() + '%');
            }


            /* We spend a lot of time just moving the playhead along, this next line does a quick check to see if the playhead has moved before or after cueTimeThisSlide or cueTimeNextSlide. We exit it if it still is, saving us the iteration tasks below. Note the use of global objects.
             */

            if (currentTime >= latestCueTimeThisSlide && currentTime <= latestCueTimeNextSlide) {
                return;
            }


            if (!isNaN(currentTime) && currentTime > 0) {
                if (xmlVideoType != 'panel') {var compTime = slidesData[slidesData.length - 1   ].time}
                else {
                    compTime = xmlDuration - 1;
                }
                /*                if (xmlVideoType != 'panel') {var compTime = slidesData[slidesData.length - 1   ].time}
                 else {
                 compTime = xmlDuration - 2;
                 }
                 if (currentTime >= compTime) {*/
                if (currentTime >= slidesData[slidesData.length - 1   ].time - 1) {
                    console.log('At end!');
                    //      player.pause();
                    /*setTimeout(function () {window.location = menu_return_url}, 1000);*/
                    doEnd();


                } //prevent ended event - this is a
                //workaround to handle weird state when player 'ended' event fires.

                //test if playhead is no longer between
                for (var i = 0; i < slidesData.length - 1; i++) {
                    var cueTimeThisSlide = slidesData[i].time; //note the cuetime variables are global
                    // player.pause();

                    var cueTimeNextSlide = slidesData[i + 1].time;


                    if (currentTime >= cueTimeThisSlide && currentTime <= cueTimeNextSlide) {
                        //video.pause(); //enable this line to debug showSlide()
                        showSlide('s-' + i.toString());
                        latestCueTimeNextSlide = cueTimeNextSlide;
                        latestCueTimeThisSlide = cueTimeThisSlide;
                        /*if (('s-' + i.toString()) != currentSlide) {
                         showSlide('s-' + i.toString());
                         break;
                         }*/
                    }
                }

                _lastTime = currentTime;


            }

        }

        function showTranscriptLine(lineName) {

            var number = parseInt(lineName.split('-')[1], 10);

            // unhighlight old
            $('.transcript').find('.highlight').removeClass('highlight');
            ;

            // find this one and highlight it
            var l = $('#' + lineName).addClass('highlight');
            var newPos = l.outerHeight(true) * (number - 1);

            // scroll to it
            $('.transcript .text')
                //.attr('scrollTop',l.height(true) * (number - 1)  +'px');
                .animate({ 'scrollTop':newPos }, 250);

        }

        function showSlide(slideName) {
            if (xmlVideoType == 'panel') {

            } else {
                console.log('show slide', slideName);

                currentSlide = slideName;
                SlideNum = $('#' + slideName + '-thumb').attr('data-index');
                //showvideo implementation


                //TODO: work out proper fadein and fadeout for Firefox (fix crash)
                if (slidesData[SlideNum].showvideo) { //switch to video-only
                    if (slideZoomed) {
                        $("#video1-slideZoom").click();


                    }  //if we are zoomed, get out!
                    //    $('#video1-slideCount').hide();
                    //    $('.left-btn-container:first').hide(); //was to hide slide index btn
                    //    $('.left-btn-container').css('margin-top', '48px');
                    //  $('#video1-nextSlide').hide();

                    //    $('#show-info').css('margin-top', '23px');

                    //    $('#slides-frame').hide();
                    if (SlideNum == 0) {
                        $('#video1-prevSlide').animate({opacity: 0}), 20;
                        $('.arrow.back').animate({opacity: 0}), 20;

                    }
                    $('#slides-frame').animate({opacity: 0}), 200,
                        $('.arrow.back').animate({opacity: 0}), 20;
                    $('.arrow.forward').animate({opacity: 0}), 20;
                    //$('#slide-display').animate({opacity: 0}),20;
                    $('#slide-list img').addClass('resizeSlides_img');
                    $('#slide-display').addClass('resizeSlides_img');
                    $('#slides-frame').addClass('resizeSlides_frame');
                    $('#video1-controls').addClass('resizeSlides_controls');
                    //  $('#slide-display').animate({opacity: 1}),20;
                    $('#slide-sorter').addClass('resizeSlides_sorter');

                    $('#btn-container').css('margin-top', '40px;');
                    //     $('#slides-frame').addClass('video-only-hasvideo');
                    /*           $('#video-frame').hide();*/

                    $('#video1-frame').animate({opacity: 0}), 20;
                    //      $('#slide-display').addClass('slide-only');
                    //$('#slide-display').animate({opacity: 1}),20;
                    //      $('#video1-controls').addClass('slide-only-controller');


                    $('#video1-controls').animate({opacity: 1}), 20;
                    $('#video1-playpause').animate({opacity: 1}), 20;
                    $('#video1-frame').addClass('video-only');
                    $('#video1-frame').animate({opacity: 1}), 20;


                    $('#video1-slideZoom').animate({opacity: 0}), 20;
                    video.setVideoSize(540, 405);
                    $('#slides-frame').animate({opacity: 1}), 20;

                    zoomed = true;
                    advanceSlide(slideName);


                } else {
                    if (zoomed) {

                        if (xmlVideoType == 'anim') {
                            $('#slides-frame').removeClass('video-right');
                            $('#video-frame').hide();
                            $('#video1-frame').css('opacity', 0);
                            $('#slide-display').addClass('slide-only');
                            $('#video1-controls').addClass('slide-only-controller');
                            $('#video1-playpause').show();
                            if (xmlVideoType == 'right') {//TODO: fix anim zoom in css - this is sloppy
                                setVideoRight();
                            }
                            $('#video1-slideZoom').show();
                            advanceSlide();
                        } else { //this uses jquery.animate-enhanced plugin

                            $('#video1-frame').animate({opacity: 0}, 200, function () {

                                $('#video1-frame').removeClass('video-only')
                                video.setVideoSize(280, 210);
                                $('#slides-frame').animate({opacity: 0}, 200, function () {
                                    $('.arrow.back').animate({opacity: 0}, 50);
                                    $('.arrow.forward').animate({opacity: 0}, 50);
                                    $('#video1-controls').removeClass('slide-only-controller');
                                    $('#slide-display').removeClass('slide-only');
                                    $('#slides-frame').removeClass('video-only-hasvideo');
                                    $('img', $('#slide-list')).removeClass('resizeSlides_img');
                                    $('#slide-display').removeClass('resizeSlides_img');
                                    $('#slides-frame').removeClass('resizeSlides_frame');
                                    $('#video1-controls').removeClass('resizeSlides_controls');
                                    //$('#slide-display').animate({opacity:1},50);

                                    $('#slide-sorter').removeClass('resizeSlides_sorter');


                                    $('#video1-slideZoom').animate({opacity: 1}, 50);

                                    $('#slides-frame').animate({opacity: 1}, 200, function () {
                                        advanceSlide();
                                        $('.arrow.back').animate({opacity: 1}, 50);
                                    });
                                    $('.arrow.forward').animate({opacity: 1}, 50);
                                    $('#video1-frame').animate({opacity: 1}, 200);
                                })


                            });


                        }


                        if (xmlHasVideo && (xmlVideoType != 'anim')) {
                            $('#video1-frame').css('opacity', 1);
                        } else {
                            $('#video1-frame').css('opacity', 0);
                        } //if video is only result of xmlShowVideo

                        zoomed = false;

                    } else {
                        advanceSlide(slideName);
                    }

                }


            }
        } //end of panel test

        function advanceSlide(slideName) {         // THUMB
            // unhlight selected thumb
            $('.slide-sorter').find('.highlight').removeClass('highlight');


            // highlight current thumb
            $('#' + slideName + '-thumb').addClass('highlight');


            if (!showTitleArr[parseInt(SlideNum + 1)] === '') {
                $('#header-title').html('<div id="titleText">' + showTitleArr[parseInt(SlideNum) + 1] + '</div>').slideDown();
                $('#titleText').vAlign();
            } else {
                $('#header-title').html('<div id="titleText">' + xmlTitle + '</div>').slideDown();


            }


            //  if(!($.browser.msie && $.browser.version<="8.0")) { //Don't use Iscroll for IE < 9

            if (SlideNum > 2) {
                //var scrollApi = scrollHPane.data('jsp');
                if (smartDevice) {
                    //if (1==1) {

                    myScroll.scrollTo(0, ((parseInt(SlideNum / 3)) * -124) + 124, 100);
                } else {

                    scrollApi.scrollToY((parseInt(SlideNum / 3) * 124) - 124);
                }

                //keep hightlight centered (not in IE < 9)

            }


            //  }
            // SLIDEs
            //If we are zoomed, scroll appropriately

            if (slideZoomed) {
                $('#slide-display').scrollTo((858 * SlideNum) + 'px', {axis:'x'});
            } else {
                $('#slide-display').scrollTo((640 * SlideNum) + 'px', {axis:'x'});
            }

            $('#video1-slideCount').html('Slide ' + (parseInt(SlideNum) + 1) + ' of ' + totalSlides);

            //hide or show prev and next slide advance icons
            if (!slidesData[SlideNum].showvideo) {
                if (SlideNum == 0) {
                    $('#video1-prevSlide').animate({opacity:0}), 20;
                    $('.arrow.back').animate({opacity:0}), 20;
                } else {
                    $('#video1-prevSlide').animate({opacity:1}), 20;
                    $('.arrow.back').animate({opacity:1}), 20;
                }
                if (SlideNum == slidesData.length - 2) {
                    $('#video1-nextSlide').animate({opacity:0}), 20;
                    $('.arrow.forward').animate({opacity:0}), 20;
                } else {
                    $('#video1-nextSlide').animate({opacity:1}), 20;
                    $('.arrow.forward').animate({opacity:1}), 20;
                }
            } else {

                /*$('.arrow.forward').hide();*/
            }
        }

        function slideClicked(e) {

            //$('#slide-sorter').fadeTo(400,0, function() {$('#slide-sorter').hide()});
            $('.left-btn-container:first').click();
            var index = parseInt(e.target.getAttribute('data-index'), 10);

            // quit and allow timing to handle it
            //showSlide('s-' + index.toString());

            var slide = slidesData[index];
            if (index > SlideNum) {
                lastDirClick = 'next';
            } else {
                lastDirClick = 'prev';
            }
            if (player.pluginType == 'flash') { //bug in mejs??
           //     console.log('Compensating for flash');
                player.setCurrentTime(slide.time + 2);
            } else {
           //     console.log('NOT compensating for flash');
                player.setCurrentTime(slide.time + .1);
            }
            var target = 's-' + index;
            showSlide(target);
            //  processPlayhead();

        }

        function gotoAndPlaySlide(slideNum) {
            if (slideNum > SlideNum) {
                lastDirClick = 'next';
            } else {
                lastDirClick = 'prev';
            }

            if (player.pluginType == 'flash') { //bug in mejs??
            //    console.log('Compensating for flash');
                player.setCurrentTime(slidesData[slideNum].time + 2);
            } else {
            //    console.log('NOT compensating for flash');
                player.setCurrentTime(slidesData[slideNum].time + .1);
            }
            //    processPlayhead();
            var target = 's-' + slideNum;
            showSlide(target);

        }

        function setVideoRight() {
            $('#video-frame').addClass('video-right');
            $('#slides-frame').addClass('video-right');
            $('#video1-frame').addClass('video-right');
        }

        return {

            changeLanguage:function (slidesUrl, transcriptUrl, slidesPath,thumbsPath) {
                this.load(true, '', slidesUrl, transcriptUrl, slidesPath,thumbsPath);
            },

            loadClass:function (videoUrl, slidesUrl, transcriptUrl, slidesPath,thumbsPath) {
                this.load(false, videoUrl, slidesUrl, transcriptUrl, slidesPath,thumbsPath);
            },

            load:function (changeLanguage, videoUrl, slidesUrl, transcriptUrl, slidesPath,thumbsPath) {

                console.log(changeLanguage, videoUrl, slidesUrl, transcriptUrl, slidesPath,thumbsPath);

                // stop and clear
                if (!changeLanguage)
                    player.pause();


                // reset
                slidesData = [];
                transcriptData = [];

                // clear ts and
                $('.slide-display').html();
                $('.slide-sorter').html();
                $('.transcript .text').html();

                function continueSlideLoad(doc) { //this the coninuation of the loadSlides function. This is broken up to allow it to run as a callback in the ajax method used
                    //to determine if Slide filenames begin with a leading zero, eg "Slide1.png" vs "Slide1.png". I won't go into the history, but it is needed.

                    if (xmlVideoType == 'panel') {
                        buildClass();
                        $('#left-column').hide();
                        $('#btn-container').css({'margin-top': '15px','left': '49px'})
                        $('.left-btn-container:first').css({'opacity': 0});
                        $('.left-btn-container:eq(1)').click(function () {
                            window.location.href = return_menu_link;
                        })


                        $('#video1-nextSlide').hide();
                        $('#video1-slideCount').hide();
                        $('#slides-frame').addClass('video-only-hasvideo');
                       /* $('#slides-frame').hide();*/

                        $('#video-frame').hide();
                        $('#video1-frame').css('opacity', 0);
                        $('#slide-display').addClass('slide-only');
                        /*$('#video1-controls').addClass('slide-only-controller');*/
                        $('#video1-playpause').show();

                        $('#slides-wrapper').css('left','180px');

                        $('#video1-frame').css('opacity', 1);
                        $('#video1-frame').addClass('panel-only')
                        $('#slide-display').css({'opacity':1,'background': 'none'});
                        $('#video1-controls').css({'display': 'block','left': '-103px','top': '421px'});
                        $('#slides-frame').css('box-shadow','none');

                        $('#video1-slideZoom').hide();
                       /* $('.titleText').html('<p class="class-title">' + xmlTitle.replace('<br/>', ' ') + '</p>');*/


                        video.setVideoSize(800, 450);





                    }
                    else {

                        if (!xmlHasVideo || xmlVideoType == 'anim') { //only display slides


                            $('#slides-wrapper').removeClass('video-right');
                            $('#video-frame').hide();
                            $('#video1-frame').css('opacity', 0);
                            $('#header-title').addClass('slide-only-info');
                            $('#left-column,#slides-wrapper,#btn-container').addClass('no-video');
                            /*var infoTemp = '<div id="titleText">' + xmlTitle + '</div>' + $('#show-info-wrapper').html();
                            $('#header-title').remove();
                            $('#show-info').replaceWith(infoTemp);*/

                            /*      $('#slide-display').addClass('slide-only');
                             $('#video1-controls').addClass('slide-only-controller');*/
                            $('#video1-playpause').show();
                            /*   $('#slides-frame.slides-frame').addClass('slide-only');*/
                            /*$('.arrow.forward').css('right', '120px');
                             $('.arrow.back').css('left', '135px');*/


                        } else {


                            switch (xmlVideoType) { //determine screen layout
                                case 'left' :
                                    video.setVideoSize(videoWidth_ms, videoHeight_ms); // MAIN VIDEO SIZE CHANGE HERE
                                    break;
                                case 'right' :
                                    $('.content-frame').addClass('backGroundFlip'); //used for asymmetrical backgrounds
                                    $('#left-column').addClass('video-right');
                                    $('#video-frame').addClass('video-right');
                                    $('#slides-wrapper').addClass('video-right');
                                    $('#video1-frame').addClass('video-right');
                                    $('#video1-controls').addClass('video-right');
                                    $('#btn-container').addClass('video-right');
                                    video.setVideoSize(videoWidth_ms, videoHeight_ms); // MAIN VIDEO SIZE CHANGE HERE
                                    //    $('.arrow.forward').css('right', '259px');
                                    //   $('.arrow.back').css('left', '-5px');
                                    break;
                                //  $('#video1-frame').css({left: (position.left + 25)});


                            }
                        }
                        //  $('#show-info-wrapper').vAlign();
                        $('#container').fadeIn('slow');
                        //$('#video1-frame').fadeIn('slow');


                        var slideNodes = doc.find('slidenode');
                        console.log('total slides', slideNodes.length);
                        console.log('-first slide', slideNodes[0]);

                        var iCtr = 0


                        slideNodes.each(function () {
                            iCtr++
                            var slideNode = $(this);


                            switch (leadZero) {
                                case 1:
                                    slideFormat = 'Slide' + iCtr + '.png';
                                    break;
                                case 2:
                                    if (iCtr < 10) {
                                        slideFormat = 'Slide0' + iCtr + '.png';
                                    } else {
                                        slideFormat = 'Slide' + iCtr + '.png';
                                    }
                                    break;
                                case 3:
                                    if (iCtr < 10) {
                                        slideFormat = 'Slide00' + iCtr + '.png';
                                    }
                                    else if (iCtr < 100) {
                                        slideFormat = 'Slide0' + iCtr + '.png';
                                    } else {
                                        slideFormat = 'Slide' + iCtr + '.png';
                                    }
                                    break;
                                default:
                                    console.log('Unexpected leading zero logic');


                            } //end switch


                            slidesData.push({
                                time: convertMillisecondsToSeconds(slideNode.attr('milliseconds')),
                                url: slidesPath + slideFormat,
                                /* url:slidesPath + 'Slide' + iCtr + '.png',*/
                                thumbsUrl: thumbsPath + thumbFormat,
                                /*thumbsUrl:thumbsPath + 'Slide' + iCtr + '.jpg',*/
                                showvideo: (slideNode.attr('showvideo')) ? true : false


                            });
                            if (slideNode.attr('showTitle') != null) {
                                showTitleNow = slideNode.attr('showTitle');

                            } else {
                                showTitleNow = '';
                            }
                            showTitleArr[iCtr] = showTitleNow;
                        });
                        /*Push dupe last slide as placeholder for end of video set for duration - see bug #2 in Bugzilla */
                        totalSlides = slidesData.length;

                        $('#video1-slideCount').html('Slide 1 of ' + totalSlides);

                        slidesData.push({
                            time: xmlDuration,
                            url: slidesPath + 'Slide' + iCtr + '.png',
                            /*thumbsUrl:thumbsPath + 'Slide' + ((iCtr < 10) ? '0' + iCtr : iCtr) + '.jpg',*/
                            thumbsUrl: thumbsPath + 'Slide' + iCtr + '.jpg',
                            showvideo: false
                        });
                        showTitleArr[iCtr] = showTitleNow;


                        console.log('- done loading slides');

                        loadTranscript();
                    } //end of panel test
                }

                function loadSlides() {
                    console.log('loading slides', slidesUrl);
                    $.ajaxSetup({ cache:false });

                    $.ajax({
                        url:projectPath + "/presentation.xml",

                        success:function (data) {
                   //         console.log('- received slide data', data);

                            var doc = $(data);
                            var xmlPresentation = doc.find('presentation');
                            xmlAvFile = xmlPresentation.attr('avFile');
                            xmlHasVideo = (xmlPresentation.attr('hasVideo') == 'true');
                            videoUrl = projectPath + '/' + xmlAvFile;
                            xmlDuration = convertMillisecondsToSeconds(xmlPresentation.attr('totalTime'));
                            var tempArr = xmlAvFile.split('.');
                            slidesPath = projectPath + '/' + tempArr[0] + '_slides/';
                            thumbsPath = projectPath + '/' + tempArr[0] + '_thumbs/';
                            xmlTitle = xmlPresentation.find('title').text();
                            videoWidth_ms = xmlPresentation.attr('videoWidth');
                            videoHeight_ms = xmlPresentation.attr('videoHeight');
                            videoWidth_ms = 280;
                            videoHeight_ms =  210;







                            /*_paq.push(['trackEvent', 'VideoLoad', xmlTitle]);*/

                            xmlPresenter = xmlPresentation.find('presenter').text();
                            /*
                             $('#show-info-wrapper').html('<p class="class-title">' + xmlTitle + '</p>' + xmlPresenter);
                             */
                            $('#show-info-wrapper').html(xmlPresenter);

                            document.title = xmlTitle.replace(/(<.*?>)/ig,"");; //strip out any HTML

                            xmlVideoType = xmlPresentation.attr('videoType');
                            if (xmlVideoType == 'panel') {
                                $('#show-title').html('<p class="class-title">' + xmlTitle.replace('<br/>', ' ') + '</p>');
                            }
                            $.ajax({ //test for leading zero in slides and thumbs < 10 and <100 (e.g. Slide1.png vs Slide1.png vs Slide001.png
                                url:slidesPath + 'Slide1.png',
                                type:'HEAD',
                                error: function()
                                {
                                    console.log("Expected error part of slide number format detection");
                                    $.ajax({
                                            url:slidesPath + 'Slide01.png',
                                            type:'HEAD',
                                            error: function(){
                                                console.log("Expected error part of slide number format detection");

                                               leadZero = 3;
                                               continueSlideLoad(doc);
                                            },
                                            success: function () {
                                                leadZero = 2;
                                                continueSlideLoad(doc);
                                            }})},

                                   success: function () {
                                      // leadZero = 1;
                                       continueSlideLoad(doc);

                                }})},
                                        error: function() {
                                            console.log('Error loading XML')
                                        }
                            })};



                function loadTranscript() {
               //     console.log('loading transcript', transcriptUrl);

                    $.ajax({
                        url:transcriptUrl,
                        success:function (data) {
               //             console.log('- received transcript data', data);

                            var doc = $(data);
                            var textNodes = doc.find('cue');
                            textNodes.each(function () {
                                var textNode = $(this);
                                transcriptData.push({
                                    time:window.videoUtils.convertTimecodeToSeconds(textNode.attr('timeCode')),
                                    text:textNode.attr('text')
                                });
                            });

               //             console.log('- done loading transcript');
                            buildClass();
                        },
                        error:function () {
                            //alert('There was an error loading the trnnscript for this class');

                            // skip to setting up the class
                            buildClass();
                        }
                    });
                }

                function buildClass() {

                    console.log('building class');
                    //Set width of #scroller to precisely fit slides + 2 on either side


                    // add slide number to roll-over slide time
                    if (xmlVideoType == 'panel') {

                    } else {
                        var slideHtml = '';
                        var slideSorterHtml = '';
                        for (var i = 0; i < slidesData.length - 1; i++) {
                            var slideData = slidesData[i];
                            //9/3/2012 Added code to hard load slides 0 - 4 the remained of the slides are set for lazy-loading
                            if (i < 3) {
                                //we add an onLoad event to the very first slide as part of the pre-load test for start-of-play

                                /*slideHtml += '<li><img ' + 'class="' + ((i == 0) ? 'highlight ' : '') + 'lazy" ' + 'id="s-' + i.toString() + '" src= "' + slideData.url + '" data-original="' + slideData.url + '" ' + ((i == 0) ? 'onLoad="slideLoader_stat();"' : '') + '  /></li>';*/
                                //  Add eventloader for first three slides
                                /*slideHtml += '<li><img ' + 'class="' + ((i == 0) ? 'highlight ' : '') + 'lazy" ' + 'id="s-' + i.toString() + '" src= "' + slideData.url + '" data-original="' + slideData.url + '" ' + ((i <= 2) ? 'onLoad="slideLoader_stat();"' : '') + '  /></li>';*/
                                slideHtml += '<li><img ' + 'class="' + ((i == 0) ? 'highlight" ' : '"') + 'id="s-' + i.toString() + '" src= "' + slideData.url + '" data-original="' + slideData.url + '" ' + ((i <= 2) ? 'onLoad="slideLoader_stat();"' : '') + '  /></li>';


                            } else {
                                slideHtml += '<li><img ' + 'class="' + ((i == 0) ? 'highlight ' : '') + 'lazy" ' + 'id="s-' + i.toString() + '" src="images/black.gif" data-original="' + slideData.url + '"/></li>';
                            }
//patched to add slide number to tooltip

                            //now using the main slide img for the slide index
                            slideSorterHtml += '<li><img ' + ((i == 0) ? '"highlight"' : '') + ' id="s-' + i.toString() + '-thumb" data-index="' + i.toString() + '" src="' + slideData.url + '" title="Slide #' + (i + 1) + ' - ' + videoUtils.convertSecondsToTimecode(slideData.time) + '" alt="Slide #' + (i + 1) + ' - ' + videoUtils.convertSecondsToTimecode(slideData.time) + '" /></li>';
                        }

                        /*                        slideSorterHtml += '<li><img ' + ((i == 0) ? '"highlight"' : '') + ' id="s-' + i.toString() + '-thumb" data-index="' + i.toString() + '" src="' + slideData.thumbsUrl + '" title="' + videoUtils.convertSecondsToTimecode(slideData.time) + '" alt="' + videoUtils.convertSecondsToTimecode(slideData.time) + '" /></li>';
                         }*/
                        /*.html('<div id="slide_wrapper"><div id=\"slide_scroller\"><ul id=\"slide-list\">' + slideHtml+ '</ul></div></div>');*/
                        $('.slide-display')
                            .html('<div id=\"slide_scroller\"><ul id=\"slide-list\">' + slideHtml + '</ul></div>');
                        /*               .find('img')
                         .hide()
                         .first()
                         .show();*/

                        $('img.lazy').lazyload({container: $("#slide-display"), threshold: 2400});

                        //loads only slides in view or within 1000px of #slide-display - 3/20 increased this to 1000
                        //mb class is boldface for webfonts...it is assigned through webfont website
                        $('.slide-sorter')
                            .html('<div id=\"slide-sorter-header\" class="mb">Slide Index<div class="sorter-close">Close&nbsp;<span class="sorter-close-symbol">p</span></div></div><div id=\"wrapper\"><div id=\"scroller\"><ul id=\"thelist\">' + slideSorterHtml + '</ul></div></div>');
                        // .html(slideSorterHtml);

                        // add click events
                        for (var i = 0; i < slidesData.length; i++) {
                            $('#s-' + i.toString() + '-thumb').bind('click',
                                slideClicked);
                        }
                        $('#scroller').css({'width': '600px'});
                        // $('#scroller').css({'width':((slidesData.length + 2) * 78) + 'px'});
                   //     $('#slide_scroller').css({width: (slidesData.length * 768 ) + 'px'});
                        $('#slide_scroller').css({width: (slidesData.length * 858 ) + 'px'});
                        $('.left-btn-container')
                            .hover(
                            function () {
                                $(this).fadeTo(200, .8).css('cursor', 'pointer');
                            },
                            function () {
                                $(this).fadeTo(200, 1).css('cursor', 'default');
                            });

                        $('.left-btn-container:first').toggle(function () {
                            showSlideIndex()
                        }, function () {
                            closeSlideIndex();

                        });
                        $('.left-btn-container:eq(1)').click(function () {
                            window.location.href = return_menu_link;
                        })

                        function showSlideIndex() {
                            /*$('#slide-sorter').show().fadeTo(400, 1);*/
                            // $('#slide-sorter').toggleClass('sorter-toggle').animate({opacity: 1},400);
                            $('#slide-sorter').animate({top: '-49px', left: '9px'}, 400);
                            //        $('#slide-sorter').animate({left: 1},400);
                            $('.left-btn-container:first').prepend('Close ').css('color', 'yellow');
                        }

                        $('.sorter-close')
                            .click(function () {
                                closeSlideIndex();
                            })
                            .hover(
                            function () {
                                $(this).css('cursor', 'pointer');
                            },
                            function () {
                                $(this).css('cursor', 'default');
                            });


                        function closeSlideIndex() {
                            $('#slide-sorter').animate({top: '-660px'}, 400);
                            $('.left-btn-container:first').html('Slide Index').css('color', '#FFFFFF');
                        }

                        //init iScroll and format slide-sorter and descendants for desktop or tablet
                        if (smartDevice) {
                            // if (1==1) {
                            myScroll = new iScroll('wrapper',
                                {
                                    zoom: false,
                                    desktopCompatibility: true,
                                    momentum: true,
                                    hScrollbar: false
                                });
                            $('#wrapper').css({'top': '25px'});
                        } else {
                            scrollHPane = $('#wrapper').jScrollPane({showArrows: true});
                            scrollApi = scrollHPane.data('jsp');
                            $('#wrapper').css({'height': '632px'});
                        }


                        // add transcript
                        var transcriptHtml = '';
                        for (var i = 0; i < transcriptData.length; i++) {
                            var textData = transcriptData[i];
                            transcriptHtml += '<span id="t-' + i.toString() + '">' + textData.text + '</span>';

                            //TODsO; new cue
                            //player.addCuePoint('t-' + i.toString(), textData.time);
                        }
                        $('.transcript .text').html(transcriptHtml + '<span class="hilighter"></span>');

                    } //end of panel test
                    //        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

                    // document.addEventListener('DOMContentLoaded', loaded, false);
               //     console.log('current ' + player.currentSrc);

                    //player.play();


                    if (videoUrl != '' && !changeLanguage) {
                        console.log('current ' + player.currentSrc);
                        console.log('loading ' + videoUrl);

                        player.setSrc(videoUrl);
                        player.load();

                        console.log('after ' + player.currentSrc);


                        //     $('#slide-sorter').css('opacity', 0);


                        $('#title').fadeIn(3000);
                    }

                    /*
                     setTimeout(function () {
                     player.play();
                     }, 250);
                     */
                }

                // start

                loadSlides();
                var passCounter = 1;
                //begin load-and-play

                playWaiting = setInterval(function () {
                    //player.load();

                    $('#pre-loader p:first').html('Loading Slides & Video Media');
                    passCounter++;
                    // $('#pre-loader p:first').html('Passes: ' + passCounter)

                    if (passCounter == 2 & slideLoaded) {
                        player.play();

                    }
                    if (passCounter >= 10) {

                        $('#pre-load-status').html('Please be patient...your Internet connection is slow');
                    }

                    if (((xmlVideoType == 'panel') && playReady) || (slideLoaded && playReady) || (slideLoaded && smartDevice) || (slideLoaded && isIE6_8)) { //iPad doesn't support canplay so we just make sure slide is loaded
                        //initial slides are loaded and 'canplay' has been triggered
                        clearInterval(playWaiting)
                        showSlide('s-0');
                        $.modal.close();
                        /*$('#pre-loader').hide();*/
                        $('#container').fadeTo(500, 1);

                        if (smartDevice == true && xmlHasVideo == false) {

                            $('#debugBox').show().fadeTo(250, 1);
                            $('#big-play').mouseenter(function() {
                                $(this).toggleClass('hover')
                            }).mouseleave(function() {
                                $(this).toggleClass('hover')
                            }).click(function() {player.play();
                                $('#debugBox').hide();});

                        } else {
                            player.play();
                            //ridiculous hack for IE7
                            if (isIE6_8) {
                                setTimeout(function () {
                                    player.play();
                                }, 3000);
                            }
                            /*        setTimeout(function () {player.setCurrentTime(xmlDuration - 10);}, 3000)*/
                        }
                    }
                }, 2000);


                /*  //begin load-and-play
                 setTimeout(function () {
                 //player.load();



                 showSlide('s-0');
                 $.modal.close();
                 */
                /*$('#pre-loader').hide();*/
                /*
                 $('#container').fadeTo(500,1);

                 if (smartDevice == true) {
                 $('#debugBox').show().fadeTo(250,1);
                 player.play();
                 } else {
                 player.play();
                 */
                /*        setTimeout(function () {player.setCurrentTime(xmlDuration - 10);}, 3000)*/
                /*
                 }
                 }, 3000);*/


            }

        }


    };

    var dts = {
        DtsUserControls:DtsUserControls,
        //      DtsCoursesController:DtsCoursesController,
        DtsPlayerController:DtsPlayerController
    };

    window.dts = dts;

})();
/*©2012 Medipix Productions, Inc. All Rights Reserved. Created by Rob Keown
 The requires statements below are for http://www.nczonline.net/blog/2009/09/22/introducing-combiner-a-javascriptcss-concatenation-tool/ which is used for deployment*/


if (typeof window.console == 'undefined') {
    window.console = { log:function () {
    } };
}
var video;
var slideZoomed = false;
var daySelect = 0;
var projectPath;
var troFlag;
var fired;


/*function doEnd() {
    if (fired) {
        return;
    }
    fired = true;

    if (parseInt(playAllPos) >= 0) { //if we are in "play all" mode then increment counter and reload.
        //for cvhcv_aasld2012 we don't have playall, but left in place from ViralEd for ref
        if (playAllPos >= playAll.length - 1) {
            video.pause();
            if (has_menu == 1) {
                window.location = 'player.html?project_code=' + project_code;
            } else {
                /!*window.location = return_menu_link;*!/
                //temp - just end.
            }
        } else {
            playAllPos++;
            /!*setTimeout(function() {window.location = 'player_iac2012tsk-dev.html?prognum=' + playAllPos;},1000);*!/
            window.location = 'player.html?prognum=' + playAllPos + '&project_code=' + project_code;

            //return;
        }
    } else {
        if (has_menu == '1') {
            window.location = 'menu_viraled_archive.php?project_code=' + project_code;
        } else {
            setTimeout(function () {
                window.location = 'http://www.hopkinscme.edu/CompletePostTest.aspx?course_code=80030165EM';
                //temp - just end.
            }, 500);
        }
    }
}*/
function doEnd() {
    if (fired) {
        return;
    }
    fired = true;
    if (parseInt(playAllPos) >= 0) { //if we are in "play all" mode then increment counter and reload.
        //for cvhcv_aasld2012 we don't have playall, but left in place from ViralEd for ref
        if (playAllPos >= playAll.length - 1) {
            video.pause();

            window.location = '../index.html';
            //temp - just end.

        } else {
            playAllPos++;
            /*setTimeout(function() {window.location = 'player_iac2012tsk-dev.html?prognum=' + playAllPos;},1000);*/
            window.location = 'player.html?prognum=' + playAllPos + '&module=' + moduleVar;

            //return;
        }
    } else {
 video.setCurrentTime(0);

        setTimeout(function () {
            
            video.pause();
            
            
            //temp - just end.
        },50);

    }
}
(function ($) {
// VERTICALLY ALIGN FUNCTION
    $.fn.vAlign = function () {
        return this.each(function (i) {
            var ah = $(this).height();
            var ph = $(this).parent().height();
            var mh = Math.ceil((ph - ah) / 2);
            $(this).css('margin-top', mh);

        });
    };
})(jQuery);

jQuery(document).ready(function ($) {

    var opts = {
        lines: 13, // The number of lines to draw
        length: 7, // The length of each line
        width: 4, // The line thickness
        radius: 10, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        color: '#FFF', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: true, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
    };


    if (!smartDevice) {$(document).tooltip()};

    //loader-mask that is IE friendly (forget graceful opacity < IE 9

    $('#pre-loader').html('<p>&nbsp;</p><p id="spinner"></p><p style="text-align: center;color: white">L O A D I N G</p><p id="pre-load-status">&nbsp;</p>').modal({ zIndex:1110000, opacity:100, minHeight:'300', autoResize:true, autoPosition:true, close:false,
        onClose: function() {$('#pre-loader, #simplemodal-overlay').animate({opacity: 0},1000,
                                                                            function() {$.modal.close()});},
        appendTo:'body'});


    $("a").bind("click", function () { //must do this way for "home screen" ios links to not open in full Safari
        if (this.href) {
            location.href = this.href;
            return false;
        }
    });
    var target = document.getElementById('spinner');
    var spinner = new Spinner(opts).spin(target);

//yellow & glowy on controls
    if (!smartDevice) {
      $('.hover-control').hover(function() {$(this).toggleClass('control-hover-on')},function() {$(this).toggleClass('control-hover-on')});
    }
    $(document).keyup(function (e) {

        if (e.keyCode == 27) {
            $('#slide-display img').click();
        }   // closes zoomed slide
    });

    console.log('APP START');

    $('#video1-prevSlide').animate({opacity:0}, 20); //set prevSlide button hidden (for slide index = 0)
    $('.arrow.back').animate({opacity:0}, 20);




    var strQs = $.QueryString("program");
  //  projectPath = "content" + strQs;
    projectPath = "content";

    playAllPos = $.QueryString("prognum"); //prognum qs var holds next program to play

moduleVar = $.QueryString("module");
    var playAll01 = ['module1_01','module1_02','module1_03','module1_04'];
    var playAll02 = ['module2_01','module2_02','module2_03','module2_04','module2_05'];
    var playAll03 = ['module3_01','module3_02','module3_03','module3_04'];
    var playAll04 = ['module4_01','module4_02','module4_03','module4_04','module4_05'];

    switch(moduleVar) {
    case '1':
        playAll = playAll01;
        break;
    case '2':
        playAll = playAll02;
        break;
    case '3':
        playAll = playAll03;
        break;
    case '4':
        playAll = playAll04;
        break;
    default:
}



    (has_intro == '1' || has_outro == '1') ? troFlag = true : troFlag = false;
    if ((playAllPos == null) && troFlag) {   //Determine if we need to play intro/outro (this is specific to viraled templated player
        playAllPos = 0;

    }


    if (parseInt(playAllPos) >= 0) {
            var ordVar;
            if (parseInt(playAllPos) == 0) {
                ordVar = 'F I R S T'
            } else if (parseInt(playAllPos) == playAll.length - 1) {
                ordVar = "L A S T"
            } else {
                ordVar = "N E X T"
            }
            /*    var ordinal = ['F I R S T', 'N E X T', 'N E X T', 'L A S T'];*/
            var s = '&nbsp;&nbsp;';
            projectPath = 'content/' + playAll[playAllPos];
            $('#pre-loader p:last').html('L O A D I N G<br/>' + s + ordVar + s + "P R E S E N T A T I O N");

    } else {



   projectPath = 'content/' + strQs;
   projectPath = 'content/';
     //   projectPath = 'content/' + 'iac2016';

    }


    //   $('#video-selector').css({visibility : 'hidden'});

    $('#video1-fullscreen').hide();

   if (smartDevice) {

        $('#video1-mute').hide();
/*
        $('#video1-frame').addClass('hideVideo');
        $('#smart-prompt a').click(function () {


            $('#debugBox').fadeTo(250, 0).hide();
            //  $(this).hide();
            $('#video1-frame').removeClass('hideVideo');
            video.play();


        })*/
    }


    var relLeft = null;
    var slideLeft = null;

    $("#video1-slideZoom").click(
        function () {

            //zoom all slides
            if (slideZoomed) {
                $('#slide-display img:first').click();
                return;
            }
            //$('#video1-frame').css('z-index', 1); //move video behind zoomed slide
            $('#player-container').prepend('<div id="scrim">&nbsp;</div>');
            $('#scrim').animate({opacity:.8}, 300);

            $('#video1-frame').css('opacity', 0);
            $('#slides-frame').addClass('zoomSlideFrame');
            $('#slide-display img').addClass('image-zoom');
            $('.slide-display').addClass('image-zoom-repo');
            $('.slide-display li').addClass('image-zoom');
            $('#slides-frame .back').addClass('zoomed');
            $('#slides-frame .forward').addClass('zoomed');
            $('#video1-controls').addClass('slide-only-controller');
            $('.media-slideZoom').addClass('zoomed');
            /* $('#slide-sorter').hide();*/
            $('#slides-wrapper').addClass('slides-wrapper-zoom');


            slideZoomed = true; //so we scroll correct increment amount
            $('#slide-display').scrollTo((858 * SlideNum) + 'px', {axis:'x'}); //re-display  current slide for zoomed environment

            //If user clicks image while zoomed? Unzoom! (ESC key also same. Set just after doc ready)
            $('#slide-display img').click(function () {


                $('#video1-frame').css('z-index', 2000); //move video back above slides
                $('.slide-display li.image-zoom').removeClass('image-zoom');
                $('.slide-display.image-zoom-repo').removeClass('image-zoom-repo');
                $('#slides-wrapper').removeClass('slides-wrapper-zoom');
                $('#slides-frame').removeClass('zoomSlideFrame');
                $('img.image-zoom').removeClass('image-zoom');
                $('#slides-frame .back.zoomed').removeClass('zoomed');
                $('#slides-frame .forward.zoomed').removeClass('zoomed');

                if (!(xmlVideoType == 'anim')) {
                    $('#video1-controls').removeClass('slide-only-controller');
                    $('#video1-frame').css('opacity', 1);

                }

                if (!xmlHasVideo) {
                    $('#video1-frame').css('opacity', 0);

                    $('#video1-controls').removeClass('slide-only-controller');
                }
                slideZoomed = false;
                // console.log('Triggered');

                $('#slide-display').scrollTo((640 * SlideNum) + 'px', {axis:'x'}); //re-display  current slide for unzoomed environment
                $('#unzoom-click').hide();
                $('.media-slideZoom').removeClass('zoomed');
                $('#scrim').animate({opacity:0}, 200, function () {
                    $(this).remove();
                })

                $('#slide-display').unbind('hover');


            });
            if (!smartDevice) {

                $('#slide-display').hover(function () {
                    $('#unzoom-click').fadeIn('slow')
                }, function () {
                    $('#unzoom-click').fadeOut('slow')
                })
            } else
                $('#unzoom-click').text('Tap Slide to Unzoom').css('opacity', .5).show();


        })


    // IE Fixies (dropdownlist issues)
    if ($.browser.msie && jQuery.browser.version <= 8) {
        $("select").mousedown(function () {
            $(this).css("width", "auto").siblings('select').hide();
        }).bind('change', function () {
                $(this).css("width", "").siblings('select').show();
            });
    }

    // setup the video player.html
    video = null;
/*

    if (xmlAvFile.search('.mp3') == xmlAvFile.length - 4) { //if mp3 file specified we can play on smartphones, but have to replace video tag with audio
        medType = 'audio/mp3';
        $(video).remove();
        $("#video1-frame").html(
            '<audio id="video1-view" width="10" height="10" type="audio/mp3"</audio>');
    }
*/

    new MediaElement('video1-view', {
        type: medType,
        plugins:['flash'],
        //enablePluginDebug: true,
        startVolume:1, //ignored by mobile platforms

        error:function () {
            console.log('fail');

            showMessage('Error,', 'Your browser cannot play these videos. You can either install <a href="http://get.adobe.com/flashplayer/">Flash player.html</a> or upgrade to a newer browser');

        },
        success:function (mediaElement, domNode) {
            console.log('video ready, type: ' + mediaElement.pluginType);


            video = mediaElement;

            // setup user controls
            var dtsUserControls = new dts.DtsUserControls(video);

            // setup slides/transcript controller
            var dtsPlayerController = new dts.DtsPlayerController(video);

            // setup the dropdownlist controller
            dtsPlayerController.loadClass("", "", "", "");
            //var dtsController = new dts.DtsCoursesController('video-selector', video, dtsPlayerController);

            // add rate for admins
            if (window.location.search.indexOf('admin=true') > -1) {
                var pbRate = $('<input type="text" id="playback-rate" value="1.0" />');
                pbRate.width(25);
                $('#use-lo').before(pbRate);

                pbRate.bind('keyup', function () {
                    video.playbackRate = $(this).val();
                });

            }
        }



    });


    //updateOrientation();

    function setOrientation(orientation) {

        var container = document.getElementsByTagName('body')[0];
        //hardcode
        orientation = 90;
        switch (orientation) {

            case 0:
            case 180:
                container.className = 'portrait-1';
                video.setVideoSize(480, 270);
                break;
            case 90:
                container.className = 'landscape-smallvideo';
                video.setVideoSize(480, 270);
                break;

            case -90:
                container.className = 'landscape-largevideo';
                video.setVideoSize(480, 270);
                break;
        }

    }

    function sizeTest() {
        video.setVideoSize(405, 305);
    }

    function updateOrientation() {
        /*window.orientation returns a value that indicates whether iPhone is in portrait mode, landscape mode with the screen turned to the
         left, or landscape mode with the screen turned to the right. */
        var orientation = window.orientation;
        //  if (orientation != undefined) {alert ('Orientation: ' + orientation);}
        if (orientation == 0 || orientation == 180) {

        }

        //setOrientation(orientation);

    }

    /*$('#orientation-smallvideo').bind('click', function () { setOrientation(90); });
     $('#orientation-largevideo').bind('click', function () { setOrientation(-90); });
     $('#orientation-portrait').bind('click', function () { setOrientation(0); });

     // Point to the updateOrientation function when iPhone switches between portrait and landscape modes.*/
    $(window).bind('orientationchange', function () {
        updateOrientation();
    });

    //THUMB NAVS TOO


})
