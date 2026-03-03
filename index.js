const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// TOKEN desde Render
const TOKEN = process.env.TOKEN;

// ===== LISTA DE PRECIOS =====
const precios = {
  reparacion: 6000,
  pieza_estetica: 4000,
  full_mantenimiento: 56000,
  pieza_mantenimiento: 8000,
  pieza_rendimiento: 8000,
  full_rendimiento: 40000,
  luces_delanteras: 40000,
  neones: 40000,
  ruedas: 4000,
  stancer: 400,
  cambio_color: 4000,
  kit1: 8000,
  kit3: 24000,
  kit5: 40000
};

// ===== BOT LISTO =====
client.once("ready", () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

// ===== COMANDO !calcular =====
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!calcular")) {

    const args = message.content.split(" ").slice(1);
    let total = 0;
    let detalle = "";

    for (let i = 0; i < args.length; i += 2) {

      const servicio = args[i];
      const cantidad = parseInt(args[i + 1]);

      if (precios[servicio] && cantidad) {
        const subtotal = precios[servicio] * cantidad;
        total += subtotal;

        detalle += `${servicio} x${cantidad} = ${subtotal.toLocaleString()}$\n`;
      }
    }

    message.reply(
      `📄 PRESUPUESTO:\n\n${detalle}\n💰 TOTAL: ${total.toLocaleString()}$`
    );
  }
});

// ===== LOGIN DISCORD =====
console.log("TOKEN existe:", TOKEN ? "SI" : "NO");
client.login(TOKEN);

// ===== SERVIDOR WEB PARA RENDER =====
const app = express();

app.get("/", (req, res) => {
  res.send("Bot activo");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor web activo");
});