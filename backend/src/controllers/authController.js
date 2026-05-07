import jwt from "jsonwebtoken";

const buildToken = (payload) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "2h";
  if (!secret) {
    throw new Error("Missing JWT_SECRET in environment");
  }
  return jwt.sign(payload, secret, { expiresIn });
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword) {
      return res.status(500).json({ message: "Admin credentials not configured." });
    }

    if (username !== adminUsername || password !== adminPassword) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = buildToken({ username, role: "admin" });
    return res.json({ token, user: { username } });
  } catch (error) {
    return next(error);
  }
};

export const me = async (req, res) => {
  return res.json({ user: req.user });
};
