"use client";

import React, { useLayoutEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import rehypeSanitize from "rehype-sanitize";

export default function Editor() {
  const [value, setValue] = React.useState<string | undefined>("");

  useLayoutEffect(() => {
    // markdown editor に light mode を矯正
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    // 画像アップロード機能は後回し
    // reader.onload = (event: ProgressEvent<FileReader>) => {
    //   if (event.target?.result) {
    //     const base64String = event.target.result.toString();
    //     // サーバーサイドにアップロードしてURLをマウスカーソルの位置に挿入する
    //     console.log(base64String);
    //   }
    // };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    // サーバーサイドに送信する
    console.log(value);
    const isCheck = confirm("送信して問題ありませんか？");
    if (isCheck) {
      alert("送信しました");
    } else {
      alert("送信をキャンセルしました");
    }
  };

  return (
    <div className="flex flex-col space-y-3 w-screen p-3">
      <div className="w-full">
        <MDEditor
          value={value}
          onChange={setValue}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      </div>
      <div className="flex flex-row justify-end">
        <Button className="min-w-40" onClick={handleSubmit}>
          送信確定
        </Button>
      </div>
    </div>
  );
}
