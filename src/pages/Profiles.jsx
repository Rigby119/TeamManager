import { useState } from 'react'
import ProfileCard from '../components/profiles/ProfileCard'
import ProfileForm from '../components/profiles/ProfileForm'
import Button from '../components/ui/Button'
import { exportMembers, importMembers } from '../utils/exportImport'

export default function Profiles({ members, addMember, updateMember, deleteMember }) {
    const [editingMember, setEditingMember] = useState(null) // null=list, 'new'=create, obj=edit

    function handleSave(data) {
        if (editingMember === 'new') {
            addMember(data)
        } else {
            updateMember(editingMember.id, data)
        }
        setEditingMember(null)
    }

    function handleImport(e) {
        const file = e.target.files?.[0]
        if (!file) return
        importMembers(file).then(imported => {
            imported.forEach(m => {
                const { id, createdAt, ...data } = m
                addMember(data)
            })
            alert(`${imported.length} perfiles importados`)
        }).catch(() => alert('Error al importar: formato inválido'))
        e.target.value = ''
    }

    if (editingMember !== null) {
        return (
            <ProfileForm
                member={editingMember === 'new' ? null : editingMember}
                onSave={handleSave}
                onCancel={() => setEditingMember(null)}
            />
        )
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="font-display font-semibold text-lg text-txt">Perfiles</h1>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => exportMembers(members)}>
                        Exportar
                    </Button>
                    <label className="cursor-pointer">
                        <span className="btn-ghost text-sm px-3 py-1.5 rounded-lg">Importar</span>
                        <input type="file" accept=".json" className="hidden" onChange={handleImport} />
                    </label>
                </div>
            </div>

            {members.length === 0 ? (
                <div className="card flex flex-col items-center gap-3 py-10 text-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-txt2">
                        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                    <p className="text-txt2 text-sm">No hay miembros aún</p>
                    <Button variant="primary" size="sm" onClick={() => setEditingMember('new')}>
                        Agregar el primero
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {members.map(m => (
                        <ProfileCard
                            key={m.id}
                            member={m}
                            onEdit={setEditingMember}
                            onDelete={id => {
                                if (confirm('¿Eliminar este miembro?')) deleteMember(id)
                            }}
                        />
                    ))}
                </div>
            )}

            <Button variant="primary" fullWidth onClick={() => setEditingMember('new')}>
                + Agregar miembro
            </Button>
        </div>
    )
}
