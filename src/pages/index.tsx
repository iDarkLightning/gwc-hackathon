import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { status } = useSession();

  if (status !== "authenticated")
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {status === "loading" && <p>Logging you in..</p>}
        {status === "unauthenticated" && (
          <div className="w-96 text-center">
            <h1 className="text-5xl font-bold">SNAG</h1>
            <p>insert mission here</p>
            <Button onClick={() => void signIn("google")} className="mt-4 w-32">
              Sign in
            </Button>
          </div>
        )}
      </div>
    );

  return (
    <DashboardLayout>
      {/* <h1>My Goals</h1>

      <p>
        Points: {session.user.points}, streak: {session.user.streak}
      </p>

      <CreateGoal />

      {goalsQuery.data?.map((goal, i) => (
        <Goal goal={goal} key={i} />
      ))} */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="mt-20 text-2xl font-[700]">Nothing is Selected!!</h1>
        <p>Select a goal to see more.</p>
      </div>
    </DashboardLayout>
  );
};

export default Home;
