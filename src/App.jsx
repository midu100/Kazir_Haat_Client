import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import LayoutOne from './layout/LayoutOne'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './layout/AdminLayout'
import AdminDashboardHome from './pages/admin/AdminDashboardHome'
import AdminCategories from './pages/admin/AdminCategories'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminUsers from './pages/admin/AdminUsers'
import AllProducts from './pages/AllProducts'

const App = () => {

  const myRoute = createBrowserRouter(createRoutesFromElements(
    <Route>
      {/* ====== Public Site (with Navbar + Footer) ====== */}
      <Route path='/' element={<LayoutOne/>}>
        <Route index element={<Home/>} />
        <Route path='/products' element={<AllProducts/>} />
        <Route path='/productdetails' element={<ProductDetails/>} />
        <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        <Route path='/checkout' element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Route>

      {/* ====== Admin Panel (completely separate layout, no public Navbar/Footer) ====== */}
      <Route 
        path='/admin' 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout/>
          </ProtectedRoute>
        } 
      >
        <Route index element={<AdminDashboardHome/>} />
        <Route path='categories' element={<AdminCategories/>} />
        <Route path='products' element={<AdminProducts/>} />
        <Route path='orders' element={<AdminOrders/>} />
        <Route path='users' element={<AdminUsers/>} />
      </Route>
    </Route>
  ))

  return (
    <>
      <RouterProvider router={myRoute} />
    </>
  )
}

export default App