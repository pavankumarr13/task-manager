import jwt from "jsonwebtoken";

const SECRET_KEY = "af891bf8da99d19ba13ed08024";
function verify(req, res, next) {
  console.log("inside verify token");
  try {
    const authHeader = req.headers["authorization"]; // Get the Authorization header

    //console.log(`authHeader ${authHeader}`);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const token = authHeader.split(" ")[2]; // Extract the token part after "Bearer "
    //console.log(`extracted token ${token}`);
    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY); // Assuming you have a JWT secret stored in an environment variable

    // If verification succeeds, pass the decoded token to the next middleware or route handler
    req.user = decoded; // You can access the decoded token in subsequent middleware or route handlers via req.user
    next();
  } catch (err) {
    // If verification fails, return an error response
    console.error(err);
    res.status(403).json({ message: "Invalid token" });
  }
}

export default verify;
