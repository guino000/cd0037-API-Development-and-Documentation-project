"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("../stylesheets/App.css");

var _Question = _interopRequireDefault(require("./Question"));

var _Search = _interopRequireDefault(require("./Search"));

var _jquery = _interopRequireDefault(require("jquery"));

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

var QuestionView = /*#__PURE__*/function (_Component) {
  _inherits(QuestionView, _Component);

  var _super = _createSuper(QuestionView);

  function QuestionView() {
    var _this;

    _classCallCheck(this, QuestionView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "getQuestions", function () {
      _jquery.default.ajax({
        url: "/questions?page=".concat(_this.state.page),
        //DONE: update request URL
        type: 'GET',
        success: function success(result) {
          _this.setState({
            questions: result.questions,
            totalQuestions: result.total_questions,
            categories: result.categories,
            currentCategory: result.current_category
          });

          return;
        },
        error: function error(_error) {
          alert('Unable to load questions. Please try your request again');
          return;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getByCategory", function (id) {
      _jquery.default.ajax({
        url: "/categories/".concat(id, "/questions"),
        //DONE: update request URL
        type: 'GET',
        success: function success(result) {
          _this.setState({
            questions: result.questions,
            totalQuestions: result.total_questions,
            currentCategory: result.current_category
          });

          return;
        },
        error: function error(_error2) {
          alert('Unable to load questions. Please try your request again');
          return;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "submitSearch", function (searchTerm) {
      _jquery.default.ajax({
        url: "/questions/search",
        //DONE: update request URL
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          searchTerm: searchTerm
        }),
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function success(result) {
          _this.setState({
            questions: result.questions,
            totalQuestions: result.total_questions,
            currentCategory: result.current_category
          });

          return;
        },
        error: function error(_error3) {
          alert('Unable to load questions. Please try your request again');
          return;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "questionAction", function (id) {
      return function (action) {
        if (action === 'DELETE') {
          if (window.confirm('are you sure you want to delete the question?')) {
            _jquery.default.ajax({
              url: "/questions/".concat(id),
              //DONE: update request URL
              type: 'DELETE',
              success: function success(result) {
                _this.getQuestions();
              },
              error: function error(_error4) {
                alert('Unable to load questions. Please try your request again');
                return;
              }
            });
          }
        }
      };
    });

    _this.state = {
      questions: [],
      page: 1,
      totalQuestions: 0,
      categories: {},
      currentCategory: null
    };
    return _this;
  }

  _createClass(QuestionView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getQuestions();
    }
  }, {
    key: "selectPage",
    value: function selectPage(num) {
      var _this2 = this;

      this.setState({
        page: num
      }, function () {
        return _this2.getQuestions();
      });
    }
  }, {
    key: "createPagination",
    value: function createPagination() {
      var _this3 = this;

      var pageNumbers = [];
      var maxPage = Math.ceil(this.state.totalQuestions / 10);

      var _loop = function _loop(i) {
        pageNumbers.push(_react.default.createElement("span", {
          key: i,
          className: "page-num ".concat(i === _this3.state.page ? 'active' : ''),
          onClick: function onClick() {
            _this3.selectPage(i);
          }
        }, i));
      };

      for (var i = 1; i <= maxPage; i++) {
        _loop(i);
      }

      return pageNumbers;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react.default.createElement("div", {
        className: "question-view"
      }, _react.default.createElement("div", {
        className: "categories-list"
      }, _react.default.createElement("h2", {
        onClick: function onClick() {
          _this4.getQuestions();
        }
      }, "Categories"), _react.default.createElement("ul", null, Object.entries(this.state.categories).map(function (category) {
        var _category$type, _category$type2;

        return _react.default.createElement("li", {
          key: category.id,
          onClick: function onClick() {
            _this4.getByCategory(category.id);
          }
        }, category.type, _react.default.createElement("img", {
          className: "category",
          alt: "".concat((_category$type = category.type) === null || _category$type === void 0 ? void 0 : _category$type.toString().toLowerCase()),
          src: "".concat((_category$type2 = category.type) === null || _category$type2 === void 0 ? void 0 : _category$type2.toString().toLowerCase(), ".svg")
        }));
      })), _react.default.createElement(_Search.default, {
        submitSearch: this.submitSearch
      })), _react.default.createElement("div", {
        className: "questions-list"
      }, _react.default.createElement("h2", null, "Questions"), this.state.questions.map(function (q, ind) {
        return _react.default.createElement(_Question.default, {
          key: q.id,
          question: q.question,
          answer: q.answer,
          category: _this4.state.categories[q.category],
          difficulty: q.difficulty,
          questionAction: _this4.questionAction(q.id)
        });
      }), _react.default.createElement("div", {
        className: "pagination-menu"
      }, this.createPagination())));
    }
  }]);

  return QuestionView;
}(_react.Component);

var _default = QuestionView;
exports.default = _default;