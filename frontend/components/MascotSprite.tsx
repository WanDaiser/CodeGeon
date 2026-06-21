import Image from "next/image";

type MascotState = "idle" | "talk" | "celebrate";

type MascotSpriteProps = {
  name: string;
  src: string;
  state?: MascotState;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
};

const sizeClasses = {
  sm: "h-24 w-24",
  md: "h-36 w-36",
  lg: "h-52 w-52",
};

export default function MascotSprite({
  name,
  src,
  state = "idle",
  size = "md",
  priority = false,
}: MascotSpriteProps) {
  return (
    <div className={`mascot-sprite mascot-${state} relative ${sizeClasses[size]}`}>
      <Image
        src={src}
        alt={`${name} mascot`}
        fill
        priority={priority}
        sizes={size === "lg" ? "208px" : size === "md" ? "144px" : "96px"}
        className="object-contain image-pixelated"
      />
    </div>
  );
}
