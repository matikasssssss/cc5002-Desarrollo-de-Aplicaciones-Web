import re
from werkzeug.datastructures import FileStorage

def validate_name(name):
    len_min = len(name) > 2
    len_max = len(name) < 81
    return name and len_max and len_min

def validate_email(email):
    if not email or len(email) < 15:
        return False
    email_regex = r'^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$'
    return re.match(email_regex, email)

def validate_text(text):
    len_min = len(text) > 4
    return text and len_min

def validate_years(years):
    try:
        years = int(years)
        return 1 <= years <= 99
    except ValueError:
        return False

def validate_phone(phone):
    if not phone:
        return True
    return len(phone) >= 8 and phone.isdigit()

def validate_files(files):
    # Asegura que siempre se maneje como una lista
    if isinstance(files, FileStorage):
        files = [files]  # Convierte a una lista de un solo archivo

    if not files or len(files) < 1 or len(files) > 3:
        return False
    
    for file in files:
        if not (file.mimetype.startswith("image/") or file.mimetype == "application/pdf"):
            return False
    return True

def validate_select(select_value):
    return bool(select_value) 

def validate_devices(device_name, device_years, device_types, device_statuses):
    return validate_name(device_name) and validate_years(device_years) and validate_select(device_types) and validate_select(device_statuses)
def validate(name, email, phone, region, district):
    return validate_name(name) and validate_email(email) and validate_phone(phone) and validate_select(region) and validate_select(district)



