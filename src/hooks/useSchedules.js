import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getItem, setItem } from '../utils/storage'

const KEY = 'tm_schedules'

export function useSchedules() {
    const [schedules, setSchedules] = useState(() => getItem(KEY, []))

    function persist(list) {
        setSchedules(list)
        setItem(KEY, list)
    }

    function addSchedule(data) {
        const schedule = {
            ...data,
            id: uuidv4(),
            createdAt: new Date().toISOString(),
        }
        persist([...schedules, schedule])
        return schedule
    }

    function updateSchedule(id, data) {
        persist(schedules.map(s => s.id === id ? { ...s, ...data } : s))
    }

    function deleteSchedule(id) {
        persist(schedules.filter(s => s.id !== id))
    }

    return { schedules, addSchedule, updateSchedule, deleteSchedule }
}
