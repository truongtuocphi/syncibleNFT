// components/DefineTemplate.tsx
"use client";

import React, { useState } from "react";
import cert1 from "../../../../public/cert_1.png";
import cert2 from "../../../../public/cert_2.png";

const predefinedTemplates = [
  { id: 1, imageUrl: cert1.src, name: "Certificate 1" },
  { id: 2, imageUrl: cert2.src, name: "Certificate 2" },
];

const DefineTemplate = ({ onNext }: { onNext: (data: any) => void }) => {
  const [template, setTemplate] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [nftName, setNftName] = useState("");
  const [description, setDescription] = useState("");
  const [signature, setSignature] = useState("");
  const [fullName, setFullName] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleTemplateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setTemplate(e.target.files[0]);
      setSelectedTemplate(null); // Deselect predefined template if file is chosen
    }
  };

  const handleSelectTemplate = (templateId: number) => {
    setSelectedTemplate(templateId);
    setTemplate(null); // Clear custom template if predefined template is selected
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!selectedTemplate && !template)
      newErrors.template = "Please select or upload a template.";
    if (!nftName) newErrors.nftName = "NFT name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (template && !signature) newErrors.signature = "Signature is required.";
    if (template && !fullName) newErrors.fullName = "Full name is required.";
    if (template && !certificateNumber)
      newErrors.certificateNumber = "Certificate number is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const data = {
        template,
        selectedTemplate,
        nftName,
        description,
        signature,
        fullName,
        certificateNumber,
      };
      onNext(data);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
      <h2 className="text-2xl font-bold">Define Template</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Media:
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleTemplateChange}
            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none p-2"
          />
        </label>
        {errors.template && (
          <p className="text-red-500 text-sm">{errors.template}</p>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold">
          Or Choose a Predefined Template:
        </h3>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {predefinedTemplates.map((template) => (
            <div
              key={template.id}
              className={`cursor-pointer p-2 border rounded-lg ${
                selectedTemplate === template.id
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              <img
                src={template.imageUrl}
                alt={template.name}
                className="w-full h-24 object-cover rounded-md"
              />
              <p className="text-center mt-1">{template.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          NFT Name:
          <input
            type="text"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </label>
        {errors.nftName && (
          <p className="text-red-500 text-sm">{errors.nftName}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </label>
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>
      {template && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Signature:
              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </label>
            {errors.signature && (
              <p className="text-red-500 text-sm">{errors.signature}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name:
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </label>
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Certificate Number:
              <input
                type="text"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              />
            </label>
            {errors.certificateNumber && (
              <p className="text-red-500 text-sm">{errors.certificateNumber}</p>
            )}
          </div>
        </>
      )}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Next
      </button>
    </div>
  );
};

export default DefineTemplate;
