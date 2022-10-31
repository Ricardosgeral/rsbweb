from flask import render_template, request, Blueprint
from rsbweb.models import Post, RSB2018, RPB2018, DTA_PI_2019, DTA_PII_2019, DTA_PIII_2019, DTA_PIV_2019

main = Blueprint('main', __name__)


@main.route("/")
@main.route("/home")
def home():
    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=5)
    return render_template('home.html', posts=posts)


@main.route("/rsb")
def reg_rsb():
    rsb = RSB2018.query.all()
    return render_template('rsb.html', rsb=rsb)


@main.route("/rpb")
def reg_rpb():
    rpb = RPB2018.query.all()
    return render_template('rpb.html', rpb=rpb)


@main.route("/dtaI")
def reg_dtaI():
    dtaI = DTA_PI_2019.query.all()
    return render_template('dtaI.html', dtaI=dtaI)


@main.route("/dtaII")
def reg_dtaII():
    dtaII = DTA_PII_2019.query.all()
    return render_template('dtaII.html', dtaII=dtaII)


@main.route("/dtaIII")
def reg_dtaIII():
    dtaIII = DTA_PIII_2019.query.all()
    return render_template('dtaIII.html', dtaIII=dtaIII)


@main.route("/dtaIV")
def reg_dtaIV():
    dtaIV = DTA_PIV_2019.query.all()
    return render_template('dtaIV.html', dtaIV=dtaIV)


@main.route("/about")
def about():
    rsb = RSB2018.query.all()
    rpb = RPB2018.query.all()
    dtaI = DTA_PI_2019.query.all()
    dtaII = DTA_PII_2019.query.all()
    dtaIII = DTA_PIII_2019.query.all()
    dtaIV = DTA_PIV_2019.query.all()

    return render_template('about.html',
                           rsb=rsb, rpb=rpb,
                           dtaI=dtaI, dtaII=dtaII,
                           dtaIII=dtaIII, dtaIV=dtaIV)

#    return render_template('about.html', title='About')
