"use client";
import { useRouter } from "next/navigation";
import { badgeVariants } from "./ui/badge";
import { cn } from "@/lib/utils";

export function TagsList({ tags }: { tags: string[] }) {
    const router = useRouter()
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <button
                    key={tag}
                    className={cn(badgeVariants())}
                    onClick={() => {
                        router.push(`/?search=${tag}`)
                    }}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}