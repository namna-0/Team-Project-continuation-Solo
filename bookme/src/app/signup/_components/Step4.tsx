"use client";

import { FormDataType } from "./Types";

type Step4Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  dayLabels: Record<string, string>;
  companyImagePreview: string[];
  logoPreview: string;
};

export const Step4 = ({
  formData,
  setFormData,
  companyImagePreview,
  dayLabels,
  logoPreview,
}: Step4Props) => {
  const days = Object.keys(formData.openingHours) as Array<
    keyof typeof formData.openingHours
  >;

  return (
    <div className="text-white max-w-2xl mx-auto p-6 rounded-lg space-y-6">
      <h2 className="text-xl font-bold">Нийт мэдээлэл</h2>

      <div>
        <h3 className="font-semibold mb-2">Бүртгэлийн мэдээлэл</h3>
        <p>Имэйл: {formData.email}</p>
        <p>Салоны нэр: {formData.companyName}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Салоны дэлгэрэнгүй</h3>
        <p>Тайлбар: {formData.description || "—"}</p>
        <p>Хаяг: {formData.address}</p>
        <p>Хот: {formData.city}</p>
        <p>Утас: {formData.phone}</p>
        <p>Вебсайт: {formData.website || "—"}</p>

        {logoPreview && (
          <div className="mt-2">
            <p className="text-sm mb-1">Лого:</p>
            <img
              src={logoPreview}
              alt="Лого"
              className="h-16 object-contain border rounded"
            />
          </div>
        )}

        {companyImagePreview.length > 0 && (
          <div className="mt-2">
            <p className="text-sm mb-1">Салоны зургууд:</p>
            <div className="flex flex-wrap gap-2">
              {companyImagePreview.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Зураг ${index + 1}`}
                  className="h-16 object-contain border rounded"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Ажлын цаг</h3>
        <ul className="space-y-1">
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
  );
};
