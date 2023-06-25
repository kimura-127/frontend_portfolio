import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil'
import "../styles/globals.css"
import Navigation from './components/navigation';
import { useRouter } from 'next/router';




function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();

  return (
    <>
      {/* ナビゲーションを表示する画面を制限 */}
      {router.pathname === '/' || router.pathname === "/login" || router.pathname === "/registration" || router.pathname === "/about" ?
        (<div />) : (<Navigation />)
      }
      {/* Recoilを使用するため */}
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
