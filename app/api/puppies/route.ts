import { NextResponse, NextRequest } from 'next/server';
import cloudinary from '@/utils/cloudinary';

async function fetchFromCloudinary(breed: string | null) {
  let expression = 'resource_type:image';
  if (breed) {
    expression = `resource_type:image AND tags=${breed}`;
  }

  return cloudinary.search
    .expression(expression)
    .fields('url')
    .fields('tags')
    .fields('public_id')
    .fields('status')
    .sort_by('created_at', 'desc')
    .execute();
}

export async function GET(request: NextRequest) {
  try {
    const breed = request.nextUrl.searchParams.get('breed');
    const result = await fetchFromCloudinary(breed);

    return NextResponse.json(result, {
      headers: {
        'Cache-Control':
          'public, s-maxage=120, stale-while-revalidate=600, stale-if-error=86400',
        Vary: 'Accept-Encoding'
      }
    });
  } catch (error) {
    console.error('Error fetching puppies from Cloudinary:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { breed, imageUrl, publicId, isAvailable } = await request.json();

    if (!breed || !imageUrl || !publicId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updateResult = await cloudinary.uploader.explicit(publicId, {
      type: 'upload',
      context: `breed=${breed}&isAvailable=${isAvailable}`
    });

    if (!updateResult || updateResult.error) {
      console.error('Error updating Cloudinary metadata:', updateResult.error);
      return NextResponse.json(
        { error: 'Failed to update image metadata' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Puppy added successfully',
      puppy: { breed, imageUrl, isAvailable, publicId }
    });
  } catch (error) {
    console.error('Error adding puppy:', error);
    return NextResponse.json({ error: 'Failed to add puppy' }, { status: 500 });
  }
}
