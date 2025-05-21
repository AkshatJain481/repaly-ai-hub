import { JSX } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { BsCameraReelsFill } from "react-icons/bs";
import {
  FaFacebook,
  FaLinkedin,
  FaTelegram,
  FaUser,
  FaUserGraduate,
  FaUserPlus,
  FaUserTie,
  FaGlobe,
  FaRegGrinSquint,
  FaBriefcase,
  FaLaughBeam,
  FaSmile,
  FaRocket,
  FaCoffee,
} from "react-icons/fa";
import {
  FaComputer,
  FaSprayCanSparkles,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { GiLargeDress } from "react-icons/gi";
import {
  IoFastFood,
  IoFitness,
  IoLogoWhatsapp,
  IoMail,
  IoCall,
} from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { RiUserVoiceFill } from "react-icons/ri";

const CardIcon: React.FC<{ icon: string; color: string }> = ({
  icon,
  color,
}) => {
  const iconMap: Record<string, JSX.Element> = {
    FaUserTie: <FaUserTie size={20} color={color} />,
    RiUserVoiceFill: <RiUserVoiceFill size={20} color={color} />,
    FaUser: <FaUser size={20} color={color} />,
    FaUserPlus: <FaUserPlus size={20} color={color} />,
    FaUserGraduate: <FaUserGraduate size={20} color={color} />,
    IoFitness: <IoFitness size={20} color={color} />,
    FaComputer: <FaComputer size={20} color={color} />,
    GiLargeDress: <GiLargeDress size={20} color={color} />,
    FaSprayCanSparkles: <FaSprayCanSparkles size={20} color={color} />,
    BsCameraReelsFill: <BsCameraReelsFill size={20} color={color} />,
    IoFastFood: <IoFastFood size={20} color={color} />,
    MdCategory: <MdCategory size={20} color={color} />,
    AiFillInstagram: <AiFillInstagram size={20} color={color} />,
    FaFacebook: <FaFacebook size={20} color={color} />,
    FaLinkedin: <FaLinkedin size={20} color={color} />,
    IoLogoWhatsapp: <IoLogoWhatsapp size={20} color={color} />,
    FaSquareXTwitter: <FaSquareXTwitter size={20} color={color} />,
    FaTelegram: <FaTelegram size={20} color={color} />,
    IoMail: <IoMail size={20} color={color} />,
    IoCall: <IoCall size={20} color={color} />,
    FaGlobe: <FaGlobe size={20} color={color} />,
    FaRegGrinSquint: <FaRegGrinSquint size={20} color={color} />,
    FaBriefcase: <FaBriefcase size={20} color={color} />,
    FaLaughBeam: <FaLaughBeam size={20} color={color} />,
    FaSmile: <FaSmile size={20} color={color} />,
    FaRocket: <FaRocket size={20} color={color} />,
    FaCoffee: <FaCoffee size={20} color={color} />,
  };
  return iconMap[icon] || undefined;
};

export default CardIcon;
