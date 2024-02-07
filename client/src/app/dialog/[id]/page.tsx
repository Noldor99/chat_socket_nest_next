import RoomChat from "./_components/RoomChat"

export const generateMetadata = async ({
  params,
}: {
  params: {
    id: string
  }
}) => {
  return {
    title: `Portfolio Page by id ${params.id}`,
    description: `Portfolio Page by id ${params.id}`,
  }
}

interface NewsByIdPagePropsType {
  params: {
    id: string
  }
}

const RoomsByIdPage = ({ params }: NewsByIdPagePropsType) => {
  return (
    <main className="flex-1">
      <RoomChat id={params.id} />
    </main>
  )
}

export default RoomsByIdPage
