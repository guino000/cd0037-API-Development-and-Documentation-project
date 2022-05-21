from flask import Flask, abort, jsonify, request
from flask_cors import CORS

from backend.models import setup_db, Category, Question

QUESTIONS_PER_PAGE = 10


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    setup_db(app)
    app.current_category = None

    """
    @DONE: Set up CORS. Allow '*' for origins. Delete the sample route after completing the TODOs
    """
    CORS(app)

    """
    @DONE: Use the after_request decorator to set Access-Control-Allow
    """
    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        response.headers.add('Access-Control-Allow-Headers', 'GET, POST, PATCH, DELETE, OPTIONS')
        return response

    """
    @DONE:
    Create an endpoint to handle GET requests
    for all available categories.
    """
    @app.route('/api/categories', methods=['GET'])
    def get_categories():
        categories = [c.format() for c in Category.query.all()]

        if len(categories) == 0:
            abort(404)

        return jsonify({
            'success': True,
            'categories': categories,
            'total_categories': len(categories)
        })

    """
    @DONE:
    Create an endpoint to handle GET requests for questions,
    including pagination (every 10 questions).
    This endpoint should return a list of questions,
    number of total questions, current category, categories.

    @DONE: TEST: At this point, when you start the application
    you should see questions and categories generated,
    ten questions per page and pagination at the bottom of the screen for three pages.
    Clicking on the page numbers should update the questions.
    """

    def paginate_questions(request, selection):
        page = request.args.get('page', 1, type=int)
        start = (page - 1) * QUESTIONS_PER_PAGE
        end = start + QUESTIONS_PER_PAGE

        questions = [question.format() for question in selection]

        return questions[start:end]

    @app.route('/api/questions', methods=['GET'])
    def get_questions():
        categories = [c.format() for c in Category.query.all()]
        if len(categories) == 0:
            abort(404)

        if app.current_category is None:
            category_questions = Question.query.all()
        else:
            category_questions = Question.query.filter(Question.category == app.current_category['type']).all()
        if len(category_questions) == 0:
            abort(404)

        current_questions = paginate_questions(request, category_questions)

        return jsonify({
            'success': True,
            'current_category': app.current_category.format() if app.current_category else None,
            'categories': categories,
            'questions': current_questions,
            'total_questions': len(category_questions)
        })

    """
    @DONE:
    Create an endpoint to DELETE question using a question ID.

    @TODO: TEST: When you click the trash icon next to a question, the question will be removed.
    This removal will persist in the database and when you refresh the page.
    """

    @app.route('/api/questions/<int:question_id>', methods=['DELETE'])
    def delete_question(question_id):
        try:
            question = Question.query.filter(Question.id == question_id).one_or_none()

            if question is None:
                abort(404)

            question.delete()
            selection = [q.format() for q in Question.query.order_by(Question.id).all()]

            return jsonify({
                'success': True,
                'deleted': question_id,
                'questions': selection,
                'total_questions': len(selection)
            })

        except:
            abort(422)

    """
    @DONE:
    Create an endpoint to POST a new question,
    which will require the question and answer text,
    category, and difficulty score.

    @TODO: TEST: When you submit a question on the "Add" tab,
    the form will clear and the question will appear at the end of the last page
    of the questions list in the "List" tab.
    """

    @app.route('/api/questions', methods=['POST'])
    def create_question():
        body = request.get_json()

        new_question = body.get('question', None)
        new_answer = body.get('answer', None)
        new_category = body.get('category', None)
        new_difficulty = body.get('difficulty', None)

        try:
            question = Question(
                new_question,
                new_answer,
                new_category,
                new_difficulty
            )
            question.insert()

            selection = [q.format() for q in Question.query.order_by(Question.id).all()]

            return jsonify({
                'success': True,
                'created': question.id,
                'questions': selection,
                'total_questions': len(selection)
            })
        except:
            abort(422)

    """
    @DONE:
    Create a POST endpoint to get questions based on a search term.
    It should return any questions for whom the search term
    is a substring of the question.

    @DONE: TEST: Search by any phrase. The questions list will update to include
    only question that include that string within their question.
    Try using the word "title" to start.
    """

    @app.route('/api/questions/search', methods=['POST'])
    def search_questions():
        body = request.get_json()
        search_term: str = body.get('searchTerm', None)
        selection = None
        if search_term is None:
            selection = Question.query.all()
        else:
            selection = Question.query.filter(Question.question.ilike("%{}%".format(search_term)))

        selection = [q.format() for q in selection]

        return jsonify({
            'success': True,
            'search': search_term,
            'questions': selection,
            'total_questions': len(selection)
        })

    """
    @DONE:
    Create a GET endpoint to get questions based on category.

    @DONE: TEST: In the "List" tab / main screen, clicking on one of the
    categories in the left column will cause only questions of that
    category to be shown.
    """

    @app.route('/api/categories/<int:category_id>/questions', methods=['GET'])
    def get_category_questions(category_id):
        category = Category.query.filter(Category.id == category_id).one_or_none()
        if category is None:
            abort(404)

        category_questions = [q.format() for q in Question.query.filter(Question.category == category.id).all()]
        if len(category_questions) == 0:
            abort(404)

        return jsonify({
            'success': True,
            'current_category': app.current_category.format() if app.current_category else None,
            'questions': category_questions,
            'total_questions': len(category_questions)
        })

    """
    @DONE:
    Create a POST endpoint to get questions to play the quiz.
    This endpoint should take category and previous question parameters
    and return a random questions within the given category,
    if provided, and that is not one of the previous questions.

    @DONE: TEST: In the "Play" tab, after a user selects "All" or a category,
    one question at a time is displayed, the user is allowed to answer
    and shown whether they were correct or not.
    """

    @app.route('/api/quizzes', methods=['POST'])
    def get_quiz_questions():
        body = request.get_json()
        previous_questions = body.get('previous_questions', None)
        quiz_category = body.get('quiz_category', None)

        if quiz_category is None:
            quiz_category = {'id': 0, 'type': 'all'}

        if quiz_category['id'] == 0 and quiz_category['type'] == 'all':
            next_question = Question.query.filter(
                Question.id.notin_(previous_questions)
            ).first()
        else:
            app.current_category = quiz_category
            next_question = Question.query.filter(
                Question.category == quiz_category['id'],
                Question.id.notin_(previous_questions)
            ).first()

        return jsonify({
            'success': True,
            'question': next_question.format() if next_question else None
        })

    """
    @DONE:
    Create error handlers for all expected errors
    including 404 and 422.
    """

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "success": False,
            "error": 404,
            "message": "resource not found"
        }), 404

    @app.errorhandler(422)
    def unprocessable(error):
        return jsonify({
            "success": False,
            "error": 422,
            "message": "unprocessable"
        }), 422

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            "success": False,
            "error": 400,
            "message": "bad request"
        }), 400

    return app
