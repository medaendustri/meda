# 🔧 Mail Sorun Giderme Rehberi

## ❌ Yaşadığınız Hata: ENOTFOUND mail.medaendustri.com

Bu hata, `mail.medaendustri.com` SMTP sunucusunun DNS'te bulunamadığını gösterir.

## ✅ Çözüm Seçenekleri

### 1. 🚀 Gmail SMTP (ÖNERİLEN - Hemen Çalışır)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
```

**Gmail App Password Oluşturma:**

1. Google Account → Security → 2-Step Verification (aktif olmalı)
2. App passwords → Mail → "Meda Endüstri" → Generate
3. 16 haneli şifreyi .env.local'a ekleyin

### 2. 📧 Domain Mail Sunucu Ayarları

Eğer `medaendustri.com` domain'iniz varsa:

**Hosting sağlayıcınızdan SMTP bilgilerini alın:**

```env
# Örnek ayarlar (gerçek bilgileri hosting'den alın)
SMTP_HOST=smtp.medaendustri.com  # ya da mail.medaendustri.com
SMTP_PORT=587                    # ya da 465/25
SMTP_SECURE=false               # 465 portunda true
SMTP_USER=info@medaendustri.com.tr
SMTP_PASS=your-domain-email-password
```

### 3. ☁️ Cloudflare Email Routing + Gmail

**Adım 1:** Cloudflare Email Routing

- Cloudflare Dashboard → Email → Enable Email Routing
- `info@medaendustri.com.tr` → your-gmail@gmail.com yönlendirme

**Adım 2:** Gmail SMTP ile gönderim

```env
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_FROM="Meda Endüstri <info@medaendustri.com.tr>"
```

### 4. 🏢 Plesk Panel Ayarları

Plesk'te mail sunucu ayarlarını kontrol edin:

1. **Plesk → Tools & Settings → Mail Server Settings**
   - Mail service: Aktif
   - SMTP service: Aktif
   - SMTP authentication: Aktif

2. **Doğru SMTP Host:**

   ```env
   # Genellikle bunlardan biri:
   SMTP_HOST=mail.yourdomain.com
   SMTP_HOST=smtp.yourdomain.com
   SMTP_HOST=your-server-ip
   ```

3. **Port ayarları:**
   ```env
   SMTP_PORT=587   # En yaygın
   SMTP_PORT=465   # SSL için (SMTP_SECURE=true)
   SMTP_PORT=25    # Eski/kısıtlı
   ```

## 🧪 Test Etme

### 1. Browser Console Test

```javascript
// http://localhost:3001 sayfasında F12 → Console
testEmail();
```

### 2. Command Line Test

```bash
cd c:\Users\pc\Desktop\medaend\meda-end
node mail-test.js
```

### 3. Curl Test (SMTP sunucu erişimi)

```bash
# Telnet ile SMTP test (Windows)
telnet smtp.gmail.com 587

# PowerShell ile port testi
Test-NetConnection smtp.gmail.com -Port 587
```

## 🐛 Yaygın Hatalar ve Çözümleri

### ENOTFOUND hatası

```
❌ getaddrinfo ENOTFOUND mail.medaendustri.com
✅ Çözüm: SMTP_HOST'u gmail'e değiştirin
```

### Authentication failed

```
❌ 535 Authentication failed
✅ Çözüm: Gmail App Password kullanın (16 haneli)
```

### Connection timeout

```
❌ ETIMEDOUT
✅ Çözüm: Port 587 yerine 465 deneyin, SMTP_SECURE=true yapın
```

### Relay not permitted

```
❌ 550 Relay not permitted
✅ Çözüm: SMTP authentication aktif edin
```

## 📱 Hızlı Gmail Kurulumu (5 dakika)

1. **Gmail'de 2FA aktif edin**
2. **App Password oluşturun:** Google Account → Security → App passwords
3. **.env.local güncelleyin:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=abcd-efgh-ijkl-mnop
   SMTP_FROM="Meda Endüstri <info@medaendustri.com.tr>"
   COMPANY_EMAIL=info@medaendustri.com.tr
   ```
4. **Server restart:** `pnpm dev`
5. **Test et:** İletişim formunu doldur

## 🔒 Güvenlik Notları

- ✅ Gmail App Password güvenli (hesap şifresi değil)
- ✅ .env.local otomatik git ignore
- ✅ Production'da environment variables kullanın
- ❌ Asla gerçek Gmail şifrenizi kullanmayın

## 📞 Acil Destek

Eğer hiçbir yöntem çalışmazsa:

1. Hosting sağlayıcınızdan SMTP ayarlarını alın
2. SendGrid/Mailgun gibi üçüncü parti servisleri deneyin
3. Geçici olarak Gmail SMTP kullanın

---

**💡 Tavsiye:** Gmail App Password en hızlı çözüm. İlk etapta bunu kullanıp sistemi çalıştırın, sonra domain mail ayarlarını yapabilirsiniz.
