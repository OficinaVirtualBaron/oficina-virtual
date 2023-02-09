export async function sendConfirmationEmail(procedure: any, user: any, transporter: any, userMuni: any) {
    await transporter.sendMail({
        from: '"Email de confirmación" <municipalidadsacanta.com>',
        to: user.email,
        subject: `Trámite ID #${procedure.id}`,
        html: `
        <body style="background-color: rgb(243, 243, 243); border-radius: 15px; padding: 10px 10px;">
        <h2 style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">¡Hola ${user.firstname} ${user.lastname}!<br>¡Su trámite fue enviado exitosamente!</h2>
        <h4 style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">(No contestar a este correo electrónico)</h4>
        <h3 style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
          ¡Hola vecino! Este es un correo de confirmación para avisarle que su trámite fue enviado correctamente.
          El ID de su trámite es <b">#${procedure.id}</b> y está a cargo de <b>${userMuni.firstname} ${userMuni.lastname}</b> en el área de <b>"${userMuni.category.title}"</b>. Si necesita consultar por ayuda con algún municipal, deberá indicarle el número de su trámite para que él pueda
          buscarlo y de esa manera brindarle asistencia.
        <h3>
        <h4 style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Ingrese a la <a href="https://oficinavirtualbaron.github.io/oficina-vue/#/login" style="text-decoration: none"><b>oficina virtual</b></a> para ver el estado actual👀</h4>
        <p style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">- Municipalidad de Sacanta. Siempre a tu lado -</p>
        <img src="https://www.sacanta.gob.ar/sites/default/files/styles/ima-novedades/public/gestion_logo_obras_0.png?itok=7DEl15er"><br><br>
        <h5 style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">Si tiene dudas o problemas con su trámite, envíe un email a esta dirección: <b>info@sacanta.gob.ar</b> o contactarse a este número: <b>+54 3533 417923</b><br>
      </body>
        `
    });
}