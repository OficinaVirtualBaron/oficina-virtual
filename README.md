# OFICNA VIRTUAL

# Instalar los node_modules
```npm install``` para instalar ```node_modules```.

# Conectar a una DB
![imagen](https://user-images.githubusercontent.com/116845688/211369820-88c1d80b-9937-4ae4-b018-1b3c8da1ef16.png)

# Correr el server localmente

```npm run dev``` para correr el servidor localmente.


# DOCUMENTACIÓN:
# USER VECINO
- POST - Para crear un user: ```localhost:3000/auth/signUp```
```
{
	"firstname": "Test 1",
	"lastname": "Test 1",
	"password": "password",
	"email": "test1@gmail.com",
	"cuil": "23328913239",
	"adress": "Calle falsa 33"
}
```

- POST - Para iniciar sesión como user: ```localhost:3000/auth/signIn```
```
{
	"cuil": "23328913239",
	"password": "password"
}
```

- GET - Para obtener la lista de users: ```localhost:3000/oficina/users```
Hacer un get al endpoint y recibe el array de users: 
```
[
	{
		"id": 1,
		"firstname": "Test 1",
		"lastname": "Test",
		"email": "test1@gmail.com",
		"cuil": "23328913239",
		"adress": "Calle Falsa 33"
	},
	{
		"id": 2,
		"firstname": "Test 2",
		"lastname": "Test",
		"email": "test2@gmail.com",
		"cuil": "23328913240",
		"adress": "Calle Falsa 34"
	},
	{
		"id": 3,
		"firstname": "Test 3",
		"lastname": "Test",
		"email": "test3@gmail.com",
		"cuil": "23328913241",
		"adress": "Calle Falsa 35"
	}
]
```

- GET - Para obtener un user por su Id: ```localhost:3000/oficina/users/:id```
```
{
	"id": 3,
	"firstname": "Test 3",
	"lastname": "Test",
	"email": "test3@gmail.com",
	"cuil": "23328913241",
	"adress": "Calle Falsa 35"
}
```

- PUT - Para actualizar un user por su Id (se puede actualizar unicamente password y email): ```localhost:3000/oficina/user/:id```
```
{
	"password": "password",
	"email": "test1@gmail.com"
}
```

- DELETE - Para borrar un user por su Id: ```localhost:3000/oficina/user/:id```
Le pegas al endpoint pasandol como req.param el Id que queres borrar y devuelve esto: 
```
{
	"message": "Usuario borrado de la DB correctamente"
}
```

# USER MUNICIPAL
- POST - Crear user municipal: ```localhost:3000/municipales/createMuni```
```
{
	"firstname": "Test 1",
	"lastname": "Test",
	"password": "password",
	"email": "test1@gmail.com",
	"cuil": "23328913239",
	"category": 12,
	"required": 1,
	"inprocess": 0,
	"finalized": 0
}
```

- POST - Login de user municipal: El login es mediante cuil y password ```localhost:3000/auth/signinMunicipales```
```
{
	"cuil": "23328913239",
	"password": "password"
}
```

- GET - Obtener lista de usuarios: ```localhost:3000/municipales/munis```
Cuando haces el get devuelve esto:
```
[
	{
		"id": 0,
		"firstname": "Municipal 1",
		"lastname": "Municipal",
		"email": "municipal1@gmail.com",
		"cuil": "23454932447",
		"category": {
			"title": "Gobierno y desarrollo"
		}
	},
	{
		"id": 1,
		"firstname": "Municipal 2",
		"lastname": "Municipal",
		"email": "municipal2@gmail.com",
		"cuil": "23454332447",
		"category": {
			"title": "Infraestructura y servicios publicos"
		}
	}
]
```

- GET - Obtener user municipal por Id: ```localhost:3000/municipales/munis/:id```
Cuando le pegas al endpoint devuelve esto:
```
{
	"id": 2,
	"firstname": "Martin",
	"lastname": "Galvan",
	"email": "martingalvan22@gmail.com",
	"cuil": "23424332447",
	"category": {
		"id": 15,
		"title": "Medio ambiente"
	}
}
```

- PUT - Actualizar user municipal por Id: ```localhost:3000/municipales/munis/:id```
```
{
	"password": "password123",
	"email": "test@gmail.com"
}
```

- DELETE - Borrar user municipal por Id. Cuando le pegas al endpoint te devuelve lo siguiente: ```localhost:3000/municipales/munis/:id```
```
{
	message: "Usuario municipal borrado de la DB correctamente"
}
```

# CATEGORIES 
(solo puede administrarlas el admin)

- POST - Crear categoría: ```localhost:3000/oficina/categories/category```
```
{
	"title": "Títulod de la categoría",
	"description": "Descripción de la categoría"
}
```

- GET - Obtener todas las categorías: ```localhost:3000/oficina/categories/categories```
```
[
	{
		"id": 1,
		"title": "Categoría 1",
		"description": "Descripción de la categoría 1"
	},
	{
		"id": 2,
		"title": "Categoría 2",
		"description": "Descripción de la categoría 2"
	},
	{
		"id": 3,
		"title": "Categoría 3",
		"description": "Descripción de la categoría 3"
	}
]
```

- GET - Obtener una categoría por Id: ```localhost:3000/oficina/categories/category/:id```
```
{
	"id": 1,
	"title": "Categoría 1",
	"description": "Descripción de la categoría 1"
}
```

- GET - Obtener trámites (templates) por category_id (Query): ```localhost:3000/oficina/categories/category/procedure/:id```
```
[
	{
		"id": 1,
		"title": "Trámite 1",
		"description": "Descripción del trámite 1"
	},
	{
		"id": 2,
		"title": "Trámite 2",
		"description": "Descripción del trámite 2"
	}
]
```











