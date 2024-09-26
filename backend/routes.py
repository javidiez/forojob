import cloudinary
import cloudinary.uploader
import cloudinary.api
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import Blueprint, request, jsonify, redirect, url_for, render_template
from . import db
from .models import User, Theme, Category, Comment, Like
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from flask_wtf.file import FileAllowed, FileRequired



api = Blueprint('api', __name__)

cloudinary.config(
    cloud_name = "javidiez",
    api_key = "228234813699428",
    api_secret = "_8eZcR_RopkZzuvBwIz0Zsb_P7s",
    secure=True
)

#! SIGN UP

@api.route('/users/signup', methods=['POST'])
def signup():
    data = request.json
    
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing data'}), 400

    hashed_password = generate_password_hash(data['password'])  # Hash the password

    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password,
        role='user'
    )

    db.session.add(new_user)
    db.session.commit()
        # Crear un token de acceso
    access_token = create_access_token(identity=new_user.id)

    return jsonify({
        "msg": "Usuario creado exitosamente",
        "access_token": access_token,
        'id': new_user.id,
        'username': new_user.username,
        'email': new_user.email,
        'signup_date': new_user.signup_date.isoformat(),
        'role': new_user.role
        }), 201

#! LOGIN

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Consulta la base de datos por el nombre de usuario y la contraseña
    user = User.query.filter_by(email=email).first()

    if user is None:
        # el usuario no se encontró en la base de datos
        return jsonify({"msg": "Bad username or password"}), 401

    if not check_password_hash(user.password, password):
        # Incorrect password
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Crea un nuevo token con el id de usuario dentro
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token,
                    "email":user.email,
                    "name": user.name,
                    "lastname": user.lastname,
                    "username": user.username,
                    'userId': user.id,
                    "role": user.role,
                    "birthdate": user.birthdate,
                    "image": user.image,
                    "phone": user.phone}), 201

#! GET USERS

@api.route('/users')
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])

#! GET SINGLE USER

@api.route('/user/<int:user_id>', methods=['GET'])
def get_single_user(user_id):
    users = User.query.filter_by(user_id=user_id).all()

    if not users:
        return jsonify({'error': 'No user found'}), 404

    users_serialized = [user.serialize() for user in users]

    return jsonify(users_serialized), 200


#! EDIT USER

@api.route('/edit/user/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found"}), 404

    data = request.json

    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        if 'name' in data:
            user.name = data['name']
        if 'lastname' in data:
            user.lastname = data['lastname']
        if 'birthdate'in data:
            user.birthdate = data['birthdate']
        if 'phone' in data:
            user.phone = data['phone']

        db.session.commit()

        return jsonify({"message": "User updated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500


#! EDIT USER IMAGE

@api.route('/edit/user/image/<int:user_id>', methods=['PUT'])
def edit_user_image(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found"}), 404

    data = request.json

    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        if 'image' in data:
            user.image = data['image']

        db.session.commit()

        return jsonify({"message": "User image updated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500


#! DEACTIVE USER

@api.route('/deactive/user/<int:user_id>', methods=['PUT'])
def deactive_user(user_id):
    user = User.query.get(user_id)

    if user is None:
        return jsonify({"message": "User not found"}), 404

    data = request.json

    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        if 'active' in data:
            user.active = data['active']
            
        db.session.commit()

        return jsonify({"message": "User activated/deactivated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500

#! GET THEMES

@api.route('/themes')
def get_themes():
    themes = Theme.query.all()
    return jsonify([theme.serialize() for theme in themes])

#! CREATE THEMES

@api.route('/add/theme', methods=['POST'])
def add_theme():
    data = request.json
    print(data)
    if 'title' not in data or 'content' not in data:
        return jsonify({'error': 'Missing data'}), 400

    new_theme = Theme(
        title=data['title'],
        content=data['content'],
        category_id=data['category_id'],
        author_id=data['author_id'],
        active=True
    )

    db.session.add(new_theme)
    db.session.commit()

    return jsonify({
        "msg": "Tema creado exitosamente",
        **new_theme.serialize()}), 201

#! DELETE THEMES

@api.route('/delete/theme/<int:theme_id>', methods=['DELETE'])
def delete_theme(theme_id):
    theme = Theme.query.get(theme_id)

    if theme is None:
        return jsonify({"message": "Theme not found"}), 400

    try:
        db.session.delete(theme)
        db.session.commit()
        return jsonify({"message": "Theme deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#! EDIT THEMES

@api.route('/edit/theme/<int:theme_id>', methods=['PUT'])
def edit_theme(theme_id):
    theme = Theme.query.get(theme_id)

    if theme is None:
        return jsonify({"message": "Theme not found"}), 404

    data = request.json

    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        if 'title' in data:
            theme.title = data['title']
        if 'content' in data:
            theme.content = data['content']
        if 'category_id' in data:
            theme.category_id = data['category_id']


        db.session.commit()

        return jsonify({"message": "Theme updated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500

#! DEACTIVE THEMES

@api.route('/deactive/theme/<int:theme_id>', methods=['PUT'])
def deactive_theme(theme_id):
    theme = Theme.query.get(theme_id)

    if theme is None:
        return jsonify({"message": "Theme not found"}), 404

    data = request.json

    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        if 'active' in data:
            theme.active = data['active']


        db.session.commit()

        return jsonify({"message": "Theme deactivated successfully", "theme": theme.serialize()}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500

#! GET CATEGORIES

@api.route('/categories')
def get_categories():
    categories = Category.query.all()
    return jsonify([categorie.serialize() for categorie in categories])

#! CREATE CATEGORIES

@api.route('/add/category', methods=['POST'])
def add_category():
    data = request.json
    if 'name' not in data:
        return jsonify({'error': 'Missing data'}), 400

    new_category = Category(
        name=data['name'],
        head=data['head']
    )

    db.session.add(new_category)
    db.session.commit()

    return jsonify({
        "msg": "Categoría creado exitosamente",
        **new_category.serialize()}), 201

#! DELETE CATEGORIES

@api.route('/delete/category/<int:category_id>', methods=['DELETE'])
def delete_category(category_id):
    category = Category.query.get(category_id)

    if category is None:
        return jsonify({"message": "Category not found"}), 400

    try:
        db.session.delete(category)
        db.session.commit()
        return jsonify({"message": "Category deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#! EDIT CATEGORIES

@api.route('/edit/category/<int:category_id>', methods=['PUT'])
def edit_category(category_id):
    category = Category.query.get(category_id)

    if category is None:
        return jsonify({"message": "Category not found"}), 404

    data = request.json

    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        if 'name' in data:
            category.name = data['name']


        db.session.commit()

        return jsonify({"message": "Category updated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500



#! GET COMMENTS

@api.route('/comments')
def get_comments():
    comments = Comment.query.all()
    return jsonify([comment.serialize() for comment in comments])

#! CREATE COMMENTS

@api.route('/add/comment', methods=['POST'])
def add_comment():
    data = request.json
    if 'content' not in data:
        return jsonify({'error': 'Missing data'}), 400

    new_comment = Comment(
        content=data['content'],
        author_id=data['author_id'],
        theme_id=data['theme_id']
  
    )

    db.session.add(new_comment)
    db.session.commit()

    return jsonify({
        "msg": "Comment creado exitosamente",
        **new_comment.serialize()}), 201

#! DELETE COMMENTS

@api.route('/delete/comment/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if comment is None:
        return jsonify({"message": "Comment not found"}), 400

    try:
        db.session.delete(comment)
        db.session.commit()
        return jsonify({"message": "Comment deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

#! EDIT COMMENTS

@api.route('/edit/comments/<int:comment_id>', methods=['PUT'])
def edit_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if comment is None:
        return jsonify({"message": "Comment not found"}), 404

    data = request.json

    if not data:
        return jsonify({"message": "No data provided"}), 400

    try:
        if 'content' in data:
            comment.content = data['content']

        db.session.commit()

        return jsonify({"message": "Comment updated successfully"}), 200

    except Exception as e:
        db.session.rollback()  # Revierte los cambios en caso de error
        return jsonify({"error": str(e)}), 500



#! GET LIKES

@api.route('/likes')
def get_likes():
    likes = Like.query.all()
    return jsonify([like.serialize() for like in likes])

#! CREATE LIKES

@api.route('/add/like', methods=['POST'])
def add_like():
    data = request.json
    if 'user_id' not in data:
        return jsonify({'error': 'Missing data'}), 400

    new_like = Like(
        user_id=data['user_id'],
        theme_id=data['theme_id']
    )

    db.session.add(new_like)
    db.session.commit()

    return jsonify({
        "msg": "Like agregado exitosamente",
        **new_like.serialize()}), 201

#! DELETE LIKES

@api.route('/delete/like/<int:like_id>', methods=['DELETE'])
def delete_like(like_id):
    like = Like.query.get(like_id)

    if like is None:
        return jsonify({"message": "Like not found"}), 400

    try:
        db.session.delete(like)
        db.session.commit()
        return jsonify({"message": "Like deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


#! ADD IMAGE CLOUDINARY

@api.route('/upload/image', methods=['POST'])
def add_image():
    file_to_upload = request.files['file']
    if file_to_upload:
        upload = cloudinary.uploader.upload(file_to_upload)
        print('-------------la url donde esta la imagen-------------', upload)
        return jsonify(upload)
    return jsonify({"error": "No file uploaded"}), 400
