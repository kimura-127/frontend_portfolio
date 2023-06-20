import { useEffect } from "react";
import { useRecoilState } from 'recoil';
import { isLogginState } from 'atoms/isLogginState';
import EarthPage from "./components/earth";




export default function Home() {
  const [isLoggin, setIsLoggin] = useRecoilState(isLogginState);


  return (
    <>
      <EarthPage />
    </>
  );
}
