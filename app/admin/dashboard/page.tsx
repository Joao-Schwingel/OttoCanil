'use client';

import {
  useState,
  useEffect,
  useTransition,
  useCallback,
  useMemo
} from 'react';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getBreed, getSexo } from '@/utils/puppy-tags';
import { BREEDS, breedLabel } from '@/lib/breeds';

interface Puppy {
  tags: string[];
  url: string;
  secure_url?: string;
  public_id: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedBreed, setSelectedBreed] = useState('');
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sexo, setSexo] = useState<string>('M');
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const [, startTransition] = useTransition();
  const [filterBreed, setFilterBreed] = useState<string>('all');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const fetchPuppies = useCallback(async () => {
    try {
      const response = await fetch('/api/puppies?fresh=1', {
        cache: 'no-store'
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(`Failed to fetch puppies: ${errorData.error}`);
        return;
      }
      const data = await response.json();
      setPuppies(data.resources ?? []);
      setError(null);
    } catch (err) {
      setError(`Error fetching puppies: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      fetchPuppies();
    }
  }, [status, router, fetchPuppies]);

  const handleDelete = (puppy: Puppy) => {
    if (pendingIds.has(puppy.public_id)) return;

    const previous = puppies;
    setPuppies((curr) => curr.filter((p) => p.public_id !== puppy.public_id));
    setPendingIds((s) => new Set(s).add(puppy.public_id));
    setConfirmingId(null);

    startTransition(async () => {
      try {
        const encoded = puppy.public_id
          .split('/')
          .map(encodeURIComponent)
          .join('/');
        const response = await fetch(`/api/puppies/${encoded}`, {
          method: 'DELETE',
          cache: 'no-store'
        });

        if (!response.ok) {
          setPuppies(previous);
          const errorResponse = await response.json().catch(() => ({}));
          console.error('Failed to delete puppy:', errorResponse);
          setError('Não foi possível deletar a foto.');
        }
      } catch (err) {
        setPuppies(previous);
        console.error('Error deleting puppy:', err);
        setError('Erro ao deletar foto.');
      } finally {
        setPendingIds((s) => {
          const next = new Set(s);
          next.delete(puppy.public_id);
          return next;
        });
      }
    });
  };

  const handleUploadSuccess = (result: any) => {
    const info = result?.info;
    if (info?.public_id && info?.secure_url) {
      setPuppies((curr) => [
        {
          public_id: info.public_id,
          url: info.secure_url,
          secure_url: info.secure_url,
          tags: info.tags ?? [selectedBreed, sexo]
        },
        ...curr
      ]);
      setInfo('Foto enviada com sucesso.');
      setTimeout(() => setInfo(null), 3000);
    }
    fetchPuppies();
  };

  const filteredPuppies = useMemo(() => {
    if (filterBreed === 'all') return puppies;
    return puppies.filter((p) => getBreed(p.tags) === filterBreed);
  }, [puppies, filterBreed]);

  if (status === 'loading' || (loading && status === 'authenticated')) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="text-sm bg-gray-700 hover:bg-gray-800 text-white px-3 py-1.5 rounded"
        >
          Sair
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-700 flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => setError(null)} aria-label="Fechar">
            ×
          </button>
        </div>
      )}
      {info && (
        <div className="mb-4 rounded bg-green-100 px-4 py-2 text-green-700">
          {info}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Adicionar Filhote</h2>
        <div className="flex gap-4 items-start flex-wrap">
          <Select value={selectedBreed} onValueChange={setSelectedBreed}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Selecione a raça" />
            </SelectTrigger>
            <SelectContent>
              {BREEDS.map((b) => (
                <SelectItem key={b.slug} value={b.slug}>
                  {b.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <RadioGroup value={sexo} onValueChange={setSexo}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="F" id="r1" aria-label="Fêmea" />
              <Label htmlFor="r1">Fêmea</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="M" id="r2" aria-label="Macho" />
              <Label htmlFor="r2">Macho</Label>
            </div>
          </RadioGroup>
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            options={{ tags: [selectedBreed, sexo] }}
            onSuccess={handleUploadSuccess}
          >
            {({ open }) => (
              <button
                onClick={() => selectedBreed && open()}
                disabled={!selectedBreed}
                className={`px-4 py-2 rounded text-white ${
                  selectedBreed
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
                title={
                  selectedBreed
                    ? 'Enviar imagem'
                    : 'Selecione uma raça primeiro'
                }
              >
                Enviar Imagem
              </button>
            )}
          </CldUploadWidget>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 flex-wrap">
        <span className="text-sm font-medium">Filtrar por raça:</span>
        <Select value={filterBreed} onValueChange={setFilterBreed}>
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas ({puppies.length})</SelectItem>
            {BREEDS.map((b) => {
              const count = puppies.filter(
                (p) => getBreed(p.tags) === b.slug
              ).length;
              return (
                <SelectItem key={b.slug} value={b.slug}>
                  {b.label} ({count})
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {filteredPuppies.length === 0 ? (
        <p className="text-gray-500 italic">Nenhum filhote para exibir.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPuppies.map((puppy) => {
            const deleting = pendingIds.has(puppy.public_id);
            const breed = getBreed(puppy.tags);
            const sexoTag = getSexo(puppy.tags);
            const confirming = confirmingId === puppy.public_id;
            return (
              <div
                key={puppy.public_id}
                className={`border p-4 rounded transition-opacity ${
                  deleting ? 'opacity-50' : ''
                }`}
              >
                <div className="relative w-full h-48 mb-2">
                  <Image
                    src={puppy.secure_url ?? puppy.url}
                    alt={`${breedLabel(breed) || 'filhote'}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover rounded"
                  />
                </div>
                <p>
                  <strong>Raça:</strong> {breedLabel(breed)}
                </p>
                <p>
                  <strong>Sexo:</strong>{' '}
                  {sexoTag === 'F' ? 'Fêmea' : sexoTag === 'M' ? 'Macho' : '—'}
                </p>
                <div className="mt-2 flex gap-2">
                  {confirming ? (
                    <>
                      <button
                        onClick={() => handleDelete(puppy)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                      >
                        Confirmar exclusão
                      </button>
                      <button
                        onClick={() => setConfirmingId(null)}
                        className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded text-sm"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setConfirmingId(puppy.public_id)}
                      className={`${
                        deleting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-600'
                      } text-white px-2 py-1 rounded`}
                      disabled={deleting}
                    >
                      {deleting ? 'Deletando...' : 'Deletar'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
