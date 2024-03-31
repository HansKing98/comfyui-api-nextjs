
// 获取浏览器默认语言
export const getBrowserLang = function () {
  if (typeof navigator !== "undefined") {
    
  let browserLang = navigator.language
    ? navigator.language
    : navigator.browserLanguage
  // 英语特殊处理
  if (
    browserLang.toLowerCase() === "us" ||
    browserLang.toLowerCase() === "en" ||
    browserLang.toLowerCase() === "en_us"
  ) {
    browserLang = "en"
  } 
  // 中文特殊处理
  if (browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
    browserLang = "zh"
  }
  return browserLang || "en"
  }

}
