import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import cloudinary from '@/utils/cloudinary';
import { authOptions } from '@/utils/authoption';

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
