import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 touch-manipulation items-center justify-center border-2 border-[#111111] bg-clip-padding text-sm font-bold tracking-wide whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-[#0B6E3D] focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-[#0B6E3D] text-[#F7F3E8] shadow-[3px_3px_0px_#111111] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]',
        outline:
          'bg-[#F7F3E8] text-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-[#E8E3D4] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]',
        secondary:
          'bg-[#FFE600] text-[#111111] border-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-[#f0d900] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px]',
        ghost:
          'border-transparent bg-transparent text-[#5A5A4A] shadow-none hover:bg-[#E8E3D4] hover:text-[#111111]',
        destructive:
          'bg-[#D93025] text-white shadow-[3px_3px_0px_#111111] hover:bg-[#b02820] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px]',
        link: 'border-transparent bg-transparent text-[#0B6E3D] underline-offset-4 hover:underline shadow-none',
        pink:
          'bg-[#FF0A7A] text-white border-[#111111] shadow-[3px_3px_0px_#111111] hover:bg-[#e00066] hover:shadow-[1px_1px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]',
      },
      size: {
        default: 'h-9 gap-1.5 px-4 rounded-none',
        xs:      'h-6 gap-1 px-2 text-xs rounded-none',
        sm:      'h-7 gap-1 px-3 text-xs rounded-none',
        lg:      'h-11 gap-2 px-6 text-sm rounded-none',
        icon:    'size-9 rounded-none',
        'icon-xs': 'size-6 rounded-none',
        'icon-sm': 'size-7 rounded-none',
        'icon-lg': 'size-11 rounded-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }