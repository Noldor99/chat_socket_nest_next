import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoomList } from "./_components/RoomList"
import { UserList } from "./_components/UserList"

export const generateMetadata = async () => {
  return {
    title: "Home Page",
    description: "Home Page",
  }
}

const HomePage = async () => {
  return (
    <section className="flex-1">
      <div className="my-2 mb-[40px] mt-[40px] flex items-center justify-center gap-2">
        <Tabs defaultValue="private" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="private">Private massege</TabsTrigger>
            <TabsTrigger value="group">Group chat</TabsTrigger>
          </TabsList>
          <TabsContent value="private">
            <div className="paper-rounded">
              <UserList />
            </div>
          </TabsContent>
          <TabsContent value="group">
            <div className="paper-rounded">
              <RoomList />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default HomePage
