import { NextResponse } from 'next/server';
import cloudinary from '@/utils/cloudinary';

export async function DELETE(
  _request: Request,
  { params }: { params: { publicid: string } }
) {
  try {
    console.log('Deletando imagem com ID:', params.publicid);

    const result = await cloudinary.uploader.destroy(params.publicid);

    if (result.result !== 'ok') {
      return NextResponse.json(
        { error: 'Failed to delete image' },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
