export const cookieValueOrNull = (cookieName: string) => {
  return (document.cookie.match(new RegExp("^(?:.*;)?\\s*" + cookieName + "\\s*=\\s*([^;]+)(?:.*)?$"))||[,null])[1]
}
