# Calculadora Kennedy — Modalidad virtual

Este es un sitio web responsive que permite calcular el promedio de actividades, foros y parciales para determinar la condición académica del alumno según las reglas de las materias teórico-prácticas generales de la modalidad virtual Kennedy.

> Este es un proyecto independiente y no oficial. No representa ni está afiliado a la Universidad Kennedy.

## Versión publicada

[Abrir la calculadora](https://rherrainz.github.io/UK-calc/)

## Funcionalidades

- Calcular el promedio de actividades (30%), foros (20%) y parciales (50%).
- Indicar si el estudiante está **Promocionado**, **Regular** o **Libre**.
- Validar que todas las calificaciones estén entre 0 y 100 puntos.
- Considerar los campos vacíos como una calificación de cero.
- Opción para limpiar todos los campos y reiniciar la calculadora.

## Condiciones académicas

### Promoción

- Puntaje final mínimo de 70.
- Al menos 3 de los 4 foros con 70 puntos o más.
- Al menos 3 de las 4 actividades con 70 puntos o más.
- Ambos parciales con 70 puntos o más.

### Regularidad

- Puntaje final mínimo de 40.
- Al menos 3 de los 4 foros con 40 puntos o más.
- Al menos 3 de las 4 actividades con 40 puntos o más.
- Ambos parciales con 40 puntos o más.

Los puntajes no se aproximan para determinar la condición académica.

## Uso

1. Ingrese las calificaciones de las actividades, foros y parciales.
2. Presione el botón **Calcular** para obtener el promedio y el estado final del alumno.
3. Si desea reiniciar los valores, presione el botón **Limpiar**.

## Tecnologías utilizadas

- HTML5
- JavaScript (ES6+)
- CSS3
- Bootstrap 5.3.8

## Estructura

- `index.html`: estructura semántica y contenido de la interfaz.
- `styles.css`: identidad visual y ajustes adaptativos.
- `app.js`: validación, cálculo y presentación de resultados.

## Seguridad y accesibilidad

- Bootstrap se carga con una versión fija y Subresource Integrity (SRI).
- La política CSP limita los scripts, estilos y conexiones permitidos.
- Los datos ingresados se validan y se muestran usando `textContent`, sin inyectar HTML.
- La navegación admite teclado, enlace de salto y preferencias de movimiento reducido.
- La interfaz se adapta desde teléfonos pequeños hasta pantallas de escritorio.

## Autor y enlaces

Este proyecto fue desarrollado por **R. Herrainz** en 2026.

- [GitHub](https://github.com/rherrainz)
- [LinkedIn](https://www.linkedin.com/in/rherrainz/)

© 2026 R. Herrainz
