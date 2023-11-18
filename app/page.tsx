import Image from 'next/image';
import DrawingCanvas from './components/DrawingCanvas';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DrawingCanvas />
    </main>
  );
}
