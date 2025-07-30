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

// Data fetching functions - using real data from JSON files
export async function getSpecies(): Promise<Species[]> {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/data/species.json`)
    if (!response.ok) throw new Error('Failed to fetch species data')
    return await response.json()
  } catch (error) {
    console.error('Error fetching species:', error)
    // Fallback to Supabase if JSON fails and Supabase is available
    if (supabase) {
      const { data, error: supabaseError } = await supabase
        .from('species')
        .select('*')
        .order('common_name')

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        return []
      }

      return data || []
    }

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
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/data/proteins.json`)
    if (!response.ok) throw new Error('Failed to fetch proteins data')
    return await response.json()
  } catch (error) {
    console.error('Error fetching proteins:', error)
    // Fallback to Supabase if JSON fails and Supabase is available
    if (supabase) {
      const { data, error: supabaseError } = await supabase
        .from('proteins')
        .select('*')
        .order('subunit')

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        return []
      }

      return data || []
    }

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
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/data/alignments.json`)
    if (!response.ok) throw new Error('Failed to fetch alignments data')
    return await response.json()
  } catch (error) {
    console.error('Error fetching alignments:', error)
    // Fallback to Supabase if JSON fails and Supabase is available
    if (supabase) {
      const { data, error: supabaseError } = await supabase
        .from('alignments')
        .select('*')

      if (supabaseError) {
        console.error('Supabase error:', supabaseError)
        return []
      }

      return data || []
    }

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
    // Use absolute URL for server-side rendering
    const baseUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const response = await fetch(`${baseUrl}/data/news.json`)
    if (!response.ok) throw new Error('Failed to fetch news data')
    return await response.json()
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
  }
}

export async function getInteractionData(): Promise<InteractionData[]> {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/data/interactions.json`)
    if (!response.ok) throw new Error('Failed to fetch interaction data')
    return await response.json()
  } catch (error) {
    console.error('Error fetching interactions:', error)
    return []
  }
}

export async function getComplexAssemblySteps(): Promise<ComplexAssemblyStep[]> {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/data/complex_assembly.json`)
    if (!response.ok) throw new Error('Failed to fetch complex assembly data')
    return await response.json()
  } catch (error) {
    console.error('Error fetching complex assembly:', error)
    return []
  }
}
