// "Tüm Tedaviler"e tıklanınca slider panellerinin o anki viewport konumları
// burada (slug -> konum) saklanır. Tedaviler sayfası mount olunca kartları bu
// konumlardan kendi grid konumlarına FLIP tekniğiyle uçurur (paylaşılan-element
// benzeri geçiş). View Transitions API'ye bağımlı değildir; her yerde çalışır.
export type MorphRect = { left: number; top: number; width: number; height: number }

export const morphFrom = new Map<string, MorphRect>()
