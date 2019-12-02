from sqlalchemy.dialects.postgresql import UUID
from flask_login import UserMixin
from . import db
import uuid


class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(UUID(as_uuid=True), unique=True,
                     nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created_date = db.Column(db.DateTime())

    def __repr__(self):
        return '<User %r>' % self.username


class Orders(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    service = db.Column(db.String(80), nullable=False)
    subscriber = db.Column(db.String(80), nullable=False)
    approval_status = db.Column(db.Boolean(), default=False)
    url = db.Column(db.String(50))
    order_date = db.Column(db.DateTime())
    status = db.Column(db.Boolean(), default=False)
    approved_by = db.Column(db.String(80), nullable=False)
    cat_sta = db.Column(db.Boolean(), default=False)
