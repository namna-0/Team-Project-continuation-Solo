import { Input } from "@/components/ui/input";
import { FormDataType } from "./Types";

type Step3Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  dayLabels: Record<string, string>;
};

export const Step3 = ({ formData, setFormData, dayLabels }: Step3Props) => {
  const days = Object.keys(formData.openingHours) as Array<
    keyof typeof formData.openingHours
  >;

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
                  setFormData((prev) => ({
                    ...prev,
                    openingHours: {
                      ...prev.openingHours,
                      [day]: {
                        ...prev.openingHours[day],
                        open: e.target.value,
                      },
                    },
                  }))
                }
                disabled={closed}
                className="w-28 bg-white/10 text-white border-white"
              />
              <span className="text-white">→</span>
              <Input
                type="time"
                value={close}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    openingHours: {
                      ...prev.openingHours,
                      [day]: {
                        ...prev.openingHours[day],
                        close: e.target.value,
                      },
                    },
                  }))
                }
                disabled={closed}
                className="w-28 bg-white/10 text-white border-white"
              />
              <label className="flex items-center gap-2 ml-2">
                <input
                  type="checkbox"
                  checked={closed}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      openingHours: {
                        ...prev.openingHours,
                        [day]: {
                          ...prev.openingHours[day],
                          closed: e.target.checked,
                        },
                      },
                    }))
                  }
                />
                Амарна
              </label>
            </div>
          );
        })}
      </div>

      <h2 className="text-xl font-bold mt-8">Цайны цаг</h2>
      <div className="flex items-center gap-3">
        <span className="w-24">Эхлэх</span>
        <Input
          type="time"
          value={formData.lunchBreak.start}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              lunchBreak: {
                ...prev.lunchBreak,
                start: e.target.value,
              },
            }))
          }
          className="w-28 bg-white/10 text-white border-white"
        />
        <span className="text-white">→</span>
        <Input
          type="time"
          value={formData.lunchBreak.end}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              lunchBreak: {
                ...prev.lunchBreak,
                end: e.target.value,
              },
            }))
          }
          className="w-28 bg-white/10 text-white border-white"
        />
      </div>
    </div>
  );
};
