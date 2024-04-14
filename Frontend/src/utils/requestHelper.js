import { URL_BASE, USER_TOKEN } from "./constants";

const RequestHelper = {
  get: async function (url, queryParams = {}, responseType = "json") {
    try {
      const token = localStorage.getItem(USER_TOKEN);

      // Serialize query parameters
      const queryString = new URLSearchParams(queryParams).toString();
      const queryUrl = queryString ? `${url}?${queryString}` : url;

      const response = await fetch(URL_BASE + queryUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 400) {
          const responseData = await response.json();
          throw new Error(
            responseData.msg || responseData.message || "Error de solicitud"
          );
        } else {
          throw new Error("Error de solicitud");
        }
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
        if (response.status === 400) {
          const responseData = await response.json();
          throw new Error(
            responseData.msg || responseData.message || "Error de solicitud"
          );
        } else {
          throw new Error("Error de solicitud");
        }
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
        if (response.status === 400) {
          const responseData = await response.json();
          throw new Error(
            responseData.msg || responseData.message || "Error de solicitud"
          );
        } else {
          throw new Error("Error de solicitud");
        }
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
        if (response.status === 400) {
          const responseData = await response.json();
          throw new Error(
            responseData.msg || responseData.message || "Error de solicitud"
          );
        } else {
          throw new Error("Error de solicitud");
        }
      }
      return await response.json();
    } catch (error) {
      console.error("Error making DELETE request:", error);
      throw error;
    }
  },
};

export default RequestHelper;
