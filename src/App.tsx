import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CatalogProvider } from './context/CatalogContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CallToActionModal } from './components/CallToActionModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { BlogPage } from './pages/BlogPage';
import { PolicyPage } from './pages/PolicyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  const [callbackProduct, setCallbackProduct] = useState<string | undefined>(undefined);

  const handleOpenCallback = (productName?: string) => {
    setCallbackProduct(productName);
    setIsCallbackOpen(true);
  };

  return (
    <BrowserRouter basename={(import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/'}>
      <CatalogProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-white text-gray-900">
            {/* Header */}
            <Header onOpenCallback={() => handleOpenCallback()} />

            {/* Main Page Content */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage onOpenCallback={handleOpenCallback} />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/product-category/:slug" element={<CategoryPage />} />
                <Route
                  path="/product/:slug"
                  element={<ProductDetailPage onOpenCallback={handleOpenCallback} />}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/shipping-policy" element={<PolicyPage />} />
                <Route path="/refund-policy" element={<PolicyPage />} />
                <Route path="/privacy-policy" element={<PolicyPage />} />
                <Route path="/terms" element={<PolicyPage />} />
                <Route path="/faq" element={<PolicyPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/account" element={<AboutPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />

            {/* Cart Slide-Over Drawer */}
            <CartDrawer />

            {/* Consultation / Callback Modal */}
            <CallToActionModal
              isOpen={isCallbackOpen}
              onClose={() => setIsCallbackOpen(false)}
              defaultProduct={callbackProduct}
            />
          </div>
        </CartProvider>
      </CatalogProvider>
    </BrowserRouter>
  );
};

export default App;
