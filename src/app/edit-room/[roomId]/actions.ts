'use server';

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { editRoom, getRoom } from "@/services/rooms";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
    const session = await getSession();

    if (!session) {
        throw new Error("You need to login first.");
    }

    const room = await getRoom(roomData.id);
    if (room?.userId !== session.user.id) throw new Error("User not authorized");

    await editRoom({...roomData, userId: room.userId});

    revalidatePath("/your-rooms");
    revalidatePath(`/edit-room/${roomData.id}`);
    redirect("/your-rooms");
}