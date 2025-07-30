import Link from 'next/link'
import { Github, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">γ</span>
              </div>
              <h3 className="text-lg font-semibold text-white">γ-Secretase Database</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              A comprehensive comparative analysis platform for γ-secretase complex subunits across species. 
              This database provides researchers with detailed sequence alignments, structural comparisons, 
              and evolutionary insights into this critical enzyme complex.
            </p>
            <div className="text-xs text-slate-500">
              <p className="mb-1">
                <strong>How to cite:</strong> γ-Secretase Comparative Database (2024). 
                Comparative Analysis Platform for γ-Secretase Complex Subunits. 
                Available at: [URL]
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/species" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Species Index
                </Link>
              </li>
              <li>
                <Link href="/evolution" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Evolution Analysis
                </Link>
              </li>
              <li>
                <Link href="/interactions" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Protein Interactions
                </Link>
              </li>
              <li>
                <Link href="/complex" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Complex Assembly
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  About Project
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/your-repo/gamma-secretase-db" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  GitHub Repository
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Admin Panel
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.uniprot.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  UniProt Database
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-xs text-slate-500 mb-4 sm:mb-0">
            © 2024 γ-Secretase Comparative Database. All rights reserved.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> | </span>
            Built for scientific research and education.
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/your-repo/gamma-secretase-db" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="h-5 w-5" />
            </a>
            <div className="text-xs text-slate-500">
              v1.0.0
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-600 text-center">
            This database is provided for research purposes only. While we strive for accuracy, 
            users should verify critical information with primary sources. 
            The data is based on publicly available protein sequences and structures.
          </p>
        </div>
      </div>
    </footer>
  )
}
