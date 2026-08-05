import bcrypt from "bcryptjs";

if (!process.stdin.isTTY || typeof process.stdin.setRawMode !== "function") {
  console.error("Bu komut etkileşimli bir terminalde çalıştırılmalıdır.");
  process.exit(1);
}

process.stdout.write("Admin parolası: ");
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding("utf8");

let password = "";

process.stdin.on("data", async (key) => {
  if (key === "\u0003") {
    process.stdout.write("\n");
    process.exit(130);
  }

  if (key === "\r" || key === "\n") {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.stdout.write("\n");

    if (password.length < 16) {
      console.error("Parola en az 16 karakter olmalıdır.");
      process.exit(1);
    }

    const hash = await bcrypt.hash(password, 12);
    password = "";
    const encoded = Buffer.from(hash, "utf8").toString("base64");
    console.log("\n.env / Vercel için şu satırı kullanın:");
    console.log(`ADMIN_PASSWORD_HASH=${encoded}`);
    console.log("\n(Not: bcrypt hash'indeki $ işaretleri Next.js env expand ile bozulduğu için base64 saklanır.)");
    return;
  }

  if (key === "\u007f" || key === "\b") {
    if (password.length > 0) {
      password = password.slice(0, -1);
      process.stdout.write("\b \b");
    }
    return;
  }

  if (/^[\x20-\x7E]$/.test(key)) {
    password += key;
    process.stdout.write("*");
  }
});
