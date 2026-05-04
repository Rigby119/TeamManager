import { useState } from 'react'
import ScheduleCard from '../components/schedules/ScheduleCard'
import ScheduleDetail from '../components/schedules/ScheduleDetail'
import Button from '../components/ui/Button'
import { importSchedule } from '../utils/exportImport'

export default function Schedules({ schedules, members, updateSchedule, deleteSchedule, addSchedule }) {
    const [viewingSchedule, setViewingSchedule] = useState(null)

    function handleImport(e) {
        const file = e.target.files?.[0]
        if (!file) return
        importSchedule(file).then(s => {
            const { id, createdAt, ...data } = s
            addSchedule(data)
            alert('Calendario importado')
        }).catch(() => alert('Error al importar: formato inválido'))
        e.target.value = ''
    }

    if (viewingSchedule) {
        // Keep in sync with updates
        const current = schedules.find(s => s.id === viewingSchedule.id) ?? viewingSchedule
        return (
            <ScheduleDetail
                schedule={current}
                members={members}
                onUpdate={updateSchedule}
                onBack={() => setViewingSchedule(null)}
            />
        )
    }

    const sorted = [...schedules].sort((a, b) => b.params.weekStart.localeCompare(a.params.weekStart))

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="font-display font-semibold text-lg text-txt">Horarios</h1>
                <label className="cursor-pointer">
                    <span className="btn-ghost text-sm px-3 py-1.5 rounded-lg">Importar</span>
                    <input type="file" accept=".json" className="hidden" onChange={handleImport} />
                </label>
            </div>

            {sorted.length === 0 ? (
                <div className="card flex flex-col items-center gap-3 py-10 text-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-txt2">
                        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" />
                        <line x1="8" y1="2" x2="8" y2="6" /><line x1="16" y1="2" x2="16" y2="6" />
                    </svg>
                    <p className="text-txt2 text-sm">No hay calendarios guardados aún</p>
                    <p className="text-txt2 text-xs">Usa la Calculadora para generar uno</p>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {sorted.map(s => (
                        <ScheduleCard
                            key={s.id}
                            schedule={s}
                            members={members}
                            onView={setViewingSchedule}
                            onDelete={id => {
                                if (confirm('¿Eliminar este calendario?')) deleteSchedule(id)
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
