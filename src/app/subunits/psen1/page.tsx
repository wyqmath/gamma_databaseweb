import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Zap, AlertTriangle, Database, ExternalLink } from 'lucide-react'

export default function PSEN1Page() {
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl mb-6">
            <Zap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">PSEN1</h1>
          <p className="text-xl text-slate-400 mb-2">Presenilin-1</p>
          <p className="text-slate-300 max-w-3xl mx-auto">
            The catalytic subunit of the γ-secretase complex, containing the active site aspartate 
            residues responsible for intramembrane proteolysis. PSEN1 is the most critical component 
            and the primary target for Alzheimer&apos;s disease-related mutations.
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
                <p className="text-white font-mono">P49768</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Length:</span>
                <p className="text-white">467 amino acids</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Molecular Weight:</span>
                <p className="text-white">~52 kDa</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Transmembrane Domains:</span>
                <p className="text-white">9</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Clinical Significance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-slate-400 text-sm">Disease Association:</span>
                <p className="text-white">Familial Alzheimer&apos;s Disease</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Known Mutations:</span>
                <p className="text-white">300+</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Age of Onset:</span>
                <p className="text-white">30-60 years</p>
              </div>
              <div>
                <span className="text-slate-400 text-sm">Inheritance:</span>
                <p className="text-white">Autosomal Dominant</p>
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
                  <span className="text-cyan-400 font-bold">96.7%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '96.7%' }}></div>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Extremely high conservation across vertebrates, particularly in catalytic domains.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Functional Domains */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Functional Domains & Key Sites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Critical Catalytic Sites</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-cyan-400">Asp257</span>
                      <span className="text-xs text-slate-500">TMD6</span>
                    </div>
                    <p className="text-slate-300 text-sm">First catalytic aspartate residue in transmembrane domain 6</p>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono text-cyan-400">Asp385</span>
                      <span className="text-xs text-slate-500">TMD7</span>
                    </div>
                    <p className="text-slate-300 text-sm">Second catalytic aspartate residue in transmembrane domain 7</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Structural Features</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white">Endoproteolysis Site</span>
                      <span className="text-xs text-slate-500">~Arg292</span>
                    </div>
                    <p className="text-slate-300 text-sm">Cleavage site generating N-terminal and C-terminal fragments</p>
                  </div>
                  <div className="p-3 bg-slate-900/50 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-white">Active Site Cavity</span>
                      <span className="text-xs text-slate-500">TMD6-7</span>
                    </div>
                    <p className="text-slate-300 text-sm">Formed by transmembrane domains 6 and 7</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sequence Information */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Sequence Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 p-4 rounded-lg overflow-x-auto">
              <p className="text-xs text-slate-400 mb-2">Human PSEN1 (UniProt: P49768)</p>
              <div className="font-mono text-sm text-slate-300 break-all">
                <span className="text-cyan-400">MTELPAPLSY</span>
                <span className="text-slate-300">FQNAQMSED</span>
                <span className="text-green-400">NHLSNTVRSQ</span>
                <span className="text-slate-300">NDNRERQEHN</span>
                <span className="text-yellow-400">DRRSLGHPEP</span>
                <span className="text-slate-300">LSNGRPQGNS</span>
                <br />
                <span className="text-slate-300">RQVVEQDEE</span>
                <span className="text-red-400">EDEELTLKYG</span>
                <span className="text-slate-300">AKHVIMLFVP</span>
                <span className="text-blue-400">VTLCMVVVVA</span>
                <span className="text-slate-300">TIKSVSFYTR</span>
                <span className="text-purple-400">KDGQLIYTPF</span>
                <br />
                <span className="text-slate-300">...</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Colors indicate different structural regions: 
                <span className="text-cyan-400 ml-2">N-terminal</span>
                <span className="text-red-400 ml-2">Transmembrane</span>
                <span className="text-green-400 ml-2">Loop regions</span>
              </p>
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
            <a href="https://www.uniprot.org/uniprot/P49768" target="_blank" rel="noopener noreferrer">
              UniProt Entry
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
