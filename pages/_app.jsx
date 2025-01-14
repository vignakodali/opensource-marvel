import { ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useRouter } from 'next/router';
import { GoogleAnalytics } from 'nextjs-google-analytics';

import firebaseConfig from '@/libs/firebase/config';

import GlobalProvider from '@/libs/providers/GlobalProvider';
import theme from '@/libs/theme/theme';

import '@/styles/globals.css';

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const { query } = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GlobalProvider>
          <GoogleAnalytics
            trackPageViews
            gaMeasurementId={firebaseConfig.measurementId}
          />
          {getLayout(<Component {...pageProps} />, query)}
        </GlobalProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
