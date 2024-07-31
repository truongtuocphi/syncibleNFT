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
  const [certificateNumber, setCertificateNumber] = useState("");
  const [textFont, setTextFont] = useState<number>(20);
  const [fontChuc, setFontChuc] = useState("");
  const [authorizingOrgName, setAuthorizingOrgName] = useState("");
  const [headOrgName, setHeadOrgName] = useState("");
  const [headOrgPosition, setHeadOrgPosition] = useState("");
  const [headOrgSignature, setHeadOrgSignature] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showChooseTemplate, setShowChooseTemplate] = useState(false);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setTemplate(file);
      setSelectedTemplate(null);

      // Create a URL for the selected file and update the preview
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
    }
  };

  const handleSelectTemplate = (templateId: number) => {
    setSelectedTemplate(templateId);
    setTemplate(null); // Clear custom template if predefined template is selected
    setPreviewImage(null); // Clear the preview image when selecting predefined template
  };

  const handleSignatureImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setSignatureImage(e.target.files[0]);
    }
  };

  const handleHeadOrgSignatureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setHeadOrgSignature(e.target.files[0]);
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
    <div className="p-6 max-w-full mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
      <h2 className="text-2xl font-bold">Define Template</h2>
      <div className="flex space-x-6">
        {/* Left Section */}
        <div className="flex gap-4 space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Select Media:
              <div className="relative">
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleTemplateChange}
                  className="mt-1 block w-full h-56 text-sm text-gray-900 bg-gray-50 border border-dotted border-gray-300 cursor-pointer focus:outline-none p-2 overflow-hidden"
                />
                {previewImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={previewImage}
                      alt="Selected Media"
                      className="w-full h-56 object-cover rounded-md border border-gray-300 cursor-pointer"
                    />
                  </div>
                )}
              </div>
              <p className="mt-4">
                Note: The background color of the certificate is light
              </p>
            </label>
            {errors.template && (
              <p className="text-red-500 text-sm">{errors.template}</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">Choose Template:</h3>
            <button
              onClick={() => setShowChooseTemplate(!showChooseTemplate)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Select template
            </button>
            {showChooseTemplate && (
              <div className="grid grid-cols-2 gap-4 mt-2">
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
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 space-y-4">
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
              Font Chữ:
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
              <p className="text-red-500 text-sm">
                {errors.authorizingOrgName}
              </p>
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
              Head of Organization Position:
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
              Head of Organization Signature:
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleHeadOrgSignatureChange}
                className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 border border-dotted border-gray-300 cursor-pointer p-2"
              />
            </label>
            {errors.headOrgSignature && (
              <p className="text-red-500 text-sm">{errors.headOrgSignature}</p>
            )}
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Signature Image:
              <input
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleSignatureImageChange}
                className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 border border-dotted border-gray-300 cursor-pointer p-2"
              />
            </label>
            {errors.signatureImage && (
              <p className="text-red-500 text-sm">{errors.signatureImage}</p>
            )}
          </div> */}
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
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DefineTemplate;
