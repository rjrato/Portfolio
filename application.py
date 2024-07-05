from flask import Flask, render_template, request, redirect, url_for, session, send_file, make_response
from datetime import datetime
from logging.handlers import RotatingFileHandler
import logging
import smtplib
import json
import os

EMAIL = os.environ.get("EMAIL")
PASS = os.environ.get("PASS")
TO_ADDRESS = os.environ.get("TO_ADDRESS")
SECRET_KEY = os.environ.get("SECRET_KEY")

application = Flask(__name__)
application.secret_key = SECRET_KEY

# Setup logging
if not application.debug:
    file_handler = RotatingFileHandler('error.log', maxBytes=10240, backupCount=10)
    file_handler.setLevel(logging.INFO)
    formatter = logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    )
    file_handler.setFormatter(formatter)
    application.logger.addHandler(file_handler)
    application.logger.setLevel(logging.INFO)
    application.logger.info('Application startup')


@application.errorhandler(500)
def internal_error(error):
    application.logger.error('Server Error: %s', error)
    return "500 error", 500


@application.errorhandler(404)
def not_found_error(error):
    application.logger.error('Not Found: %s', error)
    return "404 error", 404


with open("static/JSON/en.json", encoding='utf-8') as file:
    en_json = json.load(file)

with open("static/JSON/pt.json", encoding='utf-8') as file:
    pt_json = json.load(file)


def get_lang_data(lang):
    if lang == "pt":
        return pt_json["portuguese"]
    else:
        return en_json["english"]


@application.route("/")
def index():
    year = datetime.now().year
    lang = session.get("lang", "en")
    data = get_lang_data(lang)

    return render_template("index.html", data=data, year=year)


@application.route("/set_language/<lang>", methods=["GET", "POST"])
def set_language(lang):
    try:
        with open(f"static/JSON/{lang}.json") as json_file:
            data = json.load(json_file)
        response = make_response(json.dumps(data))
        response.headers["Content-Type"] = "application/json"
        return response
    except Exception as e:
        application.logger.error("Error: %s", e)
        return "Error loading language file", 500

    # session["lang"] = lang
    # return redirect(url_for("index"))


@application.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")
        with smtplib.SMTP("smtp.gmail.com") as connection:
            connection.starttls()
            connection.login(user=EMAIL, password=PASS)
            connection.sendmail(
                from_addr=EMAIL,
                to_addrs=TO_ADDRESS,
                msg=f"Subject:You got a new contact from ricardorato.dev!\n\nMessage from:\n{name}\n\nEmail:\n{email}\n\nMessage:\n{message}"
            )
        return redirect(url_for("index"))

    return render_template("index.html")


if __name__ == "__main__":
    application.run(debug=True)
