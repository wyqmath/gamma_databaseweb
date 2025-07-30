export interface Species {
  id: string
  common_name: string
  scientific_name: string
  category: string
  image_url?: string
  description?: string
  created_at: string
}

export interface Protein {
  id: string
  species_id: string
  subunit: 'PSEN1' | 'PEN-2' | 'APH-1' | 'NCT'
  sequence: string
  description?: string
  evolutionary_context?: string
  key_sites?: string[]
  experimental_data?: string
  structure_file?: string
  created_at: string
}

export interface AlignmentData {
  id: string
  human_protein_id: string
  comparison_protein_id: string
  similarity_percentage: number
  mismatches: number
  gaps: number
  comparison_summary?: string
  alignment_data: string
  created_at: string
}

export interface ComparisonData {
  human_protein: Protein
  comparison_protein: Protein
  alignment: AlignmentData
  species: Species
}

export interface KeySite {
  position: number
  residue: string
  function: string
  conserved: boolean
}

export interface ExperimentalData {
  study: string
  finding: string
  reference: string
}

export interface NewsItem {
  id: string
  title: string
  content: string
  date: string
  type: 'update' | 'feature' | 'research'
}

export interface InteractionData {
  subunit1: string
  subunit2: string
  interaction_type: string
  binding_sites: string[]
  evolutionary_conservation: string
  description: string
}

export interface ComplexAssemblyStep {
  step: number
  description: string
  subunits_involved: string[]
  intermediate_complex: string
}

export const SUBUNITS = ['PSEN1', 'PEN-2', 'APH-1', 'NCT'] as const
export type Subunit = typeof SUBUNITS[number]

export const SPECIES_CATEGORIES = [
  'Mammals',
  'Fish', 
  'Insects',
  'Plants',
  'Other'
] as const
export type SpeciesCategory = typeof SPECIES_CATEGORIES[number]
