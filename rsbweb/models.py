from datetime import datetime
from itsdangerous import URLSafeTimedSerializer as Serializer
from flask import current_app
from sqlalchemy import ForeignKey

from rsbweb import db, login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    posts = db.relationship('Post', backref='author', lazy=True)

    def get_reset_token(self):
        s = Serializer(current_app.config['SECRET_KEY'])
        return s.dumps({'user_id': self.id})

    @staticmethod
    def verify_reset_token(token, max_age=1800):  # valido por 1800 segundos
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token, max_age=max_age)['user_id']
        except:
            return None
        return User.query.get(user_id)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"


class Documents(db.Model):  # tabela para o rsb
    __bind_key__ = "reg"  # 2a base de dados
    prt = db.Column(db.String(10), primary_key=True)
    prt_txt = db.Column(db.Text, nullable=False)
    prt_notas = db.Column(db.Text)


class RSB2018(db.Model):  # tabela para o rsb
    __bind_key__ = "reg"  # 2a base de dados
    id = db.Column(db.Integer, primary_key=True)
    prt = db.Column(db.String(10))
    prt_txt = db.Column(db.Text, nullable=False)
    prt_notas = db.Column(db.Text)
    cap = db.Column(db.String(5), nullable=False)
    cap_txt = db.Column(db.Text, nullable=False)
    sec = db.Column(db.Integer)
    sec_txt = db.Column(db.String(100))
    subsec = db.Column(db.String(5))
    subsec_txt = db.Column(db.String(100))
    art = db.Column(db.Float)
    art_tit = db.Column(db.Text)
    art_txt = db.Column(db.Text)
    pnt = db.Column(db.String(5))
    pnt_txt = db.Column(db.Text)
    aln = db.Column(db.String(5))
    aln_txt = db.Column(db.Text)
    quadro = db.Column(db.String(5))
    quadro_txt = db.Column(db.Text)
    quadro_url = db.Column(db.Text)

    # def __repr__(self):  # define o que se vê quando se faz print à classe RSB2018
    #     return f"RSB('{self.prt_txt}', '{self.prt_notas}'')"


# tabela para o rpb
class RPB2018(db.Model):
    __bind_key__ = "reg"  # 2a base de dados
    id = db.Column(db.Integer, primary_key=True)
    prt = db.Column(db.String(10))
    prt_txt = db.Column(db.Text, nullable=False)
    prt_notas = db.Column(db.Text)
    cap = db.Column(db.String(5), nullable=False)
    cap_txt = db.Column(db.Text, nullable=False)
    sec = db.Column(db.Integer)
    sec_txt = db.Column(db.String(100))
    subsec = db.Column(db.String(5))
    subsec_txt = db.Column(db.String(100))
    art = db.Column(db.Float)
    art_tit = db.Column(db.Text)
    art_txt = db.Column(db.Text)
    pnt = db.Column(db.String(5))
    pnt_txt = db.Column(db.Text)
    aln = db.Column(db.String(5))
    aln_txt = db.Column(db.Text)
    quadro = db.Column(db.String(5))
    quadro_txt = db.Column(db.Text)
    quadro_url = db.Column(db.Text)

    # def __repr__(self):  # define o que retorna da classe RSB2018
    #     return f"RPB('{self.prt_txt}', '{self.prt_notas}'')"


# tabela para a parte I dos DTA
class DTA_PI_2019(db.Model):
    __bind_key__ = "reg"  # 2a base de dados
    id = db.Column(db.Integer, primary_key=True)
    prt = db.Column(db.String(5), nullable=False)
    prt_txt = db.Column(db.Text, nullable=False)
    prt_notas = db.Column(db.Text)
    cap = db.Column(db.String(5), nullable=False)
    cap_txt = db.Column(db.Text, nullable=False)
    sec = db.Column(db.Integer)
    sec_txt = db.Column(db.String(100))
    subsec = db.Column(db.String(5))
    subsec_txt = db.Column(db.String(100))
    art = db.Column(db.Float)
    art_tit = db.Column(db.Text)
    art_txt = db.Column(db.Text)
    pnt = db.Column(db.String(5))
    pnt_txt = db.Column(db.Text)
    aln = db.Column(db.String(5))
    aln_txt = db.Column(db.Text)
    quadro = db.Column(db.String(5))
    quadro_txt = db.Column(db.Text)
    quadro_url = db.Column(db.Text)

    # def __repr__(self):
    #     return f"DTA - Parte I('{self.prt_txt}', '{self.prt_notas}'')"


# tabela para a parte I dos DTA
class DTA_PII_2019(db.Model):
    __bind_key__ = "reg"  # 2a base de dados
    id = db.Column(db.Integer, primary_key=True)
    prt = db.Column(db.String(5), nullable=False)
    prt_txt = db.Column(db.Text, nullable=False)
    prt_notas = db.Column(db.Text)
    cap = db.Column(db.String(5), nullable=False)
    cap_txt = db.Column(db.Text, nullable=False)
    sec = db.Column(db.Integer)
    sec_txt = db.Column(db.String(100))
    subsec = db.Column(db.String(5))
    subsec_txt = db.Column(db.String(100))
    art = db.Column(db.Float)
    art_tit = db.Column(db.Text)
    art_txt = db.Column(db.Text)
    pnt = db.Column(db.String(5))
    pnt_txt = db.Column(db.Text)
    aln = db.Column(db.String(5))
    aln_txt = db.Column(db.Text)
    quadro = db.Column(db.String(5))
    quadro_txt = db.Column(db.Text)
    quadro_url = db.Column(db.Text)

    # def __repr__(self):
    #     return f"DTA - Parte II('{self.prt_txt}', '{self.prt_notas}'')"


# tabela para a parte I dos DTA
class DTA_PIII_2019(db.Model):
    __bind_key__ = "reg"  # 2a base de dados
    id = db.Column(db.Integer, primary_key=True)
    prt = db.Column(db.String(5), nullable=False)
    prt_txt = db.Column(db.Text, nullable=False)
    prt_notas = db.Column(db.Text)
    cap = db.Column(db.String(5), nullable=False)
    cap_txt = db.Column(db.Text, nullable=False)
    sec = db.Column(db.Integer)
    sec_txt = db.Column(db.String(100))
    subsec = db.Column(db.String(5))
    subsec_txt = db.Column(db.String(100))
    art = db.Column(db.Float)
    art_tit = db.Column(db.Text)
    art_txt = db.Column(db.Text)
    pnt = db.Column(db.String(5))
    pnt_txt = db.Column(db.Text)
    aln = db.Column(db.String(5))
    aln_txt = db.Column(db.Text)
    quadro = db.Column(db.String(5))
    quadro_txt = db.Column(db.Text)
    quadro_url = db.Column(db.Text)

    # def __repr__(self):
    #     return f"DTA - Parte III('{self.prt_txt}', '{self.prt_notas}'')"


# tabela para a parte I dos DTA
class DTA_PIV_2019(db.Model):
    __bind_key__ = "reg"  # 2a base de dados
    id = db.Column(db.Integer, primary_key=True)
    prt = db.Column(db.String(5), nullable=False)
    prt_txt = db.Column(db.Text, nullable=False)
    prt_notas = db.Column(db.Text)
    cap = db.Column(db.String(5), nullable=False)
    cap_txt = db.Column(db.Text, nullable=False)
    sec = db.Column(db.Integer)
    sec_txt = db.Column(db.String(100))
    subsec = db.Column(db.String(5))
    subsec_txt = db.Column(db.String(100))
    art = db.Column(db.Float)
    art_tit = db.Column(db.Text)
    art_txt = db.Column(db.Text)
    pnt = db.Column(db.String(5))
    pnt_txt = db.Column(db.Text)
    aln = db.Column(db.String(5))
    aln_txt = db.Column(db.Text)
    quadro = db.Column(db.String(5))
    quadro_txt = db.Column(db.Text)
    quadro_url = db.Column(db.Text)

    # def __repr__(self):
    #     return f"DTA - Parte IV('{self.prt_txt}', '{self.prt_notas}'')"
