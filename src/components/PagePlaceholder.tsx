import { Link } from "react-router-dom"

export function PagePlaceholder({ title, note }: { title: string; note?: string }) {
  return (
    <section className="mx-auto flex min-h-[60svh] max-w-3xl flex-col items-center justify-center px-4 pb-20 pt-36 text-center sm:pt-40">
      <h1 className="text-3xl font-semibold tracking-tight text-[#0b2545] sm:text-4xl">{title}</h1>
      <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
        {note ?? "Bu sayfa hazırlanıyor."}
      </p>
      <Link
        to="/"
        className="mt-8 text-sm font-medium text-primary underline-offset-4 hover:underline"
      >
        Ana sayfaya dön
      </Link>
    </section>
  )
}
