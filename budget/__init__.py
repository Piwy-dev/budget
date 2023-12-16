import os
from flask import Flask, render_template, g, current_app, redirect, request
from budget import db


def create_app(test_config=None):
    """
    Create and configure the app.
    """
    app = Flask(__name__, template_folder='static/templates')
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path,'db.sqlite'),
    )

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass


   # create the pages
    @app.route("/")
    def home():
        return render_template('home.html')
    
    @app.route("/activity-add", methods=['GET', 'POST'])
    def activity_add():
        if request.method == 'POST':
            return redirect('/activity-add')
        return render_template('activity-add.html')
    
    db.init_app(app)

    with app.app_context():
        db.init_db()

    return app
