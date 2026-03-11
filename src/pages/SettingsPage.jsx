import { useState, useEffect } from 'react'
import api from '../services/api'
import SettingsForm from '../components/settings/SettingsForm'

const SettingsPage = () => {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await api.get('/admin/settings')
      setSettings(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (updatedSettings) => {
    await api.put('/admin/settings', updatedSettings)
    fetchSettings()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">System Settings</h1>
      <SettingsForm settings={settings} onSave={handleSave} />
    </div>
  )
}

export default SettingsPage