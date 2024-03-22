const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Configurar el transporte de correo electrónico
const transporter = nodemailer.createTransport({
    // Configuración del servicio de correo electrónico (ejemplo: Gmail)
    service: 'Gmail',
    auth: {
        user: 'eventechooficial@gmail.com',
        pass: process.env.PASSWORD_EMIAL,
    },
});

// Función para cargar el contenido de una plantilla de correo electrónico
const cargarPlantilla = (nombreArchivo) => {
    const filePath = path.join(__dirname, '..', 'plantillas_correo', nombreArchivo);
    return fs.readFileSync(filePath, 'utf-8');
};

// Función para enviar un correo electrónico utilizando una plantilla
const enviarCorreo = async (destinatario, asunto, plantillaNombre, datos) => {
    try {
        // Cargar el contenido de la plantilla
        const plantilla = cargarPlantilla(plantillaNombre);

        // Reemplazar variables en la plantilla con datos proporcionados
        let correoHTML = plantilla;
        Object.keys(datos).forEach((clave) => {
            correoHTML = correoHTML.replace(new RegExp(`{{${clave}}}`, 'g'), datos[clave]);
        });

        // Enviar el correo electrónico
        await transporter.sendMail({
            from: 'eventechooficial@gmail.com',
            to: destinatario,
            subject: asunto,
            html: correoHTML,
        });

        console.log('Correo electrónico enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
};

// Exportar las funciones del controlador
module.exports = {
    enviarCorreo,
};
