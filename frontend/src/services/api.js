// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 30000,
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     console.error('API Error:', error.response?.data || error.message);
//     return Promise.reject(error.response?.data || { error: error.message });
//   }
// );

// // ============================================
// // RFP APIs
// // ============================================

// export const rfpAPI = {
//   create: async (naturalLanguageInput) => {
//     return api.post('/rfps', { naturalLanguageInput });
//   },

//   getAll: async () => {
//     return api.get('/rfps');
//   },

//   getById: async (id) => {
//     return api.get(`/rfps/${id}`);
//   },

//   sendToVendors: async (id, vendorIds) => {
//     return api.post(`/rfps/${id}/send`, { vendorIds });
//   },

//   updateStatus: async (id, status) => {
//     return api.patch(`/rfps/${id}/status`, { status });
//   },

//   delete: async (id) => {
//     return api.delete(`/rfps/${id}`);
//   }
// };

// // ============================================
// // Vendor APIs
// // ============================================

// export const vendorAPI = {
//   create: async (vendorData) => {
//     return api.post('/vendors', vendorData);
//   },

//   getAll: async () => {
//     return api.get('/vendors');
//   },

//   getById: async (id) => {
//     return api.get(`/vendors/${id}`);
//   },

//   update: async (id, vendorData) => {
//     return api.put(`/vendors/${id}`, vendorData);
//   },

//   delete: async (id) => {
//     return api.delete(`/vendors/${id}`);
//   }
// };

// // ============================================
// // Proposal APIs
// // ============================================

// export const proposalAPI = {
//   submit: async (rfpId, vendorId, proposalText) => {
//     return api.post('/proposals', { rfpId, vendorId, proposalText });
//   },

//   getByRFP: async (rfpId) => {
//     return api.get(`/rfps/${rfpId}/proposals`);
//   },

//   compare: async (rfpId) => {
//     return api.get(`/rfps/${rfpId}/proposals/compare`);
//   },

//   getById: async (id) => {
//     return api.get(`/proposals/${id}`);
//   },

//   checkEmailResponses: async (rfpId) => {
//     return api.post(`/rfps/${rfpId}/check-responses`);
//   }
// };

// // ============================================
// // Health Check
// // ============================================

// export const healthCheck = async () => {
//   return api.get('/health');
// };

// export default api;



import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const rfpAPI = {
  create: async (naturalLanguageInput) => {
    return api.post('/rfps', { naturalLanguageInput });
  },
  sendToVendors: async (id, vendorIds) => {
    return api.post(`/rfps/${id}/send`, { vendorIds });
  }
};

export const vendorAPI = {
  getAll: async () => {
    return api.get('/vendors');
  }
};

export const proposalAPI = {
  getByRFP: async (rfpId) => {
    return api.get(`/rfps/${rfpId}/proposals`);
  }
};

export default api;