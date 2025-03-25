import express from 'express';
import router from './routes';
import { connect } from 'mongoose';
import { connectBD } from './config/db';


const PORT = 3000;
const app = express();

connectBD();  
app.use(express.json()); // Middleware para procesar JSON en las solicitudes
app.use('/', router); // Configuración de rutas

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//export default app;
