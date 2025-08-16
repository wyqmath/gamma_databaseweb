import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs'
import { StructuralComparisonResult } from '@/types'

const execAsync = promisify(exec)

/**
 * Calculate structural similarity between two protein structures using US-align
 * @param referenceFile Path to reference structure file (relative to public/)
 * @param targetFile Path to target structure file (relative to public/)
 * @returns Promise<StructuralComparisonResult>
 */
export async function calculateStructuralSimilarity(
  referenceFile: string, 
  targetFile: string
): Promise<StructuralComparisonResult> {
  try {
    // Construct full paths
    const referencePath = path.join(process.cwd(), 'public', referenceFile)
    const targetPath = path.join(process.cwd(), 'public', targetFile)
    
    // Check if files exist
    if (!fs.existsSync(referencePath)) {
      throw new Error(`Reference file not found: ${referencePath}`)
    }
    if (!fs.existsSync(targetPath)) {
      throw new Error(`Target file not found: ${targetPath}`)
    }
    
    // Execute US-align command
    // US-align syntax: USalign structure1 structure2
    const command = `USalign "${targetPath}" "${referencePath}"`
    
    console.log(`Executing: ${command}`)
    const { stdout, stderr } = await execAsync(command, { 
      timeout: 30000, // 30 second timeout
      maxBuffer: 1024 * 1024 // 1MB buffer
    })
    
    if (stderr && stderr.trim()) {
      console.warn('US-align stderr:', stderr)
    }
    
    // Parse the output
    return parseUSAlignOutput(stdout)
  } catch (error) {
    console.error('Structural comparison failed:', error)
    throw new Error(`结构比对失败: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Parse US-align output to extract comparison metrics
 * @param output Raw stdout from US-align
 * @returns StructuralComparisonResult
 */
function parseUSAlignOutput(output: string): StructuralComparisonResult {
  console.log('Parsing US-align output...')
  
  // Initialize default values
  const result: StructuralComparisonResult = {
    rmsd: 0,
    tmScore: 0,
    alignedLength: 0,
    sequenceIdentity: 0,
    gdt_ts: 0,
    gdt_ha: 0,
    chainLength1: 0,
    chainLength2: 0,
    alignedResidues: 0
  }
  
  try {
    // Parse RMSD
    const rmsdMatch = output.match(/RMSD=\s*(\d+\.\d+)/i)
    if (rmsdMatch) {
      result.rmsd = parseFloat(rmsdMatch[1])
    }
    
    // Parse TM-score
    const tmScoreMatch = output.match(/TM-score=\s*(\d+\.\d+)/i)
    if (tmScoreMatch) {
      result.tmScore = parseFloat(tmScoreMatch[1])
    }
    
    // Parse aligned length
    const alignedLengthMatch = output.match(/Aligned length=\s*(\d+)/i)
    if (alignedLengthMatch) {
      result.alignedLength = parseInt(alignedLengthMatch[1])
      result.alignedResidues = result.alignedLength
    }
    
    // Parse sequence identity
    const identityMatch = output.match(/Sequence identity=\s*(\d+\.\d+)/i)
    if (identityMatch) {
      result.sequenceIdentity = parseFloat(identityMatch[1])
    }
    
    // Parse GDT-TS score
    const gdtTsMatch = output.match(/GDT-TS=\s*(\d+\.\d+)/i)
    if (gdtTsMatch) {
      result.gdt_ts = parseFloat(gdtTsMatch[1])
    }
    
    // Parse GDT-HA score
    const gdtHaMatch = output.match(/GDT-HA=\s*(\d+\.\d+)/i)
    if (gdtHaMatch) {
      result.gdt_ha = parseFloat(gdtHaMatch[1])
    }
    
    // Parse chain lengths
    const chainLength1Match = output.match(/Chain_1:\s*(\d+)/i)
    if (chainLength1Match) {
      result.chainLength1 = parseInt(chainLength1Match[1])
    }
    
    const chainLength2Match = output.match(/Chain_2:\s*(\d+)/i)
    if (chainLength2Match) {
      result.chainLength2 = parseInt(chainLength2Match[1])
    }
    
    // Alternative parsing for different US-align output formats
    if (result.rmsd === 0) {
      const altRmsdMatch = output.match(/RMSD\s*:\s*(\d+\.\d+)/i)
      if (altRmsdMatch) {
        result.rmsd = parseFloat(altRmsdMatch[1])
      }
    }
    
    if (result.tmScore === 0) {
      const altTmMatch = output.match(/TM-score\s*:\s*(\d+\.\d+)/i)
      if (altTmMatch) {
        result.tmScore = parseFloat(altTmMatch[1])
      }
    }
    
    console.log('Parsed results:', result)
    return result
    
  } catch (error) {
    console.error('Error parsing US-align output:', error)
    console.log('Raw output:', output)
    throw new Error('Failed to parse US-align output')
  }
}

/**
 * Check if US-align is available in the system
 * @returns Promise<boolean>
 */
export async function checkUSAlignAvailability(): Promise<boolean> {
  try {
    await execAsync('USalign', { timeout: 5000 })
    return true
  } catch {
    // Check alternative command names
    try {
      await execAsync('us-align', { timeout: 5000 })
      return true
    } catch {
      try {
        await execAsync('./USalign', { timeout: 5000 })
        return true
      } catch {
        console.warn('US-align not found in system PATH')
        return false
      }
    }
  }
}

/**
 * Get cached structural comparison result
 * @param subunit Subunit name
 * @param targetSpecies Target species name
 * @returns StructuralComparisonResult | null
 */
export async function getCachedStructuralComparison(
  subunit: string,
  targetSpecies: string
): Promise<StructuralComparisonResult | null> {
  try {
    const cachePath = path.join(process.cwd(), 'public/data/structural_comparisons.json')

    if (!fs.existsSync(cachePath)) {
      return null
    }

    const cacheData: Record<string, Record<string, StructuralComparisonResult>> = JSON.parse(fs.readFileSync(cachePath, 'utf8'))

    if (cacheData[subunit] && cacheData[subunit][targetSpecies]) {
      return cacheData[subunit][targetSpecies]
    }

    return null
  } catch (error) {
    console.error('Error reading cached comparison:', error)
    return null
  }
}

/**
 * Cache structural comparison result
 * @param subunit Subunit name
 * @param targetSpecies Target species name
 * @param result Comparison result
 */
export async function cacheStructuralComparison(
  subunit: string,
  targetSpecies: string,
  result: StructuralComparisonResult
): Promise<void> {
  try {
    const cachePath = path.join(process.cwd(), 'public/data/structural_comparisons.json')

    let cacheData: Record<string, Record<string, StructuralComparisonResult>> = {}
    if (fs.existsSync(cachePath)) {
      cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf8'))
    }

    if (!cacheData[subunit]) {
      cacheData[subunit] = {}
    }

    cacheData[subunit][targetSpecies] = result

    fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2))
  } catch (error) {
    console.error('Error caching comparison result:', error)
  }
}

/**
 * Simulate structural comparison for development/testing
 * @param referenceFile Reference structure file
 * @param targetFile Target structure file
 * @returns Promise<StructuralComparisonResult>
 */
export async function simulateStructuralComparison(
  _referenceFile: string,
  _targetFile: string
): Promise<StructuralComparisonResult> {
  // Generate realistic but simulated values
  const baseRmsd = Math.random() * 3 + 0.5 // 0.5-3.5 Å
  const baseTmScore = Math.random() * 0.4 + 0.6 // 0.6-1.0

  return {
    rmsd: Math.round(baseRmsd * 100) / 100,
    tmScore: Math.round(baseTmScore * 1000) / 1000,
    alignedLength: Math.floor(Math.random() * 200 + 300),
    sequenceIdentity: Math.round((Math.random() * 30 + 70) * 100) / 100,
    gdt_ts: Math.round((Math.random() * 20 + 75) * 100) / 100,
    gdt_ha: Math.round((Math.random() * 15 + 60) * 100) / 100,
    chainLength1: Math.floor(Math.random() * 100 + 400),
    chainLength2: Math.floor(Math.random() * 100 + 400),
    alignedResidues: Math.floor(Math.random() * 200 + 300)
  }
}
