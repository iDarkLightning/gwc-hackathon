import { api, type RouterOutputs } from "@/utils/api";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

type GoalWithMessages = RouterOutputs["goal"]["getMine"] extends (infer T)[]
  ? T
  : never;

const Goal: React.FC<{
  goal: GoalWithMessages;
  changable?: boolean;
}> = ({ goal, changable = true }) => {
  const [checked, setChecked] = useState(goal.completedAt !== null);
  const context = api.useContext();
  const onComplete = api.goal.complete.useMutation({
    onSuccess() {
      context.invalidate().catch((e) => console.error(e));
    },
  });
  const onUnComplete = api.goal.uncomplete.useMutation({
    onSuccess() {
      context.invalidate().catch((e) => console.error(e));
    },
  });

  return (
    <Link href={`/goals/${goal.id}`}>
      <div
        className="rounded-md bg-red-200 p-4"
        // className={`flex w-1/4 items-center justify-evenly rounded border-2 py-2 px-4 ${
        //   checked
        //     ? "border-green-500 bg-emerald-600/30"
        //     : "border-rose-400 bg-rose-600/30"
        // }`}
      >
        <div className="flex flex-1 flex-col items-start">
          <h3 className="text-lg font-bold">{goal.content}</h3>
          <p className="text-black/40">{goal.description ?? <br />}</p>
        </div>
        {/* <label>
        <input
          type="checkbox"
          name={`goalbox-${goal.id}`}
          checked={checked}
          onChange={(e) => {
            console.log("helloe");
            if (!changable) return;
            console.log("world");
            setChecked(e.target.checked);

            if (e.target.checked) {
              void onComplete.mutateAsync({
                id: goal.id,
                userId: goal.authorId,
              });
            } else {
              void onUnComplete.mutateAsync({
                id: goal.id,
                userId: goal.authorId,
              });
            }
          }}
          className="peer absolute opacity-0"
        />
        <div
          className={clsx(
            "h-10 w-10 cursor-pointer rounded border-2",
            checked ? "border-green-500 bg-green-500" : "border-rose-400 "
          )}
        />
      </label> */}
      </div>
    </Link>
  );
};

export default Goal;
