"use client";
import { useCompanyAuth } from "@/app/_providers/CompanyAuthProvider";
import { api } from "@/axios";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ImageSVG } from "./assets/ImageSVG";
import { toast } from "sonner";
import { useSettings } from "../_providers/CompanySettingsProvider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
type Props = {
  image: string;
  index: number;
  newImage: File | null;
};
export const CompanyImageCard = ({ image, index, newImage }: Props) => {
  const { companyAddedImage } = useSettings();
  const handleDeleteImage = () => {};
  return (
    <div className="w-full h-full relative">
      {newImage ? (
        <img
          src={URL.createObjectURL(newImage)}
          className="w-full h-full rounded-3xl bg-amber-500"
        />
      ) : (
        <img src={image} className="w-full h-full rounded-3xl" />
      )}
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="rounded-full absolute right-2 top-2 opacity-70">
              x
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="w-full flex justify-center ">
                Устгахдаа итгэлтэй байна уу?
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="w-full h-full">
                <img src={`${image}`} className="w-full h-full rounded-3xl" />
              </div>
              <div className="w-full flex justify-center gap-3">
                <Button>Тийм</Button>
              </div>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};
