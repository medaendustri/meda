import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, phone, subject, message, department } =
      await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Gerekli alanlar eksik" },
        { status: 400 },
      );
    }

    // Create transporter with environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content for company
    const companyMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.COMPANY_EMAIL || "info@medaendustri.com.tr",
      subject: `Dragon Winch Teklif Talebi - ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
          <div style="background: linear-gradient(135deg, #d84948, #c73e3d); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Dragon Winch Teklif Talebi</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Yeni müşteri talebi geldi</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #d84948; margin-top: 0;">Müşteri Bilgileri</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Ad Soyad:</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">E-posta:</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #d84948;">${email}</a></td>
              </tr>
              ${
                company
                  ? `
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Şirket:</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${company}</td>
              </tr>
              `
                  : ""
              }
              ${
                phone
                  ? `
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Telefon:</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #d84948;">${phone}</a></td>
              </tr>
              `
                  : ""
              }
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold;">Departman:</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${getDepartmentName(
                  department,
                )}</td>
              </tr>
            </table>

            <h3 style="color: #d84948; margin-bottom: 10px;">Talep Konusu</h3>
            <p style="background: #f8f9fa; padding: 15px; border-left: 4px solid #d84948; margin: 0 0 20px 0; font-weight: bold;">${subject}</p>

            <h3 style="color: #d84948; margin-bottom: 10px;">Mesaj İçeriği</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; line-height: 1.6;">
              ${message.replace(/\n/g, "<br>")}
            </div>

            <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #d84948, #c73e3d); border-radius: 8px; text-align: center;">
              <p style="color: white; margin: 0; font-size: 14px;">
                <strong>Meda Endüstri Dragon Winch Distribütörü</strong><br>
                Bu e-posta www.medaendustri.com iletişim formundan gönderildi.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Email content for customer (confirmation)
    const customerMailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Talebiniz Alındı - Meda Endüstri",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
          <div style="background: linear-gradient(135deg, #d84948, #c73e3d); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Talebiniz Alındı!</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Meda Endüstri uzmanımız en kısa sürede dönüş yapacak</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <p style="margin-top: 0;">Merhaba <strong>${name}</strong>,</p>
            
            <p>Meda Endüstri teklif talebiniz başarıyla alındı. Uzman ekibimiz talebinizi inceleyerek size en uygun vinç çözümünü sunmak için en kısa sürede sizinle iletişime geçecek.</p>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #d84948; margin-top: 0;">Talebinizin Özeti:</h3>
              <p><strong>Konu:</strong> ${subject}</p>
              <p><strong>Departman:</strong> ${getDepartmentName(
                department,
              )}</p>
              ${company ? `<p><strong>Şirket:</strong> ${company}</p>` : ""}
            </div>

            <h3 style="color: #d84948;">Dragon Winch Avantajları:</h3>
            <ul style="line-height: 1.8;">
              <li>Yüksek kaliteli çekme vinçleri</li>
              <li>Denizcilik ve endüstriyel uygulamalar</li>
              <li>Çalışma saatlerinde teknik destek</li>
              <li>Orijinal yedek parça garantisi</li>
              <li>Profesyonel kurulum ve bakım</li>
            </ul>

            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
              <p style="margin: 0; color: #155724;"><strong>📞 Acil İhtiyaç?</strong><br>
              Meda Endüstri destek hattı: <a href="tel:+905387344389" style="color: #d84948;">+90 538 734 4389</a></p>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #d84948, #c73e3d); border-radius: 8px; text-align: center;">
              <p style="color: white; margin: 0; font-size: 14px;">
                <strong>Meda Endüstri Dragon Winch Distribütörü</strong><br>
                🌐 www.medaendustri.com | 📧 info@medaendustri.com.tr
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(companyMailOptions);
    await transporter.sendMail(customerMailOptions);

    return NextResponse.json(
      { message: "E-posta başarıyla gönderildi" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Mail gönderme hatası:", error);
    return NextResponse.json(
      { error: "E-posta gönderilirken bir hata oluştu" },
      { status: 500 },
    );
  }
}

function getDepartmentName(department: string): string {
  const departments: { [key: string]: string } = {
    genel: "Genel Bilgi",
    denizcilik: "Denizcilik Vinçleri",
    endustriyel: "Endüstriyel Vinçler",
    liman: "Liman Ekipmanları",
    yedekparca: "Yedek Parça",
    servis: "Teknik Servis",
  };
  return departments[department] || "Genel Bilgi";
}
