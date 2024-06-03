import Layout from "../../layout/Layout";

import FromInput from "./FromInput";
import Map from "./Map";
import ToInput from "./ToInput";
import Options from "./Options";
import OrderButton from "./OrderButton";
import { useTypedSelector } from "@/app/hooks/useTypedSelecor";

const Home = () => {
  const { from, to, selectedOption, travelTime } = useTypedSelector(
    (state) => state.taxi
  );
  console.log(from, to, selectedOption, travelTime);
  return (
    <Layout title="Home">
      <Map />
      <div className="absolute z-10 left-1/4 h-max w-52 bottom-10 xl:absolute xl:w-[450px] xl:top-5 xl:left-5 md:w-[450px]">
        <FromInput />
        <ToInput />
        <Options />
        <OrderButton />
      </div>
    </Layout>
  );
};

export default Home;
