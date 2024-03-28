import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Room } from "@/db/schema";
import { Github } from "lucide-react";
import { getRooms } from "@/services/rooms";
import { splitTags, TagsList } from "@/components/tags-list";

interface RoomCardProps {
  room: Room
}

const RoomCard: React.FC<RoomCardProps> = ({ room }: { room: Room }) => {
  return (<Card>
    <CardHeader>
      <CardTitle>{room.name}</CardTitle>
      <CardDescription>{room.description}</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      <TagsList tags={splitTags(room.tag)} />
      {room.githubRepo &&
        <Link
          className="flex items-center gap-2"
          href={room.githubRepo}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github /> Github Project
        </Link>
      }
    </CardContent>
    <CardFooter>
      <Button asChild>
        <Link href={`/rooms/${room.id}`}>Join Room</Link>
      </Button>
    </CardFooter>
  </Card>)

}

export default async function Home() {
  const rooms = await getRooms();

  return (
    <main className="min-h-screen flex-col p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href={"/create-room"}>
            Create Room
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {
          rooms.map((room) => {
            return <RoomCard key={room.id} room={room} />;
          })
        }
      </div>
    </main>
  );
}
