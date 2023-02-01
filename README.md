# OFICNA VIRTUAL

# Instalar los node_modules
```npm install``` para instalar ```node_modules```.

# Conectar a una DB
![imagen](https://user-images.githubusercontent.com/116845688/211369820-88c1d80b-9937-4ae4-b018-1b3c8da1ef16.png)

# Correr el server localmente

```npm run dev``` para correr el servidor localmente.


# DOCUMENTACIÓN:
# USER VECINO
- Para crear un user:
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

- Para iniciar sesión como user:
```
{
	"cuil": "23328913239",
	"password": "password"
}
```

- Para obtener la lista de users:
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

- Para obtener un user por su Id:
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

- Para actualizar un user por su Id (se puede actualizar unicamente password y email):
```
{
	"password": "password",
	"email": "test1@gmail.com"
}
```

- Para borrar un user por su Id:
Le pegas al endpoint pasandol como req.param el Id que queres borrar y devuelve esto: 
```
{
	"message": "Usuario borrado de la DB correctamente"
}
```

# USER MUNICIPAL
- Crear user municipal:
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

- Login de user municipal: El login es mediante cuil y password
```
{
	"cuil": "23328913239",
	"password": "password"
}
```

- Obtener lista de usuarios:
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

- Obtener user municipal por Id:
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

- Actualizar user municipal por Id:
![imagen](https://user-images.githubusercontent.com/116845688/211366856-01ca287d-af36-4015-86ef-fb6f3794a80e.png)

- Borrar user municipal por Id (solo Admin):
![imagen](https://user-images.githubusercontent.com/116845688/211367036-420cb2aa-df85-445a-8e43-278d1c438080.png)

# CATEGORIES 
(solo puede administrarlas el admin)

- Crear categoría: 
![imagen](https://user-images.githubusercontent.com/116845688/211367278-a94a892d-9ab9-46ab-907d-00aeec273a04.png)

- Obtener todas las categorías:
![imagen](https://user-images.githubusercontent.com/116845688/211367352-9f728d0b-3e9c-44e4-ac9b-615a7dab5d2b.png)

- Obtener una categoría por Id:
![imagen](https://user-images.githubusercontent.com/116845688/211367607-6f1b089c-b59f-4a0c-bb19-a96ff7270e68.png)

- Obtener trámites por category_id (Query): 
![imagen](https://user-images.githubusercontent.com/116845688/211396262-bdbe4552-c091-493b-829b-3e3ac3443ed0.png)











