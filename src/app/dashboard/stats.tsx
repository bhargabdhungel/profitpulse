import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userInfoAtom } from "@/store";
import { TrendingUp, Award, CreditCard } from "lucide-react";
import { useRecoilValue } from "recoil";

function StatCard({
  title,
  value,
  icon,
  subtext,
  gradient,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtext: string;
  gradient: string;
}) {
  return (
    <Card className={`border-none bg-gradient-to-br ${gradient} shadow-xl`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-300">{subtext}</p>
      </CardContent>
    </Card>
  );
}

export function StatCards() {
  const userInfo = useRecoilValue(userInfoAtom);
  return (
    <div className="mb-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Sales"
        value={`$${userInfo.user.totalSales.toLocaleString()}`}
        icon={<TrendingUp className="h-4 w-4 text-green-400" />}
        subtext="Total sales made by you"
        gradient="from-blue-600 to-blue-800"
      />
      <StatCard
        title="Reward Points"
        value={userInfo.user.totalRewards.toString()}
        icon={<Award className="h-4 w-4 text-yellow-400" />}
        subtext="Redeemable for exciting rewards!"
        gradient="from-purple-600 to-purple-800"
      />
      <StatCard
        title="Activity"
        value={userInfo.salesCount.toString()}
        icon={<CreditCard className="h-4 w-4 text-blue-400" />}
        subtext="transactions made"
        gradient="from-pink-600 to-pink-800"
      />
    </div>
  );
}
