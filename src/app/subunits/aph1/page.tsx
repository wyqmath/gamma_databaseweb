import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Wrench, Database, ExternalLink } from 'lucide-react'

export default function APH1Page() {
  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-slate-400 hover:text-white">
            <Link href="/subunits">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subunits
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6">
            <Wrench className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">APH-1</h1>
          <p className="text-xl text-slate-400 mb-2">Anterior Pharynx-defective 1</p>
          <p className="text-slate-300 max-w-3xl mx-auto">
            A seven-transmembrane protein essential for the assembly and stability of the γ-secretase 
            complex. APH-1 plays a crucial role in complex maturation and presenilin endoproteolysis.
          </p>
        </div>

        {/* Key Information */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-slate-400 text-sm">UniProt ID:</span>
                <p className="text-white font-mono">Q96BI3</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Length:</span>
                <p className="text-white">265 amino acids</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Molecular Weight:</span>
                <p className="text-white">~30 kDa</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Transmembrane Domains:</span>
                <p className="text-white">7</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Functional Role</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-slate-400 text-sm">Primary Function:</span>
                <p className="text-white">Complex Stabilization</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Paralogs:</span>
                <p className="text-white">APH-1A, APH-1B</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Essential for:</span>
                <p className="text-white">Presenilin endoproteolysis</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Topology:</span>
                <p className="text-white">Seven-pass transmembrane</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Conservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Overall Conservation</span>
                  <span className="text-cyan-400 font-bold">94.2%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                High conservation across vertebrates, particularly in transmembrane regions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Functional Domains */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Structural Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Transmembrane Domains</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white">TMD 1</span>
                      <span className="text-xs text-slate-500">15-35</span>
                    </div>
                    <p className="text-slate-300 text-sm">Critical for membrane insertion</p>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white">TMD 7</span>
                      <span className="text-xs text-slate-500">220-240</span>
                    </div>
                    <p className="text-slate-300 text-sm">Important for complex assembly</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Key Residues</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-cyan-400">Conserved His</span>
                      <span className="text-xs text-slate-500">Multiple</span>
                    </div>
                    <p className="text-slate-300 text-sm">Essential for catalytic activity</p>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white">Loop Regions</span>
                      <span className="text-xs text-slate-500">Variable</span>
                    </div>
                    <p className="text-slate-300 text-sm">Species-specific differences</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Link href="/species">
              Compare Across Species
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Link href="/evolution">
              View Evolution Tree
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <a href="https://www.uniprot.org/uniprot/Q96BI3" target="_blank" rel="noopener noreferrer">
              UniProt Entry
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
