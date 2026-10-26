'use client';

import {
  useState,
  useEffect,
  useTransition,
  useCallback,
  useMemo,
  useRef
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
  const { status } = useSession();
  const router = useRouter();
  const [selectedBreed, setSelectedBreed] = useState('');
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sexo, setSexo] = useState<string>('M');
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [, startTransition] = useTransition();
  const [filterBreed, setFilterBreed] = useState<string>('all');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  // O CldUploadWidget cria o widget uma única vez e congela as props daquele
  // render, então o onSuccess nao ve o estado atual: lemos raca e sexo de refs.
  const selectedBreedRef = useRef(selectedBreed);
  const sexoRef = useRef(sexo);
  selectedBreedRef.current = selectedBreed;
  sexoRef.current = sexo;

  // Fotos recem-enviadas: a busca do Cloudinary leva alguns segundos para
  // indexar o upload e as novas tags, entao mantemos a versao local ate la.
  const recentUploads = useRef<Map<string, Puppy>>(new Map());

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
      const resources: Puppy[] = data.resources ?? [];
      const recent = recentUploads.current;

      const merged = resources.map((resource) => {
        const local = recent.get(resource.public_id);
        if (!local) return resource;
        // Indice ainda sem a raca: mostramos as tags que acabamos de gravar.
        if (!getBreed(resource.tags)) {
          return { ...resource, tags: local.tags };
        }
        recent.delete(resource.public_id);
        return resource;
      });

      const indexed = new Set(resources.map((r) => r.public_id));
      const notIndexedYet = Array.from(recent.values()).filter(
        (p) => !indexed.has(p.public_id)
      );

      setPuppies([...notIndexedYet, ...merged]);
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

  const applyTags = useCallback(
    async (publicId: string, breed: string, sexoTag?: string) => {
      const encoded = publicId.split('/').map(encodeURIComponent).join('/');
      const response = await fetch(`/api/puppies/${encoded}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ breed, sexo: sexoTag }),
        cache: 'no-store'
      });
      if (!response.ok) {
        const errorResponse = await response.json().catch(() => ({}));
        throw new Error(errorResponse.error ?? 'Failed to update tags');
      }
      return (await response.json()) as { public_id: string; tags: string[] };
    },
    []
  );

  const handleDelete = (puppy: Puppy) => {
    if (pendingIds.has(puppy.public_id)) return;

    const previous = puppies;
    setPuppies((curr) => curr.filter((p) => p.public_id !== puppy.public_id));
    setPendingIds((s) => new Set(s).add(puppy.public_id));
    setDeletingIds((s) => new Set(s).add(puppy.public_id));
    setConfirmingId(null);
    recentUploads.current.delete(puppy.public_id);

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
        setDeletingIds((s) => {
          const next = new Set(s);
          next.delete(puppy.public_id);
          return next;
        });
      }
    });
  };

  const handleUploadSuccess = (result: any) => {
    const uploaded = result?.info;
    if (!uploaded?.public_id || !uploaded?.secure_url) return;

    const breed = selectedBreedRef.current;
    const sexoTag = sexoRef.current;
    const publicId = uploaded.public_id as string;

    const puppy: Puppy = {
      public_id: publicId,
      url: uploaded.secure_url,
      secure_url: uploaded.secure_url,
      tags: [breed, sexoTag]
    };

    recentUploads.current.set(publicId, puppy);
    setPuppies((curr) => [
      puppy,
      ...curr.filter((p) => p.public_id !== publicId)
    ]);

    startTransition(async () => {
      try {
        const updated = await applyTags(publicId, breed, sexoTag);
        recentUploads.current.set(publicId, { ...puppy, tags: updated.tags });
        setInfo('Foto enviada com sucesso.');
        setTimeout(() => setInfo(null), 3000);
      } catch (err) {
        recentUploads.current.delete(publicId);
        console.error('Error applying tags:', err);
        setError(
          'A foto foi enviada, mas a raça não foi salva. Use "Definir raça" no cartão da foto.'
        );
      }
      fetchPuppies();
    });
  };

  const handleSetBreed = (puppy: Puppy, breedSlug: string) => {
    if (pendingIds.has(puppy.public_id)) return;

    setPendingIds((s) => new Set(s).add(puppy.public_id));

    startTransition(async () => {
      try {
        const updated = await applyTags(
          puppy.public_id,
          breedSlug,
          getSexo(puppy.tags)
        );
        setPuppies((curr) =>
          curr.map((p) =>
            p.public_id === puppy.public_id ? { ...p, tags: updated.tags } : p
          )
        );
        const recent = recentUploads.current.get(puppy.public_id);
        if (recent) {
          recentUploads.current.set(puppy.public_id, {
            ...recent,
            tags: updated.tags
          });
        }
        setInfo('Raça atualizada.');
        setTimeout(() => setInfo(null), 3000);
      } catch (err) {
        console.error('Error setting breed:', err);
        setError('Não foi possível atualizar a raça.');
      } finally {
        setPendingIds((s) => {
          const next = new Set(s);
          next.delete(puppy.public_id);
          return next;
        });
      }
    });
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
          {/* As tags nao vao nas options do widget: ele guarda as options do
              primeiro render. Raca e sexo sao gravados no onSuccess, via PATCH. */}
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
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
            const pending = pendingIds.has(puppy.public_id);
            const deleting = deletingIds.has(puppy.public_id);
            const breed = getBreed(puppy.tags);
            const sexoTag = getSexo(puppy.tags);
            const confirming = confirmingId === puppy.public_id;
            return (
              <div
                key={puppy.public_id}
                className={`border p-4 rounded transition-opacity ${
                  pending ? 'opacity-50' : ''
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
                  <strong>Raça:</strong> {breedLabel(breed) || '—'}
                </p>
                <p>
                  <strong>Sexo:</strong>{' '}
                  {sexoTag === 'F' ? 'Fêmea' : sexoTag === 'M' ? 'Macho' : '—'}
                </p>
                {!breed && (
                  <div className="mt-2">
                    <Select
                      disabled={pending}
                      onValueChange={(value) => handleSetBreed(puppy, value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Definir raça" />
                      </SelectTrigger>
                      <SelectContent>
                        {BREEDS.map((b) => (
                          <SelectItem key={b.slug} value={b.slug}>
                            {b.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
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
                        pending
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-500 hover:bg-red-600'
                      } text-white px-2 py-1 rounded`}
                      disabled={pending}
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
