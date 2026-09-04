import type { ReactNode } from 'react'

type PropDefinition = {
  name: string
  type: string
  default?: string
  description: string
}

type ComponentPageProps = {
  title: string
  description: string
  preview: ReactNode
  code: string
  props?: PropDefinition[]
}

export function ComponentPage({ title, description, preview, code, props }: ComponentPageProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
        <p className="text-zinc-400 mt-2 text-[15px]">{description}</p>
      </div>

      {/* Preview */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/30 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800/60 flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
          <span className="text-[11px] text-zinc-600 ml-2 uppercase tracking-wider">Preview</span>
        </div>
        <div className="p-10 flex items-center justify-center min-h-[220px]">
          {preview}
        </div>
      </div>

      {/* Code */}
      <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800/60 flex items-center justify-between">
          <span className="text-[11px] text-zinc-600 uppercase tracking-wider">Usage</span>
          <button
            className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1 rounded hover:bg-zinc-800"
            onClick={() => navigator.clipboard.writeText(code)}
          >
            Copy
          </button>
        </div>
        <pre className="p-5 overflow-x-auto text-[13px] leading-relaxed">
          <code className="text-zinc-300">{code}</code>
        </pre>
      </div>

      {/* Props Table */}
      {props && props.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Props</h2>
          <div className="rounded-xl border border-zinc-800/60 overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-zinc-800/60 bg-zinc-900/30">
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Prop</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Default</th>
                  <th className="text-left px-4 py-3 text-zinc-500 font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {props.map((prop) => (
                  <tr key={prop.name} className="border-b border-zinc-800/40 last:border-0">
                    <td className="px-4 py-3">
                      <code className="text-purple-400 text-xs bg-purple-400/10 px-1.5 py-0.5 rounded">
                        {prop.name}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-zinc-400 text-xs">{prop.type}</code>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 text-xs">
                      {prop.default ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-zinc-400">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
