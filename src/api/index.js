import axios from 'axios'
const expressBaseUrl = 'http://localhost:1000'
import { getCookie } from '../components/common/Services'

const api = axios.create({
    baseURL: expressBaseUrl,
    withCredentials: true, // critical for cookies to work
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor to attach token from cookie to Authorization header just in case
api.interceptors.request.use(
    (config) => {
        const token = getCookie('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const authServices = {
    signup: async (data) => {
        const res = await api.post('/auth/signup', data)
        return res.data
    },
    verifyOtp: async (data) => {
        const res = await api.post('/auth/verifyotp', data)
        return res.data
    },
    resendOtp: async (data) => {
        const res = await api.post('/auth/resendotp', data)
        return res.data
    },
    signin: async (data) => {
        const res = await api.post('/auth/signin', data)
        return res.data
    },
    forgotPassword: async (data) => {
        const res = await api.post('/auth/forgot-password', data)
        return res.data
    },
    resetPassword: async (data) => {
        const res = await api.post('/auth/reset-password', data)
        return res.data
    },
    getProfile: async () => {
        const res = await api.get('/auth/profile')
        return res.data
    },
    logout: async () => {
        const res = await api.post('/auth/logout')
        return res.data
    }
}

export const categoryServices = {
    getCategories: async () => {
        const res = await api.get('/category')
        return res.data
    },
    createCategory: async (formData) => {
        const res = await api.post('/category/create', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res.data
    },
    updateCategory: async (id, formData) => {
        const res = await api.put(`/category/update/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res.data
    },
    deleteCategory: async (id) => {
        const res = await api.delete(`/category/delete/${id}`)
        return res.data
    }
}

export const productServices = {
    getProducts: async (params = {}) => {
        const res = await api.get('/product', { params })
        return res.data
    },
    getProductDetails: async (id) => {
        const res = await api.get(`/product/${id}`)
        return res.data
    },
    addProduct: async (formData) => {
        const res = await api.post('/product/add', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res.data
    },
    updateProduct: async (id, formData) => {
        const res = await api.put(`/product/update/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res.data
    },
    deleteProduct: async (id) => {
        const res = await api.delete(`/product/delete/${id}`)
        return res.data
    }
}

export const cartServices = {
    getCart: async () => {
        const res = await api.get('/cart')
        return res.data
    },
    addToCart: async (data) => {
        const res = await api.post('/cart/add', data)
        return res.data
    },
    updateCartItem: async (itemId, quantity) => {
        const res = await api.put(`/cart/update/${itemId}`, { quantity })
        return res.data
    },
    removeFromCart: async (itemId) => {
        const res = await api.delete(`/cart/remove/${itemId}`)
        return res.data
    },
    clearCart: async () => {
        const res = await api.delete('/cart/clear')
        return res.data
    }
}

export const orderServices = {
    placeOrder: async (data) => {
        const res = await api.post('/order/place', data)
        return res.data
    },
    getMyOrders: async () => {
        const res = await api.get('/order/my-orders')
        return res.data
    },
    getOrderDetails: async (id) => {
        const res = await api.get(`/order/${id}`)
        return res.data
    },
    getAllOrders: async (params = {}) => {
        const res = await api.get('/order/admin/all', { params })
        return res.data
    },
    updateOrderStatus: async (id, orderStatus) => {
        const res = await api.put(`/order/admin/status/${id}`, { orderStatus })
        return res.data
    }
}

export const userServices = {
    getAllUsers: async () => {
        const res = await api.get('/auth/admin/users')
        return res.data
    },
    updateUserRole: async (id, role) => {
        const res = await api.put(`/auth/admin/users/role/${id}`, { role })
        return res.data
    },
    deleteUser: async (id) => {
        const res = await api.delete(`/auth/admin/users/delete/${id}`)
        return res.data
    }
}

export const dashboardServices = {
    getStats: async () => {
        const res = await api.get('/dashboard/stats')
        return res.data
    }
}

export const videoServices = {
    getVideos: async () => {
        const res = await api.get('/video')
        return res.data
    },
    addVideo: async (formData) => {
        const res = await api.post('/video/add', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        return res.data
    },
    deleteVideo: async (id) => {
        const res = await api.delete(`/video/delete/${id}`)
        return res.data
    }
}

