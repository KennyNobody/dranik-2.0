import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import getIncludesObject from "../../../scripts/getIncludesObject";
import getPageTemplates from "../../../scripts/getPageTemplates";
import getIncludesPages from "../../../scripts/getIncludesPages";

export interface TemplateStringType {
    [key: string]: string;
}

export interface TemplatePageType {
    name: string;
    path: string;
}

export function buildPagesList(): webpack.WebpackPluginInstance[] {
    const pagesDirectory = path.resolve('src', 'base', 'pages');
    const elementsDirectory = path.resolve('src', 'base', 'widgets');

    const pages = getIncludesPages(pagesDirectory);
    const elements = getIncludesObject(elementsDirectory);

    const pluginsArray: HtmlWebpackPlugin[] = [];

    pages.forEach((el: TemplatePageType) => {
        const item = getPageTemplates(el, './src/base/pages/', elements);
        pluginsArray.push(item);
    })

    return pluginsArray;
}
