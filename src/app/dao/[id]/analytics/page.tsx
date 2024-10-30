import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Props = {
  params: {
    id: string;
  };
};

export default function AnalyticsPage({ params: { id } }: Props) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Analytics Dashboard</h2>
      <p>ID: {id}</p>
      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
          <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="performance" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-muted rounded-lg">
                  Chart Placeholder
                </div>
              </CardContent>
            </Card>
            {/* Additional performance metrics... */}
          </div>
        </TabsContent>
        {/* Additional tabs content... */}
      </Tabs>
    </div>
  )
}