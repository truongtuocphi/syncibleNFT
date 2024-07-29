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
  const [signatureImage, setSignatureImage] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [certificateNumber, setCertificateNumber] = useState("");
  const [textFont, setTextFont] = useState<number>(20); // Default font size set to 20
  const [fontChuc, setFontChuc] = useState("");
  const [authorizingOrgName, setAuthorizingOrgName] = useState("");
  const [headOrgName, setHeadOrgName] = useState("");
  const [headOrgPosition, setHeadOrgPosition] = useState("");
  const [headOrgSignature, setHeadOrgSignature] = useState("");
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

  const handleSignatureImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setSignatureImage(e.target.files[0]);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!selectedTemplate && !template)
      newErrors.template = "Please select or upload a template.";
    if (!nftName) newErrors.nftName = "NFT name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (template && !signatureImage)
      newErrors.signatureImage = "Signature image is required.";
    if (template && !fullName) newErrors.fullName = "Full name is required.";
    if (template && !certificateNumber)
      newErrors.certificateNumber = "Certificate number is required.";
    if (template && !textFont) newErrors.textFont = "Text Font is required.";
    if (template && !fontChuc) newErrors.fontChuc = "Font chữ is required.";
    if (template && !authorizingOrgName)
      newErrors.authorizingOrgName =
        "Authorizing Organization name is required.";
    if (template && !headOrgName)
      newErrors.headOrgName = "Head of Organization name is required.";
    if (template && !headOrgPosition)
      newErrors.headOrgPosition =
        "Head of Organization’s position is required.";
    if (template && !headOrgSignature)
      newErrors.headOrgSignature =
        "Head of Organization signature is required.";

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
        signatureImage,
        fullName,
        certificateNumber,
        textFont,
        fontChuc,
        authorizingOrgName,
        headOrgName,
        headOrgPosition,
        headOrgSignature,
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
          <p className="mt-4">
            Note: The background color of the certificate is light
          </p>
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
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Text Font:
          <input
            type="number"
            value={textFont}
            onChange={(e) => setTextFont(Number(e.target.value))}
            defaultValue={20}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </label>
        {errors.textFont && (
          <p className="text-red-500 text-sm">{errors.textFont}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Font chữ:
          <input
            type="text"
            value={fontChuc}
            onChange={(e) => setFontChuc(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </label>
        {errors.fontChuc && (
          <p className="text-red-500 text-sm">{errors.fontChuc}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Authorizing Organization Name:
          <input
            type="text"
            value={authorizingOrgName}
            onChange={(e) => setAuthorizingOrgName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </label>
        {errors.authorizingOrgName && (
          <p className="text-red-500 text-sm">{errors.authorizingOrgName}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Head of Organization Name:
          <input
            type="text"
            value={headOrgName}
            onChange={(e) => setHeadOrgName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </label>
        {errors.headOrgName && (
          <p className="text-red-500 text-sm">{errors.headOrgName}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Head of Organization’s Position:
          <input
            type="text"
            value={headOrgPosition}
            onChange={(e) => setHeadOrgPosition(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </label>
        {errors.headOrgPosition && (
          <p className="text-red-500 text-sm">{errors.headOrgPosition}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Signature Image:
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleSignatureImageChange}
            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none p-2"
          />
        </label>
        {errors.signatureImage && (
          <p className="text-red-500 text-sm">{errors.signatureImage}</p>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Next
      </button>
    </div>
  );
};

export default DefineTemplate;
