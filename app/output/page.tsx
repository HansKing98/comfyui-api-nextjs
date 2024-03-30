"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
async function getData() {
  const res = await fetch(
    "/api/history?prompt_id=188ed092-32f5-4005-ac7f-590b2f131395"
  );

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Page() {
  const [imageList, seImageList] = useState<any>([]);

  useEffect(() => {
    getData().then((res) => {
      seImageList(res.imageList);
    });
  }, []);

  return (
    <main className="flex flex-wrap">
      {imageList.map((image: string, index: number) => (
        <div className="" style={{ height: "200px" }} key={index}>
          <Image
            width={0}
            height={0}
            sizes="25vw"
            style={{ width: "100%", height: "auto" }}
            // width={200}
            // height={300}
            src={`/unsafe-url/view?filename=${image}`}
            key="index"
            alt=""
          />
        </div>
      ))}
    </main>
  );
}
