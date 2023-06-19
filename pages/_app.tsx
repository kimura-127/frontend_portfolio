import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil'
import "../styles/globals.css"
import Navigation from './components/navigation';
import { useRouter } from 'next/router';



function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  return (
    <>
      {router.pathname === '/' || router.pathname === "/login" || router.pathname === "/registration" ?
        (<div />) : (<Navigation />)
      }
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
