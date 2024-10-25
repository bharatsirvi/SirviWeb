import axios from "axios";

export const deleteBusiness = async (businessId) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/business/${businessId}`,
      {
        method: "DELETE"
      }
    );
    console.log("businesss deleted successfully", response.data);
    try {
      const delIamgeRes = await axios.delete(
        `${process.env.BACKEND_URL}/business/${businessId}/image`
      );
      console.log("businesss image deleted successfully", delIamgeRes);
    } catch (error) {
      console.error("Error deleting image businesss:");
      throw error;
    }
  } catch (error) {
    console.error("Error deleting image businesss:");
    throw error;
  }
};
// export const getAllBusinessAddByUser = (userId) => {
//   return axios
//     .get(`${process.env.BACKEND_URL}/business/?added_by=${userId}`)
//     .then(async (response) => {
//       const businessesWithImages = await Promise.all(
//         response.data.map(async (business) => {
//           const imageResponse = await axios.get(
//             `${process.env.BACKEND_URL}/business/${business._id}/image`,
//             {
//               // responseType: "blob"
//             }
//           );
//           if (imageResponse.data.size === 0) {
//             business.image = null;
//             return business;
//           } else {
//             const imageURI = URL.createObjectURL(imageResponse.data);
//             // console.log("imageResponse", imageURI);
//             business.image = imageURI;
//             // console.log(business);
//             return business;
//           }
//         })
//       );

//       console.log("businessesWithImages", businessesWithImages);
//       return businessesWithImages;
//     })
//     .catch((error) => {
//       console.error("Failed to fetch", error);
//       throw error;
//     });
// };

export const getAllBusinessAddByUser = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/business/?added_by=${userId}`
    );
    const businessesWithImages = await Promise.all(
      response.data.map(async (business) => {
        try {
          const imageResponse = await axios.get(
            `${process.env.BACKEND_URL}/business/${business._id}/image`,
            {
              responseType: "blob"
            }
          );
          if (imageResponse == null) {
            business.image = null;
          } else {
            // business.image = URL.createObjectURL(imageResponse.data);

            // or

            const reader = new FileReader();
            const promise = new Promise((resolve, reject) => {
              reader.onloadend = () => {
                business.image = reader.result;
                resolve(business);
              };
              reader.onerror = () => {
                reject(new Error("Failed to convert image blob to Base64"));
              };
            });
            reader.readAsDataURL(imageResponse.data);
            await promise;

            ///// above convert image blob to base64
          }
        } catch (error) {
          console.error(
            `Failed to fetch image for business ${business._id}`,
            error
          );
          business.image = null;
        }
        return business;
      })
    );
    return businessesWithImages;
  } catch (error) {
    console.error("Failed to fetch businesses", error);
    throw error;
  }
};
