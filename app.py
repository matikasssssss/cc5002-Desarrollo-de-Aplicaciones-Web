from flask import Flask, jsonify, request, render_template, redirect, url_for
from datetime import datetime
from db import db
from werkzeug.utils import secure_filename
from utils.validations import *
from datetime import datetime
import hashlib
import os
import filetype
from flask_cors import cross_origin

fecha_actual = datetime.now()
fecha_formateada = fecha_actual.strftime("%Y-%m-%d")

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'static', 'uploads')
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.route("/")
def index():
    return render_template("home/index.html")

@app.route("/grafico-contacto")
def grafico_contacto():
    return render_template("auth/grafico-contacto.html")

@app.route("/api/dispositivos-por-tipo", methods=["GET"])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def dispositivos_por_tipo():
    result = db.get_dispo_by_type()
    data = {tipo: count for tipo, count in result}
    return jsonify(data)

@app.route("/grafico-dispositivo")
def grafico_dispositivo():
    return render_template("auth/grafico-dispositivo.html")

@app.route("/api/contactos-por-comuna", methods=["GET"])
@cross_origin(origin="127.0.0.1", supports_credentials=True)
def contactos_por_comuna():
    result = db.get_contact_by_district()
    data = {comuna: count for comuna, count in result}
    return jsonify(data)


@app.route('/add_comment/<int:device_id>', methods=['POST'])
def add_comment(device_id):
    name = request.form.get('commentName') 
    text = request.form.get('commentText')

    error_name = not validate_name(name)
    error_text = not validate_text(text)

    if error_name or error_text:
        device = db.get_device_by_id(device_id)
        return render_template('auth/informacion-dispositivo.html', device=device, comments=[], error_nombre=error_name, error_texto=error_text)

    db.insert_comment(name, text, device_id)
    return redirect(url_for('device_details', device_id=device_id))



@app.route("/ver-dispositivos")
def ver_dispositivos():
    page = request.args.get('page', 1, type=int)
    per_page = 5  
    offset = (page - 1) * per_page  

    all_devices = db.get_all_devices(offset, per_page)

    devices = []
    for device in all_devices:
        device_id = device[0]
        device_name = device[1]
        device_type = device[2]
        device_status = device[3]
        comuna = device[4]
        image_filename = device[5]
        img_url = url_for('static', filename=f'uploads/{image_filename}')

        devices.append({
            "id": device_id,
            "tipo": device_type,
            "nombre": device_name,
            "estado": device_status,
            "comuna": comuna,
            "foto": img_url
        })
    total_devices = db.get_device_count()  
    total_pages = (total_devices + per_page - 1) // per_page 

    next_url = url_for('ver_dispositivos', page=page + 1) if page < total_pages else None
    prev_url = url_for('ver_dispositivos', page=page - 1) if page > 1 else None

    return render_template("auth/ver-dispositivos.html",  devices=devices, next_url=next_url, prev_url=prev_url, page=page, total_pages=total_pages)

@app.route('/device/<int:device_id>')
def device_details(device_id):
    devices = db.get_device_by_id(device_id)
    comments = db.get_comments_by_device_id(device_id)
    return render_template("auth/informacion-dispositivo.html", device=devices, comments=comments)

@app.route('/agregar-donacion', methods=['GET', 'POST'])
def agregar_donacion():
    if request.method == 'POST':  
        name = request.form.get('nombre')
        email = request.form.get('email')
        phone = request.form.get('phone')
        region = request.form.get('select-region')
        district_name = request.form.get('select-district')
        district_id = db.get_district_by_name(district_name)

        if validate(name,email,phone,region,district_name):
            contact_id = db.insert_user(name, email, phone, district_id, datetime.now())
            i = 0
            while True:
                device_name = request.form.get(f'devices[{i}][nombre_dis]')
                if not device_name:
                    break  
                
                descripcion = request.form.get(f'devices[{i}][description]')
                device_type = request.form.get(f'devices[{i}][select-type]')
                device_year = request.form.get(f'devices[{i}][years]')
                device_status = request.form.get(f'devices[{i}][select-status]')
                print(f'Device {i}: Name: {device_name}, Type: {device_type}, Year: {device_year}, Status: {device_status}')
                valid_devices = validate_devices(device_name, device_year, device_type, device_status)

                if valid_devices:
                    device_id = db.insert_dispo(contact_id, device_name, descripcion, device_type, device_year, device_status)
                    device_img = request.files.get(f'devices[{i}][files]')
                    print(f'Files {i}: {device_img}')
                    
                    if device_img and validate_files(device_img):
                        _filename = hashlib.sha256(
                            secure_filename(device_img.filename) 
                            .encode("utf-8")  
                        ).hexdigest()
                        _extension = filetype.guess(device_img).extension
                        img_filename = f"{_filename}.{_extension}"

                        device_img.save(os.path.join(app.config["UPLOAD_FOLDER"], img_filename))

                        db.insert_arch(img_filename, device_img.filename, device_id)
                i += 1
            return redirect(url_for('index'))
        return render_template('auth/agregar-donacion.html')
    return render_template('auth/agregar-donacion.html')




if __name__ == "__main__":
    app.run(debug=True)

