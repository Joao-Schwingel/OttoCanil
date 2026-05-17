import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import cloudinary from '@/utils/cloudinary';
import { authOptions } from '@/utils/authoption';

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
    const fresh = request.nextUrl.searchParams.get('fresh') === '1';
    const result = await fetchFromCloudinary(breed);

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': fresh
          ? 'no-store'
          : 'public, s-maxage=120, stale-while-revalidate=600, stale-if-error=86400',
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
