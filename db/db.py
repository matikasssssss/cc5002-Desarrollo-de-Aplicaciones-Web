import pymysql
import json
import base64
from datetime import datetime

DB_NAME = "tarea2"
DB_USERNAME = "cc5002"
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

with open('db/querys.json', 'r') as querys:
	QUERY_DICT = json.load(querys)

# -- conn ---

def get_conn():
	conn = pymysql.connect(
		db=DB_NAME,
		user=DB_USERNAME,
		passwd=DB_PASSWORD,
		host=DB_HOST,
		port=DB_PORT,
		charset=DB_CHARSET
	)
	return conn

#querys usuarios
def insert_user(name, email, celular, comuna_id, fecha_creacion):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insertar_usuario"], (name, email, celular, comuna_id, fecha_creacion))
	user_id = cursor.lastrowid
	conn.commit()
	return user_id

def get_last_user():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_last_usuario"])
	user = cursor.fetchone()
	return user

# querys dispositivos

def get_device_by_id(device_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_device_by_id"], (device_id,))
	result = cursor.fetchone()   
	device = {
		'id': device_id,
        'nombre': result[0],
        'tipo': result[1],
        'estado': result[2],
        'region': result[3],
        'ruta_archivo': result[4],
        'donante_nombre': result[5],
        'donante_celular': result[6],
        'donante_email': result[7]
    }
    
	return device

def get_all_devices(offset=0, limit=5):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["get_all_devices"], (limit, offset))
    devices = cursor.fetchall()
    return devices

def get_device_count():
    conn = get_conn()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM dispositivo")
    return cursor.fetchone()[0]

def insert_dispo(contacto_id, nombre, descripcion, tipo, anos_uso, estado):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insertar_dispositivo"], (contacto_id, nombre, descripcion, tipo, anos_uso, estado))
	device_id = cursor.lastrowid
	conn.commit()
	return device_id

def get_dispo_by_user(contacto_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_dispositivoByUser"], (contacto_id,))
	dispo = cursor.fetchone()
	return dispo

def insert_arch(ruta_arch, name_arch, dispo_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insert_arch"], (ruta_arch, name_arch, dispo_id))
	conn.commit()

def get_arch_ByDispo(dispo_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_archById"], (dispo_id,))
	img = cursor.fetchone()
	return img

def get_regions():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_region"])
	region = cursor.fetchall()
	return region

def get_districts():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_district"])
	district = cursor.fetchall()
	return district

def get_district_by_name(district_name):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_district_by_name"], (district_name,))
	result = cursor.fetchone()
	return result[0] if result else None

def insert_comment(nombre, texto, dispositivo_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["insert_comment"], (nombre, texto, datetime.now(), dispositivo_id))
	comment_id = cursor.lastrowid
	conn.commit()
	return comment_id

def get_comments_by_device_id(device_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_comments_by_device_id"], (device_id,))
	comment = cursor.fetchall()
	return comment

def get_dispo_by_type():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_dispo_by_id"])
	result = cursor.fetchall()
	return result

def get_contact_by_district():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_contact_by_district"])
	result = cursor.fetchall()
	return result