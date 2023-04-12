import jwt from "jsonwebtoken";

export default async (request, response, next) => {
  try {
    const auth_header = request.headers['authorization'];

    if (!auth_header) {
      return response.sendStatus(401);
    }

    const token = auth_header.split(' ')[1];

    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    return response.sendStatus(403);
  }
};