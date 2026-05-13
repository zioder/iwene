import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { projects as projectData } from "../project-data";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("Seeding database...");

  for (const project of projectData) {
    const [insertedProject] = await db
      .insert(schema.projects)
      .values({
        slug: project.slug,
        name: project.name,
        description: project.description,
        location: project.location,
        image: project.image,
        gallery: project.gallery,
        features: project.features,
        totalUnits: project.totalUnits,
        floors: project.floors,
        latitude: project.latitude.toString(),
        longitude: project.longitude.toString(),
      })
      .returning();

    console.log(`Inserted project: ${project.name}`);

    for (const unit of project.units) {
      await db.insert(schema.units).values({
        projectId: insertedProject.id,
        unitId: unit.id,
        floor: unit.floor,
        number: unit.number,
        type: unit.type,
        area: unit.area.toString(),
        rooms: unit.rooms,
        orientation: unit.orientation,
        status: unit.status,
        row: unit.position.row,
        col: unit.position.col,
      });
    }

    console.log(`Inserted ${project.units.length} units for ${project.name}`);
  }

  console.log("Seeding complete!");

  const articlesData = [
    {
      title: "Résidence Lumière est en cours de construction",
      slug: "residence-lumiere-construction",
      content: "Les travaux avancent à bon rythme avec la finalisation des fondations et le début de l'élévation des structures. Livraison prévue au premier semestre 2026.",
      image: "https://iwene.com.tn/wp-content/uploads/2024/03/Rendu-1-1.webp",
      published: true,
    },
    {
      title: "Résidence Horizon a débuté la construction",
      slug: "residence-horizon-debut-construction",
      content: "C'est officiel ! Le coup d'envoi des travaux de la Résidence Horizon a été donné. Un projet ambitieux de 120 logements avec vue panoramique sur la mer.",
      image: "https://iwene.com.tn/wp-content/uploads/2024/03/rendu-3-1.webp",
      published: true,
    },
    {
      title: "Résidence Élégance a livré ses premiers logements",
      slug: "residence-elegance-livraison",
      content: "Nous sommes fiers d'annoncer la livraison des premières clés aux résidents de la Résidence Élégance. Un nouveau chapitre commence pour ses heureux propriétaires.",
      image: "https://iwene.com.tn/wp-content/uploads/2024/03/rendu-2-1.webp",
      published: true,
    },
    {
      title: "Résidence Panorama ouvre ses portes visiteurs",
      slug: "residence-panorama-portes-ouvertes",
      content: "Venez découvrir nos appartements témoins et espaces communs lors de nos journées portes ouvertes ce week-end. Une occasion unique de projeter votre futur chez vous.",
      image: "https://iwene.com.tn/wp-content/uploads/2023/10/1504024492_facade.angle01.t.jpg",
      published: true,
    },
    {
      title: "Résidence Azure atteint son 10ème étage",
      slug: "residence-azure-10eme-etage",
      content: "Un cap symbolique est franchi avec la coulée de la dalle du 10ème étage. Ce projet phare du centre-ville prend forme jour après jour.",
      image: "https://iwene.com.tn/wp-content/uploads/2024/03/Rendu-1-1.webp",
      published: true,
    },
    {
      title: "Partenariat stratégique avec un nouveau promoteur",
      slug: "partenariat-strategique-promoteur",
      content: "Iwene renforce son réseau avec un partenariat majeur visant à développer de nouveaux projets durables et innovants sur le territoire national.",
      image: "https://iwene.com.tn/wp-content/uploads/2024/03/rendu-3-1.webp",
      published: true,
    },
  ];

  for (const article of articlesData) {
    await db.insert(schema.articles).values(article);
    console.log(`Inserted article: ${article.title}`);
  }

  console.log("Articles seeded!");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
