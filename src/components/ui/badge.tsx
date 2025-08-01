// ./components/ui/badge.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils/cn"

const badgeVariants = cva(
   "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
   {
      variants: {
         variant: {
            default: "border-transparent bg-primary text-primary-foreground",
            secondary: "border-transparent bg-secondary text-secondary-foreground",
            destructive: "border-transparent bg-destructive text-destructive-foreground",
            outline: "text-foreground",
         },
      },
      defaultVariants: {
         variant: "default",
      },
   }
)

export interface BadgeProps
   extends React.HTMLAttributes<HTMLDivElement>,
   VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
   return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
