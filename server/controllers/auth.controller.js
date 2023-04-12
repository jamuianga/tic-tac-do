import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import UserModel from "../models/user.model.js";

// TODO: has the password. Check if data is valid  
// TODO enviar refresh tokens tal como no login
const signup = async (request, response) => {
  try {
    let { name, email, password } = request.body;

    password = await bcrypt.hash(password, 10,);

    let user = await UserModel.create({
      name, email, password, created_at: Date.now()
    });

    // const token = await jwt.sign({ id: user.id }, 'jwt-secret-key', {
    //   expiresIn: 7 * 24 * 60 * 60
    // });

    // response.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, secure: false });

    return response.json(user);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};

/**
 * Autenticação do user
 */
const authenticate = async (request, response) => {
  try {
    let { email, password } = request.body;

    // validação do form
    if (!email || !password) {
      return response.sendStatus(400);
    }

    // TODO verificar se é um email válido

    const user = await UserModel.findOne({
      where: { email }
    });

    // validação da senha do user
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(401).json(process.env.RES_401);
    }

    // TODO implementar browser finger print

    const access_token = await jwt.sign(
      {
        id: user.id
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN * 1
      }
    );

    const refreshToken = await jwt.sign(
      {
        id: user.id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN * 1
      }
    );

    //TODO guardar refresh token na DB para poder comparar se o device é o mesmo

    response.cookie(process.env.REFRESH_TOKEN_NAME, refreshToken, { httpOnly: true, maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN * 1000, secure: false });

    return response.json({ access_token });
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
};

/**
 * Atualização do ACCESS TOKEN
 */
export const authorize = async (request, response) => {
  try {
    // leitura dos cookies
    const cookies = request.cookies;

    // se não tiver cookies ou o cookie para a atualização do token é enviado 401
    if (!cookies || !cookies[process.env.REFRESH_TOKEN_NAME]) {
      return response.status(401).json(process.env.RES_401);
    }

    const token = cookies[process.env.REFRESH_TOKEN_NAME];
    const decoded = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // TODO buscar o user na database através do refresh token. Caso o user não seja encontrado o user enviar 403
    const user = UserModel.findByPk(decoded.id);

    // se o user não for encontrado na DB é enviado 401
    if (!user) {
      return response.status(401).json(process.env.RES_401);
    }

    // assinatura do novo token de acesso
    const access_token = await jwt.sign(
      {
        id: user.id
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN * 1
      }
    );

    return response.json({ access_token });
  } catch (error) {
    console.log(error);

    if (error.name === "JsonWebTokenError") {
      return response.status(401).json(process.env.RES_401);
    }

    return response.status(500).json(error);
  }
};

export default {
  signup, authenticate, authorize
};