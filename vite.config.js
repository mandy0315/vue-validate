import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
import WindiCSS from "vite-plugin-windicss";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/", // 開始路徑
  resolve: {
    alias: {
      // 別名
      "@/": new URL("./src/", import.meta.url).pathname,
      "/images": new URL("./src/assets/images", import.meta.url).pathname,
    },
  },
  server: {
    proxy: {
      "/news": {
        target: "https://news.housefun.com.tw",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/news/g, ""),
      },
    },
  },
  plugins: [
    vue(),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue"],
    }),
    WindiCSS({
      fileExtensions: ["vue", "js", "html"],
    }),
    Components({
      resolvers: IconsResolver({
        compiler: "vue3",
        prefix: "Icon",
      }),
    }),
    Icons(),
  ],
  // 打包
  build: {
    minify: false,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
      },
      output: {
        entryFileNames: `assets/js/[name].js`,
        chunkFileNames: `assets/js/[name]_${+new Date()}.js`,
        assetFileNames: function (chunkInfo) {
          const fileExtName = chunkInfo.name.split(".")[chunkInfo.name.split(".").length - 1];
          let output = "";

          switch (fileExtName) {
            case "css":
              output = `assets/css/[name].[ext]`;
              break;
            case "svg":
            case "png":
            case "jpg":
            case "jpeg":
              output = `assets/images/[name].[ext]`;
              break;
            default:
              output = `assets/[name].[ext]`;
              break;
          }

          return output;
        },
      },
    },
  },
});
