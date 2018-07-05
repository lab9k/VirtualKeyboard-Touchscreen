const jQueryUrl = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
const keyboardStylesheet = "https://rawgit.com/lab9k/VirtualKeyboard-Touchscreen/master/css/jquery.ml-keyboard.css";

/* Inladen van JQuery, benodigd voor andere scripts */
window.onload = function () {
        var script = document.createElement("script");
        script.src = jQueryUrl;
        script.type = 'text/javascript';
        script.onload = function () {
            initialize();
        }
        document.head.appendChild(script);
    }
    /* Keyboard initialisatie en inladen stylesheet */
function initialize() {
    ! function ($) {

        function Key(params) {
            "[object Arguments]" == Object.prototype.toString.call(params) ? this.keyboard = params[0] : this.keyboard = params, this.$key = $("<li/>"), this.current_value = null
        }

        function KeyDelete() {
            Key.call(this, arguments), this.id = "mlkeyboard-backspace", this.default_value = "delete"
        }

        function KeyTab() {
            Key.call(this, arguments), this.id = "mlkeyboard-tab", this.default_value = "tab"
        }

        function KeyCapsLock() {
            Key.call(this, arguments), this.id = "mlkeyboard-capslock", this.default_value = "caps lock"
        }

        function KeyReturn() {
            Key.call(this, arguments), this.id = "mlkeyboard-return", this.default_value = "enter"
        }

        function KeyShift() {
            Key.call(this, arguments), this.id = "mlkeyboard-" + arguments[1] + "-shift", this.default_value = "shift"
        }

        function KeySpace() {
            Key.call(this, arguments), this.id = "mlkeyboard-space", this.default_value = " "
        }

        function Keyboard(selector, options) {
            this.defaults = {
                layout: "en_US",
                active_shift: !0,
                active_caps: !1,
                is_hidden: !0,
                open_speed: 300,
                close_speed: 100,
                show_on_focus: !0,
                hide_on_blur: !0,
                trigger: void 0,
                enabled: !0
            }, this.global_options = $.extend({}, this.defaults, options), this.options = $.extend({}, {}, this.global_options), this.keys = [], this.$keyboard = $("<div/>").attr("id", "mlkeyboard"), this.$modifications_holder = $("<ul/>").addClass("mlkeyboard-modifications"), this.$current_input = $(selector)
        }
        Key.prototype.render = function () {
            return this.id && this.$key.attr("id", this.id), this.$key
        }, Key.prototype.setCurrentValue = function () {
            this.keyboard.upperRegister() ? this.current_value = this.preferences.u ? this.preferences.u : this.default_value : this.current_value = this.preferences.d ? this.preferences.d : this.default_value, this.$key.text(this.current_value)
        }, Key.prototype.setCurrentAction = function () {
            var _this = this;
            this.$key.unbind("click.mlkeyboard"), this.$key.bind("click.mlkeyboard", function () {
                _this.keyboard.keep_focus = !0, "function" == typeof _this.preferences.onClick ? _this.preferences.onClick(_this) : _this.defaultClickAction()
            })
        }, Key.prototype.defaultClickAction = function () {
            this.keyboard.destroyModifications(), this.is_modificator ? (this.keyboard.deleteChar(), this.keyboard.printChar(this.current_value)) : this.keyboard.printChar(this.current_value), this.preferences.m && "[object Array]" === Object.prototype.toString.call(this.preferences.m) && this.showModifications(), this.keyboard.active_shift && this.keyboard.toggleShift(!1)
        }, Key.prototype.showModifications = function () {
            var _this = this;
            this.keyboard.modifications = [], $.each(this.preferences.m, function (i, modification) {
                var key = new Key(_this.keyboard);
                key.is_modificator = !0, key.preferences = modification, _this.keyboard.modifications.push(key)
            }), this.keyboard.showModifications(this)
        }, Key.prototype.toggleActiveState = function () {
            this.isActive() ? this.$key.addClass("active") : this.$key.removeClass("active")
        }, Key.prototype.isActive = function () {
            return !1
        }, KeyDelete.prototype = new Key, KeyDelete.prototype.constructor = KeyDelete, KeyDelete.prototype.defaultClickAction = function () {
            this.keyboard.deleteChar()
        }, KeyTab.prototype = new Key, KeyTab.prototype.constructor = KeyTab, KeyTab.prototype.defaultClickAction = function () {
            let waarde = this.keyboard.$current_input.val();
            waarde += "\t";
            this.keyboard.$current_input.val(waarde);
            this.keyboard.$current_input.focus();
        }, KeyCapsLock.prototype = new Key, KeyCapsLock.prototype.constructor = KeyCapsLock, KeyCapsLock.prototype.isActive = function () {
            return this.keyboard.active_caps
        }, KeyCapsLock.prototype.defaultClickAction = function () {
            this.keyboard.toggleCaps()
        }, KeyReturn.prototype = new Key, KeyReturn.prototype.constructor = KeyReturn, KeyReturn.prototype.defaultClickAction = function () {
            var e = $.Event("keypress", {
                which: 13,
                keyCode: 13
            });
            this.keyboard.$current_input.trigger(e);

            /* Own code */




        }, KeyShift.prototype = new Key, KeyShift.prototype.constructor = KeyShift, KeyShift.prototype.isActive = function () {
            return this.keyboard.active_shift
        }, KeyShift.prototype.defaultClickAction = function () {
            this.keyboard.toggleShift()
        }, KeySpace.prototype = new Key, KeySpace.prototype.constructor = KeySpace;
        var KEYS_COUNT = 53;
        Keyboard.prototype.init = function () {
            this.$keyboard.append(this.renderKeys()), this.$keyboard.append(this.$modifications_holder), $("body").append(this.$keyboard), this.options.is_hidden && this.$keyboard.hide(), this.setUpKeys()
        }, Keyboard.prototype.setUpKeys = function () {
            var _this = this;
            this.active_shift = this.options.active_shift, this.active_caps = this.options.active_caps, $.each(this.keys, function (i, key) {
                key.preferences = mlKeyboard.layouts[_this.options.layout][i], key.setCurrentValue(), key.setCurrentAction(), key.toggleActiveState()
            })
        }, Keyboard.prototype.renderKeys = function () {
            for (var $keys_holder = $("<ul/>"), i = 0; KEYS_COUNT >= i; i++) {
                var key;
                switch (i) {
                    case 13:
                        key = new KeyDelete(this);
                        break;
                    case 14:
                        key = new KeyTab(this);
                        break;
                    case 28:
                        key = new KeyCapsLock(this);
                        break;
                    case 40:
                        key = new KeyReturn(this);
                        break;
                    case 41:
                        key = new KeyShift(this, "left");
                        break;
                    case 52:
                        key = new KeyShift(this, "right");
                        break;
                    case 53:
                        key = new KeySpace(this);
                        break;
                    default:
                        key = new Key(this)
                }
                this.keys.push(key), $keys_holder.append(key.render())
            }
            return $keys_holder
        }, Keyboard.prototype.setUpFor = function ($input) {
            var _this = this;
            if (this.options.show_on_focus && $input.bind("focus", function () {
                    _this.showKeyboard($input)
                }), this.options.hide_on_blur && $input.bind("blur", function () {
                    var VERIFY_STATE_DELAY = 500;
                    clearTimeout(_this.blur_timeout), _this.blur_timeout = setTimeout(function () {
                        _this.keep_focus ? _this.keep_focus = !1 : _this.hideKeyboard()
                    }, VERIFY_STATE_DELAY)
                }), this.options.trigger) {
                var $trigger = $(this.options.trigger);
                $trigger.bind("click", function (e) {
                    e.preventDefault(), _this.isVisible ? _this.hideKeyboard() : (_this.showKeyboard($input), $input.focus())
                })
            }
        }, Keyboard.prototype.showKeyboard = function ($input) {
            var input_changed = !this.$current_input || $input[0] !== this.$current_input[0];
            if (!this.keep_focus || input_changed) {
                if (input_changed && (this.keep_focus = !0), this.$current_input = $input, this.options = $.extend({}, this.global_options, this.inputLocalOptions()), !this.options.enabled) return void(this.keep_focus = !1);
                "" !== this.$current_input.val() && (this.options.active_shift = !1), this.setUpKeys(), this.options.is_hidden && (this.isVisible = !0, this.$keyboard.slideDown(this.options.openSpeed))
            }
        }, Keyboard.prototype.hideKeyboard = function () {
            this.options.is_hidden && (this.isVisible = !1, this.$keyboard.slideUp(this.options.closeSpeed))
        }, Keyboard.prototype.inputLocalOptions = function () {
            var options = {};
            for (var key in this.defaults) {
                var input_option = this.$current_input.attr("data-mlkeyboard-" + key);
                "false" == input_option ? input_option = !1 : "true" == input_option && (input_option = !0), "undefined" != typeof input_option && (options[key] = input_option)
            }
            return options
        }, Keyboard.prototype.printChar = function (char) {
            var selStart = this.$current_input[0].selectionStart,
                selEnd = this.$current_input[0].selectionEnd,
                textAreaStr = this.$current_input.val(),
                value = textAreaStr.substring(0, selStart) + char + textAreaStr.substring(selEnd);
            this.$current_input.val(value).focus(), this.$current_input[0].selectionStart = selStart + 1, this.$current_input[0].selectionEnd = selStart + 1
        }, Keyboard.prototype.deleteChar = function () {
            var selStart = this.$current_input[0].selectionStart,
                selEnd = this.$current_input[0].selectionEnd,
                textAreaStr = this.$current_input.val(),
                after = textAreaStr.substring(0, selStart - 1),
                value = after + textAreaStr.substring(selEnd);
            this.$current_input.val(value).focus(), this.$current_input[0].selectionStart = selStart - 1, this.$current_input[0].selectionEnd = selStart - 1
        }, Keyboard.prototype.showModifications = function (caller) {
            var top, left, width, _this = this,
                holder_padding = parseInt(_this.$modifications_holder.css("padding"), 10);
            $.each(this.modifications, function (i, key) {
                _this.$modifications_holder.append(key.render()), key.setCurrentValue(), key.setCurrentAction()
            }), width = caller.$key.width() * _this.modifications.length + 6 * _this.modifications.length, top = caller.$key.position().top - holder_padding, left = caller.$key.position().left - _this.modifications.length * caller.$key.width() / 2, this.$modifications_holder.one("mouseleave", function () {
                _this.destroyModifications()
            }), this.$modifications_holder.css({
                width: width,
                top: top,
                left: left
            }).show()
        }, Keyboard.prototype.destroyModifications = function () {
            this.$modifications_holder.empty().hide()
        }, Keyboard.prototype.upperRegister = function () {
            return this.active_shift && !this.active_caps || !this.active_shift && this.active_caps
        }, Keyboard.prototype.toggleShift = function (state) {
            this.active_shift = state ? state : !this.active_shift, this.changeKeysState()
        }, Keyboard.prototype.toggleCaps = function (state) {
            this.active_caps = state ? state : !this.active_caps, this.changeKeysState()
        }, Keyboard.prototype.changeKeysState = function () {
            $.each(this.keys, function (_, key) {
                key.setCurrentValue(), key.toggleActiveState()
            })
        }, $.fn.mlKeyboard = function (options) {
            var keyboard = new Keyboard(this.selector, options);
            keyboard.init(), this.each(function () {
                keyboard.setUpFor($(this))
            })
        }
    }(jQuery);
    var mlKeyboard = mlKeyboard || {
        layouts: {}
    };
    mlKeyboard.layouts.en_US = [{
        d: "`",
        u: "~"
}, {
        d: "1",
        u: "!"
}, {
        d: "2",
        u: "@"
}, {
        d: "3",
        u: "#"
}, {
        d: "4",
        u: "$"
}, {
        d: "5",
        u: "%"
}, {
        d: "6",
        u: "^"
}, {
        d: "7",
        u: "&"
}, {
        d: "8",
        u: "*"
}, {
        d: "9",
        u: "("
}, {
        d: "0",
        u: ")"
}, {
        d: "-",
        u: "_"
}, {
        d: "=",
        u: "+"
}, {}, {}, {
        d: "a",
        u: "A"
}, {
        d: "z",
        u: "Z"
}, {
        d: "e",
        u: "E"
}, {
        d: "r",
        u: "R"
}, {
        d: "t",
        u: "T"
}, {
        d: "y",
        u: "Y"
}, {
        d: "u",
        u: "U"
}, {
        d: "i",
        u: "I"
}, {
        d: "o",
        u: "O"
}, {
        d: "p",
        u: "P"
}, {
        d: "]",
        u: "}"
}, {
        d: "[",
        u: "{"
}, {
        d: "\\",
        u: "|"
}, {}, {
        d: "q",
        u: "Q"
}, {
        d: "s",
        u: "S"
}, {
        d: "d",
        u: "D"
}, {
        d: "f",
        u: "F"
}, {
        d: "g",
        u: "G"
}, {
        d: "h",
        u: "H"
}, {
        d: "j",
        u: "J"
}, {
        d: "k",
        u: "K"
}, {
        d: "l",
        u: "L"
}, {
        d: ";",
        u: ":"
}, {
        d: "'",
        u: '"'
}, {}, {}, {
        d: "m",
        u: "M"
}, {
        d: "w",
        u: "W"
}, {
        d: "x",
        u: "X"
}, {
        d: "c",
        u: "C"
}, {
        d: "v",
        u: "V"
}, {
        d: "b",
        u: "B"
}, {
        d: "n",
        u: "N"
}, {
        d: ",",
        u: "<"
}, {
        d: ".",
        u: ">"
}, {
        d: "/",
        u: "?"
}, {}, {}];
    var mlKeyboard = mlKeyboard || {
        layouts: {}
    };

    /* Keyboard css inladen */
    $('head').append(`<link rel="stylesheet" type="text/css" href="${keyboardStylesheet}">`);

    $('input').mlKeyboard({
        layout: 'en_US',
        enabled: true
            /* Trigger niet nodig, demonstratie enkel */
    });

}
