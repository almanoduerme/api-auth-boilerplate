import jwt from "jsonwebtoken";

interface Payload {
  [key: string]: any;
}

const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};

export { generateToken };
