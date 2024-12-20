# Electronic Donations

Este proyecto implementa una plataforma web de donaciones electrónicas, donde los usuarios pueden registrar dispositivos, completar formularios, y realizar validaciones tanto en el front-end como en el back-end. Este README describe la estructura del proyecto y brinda instrucciones importantes para su ejecución.

## Tabla de Contenidos
- [Descripción General](#descripción-general)
- [Estructura del Proyecto](#estructura-del-proyecto)
  - [Db](#db)
  - [Static](#static)
  - [Templates](#templates)
  - [Utils](#utils)
- [IMPORTANTE: Requisitos Previos](#importante-requisitos-previos)

## Descripción General
Este proyecto abarca los requisitos tanto de la tarea 2 como de la tarea final, integrando todas las funcionalidades solicitadas en ambos. La plataforma permite la gestión de dispositivos donados mediante una interfaz intuitiva y un sistema de validaciones exhaustivas para garantizar una correcta entrada de datos.

## Estructura del Proyecto

### Db
Contiene las sentencias SQL necesarias y el archivo `db.py`, que define funciones útiles para realizar operaciones de inserción y extracción en la base de datos. Estas funciones centralizan la lógica de acceso a datos, ayudando a mantener un código limpio y organizado.

### Static
Esta carpeta está subdividida en tres directorios:
1. **css**: Contiene los archivos CSS, que le dan estilo y vida a la página, haciendo la interfaz más interactiva para el usuario. Todo el código CSS ha sido validado para asegurar un funcionamiento óptimo.
2. **js**: Almacena los archivos de JavaScript que manejan las validaciones en el front-end, proporcionando una capa adicional de verificación de datos antes de enviarlos al servidor.
3. **uploads**: Guarda las imágenes subidas por los donantes. Cada imagen es procesada en `app.py`, donde se le asigna un identificador único para evitar conflictos de nombres.

### Templates
Esta carpeta contiene todos los archivos HTML de la aplicación, organizados de la siguiente manera:
1. **base.html**: Es la plantilla base que define la estructura común para todas las páginas, incluyendo el menú de navegación y los bloques de contenido.
2. **auth**: Contiene 5 archivos HTML relacionados con la autenticación y gestión de dispositivos. Cada archivo tiene un nombre descriptivo de su función. Cabe destacar que en esta sección se realizaron ajustes en `informacion-dispositivo.html` para automatizar el proceso de agregar y mostrar donaciones en una tabla. 
   - **Nota**: Al validar estos archivos HTML, aparece un error que indica la falta de `<!DOCTYPE html>`. Esto se debe a que `base.html` ya lo incluye, pero al extender este archivo, algunos validadores no lo reconocen. Se intentó agregar `<!DOCTYPE html>` directamente en cada archivo, pero el error persiste. Este aspecto debe ser considerado al revisar la implementación.
3. **home**: Contiene `index.html`, la página principal del proyecto, que presenta el mismo problema de validación mencionado anteriormente.

### Utils
Esta carpeta contiene las validaciones para el back-end, que se adaptaron de las mismas reglas de validación implementadas en JavaScript para el front-end. Este enfoque asegura una validación consistente en ambos lados de la aplicación.

## IMPORTANTE: Requisitos Previos
Antes de iniciar el proyecto, asegúrate de instalar todas las dependencias ejecutando:

```bash
pip install -r requirements.txt
