import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useMemo } from 'react';
import { ThemeOptions } from '@mui/material';
import palette from './palette';
import typography from './typography';

interface Props {
  children: React.ReactNode
}

export default function ThemeConfig({ children }: Props) {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
    }),
    [],
  );

  const theme = createTheme(themeOptions as ThemeOptions);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
