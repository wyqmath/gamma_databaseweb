import { NextRequest, NextResponse } from 'next/server'
import { 
  calculateStructuralSimilarity, 
  getCachedStructuralComparison,
  cacheStructuralComparison,
  checkUSAlignAvailability,
  simulateStructuralComparison
} from '@/lib/structural-comparison'
import { StructuralComparisonResult } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { referenceFile, targetFile, subunit, targetSpecies, useCache = true, simulate = false } = body
    
    // Validate required parameters
    if (!referenceFile || !targetFile) {
      return NextResponse.json(
        { error: 'Missing required parameters: referenceFile and targetFile' },
        { status: 400 }
      )
    }
    
    console.log(`Structural comparison request: ${referenceFile} vs ${targetFile}`)
    
    // Check cache first if enabled
    if (useCache && subunit && targetSpecies) {
      const cachedResult = await getCachedStructuralComparison(subunit, targetSpecies)
      if (cachedResult) {
        console.log(`Returning cached result for ${subunit} ${targetSpecies}`)
        return NextResponse.json({
          success: true,
          data: cachedResult,
          cached: true
        })
      }
    }
    
    let result: StructuralComparisonResult
    
    if (simulate) {
      // Use simulation for development/testing
      console.log('Using simulated structural comparison')
      result = await simulateStructuralComparison(referenceFile, targetFile)
    } else {
      // Check if US-align is available
      const usAlignAvailable = await checkUSAlignAvailability()
      
      if (!usAlignAvailable) {
        console.warn('US-align not available, falling back to simulation')
        result = await simulateStructuralComparison(referenceFile, targetFile)
      } else {
        // Use real US-align calculation
        result = await calculateStructuralSimilarity(referenceFile, targetFile)
      }
    }
    
    // Cache the result if subunit and targetSpecies are provided
    if (subunit && targetSpecies) {
      await cacheStructuralComparison(subunit, targetSpecies, result)
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      cached: false
    })
    
  } catch (error) {
    console.error('Structural comparison API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Structural comparison failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subunit = searchParams.get('subunit')
    const targetSpecies = searchParams.get('targetSpecies')
    
    if (!subunit || !targetSpecies) {
      return NextResponse.json(
        { error: 'Missing required parameters: subunit and targetSpecies' },
        { status: 400 }
      )
    }
    
    // Get cached comparison result
    const cachedResult = await getCachedStructuralComparison(subunit, targetSpecies)
    
    if (cachedResult) {
      return NextResponse.json({
        success: true,
        data: cachedResult,
        cached: true
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'No cached result found'
      }, { status: 404 })
    }
    
  } catch (error) {
    console.error('Get structural comparison API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to retrieve structural comparison',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function OPTIONS(request: NextRequest) {
  try {
    const usAlignAvailable = await checkUSAlignAvailability()
    
    return NextResponse.json({
      status: 'ok',
      usAlignAvailable,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        usAlignAvailable: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
