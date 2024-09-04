import axios from 'axios';

export const SERVERURL = 'http://localhost:8080';
const API_BASE_URL = 'https://dummyjson.com'; // Existing dummy API base URL
const AUTH_API_BASE_URL = 'http://localhost:8080'; // New dummy auth API base URL

// Function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Existing functions
export const fetchProducts = () =>
  axios.get(`${SERVERURL}/api/products`, { headers: getAuthHeaders() });

export const fetchProductById = (id) =>
  axios.get(`${SERVERURL}/api/orders/products/${id}`, { headers: getAuthHeaders() });

export const fetchUsers = () =>
  axios.get(`${SERVERURL}/api/orders/users`, { headers: getAuthHeaders() });


export const addProduct = async (formData, id = null) => {
  try {
    // Construct the URL dynamically
    const url = id ? `${SERVERURL}/api/products/${id}` : `${SERVERURL}/api/products`;

    // Make the API request
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeaders() // Include auth headers if necessary
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error adding or updating product:', error.response ? error.response.data : error.message);
    throw error;
  }
};
export const deleteProduct = async ( id = null) => {
  try {

    // Make the API request
    const response = await axios.delete(`${SERVERURL}/api/products/${id}`, {
      headers: {
        // 'Content-Type': 'multipart/form-data',
        ...getAuthHeaders() // Include auth headers if necessary
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error adding or updating product:', error.response ? error.response.data : error.message);
    throw error;
  }
};


// New functions for authentication
export const login = async (username, password, user_type) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE_URL}/users/login`, { username, password, user_type },{ headers: getAuthHeaders() });
    const { token, user } = response.data;
    localStorage.setItem('authToken', token);
    return { token, user };
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const signup = async (username, password, email, dob, profile_pic, user_type, mobile_number) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE_URL}/users/signup`, {
      username,
      password,
      email,
      dob,
      profile_pic,
      user_type,
      mobile_number
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.error) {
      console.error('Signup error:', error.response.data.error);
    } else {
      console.error('Signup failed');
    }
    throw error;
  }
};

export const checkUsernameAvailability = (username) =>
  axios.get(`${AUTH_API_BASE_URL}/users/check-username`, {
    params: { username }
  });

export const uploadProfilePic = (username, formData) => {
  return axios.post(`${AUTH_API_BASE_URL}/api/update-profile-pic/${username}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getAuthHeaders()
    }
  });
};

export const updateUser = async (username, updatedUserData) => {
  try {
    const response = await axios.put(`${AUTH_API_BASE_URL}/users/update-details/${username}`, updatedUserData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Update user error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// New functions for product management
export const createOrUpdateProduct = async (productData) => {
  try {
    const response = await axios.post(`${SERVERURL}/api/products`, productData, {
      headers: getAuthHeaders()
    });
    return response.data;
  } catch (error) {
    console.error('Create or update product error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const uploadProductImage = async (username, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${SERVERURL}/api/update-product-image/${username}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeaders()
      }
    });
    return response.data;
  } catch (error) {
    console.error('Upload product image error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getProductsBySeller = async (sellerId) => {
  try {
      const response = await axios.get(`${SERVERURL}/api/products/seller/${sellerId}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...getAuthHeaders()
        }
      });
      return response.data; // Returns the list of products
  } catch (error) {
      console.error("Error fetching products by seller:", error);
      throw error;
  }
};

export const createOrder = async (order, userId) => {
  try {
    const response = await axios.post(API_BASE_URL, order, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error('Create order error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`${SERVERURL}/api/orders/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Get orders by user ID error:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${SERVERURL}/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Get order by ID error:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${SERVERURL}/api/orders/${orderId}/status`, null, { params: { status } });
    return response.data;
  } catch (error) {
    console.error('Update order status error:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const fetchCartItems = (userId) =>
  axios.get(`${SERVERURL}/api/cart/${userId}/items`, { headers: getAuthHeaders() });

export const clearCart = async (userId) => {
  try {
    await axios.delete(`${SERVERURL}/api/cart/${userId}/clear`, {
      headers: getAuthHeaders()
    });
  } catch (error) {
    console.error('Error clearing cart:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const removeItemFromCart = async (userId, cartItemId) => {
  try {
    const response = await axios.delete(`${SERVERURL}/api/cart/${userId}/remove/${cartItemId}`, {
      headers: getAuthHeaders()
    });

    return response.data;
  } catch (error) {
    console.error('Error removing item from cart:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const addItemToCart = async (userId, productId, quantity) => {
  try {
    const response = await axios.post(`${SERVERURL}/api/cart/${userId}/add`, null, {
      params: { productId, quantity },
      headers: getAuthHeaders()
    });

    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const fetchCartByUserId = (userId) =>
  axios.get(`${SERVERURL}/api/cart/${userId}`, { headers: getAuthHeaders() });


