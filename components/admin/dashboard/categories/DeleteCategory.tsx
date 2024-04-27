"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { deleteCategoryById } from "@/lib/actions/admin/categories.actions";

import { Loader, Trash } from "lucide-react";
import { FormEvent, useTransition } from "react";

export default function DeleteCategory({ categoryId }: { categoryId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDeleteCategory = (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const result = await deleteCategoryById(categoryId);
        const { error } = JSON.parse(result!);

        if (error) {
          toast({
            title: "Fail to delete product.",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(error.message)}
                </code>
              </pre>
            ),
          });
        } else {
          toast({
            title: `Successfully to delete category`,
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 text-red-600"
        >
          <Trash size={17} />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be reversed. This will permanently delete this
            category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* Continue Button */}
          <form onSubmit={handleDeleteCategory}>
            <Button
              disabled={isPending}
              type="submit"
              className="transition-all"
            >
              {isPending && <Loader size={18} className="animate-spin mr-2" />}
              Continue
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
