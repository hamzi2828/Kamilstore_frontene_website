/**
 * Central icon module.
 *
 * The site previously imported icons directly from `lucide-react`. To give the
 * UI a more classic, solid look we now source every icon from Font Awesome
 * (via `react-icons/fa`) but re-export them under the original names so that all
 * existing call-sites keep working unchanged.
 *
 * To swap the icon set again in the future, only this file needs to change.
 */
import type { IconType } from "react-icons";
import {
  FaExclamationCircle,
  FaArrowLeft,
  FaArrowRight,
  FaAward,
  FaCheckCircle,
  FaMoneyBillAlt,
  FaBell,
  FaBuilding,
  FaCalendarAlt,
  FaCar,
  FaCheck,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaClock,
  FaMicrochip,
  FaCreditCard,
  FaDumbbell,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaFire,
  FaGamepad,
  FaGlobe,
  FaThLarge,
  FaHeadset,
  FaHeart,
  FaHome,
  FaInstagram,
  FaList,
  FaSpinner,
  FaLock,
  FaSignOutAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBars,
  FaCommentDots,
  FaMinus,
  FaBox,
  FaPercent,
  FaPhoneAlt,
  FaPlus,
  FaUndo,
  FaSave,
  FaSearch,
  FaPaperPlane,
  FaCog,
  FaShareAlt,
  FaShieldAlt,
  FaTshirt,
  FaShoppingBag,
  FaShoppingCart,
  FaSlidersH,
  FaMobileAlt,
  FaMagic,
  FaStar,
  FaStore,
  FaTag,
  FaTags,
  FaTrashAlt,
  FaChartLine,
  FaTruck,
  FaTwitter,
  FaUser,
  FaUserCircle,
  FaUsers,
  FaWallet,
  FaTimes,
  FaYoutube,
  FaBolt,
  FaCertificate,
} from "react-icons/fa";

/** Shared icon component type (formerly `LucideIcon`). */
export type LucideIcon = IconType;

export const AlertCircle: IconType = FaExclamationCircle;
export const ArrowLeft: IconType = FaArrowLeft;
export const ArrowRight: IconType = FaArrowRight;
export const Award: IconType = FaAward;
export const BadgeCheck: IconType = FaCertificate;
export const Banknote: IconType = FaMoneyBillAlt;
export const Bell: IconType = FaBell;
export const Building2: IconType = FaBuilding;
export const Calendar: IconType = FaCalendarAlt;
export const CalendarDays: IconType = FaCalendarAlt;
export const Car: IconType = FaCar;
export const Check: IconType = FaCheck;
export const CheckCircle: IconType = FaCheckCircle;
export const CheckCircle2: IconType = FaCheckCircle;
export const ChevronDown: IconType = FaChevronDown;
export const ChevronLeft: IconType = FaChevronLeft;
export const ChevronRight: IconType = FaChevronRight;
export const Clock: IconType = FaClock;
export const Cpu: IconType = FaMicrochip;
export const CreditCard: IconType = FaCreditCard;
export const Dumbbell: IconType = FaDumbbell;
export const Edit2: IconType = FaEdit;
export const Eye: IconType = FaEye;
export const EyeOff: IconType = FaEyeSlash;
export const Facebook: IconType = FaFacebookF;
export const Flame: IconType = FaFire;
export const Gamepad2: IconType = FaGamepad;
export const Globe: IconType = FaGlobe;
export const Grid: IconType = FaThLarge;
export const Headphones: IconType = FaHeadset;
export const Heart: IconType = FaHeart;
export const Home: IconType = FaHome;
export const Instagram: IconType = FaInstagram;
export const LayoutGrid: IconType = FaThLarge;
export const List: IconType = FaList;
export const Loader2: IconType = FaSpinner;
export const Lock: IconType = FaLock;
export const LogOut: IconType = FaSignOutAlt;
export const Mail: IconType = FaEnvelope;
export const MapPin: IconType = FaMapMarkerAlt;
export const Menu: IconType = FaBars;
export const MessageCircle: IconType = FaCommentDots;
export const Minus: IconType = FaMinus;
export const Package: IconType = FaBox;
export const Percent: IconType = FaPercent;
export const Phone: IconType = FaPhoneAlt;
export const Plus: IconType = FaPlus;
export const RotateCcw: IconType = FaUndo;
export const Save: IconType = FaSave;
export const Search: IconType = FaSearch;
export const Send: IconType = FaPaperPlane;
export const Settings: IconType = FaCog;
export const Share2: IconType = FaShareAlt;
export const Shield: IconType = FaShieldAlt;
export const ShieldCheck: IconType = FaShieldAlt;
export const Shirt: IconType = FaTshirt;
export const ShoppingBag: IconType = FaShoppingBag;
export const ShoppingCart: IconType = FaShoppingCart;
export const SlidersHorizontal: IconType = FaSlidersH;
export const Smartphone: IconType = FaMobileAlt;
export const Sparkles: IconType = FaMagic;
export const Star: IconType = FaStar;
export const Store: IconType = FaStore;
export const Tag: IconType = FaTag;
export const Tags: IconType = FaTags;
export const Trash2: IconType = FaTrashAlt;
export const TrendingUp: IconType = FaChartLine;
export const Truck: IconType = FaTruck;
export const Twitter: IconType = FaTwitter;
export const User: IconType = FaUser;
export const UserCircle: IconType = FaUserCircle;
export const Users: IconType = FaUsers;
export const Wallet: IconType = FaWallet;
export const Watch: IconType = FaClock;
export const X: IconType = FaTimes;
export const Youtube: IconType = FaYoutube;
export const Zap: IconType = FaBolt;
