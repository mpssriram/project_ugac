from flask import Flask, jsonify, request
import json
import os
from flask_cors import CORS

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# JSON file to act as the database
DB_FILE = os.path.join(BASE_DIR, 'database.json')
CONTENT_FILE = os.path.join(BASE_DIR, 'content.json')

# Helper function to load data from the JSON file
def load_data():
    try:
        with open(DB_FILE, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

# Helper function to save data to the JSON file
def save_data(data):
    with open(DB_FILE, 'w') as file:
        json.dump(data, file, indent=4)

def load_content():
    try:
        with open(CONTENT_FILE, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        return {
            "title": "UG Academic Council (UGAC)",
            "subtitle": "Undergraduate Academic Council",
            "sections": [],
            "contacts": [],
        }

def save_content(content):
    with open(CONTENT_FILE, 'w', encoding='utf-8') as file:
        json.dump(content, file, indent=4, ensure_ascii=False)

# Enable CORS
CORS(app)

# Routes
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the UGAC Python Backend!"})

@app.route('/content', methods=['GET'])
def get_content():
    return jsonify(load_content())

@app.route('/content', methods=['PUT'])
def update_content():
    payload = request.get_json(silent=True) or {}
    content = load_content()
    for key in ["title", "subtitle", "overview", "structure", "flowcharts", "contacts"]:
        if key in payload:
            content[key] = payload[key]
    save_content(content)
    return jsonify({"message": "Content updated successfully"})

@app.route('/items', methods=['GET'])
def get_items():
    items = load_data()
    return jsonify(items)

@app.route('/items', methods=['POST'])
def create_item():
    data = request.get_json(silent=True) or {}
    if not data.get("name") or not data.get("description"):
        return jsonify({"error": "name and description are required"}), 400
    items = load_data()
    new_item = {"id": len(items) + 1, "name": data['name'], "description": data['description']}
    items.append(new_item)
    save_data(items)
    return jsonify({"id": new_item['id'], "message": "Item created successfully"})

@app.route('/items/<int:id>', methods=['PUT'])
def update_item(id):
    data = request.get_json(silent=True) or {}
    if not data.get("name") or not data.get("description"):
        return jsonify({"error": "name and description are required"}), 400
    items = load_data()
    for item in items:
        if item['id'] == id:
            item['name'] = data['name']
            item['description'] = data['description']
            save_data(items)
            return jsonify({"message": "Item updated successfully"})
    return jsonify({"error": "Item not found"}), 404

@app.route('/items/<int:id>', methods=['DELETE'])
def delete_item(id):
    items = load_data()
    items = [item for item in items if item['id'] != id]
    save_data(items)
    return jsonify({"message": "Item deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True)
