from flask import Flask, render_template, jsonify
import json
import os

#create a flask object/instance
app = Flask(__name__)

#give the url/route, since it is first run use /
@app.route('/')

#select which html page to render when app runs
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    dataPath = os.path.join(app.root_path, 'data/complexities.json')
    with open(dataPath, 'r') as dataIn:
        jsonOut = json.load(dataIn)
    return jsonify(jsonOut)


if __name__ == '__main__':
    app.run(debug=True)