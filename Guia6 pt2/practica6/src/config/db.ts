import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // 👈 Esto carga el archivo .env manualmente

export const connectBD = async () => {
  try {
    const url = process.env.DATABASE_URL;
    console.log('URL cargada desde .env:', url); // 👈 Solo para depuración

    const connection = await mongoose.connect(url!);
    console.log('Mongo conectado');
  } catch (error: any) {
    console.log(error.message);
  }
};
