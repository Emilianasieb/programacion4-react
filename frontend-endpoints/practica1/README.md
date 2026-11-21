# Práctica 1 · Frontend endpoints

Proyecto completo hasta la práctica 1 inclusive (React + TypeScript + Vite), conectado a la API FastAPI de la cátedra.

## Qué incluye

- Base (pasos 1 a 7 de la guía): login con POST /login, token en localStorage, lista de usuarios con GET /user, saludo con GET /user/me/id y botón Salir.
- Práctica 1: Detalle de un usuario: al tocar un nombre de la lista se pide GET /user/{id} y se muestran edad, email, país y roles.

## Cómo correrlo

1. Levantar la API en `http://localhost:8000`.
2. Copiar `.env.example` como `.env` y completar `VITE_API_URL` con la URL de la API.
3. `npm install` y `npm run dev`, y abrir <http://localhost:5174>.
