"use client";

import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function TooltipButton({
 children,
 content,
 variant = 'default',
 onClick
}: {
 children: React.ReactNode,
 content: string,
 variant?: "link" | "default" | "destructive" | "outline" | "secondary",
 onClick: () => void
}) {
 return (
  <Tooltip>
   <TooltipTrigger asChild>
    <Button
     variant={variant} size={'icon'}
     onClick={onClick}
    >
     {children}
    </Button>
   </TooltipTrigger>
   <TooltipContent>
    <p>{content}</p>
   </TooltipContent>
  </Tooltip>
 )
}
