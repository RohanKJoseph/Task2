// src/layouts/AddSiteDialog.jsx
import { useState } from 'react'
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from '../component/catalyst-ui/dialog'
import { Input } from '../component/catalyst-ui/input'
import { Button } from '../component/catalyst-ui/button'
import { Checkbox, CheckboxField } from '../component/catalyst-ui/checkbox'
import { useCreateSite } from '../hooks/useSite'
import { useAppStore } from '../stores/useAppStore'

export default function AddSiteDialog() {
  const open = useAppStore((s) => s.ui.showAddSite)
  const toggle = useAppStore((s) => s.toggleAddSite)
  const setSelectedSite = useAppStore((s) => s.setSelectedSite)

  const createSite = useCreateSite()

  const [form, setForm] = useState({
    name: '',
    url: '',
    maxPages: 100,
    crawlSubdomains: false,
    respectRobotsTxt: true,
    userAgent: '',
    maxDepth: 3,
    crawlSpeed: 'normal'
  })
  const [error, setError] = useState(null)

  function change(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setError(null)
  }

  function validate() {
    if (!form.name.trim() || !form.url.trim()) {
      setError('Name and URL are required')
      return false
    }
    try {
      // basic URL validation
      new URL(form.url)
      return true
    } catch (e) {
      setError('Invalid URL')
      return false
    }
  }

  function submit(e) {
    e?.preventDefault()
    if (!validate()) return

    createSite.mutate(
      {
        name: form.name.trim(),
        url: form.url.trim(),
        maxPages: Number(form.maxPages) || 100,
        crawlSubdomains: !!form.crawlSubdomains,
        respectRobotsTxt: !!form.respectRobotsTxt,
        userAgent: form.userAgent || undefined,
        maxDepth: Number(form.maxDepth) || undefined,
        crawlSpeed: form.crawlSpeed
      },
      {
        onSuccess: (created) => {
          // select the newly created site and close modal
          if (created && created.id) setSelectedSite(created.id)
          toggle(false)
        },
        onError: (err) => {
          setError(err?.response?.data?.error || err?.message || 'Failed to create site')
        }
      }
    )
  }

  return (
    <Dialog open={open} onClose={() => toggle(false)} size="md">
      <DialogTitle>Create new site</DialogTitle>
      <DialogDescription>Add a website to start crawling and monitoring.</DialogDescription>

      <DialogBody>
        <form onSubmit={submit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700">Name</label>
            <Input
              placeholder="My website"
              value={form.name}
              onChange={(e) => change('name', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">URL</label>
            <Input
              placeholder="https://example.com"
              value={form.url}
              onChange={(e) => change('url', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-zinc-700">Max pages</label>
              <Input
                type="number"
                value={form.maxPages}
                onChange={(e) => change('maxPages', e.target.value)}
                min={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700">Max depth</label>
              <Input
                type="number"
                value={form.maxDepth}
                onChange={(e) => change('maxDepth', e.target.value)}
                min={0}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <CheckboxField>
              <Checkbox
                checked={form.crawlSubdomains}
                onChange={(v) => change('crawlSubdomains', v)}
              />
              <div data-slot="label">Crawl subdomains</div>
            </CheckboxField>

            <CheckboxField>
              <Checkbox
                checked={form.respectRobotsTxt}
                onChange={(v) => change('respectRobotsTxt', v)}
              />
              <div data-slot="label">Respect robots.txt</div>
            </CheckboxField>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">User agent (optional)</label>
            <Input
              placeholder="Custom user agent"
              value={form.userAgent}
              onChange={(e) => change('userAgent', e.target.value)}
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}
        </form>
      </DialogBody>

      <DialogActions>
        <Button outline onClick={() => toggle(false)}>Cancel</Button>
        <Button color="dark" onClick={submit} disabled={createSite.isLoading}>
          {createSite.isLoading ? 'Creating...' : 'Create site'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
