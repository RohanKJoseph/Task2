export function Loader({ size = 'lg', text, subtext }) {
  const sizes = {
    sm: { wrapper: 'py-8', ring: 'w-10 h-10', dot: 'w-2 h-2', text: 'text-sm' },
    md: { wrapper: 'py-16', ring: 'w-14 h-14', dot: 'w-2.5 h-2.5', text: 'text-base' },
    lg: { wrapper: 'py-32', ring: 'w-16 h-16', dot: 'w-3 h-3', text: 'text-lg' },
  }
  const s = sizes[size] || sizes.lg

  return (
    <div className={`flex flex-col items-center justify-center text-center px-4 ${s.wrapper}`}>
      {/* Animated dots spinner */}
      <div className={`relative ${s.ring} mb-5`}>
        <span className={`absolute top-0 left-1/2 -translate-x-1/2 ${s.dot} rounded-full bg-zinc-900 animate-[loaderBounce_1.2s_ease-in-out_infinite]`} />
        <span className={`absolute right-0 top-1/2 -translate-y-1/2 ${s.dot} rounded-full bg-zinc-600 animate-[loaderBounce_1.2s_ease-in-out_0.3s_infinite]`} />
        <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 ${s.dot} rounded-full bg-zinc-400 animate-[loaderBounce_1.2s_ease-in-out_0.6s_infinite]`} />
        <span className={`absolute left-0 top-1/2 -translate-y-1/2 ${s.dot} rounded-full bg-zinc-300 animate-[loaderBounce_1.2s_ease-in-out_0.9s_infinite]`} />
      </div>
      {text && <h3 className={`${s.text} font-semibold text-zinc-950`}>{text}</h3>}
      {subtext && <p className="mt-1 text-sm text-zinc-500">{subtext}</p>}

      <style>{`
        @keyframes loaderBounce {
          0%, 80%, 100% { transform: translate(-50%, 0) scale(0.6); opacity: 0.4; }
          40% { transform: translate(-50%, 0) scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
