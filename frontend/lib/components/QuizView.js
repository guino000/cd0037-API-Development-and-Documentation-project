"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

require("../stylesheets/QuizView.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var questionsPerPlay = 5;

var QuizView = /*#__PURE__*/function (_Component) {
  _inherits(QuizView, _Component);

  var _super = _createSuper(QuizView);

  function QuizView(props) {
    var _this;

    _classCallCheck(this, QuizView);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "selectCategory", function (_ref) {
      var type = _ref.type,
          _ref$id = _ref.id,
          id = _ref$id === void 0 ? 0 : _ref$id;

      _this.setState({
        quizCategory: {
          type: type,
          id: id
        }
      }, _this.getNextQuestion);
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      _this.setState(_defineProperty({}, event.target.name, event.target.value));
    });

    _defineProperty(_assertThisInitialized(_this), "getNextQuestion", function () {
      var previousQuestions = _toConsumableArray(_this.state.previousQuestions);

      if (_this.state.currentQuestion.id) {
        previousQuestions.push(_this.state.currentQuestion.id);
      }

      _jquery.default.ajax({
        url: '/quizzes',
        //DONE: update request URL
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          previous_questions: previousQuestions,
          quiz_category: _this.state.quizCategory
        }),
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        success: function success(result) {
          _this.setState({
            showAnswer: false,
            previousQuestions: previousQuestions,
            currentQuestion: result.question,
            guess: '',
            forceEnd: result.question ? false : true
          });

          return;
        },
        error: function error(_error) {
          alert('Unable to load question. Please try your request again');
          return;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "submitGuess", function (event) {
      event.preventDefault();

      var evaluate = _this.evaluateAnswer();

      _this.setState({
        numCorrect: !evaluate ? _this.state.numCorrect : _this.state.numCorrect + 1,
        showAnswer: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "restartGame", function () {
      _this.setState({
        quizCategory: null,
        previousQuestions: [],
        showAnswer: false,
        numCorrect: 0,
        currentQuestion: {},
        guess: '',
        forceEnd: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "evaluateAnswer", function () {
      var formatGuess = _this.state.guess // eslint-disable-next-line
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();

      var answerArray = _this.state.currentQuestion.answer.toLowerCase().split(' ');

      return answerArray.every(function (el) {
        return formatGuess.includes(el);
      });
    });

    _this.state = {
      quizCategory: null,
      previousQuestions: [],
      showAnswer: false,
      categories: {},
      numCorrect: 0,
      currentQuestion: {},
      guess: '',
      forceEnd: false
    };
    return _this;
  }

  _createClass(QuizView, [{
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
    key: "renderPrePlay",
    value: function renderPrePlay() {
      var _this3 = this;

      return _react.default.createElement("div", {
        className: "quiz-play-holder"
      }, _react.default.createElement("div", {
        className: "choose-header"
      }, "Choose Category"), _react.default.createElement("div", {
        className: "category-holder"
      }, _react.default.createElement("div", {
        className: "play-category",
        onClick: this.selectCategory
      }, "ALL"), Object.keys(this.state.categories).map(function (id) {
        return _react.default.createElement("div", {
          key: id,
          value: id,
          className: "play-category",
          onClick: function onClick() {
            return _this3.selectCategory({
              type: _this3.state.categories[id],
              id: id
            });
          }
        }, _this3.state.categories[id]);
      })));
    }
  }, {
    key: "renderFinalScore",
    value: function renderFinalScore() {
      return _react.default.createElement("div", {
        className: "quiz-play-holder"
      }, _react.default.createElement("div", {
        className: "final-header"
      }, "Your Final Score is ", this.state.numCorrect), _react.default.createElement("div", {
        className: "play-again button",
        onClick: this.restartGame
      }, "Play Again?"));
    }
  }, {
    key: "renderCorrectAnswer",
    value: function renderCorrectAnswer() {
      var evaluate = this.evaluateAnswer();
      return _react.default.createElement("div", {
        className: "quiz-play-holder"
      }, _react.default.createElement("div", {
        className: "quiz-question"
      }, this.state.currentQuestion.question), _react.default.createElement("div", {
        className: "".concat(evaluate ? 'correct' : 'wrong')
      }, evaluate ? 'You were correct!' : 'You were incorrect'), _react.default.createElement("div", {
        className: "quiz-answer"
      }, this.state.currentQuestion.answer), _react.default.createElement("div", {
        className: "next-question button",
        onClick: this.getNextQuestion
      }, ' ', "Next Question", ' '));
    }
  }, {
    key: "renderPlay",
    value: function renderPlay() {
      return this.state.previousQuestions.length === questionsPerPlay || this.state.forceEnd ? this.renderFinalScore() : this.state.showAnswer ? this.renderCorrectAnswer() : _react.default.createElement("div", {
        className: "quiz-play-holder"
      }, _react.default.createElement("div", {
        className: "quiz-question"
      }, this.state.currentQuestion.question), _react.default.createElement("form", {
        onSubmit: this.submitGuess
      }, _react.default.createElement("input", {
        type: "text",
        name: "guess",
        onChange: this.handleChange
      }), _react.default.createElement("input", {
        className: "submit-guess button",
        type: "submit",
        value: "Submit Answer"
      })));
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.quizCategory ? this.renderPlay() : this.renderPrePlay();
    }
  }]);

  return QuizView;
}(_react.Component);

var _default = QuizView;
exports.default = _default;