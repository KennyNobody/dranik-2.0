import HtmlWebpackPlugin from "html-webpack-plugin";
import {TemplatePageType} from "./buildPagesList";

const createPluginInstance = (
    data: TemplatePageType,
    path: string,
    widgets: any,
): HtmlWebpackPlugin => {
    return new HtmlWebpackPlugin({
        template: path + data.path,
        filename: data.name,
        inject: 'body',
        widgets,
    });
}

export default createPluginInstance;
