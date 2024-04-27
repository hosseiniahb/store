import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CardDataDashboardProps {
  name: string;
  stat: string;
  change: string;
  changeType: "negative" | "positive";
  Icon: LucideIcon;
}

export default function CardDataDashboard({
  name,
  stat,
  change,
  changeType,
  Icon,
}: CardDataDashboardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${stat}</div>
        <p className="text-xs text-muted-foreground">
          {change}% from last month
          {changeType}
        </p>
      </CardContent>
    </Card>
  );
}
