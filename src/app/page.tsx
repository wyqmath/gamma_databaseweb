import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Database, Search, BarChart3, Microscope } from 'lucide-react'
import { getNewsItems } from '@/lib/data'

export default async function Home() {
  const newsItems = await getNewsItems()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6">
              <span className="text-3xl font-bold text-white">γ</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              γ-Secretase
              <span className="block text-cyan-400">Comparative Database</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Explore and compare γ-secretase complex subunits across species with detailed
              sequence alignments, structural analysis, and evolutionary insights.
            </p>
          </div>


          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white">
              <Link href="/species">
                Explore Species
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Link href="/evolution">
                View Evolution Tree
              </Link>
            </Button>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-cyan-600/20 rounded-lg">
                    <Search className="h-6 w-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-white">Species Index</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  Browse and search through our comprehensive collection of species with
                  γ-secretase complex data, from mammals to invertebrates.
                </p>
                <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Link href="/species">
                    Browse Species
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <Database className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Subunit Database</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-4">
                  Detailed information on all four γ-secretase subunits: PSEN1, NCT,
                  APH-1, and PEN-2 with structural and functional data.
                </p>
                <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Link href="/subunits">
                    Explore Subunits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* News and Updates */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Latest Updates</h2>
            <p className="text-slate-400">Stay informed about new features and research findings</p>
          </div>

          <div className="grid gap-6">
            {newsItems.slice(0, 3).map((item) => (
              <Card key={item.id} className="bg-slate-800/30 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.type === 'update' ? 'bg-cyan-600/20 text-cyan-400' :
                          item.type === 'feature' ? 'bg-green-600/20 text-green-400' :
                          'bg-purple-600/20 text-purple-400'
                        }`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                        <span className="text-slate-500 text-sm">{item.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-300 text-sm">{item.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 bg-slate-900/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">6</div>
              <div className="text-slate-400 text-sm">Species</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">4</div>
              <div className="text-slate-400 text-sm">Subunits</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">24</div>
              <div className="text-slate-400 text-sm">Proteins</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">12</div>
              <div className="text-slate-400 text-sm">Comparisons</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
