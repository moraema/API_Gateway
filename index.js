import express from 'express';
import cors from 'cors';
import  loginUsuario from './src/routes/auth.routes.js';
import registroTareas from './src/routes/tarea.routes.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json()); 


app.get('/health', (req, res) => {
  res.status(200).send('API Gateway is running');
});


app.use('/auth', loginUsuario);
app.use('/tareas', registroTareas);

app.listen(PORT, () => { 
    console.log(`API Gateway corriendo en el puerto:  ${PORT}`);
} )