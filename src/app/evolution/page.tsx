'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Download, Maximize2 } from 'lucide-react'

export default function EvolutionPage() {
  const [selectedSubunit, setSelectedSubunit] = useState('PSEN1')

  const subunits = ['PSEN1', 'NCT', 'APH-1', 'PEN-2']

  // Mock phylogenetic tree data
  const treeData = {
    PSEN1: {
      description: "Phylogenetic analysis of PSEN1 across species shows high conservation, particularly in catalytic domains.",
      conservationScore: 96.7,
      keyFindings: [
        "Catalytic aspartate residues (D257, D385) are 100% conserved",
        "Transmembrane domains show >95% conservation",
        "N-terminal and C-terminal regions show more variation"
      ]
    },
    NCT: {
      description: "Nicastrin evolution reveals conservation of substrate-binding regions with species-specific adaptations.",
      conservationScore: 91.8,
      keyFindings: [
        "DYIGS substrate-binding motif is perfectly conserved",
        "Extracellular domain shows moderate conservation",
        "Signal peptide region varies between species"
      ]
    },
    'APH-1': {
      description: "APH-1 shows remarkable conservation across vertebrates with minimal functional variation.",
      conservationScore: 94.2,
      keyFindings: [
        "Seven transmembrane domains are highly conserved",
        "Critical histidine residues are 100% conserved",
        "Loop regions show minor species-specific differences"
      ]
    },
    'PEN-2': {
      description: "PEN-2 exhibits the highest conservation, reflecting its critical role in complex assembly.",
      conservationScore: 98.0,
      keyFindings: [
        "Nearly identical sequences across mammals",
        "Both transmembrane domains perfectly conserved",
        "Only 2-3 amino acid differences between human and mouse"
      ]
    }
  }

  const downloadTree = () => {
    // In a real implementation, this would download the phylogenetic tree data
    console.log('Downloading phylogenetic tree for', selectedSubunit)
  }

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Evolutionary Analysis</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Explore the evolutionary relationships and conservation patterns of Î³-secretase 
            subunits across different species through phylogenetic analysis.
          </p>
        </div>

        {/* Subunit Selection */}
        <div className="flex justify-center mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Analyze: {selectedSubunit}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800 border-slate-700">
              {subunits.map((subunit) => (
                <DropdownMenuItem
                  key={subunit}
                  onClick={() => setSelectedSubunit(subunit)}
                  className="text-slate-300 hover:bg-slate-700 focus:bg-slate-700"
                >
                  {subunit}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Phylogenetic Tree Visualization */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                Phylogenetic Tree: {selectedSubunit}
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadTree}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Maximize2 className="h-4 w-4 mr-1" />
                  Fullscreen
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Phylogenetic Tree Visualization */}
            <div className="bg-slate-900 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
              {/* Simulated phylogenetic tree */}
              <svg width="600" height="300" className="text-slate-300">
                {/* Tree branches */}
                <g stroke="currentColor" strokeWidth="2" fill="none">
                  {/* Main trunk */}
                  <line x1="50" y1="150" x2="150" y2="150" />
                  
                  {/* Primary branches */}
                  <line x1="150" y1="150" x2="250" y2="100" />
                  <line x1="150" y1="150" x2="250" y2="200" />
                  
                  {/* Secondary branches */}
                  <line x1="250" y1="100" x2="350" y2="50" />
                  <line x1="250" y1="100" x2="350" y2="100" />
                  <line x1="250" y1="100" x2="350" y2="150" />
                  
                  <line x1="250" y1="200" x2="350" y2="200" />
                  <line x1="250" y1="200" x2="350" y2="250" />
                  
                  {/* Terminal branches */}
                  <line x1="350" y1="50" x2="450" y2="50" />
                  <line x1="350" y1="100" x2="450" y2="100" />
                  <line x1="350" y1="150" x2="450" y2="150" />
                  <line x1="350" y1="200" x2="450" y2="200" />
                  <line x1="350" y1="250" x2="450" y2="250" />
                </g>
                
                {/* Species labels */}
                <g className="text-sm fill-current">
                  <text x="460" y="55" className="text-cyan-400 hover:text-cyan-300 cursor-pointer">
                    Human (H. sapiens)
                  </text>
                  <text x="460" y="105" className="text-blue-400 hover:text-blue-300 cursor-pointer">
                    Mouse (M. musculus)
                  </text>
                  <text x="460" y="155" className="text-green-400 hover:text-green-300 cursor-pointer">
                    Zebrafish (D. rerio)
                  </text>
                  <text x="460" y="205" className="text-yellow-400 hover:text-yellow-300 cursor-pointer">
                    Fruit Fly (D. melanogaster)
                  </text>
                  <text x="460" y="255" className="text-purple-400 hover:text-purple-300 cursor-pointer">
                    C. elegans
                  </text>
                </g>
                
                {/* Branch length scale */}
                <g className="text-xs fill-slate-400">
                  <line x1="50" y1="280" x2="150" y2="280" stroke="currentColor" strokeWidth="1" />
                  <text x="100" y="295" textAnchor="middle">0.1 substitutions/site</text>
                </g>
                
                {/* Node confidence values */}
                <g className="text-xs fill-slate-500">
                  <circle cx="150" cy="150" r="3" fill="currentColor" />
                  <text x="155" y="145">100</text>
                  
                  <circle cx="250" cy="100" r="3" fill="currentColor" />
                  <text x="255" y="95">95</text>
                  
                  <circle cx="250" cy="200" r="3" fill="currentColor" />
                  <text x="255" y="195">88</text>
                </g>
              </svg>
            </div>
            
            {/* Tree Legend */}
            <div className="mt-4 p-4 bg-slate-900/50 rounded-lg">
              <h4 className="text-sm font-semibold text-slate-300 mb-2">Legend</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-slate-400">
                <div className="flex items-center">
                  <div className="w-3 h-0.5 bg-slate-300 mr-2"></div>
                  <span>Evolutionary distance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-slate-500 rounded-full mr-2"></div>
                  <span>Bootstrap support</span>
                </div>
                <div className="flex items-center">
                  <span className="text-cyan-400 mr-2">â—?/span>
                  <span>Mammals</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">â—?/span>
                  <span>Fish</span>
                </div>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">â—?/span>
                  <span>Insects</span>
                </div>
                <div className="flex items-center">
                  <span className="text-purple-400 mr-2">â—?/span>
                  <span>Nematodes</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Summary */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Conservation Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">Overall Conservation</span>
                    <span className="text-cyan-400 font-bold">
                      {treeData[selectedSubunit as keyof typeof treeData].conservationScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                      style={{ 
                        width: `${treeData[selectedSubunit as keyof typeof treeData].conservationScore}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Description</h4>
                  <p className="text-slate-400 text-sm">
                    {treeData[selectedSubunit as keyof typeof treeData].description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Key Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {treeData[selectedSubunit as keyof typeof treeData].keyFindings.map((finding, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">â€?/span>
                    <span className="text-slate-300 text-sm">{finding}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Methodology */}
        <Card className="bg-slate-800/50 border-slate-700 mt-8">
          <CardHeader>
            <CardTitle className="text-white">Methodology</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300">
              <div>
                <h4 className="font-semibold mb-2">Sequence Alignment</h4>
                <p className="text-slate-400">
                  Multiple sequence alignments were performed using MUSCLE algorithm with default parameters. 
                  Poorly aligned regions were removed using trimAl.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Phylogenetic Reconstruction</h4>
                <p className="text-slate-400">
                  Maximum likelihood trees were constructed using RAxML with 1000 bootstrap replicates. 
                  The best-fit substitution model was selected using ModelTest.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Conservation Analysis</h4>
                <p className="text-slate-400">
                  Conservation scores were calculated using ConSurf server. Functional domains were 
                  identified using InterPro and Pfam databases.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Statistical Support</h4>
                <p className="text-slate-400">
                  Bootstrap support values &gt;70% are considered statistically significant.
                  Branch lengths represent evolutionary distance in substitutions per site.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
