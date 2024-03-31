"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
async function getData({ prompt_id }: { prompt_id: string }) {
  let url = `/api/history`;
  if (prompt_id) {
    url = `/api/history?prompt_id=${prompt_id}`;
  }
  const res = await fetch(url);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Page() {
  const query = useSearchParams();

  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<any>([]);
  const prompt_id = query.get("prompt_id");

  useEffect(() => {
    if (prompt_id) {
      getData({ prompt_id }).then((res) => {
        // debugger
        console.log("res", res);
        setData(res);
      });
    } else {
      getData({ prompt_id: "" }).then((res) => {
        // debugger
        setData(res);
      });
    }
  }, [prompt_id]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <main className="">
      <Link href={`/output`}>全部</Link>

      {data.map((item: any, index: number) => (
        <div className="m-4" key={item.prompt_id}>
          <span className="mx-6">
            【prompt_id】：{item.prompt_id} 【queue_code】：{item.queue_code}{" "} <Link href={`/admin/output?prompt_id=${item.prompt_id}`}>打开</Link>
          </span>
          {/* {JSON.stringify(item.output_images)} */}
          <div className="mx-6 flex " style={{ height: "auto" }} key="el">
            {item.input_images.map((el: any) => (
              <div className="flex flex-col mx-6 mb-6 max-w-xs" key={el}>
                <div className="flex">
                  <a
                    className="text-blue-300 text-wrap"
                    target="_blank"
                    href={el}
                  >
                    {el
                      .replace(
                        `${process.env.NEXT_PUBLIC_COMFYUI_IMAGE_HOST}/view?filename=`,
                        ""
                      )
                      .replaceAll(`&type=input`, "")}
                  </a>
                  <a
                    className=" text-nowrap"
                    href={el}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    下载
                  </a>
                </div>

                <Image
                  width={0}
                  height={0}
                  sizes="25vw"
                  style={{ width: "100%", height: "auto" }}
                  src={el}
                  key="index"
                  alt=""
                />
              </div>
            ))}
            {item.output_images.map((el: any) => (
              <div className="flex flex-col mx-6 mb-6 max-x-xs" key={el}>
                <div className="flex">
                  <a className="text-blue-300 text-wrap" target="_blank" href={el}>
                    {el.replace(
                      `${process.env.NEXT_PUBLIC_COMFYUI_IMAGE_HOST}/view?filename=`,
                      ""
                    )}
                  </a>
                  <a href={el} target="_blank" rel="noopener noreferrer">
                    下载
                  </a>
                </div>

                <Image
                  width={0}
                  height={0}
                  sizes="25vw"
                  style={{ width: "100%", height: "auto" }}
                  src={el}
                  key="index"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
