import React, { Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/shared/Navbar'
import PrivateRoute from './components/PrivateRoute'
import ModernLoader from './components/shared/ModernLoader'

// Lazy load components for better performance
const Home = React.lazy(() => import('./components/home/Home'))
const Products = React.lazy(() => import('./components/products/Products'))
const About = React.lazy(() => import('./components/About'))
const Contact = React.lazy(() => import('./components/Contact'))
const Cart = React.lazy(() => import('./components/cart/Cart'))
const LogIn = React.lazy(() => import('./components/auth/LogIn'))
const Register = React.lazy(() => import('./components/auth/Register'))
const Checkout = React.lazy(() => import('./components/checkout/Checkout'))
const PaymentConfirmation = React.lazy(() => import('./components/checkout/PaymentConfirmation'))
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout'))
const Dashboard = React.lazy(() => import('./components/admin/dashboard/Dashboard'))
const AdminProducts = React.lazy(() => import('./components/admin/products/AdminProducts'))
const Sellers = React.lazy(() => import('./components/admin/sellers/Sellers'))
const Category = React.lazy(() => import('./components/admin/categories/Category'))
const Orders = React.lazy(() => import('./components/admin/orders/Orders'))

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Suspense fallback={<ModernLoader text="Loading page..." />}>
          <Routes>
            <Route path='/' element={ <Home />}/>
            <Route path='/products' element={ <Products />}/>
            <Route path='/about' element={ <About />}/>
            <Route path='/contact' element={ <Contact />}/>
            <Route path='/cart' element={ <Cart />}/>
          
            <Route path='/' element={<PrivateRoute />}>
              <Route path='/checkout' element={ <Checkout />}/>
              <Route path='/order-confirm' element={ <PaymentConfirmation />}/>
              <Route path='/profile/orders' element={ <Orders />}/>
            </Route>

            <Route path='/' element={<PrivateRoute publicPage />}>
              <Route path='/login' element={ <LogIn />}/>
              <Route path='/register' element={ <Register />}/>
            </Route>

             <Route path='/' element={<PrivateRoute adminOnly />}>
              <Route path='/admin' element={ <AdminLayout />}>
                <Route path='' element={<Dashboard />} />
                <Route path='products' element={<AdminProducts />} />
                <Route path='sellers' element={<Sellers />} />
                <Route path='orders' element={<Orders />} />
                <Route path='categories' element={<Category />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </Router>
      <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App
