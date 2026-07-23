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

// Kullanıcı "hareketi azalt" ayarını açtıysa animasyon oynatmayız.
// useState başlangıç değerinde çağrılır: bileşen doğrudan son hâliyle doğar,
// önce gizlenip sonra gösterilmez (fazladan çizim ve kısa boşluk olmaz).
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}
