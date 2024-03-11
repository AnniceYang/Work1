/*
 * @Descripttion:
 * @version: 1.0.0
 * @@Company: ZZCYI
 * @Author: 贾
 * @Date: 2020-09-29 14:32:37
 * @LastEditors: 贾
 * @LastEditTime: 2020-12-23 18:14:41
 * @Update Descripttion:
 */
import Vue from "vue";
import VueI18n from "vue-i18n";
import Cookies from "js-cookie";
import elementEnLocale from "element-ui/lib/locale/lang/en"; // element-ui lang
import elementZhLocale from "element-ui/lib/locale/lang/zh-CN"; // element-ui lang
import elementEsLocale from "element-ui/lib/locale/lang/es"; // element-ui lang
import elementJaLocale from "element-ui/lib/locale/lang/ja"; // element-ui lang
import elementItLocale from "element-ui/lib/locale/lang/it"; // element-ui lang
import enLocale from "./en";
import zhLocale from "./zh";
import esLocale from "./es";
import jaLocale from "./ja";
import itLocale from "./it";

Vue.use(VueI18n);

const messages = {
  "zh-CN": {
    ...zhLocale,
    ...elementZhLocale,
  },
  "en-US": {
    ...enLocale,
    ...elementEnLocale,
  },

  es: {
    ...esLocale,
    ...elementEsLocale,
  },
  ja: {
    ...jaLocale,
    ...elementJaLocale,
  },
  it: {
    ...itLocale,
    ...elementItLocale,
  },
};

export function getLanguage() {
  const chooseLanguage = Cookies.get("language");
  if (chooseLanguage) return chooseLanguage;

  // if has not choose language
  const language = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return "zh-CN";
}

const i18n = new VueI18n({
  // set locale
  // options: en | zh | es
  locale: getLanguage() || "zh-CN",
  // set locale messages
  messages,
});

export default i18n;
