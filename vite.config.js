import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: "index.html",
                teams: "teams.html",
                contact: "contact.html",
                // Add more pages here if needed
            },
        },
    },
});
