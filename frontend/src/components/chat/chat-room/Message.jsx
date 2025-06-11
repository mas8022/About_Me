import { useLongPress } from "@uidotdev/usehooks";
import React, { memo } from "react";

const Message = memo(({ data: { id, content }, setModal }) => {
  const attr = useLongPress(() => setModal(id), { threshold: 500 });

  return (
    <div
      {...attr}
      className="rounded-2xl px-4 py-2 max-w-[80%] text-sm shadow-md ml-auto bg-primary text-white dark:text-black"
    >
      {content}
    </div>
  );
});

export default Message;
