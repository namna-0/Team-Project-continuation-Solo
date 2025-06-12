"use client"

import { Step } from "@/blocks/Components/Stepper/Stepper"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormDataType } from "../page"

type Step1Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

 
export const Step1 = ({formData, setFormData}: Step1Props) => {
     return (
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
     )
}