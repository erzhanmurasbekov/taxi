import Image from "next/image";
import preLoaderImage from "../../assets/images/loader-screen.jpg";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-yellow-400 bg-gradient-to-t from-yellow-400 to-yellow-200">
      <div className="relative w-96 h-96 md:w-20 md:h-20">
        <Image
          src={preLoaderImage.src}
          alt="preloader"
          layout="fill"
          objectFit="contain"
          priority={true}
        />
      </div>
    </div>
  );
};

export default Loader;
