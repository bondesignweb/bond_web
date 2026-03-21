/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import About from './pages/About';
import BlogBotanicalPrintsLaurelCreek from './pages/BlogBotanicalPrintsLaurelCreek';
import BlogFloralWallcoveringsLaurelCreek from './pages/BlogFloralWallcoveringsLaurelCreek';
import BlogMixingMaterialsKitchen from './pages/BlogMixingMaterialsKitchen';
import BlogPaintPaletteLaurelCreek from './pages/BlogPaintPaletteLaurelCreek';
import BlogWallcoveringsSapphireRidge from './pages/BlogWallcoveringsSapphireRidge';
import CanyonCool from './pages/CanyonCool';
import Contact from './pages/Contact';
import FifthAvenueRanch from './pages/FifthAvenueRanch';
import Home from './pages/Home';
import IntoTheWoods from './pages/IntoTheWoods';
import Journal from './pages/Journal';
import LaurelCreek from './pages/LaurelCreek';
import ModernMeadowRemodel from './pages/ModernMeadowRemodel';
import Portfolio from './pages/Portfolio';
import SapphireRidge from './pages/SapphireRidge';
import Services from './pages/Services';
import Summit4 from './pages/Summit4';
import TheBridgeHouse from './pages/TheBridgeHouse';
import TheCourtHouse from './pages/TheCourtHouse';
import Press from "./pages/Press";
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "BlogBotanicalPrintsLaurelCreek": BlogBotanicalPrintsLaurelCreek,
    "BlogFloralWallcoveringsLaurelCreek": BlogFloralWallcoveringsLaurelCreek,
    "BlogMixingMaterialsKitchen": BlogMixingMaterialsKitchen,
    "BlogPaintPaletteLaurelCreek": BlogPaintPaletteLaurelCreek,
    "BlogWallcoveringsSapphireRidge": BlogWallcoveringsSapphireRidge,
    "CanyonCool": CanyonCool,
    "Contact": Contact,
    "FifthAvenueRanch": FifthAvenueRanch,
    "Home": Home,
    "IntoTheWoods": IntoTheWoods,
    "Journal": Journal,
    "LaurelCreek": LaurelCreek,
    "ModernMeadowRemodel": ModernMeadowRemodel,
    "Portfolio": Portfolio,
    "SapphireRidge": SapphireRidge,
    "Services": Services,
    "Summit4": Summit4,
    "TheBridgeHouse": TheBridgeHouse,
    "TheCourtHouse": TheCourtHouse,
    "Press": Press,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};