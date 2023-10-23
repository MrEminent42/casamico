export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Properties: {
        Row: {
          address: string
          city: string | null
          country: string | null
          created_at: string
          image_url: string
          property_id: number
          state_province: string | null
        }
        Insert: {
          address: string
          city?: string | null
          country?: string | null
          created_at?: string
          image_url: string
          property_id?: number
          state_province?: string | null
        }
        Update: {
          address?: string
          city?: string | null
          country?: string | null
          created_at?: string
          image_url?: string
          property_id?: number
          state_province?: string | null
        }
        Relationships: []
      }
      Rooms: {
        Row: {
          created_at: string
          name: string
          property_id: number
          room_id: number
        }
        Insert: {
          created_at?: string
          name: string
          property_id: number
          room_id?: number
        }
        Update: {
          created_at?: string
          name?: string
          property_id?: number
          room_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Rooms_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "Properties"
            referencedColumns: ["property_id"]
          }
        ]
      }
      Tags: {
        Row: {
          created_at: string
          tag_name: string
        }
        Insert: {
          created_at?: string
          tag_name: string
        }
        Update: {
          created_at?: string
          tag_name?: string
        }
        Relationships: []
      }
      Tasks: {
        Row: {
          color: string
          created_at: string
          description: string
          done: boolean
          due_date: string
          icon_url: string
          property_id: number
          room_id: number
          task_id: number
          title: string
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string
          done: boolean
          due_date: string
          icon_url?: string
          property_id: number
          room_id: number
          task_id?: number
          title?: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string
          done?: boolean
          due_date?: string
          icon_url?: string
          property_id?: number
          room_id?: number
          task_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Tasks_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "Properties"
            referencedColumns: ["property_id"]
          },
          {
            foreignKeyName: "Tasks_room_id_fkey"
            columns: ["room_id"]
            referencedRelation: "Rooms"
            referencedColumns: ["room_id"]
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
            referencedColumns: ["tag_name"]
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
