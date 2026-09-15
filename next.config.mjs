import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,

    sassOptions: {
        loadPaths: [
            path.join(process.cwd(), "node_modules/bootstrap/scss")
        ],
        silenceDeprecations: [
            "import",
            "color-functions",
            "global-builtin",
            "if-function",
        ],
    },
};

export default nextConfig;