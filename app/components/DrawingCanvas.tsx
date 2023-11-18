'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const DrawingCanvas = () => {
  const [imageURL, setImageURL] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        setCtx(context);
        context.fillStyle = '#fff';
        context.fillRect(0, 0, 1200, 630);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.lineCap = 'round';
      }
    }
  }, []);

  useEffect(() => {
    if (!isDrawing) return;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!ctx) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const x =
        e instanceof MouseEvent
          ? e.offsetX
          : e.touches[0].clientX - canvas.offsetLeft;
      const y =
        e instanceof MouseEvent
          ? e.offsetY
          : e.touches[0].clientY - canvas.offsetTop;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDrawing, ctx]);

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleClearCanvas = () => {
    if (ctx) {
      ctx.clearRect(0, 0, 1200, 630);
    }
  };

  const handleSaveImage = () => {
    if (canvasRef.current) {
      setImageURL(canvasRef.current.toDataURL('image/png'));
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={1200}
        height={630}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        style={{ border: '1px solid black', cursor: 'crosshair' }}
      ></canvas>
      <div>
        <button onClick={handleClearCanvas}>Clear Canvas</button>
        <button onClick={handleSaveImage}>Save Image</button>
      </div>
      {imageURL && (
        <Image src={imageURL} alt="Drawing" width={1200} height={630} />
      )}
    </div>
  );
};
export default DrawingCanvas;
