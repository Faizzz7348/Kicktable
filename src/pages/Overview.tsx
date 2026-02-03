import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  Users,
  Activity,
  FileText,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface RecentActivity {
  id: string
  action: string
  table: string
  user: string
  time: string
  status: "success" | "warning" | "info"
}

interface OverviewProps {
  onNavigateToTables?: (region?: "selangor" | "kl") => void
}

export function Overview({ onNavigateToTables }: OverviewProps) {
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [stats, setStats] = useState({
    totalTables: 0,
    totalRoutes: 0,
    activeUsers: 0,
    totalRecords: 0,
  })

  useEffect(() => {
    fetchOverviewData()
  }, [])

  const fetchOverviewData = async () => {
    try {
      const response = await fetch('/api/overview')
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats || stats)
        setRecentActivities(data.recentActivities || [])
      }
    } catch (error) {
      console.error('Failed to fetch overview data:', error)
    }
  }
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="col-span-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions performed across all tables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between animate-fade-in hover:bg-accent/50 p-2 rounded-lg transition-all"
                  style={{ animationDelay: `${450 + index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : activity.status === "warning"
                          ? "bg-yellow-100 dark:bg-yellow-900/30"
                          : "bg-blue-100 dark:bg-blue-900/30"
                      }`}
                    >
                      {activity.status === "success" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : activity.status === "warning" ? (
                        <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      ) : (
                        <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.table} • {activity.user}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Stats */}
        <Card className="col-span-3 animate-slide-up" style={{ animationDelay: '500ms' }}>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start transition-all hover:scale-105 hover:shadow-md" variant="outline" onClick={() => onNavigateToTables?.()}>
              <Table className="mr-2 h-4 w-4" />
              View All Tables
            </Button>
            <Button className="w-full justify-start transition-all hover:scale-105 hover:shadow-md" variant="outline" onClick={() => onNavigateToTables?.()}>
              <MapPin className="mr-2 h-4 w-4" />
              Manage Routes
            </Button>
            <Button className="w-full justify-start transition-all hover:scale-105 hover:shadow-md" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button className="w-full justify-start transition-all hover:scale-105 hover:shadow-md" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>

            {/* Mini Stats */}
            <div className="pt-4 mt-4 border-t space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Today's Updates
                </span>
                <span className="text-sm font-semibold">127</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Pending Reviews
                </span>
                <span className="text-sm font-semibold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Storage Used
                </span>
                <span className="text-sm font-semibold">45.2 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
