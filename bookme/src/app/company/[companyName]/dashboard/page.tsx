// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Calendar,
//   Users,
//   Star,
//   Plus,
//   Settings,
//   Scissors,
//   ClipboardList,
//   Clock,
//   TrendingUp,
// } from "lucide-react";
// import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
// import { Company } from "../_components/CompanyTypes";

// export default function DashboardPage() {
//   const [activeTab, setActiveTab] = useState("bookings");
//   const { company: loggedInCompany } = useCompanyAuth()
//   const [company, setCompany] = useState<Company | null>(null)
//   const [loading, setLoading] = useState<boolean>(false)
// useEffect(() => {
//   const fetchCompany = async () => {
//     try {
//       setLoading(true)
//       const
//     }
//   }
// })
//   const company = {
//     companyName: "Beauty Palace",
//     bookings: [
//       {
//         _id: "1",
//         customerName: "Сарнай",
//         serviceName: "Үс засах",
//         time: "10:00",
//       },
//       {
//         _id: "2",
//         customerName: "Болормаа",
//         serviceName: "Маникюр",
//         time: "11:30",
//       },
//       {
//         _id: "3",
//         customerName: "Ану",
//         serviceName: "Нүүр арчилгаа",
//         time: "14:00",
//       },
//       {
//         _id: "4",
//         customerName: "Мөнхөө",
//         serviceName: "Педикюр",
//         time: "15:30",
//       },
//     ],
//     employees: [
//       {
//         _id: "1",
//         employeeName: "Цэцэгмаа",
//         description: "Үс засагч мастер",
//         profileImage: "",
//       },
//       {
//         _id: "2",
//         employeeName: "Ундрах",
//         description: "Нүүр арчилгааны мастер",
//         profileImage: "",
//       },
//       {
//         _id: "3",
//         employeeName: "Баттуул",
//         description: "Маникюр/Педикюр",
//         profileImage: "",
//       },
//     ],
//     services: [
//       { _id: "1", name: "Үс засах", price: 25000 },
//       { _id: "2", name: "Маникюр", price: 20000 },
//       { _id: "3", name: "Педикюр", price: 25000 },
//       { _id: "4", name: "Нүүр арчилгаа", price: 35000 },
//       { _id: "5", name: "Массаж", price: 45000 },
//       { _id: "6", name: "Үс будах", price: 40000 },
//     ],
//   };

//   const Sidebar = () => (
//     <aside className="w-64 min-h-screen bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6 flex flex-col justify-between fixed shadow-2xl">
//       <div>
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">
//             💄 Beauty Salon
//           </h2>
//           <p className="text-purple-200 text-sm">Удирдлагын самбар</p>
//         </div>
//         <nav className="space-y-3">
//           {[
//             {
//               id: "bookings",
//               icon: ClipboardList,
//               label: "Захиалгууд",
//               color: "from-pink-400 to-pink-600",
//             },
//             {
//               id: "employees",
//               icon: Users,
//               label: "Ажилчид",
//               color: "from-blue-400 to-blue-600",
//             },
//             {
//               id: "services",
//               icon: Scissors,
//               label: "Үйлчилгээнүүд",
//               color: "from-green-400 to-green-600",
//             },
//             {
//               id: "settings",
//               icon: Settings,
//               label: "Тохиргоо",
//               color: "from-orange-400 to-orange-600",
//             },
//           ].map(({ id, icon: Icon, label, color }) => (
//             <button
//               key={id}
//               onClick={() => setActiveTab(id)}
//               className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
//                 activeTab === id
//                   ? `bg-gradient-to-r ${color} shadow-lg transform scale-105`
//                   : "hover:bg-purple-700/50"
//               }`}
//             >
//               <Icon className="w-5 h-5" />
//               <span className="font-medium">{label}</span>
//             </button>
//           ))}
//         </nav>
//       </div>
//       <button className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
//         Гарах
//       </button>
//     </aside>
//   );

//   const StatCard = (
//     Icon: any,
//     label: string,
//     value: number | string,
//     gradient: string,
//     iconBg: string
//   ) => (
//     <div
//       className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-6 text-white shadow-xl transform hover:scale-105 transition-all duration-300`}
//     >
//       <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
//       <div className="relative z-10">
//         <div className={`inline-flex p-3 rounded-2xl ${iconBg} mb-4`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//         <p className="text-white/80 text-sm font-medium mb-1">{label}</p>
//         <p className="text-3xl font-bold">{value}</p>
//       </div>
//     </div>
//   );

//   const renderTabContent = () => {
//     if (activeTab === "bookings") {
//       return (
//         <>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             🗕️ Үнөөдрийн захиалгууд
//           </h2>
//           <div className="grid gap-4">
//             {company.bookings.map((b) => (
//               <div
//                 key={b._id}
//                 className="bg-gradient-to-r from-pink-100 to-pink-200 border-pink-300 border-2 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//               >
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h4 className="font-bold text-gray-800">
//                       {b.customerName}
//                     </h4>
//                     <p className="text-gray-600 text-sm">{b.serviceName}</p>
//                   </div>
//                   <div className="flex items-center gap-1 text-gray-500">
//                     <Clock className="w-4 h-4" />
//                     <span className="text-sm">{b.time}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       );
//     }

//     if (activeTab === "employees") {
//       return (
//         <>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             👥 Манай баг
//           </h2>
//           <div className="grid gap-6">
//             {company.employees.map((e) => (
//               <div
//                 key={e._id}
//                 className="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
//               >
//                 <div className="flex items-center gap-4">
//                   <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 p-1">
//                     <img
//                       src={
//                         e.profileImage ||
//                         "https://images.unsplash.com/photo-1494790108755-2616c9c9b7d2?w=64&h=64&fit=crop"
//                       }
//                       className="w-full h-full rounded-full object-cover"
//                       alt={e.employeeName}
//                     />
//                   </div>
//                   <div className="flex-1">
//                     <h4 className="font-bold text-gray-800 text-lg">
//                       {e.employeeName}
//                     </h4>
//                     <p className="text-gray-600 text-sm">{e.description}</p>
//                     <div className="flex items-center gap-1 mt-2">
//                       <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                       <span className="text-sm text-gray-500">
//                         4.8 (124 үнэлгээ)
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       );
//     }

//     if (activeTab === "services") {
//       return (
//         <>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">
//             ✨ Үйлчилгээнүүд
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {company.services.map((s) => (
//               <div
//                 key={s._id}
//                 className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h4 className="font-bold text-gray-800 text-lg mb-2">
//                       {s.name}
//                     </h4>
//                     <div className="flex items-center gap-2">
//                       <Scissors className="w-4 h-4 text-gray-500" />
//                       <span className="text-sm text-gray-600">45 минут</span>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-2xl font-bold text-pink-600">
//                       ₮{s.price.toLocaleString()}
//                     </p>
//                     <span className="text-xs text-gray-500">үнэ</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       );
//     }

//     return (
//       <div className="text-center text-gray-500 text-lg">
//         ⚙️ Тохиргооны хэсэг одоогоор хоосон байна.
//       </div>
//     );
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
//       <Sidebar />
//       <main className="ml-64 flex-1 p-8">
//         <header className="text-center mb-8">
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
//             🌟 Салон Хяналтын Самбар
//           </h1>
//           <p className="text-gray-600">Захиалга болон үйлчилгээний мэдээлэл</p>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {StatCard(
//             Calendar,
//             "Өнөөдрийн захиалга",
//             company.bookings.length,
//             "from-pink-500 to-rose-600",
//             "bg-white/20"
//           )}
//           {StatCard(
//             Scissors,
//             "Нийт үйлчилгээ",
//             company.services.length,
//             "from-blue-500 to-cyan-600",
//             "bg-white/20"
//           )}
//           {StatCard(
//             Users,
//             "Ажилчид",
//             company.employees.length,
//             "from-green-500 to-emerald-600",
//             "bg-white/20"
//           )}
//           {StatCard(
//             TrendingUp,
//             "Сарын орлого",
//             "2.4M₮",
//             "from-purple-500 to-indigo-600",
//             "bg-white/20"
//           )}
//         </div>

//         <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
//           {renderTabContent()}
//         </div>
//       </main>
//     </div>
//   );
// }
