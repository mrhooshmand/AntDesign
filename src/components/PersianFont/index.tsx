import { getLocale } from '@umijs/max';
import { ConfigProvider } from 'antd';
import React, { useEffect, useState } from 'react';

export const IRAN_SANS_FONT_FAMILY =
  "IRANSans, Tahoma, 'Segoe UI', sans-serif";

const isPersianLocale = (locale: string) =>
  locale.toLowerCase().startsWith('fa');

const PersianFont: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocaleState] = useState(getLocale);
  const persian = isPersianLocale(locale);

  useEffect(() => {
    const sync = () => setLocaleState(getLocale());
    window.addEventListener('languagechange', sync);
    return () => window.removeEventListener('languagechange', sync);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.classList.toggle('lang-fa', persian);
  }, [locale, persian]);

  if (!persian) {
    return children;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: IRAN_SANS_FONT_FAMILY,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default PersianFont;
