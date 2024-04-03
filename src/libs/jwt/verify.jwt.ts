import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyToken = (token: string): JwtPayload | string => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export { verifyToken };
