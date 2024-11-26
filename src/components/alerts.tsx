import { CheckCircleIcon, XMarkIcon, XCircleIcon } from '@heroicons/react/20/solid';

interface AlertCustomProps {
  message: string;
  status: "success" | "error";
  onDismiss: () => void;
}

export default function AlertCustom({ message, status, onDismiss }: AlertCustomProps) {
  const isSuccess = status === "success";
  return (
    <div className={`rounded-md ${isSuccess ? 'bg-green-50' : 'bg-red-50'} p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {isSuccess ? (
            <CheckCircleIcon aria-hidden="true" className="h-5 w-5 text-green-400" />
          ) : (
            <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
          )}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${isSuccess ? 'text-green-800' : 'text-red-800'}`}>
            {message}
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={onDismiss}
              className={`inline-flex rounded-md ${isSuccess ? 'bg-green-50' : 'bg-red-50'} p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50`}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkIcon aria-hidden="true" className={`h-5 w-5 ${isSuccess ? 'text-green-800' : 'text-red-800'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
