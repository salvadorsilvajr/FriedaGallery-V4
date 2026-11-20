import { RiHome8Line } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { MdOutlineContactPhone } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";
import { PiSignOutFill } from "react-icons/pi";

export const Categories = [
  {
    id: "1",
    name: "Paintings",
    value: "Paintings",
    label: "Paintings",
    url: "/paintings",
  },
  {
    id: "2",
    name: "MixMedia",
    value: "MixMedia",
    label: "MixMedia",
    url: "/mixmedia",
  },
  {
    id: "3",
    name: "Drawings",
    value: "Drawings",
    label: "Drawings",
    url: "/drawings",
  },
  // {
  //   id: "4",
  //   name: "all",
  // },
];

export const MenuHeader = [
  {
    id: "1",
    name: "Logout",
    address: "/logout",
    icon: PiSignOutFill,
  },
  {
    id: "2",
    name: "Signin",
    address: "/signin",
    icon: FaUserPlus,
  },
];

export const MenuFooter = [
  {
    id: "1",
    name: "Home",
    address: "/",
    icon: RiHome8Line,
  },
  // {
  //   id: "2",
  //   name: "Gallery",
  //   address: "/gallery",
  //   icon: GrGallery,
  // },
  {
    id: "3",
    name: "Contact Us",
    address: "/contactus",
    icon: MdOutlineContactPhone,
  },
  // {
  //   id: "4",
  //   name: "Chat",
  //   address: "/chat",
  //   icon: FaUsers,
  // },
];

export const MenuAdmin = [
  {
    id: "1",
    name: "Profile",
    address: "/profile",
  },
  {
    id: "2",
    name: "New Piece",
    address: "/create",
  },
];

export const MenuOptions = [
  {
    id: "1",
    name: "Profile",
    address: "/profile",
  },
];

// export default Categories;

export const Ratings = [
  {
    id: "1",
    name: "Bad",
    value: 1,
    label: "Bad",
  },
  {
    id: "2",
    name: "Fair",
    value: 2,
    label: "Fair",
  },
  {
    id: "3",
    name: "Good",
    value: 3,
    label: "Good",
  },
  {
    id: "4",
    name: "VeryGood",
    value: 4,
    label: "Very Good",
  },
  {
    id: "5",
    name: "Excellent",
    value: 5,
    label: "Excellent",
  },
];
