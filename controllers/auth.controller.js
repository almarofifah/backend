const prisma = require("../config/client");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
console.log(req.body)

    if (!username || !password) {
      return res.status(400).json({ error: "Username & password wajib" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username sudah dipakai" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username, 
        email: email,
        password: hashedPassword,
        role: "kasir"
      },
    });

    return res.json({
      message: "Register berhasil",
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Password salah" });
    }

    res.json({
      message: "Login berhasil",
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: "Login error" });
  }
};

module.exports = { register, login };