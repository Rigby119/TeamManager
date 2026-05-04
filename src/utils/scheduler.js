import { DAYS } from '../constants/time'

/**
 * Returns members available for a given day+hour slot.
 */
export function getAvailableMembers(day, hour, members) {
    const key = `${day}-${String(hour).padStart(2, '0')}`
    return members.filter(m => m.availability?.[key] === true)
}

/**
 * Generates a schedule given params and members.
 * Returns { assignments, stats }
 *
 * assignments: { "mon-0": memberId|null, ... }
 * stats: {
 *   turnosPorMiembro: { memberId: count },
 *   turnosSobrantes: number,
 *   miembrosConConflicto: [memberId],   // slots with no coverage
 * }
 */
export function generateSchedule(params, members, extraAssignees = []) {
    const { shiftDuration, startHour, shiftsPerDay } = params

    // Build all slots: { key, day, slotIndex, hour }
    const slots = []
    for (const day of DAYS) {
        for (let i = 0; i < shiftsPerDay; i++) {
            const hour = startHour + i * shiftDuration
            slots.push({ key: `${day}-${i}`, day, slotIndex: i, hour })
        }
    }

    const totalSlots = slots.length
    const n = members.length

    if (n === 0) {
        const assignments = {}
        slots.forEach(s => { assignments[s.key] = null })
        return {
            assignments,
            stats: { turnosPorMiembro: {}, turnosSobrantes: 0, miembrosConConflicto: [] },
        }
    }

    const base = Math.floor(totalSlots / n)
    const remainder = totalSlots % n

    // Members that get an extra shift (remainder slots)
    // extraAssignees is an array of member ids chosen by the user
    const extraSet = new Set(extraAssignees.slice(0, remainder))

    // Target count per member
    const target = {}
    members.forEach(m => {
        target[m.id] = base + (extraSet.has(m.id) ? 1 : 0)
    })

    // Track assigned counts
    const assigned = {}
    members.forEach(m => { assigned[m.id] = 0 })

    const assignments = {}
    const miembrosConConflicto = new Set()

    for (const slot of slots) {
        const available = getAvailableMembers(slot.day, slot.hour, members)

        // Filter to those who still need shifts and have capacity
        const candidates = available.filter(m => assigned[m.id] < target[m.id])

        if (candidates.length === 0) {
            // Fallback: any member with remaining capacity
            const fallback = members.filter(m => assigned[m.id] < target[m.id])
            if (fallback.length === 0) {
                assignments[slot.key] = null
            } else {
                // Pick the one with fewest assigned (round-robin by least assigned)
                fallback.sort((a, b) => assigned[a.id] - assigned[b.id])
                const picked = fallback[0]
                assignments[slot.key] = picked.id
                assigned[picked.id]++
                // Mark conflict since we ignored availability
                miembrosConConflicto.add(slot.key)
            }
        } else {
            // Round-robin: pick candidate with fewest assigned so far
            candidates.sort((a, b) => assigned[a.id] - assigned[b.id])
            const picked = candidates[0]
            assignments[slot.key] = picked.id
            assigned[picked.id]++
        }
    }

    // Detect truly uncovered slots (null)
    const conflictSlots = Object.entries(assignments)
        .filter(([, v]) => v === null)
        .map(([k]) => k)

    // turnosSobrantes = remainder (informational for UI)
    const turnosSobrantes = remainder

    return {
        assignments,
        stats: {
            turnosPorMiembro: assigned,
            turnosSobrantes,
            miembrosConConflicto: [...miembrosConConflicto, ...conflictSlots],
        },
    }
}
