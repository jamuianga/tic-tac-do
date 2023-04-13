import jwt from "jsonwebtoken";

/**
 * Verificação e validação do ACCESS TOKEN
 */
export default async (request, response, next) => {
  try {
    const auth_header = request.headers['authorization'];

    if (!auth_header) {
      return response.sendStatus(401);
    }

    const token = auth_header.split(' ')[1];

    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // TODO verificar se user existe na database
    // TODO verificar a ultima data em que fez reset da password
    console.log(decoded);
    
    next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(403);
  }
};