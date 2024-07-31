import React from "react";

const VerifyMint = ({ templateData, createData }: any) => {
  const applyTextStyles = (text: any) => {
    return {
      fontSize: `${templateData.textFont}px`,
      fontFamily: text?.fontChuc,
    };
  };

  return (
    <div className="p-6 max-w-full mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
      <h2 className="text-2xl font-bold">Verify</h2>
      <div className="flex justify-between">
        <div className="w-1/2 flex flex-col items-center">
          <img
            src={templateData.template && templateData.selectedTemplate}
            alt="Certificate Template"
            className="w-full h-auto"
          />
        </div>
        <div className="w-1/2">
          <h3 className="text-3xl font-bold text-black">
            {createData.fullName}
          </h3>
          <p
            className="text-lg mt-2"
            style={applyTextStyles(createData.nftName)}
          >
            Tên chứng nhận: abc
          </p>
          <textarea
            className="w-full h-32 border border-gray-300 rounded mt-4 p-2"
            value={templateData.description}
            readOnly
            style={applyTextStyles(templateData.description)}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <div className="w-1/2 flex flex-col items-start">
          <h4 className="text-xl font-bold">Full details</h4>
          <p className="mt-2">Production location: VietNam</p>
          <p className="mt-2">Dymension: 500x300</p>
          <p className="mt-2">{`Certificate ID: ${templateData.certificateNumber}`}</p>
        </div>
        <div className="w-1/2 flex flex-col items-start">
          <h4 className="text-xl font-bold">Chain Information</h4>
          <p className="mt-2">{`Blockchain: ${createData.blockchain}`}</p>
          <p className="mt-2">Token ID: 0X8DEGS83D5770733AC11e43f7df2</p>
          <p className="mt-2">{`Contract address: ${createData.contractAddress}`}</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyMint;
