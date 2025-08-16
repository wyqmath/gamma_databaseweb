'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, ArrowRight } from 'lucide-react'
import { Species } from '@/types'
import { getSpecies } from '@/lib/data'
import Breadcrumb from '@/components/Breadcrumb'
import { InlineQuickAccess } from '@/components/QuickAccessMenu'

export default function SpeciesIndexPage() {
  const [species, setSpecies] = useState<Species[]>([])
  const [filteredSpecies, setFilteredSpecies] = useState<Species[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSpecies() {
      try {
        const data = await getSpecies()
        setSpecies(data)
        setFilteredSpecies(data)
      } catch (error) {
        console.error('Error loading species:', error)
      } finally {
        setLoading(false)
      }
    }
    loadSpecies()
  }, [])

  useEffect(() => {
    let filtered = species

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.scientific_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(s => s.category === selectedCategory)
    }

    setFilteredSpecies(filtered)
  }, [species, searchTerm, selectedCategory])

  const categories = ['all', ...Array.from(new Set(species.map(s => s.category)))]
  const groupedSpecies = filteredSpecies.reduce((acc, species) => {
    if (!acc[species.category]) {
      acc[species.category] = []
    }
    acc[species.category].push(species)
    return acc
  }, {} as Record<string, Species[]>)

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading species data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Species Index', href: '/species' }
          ]} />
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Species Index</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Explore γ-secretase complex data across different species. Compare sequences, structures, and evolutionary relationships.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by common name or scientific name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-cyan-600 text-white"
                      : "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8 text-center">
          <p className="text-slate-400">
            Showing {filteredSpecies.length} of {species.length} species
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Species Grid */}
        {Object.keys(groupedSpecies).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No species found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              variant="outline"
              className="mt-4 border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedSpecies).map(([category, categorySpecies]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-2">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorySpecies.map((speciesItem) => (
                    <Card
                      key={speciesItem.id}
                      className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-200 hover:scale-105"
                    >
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
                            <Link href={`/species/${speciesItem.id}`}>
                              View Details
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Access */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-white mb-4 text-center">Quick Access to Other Tools</h3>
          <InlineQuickAccess className="max-w-4xl mx-auto" />
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-slate-800/30 border-slate-700 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Interested in Adding Your Species?
              </h3>
              <p className="text-slate-300 mb-6">
                We welcome contributions of new species data to expand our comparative database.
                Contact us to learn about data submission guidelines.
              </p>
              <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
