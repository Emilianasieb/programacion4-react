# programacion4-react

Soluciones de Programación IV (UTN · TUP 2026), frontend con React + TypeScript + Vite.

```
programacion4-react/
├── ejercicios-basicos/        un proyecto Vite con los 7 ejercicios de "React desde cero"
└── frontend-endpoints/        las 8 prácticas de endpoints, cada una con el proyecto completo
    ├── practica1/
    ├── ...
    └── practica8/
```

## ejercicios-basicos

Cada ejercicio está en su componente: `src/Ej1.tsx` … `src/Ej7.tsx`. `src/App.tsx` los muestra con un título.

```bash
cd ejercicios-basicos
npm install
npm run dev
```

## frontend-endpoints

Cada carpeta `practicaN` es un proyecto completo y funcionando hasta esa práctica inclusive. Se conectan a la API FastAPI de la cátedra (`clase-1-sqlmodel`).

1. Levantar la API en `http://localhost:8000`.
2. En la carpeta de la práctica, copiar `.env.example` como `.env` y completar `VITE_API_URL`.
3. `npm install` y `npm run dev`. Abrir <http://localhost:5174> (el puerto coincide con `allow_origins` del backend).

| Práctica | Qué agrega | Endpoints |
|---|---|---|
| 1 | Detalle de usuario | `GET /user/{id}` |
| 2 | Búsqueda por nombre | `GET /user/search/{name}` |
| 3 | Filtro de mayores de edad | `GET /user_mayores` |
| 4 | Paginación | `GET /user?offset&limit` |
| 5 | Alta de usuario | `POST /user` |
| 6 | Edición de usuario | `PATCH /user/{id}` |
| 7 | Baja de usuario | `DELETE /user/{id}` |
| 8 | Asignar y quitar roles | `GET /role`, `POST` y `DELETE /user/{id}/role/{role_id}` |

La base de todas (pasos 1 a 7 de la guía) es el login con `POST /login`, el token en `localStorage`, la lista con `GET /user`, el saludo con `GET /user/me/id` y el botón Salir.

No se suben `node_modules` ni `.env`: cada proyecto tiene su `.env.example`.
