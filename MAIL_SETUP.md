# Mail Ayarları Kılavuzu

## 🚀 Hızlı Başlangıç

İletişim formundan gelen mailleri almak için aşağıdaki seçeneklerden birini kullanabilirsiniz:

## 📧 1. Gmail ile Ayarlama (Önerilen - Ücretsiz)

### Adım 1: Gmail App Password Oluşturma

1. Gmail hesabınıza giriş yapın
2. Google Account Settings → Security bölümüne gidin
3. "2-Step Verification" aktif olmalı
4. "App passwords" seçeneğine tıklayın
5. "Select app" → "Mail" seçin
6. "Select device" → "Other" seçip "Meda Endüstri" yazın
7. Oluşturulan 16 haneli şifreyi kopyalayın

### Adım 2: .env.local Dosyasını Güncelleyin

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-16-digit-app-password
SMTP_FROM="Meda Endüstri <your-gmail@gmail.com>"
COMPANY_EMAIL=your-gmail@gmail.com
```

## 🏢 2. Plesk Panel ile Ayarlama

### Plesk'te Mail Hesabı Oluşturma

1. Plesk Panel'e giriş yapın
2. "Mail" bölümüne gidin
3. "Create Email Address" tıklayın
4. `info@medaendustri.com` hesabını oluşturun
5. Güçlü bir şifre belirleyin

### .env.local Ayarları

```env
SMTP_HOST=mail.medaendustri.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@medaendustri.com
SMTP_PASS=your-plesk-email-password
SMTP_FROM="Meda Endüstri <info@medaendustri.com>"
COMPANY_EMAIL=info@medaendustri.com
```

### Plesk SMTP Ayarları Kontrolü

1. Plesk → "Mail Settings" → "Mail Server Settings"
2. "Enable SMTP service" aktif olmalı
3. "SMTP authentication" aktif olmalı
4. Port 587 açık olmalı

## ☁️ 3. Cloudflare Email Routing (Ücretsiz)

### Adım 1: Cloudflare Email Routing Kurulumu

1. Cloudflare Dashboard → "Email" → "Email Routing"
2. "Enable Email Routing" tıklayın
3. "Destination addresses" → Gmail adresinizi ekleyin
4. "Routing rules" → `info@medaendustri.com` → Gmail adresinize yönlendirin

### Adım 2: Gmail App Password ile Gönderim

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM="Meda Endüstri <info@medaendustri.com>"
COMPANY_EMAIL=info@medaendustri.com
```

## 🔧 4. Alternatif SMTP Servisleri

### SendGrid (Aylık 100 ücretsiz)

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

### Mailgun (Aylık 5000 ücretsiz)

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
```

## ✅ Test Etme

1. Projeyi yeniden başlatın: `pnpm dev`
2. `/iletisim` sayfasına gidin
3. Formu doldurup gönderin
4. Mail kutunuzu kontrol edin

## 🐛 Sorun Giderme

### Mail Gönderilmiyor?

1. `.env.local` dosyasının doğru lokasyonda olduğunu kontrol edin
2. Environment variable'ların doğru yazıldığını kontrol edin
3. Gmail için App Password kullandığınızdan emin olun
4. Firewall/antivirus SMTP portunu engelliyor olabilir

### Hata Kodları

- `535 Authentication failed`: Yanlış kullanıcı adı/şifre
- `550 Relay not permitted`: SMTP auth gerekli
- `Connection timeout`: Port engellenmiş olabilir

### Console'da Hataları Kontrol Etme

```bash
# Development modda hataları görmek için
pnpm dev
```

## 📱 Mobil Uyumluluk

Form mobil cihazlarda da mükemmel çalışır:

- Responsive tasarım
- Touch-friendly butonlar
- Otomatik klavye türü (email, tel)

## 🔒 Güvenlik

- SMTP şifreleri .env.local'da güvenli
- .env.local otomatik olarak .gitignore'da
- Rate limiting önerilir (production için)

## 📊 İstatistikler (Opsiyonel)

Google Analytics'e form gönderimlerini takip etmek için:

```javascript
// Form başarılı gönderimde
gtag("event", "form_submit", {
  event_category: "contact",
  event_label: "dragon_winch_inquiry",
});
```

## 🚀 Production Deployment

Vercel/Netlify'ye deploy ederken:

1. Environment variables'ları panel üzerinden ekleyin
2. SMTP ayarlarını production'a uygun yapın
3. Rate limiting ekleyin

---

**💡 Tavsiye:** Gmail App Password yöntemi en kolay ve güvenilir seçenektir. Başlangıç için bunu kullanın.
