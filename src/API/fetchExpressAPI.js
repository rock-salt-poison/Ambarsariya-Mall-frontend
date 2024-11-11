import axios from 'axios';

const link = import.meta.env.VITE_REACT_APP_EXPRESS_API_LINK;

export const fetchDomains = async () => {
    const response = await axios.get(`${link}/api/ambarsariya/domains`);
    return response.data;
};

export const fetchSectors = async () => {
    const response = await axios.get(`${link}/api/ambarsariya/sectors`);
    return response.data;
};

export const fetchDomainSectors = async (domain_id) => {
    const response = await axios.get(`${link}/api/ambarsariya/domain-sectors/${domain_id}`);
    return response.data;
};

export const postEshop = async (eshopData) => {
    try {
        const response = await axios.post(`${link}/api/ambarsariya/sell/eshop`, eshopData);
        console.log(response.data.shop_access_token, response.data.user_access_token);
        return response.data;
    } catch (error) {
        console.error("Error posting e-shop data:", error);
        throw error; 
    }
};

export const updateEshopData = async (eshopData, shopAccessToken) => {
    try {
      const response = await axios.put(
        `${link}/api/ambarsariya/sell/buyeshop/${shopAccessToken}`, 
        eshopData
      );
      console.log('E-shop data updated:', response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating e-shop data:", error);
      throw error; 
    }
  };

export const getShopUserData = async (shopAccessToken) => {
    try{
      const response = await axios.get(`${link}/api/ambarsariya/sell/shop-user-data?shop_access_token=${shopAccessToken}`);
      console.log('Shop and user data : ', response.data);
      return response.data;
    }catch(error){
      console.log('Error fetching shop-user data', error);
      throw error;
    }
}
  
  

