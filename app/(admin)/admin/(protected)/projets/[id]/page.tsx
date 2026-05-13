import { getProjectById, getProjectUnits, updateUnitStatus } from "@/app/(admin)/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import UnitClient from "./unit-client";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectId = parseInt(id);
  const project = await getProjectById(projectId);
  const unitList = await getProjectUnits(projectId);

  if (!project) {
    return <div>Projet non trouvé</div>;
  }

  const unitsByFloor = unitList.reduce((acc, unit) => {
    if (!acc[unit.floor]) acc[unit.floor] = [];
    acc[unit.floor].push(unit);
    return acc;
  }, {} as Record<number, typeof unitList>);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/projets">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground mt-1">
            {project.location} • {project.totalUnits} unités
          </p>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Liste</TabsTrigger>
          <TabsTrigger value="floors">Par étage</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N°</TableHead>
                  <TableHead>Étage</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Surface</TableHead>
                  <TableHead>Orientation</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unitList.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">{unit.number}</TableCell>
                    <TableCell>{unit.floor}</TableCell>
                    <TableCell>{unit.type}</TableCell>
                    <TableCell>{unit.area} m²</TableCell>
                    <TableCell>{unit.orientation}</TableCell>
                    <TableCell>
                      <Badge
                        variant={unit.status === "sold" ? "destructive" : "default"}
                      >
                        {unit.status === "sold" ? "Vendu" : "Disponible"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <UnitClient unitId={unit.id} currentStatus={unit.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="floors">
          <div className="space-y-6">
            {Object.entries(unitsByFloor)
              .sort(([a], [b]) => parseInt(b) - parseInt(a))
              .map(([floor, floorUnits]) => (
                <div key={floor} className="space-y-2">
                  <h3 className="font-semibold text-lg">Étage {floor}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {floorUnits.map((unit) => (
                      <div
                        key={unit.id}
                        className={`p-4 rounded-lg border ${
                          unit.status === "sold"
                            ? "bg-red-50 border-red-200"
                            : "bg-green-50 border-green-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{unit.number}</span>
                          <Badge
                            variant={
                              unit.status === "sold" ? "destructive" : "default"
                            }
                          >
                            {unit.status === "sold" ? "Vendu" : "Disponible"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {unit.type} • {unit.area} m²
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {unit.orientation}
                        </p>
                        <UnitClient
                          unitId={unit.id}
                          currentStatus={unit.status}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
