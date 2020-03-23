from sqlalchemy.dialects.postgresql import UUID
from flask_login import UserMixin
from . import db
from . import mallow
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
    item_id = db.Column(db.String, nullable=False, unique=True)
    user_id = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    service = db.Column(db.String(80), nullable=False)
    subscriber = db.Column(db.String(80), nullable=False)
    approval_status = db.Column(db.Boolean(), default=False)
    url = db.Column(db.String(50))
    order_date = db.Column(db.DateTime())
    status = db.Column(db.String(20), default='Not Active')
    approved_by = db.Column(db.String(80), nullable=False)
    cat_sta = db.Column(db.Boolean(), default=False)
    address = db.Column(db.String(500))
    price = db.Column(db.String(20))
    version = db.Column(db.String(15))
    logo = db.Column(db.String(15))
    mobile = db.Column(db.String(40))
    secondary_mobile = db.Column(db.String(40))


class OrderSchema(mallow.ModelSchema):
    class Meta:
        model = Orders


class CatalogueData(UserMixin, db.Model):
    uid = db.Column(db.String(80), primary_key=True,
                    nullable=False, unique=True)
    service_id = db.Column(db.String(20), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    version = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Numeric(10,3), nullable=False)
    logo = db.Column(db.String(10), nullable=False)


class CatalogueSchema(mallow.ModelSchema):
    class Meta:
        model = CatalogueData

