"use client"
import React from 'react';
import { useSearchParams } from 'next/navigation';
import LoadingPage from '@/common/LoadingPage';
import useVerifyToken from '@/hooks/sign/useVerifyToken';
import useFormStore from '@/store/useFormStore';

export default function profiletest() {
  const { name, email, phone, birthdate } = useFormStore();
  console.log(name)
  console.log(email)
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { isTokenValid } = useVerifyToken(token); 

  if (!isTokenValid) {
    return <LoadingPage />;
  }

  return (
    <>
      <h1>profiletest Component</h1>
      
    </>
  );
}
