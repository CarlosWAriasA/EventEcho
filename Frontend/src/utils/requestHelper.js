import { URL_BASE } from "./constans";

const RequestHelper = {
  get: async function (url) {
    try {
      const response = await fetch(URL_BASE + url);
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
      const response = await fetch(URL_BASE + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
};

export default RequestHelper;
