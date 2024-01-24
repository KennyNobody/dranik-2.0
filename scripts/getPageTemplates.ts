import HtmlWebpackPlugin from "html-webpack-plugin";
import {TemplatePageType, TemplateStringType} from "../config/build/plugins/buildPagesList";

const createPluginInstance = (
    data: TemplatePageType,
    path: string,
    elements: TemplateStringType
): HtmlWebpackPlugin => {
    return new HtmlWebpackPlugin({
        template: path + data.path,
        filename: data.name,
        ...elements
    });
}

export default createPluginInstance;
