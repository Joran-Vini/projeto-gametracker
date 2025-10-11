'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import CarouselButton from './CarouselButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel({ children }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, containScroll: 'trimSnaps' });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="flex items-center">
      <CarouselButton onClick={scrollPrev} disabled={prevBtnDisabled} className="left-0">
        <ChevronLeft />
      </CarouselButton>

      <div className="overflow-hidden" ref={emblaRef}>
        {/* A "trilha" do carrossel que recebe os filhos */}
        <div className="flex space-x-6 p-4">
          {children}
        </div>
      </div>

      <CarouselButton onClick={scrollNext} disabled={nextBtnDisabled} className="right-0">
        <ChevronRight />
      </CarouselButton>
    </div>
  );
}