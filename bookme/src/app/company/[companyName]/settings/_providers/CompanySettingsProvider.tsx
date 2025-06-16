// "use client";

// import axios from "axios";
// import {
//   createContext,
//   PropsWithChildren,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// type CompanyInformationAuth = {
//   handleInputCompanyLogo: (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => Promise<void>;
//   companyLogo: string | null;
//   // handleInputEmployeeImage: (
//   //   e: React.ChangeEvent<HTMLInputElement>
//   // ) => Promise<void>;
//   // employeeImage: string;
// };
// const CompanyInformation = createContext({} as CompanyInformationAuth);

// export const CompanySettingsProvider = ({ children }: PropsWithChildren) => {

//   const [employeeImage, setEmployeeImage] = useState("");

//   const uploadedImageFunction = async (file: File | null) => {
//     if (!file) {
//       return null;
//     }

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append(
//       "upload_preset",
//       process.env.NEXT_PUBLIC_UPLOAD_PRESET_DATA!
//     );

//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       // const result = response.data.url;

//       // return result;
//       return response.data.url;
//     } catch (error) {
//       console.error("Failed to upload image", error);
//     }
//   };

//   const handleInputCompanyLogo = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const files = e.target.files?.[0];

//     if (files) {
//       const result = await uploadedImageFunction(files);
//       setCompanyLogo(result);

//     }
//   };

//   // const handleInputEmployeeImage = async (
//   //   e: React.ChangeEvent<HTMLInputElement>
//   // ) => {
//   //   const files = e.target.files?.[0];
//   //   if (files) {
//   //     const result = await uploadedImageFunction(files);
//   //     setEmployeeImage(result);
//   //   }
//   // };

//   return (
//     <CompanyInformation.Provider
//       value={{
//         // handleInputCompanyLogo,
//         // companyLogo,
//         // handleInputEmployeeImage,
//         // employeeImage,
//       }}
//     >
//       {children}
//     </CompanyInformation.Provider>
//   );
// };

// // export const useSettings = () => {
// //   const context = useContext(CompanyInformation);
// //   if (!context) {
// //     throw new Error(
// //       "useSettings must be used within a CompanySettingsProvider"
// //     );
// //   }
// //   return context;
// // };
// export const useSettings = () => useContext(CompanyInformation);
