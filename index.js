const { Client, GatewayIntentBits } = require('discord.js');
const express = require("express");

console.log("Iniciando aplicación...");

const TOKEN = process.env.TOKEN;

if (!TOKEN) {
  console.log("❌ TOKEN NO EXISTE");
  process.exit(1);
}

console.log("✅ TOKEN detectado");

// ===== CLIENTE DISCORD =====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log("🟢 Bot conectado como " + client.user.tag);

  // SOLO cuando Discord esté listo arrancamos Express
  iniciarServidorWeb();
});

client.on("error", (error) => {
  console.error("Error del cliente Discord:", error);
});

async function iniciar() {
  try {
    console.log("Intentando login...");
    await client.login(TOKEN);
    console.log("Login completado");
  } catch (err) {
    console.error("❌ ERROR AL HACER LOGIN:");
    console.error(err);
  }
}

iniciar();

// ===== SERVIDOR WEB =====
function iniciarServidorWeb() {
  const app = express();

  app.get("/", (req, res) => {
    res.send("Bot activo");
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log("🌐 Servidor web activo en puerto " + PORT);
  });
}