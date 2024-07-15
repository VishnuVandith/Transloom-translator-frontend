import withMT from "@material-tailwind/react/utils/withMT";
 
const config = withMT({
  content: [
    "./index.html",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});

export default config;