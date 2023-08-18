import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { profileTabs } from "@/constants";
import Image from "next/image";
import MyTweets from "@/components/shared/MyTweets";

const Page = async ({ params }: { params: { id: string } }) => {
    const user = await currentUser();
    if(!user) return null;
    const userInfo = await fetchUser(params.id);

    if(!userInfo?.onboarded) redirect("/onboarding");
    return (
        <section className="">
            <ProfileHeader 
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />
             <MyTweets 
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
            />
        </section>
      )
}

export default Page