import { CheckCircle2, XCircle, X } from "lucide-react";

const StatusPopup = ({
  open,
  type = "success", // "success" | "error"
  title,
  message,
  onClose,
}) => {
  if (!open) return null;

  const isSuccess = type === "success";
  const Icon = isSuccess ? CheckCircle2 : XCircle;
  const iconBg = isSuccess ? "bg-emerald-50" : "bg-red-50";
  const iconColor = isSuccess ? "text-emerald-500" : "text-red-500";
  const buttonColor = isSuccess
    ? "bg-emerald-600 hover:bg-emerald-700"
    : "bg-red-600 hover:bg-red-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-5">
        <div className="flex items-start gap-3">
          <div className={`rounded-full p-2 ${iconBg}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>

          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{message}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 hover:bg-slate-100 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${buttonColor}`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusPopup;
