import { useTranslation } from 'react-i18next';

export const useI18n = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  const getCurrentLanguage = () => {
    return i18n.language;
  };
  
  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    isRTL: i18n.dir() === 'rtl',
  };
};
