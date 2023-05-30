import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayoute from '@/Layouts/AuthenticatedLayout';
import Chirps from '@/Components/Chirps';
import { Head, useForm } from '@inertiajs/react';
import React from 'react'

export default function Index({auth, chirps}) {
  const { data, setData, post, processing, reset, errors } = useForm({message: '',});
  const submit = (e)=> {
    e.preventDefault();
    post(route('chirps.store', { onSuccecc: ()=> reset()}))
  }
  return (
    <AuthenticatedLayoute user={auth.user}>
      <Head title='Chirps'/>
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <form onSubmit={submit}>
          <textarea 
            value={data.message}
            placeholder='А Вы что думаете??'
            className='block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm'
            onChange={e=> setData('message', e.target.value)}
          ></textarea>
          <InputError message={errors.message} className='mt-2'/>
          <PrimaryButton className='mt-4' disabled={processing}>Отправить</PrimaryButton>
        </form>
        <div className='mt-6 bg-white shadow-sm rounded-lg divide-y'>
          {chirps.map(chirp=>
            <Chirps key={chirp.id} chirp={chirp}/>
            )}
        </div>
      </div>
    </AuthenticatedLayoute>
    
  )
}
