from flask import Flask, render_template, jsonify
import json
import os

#create a flask object/instance
app = Flask(__name__)

#----------page routes---------
#index
@app.route('/')
def index():
    return render_template('index.html')

#algo page
@app.route('/algorithms')
def algoPage():
    return render_template('algorithms.html')

#----------data routes----------
#complexities
@app.route('/data')
def data():
    dataPath = os.path.join(app.root_path, 'data/complexities.json')
    with open(dataPath, 'r') as dataIn:
        jsonOut = json.load(dataIn)
    return jsonify(jsonOut)

#algorithms
@app.route('/algo-data')
def algoData():
    path = os.path.join(app.root_path, 'data/algorithms.json')
    with open(path, 'r') as dataIn:
        dataOut = json.load(dataIn)
    return jsonify(dataOut)

if __name__ == '__main__':
    app.run(debug=True)