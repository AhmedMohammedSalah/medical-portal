export default function LoadingOverlay() {
    return (
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-3">
          <svg
            className="w-10 h-10 text-green-600 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3.536-3.536L12 0v4a8 8 0 000 16v4l3.536-3.536L12 20v-4a8 8 0 01-8-8z"
            />
          </svg>
          <p className="text-green-700 font-medium text-base">Syncing...</p>
        </div>
      </div>
    );
  }
  