"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api } from "@/axios";
import {
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye,
  Maximize2,
} from "lucide-react";

import { Template1 } from "./Template1";
import { Template2 } from "./Template2";
import { Template3 } from "./Template3";
import { Company } from "../CompanyTypes";

export const SelectTemplate = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description:
        "Clean, contemporary design with bold gradients and animations",
      component: Template1,
      features: [
        "Gradient backgrounds",
        "Smooth animations",
        "Bold colors",
        "Modern typography",
      ],
    },
    {
      id: "classic",
      name: "Classic",
      description:
        "Traditional, elegant design with warm tones and serif fonts",
      component: Template2,
      features: [
        "Elegant serif fonts",
        "Warm color palette",
        "Traditional layout",
        "Professional look",
      ],
    },
    {
      id: "minimal",
      name: "Minimal",
      description:
        "Simple, clean design focusing on content with minimal distractions",
      component: Template3,
      features: [
        "Clean typography",
        "Plenty of whitespace",
        "Simple layout",
        "Content focused",
      ],
    },
  ];

  const selectedTemplate = templates[currentTemplateIndex].id;

  // Fetch company data
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/company/name/${companyName}`);
        if (response.data?.company) {
          setCompany(response.data.company);
          // Set current template if company already has one
          if (response.data.company.template) {
            const templateIndex = templates.findIndex(
              (t) => t.id === response.data.company.template
            );
            if (templateIndex !== -1) {
              setCurrentTemplateIndex(templateIndex);
            }
          }
        } else {
          setError("Компани олдсонгүй");
        }
      } catch (err) {
        console.error("Компаний мэдээлэл авахад алдаа гарлаа:", err);
        setError("Компаний мэдээлэл авахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    if (companyName) {
      fetchCompany();
    }
  }, [companyName]);

  // Navigation functions
  const goToNextTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev + 1) % templates.length);
  };

  const goToPrevTemplate = () => {
    setCurrentTemplateIndex(
      (prev) => (prev - 1 + templates.length) % templates.length
    );
  };

  // Save selected template
  const handleSaveTemplate = async () => {
    if (!company) return;

    try {
      setSaving(true);
      await api.put(`/company/${company._id}`, {
        template: selectedTemplate,
      });

      router.push(`/company/${companyName}`);
    } catch (err) {
      console.error("Template хадгалахад алдаа гарлаа:", err);
      setError("Template хадгалахад алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  const renderTemplatePreview = (templateId: string, isFullSize = false) => {
    const template = templates.find((t) => t.id === templateId);
    if (!template || !company) return null;

    const TemplateComponent = template.component;
    return (
      <div className={`${isFullSize ? "" : "scale-75"} w-full origin-top-left`}>
        <TemplateComponent data={company} isPreview={true} companyName={""} />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
          <strong className="font-bold">Анхаар!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Дахин оролдох
        </Button>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Компаний мэдээлэл олдсонгүй</p>
      </div>
    );
  }

  const currentTemplate = templates[currentTemplateIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            {company.companyName} - Дизайн сонгох
          </h1>
          <p className="text-gray-600 mt-1">
            Таны бизнест тохирох дизайныг сонгоно уу
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Template Navigation */}
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevTemplate}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Өмнөх
            </Button>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {currentTemplate.name} Template
              </h2>
              <p className="text-sm text-gray-500">
                {currentTemplateIndex + 1} / {templates.length}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNextTemplate}
              className="flex items-center gap-2"
            >
              Дараах
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

        {/* Template Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            {templates.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTemplateIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTemplateIndex
                    ? "bg-blue-500"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to template ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Full Preview Modal */}
        {showFullPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto relative">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
                <h3 className="text-lg font-semibold">
                  {currentTemplate.name} Template - Бүрэн харах
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFullPreview(false)}
                  aria-label="Close full preview"
                >
                  ✕
                </Button>
              </div>
              <div className="p-4">
                {renderTemplatePreview(currentTemplate.id, true)}
              </div>
            </div>
          </div>
        )}

        {/* Current Template Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
          {/* Preview Section */}
          <div className="w-full order-2 lg:order-1">
            <div className="bg-white rounded-lg p-4 border border-gray-200 relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Урьдчилан харах</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFullPreview(true)}
                    className="flex items-center gap-2"
                  >
                    <Maximize2 size={16} />
                    Бүрэн харах
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.open(
                        `/company/${companyName}/preview?template=${selectedTemplate}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="flex items-center gap-2"
                  >
                    <Eye size={16} />
                    Шинэ цонхонд харах
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden bg-gray-50 h-[500px]">
                <div className="h-full w-full overflow-auto">
                  <div className="min-w-full min-h-full flex justify-center p-4">
                    {renderTemplatePreview(currentTemplate.id)}
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-2 text-center">
                Жинхэнэ хэмжээ харахын тулд "Бүрэн харах" товчийг дарна уу
              </p>
            </div>
          </div>

          {/* Template Details */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-lg p-6 border border-gray-200 h-fit">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {currentTemplate.name} Template
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {currentTemplate.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Онцлогууд:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {currentTemplate.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check
                        size={16}
                        className="text-green-500 flex-shrink-0"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <Button
                  onClick={handleSaveTemplate}
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-2"
                  size="lg"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Хадгалж байна...
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      Энэ дизайныг сонгох
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Та дараа нь тохиргооны хэсгээс дизайнаа өөрчлөх боломжтой
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => router.back()}
            disabled={saving}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Буцах
          </Button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              Дизайн {currentTemplateIndex + 1} / {templates.length}
            </span>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={goToPrevTemplate}
                disabled={currentTemplateIndex === 0}
                size="sm"
                aria-label="Previous template"
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                onClick={goToNextTemplate}
                disabled={currentTemplateIndex === templates.length - 1}
                size="sm"
                aria-label="Next template"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
