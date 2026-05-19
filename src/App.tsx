import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/ProfilePage';
import { WishlistPage } from './pages/WishlistPage';
import { FAQPage } from './pages/FAQPage';
import { SizeGuidePage } from './pages/SizeGuidePage';
import { ShippingPage } from './pages/ShippingPage';
import { UPFTechPage } from './pages/UPFTechPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              {/* Auth pages — no shared layout (full screen) */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegisterPage />} />

              {/* Main layout */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalogo" element={<CatalogPage />} />
                <Route path="/producto/:id" element={<ProductDetailPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/perfil" element={<ProfilePage />} />
                <Route path="/favoritos" element={<WishlistPage />} />

                {/* Static info pages */}
                <Route path="/preguntas-frecuentes" element={<FAQPage />} />
                <Route path="/guia-de-tallas" element={<SizeGuidePage />} />
                <Route path="/envios-y-devoluciones" element={<ShippingPage />} />
                <Route path="/tecnologia-upf" element={<UPFTechPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="/privacidad" element={<PrivacyPage />} />
                <Route path="/terminos" element={<TermsPage />} />

                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
