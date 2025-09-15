import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect, useState } from "react"

type Props = {
  order: { id: string }
}

const OrderLoyaltyPoints = ({ order }: Props) => {
  const [points, setPoints] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      try {
        const res = await fetch(`/store/orders/${order.id}/loyalty-points`, {
          signal: controller.signal,
          headers: {
            // Admin proxy forwards cookies; use publishable key if required in your setup
            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
          },
        })
        if (!res.ok) {
          throw new Error(`Failed: ${res.status}`)
        }
        const data = await res.json()
        setPoints(data.loyalty_points)
      } catch (e: any) {
        setError(e.message)
      }
    }
    run()
    return () => controller.abort()
  }, [order.id])

  return (
    <div>
      <h3>Loyalty Points</h3>
      {error && <p>Failed to load</p>}
      {!error && points === null && <p>Loading...</p>}
      {!error && points !== null && <p>{points}</p>}
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.after",
})

export default OrderLoyaltyPoints


