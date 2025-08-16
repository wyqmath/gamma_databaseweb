import { Species, Protein, NewsItem, InteractionData, ComplexAssemblyStep, GammaSecreteaseData } from '@/types'

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

    // Generate species data from gamma_secretase.json if species.json doesn't exist
    const gammaData = await readJsonFile<GammaSecreteaseData[]>('data/gamma_secretase.json')
    if (gammaData) {
      const speciesMap = new Map<string, Species>()

      gammaData.forEach((entry) => {
        const speciesName = entry.species_name
        if (!speciesMap.has(speciesName)) {
          speciesMap.set(speciesName, {
            id: speciesName.toLowerCase(),
            common_name: getCommonName(speciesName),
            scientific_name: getScientificName(speciesName),
            category: getSpeciesCategory(speciesName),
            description: `γ-secretase complex data for ${getCommonName(speciesName)}`,
            created_at: new Date().toISOString()
          })
        }
      })

      return Array.from(speciesMap.values())
    }

    return []
  } catch (error) {
    console.error('Error fetching species:', error)
    return []
  }
}

// Helper functions for species data
function getCommonName(speciesName: string): string {
  const nameMap: Record<string, string> = {
    'Dictyostelium': 'Slime Mold',
    'Hibiscus': 'Hibiscus',
    'Pocillopora': 'Coral',
    'Mus': 'Mouse',
    'Danio': 'Zebrafish',
    'Branchiostoma': 'Amphioxus'
  }
  return nameMap[speciesName] || speciesName
}

function getScientificName(speciesName: string): string {
  const nameMap: Record<string, string> = {
    'Dictyostelium': 'Dictyostelium discoideum',
    'Hibiscus': 'Hibiscus syriacus',
    'Pocillopora': 'Pocillopora damicornis',
    'Mus': 'Mus musculus',
    'Danio': 'Danio rerio',
    'Branchiostoma': 'Branchiostoma floridae'
  }
  return nameMap[speciesName] || speciesName
}

function getSpeciesCategory(speciesName: string): string {
  const categoryMap: Record<string, string> = {
    'Dictyostelium': 'Other',
    'Hibiscus': 'Plants',
    'Pocillopora': 'Other',
    'Mus': 'Mammals',
    'Danio': 'Fish',
    'Branchiostoma': 'Other'
  }
  return categoryMap[speciesName] || 'Other'
}

function normalizeSubunitName(subunit: string): 'PSEN1' | 'PEN-2' | 'APH-1' | 'NCT' {
  switch (subunit) {
    case 'PEN2':
      return 'PEN-2'
    case 'APH1':
      return 'APH-1'
    case 'PSEN1':
    case 'NCT':
      return subunit as 'PSEN1' | 'NCT'
    default:
      throw new Error(`Unknown subunit: ${subunit}`)
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

    // Generate proteins data from gamma_secretase.json if proteins.json doesn't exist
    const gammaData = await readJsonFile<GammaSecreteaseData[]>('data/gamma_secretase.json')
    if (gammaData) {
      return gammaData.map((entry) => ({
        id: entry.id,
        species_id: entry.species_name.toLowerCase(),
        subunit: normalizeSubunitName(entry.subunits),
        sequence: entry.sequence,
        description: `${entry.subunits} subunit from ${getCommonName(entry.species_name)}`,
        structure_file: entry.structure_files,
        created_at: new Date().toISOString()
      }))
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

// Get complex structures for a specific protein
export async function getComplexStructures(proteinId: string): Promise<string[]> {
  try {
    const gammaData = await readJsonFile<GammaSecreteaseData[]>('data/gamma_secretase.json')
    if (gammaData) {
      const protein = gammaData.find(entry => entry.id === proteinId)
      return protein?.complex_structures || []
    }
    return []
  } catch (error) {
    console.error('Error fetching complex structures:', error)
    return []
  }
}

// Get all available complex structures
export async function getAllComplexStructures(): Promise<{[key: string]: string[]}> {
  try {
    const gammaData = await readJsonFile<GammaSecreteaseData[]>('data/gamma_secretase.json')
    if (gammaData) {
      const complexMap: {[key: string]: string[]} = {}
      gammaData.forEach(entry => {
        if (entry.complex_structures && entry.complex_structures.length > 0) {
          complexMap[entry.id] = entry.complex_structures
        }
      })
      return complexMap
    }
    return {}
  } catch (error) {
    console.error('Error fetching all complex structures:', error)
    return {}
  }
}

// Get subunit statistics
export async function getSubunitStats(): Promise<{[key: string]: {species: number, proteins: number}}> {
  try {
    const proteins = await getProteins()
    const stats: {[key: string]: {species: number, proteins: number}} = {}

    // Initialize stats for all subunits
    const subunits = ['PSEN1', 'NCT', 'APH-1', 'PEN-2']
    subunits.forEach(subunit => {
      stats[subunit] = { species: 0, proteins: 0 }
    })

    // Count proteins and species for each subunit
    proteins.forEach(protein => {
      if (stats[protein.subunit]) {
        stats[protein.subunit].proteins++
      }
    })

    // Count unique species for each subunit
    subunits.forEach(subunit => {
      const speciesSet = new Set(
        proteins
          .filter(p => p.subunit === subunit)
          .map(p => p.species_id)
      )
      stats[subunit].species = speciesSet.size
    })

    return stats
  } catch (error) {
    console.error('Error calculating subunit stats:', error)
    return {}
  }
}

// Get specific protein by species and subunit
export async function getProteinBySpeciesAndSubunit(speciesId: string, subunit: string): Promise<Protein | null> {
  try {
    const proteins = await getProteins()
    const normalizedSubunit = normalizeSubunitName(subunit.toUpperCase() as 'PSEN1' | 'PEN2' | 'APH1' | 'NCT')
    return proteins.find(p => p.species_id === speciesId && p.subunit === normalizedSubunit) || null
  } catch (error) {
    console.error('Error fetching protein by species and subunit:', error)
    return null
  }
}

// Get all proteins for a specific subunit across all species
export async function getProteinsBySubunit(subunit: string): Promise<Protein[]> {
  try {
    const proteins = await getProteins()
    const normalizedSubunit = normalizeSubunitName(subunit.toUpperCase() as 'PSEN1' | 'PEN2' | 'APH1' | 'NCT')
    return proteins.filter(p => p.subunit === normalizedSubunit)
  } catch (error) {
    console.error('Error fetching proteins by subunit:', error)
    return []
  }
}

// Calculate basic sequence statistics
export function calculateSequenceStats(sequence: string) {
  const length = sequence.length
  const aminoAcids = 'ACDEFGHIKLMNPQRSTVWY'
  const composition: Record<string, number> = {}

  // Initialize composition
  aminoAcids.split('').forEach(aa => {
    composition[aa] = 0
  })

  // Count amino acids
  sequence.split('').forEach(aa => {
    if (composition[aa] !== undefined) {
      composition[aa]++
    }
  })

  // Convert to percentages
  const percentageComposition: Record<string, number> = {}
  Object.keys(composition).forEach(aa => {
    percentageComposition[aa] = (composition[aa] / length) * 100
  })

  return {
    length,
    composition: percentageComposition,
    molecularWeight: estimateMolecularWeight(sequence),
    hydrophobicResidues: calculateHydrophobicPercentage(sequence)
  }
}

// Estimate molecular weight (simplified calculation)
function estimateMolecularWeight(sequence: string): number {
  const aaWeights: Record<string, number> = {
    'A': 89.1, 'C': 121.2, 'D': 133.1, 'E': 147.1, 'F': 165.2,
    'G': 75.1, 'H': 155.2, 'I': 131.2, 'K': 146.2, 'L': 131.2,
    'M': 149.2, 'N': 132.1, 'P': 115.1, 'Q': 146.2, 'R': 174.2,
    'S': 105.1, 'T': 119.1, 'V': 117.1, 'W': 204.2, 'Y': 181.2
  }

  let weight = 0
  sequence.split('').forEach(aa => {
    weight += aaWeights[aa] || 0
  })

  // Subtract water molecules (n-1 peptide bonds)
  weight -= (sequence.length - 1) * 18.015

  return Math.round(weight * 100) / 100
}

// Calculate hydrophobic residue percentage
function calculateHydrophobicPercentage(sequence: string): number {
  const hydrophobic = 'AILMFPWV'
  let count = 0

  sequence.split('').forEach(aa => {
    if (hydrophobic.includes(aa)) {
      count++
    }
  })

  return Math.round((count / sequence.length) * 100 * 100) / 100
}
