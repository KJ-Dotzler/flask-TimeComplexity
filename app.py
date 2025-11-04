from flask import Flask, render_template
import json

#create a flask object/instance
app = Flask(__name__)

#give the url/route, since it is first run use /
@app.route('/')

#select which html page to render when app runs
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)