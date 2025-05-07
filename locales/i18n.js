import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules, Platform } from "react-native";

const getDeviceLanguage = () => {
  try {
    let locale = "en";

    if (Platform.OS === "ios") {
      const settings = NativeModules.SettingsManager.settings;
      locale =
        settings.AppleLocale ||
        (settings.AppleLanguages && settings.AppleLanguages[0]) ||
        "en";
    } else {
      const androidLocale = NativeModules.I18nManager?.localeIdentifier;
      locale = androidLocale || "en";
    }

    return locale.split("_")[0]; // e.g., "en_US" → "en"
  } catch (error) {
    console.warn(
      "Failed to detect device language. Falling back to English.",
      error
    );
    return "en";
  }
};

const resources = {
  en: {
    translation: {
      //Main application
      no_internet: "No internet!",
      please_reconnect: "Please Reconnect!",
      reload_app: "Reload app",
      //Settings
      change_language: "Change language",
      about_me: "About me",
      about_me1: "Hello people!",
      about_me2: "Melo here!",
      about_me3: "Here is a short story why I decided to do all of this",
      about_me4:
        "My dream has always been to make a difference in the world, and I want to impact it through education",
      about_me5:
        "Since I still didn't find a corporate job, I decided to jump into entrepreneurship, and here I am",
      about_me6:
        "I hope you like what I created and am still creating, any advices, I am open to hear what you have to say, so below this textbox you clicked there is my contact number, anytime you have the opportunity to give feedback I will be glad to receive it",

      contact_info: "Contact info",
      //Home
      reset: "Reset",
      confirm_delete_data: "Delete data?",
      really_confirm_delete_data: "Are you sure you want to delete ALL data?",
      confirm: "Confirm",
      cancel: "Cancel",
      play_sound: "Play audio",
      easy_section: "Easy",
      medium_section: "Medium",
      hard_section: "Hard",
      //Sections Easy,Medium,Hard
      oldest: "Oldest",
      most_recent: "Most recent",
      load_more: "Load more",
      remaining: "remaining",
    },
  },
  pt: {
    translation: {
      //Main application
      no_internet: "Sem internet!",
      please_reconnect: "Por Favor Reconecte!",
      reload_app: "Reinicie o APP",
      //Settings
      change_language: "Mude de idioma",
      about_me: "Sobre mim",
      about_me1: "Olá, pessoal!",
      about_me2: "Melo aqui!",
      about_me3:
        "Aqui está uma breve história sobre por que decidi fazer tudo isso",
      about_me4:
        "Meu sonho sempre foi fazer a diferença no mundo, e quero impactá-lo por meio da educação",
      about_me5:
        "Como ainda não encontrei um emprego corporativo, decidi mergulhar no empreendedorismo, e aqui estou eu",
      about_me6:
        "Espero que gostem do que criei e do que ainda estou criando. Se tiverem qualquer conselho, estou aberto a ouvir o que vocês têm a dizer. Abaixo desta caixa de texto, vocês encontrarão meu número de contato. Sempre que tiverem a oportunidade de dar um feedback, ficarei muito feliz em recebê-lo",
      contact_info: "Informações para contato",
      //Home
      reset: "Resetar",
      confirm_delete_data: "Deletar dados?",
      really_confirm_delete_data:
        "Você tem certeza que quer deletar TODOS os dados?",
      confirm: "Confirmar",
      cancel: "Cancelar",
      play_sound: "Tocar áudio",
      easy_section: "Fácil",
      medium_section: "Médio",
      hard_section: "Difícil",
      //Sections Easy,Medium,Hard
      oldest: "Mais antigo",
      most_recent: "Mais recente",
      load_more: "Carregar mais",
      remaining: "restantes",
    },
  },
};

i18n
  .use(initReactI18next) // ✅ Only this
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
