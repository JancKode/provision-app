from flask import Flask, Blueprint, request, session, redirect, url_for, jsonify
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (create_access_token)
from flask_login import login_user, login_required
from .models import Users
from datetime import datetime
import logging
import uuid

auth = Blueprint('auth', __name__)


@auth.route('/', methods=['POST', 'GET'])
def index():
    db.create_all()
    return 'Hello world'


@auth.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':

        username = request.get_json()['username']
        first_name = request.get_json()['first_name']
        last_name = request.get_json()['last_name']
        password = request.get_json()['password']
        email = request.get_json()['email']
        unique_id = uuid.uuid4()
        created = datetime.utcnow()

        existing_email = Users.query.filter_by(email=email).first()
        existing_username = Users.query.filter_by(username=username).first()

        if existing_username:
            return jsonify({'result': 'User already exists'})

        if existing_email:
            return jsonify(
                {'result': 'Email already exists, please register a new one'})
        else:
            access_token = create_access_token(identity={
                'username': username,
                'first_name': first_name,
                'last_name': last_name,
                'email': email
            })
            new_user = Users(first_name=first_name, last_name=last_name, email=email, username=username,
                             password=generate_password_hash(password, method='sha256'), created_date=created, uuid=unique_id)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'token': access_token, 'user': first_name + ' ' + last_name, 'uid': unique_id})

    return 'OK'


@auth.route('/login', methods=['POST'])
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']

    existing_user = Users.query.filter_by(username=username).first()

    if existing_user and check_password_hash(existing_user.password, password):
        login_user(existing_user)
        access_token = create_access_token(identity={
            'username': existing_user.username,
            'email': existing_user.email
        })
        return jsonify({'token': access_token, 'user': existing_user.first_name + ' ' + existing_user.last_name})
    else:
        return jsonify({'result': 'Invalid username or password'})


@auth.route('/logout', methods=['GET', 'POST'])
def logout():
    if 'username' in session:
        session.pop('username', None)
    return jsonify({'result': 'You have successfully logged out'})
