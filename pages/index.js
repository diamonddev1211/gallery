import Link from 'next/link';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Link href="/products">
        <Button>Enter Website</Button>
      </Link>
    </div>
  )
}
