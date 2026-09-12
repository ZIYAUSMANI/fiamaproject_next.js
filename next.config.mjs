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
            "mixed-decls",
            "color-functions",
            "global-builtin",
        ],
    },
};

export default nextConfig;