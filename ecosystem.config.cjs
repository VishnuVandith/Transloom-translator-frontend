module.exports = {
  apps: [
    {
      name: "transloom-frontend",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        PORT: 5173
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5173
      },
      watch: true,
      ignore_watch: ["node_modules", "public"],
      watch_options: {
        followSymlinks: false
      }
    }
  ]
};
