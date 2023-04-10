import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const signup = async (request, response) => {
  // TODO: has the password. Check if data is valid

  let { name, email, password } = request.body;

  try {
    let newUser = await User.create({
      name, email, password, created_at: Date.now()
    });

    const token = await jwt.sign({ id: newUser.id }, 'jwt-secret-key', {
      expiresIn: 7 * 24 * 60 * 60
    })

    response.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000, secure: false })

    return response.json(token);
  } catch (error) {
    console.log(error);
    return response.status(500).json(error);
  }
}

export default {
  signup
}