import { type Sale } from "@/app/types";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const link = "https://mocki.io/v1/e10ce80d-12fc-4422-9aaf-248d6e723d33";

export const infoRouter = createTRPCRouter({
  get: publicProcedure.query(async () => {
    try {
      const response = await fetch(link);
      const data = (await response.json()) as Sale[];
      if (!data) throw new Error("No data found");
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch data");
    }
  }),
});
