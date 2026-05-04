import { useState } from 'react'
import Header from './components/layout/Header'
import BottomNav from './components/layout/BottomNav'
import Calculator from './pages/Calculator'
import Schedules from './pages/Schedules'
import Profiles from './pages/Profiles'
import { useMembers } from './hooks/useMembers'
import { useSchedules } from './hooks/useSchedules'
import { useConfig } from './hooks/useConfig'

export default function App() {
  const [activeTab, setActiveTab] = useState('schedules')
  const { members, addMember, updateMember, deleteMember } = useMembers()
  const { schedules, addSchedule, updateSchedule, deleteSchedule } = useSchedules()
  const { config, updateConfig } = useConfig()

  return (
    <div className="flex flex-col lg:flex-row h-full bg-bg text-txt w-full max-w-[480px] lg:max-w-none mx-auto">
      <Header />
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
      <main className="flex-1 overflow-y-auto scrollbar-thin lg:p-8">
        {/* Contenedor interno: Evita que el contenido en desktop se estire al infinito */}
        <div className="w-full h-full lg:max-w-4xl mx-auto">
          {activeTab === 'calculator' && (
            <Calculator
              members={members}
              config={config}
              addSchedule={addSchedule}
              onGoToSchedules={() => setActiveTab('schedules')}
            />
          )}
          {activeTab === 'schedules' && (
            <Schedules
              schedules={schedules}
              members={members}
              updateSchedule={updateSchedule}
              deleteSchedule={deleteSchedule}
              addSchedule={addSchedule}
            />
          )}
          {activeTab === 'profiles' && (
            <Profiles
              members={members}
              addMember={addMember}
              updateMember={updateMember}
              deleteMember={deleteMember}
            />
          )}
        </div>
      </main>
    </div>
  )
}