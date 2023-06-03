import { useEffect } from "react";
import { useRecoilState } from 'recoil';
import { isLogginState } from './atoms/isLogginState';
import EarthPage from "./components/earth";
import Cookies from 'js-cookie';




export default function Home() {
  const [isLoggin, setIsLoggin] = useRecoilState(isLogginState);

  useEffect(() => {
    const jwtToken = Cookies.get('jwt');
  }, []);


  return (
    <>
      <EarthPage />
    </>
  );
}
