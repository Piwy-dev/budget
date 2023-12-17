import os
from flask import Flask, render_template, g, current_app, redirect, request
from budget import db
from datetime import datetime


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
        bank, cash = db.get_budget()
        return render_template('home.html', bank=bank, cash=cash)
    
    @app.route("/activity-add", methods=['GET', 'POST'])
    def activity_add():
        if request.method == 'POST':
            title = request.form.get('title')
            type = request.form.get('type')
            amount = request.form.get('amount')
            label = request.form.get('label')
            date = datetime.strptime(request.form.get('date'), '%Y-%m-%d')

            db.add_activity(title, type, amount, label, date)

            return redirect('/')
        return render_template('activity-add.html')
    
    @app.route("/budget-modify", methods=['GET', 'POST'])
    def budget_modify():
        if request.method == 'POST':
            account = request.form.get('account')
            amount = request.form.get('amount')

            db.modify_budget(account, amount)

            return redirect('/')
        return render_template('budget-modify.html')
    
    db.init_app(app)

    with app.app_context():
        db.init_db()

    return app
