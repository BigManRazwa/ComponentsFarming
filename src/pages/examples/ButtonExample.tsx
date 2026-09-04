import { ComponentPage } from '../../components/layout/ComponentPage'
import { Button } from '../../components/ui/Button'

export function ButtonExample() {
  return (
    <ComponentPage
      title="Button"
      description="A versatile button component with multiple variants and sizes."
      preview={
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      }
      code={`import { Button } from '@/components/ui/Button'

<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="outline" size="lg">
  Learn more
</Button>`}
      props={[
        {
          name: 'variant',
          type: '"primary" | "secondary" | "outline" | "ghost"',
          default: '"primary"',
          description: 'The visual style of the button',
        },
        {
          name: 'size',
          type: '"sm" | "md" | "lg"',
          default: '"md"',
          description: 'The size of the button',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'Whether the button is disabled',
        },
        {
          name: 'children',
          type: 'ReactNode',
          description: 'The content of the button',
        },
      ]}
    />
  )
}
