"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_PublicRepository_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/PublicRepository.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/PublicRepository.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      items: [],
      username: '',
      page: 1,
      max: 3,
      color: 'success',
      curRoute: 'github'
    };
  },
  methods: {
    openNotification: function openNotification() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var color = arguments.length > 1 ? arguments[1] : undefined;
      var icon = arguments.length > 2 ? arguments[2] : undefined;
      var text = arguments.length > 3 ? arguments[3] : undefined;
      var noti = this.$vs.notification({
        progress: 'auto',
        icon: icon,
        color: color,
        position: position,
        title: 'Successful operation',
        text: "".concat(text)
      });
    },
    deleteRepo: function deleteRepo(reponame) {
      var _this = this;
      fetch("/api/user/".concat(this.$route.params.name, "/repos/").concat(reponame, "/delete/").concat(localStorage.getItem('token'))).then(function (response) {
        return response.json();
      }).then(function (data) {
        var index = _this.items.indexOf(_this.items.find(function (x) {
          return x.name === reponame;
        }));
        if (index > -1) {
          _this.items.splice(index, 1);
        }
        _this.openNotification('top-right', 'danger', "<i class='bx bx-error' ></i>", 'Repository successfully has been deleted');
      });
    },
    updateVisibility: function updateVisibility(reponame, visibility) {
      var _this2 = this;
      var newVisibility = visibility == 'private' ? 'public' : 'private';
      fetch("/api/user/".concat(this.$route.params.name, "/repos/").concat(reponame, "/update/").concat(newVisibility, "/").concat(localStorage.getItem('token'))).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.items.find(function (x) {
          return x.name === reponame;
        }).visibility = newVisibility;
        _this2.openNotification('top-right', 'success', "<i class='bx bx-select-multiple' ></i>", 'Repository visibility successfully has been changed');
      });
    }
  },
  mounted: function mounted() {
    var _this3 = this;
    this.username = this.$route.params.name;
    var isAuth = false;
    if (this.isLogged) {
      if (this.$route.params.name == this.user.login) {
        isAuth = true;
      }
    }
    if (isAuth) {
      this.curRoute = 'yourRepo';
      fetch("/api/user/".concat(this.$route.params.name, "/repos/").concat(this.page, "/").concat(localStorage.getItem('token'))).then(function (response) {
        return response.json();
      }).then(function (data) {
        return _this3.items = data;
      });
      fetch("/api/user/reposPage/".concat(localStorage.getItem('token'))).then(function (response) {
        return response.json();
      }).then(function (data) {
        return _this3.max = data;
      });
    } else {
      fetch("/api/user/".concat(this.$route.params.name, "/repos/").concat(this.page)).then(function (response) {
        return response.json();
      }).then(function (data) {
        return _this3.items = data;
      });
      fetch("/api/user/".concat(this.$route.params.name, "/reposPage")).then(function (response) {
        return response.json();
      }).then(function (data) {
        return _this3.max = data;
      });
    }
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapGetters)(['isLogged', 'user'])),
  watch: {
    page: function page(val) {
      var _this4 = this;
      if (val) {
        var isAuth = false;
        if (this.isLogged) {
          if (this.$route.params.name == this.user.login) {
            isAuth = true;
          }
        }
        if (isAuth) {
          fetch("/api/user/".concat(this.$route.params.name, "/repos/").concat(val, "/").concat(localStorage.getItem('token'))).then(function (response) {
            return response.json();
          }).then(function (data) {
            return _this4.items = data;
          });
        } else {
          fetch("/api/user/".concat(this.$route.params.name, "/repos/").concat(val)).then(function (response) {
            return response.json();
          }).then(function (data) {
            return _this4.items = data;
          });
        }
        // fetch(`/api/user/${this.$route.params.name}/repos/${val}`)
        //   .then(response => response.json())
        //   .then(data => this.items = data);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/PublicRepository.vue?vue&type=template&id=16f9429c&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/PublicRepository.vue?vue&type=template&id=16f9429c& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "container card-container justify-content-center"
  }, [_c("h2", {
    staticClass: "my-5"
  }, [_vm._v("Public Repository")]), _vm._v(" "), _vm.isLogged ? _c("div", [this.$route.params.name == this.user.login ? _c("div", [_c("side-bar-component", {
    attrs: {
      route: "yourRepo"
    }
  })], 1) : _vm._e(), _vm._v(" "), this.$route.params.name != this.user.login ? _c("div", [_c("side-bar-component", {
    attrs: {
      route: "github"
    }
  })], 1) : _vm._e()]) : _vm._e(), _vm._v(" "), !_vm.isLogged ? _c("div", [_c("side-bar-component", {
    attrs: {
      route: "github"
    }
  })], 1) : _vm._e(), _vm._v(" "), _c("vs-table", {
    scopedSlots: _vm._u([{
      key: "thead",
      fn: function fn() {
        return [_c("vs-tr", [_c("vs-th", [_vm._v("\n          Name\n        ")]), _vm._v(" "), _c("vs-th", [_vm._v("\n          Visibility\n        ")]), _vm._v(" "), _c("vs-th", [_vm._v("\n          Language\n        ")]), _vm._v(" "), _c("vs-th", [_vm._v("\n          Description\n        ")])], 1)];
      },
      proxy: true
    }, {
      key: "tbody",
      fn: function fn() {
        return _vm._l(_vm.items, function (tr, i) {
          return _c("vs-tr", {
            key: i,
            scopedSlots: _vm._u([{
              key: "expand",
              fn: function fn() {
                return [_c("div", {
                  staticClass: "con-content d-flex justify-content-between"
                }, [_c("div", {
                  staticClass: "d-flex"
                }, [_c("vs-avatar", [_c("img", {
                  attrs: {
                    src: tr.owner.avatar_url,
                    alt: ""
                  }
                })]), _vm._v(" "), _c("p", {
                  staticClass: "fs-2 ms-3 mb-0"
                }, [_vm._v("\n                " + _vm._s(tr.owner.login) + "\n              ")])], 1), _vm._v(" "), _vm.isLogged ? _c("div", [tr.owner.login == _vm.user.login ? _c("div", {
                  staticClass: "d-flex"
                }, [_c("vs-button", {
                  attrs: {
                    flat: "",
                    icon: ""
                  },
                  on: {
                    click: function click($event) {
                      return _vm.updateVisibility(tr.name, tr.visibility);
                    }
                  }
                }, [tr.visibility == "private" ? _c("div", [_c("i", {
                  staticClass: "bx bx-lock-open-alt"
                })]) : _vm._e(), _vm._v(" "), tr.visibility != "private" ? _c("div", [_c("i", {
                  staticClass: "bx bx-lock-alt"
                })]) : _vm._e()]), _vm._v(" "), _c("vs-button", {
                  attrs: {
                    flat: "",
                    icon: ""
                  }
                }, [_c("vs-tooltip", {
                  attrs: {
                    loading: ""
                  },
                  scopedSlots: _vm._u([{
                    key: "tooltip",
                    fn: function fn() {
                      return undefined;
                    },
                    proxy: true
                  }], null, true)
                }, [_vm._v("\n                    funny button\n                    ")])], 1), _vm._v(" "), _c("vs-button", {
                  attrs: {
                    border: "",
                    danger: ""
                  },
                  on: {
                    click: function click($event) {
                      return _vm.deleteRepo(tr.name);
                    }
                  }
                }, [_vm._v("\n                  Delete\n                ")])], 1) : _vm._e()]) : _vm._e()])];
              },
              proxy: true
            }], null, true)
          }, [_c("vs-td", [_c("a", {
            attrs: {
              href: "".concat(tr.html_url)
            }
          }, [_vm._v("\n            " + _vm._s(tr.name) + "\n          ")])]), _vm._v(" "), _c("vs-td", [_vm._v("\n          " + _vm._s(tr.visibility) + "\n        ")]), _vm._v(" "), _c("vs-td", [_vm._v("\n          " + _vm._s(tr.language == null ? "not set" : tr.language) + "\n        ")]), _vm._v(" "), _c("vs-td", [_vm._v("\n          " + _vm._s(tr.description == null ? "not set" : tr.description) + "\n        ")])], 1);
        });
      },
      proxy: true
    }])
  }), _vm._v(" "), _c("div", {
    staticClass: "center con-pagination"
  }, [_c("vs-pagination", {
    attrs: {
      color: _vm.color,
      length: _vm.max
    },
    model: {
      value: _vm.page,
      callback: function callback($$v) {
        _vm.page = $$v;
      },
      expression: "page"
    }
  })], 1)], 1);
};
var staticRenderFns = [];
render._withStripped = true;


/***/ }),

/***/ "./resources/js/pages/PublicRepository.vue":
/*!*************************************************!*\
  !*** ./resources/js/pages/PublicRepository.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PublicRepository_vue_vue_type_template_id_16f9429c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PublicRepository.vue?vue&type=template&id=16f9429c& */ "./resources/js/pages/PublicRepository.vue?vue&type=template&id=16f9429c&");
/* harmony import */ var _PublicRepository_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PublicRepository.vue?vue&type=script&lang=js& */ "./resources/js/pages/PublicRepository.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PublicRepository_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PublicRepository_vue_vue_type_template_id_16f9429c___WEBPACK_IMPORTED_MODULE_0__.render,
  _PublicRepository_vue_vue_type_template_id_16f9429c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/PublicRepository.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/pages/PublicRepository.vue?vue&type=script&lang=js&":
/*!**************************************************************************!*\
  !*** ./resources/js/pages/PublicRepository.vue?vue&type=script&lang=js& ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicRepository_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PublicRepository.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/PublicRepository.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicRepository_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/PublicRepository.vue?vue&type=template&id=16f9429c&":
/*!********************************************************************************!*\
  !*** ./resources/js/pages/PublicRepository.vue?vue&type=template&id=16f9429c& ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicRepository_vue_vue_type_template_id_16f9429c___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicRepository_vue_vue_type_template_id_16f9429c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PublicRepository_vue_vue_type_template_id_16f9429c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PublicRepository.vue?vue&type=template&id=16f9429c& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/lib/loaders/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/pages/PublicRepository.vue?vue&type=template&id=16f9429c&");


/***/ })

}]);