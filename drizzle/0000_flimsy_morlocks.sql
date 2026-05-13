CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"image" text,
	"published" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "articles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"location" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"gallery" text[] DEFAULT '{}' NOT NULL,
	"features" text[] DEFAULT '{}' NOT NULL,
	"total_units" integer NOT NULL,
	"floors" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "units" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"unit_id" varchar(50) NOT NULL,
	"floor" integer NOT NULL,
	"number" varchar(50) NOT NULL,
	"type" varchar(50) NOT NULL,
	"area" numeric NOT NULL,
	"rooms" integer NOT NULL,
	"price" numeric NOT NULL,
	"status" varchar(20) DEFAULT 'available' NOT NULL,
	"row" integer NOT NULL,
	"col" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "units" ADD CONSTRAINT "units_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;