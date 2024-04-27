"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Profile from "@/components/Profile";
import { useUser } from "@/lib/store/user.store";

export default function Auth() {
  const { user } = useUser();

  if (!user) {
    return (
      <Link href="/auth/sign-in">
        <Button type="button" variant="secondary">
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <div>
      <Profile />
    </div>
  );
}
