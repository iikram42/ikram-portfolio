import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = true }: Props) {
  return (
    <div className={cn('glass rounded-xl p-6', hover && 'glass-hover', className)}>
      {children}
    </div>
  )
}
