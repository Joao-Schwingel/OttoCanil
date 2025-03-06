'use client';

import React, { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Puppy {
  tags: string[]
  url: string
  public_id: string
}

const breedOptions = [
  'shih-tzu',
  'Golden Retriver',
  'bulldog-frances',
  'samoieda',
  'Chihuahua',
  'husky-siberiano',
  'spitz-alemao'
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [selectedBreed, setSelectedBreed] = React.useState('');
  const [breedForUpload, setBreedForUpload] = useState<string | null>(null);
  const router = useRouter();
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sexo, setSexo] = useState<string>('M');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchPuppies();
    }
  }, [status]);
  // , router, puppies]

  const fetchPuppies = async () => {
    try {
      const response = await fetch('/api/puppies');
      if (response.ok) {
        const data = await response.json();
        setPuppies(data.resources);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch puppies:', errorData);
        setError(`Failed to fetch puppies: ${errorData.error}`);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching puppies:', error);
      setError(`Error fetching puppies: ${(error as Error).message}`);
    }
  };

  

  const handleDelete = async (puppy: Puppy) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/puppies/${puppy.public_id}`, {
        method: 'DELETE'
      });
  
      if (response.ok) {
        await fetchPuppies(); // Atualiza a lista após deletar
        console.log('Puppy deleted successfully');
      } else {
        const errorResponse = await response.json();
        console.error('Failed to delete puppy:', errorResponse);
      }
    } catch (error) {
      console.error('Error deleting puppy:', error);
    }
  };

  const handleUpdateBreed = (breed: string) => {
    setSelectedBreed('');
    setTimeout(() => {
      setSelectedBreed(breed);
    }, 1);
  };
  
  useEffect(() => {
    setBreedForUpload(selectedBreed);
  }
  , [selectedBreed]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add New Puppy</h2>
        <div className="flex gap-4">
          <Select value={selectedBreed} onValueChange={handleUpdateBreed}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select breed" />
            </SelectTrigger>
            <SelectContent>
              {breedOptions.map((breed) => (
                <SelectItem key={breed} value={breed}>
                  {breed}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <RadioGroup defaultValue="M">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="F" id="r1" aria-label="Fêmea" onClick={() => setSexo('F')}/>
              <Label htmlFor="r1">FEMEA</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="M" id="r2" aria-label="Macho" onClick={() => setSexo('M')}/>
              <Label htmlFor="r2">MACHO</Label>
            </div>
          </RadioGroup>
          {selectedBreed && (<CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} options={{ tags: [selectedBreed, sexo]}} onUpload={fetchPuppies}>
            {({ open }) => (
              <button onClick={() => {open();}} className="bg-green-500 text-white px-4 py-2 rounded">
                Upload Image
              </button>
            )}
          </CldUploadWidget>)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {puppies.map((puppy, index) => (
          <div key={index} className="border p-4 rounded">
            <img
              src={puppy.url}
              alt={`${puppy.tags[0]} puppy`}
              className="w-full h-48 object-cover mb-2"
            />
            <p>
              <strong>Breed:</strong> {puppy.tags[0]}
            </p>
            <p>
              <strong>Sexo:</strong> {puppy.tags[1]}
            </p>
            {/* <p>
              <strong>Status:</strong> {puppy.tags[1] == 'active' ? 'Available' : 'Unavailable'}
            </p> */}
            <div className="mt-2 flex gap-2">
              {/* <button
                onClick={() => handleAvailabilityToggle(puppy)}
                className={`px-2 py-1 rounded ${puppy.tags[1] == 'active' ? 'bg-red-500' : 'bg-green-500'} text-white`}
              >
                {puppy.tags[1] == 'active' ? 'Mark Unavailable' : 'Mark Available'}
              </button> */}
              <button onClick={() => handleDelete(puppy)} className={`${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white px-2 py-1 rounded `} disabled={loading}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

