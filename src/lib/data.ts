import { supabase } from './supabase'
import { Species, Protein, AlignmentData, ComparisonData, NewsItem, InteractionData, ComplexAssemblyStep } from '@/types'

// Helper function to get base URL
function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Client-side
    return window.location.origin
  }
  // Server-side
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}

// Helper function to read JSON file safely
async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    // Check if we're in a server environment and can read files directly
    if (typeof window === 'undefined') {
      try {
        const fs = await import('fs')
        const path = await import('path')
        const fullPath = path.join(process.cwd(), 'public', filePath)
        if (fs.existsSync(fullPath)) {
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          return JSON.parse(fileContents)
        }
      } catch {
        // If fs import fails, fall through to fetch
        console.log('FS not available, using fetch')
      }
    }

    // Fallback to fetch for client-side or when file doesn't exist
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/${filePath}`)
    if (!response.ok) throw new Error(`Failed to fetch ${filePath}`)
    return await response.json()
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return null
  }
}

// Data fetching functions - using real data from JSON files
export async function getSpecies(): Promise<Species[]> {
  try {
    const data = await readJsonFile<Species[]>('data/species.json')
    if (data) return data

    // Fallback to Supabase if JSON fails and Supabase is available
    if (supabase) {
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('species')
        .select('*')
        .order('common_name')

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        return []
      }

      return supabaseData || []
    }

    return []
  } catch (error) {
    console.error('Error fetching species:', error)
    return []
  }
}

export async function getSpeciesById(id: string): Promise<Species | null> {
  try {
    const species = await getSpecies()
    return species.find(s => s.id === id) || null
  } catch (error) {
    console.error('Error fetching species by id:', error)
    return null
  }
}

export async function getProteins(): Promise<Protein[]> {
  try {
    const data = await readJsonFile<Protein[]>('data/proteins.json')
    if (data) return data

    // Fallback to Supabase if JSON fails and Supabase is available
    if (supabase) {
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('proteins')
        .select('*')
        .order('subunit')

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        return []
      }

      return supabaseData || []
    }

    return []
  } catch (error) {
    console.error('Error fetching proteins:', error)
    return []
  }
}

export async function getProteinsBySpecies(speciesId: string): Promise<Protein[]> {
  try {
    const proteins = await getProteins()
    return proteins.filter(p => p.species_id === speciesId)
  } catch (error) {
    console.error('Error fetching proteins by species:', error)
    return []
  }
}

export async function getAlignments(): Promise<AlignmentData[]> {
  try {
    const data = await readJsonFile<AlignmentData[]>('data/alignments.json')
    if (data) return data

    // Fallback to Supabase if JSON fails and Supabase is available
    if (supabase) {
      const { data: supabaseData, error: supabaseError } = await supabase
        .from('alignments')
        .select('*')

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        return []
      }

      return supabaseData || []
    }

    return []
  } catch (error) {
    console.error('Error fetching alignments:', error)
    return []
  }
}

export async function getComparisonData(humanSpeciesId: string, comparisonSpeciesId: string): Promise<ComparisonData[]> {
  try {
    // Get proteins for both species
    const humanProteins = await getProteinsBySpecies(humanSpeciesId)
    const comparisonProteins = await getProteinsBySpecies(comparisonSpeciesId)
    const comparisonSpecies = await getSpeciesById(comparisonSpeciesId)
    const alignments = await getAlignments()

    if (!comparisonSpecies) return []

    const comparisons: ComparisonData[] = []

    for (const humanProtein of humanProteins) {
      const comparisonProtein = comparisonProteins.find(p => p.subunit === humanProtein.subunit)
      if (comparisonProtein) {
        // Find alignment data
        const alignmentData = alignments.find(a =>
          a.human_protein_id === humanProtein.id &&
          a.comparison_protein_id === comparisonProtein.id
        )

        if (alignmentData) {
          comparisons.push({
            human_protein: humanProtein,
            comparison_protein: comparisonProtein,
            alignment: alignmentData,
            species: comparisonSpecies
          })
        }
      }
    }

    return comparisons
  } catch (error) {
    console.error('Error fetching comparison data:', error)
    return []
  }
}

// Additional utility functions
export async function getNewsItems(): Promise<NewsItem[]> {
  try {
    const data = await readJsonFile<NewsItem[]>('data/news.json')
    if (data) return data

    // Return fallback news data if file reading fails
    return [
      {
        id: '1',
        title: 'Database Launch: γ-Secretase Comparative Analysis Platform',
        content: 'We are excited to announce the launch of our comprehensive γ-secretase comparative database.',
        date: '2024-01-15',
        type: 'update'
      },
      {
        id: '2',
        title: 'New Structural Data: High-Resolution γ-Secretase Complex',
        content: 'Added high-resolution structural models for all four γ-secretase subunits.',
        date: '2024-01-10',
        type: 'feature'
      },
      {
        id: '3',
        title: 'Research Highlight: Evolutionary Conservation Analysis',
        content: 'Our analysis reveals remarkable conservation of catalytic residues across species.',
        date: '2024-01-05',
        type: 'research'
      }
    ]
  } catch (error) {
    console.error('Error fetching news:', error)
    // Return fallback news data
    return [
      {
        id: '1',
        title: 'Database Launch: γ-Secretase Comparative Analysis Platform',
        content: 'We are excited to announce the launch of our comprehensive γ-secretase comparative database.',
        date: '2024-01-15',
        type: 'update'
      }
    ]
  }
}

export async function getInteractionData(): Promise<InteractionData[]> {
  try {
    const data = await readJsonFile<InteractionData[]>('data/interactions.json')
    return data || []
  } catch (error) {
    console.error('Error fetching interactions:', error)
    return []
  }
}

export async function getComplexAssemblySteps(): Promise<ComplexAssemblyStep[]> {
  try {
    const data = await readJsonFile<ComplexAssemblyStep[]>('data/complex_assembly.json')
    return data || []
  } catch (error) {
    console.error('Error fetching complex assembly:', error)
    return []
  }
}
