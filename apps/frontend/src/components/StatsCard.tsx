import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning';
}

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  variant = 'default',
}: StatsCardProps) => {
  const variantStyles = {
    default: 'border-border',
    primary: 'border-primary/30 bg-primary/5',
    success: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
  };

  const iconStyles = {
    default: 'text-muted-foreground bg-secondary',
    primary: 'text-primary bg-primary/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'glass-card p-5 transition-all hover:border-primary/30',
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn('p-2.5 rounded-lg', iconStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && trendValue && (
          <div
            className={cn(
              'text-xs font-medium px-2 py-1 rounded-full',
              trend === 'up' && 'bg-success/10 text-success',
              trend === 'down' && 'bg-destructive/10 text-destructive',
              trend === 'neutral' && 'bg-muted text-muted-foreground'
            )}
            style={{
              color: trend === 'up' ? 'hsl(var(--success))' : trend === 'down' ? 'hsl(var(--destructive))' : undefined,
              backgroundColor: trend === 'up' ? 'hsl(var(--success) / 0.1)' : trend === 'down' ? 'hsl(var(--destructive) / 0.1)' : undefined,
            }}
          >
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : ''} {trendValue}
          </div>
        )}
      </div>
      
      <p className="text-2xl font-bold mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
      {subtitle && (
        <p className="text-xs text-muted-foreground/70 mt-1">{subtitle}</p>
      )}
    </motion.div>
  );
};
