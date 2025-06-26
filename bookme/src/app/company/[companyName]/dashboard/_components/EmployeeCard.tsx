"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { Employee } from "@/app/signup/_components/Types";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { api } from "@/axios";
import { toast } from "sonner";
import { CheckSvg } from "./assets/CheckSvg";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
type PropsType = {
  employee: Employee;
  getCompany: () => Promise<void>;
};

export const EmployeeCard = ({ employee, getCompany }: PropsType) => {
  const [isAvailable, setIsAvailable] = useState(true);

  const handleEmployeAvailable = async () => {
    if (!employee) return;
    try {
      const req = await api.put(`/employee/${employee._id}`, {
        availability: isAvailable,
      });
      await getCompany();
      setIsAvailable(!isAvailable);

      toast.success(
        `${employee.employeeName} ажилтны төлөв амжилттай өөрчлөгдлөө.`
      );
    } catch (error) {
      console.error("Ажилтны төлөв өөрчлөхөд алдаа гарлаа.");
      toast.error("Ажилтны төлөв өөрчлөхөд алдаа гарлаа.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex gap-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <div
              className="p-1 w-[5px] h-[5px] rounded-full"
              style={{
                backgroundColor: employee.availability ? "#00c04b" : "#ff0000",
                animation: "pulse 3s infinite",
              }}
            ></div>

            <div>Ажилтан:</div>
            {employee.employeeName}
          </CardTitle>
        </div>

        <Switch
          checked={employee.availability}
          onCheckedChange={handleEmployeAvailable}
        />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div className="space-y-2 flex gap-3 ">
            <div className="w-[200px] h-[200px]">
              <img
                src={`${employee.profileImage}`}
                className="w-[200px] h-[200px] rounded-2xl"
              />
            </div>

            <div className="w-full  flex flex-col justify-center gap-7">
              <div className="pl-4 flex gap-10">
                <div className="flex flex-col gap-1">
                  <div className="text-[13px]">Ажлын цаг эхлэх</div>
                  <Input
                    type="time"
                    defaultValue={employee.startTime}
                    disabled={!employee.availability}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[13px]">Ажлын цаг дуусах</div>
                  <Input
                    type="time"
                    defaultValue={employee.endTime}
                    disabled={!employee.availability}
                  />
                </div>
              </div>
              <div className="pl-4 flex gap-10">
                <div className="flex flex-col gap-1">
                  <div className="text-[13px]">Цайны цаг эхлэх</div>
                  <Input
                    type="time"
                    defaultValue={employee.lunchTimeStart}
                    disabled={!employee.availability}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[13px]">Цайны цаг дуусах</div>
                  <Input
                    type="time"
                    defaultValue={employee.lunchTimeEnd}
                    disabled={!employee.availability}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[13px]">Ажилтны товч мэдээлэл:</div>
            <Textarea
              className="text-sm font-medium w-full"
              defaultValue={employee.description}
              disabled={!employee.availability}
            ></Textarea>
          </div>

          <div className="w-full flex justify-end gap-3">
            <Button
              className="text-gray-700"
              variant={"outline"}
              disabled={!employee.availability}
            >
              Ажилтны мэдээлэл шинэчлэх
            </Button>
            <Button className="text-gray-700" variant={"outline"}>
              Ажилтан устгах
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
