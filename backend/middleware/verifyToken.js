const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const tokenCookie = req.cookies.token;

  // Extract the 'authorization' header from the request
  const authHeader = req.headers?.["authorization"];

  // If the 'authorization' header is not present, return a 401 Unauthorized status
  if (!authHeader && !tokenCookie) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Split the 'authorization' header to remove the "Bearer " prefix and extract the actual token
  const token = authHeader?.split(" ")[1] || tokenCookie;

  // If after removing the "Bearer " prefix there is no token, return a 401 Unauthorized status
  if (!token) {
    res.clearCookie("token");
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Attempt to verify the token using the secret key from environment variables
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // If token is valid, attach the decoded payload to req.user for use in subsequent middleware or routing logic
    req.user = decoded;

    // if (decoded.role !== "admin") {
    //   return res.status(401).json({ message: "Access denied." });
    // }

    // Proceed to the next middleware function
    next();
  } catch (error) {
    // If token verification fails, return a 400 Bad Request status indicating the token is invalid
    return res.status(400).json({ message: "Invalid token." });
  }
}

module.exports = { verifyToken };
