import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"

export default function ReportingPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Treasury Reports</h2>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Treasury Report - October 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Comprehensive overview of treasury activities, performance, and governance decisions.
                </p>
                <p className="text-sm">Generated on Oct 30, 2024</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold mb-2">Under Construction</h3>
          <p className="text-lg">👩‍🚧</p>
        </div>
        {/* Additional report cards... */}
      </div>
    </div>
  )
}