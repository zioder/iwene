"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
} from "@/app/(admin)/admin/actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/admin/image-upload";
import { GalleryUpload } from "@/components/admin/gallery-upload";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import Image from "next/image";

const categories = [
  { value: "ongoing", label: "Projets en cours" },
  { value: "realized", label: "Projets réalisés" },
  { value: "future", label: "Futurs projets" },
];

interface Project {
  id: number;
  slug: string;
  name: string;
  description: string;
  location: string;
  image: string;
  gallery: string[];
  features: string[];
  category: string;
  totalUnits: number;
  floors: number;
}

export default function ProjectsPage({
  projects: initialProjects,
}: {
  projects: Project[];
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    location: "",
    image: "",
    gallery: [] as string[],
    features: "",
    category: "ongoing",
    totalUnits: "",
    floors: "",
  });

  function openCreate() {
    setEditingProject(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      location: "",
      image: "",
      gallery: [],
      features: "",
      category: "ongoing",
      totalUnits: "",
      floors: "",
    });
    setOpen(true);
  }

  function openEdit(project: Project) {
    setEditingProject(project);
    setFormData({
      name: project.name,
      slug: project.slug,
      description: project.description,
      location: project.location,
      image: project.image,
      gallery: project.gallery || [],
      features: project.features.join("\n"),
      category: project.category || "realized",
      totalUnits: project.totalUnits.toString(),
      floors: project.floors.toString(),
    });
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      location: formData.location,
      image: formData.image,
      gallery: formData.gallery,
      features: formData.features
        .split("\n")
        .filter((l) => l.trim()),
      category: formData.category,
      totalUnits: parseInt(formData.totalUnits),
      floors: parseInt(formData.floors),
    };

    if (editingProject) {
      await updateProject(editingProject.id, data);
    } else {
      await createProject(data);
    }

    setOpen(false);
    router.refresh();
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;
    await deleteProject(id);
    setProjects(projects.filter((p) => p.id !== id));
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projets</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos projets immobiliers
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nouveau projet
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg overflow-hidden group">
            <div className="relative aspect-video">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-sm text-muted-foreground">{project.location}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>{project.totalUnits} unités</span>
                <span>•</span>
                <span>{project.floors} étages</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Link href={`/admin/projets/${project.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-1" />
                    Unités
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(project)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Modifier le projet" : "Nouveau projet"}
            </DialogTitle>
            <DialogDescription>
              {editingProject
                ? "Modifiez les informations du projet"
                : "Ajoutez un nouveau projet immobilier"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nom</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              label="Image principale"
              folder="projects"
            />

            <GalleryUpload
              value={formData.gallery}
              onChange={(urls) => setFormData({ ...formData, gallery: urls })}
              label="Galerie d'images"
              folder="projects"
            />

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Localisation</Label>
              <Input
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Caractéristiques (une par ligne)</Label>
              <Textarea
                value={formData.features}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total unités</Label>
                <Input
                  type="number"
                  value={formData.totalUnits}
                  onChange={(e) =>
                    setFormData({ ...formData, totalUnits: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Étages</Label>
                <Input
                  type="number"
                  value={formData.floors}
                  onChange={(e) =>
                    setFormData({ ...formData, floors: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Enregistrement..."
                  : editingProject
                    ? "Modifier"
                    : "Créer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
