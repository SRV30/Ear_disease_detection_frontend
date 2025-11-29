// src/pages/Result.jsx
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import ResultCard from "../components/ResultCard";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const pdfRef = useRef(null);

  const result = location.state?.result;

  const backendURL =
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:5000"
      : "https://ear-disease-detection-backend.onrender.com";

  const getRemedyText = () => {
    if (!result) return "";
    const label = result.label.toLowerCase();
    if (label.includes("wax"))
      return (
        "• Avoid cotton buds or sharp objects inside the ear.\n" +
        "• Use only doctor-prescribed wax-softening drops.\n" +
        "• Visit an ENT if pain, ringing, or hearing loss continues."
      );
    if (label.includes("infection"))
      return (
        "• Keep the ear dry and avoid swimming.\n" +
        "• Do not insert earbuds / earphones until fully healed.\n" +
        "• Consult an ENT for antibiotic / antifungal drops."
      );
    return (
      "• Ear appears mostly normal.\n" +
      "• Maintain hygiene and avoid inserting objects.\n" +
      "• Regular ear checkup is recommended if discomfort persists."
    );
  };

  const downloadPDF = () => {
    if (!pdfRef.current) return;
    const opt = {
      margin: 10,
      filename: "Ear_Disease_Report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(pdfRef.current).save();
  };

  if (!result) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-3 text-slate-900">
          No Result Available
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Please upload an ear image from the Diagnose page to see the analysis report.
        </p>
        <button
          onClick={() => navigate("/diagnose")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl"
        >
          Go to Diagnose
        </button>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>Diagnosis Report | EarCare AI Clinic</title>
        <meta
          name="description"
          content="Detailed AI-powered ear disease detection report with Grad-CAM visualization and suggested care."
        />
      </Helmet>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Diagnosis Report
          </h2>
          <button
            onClick={downloadPDF}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-xl shadow"
          >
            Download PDF
          </button>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          This report is generated using an AI model and is not a substitute for a clinical diagnosis. Please consult a qualified ENT specialist.
        </p>

        <ResultCard
          result={result}
          remedyText={getRemedyText()}
          pdfRef={pdfRef}
          backendURL={backendURL}
        />
      </section>
    </>
  );
}
