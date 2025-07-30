import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a function to get Supabase client only when needed and valid
export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey ||
      supabaseUrl.includes('your_supabase_url_here') ||
      supabaseAnonKey.includes('your_supabase_anon_key_here')) {
    return null
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.warn('Failed to create Supabase client:', error)
    return null
  }
}

// Export a getter for the client
export const supabase = getSupabaseClient()

export type Database = {
  public: {
    Tables: {
      species: {
        Row: {
          id: string
          common_name: string
          scientific_name: string
          category: string
          image_url: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          common_name: string
          scientific_name: string
          category: string
          image_url?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          common_name?: string
          scientific_name?: string
          category?: string
          image_url?: string | null
          description?: string | null
          created_at?: string
        }
      }
      proteins: {
        Row: {
          id: string
          species_id: string
          subunit: string
          sequence: string
          description: string | null
          evolutionary_context: string | null
          key_sites: string[] | null
          experimental_data: string | null
          created_at: string
        }
        Insert: {
          id?: string
          species_id: string
          subunit: string
          sequence: string
          description?: string | null
          evolutionary_context?: string | null
          key_sites?: string[] | null
          experimental_data?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          species_id?: string
          subunit?: string
          sequence?: string
          description?: string | null
          evolutionary_context?: string | null
          key_sites?: string[] | null
          experimental_data?: string | null
          created_at?: string
        }
      }
      alignments: {
        Row: {
          id: string
          human_protein_id: string
          comparison_protein_id: string
          similarity_percentage: number
          mismatches: number
          gaps: number
          comparison_summary: string | null
          alignment_data: string
          created_at: string
        }
        Insert: {
          id?: string
          human_protein_id: string
          comparison_protein_id: string
          similarity_percentage: number
          mismatches: number
          gaps: number
          comparison_summary?: string | null
          alignment_data: string
          created_at?: string
        }
        Update: {
          id?: string
          human_protein_id?: string
          comparison_protein_id?: string
          similarity_percentage?: number
          mismatches?: number
          gaps?: number
          comparison_summary?: string | null
          alignment_data?: string
          created_at?: string
        }
      }
    }
  }
}
