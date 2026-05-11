import Image from "next/image";


export default function CarouselCard({ person }) {
  return (
    <div className="flex flex-col items-center gap-2.5 shrink-0 group cursor-pointer">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-all duration-200 group-hover:-translate-y-1">
        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes="80px"
          className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>
      <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap group-hover:text-primary transition-colors duration-200">
        {person.name}
      </span>
    </div>
  );
}