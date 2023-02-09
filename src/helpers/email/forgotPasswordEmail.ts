export async function forgotPasswordEmail (user: any, transporter: any) {
    await transporter.sendMail({
        from: '"Email de recuperación" <municipalidadsacanta.com>',
        to: user.email,
        subject: `Recuperación de contraseña`,
        html: `
        <body style="background-color: rgb(243, 243, 243); border-radius: 15px; padding: 10px 10px;">
        <h2 style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">¡Hola ${user.firstname} ${user.lastname}!<br>¿Usted solicitó cambiar de contraseña?</h2>
        <h4 style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">(No contestar a este correo electrónico)</h4>
        <h3 style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
          ¡Hola vecino! Si recibió este correo electrónico es porque solicitó cambiar su contraseña. Por favor, para hacerlo ingrese al link a continuación y cambiela.
        <h3>
        <h4 style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"><a href="https://oficinavirtualbaron.github.io/oficina-vue/#/login" style="text-decoration: none"><b>Cambiar contraseña🔑</b></a></h4>
        <p style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">- Municipalidad de Sacanta. Siempre a tu lado -</p>
        <img src="https://www.sacanta.gob.ar/sites/default/files/styles/ima-novedades/public/gestion_logo_obras_0.png?itok=7DEl15er"><br><br>
        <h5 style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Si tiene dudas o problemas con su contraseña, envíe un email a esta dirección: <b>info@sacanta.gob.ar</b> o contactarse a este número: <b>+54 3533 417923</b><br>
      </body>
        `
    })
}