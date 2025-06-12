"use client "

import { Step } from "@/blocks/Components/Stepper/Stepper"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@radix-ui/react-label"
import { Upload } from "lucide-react"
import { FormDataType } from "../page"
import React from "react"

type Step2Props = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  companyImagePreview: string[]
}

 export const Step2 = ({formData, setFormData, handleImageChange, companyImagePreview}: Step2Props) => {
     return (
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
               <Label className="mb-2">Салоны лого (олон зураг)</Label>
  <div className="border-2 border-dashed rounded-lg p-4 bg-white/10">
    <div className="grid grid-cols-3 gap-4 mb-4">
      {companyImagePreview.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Лого ${index + 1}`}
          className="h-24 w-full object-contain rounded"
        />
      ))}
    </div>
    <div className="relative text-center cursor-pointer">
      <Upload className="w-6 h-6 mx-auto text-white" />
      <p className="text-sm text-white">Лого зургууд оруулах</p>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
  </div>
            </div>
          </div>
     )
 }