'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  // Removed unused variable
  // const router = useRouter();

  useEffect(() => {
    window.location.href = '/auth';
  }, []);

  return null;
}