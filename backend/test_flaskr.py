import unittest
from flask_sqlalchemy import SQLAlchemy

from flaskr import create_app
from backend.models import setup_db


class TriviaTestCase(unittest.TestCase):
    """This class represents the trivia test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "trivia_test"
        self.database_path = 'postgresql://{}/{}'.format('postgres:0312@localhost:5432', self.database_name)
        setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()
    
    def tearDown(self):
        """Executed after reach test"""
        pass

    """
    TODO
    Write at least one test for each test for successful operation and for expected errors.
    """
    def test_get_questions(self):
        res = self.client().get('/api/questions?page=1')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue('success' in data)
        self.assertTrue('current_category' in data)
        self.assertTrue('categories' in data)
        self.assertTrue('questions' in data)
        self.assertTrue('total_questions' in data)

        res = self.client().get('/api/questions?page=999')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue(len(data.get('questions', [])) == 0)

    def test_get_category_questions(self):
        res = self.client().get('/api/categories/1/questions')
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue('success' in data)
        self.assertTrue(data.get('success', False))
        self.assertTrue('questions' in data)
        self.assertTrue('total_questions' in data)
        self.assertTrue('current_category' in data)

        for q in data.get('questions'):
            self.assertEqual(q.get('category'), 1)

        res = self.client().get('/api/categories/-1/questions')
        self.assertEqual(res.status_code, 404)

    def test_add_questions(self):
        pass

    def test_get_quiz_question(self):
        res = self.client().post('/api/quizzes', json={
            'previous_questions': [],
            'quiz_category': {
                'id': 1, 'type': 'science'
            }
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue('success' in data)
        self.assertTrue('question' in data)
        self.assertTrue(len(data.get('question', [])) > 0)

        res = self.client().post('/api/quizzes', json={
            'previous_questions': [],
            'quiz_category': {
                'id': 0, 'type': 'all'
            }
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue('success' in data)
        self.assertTrue(data.get('success', False))
        self.assertTrue('question' in data)
        self.assertTrue(len(data.get('question', [])) > 0)

    def test_question_search(self):
        res = self.client().post('/api/questions/search',
                                 json={
                                     'searchTerm': 'This does not exist'
                                 })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue('success' in data)
        self.assertTrue(data.get('success', False))
        self.assertTrue('search' in data)
        self.assertEqual(data.get('search', ''), 'This does not exist')
        self.assertTrue('questions' in data)
        self.assertTrue('total_questions' in data)
        self.assertEqual(data.get('total_questions', 0), 0)

        res = self.client().post('/api/questions/search',
                                 json={
                                     'searchTerm': 'movie'
                                 })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertTrue('success' in data)
        self.assertTrue(data.get('success', False))
        self.assertTrue('search' in data)
        self.assertEqual(data.get('search', ''), 'movie')
        self.assertTrue('questions' in data)
        self.assertTrue('total_questions' in data)
        self.assertTrue(data.get('total_questions', 0) > 0)

# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()