import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AllTables } from "@/pages/AllTables"
import { TableDetail } from "@/pages/TableDetail"
import { Overview } from "@/pages/Overview"
import { ThemeToggle } from "@/components/theme-toggle"
import { EditModeProvider } from "@/contexts/EditModeProvider"
import { useState, useEffect } from "react"

function AppContent() {
  const [currentView, setCurrentView] = useState<"overview" | "list" | "detail">("overview")
  const [currentRegion, setCurrentRegion] = useState<"selangor" | "kl">("selangor")
  const [selectedTableId, setSelectedTableId] = useState<string | undefined>()
  const [selectedTableName, setSelectedTableName] = useState<string | undefined>()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleNavigate = (view: "overview" | "list" | "detail", region?: "selangor" | "kl", tableId?: string, tableName?: string) => {
    setIsTransitioning(true)
    
    // Short delay for fade out effect
    setTimeout(() => {
      setCurrentView(view)
      if (region) {
        setCurrentRegion(region)
      }
      if (tableId) {
        setSelectedTableId(tableId)
      }
      if (tableName) {
        setSelectedTableName(tableName)
      }
      setIsTransitioning(false)
    }, 150)
  }

  useEffect(() => {
    // Reset transitioning state when component mounts
    setIsTransitioning(false)
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar onNavigate={handleNavigate} />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 bg-background/95 backdrop-blur-sm border-b z-50 transition-all duration-300 ease-in-out group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 flex-1">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#" onClick={() => setCurrentView("overview")}>
                    Route List
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {currentView === "overview" 
                      ? "Overview" 
                      : currentView === "list" 
                      ? (currentRegion === "selangor" ? "Selangor" : "Kuala Lumpur")
                      : "Table Detail"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2 px-4">
            <ThemeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
          <div className={`page-transition ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {currentView === "overview" ? (
              <div key="overview" className="animate-fade-in">
                <Overview onNavigateToTables={(region) => {
                  if (region) {
                    handleNavigate("list", region)
                  } else {
                    handleNavigate("list")
                  }
                }} />
              </div>
            ) : currentView === "list" ? (
              <div key={`list-${currentRegion}`} className="animate-fade-in">
                <AllTables onViewTable={(tableId, tableName) => handleNavigate("detail", currentRegion, tableId, tableName)} region={currentRegion} />
              </div>
            ) : (
              <div key={`detail-${selectedTableId}`} className="animate-fade-in">
                <TableDetail onBack={() => handleNavigate("list", currentRegion)} tableId={selectedTableId} tableName={selectedTableName} />
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export function App() {
  return (
    <EditModeProvider>
      <AppContent />
    </EditModeProvider>
  )
}

export default App
