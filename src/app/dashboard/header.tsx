import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRecoilValue } from "recoil";
import { salesAtom, selectedOptionAtom, sessionAtom } from "@/store";
import { getUserData } from "@/utils/getUserData";

export function DashboardHeader() {
  const session = useRecoilValue(sessionAtom);
  const sales = useRecoilValue(salesAtom);
  const selectedOption = useRecoilValue(selectedOptionAtom);
  const userInfo = getUserData(session, sales, selectedOption);
  return (
    <div className="mb-8 flex items-center justify-between p-4">
      <div className="flex flex-col">
        <h1 className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
          Dashboard
        </h1>
        <h1>{userInfo.user.name}</h1>
      </div>
      <Avatar className="h-16 w-16 ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900">
        <AvatarImage src={userInfo.user.image} alt={userInfo.user.name} />
        <AvatarFallback>
          {userInfo.user.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
