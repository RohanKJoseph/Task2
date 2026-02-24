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
    let url = form.url.trim()
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url
      setForm((f) => ({ ...f, url }))
    }
    try {
      new URL(url)
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
    <Dialog open={open} onClose={() => toggle(false)} size="md" className="!bg-white !text-black ">
      <DialogTitle className="!text-black">Create new site</DialogTitle>
      <DialogDescription className="!text-zinc-700">Add a website to start crawling and monitoring.</DialogDescription>

      <DialogBody>
        <form onSubmit={submit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700">Name</label>
            <Input
              className="!border !border-zinc-300 !bg-white !rounded-lg !h-[36px]"
              placeholder="My website"
              value={form.name}
              onChange={(e) => change('name', e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">URL</label>
            <Input
              className="!border !border-zinc-300 !bg-white !rounded-lg !h-[36px]"
              placeholder="https://example.com"
              value={form.url}
              onChange={(e) => change('url', e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
        </form>
      </DialogBody>

      <DialogActions className="!flex !gap-3">
        <Button outline onClick={() => toggle(false)} className="!flex-1 !text-zinc-700 !border-zinc-300">Cancel</Button>
        <Button color="dark" onClick={submit} disabled={createSite.isLoading} className="!flex-1">
          {createSite.isLoading ? 'Creating...' : 'Create site'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
