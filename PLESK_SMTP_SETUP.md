# 🔍 Plesk SMTP Ayarlarını Bulma Rehberi

## 📧 Plesk'te Doğru SMTP Host Adresini Bulma

### 1. **Plesk Panel'e Giriş Yapın**
- Plesk Panel'e admin olarak giriş yapın
- Ana dashboard'a gidin

### 2. **Mail Server Ayarlarını Kontrol Edin**
```
Plesk Panel → Tools & Settings → Mail Server Settings
```

**Kontrol Edilecekler:**
- ✅ Mail service: **Enabled** olmalı
- ✅ SMTP service: **Enabled** olmalı  
- ✅ SMTP authentication: **Enabled** olmalı

### 3. **Server Hostname'ini Bulun**
```
Plesk Panel → Tools & Settings → Server Settings
```
- **Full hostname** alanındaki değeri not edin
- Bu genellikle SMTP host olarak kullanılır

### 4. **Mail Ayarlarını Test Edin**
```
Plesk Panel → Mail → Email Addresses → info@medaendustri.com
```
- **"Mail settings"** linkine tıklayın
- Burada SMTP ayarları görüntülenir

### 5. **Muhtemel SMTP Host Adresleri**

Plesk kurulumuna göre şunlardan biri olabilir:

```bash
# 1. Server hostname (en yaygın)
server.yourhostingprovider.com

# 2. Domain bazlı
smtp.medaendustri.com
mail.medaendustri.com

# 3. IP adresi
your.server.ip.address

# 4. Hosting sağlayıcı hostname'i
mail.hostingcompany.com
```

### 6. **Hosting Sağlayıcıdan Bilgi Alın**

Hosting firmanızdan şu bilgileri isteyin:
- ✅ SMTP Server Hostname
- ✅ SMTP Port (587, 465, 25)
- ✅ SSL/TLS ayarları
- ✅ Authentication gereklilikleri

### 7. **cPanel/WHM Kontrolü** (Eğer varsa)

```
cPanel → Email Accounts → Configure Mail Client
```
- Burada SMTP ayarları listelenir

### 8. **Terminal ile Plesk Server Kontrolü**

Eğer server'a SSH erişiminiz varsa:

```bash
# Postfix ayarlarını kontrol et
postconf -n | grep myhostname

# Mail server status
systemctl status postfix

# Port kontrolü
netstat -tulpn | grep :587
```

## 🧪 Test Komutları

### Windows PowerShell ile test:
```powershell
# Hostname ile test
Test-NetConnection your-server-hostname.com -Port 587

# IP ile test  
Test-NetConnection your.server.ip -Port 587
```

### Telnet ile test:
```bash
# SMTP server erişim testi
telnet your-smtp-host.com 587
```

## 📞 Acil Çözüm

**Eğer Plesk SMTP bulunamazsa:**

1. **Geçici Gmail Kullanın:**
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_USER=your-gmail@gmail.com  
   SMTP_PASS=gmail-app-password
   ```

2. **Hosting Destek Ekibine Sorun:**
   - "SMTP server hostname nedir?"
   - "Email gönderim ayarları neler?"
   - "Port 587 açık mı?"

3. **Alternative Ports Deneyin:**
   ```env
   # Port 465 (SSL)
   SMTP_PORT=465
   SMTP_SECURE=true
   
   # Port 25 (Plain)
   SMTP_PORT=25
   SMTP_SECURE=false
   ```

## ✅ Başarılı Plesk SMTP Örneği

```env
# Tipik çalışan Plesk ayarları
SMTP_HOST=server.hostingcompany.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@medaendustri.com
SMTP_PASS=your-plesk-password
SMTP_FROM="Meda Endüstri <info@medaendustri.com>"
COMPANY_EMAIL=info@medaendustri.com
```

---

**💡 Önemli:** Plesk'te mail hesabı oluşturduysanız, hosting sağlayıcınızdan doğru SMTP hostname'ini almanız gerekiyor. Bu genellikle server hostname'i veya özel bir mail server adresidir.
