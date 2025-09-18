export const ComponentsLoadingPlaceholderJsx = `function LoadingPlaceholder() {
  return (
    <div className="flex items-center justify-center border-t border-gray-100 bg-white p-6">
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></div>
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
          style={{ animationDelay: '0.1s' }}
        ></div>
        <div
          className="h-2 w-2 animate-bounce rounded-full bg-blue-600"
          style={{ animationDelay: '0.2s' }}
        ></div>
      </div>
    </div>
  );
}

export default LoadingPlaceholder;
`;
