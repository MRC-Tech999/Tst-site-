const express = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer");
const app = express();
const PORT = 3000;
const FILE = __dirname + "/data/codes.json";

app.get("/api/register", (req, res) => {
  const { name, email } = req.query;
  if (!name || !email) return res.json({ success: false, message: "Champs manquants." });

  const confirmCode = "Marc1234" + Math.floor(1000 + Math.random() * 9000);
  const backupCode = "marctech" + Math.floor(1000 + Math.random() * 9000);

  let db = {};
  if (fs.existsSync(FILE)) {
    db = JSON.parse(fs.readFileSync(FILE));
  }

  db[email] = { confirmCode, backupCode };
  fs.writeFileSync(FILE, JSON.stringify(db, null, 2));

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "epay39209@gmail.com",
      pass: "hcao tpur fonl rpzc"
    }
  });

  const html = `
    <div style="font-family:Arial,sans-serif;padding:20px;background:#f9f9f9">
      <h2>HAITIANTOPUP TOP UP</h2>
      <p>Hello ${name}, here is your confirmation code:</p>
      <div style="font-size:22px;font-weight:bold;color:#4caf50;">${confirmCode}</div>
      <p>Use this to verify your account. Made with ❤️ by Marc — Powered by MarcTech</p>
    </div>
  `;

  transporter.sendMail({
    from: '"MarcTech Mailer" <epay39209@gmail.com>',
    to: email,
    subject: "✅ Confirmation de votre compte",
    html
  });

  res.json({ success: true, message: "Code envoyé à " + email });
});

app.get("/api/verify", (req, res) => {
  const { email, code } = req.query;
  if (!email || !code) return res.json({ success: false, message: "Champs manquants." });

  const db = JSON.parse(fs.readFileSync(FILE));
  if (!db[email] || db[email].confirmCode !== code) {
    return res.json({ success: false, message: "Code incorrect ou expiré." });
  }

  res.json({ success: true, message: "Code vérifié ! Ton code de secours : " + db[email].backupCode });
});

app.listen(PORT, () => console.log("Serveur sur http://localhost:" + PORT));
