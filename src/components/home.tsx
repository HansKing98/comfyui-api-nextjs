/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/nUi2bZRQdp6
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-start space-y-8 p-8 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold">COMFYUI-API-NEXTJS</h1>
      <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-3 w-96 lg:w-8/12">
        <Card className="bg-white shadow-md dark:bg-gray-700">
          <CardHeader>
            <CardTitle>Generate</CardTitle>
            <CardDescription>AI写真工作流</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={"/admin/history"}>
              <Button className="w-full">Generate →</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md dark:bg-gray-700">
          <CardHeader>
            <CardTitle>Output</CardTitle>
            <CardDescription>查看历史图片</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={"/output"}>
              <Button className="w-full">Output →</Button>
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-md dark:bg-gray-700">
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>查看队列</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={"/history"}>
              <Button className="w-full">History →</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      <p className="text-center text-sm">
        集成 ComfyUI API 的 Next.js 前端案例，适配 ComfyUI localhost 和 AutoDL
        版本
        <br />
        github link:
        <Link
          className="text-blue-500 dark:text-blue-300"
          target="_blank"
          href="https://github.com/HansKing98/comfyui-api-nextjs"
        >
          comfyui-api-nextjs
        </Link>
      </p>
    </div>
  );
}
