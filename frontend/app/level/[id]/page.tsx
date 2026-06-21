import { notFound } from "next/navigation";

import LevelExperience from "@/components/LevelExperience";
import { getLevel, getWorld } from "@/lib/content";

type LevelPageProps = {
  params: {
    id: string;
  };
};

export default function LevelPage({ params }: LevelPageProps) {
  const level = getLevel(params.id);

  if (!level) {
    notFound();
  }

  const world = getWorld(level.worldId);

  if (!world) {
    notFound();
  }

  return <LevelExperience level={level} world={world} />;
}
