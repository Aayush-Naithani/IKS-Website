from flask import Flask, render_template

import os
import markdown

from data.iks_data import (
    categories,
    timeline,
    regions,
    quiz_questions,
    articles
)

app = Flask(__name__)


# ================= HOME =================

@app.route("/")
def home():

    return render_template(
        "index.html",
        categories=categories
    )


# ================= EXPLORE =================

@app.route("/explore")
def explore():

    return render_template(
        "explore.html",
        categories=categories
    )


# ================= CATEGORY =================

@app.route("/explore/<category_id>")
def category(category_id):

    selected_category = None

    for item in categories:

        if item["id"] == category_id:

            selected_category = item

            break

    if selected_category is None:

        return "Category not found", 404

    return render_template(
        "category.html",
        category=selected_category
    )


@app.route("/timeline")
def timeline_page():

    return render_template(
        "timeline.html",
        timeline=timeline
    )


@app.route("/map")
def knowledge_map():

    return render_template(
        "map.html",
        regions=regions
    )


@app.route("/learn")
def learn():

    return render_template(
        "learn.html",
        quiz_questions=quiz_questions,
        articles=articles
    )

# ================= ABOUT =================

@app.route("/about")
def about():

    return render_template("about.html")

# ================= KNOWLEDGE LIBRARY =================

@app.route("/library")
def library():

    return render_template(
        "library.html",
        articles=articles
    )


# ================= ARTICLE =================

@app.route("/library/<article_id>")
def article(article_id):

    selected_article = None

    for item in articles:

        if item["id"] == article_id:
            selected_article = item
            break


    if selected_article is None:

        return "Article not found", 404


    file_path = os.path.join(
        app.root_path,
        "content",
        selected_article["file"]
    )


    if not os.path.exists(file_path):

        return "Article content not found", 404


    with open(
        file_path,
        "r",
        encoding="utf-8"
    ) as file:

        markdown_content = file.read()


    article_html = markdown.markdown(
        markdown_content,
        extensions=[
            "extra",
            "nl2br"
        ]
    )


    return render_template(
        "article.html",
        article=selected_article,
        article_html=article_html
    )

@app.errorhandler(404)
def page_not_found(error):

    return render_template(
        "404.html"
    ), 404

# ================= RUN =================

if __name__ == "__main__":

    app.run(debug=True)