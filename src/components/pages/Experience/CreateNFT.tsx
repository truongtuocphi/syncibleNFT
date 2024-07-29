"use client";

import React, { useState } from "react";

const CreateNFT = ({ onNext }: { onNext: (data: any) => void }) => {
  const [fullName, setFullName] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [issuedDate, setIssuedDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [contractAddress, setContractAddress] = useState("");
  const [blockchain, setBlockchain] = useState<"Polygon" | "Ethereum">(
    "Polygon"
  );
  const [role, setRole] = useState<"Teacher" | "Student">("Student");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCsvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCsvFile(e.target.files[0]);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName && !csvFile) {
      newErrors.fullName = "Full Name or CSV file is required.";
    }
    if (!issuedDate) {
      newErrors.issuedDate = "Issued date is required.";
    }
    if (!quantity || quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0.";
    }
    if (!contractAddress) {
      newErrors.contractAddress = "Contract address is required.";
    }
    if (!blockchain) {
      newErrors.blockchain = "Blockchain selection is required.";
    }
    if (!role) {
      newErrors.role = "Role selection is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const data = {
        fullName,
        csvFile,
        issuedDate,
        quantity,
        contractAddress,
        blockchain,
        role,
      };
      onNext(data);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
      <h2 className="text-2xl font-bold">Create NFT</h2>
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
          Upload CSV:
          <input
            type="file"
            accept=".csv"
            onChange={handleCsvChange}
            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none p-2"
          />
        </label>
        {errors.csvFile && (
          <p className="text-red-500 text-sm">{errors.csvFile}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Issued Date:
          <input
            type="date"
            value={issuedDate}
            onChange={(e) => setIssuedDate(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </label>
        {errors.issuedDate && (
          <p className="text-red-500 text-sm">{errors.issuedDate}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          NFT Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </label>
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Wallet address:
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          />
        </label>
        {errors.contractAddress && (
          <p className="text-red-500 text-sm">{errors.contractAddress}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Blockchain:
        </label>
        <div className="flex space-x-4 mt-2">
          <button
            type="button"
            onClick={() => setBlockchain("Polygon")}
            className={`px-4 py-2 rounded-md ${
              blockchain === "Polygon"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Polygon
          </button>
          <button
            type="button"
            onClick={() => setBlockchain("Ethereum")}
            className={`px-4 py-2 rounded-md ${
              blockchain === "Ethereum"
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Ethereum
          </button>
        </div>
        {errors.blockchain && (
          <p className="text-red-500 text-sm">{errors.blockchain}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Certificate specifically for:
        </label>
        <div className="flex space-x-4 mt-2">
          <button
            type="button"
            onClick={() => setRole("Teacher")}
            className={`px-4 py-2 rounded-md ${
              role === "Teacher" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Teacher
          </button>
          <button
            type="button"
            onClick={() => setRole("Student")}
            className={`px-4 py-2 rounded-md ${
              role === "Student" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Student
          </button>
        </div>
        {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Mint
      </button>
    </div>
  );
};

export default CreateNFT;
