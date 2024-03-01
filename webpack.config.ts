import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

interface IEnv {
    mode: "development" | "production";
    port?: number;
}

export default (env: IEnv) => {

    const isDev = env.mode !== "production";

    const config: webpack.Configuration = {
        mode: env.mode ?? "development",
        entry: path.resolve(__dirname, "src", "index.tsx"),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name]_[contenthash].js',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, "public", "index.html") }),
            isDev && new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin({
                filename: "css/[name]_[contenthash:8].css",
                chunkFilename: "css/[name]_[contenthash:8].css",
            }),
        ],


        // dev-server
        devtool: isDev && 'source-map',
        devServer: isDev && {
            port: env.port ?? 3000,
            open: true,
            hot: true
        }
    }

    return config;
}