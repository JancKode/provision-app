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
        item_id = request.get_json()['itemId']
        mobile = request.get_json()['mobile']
        secondary_mobile = request.get_json()['otherNumber']
        status = request.get_json()['status']

        print(item_id)

        if 'user_id' in session:
            userId = session['user_id']
            new_entry = Orders(user_id=userId, first_name=first_name, last_name=last_name,
                               address=address, email=email, service=service, subscriber=subscriber, approved_by=approved_by, order_date=current_date,
                               price=price, logo=logo, version=version, item_id=item_id, mobile=mobile, secondary_mobile=secondary_mobile, status=status)
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
                            'current_date': current_date,
                            'item_id': item_id,
                            'mobile': mobile,
                            'secondary_mobile': secondary_mobile,
                            'status': status
                            })

    return 'request not found'


@order.route('/order-status', methods=['POST', 'GET'])
def getOrderData():
    if request.method == 'POST':
        user_id = request.get_json()['userId']
        update_status = request.get_json()['updateSta']
        
        
        if user_id:
            records = Orders.query.filter(
                    Orders.user_id == str(user_id)).order_by(Orders.order_date).all()
            order_schema = OrderSchema(many=True)
            order_data = order_schema.dump(records)

            if update_status == 'approveOrder':
                item_id = request.get_json()['itemId']
                approval_status = request.get_json()['approvalStatus']
                item = Orders.query.filter_by(item_id=item_id).first()


                item.approval_status = approval_status;
                db.session.commit()



            return jsonify({'order_data' : order_data, 'status' : 'Ok'})

        else:
            return jsonify({'order_data': [], 'staus' : 'Error'})
       
            
    
    return '/order-status, request not valid'

@order.route('/order-status-info', methods=['POST', 'GET', 'PUT'])
def updateForm():
    if request.method == 'POST':

        item_id = request.get_json()['itemId']
        update_status = request.get_json()['updateSta']
        
        
        item_detail = Orders.query.filter_by(item_id=item_id).first()

        if update_status == 'getData':

            return jsonify({
                'first_name': item_detail.first_name,
                'last_name': item_detail.last_name,
                'item_id': item_id,
                'email': item_detail.email,
                'address': item_detail.address,
                'service': item_detail.service,
                'subscriber': item_detail.subscriber,
                'url': item_detail.url,
                'order_date': item_detail.order_date,
                'status': item_detail.status,
                'approved_by': item_detail.approved_by,
                'approval_status': item_detail.approval_status,
                'price': item_detail.price,
                'version': item_detail.version,
                'user_id': item_detail.user_id,
                'cat_sta': item_detail.cat_sta,
                'logo': item_detail.logo,
                'mobile': item_detail.mobile,
                'secondary_mobile': item_detail.secondary_mobile
            })

        elif update_status == 'approveOrder':
            order_status = request.get_json()['status']
            item_detail.status = order_status
            db.session.commit()
        
        elif update_status == 'cancelOrder':
            order_status = request.get_json()['status']
            item_detail.status = order_status
            db.session.commit()
        elif update_status == 'approveOrder':
            approval_status = request.get_json()[approvalStatus]
            item_detail.approval_status = approval_status
            db.session.commit()


    elif request.method == 'PUT':
        first_name = request.get_json()['first_name']
        last_name = request.get_json()['last_name']
        email = request.get_json()['email']
        address = request.get_json()['address']
        service = request.get_json()['service']
        subscriber = request.get_json()['subscriber']
        approved_by = request.get_json()['approved_by']
        #price = request.get_json()['price']
        #logo = request.get_json()['logo']
        #version = request.get_json()['version']
        current_date = datetime.utcnow()
        item_id = request.get_json()['itemId']

        update_entry = Orders.query.filter_by(item_id=item_id).first()

        update_entry.first_name = first_name
        update_entry.last_name = last_name
        update_entry.email = email
        update_entry.address = address
        update_entry.service = service
        update_entry.subscriber = subscriber
        update_entry.approved_by = approved_by
        db.session.commit()

        return ("Successfully updated")
    elif request.method == 'DELETE':
        item_id = request.get_json()['itemId']

        Orders.query.filter_by(item_id=item_id).delete()
        db.session.commit()

        return ("Record has been successully deleted")

    return 'order-status-info/Request not Found'
