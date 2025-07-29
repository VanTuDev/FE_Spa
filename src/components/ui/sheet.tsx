import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

type SheetContentProps = React.ComponentPropsWithoutRef<typeof Dialog.Content> & {
  className?: string
}

const Sheet = Dialog.Root
const SheetTrigger = Dialog.Trigger
const SheetClose = Dialog.Close

const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  SheetContentProps
>(({ className = '', children, ...props }, ref) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
      <Dialog.Content
        ref={ref}
        className={`fixed top-0 right-0 h-full w-[80%] sm:w-96 z-50 bg-white shadow-lg p-6 transition-transform duration-300 ${className}`}
        {...props}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4">
          <SheetClose asChild>
            <button aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </SheetClose>
        </div>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  )
})

SheetContent.displayName = 'SheetContent'

export { Sheet, SheetTrigger, SheetContent, SheetClose }
