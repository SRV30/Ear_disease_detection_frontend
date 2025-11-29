import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/UploadBox";
import CameraCapture from "../components/CameraCapture";
import HistoryCard from "../components/HistoryCard";
import Hospitals from "../components/Hospitals";
import api from "../utils/axiosClient";

export default function Diagnose() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [history, setHistory] = useState([]);
  const [mapsUrl, setMapsUrl] = useState("");
  const [locationMsg, setLocationMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem("ear_history") || "[]");
    setHistory(h);
  }, []);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocationMsg("Geolocation not supported on this device.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setMapsUrl(
          `https://www.google.com/maps/search/ENT+Hospital/@${latitude},${longitude},14z`
        );
      },
      () =>
        setLocationMsg(
          "Location permission denied ❌ Allow location to see nearby ENT hospitals."
        )
    );
  }, []);

  const handlePredict = async () => {
    if (!file) {
      alert("Please upload or capture an ear image first.");
      return;
    }
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("file", file);
      const res = await api.post("/predict", fd);

      const result = res.data;
      const entry = { ...result, time: new Date().toLocaleString() };
      const newHistory = [entry, ...history].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem("ear_history", JSON.stringify(newHistory));

      navigate("/result", { state: { result } });
    } catch (err) {
      alert("Prediction failed. Ensure Flask backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const onNewFile = (f) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  return (
    <>
      <Helmet>
        <title>AI Diagnosis | EarCare AI Clinic</title>
        <meta
          name="description"
          content="Upload or capture an ear image for AI-based diagnosis to detect infection or wax blockage."
        />
      </Helmet>

      <section className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-2">
            AI-Powered Ear Disease Diagnosis
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto">
            Upload or capture an otoscopic image. Our deep learning model will
            analyze your ear condition and generate a medical-grade report in
            seconds.
          </p>
        </div>

        {/* Step banner */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-2xl shadow-lg p-5 text-sm flex flex-wrap justify-center gap-6 text-center">
          <p>① Upload / Capture Image</p>
          <p>② Model Processing</p>
          <p>③ Condition Report (+ Grad-CAM)</p>
        </div>

        {/* Upload + Camera */}
        <div className="grid md:grid-cols-2 gap-10 mt-6">
          <div>
            <UploadBox onFileSelect={onNewFile} />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold text-indigo-700 text-center md:text-left">
              OR Capture using Camera
            </p>
            <CameraCapture onCapture={onNewFile} />

            {preview && (
              <div className="text-center mt-2">
                <p className="text-xs text-slate-500 mb-1">Selected Image</p>
                <img
                  src={preview}
                  alt="preview"
                  className="w-44 h-44 mx-auto object-cover rounded-2xl border border-slate-200 shadow"
                />
              </div>
            )}
          </div>
        </div>

        {/* Predict button */}
        <div className="flex justify-center">
          <button
            onClick={handlePredict}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing Image..." : "Run AI Diagnosis"}
          </button>
        </div>

        {/* History card */}
        <HistoryCard history={history} />

        {/* Nearby hospitals */}
        <Hospitals mapsUrl={mapsUrl} locationMsg={locationMsg} />
      </section>
    </>
  );
}
