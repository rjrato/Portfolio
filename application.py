import ssl
from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from datetime import datetime
import smtplib
import json
import os

EMAIL = os.environ.get("EMAIL")
PASS = os.environ.get("PASS")
TO_ADDRESS = os.environ.get("TO_ADDRESS")
SECRET_KEY = os.environ.get("SECRET_KEY")

application = Flask(__name__)
application.secret_key = SECRET_KEY


def load_json(filename):
    try:
        file_path = os.path.join(application.static_folder, 'JSON', filename)
        with open(file_path, encoding='utf-8') as file:
            return json.load(file)
    except Exception as e:
        application.logger.error(f"Error loading {filename}: {e}")
        return {}


en_json = load_json('en.json')
pt_json = load_json('pt.json')


def get_lang_data(lang):
    if lang == "pt":
        return pt_json.get("portuguese", {})
    else:
        return en_json.get("english", {})


@application.route("/")
def index():
    year = datetime.now().year
    lang = session.get("lang", "en")
    data = get_lang_data(lang)

    return render_template("index.html", data=data, year=year)


@application.route("/set_language/<lang>", methods=["GET", "POST"])
def set_language(lang):
    session["lang"] = lang
    return redirect(url_for("index"))


@application.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")
        try:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as connection:
                connection.login(user=EMAIL, password=PASS)
                connection.sendmail(
                    from_addr=EMAIL,
                    to_addrs=TO_ADDRESS,
                    msg=f"Subject:You got a new contact from ricardorato.dev!\n\nMessage from:\n{name}\n\nEmail:\n{email}\n\nMessage:\n{message}"
                )
            return jsonify({"status": "success"}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 500

    return render_template("index.html")


if __name__ == "__main__":
    application.run(debug=True)
