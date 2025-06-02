const Spinner = ({ size = "md", color = "emerald", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  const colorClasses = {
    emerald: "border-emerald-600",
    blue: "border-blue-600",
    red: "border-red-600",
    gray: "border-gray-600",
  }

  return (
    <div className={`inline-block ${sizeClasses[size]} ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  )
}

// Loading overlay component
export const LoadingOverlay = ({ isLoading, children, message = "Loading..." }) => {
  if (!isLoading) return children

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600 font-medium">{message}</p>
        </div>
      </div>
    </div>
  )
}

// Full page loading component
export const PageLoader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner size="xl" />
        <p className="mt-6 text-xl text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  )
}

// Button with loading state
export const LoadingButton = ({ isLoading, children, className = "", disabled = false, ...props }) => {
  return (
    <button
      className={`relative ${className} ${isLoading || disabled ? "opacity-75 cursor-not-allowed" : ""}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="sm" color="white" />
        </div>
      )}
      <span className={isLoading ? "invisible" : "visible"}>{children}</span>
    </button>
  )
}

export default Spinner
