import { useState } from "react";
import { BOQForm } from "@/components/BOQForm";
import { BOQDocument } from "@/components/BOQDocument";
import { BOQData } from "@/types/boq";

const Index = () => {
  const [boqData, setBoqData] = useState<BOQData | null>(null);

  const handleFormSubmit = (data: BOQData) => {
    setBoqData(data);
  };

  const handleBack = () => {
    setBoqData(null);
  };

  if (boqData) {
    return <BOQDocument data={boqData} onBack={handleBack} />;
  }

  return <BOQForm onSubmit={handleFormSubmit} />;
};

export default Index;
