import { URL_BASE, USER_TOKEN } from "./constants";

const RequestHelper = {
  get: async function (url, responseType = "json") {
    try {
      const token = localStorage.getItem(USER_TOKEN);
      const response = await fetch(URL_BASE + url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (
        responseType === "json" &&
        contentType &&
        contentType.includes("application/json")
      ) {
        return await response.json();
      } else if (
        responseType === "image" &&
        contentType &&
        contentType.startsWith("image")
      ) {
        return await response.blob();
      } else {
        throw new Error("Unsupported response type");
      }
    } catch (error) {
      console.error("Error making GET request:", error);
      throw error;
    }
  },

  post: async function (url, data, isFormData = false) {
    try {
      const token = localStorage.getItem(USER_TOKEN);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(URL_BASE + url, {
        method: "POST",
        headers: headers,
        body: isFormData ? data : JSON.stringify(data),
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

  put: async function (url, data, isFormData = false) {
    try {
      const token = localStorage.getItem(USER_TOKEN);
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(URL_BASE + url, {
        method: "PUT",
        headers: headers,
        body: isFormData ? data : JSON.stringify(data),
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

  delete: async function (url, data) {
    try {
      const token = localStorage.getItem(USER_TOKEN);
      const response = await fetch(URL_BASE + url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error making DELETE request:", error);
      throw error;
    }
  },
};

export default RequestHelper;
