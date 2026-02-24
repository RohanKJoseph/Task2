import { Button } from "@headlessui/react"

export function CreditsBox() {
  const totalCredits = 200
  const usedCredits = 45
  const remainingCredits = totalCredits - usedCredits
  const usagePercent = Math.round((usedCredits / totalCredits) * 100)

  return (
    <div className="mb-4 rounded-lg border border-zinc-200 bg-white p-2">
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
      <Button
        plain
        className="mt-4 px-3 py-1.5 text-sm font-medium text-white bg-black rounded-lg hover:bg-[#333333] transition-colors w-full"
      >
        Add More AI Credits
      </Button>
    </div>
  )
}
