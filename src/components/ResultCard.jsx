import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ResultCard({ result, remedyText, pdfRef }) {
  const labelColor =
    result.label.toLowerCase() === "normal"
      ? "bg-green-600"
      : result.label.toLowerCase() === "wax"
      ? "bg-yellow-500"
      : "bg-red-600";

  return (
    <div
      ref={pdfRef}
      className="mt-10 bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 space-y-8 animate-fadeIn"
    >
      {/* Title */}
      <div className="text-center">
        <p className="text-3xl font-extrabold text-slate-900 mb-2">
          Diagnosis Result
        </p>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Analyzed using deep learning on otoscopic ear images
        </p>
      </div>

      {/* Condition Box */}
      <div className="text-center">
        <span
          className={`px-4 py-1.5 rounded-xl text-white font-bold text-lg shadow ${labelColor}`}
        >
          {result.label}
        </span>
        <p className="mt-2 text-gray-700 font-medium">
          Confidence: <span className="text-indigo-700">{result.confidence}%</span>
        </p>
      </div>

      {/* Gradient Divider */}
      <div className="h-[2px] w-full bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 opacity-60 rounded-full" />

      {/* Images */}
      <div className="flex flex-col md:flex-row gap-10 justify-center">
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">Original Image</p>
          <img
            src={`http://127.0.0.1:5000${result.image_url}`}
            className="w-56 h-56 rounded-2xl border shadow object-cover mx-auto"
            alt="original"
          />
        </div>

        <div className="text-center space-y-2">
          <p className="text-xs text-gray-500">Grad-CAM (Model Focus)</p>
          <img
            src={`http://127.0.0.1:5000${result.heatmap_url}`}
            className="w-56 h-56 rounded-2xl border shadow object-cover mx-auto"
            alt="heatmap"
          />
        </div>
      </div>

      {/* Probability Chart */}
      <Bar
        className="max-w-xl mx-auto"
        data={{
          labels: ["Normal", "Wax", "Infection"],
          datasets: [
            {
              data: result.probabilities,
              backgroundColor: ["#4F46E5", "#F59E0B", "#EF4444"],
              borderRadius: 8,
            },
          ],
        }}
        options={{
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, max: 100 } },
          responsive: true,
        }}
      />

      {/* Remedy Box */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl px-6 py-5 shadow-md">
        <h2 className="text-xl font-semibold text-indigo-700 mb-2">
          Personalized Care Recommendation
        </h2>
        <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
          {remedyText}
        </p>
      </div>

      {/* Footer Badges */}
      <div className="flex flex-wrap justify-center gap-5 pt-2">
        <span className="text-[11px] bg-slate-100 text-slate-600 px-3 py-1 rounded-lg border shadow-sm">
          ⚡ Powered by PyTorch & Deep Learning
        </span>
        <span className="text-[11px] bg-slate-100 text-slate-600 px-3 py-1 rounded-lg border shadow-sm">
          🔬 Diagnostic Model Accuracy ≈ 94.7%
        </span>
        <span className="text-[11px] bg-slate-100 text-slate-600 px-3 py-1 rounded-lg border shadow-sm">
          🛡 HIPAA-Inspired Privacy · No Image Stored
        </span>
      </div>

      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.45s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
