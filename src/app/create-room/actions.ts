'use server';

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { createRoom } from "@/services/rooms";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
    const session = await getSession();

    if (!session) {
        throw new Error("You need to login first.");
    }

    await createRoom(roomData, session.user.id);

    revalidatePath("/");
}