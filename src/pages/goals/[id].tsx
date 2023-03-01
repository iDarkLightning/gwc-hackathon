/* eslint-disable @next/next/no-img-element */
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { QueryCell } from "@/components/shared/base-query-cell";
import Layout from "@/components/shared/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import useWindowSize from "@/utils/use-window-size";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Content: React.FC = () => {
  const router = useRouter();
  const goalQuery = api.goal.get.useQuery(
    {
      id: router.query.id as string,
    },
    {
      enabled: !!router.query.id,
    }
  );

  // if(sessionData?.user.id !== goalQuery)

  return (
    <QueryCell
      query={goalQuery}
      success={({ data }) => (
        <div>
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-medium">{data.content}</h1>
              <p className="text-slate-600">{data.description}</p>
            </div>
            <Button
              onClick={(e) => {
                // setChecked(e.target.checked);
                // if (e.target.checked) {
                //   void onComplete.mutateAsync({
                //     id: goal.id,
                //     userId: goal.authorId,
                //   });
                // } else {
                //   void onUnComplete.mutateAsync({
                //     id: goal.id,
                //     userId: goal.authorId,
                //   });
                // }
              }}
            >
              {!!data.completedAt ? "Uncomplete" : "Complete"}
            </Button>
          </div>

          {data.messages.map((message) => (
            <div key={message.id} className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={message.sender.image || ""}
                  alt={message.sender.name || ""}
                />
                <AvatarFallback>
                  {message.sender.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <p>{message.message}</p>
              <div className="flex gap-2">
                <p className="text-neutral-600">+{message.points}</p>
                <Image
                  src="/Snag coin.svg"
                  width={20}
                  height={10}
                  alt="coins"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    />
  );
};

const GoalDetails: NextPage = () => {
  const { isMobile, loading } = useWindowSize();
  const { data: sessionData } = useSession();

  if (loading) return null;

  if (isMobile) {
    return (
      <Layout>
        <Content />
      </Layout>
    );
  }

  return (
    <DashboardLayout>
      <Content />
    </DashboardLayout>
  );
};

export default GoalDetails;
