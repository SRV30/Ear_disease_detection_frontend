export default function HistoryCard({ history, backendURL }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-3">
        Previous AI Diagnosis Reports
      </h2>

      {history.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow p-6 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076500.png"
            className="w-20 mx-auto mb-3 opacity-80"
            alt="Empty"
          />
          <p className="text-slate-600 text-sm">
            No diagnosis history found — upload or capture an image to get started.
          </p>
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow p-4 max-h-56 overflow-y-auto space-y-3 custom-scroll">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl p-3 transition-all shadow-sm"
            >
              <img
                src={`${backendURL}${item.image_url}`}
                className="w-14 h-14 rounded-lg object-cover border"
                alt="history"
              />

              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">
                  {item.label}
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-md text-[10px] font-bold text-white
                      ${
                        item.label.toLowerCase() === "normal"
                          ? "bg-green-600"
                          : item.label.toLowerCase() === "wax"
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }`}
                  >
                    {item.confidence}% confidence
                  </span>
                </p>
                <p className="text-xs text-slate-500">{item.time}</p>
              </div>

              <a
                href="/result"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.assign(`/result?auto=result_${idx}`);
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View Report →
              </a>
            </div>
          ))}
        </div>
      )}

      <style>
        {`
          .custom-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scroll::-webkit-scrollbar-track {
            background: #e5e7eb;
            border-radius: 4px;
          }
          .custom-scroll::-webkit-scrollbar-thumb {
            background: #6366f1;
            border-radius: 4px;
          }
          .custom-scroll::-webkit-scrollbar-thumb:hover {
            background: #4f46e5;
          }
        `}
      </style>
    </div>
  );
}
