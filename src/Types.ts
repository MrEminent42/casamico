export interface Property {
    address: string
    city: string | null
    country: string | null
    created_at: string
    image_url: string
    property_id: number
    state_province: string | null
}

export interface Room {
    created_at: string
    name: string
    property_id: number
    room_id: number
}

export interface Tag {
    created_at: string
    tag_name: string
}

export interface Task {
    created_at: string
    description: string
    done: boolean
    due_date: string
    icon_url: string
    property_id: number
    task_id: number
    title: string
}