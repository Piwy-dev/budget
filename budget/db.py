"""
This module contains all functions that communicates with the database.
"""
import sqlite3
from flask import current_app, g
from flask.cli import with_appcontext
import click
from datetime import datetime


def get_db():
    """
    Get the database connection if it exists, otherwise create it.
    """
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
    g.db.row_factory = sqlite3.Row
    return g.db


def close_db(e=None):
    """
    Close the database connection if it exists.
    """
    db = g.pop('db', None)

    if db is not None:
        db.close()


def init_db():
    """
    Initialize the database.
    """
    # Create the database
    db = get_db()
    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))
    
    # add 0 to the bank and cash accounts if they don't exist
    bank = db.execute(
        'SELECT amount FROM bank'
    ).fetchone()
    cash = db.execute(
        'SELECT amount FROM cash'
    ).fetchone()
    if bank is None:
        db.execute(
            'INSERT INTO bank (amount) VALUES (0)'
        )
    if cash is None:
        db.execute(
            'INSERT INTO cash (amount) VALUES (0)'
        )
    db.commit()
    

def init_app(app):
    """
    Register the database functions with the Flask app.
    """
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)


def add_activity(type: str, title: str, account: str, amount: int, label: str, date: datetime):
    """
    Add an activity to the database.

    Args:
    - `type`: The type of the activity (expense or revenue)
    - `title`: The title of the activity.
    - `amount`: The amount of the activity.
    - `label`: The label of the activity.
    - `date`: The date of the activity.
    """
    db = get_db()
    db.execute(
        f'INSERT INTO {type} (title, account, amount, label, date) VALUES (?, ?, ?, ?, ?)',
        (title, account, amount, label, date)
    )
    db.commit()


def get_activities():
    """
    Get all activities from the database.
    """
    db = get_db()
    activities = db.execute(
        'SELECT * FROM activity ORDER BY date DESC'
    ).fetchall()
    activities = [dict(activity) for activity in activities]
    return activities


def modify_budget(account: str, amount: int):
    """
    Modify the budget of an account.

    Args:
    - `account`: The account to modify.
    - `amount`: The amount to modify the account by.
    """
    db = get_db()
    if account == 'bank':
        db.execute(
            'UPDATE bank SET amount = ?', (amount,)
        )
    else:
        db.execute(
            'UPDATE cash SET amount = ?', (amount,)
        )
    db.commit()


def get_budget():
    """
    Get the budget of the bank and cash accounts.
    """
    db = get_db()
    bank = db.execute(
        'SELECT amount FROM bank'
    ).fetchone()
    cash = db.execute(
        'SELECT amount FROM cash'
    ).fetchone()
    bank = dict(bank)['amount']
    cash = dict(cash)['amount']
    return bank, cash


def get_expenses():
    """
    Get the expenses from the database then calculate the percentage of each expense category.
    """
    db = get_db()
    expenses = db.execute(
        'SELECT * FROM expense'
    ).fetchall()
    expenses = [dict(expense) for expense in expenses]

    total_expenses = 0
    for expense in expenses:
        total_expenses += expense['amount']

    expenses_percentages = {"food": 0, "clothes": 0, "wifi": 0, "entertainment": 0,"scouts": 0, "asbo": 0, "transport": 0, "travel": 0, "other": 0}
    for expense in expenses:
        expenses_percentages[expense['label']] = round(expense['amount']/total_expenses * 100, 2)
    return expenses_percentages


def get_revenues():
    """
    Get the revenues from the database then calculate the percentage of each revenue category.
    """
    db = get_db()
    revenues = db.execute(
        'SELECT * FROM revenue'
    ).fetchall()
    revenues = [dict(revenue) for revenue in revenues]

    total_revenues = 0
    for revenue in revenues:
        total_revenues += revenue['amount']

    revenues_percentages = {"salary": 0, "other": 0}
    for revenue in revenues:
        revenues_percentages[revenue['label']] = round(revenue['amount']/total_revenues * 100, 2)
    return revenues_percentages


@click.command('init-db')
@with_appcontext
def init_db_command():
    """
    CLI command to initialize the database.
    """
    init_db()
    click.echo('Initialized the database.')