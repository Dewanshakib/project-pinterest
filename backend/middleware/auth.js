import jwt from "jsonwebtoken";

export const Auth = async (req, res, next) => {
  // get the token from hearders & cookies
  // const headersToken = req.headers.authorization.split(" ")[1]
  const cookieToken = req.cookies.token;

  // check the tokens

  if (!cookieToken) {
    return res.status(400).send({ message: "Not Authorized" });
  }

  // verify the token
  const decoded = jwt.verify(cookieToken, process.env.SECRET_KEY);

  // check token expired or not
  if (!decoded) {
    return res.status(400).send({ message: "Token expired" });
  }

  try {
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};
