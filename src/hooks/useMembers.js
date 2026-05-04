import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getItem, setItem } from '../utils/storage'

const KEY = 'tm_members'

export function useMembers() {
    const [members, setMembers] = useState(() => getItem(KEY, []))

    function persist(list) {
        setMembers(list)
        setItem(KEY, list)
    }

    function addMember(data) {
        const member = {
            ...data,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
        }
        persist([...members, member])
        return member
    }

    function updateMember(id, data) {
        persist(members.map(m => m.id === id ? { ...m, ...data } : m))
    }

    function deleteMember(id) {
        persist(members.filter(m => m.id !== id))
    }

    return { members, addMember, updateMember, deleteMember }
}
