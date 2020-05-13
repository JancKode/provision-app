from flask import Flask, Blueprint, request, session, redirect, url_for, jsonify
from . import db
from .models import Users, CatalogueData, CatalogueSchema
from datetime import datetime
from sqlalchemy import and_
from pprint import pprint




catalogue = Blueprint('catalogue', __name__)


@catalogue.route('/service-catalogue', methods=['POST', 'GET'])
def catalogueData():
    if request.method == 'POST':

        catalogue_result = CatalogueData.query.filter().all()
        catalogue_schema = CatalogueSchema(many=True)
        catalogue_data = catalogue_schema.dump(catalogue_result)
        catalogue_rows = CatalogueData.query.count()

        print(catalogue_rows)

        return jsonify(catalogue_data)
        
    else:
        return 'Request not found'

   

