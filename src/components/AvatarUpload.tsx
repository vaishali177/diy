'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function AvatarUpload({ uid, url }: { uid: string, url: string | null }) {
  const supabase = createClient()
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
  const [uploading, setUploading] = useState(false)

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      // Upload image to Storage
      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath)

      // Update Database profile
      const { error: updateError } = await supabase.from('profiles').upsert({
        id: uid,
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      if (updateError) throw updateError

      setAvatarUrl(publicUrl)
      router.refresh() // Refresh the page to update the Header
    } catch (error) {
      alert('Error uploading avatar!')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="relative group cursor-pointer w-24 h-24 rounded-full bg-surface-container-high border border-outline-variant/30 shadow-inner flex items-center justify-center overflow-hidden">
      {avatarUrl ? (
        <Image src={avatarUrl} alt="Avatar" fill className="object-cover" sizes="96px" />
      ) : (
        <span className="text-4xl text-on-surface font-serif uppercase">+</span>
      )}
      
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <label className="cursor-pointer text-xs font-bold tracking-widest text-white uppercase text-center w-full h-full flex items-center justify-center" htmlFor="single">
          {uploading ? '...' : 'Upload'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  )
}
