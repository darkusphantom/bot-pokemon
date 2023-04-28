import i18n from "../config/i18";

// Función para cambiar el idioma
export const setLanguage = (ctx, language) => {
  ctx.session.language = language;
  i18n.changeLanguage(language);
};

// Función para recuperar el idioma
export const getLanguage = (ctx) => {
  return ctx.session.language || "en";
};
