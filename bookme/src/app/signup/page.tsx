"use client";

import { useState } from "react";
import Stepper, { Step } from "@/blocks/Components/Stepper/Stepper";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

export default function SalonSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    salonName: "",
    description: "",
    address: "",
    city: "",
    phone: "",
    website: "",
    logo: "",
    openingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "10:00", close: "16:00", closed: false },
      sunday: { open: "10:00", close: "16:00", closed: true },
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const days = Object.keys(formData.openingHours) as Array<
    keyof typeof formData.openingHours
  >;

  const dayLabels: Record<string, string> = {
    monday: "Даваа",
    tuesday: "Мягмар",
    wednesday: "Лхагва",
    thursday: "Пүрэв",
    friday: "Баасан",
    saturday: "Бямба",
    sunday: "Ням",
  };

  return (
    <div className="bg-gradient-to-b from-indigo-900 via-blue-400 to-sky-200 min-h-screen">
      <Stepper
        initialStep={1}
        onStepChange={(step) => setCurrentStep(step)}
        onFinalStepCompleted={() => {
          console.log("Илгээсэн мэдээлэл:", formData);
          alert("Мэдээлэл амжилттай илгээгдлээ! Console-г шалгана уу.");
        }}
        backButtonText="Буцах"
        nextButtonText="Дараах"
      >
        {/* Алхам 1 - Бүртгэлийн мэдээлэл */}
        <Step>
          <div className="space-y-6 text-white p-6 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-2">Бүртгэлийн мэдээлэл</h2>
            <div>
              <Label htmlFor="email" className="mb-2">Имэйл *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="text-white border-white placeholder-white"
                placeholder="ta@example.com"
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2">Нууц үг *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="text-white border-white placeholder-white"
                placeholder="••••••••"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="mb-2">Нууц үг давтах *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="text-white border-white placeholder-white"
                placeholder="••••••••"
              />
            </div>
            <div>
              <Label htmlFor="salonName" className="mb-2">Салоны нэр *</Label>
              <Input
                id="salonName"
                value={formData.salonName}
                onChange={(e) =>
                  setFormData({ ...formData, salonName: e.target.value })
                }
                className="text-white border-white placeholder-white"
                placeholder="Салоны нэр"
              />
            </div>
          </div>
        </Step>

        {/* Алхам 2 - Салоны мэдээлэл */}
        <Step>
          <div className="space-y-6 text-white p-6 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-2">Салоны мэдээлэл</h2>
            <div>
              <Label htmlFor="description" className="mb-2">Тайлбар</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-white/10 text-white border-white placeholder-white"
                placeholder="Салоныхоо талаар бичнэ үү..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="address" className="mb-2">Хаяг *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="bg-white/10 text-white border-white placeholder-white"
                  placeholder="Гудамж, байр"
                />
              </div>
              <div>
                <Label htmlFor="city" className="mb-2">Хот *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="bg-white/10 text-white border-white placeholder-white"
                  placeholder="Улаанбаатар"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="mb-2">Утас *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="bg-white/10 text-white border-white placeholder-white"
                  placeholder="+976 9911 2233"
                />
              </div>
              <div>
                <Label htmlFor="website" className="mb-2">Вебсайт</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="bg-white/10 text-white border-white placeholder-white"
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <div>
              <Label className="mb-2">Салоны лого</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer relative bg-white/10">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Лого урьдчилсан харагдац"
                    className="h-24 mx-auto object-contain"
                  />
                ) : (
                  <>
                    <Upload className="w-6 h-6 mx-auto text-white" />
                    <p className="text-sm text-white">Лого оруулна уу</p>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </Step>

        {/* Алхам 3 - Ажлын цаг */}
        <Step>
          <div className="space-y-6 text-white p-6 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Ажлын цаг</h2>
            <div className="space-y-3">
              {days.map((day) => {
                const { open, close, closed } = formData.openingHours[day];
                return (
                  <div
                    key={day}
                    className="flex flex-wrap sm:flex-nowrap items-center gap-3"
                  >
                    <div className="w-24 capitalize font-medium">
                      {dayLabels[day]}
                    </div>
                    <Input
                      type="time"
                      value={open}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          openingHours: {
                            ...formData.openingHours,
                            [day]: {
                              ...formData.openingHours[day],
                              open: e.target.value,
                            },
                          },
                        })
                      }
                      disabled={closed}
                      className="w-28 bg-white/10 text-white border-white"
                    />
                    <span className="text-white">→</span>
                    <Input
                      type="time"
                      value={close}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          openingHours: {
                            ...formData.openingHours,
                            [day]: {
                              ...formData.openingHours[day],
                              close: e.target.value,
                            },
                          },
                        })
                      }
                      disabled={closed}
                      className="w-28 bg-white/10 text-white border-white"
                    />
                    <label className="flex items-center gap-2 ml-2">
                      <input
                        type="checkbox"
                        checked={closed}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            openingHours: {
                              ...formData.openingHours,
                              [day]: {
                                ...formData.openingHours[day],
                                closed: e.target.checked,
                              },
                            },
                          })
                        }
                      />
                      Амарна
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </Step>

        {/* Алхам 4 - Нийтлэг харагдац */}
        <Step>
          <div className="text-white max-w-2xl mx-auto p-6 rounded-lg space-y-6">
            <h2 className="text-xl font-bold">Нийт мэдээлэл</h2>
            <div>
              <h3 className="font-semibold">Бүртгэлийн мэдээлэл</h3>
              <p>Имэйл: {formData.email}</p>
              <p>Салоны нэр: {formData.salonName}</p>
            </div>
            <div>
              <h3 className="font-semibold">Салоны дэлгэрэнгүй</h3>
              <p>Тайлбар: {formData.description || "—"}</p>
              <p>Хаяг: {formData.address}</p>
              <p>Хот: {formData.city}</p>
              <p>Утас: {formData.phone}</p>
              <p>Вебсайт: {formData.website || "—"}</p>
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Лого"
                  className="h-24 object-contain mt-2"
                />
              )}
            </div>
            <div>
              <h3 className="font-semibold">Ажлын цаг</h3>
              <ul className="list-disc list-inside">
                {days.map((day) => {
                  const { open, close, closed } = formData.openingHours[day];
                  return (
                    <li key={day} className="capitalize">
                      {dayLabels[day]}: {closed ? "Амарна" : `${open} - ${close}`}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  );
}
