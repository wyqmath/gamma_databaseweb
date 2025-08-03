import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Users, Target, Lightbulb, ExternalLink, Github } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-slate-400 hover:text-white">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6">
            <span className="text-3xl font-bold text-white">γ</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About the Project
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Learn about the γ-Secretase Comparative Database and our mission to advance 
            understanding of this critical protein complex
          </p>
        </div>

        {/* Project Overview */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Project Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                The γ-Secretase Comparative Database is a comprehensive web platform designed to facilitate 
                research and understanding of the γ-secretase complex across different species. This project 
                aims to provide researchers, students, and healthcare professionals with detailed comparative 
                analysis tools and evolutionary insights.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600/20 rounded-xl mb-4">
                    <Target className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Research Focus</h3>
                  <p className="text-slate-300 text-sm">
                    Advancing understanding of γ-secretase structure, function, and evolution
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-xl mb-4">
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Community</h3>
                  <p className="text-slate-300 text-sm">
                    Supporting researchers, educators, and students in structural biology
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-xl mb-4">
                    <Lightbulb className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Innovation</h3>
                  <p className="text-slate-300 text-sm">
                    Providing cutting-edge tools for comparative protein analysis
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Comparative Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Cross-species protein sequence comparison
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Interactive sequence alignment viewer
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Evolutionary conservation analysis
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Structural Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    3D protein structure visualization
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Complex assembly analysis
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Subunit interaction mapping
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Data Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    UniProt sequence data integration
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    PDB structural data access
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Literature-based annotations
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">User Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Responsive design for all devices
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Intuitive navigation and search
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Professional dark theme interface
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Technology Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Frontend</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Next.js 15 with App Router</li>
                    <li>• TypeScript for type safety</li>
                    <li>• Tailwind CSS + shadcn/ui components</li>
                    <li>• Lucide React icons</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Backend & Data</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Supabase (PostgreSQL) database</li>
                    <li>• Real-time data synchronization</li>
                    <li>• RESTful API endpoints</li>
                    <li>• File storage for documents</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact and Contribution */}
        <section className="mb-16">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Get Involved</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-300 text-lg">
                We welcome contributions from the scientific community. Whether you're a researcher, 
                developer, or student, there are many ways to get involved with this project.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">For Researchers</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Submit new sequence data</li>
                    <li>• Provide functional annotations</li>
                    <li>• Report bugs or suggest features</li>
                    <li>• Collaborate on analysis tools</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">For Developers</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li>• Contribute to the codebase</li>
                    <li>• Improve visualization tools</li>
                    <li>• Enhance user interface</li>
                    <li>• Add new analysis features</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Link href="/species">
              Explore the Database
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <a href="https://github.com/your-repo/gamma-secretase-db" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Link href="/admin">
              Admin Panel
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
