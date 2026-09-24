# AQUA+

AQUA+ is an immersive ocean-tech museum web application designed to inspire curiosity, innovation and marine conservation.

The application combines interactive marine exhibits, a 360° virtual museum experience and personalised exhibit collections.

Developed as a Software Engineering Capstone Project for the University of Canterbury / Institute of Data.

## Getting Started

**Requirements:** Node.js, npm and MySQL.

1. Create a MySQL database named `aquaplus_db`.
2. Open a terminal in the `backend` folder.
3. Run `npm install`.
4. Create `.env` using `.env.example` as a reference and enter your MySQL connection details.
5. Run `npm run dev` to start the backend and create the database tables.
6. In another terminal inside `backend`, run `npm run seed` to populate the three marine exhibits.

**Health check:** `http://localhost:3000/api/health`
