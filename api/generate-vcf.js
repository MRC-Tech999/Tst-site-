export default function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phone } = req.body;
    const vcf = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
EMAIL:${email}
END:VCARD
`.trim();
    res.setHeader('Content-Type', 'text/vcard');
    res.setHeader('Content-Disposition', 'attachment; filename=contact.vcf');
    res.status(200).send(vcf);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}