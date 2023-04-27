import { Telegraf } from "telegraf";
import { configEnvironment } from "./config/config";

const { token } = configEnvironment();
const bot = new Telegraf(token);

// Middleware
bot.use((ctx, next) => {
  // Loguear la acción del usuario
  console.log(`Usuario ${ctx.from.username} ha realizado una acción`);

  // Pasar al siguiente middleware/manejador
  next();
});

// Manejador de comando
bot.command("start", (ctx) => {
  // Saludar al usuario
  ctx.reply(`¡Hola, ${ctx.from.first_name}!`);
});

// Manejador de texto
bot.on("text", (ctx) => {
  // Responder al usuario con el texto que ha enviado
  ctx.reply(`Has enviado el siguiente texto: ${ctx.message.text}`);
});

// Manejador de localización
bot.on("location", (ctx) => {
  // Responder al usuario con la ubicación que ha enviado
  const { latitude, longitude } = ctx.message.location;
  ctx.reply(`Has enviado la siguiente ubicación: (${latitude}, ${longitude})`);
});

bot.launch();

/*
El middleware se utiliza para registrar acciones realizadas por el usuario.
En este caso, hemos utilizado el middleware para registrar la acción del usuario en la consola.

Los manejadores se utilizan para responder a comandos, mensajes de texto y ubicaciones.
En el manejador de comando, hemos utilizado el método ctx.reply para saludar al usuario
cuando envía el comando /start. En el manejador de texto, hemos utilizado el método ctx.reply
para responder al usuario con el texto que ha enviado. En el manejador de localización,
hemos utilizado el método ctx.reply para responder al usuario con la ubicación que ha enviado.
*/
