import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from flask import Flask, request, render_template, jsonify
import random

def process(x):
    if x[0]<28 and x[2]>40:
        return "sustainable temperature attained maintain the trees grown and avoid deforestation"
    elif x[0]>=28 and x[0]<=45 :
        return "Plant "+str(int(x[0]-27)*183)+" trees per Square km to reduce temperature "
    else:
        a = str(int(x[0]-27)*213)
        return "Plant "+a+" trees per Square km to reduce the heat and sustain in the dessert regions"
        

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        data = request.get_json(force=True)  # Use force=True to parse JSON data regardless of Content-Type
        main = data['main']
        wind = data['wind']['speed']
        temperature = main['temp']
        apparent = main['feels_like']
        visibility = data['visibility']
        humidity = main['humidity']
        pressure = main['pressure']
        x = [temperature, apparent, humidity, wind, visibility, pressure]
        tree = process(x)
        return tree

    return render_template("index.html")



if __name__ == '__main__':
    app.run(debug=True)
