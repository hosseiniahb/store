"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/admin/categories.actions";
import { I_Category } from "@/lib/types";
import { useEffect, useState } from "react";

type CategoryDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

export default function CategoryDropdown({
  value,
  onChangeHandler,
}: CategoryDropdownProps) {
  const [categories, setCategories] = useState<Array<I_Category>>([]);

  useEffect(() => {
    const getCategories = async () => {
      const resultCategories = await getAllCategories();
      const { data, error } = JSON.parse(resultCategories!);
      !error && setCategories(data);
    };

    getCategories();
  }, []);

  return (
    <Select value={value} onValueChange={onChangeHandler}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category: I_Category) => (
            <SelectItem key={category?.id} value={category?.id}>
              {category?.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}
