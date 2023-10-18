export interface Property {
    address: string
    city: string | undefined
    state_province: string | undefined
    country: string | undefined
    created_at: string
    image_url: string
    property_id: number
}

export interface Room {
    created_at: string
    name: string
    property_id: number
    room_id: number
}