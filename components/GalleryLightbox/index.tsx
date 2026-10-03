import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/captions.css';
import type { GalleryImage } from '../../lib/gallery';

type Props = {
  images: GalleryImage[];
  index: number;
  close: () => void;
};

export default function GalleryLightbox({ images, index, close }: Props) {
  return (
    <Lightbox
      open
      index={index}
      close={close}
      slides={images.map((image) => ({ ...image, alt: image.title }))}
      plugins={[Captions, Zoom]}
      controller={{ closeOnBackdropClick: true }}
      zoom={{ maxZoomPixelRatio: 3 }}
      labels={{
        Close: 'Schließen',
        Next: 'Weiter',
        Previous: 'Zurück',
        'Zoom in': 'Vergrößern',
        'Zoom out': 'Verkleinern',
      }}
    />
  );
}
