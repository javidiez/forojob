from . import db
from datetime import datetime, timezone

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), nullable=False)
    name = db.Column(db.String(100))
    lastname = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    birthdate = db.Column(db.Date)
    phone = db.Column(db.String(250))
    role = db.Column(db.String(100), default='user')
    is_active = db.Column(db.Boolean, default=True)
    image = db.Column(db.String(250))
    signup_date = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "lastname": self.lastname,
            "email": self.email,
            "birthdate": self.birthdate,
            "role": self.role,
            "is_active": self.is_active,
            "image": self.image,
            "phone": self.phone,
            "signup_date": self.signup_date
        }

class Theme(db.Model):
    __tablename__ = 'themes'
    id = db.Column(db.Integer, primary_key=True)
    title =  db.Column(db.String(250))
    content =  db.Column(db.Text)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    
    user = db.relationship('User', backref='themes')
    category = db.relationship('Category', backref='themes')

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "date": self.date,
            "category":{
                "id": self.category.id,
                "head": self.category.head,
                "name":self.category.name
                },
            "user":{
                "id": self.user.id,
                "name":self.user.name,
                "lastname":self.user.lastname,
                "username":self.user.username,
                "image": self.user.image,
                "signup_date": self.user.signup_date
                }
        }

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    head = db.Column(db.String(250))
    name =  db.Column(db.String(250))

    def serialize(self):
        return {
            "id": self.id,
            "head": self.head,
            "name": self.name
        }

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    content =  db.Column(db.String(250))
    theme_id = db.Column(db.Integer, db.ForeignKey('themes.id'), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    date = db.Column(db.DateTime, default=datetime.now(timezone.utc))


    user = db.relationship('User', backref='comments')
    theme = db.relationship('Theme', backref='comments')


    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "date": self.date,
            "theme":{
                "id": self.theme.id,
                "title":self.theme.title,
                "content":self.theme.content
                },
            "user":{
                "id": self.user.id,
                "name":self.user.name,
                "lastname":self.user.lastname,
                "username":self.user.username,
                "date": self.user.signup_date
                }
        }


class Like(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    theme_id = db.Column(db.Integer, db.ForeignKey('themes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=False)

    user = db.relationship('User', backref='likes')
    theme = db.relationship('Theme', backref='likes')
    comment = db.relationship('Comment', backref='likes')


    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "theme":{
                "id": self.theme.id,
                "title":self.theme.title,
                "content":self.theme.content
                },
            "user":{
                "id": self.user.id,
                "name":self.user.name,
                "lastname":self.user.lastname,
                "username":self.user.username
                },
            "comment":{
                "id": self.theme.id,
                "content":self.theme.content
                }
        }
