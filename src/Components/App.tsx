import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "../Contexts/CartContext";
import "./App.css";
// components
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
// pages
import AboutPage from "./AboutPage/AboutPage";
import ArchitecturePage from "./AboutPage/ArchitecturePage";
import CheckoutPage from "./CheckoutPage/CheckoutPage";
import ContactPage from "./ContactPage/ContactPage";
import DisclaimerPage from "./DisclaimerPage/DisclaimerPage";
import MainPage from "./MainPage/MainPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import ProductPage from "./ProductPage/ProductPage";
import SearchPage from "./SearchPage/SearchPage";
// interfaces
import { ICategory } from "../Interfaces/ICategory";
import AlertPopup from "./AlertPopup/AlertPopup";

export default function App() {
  const [category, setCategory] = useState<ICategory>(null!);

  return (
    <CartProvider>
      <Router>
        <div className="content">
          <Header />
          <main>
            <Sidebar category={category} setCategory={setCategory} />
            <Routes>
              <Route
                path=""
                element={
                  <>
                    <AlertPopup />
                    <MainPage />
                  </>
                }
              />
              <Route path="/product/:categoryId" element={<ProductPage />} />
              <Route path="/search/:searchText" element={<SearchPage />} />
              <Route path="/About" element={<AboutPage />} />
              <Route path="/Architecture" element={<ArchitecturePage />} />
              <Route
                path="checkout"
                element={
                  <>
                    <AlertPopup />
                    <CheckoutPage />
                  </>
                }
              />
              <Route path="/Contact" element={<ContactPage />} />
              <Route path="/Disclaimer" element={<DisclaimerPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
