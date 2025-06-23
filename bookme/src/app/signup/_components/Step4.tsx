// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { step4Schema, Step4SchemaType } from "./Schemas";
// import { FormDataType } from "@/app/company/[companyName]/settings/_components/HeaderSection";
// import { Label } from "@/components/ui/label";
// import { Upload, X } from "lucide-react";

// type Step4Props = {
//   formData: FormDataType;
//   setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
//   handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   companyImagePreview: string[];
//   removeCompanyImage: (index: number) => void;
//   handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   logoPreview: string;
//   removeLogo: () => void;
//   errors?: Record<string, string[]>;
// };

// export const Step4 = ({
//   formData,
//   setFormData,
//   handleImageChange,
//   companyImagePreview,
//   removeCompanyImage,
//   handleLogoChange,
//   logoPreview,
//   removeLogo,
//   errors = {},
// }: Step4Props) => {
//   const {
//     register,
//     formState: { errors: formErrors },
//     trigger,
//   } = useForm<Step4SchemaType>({
//     resolver: zodResolver(step4Schema),
//     defaultValues: formData,
//     mode: "onChange",
//   });

//   const handleInputChange = async (
//     field: keyof Step4SchemaType,
//     value: string
//   ) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     await trigger(field);
//   };

//   return (
//     <>
//       <div>
//         <Label className="block mb-2 text-white">Компаний лого *</Label>
//         <div className="border-2 border-dashed border-white/30 rounded-lg p-6 bg-white/5 hover:bg-white/10 transition-colors">
//           {logoPreview ? (
//             <div className="relative">
//               <img
//                 src={logoPreview}
//                 alt="Лого"
//                 className="h-32 w-32 object-contain rounded mx-auto bg-white/10 p-2"
//               />
//               <button
//                 type="button"
//                 onClick={removeLogo}
//                 className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors shadow-lg"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           ) : (
//             <div className="relative text-center cursor-pointer">
//               <Upload className="w-8 h-8 mx-auto text-white/70 mb-2" />
//               <p className="text-sm text-white/70">Лого оруулах</p>
//               <p className="text-xs text-white/50 mt-1">
//                 PNG, JPG, JPEG форматтай файл
//               </p>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleLogoChange}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//               />
//             </div>
//           )}
//         </div>
//         {(formErrors.logo || errors.logo) && (
//           <p className="text-red-400 text-sm mt-1">
//             {formErrors.logo?.message || errors.logo?.[0]}
//           </p>
//         )}
//       </div>
//       <div>
//         <Label className="block mb-2 text-white">
//           Компаний background зураг *
//         </Label>
//         <div className="border-2 border-dashed border-white/30 rounded-lg p-6 bg-white/5 hover:bg-white/10 transition-colors">
//           {logoPreview ? (
//             <div className="relative">
//               <img
//                 src={logoPreview}
//                 alt="Лого"
//                 className="h-32 w-32 object-contain rounded mx-auto bg-white/10 p-2"
//               />
//               <button
//                 type="button"
//                 onClick={removeLogo}
//                 className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors shadow-lg"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           ) : (
//             <div className="relative text-center cursor-pointer">
//               <Upload className="w-8 h-8 mx-auto text-white/70 mb-2" />
//               <p className="text-sm text-white/70">Лого оруулах</p>
//               <p className="text-xs text-white/50 mt-1">
//                 PNG, JPG, JPEG форматтай файл
//               </p>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleLogoChange}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//               />
//             </div>
//           )}
//         </div>
//         {(formErrors.logo || errors.logo) && (
//           <p className="text-red-400 text-sm mt-1">
//             {formErrors.logo?.message || errors.logo?.[0]}
//           </p>
//         )}
//       </div>
//       <div>
//         <Label className="block mb-2 text-white">
//           Компаний танилцуулга зураг *
//         </Label>
//         <div className="border-2 border-dashed border-white/30 rounded-lg p-6 bg-white/5 hover:bg-white/10 transition-colors">
//           {logoPreview ? (
//             <div className="relative">
//               <img
//                 src={logoPreview}
//                 alt="Лого"
//                 className="h-32 w-32 object-contain rounded mx-auto bg-white/10 p-2"
//               />
//               <button
//                 type="button"
//                 onClick={removeLogo}
//                 className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors shadow-lg"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//           ) : (
//             <div className="relative text-center cursor-pointer">
//               <Upload className="w-8 h-8 mx-auto text-white/70 mb-2" />
//               <p className="text-sm text-white/70">Лого оруулах</p>
//               <p className="text-xs text-white/50 mt-1">
//                 PNG, JPG, JPEG форматтай файл
//               </p>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleLogoChange}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//               />
//             </div>
//           )}
//         </div>
//         {(formErrors.logo || errors.logo) && (
//           <p className="text-red-400 text-sm mt-1">
//             {formErrors.logo?.message || errors.logo?.[0]}
//           </p>
//         )}
//       </div>
//       <div className="mt-8">
//         <Label className="block mb-2 text-white">
//           Компаний зургууд (олон зураг)
//         </Label>
//         <div className="border-2 border-dashed border-white/30 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition-colors">
//           {companyImagePreview.length > 0 ? (
//             <>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
//                 {companyImagePreview.map((src, index) => (
//                   <div key={index} className="relative group">
//                     <img
//                       src={src}
//                       alt={`Зураг ${index + 1}`}
//                       className="h-24 w-full object-cover rounded bg-white/10"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeCompanyImage(index)}
//                       className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <div className="relative text-center cursor-pointer border-t border-white/20 pt-4">
//                 <Upload className="w-6 h-6 mx-auto text-white/70 mb-1" />
//                 <p className="text-sm text-white/70">Нэмэлт зураг оруулах</p>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   multiple
//                   onChange={handleImageChange}
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                 />
//               </div>
//             </>
//           ) : (
//             <div className="relative text-center cursor-pointer py-8">
//               <Upload className="w-8 h-8 mx-auto text-white/70 mb-2" />
//               <p className="text-sm text-white/70">Зургууд оруулах</p>
//               <p className="text-xs text-white/50 mt-1">
//                 Олон зураг сонгож болно
//               </p>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageChange}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//               />
//             </div>
//           )}
//         </div>
//         <p className="text-[15px] text-white mt-[3px]">
//           Компаний орчин, хамт олны зураг, хэрэглэгчдэд харуулахыг хүссэн зургаа
//           оруулна уу.
//         </p>
//       </div>
//     </>
//   );
// };
