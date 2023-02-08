export async function sendConfirmationEmail(procedure: any, user: any, transporter: any, userMuni: any) {
    await transporter.sendMail({
        from: '"Email de confirmación" <municipalidadsacanta.com>',
        to: user.email,
        subject: `Trámite ID #${procedure.id}`,
        html: `
          <h2>¡Hola ${user.firstname} ${user.lastname}! <br>¡Su trámite fue enviado exitosamente!</h2>
          <h4>
            ¡Hola vecino! Este es un correo de confirmación para avisarle que su trámite fue enviado correctamente.
            El ID de su trámite es <b>#${procedure.id}</b> y está a cargo de <b>${userMuni.firstname} ${userMuni.lastname}</b> en el área de <b>"${userMuni.category.title}"</b>. Si necesita consultar por ayuda con algún municipal, deberá indicarle el número de su trámite para que él pueda
            buscarlo y de esa manera brindarle ayuda.
          <h4>No contestar a este correo electrónico</h4>
          </h4>
          <h3>Ingrese a la <a href="https://oficinavirtualbaron.github.io/oficina-vue/#/login" style="text-decoration: none">oficina virtual</a> para ver el estado actual👀</h3>
          <p>- Municipalidad de Sacanta. Siempre a tu lado -</p>
          <img src="https://www.sacanta.gob.ar/sites/default/files/logo_1.png"><br><br>
          <h5 >Si tiene dudas o problemas con su trámite, envíe un email a esta dirección: <b>info@sacanta.gob.ar<b> o contactarse a este número: <b>+54 3533 417923</b>
        `
    });
}
