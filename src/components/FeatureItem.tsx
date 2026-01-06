import { Check } from "lucide-react"

export interface FeatureItemProps {
  text: string
}

export function FeatureItem({ text }: FeatureItemProps) {
  return (
    <li className="flex items-start gap-3 text-sm text-gray-800">
      <Check className="h-4 w-4 shrink-0 text-black" />
      <span>{text}</span>
    </li>
  )
}
