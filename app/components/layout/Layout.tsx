import { FC, ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import FavIcon from "../../assets/images/loader-screen.jpg";
import Loader from "../ui/Loader";
interface ILayout {
  title: string;
}
const Layout: FC<ILayout> = ({ children, title }) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>{title} | Yayindex Taxi </title>
        <meta name="Taxi" content="Taxi app" />
        <link rel="shortcut icon" href={FavIcon.src} type="image/png" />
      </Head>

      <Script
        strategy="beforeInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.MAP_KEY}&libraries=places`}
      />
      <div className="mx-auto relative overflow-hidden">
        {isLoading ? <Loader /> : children}
      </div>
    </div>
  );
};

export default Layout;
