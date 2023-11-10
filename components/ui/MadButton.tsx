import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import './MadButton.css'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center  font-days text-sm font-medium !leading-tight  text-white ring-offset-background transition-all ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-px active:border-b-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-b-[#CC0909] bg-[#FF0808] text-white shadow-[0px_6px_2.7px_0px_#FF6868_inset] hover:bg-[#FF0808]/70',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'shadow-none hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 shadow-none hover:underline',
        gray: 'border-b-[#939393] bg-[#C2C2C2] text-black shadow-[0px_6px_3px_0px_#979797_inset] hover:bg-[#C2C2C2]/70'
      },
      size: {
        default: 'px-4 py-2',
        sm: 'h-8 px-3',
        md: 'h-[55px] min-w-[160px] rounded-[20px] border-b-[6px] px-8 text-[20px] max-md:h-[28px]  max-md:min-w-[28px] max-md:rounded-[5px] max-md:border-b-2 max-md:px-2',
        lg: 'h-[70px] w-[300px] rounded-[20px] border-b-8 max-md:border-b-2 px-8 text-[28px] max-md:h-[50px] max-md:w-[50px] ',
        icon: 'h-8 w-8 p-0'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
/* <div class="px-6 py-3 bg-gray-200 text-black rounded-lg border-b-4 border-b-gray-400 hover:border-b-0 transition-all ease-in-out duration-100">Hover over me</div> */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const MadButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (

        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
        
   
    )
  }
)
MadButton.displayName = 'MadButton'

export { MadButton, buttonVariants }
