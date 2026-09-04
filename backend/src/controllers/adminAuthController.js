import jwt from "jsonwebtoken";

export function adminLogin(req, res) {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@ohra.local";
  const adminPassword = process.env.ADMIN_PASSWORD || "ohra-admin";

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: "Invalid admin email or password" });
  }

  const token = jwt.sign(
    { email: adminEmail, role: "admin" },
    process.env.JWT_SECRET || "ohra-local-development-secret",
    { expiresIn: "8h" }
  );

  res.json({ token, admin: { email: adminEmail } });
}
