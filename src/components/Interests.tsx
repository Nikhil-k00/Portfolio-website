import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { interests } from "@/data/interests"
import { Layout, Shield, Cpu } from "lucide-react"

export function Interests() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {interests.map((it) => (
        <Card key={it.id} className="hover:scale-[1.01] transition-transform">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-2">
                {it.id === 'web-designing' ? <Layout className="h-5 w-5 text-primary" /> : it.id === 'cybersecurity' ? <Shield className="h-5 w-5 text-primary" /> : <Cpu className="h-5 w-5 text-primary" />}
              </span>
              <span>{it.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{it.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


