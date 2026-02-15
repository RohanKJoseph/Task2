import { useState } from 'react'
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from '../component/catalyst-ui/dialog'
import { Button } from '../component/catalyst-ui/button'
import { Switch } from '../component/catalyst-ui/switch'
import { Select } from '../component/catalyst-ui/select'
import { Checkbox } from '../component/catalyst-ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../component/catalyst-ui/table'
import { useIssueTypes, useUpdateIssueType, useResetIssueType, useBulkUpdateIssueTypes } from '../hooks/useIssueTypes'
import { useAppStore } from '../stores/useAppStore'

export default function IssueSettingsDialog() {
  const open = useAppStore((s) => s.ui.showIssueSettings)
  const toggle = useAppStore((s) => s.toggleIssueSettings)

  const { data: issueTypes = [], isLoading, error } = useIssueTypes()
  const update = useUpdateIssueType()
  const reset = useResetIssueType()
  const bulkUpdate = useBulkUpdateIssueTypes()

  const [selectedIds, setSelectedIds] = useState(new Set())
  const [bulkSeverity, setBulkSeverity] = useState('')
  const [bulkEnable, setBulkEnable] = useState(null) // null | true | false

  function onToggleEnabled(issue) {
    const enabled = !issue.enabled
    update.mutate({ issueTypeId: issue.id, updates: { enabled } })
  }

  function onChangeSeverity(issue, severity) {
    update.mutate({ issueTypeId: issue.id, updates: { severity } })
  }

  function onReset(issue) {
    reset.mutate(issue.id)
  }

  function toggleSelect(id, checked) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (checked) next.add(id)
      else next.delete(id)
      return next
    })
  }

  function selectAll(checked) {
    setSelectedIds(checked ? new Set(issueTypes.map(i => i.id)) : new Set())
  }

  function applyBulk() {
    if (!selectedIds.size) return
    const updates = Array.from(selectedIds).map(id => ({
      id,
      updates: {
        ...(bulkSeverity ? { severity: bulkSeverity } : {}),
        ...(bulkEnable === null ? {} : { enabled: bulkEnable })
      }
    }))

    bulkUpdate.mutate(updates, {
      onSuccess: () => {
        setSelectedIds(new Set())
        setBulkSeverity('')
        setBulkEnable(null)
      }
    })
  }

  return (
    <Dialog open={open} onClose={() => toggle(false)} size="lg">
      <DialogTitle>Issue settings</DialogTitle>
      <DialogDescription>Manage which issue types are reported and their severity.</DialogDescription>

      <DialogBody>
        {isLoading && <div className="p-6">Loading issue types...</div>}
        {error && <div className="p-6 text-red-600">Failed to load issue types</div>}

        {!isLoading && !error && (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Checkbox checked={selectedIds.size === issueTypes.length && issueTypes.length > 0} onChange={selectAll} />
                <div className="text-sm text-zinc-600">Select all</div>
              </div>

              <Select value={bulkSeverity} onChange={(e) => setBulkSeverity(e.target.value)} selectClassName="text-sm w-40">
                <option value="">-- Set severity --</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="notice">Notice</option>
              </Select>

              <Select value={bulkEnable === null ? '' : bulkEnable ? 'enable' : 'disable'} onChange={(e) => setBulkEnable(e.target.value === '' ? null : e.target.value === 'enable')} selectClassName="text-sm w-36">
                <option value="">-- Set enabled --</option>
                <option value="enable">Enable</option>
                <option value="disable">Disable</option>
              </Select>

              <Button color="dark" disabled={selectedIds.size === 0 || (!bulkSeverity && bulkEnable === null)} onClick={applyBulk}>
                {bulkUpdate.isLoading ? 'Applying...' : `Apply to selected (${selectedIds.size})`}
              </Button>
            </div>

            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader />
                  <TableHeader>Issue</TableHeader>
                  <TableHeader>Category</TableHeader>
                  <TableHeader>Severity</TableHeader>
                  <TableHeader>Enabled</TableHeader>
                  <TableHeader />
                </TableRow>
              </TableHead>

              <TableBody>
                {issueTypes.map(issue => (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <Checkbox checked={selectedIds.has(issue.id)} onChange={(v) => toggleSelect(issue.id, v)} />
                    </TableCell>

                    <TableCell className="font-medium">{issue.name}</TableCell>
                    <TableCell className="text-zinc-500">{issue.category}</TableCell>

                    <TableCell>
                      <Select
                        value={issue.severity}
                        onChange={(e) => onChangeSeverity(issue, e.target.value)}
                        selectClassName="text-sm"
                      >
                        <option value="error">Error</option>
                        <option value="warning">Warning</option>
                        <option value="notice">Notice</option>
                      </Select>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={issue.enabled}
                          onChange={() => onToggleEnabled(issue)}
                          color={issue.enabled ? 'green' : 'zinc'}
                        />
                        <div className="text-sm text-zinc-600">{issue.enabled ? 'On' : 'Off'}</div>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button outline onClick={() => onReset(issue)} disabled={reset.isLoading}>
                        Reset
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </DialogBody>

      <DialogActions>
        <Button outline onClick={() => toggle(false)}>Close</Button>
        <Button color="dark" onClick={() => toggle(false)}>Done</Button>
      </DialogActions>
    </Dialog>
  )
}
