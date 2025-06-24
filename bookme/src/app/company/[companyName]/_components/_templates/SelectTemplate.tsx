"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api } from "@/axios";
import { Check, Star, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [saving, setSaving] = useState(false);

  const templates = [
    {
      id: "modern",
      name: "Template1",
      description:
        "Clean, contemporary design with bold gradients and animations",
      component: Template1,
    },
    {
      id: "classic",
      name: "Template2",
      description:
        "Traditional, elegant design with warm tones and serif fonts",
      component: Template2,
    },
    {
      id: "minimal",
      name: "Template3",
      description:
        "Simple, clean design focusing on content with minimal distractions",
      component: Template3,
    },
  ];

  const selectedTemplate = templates[currentTemplateIndex].id;

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

  const goToNextTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev + 1) % templates.length);
  };

  const goToPrevTemplate = () => {
    setCurrentTemplateIndex(
      (prev) => (prev - 1 + templates.length) % templates.length
    );
  };

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
      <div className={`${isFullSize ? "" : "scale-100"} origin-top-left`}>
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
      <div className="bg-white border-b border-gray-200 px-6 py-4 m-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            {company.companyName} - Дизайн сонгох хэсэг
          </h1>
          <p className="text-gray-600 mt-1">
            Та бизнестээ тохирох дизайныг сонгоно уу!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 flex flex-col gap-5">
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

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 mb-8">
          <div className="w-full order-2 lg:order-1">
            <div className="bg-white rounded-lg p-4 border border-gray-200 relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">Урьдчилан харах</h3>
              </div>

              <div className="border rounded-lg overflow-hidden bg-gray-50 h-[600px]">
                <div className="h-full w-full overflow-auto">
                  <div className="flex justify-center">
                    {renderTemplatePreview(currentTemplate.id, false)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-lg p-6 border border-gray-200 h-fit">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {currentTemplate.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {currentTemplate.description}
                  </p>
                </div>
              </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
