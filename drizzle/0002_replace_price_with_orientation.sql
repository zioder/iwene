ALTER TABLE "units" DROP COLUMN "price";
ALTER TABLE "units" ADD COLUMN "orientation" varchar(50) NOT NULL DEFAULT 'Nord';
