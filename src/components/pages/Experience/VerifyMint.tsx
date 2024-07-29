// VerifyMint.tsx

import React from "react";

const VerifyMint = ({
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
}: any) => {
  const applyTextStyles = (text: string) => {
    return {
      fontSize: `${textFont}px`,
      fontFamily: fontChuc,
    };
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
      <h2 className="text-2xl font-bold">Verify and Mint</h2>
      <div>
        <h3 className="text-lg font-semibold">NFT Certificate</h3>
        <div className="mt-4 flex flex-col items-center">
          {template && (
            <img
              src={URL.createObjectURL(template)}
              alt="Certificate Template"
              className="w-full h-auto"
            />
          )}
          <div className="mt-4 text-center">
            <h4 style={applyTextStyles(nftName)}>{nftName}</h4>
            <p style={applyTextStyles(description)}>{description}</p>
            <p style={applyTextStyles(fullName)}>{fullName}</p>
            <p style={applyTextStyles(certificateNumber)}>
              {certificateNumber}
            </p>
            <p style={applyTextStyles(authorizingOrgName)}>
              {authorizingOrgName}
            </p>
            <p style={applyTextStyles(headOrgName)}>{headOrgName}</p>
            <p style={applyTextStyles(headOrgPosition)}>{headOrgPosition}</p>
          </div>
          <div className="mt-4">
            {signatureImage && (
              <img
                src={URL.createObjectURL(signatureImage)}
                alt="Signature"
                className="w-24 h-24"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyMint;
