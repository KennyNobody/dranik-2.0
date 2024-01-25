import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {BuildOptions} from "./types/config";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SpriteLoaderPlugin from 'svg-sprite-loader/plugin';
import {buildPagesList} from "./scripts/buildPagesList";
import WatchExternalFilesPlugin from 'webpack-watch-files-plugin'

export function buildPlugins({paths}: BuildOptions): webpack.WebpackPluginInstance[] {
    const pages = buildPagesList();

    return [
        // new HtmlWebpackPlugin({
        //     template: paths.html,
        //     inject: 'body'
        // }),

        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:4].css',
        }),
        new webpack.ProgressPlugin(),
        // @ts-ignore
        new SpriteLoaderPlugin(),
        new WatchExternalFilesPlugin({
            files: ['./src/**/*.html'],
        }),
        ...pages,
    ];
}
