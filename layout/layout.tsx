import React, { ReactNode } from 'react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { Theme } from '@emotion/react';
import Head from 'next/head';

import theme from '../theme/typography';

interface LayoutProps {
  children: ReactNode;
}

const chakraTheme = extendTheme(theme);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ChakraProvider theme={chakraTheme}>
      <EmotionThemeProvider theme={chakraTheme as Theme}>
        <CSSReset />
        <div>
          <Head>
            <link rel="icon" href="/logo.png" />
            <title>TimeTrek</title>
          </Head>
          {children}
        </div>
      </EmotionThemeProvider>
    </ChakraProvider>
  );
};

export default Layout;
