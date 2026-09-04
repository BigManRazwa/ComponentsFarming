import { ComponentPage } from '../../components/layout/ComponentPage'
import { Card } from '../../components/ui/Card'

export function CardExample() {
  return (
    <ComponentPage
      title="Card"
      description="A container component for grouping related content with optional hover effects."
      preview={
        <div className="flex flex-wrap items-start gap-4 w-full max-w-2xl">
          <Card className="flex-1 min-w-[200px]">
            <h3 className="text-white font-medium mb-2 text-sm">Default Card</h3>
            <p className="text-zinc-400 text-xs">This is a basic card with default padding.</p>
          </Card>
          <Card className="flex-1 min-w-[200px]" hoverable>
            <h3 className="text-white font-medium mb-2 text-sm">Hoverable Card</h3>
            <p className="text-zinc-400 text-xs">Hover over me to see the effect.</p>
          </Card>
          <Card className="flex-1 min-w-[200px]" padding="sm">
            <h3 className="text-white font-medium mb-1.5 text-sm">Small Padding</h3>
            <p className="text-zinc-400 text-xs">Compact card with small padding.</p>
          </Card>
        </div>
      }
      code={`import { Card } from '@/components/ui/Card'

<Card padding="md" hoverable>
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</Card>

<Card padding="sm">
  <p>Compact card</p>
</Card>`}
      props={[
        {
          name: 'padding',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'The padding inside the card',
        },
        {
          name: 'hoverable',
          type: 'boolean',
          default: 'false',
          description: 'Whether the card has hover effects',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The content of the card',
        },
      ]}
    />
  )
}
