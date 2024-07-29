"use client";

import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { ethers } from "ethers";
import { ThirdwebSDK } from "@thirdweb-dev/react";

const VerifyMint = ({
  templateData,
  createData,
}: {
  templateData: any;
  createData: any;
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const {
    template,
    selectedTemplate,
    nftName,
    description,
    signature,
    fullName: templateFullName,
    certificateNumber,
  } = templateData;
  const { fullName: createFullName, csvFile, quantity } = createData;

  useEffect(() => {
    if (template) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(template);
    } else if (selectedTemplate) {
      setImageSrc(selectedTemplate === 1 ? "/cert_1.png" : "/cert_2.png");
    }
  }, [template, selectedTemplate]);

  const handleMintNFT = async () => {
    try {
      const certificateElement = document.getElementById("certificate");
      if (certificateElement) {
        const canvas = await html2canvas(certificateElement);
        const dataUrl = canvas.toDataURL("image/png");

        // Initialize the Thirdweb SDK and get the contract
        const sdk = new ThirdwebSDK(
          new ethers.providers.JsonRpcProvider(
            "https://sepolia.infura.io/v3/35a43f17918340099b5a029d62355c32"
          )
        );
        const contract = sdk.getContract(
          "0xD99833Fdb724E26F9df21Ee850442916e3b847AA"
        );

        // Call the mintBulk function on the contract
        const owners = Array(quantity).fill(
          "0xe627783601f829Db3D5770733AC11e43f7df265A"
        );
        const fullNames = Array(quantity).fill(createFullName);
        const certificateIds = Array(quantity).fill(certificateNumber);
        const tokenURIs = Array(quantity).fill(dataUrl);

        console.log("Calling mintBulk with:", {
          owners,
          fullNames,
          certificateIds,
          tokenURIs,
        });

        const result = await (
          await contract
        ).call("mintBulk", [owners, fullNames, certificateIds, tokenURIs]);

        console.log("NFT Minted!", result);
      } else {
        console.error("Certificate element missing");
      }
    } catch (error) {
      console.error("Minting error:", error);
    }
  };

  return (
    <div className="p-6 w-[80%] mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
      <h2 className="text-2xl font-bold">Verify and Mint NFT</h2>
      <div
        id="certificate"
        className="relative p-6 bg-white border border-gray-300 rounded-lg shadow-md"
        style={{ width: "100%", height: "600px" }}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Certificate Template"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-black mb-5">
          {/* <h3 className="text-2xl font-bold">{nftName}</h3>
          <p>{description}</p> */}
          {/* <p>Signature: {signature || "N/A"}</p> */}
          <h3 className="text-2xl font-bold">
            {templateFullName || createFullName}
          </h3>
          {/* <p>{certificateNumber || "N/A"}</p> */}
        </div>
      </div>
      <button
        onClick={handleMintNFT}
        className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Mint NFT
      </button>
    </div>
  );
};

export default VerifyMint;
