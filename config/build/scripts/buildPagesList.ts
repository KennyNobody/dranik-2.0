import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import getIncludesObject from "../scripts/getIncludesObject";
import getPageTemplates from "../scripts/getPageTemplates";
import getIncludesPages from "../scripts/getIncludesPages";
import {getWidgets} from "./getWidgets";

export interface TemplateStringType {
    [key: string]: Buffer;
}

export interface TemplatePageType {
    name: string;
    path: string;
}

export function buildPagesList(): webpack.WebpackPluginInstance[] {
    const pagesDirectory = path.resolve('src', 'main', 'pages');
    const pages: TemplatePageType[] = getIncludesPages(pagesDirectory);
    const pagesArray: HtmlWebpackPlugin[] = [];
    const widgets = getWidgets();

    pages.forEach((el: TemplatePageType) => {
        const item: HtmlWebpackPlugin = getPageTemplates(el, './src/main/pages/', widgets);
        pagesArray.push(item);
    })

    return pagesArray;
}
