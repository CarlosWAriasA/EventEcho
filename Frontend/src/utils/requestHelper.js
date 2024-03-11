import { URL_BASE, USER_TOKEN } from "./constans";

const RequestHelper = {
  get: async function (url) {
    try {
      const token = localStorage.getItem(USER_TOKEN);
      const response = await fetch(URL_BASE + url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error making GET request:", error);
      throw error;
    }
  },

  post: async function (url, data) {
    try {
      const token = localStorage.getItem(USER_TOKEN);
      const response = await fetch(URL_BASE + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw response;
      }
      return await response.json();
    } catch (error) {
      console.error("Error making POST request:", error);
      throw error;
    }
  },

  put: async function (url, data) {
    try {
      const token = localStorage.getItem(USER_TOKEN);
      const response = await fetch(URL_BASE + url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw response;
      }
      return await response.json();
    } catch (error) {
      console.error("Error making PUT request:", error);
      throw error;
    }
  },
};

export default RequestHelper;
