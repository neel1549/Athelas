from fileinput import filename
import os
from flask import Flask, redirect, request, send_from_directory,abort, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from PIL import Image
from models import db, login, UserModel, ImageModel
import logging



logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')


UPLOAD_FOLDER = './static/img/uploads'
ALLOWED_EXTENSIONS = set([ 'png', 'jpg', 'jpeg'])

app = Flask(__name__)
CORS(app,supports_credentials=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Athelas_Interview.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = os.urandom(24)
login.init_app(app)
db.init_app(app)


@app.before_first_request
def create_table():
    db.create_all()


@app.route('/register', methods=['POST', 'GET'])
def register():
     
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        print('Email:',email)
        print('Password:',password)
 
        if UserModel.query.filter_by(email=email).count()>0:
            return ('Email already Present')
             
        user = UserModel(email=email, password=password)
        db.session.add(user)
        db.session.commit()
        return 'Registered'
    return ''


@app.route('/login', methods = ['POST', 'GET'])
def login():
    if current_user.is_authenticated:
        return 'already logged in'
     
    if request.method == 'POST':
        email = request.form['email']
        user = UserModel.query.filter_by(email = email).first()
        print(UserModel.query.all())
        print("User: ",user)
        if user is not None:
            login_user(user)
            return "User is now logged in"

        else:
            return "Not registered Yet"
     
    return ''

@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()

    return "User is now logged out"


@app.route('/get-user-images', methods=['GET'])
def get_user_images():
    imageUser=UserModel.query.filter_by(email=current_user.email).first()
    images=ImageModel.query.filter_by(user=imageUser.id).all()
    return jsonify({"data":[image.image_url for image in images]})



@app.route('/upload-image', methods=['GET', 'POST'])
def upload_image():

    if request.files:
        image= request.files["file"]
        if image.filename == "":
            print("Image Must have a Filename")
            return redirect(request.url)
        rotated_image = Image.open(image.stream)
        angle = 90
        out = rotated_image.rotate(angle, expand=True)
        path = os.path.join(app.config["UPLOAD_FOLDER"],image.filename)
        out.save(path)
        print("Image saved successfully: " )
        if current_user.is_authenticated:
            print("Authenticated Image upload")
            imageUser=UserModel.query.filter_by(email=current_user.email).first()
            image = ImageModel(user=imageUser.id, image_url = "http://localhost:5000/get-image/" + image.filename)
            db.session.add(image)
            db.session.commit()
        return redirect(request.url)

    return ''


@app.route('/get-image/<image_name>')
def get_image(image_name):
    try:
        return send_from_directory(app.config["UPLOAD_FOLDER"],image_name,as_attachment=False)
    except FileNotFoundError:
        abort(404)


if __name__ == "__main__":

    app.run(debug=True,host="0.0.0.0",use_reloader=False)

