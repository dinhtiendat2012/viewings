"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FriendCard from "@/components/ui/Profile/FriendCard";
import { Profile } from "@/app/types/Object";
import { useEffect, useState } from "react";

export default function FriendCarousel() {
  const [friendArray, setFriendArray] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchFriends = async () => {
    try {
      const data: Profile[] = [
        {
          userId: 1,
          profileId: 1,
          address: "",
          dob: new Date(),
          linkAvt: "",
          name: "Dinh Tien Dat",
          phone: "",
        },
      ];

      setFriendArray(data);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Failed to fetch friends.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }
  if (loading) {
    return <p>Loading ...</p>;
  } else {
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-xl"
      >
        <CarouselContent>
          {friendArray.map((friend) => (
            <CarouselItem key={friend.userId} className="basis-44">
              <div className="p-1">
                <FriendCard friend={friend}></FriendCard>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }
}
