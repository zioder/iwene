"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Clock, Home, Maximize, BedDouble, Banknote } from "lucide-react";
import type { Project, Unit } from "@/lib/project-data";
import { getProjectStats } from "@/lib/project-data";

interface UnitAvailabilityProps {
  project: Project;
}

const statusConfig = {
  available: {
    label: "Disponible",
    color: "bg-emerald-500",
    borderColor: "border-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    textColor: "text-emerald-700 dark:text-emerald-400",
    icon: Check,
  },
  sold: {
    label: "Vendu",
    color: "bg-red-500",
    borderColor: "border-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    textColor: "text-red-700 dark:text-red-400",
    icon: X,
  },
  reserved: {
    label: "Réservé",
    color: "bg-amber-500",
    borderColor: "border-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    textColor: "text-amber-700 dark:text-amber-400",
    icon: Clock,
  },
};

export function UnitAvailability({ project }: UnitAvailabilityProps) {
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [filter, setFilter] = useState<"all" | "available" | "sold" | "reserved">("all");
  const stats = getProjectStats(project);

  const filteredUnits =
    filter === "all" ? project.units : project.units.filter((u) => u.status === filter);

  const unitsByFloor = Array.from({ length: project.floors }, (_, i) => {
    const floorNum = project.floors - i; // Reverse: top floor first
    return {
      floor: floorNum,
      units: filteredUnits.filter((u) => u.floor === floorNum),
    };
  }).filter((f) => f.units.length > 0);

  return (
    <div className="space-y-8">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total"
          value={stats.total}
          color="bg-primary"
        />
        <StatCard
          label="Disponibles"
          value={stats.available}
          color="bg-emerald-500"
        />
        <StatCard
          label="Vendus"
          value={stats.sold}
          color="bg-red-500"
        />
        <StatCard
          label="Réservés"
          value={stats.reserved}
          color="bg-amber-500"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", "Tous"],
            ["available", "Disponibles"],
            ["sold", "Vendus"],
            ["reserved", "Réservés"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === key
                ? "bg-foreground text-background shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Building Floor Plan */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 overflow-x-auto">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Home className="w-5 h-5" />
          Plan des étages
        </h3>

        <div className="min-w-[600px] space-y-3">
          {/* Legend */}
          <div className="flex gap-4 mb-4 text-sm">
            {Object.entries(statusConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${config.color}`} />
                <span className="text-muted-foreground">{config.label}</span>
              </div>
            ))}
          </div>

          {/* Floors */}
          {unitsByFloor.map(({ floor, units }) => (
            <motion.div
              key={floor}
              layout
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 text-sm font-medium text-muted-foreground text-right shrink-0">
                Ét. {floor}
              </div>
              <div className="flex-1 flex gap-2">
                {units.map((unit) => {
                  const config = statusConfig[unit.status];
                  const Icon = config.icon;
                  return (
                    <motion.button
                      key={unit.id}
                      layout
                      onClick={() =>
                        setSelectedUnit(selectedUnit?.id === unit.id ? null : unit)
                      }
                      className={`relative flex-1 h-14 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                        selectedUnit?.id === unit.id
                          ? `${config.borderColor} ring-2 ring-offset-2 ring-offset-background ring-${config.color.split("-")[1]}-500`
                          : "border-transparent"
                      } ${config.bgColor}`}
                      whileHover={{ scale: unit.status !== "sold" ? 1.05 : 1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-2 h-2 rounded-full ${config.color}`} />
                      <span className="text-[10px] font-semibold text-foreground">
                        {unit.number}
                      </span>
                      {unit.status === "sold" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/40 rounded-lg">
                          <X className="w-4 h-4 text-red-600" />
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Unit Detail */}
      <AnimatePresence mode="wait">
        {selectedUnit && (
          <motion.div
            key={selectedUnit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl border-2 p-6 md:p-8 ${
              statusConfig[selectedUnit.status].borderColor
            } ${statusConfig[selectedUnit.status].bgColor}`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h4 className="text-2xl font-bold text-foreground">
                  Appartement {selectedUnit.number}
                </h4>
                <p className="text-muted-foreground mt-1">
                  {selectedUnit.type} — Étage {selectedUnit.floor}
                </p>
              </div>
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  statusConfig[selectedUnit.status].color
                } text-white w-fit`}
              >
                {(() => {
                  const Icon = statusConfig[selectedUnit.status].icon;
                  return <Icon className="w-4 h-4" />;
                })()}
                {statusConfig[selectedUnit.status].label}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <UnitDetailItem
                icon={Maximize}
                label="Superficie"
                value={`${selectedUnit.area} m²`}
              />
              <UnitDetailItem
                icon={BedDouble}
                label="Pièces"
                value={`${selectedUnit.rooms}`}
              />
              <UnitDetailItem
                icon={Banknote}
                label="Prix"
                value={`${selectedUnit.price.toLocaleString("fr-FR")} TND`}
              />
              <UnitDetailItem
                icon={Home}
                label="Type"
                value={selectedUnit.type}
              />
            </div>

            {selectedUnit.status === "available" && (
              <div className="mt-6">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors">
                  Demander des informations
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card border border-border rounded-xl p-4 text-center"
    >
      <div className={`w-3 h-3 rounded-full ${color} mx-auto mb-2`} />
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}

function UnitDetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-background/60 rounded-xl p-4">
      <Icon className="w-5 h-5 text-muted-foreground mb-2" />
      <div className="text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
      <div className="text-lg font-semibold text-foreground mt-0.5">{value}</div>
    </div>
  );
}
