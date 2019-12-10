from flask import Flask, Blueprint, request, session, redirect, url_for, jsonify
from . import db
from .models import Users, Orders, OrderSchema
from datetime import datetime


order = Blueprint('order', __name__)


@order.route('/order-catalogue-form', methods=['POST', 'GET'])
def orderForm():
    if request.method == 'POST':
        first_name = request.get_json()['first_name']
        last_name = request.get_json()['last_name']
        email = request.get_json()['email']
        address = request.get_json()['address']
        service = request.get_json()['service']
        subscriber = request.get_json()['subscriber']
        approved_by = request.get_json()['approved_by']
        price = request.get_json()['price']
        logo = request.get_json()['logo']
        version = request.get_json()['version']
        current_date = datetime.utcnow()

        if 'user_id' in session:
            userId = session['user_id']
            new_entry = Orders(user_id=userId, first_name=first_name, last_name=last_name,
                               address=address, email=email, service=service, subscriber=subscriber, approved_by=approved_by, order_date=current_date,
                               price=price, logo=logo, version=version)
            db.session.add(new_entry)
            db.session.commit()
            return jsonify({'first_name':  first_name,
                            'last_name': last_name,
                            'email': email,
                            'address': address,
                            'service': service,
                            'subscriber': subscriber,
                            'approved_by': approved_by,
                            'price': price,
                            'logo': logo,
                            'version': version,
                            'current_date': current_date})
    return 'request not found'
