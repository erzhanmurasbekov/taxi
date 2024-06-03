import Layout from "../../layout/Layout";

import FromInput from "./FromInput";
import Map from "./Map";
import ToInput from "./ToInput";
import Options from "./Options";
import OrderButton from "./OrderButton";

const Home = () => {
  return (
    <Layout title="Home">
      <Map />
      <div className="absolute z-10 left-1/4 h-max w-6/12 bottom-10 xl:absolute xl:w-[450px] xl:top-5 xl:left-5">
        <FromInput />
        <ToInput />
        <Options />
        <OrderButton />
      </div>
    </Layout>
  );
};

export default Home;
