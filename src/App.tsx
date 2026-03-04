import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './components/layout/MainLayout';

// Dashboard pages
import Analytics from './pages/dashboard/Analytics';
import Ecommerce from './pages/dashboard/Ecommerce';
import Project from './pages/dashboard/Project';
import CRMDashboard from './pages/dashboard/CRM';

// Apps - Ecommerce
import Products from './pages/apps/ecommerce/Products';
import ProductDetails from './pages/apps/ecommerce/ProductDetails';
import Orders from './pages/apps/ecommerce/Orders';
import OrderDetails from './pages/apps/ecommerce/OrderDetails';
import Customers from './pages/apps/ecommerce/Customers';
import Cart from './pages/apps/ecommerce/Cart';
import Checkout from './pages/apps/ecommerce/Checkout';
import Sellers from './pages/apps/ecommerce/Sellers';

// Apps - Other
import Chat from './pages/apps/Chat';
import ProjectList from './pages/apps/projects/List';
import ProjectDetail from './pages/apps/projects/Detail';
import CreateProject from './pages/apps/projects/Create';
import TaskList from './pages/apps/tasks/List';
import Kanban from './pages/apps/tasks/Kanban';
import Invoice from './pages/apps/Invoice';
import CRM from './pages/apps/CRM';
import Users from './pages/apps/Users';
import Finance from './pages/apps/Finance';
import HRM from './pages/apps/HRM';
import Inbox from './pages/apps/email/Inbox';
import ReadEmail from './pages/apps/email/Read';
import SupportCenter from './pages/apps/SupportCenter';
import Promo from './pages/apps/Promo';
import MoreApps from './pages/apps/MoreApps';

// Settings
import ThemeCustomizer from './pages/settings/ThemeCustomizer';

// Custom Pages
import Starter from './pages/custom/Starter';
import Timeline from './pages/custom/Timeline';
import InvoicePage from './pages/custom/InvoicePage';
import FAQs from './pages/custom/FAQs';
import Pricing from './pages/custom/Pricing';
import Maintenance from './pages/custom/Maintenance';
import ComingSoon from './pages/custom/ComingSoon';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RecoverPassword from './pages/auth/RecoverPassword';
import LockScreen from './pages/auth/LockScreen';

// Error Pages
import Error404 from './pages/errors/Error404';
import Error500 from './pages/errors/Error500';

// Layouts
import LayoutOptions from './pages/layouts/LayoutOptions';
import Sidebars from './pages/layouts/Sidebars';
import Topbar from './pages/layouts/Topbar';

// UI Components
import Alerts from './pages/ui/Alerts';
import Buttons from './pages/ui/Buttons';
import Cards from './pages/ui/Cards';
import Modals from './pages/ui/Modals';
import Tabs from './pages/ui/Tabs';
import Typography from './pages/ui/Typography';

// Other Components
import Widgets from './pages/examples/Widgets';
import Charts from './pages/examples/Charts';
import Forms from './pages/examples/Forms';
import Tables from './pages/examples/Tables';
import Icons from './pages/examples/Icons';
import Maps from './pages/examples/Maps';
import Plugins from './pages/examples/Plugins';
import MenuLevels from './pages/examples/MenuLevels';
import DisabledMenu from './pages/examples/DisabledMenu';
import SpecialMenu from './pages/examples/SpecialMenu';

// Customization Pages (Aliased)
import CustomAnalytics from './customization/dashboard/Analytics';
import CustomDashboard from './customization/dashboard/Overview';
import CustomHome from './customization/Home';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/customization" replace />} />
            <Route path="/dashboard" element={<Navigate to="/dashboard/analytics" replace />} />
            
            {/* Customization Routes */}
            <Route path="/customization" element={<CustomHome />} />
            <Route path="/customization/dashboard" element={<CustomDashboard />} />
            <Route path="/customization/dashboard/analytics" element={<CustomAnalytics />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/ecommerce" element={<Ecommerce />} />
            <Route path="/dashboard/project" element={<Project />} />
            <Route path="/dashboard/crm" element={<CRMDashboard />} />
            
            {/* Apps - Ecommerce */}
            <Route path="/apps/ecommerce/products" element={<Products />} />
            <Route path="/apps/ecommerce/product-details" element={<ProductDetails />} />
            <Route path="/apps/ecommerce/orders" element={<Orders />} />
            <Route path="/apps/ecommerce/order-details" element={<OrderDetails />} />
            <Route path="/apps/ecommerce/customers" element={<Customers />} />
            <Route path="/apps/ecommerce/cart" element={<Cart />} />
            <Route path="/apps/ecommerce/checkout" element={<Checkout />} />
            <Route path="/apps/ecommerce/sellers" element={<Sellers />} />
            
            {/* Apps - Other */}
            <Route path="/apps/chat" element={<Chat />} />
            <Route path="/apps/projects/list" element={<ProjectList />} />
            <Route path="/apps/projects/detail" element={<ProjectDetail />} />
            <Route path="/apps/projects/create" element={<CreateProject />} />
            <Route path="/apps/tasks/list" element={<TaskList />} />
            <Route path="/apps/tasks/kanban" element={<Kanban />} />
            <Route path="/apps/invoice" element={<Invoice />} />
            <Route path="/apps/crm" element={<CRM />} />
            <Route path="/apps/users" element={<Users />} />
            <Route path="/apps/finance" element={<Finance />} />
            <Route path="/apps/hrm" element={<HRM />} />
            <Route path="/apps/email/inbox" element={<Inbox />} />
            <Route path="/apps/email/read" element={<ReadEmail />} />
            <Route path="/apps/support-center" element={<SupportCenter />} />
            <Route path="/apps/promo" element={<Promo />} />
            <Route path="/apps/more-apps" element={<MoreApps />} />
            
            {/* Settings */}
            <Route path="/settings/theme" element={<ThemeCustomizer />} />

            {/* Custom Pages */}
            <Route path="/pages/starter" element={<Starter />} />
            <Route path="/pages/timeline" element={<Timeline />} />
            <Route path="/pages/invoice" element={<InvoicePage />} />
            <Route path="/pages/faqs" element={<FAQs />} />
            <Route path="/pages/pricing" element={<Pricing />} />
            <Route path="/pages/maintenance" element={<Maintenance />} />
            <Route path="/pages/coming-soon" element={<ComingSoon />} />
            
            {/* Auth */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/recover-pw" element={<RecoverPassword />} />
            <Route path="/auth/lock-screen" element={<LockScreen />} />
            
            {/* Error Pages */}
            <Route path="/error-pages/404" element={<Error404 />} />
            <Route path="/error-pages/500" element={<Error500 />} />
            
            {/* Layouts */}
            <Route path="/layouts/options" element={<LayoutOptions />} />
            <Route path="/layouts/sidebars" element={<Sidebars />} />
            <Route path="/layouts/topbar" element={<Topbar />} />
            
            {/* UI Components */}
            <Route path="/ui/base/alerts" element={<Alerts />} />
            <Route path="/ui/base/buttons" element={<Buttons />} />
            <Route path="/ui/base/cards" element={<Cards />} />
            <Route path="/ui/base/modals" element={<Modals />} />
            <Route path="/ui/base/tabs" element={<Tabs />} />
            <Route path="/ui/base/typography" element={<Typography />} />
            
            {/* Other Components */}
            <Route path="/widgets" element={<Widgets />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/icons" element={<Icons />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/plugins" element={<Plugins />} />
            
            {/* Menu Items */}
            <Route path="/menu-levels" element={<MenuLevels />} />
            <Route path="/disabled-menu" element={<DisabledMenu />} />
            <Route path="/special-menu" element={<SpecialMenu />} />
            
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
                                                                  