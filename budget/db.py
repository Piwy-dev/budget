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
    db = get_db()
    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))
    

def init_app(app):
    """
    Register the database functions with the Flask app.
    """
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)


def add_activity(title: str, type: str, amount: int, label: str, date: datetime):
    """
    Add an activity to the database.

    Args:
    - `title`: The title of the activity.
    - `type`: The type of the activity.
    - `amount`: The amount of the activity.
    - `label`: The label of the activity.
    - `date`: The date of the activity.
    """
    db = get_db()
    db.execute(
        'INSERT INTO activity (title, type, amount, label, date) VALUES (?, ?, ?, ?, ?)',
        (title, type, amount, label, date)
    )


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


@click.command('init-db')
@with_appcontext
def init_db_command():
    """
    CLI command to initialize the database.
    """
    init_db()
    click.echo('Initialized the database.')