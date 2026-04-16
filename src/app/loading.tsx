export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-surface-container-lowest">
      {/* Premium Tactile Loading Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Outer rotating dashed ring (like thread) */}
        <div className="absolute h-20 w-20 animate-[spin_3s_linear_infinite] rounded-full border-2 border-dashed border-tertiary opacity-40"></div>
        
        {/* Inner pulsing circle (like a spool) */}
        <div className="h-12 w-12 animate-pulse rounded-full bg-primary-gradient-bg shadow-[0_8px_20px_rgba(117,88,78,0.25)]"></div>
        
        {/* Center dot */}
        <div className="absolute h-4 w-4 rounded-full bg-surface-container-lowest"></div>
      </div>
      
      <div className="mt-8 text-sm font-bold tracking-[0.2em] uppercase text-primary animate-pulse">
        Weaving interface...
      </div>
    </div>
  );
}
