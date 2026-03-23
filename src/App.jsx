import PageTracker from "@/components/PageTracker";
import PasswordGate from "@/components/PasswordGate";
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Admin from "@/pages/Admin";

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : () => <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

function GatedApp() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  const content = (
    <>
      <PageTracker />
      <Routes>
        <Route path="/" element={
          <LayoutWrapper currentPageName={mainPageKey}>
            <MainPage />
          </LayoutWrapper>
        } />
        {Object.entries(Pages).map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            }
          />
        ))}
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={
          <LayoutWrapper currentPageName="404">
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="font-serif text-6xl text-[#3D3D3D] font-light mb-4">404</h1>
                <p className="text-[#6B6B6B] text-lg font-light mb-8">Page not found</p>
                <a href="/" className="border border-[#3D3D3D] text-[#3D3D3D] px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#3D3D3D] hover:text-white transition-all font-light">
                  Return Home
                </a>
              </div>
            </div>
          </LayoutWrapper>
        } />
      </Routes>
    </>
  );

  // Admin bypasses the password gate
  if (isAdmin) return content;

  return <PasswordGate>{content}</PasswordGate>;
}

function App() {
  return (
    <Router>
      <GatedApp />
    </Router>
  );
}

export default App
