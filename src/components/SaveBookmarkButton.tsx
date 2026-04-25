'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

type SaveBookmarkProps = {
  itemType: 'tool' | 'calculation'
  referenceId: string
  metadata?: any
  label?: string
  className?: string
}

export default function SaveBookmarkButton({ itemType, referenceId, metadata, label = "Save", className = "" }: SaveBookmarkProps) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [lists, setLists] = useState<any[]>([])
  const [newListName, setNewListName] = useState('')
  const [user, setUser] = useState<any>(null)
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function loadUserAndLists() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const { data } = await supabase.from('lists').select('*').eq('user_id', user.id).order('is_default', { ascending: false })
        if (data) setLists(data)
      }
    }
    loadUserAndLists()
  }, [])

  const handleSave = async (listId?: string) => {
    if (!user) {
      alert("Please log in to save items!")
      router.push('/login')
      return
    }

    setSaving(true)
    try {
      // Find the target list (use the provided listId, or fallback to the Favourites list)
      let targetListId = listId
      if (!targetListId) {
        const defaultList = lists.find(l => l.is_default)
        if (defaultList) {
          targetListId = defaultList.id
        } else {
          throw new Error("No default list found. Please refresh.")
        }
      }

      const { error } = await supabase.from('saved_items').insert({
        user_id: user.id,
        list_id: targetListId,
        item_type: itemType,
        reference_id: referenceId,
        metadata: metadata || {}
      })

      if (error) throw error

      setSaved(true)
      setShowMenu(false)
      setTimeout(() => setSaved(false), 2000)
    } catch (e: any) {
      console.error(e)
      alert("Failed to save: " + e.message)
    } finally {
      setSaving(false)
    }
  }

  const handleCreateList = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newListName.trim() || !user) return

    setSaving(true)
    try {
      const { data, error } = await supabase.from('lists').insert({
        user_id: user.id,
        name: newListName.trim(),
        is_default: false
      }).select().single()

      if (error) throw error

      setLists([...lists, data])
      setNewListName('')
      
      // Immediately save to the new list
      await handleSave(data.id)
    } catch (e: any) {
      console.error(e)
      alert("Failed to create list: " + e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <button 
        onClick={(e) => {
          e.preventDefault()
          if (!user) {
            router.push('/login')
            return
          }
          setShowMenu(!showMenu)
        }}
        disabled={saving}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-outline-variant/30 text-xs font-semibold uppercase tracking-widest text-on-surface/80 hover:bg-surface-container-high hover:text-primary transition-all disabled:opacity-50 shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
        </svg>
        {saved ? 'Saved!' : saving ? '...' : label}
      </button>

      {showMenu && user && (
        <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-lg overflow-hidden z-50 p-2 animate-in fade-in slide-in-from-top-2">
          <div className="text-[10px] font-bold tracking-widest uppercase text-tertiary px-3 py-2 border-b border-outline-variant/10 mb-1">
            Save to List
          </div>
          
          <div className="max-h-48 overflow-y-auto">
            {lists.map(list => (
              <button 
                key={list.id} 
                onClick={() => handleSave(list.id)}
                className="w-full text-left px-3 py-2 text-sm text-on-surface hover:bg-surface-container hover:text-primary rounded-md transition-colors flex justify-between items-center"
              >
                <span className="truncate">{list.name}</span>
                {list.is_default && <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">★</span>}
              </button>
            ))}
          </div>

          <form onSubmit={handleCreateList} className="mt-2 pt-2 border-t border-outline-variant/10 flex gap-1">
            <input 
              type="text" 
              placeholder="New list..." 
              value={newListName}
              onChange={e => setNewListName(e.target.value)}
              className="flex-1 min-w-0 bg-surface-container px-2 py-1.5 rounded text-xs outline-none focus:ring-1 focus:ring-primary border border-outline-variant/20"
            />
            <button 
              type="submit"
              disabled={!newListName.trim() || saving}
              className="px-2 bg-primary/10 text-primary rounded text-xs font-bold hover:bg-primary/20 disabled:opacity-50 transition-colors"
            >
              +
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
