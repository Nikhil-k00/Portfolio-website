import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { projects } from "@/data/projects"

export function LatestProjects() {
  return (
    <div className="grid gap-4">
      <Card className="surface">
        <CardHeader>
          <CardTitle>Latest Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {projects.slice(0, 4).map((p) => (
              <div key={p.name} className="rounded-md border p-4">
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{p.summary}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

