export default function shareUrlParamsFilter(s) {
    // 过滤掉pay，openId参数
    return s.replace(/&pay=\w+/, "").replace(/[(\?)|(&)]openId=.*/, "");
}