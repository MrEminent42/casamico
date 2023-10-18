
// these types were provided by Supabase to match the database schema
// in the case that the database schema changes, these types will need to be updated
// they can be created on the Supabase dashboard

// this type was provided but unused... 
// but I left it here in case it's useful in the future
// type Json =
//     | string
//     | number
//     | boolean
//     | null
//     | { [key: string]: Json | undefined }
//     | Json[]

export interface Database {
    public: {
        Tables: {
            Properties: {
                Row: {
                    address: string
                    created_at: string
                    image_url: string
                    property_id: number
                }
                Insert: {
                    address: string
                    created_at?: string
                    image_url: string
                    property_id?: number
                }
                Update: {
                    address?: string
                    created_at?: string
                    image_url?: string
                    property_id?: number
                }
                Relationships: []
            }
            Rooms: {
                Row: {
                    created_at: string
                    name: string
                    room_id: number
                }
                Insert: {
                    created_at?: string
                    name: string
                    room_id?: number
                }
                Update: {
                    created_at?: string
                    name?: string
                    room_id?: number
                }
                Relationships: []
            }
            RoomsInProperties: {
                Row: {
                    property_id: number
                    room_id: number
                }
                Insert: {
                    property_id: number
                    room_id: number
                }
                Update: {
                    property_id?: number
                    room_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "RoomsInProperties_property_id_fkey"
                        columns: ["property_id"]
                        referencedRelation: "Properties"
                        referencedColumns: ["property_id"]
                    },
                    {
                        foreignKeyName: "RoomsInProperties_room_id_fkey"
                        columns: ["room_id"]
                        referencedRelation: "Rooms"
                        referencedColumns: ["room_id"]
                    }
                ]
            }
            Tags: {
                Row: {
                    created_at: string
                    tag: string
                }
                Insert: {
                    created_at?: string
                    tag: string
                }
                Update: {
                    created_at?: string
                    tag?: string
                }
                Relationships: []
            }
            Tasks: {
                Row: {
                    created_at: string
                    description: string
                    done: boolean
                    due_date: string
                    icon_url: string
                    task_id: number
                    title: string
                }
                Insert: {
                    created_at?: string
                    description?: string
                    done: boolean
                    due_date: string
                    icon_url?: string
                    task_id?: number
                    title?: string
                }
                Update: {
                    created_at?: string
                    description?: string
                    done?: boolean
                    due_date?: string
                    icon_url?: string
                    task_id?: number
                    title?: string
                }
                Relationships: []
            }
            TasksWithRooms: {
                Row: {
                    room_id: number
                    tag_name: string
                }
                Insert: {
                    room_id: number
                    tag_name: string
                }
                Update: {
                    room_id?: number
                    tag_name?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "TasksWithRooms_room_id_fkey"
                        columns: ["room_id"]
                        referencedRelation: "Rooms"
                        referencedColumns: ["room_id"]
                    },
                    {
                        foreignKeyName: "TasksWithRooms_tag_name_fkey"
                        columns: ["tag_name"]
                        referencedRelation: "Tags"
                        referencedColumns: ["tag"]
                    }
                ]
            }
            TasksWithTags: {
                Row: {
                    tag_name: string
                    task_id: number
                }
                Insert: {
                    tag_name: string
                    task_id: number
                }
                Update: {
                    tag_name?: string
                    task_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "TasksWithTags_tag_name_fkey"
                        columns: ["tag_name"]
                        referencedRelation: "Tags"
                        referencedColumns: ["tag"]
                    },
                    {
                        foreignKeyName: "TasksWithTags_task_id_fkey"
                        columns: ["task_id"]
                        referencedRelation: "Tasks"
                        referencedColumns: ["task_id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}