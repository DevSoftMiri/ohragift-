import jwt from "jsonwebtoken";

export function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Admin authentication is required" });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || "ohra-local-development-secret");
    next();
  } catch {
    res.status(401).json({ message: "Your admin session has expired. Please sign in again." });
  }
}
