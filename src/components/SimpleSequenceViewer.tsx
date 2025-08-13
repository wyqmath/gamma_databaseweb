'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Copy, Download, Search, Settings, EyeOff } from 'lucide-react'

interface SimpleSequenceViewerProps {
  sequence: string
  title?: string
  showLineNumbers?: boolean
  charsPerLine?: number
  highlightRegions?: Array<{
    start: number
    end: number
    color?: string
    bgcolor?: string
    tooltip?: string
  }>
}

export default function SimpleSequenceViewer({
  sequence,
  title = "Protein Sequence",
  showLineNumbers = true,
  charsPerLine = 50,
  highlightRegions = []
}: SimpleSequenceViewerProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [settings, setSettings] = useState({
    showLineNumbers,
    charsPerLine
  })
  const [selectedRegion, setSelectedRegion] = useState<{start: number, end: number} | null>(null)

  // 清理序列
  const cleanSequence = useMemo(() => {
    return sequence.replace(/\s+/g, '').toUpperCase()
  }, [sequence])

  // 分割序列为行
  const sequenceLines = useMemo(() => {
    const lines = []
    for (let i = 0; i < cleanSequence.length; i += settings.charsPerLine) {
      lines.push({
        start: i,
        end: Math.min(i + settings.charsPerLine, cleanSequence.length),
        sequence: cleanSequence.slice(i, i + settings.charsPerLine)
      })
    }
    return lines
  }, [cleanSequence, settings.charsPerLine])

  // 搜索高亮
  const searchMatches = useMemo(() => {
    if (!searchTerm) return []
    const matches = []
    let index = 0
    while (index < cleanSequence.length) {
      const found = cleanSequence.indexOf(searchTerm.toUpperCase(), index)
      if (found === -1) break
      matches.push({ start: found, end: found + searchTerm.length - 1 })
      index = found + 1
    }
    return matches
  }, [cleanSequence, searchTerm])

  // 检查位置是否在高亮区域内
  const getHighlightStyle = (position: number) => {
    // 检查搜索匹配
    for (const match of searchMatches) {
      if (position >= match.start && position <= match.end) {
        return { backgroundColor: '#ffff00', color: '#000000' }
      }
    }

    // 检查自定义高亮区域
    for (const region of highlightRegions) {
      if (position >= region.start && position <= region.end) {
        return {
          backgroundColor: region.bgcolor || '#ff6b6b',
          color: region.color || '#ffffff'
        }
      }
    }

    // 检查选中区域
    if (selectedRegion && position >= selectedRegion.start && position <= selectedRegion.end) {
      return { backgroundColor: '#4a90e2', color: '#ffffff' }
    }

    return {}
  }

  // 处理字符点击
  const handleCharClick = (position: number) => {
    if (selectedRegion) {
      setSelectedRegion(null)
    } else {
      setSelectedRegion({ start: position, end: position })
    }
  }

  // 复制序列到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cleanSequence)
      // 可以添加 toast 通知
    } catch (err) {
      console.error('Failed to copy sequence:', err)
    }
  }

  // 下载序列
  const downloadSequence = () => {
    const content = `>${title}
${cleanSequence}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/\s+/g, '_')}.fasta`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // 搜索功能
  const handleSearch = () => {
    // 搜索结果会自动通过 searchMatches 高亮显示
  }

  // 更新设置
  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search in sequence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-48 bg-slate-700 border-slate-600 text-white"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleSearch}
                className="text-slate-300 border-slate-600 hover:bg-slate-700"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-slate-300 border-slate-600 hover:bg-slate-700"
            >
              {showSettings ? <EyeOff className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="text-slate-300 border-slate-600 hover:bg-slate-700"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={downloadSequence}
              className="text-slate-300 border-slate-600 hover:bg-slate-700"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>

        {/* 序列统计信息 */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-slate-900 p-3 rounded-lg">
            <div className="text-2xl font-bold text-cyan-400">{cleanSequence.length}</div>
            <div className="text-xs text-slate-400">Amino Acids</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {((cleanSequence.length * 110) / 1000).toFixed(1)}
            </div>
            <div className="text-xs text-slate-400">Molecular Weight (kDa)</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400">
              {searchMatches.length}
            </div>
            <div className="text-xs text-slate-400">Search Matches</div>
          </div>
        </div>

        {/* 设置面板 */}
        {showSettings && (
          <div className="mt-4 p-4 bg-slate-900 rounded-lg">
            <h4 className="text-white mb-3">Display Settings</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showLineNumbers"
                  checked={settings.showLineNumbers}
                  onChange={(e) => updateSettings({ showLineNumbers: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="showLineNumbers" className="text-slate-300 text-sm">
                  Show Line Numbers
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <label htmlFor="charsPerLine" className="text-slate-300 text-sm">
                  Chars per Line:
                </label>
                <Input
                  id="charsPerLine"
                  type="number"
                  min="10"
                  max="100"
                  value={settings.charsPerLine}
                  onChange={(e) => updateSettings({ charsPerLine: parseInt(e.target.value) || 50 })}
                  className="w-20 bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        {/* 序列显示区域 */}
        <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm">
          {sequenceLines.map((line, lineIndex) => (
            <div key={lineIndex} className="flex items-center mb-2">
              {settings.showLineNumbers && (
                <div className="w-16 text-slate-400 text-xs mr-4 text-right">
                  {line.start + 1}-{line.end}
                </div>
              )}
              <div className="flex-1">
                {line.sequence.split('').map((char, charIndex) => {
                  const globalPosition = line.start + charIndex
                  const style = getHighlightStyle(globalPosition)
                  return (
                    <span
                      key={charIndex}
                      className="cursor-pointer hover:bg-slate-700 px-0.5 py-0.5 rounded"
                      style={style}
                      onClick={() => handleCharClick(globalPosition)}
                      title={`Position: ${globalPosition + 1}, Amino Acid: ${char}`}
                    >
                      {char}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 选中区域信息 */}
        {selectedRegion && (
          <div className="mt-4 p-3 bg-slate-900 rounded-lg">
            <div className="text-white text-sm">
              <strong>Selected Region:</strong> Position {selectedRegion.start + 1} - {selectedRegion.end + 1}
              <br />
              <strong>Sequence:</strong> {cleanSequence.slice(selectedRegion.start, selectedRegion.end + 1)}
            </div>
          </div>
        )}

        {/* 使用说明 */}
        <div className="mt-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span>• Click on amino acids to select positions</span>
            <span>• Use search to find specific sequences</span>
            <span>• Adjust display settings using the settings button</span>
            {highlightRegions.length > 0 && <span>• Colored regions show functional annotations</span>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
