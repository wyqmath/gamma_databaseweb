'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Search, Filter, Zap, TreePine, Database } from 'lucide-react'
import { Species } from '@/types'
import { getSpecies } from '@/lib/data'
import Breadcrumb from '@/components/Breadcrumb'

export default function ExplorePage() {
  const [species, setSpecies] = useState<Species[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSpecies() {
      try {
        const data = await getSpecies()
        setSpecies(data.slice(0, 6)) // Show only first 6 for exploration
      } catch (error) {
        console.error('Error loading species:', error)
      } finally {
        setLoading(false)
      }
    }
    loadSpecies()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading exploration data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'Explore Species', current: true }]} />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6">
            <Search className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Explore γ-Secretase</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Discover the fascinating world of γ-secretase complexes across different species. 
            Start your journey with featured organisms and comparative analysis tools.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyan-600/20 rounded-lg">
                  <Database className="h-6 w-6 text-cyan-400" />
                </div>
                <CardTitle className="text-white">Compare Subunits</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Dive deep into the four essential subunits of the γ-secretase complex
              </p>
              <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Link href="/subunits">
                  Explore Subunits
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <TreePine className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Evolution Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Trace evolutionary relationships and conservation patterns
              </p>
              <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Link href="/evolution">
                  View Evolution Tree
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <Filter className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle className="text-white">Browse All Species</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 mb-4">
                Access the complete species database with search and filtering
              </p>
              <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Link href="/species">
                  Species Index
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Featured Species */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Featured Species</h2>
              <p className="text-slate-400">Start exploring with these model organisms</p>
            </div>
            <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Link href="/species">
                View All Species
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {species.map((speciesItem) => (
              <Card key={speciesItem.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {speciesItem.common_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        {speciesItem.common_name}
                      </CardTitle>
                      <p className="text-slate-400 text-sm italic">
                        {speciesItem.scientific_name}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm mb-4 line-clamp-3">
                    {speciesItem.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 bg-slate-700 px-2 py-1 rounded">
                      {speciesItem.category}
                    </span>
                    <Button asChild size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                      <Link href={`/comparison/${speciesItem.id}`}>
                        Compare
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-slate-800/30 border-slate-700 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Zap className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">
                Ready for Advanced Analysis?
              </h3>
              <p className="text-slate-300 mb-6">
                Access powerful comparison tools, sequence alignments, and structural analysis features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Link href="/comparison">
                    Start Comparison
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Link href="/complex">
                    View 3D Structure
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
