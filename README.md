# OFICINA VIRTUAL 🖥️ 

## Tecnologías usadas 👨‍💻
- **MySQL:** Base de datos
- **DBeaver:** Administración de la base de datos
- **[NodeJS](https://nodejs.org/es/)** Entorno de servidor
- **[Express](https://expressjs.com/es/)** Entorno de trabajo en conjunto con NodeJS
- **[TypeORM](https://typeorm.io/)** ORM de TypeScript
- **[Dotenv](https://www.npmjs.com/package/dotenv)** Variables de entorno
- **[Ts-node-dev](https://www.npmjs.com/package/ts-node-dev)** Reiniciar el server local cuando se detecta un cambio
- **[Joi](https://joi.dev/)** Librería para validaciones de datos.
- **[Insomnia](https://insomnia.rest/)** Entorno para probar request y response.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** Librería para hashear contraseñas.
- **[JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)** Generar y validar .
- **[Express-validator](https://www.npmjs.com/package/express-validator)** Set de middlewares para validar datos.
- **[Morgan](https://www.npmjs.com/package/morgan)** Middleware de registro de solicitudes HTTP para NodeJS.
- **[Cors](https://www.npmjs.com/package/cors)** Mecanismo que utiliza cabeceras HTTP adicionales para permitir que un usuario obtenga permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece.
- **[Nodemailer](https://nodemailer.com/about/)** Módulo de NodeJS que permite enviar correos electrónicos, maquetados con HTML y diseñados estéticamente con CSS.

## Instalar los node_modules 📚
```npm install``` para instalar ```node_modules```.

## Conectar a una DB 💾 (ver [documentación de TypeORM](https://typeorm.io/#quick-start) y crear la DB previamente)
```
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.MYSQL_PASSW,
    port: 3306,
    database: process.env.DB_NAME,
    entities: [],
    logging: true,
    synchronize: true
  
```

## Correr el server localmente ⚙️

```npm run dev``` para correr el servidor localmente.
