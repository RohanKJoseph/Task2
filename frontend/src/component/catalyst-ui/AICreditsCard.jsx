export function AICreditsCard() {
  const totalCredits = 200
  const usedCredits = 45
  const remainingCredits = totalCredits - usedCredits
  const usagePercent = Math.round((usedCredits / totalCredits) * 100)

  return (
    <div className="mx-3 mb-4 rounded-xl border border-zinc-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-900">AI Credits</span>
        <span className="text-xs font-medium text-zinc-500">{remainingCredits}/{totalCredits}</span>
      </div>
      {/* Progress bar */}
      <div className="mt-3 h-2 w-full rounded-full bg-zinc-100">
        <div
          className="h-2 rounded-full bg-[#5C33FF] transition-all"
          style={{ width: `${usagePercent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-zinc-500">
        {usedCredits} credits used this month
      </p>
    </div>
  )
}
