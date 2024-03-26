import { I18n } from 'i18n';
import path from 'path';

export const i18n = new I18n({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  directory: './locales'
});

export default i18n;