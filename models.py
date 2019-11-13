from flask_login import UserMixin
from . import db


class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    create_date = db.Column(db.DateTime())

    def __repr__(self):
        return '<User %r>' % self.username
