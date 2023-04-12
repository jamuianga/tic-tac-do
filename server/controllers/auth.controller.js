import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

// TODO: has the password. Check if data is valid  
// TODO enviar refresh tokens tal como no login
const signup = async (request, response) => {
  try {
    let { name, email, password } = request.body;

    let newUser = await UserModel.create({
      name, email, password, created_at: Date.now()
    });

    const token = await jwt.sign({ id: newUser.id }, 'jwt-secret-key', {
      expiresIn: 7 * 24 * 60 * 60
    });

    response.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, secure: false });

    return response.json(token);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};

const login = async (request, response) => {
  let erros = {};
  let { email, password } = request.body;

  // TODO: validar os campos e password
  let user = await UserModel.findOne({
    where: { email }
  });

  if (user.password !== password) {
    erros.password = "Password doesn't match";
  }

  if (Object.keys(erros).length > 0) {
    return response.json({ erros });
  }

  const access_token = await jwt.sign(
    {
      id: user.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN * 1
    }
  );

  const refresh_token = await jwt.sign(
    {
      id: user.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN * 1
    }
  );

  //TODO guardar refresh token na DB para poder comparar se o device é o mesmo

  response.cookie('jwt', refresh_token, { httpOnly: true, maxAge: process.env.REFRESH_TOKEN_EXPIRES_IN * 1000, secure: false });

  return response.json({ access_token });
};

export const checkAuth = async (request, response, next) => {
  try {
    console.log(request.cookies);
    next();
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
};

export default {
  signup, login, checkAuth
};