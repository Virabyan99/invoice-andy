import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/public/logo.png'
import { buttonVariants } from '@/components/ui/button'

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo image" className="size-10" />
        <h3 className="text-3xl font-semibold text-gray-100">
          Invoice<span className="text-blue-500">Andy</span>
        </h3>
      </Link >
      <Link href="/login" className={buttonVariants()}>
        Get Started
      </Link>
    </div>
  )
}

export default Navbar
