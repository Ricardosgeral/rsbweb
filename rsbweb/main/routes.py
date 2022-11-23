from flask import render_template, request, Blueprint
from rsbweb.models import Post

main = Blueprint('main', __name__)


@main.route("/")
@main.route("/home")
def home():
    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=5)
    return render_template('home.html', posts=posts)


@main.route("/regulamentos")
@main.route("/regulamentos.html")
def reg_regulamentos():
    return render_template('regulamentos.html')


@main.route("/rsb")
def reg_rsb():
    return render_template('rsb.html')


@main.route("/rpb")
def reg_rpb():
    return render_template('rpb.html')


@main.route("/dtaI")
def reg_dtaI():
    return render_template('dtaI.html')


@main.route("/dtaII")
def reg_dtaII():
    return render_template('dtaII.html')


@main.route("/dtaIII")
def reg_dtaIII():
    return render_template('dtaIII.html')


@main.route("/dtaIV")
def reg_dtaIV():
    return render_template('dtaIV.html')


@main.route("/search")
@main.route("/search.html")

def reg_search():
    return render_template('search.html')

@main.route("/about")
def about():
    return render_template('about.html')
