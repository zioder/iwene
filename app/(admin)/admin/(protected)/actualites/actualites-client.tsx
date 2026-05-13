"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/app/(admin)/admin/actions";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/admin/image-upload";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";

interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string | null;
  published: boolean;
  createdAt: Date;
}

export default function ActualitesPage({
  articles: initialArticles,
}: {
  articles: Article[];
}) {
  const [articles, setArticles] = useState(initialArticles);
  const [open, setOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    image: "",
    published: true,
  });

  function openCreate() {
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      content: "",
      image: "",
      published: true,
    });
    setOpen(true);
  }

  function openEdit(article: Article) {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      content: article.content,
      image: article.image || "",
      published: article.published,
    });
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const data = {
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      image: formData.image || undefined,
      published: formData.published,
    };

    if (editingArticle) {
      await updateArticle(editingArticle.id, data);
    } else {
      await createArticle(data);
    }

    setOpen(false);
    router.refresh();
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;
    await deleteArticle(id);
    setArticles(articles.filter((a) => a.id !== id));
    router.refresh();
  }

  async function togglePublished(article: Article) {
    await updateArticle(article.id, {
      title: article.title,
      slug: article.slug,
      content: article.content,
      image: article.image || undefined,
      published: !article.published,
    });
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Nos Actualités</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos articles et actualités
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel article
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <div
            key={article.id}
            className="border rounded-lg overflow-hidden group bg-card"
          >
            <div className="relative aspect-video">
              {article.image ? (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">
                    Pas d&apos;image
                  </span>
                </div>
              )}
              <div className="absolute top-2 right-2">
                <Badge
                  variant={article.published ? "default" : "secondary"}
                  className="backdrop-blur-sm"
                >
                  {article.published ? "Publié" : "Brouillon"}
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold line-clamp-2">{article.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {article.content.substring(0, 100)}...
              </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">
                  {new Date(article.createdAt).toLocaleDateString("fr-FR")}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => togglePublished(article)}
                  >
                    {article.published ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => openEdit(article)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500"
                    onClick={() => handleDelete(article.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingArticle ? "Modifier l&apos;article" : "Nouvel article"}
            </DialogTitle>
            <DialogDescription>
              {editingArticle
                ? "Modifiez les informations de l&apos;article"
                : "Ajoutez un nouvel article d&apos;actualité"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
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

            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              label="Image de l&apos;article"
              folder="articles"
            />

            <div className="space-y-2">
              <Label>Contenu</Label>
              <Textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={10}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.published}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, published: checked })
                }
              />
              <Label>Publié</Label>
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
                  : editingArticle
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
