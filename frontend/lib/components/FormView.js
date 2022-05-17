"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

require("../stylesheets/FormView.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormView = /*#__PURE__*/function (_Component) {
  _inherits(FormView, _Component);

  var _super = _createSuper(FormView);

  function FormView(props) {
    var _this;

    _classCallCheck(this, FormView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "submitQuestion", function (event) {
      event.preventDefault();

      _jquery.default.ajax({
        url: '/questions',
        //DONE: update request URL
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          question: _this.state.question,
          answer: _this.state.answer,
          difficulty: _this.state.difficulty,
          category: _this.state.category
        }),
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function success(result) {
          document.getElementById('add-question-form').reset();
          return;
        },
        error: function error(_error) {
          alert('Unable to add question. Please try your request again');
          return;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      _this.setState(_defineProperty({}, event.target.name, event.target.value));
    });

    _this.state = {
      question: '',
      answer: '',
      difficulty: 1,
      category: 1,
      categories: {}
    };
    return _this;
  }

  _createClass(FormView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _jquery.default.ajax({
        url: "/categories",
        //DONE: update request URL
        type: 'GET',
        success: function success(result) {
          _this2.setState({
            categories: result.categories
          });

          return;
        },
        error: function error(_error2) {
          alert('Unable to load categories. Please try your request again');
          return;
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement("div", {
        id: "add-form"
      }, _react.default.createElement("h2", null, "Add a New Trivia Question"), _react.default.createElement("form", {
        className: "form-view",
        id: "add-question-form",
        onSubmit: this.submitQuestion
      }, _react.default.createElement("label", null, "Question", _react.default.createElement("input", {
        type: "text",
        name: "question",
        onChange: this.handleChange
      })), _react.default.createElement("label", null, "Answer", _react.default.createElement("input", {
        type: "text",
        name: "answer",
        onChange: this.handleChange
      })), _react.default.createElement("label", null, "Difficulty", _react.default.createElement("select", {
        name: "difficulty",
        onChange: this.handleChange
      }, _react.default.createElement("option", {
        value: "1"
      }, "1"), _react.default.createElement("option", {
        value: "2"
      }, "2"), _react.default.createElement("option", {
        value: "3"
      }, "3"), _react.default.createElement("option", {
        value: "4"
      }, "4"), _react.default.createElement("option", {
        value: "5"
      }, "5"))), _react.default.createElement("label", null, "Category", _react.default.createElement("select", {
        name: "category",
        onChange: this.handleChange
      }, Object.keys(this.state.categories).map(function (id) {
        return _react.default.createElement("option", {
          key: id,
          value: id
        }, _this3.state.categories[id]);
      }))), _react.default.createElement("input", {
        type: "submit",
        className: "button",
        value: "Submit"
      })));
    }
  }]);

  return FormView;
}(_react.Component);

var _default = FormView;
exports.default = _default;