import { Request, Response } from 'express';
import User from '../models/Users';
import { validationResult } from 'express-validator';
import { validatePassword } from '../utils/auth';

export const createAccount = async (req: Request, res: Response) => {

    let erros = validationResult(req)
    console.log(erros)
    if (!erros.isEmpty()) {
        return res.status(400).json({ message: erros.array() })
    }


    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Datos del usuario recibidos con exito' });
}

export const login = async (req: Request, res: Response) => {
    // Validar los errores en la solicitud
    let erros = validationResult(req)
    if (!erros.isEmpty()) {
        return res.status(400).json({ message: erros.array() })
    }
    // Extraer email y password del cuerpo de la solicitud
    const { email, password } = req.body;
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ email })
    if(!user){
        const error = new Error('Invalid credencials')
        return res.status(401).json({error:error.message})
    }
    // Comprobar si el password es correcto(OJO: Importar validatePassword de utils/auth)
    const isPasswordCorrect = await validatePassword(password, user.password)
    if(!isPasswordCorrect){
        const error = new Error('Invalid credencials')
        return res.status(401).json({error:error.message})
    }
    // Si todo es correcto, enviar respuesta de autenticacion exitosa
    res.status(200).json('Authenticated')
}