/**
 * Mail Test Script
 * Bu dosyayı kullanarak mail ayarlarınızı test edebilirsiniz
 */

// Test için örnek form verisi
const testFormData = {
  name: "Test Kullanıcı",
  email: "test@example.com",
  company: "Test Şirketi",
  phone: "+90 555 123 4567",
  subject: "Dragon Winch Test Talebi",
  message:
    "Bu bir test mesajıdır. Mail ayarlarının çalışıp çalışmadığını kontrol ediyoruz.",
  department: "denizcilik",
};

// Test fonksiyonu
async function testEmail() {
  try {
    console.log("🚀 Mail testi başlatılıyor...");

    const response = await fetch("http://localhost:3001/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testFormData),
    });

    if (response.ok) {
      console.log("✅ Mail başarıyla gönderildi!");
      console.log("📧 Lütfen mail kutunuzu kontrol edin");
    } else {
      const errorData = await response.json();
      console.error("❌ Hata:", errorData.error);
    }
  } catch (error) {
    console.error("❌ Network hatası:", error);
  }
}

// Browser'da test etmek için
if (typeof window !== "undefined") {
  window.testEmail = testEmail;
  console.log("💡 Mail test etmek için: testEmail()");
}

// Node.js'te test etmek için
if (typeof module !== "undefined") {
  module.exports = { testEmail, testFormData };
}

/*
KULLANIM:

1. Development server'ı başlatın: `pnpm dev`

2. Browser console'da: `testEmail()`

3. Ya da bu dosyayı Node.js ile çalıştırın:
   `node mail-test.js`

4. Mail kutunuzu kontrol edin

HATA GİDERME:

- ❌ 535 Authentication failed → Gmail App Password kontrol edin
- ❌ Connection timeout → SMTP port kontrolü
- ❌ 550 Relay not permitted → SMTP auth ayarları
- ❌ ENOTFOUND → SMTP host yanlış

MAİL AYARLARI:
.env.local dosyasındaki ayarları kontrol edin:
- SMTP_HOST
- SMTP_USER  
- SMTP_PASS
- SMTP_PORT
*/
