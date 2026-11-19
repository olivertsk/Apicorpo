import { timingSafeEqual } from 'crypto'

/**
 * Valida el usuario y clave (`usu` / `cla`) que manda el software A2 en sus llamadas.
 *
 * - Si A2_USER y A2_PASSWORD están configurados en el .env, se exigen.
 * - Si no están configurados, se deja pasar (para no cortar la integración) pero se avisa
 *   en el log. En ese modo las rutas siguen abiertas: hay que configurarlos cuanto antes.
 */
const safeEqual = (a: string, b: string) => {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

let warned = false

export const fxCheckA2Credentials = (usu: unknown, cla: unknown, route: string): boolean => {
  const expectedUser = process.env.A2_USER
  const expectedPassword = process.env.A2_PASSWORD
  if (!expectedUser || !expectedPassword) {
    if (!warned) {
      console.warn(
        `[A2] A2_USER / A2_PASSWORD no configurados: las rutas de integración A2 siguen abiertas (primera llamada: ${route})`
      )
      warned = true
    }
    return true
  }
  if (typeof usu !== 'string' || typeof cla !== 'string') return false
  return safeEqual(usu, expectedUser) && safeEqual(cla, expectedPassword)
}
