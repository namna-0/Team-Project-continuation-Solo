"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/axios";
import {
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
  Settings,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import { Template1 } from "../../_components/_templates/Template1";
import { Template2 } from "../../_components/_templates/Template2";
import { Template3 } from "../../_components/_templates/Template3";
import { Company } from "../../_components/CompanyTypes";

interface EditTemplatesProps {
  company: Company;
  fetchCompany: () => Promise<void>;
  onSuccess?: () => void;
}

interface Template {
  templateNumber: number;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  features: string[];
}

export const EditTemplates: React.FC<EditTemplatesProps> = ({
  company,
  fetchCompany,
  onSuccess,
}) => {
  const { companyName } = useParams<{ companyName: string }>();
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const templates = useMemo(
    () => [
      {
        templateNumber: 1,
        name: "Template 1",
        description: "A clean, modern design with a soft pink theme",
        component: Template1,
        features: ["Clean Layout", "Pink Theme", "Modern Typography"],
      },
      {
        templateNumber: 2,
        name: "Template 2",
        description:
          "A sleek, modern design with futuristic elements and bold visual impact",
        component: Template2,
        features: ["Futuristic Design", "Bold Visuals", "Interactive Elements"],
      },
      {
        templateNumber: 3,
        name: "Template 3",
        description:
          "Simple, clean design focusing on content with minimal distractions",
        component: Template3,
        features: ["Minimal Design", "Content Focus", "Clean Typography"],
      },
    ],
    []
  );

  useEffect(() => {
    if (company?.templateNumber) {
      const index = templates.findIndex(
        (t) => t.templateNumber === company.templateNumber
      );
      if (index !== -1) {
        setCurrentTemplateIndex(index);
      }
    }
  }, [company?.templateNumber, templates]);

  const handleSaveTemplate = async (templateIndex: number) => {
    if (!company) return;

    const selectedTemplate = templates[templateIndex];
    if (!selectedTemplate) {
      toast.error("Invalid template selection");
      return;
    }

    if (company.templateNumber === selectedTemplate.templateNumber) {
      toast.info("This template is already selected");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/company/${company._id}`, {
        templateNumber: selectedTemplate.templateNumber,
      });

      toast.success("Design updated successfully");
      await fetchCompany();
      onSuccess?.();
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("Failed to save template");
    } finally {
      setSaving(false);
    }
  };

  const goToNextTemplate = () => {
    setCurrentTemplateIndex((prev) => (prev + 1) % templates.length);
  };

  const goToPrevTemplate = () => {
    setCurrentTemplateIndex(
      (prev) => (prev - 1 + templates.length) % templates.length
    );
  };

  const renderTemplatePreview = () => {
    const template = templates[currentTemplateIndex];
    const TemplateComponent = template.component;
    return (
      <div className="w-full h-full">
        <TemplateComponent
          data={company}
          isPreview={true}
          companyName={companyName}
        />
      </div>
    );
  };

  const currentTemplate = templates[currentTemplateIndex];
  const isCurrentTemplate =
    company?.templateNumber === currentTemplate.templateNumber;

  return (
    <div className="space-y-6">
      {/* Debug Info - Remove in production */}
      <div className="bg-gray-100 p-4 rounded-md text-sm">
        <strong>Debug Info:</strong>
        <div>Company ID: {company._id}</div>
        <div>Current Template Number: {company.templateNumber}</div>
        <div>Selected Template: {currentTemplate.templateNumber}</div>
        <div>Is Current Template: {isCurrentTemplate.toString()}</div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="h-6 w-6" />
            Дизайн тохиргоо
          </h2>
          <p className="text-gray-600 mt-1">
            Та өөрийн бизнест тохирох дизайныг сонгоно уу
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setPreviewMode(!previewMode)}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          {previewMode ? "Жагсаалт харах" : "Урьдчилан харах"}
        </Button>
      </div>

      {previewMode ? (
        /* Preview Mode */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{currentTemplate.name}</span>
                  {isCurrentTemplate && (
                    <Badge variant="default" className="bg-green-500">
                      Одоогийн
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>{currentTemplate.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevTemplate}
                    disabled={currentTemplateIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-500">
                    {currentTemplateIndex + 1} / {templates.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextTemplate}
                    disabled={currentTemplateIndex === templates.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">
                    Онцлогууд:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentTemplate.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Save Button */}
                <Button
                  onClick={() => fetchCompany()}
                  disabled={saving || isCurrentTemplate}
                  className="w-full"
                  size="lg"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Хадгалж байна...
                    </>
                  ) : isCurrentTemplate ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Одоогийн дизайн
                    </>
                  ) : (
                    <>
                      <Star className="h-4 w-4 mr-2" />
                      Энэ дизайныг сонгох
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="text-lg">Урьдчилан харах</CardTitle>
              </CardHeader>
              <CardContent className="h-full pb-6">
                <div className="border rounded-lg overflow-hidden h-full">
                  <div className="h-full w-full overflow-auto">
                    {renderTemplatePreview()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Grid Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => {
            const TemplateComponent = template.component;
            const isSelected =
              company?.templateNumber === template.templateNumber;

            return (
              <Card
                key={template.templateNumber}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setCurrentTemplateIndex(index)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    {isSelected && (
                      <Badge variant="default" className="bg-green-500">
                        Одоогийн
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Mini Preview */}
                  <div className="border rounded-lg overflow-hidden h-48 mb-4 bg-gray-50">
                    <div className="scale-[0.3] origin-top-left w-[333%] h-[333%] overflow-hidden">
                      <TemplateComponent
                        data={company}
                        isPreview={true}
                        companyName={companyName}
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, featureIndex) => (
                        <Badge
                          key={featureIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleSaveTemplate(currentTemplateIndex)}
                    disabled={saving || isCurrentTemplate}
                    className="w-full"
                    size="lg"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Хадгалж байна...
                      </>
                    ) : isSelected ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Сонгогдсон
                      </>
                    ) : (
                      <>
                        <Star className="h-4 w-4 mr-2" />
                        Сонгох
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
