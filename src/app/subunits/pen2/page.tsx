import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Link as LinkIcon, Database, ExternalLink } from 'lucide-react'

export default function PEN2Page() {
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-6">
            <LinkIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">PEN-2</h1>
          <p className="text-xl text-slate-400 mb-2">Presenilin Enhancer 2</p>
          <p className="text-slate-300 max-w-3xl mx-auto">
            A small but essential transmembrane protein required for γ-secretase complex assembly 
            and presenilin activation. Despite its small size, PEN-2 is absolutely critical for 
            complex maturation and function.
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
                <p className="text-white font-mono">Q9NZ42</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Length:</span>
                <p className="text-white">101 amino acids</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Molecular Weight:</span>
                <p className="text-white">~12 kDa</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Transmembrane Domains:</span>
                <p className="text-white">2</p>
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
                <p className="text-white">Assembly Cofactor</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Essential for:</span>
                <p className="text-white">Complex maturation</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Facilitates:</span>
                <p className="text-white">Presenilin endoproteolysis</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Size:</span>
                <p className="text-white">Smallest subunit</p>
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
                  <span className="text-cyan-400 font-bold">98.0%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Highest conservation among all subunits, reflecting its critical role.
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
                      <span className="text-white">TMD 2</span>
                      <span className="text-xs text-slate-500">60-80</span>
                    </div>
                    <p className="text-slate-300 text-sm">Important for presenilin interaction</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Key Regions</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white">N-terminal</span>
                      <span className="text-xs text-slate-500">1-14</span>
                    </div>
                    <p className="text-slate-300 text-sm">Cytoplasmic domain</p>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white">C-terminal</span>
                      <span className="text-xs text-slate-500">81-101</span>
                    </div>
                    <p className="text-slate-300 text-sm">Required for complex assembly</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sequence Information */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Complete Sequence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
              <p className="text-xs text-slate-400 mb-2">Human PEN-2 (UniProt: Q9NZ42) - Complete sequence (101 aa)</p>
              <div className="font-mono text-sm text-slate-300 break-all">
                <span className="text-cyan-400">MNLERVSNEEKLNLCRKYYLGGFAFLPFLWLVNIFWFFREAFLVPAYTEQSQIKGYVWRS</span>
                <br />
                <span className="text-green-400">AVGFLFWVIVLTSWITIFQIYRPRWGALGDYLSFTIPLGTP</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Colors indicate transmembrane domains: 
                <span className="text-cyan-400 ml-2">TMD1 region</span>
                <span className="text-green-400 ml-2">TMD2 region</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Unique Features */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Unique Characteristics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Size & Complexity</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-slate-300">Smallest subunit</span>
                    <span className="text-purple-400 font-bold">101 aa</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-slate-300">Simplest topology</span>
                    <span className="text-purple-400 font-bold">2 TMDs</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-slate-300">Highest conservation</span>
                    <span className="text-purple-400 font-bold">98.0%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Functional Importance</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-white font-semibold">Essential Role</span>
                    <p className="text-slate-300 text-sm mt-1">
                      Despite its small size, absolutely required for complex function
                    </p>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <span className="text-white font-semibold">Assembly Factor</span>
                    <p className="text-slate-300 text-sm mt-1">
                      Critical for proper complex maturation and stability
                    </p>
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
            <a href="https://www.uniprot.org/uniprot/Q9NZ42" target="_blank" rel="noopener noreferrer">
              UniProt Entry
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
