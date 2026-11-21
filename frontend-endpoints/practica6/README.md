# Práctica 6 · Frontend endpoints

Proyecto completo hasta la práctica 6 inclusive (React + TypeScript + Vite), conectado a la API FastAPI de la cátedra.

## Qué incluye

- Base (pasos 1 a 7 de la guía): login con POST /login, token en localStorage, lista de usuarios con GET /user, saludo con GET /user/me/id y botón Salir.
- Práctica 1: Detalle de un usuario: al tocar un nombre de la lista se pide GET /user/{id} y se muestran edad, email, país y roles.
- Práctica 2: Búsqueda por nombre con GET /user/search/{name}.
- Práctica 3: Filtro "Solo mayores de edad" con GET /user_mayores.
- Práctica 4: Paginación de la lista con GET /user?offset&limit (páginas de 5).
- Práctica 5: Alta de usuarios: formulario que envía POST /user.
- Práctica 6: Edición: el mismo formulario precarga GET /user/{id} y envía PATCH /user/{id}.

## Cómo correrlo

1. Levantar la API en `http://localhost:8000`.
2. Copiar `.env.example` como `.env` y completar `VITE_API_URL` con la URL de la API.
3. `npm install` y `npm run dev`, y abrir <http://localhost:5174>.
