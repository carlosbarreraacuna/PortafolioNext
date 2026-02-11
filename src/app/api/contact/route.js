import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validar los datos requeridos
    const { name, name2, email, phone, message } = body;
    
    if (!name || !name2 || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido' },
        { status: 400 }
      );
    }

    // Crear el transporter con las credenciales SMTP de Brevo
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_MAIL_HOST,
      port: parseInt(process.env.NEXT_PUBLIC_MAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.NEXT_PUBLIC_MAIL_USERNAME,
        pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false // Para evitar errores de certificado
      }
    });

    // Contenido HTML del correo
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Nuevo mensaje de contacto
        </h2>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 5px;">Información de Contacto:</h3>
          <p><strong>Nombre completo:</strong> ${name} ${name2}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 5px;">Mensaje:</h3>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
          <p>Este mensaje fue enviado desde el formulario de contacto de tu portafolio.</p>
          <p>Fecha de envío: ${new Date().toLocaleString('es-CO', { 
            timeZone: 'America/Bogota',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
      </div>
    `;

    // Configurar el correo
    const mailOptions = {
      from: {
        name: `${name} ${name2}`,
        address: process.env.NEXT_PUBLIC_MAIL_FROM_ADDRESS
      },
      to: process.env.NEXT_PUBLIC_MAIL_FROM_ADDRESS, // Enviar a tu propio correo
      replyTo: email, // Para responder directamente al remitente
      subject: `Nuevo mensaje de contacto - ${name} ${name2}`,
      html: htmlContent,
      text: `
        Nuevo mensaje de contacto
        
        Información de Contacto:
        Nombre completo: ${name} ${name2}
        Email: ${email}
        Teléfono: ${phone}
        
        Mensaje:
        ${message}
        
        ---
        Este mensaje fue enviado desde el formulario de contacto de tu portafolio.
        Fecha de envío: ${new Date().toLocaleString('es-CO', { 
          timeZone: 'America/Bogota',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      `
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    return NextResponse.json(
      { message: 'Correo enviado exitosamente', data: info },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email via Brevo SMTP:', error);
    return NextResponse.json(
      { error: error.message || 'Error al enviar el correo' },
      { status: 500 }
    );
  }
}
