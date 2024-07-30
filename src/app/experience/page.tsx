"use client";

import React, { useState } from "react";
import DefineTemplate from "@/components/pages/Experience/DefineTemplate";
import CreateNFT from "@/components/pages/Experience/CreateNFT";
import VerifyMint from "@/components/pages/Experience/VerifyMint";

const Home = () => {
  const [step, setStep] = useState(0);
  const [templateData, setTemplateData] = useState<any>(null);
  const [createData, setCreateData] = useState<any>(null);

  const handleNextFromDefineTemplate = (data: any) => {
    setTemplateData(data);
    setStep(1);
  };

  const handleNextFromCreateNFT = (data: any) => {
    setCreateData(data);
    console.log(templateData);
    setStep(2);
  };

  return (
    <div className="p-6 mx-auto rounded-xl shadow-md space-y-4 text-black">
      {step === 0 && <DefineTemplate onNext={handleNextFromDefineTemplate} />}
      {step === 1 && <CreateNFT onNext={handleNextFromCreateNFT} />}
      {step === 2 && (
        <VerifyMint templateData={templateData} createData={createData} />
      )}
    </div>
  );
};

export default Home;
