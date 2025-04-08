//テキストを改行する関数
export const returnCodeToBr = (text) => {
    if (text === null || text === undefined) {
        return "";
    }
    return text.replace(/\r?\n/g, '<br />');
};
