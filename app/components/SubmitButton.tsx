'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'

interface IAppProps {
  text: string
}

const SubmitButton = ({ text }: IAppProps) => {
  const { pending } = useFormStatus()

  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="animate-spin size-4 mr-2" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          {text}
        </Button>
      )}
    </>
  )
}

export default SubmitButton
