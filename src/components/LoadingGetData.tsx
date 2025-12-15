export default function LoadingGetData() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-white">Loading data...</p>
      </div>
    </div>
  );
}
