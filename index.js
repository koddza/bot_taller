const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ⚠️ PEGA TU TOKEN ENTRE LAS COMILLAS
const TOKEN = process.env.TOKEN;

// Lista de precios
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
  stancer: 4000,
  cambio_color: 4000,
  kit1: 8000,
  kit3: 24000,
  kit5: 40000
};

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
      `🧾 PRESUPUESTO:\n\n${detalle}\n💰 TOTAL: ${total.toLocaleString()}$`
    );
  }
});

client.login(TOKEN);