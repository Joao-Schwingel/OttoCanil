import { NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary';

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('resource_type:image') 
      .fields('url')
      .fields('tags')
      .fields('public_id')
      .fields('status')
      .sort_by('created_at', 'desc')
      .execute();

      

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching puppies from Cloudinary:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}



export async function POST(request: Request) {
  try {
    const { breed, imageUrl, publicId, isAvailable } = await request.json();

    // Validate input
    if (!breed || !imageUrl || !publicId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update the image metadata in Cloudinary
    const updateResult = await cloudinary.uploader.explicit(publicId, {
      type: 'upload',
      context: `breed=${breed}&isAvailable=${isAvailable}`
    });

    if (!updateResult || updateResult.error) {
      console.error('Error updating Cloudinary metadata:', updateResult.error);
      return NextResponse.json({ error: 'Failed to update image metadata' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Puppy added successfully',
      puppy: {
        breed,
        imageUrl,
        isAvailable,
        publicId
      }
    });
  } catch (error) {
    console.error('Error adding puppy:', error);
    return NextResponse.json({ error: 'Failed to add puppy' }, { status: 500 });
  }
}

