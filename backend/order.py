from flask import Flask, Blueprint, request, session, redirect, url_for, jsonify
from . import db
from .models import Orders


orders = Blueprint('orders', __name__)


@orders.route('/order-status', methods=['POST', 'GET'])
def addorder():
    if request.method == 'POST':

    return 'OK'
