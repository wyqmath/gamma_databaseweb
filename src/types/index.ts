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

// Interface for the raw gamma_secretase.json data
export interface GammaSecreteaseData {
  species_name: string
  id: string
  subunits: string
  sequence: string
  structure_files: string
  complex_structures: string[]
}



export interface MultipleSequenceAlignment {
  sequences: Array<{
    id: string
    name: string
    sequence: string
    species?: string
    subunit?: string
  }>
  alignedSequences: string[]
  alignmentScore?: number
  method?: 'auto' | 'complete' | 'diag'
  type?: 'auto' | 'amino' | 'nucleic'
  gapChar?: string
}

export interface MSAOptions {
  gapopen?: number
  gapextend?: number
  matrix?: number[][]
  method?: 'auto' | 'complete' | 'diag'
  type?: 'auto' | 'amino' | 'nucleic'
  gapchar?: string
  debug?: boolean
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

// Structural comparison interfaces
export interface StructuralComparisonResult {
  rmsd: number
  tmScore: number
  alignedLength: number
  sequenceIdentity: number
  gdt_ts?: number
  gdt_ha?: number
  chainLength1: number
  chainLength2: number
  alignedResidues: number
  rotationMatrix?: number[][]
  translationVector?: number[]
}

export interface SequenceSimilarityResult {
  identity: number
  similarity: number
  gaps: number
  score: number
  alignmentLength: number
  identicalResidues: number
  similarResidues: number
  gapResidues: number
}

export interface ComparisonAnalysis {
  referenceSpecies: string
  targetSpecies: string
  subunit: string
  sequenceSimilarity: SequenceSimilarityResult
  structuralComparison: StructuralComparisonResult
  conservedRegions: ConservedRegion[]
  functionalSites: FunctionalSiteComparison[]
  overallScore: number
}

export interface ConservedRegion {
  start: number
  end: number
  conservationLevel: number
  description: string
  functionalImportance: 'high' | 'medium' | 'low'
}

export interface FunctionalSiteComparison {
  position: number
  referenceResidue: string
  targetResidue: string
  isConserved: boolean
  functionalRole: string
  importance: 'critical' | 'important' | 'moderate'
}

export interface SubunitComparisonData {
  subunit: string
  referenceProtein: Protein
  comparisons: ComparisonAnalysis[]
  statistics: {
    averageSequenceIdentity: number
    averageStructuralSimilarity: number
    mostSimilarSpecies: string
    leastSimilarSpecies: string
    conservationScore: number
  }
}
