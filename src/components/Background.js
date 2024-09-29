export const SplitScreenBackground = () => {
  return (
      <div className="fixed flex w-full min-h-full bottom-0 top-0 origin-bottom -z-10">
        {/* Left side */}
        <div className="w-1/2 bg-gray-100"></div>
        <div className="w-1/2 bg-original"></div>
        {/* Right side */}
      </div>
  );
};


export const SplitScreenBackgroundVertical = () => {
    return (
        <div className="fixed flex flex-col w-full min-h-full bottom-0 top-0 origin-bottom -z-10">
          {/* Left side */}
          <div className="h-1/2 bg-original"></div>
          <div className="h-1/2 bg-gray-100"></div>
          {/* Right side */}
        </div>
    );
  };