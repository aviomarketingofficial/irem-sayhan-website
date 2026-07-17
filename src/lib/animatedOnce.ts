// Anasayfa giriş animasyonları oturum boyunca bölüm başına yalnızca BİR KEZ oynar.
// Bir bölüm oynadıktan sonra (ör. Tedaviler'e gidip anasayfaya dönünce) tekrar
// oynamaz; doğrudan son hâlinde görünür. Modül singleton'ı SPA gezinmelerinde
// korunduğu için bayrak remount'larda yaşar.
const played = new Set<string>()

export const playedOnce = {
  has: (key: string) => played.has(key),
  mark: (key: string) => {
    played.add(key)
  },
}
