"use client";

import { Input } from "@/components/ui/input";
import { FormDataType } from "../page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, Step3SchemaType } from "./Schemas";

type Step3Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  dayLabels: Record<string, string>;
};

export const Step3 = ({ formData, setFormData, dayLabels }: Step3Props) => {
  const days = Object.keys(formData.openingHours) as Array<
    keyof typeof formData.openingHours
  >;

  const {
    formState: { errors },
  } = useForm<Step3SchemaType>({
    resolver: zodResolver(step3Schema),
    defaultValues: formData,
    mode: "onChange",
  });

  return (
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
  );
};
