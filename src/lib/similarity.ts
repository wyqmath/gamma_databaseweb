import { SequenceSimilarityResult } from '@/types'

/**
 * Amino acid similarity groups for calculating similarity scores
 */
const SIMILARITY_GROUPS = {
  hydrophobic: ['A', 'I', 'L', 'M', 'F', 'W', 'Y', 'V'],
  polar: ['N', 'C', 'Q', 'S', 'T'],
  charged_positive: ['R', 'H', 'K'],
  charged_negative: ['D', 'E'],
  special: ['G', 'P']
}

/**
 * BLOSUM62 substitution matrix (simplified version)
 */
const BLOSUM62: { [key: string]: { [key: string]: number } } = {
  'A': { 'A': 4, 'R': -1, 'N': -2, 'D': -2, 'C': 0, 'Q': -1, 'E': -1, 'G': 0, 'H': -2, 'I': -1, 'L': -1, 'K': -1, 'M': -1, 'F': -2, 'P': -1, 'S': 1, 'T': 0, 'W': -3, 'Y': -2, 'V': 0 },
  'R': { 'A': -1, 'R': 5, 'N': 0, 'D': -2, 'C': -3, 'Q': 1, 'E': 0, 'G': -2, 'H': 0, 'I': -3, 'L': -2, 'K': 2, 'M': -1, 'F': -3, 'P': -2, 'S': -1, 'T': -1, 'W': -3, 'Y': -2, 'V': -3 },
  'N': { 'A': -2, 'R': 0, 'N': 6, 'D': 1, 'C': -3, 'Q': 0, 'E': 0, 'G': 0, 'H': 1, 'I': -3, 'L': -3, 'K': 0, 'M': -2, 'F': -3, 'P': -2, 'S': 1, 'T': 0, 'W': -4, 'Y': -2, 'V': -3 },
  'D': { 'A': -2, 'R': -2, 'N': 1, 'D': 6, 'C': -3, 'Q': 0, 'E': 2, 'G': -1, 'H': -1, 'I': -3, 'L': -4, 'K': -1, 'M': -3, 'F': -3, 'P': -1, 'S': 0, 'T': -1, 'W': -4, 'Y': -3, 'V': -3 },
  'C': { 'A': 0, 'R': -3, 'N': -3, 'D': -3, 'C': 9, 'Q': -3, 'E': -4, 'G': -3, 'H': -3, 'I': -1, 'L': -1, 'K': -3, 'M': -1, 'F': -2, 'P': -3, 'S': -1, 'T': -1, 'W': -2, 'Y': -2, 'V': -1 }
  // Add more as needed...
}

/**
 * Calculate sequence similarity between two protein sequences
 * @param sequence1 First protein sequence
 * @param sequence2 Second protein sequence
 * @param alignedSeq1 Aligned version of sequence1 (optional)
 * @param alignedSeq2 Aligned version of sequence2 (optional)
 * @returns SequenceSimilarityResult
 */
export function calculateSequenceSimilarity(
  sequence1: string,
  sequence2: string,
  alignedSeq1?: string,
  alignedSeq2?: string
): SequenceSimilarityResult {
  // Use aligned sequences if provided, otherwise use raw sequences
  const seq1 = alignedSeq1 || sequence1
  const seq2 = alignedSeq2 || sequence2

  // Ensure sequences are the same length for comparison
  const maxLength = Math.max(seq1.length, seq2.length)
  
  let identicalResidues = 0
  let similarResidues = 0
  let gapResidues = 0
  let totalScore = 0
  
  // Compare sequences position by position
  for (let i = 0; i < maxLength; i++) {
    const aa1 = i < seq1.length ? seq1[i] : '-'
    const aa2 = i < seq2.length ? seq2[i] : '-'
    
    if (aa1 === '-' || aa2 === '-') {
      gapResidues++
      continue
    }
    
    if (aa1 === aa2) {
      identicalResidues++
      similarResidues++
      totalScore += getBLOSUMScore(aa1, aa2)
    } else if (areSimilar(aa1, aa2)) {
      similarResidues++
      totalScore += getBLOSUMScore(aa1, aa2)
    } else {
      totalScore += getBLOSUMScore(aa1, aa2)
    }
  }
  
  const alignmentLength = maxLength
  const identity = (identicalResidues / alignmentLength) * 100
  const similarity = (similarResidues / alignmentLength) * 100
  const gaps = (gapResidues / alignmentLength) * 100
  
  return {
    identity: Math.round(identity * 100) / 100,
    similarity: Math.round(similarity * 100) / 100,
    gaps: Math.round(gaps * 100) / 100,
    score: totalScore,
    alignmentLength,
    identicalResidues,
    similarResidues,
    gapResidues
  }
}

/**
 * Check if two amino acids are similar based on chemical properties
 * @param aa1 First amino acid
 * @param aa2 Second amino acid
 * @returns boolean
 */
function areSimilar(aa1: string, aa2: string): boolean {
  // Check if both amino acids belong to the same similarity group
  for (const group of Object.values(SIMILARITY_GROUPS)) {
    if (group.includes(aa1) && group.includes(aa2)) {
      return true
    }
  }
  return false
}

/**
 * Get BLOSUM62 score for two amino acids
 * @param aa1 First amino acid
 * @param aa2 Second amino acid
 * @returns number
 */
function getBLOSUMScore(aa1: string, aa2: string): number {
  if (BLOSUM62[aa1] && BLOSUM62[aa1][aa2] !== undefined) {
    return BLOSUM62[aa1][aa2]
  }
  // Default score for unknown amino acids
  return aa1 === aa2 ? 1 : -1
}

/**
 * Calculate pairwise sequence identity using simple alignment
 * @param sequence1 First sequence
 * @param sequence2 Second sequence
 * @returns number (percentage identity)
 */
export function calculatePairwiseIdentity(sequence1: string, sequence2: string): number {
  const result = calculateSequenceSimilarity(sequence1, sequence2)
  return result.identity
}

/**
 * Calculate sequence composition (amino acid frequencies)
 * @param sequence Protein sequence
 * @returns Object with amino acid frequencies
 */
export function calculateSequenceComposition(sequence: string): { [aa: string]: number } {
  const composition: { [aa: string]: number } = {}
  const aminoAcids = 'ACDEFGHIKLMNPQRSTVWY'
  
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
  const total = sequence.length
  Object.keys(composition).forEach(aa => {
    composition[aa] = (composition[aa] / total) * 100
  })
  
  return composition
}

/**
 * Calculate hydrophobicity index of a sequence
 * @param sequence Protein sequence
 * @returns number (hydrophobicity percentage)
 */
export function calculateHydrophobicity(sequence: string): number {
  const hydrophobic = SIMILARITY_GROUPS.hydrophobic
  let hydrophobicCount = 0
  
  sequence.split('').forEach(aa => {
    if (hydrophobic.includes(aa)) {
      hydrophobicCount++
    }
  })
  
  return (hydrophobicCount / sequence.length) * 100
}

/**
 * Find conserved regions between two sequences
 * @param sequence1 First sequence
 * @param sequence2 Second sequence
 * @param windowSize Size of the sliding window
 * @param threshold Minimum identity threshold for conservation
 * @returns Array of conserved regions
 */
export function findConservedRegions(
  sequence1: string,
  sequence2: string,
  windowSize: number = 10,
  threshold: number = 80
): Array<{ start: number; end: number; identity: number }> {
  const conservedRegions: Array<{ start: number; end: number; identity: number }> = []
  const minLength = Math.min(sequence1.length, sequence2.length)
  
  for (let i = 0; i <= minLength - windowSize; i++) {
    const window1 = sequence1.substring(i, i + windowSize)
    const window2 = sequence2.substring(i, i + windowSize)
    
    const similarity = calculateSequenceSimilarity(window1, window2)
    
    if (similarity.identity >= threshold) {
      conservedRegions.push({
        start: i,
        end: i + windowSize - 1,
        identity: similarity.identity
      })
    }
  }
  
  // Merge overlapping regions
  return mergeOverlappingRegions(conservedRegions)
}

/**
 * Merge overlapping conserved regions
 * @param regions Array of conserved regions
 * @returns Array of merged regions
 */
function mergeOverlappingRegions(
  regions: Array<{ start: number; end: number; identity: number }>
): Array<{ start: number; end: number; identity: number }> {
  if (regions.length === 0) return []
  
  // Sort regions by start position
  regions.sort((a, b) => a.start - b.start)
  
  const merged: Array<{ start: number; end: number; identity: number }> = [regions[0]]
  
  for (let i = 1; i < regions.length; i++) {
    const current = regions[i]
    const last = merged[merged.length - 1]
    
    if (current.start <= last.end + 1) {
      // Overlapping or adjacent regions - merge them
      last.end = Math.max(last.end, current.end)
      last.identity = Math.max(last.identity, current.identity)
    } else {
      // Non-overlapping region - add as new
      merged.push(current)
    }
  }
  
  return merged
}

/**
 * Calculate overall conservation score between two sequences
 * @param sequence1 First sequence
 * @param sequence2 Second sequence
 * @returns number (conservation score 0-100)
 */
export function calculateConservationScore(sequence1: string, sequence2: string): number {
  const similarity = calculateSequenceSimilarity(sequence1, sequence2)
  const conservedRegions = findConservedRegions(sequence1, sequence2)
  
  // Weight identity (70%) and conserved regions (30%)
  const identityScore = similarity.identity * 0.7
  const conservationScore = (conservedRegions.length / Math.max(sequence1.length, sequence2.length)) * 100 * 0.3
  
  return Math.round((identityScore + conservationScore) * 100) / 100
}
