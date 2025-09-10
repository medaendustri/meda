require("dotenv").config({ path: ".env.local" });
const nodemailer = require("nodemailer");

async function testMail() {
  console.log("📧 Mail testi başlatılıyor...");
  console.log("SMTP Host:", process.env.SMTP_HOST);
  console.log("SMTP User:", process.env.SMTP_USER);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Test connection
    console.log("🔍 SMTP bağlantısı test ediliyor...");
    await transporter.verify();
    console.log("✅ SMTP bağlantısı başarılı!");

    // Send test email
    console.log("📨 Test maili gönderiliyor...");
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Kendine mail gönder
      subject: "✅ Meda Endüstri Mail Testi Başarılı",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #d84948, #c73e3d); padding: 30px; text-align: center; border-radius: 10px; color: white;">
            <h1>🎉 Mail Sistemi Çalışıyor!</h1>
            <p>Google Workspace ile Nodemailer entegrasyonu başarılı</p>
          </div>
          <div style="padding: 20px; background: #f9f9f9; margin-top: 10px; border-radius: 10px;">
            <p><strong>Test Tarihi:</strong> ${new Date().toLocaleString(
              "tr-TR"
            )}</p>
            <p><strong>Gönderen:</strong> ${process.env.SMTP_USER}</p>
            <p><strong>SMTP Server:</strong> ${process.env.SMTP_HOST}:${
        process.env.SMTP_PORT
      }</p>
            <p style="color: #d84948;"><strong>Dragon Winch iletişim formu aktif!</strong></p>
          </div>
        </div>
      `,
    });

    console.log("✅ Test maili başarıyla gönderildi!");
    console.log("📬 Message ID:", info.messageId);
    console.log("🎯 Mail adresini kontrol et:", process.env.SMTP_USER);
  } catch (error) {
    console.error("❌ Mail testi başarısız:", error);

    if (error.code === "EAUTH") {
      console.log("\n🔑 Çözüm önerileri:");
      console.log("1. App Password kullanıyor musun?");
      console.log("2. Google 2-factor authentication aktif mi?");
      console.log("3. SMTP_PASS değeri doğru mu?");
    }
  }
}

testMail();
