import axiosInstance from "../intercepter/intercepter";
const apiService = {
  // Create a new script
  createScript: async (scriptData) => {
    try {
      const response = await axiosInstance.post('/script/script/', scriptData);
      return response.data;
    } catch (error) {
      console.error('Error creating script:', error);
      throw error;
    }
  },

  // Get all scripts
  getScripts: async () => {
    try {
      const response = await axiosInstance.get('/script/script/?limit=1000');
      return response.data;
    } catch (error) {
      console.error('Error fetching scripts:', error);
      throw error;
    }
  },

  // Get a specific script by ID
  getScriptById: async (scriptId) => {
    try {
      const response = await axiosInstance.get(`/script/script/${scriptId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching script:', error);
      throw error;
    }
  },
  getScriptTypes:async()=>{
    try {
      const response = await axiosInstance.get(`/script/script-type`);
      return response.data;
    } catch (error) {
      console.error('Error fetching script:', error);
      throw error;
    }
  },
  runScript:async(data)=>{
    try {
      const response = await axiosInstance.post(`/ex/execute`,data);
      return response.data;
    } catch (error) {
      console.error('Error fetching script:', error);
      throw error;
    }
  },
  createEnvironment:async(data)=>{
    try {
      const response = await axiosInstance.post(`/script/clone-repo`,data);
      return response.data;
    } catch (error) {
      console.error('Error fetching script:', error);
      throw error;
    }
  }
};

export default apiService