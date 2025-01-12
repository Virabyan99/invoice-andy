import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AlertCircle, ArrowLeft, Mail } from 'lucide-react'
import Link from 'next/link'

export default function Verify() {
  return (
    <div className="flex items-center min-h-screen w-full justify-center">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Card className="w-[380px] px-5 ">
        <CardHeader className="text-center ">
          <div className=" mb-4 mx-auto flex size-20 items-center justify-center rounded-full bg-blue-100">
            <Mail className="size-12 text-blue-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Check your Email</CardTitle>
          <CardDescription>
            We have sent a verification link to your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="my-4 rounded-md bg-yellow-50 border-yellow-300 p-4">
          <div className="flex items-center">
            <AlertCircle className="size-5 text-yellow-500" />
            <p className="text-sm font-medium text-yellow-700 ml-3">
              Kindly make sure to check your spam folder
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href="/"
            className={buttonVariants({
              className: 'w-full',
              variant: 'outline',
            })}>
            <ArrowLeft className="size-4 mr-2" /> Back to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
