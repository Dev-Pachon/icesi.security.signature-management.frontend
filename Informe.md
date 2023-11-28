# Informe

El proyecto se trata de una desarrollo de software que busca dar solución a los siguientes requerimientos:

El programa debe tener tres opciones: 
1) Generación de un par de claves RSA. Debe generar la clave pública y la privada en dos archivos separados. El archivo de la clave privada debe quedar protegido con una contraseña.
2) Firmar archivo. Esta opción recibe como entradas un archivo cualquiera, y el archivo de clave privada. Una vez comprobada la contraseña de bloqueo de la clave privada, el programa debe generar la firma digital del archivo, y guardarla en un archivo aparte.
3) Verificación de firma. Esta opción debe recibir como entradas el archivo original, el archivo que contiene la firma y el archivo de clave pública. Con estas tres entradas, debe verificarse que la firma sea correcta.

## ¿Cómo se realizó el proyecto?

Este código es una implementación básica de una SPA (Single Page Application), que busca brindar una interfaz intuitiva y amigable que dé solución, a través de un api diseñada exclusivamente para el proyecto, a los requerimientos mencionados anteriormente:

Se realizó usando React junto a Vite para el manejo del proyecto, además del uso de Antd como librería de componentes gráficos de react y de Axios para la comunicación con el API.

El proyecto cuenta con 3 secciones que corresponden a los 3 requerimientos principales.

En la primera sección se solicita una contraseña para generar un par de claves, privada y publica con formato .pem, que el usuario puede descargar a través de la intefaz.

En la segunda sección se requiere de la contraseña de la clave privada del usuario, la clave privada, y un archivo que el usuario quiera firmar. Una vez firmado el sistema le permite al usuario descargar la firma con formato .pem.

En la tercera sección se requieren de 3 archivos, el primero corresponde al archivo original, el segundo a la firma realizada sobre el archivo anterior, y la clave publica con la que se espera verificar la firma.

## Dificultades

La mayor parte del desarrollo ocurrió siun ninguna dificultad más que pequeños errores de formato de texto y de archivos al realizar la comunicación con el API.

## Conclusiones

1. **Enfoque de Desarrollo:**
   - El proyecto se enfocó en el desarrollo de software para cumplir con requisitos específicos relacionados con la generación y verificación de firmas digitales utilizando criptografía RSA.
   - Se optó por una implementación de una SPA (Single Page Application) utilizando React y Vite para proporcionar una interfaz de usuario intuitiva y amigable.

2. **Tecnologías Utilizadas:**
   - React y Vite fueron seleccionados como las tecnologías principales para el desarrollo de la interfaz de usuario, aprovechando las ventajas de una aplicación de página única.
   - Antd se utilizó como una librería de componentes gráficos de React, facilitando la creación de interfaces visuales consistentes y atractivas.
   - Axios se empleó para la comunicación con el API, permitiendo realizar solicitudes HTTP de manera eficiente.

3. **Funcionalidades Principales:**
   - El proyecto se estructuró en tres secciones, cada una destinada a cumplir con uno de los requerimientos principales:
      1. Generación de un par de claves RSA protegidas por contraseña.
      2. Firma digital de archivos mediante una clave privada.
      3. Verificación de la firma utilizando la clave pública.

4. **Manejo de Contraseñas y Seguridad:**
   - Se destaca el énfasis en la seguridad, especialmente en la protección de la clave privada mediante una contraseña en la generación de claves y la firma de archivos.
   - La implementación de contraseñas y la verificación de las mismas son aspectos críticos para garantizar la seguridad de las operaciones criptográficas.

5. **Desarrollo Sin Dificultades Significativas:**
   - A pesar de pequeños errores de formato de texto y archivos durante la comunicación con el API, el desarrollo del proyecto en su mayor parte transcurrió sin dificultades significativas.
   - Se reconoce la importancia de abordar y corregir estos pequeños problemas para garantizar un funcionamiento adecuado y consistente.

En resumen, el proyecto ha logrado cumplir con los requerimientos planteados, empleando tecnologías modernas y adoptando buenas prácticas de seguridad. El énfasis en la usabilidad y en el manejo seguro de claves y contraseñas es clave para el éxito de la aplicación.
