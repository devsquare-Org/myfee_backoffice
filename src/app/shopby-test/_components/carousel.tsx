"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface ImageCarouselProps {
  imageUrls: string[];
  className?: string;
}

export function ImageCarousel({ imageUrls, className }: ImageCarouselProps) {
  return (
    <div className={cn("w-full", className)}>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {imageUrls.map((url, index) => (
            <CarouselItem key={index} className="px-1">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                <Image
                  height={400}
                  width={400}
                  src={url.startsWith("//") ? `https:${url}` : url}
                  alt={`상품 이미지 ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
