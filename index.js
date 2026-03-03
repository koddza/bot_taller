const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const app = express();

// ====== DEBUG INICIO ======
console.log("Iniciando aplicación...");

// ====== TOKEN ======
const TOKEN = process.env.TOKEN;

if (!TOKEN) {
  console.log("❌ TOKEN NO EXISTE");
} else {
  console.log("✅ TOKEN detectado");
}

// ====== CLIENTE DISCORD ======
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`🟢 Bot conectado como ${client.user.tag}`);
});

client.on("error", (error) => {
  console.error("Error del cliente Discord:", error);
});

// ====== LOGIN ======
client.login(TOKEN).catch(err => {
  console.error("❌ Error al hacer login:", err);
});

// ====== SERVIDOR WEB ======
app.get("/", (req, res) => {
  res.send("Bot activo");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🌐 Servidor web activo en puerto " + PORT);
});