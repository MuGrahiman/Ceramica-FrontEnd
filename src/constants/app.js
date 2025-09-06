import { CATEGORIES } from "./inventory";
import fallBackImage from "../assets/defualtimage.png";
import tablewarePic from "../assets/ceramics/tablewarepics.avif";
import newArrivals from "../assets/ceramics/newArrivals.avif";
import handCrafted from "../assets/ceramics/handCrafted.avif";
import blackDecor from "../assets/ceramics/blackDecor.jpeg";
import blueDecor from "../assets/ceramics/blueDecor.jpeg";
import whiteDecor from "../assets/ceramics/whiteDecor.jpeg";
import whiteBlueFlowerPot from "../assets/ceramics/whiteBlueFlowerPot.jpeg";
import premiumCeramicPlates from "../assets/ceramics/premium_ceramic_plate.avif";
import mugsCategories from "../assets/ceramics/Mugs_Categories.avif";
import cupsCategories from "../assets/ceramics/cups_category.avif";
import decorCategories from "../assets/ceramics/decorOg_category.avif";
import jarCategories from "../assets/ceramics/Gemini_Ceramic_Jar.png";
import jugCategories from "../assets/ceramics/jug_category.avif";
import bowlsCategories from "../assets/ceramics/bowls_categories.avif";
import saucerCategories from "../assets/ceramics/Gemini_saucer_Ceramic.png";
import kettleCategories from "../assets/ceramics/kettle_ceramic.png";
import { toPascalCase } from "../utils/generals";
import { FaAddressBook, FaBoxOpen, FaCommentAlt, FaHeart, FaHome, FaUserCircle, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaStore } from "react-icons/fa";

export const FALL_BACK_IMAGE = fallBackImage

export const APP = "STORE-APP-USER"

export const APP_SIDEBAR_TOGGLE_KEY = 'app.sidebar.toggle';

export const USER_ROLES = {
    ADMIN: "admin",
    CLIENT: "client",
};

export const DUMMY_IMAGE =
    "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1741285501~exp=1741289101~hmac=d629ec566545ef3b552d0a991e687ad2ed1aab9f352ae82b2df97cd3ad059148&w=740";

export const COMPANY_VALUES = [
    {
        title: "Artisan Crafted",
        desc: "Each piece is individually handcrafted by skilled artisans",
        icon: "✋",
    },
    {
        title: "Sustainable",
        desc: "Eco-friendly materials and processes",
        icon: "🌱",
    },
    {
        title: "Unique Designs",
        desc: "Limited edition collections you won't find elsewhere",
        icon: "✨",
    },
    {
        title: "Durable Quality",
        desc: "Made to last with premium materials",
        icon: "💎",
    },
];

export const COMPANY_LEGACY = {
    stats: [
        { value: 36, label: "Years of Craftsmanship" },
        { value: 12, label: "Master Artisans" },
        { value: 200, label: "Unique Glaze Recipes" },
        { value: 10000, label: "Pieces Created" },
    ],
    story: [
        "Founded in 1988, our studio began as a small collective of ceramic artists dedicated to preserving traditional techniques.",
        "Over three decades, we've trained generations of artisans while developing over 200 proprietary glaze recipes.",
        "Each piece reflects our commitment to functional art that honors heritage while adapting to modern lifestyles.",
    ],
};


export const HERO_SLIDES = [
    {
        title: "Handcrafted Elegance",
        subtitle: "Discover our artisan ceramic collection",
        cta: "Shop Now",
        image: handCrafted,
    },
    {
        title: "New Arrivals",
        subtitle: "Fresh from the kiln - limited editions",
        cta: "Explore",
        image: newArrivals,
    },
    {
        title: "Tableware Sets",
        subtitle: "Complete your dining experience",
        image: tablewarePic,
        cta: "View Collection",

    },
];

export const GALLERY_SLIDES = [
    {
        src: blackDecor,
        alt: "Premium Black Decor Image",
    },
    {
        src: blueDecor,
        alt: "Premium Blue Decor Image",
    },
    {
        src: whiteDecor,
        alt: "Premium White Decor Image",
    },
    {
        src: whiteBlueFlowerPot,
        alt: "Premium White Blue Flower Pot Image",
    },

];

export const CATEGORY_SLIDES = [
    {
        name: toPascalCase( CATEGORIES.PLATES ),
        image: premiumCeramicPlates, count: 42,
    },
    {
        name: toPascalCase( CATEGORIES.MUGS ),
        image: mugsCategories, count: 36,
    },
    {
        name: toPascalCase( CATEGORIES.KETTLE ),
        image: kettleCategories, count: 28,
    },
    {
        name: toPascalCase( CATEGORIES.BOWLS ),
        image: bowlsCategories, count: 51,
    },
    {
        name: toPascalCase( CATEGORIES.DECORATES ),
        image: decorCategories, count: 23,
    },
    {
        name: toPascalCase( CATEGORIES.JARS ),
        image: jarCategories, count: 19,
    },
    {
        name: toPascalCase( CATEGORIES.CUPS ),
        image: cupsCategories, count: 43,
    },
    {
        name: toPascalCase( CATEGORIES.SAUCER ),
        image: saucerCategories, count: 38,
    },
    {
        name: toPascalCase( CATEGORIES.JUGS ),
        image: jugCategories, count: 54,
    },
];

export const GUIDES = [
    {
        title: "Browse Collections",
        desc: "Discover our seasonal and thematic collections curated for different dining aesthetics.",
    },
    {
        title: "Custom Orders",
        desc: "Request bespoke pieces tailored to your specific needs and preferences.",
    },
    {
        title: "Care Guides",
        desc: "Learn how to maintain your ceramics to preserve their beauty for years.",
    },
];

export const CLIENT_SIDEBAR_TOGGLE_KEY = 'client.sidebar.toggle';


export const CLIENT_NAVIGATION_PATHS = [
    { icon: FaHome, name: "Home", path: "/" },
    { icon: FaStore, name: "Shop", path: "/shop" }, // Using Bag Icon
    { icon: FaAddressBook, name: "About", path: "/about" },
    { icon: FaCommentAlt, name: "Contact", path: "/contact" },
    { icon: FaShoppingCart, name: "Cart", path: "/cart" },
    { icon: FaUserCircle, name: "Profile", path: "/profile" },
    { icon: FaHeart, name: "Wishlist", path: "/wishlist" },
    { icon: FaBoxOpen, name: "Orders", path: "/orders" },
    { icon: FaSignInAlt, name: "Login", path: "/login" },
    { icon: FaSignOutAlt, name: "Logout", path: "#" },
];



export const CLIENT_LOGIN_PATH = { name: "Login", path: "/login" }

