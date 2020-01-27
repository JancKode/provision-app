import os
from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_marshmallow import Marshmallow


db = SQLAlchemy()
mallow = Marshmallow()

jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    
    db_name = os.environ['DB_ACCESS']
    db_password = os.environ['DB_PASSWORD']
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://'+db_name+':'+db_password+'@localhost:5432/Users'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['SECRET_KEY'] = 'thisisthesecretkey'
    db.init_app(app)
    mallow.init_app(app)

    jwt.init_app(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    from .models import Users

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    app.app_context().push()

    CORS(app)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .orders import order as order_blueprint
    app.register_blueprint(order_blueprint)

    return app
