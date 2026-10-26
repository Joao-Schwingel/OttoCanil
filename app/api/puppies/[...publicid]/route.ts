import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import cloudinary from '@/utils/cloudinary';
import { authOptions } from '@/utils/authoption';
import { BREEDS } from '@/lib/breeds';

const SEXO_TAGS = ['M', 'F'];

export async function DELETE(
  _request: Request,
  { params }: { params: { publicid: string[] } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const publicId = params.publicid.map(decodeURIComponent).join('/');

    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true
    });

    if (result.result !== 'ok') {
      return NextResponse.json(
        { error: 'Failed to delete image', detail: result },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Image deleted successfully' },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}

// Define as tags (raça + sexo) de uma foto já enviada. O widget de upload do
// Cloudinary é criado uma única vez, com as opções do primeiro render, então as
// tags escolhidas no formulário não chegam no upload — elas são gravadas aqui.
export async function PATCH(
  request: Request,
  { params }: { params: { publicid: string[] } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const publicId = params.publicid.map(decodeURIComponent).join('/');

  let body: { breed?: string; sexo?: string } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const { breed, sexo } = body;

  if (!breed || !BREEDS.some((b) => b.slug === breed)) {
    return NextResponse.json({ error: 'Raça inválida' }, { status: 400 });
  }
  if (sexo && !SEXO_TAGS.includes(sexo)) {
    return NextResponse.json({ error: 'Sexo inválido' }, { status: 400 });
  }

  try {
    let sexoTag = sexo;

    if (!sexoTag) {
      const resource = await cloudinary.api.resource(publicId);
      sexoTag = (resource.tags as string[] | undefined)?.find((t) =>
        SEXO_TAGS.includes(t)
      );
    }

    const tags = sexoTag ? [breed, sexoTag] : [breed];

    await cloudinary.api.update(publicId, { tags });

    return NextResponse.json(
      { public_id: publicId, tags },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    console.error('Error updating image tags:', error);
    return NextResponse.json(
      { error: 'Failed to update tags' },
      { status: 500 }
    );
  }
}
