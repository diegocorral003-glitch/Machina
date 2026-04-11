import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Chatbot } from './components/Chatbot';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AdminLayout } from './components/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Public Layout Wrapper
function PublicLayout() {
  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-primary selection:text-dark-900">
      <Navbar />
      <Outlet />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
