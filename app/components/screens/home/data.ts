import economyIcon from "../../../assets/images/options/economy-icon.png";
import bussinesIcon from "../../../assets/images/options/bussines-icon.png";
import comfortIcon from "../../../assets/images/options/comfort-icon.png";
import comfortIconPlus from "../../../assets/images/options/comfort-plus-icon.png";
import premierIcon from "../../../assets/images/options/premier-icon.png";
interface IList {
  _id: string;
  title: string;
  img: string;
  multiplier: number;
}
export const optionsList: IList[] = [
  {
    _id: "Economy-439",
    title: "Economy",
    img: economyIcon.src,
    multiplier: 3,
  },
  {
    _id: "Comfort-541",
    title: "Comfort",
    img: comfortIcon.src,
    multiplier: 4,
  },
  {
    _id: "Comfort-plus-583",
    title: "Comfort+",
    img: comfortIconPlus.src,
    multiplier: 5,
  },
  {
    _id: "Business-899",
    title: "Business",
    img: bussinesIcon.src,
    multiplier: 6,
  },
  {
    _id: "Premier-1609",
    title: "Premier",
    img: premierIcon.src,
    multiplier: 7,
  },
];
