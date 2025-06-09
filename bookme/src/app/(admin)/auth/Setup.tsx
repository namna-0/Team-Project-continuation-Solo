"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, Phone, Mail } from "lucide-react";

export default function SalonSetupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    salonName: "",
    description: "",
    address: "",
    city: "",
    phone: "",
    email: "",
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

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (logoFile) {
        const fakeUploadUrl = URL.createObjectURL(logoFile); 
        formData.logo = fakeUploadUrl;
      }

      console.log("Creating salon:", formData);
      await new Promise((res) => setTimeout(res, 1500));
      window.location.href = "/dashboard/salon";
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const days = Object.keys(formData.openingHours) as Array<
    keyof typeof formData.openingHours
  >;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SB</span>
            </div>
            <span className="text-xl font-bold">SalonBook</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step <= currentStep
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Basic Info</span>
            <span>Business Hours</span>
            <span>Review & Launch</span>
          </div>
        </div>

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Salon Information</CardTitle>
              <CardDescription>
                Tell us about your salon to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="salonName">Salon Name *</Label>
                <Input
                  id="salonName"
                  value={formData.salonName}
                  onChange={(e) =>
                    setFormData({ ...formData, salonName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Salon Logo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer relative">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Salon Logo Preview"
                      className="h-24 mx-auto object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="w-6 h-6 mx-auto text-gray-400 mb-1" />
                      <p className="text-sm text-gray-600">Upload salon logo</p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
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
            </CardContent>
          </Card>
        )}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>
                Set your salon’s operating hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {days.map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-24 capitalize font-medium">{day}</div>
                  <Input
                    type="time"
                    value={formData.openingHours[day].open}
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
                    disabled={formData.openingHours[day].closed}
                    className="w-28"
                  />
                  <span>to</span>
                  <Input
                    type="time"
                    value={formData.openingHours[day].close}
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
                    disabled={formData.openingHours[day].closed}
                    className="w-28"
                  />
                  <Button
                    size="sm"
                    variant={
                      formData.openingHours[day].closed ? "default" : "outline"
                    }
                    onClick={() =>
                      setFormData({
                        ...formData,
                        openingHours: {
                          ...formData.openingHours,
                          [day]: {
                            ...formData.openingHours[day],
                            closed: !formData.openingHours[day].closed,
                          },
                        },
                      })
                    }
                  >
                    {formData.openingHours[day].closed ? "Closed" : "Open"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Review & Launch</CardTitle>
              <CardDescription>
                Confirm your information before launching.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Salon Info</h3>
                <p>
                  <strong>Name:</strong> {formData.salonName}
                </p>
                <p>
                  <strong>Address:</strong> {formData.address}, {formData.city}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Website:</strong> {formData.website || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Business Hours</h3>
                {days.map((day) => (
                  <p key={day}>
                    <strong className="capitalize">{day}:</strong>{" "}
                    {formData.openingHours[day].closed
                      ? "Closed"
                      : `${formData.openingHours[day].open} - ${formData.openingHours[day].close}`}
                  </p>
                ))}
              </div>
              <Alert>
                <AlertDescription>
                  Once you launch your salon, it will be visible to customers.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          {currentStep < 3 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Launching..." : "Launch Salon"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}





